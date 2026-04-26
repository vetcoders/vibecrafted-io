import sys
from pathlib import Path
import json


def main():
    try:
        import tomllib
    except ImportError:
        import tomli as tomllib

    # install.toml is in the vibecrafted repo next to vibecrafted-io
    # Since we run from vibecrafted-io/site, __file__ is vibecrafted-io/scripts/sync_manifest.py
    io_root = Path(__file__).resolve().parent.parent
    repo_root = io_root.parent / "vibecrafted"
    toml_path = repo_root / "install.toml"

    if not toml_path.exists():
        # Fallback for when building without sibling repo?
        print(f"Warning: {toml_path} not found. Skipping manifest sync.")
        sys.exit(0)

    out_dir = io_root / "site" / "src" / "lib" / "generated"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "install-manifest.json"

    with open(toml_path, "rb") as f:
        data = tomllib.load(f)

    manifest = {
        "title": data.get("title", "⚒ Vibecrafted."),
        "phases": data.get("phase", []),
        "diagnostics": data.get("diagnostics", {}),
    }

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"Synced install manifest to {out_path}")


if __name__ == "__main__":
    main()
