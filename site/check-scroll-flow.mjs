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
  'LayoutV2 should keep the settle runtime flag so a later enable does not double-bind.',
);
assert.match(
  verticalScrollSurfaces['src/layouts/LayoutV2.astro'],
  /Soft section-settle is disabled/,
  'Section settle stays stubbed — it fought landing layout.',
);
assert.doesNotMatch(
  verticalScrollSurfaces['src/layouts/LayoutV2.astro'],
  /settled\.add\(best\.key\)/,
  'Live settle magnet must stay gone while the stub is in place.',
);
assert.doesNotMatch(
  verticalScrollSurfaces['src/layouts/LayoutV2.astro'],
  /body\.v2-scope::before/,
  'Page grain overlay must stay gone — consoles do not stamp scanlines.',
);
assert.doesNotMatch(
  verticalScrollSurfaces['src/components/SectionShell.astro'],
  /repeating-linear-gradient/,
  'Section shell must not carry blueprint scanlines.',
);
assert.match(
  verticalScrollSurfaces['src/components/SectionShell.astro'],
  /height:\s*100dvh/,
  'Landing sections are one viewport tall; they do not grow with content.',
);
assert.match(
  read('src/styles/tokens-v2.css'),
  /--v2-section-padding-y-top:\s*80px/,
  'Section padding stays generous — do not crush it to force-fit height.',
);
assert.match(
  read('src/styles/tokens-v2.css'),
  /--v2-section-padding-y-bottom:\s*80px/,
  'Section bottom padding stays 80px with the height frame.',
);
assert.match(
  verticalScrollSurfaces['src/layouts/LayoutV2.astro'],
  /@media print/i,
  'LayoutV2 must hide decor and force reveal-visible in print.',
);
assert.match(
  verticalScrollSurfaces['src/layouts/LayoutV2.astro'],
  /max-aspect-ratio:\s*1\/3/i,
  'LayoutV2 must treat an extremely tall capture viewport as print.',
);
assert.match(
  verticalScrollSurfaces['src/layouts/LayoutV2.astro'],
  /shouldSkipFade/,
  'Scroll-fade runtime must refuse to dim content on print/capture viewports.',
);
assert.match(
  verticalScrollSurfaces['src/components/sections/HeroSectionV2.svelte'],
  /data-decor/,
  'Hero vignette must be marked decorative so print/capture can drop it.',
);
assert.doesNotMatch(
  verticalScrollSurfaces['src/components/sections/HeroSectionV2.svelte'],
  /rgba\(\s*255\s*,\s*255\s*,\s*255/i,
  'Hero vignette must not use opaque-failing white.',
);
assert.match(
  read('src/components/Reveal.svelte'),
  /data-reveal/,
  'Reveal nodes must carry data-reveal for print/no-JS visibility.',
);
assert.match(
  read('src/components/Reveal.svelte'),
  /\.fade-up \{[\s\S]*opacity:\s*1/,
  'Reveal must default visible; JS only adds the pending hide.',
);
assert.doesNotMatch(
  read('src/components/Reveal.svelte'),
  /\.fade-up \{\s*opacity:\s*0/,
  'Reveal must not start at opacity 0.',
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
  /hero\.heading\.pre\}<span class="hero__heading-dot">/,
  'Hero mid-phrase lead-in must not carry a brand-colored period.',
);
assert.match(
  heroSection,
  /src="\/playground\/index\.html\?embed=1"/,
  'Hero pins the command playground, not a screenshot with fake chrome.',
);
assert.doesNotMatch(
  heroSection,
  /\.hero__heading-accent \{[\s\S]*color:\s*var\(--accent\)/,
  'Hero accent word must not be colored; the brand dot owns the accent.',
);
assert.match(
  englishCopy,
  /pre:\s*"AI can write\."/,
  'English hero should lead with the writing problem, not the category label.',
);
assert.match(
  englishCopy,
  /accent:\s*"Evidence decides\."/,
  'English hero should close on evidence, not a receipt slogan.',
);
assert.match(
  polishCopy,
  /pre:\s*"AI potrafi pisać\."/,
  'Polish hero should lead with the writing problem, not the category label.',
);
assert.match(
  polishCopy,
  /accent:\s*"Dowód rozstrzyga\."/,
  'Polish hero should close on evidence, not a receipt slogan.',
);
assert.match(
  englishCopy,
  /structural vision, durable intent, and a mouth that posts/,
  'English hero should name sight, memory, and mouth — not a generic agent launcher.',
);
assert.match(
  englishCopy,
  /loct impact · aicx search · \/vc grok send · vc justdo/,
  'English hero should show the four-cut commands.',
);
assert.match(
  polishCopy,
  /wizję struktury, trwałą intencję i usta, które postują/,
  'Polish hero should name sight, memory, and mouth — not a generic agent launcher.',
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

console.log('Scroll flow smoke passed: soft settle, clickable operator tiles, hero dot, operating-runtime definition, and anti-price axis are intact.');
