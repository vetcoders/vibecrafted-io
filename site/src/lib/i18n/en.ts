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
    brand: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
    byline: "with AI Agents by VetCoders",
    tagline: "From AI-generated repo to launch-ready product.",
    copyright: "(c)2024-2026 VetCoders",
    license: "BSL 1.1",
  },
  v2Chrome: {
    footer: {
      ariaLabel: "Site footer",
      byline: "with AI Agents by VetCoders",
      tagline: "From AI-generated repo to launch-ready product.",
      quickstart: "Quick Start",
      faq: "FAQ",
      github: "GitHub",
      license: "License (BSL 1.1)",
      security: "Security",
    },
    search: {
      ariaLabel: "Search",
      openAria: "Open search",
      queryAria: "Search query",
      placeholder: "Search install, auth, Stripe, deploy…",
      tabs: {
        all: "ALL SURFACES",
        quickstart: "QUICK START",
        faq: "FAQ",
      },
      prompt:
        "Ask what it fixes, how to install it, or where release risk usually hides.",
      fastPathsLabel: "FAST PATHS",
      fastPaths: {
        framework: "Framework playground",
        install: "Guided installer",
        quickstart: "Read Quick Start",
        overview: "Back to Overview",
      },
      resultsLabel: "RESULTS",
      empty: "Type at least two characters to search the static docs index.",
    },
  },
  v2Pages: {
    landing: {
      title: "Vibecrafted — Release engine for AI-built software.",
      description: "Ship AI-built software without the vibe hangover.",
    },
    faq: {
      title: "Vibecrafted · FAQ",
      description:
        "The questions strangers ask first about the Vibecrafted release engine.",
    },
    dou: {
      title: "Vibecrafted · DoU — The Definition of Undone",
      description:
        "The space between a working system and a product that strangers can discover, install, trust, and buy.",
    },
  },
  landingV2: {
    hero: {
      ariaLabel: "Hero",
      eyebrow: "RELEASE ENGINE",
      heading: {
        pre: "Turn agent-built repos",
        prefix: "into",
        emFirst: "AI-built",
        mid: "software people can",
        emLast: "trust.",
      },
      body: "The vibe hangover is what comes after the demo: fragile auth, unclear data, missed webhooks, scary deploys. Vibecrafted finds those seams and turns the repo into a release a stranger can install, trust, and use.",
      ctaPrimary: "INSTALL",
      ctaSecondary: "READ THE DOCS",
      telemetry: {
        marbles: "CHECKS",
        converge: "READY",
        live: "LIVE",
      },
      scroll: "SCROLL",
    },
    problem: {
      title: "THE PROBLEM",
      centerLabel: "OBSERVED 2024–2026",
    },
    engineering: {
      title: "ENGINEERING",
      centerLabel: "AXIOMS · METHOD",
    },
    shift: {
      title: "THE SHIFT",
      centerLabel: "VIBES → VECTORS",
    },
    framework: {
      title: "THE FRAMEWORK",
      centerLabel: "SCAFFOLD → RELEASE",
    },
    operator: {
      title: "THE OPERATOR",
      centerLabel: "INSTALL · RUN · OBSERVE",
    },
    quickstart: {
      title: "QUICKSTART",
      centerLabel: "INIT → SHIP · SIX THROWS",
    },
    references: {
      title: "REFERENCES",
      centerLabel: "RESEARCH · FIELD NOTES",
    },
    evidence: {
      title: "EVIDENCE",
      centerLabel: "FROM THE WILD · PATTERNS OBSERVED",
    },
    footer: {
      continues: "CONTINUES § {number} · {title}",
    },
  },
  v2Sections: {
    shift: {
      heading: {
        first: "Most AI coding sessions leave",
        firstAccent: "fragments.",
        second: "Vibecrafted gives the work",
        secondAccent: "coordinates.",
      },
      todayLabel: "Without a board",
      vibecraftedLabel: "With a board",
      todayItems: [
        {
          number: "01",
          title: "Context evaporates.",
          body: "The next session may inherit a diff, but not the reason behind it. The repo has changes; the work has no memory.",
        },
        {
          number: "02",
          title: "Retry becomes the method.",
          body: "A compile pass starts to feel like proof. It is useful signal, just not enough to know whether the product is safe.",
        },
        {
          number: "03",
          title: "Done stays blurry.",
          body: "Artifacts collect in comments, branches, notes, and screenshots. A future agent can see pieces, but not the shape.",
        },
      ],
      vibecraftedItems: [
        {
          number: "01",
          title: "The contract is visible.",
          body: "Scope, owner, evidence, and next action sit on the same surface before the agent starts cutting.",
        },
        {
          number: "02",
          title: "The trail survives.",
          body: "Reports and artifacts stay attached to the repo, so the next session can continue from evidence instead of mood.",
        },
        {
          number: "03",
          title: "Convergence is inspectable.",
          body: "The board does not declare victory. It shows what landed, what moved, and what still asks for a decision.",
        },
      ],
      proofItems: [
        { count: "05", label: "PHASES" },
        { count: "06", label: "OPERATORS" },
        { count: "01", label: "SHARED BOARD" },
        { count: "00", label: "LOST CONTEXT" },
      ],
    },
    problem: {
      headingHtml:
        'Agent-built apps can look done<br />while auth, data, payments, and deploy are still <em class="accent">fragile</em>',
      body: "Code generation gets you to a demo. Real users, money, security reviews, and the next developer expose the parts no prompt ever owned.",
      symptoms: [
        {
          label: "Security review",
          body: "The app works, but auth is admin/user only, tokens live in the wrong place, and nobody can prove who may touch which data.",
        },
        {
          label: "Money path",
          body: "Stripe works until it does not. A webhook fails once, there is no retry, and the customer finds the missing service before the system does.",
        },
      ],
    },
    framework: {
      headingHtml:
        'Not a rewrite. A stabilization sprint<br /><em class="accent-2">Find the weak seams, then close them</em>',
      subtitle:
        "Vibecrafted keeps the momentum from AI-built software and adds the missing release discipline: map the repo, assign the next cut, verify runtime truth, and leave evidence for the next session.",
      operatorsHeadingHtml: "How the <em>pass</em> runs",
      operatorsSub:
        "Each workflow has one job. Read the repo, make the cut, test the real path, or audit what is still not ready. Names come later; the evidence comes first.",
      cta: "Open the Playground",
      operators: [
        { num: "00", name: "loctree", kind: "STRUCTURE" },
        { num: "01", name: "aicx", kind: "MEMORY" },
        { num: "02", name: "prview", kind: "REVIEW" },
        { num: "03", name: "ScreenScribe", kind: "RUNTIME" },
        { num: "04", name: "DoU", kind: "GATE" },
        { num: "05", name: "Review", kind: "CLOSING" },
      ],
    },
    operator: {
      headingHtml:
        'Install it locally<br />Let every run leave a <em class="accent-2">trail</em>',
      installSteps: [
        {
          step: "STEP 01",
          command: "$ curl -fsSL vibecrafted.io/install.sh | bash",
          note: "One local bootstrap. It installs the commands and opens the guided launcher.",
        },
        {
          step: "STEP 02",
          command: "$ vibecrafted doctor",
          note: "A quick health check before agents touch the repo.",
        },
        {
          step: "STEP 03",
          command: "$ vibecrafted init claude",
          note: "A first-context pass with a real agent inside a real repository.",
        },
      ],
      shotHeadingHtml:
        'The repo gets a <em class="accent-2">shared surface</em>',
      shotBody:
        "A session can end without disappearing. The next agent may inherit reports, decisions, and open questions instead of a cold prompt.",
      bullets: [
        {
          title: "State has a place.",
          body: "Artifacts live under $VIBECRAFTED_ROOT/. Not in the memory of whichever tab happened to be open.",
        },
        {
          title: "Runs leave evidence.",
          body: "Each agent run can carry prompt, report, metadata, and the decision it was meant to support.",
        },
        {
          title: "Undone stays visible.",
          body: "DoU and marbles keep the unresolved pieces on the board until somebody decides what they mean.",
        },
      ],
      practicesLabel: "OPERATOR HABITS",
      practices: [
        "ONE REPO, ONE SURFACE",
        "CONTRACT BEFORE PROMPT",
        "EVIDENCE OVER MOOD",
        "UNRESOLVED STAYS VISIBLE",
      ],
      boardPreview: {
        dwg: "VC-001 · REV A",
        timestamp: "t=14:04:48",
        meta: "20 MARBLES · 054 CONVERGE",
        metaLeft: "BOARD STATE",
        live: "LIVE",
        tabsAria: "Board preview views",
        tabs: { board: "BOARD", marbles: "MARBLES", dou: "DOU" },
        boardHeaders: {
          n: "N#",
          phase: "PHASE",
          marbles: "MARBLES",
          coverage: "COVERAGE",
          state: "STATE",
        },
        boardRows: [
          {
            num: "00",
            phase: "scaffold",
            marbles: "04",
            coverage: 10,
            pct: "100",
            state: "converged",
            stateLabel: "CONVERGED",
          },
          {
            num: "01",
            phase: "craft",
            marbles: "12",
            coverage: 7,
            pct: "078",
            state: "active",
            stateLabel: "ACTIVE",
          },
          {
            num: "02",
            phase: "convergence",
            marbles: "07",
            coverage: 4,
            pct: "042",
            state: "active",
            stateLabel: "ACTIVE",
          },
          {
            num: "03",
            phase: "doU",
            marbles: "03",
            coverage: 0,
            pct: "000",
            state: "waiting",
            stateLabel: "WAITING",
          },
          {
            num: "04",
            phase: "release",
            marbles: "00",
            coverage: 0,
            pct: "000",
            state: "blocked",
            stateLabel: "BLOCKED",
          },
        ],
        marblesHeaders: {
          time: "TIME",
          op: "OP",
          phase: "PHASE",
          marble: "MARBLE",
          status: "STATUS",
        },
        marblesLog: [
          {
            ts: "14:03:02",
            op: "loctree",
            phase: "00/scaffold",
            msg: "shape accepted, 04 wells assigned",
            status: "ok",
          },
          {
            ts: "14:03:18",
            op: "aicx",
            phase: "00/scaffold",
            msg: "intent snapshot committed",
            status: "ok",
          },
          {
            ts: "14:03:44",
            op: "prview",
            phase: "01/craft",
            msg: "3 files reviewed, 1 change requested",
            status: "rej",
          },
          {
            ts: "14:04:09",
            op: "ScreenScribe",
            phase: "01/craft",
            msg: "runtime sample captured",
            status: "ok",
          },
          {
            ts: "14:04:31",
            op: "prview",
            phase: "01/craft",
            msg: "resubmitted and accepted",
            status: "ok",
          },
          {
            ts: "14:04:48",
            op: "loctree",
            phase: "02/convergence",
            msg: "duplicate groove collapsed",
            status: "ok",
          },
        ],
        douItems: [
          {
            num: "01",
            severity: "block",
            phase: "DoU",
            text: "Release gate status undefined for phase 04.",
          },
          {
            num: "02",
            severity: "warn",
            phase: "craft",
            text: "2 marbles waiting on specialist coverage acknowledgement.",
          },
          {
            num: "03",
            severity: "warn",
            phase: "release",
            text: "Changelog template not yet bound to board archive.",
          },
        ],
        ticksAria: "{coverage} of 10 ticks filled",
        caption:
          "Board state as observed at {timestamp}, after six throws across phases 00–02.",
      },
    },
    quickstart: {
      headingHtml: "Start with the first <em>useful signal</em>",
      carousel: {
        ariaLabel: "Quickstart steps carousel",
        slideAria: "Step {num}: {title}",
        landsLabel: "LANDS:",
        convergeLabel: "CONVERGE",
        previousLabel: "Previous step",
        nextLabel: "Next step",
        dotsLabel: "Step navigation",
        goToStep: "Go to step {number}",
        steps: [
          {
            num: "01",
            verb: "CHECK",
            accent: "default",
            state: 0,
            pct: "000",
            title: "Check the local surface.",
            body: "Start with the boring signal: does the launcher know where it is, what is installed, and what needs attention?",
            command: "$ vibecrafted doctor",
            lands: ["INSTALL HEALTH", "FOUNDATION CHECK", "LAUNCHER TRUTH"],
          },
          {
            num: "02",
            verb: "INIT",
            accent: "default",
            state: 0.3,
            pct: "030",
            title: "Let an agent read first.",
            body: "Init may surface repo shape, recent context, and the first risks before any edit starts.",
            command: "$ vibecrafted init claude",
            lands: ["REPO MAP", "FIRST CONTEXT", "NEXT MOVE"],
          },
          {
            num: "03",
            verb: "WORKFLOW",
            accent: "default",
            state: 0.6,
            pct: "060",
            title: "Choose a lane.",
            body: "Workflow helps when the task needs a little ceremony: examine the surface, research the gap, then implement the cut.",
            command:
              '$ vibecrafted workflow claude --prompt "Plan and implement <task>"',
            lands: ["PLAN", "IMPLEMENTATION LANE", "REPORT TRAIL"],
          },
          {
            num: "04",
            verb: "MARBLES",
            accent: "default",
            state: 0.75,
            pct: "075",
            title: "Look for what still bites.",
            body: "Marbles runs small counterexample loops. It may find an edge case, a false assumption, or simply a place that needs a human decision.",
            command: "$ vibecrafted marbles codex --count 3 --depth 3",
            lands: ["COUNTEREXAMPLES", "FIX LOOPS", "CONVERGENCE SIGNAL"],
          },
          {
            num: "05",
            verb: "DOU",
            accent: "teal",
            state: 0.9,
            pct: "090",
            title: "Name the unfinished parts.",
            body: "DoU is the moment to stop pretending. It asks what is missing across install, docs, runtime, trust, and release.",
            command:
              '$ vibecrafted dou claude --prompt "Audit launch readiness"',
            lands: ["UNDONE LIST", "SHIP RISKS", "PRODUCT TRUTH"],
          },
          {
            num: "06",
            verb: "RELEASE",
            accent: "teal",
            state: 1,
            pct: "100",
            title: "Prepare the handoff.",
            body: "Release gathers the outward work: artifacts, deployment notes, docs, and the next human-readable step.",
            command:
              '$ vibecrafted release codex --prompt "Prepare release steps"',
            lands: ["RELEASE PLAN", "ARTIFACT CHECK", "NEXT STEPS"],
          },
        ],
      },
    },
    referencesLanding: {
      headingHtml: "What we <em>read</em> before we built",
      subtitle:
        "The convergence framework is the synthesis of research on agent handoffs, release gates, and runtime contracts. Sources below — consult before adopting.",
    },
    evidenceWild: {
      headingHtml: 'The vibe hangover in the <em class="accent">wild</em>',
      subtitle:
        "A few field notes from agent-built products and our own release lanes. Anonymized, because the pattern matters more than the name.",
      patterns: [
        {
          num: "01",
          label: "RELEASE MIRROR",
          headline: "Two checkouts, two truths.",
          observation:
            "The upstream framework was already fixed, but the public landing repo still served older installer truth. Everyone was right inside their own checkout; the user saw drift.",
          source: "FIELD NOTE · representative repo release lane",
          accent: "rust",
        },
        {
          num: "02",
          label: "HELPER DRIFT",
          headline: "The runtime moved. The docs did not.",
          observation:
            "A helper script kept yesterday's path assumptions after the main runtime flow was repaired. The product worked, until an operator followed the stale trail.",
          source: "FIELD NOTE · helper surface audit",
          accent: "amber",
        },
        {
          num: "03",
          label: "SILENT FAILURES",
          headline: "The webhook that never retried.",
          observation:
            "A checkout path looked healthy until activation moved into claim and webhook truth. The sale happened; the entitlement story still needed a witness.",
          source: "OBSERVED · real founder (redacted)",
          accent: "red",
        },
        {
          num: "04",
          label: "DEPLOY AND PRAY",
          headline: "Friday afternoon migration runs four times.",
          observation:
            "No staging, no smoke tests, no rollback. The migration deadlocks on a lock table. Support tickets spike while the founder tries to remember which tab ran last.",
          source: "OBSERVED · field reports",
          accent: "rust",
        },
      ],
    },
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
      lead: "Turn AI-generated code into software a stranger can install, trust, and use.",
      quoteHtml:
        "Take the repo your agents already produced and turn it into something a stranger can install, trust, and use.",
      evidence: "See the Evidence",
      quickstart: "Open Quick Start",
      quickstartHref: "/en/quickstart/",
    },
    pipeline: {
      label: "The Method",
      title: "Craft → Converge → Ship",
      sub: "A small operating model for shaping agent work, reducing drift, and preparing a release surface people can inspect.",
      hero: {
        stages: [
          { name: "Scaffold", subtitle: "prepare the surface" },
          { name: "Craft", subtitle: "shape with agents" },
          {
            name: "Convergence",
            subtitle: "collapse unresolveds",
            kind: "core" as const,
          },
          { name: "DoU", subtitle: "find what is still undone" },
          { name: "Release", subtitle: "ship for strangers" },
        ],
      },
      controls: {
        expand: "Expand",
        expandLabel: "Expand full pipeline",
        source: "Source",
        preview: "Preview",
        split: "Split",
        copy: "Copy",
        copied: "Copied",
        copyError: "Failed",
        ariaSource: "Toggle Mermaid source",
        ariaPreview: "Return to hero diagram",
        ariaSplit: "Show source and technical preview side by side",
        ariaCopy: "Copy Mermaid source to clipboard",
        ariaCopiedFeedback: "Source copied to clipboard",
        ariaCopyErrorFeedback: "Copy failed",
      },
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
    "fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif",
    "fontSize": "16px"
  },
  "flowchart": {
    "curve": "basis",
    "htmlLabels": true,
    "nodeSpacing": 32,
    "rankSpacing": 46,
    "padding": 14
  }
} }%%
flowchart LR
    A["Scaffold"] --> B["Init"]
    B --> C["Workflow"]
    C --> D["Follow-up"]
    D --> E{{"Marbles Loop"}}
    E --> F["DoU"]
    F --> G["Decorate"]
    G --> H["Hydrate"]
    H --> I["Release"]

    classDef stage fill:#0d1728,stroke:#31415d,color:#f3efe7,stroke-width:1.3px;
    classDef core fill:#1a1110,stroke:#d8894b,color:#ffd9bd,stroke-width:2.2px;
    class A,B,C,D,F,G,H,I stage;
    class E core;`,
      mermaidModal: {
        open: "Expand full pipeline",
        close: "Close pipeline diagram",
        title: "Full pipeline — Scaffold → Marbles → Release",
      },
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
      titleHtml: "Less magic<br />More inspectable work",
      lead: "The vocabulary can stay vivid, as long as the system remains inspectable: context before edits, evidence after runs, and a release surface that says what is still uncertain.",
      revealLabel: "Open field note",
      closeLabel: "Close note",
      detailsLabel: "Operational consequence",
      items: [
        {
          number: "01",
          accent: "steel",
          title: "AST-Augmented Context",
          body: "Models get worse when they write into a repo blind. Structural maps give the session landmarks before it starts editing.",
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
          body: "Code generation is noisy. The Marbles loop gives that noise a place to show up: small loops, counterexamples, and visible unresolved work.",
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
          body: "Structured Human-AI collaborative engineering. The craft is in the handoff: humans keep scope, taste, and irreversible decisions; agents do fieldwork with evidence attached.",
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
            "A reality check after implementation: what improved, what drifted, and whether the work is ready for the next gate.",
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
        "AI agents can often make the thing work. They do not automatically make it reachable, trusted, installable, or worth paying for.",
      lead: "The gap is rarely code quality alone. It is the space between a working system and a product that strangers can discover, install, trust, and buy.",
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
        "Items 4-6 are the Definition of Undone. Phase 3 asks whether the system can meet the market.",
      caption: "Convergence Trajectory — loop until the circle is full",
      bars: ["Loop 1", "Loop 2", "Loop 3", "Loop 4", "Loop 5"],
      scoreline: "Score: 15 → 40 → 65 → 85 → 100",
    },
    get: {
      label: "Get 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
      title: "Install the release engine. Start the loop.",
      sub: "Install locally, check the machine, then enter the command deck.",
      cards: [
        {
          step: "01",
          title: "Install locally",
          body: "Use the public bootstrap path. For the browser installer, run <code>make vibecrafted</code> from the repo.",
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
      lead: "Install Vibecrafted, run doctor, then start one real workflow inside a live repository.",
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
            "Required foundations: loctree and aicx",
            "Recommended evidence tools: prview and ScreenScribe",
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
          body: "Use the public bootstrap path. For the browser installer, run <code>make vibecrafted</code> in the repo.",
          command: "curl -fsSL https://vibecrafted.io/install.sh | bash",
          note: "Use the direct <code>| bash</code> path only when you already want compact automation instead of the guided kickoff.",
        },
        {
          kicker: "Step 2",
          title: "Run the doctor",
          body: "Check the install, shell helpers, and required foundations before starting a workflow.",
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
                "The doctor verifies the central store, helper availability, symlink health, required foundations (<code>loctree-mcp</code> and <code>aicx-mcp</code>), evidence tools such as prview and ScreenScribe, plus whether your shell environment is quiet enough for agent tooling.",
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
              questionHtml: "Are loctree and aicx required?",
              answerHtml:
                "Not honestly. <code>loctree</code> and <code>aicx</code> are required foundations: one gives the agent structural perception, the other restores prior decisions and intent. If either is missing, fix the foundation layer before trusting the workflow.",
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
      defaultDescription: "Install Vibecrafted locally.",
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
        terminalBody: "The script starts the local installer.",
        welcomeCta: "See how it works",
        installPasteKicker: "Step 1 · Copy",
        installPasteHint: "Paste into your terminal (macOS or Linux)",
        installRunKicker: "Step 2 · Run",
        installRunHint: "The installer opens locally and shows each step here.",
        installPreviewKicker: "Preview",
        installPreviewBody: "A clean install, step by step.",
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
            value: "The bootstrap command starts the local installer.",
          },
          {
            label: "Explicit consent",
            value: "You see the plan before anything changes.",
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
          "[installer] Opening the local install view.",
          "[installer] Starting installation...",
          "[installer] [stage] Setup foundations",
          "[installer] [stage] Installing Vibecrafted",
          "[installer] Real-time logs will appear here...",
        ],
        pages: [
          {
            label: "Welcome",
            title: "Install Vibecrafted",
            body: ["Paste one command. Review the plan. Install locally."],
            hint: "Local install.",
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
              "Vibecrafted checks what is already present and what needs installation.",
            ],
            hint: "Know first.",
          },
          {
            label: "Install",
            title: "Execute installation",
            body: ["Click Install to run the plan."],
            hint: "Run the plan.",
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
          title: "Install Vibecrafted",
          leads: [],
          cta: "Start",
          componentsFound: "components ready",
          componentsTotal: "total",
          missingList: "Missing components",
          planPreview: "Install plan",
          timeEstimate: "About 2 minutes",
          sourceDir: "from",
          reRun: "Scan again",
        },
        diagnostics: {
          title: "What we found",
          present: "Present",
          missing: "Missing",
          empty: "No scan yet. Try again.",
        },
        plan: {
          title: "What will happen",
          empty: "No plan produced. Check the source tree and try refreshing.",
          stepLabel: "Step",
        },
        consent: {
          title: "Confirm installation",
          body: "Click Install to run the plan.",
          accept: "I accept the plan",
          withShell: "Integrate shell helpers (recommended)",
          cta: "Install now",
          again: "Installation completed. You can run it again.",
          running: "Installation is running. Open the progress step.",
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
          loadingPreflight: "Scanning…",
          loadFailed: "Scan failed",
          notConnected:
            "Start the installer with the curl command and keep the terminal open.",
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
