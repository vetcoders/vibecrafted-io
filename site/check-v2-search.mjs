import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

function read(relativePath) {
  return readFileSync(path.join(here, relativePath), 'utf8');
}

function walkFiles(dir, predicate, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(fullPath, predicate, out);
    else if (predicate(fullPath)) out.push(fullPath);
  }
  return out;
}

const layout = read('src/layouts/LayoutV2.astro');
const shell = read('src/components/SearchShellV2.svelte');
const en = read('src/lib/i18n/en.ts');
const pl = read('src/lib/i18n/pl.ts');
const OLD_SEARCH_PLACEHOLDER_COPY =
  /Full-text search ships in the next iteration|Pełne wyszukiwanie\s*-\s*już wkrótce/i;

assert.match(layout, /getDocsSearchData/, 'LayoutV2 must load the static docs search index.');
assert.match(layout, /searchDataAll=\{searchDataAll\}/, 'LayoutV2 must pass all-surface search data to V2 search.');
assert.match(layout, /searchDataQuickstart=\{searchDataQuickstart\}/, 'LayoutV2 must pass quickstart search data to V2 search.');
assert.match(layout, /searchDataFaq=\{searchDataFaq\}/, 'LayoutV2 must pass FAQ search data to V2 search.');

assert.match(shell, /searchDocs/, 'SearchShellV2 must execute the lexical docs search.');
assert.match(shell, /v2search__result-list/, 'SearchShellV2 must render a real result list.');
assert.doesNotMatch(shell, /labels\.empty/, 'SearchShellV2 must not render the old placeholder empty copy.');

for (const source of [en, pl, shell]) {
  assert.doesNotMatch(source, OLD_SEARCH_PLACEHOLDER_COPY);
}

const distDir = path.join(here, 'dist');
assert.ok(existsSync(distDir), 'site/dist is missing. Run `pnpm build` before this smoke.');

const pages = [
  ['dist/index.html', 'SearchShellV2', 'searchDataAll', 'Guided installer', 'Closest matches'],
  ['dist/en/index.html', 'SearchShellV2', 'searchDataQuickstart', 'Guided installer', 'Closest matches'],
  ['dist/pl/index.html', 'SearchShellV2', 'searchDataFaq', 'Prowadzony instalator', 'Najbliższe trafienia'],
];

for (const [file, ...needles] of pages) {
  const html = read(file);
  for (const needle of needles) {
    assert.ok(html.includes(needle), `${file} does not include expected V2 search payload: ${needle}`);
  }
}

const builtText = walkFiles(distDir, (file) => /\.(html|js)$/.test(file))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');

assert.doesNotMatch(
  builtText,
  OLD_SEARCH_PLACEHOLDER_COPY,
  'Built site still contains the removed search placeholder copy.',
);

console.log('V2 search smoke passed: static index is wired, rendered, and placeholder copy is gone.');
