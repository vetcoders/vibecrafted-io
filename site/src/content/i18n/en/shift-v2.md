---
# Shift V2 — "The Shift" comparison section (Without/With a board).
#
# Source of truth (until 2026-05-14): site/src/lib/i18n/en.ts → landingV2.shift + v2Sections.shift
# Rendered by: site/src/components/sections/SectionShift.astro
#
# Phase A migration: markdown exists parallel to en.ts.
# Phase B (TBD by parent): component switched to getEntry('i18n', 'en/shift-v2').

# Section chrome from landingV2.shift
title: "THE SHIFT"
centerLabel: "VIBES → VECTORS"

# Heading split — two lines, each with a trailing accented word/phrase.
# Component composes as:  "{first} *{firstAccent}*"  /  "{second} *{secondAccent}*"
heading:
  first: "Most AI coding sessions leave"
  firstAccent: "fragments."
  second: "Vibecrafted gives the work"
  secondAccent: "coordinates."

# Column labels above the two comparison stacks.
todayLabel: "Without a board"
vibecraftedLabel: "With a board"

# Left column — failure modes when there is no shared board.
todayItems:
  - number: "01"
    title: "Context evaporates."
    body: "The next session may inherit a diff, but not the reason behind it. The repo has changes; the work has no memory."
  - number: "02"
    title: "Retry becomes the method."
    body: "A compile pass starts to feel like proof. It is useful signal, just not enough to know whether the product is safe."
  - number: "03"
    title: "Done stays blurry."
    body: "Artifacts collect in comments, branches, notes, and screenshots. A future agent can see pieces, but not the shape."

# Right column — what the board adds.
vibecraftedItems:
  - number: "01"
    title: "The contract is visible."
    body: "Scope, owner, evidence, and next action sit on the same surface before the agent starts cutting."
  - number: "02"
    title: "The trail survives."
    body: "Reports and artifacts stay attached to the repo, so the next session can continue from evidence instead of mood."
  - number: "03"
    title: "Convergence is inspectable."
    body: "The board does not declare victory. It shows what landed, what moved, and what still asks for a decision."

# Bottom proof strip — small numeric badges under the comparison.
proofItems:
  - count: "05"
    label: "PHASES"
  - count: "06"
    label: "OPERATORS"
  - count: "01"
    label: "SHARED BOARD"
  - count: "00"
    label: "LOST CONTEXT"
---
