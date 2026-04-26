---
# Pipeline — the method overview (Craft → Converge → Ship).
# Rendered by: site/src/components/sections/PipelineSection.astro
#
# NOTE: The mermaid diagrams themselves are NOT in this file. They live in
# site/src/lib/diagrams/pipeline.ts (mermaidEn / mermaidPl / mermaidFullEn /
# mermaidFullPl). YAML escaping would mangle the embedded JSON theme blocks
# and the diagrams are architecture, not redaction copy.

# Section eyebrow (small label above the heading).
label: "The Method"

# H2 of the section.
title: "Craft → Converge → Ship"

# Lead paragraph below the title.
sub: "A founder-grade operating model for shaping, denoising, and finally releasing software with AI agents."

# UI labels for the "expand full diagram" modal handled by MermaidViewer.
mermaidModal:
  open: "Expand full pipeline"
  close: "Close pipeline diagram"
  title: "Full pipeline — Craft → Converge → Ship"

# Three stage cards rendered as a grid below the diagram.
notes:
  - title: "Craft"
    body: "Scaffold the architecture, init the context, and run the ERi workflow. Force agents to respect the AST and history."
  - title: "Converge"
    body: "Systematically reduce entropy through Marbles loops until all P0, P1, and P2 issues are resolved."
  - title: "Ship"
    body: "Audit the product surface with DoU, polish with Decorate, and package with Hydrate before final Release."
---
