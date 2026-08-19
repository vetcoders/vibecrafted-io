/**
 * Static gate: exactly one decorative chrome around product captures.
 * Complements check-floating-frame.mjs (helpers + wiring).
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

function read(rel) {
  return readFileSync(path.join(here, rel), 'utf8');
}

const hero = read('src/components/sections/HeroSectionV2.svelte');
const product = read('src/components/sections/SectionProductSurface.astro');
const floating = read('src/components/FloatingProductProof.svelte');
const css = read('src/styles/terminal-window.css');

// One titlebar layer in hero markup (not nested termwin shells)
const heroTitlebars = (hero.match(/vc-termwin__titlebar/g) || []).length;
assert.equal(heroTitlebars, 1, `Hero should have exactly one titlebar pattern, got ${heroTitlebars}`);

const heroBodies = (hero.match(/vc-termwin__body/g) || []).length;
assert.equal(heroBodies, 1, 'Hero should have one chrome body for the capture fill.');

// Product surface: TerminalWindow for tiles + FloatingProductProof for lead
assert.match(product, /import TerminalWindow from/);
assert.match(product, /import FloatingProductProof from/);
assert.match(product, /client:visible/);
assert.match(product, /section\.shots/);

// Floating: single titlebar + resize + multi-shot tabs
assert.equal(
  (floating.match(/vc-termwin__titlebar/g) || []).length,
  1,
  'Floating panel: one titlebar',
);
assert.match(floating, /role="tablist"/);
assert.match(floating, /aria-label="Resize product frame"|aria-label=\{.*Resize/);

// Shared chrome stylesheet still defines the decorative system
assert.match(css, /\.vc-termwin__titlebar/);
assert.match(css, /\.vc-termwin__dot--close/);
assert.match(css, /\.vc-termwin__body img/);

console.log('Product frame structure passed: single decorative chrome on hero + floating + tiles.');
