---
# Quickstart steps — six numbered installation/usage steps.
# Rendered by: site/src/components/sections/QuickstartStepsSection.astro
#
# Each step has:
#   kicker  — small label like "Step 1"
#   title   — short heading
#   body    — HTML body paragraph (set:html — <code> allowed)
#   command — single shell command (string), OR
#   commands — list of shell commands (array of strings)
#   note    — optional HTML note (set:html — <code>, &gt; entities allowed)
#
# Multi-line commands use the YAML literal block scalar "|" so newlines stay intact.

steps:
  - kicker: "Step 1"
    title: "Install the framework"
    body: "Use the public bootstrap path. It stages a local snapshot under <code>$VIBECRAFTED_ROOT/.vibecrafted/tools/</code> and keeps the same install truth as automation. If you want the browser-guided installer, use <code>make vibecrafted</code> in the repo."
    command: "curl -fsSL https://vibecrafted.io/install.sh | bash"
    note: "Use the direct <code>| bash</code> path only when you already want compact automation instead of the guided kickoff."

  - kicker: "Step 2"
    title: "Run the doctor"
    body: "Check the staged control plane, shell helpers, and optional foundations before you blame the workflow."
    command: "vibecrafted doctor"
    note: "If something is yellow, the doctor tells you what is missing instead of leaving you to guess."

  - kicker: "Step 3"
    title: "Bootstrap context inside a real repo"
    body: "Move into the project you actually care about, then give the agent the prompt that forces context gathering before edits."
    command: |
      cd $VIBECRAFTED_ROOT/your-project
      vibecrafted init claude
    note: "<code>vibecrafted init</code> is the main front door. It reads history, maps structure, and runs quality gates before implementation starts."

  - kicker: "Step 4"
    title: "Hand over a real task"
    body: "Once the context is anchored, run the full delivery path or a narrower workflow depending on how much control you want."
    commands:
      - 'vibecrafted justdo codex --prompt "Add user authentication with JWT"'
      - 'vibecrafted workflow claude --prompt "Plan and implement auth module"'
    note: "Use <code>vibecrafted justdo</code> for end-to-end ownership. Use <code>vibecrafted workflow</code> when you want explicit Examine -&gt; Research -&gt; Implement structure."

  - kicker: "Step 5"
    title: "Spawn the fleet when one model is not enough"
    body: "External agent helpers are there for parallel fieldwork and durable artifacts, not for theatre."
    command: |
      vibecrafted codex implement .vibecrafted/plans/my-plan.md
      vibecrafted claude research .vibecrafted/plans/my-plan.md
      vibecrafted gemini implement .vibecrafted/plans/my-plan.md
    note: "These are the friendly launcher surfaces. The portable spawn-script contract lives in the Runtime Contract."

  - kicker: "Step 6"
    title: "Close the loop before you call it done"
    body: "Shipping in 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. means code quality, product-surface truth, and packaging truth."
    command: |
      vibecrafted dou claude --prompt "Audit launch readiness"
      vibecrafted decorate codex --prompt "Polish the release surface"
      vibecrafted hydrate codex --prompt "Package the product"
      vibecrafted release codex --prompt "Prepare release steps"
    note: "The framework is complete when a stranger can discover, understand, install, and trust the thing, not when your tests stop yelling."
---
