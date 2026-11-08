#!/usr/bin/env python3
"""Prepare matching native carriers; publication remains make site-deploy's job."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import stat
import subprocess
import tempfile
import time
import zipfile
from datetime import UTC, datetime
from pathlib import Path
from urllib.parse import quote

from sync_site_release_assets import (
    _verify_release_signature,
    read_sha256_entries,
    sha256_file,
    validate_windows_release,
)

REPOSITORY = "vetcoders/vibecrafted"
WORKFLOW = "install-windows.yml"
NATIVE_JOBS = {
    "install.ps1 + doctor (windows-latest)",
    "MSI silent install + doctor + uninstall",
    "EXE silent install + doctor + uninstall",
}


def run(args: list[str], **kwargs) -> str:
    result = subprocess.run(args, check=True, capture_output=True, text=True, **kwargs)
    return result.stdout


def api(path: str) -> dict:
    return json.loads(run(["gh", "api", path]))


def matching_run(runs: list[dict], request: str, controller: str) -> dict | None:
    matches = [
        item
        for item in runs
        if request in item.get("display_title", "")
        and item.get("event") == "workflow_dispatch"
    ]
    if len(matches) > 1:
        raise RuntimeError("More than one Windows run owns this request ID")
    if not matches:
        return None
    if matches[0].get("head_sha") != controller:
        raise RuntimeError("Windows workflow ref changed during dispatch")
    return matches[0]


def native_release(
    product_root: Path, source: str, public_key: Path
) -> tuple[Path, dict]:
    selected = os.environ.get("VIBECRAFTED_RUNTIME_PACK")
    record_path = (
        Path(selected).expanduser().resolve().parent / "release-output.json"
        if selected
        else product_root / "dist/release-output.json"
    )
    ready = (
        record_path.is_file()
        and json.loads(record_path.read_text())
        .get("source_revisions", {})
        .get("vibecrafted")
        == source
    )
    if not ready:
        if selected:
            raise RuntimeError(
                "Explicit native Runtime Pack does not belong to the selected source"
            )
        selection = product_root / "build/runtime-pack-selection.json"
        if selection.is_file():
            pending = json.loads(selection.read_text())
            if (
                pending.get("status") == "pending"
                and pending.get("source_revision") == source
            ):
                raise RuntimeError(
                    "A matching native macOS candidate is already pending. Finish or recover the canonical make release before retrying site-release."
                )
        print(f"Building notarized macOS release from {source}…", flush=True)
        # The product's canonical owner handles snapshotting, signing, notary and
        # single-flight admission; this adapter never replaces those operations.
        subprocess.run(
            [
                "make",
                "-C",
                str(product_root),
                "release",
                "RELEASE_FLAGS=--snapshot-donors",
            ],
            check=True,
        )
    release = json.loads(record_path.read_text())
    if release["source_revisions"]["vibecrafted"] != source:
        raise RuntimeError(
            "Native release source changed while preparing the site release"
        )
    notary = release.get("notarization", {})
    if any(
        notary.get(kind, {}).get(check) is not True
        for kind, checks in {
            "app": ("gatekeeper", "ticket"),
            "dmg": ("codesign", "gatekeeper", "ticket"),
        }.items()
        for check in checks
    ):
        raise RuntimeError("Native macOS release has not completed notarization")
    _verify_release_signature(record_path, public_key)
    for kind in ("runtime_pack", "dmg"):
        item = release[kind]
        if Path(item["path"]).name != item["path"]:
            raise RuntimeError("Native release has a non-local artifact path")
        path = record_path.parent / item["path"]
        if sha256_file(path) != item["sha256"] or path.stat().st_size != item["size"]:
            raise RuntimeError(f"Native {kind} hash/size mismatch")
        if read_sha256_entries(Path(f"{path}.sha256")).get(path.name) != item["sha256"]:
            raise RuntimeError(f"Native {kind} checksum mismatch")
    pack = record_path.parent / release["runtime_pack"]["path"]
    if selected and Path(selected).expanduser().resolve() != pack.resolve():
        raise RuntimeError("Explicit Runtime Pack differs from the native manifest")
    _verify_release_signature(pack, public_key)
    return pack, release


def extract_artifact(archive: Path, destination: Path) -> None:
    """Extract the exact release attachment without accepting paths or keys."""
    with zipfile.ZipFile(archive) as carrier:
        members = carrier.infolist()
        if len(members) != 9 or len({member.filename for member in members}) != 9:
            raise RuntimeError(
                "Windows release artifact must contain exactly nine files"
            )
        if sum(member.file_size for member in members) > 4 * 1024**3:
            raise RuntimeError("Windows release artifact exceeds the size limit")
        for member in members:
            name = member.filename
            if (
                Path(name).name != name
                or member.is_dir()
                or stat.S_ISLNK(member.external_attr >> 16)
                or not (
                    name in ("windows-release.json", "windows-release.json.sig")
                    or name.startswith("Vibecrafted_")
                    and name.endswith((".exe", ".msi", ".tar.gz", ".sha256", ".sig"))
                )
            ):
                raise RuntimeError(
                    "Windows release artifact contains an unexpected path"
                )
        destination.mkdir()
        for member in members:
            with (
                carrier.open(member) as source,
                (destination / member.filename).open("xb") as target,
            ):
                shutil.copyfileobj(source, target)


def receive_windows_release(
    release: dict,
    public_key: Path,
    destination: Path,
    controller_ref: str,
    timeout: int,
) -> Path:
    cached = os.environ.get("VIBECRAFTED_WINDOWS_RELEASE")
    receipt_path = (
        Path(cached).expanduser() if cached else destination / "windows-release.json"
    )
    if cached or receipt_path.is_file():
        validate_windows_release(receipt_path, release, public_key)
        print("Reusing matching signed native Windows release.", flush=True)
        return receipt_path.resolve()
    revisions = release["source_revisions"]
    source = revisions["vibecrafted"]
    # Only a remote-visible immutable source can be built on a hosted runner.
    if api(f"repos/{REPOSITORY}/commits/{source}")["sha"] != source:
        raise RuntimeError("Product source is not available to the Windows builder")
    controller = api(f"repos/{REPOSITORY}/commits/{quote(controller_ref, safe='')}")[
        "sha"
    ]
    workflow = api(f"repos/{REPOSITORY}/actions/workflows/{WORKFLOW}")
    workflow_id = workflow["id"]
    # GitHub's durable run is the attempt record. Stable inputs find and resume
    # that exact run after a network interruption, rather than starting another
    # expensive native build on every make retry.
    request = hashlib.sha256(
        json.dumps(
            {"source_revisions": revisions, "controller": controller}, sort_keys=True
        ).encode()
    ).hexdigest()[:24]
    started = datetime.now(UTC).isoformat()
    runs_path = f"repos/{REPOSITORY}/actions/workflows/{workflow_id}/runs?event=workflow_dispatch&per_page=100"
    selected_run = matching_run(api(runs_path)["workflow_runs"], request, controller)
    if selected_run is None:
        print(
            f"Building native Windows release · request {request} · source {source}",
            flush=True,
        )
        run(
            [
                "gh",
                "workflow",
                "run",
                str(workflow_id),
                "--repo",
                REPOSITORY,
                f"--ref={controller_ref}",
                "-f",
                f"source_ref={source}",
                "-f",
                f"terminal_revision={revisions['vc-terminal']}",
                "-f",
                f"frame_revision={revisions['vc-frame']}",
                "-f",
                f"request_id={request}",
                "-f",
                "release_signing=true",
            ]
        )
    elif (
        selected_run.get("status") == "completed"
        and selected_run.get("conclusion") != "success"
    ):
        raise RuntimeError(
            f"Windows request already failed: {selected_run['html_url']}. Rerun that exact GitHub run before retrying site-release."
        )
    else:
        print(
            f"Resuming Windows request {request} · run {selected_run['id']}", flush=True
        )
    deadline = time.monotonic() + timeout
    previous_status = None
    while time.monotonic() < deadline:
        if selected_run is None:
            runs = api(runs_path)["workflow_runs"]
            selected_run = matching_run(runs, request, controller)
            if selected_run is None:
                time.sleep(5)
                continue
        selected_run = api(f"repos/{REPOSITORY}/actions/runs/{selected_run['id']}")
        if selected_run.get("head_sha") != controller:
            raise RuntimeError("Windows build controller identity changed")
        status = selected_run["status"]
        if status != previous_status:
            print(f"Windows build: {status} · {selected_run['html_url']}", flush=True)
            previous_status = status
        if status == "completed":
            break
        time.sleep(10)
    else:
        raise RuntimeError(
            f"Windows build timed out; request {request}. Inspect its run before retrying."
        )
    if selected_run.get("conclusion") != "success":
        raise RuntimeError(f"Windows build failed: {selected_run['html_url']}")
    run_id = selected_run["id"]
    jobs = api(
        f"repos/{REPOSITORY}/actions/runs/{run_id}/jobs?filter=latest&per_page=100"
    )["jobs"]
    outcomes = {job["name"]: job["conclusion"] for job in jobs}
    if any(outcomes.get(name) != "success" for name in NATIVE_JOBS):
        raise RuntimeError("Windows native install gates did not all succeed")
    artifacts = api(f"repos/{REPOSITORY}/actions/runs/{run_id}/artifacts?per_page=100")[
        "artifacts"
    ]
    run_start = datetime.fromisoformat(selected_run["run_started_at"])
    matching_artifacts = [
        item
        for item in artifacts
        if item["name"] == "windows-x64-release"
        and not item["expired"]
        and datetime.fromisoformat(item["created_at"]) >= run_start
    ]
    if len(matching_artifacts) != 1:
        raise RuntimeError("Expected one Windows artifact from this exact run attempt")
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        raise RuntimeError(
            f"Windows artifact directory already exists without an admitted receipt: {destination}"
        )
    with tempfile.TemporaryDirectory(
        prefix=".windows-release-", dir=destination.parent
    ) as temporary:
        staged = Path(temporary) / "artifacts"
        archive = Path(temporary) / "artifact.zip"
        with archive.open("wb") as output:
            subprocess.run(
                [
                    "gh",
                    "api",
                    f"repos/{REPOSITORY}/actions/artifacts/{matching_artifacts[0]['id']}/zip",
                ],
                check=True,
                stdout=output,
            )
        extract_artifact(archive, staged)
        receipt = staged / "windows-release.json"
        files, _ = validate_windows_release(receipt, release, public_key)
        identity = json.loads(receipt.read_text())["workflow"]
        if any(
            str(identity.get(key)) != str(value)
            for key, value in {
                "run_id": run_id,
                "run_attempt": selected_run["run_attempt"],
                "controller_sha": controller,
                "source_sha": source,
                "request_id": request,
            }.items()
        ):
            raise RuntimeError(
                "Downloaded Windows receipt belongs to another build attempt"
            )
        published = Path(temporary) / "admitted"
        published.mkdir()
        for path, name in files.items():
            shutil.copy2(path, published / name)
        (published / "build-reception.json").write_text(
            json.dumps(
                {
                    "started": started,
                    "workflow": identity,
                    "native_jobs": outcomes,
                    "url": selected_run["html_url"],
                },
                indent=2,
            )
            + "\n"
        )
        published.rename(destination)
    return (destination / "windows-release.json").resolve()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--product-root", type=Path, required=True)
    parser.add_argument("--windows-dir", type=Path, required=True)
    parser.add_argument("--selection", type=Path, required=True)
    parser.add_argument("--workflow-ref", default="ci/windows-site-release")
    parser.add_argument("--timeout", type=int, default=7200)
    args = parser.parse_args()
    root = args.product_root.expanduser().resolve(strict=True)
    source = run(["git", "-C", str(root), "rev-parse", "HEAD"]).strip()
    if run(
        ["git", "-C", str(root), "status", "--porcelain", "--untracked-files=all"]
    ).strip():
        raise RuntimeError("A site release requires a clean immutable product source")
    public_key = (
        root / "vibecrafted-core/vibecrafted_core/trust/vibecrafted-signing-v1.pub"
    )
    pack, release = native_release(root, source, public_key)
    receipt = receive_windows_release(
        release, public_key, args.windows_dir / source, args.workflow_ref, args.timeout
    )
    if (
        run(["git", "-C", str(root), "rev-parse", "HEAD"]).strip() != source
        or run(["git", "-C", str(root), "status", "--porcelain"]).strip()
    ):
        raise RuntimeError("Product source changed while building native carriers")
    args.selection.parent.mkdir(parents=True, exist_ok=True)
    selection = {
        "schema": "io.vetcoders.vibecrafted.site-release-selection.v1",
        "source_revision": source,
        "runtime_pack": str(pack.resolve()),
        "windows_release": str(receipt),
    }
    temporary = args.selection.with_name(args.selection.name + ".temporary")
    temporary.write_text(json.dumps(selection, indent=2) + "\n")
    temporary.replace(args.selection)
    print(f"Native release carriers ready: {args.selection}")


if __name__ == "__main__":
    try:
        main()
    except (
        OSError,
        TypeError,
        ValueError,
        KeyError,
        RuntimeError,
        subprocess.CalledProcessError,
    ) as error:
        raise SystemExit(f"Site release preparation failed: {error}") from None
