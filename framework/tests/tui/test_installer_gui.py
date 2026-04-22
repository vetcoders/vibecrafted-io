from __future__ import annotations

import json
import threading
import urllib.request
from pathlib import Path

from scripts import installer_gui


def test_build_install_command_respects_shell_toggle(tmp_path: Path) -> None:
    installer = tmp_path / "scripts" / "vetcoders_install.py"
    installer.parent.mkdir(parents=True)
    installer.write_text("#!/usr/bin/env python3\n", encoding="utf-8")

    with_shell = installer_gui.build_install_command(str(tmp_path), with_shell=True)
    without_shell = installer_gui.build_install_command(str(tmp_path), with_shell=False)

    assert with_shell[-1] == "--with-shell"
    assert "--with-shell" not in without_shell
    assert with_shell[:5] == without_shell[:5]


def test_build_install_steps_include_foundations_before_installer(
    tmp_path: Path,
) -> None:
    scripts_dir = tmp_path / "scripts"
    scripts_dir.mkdir(parents=True)
    (scripts_dir / "vetcoders_install.py").write_text(
        "#!/usr/bin/env python3\n", encoding="utf-8"
    )
    (scripts_dir / "install-foundations.sh").write_text(
        "#!/usr/bin/env bash\n", encoding="utf-8"
    )

    steps = installer_gui.build_install_steps(str(tmp_path), with_shell=True)

    assert [step.label for step in steps] == [
        "Bootstrap foundations",
        "Install Vibecrafted",
    ]
    assert steps[0].command == ["bash", str(scripts_dir / "install-foundations.sh")]
    assert steps[1].command[-1] == "--with-shell"


def test_preflight_payload_summarizes_diagnostics(monkeypatch, tmp_path: Path) -> None:
    diagnostics = {
        "frameworks": {
            "workflows": {
                "label": "workflows",
                "found": True,
                "detail": "ready",
            }
        },
        "foundations": {
            "loctree-mcp": {
                "label": "loctree-mcp",
                "found": False,
                "detail": "missing",
            }
        },
        "toolchains": {},
        "agents": {},
        "additional_tools": {},
    }
    scripts_dir = tmp_path / "scripts"
    scripts_dir.mkdir(parents=True)
    (scripts_dir / "vetcoders_install.py").write_text(
        "#!/usr/bin/env python3\n", encoding="utf-8"
    )
    (scripts_dir / "install-foundations.sh").write_text(
        "#!/usr/bin/env bash\n", encoding="utf-8"
    )

    monkeypatch.setattr(installer_gui, "read_framework_version", lambda _: "1.2.1")
    monkeypatch.setattr(installer_gui, "run_diagnostics", lambda: diagnostics)
    monkeypatch.setattr(
        installer_gui,
        "start_here_path",
        lambda: tmp_path / "guide" / "START_HERE.md",
    )
    monkeypatch.setattr(
        installer_gui,
        "helper_layer_path",
        lambda: tmp_path / ".config" / "vetcoders" / "vc-skills.sh",
    )
    monkeypatch.setattr(
        installer_gui,
        "vibecrafted_home",
        lambda: tmp_path / ".vibecrafted",
    )
    (tmp_path / "skills" / "vc-workflow").mkdir(parents=True)
    (tmp_path / "skills" / "vc-delegate").mkdir(parents=True)

    controller = installer_gui.InstallController(str(tmp_path))
    payload = controller.preflight_payload()

    assert payload["version"] == "1.2.1"
    assert payload["found_count"] == 1
    assert payload["missing_count"] == 1
    assert payload["found_items"] == ["Frameworks: workflows"]
    assert payload["missing_items"] == ["Foundations: loctree-mcp"]
    assert payload["needs_install"] is True
    assert payload["needs_install_details"] == {"foundations": ["loctree-mcp"]}
    assert [step["label"] for step in payload["install_plan"]] == [
        "Bootstrap foundations",
        "Install Vibecrafted",
    ]
    assert payload["bundled_bin_dir"].endswith(
        installer_gui.bundled_bin_dir(str(tmp_path)).name
    )
    assert payload["bundled_bin_present"] is False
    assert payload["control_plane"]["current_bundle"] == str(tmp_path)
    assert payload["launcher_defaults"] == {
        "workflows": ["delegate", "workflow"],
        "agents": ["codex", "claude", "gemini"],
        "runtimes": ["agents", "claude", "codex"],
    }
    assert payload["status"]["completed"] is False


def test_install_runtime_env_prepends_repo_owned_bins(
    monkeypatch, tmp_path: Path
) -> None:
    crafted_home = tmp_path / ".vibecrafted"
    cargo_bin = tmp_path / ".cargo" / "bin"
    node_bin = crafted_home / "tools" / "node" / "bin"
    crafted_bin = crafted_home / "bin"
    for path in (cargo_bin, node_bin, crafted_bin):
        path.mkdir(parents=True)

    monkeypatch.setattr(installer_gui, "vibecrafted_home", lambda: crafted_home)
    monkeypatch.setattr(installer_gui.Path, "home", lambda: tmp_path)

    env = installer_gui.install_runtime_env({"PATH": "/usr/bin"})
    pieces = env["PATH"].split(":")

    assert pieces[:3] == [str(cargo_bin), str(node_bin), str(crafted_bin)]


def test_logs_payload_returns_full_lines_and_tail(tmp_path: Path) -> None:
    controller = installer_gui.InstallController(str(tmp_path))
    controller._run = installer_gui.InstallRun(
        run_id=1,
        output=[
            f"line-{index}" for index in range(installer_gui.OUTPUT_TAIL_LIMIT + 3)
        ],
    )

    payload = controller.logs_payload()

    assert payload["line_count"] == installer_gui.OUTPUT_TAIL_LIMIT + 3
    assert payload["lines"][0] == "line-0"
    assert payload["tail"][0] == "line-3"
    assert payload["tail"][-1] == f"line-{installer_gui.OUTPUT_TAIL_LIMIT + 2}"


def test_teardown_session_resets_run_state_and_terminates_process(
    monkeypatch, tmp_path: Path
) -> None:
    controller = installer_gui.InstallController(str(tmp_path))
    controller._run = installer_gui.InstallRun(run_id=7, running=True, output=["hello"])

    class FakeProcess:
        def __init__(self) -> None:
            self.returncode = None

        def poll(self):
            return self.returncode

    fake_process = FakeProcess()
    terminated: list[FakeProcess] = []
    controller._active_process = fake_process  # type: ignore[assignment]
    monkeypatch.setattr(
        controller,
        "_terminate_process",
        lambda process: terminated.append(process),  # type: ignore[arg-type]
    )

    ok, message = controller.teardown_session()

    assert ok is True
    assert message == "Installer session terminated."
    assert terminated == [fake_process]
    assert controller.status_payload()["running"] is False
    assert controller.status_payload()["output"] == []


def test_http_handler_exposes_alias_routes(monkeypatch, tmp_path: Path) -> None:
    controller = installer_gui.InstallController(str(tmp_path))
    monkeypatch.setattr(
        controller,
        "preflight_payload",
        lambda: {"needs_install": False, "status": {"completed": False}},
    )
    monkeypatch.setattr(controller, "status_payload", lambda: {"running": False})
    monkeypatch.setattr(
        controller,
        "logs_payload",
        lambda: {
            "lines": ["hello"],
            "line_count": 1,
            "tail": ["hello"],
            "tail_limit": 120,
        },
    )
    monkeypatch.setattr(
        controller,
        "control_plane_payload",
        lambda: {"current_bundle": str(tmp_path)},
    )
    monkeypatch.setattr(
        controller, "start", lambda with_shell: (True, "Installer started.")
    )
    monkeypatch.setattr(
        controller,
        "open_start_here",
        lambda: (True, "Opened ~/.vibecrafted/START_HERE.md"),
    )
    monkeypatch.setattr(
        controller, "teardown_session", lambda: (True, "Installer session cleared.")
    )

    server = installer_gui.InstallerHTTPServer(("127.0.0.1", 0), controller)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    base_url = f"http://127.0.0.1:{server.server_address[1]}"

    def fetch(path: str, *, method: str = "GET", body: dict[str, object] | None = None):
        data = None if body is None else json.dumps(body).encode("utf-8")
        request = urllib.request.Request(base_url + path, data=data, method=method)
        if data is not None:
            request.add_header("Content-Type", "application/json")
        with urllib.request.urlopen(request, timeout=5) as response:
            return response.status, json.load(response)

    try:
        status, payload = fetch("/preflight")
        assert status == 200
        assert payload["needs_install"] is False

        status, payload = fetch("/status")
        assert status == 200
        assert payload == {"running": False}

        status, payload = fetch("/logs")
        assert status == 200
        assert payload["line_count"] == 1

        status, payload = fetch("/control-plane")
        assert status == 200
        assert payload["current_bundle"] == str(tmp_path)

        status, payload = fetch("/install", method="POST", body={"with_shell": True})
        assert status == 202
        assert payload["ok"] is True
        assert payload["accepted"] is True
        assert payload["message"] == "Installer started."

        status, payload = fetch("/open-start-here", method="POST")
        assert status == 200
        assert payload["ok"] is True

        status, payload = fetch("/session", method="DELETE")
        assert status == 200
        assert payload["ok"] is True
        assert payload["message"] == "Installer session cleared."
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)


def test_resolve_bundle_asset_maps_root_and_nested_paths(tmp_path: Path) -> None:
    install_dir = tmp_path / "en" / "install"
    install_dir.mkdir(parents=True)
    index_file = install_dir / "index.html"
    index_file.write_text("<html></html>", encoding="utf-8")
    asset_file = tmp_path / "_astro" / "bundle.js"
    asset_file.parent.mkdir(parents=True)
    asset_file.write_text("console.log('ok');", encoding="utf-8")

    assert installer_gui.resolve_bundle_asset(str(tmp_path), "/") == index_file
    assert (
        installer_gui.resolve_bundle_asset(str(tmp_path), "/en/install/") == index_file
    )
    assert (
        installer_gui.resolve_bundle_asset(str(tmp_path), "/_astro/bundle.js")
        == asset_file
    )
    assert (
        installer_gui.resolve_bundle_asset(str(tmp_path), "/../../etc/passwd") is None
    )


def test_inject_live_bootstrap_marks_html_once() -> None:
    html = "<html><head><title>x</title></head><body></body></html>"
    injected = installer_gui.inject_live_bootstrap(html)

    assert injected.count("__VIBECRAFTED_LIVE__") == 1
    assert (
        installer_gui.inject_live_bootstrap(injected).count("__VIBECRAFTED_LIVE__") == 1
    )


def test_http_handler_serves_bundle_html_and_health(
    monkeypatch, tmp_path: Path
) -> None:
    install_dir = tmp_path / "en" / "install"
    install_dir.mkdir(parents=True)
    (install_dir / "index.html").write_text(
        "<html><head><title>Installer</title></head><body>shell</body></html>",
        encoding="utf-8",
    )

    controller = installer_gui.InstallController(str(tmp_path))
    monkeypatch.setattr(
        controller,
        "health_payload",
        lambda: {"ok": True, "session_active": False},
    )

    server = installer_gui.InstallerHTTPServer(("127.0.0.1", 0), controller)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    base_url = f"http://127.0.0.1:{server.server_address[1]}"

    try:
        with urllib.request.urlopen(f"{base_url}/health", timeout=5) as response:
            assert response.status == 200
            assert json.load(response) == {"ok": True, "session_active": False}

        with urllib.request.urlopen(f"{base_url}/", timeout=5) as response:
            assert response.status == 200
            html = response.read().decode("utf-8")
            assert "__VIBECRAFTED_LIVE__" in html
            assert "Installer" in html
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)


def test_build_html_renders_wizard_shell() -> None:
    html = installer_gui.build_html(
        {
            "version": "1.2.1",
            "source_dir_display": "~/src/vibecrafted",
            "guide_path_display": "~/.vibecrafted/START_HERE.md",
            "helper_path_display": "~/.config/vetcoders/vc-skills.sh",
            "bundled_bin_dir": "~/src/vibecrafted/bundled-bin/darwin-arm64",
            "bundled_bin_display": "~/src/vibecrafted/bundled-bin/darwin-arm64",
            "bundled_bin_present": False,
            "found_count": 3,
            "missing_count": 2,
            "found_items": ["Frameworks: workflows"],
            "missing_items": ["Foundations: loctree-mcp"],
            "needs_install": True,
            "needs_install_details": {"foundations": ["loctree-mcp"]},
            "install_plan": [
                {
                    "label": "Bootstrap foundations",
                    "command": "bash scripts/install-foundations.sh",
                },
                {
                    "label": "Install Vibecrafted",
                    "command": "python3 scripts/vetcoders_install.py install --compact",
                },
            ],
            "categories": [],
            "control_plane": {"current_bundle": "~/src/vibecrafted"},
            "launcher_defaults": {
                "workflows": ["delegate", "workflow"],
                "agents": ["codex", "claude", "gemini"],
                "runtimes": ["agents", "claude", "codex"],
            },
            "status": {"completed": False, "running": False, "output": []},
        }
    )

    assert 'id="wizard-progress"' in html
    assert 'data-step="5"' in html
    assert "Launch guided install" in html
    assert "Finish state" in html
    assert "make wizard" in html
    assert "height: calc(100dvh - 36px);" in html
    assert "overflow: hidden;" in html
    assert "-webkit-overflow-scrolling: touch;" in html
    assert "grid-template-rows: auto minmax(0, 1fr);" in html
    assert "document.addEventListener('keydown'" in html
    assert "activeSlide?.querySelector('.slide-body')?.scrollTo" in html
