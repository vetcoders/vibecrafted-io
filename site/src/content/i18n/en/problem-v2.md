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

# Heading carries inline HTML (<br />, two <em class="accent-2"> + <em class="accent">).
# False-precision contrast: "complete" (a harder promise than "done") vs "fragile"
# (the reality). Second line is a moment of disclosure: "After the first user it
# usually turns out that...", not a flat statement. Three accents for visual rhythm.
headingHtml: 'Agent-built apps can look <em class="accent-2">complete</em>.<br />After the first user it usually turns out that <em class="accent-2">auth</em>, data, payments, and deploy are still <em class="accent">fragile</em>.'

# Lead body under the heading. Plain text. Concrete scene (first install on
# someone else's OS) instead of abstract persona ("real users").
body: "Code generation gets you to a demo. The truth usually surfaces on the first install on someone else's machine, the first Stripe webhook, the first security review, or a new developer on the team — they show you what no prompt ever truly took on."

# Symptoms list — short label + body pairs surfacing the most common gaps.
# Short sentences with rhythm.
symptoms:
  - label: "Security review"
    body: "The app works. Auth has two roles: admin and user. Tokens live in the wrong place. Nobody can tell who has access to what."
  - label: "Money path"
    body: "Stripe works. Until it does not. A webhook fails once, there is no retry, and the customer notices the missing service before the system does."
---
