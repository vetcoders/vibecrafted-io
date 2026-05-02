#!/usr/bin/env python3
from __future__ import annotations

import json
import shlex
import shutil
import hashlib
from pathlib import Path

try:
    import tomllib
except ModuleNotFoundError:  # Python < 3.11
    import tomli as tomllib

REPO_ROOT = Path(__file__).resolve().parents[1]
BUNDLE_ROOT = REPO_ROOT / "framework"
SITE_PUBLIC = REPO_ROOT / "site" / "public"
SITE_SRC = REPO_ROOT / "site" / "src"


def read_version(bundle_root: Path) -> str:
    return (bundle_root / "VERSION").read_text(encoding="utf-8").strip()


def release_archive_name(version: str) -> str:
    return f"vibecrafted-v{version}.tar.gz"


def copy_file(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def read_sha256_entries(sha_file: Path) -> dict[str, str]:
    lines = sha_file.read_text(encoding="utf-8").splitlines()
    entries: dict[str, str] = {}

    for line in lines:
        parts = line.split()
        if len(parts) < 2:
            continue
        entries[parts[-1]] = parts[0]

    return entries


def ensure_checksum_contract(
    bundle_root: Path, sha_file: Path, archive_name: str
) -> None:
    entries = read_sha256_entries(sha_file)
    required_entries = [archive_name, "install.sh"]

    missing = [name for name in required_entries if name not in entries]
    if missing:
        raise RuntimeError(
            f"SHA256SUMS is missing required entries: {', '.join(sorted(missing))}"
        )

    mismatches: list[str] = []
    for name in required_entries:
        actual = sha256_file(bundle_root / name)
        expected = entries[name]
        if actual != expected:
            mismatches.append(f"{name}: expected {expected}, got {actual}")

    if mismatches:
        raise RuntimeError(
            "SHA256SUMS does not match release artifacts:\n- " + "\n- ".join(mismatches)
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


def _render_phase_commands(cmd: list[str]) -> list[str]:
    if not cmd:
        return []
    if len(cmd) >= 3 and cmd[1] == "-c":
        script = cmd[2]
        return [line.strip() for line in script.splitlines() if line.strip()]
    return [shlex.join(cmd)]


def export_install_manifest(bundle_root: Path, site_src: Path) -> Path:
    source_manifest = bundle_root / "install.toml"
    manifest = tomllib.loads(source_manifest.read_text(encoding="utf-8"))
    diagnostics = manifest.get("diagnostics", {})

    export_payload = {
        "title": manifest.get("title", "Vibecrafted"),
        "version": read_version(bundle_root),
        "persist": bool(manifest.get("persist", False)),
        "installCommand": "curl -fsSL https://vibecrafted.io/install.sh | bash -s -- --gui",
        "phases": [
            {
                "key": phase["key"],
                "label": phase["label"],
                "optional": bool(phase.get("optional", False)),
                "reason": phase.get("reason", "").strip(),
                "reasonLines": [
                    line.strip()
                    for line in phase.get("reason", "").splitlines()
                    if line.strip()
                ],
                "commands": _render_phase_commands(phase.get("cmd", [])),
            }
            for phase in manifest.get("phase", [])
        ],
        "diagnostics": {
            "categories": diagnostics.get("categories", []),
            "labels": diagnostics.get("labels", {}),
            "commands": diagnostics.get("commands", {}),
            "paths": diagnostics.get("paths", {}),
        },
    }

    output_path = site_src / "lib" / "generated" / "install-manifest.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(dumps_stable_json(export_payload) + "\n", encoding="utf-8")
    return output_path


def dumps_stable_json(
    value: object, indent: int = 0, *, force_multiline: bool = False
) -> str:
    """Emit deterministic JSON close to the repo's pre-commit formatting."""
    if isinstance(value, dict):
        if not value:
            return "{}"
        pad = " " * indent
        child_pad = " " * (indent + 2)
        lines = ["{"]
        items = list(value.items())
        for idx, (key, item) in enumerate(items):
            comma = "," if idx < len(items) - 1 else ""
            rendered = dumps_stable_json(item, indent + 2)
            line = f"{child_pad}{json.dumps(key)}: {rendered}{comma}"
            if isinstance(item, list) and "\n" not in rendered and len(line) > 80:
                rendered = dumps_stable_json(item, indent + 2, force_multiline=True)
            lines.append(f"{child_pad}{json.dumps(key)}: {rendered}{comma}")
        lines.append(f"{pad}}}")
        return "\n".join(lines)

    if isinstance(value, list):
        if not value:
            return "[]"
        if not force_multiline and all(
            not isinstance(item, (dict, list)) for item in value
        ):
            inline = "[" + ", ".join(json.dumps(item) for item in value) + "]"
            if indent + len(inline) <= 80:
                return inline
        pad = " " * indent
        child_pad = " " * (indent + 2)
        lines = ["["]
        for idx, item in enumerate(value):
            comma = "," if idx < len(value) - 1 else ""
            lines.append(f"{child_pad}{dumps_stable_json(item, indent + 2)}{comma}")
        lines.append(f"{pad}]")
        return "\n".join(lines)

    return json.dumps(value)


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

    # The website ships the signed tarball, not an exploded framework checkout.
    # If this directory exists, Astro will publish it verbatim from public/.
    exploded_bundle = site_public / "vibecrafted"
    if exploded_bundle.exists():
        if exploded_bundle.is_dir():
            shutil.rmtree(exploded_bundle)
        else:
            exploded_bundle.unlink()


def sync_site_release_assets(
    bundle_root: Path = BUNDLE_ROOT,
    site_public: Path = SITE_PUBLIC,
    site_src: Path = SITE_SRC,
) -> dict[str, str]:
    version = read_version(bundle_root)
    archive_name = release_archive_name(version)

    required_files = {
        bundle_root / "install.sh": site_public / "install.sh",
        bundle_root / "install.sh.sig": site_public / "install.sh.sig",
        bundle_root / "vibecrafted-signing.pub": site_public
        / "vibecrafted-signing.pub",
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

    ensure_checksum_contract(bundle_root, bundle_root / "SHA256SUMS", archive_name)

    for src, dst in required_files.items():
        copy_file(src, dst)

    prune_stale_release_artifacts(site_public, archive_name)
    write_channel_manifest(site_public, version, archive_name)
    manifest_json = export_install_manifest(bundle_root, site_src)

    return {
        "version": version,
        "archive": archive_name,
        "bundle_dir": str(bundle_root),
        "public_dir": str(site_public),
        "manifest_json": str(manifest_json),
    }


def main() -> None:
    synced = sync_site_release_assets()
    print(
        "Synced site release assets:",
        json.dumps(synced, indent=2),
    )


if __name__ == "__main__":
    main()
