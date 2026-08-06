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

# Heading: short two-sentence statement. False-precision "complete" vs "fragile".
# Storytelling moment ("After the first user it turns out that...") moved into the
# body. Editorial layout: column 1 (heading) sets the height; right columns fill to
# that height with denser symptom content. Third column OK if shorter.
headingHtml: 'Agent-built apps can look <em class="accent-2">complete</em>.<br />Auth, data, payments, and deploy are still <em class="accent">fragile</em>'

# Lead body under the heading. Plain text. Concrete scene (first install on
# someone else's machine) instead of abstract persona ("real users").
body: "After the first user it usually turns out that a demo is not a product. The truth surfaces on the first install on someone else's machine, the first Stripe webhook, the first security review, or a new developer on the team — they show you what no prompt ever truly took on."

# Symptoms list — short label + body pairs surfacing the most common gaps.
# Editorial-grade density: longer concrete bodies match heading column height.
# Concrete scenes ("seven profiles in prod", "support Discord not the dashboard")
# instead of abstract statements.
symptoms:
  - label: "Security review"
    body: "The app works. Auth has two roles: admin and user — but seven profiles run in prod, and nobody mapped them. Tokens live wherever they end up: localStorage sometimes, HTTP-only cookie sometimes, both at once sometimes. First thing in an audit: nobody can tell who has access to what. Second: when someone leaves the team, the keys stay."
  - label: "Money path"
    body: "Stripe works. Until it does not. A webhook fails once — no retry, no dead letter queue, no alert. The customer notices the missing service before the system does. The founder hears about it on the support Discord, not from the dashboard."
---
