#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shlex
import shutil
from pathlib import Path

try:
    import tomllib
except ModuleNotFoundError:  # Python < 3.11
    import tomli as tomllib

REPO_ROOT = Path(__file__).resolve().parents[1]
BUNDLE_ROOT = REPO_ROOT / "framework"
SITE_PUBLIC = REPO_ROOT / "site" / "public"
SITE_SRC = REPO_ROOT / "site" / "src"


def resolve_product_root() -> Path:
    override = os.environ.get("VIBECRAFTED_PRODUCT_ROOT")
    if override:
        return Path(override).expanduser().resolve()

    pointer_file = REPO_ROOT / ".framework"
    if pointer_file.exists():
        pointer = pointer_file.read_text(encoding="utf-8").strip()
        if pointer:
            return (REPO_ROOT / pointer).resolve()

    return (REPO_ROOT.parent / "vibecrafted").resolve()


def read_version(bundle_root: Path) -> str:
    return (bundle_root / "VERSION").read_text(encoding="utf-8").strip()


def _release_mode() -> bool:
    """Release builds rebuild the framework bundle; content builds reuse it."""
    return os.environ.get("SITE_RELEASE_MODE") == "1"


def release_archive_name(version: str) -> str:
    return f"vibecrafted-v{version}.tar.gz"


def copy_file(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def sync_windows_installer(
    product_root: Path, site_public: Path, *, check: bool = False
) -> dict[str, str]:
    """Mirror the product-owned Windows handoff without creating a site fork."""
    source = product_root / "install.ps1"
    target = site_public / "install.ps1"

    if not source.exists():
        if check or not target.exists():
            raise FileNotFoundError(
                f"Canonical Windows installer missing at {source}. Set "
                "VIBECRAFTED_PRODUCT_ROOT to the vibecrafted checkout."
            )
        print(
            f"[sync] product checkout absent ({product_root}); reusing committed "
            f"Windows installer mirror at {target}."
        )
    elif check:
        if not target.exists() or source.read_bytes() != target.read_bytes():
            raise RuntimeError(
                f"Windows installer mirror drift: {target} must exactly match {source}. "
                "Run scripts/sync_site_release_assets.py to refresh it."
            )
    else:
        copy_file(source, target)

    return {
        "source": str(source),
        "target": str(target),
        "sha256": sha256_file(target),
    }


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


def describe_platform_coverage(bundle_root: Path, archive_name: str) -> dict[str, dict]:
    """State, per platform, which archive to fetch and what it actually carries.

    The runtime payload is platform-neutral: Python, shell, and Rust sources plus
    the launchers. The only platform-specific bytes are the vendored foundation
    binaries under `bin/vendor/<platform>/`, and those are an install accelerator,
    not a requirement — install.sh / install.ps1 build or fetch foundations when
    the bundle carries none for the running host.

    So every platform is served by the same archive, and the honest thing to
    publish is not three near-identical tarballs but one archive plus a truthful
    statement of what each platform gets out of it. `vendored: false` means the
    install builds its own foundations, which is slower, not broken.
    """
    vendor_root = bundle_root / "bin" / "vendor"
    # A platform counts as vendored only if its directory actually holds a
    # binary. An empty bin/vendor/<platform>/ is what a fully-skipped vendor
    # pass leaves behind, and reporting that as vendored would be a lie the
    # installer discovers only after download.
    available = (
        {
            entry.name
            for entry in vendor_root.iterdir()
            if entry.is_dir() and any(child.is_file() for child in entry.iterdir())
        }
        if vendor_root.is_dir()
        else set()
    )

    # os/arch as install.sh and install.ps1 resolve them, mapped to the
    # bin/vendor/<platform> directory name the bundle would have to carry.
    coverage = {
        "macos-arm64": "darwin-arm64",
        "macos-x64": "darwin-x64",
        "linux-x64": "linux-x64",
        "linux-arm64": "linux-arm64",
        "windows-x64": "windows-x64",
    }

    return {
        label: {
            "archive_url": f"https://vibecrafted.io/{archive_name}",
            "vendored_foundations": platform_dir in available,
        }
        for label, platform_dir in coverage.items()
    }


def write_channel_manifest(
    site_public: Path,
    version: str,
    archive_name: str,
    platforms: dict[str, dict] | None = None,
    *,
    runtime_pack_name: str | None = None,
) -> None:
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
    if runtime_pack_name:
        manifest["runtime_pack_url"] = f"https://vibecrafted.io/{runtime_pack_name}"
    # Additive only. Installers already in the wild read `archive_url` and stop
    # there; an unknown key costs them nothing. Never move the canonical archive
    # behind `platforms` — that would strand every 3.x install.
    if platforms:
        manifest["platforms"] = platforms
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
    if not source_manifest.exists():
        # Content build (no framework bundle on disk): reuse the committed
        # install-manifest.json. A release run regenerates it from the bundle.
        reused = site_src / "lib" / "generated" / "install-manifest.json"
        if _release_mode():
            raise FileNotFoundError(
                f"SITE_RELEASE_MODE=1 but no framework bundle at {bundle_root} "
                "(install.toml missing) -- run `make bundle-build` first."
            )
        if not reused.exists():
            raise FileNotFoundError(
                f"No {source_manifest} and no committed install-manifest.json "
                "to reuse -- run `make bundle-build` first."
            )
        print(
            "[manifest] framework bundle absent; reusing committed "
            "install-manifest.json (content build)."
        )
        return reused
    manifest = tomllib.loads(source_manifest.read_text(encoding="utf-8"))
    diagnostics = manifest.get("diagnostics", {})

    export_payload = {
        "title": manifest.get("title", "Vibecrafted"),
        "version": read_version(bundle_root),
        "persist": bool(manifest.get("persist", False)),
        "installCommand": "curl -fsSL https://vibecrafted.io/install.sh | bash",
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
    # Ship/content decoupling: a real release builds + signs the framework bundle
    # (make bundle-build + bundle-sign, or SITE_RELEASE_MODE=1) and syncs it here.
    # A content build has no bundle on disk (framework/ is gitignored, built from
    # the ../vibecrafted upstream) and reuses the release assets already committed
    # under site/public/. Only a release run -- or a missing public surface --
    # needs the bundle present.
    if not (bundle_root / "VERSION").exists():
        if _release_mode():
            raise FileNotFoundError(
                f"SITE_RELEASE_MODE=1 but no framework bundle at {bundle_root} -- "
                "run `make bundle-build && make bundle-sign` first."
            )
        public_version = site_public / "VERSION"
        if not public_version.exists():
            raise FileNotFoundError(
                f"No framework bundle at {bundle_root} and no committed site/public "
                "release assets to reuse -- run `make bundle-build` (+ sign) first."
            )
        print(
            f"[sync] framework bundle absent ({bundle_root}); reusing committed "
            "site/public release assets (content build, not a release). Run "
            "`make site-release` for a fresh signed release."
        )
        return {
            "version": public_version.read_text(encoding="utf-8").strip(),
            "archive": "",
            "bundle_dir": str(bundle_root),
            "public_dir": str(site_public),
            "manifest_json": str(
                site_src / "lib" / "generated" / "install-manifest.json"
            ),
            "reused": "1",
        }
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

    # The source carrier and native carrier are separate signed products.
    # Publish only an explicitly selected pack, never a newest-file glob.
    selected_pack = os.environ.get("VIBECRAFTED_RUNTIME_PACK")
    previous_channel = site_public / "channel" / "main.json"
    previous_archive = site_public / archive_name
    if (
        not selected_pack
        and previous_channel.is_file()
        and previous_archive.is_file()
        and sha256_file(previous_archive) == sha256_file(bundle_root / archive_name)
    ):
        previous = json.loads(previous_channel.read_text(encoding="utf-8"))
        previous_url = previous.get("runtime_pack_url", "")
        prefix = "https://vibecrafted.io/"
        if previous.get("version") == version and previous_url.startswith(prefix):
            previous_name = previous_url.removeprefix(prefix)
            if previous_name and Path(previous_name).name == previous_name:
                selected_pack = str(site_public / previous_name)

    runtime_pack_name = None
    runtime_pack_files: dict[Path, Path] = {}
    if selected_pack:
        pack = Path(selected_pack).expanduser().resolve(strict=True)
        signature = Path(f"{pack}.sig")
        checksum = Path(f"{pack}.sha256")
        for required in (pack, signature, checksum):
            if not required.is_file():
                raise FileNotFoundError(f"Missing Runtime Pack artifact: {required}")
        expected = read_sha256_entries(checksum).get(pack.name)
        if expected != sha256_file(pack):
            raise RuntimeError(f"Runtime Pack checksum mismatch: {pack}")
        runtime_pack_name = pack.name
        runtime_pack_files = {
            artifact: site_public / artifact.name
            for artifact in (pack, signature, checksum)
        }

    for src, dst in required_files.items():
        copy_file(src, dst)

    for src, dst in runtime_pack_files.items():
        if src.resolve() != dst.resolve():
            copy_file(src, dst)
    if runtime_pack_name:
        with (site_public / "SHA256SUMS").open("a", encoding="utf-8") as handle:
            handle.write(
                f"{sha256_file(site_public / runtime_pack_name)}  {runtime_pack_name}\n"
            )

    prune_stale_release_artifacts(site_public, archive_name)
    platforms = describe_platform_coverage(bundle_root, archive_name)
    write_channel_manifest(
        site_public,
        version,
        archive_name,
        platforms,
        runtime_pack_name=runtime_pack_name,
    )
    manifest_json = export_install_manifest(bundle_root, site_src)

    return {
        "version": version,
        "archive": archive_name,
        "bundle_dir": str(bundle_root),
        "public_dir": str(site_public),
        "manifest_json": str(manifest_json),
        "platforms_vendored": sorted(
            label for label, info in platforms.items() if info["vendored_foundations"]
        ),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check-windows-installer",
        action="store_true",
        help="fail unless site/public/install.ps1 exactly matches the product repo",
    )
    args = parser.parse_args()

    windows_installer = sync_windows_installer(
        resolve_product_root(),
        SITE_PUBLIC,
        check=args.check_windows_installer,
    )
    if args.check_windows_installer:
        print(
            "Windows installer mirror is current:",
            json.dumps(windows_installer, indent=2),
        )
        return

    synced = sync_site_release_assets()
    synced["windows_installer"] = windows_installer["target"]
    synced["windows_installer_sha256"] = windows_installer["sha256"]
    print(
        "Synced site release assets:",
        json.dumps(synced, indent=2),
    )


if __name__ == "__main__":
    main()
