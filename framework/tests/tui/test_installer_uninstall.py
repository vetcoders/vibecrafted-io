from __future__ import annotations

import argparse
from pathlib import Path

from scripts import vetcoders_install as installer


def test_uninstall_removes_tracked_launchers(tmp_path: Path, monkeypatch) -> None:
    home = tmp_path / "home"
    crafted_home = home / ".vibecrafted"
    store_path = crafted_home / "skills"
    launcher_bin = home / ".local" / "bin"

    store_path.mkdir(parents=True)
    launcher_bin.mkdir(parents=True)

    # Create a launcher that is tracked
    launcher_file = launcher_bin / "vibecrafted"
    launcher_file.write_text("#!/bin/bash\necho ok", encoding="utf-8")
    launcher_file.chmod(0o755)

    # Create an untracked file in the same dir
    untracked_file = launcher_bin / "other-tool"
    untracked_file.write_text("#!/bin/bash\necho keep me", encoding="utf-8")

    # Create manifest
    state = installer.InstallState(
        launcher_entries=[str(launcher_file)], skills=["vc-test"]
    )
    (store_path / "vc-test").mkdir()
    state.save(store_path)

    monkeypatch.setenv("HOME", str(home))
    monkeypatch.setenv("VIBECRAFTED_HOME", str(crafted_home))
    monkeypatch.setattr(installer, "_IS_TTY", False)  # Avoid ask_yn

    args = argparse.Namespace(dry_run=False)
    installer.cmd_uninstall(args)

    # Tracked file should be gone
    assert not launcher_file.exists()
    # Untracked file should remain
    assert untracked_file.exists()
    # Skill should be gone
    assert not (store_path / "vc-test").exists()


def test_uninstall_edge_case_wrappers_remain_when_skills_gone(
    tmp_path: Path, monkeypatch
) -> None:
    """If skills dir is empty but launchers exist and are tracked, they should be removed."""
    home = tmp_path / "home"
    crafted_home = home / ".vibecrafted"
    store_path = crafted_home / "skills"
    launcher_bin = home / ".local" / "bin"

    store_path.mkdir(parents=True)
    launcher_bin.mkdir(parents=True)

    # Tracked launcher
    launcher_file = launcher_bin / "vibecrafted"
    launcher_file.write_text("#!/bin/bash\necho ok", encoding="utf-8")

    # Manifest says we have this launcher, but no skills
    state = installer.InstallState(launcher_entries=[str(launcher_file)], skills=[])
    state.save(store_path)

    monkeypatch.setenv("HOME", str(home))
    monkeypatch.setenv("VIBECRAFTED_HOME", str(crafted_home))
    monkeypatch.setattr(installer, "_IS_TTY", False)

    args = argparse.Namespace(dry_run=False)
    installer.cmd_uninstall(args)

    # Launcher should be removed even if no skills were present
    assert not launcher_file.exists()


def test_uninstall_heuristic_fallback_works_without_manifest(
    tmp_path: Path, monkeypatch
) -> None:
    """If manifest is missing, heuristic should find vibecrafted and vc-* and remove them."""
    home = tmp_path / "home"
    crafted_home = home / ".vibecrafted"
    store_path = crafted_home / "skills"
    launcher_bin = home / ".local" / "bin"

    store_path.mkdir(parents=True)
    launcher_bin.mkdir(parents=True)

    # Binaries that the heuristic should find
    v_bin = launcher_bin / "vibecrafted"
    v_bin.write_text("ok")
    vc_bin = launcher_bin / "vc-test"
    vc_bin.write_text("ok")

    # Binary that should NOT be found
    other_bin = launcher_bin / "something-else"
    other_bin.write_text("ok")

    monkeypatch.setenv("HOME", str(home))
    monkeypatch.setenv("VIBECRAFTED_HOME", str(crafted_home))
    monkeypatch.setattr(installer, "_IS_TTY", False)

    # Ensure no manifest exists
    assert not (store_path / installer.STATE_FILE).exists()

    args = argparse.Namespace(dry_run=False)
    installer.cmd_uninstall(args)

    assert not v_bin.exists()
    assert not vc_bin.exists()
    assert other_bin.exists()
