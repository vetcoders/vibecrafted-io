#!/usr/bin/env python3
"""Render the public content-truth matrix from docs/content-truth.manifest.json."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = REPO_ROOT / "docs" / "content-truth.manifest.json"


def load_manifest() -> dict:
    return json.loads(MANIFEST_PATH.read_text())


def resolve_source(source: str) -> tuple[Path | None, bool]:
    """Resolve a manifest source to a local path.

    Local sources are repo-relative. Cross-repo sources use the
    ``owner/repo:path`` form and resolve against a sibling checkout next to
    this repository (the vibecrafted-suite layout). Returns
    ``(path, checkable)``: when the sibling repo is not checked out at all
    (CI, partial workstations), the source is not checkable here and must
    not be reported as missing — absence of a checkout is not absence of
    the document.
    """
    if ":" in source and not source.startswith("/"):
        repo_spec, rel_path = source.split(":", 1)
        repo_name = repo_spec.rsplit("/", 1)[-1]
        sibling_root = REPO_ROOT.parent / repo_name
        if not sibling_root.is_dir():
            return None, False
        return sibling_root / rel_path, True
    return REPO_ROOT / source, True


def validate_manifest(manifest: dict) -> list[str]:
    missing: list[str] = []
    for mapping in manifest.get("mappings", []):
        source_path, checkable = resolve_source(mapping["source"])
        if checkable and source_path is not None and not source_path.exists():
            missing.append(mapping["source"])
        for consumer in mapping.get("consumers", []):
            target = REPO_ROOT / consumer["file"]
            if not target.exists():
                missing.append(consumer["file"])
    return sorted(set(missing))


def render_markdown(manifest: dict) -> str:
    lines = [
        "# Content Truth Matrix",
        "",
        f"_Updated: {manifest.get('updated_at', 'unknown')}_",
        "",
        "| Source document | Live site location | Drift status | Notes |",
        "| --- | --- | --- | --- |",
    ]
    for mapping in manifest.get("mappings", []):
        source = mapping["source"]
        for consumer in mapping.get("consumers", []):
            surface = f"{consumer['file']} :: {consumer['surface']}"
            lines.append(
                f"| `{source}` | `{surface}` | `{consumer['status']}` | {consumer['notes']} |"
            )
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--format",
        choices=("markdown", "json"),
        default="markdown",
        help="Output format",
    )
    args = parser.parse_args()

    manifest = load_manifest()
    missing = validate_manifest(manifest)
    if missing:
        print("Missing manifest targets:", file=sys.stderr)
        for item in missing:
            print(f"  - {item}", file=sys.stderr)
        return 1

    if args.format == "json":
        print(json.dumps(manifest, indent=2, ensure_ascii=False))
    else:
        print(render_markdown(manifest), end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
