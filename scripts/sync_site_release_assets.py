#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shlex
import shutil
import subprocess
import tarfile
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


def selected_release_inputs() -> dict[str, str]:
    selection_path = os.environ.get("VIBECRAFTED_SITE_RELEASE_SELECTION")
    if not selection_path:
        return {}
    selection = json.loads(Path(selection_path).read_text(encoding="utf-8"))
    if selection.get("schema") != "io.vetcoders.vibecrafted.site-release-selection.v1":
        raise RuntimeError("Invalid site release selection")
    for key, env in (
        ("runtime_pack", "VIBECRAFTED_RUNTIME_PACK"),
        ("windows_release", "VIBECRAFTED_WINDOWS_RELEASE"),
    ):
        if (
            not isinstance(selection.get(key), str)
            or not Path(selection[key]).is_file()
        ):
            raise RuntimeError(f"Site release selection is missing {key}")
        override = os.environ.get(env)
        if (
            override
            and Path(override).expanduser().resolve() != Path(selection[key]).resolve()
        ):
            raise RuntimeError(f"{env} conflicts with the prepared site release")
    return selection


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


def _verify_release_signature(path: Path, public_key: Path) -> None:
    signature = Path(f"{path}.sig")
    if not signature.is_file() or signature.is_symlink():
        raise FileNotFoundError(f"Missing release signature: {signature}")
    result = subprocess.run(
        [
            "openssl",
            "dgst",
            "-sha256",
            "-verify",
            str(public_key),
            "-signature",
            str(signature),
            str(path),
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode:
        raise RuntimeError(f"Product-key signature verification failed: {path.name}")


def _carrier_provenance(path: Path, name: str) -> dict:
    with tarfile.open(path, "r:gz") as archive:
        matches = [
            member
            for member in archive
            if member.name.endswith(f"/{name}") and member.name.count("/") == 1
        ]
        if (
            len(matches) != 1
            or not matches[0].isfile()
            or not 0 < matches[0].size <= 2_000_000
        ):
            raise RuntimeError(f"Missing or ambiguous {name}: {path.name}")
        stream = archive.extractfile(matches[0])
        assert stream is not None
        value = json.load(stream)
    if not isinstance(value, dict):
        raise TypeError(f"Invalid {name}: {path.name}")
    return value


def validate_windows_release(
    receipt_path: Path, native_release: dict, public_key: Path
) -> tuple[dict[Path, str], dict]:
    """Admit one complete native Windows release before any public projection.

    The product-key-signed receipt binds the otherwise Authenticode-optional
    MSI/EXE to the signed pack, immutable source, and successful native gates.
    A CI rehearsal key is never a website trust anchor.
    """
    if not receipt_path.is_file() or receipt_path.is_symlink():
        raise FileNotFoundError(f"Missing Windows release receipt: {receipt_path}")
    if receipt_path.stat().st_size > 2_000_000:
        raise RuntimeError("Windows release receipt exceeds the size limit")
    _verify_release_signature(receipt_path, public_key)
    receipt = json.loads(receipt_path.read_text(encoding="utf-8"))
    version = native_release["product"]["version"]
    revisions = native_release["source_revisions"]
    source = revisions["vibecrafted"]
    if any(not re.fullmatch(r"[0-9a-f]{40}", value) for value in revisions.values()):
        raise RuntimeError("Native release requires immutable source revisions")
    if receipt.get("schema") != "io.vetcoders.vibecrafted.windows-release-output.v1":
        raise RuntimeError("Unsupported Windows release receipt")
    if receipt.get("product") != {
        "version": version,
        "platform": "win32-x64",
        "architecture": "x64",
    }:
        raise RuntimeError(
            "Windows release product does not match the selected release"
        )
    if receipt.get("source_revisions") != revisions:
        raise RuntimeError("Windows release source/donor revisions do not match macOS")
    workflow = receipt.get("workflow", {})
    if (
        workflow.get("repository") != "vetcoders/vibecrafted"
        or workflow.get("source_sha") != source
        or not re.fullmatch(r"[0-9a-f]{40}", str(workflow.get("controller_sha", "")))
        or not re.fullmatch(r"[0-9a-f]{24}", str(workflow.get("request_id", "")))
        or not str(workflow.get("run_id", "")).isdigit()
        or not str(workflow.get("run_attempt", "")).isdigit()
    ):
        raise RuntimeError("Windows release workflow identity is incomplete")
    gates = receipt.get("verification", {})
    if any(
        gates.get(name) != "success"
        for name in ("cold_install", "msi_install", "exe_install")
    ):
        raise RuntimeError("Windows release native installation gates are incomplete")
    signing = receipt.get("signing", {})
    if signing.get("runtime_pack") != "product-key" or signing.get(
        "authenticode"
    ) not in ("unsigned", "signed"):
        raise RuntimeError("Windows release requires product-key signing")
    files = {
        receipt_path: "windows-release.json",
        Path(f"{receipt_path}.sig"): "windows-release.json.sig",
    }
    paths = {}
    for role, suffix in (
        ("runtime_pack", "win32-x64.tar.gz"),
        ("msi", "windows-x64.msi"),
        ("exe", "windows-x64.exe"),
    ):
        record = receipt.get(role, {})
        name = record.get("path", "")
        prefix = "Vibecrafted_RuntimePack" if role == "runtime_pack" else "Vibecrafted"
        match = re.fullmatch(
            rf"{prefix}_{re.escape(version)}-(\d{{8}})-{source[:8]}-{re.escape(suffix)}",
            name,
        )
        if not match or Path(name).name != name:
            raise RuntimeError(f"Non-canonical Windows {role} artifact name")
        path = receipt_path.parent / name
        checksum = Path(f"{path}.sha256")
        if (
            not path.is_file()
            or path.is_symlink()
            or not checksum.is_file()
            or checksum.is_symlink()
        ):
            raise FileNotFoundError(f"Missing Windows {role} artifact/checksum: {path}")
        digest = sha256_file(path)
        if (
            not re.fullmatch(r"[0-9a-f]{64}", str(record.get("sha256", "")))
            or digest != record["sha256"]
            or path.stat().st_size != record.get("size")
            or read_sha256_entries(checksum) != {name: digest}
        ):
            raise RuntimeError(f"Windows {role} hash/size/checksum mismatch")
        paths[role] = path
        files.update({path: name, checksum: checksum.name})
    _verify_release_signature(paths["runtime_pack"], public_key)
    files[Path(f"{paths['runtime_pack']}.sig")] = f"{paths['runtime_pack'].name}.sig"
    provenance = _carrier_provenance(
        paths["runtime_pack"], "runtime-pack-provenance.json"
    )
    if (
        provenance.get("source_revisions") != revisions
        or provenance.get("platform") != "win32-x64"
        or provenance.get("architecture") != "x64"
        or provenance.get("version") not in (version, f"{version}+g{source[:8]}")
    ):
        raise RuntimeError("Windows pack provenance does not match its release receipt")
    with paths["msi"].open("rb") as stream:
        if stream.read(8) != bytes.fromhex("d0cf11e0a1b11ae1"):
            raise RuntimeError("Windows MSI is not a native installer")
    with paths["exe"].open("rb") as stream:
        header = stream.read(64)
        if len(header) != 64 or header[:2] != b"MZ":
            raise RuntimeError("Windows EXE is not a native installer")
        stream.seek(int.from_bytes(header[60:64], "little"))
        pe = stream.read(6)
        # WiX Burn is normally an x86 launcher for an x64 MSI/payload.
        if pe[:4] != b"PE\0\0" or int.from_bytes(pe[4:], "little") not in (
            0x14C,
            0x8664,
        ):
            raise RuntimeError("Windows EXE has an invalid PE architecture")
    base = "https://vibecrafted.io/"
    pack_url = base + paths["runtime_pack"].name
    return files, {
        "archive_url": pack_url,
        "runtime_pack_url": pack_url,
        "signature_url": pack_url + ".sig",
        "sha256_url": pack_url + ".sha256",
        "exe_url": base + paths["exe"].name,
        "msi_url": base + paths["msi"].name,
        "release_manifest_url": base + "windows-release.json",
        "release_manifest_signature_url": base + "windows-release.json.sig",
        "source_revision": source,
        "authenticode": signing["authenticode"],
        "vendored_foundations": False,
    }


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
    dmg_name: str | None = None,
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
    if dmg_name:
        manifest["dmg_url"] = f"https://vibecrafted.io/{dmg_name}"
        manifest["release_manifest_url"] = "https://vibecrafted.io/release-output.json"
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
    release_requested = _release_mode() or any(
        os.environ.get(key)
        for key in (
            "VIBECRAFTED_RUNTIME_PACK",
            "VIBECRAFTED_WINDOWS_RELEASE",
            "VIBECRAFTED_SITE_RELEASE_SELECTION",
        )
    )
    if not release_requested and (site_public / "VERSION").is_file():
        return {
            "version": (site_public / "VERSION").read_text(encoding="utf-8").strip(),
            "archive": "",
            "bundle_dir": str(bundle_root),
            "public_dir": str(site_public),
            "manifest_json": str(site_src / "lib/generated/install-manifest.json"),
            "reused": "1",
        }
    if not (bundle_root / "VERSION").exists():
        if release_requested:
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
    selection = selected_release_inputs()
    selected_pack = selection.get("runtime_pack") or os.environ.get(
        "VIBECRAFTED_RUNTIME_PACK"
    )
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
    dmg_name = None
    release = None
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
        release_record = pack.parent / "release-output.json"
        if release_record.is_file():
            release = json.loads(release_record.read_text(encoding="utf-8"))
            if release.get("schema") != "io.vetcoders.vibecrafted.release-output.v1":
                raise RuntimeError("Unsupported native macOS release manifest")
            if (
                release["product"]["version"] != version
                or release["runtime_pack"]["path"] != pack.name
                or release["runtime_pack"]["sha256"] != expected
            ):
                raise RuntimeError(
                    "Native release manifest does not match the selected carrier"
                )
            dmg_name = release["dmg"]["path"]
            if Path(dmg_name).name != dmg_name:
                raise RuntimeError("Native release manifest has a non-local DMG path")
            dmg = pack.parent / dmg_name
            native_files = (
                release_record,
                Path(f"{release_record}.sig"),
                dmg,
                Path(f"{dmg}.sha256"),
            )
            for required in native_files:
                if not required.is_file():
                    raise FileNotFoundError(
                        f"Missing native release artifact: {required}"
                    )
            if (
                sha256_file(dmg) != release["dmg"]["sha256"]
                or read_sha256_entries(Path(f"{dmg}.sha256")).get(dmg.name)
                != release["dmg"]["sha256"]
            ):
                raise RuntimeError(f"DMG checksum mismatch: {dmg}")
            runtime_pack_files.update(
                {artifact: site_public / artifact.name for artifact in native_files}
            )
            _verify_release_signature(
                release_record, bundle_root / "vibecrafted-signing.pub"
            )
            _verify_release_signature(pack, bundle_root / "vibecrafted-signing.pub")

    windows_files: dict[Path, Path] = {}
    windows_platform = None
    selected_windows = selection.get("windows_release") or os.environ.get(
        "VIBECRAFTED_WINDOWS_RELEASE"
    )
    if not selected_windows and (site_public / "windows-release.json").is_file():
        selected_windows = str(site_public / "windows-release.json")
    if selected_windows:
        if release is None:
            raise RuntimeError(
                "Windows publication requires the matching native macOS release manifest"
            )
        if (
            selection
            and selection.get("source_revision")
            != release["source_revisions"]["vibecrafted"]
        ):
            raise RuntimeError(
                "Prepared site release source does not match its native carriers"
            )
        source = _carrier_provenance(
            bundle_root / archive_name, "source-provenance.json"
        )
        if source.get("source_revision") != release["source_revisions"]["vibecrafted"]:
            raise RuntimeError(
                "Source archive and native release belong to different source revisions"
            )
        admitted, windows_platform = validate_windows_release(
            Path(selected_windows).expanduser(),
            release,
            bundle_root / "vibecrafted-signing.pub",
        )
        windows_files = {path: site_public / name for path, name in admitted.items()}
        windows_platform["source_archive_url"] = (
            f"https://vibecrafted.io/{archive_name}"
        )
    elif release_requested:
        raise RuntimeError(
            "A site release requires native Windows EXE, MSI and Runtime Pack. "
            "Run `make windows-release` or set VIBECRAFTED_WINDOWS_RELEASE to its signed receipt."
        )

    for src, dst in required_files.items():
        copy_file(src, dst)

    for src, dst in runtime_pack_files.items():
        if src.resolve() != dst.resolve():
            copy_file(src, dst)
    for src, dst in windows_files.items():
        if src.resolve() != dst.resolve():
            copy_file(src, dst)
    if runtime_pack_name:
        with (site_public / "SHA256SUMS").open("a", encoding="utf-8") as handle:
            handle.write(
                f"{sha256_file(site_public / runtime_pack_name)}  {runtime_pack_name}\n"
            )
            if dmg_name:
                handle.write(f"{sha256_file(site_public / dmg_name)}  {dmg_name}\n")
    if windows_files:
        with (site_public / "SHA256SUMS").open("a", encoding="utf-8") as handle:
            for dst in windows_files.values():
                if (
                    dst.name.endswith((".exe", ".msi", ".tar.gz"))
                    or dst.name == "windows-release.json"
                ):
                    handle.write(f"{sha256_file(dst)}  {dst.name}\n")

    prune_stale_release_artifacts(site_public, archive_name)
    platforms = describe_platform_coverage(bundle_root, archive_name)
    if windows_platform:
        platforms["windows-x64"] = windows_platform
    else:
        platforms["windows-x64"]["native_installers_available"] = False
    write_channel_manifest(
        site_public,
        version,
        archive_name,
        platforms,
        runtime_pack_name=runtime_pack_name,
        dmg_name=dmg_name,
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
