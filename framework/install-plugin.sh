#!/usr/bin/env bash
set -euo pipefail

die() {
	printf 'error: %s\n' "$*" >&2
	exit 1
}

info() {
	printf '→ %s\n' "$*"
}

ok() {
	printf '✓ %s\n' "$*"
}

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
VIBECRAFTED_HOME="${VIBECRAFTED_HOME:-$HOME/.vibecrafted}"
MANIFEST="$SCRIPT_DIR/MANIFEST.json"
FRAMEWORK_SRC="$SCRIPT_DIR/framework"
AICX_SRC="$SCRIPT_DIR/foundations/aicx"
LOCTREE_SRC="$SCRIPT_DIR/foundations/loctree"

[[ -f "$MANIFEST" ]] || die "Missing MANIFEST.json next to install.sh"
[[ -d "$FRAMEWORK_SRC" ]] || die "Missing framework/ payload"
[[ -d "$AICX_SRC" ]] || die "Missing foundations/aicx payload"
[[ -d "$LOCTREE_SRC" ]] || die "Missing foundations/loctree payload"

if [[ -f "$SCRIPT_DIR/SHA256SUMS" ]]; then
	info "Verifying SHA256SUMS"
	(cd "$SCRIPT_DIR" && shasum -a 256 -c SHA256SUMS)
fi

FRAMEWORK_VERSION="$(
	python3 - "$MANIFEST" <<'PY'
import json
import sys

with open(sys.argv[1], encoding="utf-8") as handle:
    manifest = json.load(handle)
print(manifest.get("framework_version") or "unknown")
PY
)"
[[ -n "$FRAMEWORK_VERSION" ]] || die "Could not read framework_version"

STAGING_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/vibecrafted-plugin.XXXXXX")"
trap 'rm -rf "$STAGING_ROOT"' EXIT

FRAMEWORK_TARGET="$VIBECRAFTED_HOME/tools/vibecrafted-$FRAMEWORK_VERSION"
AICX_TARGET="$VIBECRAFTED_HOME/foundations/aicx"
LOCTREE_TARGET="$VIBECRAFTED_HOME/foundations/loctree"
BIN_TARGET="$VIBECRAFTED_HOME/bin"

copy_payload() {
	local source_dir="$1"
	local target_dir="$2"
	local staging_dir="$3"

	rm -rf "$staging_dir"
	mkdir -p "$staging_dir"
	cp -R "$source_dir/." "$staging_dir/"
	rm -rf "$target_dir"
	mkdir -p "$(dirname "$target_dir")"
	mv "$staging_dir" "$target_dir"
}

info "Installing framework into $FRAMEWORK_TARGET"
copy_payload "$FRAMEWORK_SRC" "$FRAMEWORK_TARGET" "$STAGING_ROOT/framework"

info "Installing aicx foundation into $AICX_TARGET"
copy_payload "$AICX_SRC" "$AICX_TARGET" "$STAGING_ROOT/aicx"

info "Installing loctree foundation into $LOCTREE_TARGET"
copy_payload "$LOCTREE_SRC" "$LOCTREE_TARGET" "$STAGING_ROOT/loctree"

ln -sfn "$FRAMEWORK_TARGET" "$VIBECRAFTED_HOME/tools/vibecrafted-current"

if [[ "${VIBECRAFTED_INSTALL_NO_PATH:-0}" != "1" ]]; then
	mkdir -p "$BIN_TARGET"
	for binary in aicx aicx-mcp; do
		[[ -x "$AICX_TARGET/bin/$binary" ]] || die "Missing executable: $AICX_TARGET/bin/$binary"
		ln -sfn "$AICX_TARGET/bin/$binary" "$BIN_TARGET/$binary"
	done
	for binary in loctree loct loctree-mcp loctree-lsp; do
		[[ -x "$LOCTREE_TARGET/bin/$binary" ]] || die "Missing executable: $LOCTREE_TARGET/bin/$binary"
		ln -sfn "$LOCTREE_TARGET/bin/$binary" "$BIN_TARGET/$binary"
	done

	PATH_BLOCK_START="# Vibecrafted foundations"
	PATH_BLOCK="export VIBECRAFTED_HOME=\"\${VIBECRAFTED_HOME:-\$HOME/.vibecrafted}\""$'\n'"export PATH=\"\$VIBECRAFTED_HOME/bin:\$PATH\""
	for shell_rc in "$HOME/.zshrc" "$HOME/.bashrc"; do
		touch "$shell_rc"
		if ! grep -Fq "$PATH_BLOCK_START" "$shell_rc"; then
			{
				printf '\n%s\n' "$PATH_BLOCK_START"
				printf '%s\n' "$PATH_BLOCK"
			} >>"$shell_rc"
		fi
	done
	ok "Linked foundation binaries into $BIN_TARGET"
else
	info "VIBECRAFTED_INSTALL_NO_PATH=1 set; skipping PATH updates and bin symlinks"
fi

ok "Vibecrafted framework $FRAMEWORK_VERSION installed"
printf '\nNext:\n'
printf "  export VIBECRAFTED_HOME=\"\${VIBECRAFTED_HOME:-\$HOME/.vibecrafted}\"\n"
printf "  export PATH=\"\$VIBECRAFTED_HOME/bin:\$PATH\"\n"
printf '  vibecrafted help\n'
printf '  vc-init\n'
