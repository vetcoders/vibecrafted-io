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
    v2Anchors: {
      about: { label: "ABOUT", sub: "What it is" },
      runtime: { label: "RUNTIME", sub: "Lifecycle" },
      aicx: { label: "AICX", sub: "Memory" },
      marbles: { label: "MARBLES", sub: "Convergence" },
      playground: { label: "PLAYGROUND", sub: "Try it" },
      dou: { label: "DoU", sub: "Readiness audit" },
      faq: { label: "FAQ", sub: "Questions" },
    },
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
      title: "Vibecrafted — Orchestration runtime for CLI coding agents.",
      description:
        "An orchestration method and runtime for CLI coding agents (Claude Code, Codex, Junie, Agy, Grok, Gemini): an 11-stage read/write lifecycle assigns each stage the cheapest model capable of it — and one frontier model can drive /vc-ship, a whole project A to Z.",
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
  v2Hero: {
    ariaLabel: "Hero",
    eyebrow: "ORCHESTRATION RUNTIME FOR CLI CODING AGENTS",
    heading: {
      pre: "Orchestrate CLI coding agents",
      prefix: "Pay frontier prices",
      emFirst: "only",
      mid: "where judgment",
      emLast: "lives.",
    },
    body: "Vibecrafted is an orchestration method and runtime for CLI coding agents (Claude Code, Codex, Junie, Agy, Grok, Gemini), built around an 11-stage read/write lifecycle, that assigns each stage the cheapest model capable of it — and, when you want, lets one frontier model drive <code>/vc-ship</code>: a whole project delivered A to Z.",
    ctaPrimary: "INSTALL",
    ctaSecondary: "READ THE DOCS",
    telemetry: {
      marbles: "CHECKS",
      converge: "READY",
      live: "LIVE",
    },
    telemetryLegend: "Run-loop signal: checks, readiness, live build.",
    canvasCaption: "Each marble = one verified write.",
    scroll: "SCROLL",
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
    pipeline: {
      label: "The Method",
      title: "Craft → Converge → Ship",
      sub: "A small operating model for shaping agent work, reducing drift, and preparing a release surface people can inspect.",
      hero: {
        stages: [
          { name: "Scaffold", subtitle: "read · map before the cut" },
          { name: "Implement", subtitle: "write · agents deliver" },
          { name: "Review", subtitle: "read · falsify the write" },
          {
            name: "Converge",
            subtitle: "write · marbles ⬆ polarize ⬇",
            kind: "core" as const,
          },
          { name: "Release", subtitle: "write · ship for strangers" },
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
    S["Scaffold · R"] --> I["Implement · W"]
    I --> RV["Review · R"]
    RV --> WF["Workflow · W"]
    WF --> FU["Follow-up · R"]
    FU --> MA{{"Marbles · W ⬆"}}
    MA --> AU["Audit · R"]
    AU --> PO{{"Polarize · W ⬇"}}
    PO --> DU["DoU · R"]
    DU --> HY["Hydrate · W"]
    HY --> RE["Release · W"]

    classDef read fill:#0d1728,stroke:#3b6ea5,color:#dbe7f3,stroke-width:1.3px;
    classDef write fill:#1a1410,stroke:#d8894b,color:#ffd9bd,stroke-width:1.6px;
    classDef core fill:#1a1110,stroke:#e2935a,color:#ffd9bd,stroke-width:2.4px;
    class S,RV,FU,AU,DU read;
    class I,WF,HY,RE write;
    class MA,PO core;`,
      mermaidModal: {
        open: "Expand full pipeline",
        close: "Close pipeline diagram",
        title: "vc-ship cadence — Read ↔ Write, eleven beats",
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
          body: "Models drift when they write into a repo blind. Structural maps give the session landmarks before the agent touches a file.",
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
