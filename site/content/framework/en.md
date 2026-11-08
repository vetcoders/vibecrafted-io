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
centerLabel: "MAP → PROVE"

# Heading carries inline HTML (<br />, <em class="accent-2">). One string so
# the component can render it via {@html ...}.
headingHtml: 'Not a rewrite. A cadence.<br /><em class="accent-2">Map · Remember · Craft · Wire · Prove</em>'

# Subtitle under the heading — the pitch for the framework as a discipline.
subtitle: "Five phases, four cuts of the same truth. Loctree maps before the edit. Aicx remembers after compaction. Agents ship under gates. vc-slack is the mouth — Slack is a projector. Marbles settle only what those four already made true. Green CI is not a product verdict."

# Operators block — heading + sub above the six-operator row.
operatorsHeadingHtml: "Four cuts. <em>One loop</em>"
operatorsSub: "Sight, memory, mouth, hands. Names you can type. Evidence first — the board is the metaphor."

# Primary CTA (links to /en/framework/ via the component).
cta: "Open the operator playground"

# Six operators rendered as a row of cards. Order traces Map → Prove.
operators:
  - num: "00"
    name: "Loctree"
    kind: "SIGHT"
  - num: "01"
    name: "Aicx"
    kind: "MEMORY"
  - num: "02"
    name: "vc-slack"
    kind: "MOUTH"
  - num: "03"
    name: "Codescribe"
    kind: "VOICE"
  - num: "04"
    name: "Vibecrafted"
    kind: "HANDS"
  - num: "05"
    name: "Marbles"
    kind: "PROOF"
---
