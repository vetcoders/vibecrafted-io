// Public-surface gate: version comes from the installer channel, the
// landing hero shows the documented bootstrap, and the brand spelling
// is Vetcoders.
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_INSTALL_COMMAND } from './src/lib/installer/public-install-command.ts';
import {
  installerChannelFile,
  readInstallerChannelVersion,
} from './src/lib/installer/public-install.ts';

const here = path.dirname(fileURLToPath(import.meta.url));

const channel = JSON.parse(readFileSync(installerChannelFile(), 'utf8'));
const version = readInstallerChannelVersion();
assert.equal(version, channel.version);
assert.match(version, /^\d+\.\d+\.\d+$/);

const scratch = mkdtempSync(path.join(tmpdir(), 'vc-channel-'));
try {
  const missing = path.join(scratch, 'missing.json');
  assert.equal(readInstallerChannelVersion(missing), undefined);

  const bad = path.join(scratch, 'bad.json');
  writeFileSync(bad, JSON.stringify({ version: '3.4.0-stale' }));
  assert.equal(readInstallerChannelVersion(bad), undefined);

  writeFileSync(bad, JSON.stringify({ version: 4 }));
  assert.equal(readInstallerChannelVersion(bad), undefined);

  writeFileSync(bad, '{');
  assert.equal(readInstallerChannelVersion(bad), undefined);
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
assert.match(hero, /public-install-command/);
assert.match(hero, /PUBLIC_INSTALL_COMMAND/);
assert.match(hero, /hero__install-cmd/);
assert.equal(
  PUBLIC_INSTALL_COMMAND,
  'curl -fsSL https://vibecrafted.io/install.sh | bash',
);

for (const rel of [
  'src/content/i18n/en/commercial-v2.md',
  'src/content/i18n/pl/commercial-v2.md',
]) {
  const text = readFileSync(path.join(here, rel), 'utf8');
  assert.doesNotMatch(text, /VetCoders/);
  assert.match(text, /Vetcoders/);
}

const operator = readFileSync(
  path.join(here, 'src/content/i18n/en/operator-v2.md'),
  'utf8',
);
assert.doesNotMatch(operator, /3\.6\.0/);
assert.match(
  operator,
  /\$ curl -fsSL https:\/\/vibecrafted\.io\/install\.sh \| bash/,
);

const operatorPl = readFileSync(
  path.join(here, 'src/content/i18n/pl/operator-v2.md'),
  'utf8',
);
assert.match(
  operatorPl,
  /\$ curl -fsSL https:\/\/vibecrafted\.io\/install\.sh \| bash/,
);

const llms = readFileSync(path.join(here, 'public/llms.txt'), 'utf8');
assert.doesNotMatch(llms, /3\.7\.1/);
assert.match(llms, /channel\/main\.json/);

console.log(`check-public-surface: channel ${version}, install command pinned`);
