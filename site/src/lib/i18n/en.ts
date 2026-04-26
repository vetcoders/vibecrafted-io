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
    brand: "Vibecrafted.",
    byline: "with AI Agents by VetCoders",
    tagline: "From AI-generated repo to launch-ready product.",
    copyright: "(c)2024-2026 VetCoders",
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
