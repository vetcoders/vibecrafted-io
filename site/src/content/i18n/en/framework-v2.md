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
headingHtml: 'Not a rewrite. A stabilization sprint<br /><em class="accent-2">Find the weak seams, then close them</em>'

# Subtitle under the heading — the pitch for the framework as a discipline.
subtitle: "Vibecrafted keeps the momentum from AI-built software and adds the missing release discipline: map the repo, assign the next cut, verify runtime truth, and leave evidence for the next session."

# Operators block — heading + sub above the six-operator row.
operatorsHeadingHtml: "How the <em>pass</em> runs"
operatorsSub: "Each workflow has one job. Read the repo, make the cut, test the real path, or audit what is still not ready. Names come later; the evidence comes first."

# Primary CTA (links to /en/framework/ via the component).
cta: "Open the Playground"

# Six operators rendered as a row of cards. Order matters — it traces the
# Scaffold → Release path through the framework.
operators:
  - num: "00"
    name: "loctree"
    kind: "STRUCTURE"
  - num: "01"
    name: "aicx"
    kind: "MEMORY"
  - num: "02"
    name: "prview"
    kind: "REVIEW"
  - num: "03"
    name: "ScreenScribe"
    kind: "RUNTIME"
  - num: "04"
    name: "DoU"
    kind: "GATE"
  - num: "05"
    name: "Review"
    kind: "CLOSING"
---
