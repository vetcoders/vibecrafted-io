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


def validate_manifest(manifest: dict) -> list[str]:
    missing: list[str] = []
    for mapping in manifest.get("mappings", []):
        source = REPO_ROOT / mapping["source"]
        if not source.exists():
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
