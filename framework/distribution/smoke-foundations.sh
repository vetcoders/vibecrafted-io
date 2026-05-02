#!/usr/bin/env bash
set -euo pipefail

NO_VERSION=0
PLUGINS=()

for arg in "$@"; do
	case "$arg" in
		--no-version)
			NO_VERSION=1
			;;
		*)
			PLUGINS+=("$arg")
			;;
	esac
done

if [[ "${#PLUGINS[@]}" -eq 0 ]]; then
	echo "Usage: $0 [--no-version] path/to/*.plugin" >&2
	exit 2
fi

smoke_one() {
	local plugin="$1"
	[[ -f "$plugin" ]] || { echo "Plugin not found: $plugin" >&2; exit 1; }

	local tmp_dir
	tmp_dir="$(mktemp -d)"
	trap 'rm -rf "$tmp_dir"' RETURN

	unzip -q "$plugin" -d "$tmp_dir"

	for dir in framework foundations/aicx foundations/loctree; do
		[[ -d "$tmp_dir/$dir" ]] || { echo "Missing: $dir" >&2; exit 1; }
	done

	[[ -f "$tmp_dir/MANIFEST.json" ]] || { echo "Missing MANIFEST.json" >&2; exit 1; }
	[[ -f "$tmp_dir/install.sh" ]] || { echo "Missing install.sh" >&2; exit 1; }

	has_exec_bit() {
		python3 - "$1" <<'PY'
import os
import sys

raise SystemExit(0 if os.stat(sys.argv[1]).st_mode & 0o111 else 1)
PY
	}

	for bin in "$tmp_dir/foundations/aicx/bin/aicx" \
		"$tmp_dir/foundations/aicx/bin/aicx-mcp" \
		"$tmp_dir/foundations/loctree/bin/loctree" \
		"$tmp_dir/foundations/loctree/bin/loct" \
		"$tmp_dir/foundations/loctree/bin/loctree-mcp" \
		"$tmp_dir/foundations/loctree/bin/loctree-lsp"; do
		has_exec_bit "$bin" || { echo "Not executable: $bin" >&2; exit 1; }
	done

	echo "✓ Plugin layout valid"
	echo "✓ Manifest present"
	echo "✓ All 6 foundation binaries executable"

	if [[ "$NO_VERSION" != "1" ]]; then
		"$tmp_dir/foundations/aicx/bin/aicx" --version 2>&1 | head -1 || true
		"$tmp_dir/foundations/loctree/bin/loct" --version 2>&1 | head -1 || true
	fi

	echo "✓ Smoke test passed: $plugin"
}

for plugin in "${PLUGINS[@]}"; do
	smoke_one "$plugin"
done
