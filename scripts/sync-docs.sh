#!/usr/bin/env bash
# Mirror the canonical public documentation catalog into the Astro site.
#
# Source of truth: ../vibecrafted/docs/public/
# Destination:     site/src/content/docs/
#
# The source hierarchy is preserved so future duplicate filenames cannot
# silently overwrite one another. Public URLs remain basename-based, as required
# by docs/public/_CONTRACT.md; duplicate basenames therefore fail validation.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
DEFAULT_SOURCE_DIR="${REPO_ROOT}/../vibecrafted/docs/public"
SOURCE_DIR="${VIBECRAFTED_DOCS_SRC:-${DEFAULT_SOURCE_DIR}}"
DEST_DIR="${REPO_ROOT}/site/src/content/docs"
SITEMAP="${REPO_ROOT}/site/public/sitemap.xml"
MODE="sync"

usage() {
  printf 'usage: %s [--check | --if-present]\n' "$0"
}

case "${1:-}" in
  "") ;;
  --check) MODE="check" ;;
  --if-present) MODE="if-present" ;;
  -h|--help) usage; exit 0 ;;
  *) usage >&2; exit 64 ;;
esac

if [[ ! -d "${SOURCE_DIR}" ]]; then
  if [[ "${MODE}" == "if-present" ]]; then
    printf 'sync-docs: source absent; using committed mirror (%s)\n' "${SOURCE_DIR}"
    exit 0
  fi
  printf 'sync-docs: source directory not found: %s\n' "${SOURCE_DIR}" >&2
  printf '  Set VIBECRAFTED_DOCS_SRC to override.\n' >&2
  exit 1
fi

if [[ "${DEST_DIR}" != "${REPO_ROOT}/site/src/content/docs" ]]; then
  printf 'sync-docs: refusing unexpected destination: %s\n' "${DEST_DIR}" >&2
  exit 2
fi

STAGE_DIR="$(mktemp -d "${TMPDIR:-/tmp}/vibecrafted-docs-sync.XXXXXX")"
trap 'rm -rf "${STAGE_DIR}"' EXIT

python3 - "${SOURCE_DIR}" "${STAGE_DIR}" <<'PY'
from __future__ import annotations

import ast
import re
import shutil
import sys
from pathlib import Path

source = Path(sys.argv[1]).resolve()
stage = Path(sys.argv[2]).resolve()
allowed_sections = {
    "getting-started", "concepts", "cli", "lifecycle", "dispatch",
    "server", "skills", "configuration", "troubleshooting", "reference",
}
private_patterns = {
    "/Users/": re.compile(r"/Users/"),
    "/Volumes/vc-workspace": re.compile(r"/Volumes/vc-workspace"),
    "~/Libraxis": re.compile(r"~/Libraxis"),
    "private Tailscale address": re.compile(r"(?<![0-9])100(?:\.[0-9]{1,3}){3}(?![0-9])"),
    "private hostname dragon": re.compile(r"(?<![A-Za-z0-9_-])dragon(?![A-Za-z0-9_-])", re.I),
    "noncanonical local server": re.compile(r"localhost:3025"),
}

def scalar(value: str) -> object:
    value = value.strip()
    if value.startswith(('"', "'")):
        return ast.literal_eval(value)
    if re.fullmatch(r"[0-9]+", value):
        return int(value)
    return value

docs = sorted(
    path for path in source.rglob("*.md")
    if not path.name.startswith("_")
)
if not docs:
    raise SystemExit("sync-docs: no eligible markdown files found")

seen_basenames: dict[str, Path] = {}
for path in docs:
    rel = path.relative_to(source)
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*\.md", path.name):
        raise SystemExit(f"sync-docs: invalid public basename: {rel}")
    if path.name in seen_basenames:
        raise SystemExit(
            f"sync-docs: duplicate URL basename {path.name}: "
            f"{seen_basenames[path.name]} and {rel}"
        )
    seen_basenames[path.name] = rel

    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0] != "---":
        raise SystemExit(f"sync-docs: missing frontmatter opener: {rel}")
    try:
        close = lines.index("---", 1)
    except ValueError:
        raise SystemExit(f"sync-docs: missing frontmatter closer: {rel}") from None

    metadata: dict[str, object] = {}
    for line in lines[1:close]:
        match = re.fullmatch(r"([a-zA-Z][a-zA-Z0-9_-]*):\s*(.+)", line)
        if not match:
            raise SystemExit(f"sync-docs: unsupported frontmatter line in {rel}: {line}")
        key, raw = match.groups()
        if key in metadata:
            raise SystemExit(f"sync-docs: duplicate frontmatter key {key}: {rel}")
        metadata[key] = scalar(raw)

    expected = {"title", "description", "section", "order"}
    if set(metadata) != expected:
        raise SystemExit(
            f"sync-docs: frontmatter keys for {rel} are {sorted(metadata)}; "
            f"expected {sorted(expected)}"
        )
    if not isinstance(metadata["title"], str) or not metadata["title"].strip():
        raise SystemExit(f"sync-docs: title must be non-empty: {rel}")
    if not isinstance(metadata["description"], str) or not metadata["description"].strip():
        raise SystemExit(f"sync-docs: description must be non-empty: {rel}")
    if len(metadata["description"]) > 180:
        raise SystemExit(f"sync-docs: description exceeds 180 chars: {rel}")
    if metadata["section"] not in allowed_sections:
        raise SystemExit(f"sync-docs: invalid section {metadata['section']!r}: {rel}")
    if metadata["section"] != rel.parts[0]:
        raise SystemExit(
            f"sync-docs: section/path mismatch for {rel}: {metadata['section']!r}"
        )
    if not isinstance(metadata["order"], int):
        raise SystemExit(f"sync-docs: order must be an integer: {rel}")

    body = "\n".join(lines[close + 1:])
    heading = next((line[2:].strip() for line in lines[close + 1:] if line.startswith("# ")), None)
    if heading != metadata["title"]:
        raise SystemExit(
            f"sync-docs: first H1 must match title in {rel}: "
            f"{heading!r} != {metadata['title']!r}"
        )
    for label, pattern in private_patterns.items():
        if pattern.search(body):
            raise SystemExit(f"sync-docs: {label} rejected by public contract: {rel}")

    target = stage / rel
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(path, target)

print(f"sync-docs: validated={len(docs)}")
PY

mirror_current=false
if diff -qr "${STAGE_DIR}" "${DEST_DIR}" >/dev/null 2>&1; then
  mirror_current=true
elif [[ "${MODE}" == "check" ]]; then
  printf 'sync-docs: mirror is stale\n' >&2
  diff -qr "${STAGE_DIR}" "${DEST_DIR}" >&2 || true
  exit 3
else
  mkdir -p "${DEST_DIR}"
  rsync -a --delete --exclude '.DS_Store' "${STAGE_DIR}/" "${DEST_DIR}/"
  printf 'sync-docs: published=%s pruned-stale=true source=%s\n' \
    "$(find "${DEST_DIR}" -type f -name '*.md' | wc -l | tr -d ' ')" "${SOURCE_DIR}"
fi

python3 - "${STAGE_DIR}" "${SITEMAP}" "${MODE}" <<'PY'
from __future__ import annotations

import re
import sys
from pathlib import Path

stage = Path(sys.argv[1])
sitemap = Path(sys.argv[2])
mode = sys.argv[3]
start = "    <!-- BEGIN GENERATED DOCS -->"
end = "    <!-- END GENERATED DOCS -->"
slugs = sorted(path.stem for path in stage.rglob("*.md"))

urls = [("docs", "weekly", "0.9")]
urls.extend((f"docs/{slug}", "monthly", "0.8" if slug in {
    "install", "quick-start", "build-from-source", "first-run", "update"
} else "0.6") for slug in slugs)

blocks = [start]
for route, frequency, priority in urls:
    blocks.extend([
        "    <url>",
        f"        <loc>https://vibecrafted.io/{route}/</loc>",
        f"        <changefreq>{frequency}</changefreq>",
        f"        <priority>{priority}</priority>",
        "    </url>",
    ])
blocks.append(end)
expected = "\n".join(blocks)

text = sitemap.read_text(encoding="utf-8")
pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
match = pattern.search(text)
if not match:
    raise SystemExit("sync-docs: sitemap generated-docs markers are missing")
if match.group(0) == expected:
    print(f"sync-docs: sitemap current ({len(urls)} docs URLs)")
elif mode == "check":
    raise SystemExit("sync-docs: sitemap docs catalog is stale")
else:
    sitemap.write_text(pattern.sub(expected, text, count=1), encoding="utf-8")
    print(f"sync-docs: sitemap published ({len(urls)} docs URLs)")
PY

if [[ "${mirror_current}" == "true" ]]; then
  printf 'sync-docs: mirror current (%s files)\n' "$(find "${STAGE_DIR}" -type f -name '*.md' | wc -l | tr -d ' ')"
fi
