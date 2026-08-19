// i18n parity gate — the PL surface must mirror EN, file for file.
//
// The dictionary keys are already compiler-enforced (pl.ts `satisfies`
// CopyShape<typeof en> — see src/lib/i18n/pl.ts). This check owns what the
// compiler cannot see:
//   1. pages/en <-> pages/pl mirror each other file-for-file
//   2. content/i18n/en <-> content/i18n/pl mirror each other
//   3. freshness: no EN page/content file committed after its PL twin
//      (skipped on shallow clones, where per-file git history lies)
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

function walk(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else out.push(path.relative(base, full));
  }
  return out.sort();
}

function git(...args) {
  return execFileSync('git', args, { cwd: here, encoding: 'utf8' }).trim();
}

const MIRRORS = [
  ['src/pages/en', 'src/pages/pl'],
  ['src/content/i18n/en', 'src/content/i18n/pl'],
];

for (const [enDir, plDir] of MIRRORS) {
  const enFiles = walk(path.join(here, enDir));
  const plFiles = walk(path.join(here, plDir));
  const missingPl = enFiles.filter((f) => !plFiles.includes(f));
  const orphanPl = plFiles.filter((f) => !enFiles.includes(f));
  assert.deepEqual(missingPl, [], `${plDir} is missing PL twins for: ${missingPl}`);
  assert.deepEqual(orphanPl, [], `${plDir} carries orphans with no EN twin: ${orphanPl}`);
}

const shallow = git('rev-parse', '--is-shallow-repository') === 'true';
if (shallow) {
  console.log('check-i18n-parity: mirrors OK (freshness skipped: shallow clone)');
} else {
  const stale = [];
  for (const [enDir, plDir] of MIRRORS) {
    for (const rel of walk(path.join(here, enDir))) {
      const ts = (p) => {
        const out = git('log', '-1', '--format=%ct', '--', p);
        return out ? Number(out) : null;
      };
      const enTs = ts(path.join('site', enDir, rel));
      const plTs = ts(path.join('site', plDir, rel));
      if (enTs !== null && plTs !== null && enTs > plTs) {
        stale.push(`${plDir}/${rel}`);
      }
    }
  }
  assert.deepEqual(
    stale,
    [],
    `EN moved after its PL twin — refresh the translation: ${stale}`,
  );
  console.log('check-i18n-parity: mirrors OK, freshness OK');
}
