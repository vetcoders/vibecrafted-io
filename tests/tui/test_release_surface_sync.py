from __future__ import annotations

import json
from pathlib import Path

from scripts.sync_site_release_assets import sync_site_release_assets


def test_sync_site_release_assets_copies_current_surface_and_prunes_stale_versions(
    tmp_path: Path,
) -> None:
    repo_root = tmp_path / "repo"
    site_public = repo_root / "site" / "public"
    site_public.mkdir(parents=True)

    version = "9.9.9"
    archive_name = f"vibecrafted-v{version}.tar.gz"

    (repo_root / "VERSION").write_text(f"{version}\n", encoding="utf-8")
    (repo_root / "install.sh").write_text("#!/usr/bin/env bash\necho current\n", encoding="utf-8")
    (repo_root / "install.sh.sig").write_bytes(b"install-signature")
    (repo_root / "vibecrafted-signing.pub").write_text("PUBLIC KEY\n", encoding="utf-8")
    (repo_root / "SHA256SUMS").write_text(
        f"abc123  {archive_name}\n"
        "def456  install.sh\n",
        encoding="utf-8",
    )
    (repo_root / archive_name).write_bytes(b"bundle")
    (repo_root / f"{archive_name}.sig").write_bytes(b"bundle-signature")

    (site_public / "install.sh").write_text("old install\n", encoding="utf-8")
    (site_public / "VERSION").write_text("1.2.1\n", encoding="utf-8")
    (site_public / "SHA256SUMS.tar").write_text("old sums\n", encoding="utf-8")
    (site_public / "vibecrafted-v1.2.1.tar.gz").write_bytes(b"old bundle")
    (site_public / "vibecrafted-v1.2.1.tar.gz.sig").write_bytes(b"old bundle sig")

    synced = sync_site_release_assets(repo_root, site_public)

    assert synced["version"] == version
    assert synced["archive"] == archive_name
    assert (site_public / "install.sh").read_text(encoding="utf-8") == "#!/usr/bin/env bash\necho current\n"
    assert (site_public / "VERSION").read_text(encoding="utf-8") == f"{version}\n"
    assert (site_public / "SHA256SUMS").read_text(encoding="utf-8").startswith("abc123")
    assert (site_public / archive_name).read_bytes() == b"bundle"
    assert (site_public / f"{archive_name}.sig").read_bytes() == b"bundle-signature"
    assert (site_public / "install.sh.sig").read_bytes() == b"install-signature"
    assert (site_public / "vibecrafted-signing.pub").read_text(encoding="utf-8") == "PUBLIC KEY\n"
    assert not (site_public / "SHA256SUMS.tar").exists()
    assert not (site_public / "vibecrafted-v1.2.1.tar.gz").exists()
    assert not (site_public / "vibecrafted-v1.2.1.tar.gz.sig").exists()

    manifest = json.loads((site_public / "channel" / "main.json").read_text(encoding="utf-8"))
    assert manifest["version"] == version
    assert manifest["archive_url"].endswith(f"/{archive_name}")
    assert manifest["signature_url"].endswith(f"/{archive_name}.sig")
    assert manifest["sha256_url"].endswith("/SHA256SUMS")
    assert manifest["public_key_url"].endswith("/vibecrafted-signing.pub")
