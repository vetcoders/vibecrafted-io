---
# Marbles — diffusion-style convergence narrative.
# Rendered by: site/src/components/sections/MarblesSection.astro
#
# All copy is plain text — no inline accents in this section. The MarbleCanvas
# Svelte component (sections.marbleCanvas in i18n dict) is unrelated and stays
# in TypeScript dict for now.

# Section eyebrow.
label: "Marbles"

# H2.
title: "Denoise Until the Circle Is Full"

# Lead under the title.
sub: "AI agents are stochastic parrots. Every generation introduces noise. You cannot prompt your way out of it. You iterate."

# H3 introducing the isomorphism panel on the right side.
heading: "The Isomorphism"

# Two formula cards comparing image diffusion to code diffusion.
formulas:
  - label: "Image diffusion"
    code: "noise → denoise × N → image"
  - label: "Code diffusion"
    code: "chaos → reduce_entropy × N → product"

# aria-label for the steps row.
stepsAria: "Convergence steps"

# Convergence steps shown as pill chips.
steps:
  - "Step 0: Pure noise"
  - "Step 1: Init"
  - "Step 2: Implement"
  - "Step N: DoU < threshold = DoD"

# Long note below the steps row.
note: "There is no fixed loop count. The loop runs until P0=P1=P2=0 and the circle is full. Early loops make structural corrections; late loops make smaller refinements."

# Link target for the framework playground card CTA.
frameworkHref: "/en/framework/"

# Portal-card block beneath the diffusion visual.
portal:
  kicker: "Interactive Playground"
  title: "Open the convergence board as its own surface"
  body: "The board is no longer squeezed into the landing page. The full-viewport playground is now the teaching surface: manual phases, command prompt, and board-first motion."
  cta: "Enter framework playground"
  note: "Board-first. Manual. Command-shaped. Built for the 1.3.0 direction."
---
