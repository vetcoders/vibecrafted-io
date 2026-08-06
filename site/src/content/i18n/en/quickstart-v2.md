---
# Quickstart V2 — "Quickstart" carousel section (six throws).
#
# Source of truth (until 2026-05-14): site/src/lib/i18n/en.ts → landingV2.quickstart + v2Sections.quickstart
# Rendered by: site/src/components/sections/SectionQuickstart.astro
#
# Phase A migration: markdown exists parallel to en.ts.
# Phase B (TBD by parent): component switched to getEntry('i18n', 'en/quickstart-v2').

# Section chrome from landingV2.quickstart
title: "QUICKSTART"
centerLabel: "INIT → SHIP · SIX THROWS"

# Main heading — inline <em> kept as one string.
headingHtml: "Start with the first <em>useful signal</em>"

# Carousel — every quickstart step is a slide with a verb, command, and what
# the step "lands" (i.e. the three deliverables of that throw).
carousel:
  ariaLabel: "Quickstart steps carousel"
  slideAria: "Step {num}: {title}"
  landsLabel: "LANDS:"
  convergeLabel: "CONVERGE"
  previousLabel: "Previous step"
  nextLabel: "Next step"
  dotsLabel: "Step navigation"
  goToStep: "Go to step {number}"
  # Six steps. `state` is 0..1 (progress) and `pct` is the matching string.
  # `accent` switches the visual treatment for the late shipping steps.
  steps:
    - num: "01"
      verb: "CHECK"
      accent: "default"
      state: 0
      pct: "000"
      title: "Check the local surface."
      body: "Start with the boring signal: does the launcher know where it is, what is installed, and what needs attention?"
      command: "$ vibecrafted doctor"
      lands:
        - "INSTALL HEALTH"
        - "FOUNDATION CHECK"
        - "LAUNCHER TRUTH"
    - num: "02"
      verb: "INIT"
      accent: "default"
      state: 0.3
      pct: "030"
      title: "Let an agent read first."
      body: "Init may surface repo shape, recent context, and the first risks before any edit starts."
      command: "$ vibecrafted init claude"
      lands:
        - "REPO MAP"
        - "FIRST CONTEXT"
        - "NEXT MOVE"
    - num: "03"
      verb: "WORKFLOW"
      accent: "default"
      state: 0.6
      pct: "060"
      title: "Choose a lane."
      body: "Workflow helps when the task needs a little ceremony: examine the surface, research the gap, then implement the cut."
      command: '$ vibecrafted workflow claude --prompt "Plan and implement <task>"'
      lands:
        - "PLAN"
        - "IMPLEMENTATION LANE"
        - "REPORT TRAIL"
    - num: "04"
      verb: "MARBLES"
      accent: "default"
      state: 0.75
      pct: "075"
      title: "Look for what still bites."
      body: "Marbles runs small counterexample loops. It may find an edge case, a false assumption, or simply a place that needs a human decision."
      command: "$ vibecrafted marbles codex --count 3 --depth 3"
      lands:
        - "COUNTEREXAMPLES"
        - "FIX LOOPS"
        - "CONVERGENCE SIGNAL"
    - num: "05"
      verb: "DOU"
      accent: "teal"
      state: 0.9
      pct: "090"
      title: "Name the unfinished parts."
      body: "DoU is the moment to stop pretending. It asks what is missing across install, docs, runtime, trust, and release."
      command: '$ vibecrafted dou claude --prompt "Audit launch readiness"'
      lands:
        - "UNDONE LIST"
        - "SHIP RISKS"
        - "PRODUCT TRUTH"
    - num: "06"
      verb: "RELEASE"
      accent: "teal"
      state: 1
      pct: "100"
      title: "Prepare the handoff."
      body: "Release gathers the outward work: artifacts, deployment notes, docs, and the next human-readable step."
      command: '$ vibecrafted release codex --prompt "Prepare release steps"'
      lands:
        - "RELEASE PLAN"
        - "ARTIFACT CHECK"
        - "NEXT STEPS"
---
