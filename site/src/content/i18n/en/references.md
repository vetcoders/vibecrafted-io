---
# References — bibliography & influences (last section before footer).
# Rendered by: site/src/components/sections/ReferencesSection.astro
# (server-side wrapper) → ReferencesSectionClient.svelte (interactive client).
#
# `citationHtml` and link labels keep limited inline HTML (<em>, <code>,
# named entities like &ouml;) because they are bibliographic typography.
# We pass them through @html in the Svelte template, same as before.

# Section eyebrow.
label: "References"

# H2.
title: "Ground Truth & Influences"

# Lead paragraph below the title.
sub: "The bibliography below extends the manifesto list with the structural-modeling and convergence influences surfaced again in internal AICX grounding work."

# Modal that prompts the user before opening external links.
modal:
  eyebrow: "Reference source"
  title: "The page would be opened in the new tab."
  sourceLabel: "Source"
  backLabel: "<<< Back"
  openLabel: "Open >>>"
  backHover: "Back to portal"
  openHover: "Go to page"

# Bibliography entries. Each item:
#   - citationHtml: full citation; HTML allowed (<em>, &ouml;, etc.) — rendered via @html.
#   - note:         plain prose explaining why this reference matters.
#   - links[]:      one button per link; opens through the confirmation modal.
items:
  - citationHtml: "Morris, K.; B&ouml;ckeler, B. (2026). <em>Humans and Agents in Software Engineering Loops</em>; <em>Harness Engineering</em>; <em>Context Engineering for Coding Agents</em>. Thoughtworks / Martin Fowler."
    note: "The why-loop / how-loop framing, harness design, and human-guided workflow discipline behind SHACE and the operator role."
    links:
      - href: "https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html"
        label: "Humans & Agents"
      - href: "https://martinfowler.com/articles/harness-engineering.html"
        label: "Harness Engineering"
      - href: "https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html"
        label: "Context Engineering"
  - citationHtml: "Gong, L.; Elhoushi, M.; Cheung, A. (2024). <em>AST-T5: Structure-Aware Pretraining for Code Generation</em>."
    note: "The structure-aware pretraining thread behind 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.'s insistence that models should not write into a repo blind."
    links:
      - href: "https://arxiv.org/abs/2401.03003"
        label: "arXiv"
  - citationHtml: "Guo, D. et al. (2021). <em>GraphCodeBERT: Pre-training Code Representations with Data Flow</em>."
    note: "A complementary structure-aware result that reinforced the case for externalized code shape, even though GraphCodeBERT models data flow rather than AST."
    links:
      - href: "https://arxiv.org/abs/2009.08366"
        label: "arXiv"
  - citationHtml: "Cunningham, W. (1992) and later technical debt literature."
    note: "The conceptual ancestor of DoU: working code is not the same thing as a healthy, trustworthy, shippable system."
    links:
      - href: "https://martinfowler.com/bliki/TechnicalDebt.html"
        label: "Technical Debt"
  - citationHtml: "CEGIS / counterexample-guided synthesis and later counterexample-guided optimization literature."
    note: "The convergence lineage behind Marbles: loop, inspect failure, add counterexamples, reduce the plausible program space, repeat until the surface stops lying."
    links:
      - href: "https://www.cprover.org/synthesis"
        label: "Counterexample-guided synthesis overview"
  - citationHtml: "VetCoders (2026). <em>The 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Manifesto</em>."
    note: "Primary source for SHACE, Marbles, Loctree Mapping, PSCD, and the founder-grade Definition of Undone as original 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. concepts."
    links:
      - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/MANIFESTO_EN.md"
        label: "Read the manifesto"
---
