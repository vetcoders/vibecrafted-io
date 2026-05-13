#!/usr/bin/env bash
# buttondown-sync.sh — Plan 19 operator workflow tool.
#
# Reads markdown files from site/src/content/newsletter/*.md and POSTs each
# to Buttondown's /v1/emails endpoint. Idempotent: skips entries already
# present in the remote list (by subject match).
#
# This is operator workflow tooling, NOT runtime. Site build does not
# depend on it. Buttondown account key lives operator-side in
# BUTTONDOWN_API_KEY and is never committed.
#
# Usage:
#   BUTTONDOWN_API_KEY=xxx scripts/buttondown-sync.sh              # dry-run (default)
#   BUTTONDOWN_API_KEY=xxx scripts/buttondown-sync.sh --publish    # actually POST
#
# Anti-aesthetic gates honored:
#   - no marketing fluff in default subjects (uses frontmatter title verbatim)
#   - no auto-promotion to existing subscribers (operator runs the publish
#     button on Buttondown's dashboard after this uploads the draft)
#
# Dependencies: bash 4+, curl, awk, sed. No jq required (we keep the
# script portable on stock macOS / Linux). Frontmatter parsing is
# intentionally simple — supports `key: "value"` and `key: value` on one
# line. Multi-line YAML scalars are NOT supported; keep frontmatter flat.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
CONTENT_DIR="${REPO_ROOT}/site/src/content/newsletter"
API_BASE="https://api.buttondown.com/v1/emails"

DRY_RUN=true
if [[ "${1:-}" == "--publish" ]]; then
    DRY_RUN=false
fi

if [[ "${DRY_RUN}" == "false" && -z "${BUTTONDOWN_API_KEY:-}" ]]; then
    printf 'buttondown-sync: BUTTONDOWN_API_KEY not set. Refusing to publish.\n' >&2
    exit 64
fi

if [[ ! -d "${CONTENT_DIR}" ]]; then
    printf 'buttondown-sync: content dir not found: %s\n' "${CONTENT_DIR}" >&2
    exit 65
fi

shopt -s nullglob
files=("${CONTENT_DIR}"/*.md)
if (( ${#files[@]} == 0 )); then
    printf 'buttondown-sync: no markdown files under %s\n' "${CONTENT_DIR}"
    exit 0
fi

# Extract a YAML scalar from a markdown file's frontmatter block. Supports:
#   key: "double-quoted"
#   key: 'single-quoted'
#   key: bare-value
# Strips surrounding quotes; returns empty string when missing.
extract_frontmatter() {
    local file="$1" key="$2"
    awk -v key="${key}" '
        BEGIN { inside = 0 }
        /^---[[:space:]]*$/ {
            inside = !inside
            if (!inside) exit
            next
        }
        inside && $0 ~ "^"key":[[:space:]]" {
            line = $0
            sub("^"key":[[:space:]]*", "", line)
            sub(/^"/, "", line); sub(/"$/, "", line)
            sub(/^'\''/, "", line); sub(/'\''$/, "", line)
            print line
            exit
        }
    ' "${file}"
}

# Strip the frontmatter block from a markdown file (return body only).
strip_frontmatter() {
    awk '
        BEGIN { inside = 0; passed = 0 }
        !passed && /^---[[:space:]]*$/ {
            inside = !inside
            if (!inside) { passed = 1 }
            next
        }
        passed { print }
    ' "$1"
}

# Fetch list of existing email subjects from Buttondown. Returns one
# subject per line. Best-effort: if the API errors, we surface the body
# and exit non-zero so the operator can debug.
fetch_remote_subjects() {
    local resp
    resp=$(curl -fsS -H "Authorization: Token ${BUTTONDOWN_API_KEY}" "${API_BASE}?ordering=-publish_date&pagesize=100" 2>&1) || {
        printf 'buttondown-sync: failed to fetch remote list:\n%s\n' "${resp}" >&2
        return 1
    }
    # Hand-extract `"subject":"..."` without jq. Buttondown JSON keeps
    # subjects on single lines without escaped double quotes inside subjects.
    printf '%s\n' "${resp}" | grep -oE '"subject":"[^"]*"' | sed -E 's/^"subject":"//; s/"$//'
}

remote_subjects=""
if [[ "${DRY_RUN}" == "false" ]]; then
    remote_subjects="$(fetch_remote_subjects || true)"
fi

published_count=0
skipped_count=0
dry_run_count=0

for file in "${files[@]}"; do
    title=$(extract_frontmatter "${file}" "title")
    if [[ -z "${title}" ]]; then
        printf 'buttondown-sync: skipping %s (no title frontmatter)\n' "${file}" >&2
        continue
    fi

    body=$(strip_frontmatter "${file}")

    if [[ "${DRY_RUN}" == "true" ]]; then
        printf '  [dry-run] would upload: %s\n' "${title}"
        printf '            body length:  %d chars\n' "${#body}"
        dry_run_count=$((dry_run_count + 1))
        continue
    fi

    if printf '%s\n' "${remote_subjects}" | grep -Fxq "${title}"; then
        printf '  [skip]    already on Buttondown: %s\n' "${title}"
        skipped_count=$((skipped_count + 1))
        continue
    fi

    # POST as a draft email. Operator clicks "publish" in Buttondown's
    # dashboard after reviewing. Body is markdown — Buttondown accepts it.
    json_payload=$(
        printf '{"subject":%s,"body":%s,"status":"draft"}' \
            "$(printf '%s' "${title}" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')" \
            "$(printf '%s' "${body}" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')"
    )

    resp=$(curl -fsS -X POST \
        -H "Authorization: Token ${BUTTONDOWN_API_KEY}" \
        -H "Content-Type: application/json" \
        -d "${json_payload}" \
        "${API_BASE}" 2>&1) || {
        printf '  [error]   POST failed for %s:\n%s\n' "${title}" "${resp}" >&2
        continue
    }

    printf '  [draft]   uploaded as draft: %s\n' "${title}"
    published_count=$((published_count + 1))
done

if [[ "${DRY_RUN}" == "true" ]]; then
    printf '\nbuttondown-sync: dry-run complete. %d entries would upload.\n' "${dry_run_count}"
    printf 'buttondown-sync: re-run with --publish (and BUTTONDOWN_API_KEY set) to actually upload as drafts.\n'
else
    printf '\nbuttondown-sync: %d uploaded as drafts, %d skipped (already present).\n' \
        "${published_count}" "${skipped_count}"
    printf 'buttondown-sync: review and publish from https://buttondown.com/emails\n'
fi
