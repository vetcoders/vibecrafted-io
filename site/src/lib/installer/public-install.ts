import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SEMVER = /^\d+\.\d+\.\d+$/;

/** Channel file this site ships. Live deploys publish the same path. */
export function installerChannelFile(): string {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../../public/channel/main.json",
  );
}

/**
 * Version the installer channel names. Returns undefined when the file
 * is missing or the version is not a plain MAJOR.MINOR.PATCH string, so
 * callers omit the number instead of substituting a stale literal.
 */
export function readInstallerChannelVersion(
  channelFile: string = installerChannelFile(),
): string | undefined {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(channelFile, "utf8"));
  } catch {
    return undefined;
  }
  if (!parsed || typeof parsed !== "object" || !("version" in parsed)) {
    return undefined;
  }
  const version = (parsed as { version: unknown }).version;
  if (typeof version !== "string" || !SEMVER.test(version)) return undefined;
  return version;
}
