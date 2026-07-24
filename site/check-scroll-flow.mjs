import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

function read(relativePath) {
  return readFileSync(path.join(here, relativePath), 'utf8');
}

const verticalScrollSurfaces = {
  'src/layouts/LayoutV2.astro': read('src/layouts/LayoutV2.astro'),
  'src/layouts/Layout.astro': read('src/layouts/Layout.astro'),
  'src/styles/global.css': read('src/styles/global.css'),
  'src/components/SectionShell.astro': read('src/components/SectionShell.astro'),
  'src/components/sections/HeroSectionV2.svelte': read('src/components/sections/HeroSectionV2.svelte'),
};
const frameworkSection = read('src/components/sections/SectionFramework.astro');
const englishCopy = read('src/lib/i18n/en.ts');
const polishCopy = read('src/lib/i18n/pl.ts');
const heroSection = verticalScrollSurfaces['src/components/sections/HeroSectionV2.svelte'];

for (const [file, source] of Object.entries(verticalScrollSurfaces)) {
  assert.doesNotMatch(source, /scroll-snap-type:\s*y\b/i, `${file} reintroduced vertical scroll snapping.`);
  assert.doesNotMatch(source, /scroll-snap-align:\s*start/i, `${file} reintroduced section snap alignment.`);
  assert.doesNotMatch(source, /scroll-snap-stop:\s*always/i, `${file} reintroduced hard snap stops.`);
}

assert.match(
  verticalScrollSurfaces['src/layouts/LayoutV2.astro'],
  /scroll-snap-type:\s*none/i,
  'LayoutV2 should explicitly keep vertical snap disabled.',
);
assert.match(
  verticalScrollSurfaces['src/layouts/LayoutV2.astro'],
  /__vcSoftSectionSettleRuntime/,
  'LayoutV2 should keep a soft one-shot section settle runtime.',
);
assert.match(
  verticalScrollSurfaces['src/layouts/LayoutV2.astro'],
  /settled\.add\(best\.key\)/,
  'Section settle should be one-shot per frame, not a permanent scroll magnet.',
);
assert.match(
  verticalScrollSurfaces['src/styles/global.css'],
  /scroll-snap-type:\s*none/i,
  'Global layout should explicitly keep vertical snap disabled.',
);
assert.match(
  frameworkSection,
  /class="framework__op-card"[\s\S]*href=\{playgroundHref\}/,
  'Operator tiles should be real links, not inert button-looking cards.',
);
assert.match(
  heroSection,
  /hero__heading-accent[\s\S]*hero__heading-dot/,
  'Hero final punctuation should stay a separate brand-dot accent.',
);
assert.doesNotMatch(
  heroSection,
  /\.hero__heading-accent \{[\s\S]*color:\s*var\(--accent\)/,
  'Hero accent word must not be colored; the brand dot owns the accent.',
);
assert.match(
  englishCopy,
  /pre:\s*"A factory and a"/,
  'English hero should lead with the factory/multiplexer definition.',
);
assert.match(
  englishCopy,
  /accent:\s*"multiplexer\."/,
  'English hero should close on the multiplexer accent beat.',
);
assert.match(
  polishCopy,
  /pre:\s*"Fabryka i"/,
  'Polish hero should lead with the factory/multiplexer definition.',
);
assert.match(
  polishCopy,
  /accent:\s*"multiplekser\."/,
  'Polish hero should close on the multiplexer accent beat.',
);
assert.match(
  englishCopy,
  /orchestration method and runtime for CLI coding agents/,
  'English hero should define Vibecrafted as CLI-agent orchestration.',
);
assert.match(
  englishCopy,
  /\/vc-ship/,
  'English hero should name /vc-ship as the end-to-end pass.',
);
assert.match(
  polishCopy,
  /metoda i runtime orkiestracji agentów CLI/,
  'Polish hero should define Vibecrafted as CLI-agent orchestration.',
);
assert.doesNotMatch(
  englishCopy,
  /cheapest|cheaper|frontier price|finally tells the truth/i,
  'English copy must not sell price axis or the retired "finally truth" beat.',
);
assert.doesNotMatch(
  polishCopy,
  /najtańsz|stawki frontier|wreszcie mówi/i,
  'Polish copy must not sell price axis or the retired "finally truth" beat.',
);

console.log('Scroll flow smoke passed: soft settle, clickable operator tiles, hero dot, factory/multiplexer definition, and anti-price axis are intact.');
