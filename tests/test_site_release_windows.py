from __future__ import annotations

import copy
import hashlib
import importlib.util
import io
import json
import os
import subprocess
import sys
import tarfile
import tempfile
import unittest
import zipfile
from pathlib import Path
from unittest import mock

SCRIPT = Path(__file__).resolve().parents[1] / "scripts/sync_site_release_assets.py"
SPEC = importlib.util.spec_from_file_location("site_assets", SCRIPT)
assets = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(assets)
sys.modules["sync_site_release_assets"] = assets
PREP_SPEC = importlib.util.spec_from_file_location(
    "prepare_site_release", SCRIPT.with_name("prepare_site_release.py")
)
prepare = importlib.util.module_from_spec(PREP_SPEC)
PREP_SPEC.loader.exec_module(prepare)

SOURCE = "1" * 40
REVISIONS = {"vibecrafted": SOURCE, "vc-terminal": "2" * 40, "vc-frame": "3" * 40}
VERSION = "4.5.1"


class WindowsReleaseTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.keys = tempfile.TemporaryDirectory()
        cls.key = Path(cls.keys.name) / "release.key"
        cls.public = Path(cls.keys.name) / "release.pub"
        subprocess.run(
            [
                "openssl",
                "genpkey",
                "-algorithm",
                "RSA",
                "-pkeyopt",
                "rsa_keygen_bits:2048",
                "-out",
                str(cls.key),
            ],
            check=True,
            capture_output=True,
        )
        subprocess.run(
            [
                "openssl",
                "pkey",
                "-in",
                str(cls.key),
                "-pubout",
                "-out",
                str(cls.public),
            ],
            check=True,
            capture_output=True,
        )

    @classmethod
    def tearDownClass(cls):
        cls.keys.cleanup()

    def setUp(self):
        self.sandbox = tempfile.TemporaryDirectory()
        self.root = Path(self.sandbox.name)
        self.addCleanup(self.sandbox.cleanup)
        self.release = {"product": {"version": VERSION}, "source_revisions": REVISIONS}
        pack = (
            self.root
            / f"Vibecrafted_RuntimePack_{VERSION}-20261029-{SOURCE[:8]}-win32-x64.tar.gz"
        )
        provenance = {
            "version": VERSION,
            "platform": "win32-x64",
            "architecture": "x64",
            "source_revisions": REVISIONS,
        }
        body = json.dumps(provenance).encode()
        with tarfile.open(pack, "w:gz") as archive:
            member = tarfile.TarInfo("VibecraftedRuntime/runtime-pack-provenance.json")
            member.size = len(body)
            archive.addfile(member, io.BytesIO(body))
        exe = self.root / f"Vibecrafted_{VERSION}-20261029-{SOURCE[:8]}-windows-x64.exe"
        executable = bytearray(128)
        executable[:2] = b"MZ"
        executable[60:64] = (64).to_bytes(4, "little")
        executable[64:70] = b"PE\0\0\x64\x86"
        exe.write_bytes(executable)
        msi = exe.with_suffix(".msi")
        msi.write_bytes(bytes.fromhex("d0cf11e0a1b11ae1") + b"fixture")
        self.receipt = {
            "schema": "io.vetcoders.vibecrafted.windows-release-output.v1",
            "product": {
                "version": VERSION,
                "platform": "win32-x64",
                "architecture": "x64",
            },
            "source_revisions": REVISIONS,
            "workflow": {
                "repository": "vetcoders/vibecrafted",
                "run_id": "42",
                "run_attempt": "1",
                "controller_sha": "4" * 40,
                "source_sha": SOURCE,
                "request_id": "5" * 24,
            },
            "verification": {
                "cold_install": "success",
                "msi_install": "success",
                "exe_install": "success",
            },
            "signing": {"runtime_pack": "product-key", "authenticode": "unsigned"},
        }
        for role, path in [("runtime_pack", pack), ("msi", msi), ("exe", exe)]:
            digest = hashlib.sha256(path.read_bytes()).hexdigest()
            self.receipt[role] = {
                "path": path.name,
                "sha256": digest,
                "size": path.stat().st_size,
            }
            Path(str(path) + ".sha256").write_text(f"{digest}  {path.name}\n")
        self.sign(pack)
        self.receipt_path = self.root / "windows-release.json"
        self.write_receipt()

    def sign(self, path):
        subprocess.run(
            [
                "openssl",
                "dgst",
                "-sha256",
                "-sign",
                str(self.key),
                "-out",
                str(path) + ".sig",
                str(path),
            ],
            check=True,
            capture_output=True,
        )

    def write_receipt(self):
        self.receipt_path.write_text(json.dumps(self.receipt))
        self.sign(self.receipt_path)

    def validate(self):
        return assets.validate_windows_release(
            self.receipt_path, self.release, self.public
        )

    def test_complete_signed_release_projects_native_urls(self):
        files, channel = self.validate()
        self.assertEqual(len(files), 9)
        self.assertTrue(channel["exe_url"].endswith("-windows-x64.exe"))
        self.assertTrue(channel["msi_url"].endswith("-windows-x64.msi"))
        self.assertEqual(channel["archive_url"], channel["runtime_pack_url"])
        self.assertEqual(channel["authenticode"], "unsigned")
        self.assertEqual(channel["source_revision"], SOURCE)

    def test_missing_each_required_artifact_refuses(self):
        for role in ["exe", "msi", "runtime_pack"]:
            with self.subTest(role=role):
                path = self.root / self.receipt[role]["path"]
                backup = path.read_bytes()
                path.unlink()
                with self.assertRaises((RuntimeError, FileNotFoundError)):
                    self.validate()
                path.write_bytes(backup)

    def test_source_or_donor_mismatch_refuses_even_with_valid_signature(self):
        original = copy.deepcopy(self.receipt)
        for key in REVISIONS:
            with self.subTest(key=key):
                self.receipt = copy.deepcopy(original)
                self.receipt["source_revisions"][key] = "a" * 40
                self.write_receipt()
                with self.assertRaises(RuntimeError):
                    self.validate()

    def test_wrong_product_key_refuses(self):
        self.public.write_bytes(b"not a product key")
        try:
            with self.assertRaises(RuntimeError):
                self.validate()
        finally:
            subprocess.run(
                [
                    "openssl",
                    "pkey",
                    "-in",
                    str(self.key),
                    "-pubout",
                    "-out",
                    str(self.public),
                ],
                check=True,
                capture_output=True,
            )

    def test_tampered_installer_refuses(self):
        path = self.root / self.receipt["exe"]["path"]
        path.write_bytes(path.read_bytes() + b"tampered")
        with self.assertRaises(RuntimeError):
            self.validate()

    def test_nonproduction_or_incomplete_gates_refuse(self):
        self.receipt["signing"]["runtime_pack"] = "rehearsal"
        self.write_receipt()
        with self.assertRaises(RuntimeError):
            self.validate()
        self.receipt["signing"]["runtime_pack"] = "product-key"
        self.receipt["verification"]["msi_install"] = "skipped"
        self.write_receipt()
        with self.assertRaises(RuntimeError):
            self.validate()

    def test_parent_path_in_signed_receipt_refuses(self):
        self.receipt["msi"]["path"] = "../outside.msi"
        self.write_receipt()
        with self.assertRaises(RuntimeError):
            self.validate()

    def test_wix_x86_bootstrapper_for_x64_payload_is_accepted(self):
        path = self.root / self.receipt["exe"]["path"]
        body = bytearray(path.read_bytes())
        body[68:70] = (0x14C).to_bytes(2, "little")
        path.write_bytes(body)
        self.receipt["exe"]["sha256"] = hashlib.sha256(body).hexdigest()
        Path(str(path) + ".sha256").write_text(
            f"{self.receipt['exe']['sha256']}  {path.name}\n"
        )
        self.write_receipt()
        self.validate()

    def test_adapter_build_can_cross_midnight_without_changing_source_identity(self):
        old = self.root / self.receipt["runtime_pack"]["path"]
        new = old.with_name(old.name.replace("20261029", "20261028"))
        old.rename(new)
        Path(str(old) + ".sig").rename(Path(str(new) + ".sig"))
        Path(str(old) + ".sha256").unlink()
        self.receipt["runtime_pack"]["path"] = new.name
        Path(str(new) + ".sha256").write_text(
            f"{self.receipt['runtime_pack']['sha256']}  {new.name}\n"
        )
        self.write_receipt()
        self.validate()

    def test_cached_valid_release_does_not_dispatch_another_build(self):
        with mock.patch.object(
            prepare, "api", side_effect=AssertionError("unexpected GitHub call")
        ):
            receipt = prepare.receive_windows_release(
                self.release, self.public, self.root, "ci/windows-site-release", 10
            )
        self.assertEqual(receipt, self.receipt_path.resolve())

    def bundle(self, source=SOURCE):
        bundle = self.root / "bundle"
        bundle.mkdir()
        (bundle / "VERSION").write_text(VERSION)
        (bundle / "install.sh").write_text("#!/bin/bash\n")
        (bundle / "install.sh.sig").write_bytes(b"signature fixture")
        (bundle / "vibecrafted-signing.pub").write_bytes(self.public.read_bytes())
        (bundle / "install.toml").write_text('title = "Vibecrafted"\nphase = []\n')
        archive = bundle / f"vibecrafted-v{VERSION}.tar.gz"
        data = json.dumps({"source_revision": source}).encode()
        with tarfile.open(archive, "w:gz") as carrier:
            item = tarfile.TarInfo("vibecrafted/source-provenance.json")
            item.size = len(data)
            carrier.addfile(item, io.BytesIO(data))
        Path(str(archive) + ".sig").write_bytes(b"signature fixture")
        (bundle / "SHA256SUMS").write_text(
            "".join(
                f"{hashlib.sha256(p.read_bytes()).hexdigest()}  {p.name}\n"
                for p in [archive, bundle / "install.sh"]
            )
        )
        mac = self.root / "mac"
        mac.mkdir()
        pack = (
            mac
            / f"Vibecrafted_RuntimePack_{VERSION}-20261029-{SOURCE[:8]}-darwin-arm64.tar.gz"
        )
        pack.write_bytes(b"mac native pack fixture")
        Path(str(pack) + ".sig").write_bytes(b"signature fixture")
        dmg = mac / f"Vibecrafted_{VERSION}-20261029-{SOURCE[:8]}.dmg"
        dmg.write_bytes(b"mac disk image fixture")
        release = copy.deepcopy(self.release)
        release["schema"] = "io.vetcoders.vibecrafted.release-output.v1"
        for role, path in [("runtime_pack", pack), ("dmg", dmg)]:
            digest = hashlib.sha256(path.read_bytes()).hexdigest()
            release[role] = {
                "path": path.name,
                "sha256": digest,
                "size": path.stat().st_size,
            }
            Path(str(path) + ".sha256").write_text(f"{digest}  {path.name}\n")
        record = mac / "release-output.json"
        record.write_text(json.dumps(release))
        self.sign(record)
        self.sign(pack)
        return bundle, pack

    def test_release_requires_windows_before_public_files_are_changed(self):
        bundle, pack = self.bundle()
        public = self.root / "public"
        with (
            mock.patch.dict(
                os.environ,
                {
                    "SITE_RELEASE_MODE": "1",
                    "VIBECRAFTED_RUNTIME_PACK": str(pack),
                    "VIBECRAFTED_WINDOWS_RELEASE": "",
                    "VIBECRAFTED_SITE_RELEASE_SELECTION": "",
                },
            ),
            self.assertRaisesRegex(RuntimeError, "requires native Windows"),
        ):
            assets.sync_site_release_assets(bundle, public, self.root / "src")
        self.assertFalse(public.exists())

    def test_complete_release_copies_native_files_and_projects_windows_channel(self):
        bundle, pack = self.bundle()
        public = self.root / "public"
        with mock.patch.dict(
            os.environ,
            {
                "SITE_RELEASE_MODE": "1",
                "VIBECRAFTED_RUNTIME_PACK": str(pack),
                "VIBECRAFTED_WINDOWS_RELEASE": str(self.receipt_path),
                "VIBECRAFTED_SITE_RELEASE_SELECTION": "",
            },
        ):
            assets.sync_site_release_assets(bundle, public, self.root / "src")
        channel = json.loads((public / "channel/main.json").read_text())["platforms"][
            "windows-x64"
        ]
        for role in ["exe", "msi", "runtime_pack"]:
            self.assertTrue((public / self.receipt[role]["path"]).is_file())
        self.assertEqual(channel["archive_url"], channel["runtime_pack_url"])
        self.assertIn("-win32-x64.tar.gz", channel["archive_url"])
        self.assertIn("source_archive_url", channel)
        sums = assets.read_sha256_entries(public / "SHA256SUMS")
        self.assertEqual(
            sums[self.receipt["msi"]["path"]], self.receipt["msi"]["sha256"]
        )
        self.assertIn("windows-release.json", sums)

    def test_mixed_source_archive_refuses_before_projection(self):
        bundle, pack = self.bundle("a" * 40)
        public = self.root / "public"
        with (
            mock.patch.dict(
                os.environ,
                {
                    "SITE_RELEASE_MODE": "1",
                    "VIBECRAFTED_RUNTIME_PACK": str(pack),
                    "VIBECRAFTED_WINDOWS_RELEASE": str(self.receipt_path),
                    "VIBECRAFTED_SITE_RELEASE_SELECTION": "",
                },
            ),
            self.assertRaisesRegex(RuntimeError, "different source revisions"),
        ):
            assets.sync_site_release_assets(bundle, public, self.root / "src")
        self.assertFalse(public.exists())

    def test_content_build_does_not_publish_a_new_framework_candidate(self):
        bundle, _ = self.bundle()
        public = self.root / "public"
        public.mkdir()
        (public / "VERSION").write_text("4.4.0")
        channel = public / "channel/main.json"
        channel.parent.mkdir()
        channel.write_text('{"version":"4.4.0","native":"published"}')
        original = channel.read_bytes()
        with mock.patch.dict(
            os.environ,
            {
                "SITE_RELEASE_MODE": "0",
                "VIBECRAFTED_RUNTIME_PACK": "",
                "VIBECRAFTED_WINDOWS_RELEASE": "",
                "VIBECRAFTED_SITE_RELEASE_SELECTION": "",
            },
        ):
            result = assets.sync_site_release_assets(bundle, public, self.root / "src")
        self.assertEqual(result["version"], "4.4.0")
        self.assertEqual(channel.read_bytes(), original)
        self.assertEqual(result["reused"], "1")

    def test_native_ready_reuse_verifies_signature_without_rebuilding(self):
        _, pack = self.bundle()
        record = pack.parent / "release-output.json"
        release = json.loads(record.read_text())
        release["notarization"] = {
            "app": {"ticket": True, "gatekeeper": True},
            "dmg": {"ticket": True, "gatekeeper": True, "codesign": True},
        }
        record.write_text(json.dumps(release))
        self.sign(record)
        self.sign(pack)
        original_run = subprocess.run

        def no_build(command, **kwargs):
            self.assertNotEqual(
                command[0], "make", "matching native release was rebuilt"
            )
            return original_run(command, **kwargs)

        with (
            mock.patch.dict(os.environ, {"VIBECRAFTED_RUNTIME_PACK": str(pack)}),
            mock.patch.object(prepare.subprocess, "run", side_effect=no_build),
        ):
            selected, _ = prepare.native_release(self.root, SOURCE, self.public)
        self.assertEqual(selected, pack.resolve())

    def test_unsigned_or_empty_notary_record_is_not_a_ready_native_release(self):
        _, pack = self.bundle()
        record = pack.parent / "release-output.json"
        release = json.loads(record.read_text())
        release["notarization"] = {"app": {}, "dmg": {}}
        record.write_text(json.dumps(release))
        with (
            mock.patch.dict(os.environ, {"VIBECRAFTED_RUNTIME_PACK": str(pack)}),
            self.assertRaisesRegex(RuntimeError, "not completed notarization"),
        ):
            prepare.native_release(self.root, SOURCE, self.public)


class RunSelectionTests(unittest.TestCase):
    def test_exact_request_ignores_newer_foreign_run(self):
        own = {
            "id": 1,
            "display_title": "Windows " + "a" * 24,
            "event": "workflow_dispatch",
            "head_sha": "b" * 40,
        }
        foreign = {**own, "id": 2, "display_title": "newer unrelated request"}
        self.assertEqual(prepare.matching_run([foreign, own], "a" * 24, "b" * 40), own)

    def test_controller_race_or_duplicate_attempt_refuses(self):
        own = {
            "id": 1,
            "display_title": "a" * 24,
            "event": "workflow_dispatch",
            "head_sha": "b" * 40,
        }
        with self.assertRaisesRegex(RuntimeError, "ref changed"):
            prepare.matching_run([own], "a" * 24, "c" * 40)
        with self.assertRaisesRegex(RuntimeError, "More than one"):
            prepare.matching_run([own, {**own, "id": 2}], "a" * 24, "b" * 40)

    def test_content_build_reuses_published_metadata_without_local_native_binaries(
        self,
    ):
        with tempfile.TemporaryDirectory() as root:
            public = Path(root) / "public"
            public.mkdir()
            (public / "VERSION").write_text(VERSION)
            with mock.patch.dict(os.environ, {"SITE_RELEASE_MODE": "0"}):
                result = assets.sync_site_release_assets(
                    Path(root) / "missing-bundle", public, Path(root) / "src"
                )
            self.assertEqual(result["reused"], "1")

    def test_pending_native_candidate_refuses_without_a_duplicate_builder(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "build").mkdir()
            (root / "build/runtime-pack-selection.json").write_text(
                json.dumps({"status": "pending", "source_revision": SOURCE})
            )
            with (
                mock.patch.dict(os.environ, {"VIBECRAFTED_RUNTIME_PACK": ""}),
                mock.patch.object(
                    prepare.subprocess,
                    "run",
                    side_effect=AssertionError("duplicate native builder"),
                ),
                self.assertRaisesRegex(RuntimeError, "already pending"),
            ):
                prepare.native_release(root, SOURCE, root / "key.pub")

    def test_artifact_path_escape_refuses_before_extraction(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            archive = root / "artifact.zip"
            with zipfile.ZipFile(archive, "w") as carrier:
                carrier.writestr("../escape", "must not be written")
                for index in range(8):
                    carrier.writestr(f"Vibecrafted_fixture{index}.exe", "fixture")
            with self.assertRaisesRegex(RuntimeError, "unexpected path"):
                prepare.extract_artifact(archive, root / "output")
            self.assertFalse((root / "output").exists())
            self.assertFalse((root / "escape").exists())


if __name__ == "__main__":
    unittest.main()
