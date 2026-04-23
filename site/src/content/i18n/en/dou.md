---
# DoU — Definition of Undone manifesto + convergence trajectory chart.
# Rendered by: site/src/components/sections/DouSection.astro

# Section eyebrow.
label: "DoU"

# H2.
title: "The Definition of Undone"

# Pull-quote rendered as a blockquote at the top of the manifesto block.
quote: "AI agents have solved the hardest part of software creation: making the thing work. They have not yet solved the second hardest part: making the thing reachable."

# Lead paragraph below the blockquote.
lead: "The gap is rarely code quality. It is the brutal space between a working system and a product that strangers can discover, install, trust, and buy."

# Label introducing the checklist.
diagnosticLabel: "The Founder's Diagnostic:"

# Founder's checklist. `kind` is "check" (rendered with +) or "cross" (rendered with –).
checklist:
  - kind: "check"
    text: "Tests pass"
  - kind: "check"
    text: "Architecture is sound"
  - kind: "check"
    text: "README exists"
  - kind: "cross"
    text: "Nobody can find it from Google"
  - kind: "cross"
    text: "Nobody can install it without a toolchain"
  - kind: "cross"
    text: "Nobody can pay for it"

# Closing summary under the checklist.
summary: "Items 4–6 are the Definition of Undone. Phase 3 forces the system into the market."

# Caption above the trajectory chart on the right.
caption: "Convergence Trajectory — loop until the circle is full"

# Five labels for the convergence-trajectory bar chart. Order matters.
bars:
  - "Loop 1"
  - "Loop 2"
  - "Loop 3"
  - "Loop 4"
  - "Loop 5"

# Caption shown beneath the bars.
scoreline: "Score: 15 → 40 → 65 → 85 → 100"
---
