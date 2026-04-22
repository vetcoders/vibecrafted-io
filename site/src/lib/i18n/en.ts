// Canonical public-copy sources are mapped in docs/content-truth.manifest.json
// and summarized for humans in docs/runtime/CONTENT_TRUTH.md.
export const en = {
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
    brand: "VIBECRAFTED",
    tagline: "From AI-generated repo to launch-ready product.",
    copyright: "© 2026 VetCoders",
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
        {
          label: "Image diffusion",
          code: "noise → denoise × N → image",
        },
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
          command: "cd $VIBECRAFTED_ROOT/your-project\nvibecrafted init claude",
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
          command:
            "vibecrafted codex implement .vibecrafted/plans/my-plan.md\nvibecrafted claude research .vibecrafted/plans/my-plan.md\nvibecrafted gemini implement .vibecrafted/plans/my-plan.md",
          note: "These are the friendly launcher surfaces. The portable spawn-script contract lives in the Runtime Contract.",
        },
        {
          kicker: "Step 6",
          title: "Close the loop before you call it done",
          body: "Shipping in 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. means code quality, product-surface truth, and packaging truth.",
          command:
            'vibecrafted dou claude --prompt "Audit launch readiness"\nvibecrafted decorate codex --prompt "Polish the release surface"\nvibecrafted hydrate codex --prompt "Package the product"\nvibecrafted release codex --prompt "Prepare release steps"',
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
              open: true,
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
              open: true,
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
              open: true,
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
              open: true,
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
              questionHtml: "What if I need a broader commercial arrangement?",
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
          links: [{ href: "https://arxiv.org/abs/2401.03003", label: "arXiv" }],
        },
        {
          citationHtml:
            "Guo, D. et al. (2021). <em>GraphCodeBERT: Pre-training Code Representations with Data Flow</em>.",
          note: "A complementary structure-aware result that reinforced the case for externalized code shape, even though GraphCodeBERT models data flow rather than AST.",
          links: [{ href: "https://arxiv.org/abs/2009.08366", label: "arXiv" }],
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
    diffusionCanvas: {
      boardLabel: "Board",
      loopPrefix: "Loop",
    },
    marbleCanvas: {
      marbles: "Marbles",
      converge: "Converge",
    },
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
          "[bootstrap] Verifying integrity... SHA256 \u2713  Signature \u2713",
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
          title: "Vibecrafted. is installing on your machine",
          leads: [
            "The installer is running locally. Every step is explicit — no silent changes.",
            "This browser tab is the control surface. Your terminal is the engine.",
          ],
          cta: "Begin",
          componentsDetected: "components detected",
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
          empty: "No plan produced. Check the source tree and try refreshing.",
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
        nav: {
          back: "Back",
          next: "Next",
          refresh: "Refresh preflight",
        },
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
} as const;
