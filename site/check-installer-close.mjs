import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import net from 'node:net';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const FRAMEWORK_DIR = resolve(REPO_ROOT, 'framework');
const INSTALLER_SCRIPT = resolve(FRAMEWORK_DIR, 'scripts/installer_gui.py');
const CHROMIUM_BIN = process.env.CHROMIUM_BIN ?? 'chromium';
const CLOSE_KEY = '__vc_installer_close_smoke__';

function delay(ms) {
  return new Promise((resolvePromise) => {
    setTimeout(resolvePromise, ms);
  });
}

async function getFreePort() {
  return new Promise((resolvePromise, rejectPromise) => {
    const server = net.createServer();
    server.on('error', rejectPromise);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        rejectPromise(new Error('Could not resolve a free local port.'));
        return;
      }

      server.close((error) => {
        if (error) {
          rejectPromise(error);
          return;
        }
        resolvePromise(address.port);
      });
    });
  });
}

async function waitFor(test, timeoutMs, label) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const result = await test();
    if (result) return result;
    await delay(120);
  }

  throw new Error(`Timed out while waiting for ${label}.`);
}

async function waitForExit(child) {
  if (child.exitCode !== null) return;
  await once(child, 'exit');
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.json();
}

function createCloseProbe() {
  return `
    (() => {
      const KEY = ${JSON.stringify(CLOSE_KEY)};
      const read = () => {
        try {
          return JSON.parse(sessionStorage.getItem(KEY) || '{"closeEvents":0}');
        } catch {
          return { closeEvents: 0 };
        }
      };
      const write = (state) => sessionStorage.setItem(KEY, JSON.stringify(state));
      if (!window.__vcInstallerCloseSmokeBound) {
        window.__vcInstallerCloseSmokeBound = true;
        window.addEventListener('vibecrafted-installer:closing', () => {
          const state = read();
          state.closeEvents = Number(state.closeEvents || 0) + 1;
          state.lastPath = location.pathname;
          write(state);
        });
      }
      write(read());
    })();
  `;
}

class CdpPage {
  constructor(socketUrl) {
    this.console = [];
    /** @type {{ requested: boolean; requestId: string | null; status: number | null }} */
    this.deleteSession = { requested: false, requestId: null, status: null };
    this.listeners = new Map();
    this.nextId = 1;
    this.pending = new Map();
    this.runtimeErrors = [];
    this.socket = new WebSocket(socketUrl);

    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      if ('id' in message) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);

        if (message.error) {
          pending.reject(new Error(message.error.message));
          return;
        }

        pending.resolve(message.result);
        return;
      }

      if (message.method === 'Runtime.consoleAPICalled') {
        const text = message.params.args
          .map((arg) => arg.value ?? arg.unserializableValue ?? arg.description ?? '')
          .join(' ');
        this.console.push(`[${message.params.type}] ${text}`);
      }

      if (message.method === 'Runtime.exceptionThrown') {
        const details = message.params.exceptionDetails;
        this.runtimeErrors.push(details.text ?? details.exception?.description ?? 'Unknown runtime exception');
      }

      if (message.method === 'Network.requestWillBeSent') {
        const request = message.params.request;
        if (request.method === 'DELETE' && request.url.endsWith('/api/session')) {
          this.deleteSession.requested = true;
          this.deleteSession.requestId = message.params.requestId;
        }
      }

      if (
        message.method === 'Network.responseReceived' &&
        message.params.requestId === this.deleteSession.requestId
      ) {
        this.deleteSession.status = message.params.response.status;
      }

      const handlers = this.listeners.get(message.method);
      if (!handlers || handlers.size === 0) return;

      for (const handler of [...handlers]) {
        if (!handler.predicate(message.params)) continue;
        handlers.delete(handler);
        clearTimeout(handler.timer);
        handler.resolve(message.params);
      }
    });
  }

  async open() {
    if (this.socket.readyState === WebSocket.OPEN) return;

    await new Promise((resolvePromise, rejectPromise) => {
      const handleOpen = () => {
        this.socket.removeEventListener('error', handleError);
        resolvePromise();
      };
      const handleError = (event) => {
        this.socket.removeEventListener('open', handleOpen);
        rejectPromise(new Error(event.message ?? 'Could not open the DevTools WebSocket.'));
      };
      this.socket.addEventListener('open', handleOpen, { once: true });
      this.socket.addEventListener('error', handleError, { once: true });
    });
  }

  close() {
    if (this.socket.readyState === this.socket.OPEN) {
      this.socket.close();
    }
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));

    return new Promise((resolvePromise, rejectPromise) => {
      this.pending.set(id, { reject: rejectPromise, resolve: resolvePromise });
    });
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      awaitPromise: true,
      expression,
      returnByValue: true,
    });

    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text ?? 'Evaluation failed.');
    }

    return result.result.value;
  }

  waitFor(method, predicate = () => true, timeoutMs = 10000) {
    return new Promise((resolvePromise, rejectPromise) => {
      const timer = setTimeout(() => {
        const handlers = this.listeners.get(method);
        if (handlers) handlers.delete(listener);
        rejectPromise(new Error(`Timed out waiting for ${method}.`));
      }, timeoutMs);

      const listener = { predicate, resolve: resolvePromise, timer };
      const handlers = this.listeners.get(method) ?? new Set();
      handlers.add(listener);
      this.listeners.set(method, handlers);
    });
  }
}

async function main() {
  const installerPort = await getFreePort();
  const debugPort = await getFreePort();
  const baseUrl = `http://127.0.0.1:${installerPort}`;
  const chromeProfile = await mkdtemp(join(tmpdir(), 'vc-installer-close-smoke-'));

  const installer = spawn(
    'python3',
    [INSTALLER_SCRIPT, '--source', FRAMEWORK_DIR, '--host', '127.0.0.1', '--port', String(installerPort), '--no-open'],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );
  let installerStdout = '';
  let installerStderr = '';
  installer.stdout.on('data', (chunk) => {
    installerStdout += String(chunk);
  });
  installer.stderr.on('data', (chunk) => {
    installerStderr += String(chunk);
  });

  const browser = spawn(
    CHROMIUM_BIN,
    [
      '--headless=new',
      '--disable-gpu',
      '--disable-background-networking',
      '--no-first-run',
      '--no-default-browser-check',
      '--remote-debugging-address=127.0.0.1',
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${chromeProfile}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );
  let browserStderr = '';
  let page;
  let lastInstallerState = null;
  browser.stderr.on('data', (chunk) => {
    browserStderr += String(chunk);
  });

  const cleanup = async () => {
    browser.kill('SIGTERM');
    installer.kill('SIGTERM');
    await Promise.allSettled([
      waitForExit(browser),
      waitForExit(installer),
      rm(chromeProfile, { force: true, recursive: true }),
    ]);
  };

  try {
    await waitFor(async () => {
      try {
        const payload = await fetchJson(`${baseUrl}/api/health`);
        return payload.ok === true;
      } catch {
        return false;
      }
    }, 10000, 'the local installer health endpoint');

    const targets = await waitFor(async () => {
      try {
        const list = await fetchJson(`http://127.0.0.1:${debugPort}/json/list`);
        return Array.isArray(list) && list.find((target) => target.type === 'page') ? list : null;
      } catch {
        return null;
      }
    }, 10000, 'the Chromium DevTools target list');

    const pageTarget = targets.find((target) => target.type === 'page');
    if (!pageTarget?.webSocketDebuggerUrl) {
      throw new Error('Chromium did not expose a page WebSocket target.');
    }

    page = new CdpPage(pageTarget.webSocketDebuggerUrl);
    await page.open();
    await page.send('Page.enable');
    await page.send('Runtime.enable');
    await page.send('Network.enable');
    await page.send('Page.addScriptToEvaluateOnNewDocument', { source: createCloseProbe() });

    await page.send('Page.navigate', { url: `${baseUrl}/en/install/` });
    await waitFor(
      () =>
        page.evaluate(`
          ({ path: location.pathname, readyState: document.readyState })
        `).then((state) => (state.path === '/en/install/' && state.readyState !== 'loading' ? state : null)),
      10000,
      'the browser to navigate to /en/install/'
    );

    const initialState = await waitFor(
      () =>
        page.evaluate(`
          (() => {
            const closeButton = document.querySelector('.wizard-close-btn[data-installer-close]');
            const state = {
              buttonReady: closeButton instanceof HTMLAnchorElement,
              liveFlag: window.__VIBECRAFTED_LIVE__ === true,
              path: location.pathname,
              shellMode: Boolean(document.querySelector('.live-wizard, .installer-shell__bridge')),
              title: document.title,
            };
            return state;
          })()
        `).then((state) => {
          lastInstallerState = state;
          return state.buttonReady && state.liveFlag && state.shellMode ? state : null;
        }),
      10000,
      'the live installer shell and close button'
    );

    await page.evaluate(`
      (() => {
        const closeButton = document.querySelector('.wizard-close-btn[data-installer-close]');
        if (!(closeButton instanceof HTMLAnchorElement)) {
          throw new Error('Installer close button was not found.');
        }
        closeButton.click();
        return true;
      })()
    `);

    const finalState = await waitFor(
      () =>
        page.evaluate(`
          (() => {
            let closeState = { closeEvents: 0 };
            try {
              closeState = JSON.parse(sessionStorage.getItem(${JSON.stringify(CLOSE_KEY)}) || '{"closeEvents":0}');
            } catch {}
            return {
              closeEvents: Number(closeState.closeEvents || 0),
              path: location.pathname,
              readyState: document.readyState,
            };
          })()
        `).then((state) =>
          state.path === '/en/' && state.readyState === 'complete' && state.closeEvents >= 1 ? state : null
        ),
      10000,
      'the close action to tear down and navigate home'
    );

    await waitFor(
      () => (page.deleteSession.requested && page.deleteSession.status === 200 ? page.deleteSession : null),
      5000,
      'DELETE /api/session'
    );

    if (page.runtimeErrors.length > 0) {
      throw new Error(`Chromium runtime exceptions: ${JSON.stringify(page.runtimeErrors)}`);
    }

    console.log(JSON.stringify({
      closeEvents: finalState.closeEvents,
      console: page.console,
      deleteSession: page.deleteSession,
      from: initialState.path,
      to: finalState.path,
    }, null, 2));

    page.close();
  } catch (error) {
    if (page) {
      try {
        lastInstallerState = await page.evaluate(`
          (() => ({
            bodyStart: document.body ? document.body.innerText.slice(0, 500) : null,
            buttonCount: document.querySelectorAll('.wizard-close-btn[data-installer-close]').length,
            liveFlag: window.__VIBECRAFTED_LIVE__ === true,
            path: location.pathname,
            readyState: document.readyState,
            shellMode: Boolean(document.querySelector('.live-wizard, .installer-shell__bridge')),
            title: document.title,
          }))()
        `);
      } catch {}
    }
    error.message += `\nlast installer state:\n${JSON.stringify(lastInstallerState, null, 2)}\ninstaller stdout:\n${installerStdout}\ninstaller stderr:\n${installerStderr}\nbrowser stderr:\n${browserStderr}`;
    throw error;
  } finally {
    await cleanup();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
