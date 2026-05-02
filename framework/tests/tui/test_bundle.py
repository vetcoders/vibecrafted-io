import json
import tarfile
import zipfile
from pathlib import Path

from scripts import build_marketplace_bundle as bundle


def test_parse_listing_metadata_reads_current_registry_fields() -> None:
    text = (bundle.REPO_ROOT / "docs" / "MARKETPLACE_LISTING.md").read_text(
        encoding="utf-8"
    )

    metadata = bundle.parse_listing_metadata(text)

    assert metadata.homepage == "https://vibecrafted.io/"
    assert metadata.repository == "https://github.com/VetCoders/vibecrafted"
    assert metadata.documentation == "https://vibecrafted.io/en/quickstart/"
    assert metadata.faq == "https://vibecrafted.io/en/faq/"
    assert metadata.license.startswith("Business Source License 1.1")
    assert "codex" in metadata.keywords


def test_discover_bundle_skills_tracks_live_skill_surface() -> None:
    skill_names = [
        skill.name for skill in bundle.discover_bundle_skills(bundle.REPO_ROOT)
    ]

    assert "vc-implement" in skill_names
    assert "vc-justdo" in skill_names  # alias kept in bundle
    assert "vc-marbles" in skill_names
    assert "vc-ship" not in skill_names
    assert "vc-ownership" in skill_names
    assert "vc-screenscribe" not in skill_names


def test_top_level_skill_dirs_are_live_skills_or_foundations() -> None:
    allowed_non_skill_dirs = {"foundations"}
    offenders: list[str] = []

    for path in sorted((bundle.REPO_ROOT / "skills").iterdir()):
        if not path.is_dir() or path.name in allowed_non_skill_dirs:
            continue

        missing = [
            marker
            for marker in ("SKILL.md", "FLOW.md")
            if not (path / marker).is_file()
        ]
        if missing:
            offenders.append(
                f"{path.relative_to(bundle.REPO_ROOT)} missing {', '.join(missing)}"
            )

    assert not offenders, "\n".join(offenders)


def test_write_bundle_uses_current_metadata_and_skill_inventory(tmp_path: Path) -> None:
    output_path = tmp_path / bundle.OUTPUT_FILENAME

    bundle.write_bundle(bundle.REPO_ROOT, output_path)

    with zipfile.ZipFile(output_path) as archive:
        manifest = json.loads(archive.read(".claude-plugin/plugin.json"))
        members = set(archive.namelist())

    assert manifest["version"] == bundle.read_version(bundle.REPO_ROOT)
    assert manifest["license"] != "MIT"
    assert "skills/vc-implement/SKILL.md" in members
    assert "skills/vc-justdo/SKILL.md" in members  # alias kept in bundle
    assert "skills/vc-marbles/SKILL.md" in members
    assert "skills/vc-ship/SKILL.md" not in members
    assert "skills/vc-ownership/SKILL.md" in members
    assert "skills/vc-screenscribe/SKILL.md" not in members
    assert "docs/RELEASE_KICKOFF.md" in members
    assert "docs/SUBMISSION_FORMS.md" in members


def test_write_bundle_includes_bundled_tool_drop_in_slot(
    monkeypatch, tmp_path: Path
) -> None:
    repo_root = tmp_path / "repo"
    bin_root = repo_root / "tools" / "bin"
    per_arch = bin_root / "linux-x86_64"
    per_arch.mkdir(parents=True)
    (repo_root / "docs").mkdir()
    (repo_root / "VERSION").write_text("9.9.9\n", encoding="utf-8")
    (repo_root / "LICENSE").write_text("license\n", encoding="utf-8")
    (repo_root / "docs" / "MARKETPLACE_LISTING.md").write_text(
        "listing\n", encoding="utf-8"
    )
    (per_arch / "loctree-mcp").write_text("binary\n", encoding="utf-8")
    (bin_root / "prview").write_text("binary\n", encoding="utf-8")
    (bin_root / ".gitkeep").write_text("", encoding="utf-8")
    (bin_root / ".DS_Store").write_text("", encoding="utf-8")

    monkeypatch.setattr(bundle, "SUPPORT_DOC_PATHS", ())
    monkeypatch.setattr(bundle, "discover_bundle_skills", lambda _repo: [])
    monkeypatch.setattr(bundle, "discover_foundation_skills", lambda _repo: [])
    monkeypatch.setattr(
        bundle,
        "load_listing_metadata",
        lambda _repo: bundle.ListingMetadata(
            description="desc",
            keywords=("codex",),
            homepage="https://vibecrafted.io/",
            repository="https://github.com/VetCoders/vibecrafted",
            documentation="https://vibecrafted.io/en/quickstart/",
            faq="https://vibecrafted.io/en/faq/",
            license="Business Source License 1.1",
        ),
    )

    archive_bytes = bundle.build_bundle_bytes(repo_root)

    archive_path = tmp_path / "bundle.plugin"
    archive_path.write_bytes(archive_bytes)
    with zipfile.ZipFile(archive_path) as archive:
        members = set(archive.namelist())

    assert "tools/bin/linux-x86_64/loctree-mcp" in members
    assert "tools/bin/prview" in members
    assert "tools/bin/.gitkeep" not in members
    assert "tools/bin/.DS_Store" not in members


def test_write_bundle_can_embed_unsigned_foundation_archive(
    monkeypatch, tmp_path: Path
) -> None:
    repo_root = tmp_path / "repo"
    (repo_root / "docs").mkdir(parents=True)
    (repo_root / "scripts").mkdir()
    (repo_root / "skills" / "vc-implement").mkdir(parents=True)
    (repo_root / "VERSION").write_text("1.5.0\n", encoding="utf-8")
    (repo_root / "LICENSE").write_text("license\n", encoding="utf-8")
    (repo_root / "README.md").write_text("readme\n", encoding="utf-8")
    (repo_root / "docs" / "MARKETPLACE_LISTING.md").write_text(
        "listing\n", encoding="utf-8"
    )
    (repo_root / "install.sh").write_text("#!/usr/bin/env bash\n", encoding="utf-8")
    (repo_root / "install.toml").write_text("", encoding="utf-8")
    (repo_root / "install-plugin.sh").write_text(
        "#!/usr/bin/env bash\n", encoding="utf-8"
    )
    (repo_root / "scripts" / "vetcoders_install.py").write_text(
        "print('install')\n", encoding="utf-8"
    )
    (repo_root / "skills" / "vc-implement" / "SKILL.md").write_text(
        "skill\n", encoding="utf-8"
    )

    foundation_root = tmp_path / "aicx-0.6.3-darwin-arm64"
    (foundation_root / "bin").mkdir(parents=True)
    aicx_bin = foundation_root / "bin" / "aicx"
    aicx_bin.write_text("#!/usr/bin/env bash\necho aicx\n", encoding="utf-8")
    aicx_bin.chmod(0o755)
    archive_path = tmp_path / "aicx-0.6.3-darwin-arm64-unsigned.tar.gz"
    with tarfile.open(archive_path, "w:gz") as archive:
        archive.add(foundation_root, arcname=foundation_root.name)

    monkeypatch.setattr(bundle, "SUPPORT_DOC_PATHS", ())
    monkeypatch.setattr(
        bundle,
        "discover_bundle_skills",
        lambda repo: [repo / "skills" / "vc-implement"],
    )
    monkeypatch.setattr(bundle, "discover_foundation_skills", lambda _repo: [])
    monkeypatch.setattr(bundle, "iter_bundled_tool_files", lambda _repo: [])
    monkeypatch.setattr(
        bundle,
        "load_listing_metadata",
        lambda _repo: bundle.ListingMetadata(
            description="desc",
            keywords=("codex",),
            homepage="https://vibecrafted.io/",
            repository="https://github.com/VetCoders/vibecrafted",
            documentation="https://vibecrafted.io/en/quickstart/",
            faq="https://vibecrafted.io/en/faq/",
            license="Business Source License 1.1",
        ),
    )

    archive_bytes = bundle.build_bundle_bytes(
        repo_root,
        [f"aicx={archive_path}"],
        variant="unsigned",
    )
    output_path = tmp_path / "bundle.plugin"
    output_path.write_bytes(archive_bytes)

    with zipfile.ZipFile(output_path) as archive:
        members = set(archive.namelist())
        manifest = json.loads(archive.read("MANIFEST.json"))
        mode = archive.getinfo("foundations/aicx/bin/aicx").external_attr >> 16

    assert "framework/scripts/vetcoders_install.py" in members
    assert "framework/skills/vc-implement/SKILL.md" in members
    assert "foundations/aicx/bin/aicx" in members
    assert "install.sh" in members
    assert manifest["framework_version"] == "1.5.0"
    assert manifest["variant"] == "unsigned"
    assert manifest["foundations"]["aicx"]["version"] == "0.6.3"
    assert manifest["foundations"]["aicx"]["signed"] is False
    assert mode & 0o111


def test_framework_playground_uses_vibecrafted_command_deck() -> None:
    text = (bundle.REPO_ROOT / "docs" / "presence" / "framework.js").read_text(
        encoding="utf-8"
    )

    assert "vibecrafted scaffold claude" in text
    assert "vibecrafted partner claude" in text
    assert "vibecrafted marbles codex --count " in text
    assert "return 'vc-' + phaseDef.name;" not in text
