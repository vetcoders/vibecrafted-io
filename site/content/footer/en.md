---
# Footer V2 — landing-page footer continuation strip.
#
# Source of truth (until 2026-05-14): site/src/lib/i18n/en.ts → landingV2.footer
# Rendered by: site/src/pages/en/index.astro (V2 layout chrome)
#
# Phase A migration: markdown exists parallel to en.ts.
# Phase B (TBD by parent): component switched to getEntry('i18n', 'en/footer-v2').
#
# Note: the full sitewide footer lives in v2Chrome.footer (separate concern).
# This file only carries the V2 landing continuation marker — the "CONTINUES §"
# strip the component formats with {number} and {title} placeholders for the
# next section in the sequence.

# Continuation template — the component injects {number} and {title} per use.
continues: "CONTINUES § {number} · {title}"
---
