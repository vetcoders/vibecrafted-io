#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
BUNDLE_ROOT = REPO_ROOT / "framework"
SITE_PUBLIC = REPO_ROOT / "site" / "public"


def read_version(bundle_root: Path) -> str:
    return (bundle_root / "VERSION").read_text(encoding="utf-8").strip()


def release_archive_name(version: str) -> str:
    return f"vibecrafted-v{version}.tar.gz"


def copy_file(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def ensure_checksum_contract(sha_file: Path, archive_name: str) -> None:
    lines = sha_file.read_text(encoding="utf-8").splitlines()
    required_entries = {
        archive_name: False,
        "install.sh": False,
    }

    for line in lines:
        parts = line.split()
        if len(parts) < 2:
            continue
        required_entries[parts[-1]] = True

    missing = [name for name, present in required_entries.items() if not present]
    if missing:
        raise RuntimeError(
            f"SHA256SUMS is missing required entries: {', '.join(sorted(missing))}"
        )


def write_channel_manifest(site_public: Path, version: str, archive_name: str) -> None:
    channel_dir = site_public / "channel"
    channel_dir.mkdir(parents=True, exist_ok=True)
    manifest = {
        "channel": "main",
        "version": version,
        "archive_url": f"https://vibecrafted.io/{archive_name}",
        "signature_url": f"https://vibecrafted.io/{archive_name}.sig",
        "sha256_url": "https://vibecrafted.io/SHA256SUMS",
        "public_key_url": "https://vibecrafted.io/vibecrafted-signing.pub",
    }
    (channel_dir / "main.json").write_text(
        json.dumps(manifest, indent=2) + "\n",
        encoding="utf-8",
    )


def prune_stale_release_artifacts(site_public: Path, archive_name: str) -> None:
    keep = {
        archive_name,
        f"{archive_name}.sig",
        "install.sh",
        "install.sh.sig",
        "vibecrafted-signing.pub",
        "VERSION",
        "SHA256SUMS",
    }

    for pattern in ("vibecrafted-v*.tar.gz", "vibecrafted-v*.tar.gz.sig"):
        for candidate in site_public.glob(pattern):
            if candidate.name not in keep:
                candidate.unlink()

    stale_checksum = site_public / "SHA256SUMS.tar"
    if stale_checksum.exists():
        stale_checksum.unlink()


def sync_site_release_assets(
    bundle_root: Path = BUNDLE_ROOT,
    site_public: Path = SITE_PUBLIC,
) -> dict[str, str]:
    version = read_version(bundle_root)
    archive_name = release_archive_name(version)

    required_files = {
        bundle_root / "install.sh": site_public / "install.sh",
        bundle_root / "install.sh.sig": site_public / "install.sh.sig",
        bundle_root / "vibecrafted-signing.pub": site_public / "vibecrafted-signing.pub",
        bundle_root / "SHA256SUMS": site_public / "SHA256SUMS",
        bundle_root / "VERSION": site_public / "VERSION",
        bundle_root / archive_name: site_public / archive_name,
        bundle_root / f"{archive_name}.sig": site_public / f"{archive_name}.sig",
    }

    missing = [str(src) for src in required_files if not src.exists()]
    if missing:
        raise FileNotFoundError(
            "Missing release artifacts required for site sync:\n- "
            + "\n- ".join(sorted(missing))
        )

    ensure_checksum_contract(bundle_root / "SHA256SUMS", archive_name)

    for src, dst in required_files.items():
        copy_file(src, dst)

    prune_stale_release_artifacts(site_public, archive_name)
    write_channel_manifest(site_public, version, archive_name)

    return {
        "version": version,
        "archive": archive_name,
        "bundle_dir": str(bundle_root),
        "public_dir": str(site_public),
    }


def main() -> None:
    synced = sync_site_release_assets()
    print(
        "Synced site release assets:",
        json.dumps(synced, indent=2),
    )


if __name__ == "__main__":
    main()
