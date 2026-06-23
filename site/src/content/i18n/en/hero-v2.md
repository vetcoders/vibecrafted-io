---
# Hero V2 — primary landing banner.
#
# Source of truth (until 2026-05-14): site/src/lib/i18n/en.ts → landingV2.hero
# Rendered by: site/src/components/sections/HeroSectionV2.svelte
#
# Phase A migration: markdown exists parallel to en.ts.
# Phase B (TBD by parent): component switched to getEntry('i18n', 'en/hero-v2').

ariaLabel: "Hero"

# Eyebrow above H1 — caps, mono, brand term. "Release engine" is treated as
# the product noun for the framework category. Pinned across EN surface
# (SchemaOrg, OG cards, meta description, docs, newsletter, smoke check).
# PL hero uses a different axis ("Rygor procesu / Repo po agentach → produkt")
# per Mikserka decision — that is language-specific, not a global rebrand.
eyebrow: "RELEASE ENGINE"

# Heading split — the component assembles the pieces into 3 lines:
#   <line 1>  "{pre}"
#   <line 2>  "{prefix} *{emFirst}*"  (emFirst = gold primary accent + roman)
#   <line 3>  "{mid} *{emLast}*"      (emLast = italic secondary accent)
heading:
  pre: "Every write earns a read"
  prefix: ""
  emFirst: "AI-built"
  mid: "software people can"
  emLast: "trust."

# Lead body — first paragraph under the hero. Opens with "The vibe hangover
# is what comes after the demo:" (smoke check pins this phrase as the EN
# anchor before the page introduces more vocabulary). Inline <em> marks
# anchor phrases for the gold accent.
body: "The vibe hangover is what comes after the demo: fragile auth, no install path, <em>scary deploys</em>. A <em>read/write cadence</em> of phase rigor changes how AI software is generated — and carries the repo to a release a stranger can install, trust, and use."

# CTA pair — primary solid INSTALL, ghost READ THE DOCS.
# Hrefs are computed in the component via lang ('/en/install/', '/en/quickstart/').
ctaPrimary: "INSTALL"
ctaSecondary: "READ THE DOCS"

# Telemetry strip — under the hero, three labels next to marble count /
# converge% / live indicator (numeric values come from MarbleCanvasV2).
telemetry:
  marbles: "CHECKS"
  converge: "READY"
  live: "LIVE"

# Scroll hint label — bottom-right, "SCROLL ↓".
scroll: "SCROLL"
---
