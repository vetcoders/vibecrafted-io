---
# Framework V2 — "The Framework" section (operators row, CTA to Playground).
#
# Source of truth (until 2026-05-14): site/src/lib/i18n/en.ts → landingV2.framework + v2Sections.framework
# Rendered by: site/src/components/sections/SectionFramework.astro
#
# Phase A migration: markdown exists parallel to en.ts.
# Phase B (TBD by parent): component switched to getEntry('i18n', 'en/framework-v2').

# Section chrome from landingV2.framework
title: "THE FRAMEWORK"
centerLabel: "SCAFFOLD → RELEASE"

# Heading carries inline HTML (<br />, <em class="accent-2">). One string so
# the component can render it via {@html ...}.
headingHtml: 'Not a rewrite. A cadence.<br /><em class="accent-2">Every write earns a read</em>'

# Subtitle under the heading — the pitch for the framework as a discipline.
subtitle: "Eleven stages alternate Read and Write. Every write — implement, marbles, polarize — is immediately falsified by a read — review, audit, DoU. Marbles raises entropy to fill the cracks; Polarize cuts it back to one truth. Each stage runs its leg and hands the baton to the next, so nothing ships unchecked."

# Operators block — heading + sub above the six-operator row.
operatorsHeadingHtml: "How the <em>pass</em> runs"
operatorsSub: "Each workflow has one job. Read the repo, make the cut, test the real path, or audit what is still not ready. Names come later; the evidence comes first."

# Primary CTA (links to /en/framework/ via the component).
cta: "Open the Playground"

# Six operators rendered as a row of cards. Order matters — it traces the
# Scaffold → Release path through the framework.
# Channel labels (3.6.0): prebuilt-first acquisition — npm / crates / PyPI before cargo.
operators:
  - num: "00"
    name: "loctree"
    kind: "npm · STRUCTURE"
  - num: "01"
    name: "aicx"
    kind: "npm · MEMORY"
  - num: "02"
    name: "prview"
    kind: "crates · REVIEW"
  - num: "03"
    name: "ScreenScribe"
    kind: "PyPI · EARS"
  - num: "04"
    name: "vc-frame"
    kind: "cockpit · RAIL"
  - num: "05"
    name: "DoU"
    kind: "GATE"
---
