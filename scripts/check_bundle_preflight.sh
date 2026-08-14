#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MAKEFILE="$REPO_ROOT/Makefile"
TMP_ROOT="$(mktemp -d -t vc-bundle-preflight-XXXXXX)"

cleanup() {
  rm -rf "$TMP_ROOT"
}
trap cleanup EXIT

fail() {
  printf 'FAIL: %s\n' "$*" >&2
  exit 1
}

pass() {
  printf 'ok - %s\n' "$*"
}

assert_contains() {
  local file="$1"
  local needle="$2"

  if ! grep -Fq "$needle" "$file"; then
    printf '%s\n' '--- output ---' >&2
    cat "$file" >&2
    printf '%s\n' '--------------' >&2
    fail "expected output to contain: $needle"
  fi
}

assert_not_contains() {
  local file="$1"
  local needle="$2"

  if grep -Fq "$needle" "$file"; then
    printf '%s\n' '--- output ---' >&2
    cat "$file" >&2
    printf '%s\n' '--------------' >&2
    fail "expected output not to contain: $needle"
  fi
}

assert_exists() {
  local path="$1"

  [[ -e "$path" ]] || fail "expected path to exist: $path"
}

assert_not_exists() {
  local path="$1"

  [[ ! -e "$path" ]] || fail "expected path not to exist: $path"
}

make_in_repo() {
  make --no-print-directory -C "$REPO_ROOT" "$@"
}

create_upstream_repo() {
  local upstream="$1"

  mkdir -p "$upstream"
  printf '9.9.9\n' >"$upstream/VERSION"
  cat >"$upstream/install.sh" <<'SH'
#!/usr/bin/env bash
echo "installing test vibecrafted"
SH
  chmod +x "$upstream/install.sh"
  git -C "$upstream" init -q
  git -C "$upstream" add VERSION install.sh
  git -C "$upstream" \
    -c user.name='Bundle Preflight Test' \
    -c user.email='bundle-preflight@example.invalid' \
    commit -qm 'seed upstream'
}

expect_failure() {
  local output_file="$1"
  shift

  if "$@" >"$output_file" 2>&1; then
    printf '%s\n' '--- output ---' >&2
    cat "$output_file" >&2
    printf '%s\n' '--------------' >&2
    fail "expected command to fail: $*"
  fi
}

clean_upstream="$TMP_ROOT/clean-upstream"
create_upstream_repo "$clean_upstream"
make_in_repo bundle-preflight \
  UPSTREAM_ROOT="$clean_upstream" \
  BUNDLE_ROOT="$TMP_ROOT/clean-bundle"
pass 'clean upstream passes bundle-preflight'

missing_output="$TMP_ROOT/missing.out"
expect_failure "$missing_output" \
  make_in_repo bundle-preflight \
  UPSTREAM_ROOT="$TMP_ROOT/does-not-exist" \
  BUNDLE_ROOT="$TMP_ROOT/missing-bundle"
assert_contains "$missing_output" "Error: upstream $TMP_ROOT/does-not-exist not found."
pass 'missing upstream blocks bundle-preflight'

override_upstream="$TMP_ROOT/override-upstream"
create_upstream_repo "$override_upstream"
printf 'dirty\n' >"$override_upstream/untracked.txt"
make_in_repo bundle-preflight \
  UPSTREAM_ROOT="$override_upstream" \
  BUNDLE_ROOT="$TMP_ROOT/override-bundle" \
  ALLOW_DIRTY_UPSTREAM=1
pass 'ALLOW_DIRTY_UPSTREAM=1 permits dirty bundle-preflight'

dirty_build_upstream="$TMP_ROOT/dirty-build-upstream"
dirty_build_bundle="$TMP_ROOT/dirty-build-bundle"
dirty_build_output="$TMP_ROOT/dirty-build.out"
create_upstream_repo "$dirty_build_upstream"
mkdir -p "$dirty_build_bundle"
printf 'keep\n' >"$dirty_build_bundle/keep.txt"
printf 'dirty\n' >"$dirty_build_upstream/untracked.txt"
expect_failure "$dirty_build_output" \
  make_in_repo bundle-build \
  UPSTREAM_ROOT="$dirty_build_upstream" \
  BUNDLE_ROOT="$dirty_build_bundle"
assert_contains "$dirty_build_output" "Error: upstream $dirty_build_upstream has uncommitted or untracked changes."
assert_contains "$dirty_build_output" "ALLOW_DIRTY_UPSTREAM=1"
assert_not_contains "$dirty_build_output" 'Syncing upstream'
assert_not_contains "$dirty_build_output" 'Building tarball'
assert_exists "$dirty_build_bundle/keep.txt"
assert_not_exists "$dirty_build_bundle/vibecrafted-v9.9.9.tar.gz"
assert_not_exists "$dirty_build_bundle/SHA256SUMS"
pass 'dirty upstream blocks bundle-build before sync and tarball creation'

dirty_release_upstream="$TMP_ROOT/dirty-release-upstream"
dirty_release_bundle="$TMP_ROOT/dirty-release-bundle"
dirty_release_output="$TMP_ROOT/dirty-release.out"
create_upstream_repo "$dirty_release_upstream"
mkdir -p "$dirty_release_bundle"
printf 'dirty\n' >"$dirty_release_upstream/untracked.txt"
expect_failure "$dirty_release_output" \
  make_in_repo site-release \
  UPSTREAM_ROOT="$dirty_release_upstream" \
  BUNDLE_ROOT="$dirty_release_bundle" \
  SIGNING_KEY="$TMP_ROOT/no-signing-key"
assert_contains "$dirty_release_output" 'Release cycle'
assert_contains "$dirty_release_output" "Error: upstream $dirty_release_upstream has uncommitted or untracked changes."
assert_not_contains "$dirty_release_output" 'Changes detected. Projecting tarball'
assert_not_contains "$dirty_release_output" 'Syncing upstream'
assert_not_contains "$dirty_release_output" 'Signing '
assert_not_contains "$dirty_release_output" 'Syncing release artefacts into site/public/'
assert_not_contains "$dirty_release_output" 'Installing site deps'
assert_not_contains "$dirty_release_output" 'Deploying site'
assert_not_exists "$dirty_release_bundle/vibecrafted-v9.9.9.tar.gz"
assert_not_exists "$dirty_release_bundle/SHA256SUMS"
pass 'dirty upstream blocks site-release before preview, build, sign, sync, site-build, and deploy'

canonical_parent="$TMP_ROOT/canonical-parent"
canonical_landing="$canonical_parent/vibecrafted-io"
canonical_real="$canonical_parent/upstream-real"
canonical_link="$canonical_parent/vibecrafted"
canonical_output="$TMP_ROOT/canonical.out"
mkdir -p "$canonical_landing"
create_upstream_repo "$canonical_real"
ln -s "$canonical_real" "$canonical_link"
canonical_realpath="$(cd "$canonical_real" && pwd -P)"
printf 'dirty\n' >"$canonical_real/untracked.txt"
expect_failure "$canonical_output" \
  make --no-print-directory -f "$MAKEFILE" -C "$canonical_landing" bundle-preflight \
  BUNDLE_ROOT="$TMP_ROOT/canonical-bundle"
assert_contains "$canonical_output" "Error: upstream $canonical_realpath has uncommitted or untracked changes."
assert_not_contains "$canonical_output" "Error: upstream $canonical_link has uncommitted or untracked changes."
pass 'detected upstream root is canonicalized with realpath before preflight'

printf '\nBundle preflight regression checks passed.\n'
