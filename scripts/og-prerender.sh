#!/usr/bin/env bash
#
# og-prerender.sh — Plan 17 OG image verification + optional sidecar copy.
#
# Astro statically renders every `/og/<slug>.png` endpoint at `pnpm build`
# time (see site/src/pages/og/[slug].png.ts + getStaticPaths). The PNGs land
# under `site/dist/og/`. This script is a CI-side safety net:
#
#   1. Walks the expected slug list and asserts each PNG exists in dist/.
#   2. Asserts each is a valid 1200×630 PNG via `file`.
#   3. Optionally copies the rendered PNGs into `site/public/og/` so future
#      `astro dev` runs (which serve from public/ at /og/<slug>.png BEFORE
#      hitting the endpoint) keep parity with the build output.
#
# Run AFTER `pnpm build`. Exit non-zero if any slug is missing or malformed.
#
# Usage:
#   scripts/og-prerender.sh             # verify only
#   scripts/og-prerender.sh --copy      # verify + copy to public/og/
#
# Anti-aesthetic gate: shellcheck-clean, set -euo pipefail, no decorations.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="${REPO_ROOT}/site"
DIST_OG_DIR="${SITE_DIR}/dist/og"
PUBLIC_OG_DIR="${SITE_DIR}/public/og"

# Slug list — keep in sync with OG_SLUGS in site/src/lib/og-renderer.ts.
SLUGS=(
  "landing"
  "landing-en"
  "landing-pl"
  "manifesto-en"
  "manifesto-pl"
  "showcase-index"
  "showcase-loctree-lsp-roadmap"
  "showcase-vista-sealed-env"
  "showcase-audit-22-parallel-truth"
)

COPY_MODE="false"
for arg in "$@"; do
  case "${arg}" in
    --copy) COPY_MODE="true" ;;
    -h|--help)
      echo "usage: $0 [--copy]"
      echo "  --copy  also copy verified PNGs into site/public/og/"
      exit 0
      ;;
    *)
      echo "error: unknown argument: ${arg}" >&2
      exit 2
      ;;
  esac
done

if [[ ! -d "${DIST_OG_DIR}" ]]; then
  echo "error: ${DIST_OG_DIR} not found — run 'pnpm build' first" >&2
  exit 1
fi

FAIL_COUNT=0
for slug in "${SLUGS[@]}"; do
  png_path="${DIST_OG_DIR}/${slug}.png"
  if [[ ! -f "${png_path}" ]]; then
    echo "missing: ${png_path}" >&2
    FAIL_COUNT=$((FAIL_COUNT + 1))
    continue
  fi
  file_kind="$(file -b "${png_path}")"
  if [[ "${file_kind}" != *"PNG image data, 1200 x 630"* ]]; then
    echo "malformed: ${png_path} — ${file_kind}" >&2
    FAIL_COUNT=$((FAIL_COUNT + 1))
    continue
  fi
  size_bytes="$(stat -f%z "${png_path}" 2>/dev/null || stat -c%s "${png_path}")"
  printf "ok: %-44s %s bytes\n" "${slug}.png" "${size_bytes}"
done

if [[ "${FAIL_COUNT}" -gt 0 ]]; then
  echo "" >&2
  echo "FAIL — ${FAIL_COUNT} OG slug(s) missing or malformed" >&2
  exit 1
fi

if [[ "${COPY_MODE}" == "true" ]]; then
  mkdir -p "${PUBLIC_OG_DIR}"
  for slug in "${SLUGS[@]}"; do
    cp "${DIST_OG_DIR}/${slug}.png" "${PUBLIC_OG_DIR}/${slug}.png"
  done
  echo ""
  echo "copied ${#SLUGS[@]} OG PNGs into ${PUBLIC_OG_DIR}/"
fi

echo ""
echo "PASS — ${#SLUGS[@]} OG slug(s) verified"
