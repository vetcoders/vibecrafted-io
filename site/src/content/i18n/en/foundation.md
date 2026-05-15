---
# Foundation — runtime infrastructure cards (loctree, aicx, prview, ScreenScribe).
# Rendered by: site/src/components/sections/FoundationSection.astro

# Section eyebrow / title / subhead.
label: "Runtime Foundations"
title: "Infrastructure beneath the framework."
sub: "These are foundations, not skills: sight, memory, review artifacts, and narrated runtime evidence for the agent layer."

# "Open layer" CTA on the front of each foundation card.
reveal: "Open layer"

# learnPath = the small "Learn here first" pill above the cards. label/lead are
# the eyebrow + lead. quickstart/faq/framework are the three pill labels (the
# component prepends the locale-aware base path to the hrefs).
learnPath:
  label: "Learn here first"
  lead: "Understand the product surface first, then move toward source material."
  quickstart: "Quick Start"
  faq: "FAQ"
  framework: "Framework"

# bullets are the "operational consequence" lines shown when a card is opened.
# Keys MUST match card.name below (loctree, aicx, prview, ScreenScribe), the
# component looks them up by name string.
bullets:
  loctree:
    - "Maps the repository before anyone starts changing it."
    - "Protects against blind refactors and false confidence."
    - "Use it when structure is the risk."
  aicx:
    - "Retrieves prior decisions, intent, and context."
    - "Keeps multi-session work coherent."
    - "Most useful when the work stretches across days."
  prview:
    - "Packages review into durable findings and a readable gate."
    - "Closes the gap between terminal dump and a real artifact."
    - "Use it before merge and before release."
  ScreenScribe:
    - "Turns screen recordings into structured evidence."
    - "Looks at what the user actually saw."
    - "Best when runtime truth needs evidence."

# Foundation cards. name MUST match a key in bullets above. iconClass is the
# CSS class for the colored mono prefix in the card. body MAY contain inline
# <code>...</code> markup; ProductDetailCard renders it with set:html.
cards:
  - number: "01"
    href: "https://loct.io"
    name: "loctree"
    iconClass: "foundation-icon foundation-icon--steel"
    role: "Structure"
    body: "Structural code intelligence. Maps files, dependencies, hubs, and blast radius before an agent edits anything."
    linkLabel: "loct.io"
  - number: "02"
    href: "https://github.com/Loctree/aicx/releases"
    name: "aicx"
    iconClass: "foundation-icon foundation-icon--copper"
    role: "Memory"
    body: "Decision retrieval for the agent layer. The `aicx` CLI / `aicx-mcp` server indexes decisions, intents, and outcomes so sessions can recover what was decided and why."
    linkLabel: "github.com/Loctree/aicx/releases"
  - number: "03"
    href: "https://github.com/Loctree/prview/releases"
    name: "prview"
    iconClass: "foundation-icon foundation-icon--patina"
    role: "Review"
    body: "Structured review artifacts. Turns code changes into durable findings that other agents and humans can consume."
    linkLabel: "github.com/Loctree/prview/releases"
  - number: "04"
    href: "https://github.com/VetCoders/ScreenScribe"
    name: "ScreenScribe"
    iconClass: "foundation-icon foundation-icon--muted"
    role: "Runtime"
    body: "Narrated runtime review. Turns screen recordings with commentary into structured engineering findings about the real product surface."
    linkLabel: "github.com/VetCoders/ScreenScribe"
---
