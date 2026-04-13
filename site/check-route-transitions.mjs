import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import net from 'node:net';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = resolve(__dirname, 'dist');
const ROUTE_SMOKE_KEY = '__vc_route_smoke__';
const CHROMIUM_BIN = process.env.CHROMIUM_BIN ?? 'chromium';

const routeMatrix = [
  { label: 'EN home → framework', expectedPath: '/en/framework/', selector: 'a[href="/en/framework/"]' },
  { label: 'EN framework → quickstart', expectedPath: '/en/quickstart/', selector: 'a[href="/en/quickstart/"]' },
  { label: 'EN quickstart → faq', expectedPath: '/en/faq/', selector: 'a[href="/en/faq/"]' },
  { label: 'EN faq → install', expectedPath: '/en/install/', selector: 'a[href="/en/install/"]' },
  { label: 'EN install → PL install', expectedPath: '/pl/install/', selector: 'a[href="/pl/install/"]' },
  { label: 'PL install → PL home', expectedPath: '/pl/', selector: 'a.brand[href="/pl/"]' },
  { label: 'PL home → framework', expectedPath: '/pl/framework/', selector: 'a[href="/pl/framework/"]' },
  { label: 'PL framework → quickstart', expectedPath: '/pl/quickstart/', selector: 'a[href="/pl/quickstart/"]' },
  { label: 'PL quickstart → faq', expectedPath: '/pl/faq/', selector: 'a[href="/pl/faq/"]' },
  { label: 'PL faq → install', expectedPath: '/pl/install/', selector: 'a[href="/pl/install/"]' },
  { label: 'PL install → EN install', expectedPath: '/en/install/', selector: 'a[href="/en/install/"]' },
];

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

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return response.json();
}

function createJsonStore() {
  return { clicks: [], errors: [], events: [], pages: [] };
}

function createInjectedRouteProbe() {
  return `
    (() => {
      const KEY = ${JSON.stringify(ROUTE_SMOKE_KEY)};
      const ensure = () => {
        try {
          const current = sessionStorage.getItem(KEY);
          if (current) {
            const parsed = JSON.parse(current);
            return {
              clicks: Array.isArray(parsed.clicks) ? parsed.clicks : [],
              errors: Array.isArray(parsed.errors) ? parsed.errors : [],
              events: Array.isArray(parsed.events) ? parsed.events : [],
              pages: Array.isArray(parsed.pages) ? parsed.pages : [],
            };
          }
        } catch {}
        return ${JSON.stringify(createJsonStore())};
      };

      const save = (nextState) => {
        sessionStorage.setItem(KEY, JSON.stringify(nextState));
      };

      const push = (bucket, payload) => {
        const state = ensure();
        state[bucket].push({
          ...payload,
          href: location.href,
          path: location.pathname,
          ts: Date.now(),
        });
        save(state);
      };

      const bootKey = \`\${location.pathname}::\${document.title}\`;
      const state = ensure();
      if (!state.pages.some((entry) => entry.kind === 'document' && entry.bootKey === bootKey)) {
        push('pages', {
          bootKey,
          kind: 'document',
          readyState: document.readyState,
          title: document.title,
        });
      }

      if (!window.__vcRouteSmokeBound) {
        window.__vcRouteSmokeBound = true;

        ['astro:before-preparation', 'astro:before-swap', 'astro:after-swap', 'astro:page-load'].forEach((eventName) => {
          addEventListener(
            eventName,
            () => {
              push('events', { name: eventName, title: document.title });
            },
            { capture: true }
          );
        });

        window.addEventListener('error', (event) => {
          push('errors', {
            type: 'error',
            message: event.message || 'Unknown error',
          });
        });

        window.addEventListener('unhandledrejection', (event) => {
          push('errors', {
            type: 'unhandledrejection',
            message: String(event.reason?.message ?? event.reason ?? 'Unknown rejection'),
          });
        });
      }
    })();
  `;
}

class CdpPage {
  constructor(socketUrl) {
    this.console = [];
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

async function waitForExit(child) {
  if (child.exitCode !== null) return;
  await once(child, 'exit');
}

function summarizeEvents(events, startIndex) {
  return events
    .slice(startIndex)
    .map((event) => event.name)
    .filter(Boolean);
}

function expectedHome(pathname) {
  return pathname.startsWith('/pl/') ? '/pl/' : '/en/';
}

function hasAllTransitionNames(surfaces) {
  return (
    surfaces.topbar === 'site-topbar' &&
    surfaces.brand === 'site-brand' &&
    surfaces.footer === 'site-footer' &&
    hasStableFooterBrandIdentity(surfaces)
  );
}

function hasStableFooterBrandIdentity(surfaces) {
  return (
    surfaces.footerBrand === 'site-footer-brand' ||
    (surfaces.footerBrandClassName?.includes('vt-site-footer-brand') &&
      surfaces.footerBrandPersist === 'site-footer-brand')
  );
}

async function main() {
  const httpPort = await getFreePort();
  const debugPort = await getFreePort();
  const baseUrl = `http://127.0.0.1:${httpPort}`;
  const chromeProfile = await mkdtemp(join(tmpdir(), 'vc-route-smoke-'));

  const server = spawn('python3', ['-m', 'http.server', String(httpPort), '--bind', '127.0.0.1', '--directory', DIST_DIR], {
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  let serverStderr = '';
  server.stderr.on('data', (chunk) => {
    serverStderr += String(chunk);
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
  browser.stderr.on('data', (chunk) => {
    browserStderr += String(chunk);
  });

  const cleanup = async () => {
    browser.kill('SIGTERM');
    server.kill('SIGTERM');
    await Promise.allSettled([
      waitForExit(browser),
      waitForExit(server),
      rm(chromeProfile, { force: true, recursive: true }),
    ]);
  };

  try {
    await waitFor(async () => {
      try {
        await fetch(`${baseUrl}/en/`);
        return true;
      } catch {
        return false;
      }
    }, 8000, 'the local static server');

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

    const page = new CdpPage(pageTarget.webSocketDebuggerUrl);
    await page.open();

    await page.send('Page.enable');
    await page.send('Runtime.enable');
    await page.send('Log.enable');
    await page.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await page.send('Emulation.setScrollbarsHidden', { hidden: false });
    await page.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }],
      media: '',
    });
    await page.send('Page.addScriptToEvaluateOnNewDocument', { source: createInjectedRouteProbe() });

    const initialLoad = page.waitFor('Page.loadEventFired');
    await page.send('Page.navigate', { url: `${baseUrl}/en/` });
    await initialLoad;

    const readSnapshot = async () => {
      return page.evaluate(`
        (() => {
          const state = (() => {
            try {
              return JSON.parse(sessionStorage.getItem(${JSON.stringify(ROUTE_SMOKE_KEY)}) ?? '{}');
            } catch {
              return {};
            }
          })();
          const topbar = document.querySelector('.nav-shell, .wizard-shell__topbar');
          const brand = document.querySelector('.brand-mark');
          const brandLink = document.querySelector('.brand');
          const footer = document.querySelector('.footer-shell');
          const footerBrand = document.querySelector('.footer-brand');
          const banner = document.querySelector('.curl-banner');

          return {
            path: location.pathname,
            readyState: document.readyState,
            routeState: {
              clicks: Array.isArray(state.clicks) ? state.clicks : [],
              errors: Array.isArray(state.errors) ? state.errors : [],
              events: Array.isArray(state.events) ? state.events : [],
              pages: Array.isArray(state.pages) ? state.pages : [],
            },
            surfaces: {
              banner: banner ? getComputedStyle(banner).viewTransitionName : null,
              bannerPresent: Boolean(banner),
              brand: brand ? getComputedStyle(brand).viewTransitionName : null,
              brandHref: brandLink instanceof HTMLAnchorElement ? brandLink.getAttribute('href') : null,
              footer: footer ? getComputedStyle(footer).viewTransitionName : null,
              footerBrandClassName: footerBrand instanceof HTMLElement ? footerBrand.className : null,
              footerBrandPersist: footerBrand instanceof HTMLElement ? footerBrand.dataset.astroTransitionPersist ?? null : null,
              footerBrand: footerBrand ? getComputedStyle(footerBrand).viewTransitionName : null,
              footerLinks: document.querySelectorAll('.footer-links a').length,
              topbar: topbar ? getComputedStyle(topbar).viewTransitionName : null,
            },
            title: document.title,
          };
        })()
      `);
    };

    const routeSummary = [];
    let snapshot = await readSnapshot();

    if (!hasAllTransitionNames(snapshot.surfaces)) {
      throw new Error(`Initial transition names missing: ${JSON.stringify(snapshot.surfaces)}`);
    }

    for (const step of routeMatrix) {
      const previousEventCount = snapshot.routeState.events.length;
      const previousErrorCount = snapshot.routeState.errors.length;

      const clickResult = await page.evaluate(`
        (() => {
          const selector = ${JSON.stringify(step.selector)};
          const state = (() => {
            try {
              return JSON.parse(sessionStorage.getItem(${JSON.stringify(ROUTE_SMOKE_KEY)}) ?? '{}');
            } catch {
              return {};
            }
          })();
          const link = document.querySelector(selector);

          if (!(link instanceof HTMLAnchorElement)) {
            return { found: false, href: null, text: null };
          }

          state.clicks = Array.isArray(state.clicks) ? state.clicks : [];
          state.clicks.push({
            href: link.getAttribute('href'),
            path: location.pathname,
            selector,
            text: (link.textContent || '').trim(),
            ts: Date.now(),
          });
          sessionStorage.setItem(${JSON.stringify(ROUTE_SMOKE_KEY)}, JSON.stringify(state));
          link.click();

          return {
            found: true,
            href: link.getAttribute('href'),
            text: (link.textContent || '').trim(),
          };
        })()
      `);

      if (!clickResult.found) {
        throw new Error(`Could not find ${step.selector} during ${step.label}.`);
      }

      snapshot = await waitFor(async () => {
        try {
          const next = await readSnapshot();
          if (next.path !== step.expectedPath || next.readyState !== 'complete') {
            return null;
          }

          const newEvents = summarizeEvents(next.routeState.events, previousEventCount);
          if (!newEvents.includes('astro:after-swap') || !newEvents.includes('astro:page-load')) {
            return null;
          }

          return next;
        } catch {
          return null;
        }
      }, 10000, `${step.label} to settle`);

      if (snapshot.routeState.errors.length !== previousErrorCount) {
        const newErrors = snapshot.routeState.errors.slice(previousErrorCount);
        throw new Error(`${step.label} added runtime errors: ${JSON.stringify(newErrors)}`);
      }

      if (!hasAllTransitionNames(snapshot.surfaces)) {
        throw new Error(`${step.label} lost persistent surface transition names: ${JSON.stringify(snapshot.surfaces)}`);
      }

      const expectedBrandHref = expectedHome(snapshot.path);
      if (snapshot.surfaces.brandHref !== expectedBrandHref) {
        throw new Error(
          `${step.label} left the persistent brand link stale: expected ${expectedBrandHref}, got ${snapshot.surfaces.brandHref}`
        );
      }

      routeSummary.push({
        banner: snapshot.surfaces.bannerPresent ? snapshot.surfaces.banner : null,
        brandHref: snapshot.surfaces.brandHref,
        events: summarizeEvents(snapshot.routeState.events, previousEventCount),
        footerLinks: snapshot.surfaces.footerLinks,
        href: clickResult.href,
        label: step.label,
        path: snapshot.path,
      });
    }

    if (page.runtimeErrors.length > 0) {
      throw new Error(`Chromium runtime exceptions: ${JSON.stringify(page.runtimeErrors)}`);
    }

    console.log(JSON.stringify({
      console: page.console,
      routeCount: routeSummary.length,
      routeSummary,
    }, null, 2));

    page.close();
  } finally {
    await cleanup();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
