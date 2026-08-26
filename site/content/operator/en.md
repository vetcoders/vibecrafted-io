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
centerLabel: "SIGHT · MEMORY · MOUTH"

# Main heading — inline HTML kept as a single string (<br />, <em class="accent-2">).
headingHtml: 'Install. Then <em class="accent-2">see, remember, speak</em>'

# Three install steps — terminal-shaped cards.
installSteps:
  - step: "STEP 01"
    command: "$ curl -fsSL https://vibecrafted.io/install.sh | bash"
    note: "Puts the command on your PATH."
  - step: "STEP 02"
    command: '$ loct impact src/auth.ts && aicx search "handoff"'
    note: "Sight before the edit. Durable intent after compaction."
  - step: "STEP 03"
    command: '$ /vc grok send "Finish until this is a daily-driver, not a demo."'
    note: "Mouth on the bus. Tokens stay on the host. Slack is a projector."

# Secondary heading for the "shared surface" half of the section.
shotHeadingHtml: 'The repo gets a <em class="accent-2">shared surface</em>'
shotBody: "A session can end without disappearing. The operator is an agent: it runs the relay, and each leg hands the baton to the next runner — the next agent inherits reports, decisions, and open questions, not a cold prompt. You stay the founder — scope, taste, the hard transitions, the feel of the project — you never run the legs yourself."

# Three bullets describing what the shared surface gives you.
bullets:
  - title: "Settlement is canonical."
    body: "Mission Control f/x/n reads retained control-plane settlement — the same truth as vc-server API and SSR. The rail is inventory; the board is the score."
  - title: "Runs leave seals."
    body: "Delivery-proof kernel: execution envelope, proof contract, reconstructable seal. A completion label is not enough."
  - title: "Undone stays visible."
    body: "DoU and marbles keep unresolved pieces on the board until somebody decides what they mean."

# Operator habits — caps-locked tape running across the section.
practicesLabel: "HOW THE RELAY HOLDS"
practices:
  - "STRUCTURE BEFORE GENERATION"
  - "MEMORY OUTLIVES THE WINDOW"
  - "SLACK IS A PROJECTOR"
  - "GREEN CI IS NOT A VERDICT"

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
      phase: "02/review"
      msg: "3 files reviewed, 1 change requested"
      status: "rej"
    - ts: "14:04:09"
      op: "ScreenScribe"
      phase: "03/workflow"
      msg: "runtime sample captured"
      status: "ok"
    - ts: "14:04:31"
      op: "prview"
      phase: "02/review"
      msg: "resubmitted and accepted"
      status: "ok"
    - ts: "14:04:48"
      op: "loctree"
      phase: "05/marbles"
      msg: "duplicate groove collapsed"
      status: "ok"
  douItems:
    - num: "01"
      severity: "block"
      phase: "doU"
      text: "Release gate status undefined for stage 10."
    - num: "02"
      severity: "warn"
      phase: "marbles"
      text: "2 marbles waiting on specialist coverage acknowledgement."
    - num: "03"
      severity: "warn"
      phase: "release"
      text: "Changelog template not yet bound to board archive."
  ticksAria: "{coverage} of 10 ticks filled"
  caption: "Board state as observed at {timestamp}, after twelve throws across stages 00–05."
---
