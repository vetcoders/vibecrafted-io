/**
 * Product-story gate — the judge for the Homepage Product Stage.
 *
 * Authority: docs/roadmap/HOMEPAGE_PRODUCT_STAGE_SPEC.md (accepted) and the plan contract
 * ~/.vibecrafted/artifacts/vetcoders/vibecrafted-io/2026_0822/plans/homepage-product-stage/contracts/scene-protocol.md
 *
 * Two phases:
 *   1. static  — source-level shape (fails fast, no browser needed)
 *   2. browser — real Chromium over CDP against `dist` (run `npx astro build` first)
 *
 * Workers in the homepage-product-stage dispatch may not edit this file.
 * Usage: CHROMIUM_BIN=/Applications/Chromium.app/Contents/MacOS/Chromium node check-product-story.mjs
 *        node check-product-story.mjs --static-only
 */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { existsSync, readFileSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import net from 'node:net';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const DIST_DIR = path.join(here, 'dist');
const STATIC_ONLY = process.argv.includes('--static-only');
const DEFAULT_CHROMIUM = '/Applications/Chromium.app/Contents/MacOS/Chromium';
const CHROMIUM_BIN =
  process.env.CHROMIUM_BIN ?? (existsSync(DEFAULT_CHROMIUM) ? DEFAULT_CHROMIUM : 'chromium');

const SCENE_IDS = [
  'receipt',
  'sessions',
  'install',
  'drift',
  'orient',
  'lifecycle',
  'observe',
  'run',
  'proof',
];

/** Spec "Page choreography", renumbered. scene=null is tolerated only where marked optional. */
const EXPECTED_BEATS = [
  { id: 'hero', stage: 'on', scene: 'receipt', required: true },
  { id: 'surface', stage: 'on', scene: 'sessions', required: false },
  { id: 'install-manifest', stage: 'on', scene: 'install', required: false },
  { id: 'problem', stage: 'on', scene: 'drift', required: false },
  { id: 'engineering', stage: 'on', scene: 'orient', required: false },
  { id: 'shift', stage: 'off', scene: null, required: true },
  { id: 'framework', stage: 'on', scene: 'lifecycle', required: true },
  { id: 'operator', stage: 'on', scene: 'observe', required: false },
  { id: 'quickstart', stage: 'on', scene: 'run', required: false },
  { id: 'references', stage: 'off', scene: null, required: true },
  { id: 'evidence', stage: 'on', scene: 'proof', required: true },
  { id: 'commercial', stage: 'off', scene: null, required: true },
];

const SPINE_SCENES = ['receipt', 'lifecycle', 'proof'];
const ACK_TIMEOUT_MS = 2000;

function read(rel) {
  return readFileSync(path.join(here, rel), 'utf8');
}

function exists(rel) {
  return existsSync(path.join(here, rel));
}

function fail(message) {
  throw new Error(message);
}

function ok(message) {
  console.log(`✓ ${message}`);
}

// ───────────────────────────────────────────────────────────────────────────
// Phase 1 — static
// ───────────────────────────────────────────────────────────────────────────

async function staticPhase() {
  const hero = read('src/components/sections/HeroSectionV2.svelte');
  assert.doesNotMatch(
    hero,
    /<iframe/i,
    'hero still owns the iframe — the stage must be page-owned (HeroSectionV2 contains <iframe).',
  );
  assert.doesNotMatch(
    hero,
    /hero__stage/,
    'HeroSectionV2 still carries stage sizing rules (hero__stage).',
  );
  ok('hero is copy + CTA only');

  for (const rel of [
    'src/lib/product-story.ts',
    'src/components/landing/LandingProductStory.astro',
    'src/components/landing/StoryBeat.astro',
    'src/components/landing/ProductStage.svelte',
  ]) {
    assert.ok(exists(rel), `missing required surface: ${rel}`);
  }
  ok('landing surfaces exist');

  let story;
  try {
    story = await import(pathToFileURL(path.join(here, 'src/lib/product-story.ts')).href);
  } catch (error) {
    fail(
      `src/lib/product-story.ts must be importable by node with type stripping (plain TS, no enums/namespaces): ${error.message}`,
    );
  }
  const { BEATS, SCENES } = story;
  assert.ok(Array.isArray(BEATS), 'product-story.ts must export BEATS (array)');
  assert.ok(Array.isArray(SCENES), 'product-story.ts must export SCENES (array)');
  assert.deepEqual([...SCENES].sort(), [...SCENE_IDS].sort(), 'SCENES must be exactly the nine spec scene IDs');
  assert.equal(BEATS.length, EXPECTED_BEATS.length, `BEATS must declare ${EXPECTED_BEATS.length} beats`);
  EXPECTED_BEATS.forEach((expected, index) => {
    const beat = BEATS[index];
    assert.equal(beat?.id, expected.id, `BEATS[${index}].id must be ${expected.id}`);
    assert.equal(beat?.stage, expected.stage, `BEATS[${index}] (${expected.id}) stage must be ${expected.stage}`);
    if (expected.stage === 'off') {
      assert.ok(beat.scene == null, `off beat ${expected.id} must not carry a scene`);
    } else if (expected.required) {
      assert.equal(beat.scene, expected.scene, `beat ${expected.id} must carry scene ${expected.scene}`);
    } else {
      assert.ok(
        beat.scene == null || beat.scene === expected.scene,
        `beat ${expected.id} scene must be ${expected.scene} or null, got ${beat.scene}`,
      );
    }
  });
  ok('BEATS matrix matches the spec choreography');

  const playground = read('public/playground/index.html');
  for (const type of ['vc.playground.scene.v1', 'vc.playground.ready.v1', 'vc.playground.scene-ack.v1']) {
    assert.ok(playground.includes(type), `playground must speak ${type}`);
  }
  for (const scene of SCENE_IDS) {
    assert.ok(
      new RegExp(`["'\`]${scene}["'\`]`).test(playground),
      `playground must name scene "${scene}" (full nine-name union, even if unscripted)`,
    );
  }
  assert.ok(
    /event\.origin\s*[!=]==?\s*(location|window\.location)\.origin|location\.origin\s*[!=]==?\s*event\.origin/.test(playground),
    'playground must validate event.origin against location.origin',
  );
  ok('playground protocol surface present');

  const stageSource = read('src/components/landing/ProductStage.svelte');
  assert.ok(stageSource.includes('vc.playground.scene.v1'), 'ProductStage must send vc.playground.scene.v1');
  assert.ok(stageSource.includes('vc.playground.ready.v1'), 'ProductStage must wait for vc.playground.ready.v1');
  assert.ok(stageSource.includes('vc.playground.scene-ack.v1'), 'ProductStage must consume vc.playground.scene-ack.v1');
  assert.ok(/event\.source\s*[!=]==?\s*/.test(stageSource), 'ProductStage must validate event.source === iframe.contentWindow');
  assert.ok(stageSource.includes('IntersectionObserver'), 'ProductStage must select beats with IntersectionObserver');
  assert.ok(stageSource.includes('vc:product-stage'), 'ProductStage must dispatch vc:product-stage events');
  assert.ok(stageSource.includes('vc:search-state'), 'ProductStage must listen for vc:search-state');
  ok('ProductStage protocol surface present');

  const search = read('src/components/SearchShellV2.svelte');
  assert.ok(search.includes('vc:search-state'), 'SearchShellV2 must dispatch vc:search-state on open/close');

  for (const page of ['src/pages/en/index.astro', 'src/pages/pl/index.astro']) {
    const source = read(page);
    assert.ok(source.includes('LandingProductStory'), `${page} must compose through LandingProductStory`);
    assert.doesNotMatch(source, /<iframe/i, `${page} must not mount its own iframe`);
  }
  ok('EN and PL homepages compose through the page owner');

  assert.ok(
    !existsSync(path.join(repoRoot, 'assets/playground/vibecrafted-playground.html')),
    'assets/playground/vibecrafted-playground.html twin must be deleted (git rm)',
  );
  ok('playground twin absent');

  for (const rel of ['src/layouts/LayoutV2.astro', 'src/components/SectionShell.astro']) {
    const source = read(rel);
    assert.doesNotMatch(
      source,
      /product-stage|product-story|data-beat|story-beat/i,
      `${rel} must carry no homepage story controller state`,
    );
  }
  ok('LayoutV2 and SectionShell untouched by story state');

  const sources = [
    'src/components/landing/ProductStage.svelte',
    'src/components/landing/LandingProductStory.astro',
    'src/components/landing/StoryBeat.astro',
    'src/components/sections/HeroSectionV2.svelte',
    'src/layouts/LayoutV2.astro',
  ].map((rel) => [rel, read(rel)]);
  for (const [rel, source] of sources) {
    assert.doesNotMatch(source, /scroll-snap-type:\s*y\b/i, `${rel} reintroduced vertical scroll snapping`);
    assert.doesNotMatch(source, /scroll-snap-stop/i, `${rel} reintroduced snap stops`);
    assert.doesNotMatch(
      source,
      /addEventListener\(\s*['"](wheel|touchmove)['"][\s\S]{0,200}preventDefault/,
      `${rel} hijacks native scrolling`,
    );
  }
  ok('no scroll-jacking');

  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.scripts?.['smoke:product-story'], 'node check-product-story.mjs', 'package.json must expose smoke:product-story');
  assert.ok(
    (pkg.scripts?.build ?? '').includes('node check-product-story.mjs'),
    'package.json build must run check-product-story.mjs',
  );
  ok('package.json wired');

  return { BEATS };
}

// ───────────────────────────────────────────────────────────────────────────
// Phase 2 — browser (CDP)
// ───────────────────────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
}

async function getFreePort() {
  return new Promise((resolvePromise, rejectPromise) => {
    const server = net.createServer();
    server.on('error', rejectPromise);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close((error) => (error ? rejectPromise(error) : resolvePromise(address.port)));
    });
  });
}

async function waitFor(test, timeoutMs, label) {
  const startedAt = Date.now();
  let last;
  while (Date.now() - startedAt < timeoutMs) {
    last = await test();
    if (last) return last;
    await delay(100);
  }
  throw new Error(`Timed out (${timeoutMs}ms) waiting for ${label}.`);
}

async function waitForExit(child) {
  if (child.exitCode !== null) return;
  await once(child, 'exit');
}

class CdpPage {
  constructor(socketUrl) {
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
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      if (message.method === 'Runtime.exceptionThrown') {
        const details = message.params.exceptionDetails;
        this.runtimeErrors.push(details.exception?.description ?? details.text ?? 'Unknown runtime exception');
      }
    });
  }

  async open() {
    await new Promise((resolvePromise, rejectPromise) => {
      this.socket.addEventListener('open', resolvePromise, { once: true });
      this.socket.addEventListener('error', () => rejectPromise(new Error('DevTools socket failed')), { once: true });
    });
  }

  close() {
    if (this.socket.readyState === WebSocket.OPEN) this.socket.close();
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolvePromise, rejectPromise) => {
      this.pending.set(id, { resolve: resolvePromise, reject: rejectPromise });
    });
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', { awaitPromise: true, expression, returnByValue: true });
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text ?? 'Evaluation failed.');
    }
    return result.result.value;
  }

  async navigate(url) {
    await this.send('Page.navigate', { url });
    await waitFor(
      () => this.evaluate('document.readyState === "complete"').catch(() => false),
      15000,
      `load of ${url}`,
    );
  }

  async viewport(width, height, mobile = false) {
    await this.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
  }

  async reducedMotion(enabled) {
    await this.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: enabled ? 'reduce' : 'no-preference' }],
    });
  }
}

const PROBE = `
  (() => {
    window.__vcStory = [];
    document.addEventListener('vc:product-stage', (event) => {
      window.__vcStory.push({ ...(event.detail || {}), t: performance.now() });
    });
  })();
`;

const STAGE_SNAPSHOT = `
  (() => {
    const stage = document.querySelector('[data-product-stage]');
    if (!stage) return null;
    const rect = stage.getBoundingClientRect();
    const iframe = stage.querySelector('iframe');
    return {
      state: stage.getAttribute('data-stage-state'),
      beat: stage.getAttribute('data-active-beat'),
      scene: stage.getAttribute('data-active-scene'),
      searchOpen: stage.getAttribute('data-search-open'),
      inert: stage.hasAttribute('inert'),
      ariaHidden: stage.getAttribute('aria-hidden'),
      top: rect.top, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height,
      position: getComputedStyle(stage).position,
      innerHeight: window.innerHeight, innerWidth: window.innerWidth,
      iframeMark: iframe && iframe.contentWindow ? iframe.contentWindow.__vcMark ?? null : null,
      events: (window.__vcStory || []).length,
    };
  })()
`;

function scrollToBeat(id) {
  return `
    (() => {
      const el = document.querySelector('[data-story-beat][data-beat="${id}"]');
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2);
      return true;
    })()
  `;
}

async function settleBeat(page, beat, expected, label) {
  const found = await page.evaluate(scrollToBeat(beat.id));
  assert.ok(found, `${label}: beat wrapper for ${beat.id} missing`);
  const startedAt = Date.now();
  await waitFor(async () => {

    const s = await page.evaluate(STAGE_SNAPSHOT);
    if (!s) return null;
    if (s.beat !== beat.id) return null;
    if (expected.stage === 'off') return s.state === 'off' ? s : null;
    if (s.state !== 'on') return null;
    if (SPINE_SCENES.includes(expected.scene) && s.scene !== expected.scene) return null;
    return s;
  }, 6000, `${label}: stage to settle on beat ${beat.id}`).catch(async (error) => {
    const s = await page.evaluate(STAGE_SNAPSHOT);
    throw new Error(`${error.message} — last snapshot ${JSON.stringify(s)}`);
  });
  if (SPINE_SCENES.includes(expected.scene)) {
    const sceneAckMs = Date.now() - startedAt;
    assert.ok(
      sceneAckMs <= ACK_TIMEOUT_MS + 4000,
      `${label}: scene ${expected.scene} on ${beat.id} took ${sceneAckMs}ms (ACK budget ${ACK_TIMEOUT_MS}ms + travel)`,
    );
  }
  // let the travel transition finish before measuring geometry
  await delay(expected.stage === 'off' ? 600 : 520);
  return page.evaluate(STAGE_SNAPSHOT);
}

async function browserPhase(BEATS) {
  assert.ok(existsSync(path.join(DIST_DIR, 'en', 'index.html')), 'dist/en/index.html missing — run `npx astro build` before the browser phase');
  assert.ok(existsSync(path.join(DIST_DIR, 'playground', 'index.html')), 'dist/playground/index.html missing');

  const httpPort = await getFreePort();
  const debugPort = await getFreePort();
  const baseUrl = `http://127.0.0.1:${httpPort}`;
  const profile = await mkdtemp(path.join(tmpdir(), 'vc-product-story-'));

  const server = spawn('python3', ['-m', 'http.server', String(httpPort), '--bind', '127.0.0.1', '--directory', DIST_DIR], {
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  const browser = spawn(
    CHROMIUM_BIN,
    [
      '--headless=new',
      '--disable-gpu',
      '--disable-background-networking',
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      '--remote-debugging-address=127.0.0.1',
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${profile}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );
  let browserStderr = '';
  browser.stderr.on('data', (chunk) => {
    browserStderr += String(chunk);
  });

  const cleanup = async () => {
    browser.kill('SIGTERM');
    server.kill('SIGTERM');
    await Promise.allSettled([waitForExit(browser), waitForExit(server), rm(profile, { force: true, recursive: true })]);
  };

  try {
    await waitFor(() => fetch(`${baseUrl}/en/`).then(() => true).catch(() => false), 8000, 'static server');
    const targets = await waitFor(
      () =>
        fetch(`http://127.0.0.1:${debugPort}/json/list`)
          .then((r) => r.json())
          .then((list) => (Array.isArray(list) && list.find((t) => t.type === 'page') ? list : null))
          .catch(() => null),
      10000,
      'Chromium DevTools target',
    ).catch((error) => {
      throw new Error(`${error.message} (CHROMIUM_BIN=${CHROMIUM_BIN}) ${browserStderr.slice(-400)}`);
    });
    const page = new CdpPage(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
    await page.open();
    await page.send('Page.enable');
    await page.send('Runtime.enable');
    await page.send('Page.addScriptToEvaluateOnNewDocument', { source: PROBE });

    const expectedById = new Map(EXPECTED_BEATS.map((b) => [b.id, b]));

    // ── DOM contract on EN and PL ─────────────────────────────────────────
    await page.viewport(1440, 900);
    const domFor = async (lang) => {
      await page.navigate(`${baseUrl}/${lang}/`);
      return page.evaluate(`
        (() => ({
          owners: document.querySelectorAll('[data-product-story]').length,
          stages: document.querySelectorAll('[data-product-stage]').length,
          iframes: document.querySelectorAll('iframe').length,
          stageIframes: document.querySelectorAll('[data-product-stage] iframe[src="/playground/index.html?embed=1"]').length,
          beats: Array.from(document.querySelectorAll('[data-story-beat]')).map((el) => ({
            id: el.getAttribute('data-beat'),
            stage: el.getAttribute('data-stage'),
            scene: el.getAttribute('data-scene') || null,
          })),
        }))()
      `);
    };
    const enDom = await domFor('en');
    assert.equal(enDom.owners, 1, 'EN: exactly one [data-product-story] owner');
    assert.equal(enDom.stages, 1, 'EN: exactly one [data-product-stage]');
    assert.equal(enDom.iframes, 1, `EN: exactly one iframe on the homepage (found ${enDom.iframes})`);
    assert.equal(enDom.stageIframes, 1, 'EN: the iframe must live inside the stage with src=/playground/index.html?embed=1');
    assert.deepEqual(
      enDom.beats.map((b) => [b.id, b.stage]),
      EXPECTED_BEATS.map((b) => [b.id, b.stage]),
      'EN: beat order / stage modes must match the choreography',
    );
    for (const b of enDom.beats) {
      const e = expectedById.get(b.id);
      if (e.stage === 'on' && e.required) assert.equal(b.scene, e.scene, `EN: beat ${b.id} must declare scene ${e.scene}`);
    }
    const plDom = await domFor('pl');
    assert.deepEqual(plDom.beats, enDom.beats, 'PL and EN must declare identical beats/stage/scene');
    assert.equal(plDom.iframes, 1, 'PL: exactly one iframe');
    ok('DOM contract holds on /en/ and /pl/');

    // ── Desktop choreography at three viewports ───────────────────────────
    for (const [width, height] of [[1440, 900], [1280, 800], [1024, 768]]) {
      const label = `${width}x${height}`;
      await page.viewport(width, height);
      await page.reducedMotion(false);
      await page.navigate(`${baseUrl}/en/`);
      await page.evaluate('window.scrollTo(0, 0)');
      await waitFor(async () => {
        const s = await page.evaluate(STAGE_SNAPSHOT);
        return s && s.state === 'on' && s.scene === 'receipt' ? s : null;
      }, 8000, `${label}: receipt scene at the top`).catch(async (error) => {
        const s = await page.evaluate(STAGE_SNAPSHOT);
        throw new Error(`${error.message} — snapshot ${JSON.stringify(s)}`);
      });
      await page.evaluate(`document.querySelector('[data-product-stage] iframe').contentWindow.__vcMark = 'mark-${label}'`);
      const first = await page.evaluate(STAGE_SNAPSHOT);
      assert.equal(first.position, 'sticky', `${label}: desktop stage must be position: sticky (got ${first.position})`);

      const tops = [];
      const down = [];
      for (const beat of BEATS) {
        const expected = expectedById.get(beat.id);
        const snap = await settleBeat(page, beat, expected, `${label} ↓`);
        down.push([beat.id, snap.state, snap.scene]);
        if (expected.stage === 'on') {
          tops.push([beat.id, snap.top]);
          assert.ok(!snap.inert && snap.ariaHidden !== 'true', `${label}: stage must not be inert on ${beat.id}`);
          assert.ok(snap.top >= 0 && snap.bottom <= snap.innerHeight + 1, `${label}: stage must be fully inside the viewport on ${beat.id} (top ${snap.top}, bottom ${snap.bottom})`);
        } else {
          assert.ok(snap.inert, `${label}: stage must be inert on off beat ${beat.id}`);
          assert.equal(snap.ariaHidden, 'true', `${label}: stage must be aria-hidden on off beat ${beat.id}`);
          assert.ok(snap.top >= snap.innerHeight - 1, `${label}: stage must be fully below the viewport on ${beat.id} (top ${snap.top} < ${snap.innerHeight})`);
        }
        assert.equal(snap.iframeMark, `mark-${label}`, `${label}: iframe document was recreated/reloaded at beat ${beat.id}`);
      }
      const topValues = tops.map(([, t]) => t);
      const spread = Math.max(...topValues) - Math.min(...topValues);
      assert.ok(spread <= 2, `${label}: visible stage top drifts ${spread.toFixed(1)}px across on-beats (${JSON.stringify(tops)})`);

      // reverse direction restores scenes deterministically
      for (const beat of [...BEATS].reverse()) {
        const expected = expectedById.get(beat.id);
        await settleBeat(page, beat, expected, `${label} ↑`);
      }
      const backAtTop = await page.evaluate(STAGE_SNAPSHOT);
      assert.equal(backAtTop.scene, 'receipt', `${label}: scrolling back to the hero must restore the receipt scene`);
      assert.equal(backAtTop.iframeMark, `mark-${label}`, `${label}: iframe reloaded during reverse scroll`);
      ok(`${label}: choreography down + up, stage stable (${spread.toFixed(1)}px), iframe identity constant`);
    }

    // ── Search coordination (1440x900) ────────────────────────────────────
    await page.viewport(1440, 900);
    await page.navigate(`${baseUrl}/en/`);
    await page.evaluate(scrollToBeat('hero'));
    await waitFor(async () => {
      const s = await page.evaluate(STAGE_SNAPSHOT);
      return s && s.state === 'on' ? s : null;
    }, 8000, 'stage on before search test');
    const trigger = await page.evaluate(`
      (() => {
        const el = document.querySelector('.v2search__trigger, [data-search-trigger], .v2search button');
        if (!el) return false;
        el.click();
        return true;
      })()
    `);
    assert.ok(trigger, 'search trigger not found (.v2search__trigger)');
    const opened = await waitFor(async () => {
      const s = await page.evaluate(STAGE_SNAPSHOT);
      return s && s.searchOpen === 'true' ? s : null;
    }, 3000, 'data-search-open="true" after opening search');
    assert.ok(opened.inert, 'stage must be inert while search is open');
    await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    const closed = await waitFor(async () => {
      const s = await page.evaluate(STAGE_SNAPSHOT);
      return s && s.searchOpen === 'false' && !s.inert ? s : null;
    }, 3000, 'stage to reclaim after Escape closes search');
    assert.equal(closed.state, 'on', 'stage must be back on after search closes');
    ok('search open/close coordinates with the stage');

    // ── Reduced motion ────────────────────────────────────────────────────
    await page.reducedMotion(true);
    await page.navigate(`${baseUrl}/en/`);
    const framework = BEATS.find((b) => b.id === 'framework');
    await settleBeat(page, framework, expectedById.get('framework'), 'reduced-motion');
    const motion = await page.evaluate(`
      (() => {
        const stage = document.querySelector('[data-product-stage]');
        const cs = getComputedStyle(stage);
        const durations = cs.transitionDuration.split(',').map((d) => parseFloat(d) || 0);
        return { maxTransition: Math.max(...durations), animation: cs.animationName };
      })()
    `);
    assert.equal(motion.maxTransition, 0, `reduced motion: stage transition-duration must be 0 (got ${motion.maxTransition}s)`);
    assert.ok(motion.animation === 'none' || !motion.animation, 'reduced motion: stage must not animate');
    await page.reducedMotion(false);
    ok('reduced motion: scene changes immediate, no stage travel');

    // ── Mobile 390x844 ────────────────────────────────────────────────────
    await page.viewport(390, 844, true);
    await page.navigate(`${baseUrl}/en/`);
    await page.evaluate('window.scrollTo(0, 0)');
    await delay(400);
    const mobile = await page.evaluate(`
      (() => {
        const stage = document.querySelector('[data-product-stage]');
        const iframe = stage && stage.querySelector('iframe');
        const h1 = document.querySelector('#hero h1, [data-beat="hero"] h1');
        const nav = document.querySelector('.v2nav, nav');
        const search = document.querySelector('.v2search');
        const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: b.top, bottom: b.bottom, left: b.left, right: b.right }; };
        const inner = iframe && iframe.contentDocument;
        const cmdRow = inner && inner.querySelector('.inline');
        const status = inner && inner.querySelector('.statusbar');
        const ir = r(iframe);
        const offset = (el) => { if (!el || !ir) return null; const b = el.getBoundingClientRect(); return { top: ir.top + b.top, bottom: ir.top + b.bottom, left: ir.left + b.left, right: ir.left + b.right }; };
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          iframes: document.querySelectorAll('iframe').length,
          stagePosition: stage ? getComputedStyle(stage).position : null,
          iframe: ir, h1: r(h1), nav: r(nav), search: r(search), cmdRow: offset(cmdRow), status: offset(status),
          iframeFound: Boolean(iframe), innerFound: Boolean(inner && cmdRow),
        };
      })()
    `);
    assert.ok(mobile.scrollWidth <= mobile.innerWidth, `390px: horizontal overflow (scrollWidth ${mobile.scrollWidth} > innerWidth ${mobile.innerWidth})`);
    assert.equal(mobile.iframes, 1, '390px: the simulator must appear exactly once');
    assert.ok(mobile.iframeFound && mobile.h1, '390px: stage iframe and hero h1 must exist');
    assert.ok(mobile.iframe.top >= mobile.h1.bottom, '390px: the simulator must sit after the hero copy');
    assert.ok(!['sticky', 'fixed'].includes(mobile.stagePosition), `390px: no sticky/fixed product column (got ${mobile.stagePosition})`);
    // scroll the simulator into view under the nav and check chrome overlap
    await page.evaluate(`
      (() => {
        const iframe = document.querySelector('[data-product-stage] iframe');
        const nav = document.querySelector('.v2nav, nav');
        const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
        window.scrollTo(0, window.scrollY + iframe.getBoundingClientRect().top - navBottom - 8);
      })()
    `);
    await delay(400);
    const overlap = await page.evaluate(`
      (() => {
        const iframe = document.querySelector('[data-product-stage] iframe');
        const inner = iframe.contentDocument;
        const r = (el) => { const b = el.getBoundingClientRect(); return { top: b.top, bottom: b.bottom, left: b.left, right: b.right }; };
        const ir = r(iframe);
        const off = (el) => { const b = el.getBoundingClientRect(); return { top: ir.top + b.top, bottom: ir.top + b.bottom, left: ir.left + b.left, right: ir.left + b.right }; };
        const boxes = {
          nav: r(document.querySelector('.v2nav, nav')),
          search: r(document.querySelector('.v2search')),
          cmd: off(inner.querySelector('.inline')),
          status: off(inner.querySelector('.statusbar')),
        };
        const hit = (a, b) => a && b && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
        const pairs = [['nav','cmd'],['nav','status'],['search','cmd'],['search','status']];
        return { boxes, collisions: pairs.filter(([a, b]) => hit(boxes[a], boxes[b])) };
      })()
    `);
    assert.deepEqual(overlap.collisions, [], `390px: chrome overlaps the simulator: ${JSON.stringify(overlap)}`);
    ok('390x844: no horizontal overflow, simulator once in flow, no chrome overlap');

    // ── No JavaScript ─────────────────────────────────────────────────────
    await page.viewport(1440, 900);
    await page.send('Emulation.setScriptExecutionDisabled', { value: true });
    await page.navigate(`${baseUrl}/en/`);
    await delay(300);
    const nojs = await page.evaluate(`
      (() => {
        const stage = document.querySelector('[data-product-stage]');
        const beats = Array.from(document.querySelectorAll('[data-story-beat]'));
        const hidden = beats.filter((el) => {
          const cs = getComputedStyle(el);
          return cs.opacity === '0' || cs.visibility === 'hidden' || cs.display === 'none';
        }).map((el) => el.getAttribute('data-beat'));
        const fades = Array.from(document.querySelectorAll('[data-scroll-fade]')).filter((el) => getComputedStyle(el).opacity === '0').length;
        return {
          iframes: document.querySelectorAll('iframe').length,
          stagePosition: stage ? getComputedStyle(stage).position : null,
          hiddenBeats: hidden,
          fadedOut: fades,
          textLength: document.body.innerText.length,
        };
      })()
    `).catch(() => null);
    await page.send('Emulation.setScriptExecutionDisabled', { value: false });
    assert.ok(nojs, 'no-JS: page must still evaluate (Runtime.evaluate is allowed with script execution disabled)');
    assert.equal(nojs.iframes, 1, 'no-JS: one simulator in document flow');
    assert.ok(!['sticky', 'fixed'].includes(nojs.stagePosition), `no-JS: stage must be in flow (got ${nojs.stagePosition})`);
    assert.deepEqual(nojs.hiddenBeats, [], `no-JS: hidden beats ${JSON.stringify(nojs.hiddenBeats)}`);
    assert.equal(nojs.fadedOut, 0, `no-JS: ${nojs.fadedOut} [data-scroll-fade] surfaces are opacity 0`);
    ok('no-JS: copy visible, one simulator in flow');

    if (page.runtimeErrors.length > 0) {
      fail(`Chromium runtime exceptions: ${JSON.stringify(page.runtimeErrors.slice(0, 5))}`);
    }
    page.close();
  } finally {
    await cleanup();
  }
}

// ───────────────────────────────────────────────────────────────────────────

try {
  const { BEATS } = await staticPhase();
  if (STATIC_ONLY) {
    console.log('Product story static gates passed (browser phase skipped: --static-only).');
  } else {
    await browserPhase(BEATS);
    console.log('Product story gates passed: one page-owned stage, scene protocol, off/on travel, mobile, reduced motion, no-JS.');
  }
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exitCode = 1;
}
