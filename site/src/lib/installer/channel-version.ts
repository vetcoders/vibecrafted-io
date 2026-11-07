import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const SEMVER = /^\d+\.\d+\.\d+$/;

/**
 * Version named by the installer channel this site publishes.
 * Returns undefined when the file is missing or the version is not
 * MAJOR.MINOR.PATCH, so callers omit the number instead of inventing one.
 */
export function readInstallerChannelVersion(
  cwd: string = process.cwd(),
): string | undefined {
  const candidates = [
    path.join(cwd, "public/channel/main.json"),
    path.join(cwd, "site/public/channel/main.json"),
  ];
  for (const file of candidates) {
    if (!existsSync(file)) continue;
    try {
      const parsed = JSON.parse(readFileSync(file, "utf8")) as {
        version?: unknown;
      };
      const version = parsed.version;
      if (typeof version === "string" && SEMVER.test(version)) return version;
    } catch {
      return undefined;
    }
    return undefined;
  }
  return undefined;
}
