#!/usr/bin/env bash
# sync-docs.sh — Plan 15 (META_22 Wave 5).
#
# Mirrors sibling-repo public docs into the Astro content collection at
# `site/src/content/docs/`. Source of truth: ../vibecrafted/docs/*.md.
#
# Idempotent: skips files whose source mtime is older than or equal to the
# existing destination mtime. Re-running on a clean tree is a no-op.
#
# Skip list (NOT mirrored):
#   - THE_VIBE_HANGOVER.md      (already vendored as Plan 14 manifesto)
#   - MARKETPLACE_LISTING.md    (operator-side launch playbook, not public docs)
#   - SUBMISSION_FORMS.md       (operator-side directory submission tracker)
#
# Frontmatter is rewritten — we replace whatever the source carried with a
# normalized shape consumed by the `docs` content collection in
# `site/src/content.config.ts`:
#
#   ---
#   title: "Human-readable title"
#   description: "One-line snippet pulled from the first non-heading paragraph."
#   slug: "lowercase-dash-slug"
#   section: "install" | "architecture" | "skills" | "faq" | "release" | "other"
#   syncedAt: "YYYY-MM-DD"
#   sourcePath: "docs/<NAME>.md"
#   ---
#
# Run manually: `bash scripts/sync-docs.sh`
# Hook into builds: `pnpm run prebuild` already runs the legacy python sync; we
# leave that path alone and document this as an operator-side cut.
#
# Exit codes:
#   0  success (with possible no-op output)
#   1  source dir missing or unreadable
#   2  destination dir cannot be created
#
# Living Tree contract: this script only writes inside this repo. It never
# touches `../vibecrafted/`. Source docs must be edited there; never edit the
# generated mirror — your edits will be overwritten on the next sync.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
SOURCE_DIR="${REPO_ROOT}/../vibecrafted/docs"
DEST_DIR="${REPO_ROOT}/site/src/content/docs"
TODAY="$(date -u +%Y-%m-%d)"

# Allow override for testing.
SOURCE_DIR="${VIBECRAFTED_DOCS_SRC:-${SOURCE_DIR}}"

if [[ ! -d "${SOURCE_DIR}" ]]; then
  printf 'sync-docs: source directory not found: %s\n' "${SOURCE_DIR}" >&2
  printf '  Set VIBECRAFTED_DOCS_SRC to override.\n' >&2
  exit 1
fi

mkdir -p "${DEST_DIR}" || {
  printf 'sync-docs: cannot create destination: %s\n' "${DEST_DIR}" >&2
  exit 2
}

# Skip list — names match basenames in ${SOURCE_DIR}.
SKIP=(
  "THE_VIBE_HANGOVER.md"
  "MARKETPLACE_LISTING.md"
  "SUBMISSION_FORMS.md"
)

is_skipped() {
  local name="$1"
  local skip
  for skip in "${SKIP[@]}"; do
    if [[ "${name}" == "${skip}" ]]; then
      return 0
    fi
  done
  return 1
}

# Slug: lowercase, underscores -> dashes, drop extension.
slugify() {
  local name="$1"
  name="${name%.md}"
  name="${name,,}"
  name="${name//_/-}"
  printf '%s' "${name}"
}

# Title: read first markdown H1; fall back to humanized slug.
extract_title() {
  local file="$1"
  local slug="$2"
  local h1
  h1="$(awk '/^# / { sub(/^# */, ""); print; exit }' "${file}")"
  if [[ -n "${h1}" ]]; then
    printf '%s' "${h1}"
  else
    # Humanize: dashes -> spaces, capitalize first letter of each word.
    local humanized
    humanized="$(printf '%s' "${slug}" | tr '-' ' ')"
    printf '%s' "${humanized}"
  fi
}

# Description: first non-empty, non-heading, non-frontmatter paragraph,
# stripped of markdown noise and truncated to ~200 chars at a word boundary.
extract_description() {
  local file="$1"
  local raw
  raw="$(awk '
    BEGIN { in_fm = 0; in_code = 0; first_seen = 0 }
    NR == 1 && /^---[[:space:]]*$/ { in_fm = 1; next }
    in_fm && /^---[[:space:]]*$/ { in_fm = 0; next }
    in_fm { next }
    /^```/ { in_code = !in_code; next }
    in_code { next }
    /^#/ { next }
    /^>/ { next }
    /^\|/ { next }
    /^[[:space:]]*$/ { if (first_seen) exit; next }
    /^!\[/ { next }
    { first_seen = 1; print; }
  ' "${file}" | tr '\n' ' ')"

  # Strip leading/trailing whitespace, collapse runs of whitespace.
  raw="$(printf '%s' "${raw}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' -e 's/[[:space:]]\{2,\}/ /g')"

  # Strip simple markdown emphasis / link syntax for cleaner output.
  # shellcheck disable=SC2016  # sed patterns are literal, not shell expansions.
  raw="$(printf '%s' "${raw}" | sed -E -e 's/\*\*([^*]+)\*\*/\1/g' -e 's/\*([^*]+)\*/\1/g' -e 's/`([^`]+)`/\1/g' -e 's/\[([^]]+)\]\([^)]+\)/\1/g')"

  if [[ -z "${raw}" ]]; then
    printf '%s' "Vibecrafted documentation."
    return
  fi

  # Truncate to ~200 chars at a word boundary.
  if (( ${#raw} > 200 )); then
    raw="${raw:0:200}"
    raw="${raw% *}…"
  fi

  printf '%s' "${raw}"
}

# Section: classify by filename so the sidebar nav can group entries.
classify_section() {
  local name="$1"
  case "${name}" in
    INSTALL.md|QUICK_START.md|DOCKER.md|ZELLIJ.md|ITERM2.md)
      printf 'install'
      ;;
    FOUNDATION.md|FRONTIER.md|PERCEPTION.md|WORKFLOWS.md)
      printf 'architecture'
      ;;
    SKILLS.md|CONTRIBUTING-SKILLS.md)
      printf 'skills'
      ;;
    FAQ.md|FAQ-ANSWERED.md)
      printf 'faq'
      ;;
    RELEASE_KICKOFF.md)
      printf 'release'
      ;;
    *)
      printf 'other'
      ;;
  esac
}

# Strip the first frontmatter block from a markdown body, if any.
strip_frontmatter() {
  local file="$1"
  awk '
    BEGIN { in_fm = 0; done = 0 }
    NR == 1 && /^---[[:space:]]*$/ { in_fm = 1; next }
    in_fm && /^---[[:space:]]*$/ { in_fm = 0; done = 1; next }
    in_fm { next }
    { print }
  ' "${file}"
}

# Escape a value for safe inclusion in YAML double-quoted string.
yaml_escape() {
  local s="$1"
  s="${s//\\/\\\\}"
  s="${s//\"/\\\"}"
  printf '%s' "${s}"
}

synced=0
skipped=0
unchanged=0

for src in "${SOURCE_DIR}"/*.md; do
  [[ -e "${src}" ]] || continue
  basename="$(basename "${src}")"

  if is_skipped "${basename}"; then
    skipped=$((skipped + 1))
    continue
  fi

  slug="$(slugify "${basename}")"
  dest="${DEST_DIR}/${slug}.md"

  # Idempotency check — source unchanged since last sync, leave dest alone.
  if [[ -f "${dest}" && "${src}" -ot "${dest}" ]]; then
    unchanged=$((unchanged + 1))
    continue
  fi
  if [[ -f "${dest}" && "${src}" -nt "${dest}" ]]; then
    : # source newer — regenerate
  elif [[ -f "${dest}" ]]; then
    # mtimes equal -> skip
    unchanged=$((unchanged + 1))
    continue
  fi

  title="$(extract_title "${src}" "${slug}")"
  description="$(extract_description "${src}")"
  section="$(classify_section "${basename}")"

  title_yaml="$(yaml_escape "${title}")"
  desc_yaml="$(yaml_escape "${description}")"

  {
    printf -- '---\n'
    printf 'title: "%s"\n' "${title_yaml}"
    printf 'description: "%s"\n' "${desc_yaml}"
    printf 'slug: "%s"\n' "${slug}"
    printf 'section: "%s"\n' "${section}"
    printf 'lang: "en"\n'
    printf 'syncedAt: "%s"\n' "${TODAY}"
    printf 'sourcePath: "docs/%s"\n' "${basename}"
    printf -- '---\n\n'
    strip_frontmatter "${src}"
  } > "${dest}"

  # Pin dest mtime to source mtime so subsequent runs see them as equal.
  touch -r "${src}" "${dest}"

  synced=$((synced + 1))
done

printf 'sync-docs: synced=%d unchanged=%d skipped=%d (source=%s)\n' \
  "${synced}" "${unchanged}" "${skipped}" "${SOURCE_DIR}"
