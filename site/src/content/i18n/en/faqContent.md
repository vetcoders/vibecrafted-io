---
# FAQ content — grouped Q+A accordion + learning-path strip + canonical-sources block.
# Rendered by: site/src/components/sections/FaqContentSection.astro
#
# Each item has:
#   open        — optional bool, true means the <details> is expanded by default
#   questionHtml — HTML string for the <summary> (allows <code>...</code>)
#   answerHtml   — HTML string for the answer paragraph
# Inline <code>, &mdash;, ${...} placeholders, etc. are all preserved verbatim.

# Top "Learning path" surface-path strip.
learningPath:
  label: "Learning path"
  lead: "Product path first, source material later."
  quickstart: "Quick Start"
  foundation: "Foundation"
  overview: "Overview"

# Eyebrow for the canonical-sources <details> at the bottom.
sourceLabel: "Canonical sources"

groups:
  - title: "Installation"
    items:
      - open: true
        questionHtml: "Why does 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. install into <code>$VIBECRAFTED_ROOT/.vibecrafted/</code> instead of <code>$HOME/.agents/</code>?"
        answerHtml: "<code>$VIBECRAFTED_ROOT/.vibecrafted/</code> is the central store and control plane. Agent-specific directories are only views or symlink targets. The real source of truth, artifacts, and helper state live in one place."
      - questionHtml: "Can I install 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. without editing my shell config?"
        answerHtml: "Yes. During the interactive path you can opt out of shell-helper installation. If you still want helpers in the current session, source <code>${XDG_CONFIG_HOME:-$HOME/.config}/vetcoders/vc-skills.sh</code> manually."
      - questionHtml: "What does <code>make doctor</code> actually check?"
        answerHtml: "The doctor verifies the central store, helper availability, symlink health, required foundations (<code>loctree-mcp</code> and <code>aicx-mcp</code>), evidence tools such as prview and ScreenScribe, plus whether your shell environment is quiet enough for agent tooling."
      - questionHtml: "Which install path should I use in CI or automation?"
        answerHtml: 'Use <code>make install</code> for the direct non-interactive path, or call <code>python3 scripts/vetcoders_install.py install --source "$PWD" --non-interactive</code> when you want full CLI control.'

  - title: "Skills, Agents, Foundations"
    items:
      - open: true
        questionHtml: "What is the difference between a skill and an agent?"
        answerHtml: "An agent is the runtime, such as Codex, Claude, or Gemini. A skill is the instruction set and workflow protocol that tells that runtime how to behave for a specific engineering phase."
      - questionHtml: "Why not just use ChatGPT, Copilot, or a single giant prompt?"
        answerHtml: "Because 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. is trying to solve system-shaping, not just chat convenience. It combines structural awareness, decision retrieval, convergence loops, and shipping audits so the model sees the repo and the product surface instead of improvising blind."
      - questionHtml: "Are loctree and aicx required?"
        answerHtml: "Not honestly. <code>loctree</code> and <code>aicx</code> are required foundations: one gives the agent structural perception, the other restores prior decisions and intent. If either is missing, fix the foundation layer before trusting the workflow."
      - questionHtml: "How do I get <code>screenscribe review</code> past early model validation?"
        answerHtml: "Treat it as runtime truth, not folklore. Keep the CLI reachable on <code>PATH</code>, keep <code>~/.config/screenscribe/config.env</code> aligned with the Libraxis defaults, use <code>ai-suggestions</code> for the model aliases, set <code>SCREENSCRIBE_VISION=false</code> as operator intent, and remember that the current CLI still overrides that stored flag during <code>review</code>, so the launcher surface must inject <code>--no-vision</code> for plain review runs on the current Libraxis path. The repo-local source of truth is the ScreenScribe Review Gate doc."
      - questionHtml: "What is the Marbles loop?"
        answerHtml: "Marbles is the convergence engine. AI output is noisy, so the framework loops through implementation, followup, measurement, and fixes until the important classes of findings reach zero."

  - title: "Workflow and Operations"
    items:
      - open: true
        questionHtml: "When should I use <code>vc-justdo</code> instead of manual phases?"
        answerHtml: "Use <code>vc-justdo</code> when the task is clear and you want the agent to take ownership end-to-end. Use the phase skills separately when you want to supervise the architectural decisions more closely."
      - questionHtml: "Can I run 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. in CI/CD?"
        answerHtml: "Yes. The direct install path is non-interactive, and skills like review, followup, and release are explicitly shaped to work as repeatable quality or packaging gates."
      - questionHtml: "What lives in <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>?"
        answerHtml: "Plans, reports, transcripts, and metadata from major runs. The artifact store exists so agent work leaves durable evidence instead of disappearing into terminal scrollback."
      - questionHtml: "What is Definition of Undone?"
        answerHtml: "DoU is the audit that checks whether people can discover, understand, install, trust, and adopt the thing. It measures product-surface truth, not only repo health."

  - title: "Commercial posture"
    items:
      - open: true
        questionHtml: "Is 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. open source?"
        answerHtml: "The framework is distributed under Business Source License 1.1. The repo is visible and usable, but it is not pure permissive open source."
      - questionHtml: "Can small teams use it in production?"
        answerHtml: "Yes. The Additional Use Grant allows individual developers and teams smaller than five people to use the framework in production as long as they are not offering a competitive hosted or embedded product."
      - questionHtml: "What if I need a broader commercial arrangement?"
        answerHtml: "The license points to VetCoders for alternative licensing arrangements. Read the repo license for the exact terms and contact route before you commit to a broader rollout."

# Bottom canonical-sources link list.
links:
  - href: "/en/quickstart/"
    label: "Quick Start"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/FAQ-ANSWERED.md"
    label: "Long-form Markdown FAQ"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md"
    label: "ScreenScribe Review Gate"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md"
    label: "Content Truth Matrix"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/LICENSE"
    label: "License"
---
