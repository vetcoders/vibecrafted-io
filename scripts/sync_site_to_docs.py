#!/usr/bin/env python3
"""Sync the built Astro site into docs/ without deleting repo markdown docs."""

from __future__ import annotations

import shutil
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DIST_DIR = REPO_ROOT / "site" / "dist"
DOCS_DIR = REPO_ROOT / "docs"


def replace_path(source: Path, destination: Path) -> None:
    if destination.is_dir():
        shutil.rmtree(destination)
    elif destination.exists() or destination.is_symlink():
        destination.unlink()

    if source.is_dir():
        shutil.copytree(source, destination)
    else:
        shutil.copy2(source, destination)


def sync_site_to_docs() -> list[str]:
    if not DIST_DIR.exists():
        raise FileNotFoundError(f"Build output missing: {DIST_DIR}")

    DOCS_DIR.mkdir(parents=True, exist_ok=True)

    synced: list[str] = []
    for source in sorted(DIST_DIR.iterdir(), key=lambda path: path.name):
        destination = DOCS_DIR / source.name
        replace_path(source, destination)
        synced.append(source.name)

    return synced


def main() -> None:
    synced = sync_site_to_docs()
    print(
        "Synced built site into docs/ while preserving unmanaged repo docs:",
        ", ".join(synced),
    )


if __name__ == "__main__":
    main()
