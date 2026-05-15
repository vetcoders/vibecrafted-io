---
# Problem V2 — "The Problem" section.
#
# Source of truth (until 2026-05-14): site/src/lib/i18n/en.ts → landingV2.problem + v2Sections.problem
# Rendered by: site/src/components/sections/SectionProblem.astro
#
# Phase A migration: markdown exists parallel to en.ts.
# Phase B (TBD by parent): component switched to getEntry('i18n', 'en/problem-v2').

# Section chrome from landingV2.problem
title: "THE PROBLEM"
centerLabel: "OBSERVED 2024–2026"

# Heading carries inline HTML (<br />, <em class="accent">). Kept as a single
# string so the component can render it via {@html ...} without splitting.
headingHtml: 'Agent-built apps can look done<br />while auth, data, payments, and deploy are still <em class="accent">fragile</em>'

# Lead body under the heading. Plain text.
body: "Code generation gets you to a demo. Real users, money, security reviews, and the next developer expose the parts no prompt ever owned."

# Symptoms list — short label + body pairs surfacing the most common gaps.
symptoms:
  - label: "Security review"
    body: "The app works, but auth is admin/user only, tokens live in the wrong place, and nobody can prove who may touch which data."
  - label: "Money path"
    body: "Stripe works until it does not. A webhook fails once, there is no retry, and the customer finds the missing service before the system does."
---
