// Public-surface gate for the live landing: version comes from the
// installer channel, the hero shows the documented bootstrap, and the
// brand spelling is Vetcoders.
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_INSTALL_COMMAND } from './src/lib/installer/public-install-command.ts';
import { readInstallerChannelVersion } from './src/lib/installer/channel-version.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
const channelPath = path.join(here, 'public/channel/main.json');
const channel = JSON.parse(readFileSync(channelPath, 'utf8'));
const version = readInstallerChannelVersion(here);
assert.equal(version, channel.version);
assert.match(version, /^\d+\.\d+\.\d+$/);

const scratch = mkdtempSync(path.join(tmpdir(), 'vc-channel-'));
try {
  assert.equal(readInstallerChannelVersion(scratch), undefined);
  const badDir = path.join(scratch, 'public/channel');
  const { mkdirSync } = await import('node:fs');
  mkdirSync(badDir, { recursive: true });
  writeFileSync(path.join(badDir, 'main.json'), JSON.stringify({ version: 'nope' }));
  assert.equal(readInstallerChannelVersion(scratch), undefined);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

const schema = readFileSync(path.join(here, 'src/components/SchemaOrg.astro'), 'utf8');
assert.match(schema, /readInstallerChannelVersion/);
assert.doesNotMatch(schema, /softwareVersion:\s*["']\d+\.\d+\.\d+["']/);

const hero = readFileSync(
  path.join(here, 'src/components/sections/HeroSectionV2.svelte'),
  'utf8',
);
assert.match(hero, /PUBLIC_INSTALL_COMMAND/);
assert.match(hero, /hero__cta--primary/);
assert.match(hero, /hero__cta--ghost/);
assert.match(hero, /minmax\(0,\s*16rem\)/);
assert.equal(
  PUBLIC_INSTALL_COMMAND,
  'curl -fsSL https://vibecrafted.io/install.sh | bash',
);

const tui = readFileSync(path.join(here, 'src/components/operator-tui.ts'), 'utf8');
assert.doesNotMatch(tui, /vibecrafted 4\.3\.1/);

for (const rel of [
  'content/commercial/en.md',
  'content/commercial/pl.md',
  'src/content/i18n/en/commercial-v2.md',
  'src/content/i18n/pl/commercial-v2.md',
]) {
  const text = readFileSync(path.join(here, rel), 'utf8');
  assert.doesNotMatch(text, /VetCoders/);
  assert.match(text, /Vetcoders/);
}

const llms = readFileSync(path.join(here, 'public/llms.txt'), 'utf8');
assert.doesNotMatch(llms, /3\.7\.1/);

console.log(`check-public-surface: channel ${version}, install command pinned`);
