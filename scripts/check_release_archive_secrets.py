#!/usr/bin/env python3
"""Fail-closed secret gate on the artifacts this repository actually publishes.

The 2026-08-10 incident (`tskey` in `vibecrafted-vm/.env` inside
`vibecrafted-v3.7.0.tar.gz`) was closed upstream by an unconditional gate in
`bundle-build`, between the rsync and the `tar`. That gate only covers a payload
this repository builds itself.

It does not cover the two ways a leaking archive still reaches production:

1. a tarball that was committed under `site/public/` before the gate existed
   (`vibecrafted-v3.2.0.tar.gz` carried a live `TAILSCALE_AUTHKEY` and was still
   tracked on 2026-08-16), and
2. `scripts/sync_site_release_assets.py`, which copies whatever `framework/`
   happens to hold into `site/public/` — a stale bundle root republishes a stale
   leak without ever running `bundle-build`.

So this gate inspects the archives themselves, wherever they came from, and is
unconditional: there is no bypass flag.
"""

from __future__ import annotations

import argparse
import re
import sys
import tarfile
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]

DEFAULT_SCAN_DIRS = ("site/public", "framework")
ARCHIVE_GLOB = "vibecrafted-v*.tar.gz"

# Read limit per member. Env files are small; a runaway member is not worth
# paging into memory to prove it holds a key.
MEMBER_READ_LIMIT = 512 * 1024

# Path-shaped rule: any .env / .env.<something> that is not an example. This is
# the same shape as the upstream bundle-build gate, applied to archive members.
ENV_MEMBER_RE = re.compile(r"(^|/)\.env(\.[^/]*)?$")
ENV_MEMBER_ALLOWED_SUFFIXES = (".example", ".sample", ".template", ".dist")

# Content-shaped rules: live credential material, regardless of the file name it
# hides behind. Kept narrow on purpose — a noisy gate gets bypassed.
CONTENT_RULES: tuple[tuple[str, re.Pattern[bytes]], ...] = (
    ("tailscale auth key", re.compile(rb"tskey-(auth|client)-[A-Za-z0-9]{10,}")),
    ("openai-style api key", re.compile(rb"\bsk-[A-Za-z0-9_-]{32,}")),
    ("anthropic api key", re.compile(rb"\bsk-ant-[A-Za-z0-9_-]{32,}")),
    ("github token", re.compile(rb"\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b")),
    ("github fine-grained token", re.compile(rb"\bgithub_pat_[A-Za-z0-9_]{60,}")),
    ("aws access key id", re.compile(rb"\b(AKIA|ASIA)[0-9A-Z]{16}\b")),
    ("slack token", re.compile(rb"\bxox[baprs]-[0-9A-Za-z-]{10,}")),
    ("private key block", re.compile(rb"-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----")),
)

# Placeholders that appear inside the matched credential itself, e.g. the
# upstream fixture `tskey-auth-FAKEFAKEFAKE` that proves the .env gate works.
#
# This deliberately keys on the matched token, not on the file path. A
# "tests/ is exempt" rule would be a bypass: a real key pasted into a test
# fixture is still a real key, and that is a plausible way to leak one.
PLACEHOLDER_RE = re.compile(
    rb"FAKE|EXAMPLE|PLACEHOLDER|REDACTED|DUMMY|SAMPLE|CHANGEME|YOUR[_-]?KEY|XXXX|"
    rb"AAAAAAAA|0000000000|1234567890",
    re.IGNORECASE,
)


class Finding:
    __slots__ = ("archive", "member", "rule")

    def __init__(self, archive: Path, member: str, rule: str) -> None:
        self.archive = archive
        self.member = member
        self.rule = rule

    def __str__(self) -> str:
        return f"{self.archive.name}::{self.member} — {self.rule}"


def _is_example_env(member_name: str) -> bool:
    return member_name.endswith(ENV_MEMBER_ALLOWED_SUFFIXES)


def scan_archive(archive: Path) -> list[Finding]:
    findings: list[Finding] = []

    with tarfile.open(archive, "r:gz") as tar:
        for member in tar:
            if not member.isfile():
                continue

            name = member.name

            if ENV_MEMBER_RE.search(name) and not _is_example_env(name):
                findings.append(Finding(archive, name, "secret-bearing env file"))
                # Still fall through: the same member may also trip a content
                # rule, and naming both makes the revocation list explicit.

            handle = tar.extractfile(member)
            if handle is None:
                continue
            with handle:
                blob = handle.read(MEMBER_READ_LIMIT)

            for rule_name, pattern in CONTENT_RULES:
                if any(
                    not PLACEHOLDER_RE.search(match.group(0))
                    for match in pattern.finditer(blob)
                ):
                    findings.append(
                        Finding(archive, name, f"live credential: {rule_name}")
                    )

    return findings


def collect_archives(scan_dirs: list[Path]) -> list[Path]:
    archives: list[Path] = []
    for directory in scan_dirs:
        if not directory.is_dir():
            continue
        archives.extend(sorted(directory.glob(ARCHIVE_GLOB)))
    return archives


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "paths",
        nargs="*",
        type=Path,
        help="archives or directories to scan (default: site/public, framework)",
    )
    args = parser.parse_args(argv)

    if args.paths:
        explicit = [
            path if path.is_absolute() else REPO_ROOT / path for path in args.paths
        ]
        archives = [path for path in explicit if path.is_file()]
        archives.extend(collect_archives([path for path in explicit if path.is_dir()]))
    else:
        archives = collect_archives([REPO_ROOT / name for name in DEFAULT_SCAN_DIRS])

    if not archives:
        print("[archive-secrets] no release archives on disk; nothing to gate.")
        return 0

    findings: list[Finding] = []
    for archive in archives:
        try:
            label = archive.relative_to(REPO_ROOT)
        except ValueError:
            # An explicitly passed archive may live outside the repo (auditing a
            # downloaded production artifact is a legitimate use of this gate).
            label = archive
        print(f"[archive-secrets] scanning {label}")
        findings.extend(scan_archive(archive))

    if findings:
        print(
            "\nFATAL: secret-bearing release archive (2026-08-10 tskey incident class):",
            file=sys.stderr,
        )
        for finding in findings:
            print(f"  - {finding}", file=sys.stderr)
        print(
            "\nThis gate is unconditional — there is no bypass flag.\n"
            "Do not publish these bytes. Revoke the exposed credential first,\n"
            "then rebuild the archive from a clean upstream via `make bundle-build`.",
            file=sys.stderr,
        )
        return 9

    print(
        f"[archive-secrets] clean: {len(archives)} archive(s) carry no credential material."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
