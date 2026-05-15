---
# Evidence V2 — "Evidence in the wild" field-notes section.
#
# Source of truth (until 2026-05-14): site/src/lib/i18n/en.ts → landingV2.evidence + v2Sections.evidenceWild
# Rendered by: site/src/components/sections/SectionEvidence.astro
#
# Phase A migration: markdown exists parallel to en.ts.
# Phase B (TBD by parent): component switched to getEntry('i18n', 'en/evidence-v2').

# Section chrome from landingV2.evidence
title: "EVIDENCE"
centerLabel: "FROM THE WILD · PATTERNS OBSERVED"

# Heading carries an inline <em class="accent">. One string for {@html ...}.
headingHtml: 'The vibe hangover in the <em class="accent">wild</em>'
subtitle: "A few field notes from agent-built products and our own release lanes. Anonymized, because the pattern matters more than the name."

# Four anonymized field notes — each card is one observed failure pattern.
# `accent` switches the card's color treatment (rust/amber/red).
patterns:
  - num: "01"
    label: "RELEASE MIRROR"
    headline: "Two checkouts, two truths."
    observation: "The upstream framework was already fixed, but the public landing repo still served older installer truth. Everyone was right inside their own checkout; the user saw drift."
    source: "FIELD NOTE · representative repo release lane"
    accent: "rust"
  - num: "02"
    label: "HELPER DRIFT"
    headline: "The runtime moved. The docs did not."
    observation: "A helper script kept yesterday's path assumptions after the main runtime flow was repaired. The product worked, until an operator followed the stale trail."
    source: "FIELD NOTE · helper surface audit"
    accent: "amber"
  - num: "03"
    label: "SILENT FAILURES"
    headline: "The webhook that never retried."
    observation: "A checkout path looked healthy until activation moved into claim and webhook truth. The sale happened; the entitlement story still needed a witness."
    source: "OBSERVED · real founder (redacted)"
    accent: "red"
  - num: "04"
    label: "DEPLOY AND PRAY"
    headline: "Friday afternoon migration runs four times."
    observation: "No staging, no smoke tests, no rollback. The migration deadlocks on a lock table. Support tickets spike while the founder tries to remember which tab ran last."
    source: "OBSERVED · field reports"
    accent: "rust"
---
