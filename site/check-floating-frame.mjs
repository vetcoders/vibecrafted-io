/**
 * Unit checks for shipped floating-frame helpers + structural single-chrome rule.
 * Drives real site/src/lib/floating-frame.ts — no reimplementation.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const libUrl = pathToFileURL(path.join(here, 'src/lib/floating-frame.ts')).href;

const {
  applyResize,
  clampPosition,
  clampShotIndex,
  clampSize,
  MIN_PANEL_HEIGHT,
  MIN_PANEL_WIDTH,
  nextShotIndex,
} = await import(libUrl);

// --- pure helpers (real module) ---
assert.deepEqual(clampSize(100, 100), { width: MIN_PANEL_WIDTH, height: MIN_PANEL_HEIGHT });
assert.deepEqual(clampSize(900, 600), { width: 900, height: 600 });
assert.deepEqual(clampSize(2000, 2000, 360, 280, 1000, 800), {
  width: 1000,
  height: 800,
});

const resized = applyResize(
  { x: 10, y: 20, width: 400, height: 300 },
  60,
  80,
  MIN_PANEL_WIDTH,
  MIN_PANEL_HEIGHT,
  2000,
  2000,
);
assert.deepEqual(resized, { width: 450, height: 360 });

const shrunk = applyResize(
  { x: 100, y: 100, width: 400, height: 300 },
  0,
  0,
  MIN_PANEL_WIDTH,
  MIN_PANEL_HEIGHT,
);
assert.equal(shrunk.width, MIN_PANEL_WIDTH);
assert.equal(shrunk.height, MIN_PANEL_HEIGHT);

assert.equal(clampShotIndex(-1, 4), 0);
assert.equal(clampShotIndex(99, 4), 3);
assert.equal(clampShotIndex(2, 4), 2);
assert.equal(clampShotIndex(0, 0), 0);

assert.equal(nextShotIndex(0, 1, 4), 1);
assert.equal(nextShotIndex(3, 1, 4), 0);
assert.equal(nextShotIndex(0, -1, 4), 3);
assert.equal(nextShotIndex(2, 0, 4), 2);

const pos = clampPosition(-40, -10, { width: 400, height: 300 }, 800, 600, 8);
assert.equal(pos.left, 8);
assert.equal(pos.top, 8);
const pos2 = clampPosition(900, 900, { width: 400, height: 300 }, 800, 600, 8);
assert.equal(pos2.left, 800 - 400 - 8);
assert.equal(pos2.top, 600 - 300 - 8);

// --- structural: single decorative chrome (no plate-only, no double shell) ---
function read(rel) {
  return readFileSync(path.join(here, rel), 'utf8');
}

const hero = read('src/components/sections/HeroSectionV2.svelte');
const product = read('src/components/sections/SectionProductSurface.astro');
const floating = read('src/components/FloatingProductProof.svelte');
const termWin = read('src/components/TerminalWindow.astro');

assert.match(hero, /vc-termwin__titlebar/, 'Hero must render decorative titlebar chrome.');
assert.match(hero, /vc-termwin__dot--close/, 'Hero must include traffic lights.');
assert.match(hero, /vc-termwin__body/, 'Hero capture must live in chrome body.');
assert.match(hero, /real-usage\.png/, 'Hero must use real usage capture.');
assert.doesNotMatch(
  hero,
  /class="hero__shot"/,
  'Hero must not use plate-only presentation (over-correction).',
);
assert.match(
  hero,
  /hero\.heading\.pre\}<\/span>/,
  'Hero pre lead-in must not inject brand-dot mid-phrase.',
);
assert.match(
  hero,
  /headingAccentDot[\s\S]*hero__heading-dot/,
  'Brand-dot stays terminator-only on accent.',
);

assert.match(product, /TerminalWindow/, 'Product surface tiles use TerminalWindow shell.');
assert.match(product, /FloatingProductProof/, 'Product surface hosts floating resizable proof.');
assert.doesNotMatch(
  product,
  /ps__plate/,
  'Product surface must not use plate-only presentation.',
);

assert.match(floating, /fpp__resize/, 'Floating proof exposes resize handle.');
assert.match(floating, /applyResize/, 'Floating proof uses shipped resize helper.');
assert.match(floating, /nextShotIndex|selectShot|shotIndex/, 'Floating proof browses multi-shot.');
assert.match(floating, /vc-termwin__titlebar/, 'Floating proof reuses single decorative chrome.');
assert.match(floating, /fpp__img/, 'Floating proof fills body with capture image.');

assert.match(termWin, /vc-termwin__titlebar/, 'TerminalWindow is the shared chrome shell.');
assert.match(termWin, /vc-termwin__body[\s\S]*<img/, 'TerminalWindow body is edge-to-edge image fill.');

const shotsJson = JSON.parse(read('public/assets/product/shots.json'));
assert.ok(Array.isArray(shotsJson) && shotsJson.length >= 2, 'Product shot catalog has multiple assets.');
for (const shot of shotsJson) {
  assert.match(shot.src, /^\/assets\/(product|hero)\//, `Shot ${shot.id} must point at real assets.`);
}

console.log(
  'Floating frame checks passed: clamp/resize/shot helpers + single-chrome structure (hero, surface, floating).',
);
