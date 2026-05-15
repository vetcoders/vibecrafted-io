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
  'src/components/sections/HeroSection.astro': read('src/components/sections/HeroSection.astro'),
};
const frameworkSection = read('src/components/sections/SectionFramework.astro');
// Etap B migration: hero copy moved from `src/lib/i18n/en.ts` (landingV2.hero)
// to the content collection `src/content/i18n/en/hero-v2.md`. Smoke now reads
// the markdown directly so the assertions stay tied to the canonical source.
const englishCopy = read('src/content/i18n/en/hero-v2.md');
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
assert.doesNotMatch(
  heroSection,
  /hero\.heading\.mid\}\s*<em class="accent">/,
  'Hero title must not color the final word; the brand dot owns the accent.',
);
assert.match(
  heroSection,
  /hero__heading-em-last[\s\S]*hero__heading-dot/,
  'Hero final punctuation should stay a separate brand-dot accent.',
);
assert.match(
  heroSection,
  /\.hero__heading-em-first \{[\s\S]*color:\s*var\(--accent\)/,
  'Hero emFirst (AI-built / w produkt) should keep the gold accent.',
);
assert.match(englishCopy, /emFirst:\s*"AI-built"/, 'English hero should say AI-built.');
assert.doesNotMatch(englishCopy, /AI-developed/, 'English hero should not use ambiguous AI-developed wording.');
assert.match(
  englishCopy,
  /The vibe hangover is what comes after the demo:/,
  'English hero should explain vibe hangover before the page introduces more vocabulary.',
);

console.log('Scroll flow smoke passed: soft settle, clickable operator tiles, hero dot, AI-built accent, and plain-language vibe hangover framing are intact.');
