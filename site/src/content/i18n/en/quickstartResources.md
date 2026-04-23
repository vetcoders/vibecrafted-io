---
# Quickstart resources — two cards plus next-step path and canonical sources block.
# Rendered by: site/src/components/sections/QuickstartResourcesSection.astro
#
# cards[].items: each card's items[0] is rendered as the card body (HTML),
#                items[1..] are rendered as a bullet list inside the reveal panel.
# Inline <code>...</code> is allowed in items.

# "See more" reveal label inside each ProductDetailCard.
reveal: "See more"

# "Next step" surface-path block under the cards.
nextStep:
  label: "Next step"
  lead: "Once quickstart makes sense, move into the explanatory layer."
  faq: "FAQ"
  foundation: "Foundation"
  overview: "Overview"

# Eyebrow for the canonical-sources <details> at the bottom.
sourceLabel: "Canonical sources"

cards:
  - kicker: "What you need"
    title: "Minimal prerequisites"
    items:
      - "macOS or Linux"
      - "Git, Python 3.10+, and <code>make</code>"
      - "One or more agent CLIs: Codex, Claude, or Gemini"
      - "Optional but high-value foundations: loctree, aicx, prview, ScreenScribe"

  - kicker: "What you get"
    title: "Operational surfaces after install"
    items:
      - "A central skill store under <code>$VIBECRAFTED_ROOT/.vibecrafted/skills/</code>"
      - "Artifacts grouped by repo and date under <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>"
      - "Shell helpers for spawning, observing, marbles, DoU, hydrate, and release"
      - "A staging-friendly control plane under <code>$VIBECRAFTED_ROOT/.vibecrafted/tools/</code>"

# Bottom canonical-sources link list.
links:
  - href: "/en/faq/"
    label: "Answered FAQ"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/FOUNDATION.md"
    label: "Foundation Stack"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/QUICK_START.md"
    label: "Markdown Version"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTRACT.md"
    label: "Runtime Contract"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md"
    label: "ScreenScribe Review Gate"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md"
    label: "Content Truth Matrix"
---
