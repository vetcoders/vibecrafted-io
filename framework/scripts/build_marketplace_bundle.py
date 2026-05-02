#!/usr/bin/env python3
from __future__ import annotations

import argparse
import glob
import hashlib
import json
import os
import re
import shutil
import tarfile
import tempfile
import zipfile
from dataclasses import dataclass
from io import BytesIO
from pathlib import Path

try:
    from vetcoders_install import discover_skills
except ModuleNotFoundError:  # pragma: no cover - import path depends on entrypoint
    from scripts.vetcoders_install import discover_skills

OUTPUT_FILENAME = "vibecrafted-framework.plugin"
PLUGIN_NAME = "vibecrafted-framework"
FIXED_ZIP_DATE_TIME = (2026, 3, 30, 0, 0, 0)
DEFAULT_FILE_MODE = 0o100644
IGNORED_PATH_PARTS = {".DS_Store", "__pycache__", ".pytest_cache"}
SUPPORT_DOC_PATHS = (
    "docs/QUICK_START.md",
    "docs/FAQ.md",
    "docs/RELEASE_KICKOFF.md",
    "docs/SUBMISSION_FORMS.md",
)


@dataclass(frozen=True)
class ListingMetadata:
    description: str
    keywords: tuple[str, ...]
    homepage: str
    repository: str
    documentation: str
    faq: str
    license: str


@dataclass(frozen=True)
class FoundationArchive:
    name: str
    archive_path: Path
    version: str
    archive_sha256: str
    signed: bool
    signing_identity: str | None
    extracted_root: Path


REPO_ROOT = Path(__file__).resolve().parent.parent


def read_version(repo_root: Path) -> str:
    return (repo_root / "VERSION").read_text(encoding="utf-8").strip()


def parse_listing_metadata(text: str) -> ListingMetadata:
    in_registry_section = False
    values: dict[str, str] = {}

    for raw_line in text.splitlines():
        line = raw_line.rstrip()
        if line.strip() in {"## Registry Metadata", "## Registry Metadata Draft"}:
            in_registry_section = True
            continue
        if not in_registry_section:
            continue
        if line.startswith("## "):
            break
        match = re.match(r"-\s+([a-z]+):\s*(.+)", line)
        if match:
            values[match.group(1)] = match.group(2).strip()

    required = {
        "description",
        "keywords",
        "homepage",
        "repository",
        "documentation",
        "faq",
        "license",
    }
    missing = sorted(required - values.keys())
    if missing:
        raise ValueError(
            f"Missing registry metadata in docs/MARKETPLACE_LISTING.md: {', '.join(missing)}"
        )

    keywords = tuple(
        keyword.strip() for keyword in values["keywords"].split(",") if keyword.strip()
    )
    return ListingMetadata(
        description=values["description"],
        keywords=keywords,
        homepage=values["homepage"],
        repository=values["repository"],
        documentation=values["documentation"],
        faq=values["faq"],
        license=values["license"],
    )


def load_listing_metadata(repo_root: Path) -> ListingMetadata:
    listing_path = repo_root / "docs" / "MARKETPLACE_LISTING.md"
    return parse_listing_metadata(listing_path.read_text(encoding="utf-8"))


def discover_bundle_skills(repo_root: Path) -> list[Path]:
    return sorted(
        (skill for skill in discover_skills(repo_root) if skill.name.startswith("vc-")),
        key=lambda path: path.name,
    )


def discover_foundation_skills(repo_root: Path) -> list[Path]:
    """Find foundation skill directories under skills/foundations/vc-*.

    The main discover_skills helper (in vetcoders_install) scans only direct
    children of skills/ with a vc- or vetcoders- prefix, so foundation skills
    nested under skills/foundations/ are invisible to it. The bundle must still
    ship them so relative links from pipeline skills (e.g. ../foundations/vc-loctree)
    resolve inside the extracted plugin tree.
    """
    foundations_dir = repo_root / "skills" / "foundations"
    if not foundations_dir.exists() or not foundations_dir.is_dir():
        return []
    return sorted(
        (
            entry
            for entry in foundations_dir.iterdir()
            if entry.is_dir()
            and not entry.name.startswith(".")
            and entry.name.startswith("vc-")
            and (entry / "SKILL.md").exists()
        ),
        key=lambda path: path.name,
    )


def should_skip_path(path: Path) -> bool:
    if path.name.endswith(".pyc"):
        return True
    if path.name.startswith("._"):
        return True
    return any(part in IGNORED_PATH_PARTS for part in path.parts)


def iter_skill_files(skill_dir: Path) -> list[Path]:
    return sorted(
        (
            path
            for path in skill_dir.rglob("*")
            if path.is_file() and not should_skip_path(path.relative_to(skill_dir))
        ),
        key=lambda path: path.relative_to(skill_dir).as_posix(),
    )


def iter_bundled_tool_files(repo_root: Path) -> list[Path]:
    """Yield notarized drop-in binaries staged under tools/bin/.

    Layout expected by install-foundations.sh / installer_gui.py:
      tools/bin/<os>-<arch>/<binary>   — per-arch (preferred for multi-target releases)
      tools/bin/<binary>               — flat fallback for single-arch dev drops
      tools/bin/README.md              — drop-in convention docs (always shipped)

    Missing or empty directory returns []. Subdirectories other than the
    recognized <os>-<arch> shape (e.g. .DS_Store) still ship but should be
    avoided by convention.
    """
    bin_dir = repo_root / "tools" / "bin"
    if not bin_dir.is_dir():
        return []
    return sorted(
        (
            path
            for path in bin_dir.rglob("*")
            if path.is_file()
            and not should_skip_path(path.relative_to(bin_dir))
            and path.name != ".gitkeep"
        ),
        key=lambda path: path.relative_to(bin_dir).as_posix(),
    )


def plugin_manifest(version: str, metadata: ListingMetadata) -> dict[str, object]:
    return {
        "name": PLUGIN_NAME,
        "version": version,
        "description": metadata.description,
        "author": {
            "name": "VetCoders",
            "email": "hello@vetcoders.io",
        },
        "homepage": metadata.homepage,
        "repository": metadata.repository,
        "license": metadata.license,
        "keywords": list(metadata.keywords),
    }


def mcp_config() -> dict[str, object]:
    return {
        "mcpServers": {
            "loctree": {
                "command": "loctree-mcp",
                "args": [],
                "env": {},
            }
        }
    }


def write_zip_entry(
    bundle: zipfile.ZipFile, arcname: str, data: bytes, mode: int
) -> None:
    info = zipfile.ZipInfo(arcname, FIXED_ZIP_DATE_TIME)
    info.compress_type = zipfile.ZIP_DEFLATED
    info.create_system = 3
    info.external_attr = (mode & 0xFFFF) << 16
    bundle.writestr(info, data)


def generated_bundle_files(repo_root: Path) -> dict[str, str]:
    version = read_version(repo_root)
    metadata = load_listing_metadata(repo_root)
    listing_path = repo_root / "docs" / "MARKETPLACE_LISTING.md"

    generated_files = {
        ".claude-plugin/plugin.json": json.dumps(
            plugin_manifest(version, metadata), indent=2
        )
        + "\n",
        ".mcp.json": json.dumps(mcp_config(), indent=2) + "\n",
        "README.md": listing_path.read_text(encoding="utf-8").rstrip() + "\n",
        "LICENSE": (repo_root / "LICENSE").read_text(encoding="utf-8").rstrip() + "\n",
        "VERSION": version + "\n",
    }
    for relative_path in SUPPORT_DOC_PATHS:
        generated_files[relative_path] = (repo_root / relative_path).read_text(
            encoding="utf-8"
        ).rstrip() + "\n"
    return generated_files


def write_marketplace_payload(
    bundle: zipfile.ZipFile,
    repo_root: Path,
    prefix: str = "",
    seen: set[str] | None = None,
) -> int:
    if seen is None:
        seen = set()
    count = 0
    prefix = prefix.strip("/")
    prefix = f"{prefix}/" if prefix else ""

    for arcname, text in generated_bundle_files(repo_root).items():
        full_arcname = f"{prefix}{arcname}"
        if full_arcname in seen:
            continue
        write_zip_entry(
            bundle,
            full_arcname,
            text.encode("utf-8"),
            DEFAULT_FILE_MODE,
        )
        seen.add(full_arcname)
        count += 1

    for skill_dir in discover_bundle_skills(repo_root):
        for source_file in iter_skill_files(skill_dir):
            relative = source_file.relative_to(skill_dir).as_posix()
            arcname = f"{prefix}skills/{skill_dir.name}/{relative}"
            if arcname in seen:
                continue
            write_zip_entry(
                bundle,
                arcname,
                source_file.read_bytes(),
                source_file.stat().st_mode,
            )
            seen.add(arcname)
            count += 1

    for foundation_dir in discover_foundation_skills(repo_root):
        for source_file in iter_skill_files(foundation_dir):
            relative = source_file.relative_to(foundation_dir).as_posix()
            arcname = f"{prefix}skills/foundations/{foundation_dir.name}/{relative}"
            if arcname in seen:
                continue
            write_zip_entry(
                bundle,
                arcname,
                source_file.read_bytes(),
                source_file.stat().st_mode,
            )
            seen.add(arcname)
            count += 1

    bundled_bin_root = repo_root / "tools" / "bin"
    for source_file in iter_bundled_tool_files(repo_root):
        relative = source_file.relative_to(bundled_bin_root).as_posix()
        arcname = f"{prefix}tools/bin/{relative}"
        if arcname in seen:
            continue
        write_zip_entry(
            bundle,
            arcname,
            source_file.read_bytes(),
            source_file.stat().st_mode,
        )
        seen.add(arcname)
        count += 1

    return count


FRAMEWORK_RELEASE_DIRS = (
    "config",
    "docs",
    "runtime",
    "scripts",
    "skills",
    "tools",
    "vibecrafted-core",
    "vibecrafted-mcp",
)
FRAMEWORK_RELEASE_FILES = (
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "install.sh",
    "install.toml",
    "LICENSE",
    "README.md",
    "SECURITY.md",
    "VERSION",
)


def iter_framework_release_files(repo_root: Path) -> list[Path]:
    files: list[Path] = []
    for relative in FRAMEWORK_RELEASE_FILES:
        path = repo_root / relative
        if path.is_file() and not should_skip_path(path.relative_to(repo_root)):
            files.append(path)

    for relative_dir in FRAMEWORK_RELEASE_DIRS:
        directory = repo_root / relative_dir
        if not directory.is_dir():
            continue
        files.extend(
            path
            for path in directory.rglob("*")
            if path.is_file() and not should_skip_path(path.relative_to(repo_root))
        )

    return sorted(files, key=lambda path: path.relative_to(repo_root).as_posix())


def write_framework_release_payload(
    bundle: zipfile.ZipFile,
    repo_root: Path,
    prefix: str,
    seen: set[str],
) -> int:
    count = 0
    prefix = prefix.strip("/")
    prefix = f"{prefix}/" if prefix else ""

    for source_file in iter_framework_release_files(repo_root):
        relative = source_file.relative_to(repo_root).as_posix()
        arcname = f"{prefix}{relative}"
        if arcname in seen:
            continue
        write_zip_entry(
            bundle,
            arcname,
            source_file.read_bytes(),
            source_file.stat().st_mode,
        )
        seen.add(arcname)
        count += 1

    return count


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def parse_foundation_spec(spec: str) -> tuple[str, str]:
    if "=" not in spec:
        raise ValueError(
            f"Invalid foundation spec {spec!r}; expected NAME=PATH_OR_GLOB."
        )
    name, pattern = spec.split("=", 1)
    name = name.strip()
    pattern = pattern.strip()
    if not name or not re.match(r"^[A-Za-z0-9_.-]+$", name):
        raise ValueError(f"Invalid foundation name in {spec!r}.")
    if not pattern:
        raise ValueError(f"Missing archive path for foundation {name!r}.")
    return name, pattern


def resolve_foundation_archive(pattern: str) -> Path:
    expanded = os.path.expanduser(os.path.expandvars(pattern))
    matches = [Path(path).resolve() for path in glob.glob(expanded)]
    if not matches:
        candidate = Path(expanded).resolve()
        if candidate.exists():
            matches = [candidate]
    if not matches:
        raise FileNotFoundError(f"No foundation archive matches: {pattern}")
    if len(matches) > 1:
        matches.sort(key=lambda path: (path.stat().st_mtime, path.name))
        return matches[-1]
    return matches[0]


def parse_archive_version(name: str, archive_path: Path) -> str:
    archive_name = archive_path.name
    archive_name = re.sub(r"(\.tar\.gz|\.tgz|\.zip)$", "", archive_name)
    match = re.search(
        rf"{re.escape(name)}[-_]?v?([0-9]+(?:\.[0-9]+)+)",
        archive_name,
    )
    if match:
        return match.group(1)
    generic = re.search(r"([0-9]+(?:\.[0-9]+)+)", archive_name)
    return generic.group(1) if generic else "unknown"


def ensure_within_directory(root: Path, candidate: Path) -> None:
    root = root.resolve()
    candidate = candidate.resolve()
    if root == candidate:
        return
    if root not in candidate.parents:
        raise ValueError(f"Archive member escapes extraction root: {candidate}")


def extract_tar_safe(archive_path: Path, destination: Path) -> None:
    with tarfile.open(archive_path) as archive:
        for member in archive.getmembers():
            target = destination / member.name
            ensure_within_directory(destination, target)
            if member.isdir():
                target.mkdir(parents=True, exist_ok=True)
                target.chmod(member.mode)
                continue
            if not member.isfile():
                raise ValueError(
                    f"Unsupported tar member type in {archive_path}: {member.name}"
                )
            target.parent.mkdir(parents=True, exist_ok=True)
            source = archive.extractfile(member)
            if source is None:
                raise ValueError(f"Could not read tar member: {member.name}")
            with source, target.open("wb") as output:
                shutil.copyfileobj(source, output)
            target.chmod(member.mode)


def extract_zip_safe(archive_path: Path, destination: Path) -> None:
    with zipfile.ZipFile(archive_path) as archive:
        for member in archive.infolist():
            ensure_within_directory(destination, destination / member.filename)
        archive.extractall(destination)


def normalize_extracted_root(destination: Path) -> Path:
    children = [
        child
        for child in destination.iterdir()
        if not should_skip_path(child.relative_to(destination))
        and child.name != ".gitkeep"
    ]
    if len(children) == 1 and children[0].is_dir():
        return children[0]
    return destination


def prepare_foundation_archives(
    specs: list[str],
    variant: str,
    work_dir: Path,
) -> list[FoundationArchive]:
    foundations: list[FoundationArchive] = []
    for spec in specs:
        name, pattern = parse_foundation_spec(spec)
        archive_path = resolve_foundation_archive(pattern)
        extract_dir = work_dir / name
        extract_dir.mkdir(parents=True, exist_ok=True)

        if tarfile.is_tarfile(archive_path):
            extract_tar_safe(archive_path, extract_dir)
        elif zipfile.is_zipfile(archive_path):
            extract_zip_safe(archive_path, extract_dir)
        else:
            raise ValueError(f"Unsupported foundation archive type: {archive_path}")

        signed = variant == "signed" and "unsigned" not in archive_path.name
        identity_env = f"{name.upper().replace('-', '_')}_SIGNING_IDENTITY"
        signing_identity = (
            os.environ.get(identity_env)
            or os.environ.get("MACOS_DEVELOPER_ID_APPLICATION")
            if signed
            else None
        )
        foundations.append(
            FoundationArchive(
                name=name,
                archive_path=archive_path,
                version=parse_archive_version(name, archive_path),
                archive_sha256=sha256_file(archive_path),
                signed=signed,
                signing_identity=signing_identity,
                extracted_root=normalize_extracted_root(extract_dir),
            )
        )
    return foundations


def write_foundation_payload(
    bundle: zipfile.ZipFile,
    foundation: FoundationArchive,
) -> int:
    count = 0
    for source_file in sorted(
        (
            path
            for path in foundation.extracted_root.rglob("*")
            if path.is_file()
            and not should_skip_path(path.relative_to(foundation.extracted_root))
        ),
        key=lambda path: path.relative_to(foundation.extracted_root).as_posix(),
    ):
        relative = source_file.relative_to(foundation.extracted_root).as_posix()
        write_zip_entry(
            bundle,
            f"foundations/{foundation.name}/{relative}",
            source_file.read_bytes(),
            source_file.stat().st_mode,
        )
        count += 1
    return count


def release_manifest(
    repo_root: Path,
    variant: str,
    foundations: list[FoundationArchive],
    framework_files_count: int,
) -> dict[str, object]:
    return {
        "framework_version": read_version(repo_root),
        "variant": variant,
        "foundations": {
            foundation.name: {
                "version": foundation.version,
                "archive_sha256": foundation.archive_sha256,
                "signed": foundation.signed,
                "signing_identity": foundation.signing_identity,
            }
            for foundation in foundations
        },
        "framework": {
            "skills_count": len(discover_bundle_skills(repo_root)),
            "files_count": framework_files_count,
        },
    }


def build_bundle_bytes(
    repo_root: Path,
    foundation_specs: list[str] | None = None,
    variant: str = "signed",
) -> bytes:
    buffer = BytesIO()
    foundation_specs = foundation_specs or []

    with tempfile.TemporaryDirectory(prefix="vibecrafted-foundations-") as tmp:
        foundations = prepare_foundation_archives(
            foundation_specs,
            variant,
            Path(tmp),
        )
        with zipfile.ZipFile(buffer, "w", compression=zipfile.ZIP_DEFLATED) as bundle:
            if foundations:
                seen: set[str] = set()
                framework_files_count = write_marketplace_payload(
                    bundle, repo_root, prefix="framework", seen=seen
                )
                framework_files_count += write_framework_release_payload(
                    bundle, repo_root, prefix="framework", seen=seen
                )
                for foundation in foundations:
                    write_foundation_payload(bundle, foundation)
                write_zip_entry(
                    bundle,
                    "MANIFEST.json",
                    json.dumps(
                        release_manifest(
                            repo_root,
                            variant,
                            foundations,
                            framework_files_count,
                        ),
                        indent=2,
                        sort_keys=True,
                    ).encode("utf-8")
                    + b"\n",
                    DEFAULT_FILE_MODE,
                )
                installer_path = repo_root / "install-plugin.sh"
                if not installer_path.is_file():
                    raise FileNotFoundError(
                        f"Missing plugin installer: {installer_path}"
                    )
                write_zip_entry(
                    bundle,
                    "install.sh",
                    installer_path.read_bytes(),
                    0o100755,
                )
            else:
                write_marketplace_payload(bundle, repo_root)

    return buffer.getvalue()


def write_bundle(
    repo_root: Path,
    output_path: Path,
    foundation_specs: list[str] | None = None,
    variant: str = "signed",
) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(build_bundle_bytes(repo_root, foundation_specs, variant))


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build the 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. marketplace bundle from current repo state."
    )
    parser.add_argument(
        "--output",
        default=str(REPO_ROOT / OUTPUT_FILENAME),
        help="Path to the .plugin zip to write.",
    )
    parser.add_argument(
        "--include-foundation",
        action="append",
        default=[],
        metavar="NAME=PATH",
        help=(
            "Include foundation archive (for example "
            "'aicx=path/to/aicx.tar.gz' or 'loctree=path/to/loctree.zip'). "
            "Glob patterns are expanded. Repeatable."
        ),
    )
    parser.add_argument(
        "--variant",
        choices=["signed", "unsigned"],
        default="signed",
        help="Bundle variant. Affects MANIFEST.json metadata.",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    output_path = Path(args.output).expanduser().resolve()

    write_bundle(REPO_ROOT, output_path, args.include_foundation, args.variant)
    foundation_note = (
        f" and {len(args.include_foundation)} foundation archive(s)"
        if args.include_foundation
        else ""
    )
    print(
        f"Built {output_path} from 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. {read_version(REPO_ROOT)} "
        f"with {len(discover_bundle_skills(REPO_ROOT))} current skills"
        f"{foundation_note}."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
