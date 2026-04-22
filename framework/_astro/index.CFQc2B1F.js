const e = {
    nav: {
      about: "About",
      runtime: "Runtime",
      pipeline: "Pipeline",
      skills: "Skills",
      marbles: "Marbles",
      framework: "Framework",
      board: "BOARD",
      quickstart: "Quick Start",
      faq: "FAQ",
      dou: "DoU",
      get: "Get",
      search: "Search docs",
      searchAll: "All surfaces",
      searchClose: "Close search",
      install: "Install",
      vc: "VC",
      vcLabel: "VetCoders",
      github: "GitHub",
      license: "License (BSL 1.1)",
      security: "Security",
      skip: "Skip to content",
      switchLang: "Przełącz na polski",
      toggleShort: "PL",
      menu: "Menu",
      closeMenu: "Close menu",
      navPrimary: "Primary navigation",
      navFooter: "Footer navigation",
    },
    footer: {
      ariaLabel: "Site footer",
      brand: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
      byline: "with AI Agents by VetCoders",
      tagline: "From AI-generated repo to launch-ready product.",
      copyright: "(c)2024-2026 LibraxisAI",
      license: "BSL 1.1",
    },
    copyButton: {
      default: "Copy",
      upperDefault: "COPY",
      copied: "Copied!",
      error: "Error",
      defaultAria: "Copy to clipboard",
      copiedAria: "Copied to clipboard",
      errorAria: "Copy failed",
    },
    sections: {
      hero: {
        frameworkTitleHtml:
          'Release <span class="manifesto-title__framework-accent">engine</span> for AI-built software',
        lead: "Ship AI-built software without the vibe hangover.",
        quoteHtml:
          "Take the repo your agents already produced and turn it into something a stranger can install, trust, and use.",
        evidence: "See the Evidence",
        quickstart: "Open Quick Start",
        quickstartHref: "/en/quickstart/",
      },
      pipeline: {
        label: "The Method",
        title: "Craft → Converge → Ship",
        sub: "A founder-grade operating model for shaping, denoising, and finally releasing software with AI agents.",
        mermaid: `%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#07111f",
    "primaryColor": "#0b1526",
    "primaryTextColor": "#f3efe7",
    "primaryBorderColor": "#24324a",
    "lineColor": "#d8894b",
    "secondaryColor": "#101b2d",
    "tertiaryColor": "#0d1728",
    "clusterBkg": "#08111f",
    "clusterBorder": "#2a3a55",
    "fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif",
    "fontSize": "16px"
  },
  "flowchart": {
    "curve": "basis",
    "htmlLabels": true,
    "nodeSpacing": 34,
    "rankSpacing": 42
  }
} }%%
flowchart LR
    subgraph CRAFT["CRAFT"]
        A["Scaffold"]
        B["Init"]
        C["Workflow"]
        D["Follow-up"]
        A --> B --> C --> D
    end

    D --> M{{"Marbles Loop"}}
    M -->|reduce entropy| G["Resolve P0 / P1 / P2"]
    G --> S1

    subgraph SHIP["SHIP"]
        S1["DoU"]
        S2["Decorate"]
        S3["Hydrate"]
        S4["Release"]
        S1 --> S2 --> S3 --> S4
    end

    classDef core fill:#0d1728,stroke:#d8894b,color:#f3efe7,stroke-width:1.5px;
    classDef stage fill:#0a1322,stroke:#2b3a55,color:#f3efe7,stroke-width:1.2px;
    classDef loop fill:#1a1110,stroke:#d8894b,color:#ffd9bd,stroke-width:2px;
    class A,B,C,D,S1,S2,S3,S4 stage;
    class M,G core;
    class M loop;`,
        mermaidFull: `%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#07111f",
    "primaryColor": "#0c1626",
    "primaryTextColor": "#f3efe7",
    "primaryBorderColor": "#2d3b56",
    "lineColor": "#d8894b",
    "secondaryColor": "#101b2d",
    "tertiaryColor": "#0d1728",
    "clusterBkg": "#08111f",
    "clusterBorder": "#344562",
    "fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif",
    "fontSize": "17px"
  },
  "flowchart": {
    "curve": "basis",
    "htmlLabels": true,
    "nodeSpacing": 42,
    "rankSpacing": 56,
    "padding": 20
  }
} }%%
flowchart TB
    TITLE["Craft → Converge → Ship"]
    SUB["A founder-grade operating model for shaping, denoising, and releasing AI-built software"]

    TITLE --> SUB
    SUB --> ROW

    ROW --> CRAFT
    ROW --> CORE
    ROW --> SHIP

    subgraph CRAFT["CRAFT"]
        direction TB
        A1["Scaffold"]
        A2["Init"]
        A3["Workflow"]
        A4["Follow-up"]
        A1 --> A2 --> A3 --> A4
    end

    subgraph CORE["CONVERGE"]
        direction TB
        M{{"Marbles Loop"}}
        C1["Collapse unresolveds"]
        C2["Reduce entropy"]
        C3["Increase runtime truth"]
        M --> C1
        C1 --> C2
        C1 --> C3
    end

    subgraph SHIP["SHIP"]
        direction TB
        S1["DoU"]
        S2["Decorate"]
        S3["Hydrate"]
        S4["Release"]
        S1 --> S2 --> S3 --> S4
    end

    A4 --> M
    C3 --> S1

    T1["shape the surface"] --> A1
    T2["load context"] --> A2
    T3["execute with constraints"] --> A3
    T4["tighten the edge"] --> A4

    U1["discoverable"] --> S1
    U2["installable"] --> S2
    U3["trustable"] --> S3
    U4["shippable"] --> S4

    classDef title fill:#07111f,stroke:#07111f,color:#f3efe7,stroke-width:0px,font-size:34px,font-weight:bold;
    classDef subtitle fill:#07111f,stroke:#07111f,color:#aeb8c8,stroke-width:0px,font-size:16px;
    classDef stage fill:#0d1728,stroke:#31415d,color:#f3efe7,stroke-width:1.3px;
    classDef core fill:#1a1110,stroke:#d8894b,color:#ffd9bd,stroke-width:2.2px;
    classDef signal fill:#0b1526,stroke:#506483,color:#cfd8e8,stroke-width:1.05px;
    classDef gain fill:#102017,stroke:#7ea786,color:#edf7ef,stroke-width:1.2px;

    class TITLE title;
    class SUB subtitle;
    class A1,A2,A3,A4,S1,S2,S3,S4,C1,C2,C3 stage;
    class M core;
    class T1,T2,T3,T4 signal;
    class U1,U2,U3,U4 gain;`,
        mermaidModal: {
          open: "Expand full pipeline",
          close: "Close pipeline diagram",
          title: "Full pipeline — Craft → Converge → Ship",
        },
        highlighted: "",
        notes: [
          {
            title: "Craft",
            body: "Scaffold the architecture, init the context, and run the ERi workflow. Force agents to respect the AST and history.",
          },
          {
            title: "Converge",
            body: "Systematically reduce entropy through Marbles loops until all P0, P1, and P2 issues are resolved.",
          },
          {
            title: "Ship",
            body: "Audit the product surface with DoU, polish with Decorate, and package with Hydrate before final Release.",
          },
        ],
      },
      foundation: {
        label: "Runtime Foundations",
        title: "Infrastructure beneath the framework.",
        sub: "These are foundations, not skills: sight, memory, review artifacts, and narrated runtime evidence for the agent layer.",
        learnPath: {
          label: "Learn here first",
          lead: "Understand the product surface first, then move toward source material.",
          quickstart: "Quick Start",
          faq: "FAQ",
          framework: "Framework",
        },
        reveal: "Open layer",
        bullets: {
          loctree: [
            "Maps the repository before anyone starts changing it.",
            "Protects against blind refactors and false confidence.",
            "Use it when structure is the risk.",
          ],
          aicx: [
            "Retrieves prior decisions, intent, and context.",
            "Keeps multi-session work coherent.",
            "Most useful when the work stretches across days.",
          ],
          prview: [
            "Packages review into durable findings and a readable gate.",
            "Closes the gap between terminal dump and a real artifact.",
            "Use it before merge and before release.",
          ],
          ScreenScribe: [
            "Turns screen recordings into structured evidence.",
            "Looks at what the user actually saw.",
            "Best when runtime truth needs evidence.",
          ],
        },
        cards: [
          {
            number: "01",
            href: "https://loct.io",
            name: "loctree",
            iconClass: "foundation-icon foundation-icon--steel",
            role: "Structure",
            body: "Structural code intelligence. Maps files, dependencies, hubs, and blast radius before an agent edits anything.",
            linkLabel: "loct.io",
          },
          {
            number: "02",
            href: "https://github.com/VetCoders/ai-contexters/releases",
            name: "aicx",
            iconClass: "foundation-icon foundation-icon--copper",
            role: "Memory",
            body: "Decision retrieval for the agent layer. The `aicx` CLI / `aicx-mcp` server indexes decisions, intents, and outcomes so sessions can recover what was decided and why.",
            linkLabel: "github.com/VetCoders/ai-contexters/releases",
          },
          {
            number: "03",
            href: "https://github.com/VetCoders/prview/releases",
            name: "prview",
            iconClass: "foundation-icon foundation-icon--patina",
            role: "Review",
            body: "Structured review artifacts. Turns code changes into durable findings that other agents and humans can consume.",
            linkLabel: "github.com/VetCoders/prview/releases",
          },
          {
            number: "04",
            href: "https://github.com/VetCoders/ScreenScribe",
            name: "ScreenScribe",
            iconClass: "foundation-icon foundation-icon--muted",
            role: "Runtime",
            body: "Narrated runtime review. Turns screen recordings with commentary into structured engineering findings about the real product surface.",
            linkLabel: "github.com/VetCoders/ScreenScribe",
          },
        ],
      },
      marbles: {
        label: "Marbles",
        title: "Denoise Until the Circle Is Full",
        sub: "AI agents are stochastic parrots. Every generation introduces noise. You cannot prompt your way out of it. You iterate.",
        heading: "The Isomorphism",
        formulas: [
          { label: "Image diffusion", code: "noise → denoise × N → image" },
          {
            label: "Code diffusion",
            code: "chaos → reduce_entropy × N → product",
          },
        ],
        stepsAria: "Convergence steps",
        steps: [
          "Step 0: Pure noise",
          "Step 1: Init",
          "Step 2: Implement",
          "Step N: DoU < threshold = DoD",
        ],
        note: "There is no fixed loop count. The loop runs until P0=P1=P2=0 and the circle is full. Early loops make structural corrections; late loops make smaller refinements.",
        frameworkHref: "/en/framework/",
        portal: {
          kicker: "Interactive Playground",
          title: "Open the convergence board as its own surface",
          body: "The board is no longer squeezed into the landing page. The full-viewport playground is now the teaching surface: manual phases, command prompt, and board-first motion.",
          cta: "Enter framework playground",
          note: "Board-first. Manual. Command-shaped. Built for the 1.3.0 direction.",
        },
      },
      evidence: {
        titleHtml: "This is not magic.<br />It&apos;s rigorous engineering.",
        lead: "The vocabulary is vivid because it was forged under midnight pressure. Beneath the vibe sits a rigorous operating model for context, variance reduction, and release truth.",
        revealLabel: "Open field note",
        closeLabel: "Close note",
        detailsLabel: "Operational consequence",
        items: [
          {
            number: "01",
            accent: "steel",
            title: "AST-Augmented Context",
            body: "LLMs hallucinate when they code blind. By externalizing architectural memory into AST-augmented mappings, 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. keeps frontier models oriented precisely inside your codebase.",
            details: [
              "Loctree and adjacent structural maps turn the repo into navigable terrain before edits start.",
              "The agent works against named files, blast radius, and symbol topology instead of drifting through grep haze.",
              "That lowers false confidence: if the structure disagrees with the prompt, structure wins.",
            ],
          },
          {
            number: "02",
            accent: "copper",
            title: "Stochastic Convergence",
            body: "Code generation is stochastic. The Marbles loop uses priority-weighted denoising loops to relentlessly reduce variance, forcing the system into a shippable state.",
            details: [
              "One run is not evidence. The loop keeps cutting the highest-risk lie until the runtime surface agrees with the promise.",
              "Early loops remove structural falsehoods; later loops compress roughness into a calmer, more repeatable product shape.",
              'The target is not "nice output" but a state where P0/P1/P2 issues converge toward zero.',
            ],
          },
          {
            number: "03",
            accent: "patina",
            title: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙",
            body: "Structured Human-AI Collaborative Engineering. We wrap deterministic human checkpoints around stochastic generation. The result is a system you control, trust, and understand.",
            details: [
              "Humans do not compete with the model on typing speed; they own scope, truth checks, and irreversible decisions.",
              "Agents get room for deep fieldwork, but gates, review artifacts, and runtime proof keep the final shape accountable.",
              "That is why the product can feel vivid without becoming mystical: the craft stays inspectable.",
            ],
          },
        ],
      },
      skills: {
        label: "The Skill Suite",
        title: "16 Specialized Workflows",
        sub: "Hard-coded procedures forged in the trenches. Powered by frontier models and Rust-based structural intelligence.",
        scrollLeft: "Scroll left",
        scrollRight: "Scroll right",
        revealLabel: "Flip for context. Click for the full note.",
        openLabel: "Open skill note",
        closeLabel: "Close skill note",
        phaseLabel: "Best position in the loop",
        tagsLabel: "Operational tags",
        triggersLabel: "Typical entry prompts",
        cards: [
          {
            id: "vc-scaffold",
            phase: "Phase 1 · Craft",
            phaseClass: "build",
            cardClass: "card--accent-steel",
            descHtml:
              "Founder-first architecture planning. Maps the landscape and produces a scoped build plan for agents to execute.",
            tags: ["architecture", "scoping", "MVP"],
            triggerHtml: '"Scaffold: real-time dashboard" · "Zaplanuj to"',
          },
          {
            id: "vc-init",
            phase: "Phase 1 · Craft",
            phaseClass: "build",
            descHtml:
              "Bootstrap the agent session. Forces models to index history (AICX), read the AST (Loctree), and verify quality gates.",
            tags: ["bootstrap", "context", "ground truth"],
            triggerHtml: '"Init session" · "Zainicjuj" · "Daj kontekst"',
          },
          {
            id: "vc-workflow",
            phase: "Phase 1 · Craft",
            phaseClass: "build",
            descHtml:
              "The ERi Pipeline: Examine &rarr; Research &rarr; Implement. Structured implementation with cumulative context feeding.",
            tags: ["ERi", "loctree", "research"],
            triggerHtml: '"Workflow" · "Zbadaj i zaimplementuj" · "ERi"',
          },
          {
            id: "vc-agents",
            phase: "Frontier Fleet",
            phaseClass: "build card-phase--copper",
            cardClass: "card--accent-copper",
            descHtml:
              "Spawn external fleet (Codex, Claude, Gemini) in real terminals with isolated context and durable artifacts.",
            tags: ["frontier", "isolated", "eval"],
            triggerHtml: '"Spawn agents" · "Agent fleet" · "Odpal agentów"',
          },
          {
            id: "vc-research",
            phase: "Phase 1 · Craft",
            phaseClass: "build",
            descHtml:
              "Triple-agent triangulation. Throw all three models at the same problem and synthesize a gap-free research document.",
            tags: ["triangulation", "SoTA", "truth"],
            triggerHtml: '"Research this" · "Zbadaj to" · "Triple research"',
          },
          {
            id: "vc-partner",
            phase: "Phase 1 · Craft",
            phaseClass: "build",
            descHtml:
              "Executive pairing. Shared brain mode for strategic debugging and architectural triage with delegated fieldwork.",
            tags: ["partner", "strategy", "ownership"],
            triggerHtml: '"Partner mode" · "Idziemy razem" · "You drive"',
          },
          {
            id: "vc-justdo",
            phase: "E2E Delivery",
            phaseClass: "build card-phase--light",
            cardClass: "card--accent-steel",
            descHtml:
              "Autonomous delivery. Takes a mandate, decides, implements, verifies, and packages without ceremony.",
            tags: ["autonomous", "delivery", "wow effect"],
            triggerHtml: '"Just do it" · "Zrób to" · "Dowieź to"',
          },
          {
            id: "vc-followup",
            phase: "Phase 1 · Craft",
            phaseClass: "build",
            descHtml:
              "The reality check. Post-implementation audit that gives a brutal GO / NO-GO verdict based on quality gates.",
            tags: ["audit", "severity", "readiness"],
            triggerHtml: '"Follow-up check" · "Czy są jeszcze luki?"',
          },
          {
            id: "vc-marbles",
            phase: "Phase 2 · Converge",
            phaseClass: "loop-phase",
            cardClass: "card--accent-copper",
            descHtml:
              "Iterative convergence. Loop until entropy is crushed (P0=0, P1=0, P2=0). Adaptive denoising for code.",
            tags: ["diffusion", "convergence", "entropy"],
            triggerHtml: '"Marbles" · "Kulki" · "Loop until done"',
          },
          {
            id: "vc-review",
            phase: "Phase 1 · Craft",
            phaseClass: "build",
            descHtml:
              "PR review pipeline. Generates prview artifacts and squeezes maximum findings with line-level evidence.",
            tags: ["review", "prview", "findings"],
            triggerHtml: '"Review PR" · "Daj findings" · "Run prview"',
          },
          {
            id: "vc-prune",
            phase: "Phase 1 · Craft",
            phaseClass: "build",
            descHtml:
              "Ruthless cleanup. Defines the runtime cone and cuts dead weight, experiments, and scar tissue without mercy.",
            tags: ["prune", "clean", "runtime cone"],
            triggerHtml: '"Prune repo" · "Strip dead code" · "Wyczyść repo"',
          },
          {
            id: "vc-delegate",
            phase: "Fallback",
            phaseClass: "build card-phase--muted",
            descHtml:
              "Safe native delegation using Claude's Task tool. In-session parallelization for small, bounded tasks.",
            tags: ["native", "Task tool", "sandboxed"],
            triggerHtml: '"Delegate safely" · "Native agents"',
          },
          {
            id: "vc-dou",
            phase: "Phase 3 · Ship",
            phaseClass: "ship",
            descHtml:
              "Definition of Undone. Audits product surface, install paths, and SEO. Measures the gap to launch.",
            tags: ["DoU", "Plague Score", "funnel"],
            triggerHtml: '"DoU audit" · "Are we shippable?"',
          },
          {
            id: "vc-decorate",
            phase: "Phase 3 · Ship",
            phaseClass: "ship",
            cardClass: "card--accent-steel",
            descHtml:
              "Visual coherence. Detects brand tokens and upgrades weak patterns into a premium interaction language.",
            tags: ["smaczki", "polish", "intentional"],
            triggerHtml: '"Decorate" · "Udekoruj" · "Make it look good"',
          },
          {
            id: "vc-hydrate",
            phase: "Phase 3 · Ship",
            phaseClass: "ship",
            descHtml:
              "Market packaging. Executes the non-code work: marketplace listings, SEO fixes, and onboarding flows.",
            tags: ["package", "SEO", "onboarding"],
            triggerHtml: '"Hydrate" · "Make it shippable" · "Nawodnij"',
          },
          {
            id: "vc-release",
            phase: "Final Step",
            phaseClass: "ship card-phase--patina",
            cardClass: "card--accent-patina",
            descHtml:
              "Final milestone. Tags, changelogs, registry publishing, and go-to-market mechanics. Ship it to people.",
            tags: ["ship", "publish", "market"],
            triggerHtml: '"Release" · "Ship to market" · "Wypuść wersję"',
          },
        ],
      },
      dou: {
        label: "DoU",
        title: "The Definition of Undone",
        quote:
          "AI agents have solved the hardest part of software creation: making the thing work. They have not yet solved the second hardest part: making the thing reachable.",
        lead: "The gap is rarely code quality. It is the brutal space between a working system and a product that strangers can discover, install, trust, and buy.",
        diagnosticLabel: "The Founder's Diagnostic:",
        checklist: [
          { kind: "check", text: "Tests pass" },
          { kind: "check", text: "Architecture is sound" },
          { kind: "check", text: "README exists" },
          { kind: "cross", text: "Nobody can find it from Google" },
          { kind: "cross", text: "Nobody can install it without a toolchain" },
          { kind: "cross", text: "Nobody can pay for it" },
        ],
        summary:
          "Items 4–6 are the Definition of Undone. Phase 3 forces the system into the market.",
        caption: "Convergence Trajectory — loop until the circle is full",
        bars: ["Loop 1", "Loop 2", "Loop 3", "Loop 4", "Loop 5"],
        scoreline: "Score: 15 → 40 → 65 → 85 → 100",
      },
      get: {
        label: "Get 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
        title: "Install the release engine. Start the loop.",
        sub: "Bootstrap the control plane with the public install path, verify your local surface, and enter the first shippable workflow through the command deck.",
        cards: [
          {
            step: "01",
            title: "Bootstrap the control plane",
            body: "Stage the framework locally with the public bootstrap path. If you want the browser-guided installer, use <code>make vibecrafted</code> from the repo.",
            command: "curl -fsSL https://vibecrafted.io/install.sh | bash",
          },
          {
            step: "02",
            title: "Enter through the command deck",
            body: "The main front door is now <code>vibecrafted</code>. Daily skill surfaces are exposed as direct <code>vc-*</code> commands.",
            command: "vibecrafted help && vibecrafted init claude",
          },
          {
            step: "03",
            title: "Drive the real work",
            body: "Examine the codebase, research ground truth, and delegate implementation to parallel agents &mdash; all in one pipeline.",
            command:
              'vibecrafted workflow claude --prompt "Plan and implement auth module"',
          },
          {
            step: "04",
            title: "Converge until it stops lying",
            body: "The marbles loop finds what is still wrong and eliminates it. Each pass sharpens the surface.",
            command: "vibecrafted marbles codex --count 3 --depth 3",
          },
        ],
        installWizardHref: "/en/install/",
        installWizardLabel: "Open Guided Installer",
        links: [
          { href: "/en/quickstart/", label: "Quick Start" },
          { href: "/en/faq/", label: "FAQ" },
          { href: "https://github.com/VetCoders/vibecrafted", label: "GitHub" },
        ],
      },
      quickstartHero: {
        label: "Quick Start",
        title: "From zero to your first 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. loop.",
        lead: "Install the framework, verify the control plane, then run a real workflow inside a live repository. The goal is first signal fast, not endless setup.",
        quote: "From AI-generated repo to launch-ready product.",
        primaryHref: "/en/",
        primaryLabel: "Back to Overview",
        secondaryHref: "/en/framework/",
        secondaryLabel: "Open Framework",
      },
      quickstartResources: {
        reveal: "See more",
        nextStep: {
          label: "Next step",
          lead: "Once quickstart makes sense, move into the explanatory layer.",
          faq: "FAQ",
          foundation: "Foundation",
          overview: "Overview",
        },
        sourceLabel: "Canonical sources",
        cards: [
          {
            kicker: "What you need",
            title: "Minimal prerequisites",
            items: [
              "macOS or Linux",
              "Git, Python 3.10+, and <code>make</code>",
              "One or more agent CLIs: Codex, Claude, or Gemini",
              "Optional but high-value foundations: loctree, aicx, prview, ScreenScribe",
            ],
          },
          {
            kicker: "What you get",
            title: "Operational surfaces after install",
            items: [
              "A central skill store under <code>$VIBECRAFTED_ROOT/.vibecrafted/skills/</code>",
              "Artifacts grouped by repo and date under <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>",
              "Shell helpers for spawning, observing, marbles, DoU, hydrate, and release",
              "A staging-friendly control plane under <code>$VIBECRAFTED_ROOT/.vibecrafted/tools/</code>",
            ],
          },
        ],
        links: [
          { href: "/en/faq/", label: "Answered FAQ" },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/FOUNDATION.md",
            label: "Foundation Stack",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/QUICK_START.md",
            label: "Markdown Version",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTRACT.md",
            label: "Runtime Contract",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md",
            label: "ScreenScribe Review Gate",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md",
            label: "Content Truth Matrix",
          },
        ],
      },
      quickstartSteps: {
        steps: [
          {
            kicker: "Step 1",
            title: "Install the framework",
            body: "Use the public bootstrap path. It stages a local snapshot under <code>$VIBECRAFTED_ROOT/.vibecrafted/tools/</code> and keeps the same install truth as automation. If you want the browser-guided installer, use <code>make vibecrafted</code> in the repo.",
            command: "curl -fsSL https://vibecrafted.io/install.sh | bash",
            note: "Use the direct <code>| bash</code> path only when you already want compact automation instead of the guided kickoff.",
          },
          {
            kicker: "Step 2",
            title: "Run the doctor",
            body: "Check the staged control plane, shell helpers, and optional foundations before you blame the workflow.",
            command: "vibecrafted doctor",
            note: "If something is yellow, the doctor tells you what is missing instead of leaving you to guess.",
          },
          {
            kicker: "Step 3",
            title: "Bootstrap context inside a real repo",
            body: "Move into the project you actually care about, then give the agent the prompt that forces context gathering before edits.",
            command: `cd $VIBECRAFTED_ROOT/your-project
vibecrafted init claude`,
            note: "<code>vibecrafted init</code> is the main front door. It reads history, maps structure, and runs quality gates before implementation starts.",
          },
          {
            kicker: "Step 4",
            title: "Hand over a real task",
            body: "Once the context is anchored, run the full delivery path or a narrower workflow depending on how much control you want.",
            commands: [
              'vibecrafted justdo codex --prompt "Add user authentication with JWT"',
              'vibecrafted workflow claude --prompt "Plan and implement auth module"',
            ],
            note: "Use <code>vibecrafted justdo</code> for end-to-end ownership. Use <code>vibecrafted workflow</code> when you want explicit Examine -&gt; Research -&gt; Implement structure.",
          },
          {
            kicker: "Step 5",
            title: "Spawn the fleet when one model is not enough",
            body: "External agent helpers are there for parallel fieldwork and durable artifacts, not for theatre.",
            command: `vibecrafted codex implement .vibecrafted/plans/my-plan.md
vibecrafted claude research .vibecrafted/plans/my-plan.md
vibecrafted gemini implement .vibecrafted/plans/my-plan.md`,
            note: "These are the friendly launcher surfaces. The portable spawn-script contract lives in the Runtime Contract.",
          },
          {
            kicker: "Step 6",
            title: "Close the loop before you call it done",
            body: "Shipping in 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. means code quality, product-surface truth, and packaging truth.",
            command: `vibecrafted dou claude --prompt "Audit launch readiness"
vibecrafted decorate codex --prompt "Polish the release surface"
vibecrafted hydrate codex --prompt "Package the product"
vibecrafted release codex --prompt "Prepare release steps"`,
            note: "The framework is complete when a stranger can discover, understand, install, and trust the thing, not when your tests stop yelling.",
          },
        ],
      },
      faqHero: {
        label: "Answered FAQ",
        title: "The questions strangers ask first.",
        lead: "This page exists so the framework can explain itself without forcing people to reverse-engineer the repo, the shell helpers, or the license before they know whether the system fits.",
        quote:
          "The installer, docs, and command deck should all promise the same thing.",
        primaryHref: "/en/quickstart/",
        primaryLabel: "Read Quick Start",
        secondaryHref: "/en/",
        secondaryLabel: "Back to Overview",
      },
      faqContent: {
        learningPath: {
          label: "Learning path",
          lead: "Product path first, source material later.",
          quickstart: "Quick Start",
          foundation: "Foundation",
          overview: "Overview",
        },
        sourceLabel: "Canonical sources",
        groups: [
          {
            title: "Installation",
            items: [
              {
                open: !0,
                questionHtml:
                  "Why does 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. install into <code>$VIBECRAFTED_ROOT/.vibecrafted/</code> instead of <code>$HOME/.agents/</code>?",
                answerHtml:
                  "<code>$VIBECRAFTED_ROOT/.vibecrafted/</code> is the central store and control plane. Agent-specific directories are only views or symlink targets. The real source of truth, artifacts, and helper state live in one place.",
              },
              {
                questionHtml:
                  "Can I install 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. without editing my shell config?",
                answerHtml:
                  "Yes. During the interactive path you can opt out of shell-helper installation. If you still want helpers in the current session, source <code>${XDG_CONFIG_HOME:-$HOME/.config}/vetcoders/vc-skills.sh</code> manually.",
              },
              {
                questionHtml:
                  "What does <code>make doctor</code> actually check?",
                answerHtml:
                  "The doctor verifies the central store, helper availability, symlink health, optional foundations such as loctree, aicx, prview, and ScreenScribe, plus whether your shell environment is quiet enough for agent tooling.",
              },
              {
                questionHtml:
                  "Which install path should I use in CI or automation?",
                answerHtml:
                  'Use <code>make install</code> for the direct non-interactive path, or call <code>python3 scripts/vetcoders_install.py install --source "$PWD" --non-interactive</code> when you want full CLI control.',
              },
            ],
          },
          {
            title: "Skills, Agents, Foundations",
            items: [
              {
                open: !0,
                questionHtml:
                  "What is the difference between a skill and an agent?",
                answerHtml:
                  "An agent is the runtime, such as Codex, Claude, or Gemini. A skill is the instruction set and workflow protocol that tells that runtime how to behave for a specific engineering phase.",
              },
              {
                questionHtml:
                  "Why not just use ChatGPT, Copilot, or a single giant prompt?",
                answerHtml:
                  "Because 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. is trying to solve system-shaping, not just chat convenience. It combines structural awareness, decision retrieval, convergence loops, and shipping audits so the model sees the repo and the product surface instead of improvising blind.",
              },
              {
                questionHtml: "Can I use 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. without loctree or aicx?",
                answerHtml:
                  "Technically yes, but you lose structural perception and session continuity. The framework still runs, but the agent is operating with much weaker context.",
              },
              {
                questionHtml:
                  "How do I get <code>screenscribe review</code> past early model validation?",
                answerHtml:
                  "Treat it as runtime truth, not folklore. Keep the CLI reachable on <code>PATH</code>, keep <code>~/.config/screenscribe/config.env</code> aligned with the Libraxis defaults, use <code>ai-suggestions</code> for the model aliases, set <code>SCREENSCRIBE_VISION=false</code> as operator intent, and remember that the current CLI still overrides that stored flag during <code>review</code>, so the launcher surface must inject <code>--no-vision</code> for plain review runs on the current Libraxis path. The repo-local source of truth is the ScreenScribe Review Gate doc.",
              },
              {
                questionHtml: "What is the Marbles loop?",
                answerHtml:
                  "Marbles is the convergence engine. AI output is noisy, so the framework loops through implementation, followup, measurement, and fixes until the important classes of findings reach zero.",
              },
            ],
          },
          {
            title: "Workflow and Operations",
            items: [
              {
                open: !0,
                questionHtml:
                  "When should I use <code>vc-justdo</code> instead of manual phases?",
                answerHtml:
                  "Use <code>vc-justdo</code> when the task is clear and you want the agent to take ownership end-to-end. Use the phase skills separately when you want to supervise the architectural decisions more closely.",
              },
              {
                questionHtml: "Can I run 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. in CI/CD?",
                answerHtml:
                  "Yes. The direct install path is non-interactive, and skills like review, followup, and release are explicitly shaped to work as repeatable quality or packaging gates.",
              },
              {
                questionHtml:
                  "What lives in <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>?",
                answerHtml:
                  "Plans, reports, transcripts, and metadata from major runs. The artifact store exists so agent work leaves durable evidence instead of disappearing into terminal scrollback.",
              },
              {
                questionHtml: "What is Definition of Undone?",
                answerHtml:
                  "DoU is the audit that checks whether people can discover, understand, install, trust, and adopt the thing. It measures product-surface truth, not only repo health.",
              },
            ],
          },
          {
            title: "Commercial posture",
            items: [
              {
                open: !0,
                questionHtml: "Is 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. open source?",
                answerHtml:
                  "The framework is distributed under Business Source License 1.1. The repo is visible and usable, but it is not pure permissive open source.",
              },
              {
                questionHtml: "Can small teams use it in production?",
                answerHtml:
                  "Yes. The Additional Use Grant allows individual developers and teams smaller than five people to use the framework in production as long as they are not offering a competitive hosted or embedded product.",
              },
              {
                questionHtml:
                  "What if I need a broader commercial arrangement?",
                answerHtml:
                  "The license points to VetCoders for alternative licensing arrangements. Read the repo license for the exact terms and contact route before you commit to a broader rollout.",
              },
            ],
          },
        ],
        links: [
          { href: "/en/quickstart/", label: "Quick Start" },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/FAQ-ANSWERED.md",
            label: "Long-form Markdown FAQ",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md",
            label: "ScreenScribe Review Gate",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md",
            label: "Content Truth Matrix",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/LICENSE",
            label: "License",
          },
        ],
      },
      references: {
        label: "References",
        title: "Ground Truth & Influences",
        sub: "The bibliography below extends the manifesto list with the structural-modeling and convergence influences surfaced again in internal AICX grounding work.",
        modal: {
          eyebrow: "Reference source",
          title: "The page would be opened in the new tab.",
          sourceLabel: "Source",
          backLabel: "<<< Back",
          openLabel: "Open >>>",
          backHover: "Back to portal",
          openHover: "Go to page",
        },
        items: [
          {
            citationHtml:
              "Morris, K.; B&ouml;ckeler, B. (2026). <em>Humans and Agents in Software Engineering Loops</em>; <em>Harness Engineering</em>; <em>Context Engineering for Coding Agents</em>. Thoughtworks / Martin Fowler.",
            note: "The why-loop / how-loop framing, harness design, and human-guided workflow discipline behind SHACE and the operator role.",
            links: [
              {
                href: "https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html",
                label: "Humans & Agents",
              },
              {
                href: "https://martinfowler.com/articles/harness-engineering.html",
                label: "Harness Engineering",
              },
              {
                href: "https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html",
                label: "Context Engineering",
              },
            ],
          },
          {
            citationHtml:
              "Gong, L.; Elhoushi, M.; Cheung, A. (2024). <em>AST-T5: Structure-Aware Pretraining for Code Generation</em>.",
            note: "The structure-aware pretraining thread behind 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.'s insistence that models should not write into a repo blind.",
            links: [
              { href: "https://arxiv.org/abs/2401.03003", label: "arXiv" },
            ],
          },
          {
            citationHtml:
              "Guo, D. et al. (2021). <em>GraphCodeBERT: Pre-training Code Representations with Data Flow</em>.",
            note: "A complementary structure-aware result that reinforced the case for externalized code shape, even though GraphCodeBERT models data flow rather than AST.",
            links: [
              { href: "https://arxiv.org/abs/2009.08366", label: "arXiv" },
            ],
          },
          {
            citationHtml:
              "Cunningham, W. (1992) and later technical debt literature.",
            note: "The conceptual ancestor of DoU: working code is not the same thing as a healthy, trustworthy, shippable system.",
            links: [
              {
                href: "https://martinfowler.com/bliki/TechnicalDebt.html",
                label: "Technical Debt",
              },
            ],
          },
          {
            citationHtml:
              "CEGIS / counterexample-guided synthesis and later counterexample-guided optimization literature.",
            note: "The convergence lineage behind Marbles: loop, inspect failure, add counterexamples, reduce the plausible program space, repeat until the surface stops lying.",
            links: [
              {
                href: "https://www.cprover.org/synthesis",
                label: "Counterexample-guided synthesis overview",
              },
            ],
          },
          {
            citationHtml:
              "VetCoders (2026). <em>The 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Manifesto</em>.",
            note: "Primary source for SHACE, Marbles, Loctree Mapping, PSCD, and the founder-grade Definition of Undone as original 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. concepts.",
            links: [
              {
                href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/MANIFESTO_EN.md",
                label: "Read the manifesto",
              },
            ],
          },
        ],
      },
      wizardLayout: {
        defaultDescription:
          "Guided installer for the Vibecrafted release engine.",
        closeInstaller: "Close installer",
        closeInstallerShort: "Close",
      },
      diffusionCanvas: { boardLabel: "Board", loopPrefix: "Loop" },
      marbleCanvas: { marbles: "Marbles", converge: "Converge" },
      installer: {
        wizard: {
          terminalKicker: "Install preview",
          terminalBody:
            "The script prepares the environment, and the installation continues in the browser.",
          welcomeCta: "See how it works",
          installPasteKicker: "Step 1 · Copy",
          installPasteHint: "Paste into your terminal (macOS or Linux)",
          installRunKicker: "Step 2 · Run",
          installRunHint:
            "The installer comes up locally and hands control back to this tab — the rest happens here.",
          installPreviewKicker: "Preview",
          installPreviewBody:
            "This is what a clean install looks like in practice.",
          checkSummaryAria: "Diagnostics summary",
          doneStamp: "Status · Ready",
          steps: {
            labels: {
              steps: "Steps",
              required: "required",
              optional: "optional",
              previous: "Previous step",
              next: "Next step",
              quickStart: "Start",
              toFinish: "To finish",
              stepAria: "step",
              ofAria: "of",
            },
          },
          welcomeNotes: [
            {
              label: "Terminal launch",
              value:
                "The bootstrap command prepares the local environment and hands over to the browser.",
            },
            {
              label: "Explicit consent",
              value:
                "The installer defines the exact plan and waits for your confirmation before modifying the system.",
            },
          ],
          terminal: [
            "$ curl -fsSL https://vibecrafted.io/install.sh | bash",
            "[bootstrap] Downloading install.sh...",
            "[bootstrap] Resolving channel main...",
            "[bootstrap] Verifying integrity... SHA256 ✓  Signature ✓",
            "[bootstrap] Preparing local environment under ~/.vibecrafted/",
            "",
            "[bootstrap] Launching the installer...",
            "",
            "[installer] Welcome -> Explain -> Environment Check -> Checklist",
            "[installer] The process continues in your browser for better visibility.",
            "[installer] Starting installation...",
            "[installer] [stage] Setup foundations",
            "[installer] [stage] Installing Vibecrafted",
            "[installer] Real-time logs will appear here...",
          ],
          pages: [
            {
              label: "Welcome",
              title: "Browser-based Installer",
              body: [
                "The installation surfaces in the browser for better state visibility.",
                "The terminal handles the underlying execution while this view tracks the progress.",
              ],
              hint: "Visual state tracking.",
            },
            {
              label: "Inside",
              title: "Installation manifest",
              body: [],
              hint: "Core framework components.",
            },
            {
              label: "Check",
              title: "Environment verification",
              body: [
                "The system state is verified before execution.",
                "Missing and available dependencies are mapped explicitly.",
              ],
              hint: "No blind changes.",
            },
            {
              label: "Install",
              title: "Execute installation",
              body: [
                "The bootstrap command mounts the visual installer locally.",
                "The execution requires final confirmation before altering the system.",
              ],
              hint: "Terminal bootstraps the UI.",
            },
            {
              label: "Ready",
              title: "Framework deployed",
              body: ["The command deck is now available locally. Next steps:"],
              hint: "The substrate is ready.",
            },
          ],
          nextCommands: [
            { cmd: "vibecrafted doctor", desc: "Verify health" },
            { cmd: "vibecrafted init claude", desc: "Bootstrap session" },
            { cmd: "vibecrafted help", desc: "Command reference" },
          ],
        },
        live: {
          regionLabel: "Vibecrafted installer",
          stepsAria: "Steps",
          brandFallback: "Vibecrafted.",
          labels: {
            welcome: "Welcome",
            diagnostics: "Diagnostics",
            plan: "Plan",
            consent: "Consent",
            execute: "Install",
            ready: "Ready",
          },
          welcome: {
            title: "Review installer preflight",
            leads: [],
            cta: "Begin",
            componentsFound: "found",
            componentsTotal: "total",
            missingList: "Missing components",
            planPreview: "What happens next",
            timeEstimate: "≈ 2 minutes on a warm machine",
            sourceDir: "installer lives in",
            reRun: "Re-run diagnostics",
          },
          diagnostics: {
            title: "What we found",
            present: "Present",
            missing: "Missing",
            empty:
              "Nothing detected yet. Run the preflight again if this looks wrong.",
          },
          plan: {
            title: "What will happen",
            empty:
              "No plan produced. Check the source tree and try refreshing.",
            stepLabel: "Step",
          },
          consent: {
            title: "Confirm installation",
            body: "Accept to let the installer run. Nothing runs before you click Install.",
            accept: "I reviewed the plan and accept",
            withShell: "Integrate shell helpers (recommended)",
            cta: "Install now",
            again: "Installation already completed — you can re-run it.",
            running:
              "Installation is already running. Switch to the progress step.",
          },
          execute: {
            title: "Running",
            stage: "Current stage",
            waiting: "Waiting for the first line of output…",
          },
          ready: {
            titleOk: "Installed",
            titleFail: "Installation did not finish cleanly",
            exit: "Exit code",
            openGuide: "Open START_HERE.md",
            nextSteps: "Next steps",
            reinstall: "Re-run installation",
          },
          nav: { back: "Back", next: "Next", refresh: "Refresh preflight" },
          status: {
            loadingPreflight: "Loading preflight…",
            loadFailed: "Preflight failed",
            notConnected:
              "Local installer not reachable. Run the curl install command and keep that terminal open.",
          },
          nextCommands: [
            { cmd: "vibecrafted doctor", desc: "Verify health" },
            { cmd: "vibecrafted init claude", desc: "Bootstrap session" },
            { cmd: "vibecrafted help", desc: "Command reference" },
          ],
        },
      },
    },
  },
  t = {
    nav: {
      about: "O nas",
      runtime: "Runtime",
      pipeline: "Pipeline",
      skills: "Skille",
      marbles: "Marbles",
      framework: "Framework",
      board: "BOARD",
      quickstart: "Szybki start",
      faq: "FAQ",
      dou: "DoU",
      get: "Pobierz",
      search: "Szukaj dokumentacji",
      searchAll: "Cała powierzchnia",
      searchClose: "Zamknij wyszukiwanie",
      install: "Instaluj",
      vc: "VC",
      vcLabel: "VetCoders",
      github: "GitHub",
      license: "Licencja (BSL 1.1)",
      security: "Bezpieczeństwo",
      skip: "Przejdź do treści",
      switchLang: "Switch to English",
      toggleShort: "EN",
      menu: "Menu",
      closeMenu: "Zamknij menu",
      navPrimary: "Nawigacja główna",
      navFooter: "Nawigacja stopki",
    },
    footer: {
      ariaLabel: "Stopka strony",
      brand: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
      byline: "with AI Agents by VetCoders",
      tagline:
        "Od repo wygenerowanego przez AI do produktu gotowego do release'u.",
      copyright: "(c)2024-2026 LibraxisAI",
      license: "BSL 1.1",
    },
    copyButton: {
      default: "Kopiuj",
      upperDefault: "KOPIUJ",
      copied: "Skopiowano!",
      error: "Błąd",
      defaultAria: "Kopiuj do schowka",
      copiedAria: "Skopiowano do schowka",
      errorAria: "Kopiowanie nie powiodło się",
    },
    sections: {
      hero: {
        frameworkTitleHtml:
          'Silnik <span class="manifesto-title__framework-accent">release</span>&apos;u dla oprogramowania budowanego z AI',
        lead: "Dowieź oprogramowanie budowane z AI bez vibe hangover.",
        quoteHtml:
          "Weź repo, które agenci już wytworzyli, i doprowadź je do stanu, który obca osoba może zainstalować, zaufać mu i użyć.",
        evidence: "Dowody",
        quickstart: "Otwórz szybki start",
        quickstartHref: "/pl/quickstart/",
      },
      pipeline: {
        label: "Metoda",
        title: "Twórz → Konwerguj → Wypuść",
        sub: "Model operacyjny klasy założycielskiej do kształtowania, odszumiania i wreszcie wypuszczania oprogramowania z agentami AI.",
        mermaid: `%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#07111f",
    "primaryColor": "#0b1526",
    "primaryTextColor": "#f3efe7",
    "primaryBorderColor": "#24324a",
    "lineColor": "#d8894b",
    "secondaryColor": "#101b2d",
    "tertiaryColor": "#0d1728",
    "clusterBkg": "#08111f",
    "clusterBorder": "#2a3a55",
    "fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif",
    "fontSize": "16px"
  },
  "flowchart": {
    "curve": "basis",
    "htmlLabels": true,
    "nodeSpacing": 34,
    "rankSpacing": 42
  }
} }%%
flowchart LR
    subgraph CRAFT["TWÓRZ"]
        A["Scaffold"]
        B["Init"]
        C["Workflow"]
        D["Follow-up"]
        A --> B --> C --> D
    end

    D --> M{{"Pętla Marbles"}}
    M -->|redukcja entropii| G["Rozwiąż P0 / P1 / P2"]
    G --> S1

    subgraph SHIP["WYPUŚĆ"]
        S1["DoU"]
        S2["Decorate"]
        S3["Hydrate"]
        S4["Release"]
        S1 --> S2 --> S3 --> S4
    end

    classDef core fill:#0d1728,stroke:#d8894b,color:#f3efe7,stroke-width:1.5px;
    classDef stage fill:#0a1322,stroke:#2b3a55,color:#f3efe7,stroke-width:1.2px;
    classDef loop fill:#1a1110,stroke:#d8894b,color:#ffd9bd,stroke-width:2px;
    class A,B,C,D,S1,S2,S3,S4 stage;
    class M,G core;
    class M loop;`,
        mermaidFull: `%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#07111f",
    "primaryColor": "#0c1626",
    "primaryTextColor": "#f3efe7",
    "primaryBorderColor": "#2d3b56",
    "lineColor": "#d8894b",
    "secondaryColor": "#101b2d",
    "tertiaryColor": "#0d1728",
    "clusterBkg": "#08111f",
    "clusterBorder": "#344562",
    "fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif",
    "fontSize": "17px"
  },
  "flowchart": {
    "curve": "basis",
    "htmlLabels": true,
    "nodeSpacing": 42,
    "rankSpacing": 56,
    "padding": 20
  }
} }%%
flowchart TB
    TITLE["Twórz → Konwerguj → Wypuść"]
    SUB["Model operacyjny klasy założycielskiej do kształtowania, odszumiania i wypuszczania oprogramowania budowanego z AI"]

    TITLE --> SUB
    SUB --> ROW

    ROW --> CRAFT
    ROW --> CORE
    ROW --> SHIP

    subgraph CRAFT["TWÓRZ"]
        direction TB
        A1["Scaffold"]
        A2["Init"]
        A3["Workflow"]
        A4["Follow-up"]
        A1 --> A2 --> A3 --> A4
    end

    subgraph CORE["KONWERGUJ"]
        direction TB
        M{{"Pętla Marbles"}}
        C1["Zbij nierozwiązane"]
        C2["Zredukuj entropię"]
        C3["Podnieś prawdę runtime'u"]
        M --> C1
        C1 --> C2
        C1 --> C3
    end

    subgraph SHIP["WYPUŚĆ"]
        direction TB
        S1["DoU"]
        S2["Decorate"]
        S3["Hydrate"]
        S4["Release"]
        S1 --> S2 --> S3 --> S4
    end

    A4 --> M
    C3 --> S1

    T1["ukształtuj powierzchnię"] --> A1
    T2["załaduj kontekst"] --> A2
    T3["wykonaj w ramach ograniczeń"] --> A3
    T4["dociśnij krawędź"] --> A4

    U1["odnajdywalne"] --> S1
    U2["instalowalne"] --> S2
    U3["godne zaufania"] --> S3
    U4["wypuszczalne"] --> S4

    classDef title fill:#07111f,stroke:#07111f,color:#f3efe7,stroke-width:0px,font-size:34px,font-weight:bold;
    classDef subtitle fill:#07111f,stroke:#07111f,color:#aeb8c8,stroke-width:0px,font-size:16px;
    classDef stage fill:#0d1728,stroke:#31415d,color:#f3efe7,stroke-width:1.3px;
    classDef core fill:#1a1110,stroke:#d8894b,color:#ffd9bd,stroke-width:2.2px;
    classDef signal fill:#0b1526,stroke:#506483,color:#cfd8e8,stroke-width:1.05px;
    classDef gain fill:#102017,stroke:#7ea786,color:#edf7ef,stroke-width:1.2px;

    class TITLE title;
    class SUB subtitle;
    class A1,A2,A3,A4,S1,S2,S3,S4,C1,C2,C3 stage;
    class M core;
    class T1,T2,T3,T4 signal;
    class U1,U2,U3,U4 gain;`,
        mermaidModal: {
          open: "Rozwiń pełny pipeline",
          close: "Zamknij diagram pipeline'u",
          title: "Pełny pipeline — Twórz → Konwerguj → Wypuść",
        },
        highlighted: "",
        notes: [
          {
            title: "Twórz",
            body: "Zaplanuj architekturę, zainicjuj kontekst i uruchom workflow ERi. Zmuś agentów do respektowania AST i historii.",
          },
          {
            title: "Konwerguj",
            body: "Systematycznie redukuj entropię przez pętle Marbles, aż wszystkie problemy P0, P1 i P2 zostaną rozwiązane.",
          },
          {
            title: "Wypuść",
            body: "Zaudytuj powierzchnię produktu z DoU, wypoleruj z Decorate i zapakuj z Hydrate przed finalnym Release.",
          },
        ],
      },
      foundation: {
        label: "Fundamenty runtime",
        title: "Infrastruktura pod frameworkiem.",
        sub: "To są fundamenty, a nie skille: wzrok, pamięć, artefakty review i narracyjny dowód z runtime dla warstwy agentowej.",
        learnPath: {
          label: "Najpierw ucz się tutaj",
          lead: "Najpierw zrozum powierzchnię produktu, dopiero potem schodź do źródeł.",
          quickstart: "Szybki start",
          faq: "FAQ",
          framework: "Framework",
        },
        reveal: "Otwórz warstwę",
        bullets: {
          loctree: [
            "Mapuje repozytorium zanim ktokolwiek zacznie je zmieniać.",
            "Chroni przed ślepymi refaktorami i błędnym poczuciem pewności.",
            "Używaj go, gdy ryzykiem jest struktura.",
          ],
          aicx: [
            "Odzyskuje wcześniejsze decyzje, zamiary i kontekst.",
            "Utrzymuje ciągłość pracy między sesjami.",
            "Najbardziej przydatny przy zadaniach rozciągniętych w czasie.",
          ],
          prview: [
            "Pakietuje review w trwałe findingi i czytelny gate.",
            "Zamyka lukę między terminal dumpem a realnym artefaktem.",
            "Używaj przed merge i przed release.",
          ],
          ScreenScribe: [
            "Zamienia nagrania ekranu w ustrukturyzowane dowody.",
            "Patrzy na to, co użytkownik naprawdę zobaczył.",
            "Najlepszy, gdy trzeba zebrać dowód z runtime.",
          ],
        },
        cards: [
          {
            number: "01",
            href: "https://loct.io",
            name: "loctree",
            iconClass: "foundation-icon foundation-icon--steel",
            role: "Struktura",
            body: "Strukturalna inteligencja codebase. Mapuje pliki, zależności, huby i blast radius zanim agent dotknie jakiejkolwiek zmiany.",
            linkLabel: "loct.io",
          },
          {
            number: "02",
            href: "https://github.com/VetCoders/ai-contexters/releases",
            name: "aicx",
            iconClass: "foundation-icon foundation-icon--copper",
            role: "Pamięć",
            body: "Odzyskiwanie decyzji dla warstwy agentowej. CLI `aicx` / serwer `aicx-mcp` indeksują decyzje, intencje i wyniki, żeby sesje mogły odtworzyć co zostało ustalone i dlaczego.",
            linkLabel: "github.com/VetCoders/ai-contexters/releases",
          },
          {
            number: "03",
            href: "https://github.com/VetCoders/prview/releases",
            name: "prview",
            iconClass: "foundation-icon foundation-icon--patina",
            role: "Review",
            body: "Ustrukturyzowane artefakty review. Zamienia zmiany w kodzie w trwałe findingi, które mogą czytać kolejne agenty i ludzie.",
            linkLabel: "github.com/VetCoders/prview/releases",
          },
          {
            number: "04",
            href: "https://github.com/VetCoders/ScreenScribe",
            name: "ScreenScribe",
            iconClass: "foundation-icon foundation-icon--muted",
            role: "Runtime",
            body: "Narracyjny review runtime. Zamienia nagrania ekranu z komentarzem w ustrukturyzowane findingi o realnej powierzchni produktu.",
            linkLabel: "github.com/VetCoders/ScreenScribe",
          },
        ],
      },
      marbles: {
        label: "Marbles",
        title: "Odszumiaj aż koło się zapełni",
        sub: "Agenci AI to stochastyczne papugi. Każda generacja wprowadza szum. Nie da się tego obejść promptem. Iterujesz.",
        heading: "Izomorfizm",
        formulas: [
          { label: "Dyfuzja obrazu", code: "szum → odszumienie × N → obraz" },
          {
            label: "Dyfuzja kodu",
            code: "chaos → redukcja_entropii × N → produkt",
          },
        ],
        stepsAria: "Etapy konwergencji",
        steps: [
          "Krok 0: Czysty szum",
          "Krok 1: Init",
          "Krok 2: Implementacja",
          "Krok N: DoU < próg = DoD",
        ],
        note: "Nie ma ustalonej liczby pętli. Pętla działa aż P0=P1=P2=0 i koło się wypełni. Wczesne pętle robią korekty strukturalne, późne pętle dopracowują detale.",
        frameworkHref: "/pl/framework/",
        portal: {
          kicker: "Interaktywny playground",
          title: "Otwórz tablicę konwergencji jako osobną powierzchnię",
          body: "Tablica nie jest już wciśnięta w landing page. Pełnoekranowy playground jest teraz powierzchnią dydaktyczną: ręczne fazy, prompt poleceń i ruch board-first.",
          cta: "Wejdź do playgroundu",
          note: "Board-first. Ręczny. Kształtowany komendami. Zbudowany dla kierunku 1.3.0.",
        },
      },
      evidence: {
        titleHtml: "To nie magia.<br />To rygorystyczna inżynieria.",
        lead: "Słownictwo jest żywe, bo powstało pod nocną presją. Pod vibem kryje się rygorystyczny model operacyjny dla kontekstu, redukcji wariancji i prawdy o produkcie.",
        revealLabel: "Otwórz notatkę",
        closeLabel: "Zamknij notatkę",
        detailsLabel: "Konsekwencja operacyjna",
        items: [
          {
            number: "01",
            accent: "steel",
            title: "Kontekst wzbogacony AST",
            body: "LLM-y halucynują, gdy kodują na ślepo. Dzięki eksternalizacji pamięci architektonicznej w mapy AST, 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. utrzymuje modele dokładnie zorientowane w Twoim codebase.",
            details: [
              "Loctree i pokrewne mapy strukturalne zamieniają repo w teren nawigacyjny jeszcze zanim zacznie się edycja.",
              "Agent pracuje na nazwanych plikach, blast radiusie i topologii symboli zamiast dryfować w mgle grepów.",
              "To obniża fałszywą pewność: jeśli struktura kłóci się z promptem, wygrywa struktura.",
            ],
          },
          {
            number: "02",
            accent: "copper",
            title: "Stochastyczna konwergencja",
            body: "Generowanie kodu jest stochastyczne. Pętla Marbles wykorzystuje priorytetowane pętle odszumiania, aby nieustannie redukować wariancję, wymuszając stan gotowy do wysyłki.",
            details: [
              "Jedno odpalenie nie jest dowodem. Pętla stale tnie najbardziej ryzykowne kłamstwo, aż runtime zacznie zgadzać się z obietnicą.",
              "Wczesne pętle usuwają fałsze strukturalne; późniejsze ściskają chropowatość do spokojniejszego i bardziej powtarzalnego kształtu produktu.",
              "Celem nie jest „ładny output”, tylko stan, w którym problemy P0/P1/P2 zbiegają do zera.",
            ],
          },
          {
            number: "03",
            accent: "patina",
            title: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙",
            body: "Ustrukturyzowana Inżynieria Współpracy Człowiek-AI. Opakowujemy deterministyczne checkpointy ludzkie wokół stochastycznej generacji. Rezultat to system, który kontrolujesz, któremu ufasz i który rozumiesz.",
            details: [
              "Ludzie nie ścigają się z modelem na szybkość pisania; biorą odpowiedzialność za scope, truth checki i nieodwracalne decyzje.",
              "Agenci dostają przestrzeń do głębokiego fieldworku, ale gates, artefakty review i dowód z runtime trzymają finalny kształt w ryzach.",
              "Dlatego produkt może być żywy, ale nie mistyczny: rzemiosło pozostaje inspekowalne.",
            ],
          },
        ],
      },
      skills: {
        label: "Zestaw skilli",
        title: "16 wyspecjalizowanych workflowów",
        sub: "Zakodowane na twardo procedury wykute w okopach. Napędzane modelami frontier i inteligencją strukturalną w Rust.",
        scrollLeft: "Przewiń w lewo",
        scrollRight: "Przewiń w prawo",
        revealLabel: "Flip po kontekst. Klik po pełną notatkę.",
        openLabel: "Otwórz notatkę skilla",
        closeLabel: "Zamknij notatkę skilla",
        phaseLabel: "Najlepsze miejsce w pętli",
        tagsLabel: "Tagi operacyjne",
        triggersLabel: "Typowe prompty wejściowe",
        cards: [
          {
            id: "vc-scaffold",
            phase: "Faza 1 · Twórz",
            phaseClass: "build",
            cardClass: "card--accent-steel",
            descHtml:
              "Planowanie architektury od założyciela. Mapuje krajobraz i tworzy scoped plan budowy do realizacji przez agentów.",
            tags: ["architektura", "scoping", "MVP"],
            triggerHtml: '"Scaffold: real-time dashboard" · "Zaplanuj to"',
          },
          {
            id: "vc-init",
            phase: "Faza 1 · Twórz",
            phaseClass: "build",
            descHtml:
              "Bootstrap sesji agenta. Zmusza modele do zaindeksowania historii (AICX), odczytania AST (Loctree) i weryfikacji bramek jakości.",
            tags: ["bootstrap", "kontekst", "ground truth"],
            triggerHtml: '"Init session" · "Zainicjuj" · "Daj kontekst"',
          },
          {
            id: "vc-workflow",
            phase: "Faza 1 · Twórz",
            phaseClass: "build",
            descHtml:
              "Pipeline ERi: Zbadaj &rarr; Researchu &rarr; Zaimplementuj. Ustrukturyzowana implementacja z kumulatywnym kontekstem.",
            tags: ["ERi", "loctree", "research"],
            triggerHtml: '"Workflow" · "Zbadaj i zaimplementuj" · "ERi"',
          },
          {
            id: "vc-agents",
            phase: "Flota Frontier",
            phaseClass: "build card-phase--copper",
            cardClass: "card--accent-copper",
            descHtml:
              "Spawnuj zewnętrzną flotę (Codex, Claude, Gemini) w prawdziwych terminalach z izolowanym kontekstem i trwałymi artefaktami.",
            tags: ["frontier", "izolacja", "eval"],
            triggerHtml: '"Spawn agents" · "Agent fleet" · "Odpal agentów"',
          },
          {
            id: "vc-research",
            phase: "Faza 1 · Twórz",
            phaseClass: "build",
            descHtml:
              "Triangulacja trzech agentów. Rzuć trzy modele na ten sam problem i zsyntetyzuj dokument badawczy bez luk.",
            tags: ["triangulacja", "SoTA", "prawda"],
            triggerHtml: '"Research this" · "Zbadaj to" · "Triple research"',
          },
          {
            id: "vc-partner",
            phase: "Faza 1 · Twórz",
            phaseClass: "build",
            descHtml:
              "Parowanie executive. Tryb wspólnego mózgu do strategicznego debugowania i triażu architektonicznego z delegowanym fieldworkiem.",
            tags: ["partner", "strategia", "ownership"],
            triggerHtml: '"Partner mode" · "Idziemy razem" · "You drive"',
          },
          {
            id: "vc-justdo",
            phase: "Dostawa E2E",
            phaseClass: "build card-phase--light",
            cardClass: "card--accent-steel",
            descHtml:
              "Autonomiczna dostawa. Bierze mandat, decyduje, implementuje, weryfikuje i pakuje bez ceremonii.",
            tags: ["autonomiczny", "dostawa", "wow effect"],
            triggerHtml: '"Just do it" · "Zrób to" · "Dowieź to"',
          },
          {
            id: "vc-followup",
            phase: "Faza 1 · Twórz",
            phaseClass: "build",
            descHtml:
              "Sprawdzian rzeczywistości. Audyt po implementacji dający brutalny werdykt GO / NO-GO na podstawie bramek jakości.",
            tags: ["audyt", "severity", "gotowość"],
            triggerHtml: '"Follow-up check" · "Czy są jeszcze luki?"',
          },
          {
            id: "vc-marbles",
            phase: "Faza 2 · Konwerguj",
            phaseClass: "loop-phase",
            cardClass: "card--accent-copper",
            descHtml:
              "Iteracyjna konwergencja. Pętla aż entropia zostanie zmiażdżona (P0=0, P1=0, P2=0). Adaptacyjne odszumianie kodu.",
            tags: ["dyfuzja", "konwergencja", "entropia"],
            triggerHtml: '"Marbles" · "Kulki" · "Loop until done"',
          },
          {
            id: "vc-review",
            phase: "Faza 1 · Twórz",
            phaseClass: "build",
            descHtml:
              "Pipeline review PR. Generuje artefakty prview i wyciąga maksimum findingów z dowodami na poziomie linii.",
            tags: ["review", "prview", "findings"],
            triggerHtml: '"Review PR" · "Daj findings" · "Run prview"',
          },
          {
            id: "vc-prune",
            phase: "Faza 1 · Twórz",
            phaseClass: "build",
            descHtml:
              "Bezlitosne czyszczenie. Definiuje stożek runtime i wycina martwy kod, eksperymenty i bliznowatą tkankę bez litości.",
            tags: ["prune", "clean", "runtime cone"],
            triggerHtml: '"Prune repo" · "Strip dead code" · "Wyczyść repo"',
          },
          {
            id: "vc-delegate",
            phase: "Fallback",
            phaseClass: "build card-phase--muted",
            descHtml:
              "Bezpieczna natywna delegacja przy użyciu Task tool Claude. Równoległość w sesji dla małych, ograniczonych zadań.",
            tags: ["natywny", "Task tool", "sandboxed"],
            triggerHtml: '"Delegate safely" · "Native agents"',
          },
          {
            id: "vc-dou",
            phase: "Faza 3 · Wypuść",
            phaseClass: "ship",
            descHtml:
              "Definition of Undone. Audytuje powierzchnię produktu, ścieżki instalacji i SEO. Mierzy dystans do launchu.",
            tags: ["DoU", "Plague Score", "lejek"],
            triggerHtml: '"DoU audit" · "Czy jesteśmy gotowi?"',
          },
          {
            id: "vc-decorate",
            phase: "Faza 3 · Wypuść",
            phaseClass: "ship",
            cardClass: "card--accent-steel",
            descHtml:
              "Spójność wizualna. Wykrywa tokeny marki i podnosi słabe wzorce do premium języka interakcji.",
            tags: ["smaczki", "polish", "intentional"],
            triggerHtml: '"Decorate" · "Udekoruj" · "Make it look good"',
          },
          {
            id: "vc-hydrate",
            phase: "Faza 3 · Wypuść",
            phaseClass: "ship",
            descHtml:
              "Pakowanie rynkowe. Realizuje pracę poza kodem: listingi marketplace, poprawki SEO i ścieżki onboardingu.",
            tags: ["pakowanie", "SEO", "onboarding"],
            triggerHtml: '"Hydrate" · "Make it shippable" · "Nawodnij"',
          },
          {
            id: "vc-release",
            phase: "Krok finalny",
            phaseClass: "ship card-phase--patina",
            cardClass: "card--accent-patina",
            descHtml:
              "Finałowy kamień milowy. Tagi, changelogi, publikacja w rejestrze i mechaniki go-to-market. Wyślij to ludziom.",
            tags: ["ship", "publikacja", "rynek"],
            triggerHtml: '"Release" · "Ship to market" · "Wypuść wersję"',
          },
        ],
      },
      dou: {
        label: "DoU",
        title: "Definicja niezrobionego",
        quote:
          "Agenci AI rozwiązali najtrudniejszą część tworzenia oprogramowania: sprawienie, żeby rzecz działała. Nie rozwiązali jeszcze drugiej najtrudniejszej: sprawienie, żeby była osiągalna.",
        lead: "Problem rzadko dotyczy jakości kodu. To brutalna przestrzeń między działającym systemem a produktem, który obcy mogą odkryć, zainstalować, któremu zaufają i za który zapłacą.",
        diagnosticLabel: "Diagnostyka założyciela:",
        checklist: [
          { kind: "check", text: "Testy przechodzą" },
          { kind: "check", text: "Architektura jest solidna" },
          { kind: "check", text: "README istnieje" },
          { kind: "cross", text: "Nikt nie znajdzie tego w Google" },
          { kind: "cross", text: "Nikt nie zainstaluje bez toolchaina" },
          { kind: "cross", text: "Nikt nie może za to zapłacić" },
        ],
        summary:
          "Punkty 4–6 to Definicja Niezrobionego. Faza 3 wymusza wejście systemu na rynek.",
        caption: "Trajektoria konwergencji — pętla aż koło się zapełni",
        bars: ["Pętla 1", "Pętla 2", "Pętla 3", "Pętla 4", "Pętla 5"],
        scoreline: "Wynik: 15 → 40 → 65 → 85 → 100",
      },
      get: {
        label: "Pobierz 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
        title: "Zainstaluj silnik release'u. Uruchom pętlę.",
        sub: "Zbootstrapuj control plane przez publiczną ścieżkę instalacji, zweryfikuj lokalną powierzchnię i wejdź w pierwszy workflow prowadzący do realnego shipu.",
        cards: [
          {
            step: "01",
            title: "Zbootstrapuj control plane",
            body: "Zainstaluj framework lokalnie przez publiczną ścieżkę bootstrapu. Jeśli chcesz browser-guided installer, użyj <code>make vibecrafted</code> w repo.",
            command: "curl -fsSL https://vibecrafted.io/install.sh | bash",
          },
          {
            step: "02",
            title: "Wejdź przez command deck",
            body: "Główne drzwi wejściowe to teraz <code>vibecrafted</code>. Codzienne powierzchnie skilli są dostępne jako bezpośrednie komendy <code>vc-*</code>.",
            command: "vibecrafted help && vibecrafted init claude",
          },
          {
            step: "03",
            title: "Napędzaj prawdziwą pracę",
            body: "Zbadaj codebase, odtwórz ground truth i deleguj implementację do równoległych agentów &mdash; wszystko w jednym pipeline.",
            command:
              'vibecrafted workflow claude --prompt "Plan and implement auth module"',
          },
          {
            step: "04",
            title: "Konwerguj aż przestanie kłamać",
            body: "Pętla marbles znajduje to, co wciąż jest źle i eliminuje to. Każde przejście wyostrza powierzchnię.",
            command: "vibecrafted marbles codex --count 3 --depth 3",
          },
        ],
        installWizardHref: "/pl/install/",
        installWizardLabel: "Otwórz prowadzony instalator",
        links: [
          { href: "/pl/quickstart/", label: "Szybki start" },
          { href: "/pl/faq/", label: "FAQ" },
          { href: "https://github.com/VetCoders/vibecrafted", label: "GitHub" },
        ],
      },
      quickstartHero: {
        label: "Szybki start",
        title: "Od zera do pierwszej pętli 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
        lead: "Zainstaluj framework, sprawdź środowisko i uruchom pierwszy workflow w realnym repozytorium. Chodzi o szybki sygnał, nie o długie ustawianie środowiska.",
        quote:
          "Od repo wygenerowanego przez AI do produktu gotowego do release'u.",
        primaryHref: "/pl/",
        primaryLabel: "Wróć do przeglądu",
        secondaryHref: "/pl/framework/",
        secondaryLabel: "Otwórz framework",
      },
      quickstartResources: {
        reveal: "Zobacz więcej",
        nextStep: {
          label: "Następny krok",
          lead: "Kiedy quickstart już ma sens, skieruj się do warstwy wyjaśniającej.",
          faq: "FAQ",
          foundation: "Fundamenty",
          overview: "Przegląd",
        },
        sourceLabel: "Źródła kanoniczne",
        cards: [
          {
            kicker: "Czego potrzebujesz",
            title: "Minimalne wymagania",
            items: [
              "macOS albo Linux",
              "Git, Python 3.10+ i <code>make</code>",
              "Co najmniej jeden runtime: Codex, Claude albo Gemini",
              "Opcjonalnie, ale bardzo przydatne: loctree, aicx, prview, ScreenScribe",
            ],
          },
          {
            kicker: "Po instalacji",
            title: "Co dostajesz po instalacji",
            items: [
              "Centralny magazyn skilli w <code>$VIBECRAFTED_ROOT/.vibecrafted/skills/</code>",
              "Artefakty pogrupowane według repozytorium i daty w <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>",
              "Helpery shellowe do uruchamiania agentów, obserwacji sesji, Marbles, DoU, Hydrate i Release",
              "Lokalną kopię frameworka w <code>$VIBECRAFTED_ROOT/.vibecrafted/tools/</code>",
            ],
          },
        ],
        links: [
          { href: "/pl/faq/", label: "FAQ" },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/FOUNDATION.md",
            label: "Stack zależności",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/QUICK_START.md",
            label: "Szybki start w Markdownie",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTRACT.md",
            label: "Kontrakt runtime",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md",
            label: "Bramka review ScreenScribe",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md",
            label: "Matryca prawdy contentowej",
          },
        ],
      },
      quickstartSteps: {
        steps: [
          {
            kicker: "Krok 1",
            title: "Zainstaluj 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. lokalnie",
            body: "Użyj publicznej ścieżki bootstrapu. Tworzy kopię w <code>$VIBECRAFTED_ROOT/.vibecrafted/tools</code> i trzyma ten sam install truth co automatyzacja. Jeśli chcesz browser-guided installer, użyj <code>make vibecrafted</code> w repo.",
            command: "curl -fsSL https://vibecrafted.io/install.sh | bash",
            note: "Bezpośredniej ścieżki <code>| bash</code> używaj tylko wtedy, gdy celowo wybierasz compact automation zamiast guided kickoffu.",
          },
          {
            kicker: "Krok 2",
            title: "Sprawdź, czy wszystko jest gotowe",
            body: "Uruchom <code>doctor</code> wcześnie. Szybko pokaże, czy środowisko jest gotowe do pracy i czy czegoś jeszcze nie brakuje.",
            command: "vibecrafted doctor",
            note: "Jeśli coś świeci na żółto, doctor pokaże, czego brakuje, zamiast zostawiać Cię z domysłami.",
          },
          {
            kicker: "Krok 3",
            title: "Wejdź w realne repo",
            body: "Wejdź do repo, które naprawdę ma znaczenie, i pozwól agentowi załadować historię, strukturę i bramki jakości, zanim cokolwiek zmieni.",
            command: `cd $VIBECRAFTED_ROOT/twoj-projekt
vibecrafted init claude`,
            note: "<code>vibecrafted init</code> czyta historię, mapuje strukturę i uruchamia bramki jakości, zanim zacznie się implementacja.",
          },
          {
            kicker: "Krok 4",
            title: "Uruchom pierwsze realne zadanie",
            body: "Gdy kontekst jest już zakotwiczony, możesz uruchomić pełną ścieżkę realizacji albo bardziej kontrolowany workflow, zależnie od tego, ile kontroli chcesz zachować.",
            commands: [
              'vibecrafted justdo codex --prompt "Dodaj uwierzytelnianie użytkowników z JWT"',
              'vibecrafted workflow claude --prompt "Zaplanuj i zaimplementuj moduł auth"',
            ],
            note: "Użyj <code>vibecrafted justdo</code>, gdy chcesz oddać agentowi pełną odpowiedzialność. Użyj <code>vibecrafted workflow</code>, gdy chcesz przejść przez wyraźny układ ERI: Eksploruj &rarr; Research &rarr; Implementuj.",
          },
          {
            kicker: "Krok 5",
            title: "Uruchom flotę, gdy jeden model nie wystarcza",
            body: "Ta ścieżka służy do pracy równoległej i zostawia trwałe artefakty. Chodzi o realne porównanie wyników, nie o pokaz.",
            command: `vibecrafted codex implement .vibecrafted/plans/my-plan.md
vibecrafted claude research .vibecrafted/plans/my-plan.md
vibecrafted gemini implement .vibecrafted/plans/my-plan.md`,
            note: "To są wygodne powierzchnie launchera. Przenośny kontrakt oparty o skrypty spawn jest opisany w kontrakcie runtime.",
          },
          {
            kicker: "Krok 6",
            title: "Domknij pętlę, zanim uznasz pracę za skończoną",
            body: 'W 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. "gotowe" nie oznacza tylko działającego kodu. Oznacza też to, czy ktoś rzeczywiście może z tego skorzystać.',
            command: `vibecrafted dou claude --prompt "Audit launch readiness"
vibecrafted decorate codex --prompt "Polish the release surface"
vibecrafted hydrate codex --prompt "Package the product"
vibecrafted release codex --prompt "Prepare release steps"`,
            note: "Jeśli nie da się tego znaleźć, zrozumieć i zainstalować, to jeszcze nie jest gotowe. Nawet jeśli testy są zielone.",
          },
        ],
      },
      faqHero: {
        label: "FAQ",
        title: "Pytania, które padają na początku.",
        lead: "Tutaj wyjaśniamy, jak działa 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. — bez zmuszania Cię do przekopywania repo, konfiguracji shella czy licencji.",
        quote:
          "Installer, docs i command deck muszą obiecywać dokładnie to samo.",
        primaryHref: "/pl/quickstart/",
        primaryLabel: "Szybki start",
        secondaryHref: "/pl/",
        secondaryLabel: "Wróć do przeglądu",
      },
      faqContent: {
        learningPath: {
          label: "Ścieżka nauki",
          lead: "Najpierw ścieżka produktu, dopiero potem źródła.",
          quickstart: "Szybki start",
          foundation: "Fundamenty",
          overview: "Przegląd",
        },
        sourceLabel: "Źródła kanoniczne",
        groups: [
          {
            title: "Instalacja",
            items: [
              {
                open: !0,
                questionHtml:
                  "Dlaczego 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. instaluje się do <code>$VIBECRAFTED_ROOT/.vibecrafted/</code>, a nie do <code>$HOME/.agents/</code>?",
                answerHtml:
                  "<code>$VIBECRAFTED_ROOT/.vibecrafted/</code> to miejsce, w którym działa cały system. Katalogi agentów tylko odwołują się do tego jednego wspólnego miejsca. To właśnie tam trafiają logika, artefakty i skrypty pomocnicze.",
              },
              {
                questionHtml:
                  "Czy mogę zainstalować 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. bez edycji konfiguracji shella?",
                answerHtml:
                  "Tak. W trybie interaktywnym możesz zrezygnować z instalacji helperów. Jeśli chcesz mieć je tylko w bieżącej sesji, załaduj ręcznie skrypt pomocniczy <code>${XDG_CONFIG_HOME:-$HOME/.config}/vetcoders/vc-skills.sh</code>.",
              },
              {
                questionHtml:
                  "Co dokładnie sprawdza <code>vibecrafted doctor</code>?",
                answerHtml:
                  "Polecenie <code>doctor</code> sprawdza centralny magazyn, dostępność helperów, stan odwołań agentów, opcjonalne fundamenty, takie jak loctree, aicx, prview i ScreenScribe, oraz to, czy środowisko nie przeszkadza narzędziom agentowym w stabilnej pracy.",
              },
              {
                questionHtml:
                  "Którą ścieżkę instalacji wybrać w CI lub automatyzacji?",
                answerHtml:
                  'Użyj <code>make install</code>, jeśli chcesz prostą ścieżkę bez interakcji. Jeśli potrzebujesz pełnej kontroli z poziomu wiersza poleceń, uruchom <code>python3 scripts/vetcoders_install.py install --source "$PWD" --non-interactive</code>.',
              },
            ],
          },
          {
            title: "Skille, agenci, zależności",
            items: [
              {
                open: !0,
                questionHtml: "Jaka jest różnica między skillem a agentem?",
                answerHtml:
                  "Agent to runtime &mdash; na przykład Codex, Claude albo Gemini. Skill to zestaw instrukcji i zasad pracy, które mówią agentowi, jak ma działać na danym etapie.",
              },
              {
                questionHtml:
                  "Dlaczego nie po prostu ChatGPT, Copilot albo jeden wielki prompt?",
                answerHtml:
                  "Bo 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. nie służy tylko do rozmowy z modelem. Opiera pracę na strukturze kodu, pamięci decyzji i iteracji. Dzięki temu model widzi repo i realną powierzchnię produktu, zamiast improwizować po omacku.",
              },
              {
                questionHtml:
                  "Czy mogę używać 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. bez loctree albo aicx?",
                answerHtml:
                  "Technicznie tak, ale tracisz rozumienie struktury i ciągłość między sesjami. Framework dalej działa, tylko agent pracuje na dużo słabszym kontekście.",
              },
              {
                questionHtml:
                  "Jak przepchnąć <code>screenscribe review</code> przez wczesną walidację modeli?",
                answerHtml:
                  "Potraktuj to jak prawdę runtime, a nie rytuał. CLI musi być widoczny na <code>PATH</code>, <code>~/.config/screenscribe/config.env</code> musi być zgodne z domyślną konfiguracją Libraxis, dla aliasów modeli używaj <code>ai-suggestions</code>, ustaw <code>SCREENSCRIBE_VISION=false</code> jako intencję operatora i pamiętaj, że obecny CLI nadal nadpisuje tę flagę podczas <code>review</code>, więc launcher musi wstrzykiwać <code>--no-vision</code> dla zwykłych uruchomień review na obecnej ścieżce Libraxis. Lokalnym źródłem prawdy w repo jest dokument ScreenScribe Review Gate.",
              },
              {
                questionHtml: "Co to jest pętla Marbles?",
                answerHtml:
                  "Marbles to silnik konwergencji. Wynik AI bywa zaszumiony, więc framework zapętla implementację, sprawdzenie, pomiar i poprawki, aż najważniejsze problemy spadną do zera.",
              },
            ],
          },
          {
            title: "Praca z frameworkiem",
            items: [
              {
                open: !0,
                questionHtml:
                  "Kiedy używać <code>vc-justdo</code> zamiast ręcznych faz?",
                answerHtml:
                  "Użyj <code>vc-justdo</code>, kiedy zadanie jest jasne i chcesz, żeby agent dowiózł je od początku do końca. Ręczne fazy wybierz wtedy, gdy chcesz bliżej pilnować kierunku i decyzji architektonicznych.",
              },
              {
                questionHtml:
                  "Co znajduje się w <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>?",
                answerHtml:
                  "To tutaj trafiają plany, raporty, transkrypty i metadane z większych uruchomień. Powstało po to, żeby praca agentów zostawiała trwały ślad, a nie znikała w historii terminala.",
              },
              {
                questionHtml: "Czym jest Definition of Undone?",
                answerHtml:
                  "DoU to audyt, który sprawdza, czy ktoś z zewnątrz może ten projekt znaleźć, zrozumieć, zainstalować i mu zaufać. Mierzy prawdę powierzchni produktu, a nie tylko stan repo.",
              },
            ],
          },
          {
            title: "Licencja i użycie komercyjne",
            items: [
              {
                open: !0,
                questionHtml: "Czy 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. jest open source?",
                answerHtml:
                  "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. jest udostępniany na licencji Business Source License 1.1. Repo jest publiczne i można z niego korzystać, ale nie jest to klasyczny open source na licencji permisyjnej.",
              },
              {
                questionHtml:
                  "Czy małe zespoły mogą używać 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. produkcyjnie?",
                answerHtml:
                  "Tak. Ten grant pozwala pojedynczym deweloperom i zespołom mniejszym niż pięć osób używać frameworka w produkcji, o ile nie oferują konkurencyjnej usługi hostowanej ani rozwiązania osadzonego.",
              },
              {
                questionHtml:
                  "Co jeśli potrzebuję szerszego modelu komercyjnego?",
                answerHtml:
                  "Jeśli potrzebujesz szerszych uprawnień komercyjnych, skontaktuj się z VetCoders. Przeczytaj warunki licencji i ustal właściwą ścieżkę.",
              },
            ],
          },
        ],
        links: [
          { href: "/pl/quickstart/", label: "Szybki start" },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/FAQ-ANSWERED.md",
            label: "Pełne FAQ - markdown",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md",
            label: "Bramka review ScreenScribe",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md",
            label: "Matryca prawdy contentowej",
          },
          {
            href: "https://github.com/VetCoders/vibecrafted/blob/main/LICENSE",
            label: "Licencja",
          },
        ],
      },
      references: {
        label: "Referencje",
        title: "Ground Truth i inspiracje",
        sub: "Poniższa bibliografia rozszerza listę manifestu o wpływy modelowania strukturalnego i konwergencji wyłonione ponownie w wewnętrznej pracy groundingowej AICX.",
        modal: {
          eyebrow: "Źródło referencji",
          title: "Ta strona zostanie otwarta w nowej karcie.",
          sourceLabel: "Źródło",
          backLabel: "<<< Wróć",
          openLabel: "Otwórz >>>",
          backHover: "Powrót do portalu",
          openHover: "Przejdź do strony",
        },
        items: [
          {
            citationHtml:
              "Morris, K.; B&ouml;ckeler, B. (2026). <em>Humans and Agents in Software Engineering Loops</em>; <em>Harness Engineering</em>; <em>Context Engineering for Coding Agents</em>. Thoughtworks / Martin Fowler.",
            note: "Framing why-loop / how-loop, projektowanie harnessów i dyscyplina workflow prowadzonego przez człowieka stojące za SHACE i rolą operatora.",
            links: [
              {
                href: "https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html",
                label: "Humans & Agents",
              },
              {
                href: "https://martinfowler.com/articles/harness-engineering.html",
                label: "Harness Engineering",
              },
              {
                href: "https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html",
                label: "Context Engineering",
              },
            ],
          },
          {
            citationHtml:
              "Gong, L.; Elhoushi, M.; Cheung, A. (2024). <em>AST-T5: Structure-Aware Pretraining for Code Generation</em>.",
            note: "Wątek pretreningu świadomego struktury stojący za insistencją 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍., że modele nie powinny pisać do repo na ślepo.",
            links: [
              { href: "https://arxiv.org/abs/2401.03003", label: "arXiv" },
            ],
          },
          {
            citationHtml:
              "Guo, D. et al. (2021). <em>GraphCodeBERT: Pre-training Code Representations with Data Flow</em>.",
            note: "Komplementarny wynik świadomy struktury, który wzmocnił argument za eksternalizowanym kształtem kodu, mimo że GraphCodeBERT modeluje przepływ danych, a nie AST.",
            links: [
              { href: "https://arxiv.org/abs/2009.08366", label: "arXiv" },
            ],
          },
          {
            citationHtml:
              "Cunningham, W. (1992) i późniejsza literatura o długu technicznym.",
            note: "Konceptualny przodek DoU: działający kod to nie to samo co zdrowy, godny zaufania, gotowy do wysyłki system.",
            links: [
              {
                href: "https://martinfowler.com/bliki/TechnicalDebt.html",
                label: "Technical Debt",
              },
            ],
          },
          {
            citationHtml:
              "CEGIS / synteza prowadzona kontrprzykładami i późniejsza literatura o optymalizacji prowadzonej kontrprzykładami.",
            note: "Linia konwergencji za Marbles: pętla, inspekcja awarii, dodanie kontrprzykładów, redukcja przestrzeni programów, powtarzanie aż powierzchnia przestanie kłamać.",
            links: [
              {
                href: "https://www.cprover.org/synthesis",
                label: "Przegląd syntezy prowadzonej kontrprzykładami",
              },
            ],
          },
          {
            citationHtml: "VetCoders (2026). <em>Manifest 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.</em>.",
            note: "Źródło pierwotne dla SHACE, Marbles, Loctree Mapping, PSCD i założycielskiej Definicji Niezrobionego jako oryginalnych konceptów 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍..",
            links: [
              {
                href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/MANIFESTO_PL.md",
                label: "Przeczytaj manifest",
              },
            ],
          },
        ],
      },
      wizardLayout: {
        defaultDescription:
          "Prowadzony instalator silnika release'u Vibecrafted.",
        closeInstaller: "Zamknij instalator",
        closeInstallerShort: "Zamknij",
      },
      diffusionCanvas: { boardLabel: "Plansza", loopPrefix: "Pętla" },
      marbleCanvas: { marbles: "Marbles", converge: "Konwergencja" },
      installer: {
        wizard: {
          terminalKicker: "Podgląd instalacji",
          terminalBody:
            "Skrypt przygotowuje środowisko, a instalacja jest kontynuowana w przeglądarce.",
          welcomeCta: "Pokaż jak to działa",
          installPasteKicker: "Krok 1 · Skopiuj",
          installPasteHint: "Wklej do terminala (macOS lub Linux)",
          installRunKicker: "Krok 2 · Uruchom",
          installRunHint:
            "Instalator wstaje lokalnie i wraca sterowanie do tej karty — reszta dzieje się tu.",
          installPreviewKicker: "Podgląd",
          installPreviewBody: "Tak wygląda poprawny przebieg instalacji.",
          checkSummaryAria: "Podsumowanie diagnostyki",
          doneStamp: "Status · Gotowy",
          steps: {
            labels: {
              steps: "Kroki",
              required: "wymagane",
              optional: "opcjonalne",
              previous: "Poprzedni krok",
              next: "Następny krok",
              quickStart: "Start",
              toFinish: "Do finału",
              stepAria: "krok",
              ofAria: "z",
            },
          },
          welcomeNotes: [
            {
              label: "Start w terminalu",
              value:
                "Komenda inicjująca przygotowuje środowisko i przekazuje sterowanie do przeglądarki.",
            },
            {
              label: "Jawna zgoda",
              value:
                "Instalator definiuje plan działań i czeka na autoryzację przed modyfikacją systemu.",
            },
          ],
          terminal: [
            "$ curl -fsSL https://vibecrafted.io/install.sh | bash",
            "[bootstrap] Pobieranie install.sh...",
            "[bootstrap] Rozwiązywanie kanału main...",
            "[bootstrap] Weryfikacja integralności... SHA256 ✓  Signature ✓",
            "[bootstrap] Przygotowywanie środowiska lokalnego w ~/.vibecrafted/",
            "",
            "[bootstrap] Uruchamianie instalatora...",
            "",
            "[instalator] Witaj -> Wyjaśnienie -> Sprawdzenie -> Lista kontrolna",
            "[instalator] Proces będzie kontynuowany w przeglądarce dla lepszej czytelności.",
            "[instalator] Rozpoczynanie instalacji...",
            "[instalator] [etap] Konfiguracja fundamentów",
            "[instalator] [etap] Instalacja Vibecrafted",
            "[instalator] Tutaj będą pojawiać się komunikaty na żywo...",
          ],
          pages: [
            {
              label: "Witaj",
              title: "Widok instalatora",
              body: [
                "Instalacja używa przeglądarki do przejrzystego śledzenia stanu.",
                "Terminal wykonuje logikę bazową, podczas gdy ten widok monitoruje postęp.",
              ],
              hint: "Wizualne śledzenie stanu.",
            },
            {
              label: "Skład",
              title: "Manifest instalacji",
              body: [],
              hint: "Główne komponenty frameworka.",
            },
            {
              label: "Stan",
              title: "Weryfikacja środowiska",
              body: [
                "Stan systemu jest weryfikowany przed egzekucją.",
                "Dostępne i brakujące zależności są mapowane jawnie.",
              ],
              hint: "Brak modyfikacji w ciemno.",
            },
            {
              label: "Instaluj",
              title: "Egzekucja instalacji",
              body: [
                "Komenda startowa montuje instalator lokalnie.",
                "Proces wymaga ostatecznej autoryzacji przed modyfikacją systemu.",
              ],
              hint: "Terminal inicjuje interfejs.",
            },
            {
              label: "Gotowe",
              title: "Framework wdrożony",
              body: ["Deck komend jest dostępny lokalnie. Kolejne kroki:"],
              hint: "Środowisko jest gotowe.",
            },
          ],
          nextCommands: [
            { cmd: "vibecrafted doctor", desc: "Weryfikacja stanu" },
            { cmd: "vibecrafted init claude", desc: "Inicjalizacja sesji" },
            { cmd: "vibecrafted help", desc: "Referencja komend" },
          ],
        },
        live: {
          regionLabel: "Instalator Vibecrafted",
          stepsAria: "Kroki",
          brandFallback: "Vibecrafted.",
          labels: {
            welcome: "Start",
            diagnostics: "Diagnostyka",
            plan: "Plan",
            consent: "Zgoda",
            execute: "Instaluj",
            ready: "Gotowe",
          },
          welcome: {
            title: "Przegląd diagnostyki instalatora",
            leads: [],
            cta: "Zaczynamy",
            componentsFound: "znaleziono",
            componentsTotal: "łącznie",
            missingList: "Brakujące komponenty",
            planPreview: "Co wydarzy się dalej",
            timeEstimate: "≈ 2 minuty na rozgrzanej maszynie",
            sourceDir: "instalator znajduje się w",
            reRun: "Ponów diagnostykę",
          },
          diagnostics: {
            title: "Co znaleziono",
            present: "Obecne",
            missing: "Brakujące",
            empty:
              "Nic jeszcze nie wykryto. Odśwież preflight jeśli to wygląda na błąd.",
          },
          plan: {
            title: "Co się wydarzy",
            empty: "Brak planu. Sprawdź źródła i spróbuj odświeżyć.",
            stepLabel: "Krok",
          },
          consent: {
            title: "Potwierdź instalację",
            body: "Zaakceptuj, by uruchomić instalator. Nic nie wystartuje zanim klikniesz Zainstaluj.",
            accept: "Zapoznałem się z planem i akceptuję",
            withShell: "Zintegruj helpery shella (zalecane)",
            cta: "Zainstaluj teraz",
            again: "Instalacja już zakończona — możesz uruchomić ponownie.",
            running: "Instalacja już trwa. Przejdź do kroku postępu.",
          },
          execute: {
            title: "Trwa instalacja",
            stage: "Aktualny etap",
            waiting: "Czekam na pierwszą linię outputu…",
          },
          ready: {
            titleOk: "Zainstalowano",
            titleFail: "Instalacja nie zakończyła się czysto",
            exit: "Kod wyjścia",
            openGuide: "Otwórz START_HERE.md",
            nextSteps: "Następne kroki",
            reinstall: "Uruchom ponownie",
          },
          nav: { back: "Wstecz", next: "Dalej", refresh: "Odśwież preflight" },
          status: {
            loadingPreflight: "Ładuję preflight…",
            loadFailed: "Preflight się nie powiódł",
            notConnected:
              "Lokalny instalator nieosiągalny. Uruchom komendę curl i zostaw terminal otwarty.",
          },
          nextCommands: [
            { cmd: "vibecrafted doctor", desc: "Weryfikacja stanu" },
            { cmd: "vibecrafted init claude", desc: "Inicjalizacja sesji" },
            { cmd: "vibecrafted help", desc: "Lista komend" },
          ],
        },
      },
    },
  },
  i = { en: e, pl: t };
function o(a) {
  return i[a] ?? e;
}
export { o as g };
