---
# Operator V2 — "The Operator" section (install steps, board preview).
#
# Source of truth (until 2026-05-14): site/src/lib/i18n/en.ts → landingV2.operator + v2Sections.operator
# Rendered by: site/src/components/sections/SectionOperator.astro
#
# Phase A migration: markdown exists parallel to en.ts.
# Phase B (TBD by parent): component switched to getEntry('i18n', 'en/operator-v2').

# Section chrome from landingV2.operator
title: "THE OPERATOR"
centerLabel: "INSTALL · HAND OFF · OBSERVE"

# Main heading — inline HTML kept as a single string (<br />, <em class="accent-2">).
headingHtml: 'Install once. Then <em class="accent-2">pass the baton</em>'

# Three install steps — terminal-shaped cards.
installSteps:
  - step: "STEP 01"
    command: "$ curl -fsSL vibecrafted.io/install.sh | bash"
    note: "One local bootstrap. It installs the commands and opens the guided launcher."
  - step: "STEP 02"
    command: "$ vibecrafted doctor"
    note: "A quick health check before agents touch the repo."
  - step: "STEP 03"
    command: "$ vibecrafted init claude"
    note: "A first-context pass with a real agent inside a real repository."

# Secondary heading for the "shared surface" half of the section.
shotHeadingHtml: 'The repo gets a <em class="accent-2">shared surface</em>'
shotBody: "A session can end without disappearing. The operator is an agent: it runs the relay, and each leg hands the baton to the next runner — the next agent inherits reports, decisions, and open questions, not a cold prompt. You stay the founder — scope, taste, the hard transitions, the feel of the project — you never run the legs yourself."

# Three bullets describing what the shared surface gives you.
bullets:
  - title: "State has a place."
    body: "Artifacts live under $VIBECRAFTED_ROOT/. Not in the memory of whichever tab happened to be open."
  - title: "Runs leave evidence."
    body: "Each agent run leaves prompt, report, metadata, and the decision it was meant to back up."
  - title: "Undone stays visible."
    body: "DoU and marbles keep the unresolved pieces on the board until somebody decides what they mean."

# Operator habits — caps-locked tape running across the section.
practicesLabel: "HOW THE RELAY HOLDS"
practices:
  - "ONE REPO, ONE SURFACE"
  - "CONTRACT BEFORE PROMPT"
  - "EVIDENCE OVER MOOD"
  - "UNRESOLVED STAYS VISIBLE"

# Board preview — the interactive widget showing BOARD / MARBLES / DOU tabs.
# Kept as one nested object to mirror the en.ts shape 1:1.
boardPreview:
  dwg: "VC-001 · REV A"
  timestamp: "t=14:04:48"
  meta: "20 MARBLES · 054 CONVERGE"
  metaLeft: "BOARD STATE"
  live: "LIVE"
  tabsAria: "Board preview views"
  tabs:
    board: "BOARD"
    marbles: "MARBLES"
    dou: "DOU"
  boardHeaders:
    n: "N#"
    phase: "PHASE"
    marbles: "MARBLES"
    coverage: "COVERAGE"
    state: "STATE"
  boardRows:
    - num: "00"
      phase: "scaffold"
      marbles: "03"
      coverage: 10
      pct: "100"
      state: "converged"
      stateLabel: "CONVERGED"
    - num: "01"
      phase: "implement"
      marbles: "08"
      coverage: 10
      pct: "100"
      state: "converged"
      stateLabel: "CONVERGED"
    - num: "02"
      phase: "review"
      marbles: "05"
      coverage: 10
      pct: "100"
      state: "converged"
      stateLabel: "CONVERGED"
    - num: "03"
      phase: "workflow"
      marbles: "06"
      coverage: 7
      pct: "072"
      state: "active"
      stateLabel: "ACTIVE"
    - num: "04"
      phase: "follow-up"
      marbles: "03"
      coverage: 6
      pct: "058"
      state: "active"
      stateLabel: "ACTIVE"
    - num: "05"
      phase: "marbles"
      marbles: "12"
      coverage: 5
      pct: "048"
      state: "active"
      stateLabel: "ACTIVE"
    - num: "06"
      phase: "audit"
      marbles: "02"
      coverage: 0
      pct: "000"
      state: "waiting"
      stateLabel: "WAITING"
    - num: "07"
      phase: "polarize"
      marbles: "00"
      coverage: 0
      pct: "000"
      state: "waiting"
      stateLabel: "WAITING"
    - num: "08"
      phase: "doU"
      marbles: "00"
      coverage: 0
      pct: "000"
      state: "waiting"
      stateLabel: "WAITING"
    - num: "09"
      phase: "hydrate"
      marbles: "00"
      coverage: 0
      pct: "000"
      state: "blocked"
      stateLabel: "BLOCKED"
    - num: "10"
      phase: "release"
      marbles: "00"
      coverage: 0
      pct: "000"
      state: "blocked"
      stateLabel: "BLOCKED"
  marblesHeaders:
    time: "TIME"
    op: "OP"
    phase: "PHASE"
    marble: "MARBLE"
    status: "STATUS"
  marblesLog:
    - ts: "14:03:02"
      op: "loctree"
      phase: "00/scaffold"
      msg: "shape accepted, 04 wells assigned"
      status: "ok"
    - ts: "14:03:18"
      op: "aicx"
      phase: "00/scaffold"
      msg: "intent snapshot committed"
      status: "ok"
    - ts: "14:03:44"
      op: "prview"
      phase: "01/craft"
      msg: "3 files reviewed, 1 change requested"
      status: "rej"
    - ts: "14:04:09"
      op: "ScreenScribe"
      phase: "01/craft"
      msg: "runtime sample captured"
      status: "ok"
    - ts: "14:04:31"
      op: "prview"
      phase: "01/craft"
      msg: "resubmitted and accepted"
      status: "ok"
    - ts: "14:04:48"
      op: "loctree"
      phase: "02/convergence"
      msg: "duplicate groove collapsed"
      status: "ok"
  douItems:
    - num: "01"
      severity: "block"
      phase: "DoU"
      text: "Release gate status undefined for phase 04."
    - num: "02"
      severity: "warn"
      phase: "craft"
      text: "2 marbles waiting on specialist coverage acknowledgement."
    - num: "03"
      severity: "warn"
      phase: "release"
      text: "Changelog template not yet bound to board archive."
  ticksAria: "{coverage} of 10 ticks filled"
  caption: "Board state as observed at {timestamp}, after six throws across phases 00–02."
---
