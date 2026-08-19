#!/usr/bin/env python3
from __future__ import annotations

from sync_site_release_assets import BUNDLE_ROOT, SITE_SRC, export_install_manifest


def main() -> None:
    out_path = export_install_manifest(BUNDLE_ROOT, SITE_SRC)
    print(f"Synced install manifest to {out_path}")


if __name__ == "__main__":
    main()
