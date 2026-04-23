---
# Evidence — "this is not magic" deck of three operating principles.
# Rendered by: site/src/components/sections/EvidenceSection.astro
#   + site/src/components/sections/EvidenceDeck.svelte (data prop from parent)

# Section heading. Contains literal HTML: <br /> for line break and &apos; for
# the apostrophe. Rendered through <Fragment set:html>. Not an <Accent> pattern.
titleHtml: "This is not magic.<br />It&apos;s rigorous engineering."

# Lead paragraph below the heading.
lead: "The vocabulary is vivid because it was forged under midnight pressure. Beneath the vibe sits a rigorous operating model for context, variance reduction, and release truth."

# UI labels surfaced inside the deck cards and the modal dialog.
revealLabel: "Open field note"
closeLabel: "Close note"
detailsLabel: "Operational consequence"

# Evidence deck items. accent = steel | copper | patina (drives card color).
# details = bullet list shown on the card back and in the modal dialog.
items:
  - number: "01"
    accent: "steel"
    title: "AST-Augmented Context"
    body: "LLMs hallucinate when they code blind. By externalizing architectural memory into AST-augmented mappings, 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. keeps frontier models oriented precisely inside your codebase."
    details:
      - "Loctree and adjacent structural maps turn the repo into navigable terrain before edits start."
      - "The agent works against named files, blast radius, and symbol topology instead of drifting through grep haze."
      - "That lowers false confidence: if the structure disagrees with the prompt, structure wins."
  - number: "02"
    accent: "copper"
    title: "Stochastic Convergence"
    body: "Code generation is stochastic. The Marbles loop uses priority-weighted denoising loops to relentlessly reduce variance, forcing the system into a shippable state."
    details:
      - "One run is not evidence. The loop keeps cutting the highest-risk lie until the runtime surface agrees with the promise."
      - "Early loops remove structural falsehoods; later loops compress roughness into a calmer, more repeatable product shape."
      - 'The target is not "nice output" but a state where P0/P1/P2 issues converge toward zero.'
  - number: "03"
    accent: "patina"
    title: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙"
    body: "Structured Human-AI Collaborative Engineering. We wrap deterministic human checkpoints around stochastic generation. The result is a system you control, trust, and understand."
    details:
      - "Humans do not compete with the model on typing speed; they own scope, truth checks, and irreversible decisions."
      - "Agents get room for deep fieldwork, but gates, review artifacts, and runtime proof keep the final shape accountable."
      - "That is why the product can feel vivid without becoming mystical: the craft stays inspectable."
---
