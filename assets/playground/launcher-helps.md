# Vibecrafted Launcher Harvest — READ-ONLY

Sources: (A) `vibecrafted help` / `vibecrafted help --all` / `vibecrafted help <topic>` outputs (live CLI, v4.1.0+g237d2814); (B) deck source at `/Volumes/vc-workspace/vetcoders/vibecrafted-suite/vibecrafted/vibecrafted-core/vibecrafted_core/deck/vibecrafted` (5595-line bash script) for the canonical dispatch case and cmd_*_help function inventory; (C) `~/.local/bin` shims read as plain files (never executed beyond --help).

## 1. vibecrafted help / help --all

```
=== vibecrafted help ===
⚒  𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. 4.1.0+g237d2814 — release engine for AI-developed software
─────────────────────────────────────────

Usage:
  vibecrafted <command> [args]
  vibecrafted <skill> <agent> [-p <prompt> | -f <file>]

Commands:
  init [agent]         Orient an agent in this repo
  <skill> <agent>      Run a workflow with an agent
  resume <agent>       Continue a stopped run (--run-id) or a provider session
  resume-session       Continue an exact provider session as a tracked run
  status               Today's agent activity
  doctor               Installation health — pass/fail
  receipt              Delivery/runtime receipt (source ↔ installed)
  settlements          Read-only f/x/n ledger query (summary|list|inspect)
  update               Update to the latest release
  help [topic|--all]   This deck · full reference

Ship cycle:
  scaffold → implement → review → workflow → followup → marbles → audit → polarize → dou → hydrate → release
  More workflows: vibecrafted help --all

Agents:  claude · codex · agy · junie · grok

Examples:
  vibecrafted init claude
  vibecrafted implement codex -p "Ship dark mode"
  vibecrafted marbles claude -p "Loop until clean"

=== vibecrafted help --all ===

[1m[38;5;173m⚒  𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. 4.1.0+g237d2814[0m (Full Reference)
[38;5;247m─────────────────────────────────────────[0m
  Release engine for AI-developed software.
  Install locally. Work from evidence.

[1m=== PIPELINE (canonical order) ===[0m

  [38;5;173mscaffold[0m   → Plan architecture from a vague idea
  [38;5;173minit[0m       → Orient: history, eyes, verify
  [38;5;173mworkflow[0m   → Examine → Research → Implement
  [38;5;173mfollowup[0m   (vc-followup v2.2.0) → Audit post-implementation direction, gaps, and drift
  [38;5;173mmarbles[0m    → Convergence loop (counterexample elimination)
  [38;5;173maudit[0m      (vc-audit v1.0.0) → Plan-vs-code falsification with requirements matrix
  [38;5;173mdou[0m        → Definition of Undone audit
  [38;5;173mdecorate[0m   → Visual finishing and UX coherence
  [38;5;173mhydrate[0m    → Packaging and go-to-market
  [38;5;173mrelease[0m    → Ship to production

[1m=== FIRST 5 MINUTES ===[0m

  [36mvibecrafted init claude[0m
  [36mvibecrafted gui[0m
  [36mvibecrafted tui[0m
  [36mvibecrafted workflow claude --prompt "Plan and implement <task>"[0m
  [36mvibecrafted implement codex --prompt "Ship <task>"[0m
  [36mvc-ship codex --prompt "Run the full lifecycle"[0m
  [36mvibecrafted dou claude --prompt "Audit launch readiness"[0m
  [36mvibecrafted decorate codex --prompt "Polish the release surface"[0m
  [36mvibecrafted hydrate codex --prompt "Package the product"[0m
  [36mvibecrafted release codex --prompt "Prepare release steps"[0m
  Dashboard is optional. The plain-language guide lives at [36m/Users/polyversai/.vibecrafted/START_HERE.md[0m.

[1m=== MODES (per agent) ===[0m

  [36mvibecrafted <agent> implement[0m <plan.md>   Execute a plan file
  [36mvibecrafted <agent> research[0m  <plan.md>   Single-agent research mode
  [36mvibecrafted <agent> review[0m    <plan.md>   Review bounded code artifacts
  [36mvibecrafted <agent> plan[0m      <plan.md>   Generate an implementation plan
  [36mvibecrafted <agent> prompt[0m    <plan.md>   Free-form prompt with context
  [36mvibecrafted <agent> observe[0m   --last      Check last agent report/transcript

[1m=== RESEARCH (launcher) ===[0m

  [36mvibecrafted research[0m [--prompt "text" | --file plan.md]   Launch Claude + codex + junie swarm
  [2mEvery skill also installs a vc-<skill> shortcut.[0m

[1m=== TELEMETRY ===[0m

  [36mtelemetry smoke[0m [flags]                Smoke the headless marbles telemetry path
  [36mvibecrafted telemetry smoke[0m [flags]    Same entrypoint through the main deck

[1m=== OPERATOR SURFACE ===[0m

  [36mvibecrafted dashboard[0m [layout]        Open/switch to a vc-frame dashboard
  [36mvibecrafted loop[0m                      Interactive operator loop + async awaits
  [36mvibecrafted cron[0m                      Cron-safe LOOP heartbeat + context capture
  [36mvibecrafted ship[0m                      Start VC-Ship loop and dispatch a checkpoint
  [36mvibecrafted dispatch[0m <file.toml>      Deterministic dispatch.v1 supervisor
  [36mvibecrafted dispatch[0m run ...          Async lifecycle supervisor for one worker
  [36mvibecrafted dashboard ls[0m              List active vc-frame sessions
  [36mvibecrafted dashboard gc[0m [flags]      Prune dead/stale vc-frame sessions
  [36mvibecrafted dashboard switch[0m <name>   Switch to session (vc-frame-native)
  [36mvibecrafted start[0m [layout]            Alias for [36mvibecrafted dashboard[0m
  [36mvibecrafted gui[0m                       Public/local-web launch + observe surface
  [36mvibecrafted tui[0m                       Rust operator console over shared state
  [36mvibecrafted server[0m <action>           Manage local control-plane viewer server

[1m  Agents: claude · codex · agy · junie · grok[0m

[1m=== ADDITIONAL SKILLS ===[0m

  [38;5;173magents[0m     External fleet delegation contract via agent modes
  [38;5;173mintents[0m    Plan-to-runtime truth audit
  [38;5;173mimplement[0m  Autonomous end-to-end implementation (vc-implement)
  [38;5;173mpartner[0m    Shared steering and executive reasoning with the user
  [38;5;173mownership[0m  Full-spectrum operational ownership and delivery
  [38;5;173mdelegate[0m   In-session native subagent delegation
  [38;5;173mresearch[0m   Triple-agent research (claude + codex + junie)
  [38;5;173mreview[0m     (vc-review v2.0.0) Bounded PR, branch, commit-range, or artifact-pack review
  [38;5;173mprune[0m      Runtime/publish cone extraction
  [38;5;173mtrust[0m      Post-hoc commit-claim falsification with f/x/n settlement projection
  [38;5;173mguard[0m      In-flight gate enforcer: refuses continuation on trust block

[1m=== MANAGEMENT ===[0m

  [36mvibecrafted help[0m                      Compact command deck
  [36mvibecrafted help --all[0m                This full reference
  [36mvibecrafted init[0m [agent]              Interactive init session
  [36mvibecrafted gui[0m                       Launch the localhost control plane
  [36mvibecrafted tui[0m                       Launch the Rust operator console
  [36mvibecrafted dispatch[0m <file.toml>      Deterministic dispatch.v1 supervisor
  [36mvibecrafted dispatch[0m run ...          Async lifecycle supervisor for one worker
  [36mvibecrafted telemetry smoke[0m [flags]  Smoke the marbles telemetry path
  [36mvibecrafted resume[0m <agent> [flags]    Resume an existing agent session
  [36mvibecrafted status[0m                    Today's agent activity
  [36mvibecrafted update[0m                     Pull latest + reinstall
  [36mvibecrafted doctor[0m                    Installation health check
  [36mvibecrafted version[0m                   Print version
  [36mvibecrafted uninstall[0m                 Reverse the install

[1m=== ALIASES ===[0m

  [2mstats[0m = status       [2mcheck[0m = doctor       [2mremove[0m = uninstall
  [2mjustdo[0m = Just Do posture (not implement)  [2mvc-justdo[0m = same skill id

[1m=== SKILL FLAGS (uniform contract) ===[0m

  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --count <n>                    Marbles / Polarize loop count (default: 3)
  --depth <n>                    Marbles plan crawl depth (default: 3)
  --session <id>                 Session ID for vibecrafted resume

[1m=== GLOBAL OPTIONS ===[0m

  --verbose                      Detailed output from all commands

[1m=== INFRASTRUCTURE ===[0m

  vibecrafted codex implement .vibecrafted/plans/my-plan.md
  vibecrafted claude research .vibecrafted/plans/my-plan.md
  vibecrafted agy review .vibecrafted/plans/my-plan.md   # (gemini deprecated)
  vibecrafted codex observe --last
  vibecrafted resume claude --session <id> --prompt "Continue the fix"

[1m=== EXAMPLES ===[0m

  vibecrafted init claude
  vibecrafted gui
  vibecrafted tui
  vibecrafted dashboard workflow
  vibecrafted dispatch analyzer-truth.dispatch.toml --doctor
  vibecrafted dispatch run --run-id demo --root . --report report.md --transcript trace.log -- bash worker.sh
  vibecrafted telemetry smoke --count 1 --no-watch
  vibecrafted workflow claude --prompt "Plan and implement auth"
  vibecrafted workflow claude --file /path/to/brief.md
  vibecrafted intents codex --prompt "Audit what from the plan really landed"
  vibecrafted marbles codex --count 3 --depth 3
  vibecrafted implement codex --prompt "Ship the feature"
  vibecrafted ownership codex --prompt "Take the repo from diagnosis to finished surface"
  vibecrafted dou claude
  vibecrafted decorate codex
  vibecrafted hydrate codex
  vibecrafted release codex
  vibecrafted prune codex

```

## 2. vibecrafted help <topic> — per topic

```
### TOPIC: init ###

[38;5;173m⚒[0m  [1minit[0m
[38;5;247m─────────────────────────────────────────[0m
  Start an interactive repository orientation session with an agent.

[1mUsage:[0m
  vibecrafted init [claude|codex|agy|junie|grok]
  vc-init [claude|codex|agy|junie|grok]

[1mExamples:[0m
  vibecrafted init claude
  vc-init codex


----END init----

### TOPIC: resume ###

[38;5;173m⚒[0m  [1mresume[0m
[38;5;247m─────────────────────────────────────────[0m
  Resume a stopped control-plane run, a provider session, or AICX continuity.

[1mUsage:[0m
  vibecrafted resume <claude|codex|agy|junie|grok> --run-id <work-...> [flags]
  vibecrafted <agent> resume --run-id <work-...> | --last [flags]
  vibecrafted resume <claude|codex|agy|junie|grok> --session <provider-uuid> [flags]
  vibecrafted resume <claude|codex|agy|junie|grok> [flags]

[1mAfter stop:[0m
  Stop kills the process group. There is no same-PGID restart.
  --run-id launches a NEW tracked job that continues the stopped work.
  If the run recorded a provider session, that session is resumed natively.
  Do not put VIBECRAFTED_SESSION_ID or work-* into --session.

[1mWithout --run-id / --session:[0m
  Builds a bounded continuity pack from the AICX session chain.
  A bare resume stays interactive; the AICX pack is continuity transport,
  not operator job text and not a native attach. Never resumes the last
  same-agent match. Native provider resume requires --session <id>.
  --root / a project filter narrows AICX; it does not pick an id.
  The session catalog in the pack is evidence, not a swipe list.
  Explicit --prompt/--file without --session starts a new tracked
  headless job and does not adopt a historical session.
  Override window: VIBECRAFTED_RESUME_AICX_HOURS=72

[1mExamples:[0m
  vibecrafted resume claude --run-id work-260816-213657-08420
  vibecrafted claude resume --run-id work-260816-213657-08420 --prompt "continue"
  vibecrafted claude resume --last
  vibecrafted resume claude --session abc123
  vibecrafted resume codex --session abc123 --prompt "Continue from the failing test"
  vibecrafted resume grok
  vibecrafted resume codex --prompt "pick up where the fleet left off"


[1mResume flags:[0m
  --run-id <work-...>            Continue a stopped/failed control-plane run
  --last                         Resume the most recent run for this agent
  --session <id>                 Provider session UUID (not work-* / VIBECRAFTED_SESSION_ID)
  -p, --prompt <text>            Continue with extra prompt text
  -f, --file <path.md>           Continue with prompt context from file
  --fork-session                 Branch into a NEW session id, base untouched (claude only)
  (no --session/--run-id)        AICX 48h multi-agent continuity fallback


----END resume----

### TOPIC: resume-session ###

----END resume-session----

### TOPIC: status ###

[38;5;173m⚒[0m  [1mstatus[0m
[38;5;247m─────────────────────────────────────────[0m
  Show recent agent activity from today.

[1mUsage:[0m
  vibecrafted status
  vibecrafted stats


----END status----

### TOPIC: doctor ###

[38;5;173m⚒[0m  [1mdoctor[0m
[38;5;247m─────────────────────────────────────────[0m
  Verify installation health using the framework doctor gate.

[1mUsage:[0m
  vibecrafted doctor
  vibecrafted doctor --fix-server-service
  vibecrafted check


----END doctor----

### TOPIC: receipt ###

----END receipt----

### TOPIC: settlements ###

----END settlements----

### TOPIC: update ###

[38;5;173m⚒[0m  [1mupdate[0m
[38;5;247m─────────────────────────────────────────[0m
  Pull the latest framework release and reinstall the local command deck.

[1mUsage:[0m
  vibecrafted update [--force] [--ref <channel>]
  vibecrafted upgrade [--force] [--ref <channel>]


----END update----

### TOPIC: scaffold ###
⚒  scaffold
─────────────────────────────────────────
  version 0.2.0 · READ · input required
  Founder-first architecture planning from a vague idea to one executable plan.

Usage:
  vibecrafted scaffold <claude|codex|agy|junie|grok> [flags]
  vc-scaffold <claude|codex|agy|junie|grok> [flags]

Flow:
  capture native-language intent → form the thesis → define evidence obligations → write one implementation plan

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted scaffold codex --prompt "Shape this product idea"
  vc-scaffold claude --file /path/to/idea.md

----END scaffold----

### TOPIC: implement ###
⚒  implement
─────────────────────────────────────────
  version 2.2.0 · WRITE · input required
  VC-ship WRITE stage: structured end-to-end implementation with followup and marbles built in.

Usage:
  vibecrafted implement <claude|codex|agy|junie|grok> [flags]
  vc-implement <claude|codex|agy|junie|grok> [flags]

  Ship-cycle stage (lifecycle_order=20). Not the same skill as justdo.
  Launcher: vibecrafted implement <claude|codex|agy|junie|grok> [flags] / vc-implement <claude|codex|agy|junie|grok> [flags]

Flow:
  vc-init and target the runtime owner → implement the complete cut → verify the real path → run followup and converge if needed

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted implement codex --prompt "Ship the feature"
  vc-implement claude --file /path/to/brief.md

----END implement----

### TOPIC: review ###
⚒  review
─────────────────────────────────────────
  version 2.0.0 · READ · input required
  Bounded PR, branch, commit-range, or artifact-pack review with findings-first output.

Usage:
  vibecrafted review <claude|codex|agy|junie|grok> [flags]
  vc-review <claude|codex|agy|junie|grok> [flags]

Flow:
  map the bounded change → generate review evidence → falsify behavior and assumptions → report findings before summary

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted review codex --prompt "Review PR #14"
  vc-review claude --file /path/to/review-scope.md

----END review----

### TOPIC: workflow ###
⚒  workflow
─────────────────────────────────────────
  version 3.6.0 · WRITE · input required
  Examine → Research → Implement pipeline for repo-impacting work.

Usage:
  vibecrafted workflow <claude|codex|agy|junie|grok> [flags]
  vc-workflow <claude|codex|agy|junie|grok> [flags]

Flow:
  examine with vc-init and Loctree → research only where evidence is missing → implement the complete cut → verify and report

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted workflow codex --prompt "Examine and implement the fix"
  vc-workflow claude --file /path/to/brief.md

----END workflow----

### TOPIC: followup ###
⚒  followup
─────────────────────────────────────────
  version 2.2.0 · READ · input required
  Post-implementation direction audit for gaps, drift, regressions, and next leverage.

Usage:
  vibecrafted followup <claude|codex|agy|junie|grok> [flags]
  vc-followup <claude|codex|agy|junie|grok> [flags]

Flow:
  recover the implementation baseline → audit trajectory and runtime truth → name remaining gaps → choose the next highest-leverage move

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted followup codex --prompt "Audit post-implementation direction"
  vc-followup claude --file /path/to/brief.md

----END followup----

### TOPIC: marbles ###
⚒  marbles
─────────────────────────────────────────
  version 7.0.0 · WRITE · input optional
  Counterexample-guided convergence that keeps fixing what is still wrong.

Usage:
  vibecrafted marbles <claude|codex|agy|junie|grok> [flags]
  vc-marbles <claude|codex|agy|junie|grok> [flags]
  vibecrafted marbles <pause|stop|resume|session|inspect|delete> [args]
  vc-marbles <pause|stop|resume|session|inspect|delete> [args]
  vibecrafted marbles gc [args] / vc-marbles gc [args]

  Runtime shape: one dedicated orchestrator tab; --count N runs sequential L1…LN rounds inside it; no per-round child tabs.
  Controls: pause, stop, resume, session, inspect, delete, gc.

Flow:
  map the remaining cracks → L1 fix and verify → L2…LN repeat against new evidence → settle only when the surface holds

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --count <n>                    Sequential convergence rounds
  --depth <n>                    Plan crawl depth
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted marbles codex --count 3 --depth 3
  vc-marbles claude --prompt "Loop until clean"
  vc-marbles resume marb-134707

----END marbles----

### TOPIC: audit ###
⚒  audit
─────────────────────────────────────────
  version 1.0.0 · READ · input required
  READ-ONLY falsification of a completed plan or multi-task implementation.

Usage:
  vibecrafted audit <claude|codex|agy|junie|grok> [flags]
  vc-audit <claude|codex|agy|junie|grok> [flags]

Flow:
  recover the claimed scope → build a requirements matrix → prove or refute every claim → issue a findings-first verdict

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted audit codex --prompt "Verify this completed plan against runtime truth"
  vc-audit claude --file /path/to/completed-plan.md

----END audit----

### TOPIC: polarize ###
⚒  polarize
─────────────────────────────────────────
  version 2.0.0 · WRITE · input optional
  Post-marbles simplification that strips excess back to one defensible truth.

Usage:
  vibecrafted polarize <claude|codex|agy|junie|grok> [flags]
  vc-polarize <claude|codex|agy|junie|grok> [flags]

Flow:
  run the prism preflight → name competing truths → choose one product contract → align code, docs, and regression proof

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --count <n>                    Loop count
  --depth <n>                    Plan crawl depth
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted polarize codex --prompt "Choose one launch thesis after marbles"
  vc-polarize claude --file /path/to/marbles-report.md

----END polarize----

### TOPIC: dou ###
⚒  dou
─────────────────────────────────────────
  version 2.1.0 · READ · input required
  Definition of Undone audit across the entire product surface.

Usage:
  vibecrafted dou <claude|codex|agy|junie|grok> [flags]
  vc-dou <claude|codex|agy|junie|grok> [flags]

Flow:
  crawl the buyer-visible surface → test install, trust, onboarding, and conversion → collect unfinished gaps → return an honest undone verdict

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted dou codex --prompt "Audit launch readiness"
  vc-dou claude --file /path/to/product-scope.md

----END dou----

### TOPIC: hydrate ###
⚒  hydrate
─────────────────────────────────────────
  version 1.0.0 · WRITE · input required
  Packaging and go-to-market hydration from audit findings to a usable product.

Usage:
  vibecrafted hydrate <claude|codex|agy|junie|grok> [flags]
  vc-hydrate <claude|codex|agy|junie|grok> [flags]

Flow:
  ingest DoU findings → repair packaging, docs, and onboarding → complete the go-to-market surface → verify the user path

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted hydrate codex --prompt "Package this for first users"
  vc-hydrate claude --file /path/to/dou-report.md

----END hydrate----

### TOPIC: release ###
⚒  release
─────────────────────────────────────────
  version 0.2.1 · WRITE · input required
  Final outward ship stage: safe, visible, deployable, discoverable, and reversible.

Usage:
  vibecrafted release <claude|codex|agy|junie|grok> [flags]
  vc-release <claude|codex|agy|junie|grok> [flags]

Flow:
  prove repo and runtime readiness → build and sign release artifacts → publish or deploy → verify and preserve rollback truth

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted release codex --prompt "Prepare the release"
  vc-release claude --file /path/to/release-brief.md

----END release----

### TOPIC: decorate ###
⚒  decorate
─────────────────────────────────────────
  version 2.1.0 · WRITE · input required
  Late-stage visual finishing and experience-coherence pass.

Usage:
  vibecrafted decorate <claude|codex|agy|junie|grok> [flags]
  vc-decorate <claude|codex|agy|junie|grok> [flags]

Flow:
  detect the existing design language → audit system consistency → finish the visible surface → verify the real experience

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted decorate codex --prompt "Polish the release surface"
  vc-decorate claude --file /path/to/ui-brief.md

----END decorate----

### TOPIC: gui ###

[38;5;173m⚒[0m  [1mgui[0m
[38;5;247m─────────────────────────────────────────[0m
  Launch the localhost-only Python control plane.

[1mUsage:[0m
  vibecrafted gui [--source <path>] [--host <host>] [--port <port>] [--no-open]

[1mFlags:[0m
  --source <path>                 Framework source directory to stage from
  --host <host>                   Host to bind (default: 127.0.0.1)
  --port <port>                   Port to bind (default: 0, ephemeral)
  --no-open                       Do not open a browser tab
  --bundle-dir <path>             Optional pre-built site bundle

[1mExamples:[0m
  vibecrafted gui
  vibecrafted gui --no-open --port 4173


----END gui----

### TOPIC: tui ###

[38;5;173m⚒[0m  [1mtui[0m  (product binary: [1mvoc[0m)
[38;5;247m─────────────────────────────────────────[0m
  Launch Voc Agent — the Rust terminal cockpit over shared control-plane state.
  Installed by "make install-app-binaries" / "make install" as ~/.local/bin/voc.

[1mUsage:[0m
  vibecrafted tui [voc flags...]
  voc [flags...]
  vibecrafted tui [--state-root <dir>] [--deck <path>] [--root <path>] [--runtime <headless|terminal|visible>] [--tick-ms <ms>]

[1mExamples:[0m
  vibecrafted tui
  voc --runtime headless
  vibecrafted tui --tick-ms 500


----END tui----

### TOPIC: dashboard ###

[38;5;173m⚒[0m  [1mdashboard[0m
[38;5;247m─────────────────────────────────────────[0m
  Thin shim over native vc-frame for operator session management.

[1mUsage:[0m
  vibecrafted dashboard [layout]          Open/switch to a dashboard layout
  vibecrafted dashboard ls                List active vc-frame sessions
  vibecrafted dashboard switch <name>     Switch session (inside vc-frame) or attach (outside)
  vibecrafted dashboard attach <name>     Attach to a session from outside vc-frame
  vibecrafted dashboard kill <name>       Kill a vc-frame session
  vibecrafted dashboard gc [flags]        Prune dead sessions and optionally stale detached ones

[1mLayouts:[0m  dashboard (default), marbles, workflow, research, operator

[1mExamples:[0m
  vibecrafted dashboard                   # default dashboard
  vibecrafted dashboard ls                # list sessions
  vibecrafted dashboard gc --apply        # prune dead EXITED sessions
  vibecrafted dashboard marbles           # marbles layout
  vibecrafted dashboard switch my-session  # switch/attach


----END dashboard----

### TOPIC: loop ###

[38;5;173m⚒[0m  [1mloop[0m
[38;5;247m─────────────────────────────────────────[0m
  Interactive Agent-Operator continuation plus async worker await chaining.

[1mUsage:[0m
  vibecrafted loop start --prompt "Conduct this dispatch to stop point"
  vibecrafted loop start --file /path/to/master-dispatch.md --completion-promise READY
  vibecrafted loop next
  vibecrafted loop complete --promise READY
  vibecrafted loop await-run --run-id wflw-123456-789 --then-cmd 'vibecrafted workflow codex --file next.md'
  vc-loop status

[1mState:[0m
  Default state file: <repo-root>/.vibecrafted/operator-loop.local.md
  Local state is ignored by git via /.vibecrafted.

[1mSafety:[0m
  --then-cmd is an Operator-approved argv command executed after a successful await.
  Do not use it for push/deploy/publish unless the active plan explicitly says so.

[1mWhy:[0m
  The front door stays small; the runtime script owns state, iteration,
  completion promises, and background await chains for operator sessions.


----END loop----

### TOPIC: cron ###

[38;5;173m⚒[0m  [1mcron[0m
[38;5;247m─────────────────────────────────────────[0m
  Cron-safe LOOP heartbeat backed by Vibecrafted Core.
  Captures Loctree + AICX context and can resume an operator-approved next command after an idle window.

[1mUsage:[0m
  vibecrafted cron tick [--root <repo>] [--after-idle-minutes 10] [--then-cmd <cmd>]
  vibecrafted cron line [--root <repo>] [--every-minutes 10] [--then-cmd <cmd>]
  vc-cron tick --root /path/to/repo --no-context

[1mReal crontab line:[0m
  vibecrafted cron line --root /path/to/repo --every-minutes 10 --then-cmd 'vibecrafted loop next'

[1mSafety:[0m
  tick refuses hard-stop commands such as push, deploy, publish, release, reset, checkout --, and rm -rf.
  Runtime shell is only a wrapper; implementation lives in vibecrafted-core.


----END cron----

### TOPIC: ship ###

----END ship----

### TOPIC: dispatch ###

[38;5;173m⚒[0m  [1mdispatch[0m
[38;5;247m─────────────────────────────────────────[0m
  Run a vibecrafted.dispatch.v1 TOML plan through the deterministic supervisor.
  Also preserves dispatch run for one-worker async lifecycle supervision.
  dispatch run owns process spawn, transcript capture, artifact validation, and exit status.

[1mUsage:[0m
  vibecrafted dispatch <plan.dispatch.toml> [--doctor|--dry-run|--json|--resume <run-id>]
  vibecrafted dispatch run --run-id <id> --root <path> --report <path> --transcript <path> -- <command> [args]

[1mExamples:[0m
  vibecrafted dispatch analyzer-truth.dispatch.toml --doctor
  vibecrafted dispatch analyzer-truth.dispatch.toml --dry-run --json
  vibecrafted dispatch run --run-id demo --root . --report .vibecrafted/report.md --transcript .vibecrafted/trace.log --json -- bash worker.sh

[1mContract:[0m
  --doctor validates only and exits non-zero on dispatch-doctor errors.
  --dry-run renders every worker prompt under reports_dir/dry-run without launching.
  Full dispatch writes tracker.md, journal.md, handoff.md, and dispatch-result.json.
  Exit code is the worker exit code when the worker fails.
  Exit code 2 means the worker exited cleanly but the artifact contract failed.


----END dispatch----

### TOPIC: server ###

[38;5;173m⚒[0m  [1mserver[0m
[38;5;247m─────────────────────────────────────────[0m
  Manage the local control-plane viewer server and its process guardian.
  Persistent service management is macOS launchd-only in this release.

[1mUsage:[0m
  vibecrafted server [start|stop|status|open|doctor] [options]
  vibecrafted server service [install|start|stop|status|uninstall] [options]

[1mOptions:[0m
  --port, -p <port>  Specify the port (default: 3024)
  --host, -h <host>  Specify the host (default: 127.0.0.1)

[1mExamples:[0m
  vibecrafted server start --port 3024
  vibecrafted server service install --port 3024
  vibecrafted server service start
  vibecrafted server status
  vibecrafted server service stop


----END server----

### TOPIC: telemetry ###

[38;5;173m⚒[0m  [1mtelemetry[0m
[38;5;247m─────────────────────────────────────────[0m
  Smoke the marbles telemetry path through the installed command deck.

[1mUsage:[0m
  telemetry smoke [--agent <claude|codex|agy|junie|grok>] [--count <n>] [--root <path>] [--no-watch|--watch]
  vibecrafted telemetry smoke [--agent <claude|codex|agy|junie|grok>] [--count <n>] [--root <path>] [--no-watch|--watch]

[1mExamples:[0m
  telemetry smoke --count 1 --no-watch
  telemetry smoke --agent claude --count 2 --watch


----END telemetry----

### TOPIC: uninstall ###

[38;5;173m⚒[0m  [1muninstall[0m
[38;5;247m─────────────────────────────────────────[0m
  Reverse the local Vibecrafted install.

[1mUsage:[0m
  vibecrafted uninstall
  vibecrafted remove


----END uninstall----

### TOPIC: version ###

[38;5;173m⚒[0m  [1mversion[0m
[38;5;247m─────────────────────────────────────────[0m
  Print the installed Vibecrafted version.

[1mUsage:[0m
  vibecrafted version
  vibecrafted --version


----END version----

### TOPIC: agents ###

[1mVibecrafted agent helpers[0m
  Use [36mvibecrafted <agent> implement|research|review|plan|resume[0m for plan-based helper flows.
  Example: vibecrafted codex implement .vibecrafted/plans/my-plan.md


----END agents----

### TOPIC: intents ###
⚒  intents
─────────────────────────────────────────
  version 1.0.1 · READ · input required
  Plan-to-runtime truth audit across prior intent and present repository state.

Usage:
  vibecrafted intents <claude|codex|agy|junie|grok> [flags]
  vc-intents <claude|codex|agy|junie|grok> [flags]

Flow:
  recover planned intentions → map current runtime ownership → compare intent with landed code → classify truth, drift, and missing work

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted intents codex --prompt "Which planned changes actually landed?"
  vc-intents claude --file /path/to/plan.md

----END intents----

### TOPIC: partner ###
⚒  partner
─────────────────────────────────────────
  version 3.0.0-dev · META · input required
  Collaborative debugging, architecture triage, and shared steering with the operator.

Usage:
  vibecrafted partner <claude|codex|agy|junie|grok> [flags]
  vc-partner <claude|codex|agy|junie|grok> [flags]

Flow:
  map the live problem → surface competing shapes → steer the decision together → carry the chosen cut forward

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted partner codex --prompt "Help me choose the right architecture"
  vc-partner claude --file /path/to/context.md

----END partner----

### TOPIC: ownership ###
⚒  ownership
─────────────────────────────────────────
  version 1.1.0 · WRITE · input required
  Full-spectrum operational ownership across code, runtime, docs, packaging, and ship surface.

Usage:
  vibecrafted ownership <claude|codex|agy|junie|grok> [flags]
  vc-ownership <claude|codex|agy|junie|grok> [flags]

Flow:
  take the product baseline → choose the target architecture → drive implementation and stabilization → finish the outward ship surface

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted ownership codex --prompt "Take this product from A to Z"
  vc-ownership claude --file /path/to/product-brief.md

----END ownership----

### TOPIC: delegate ###
⚒  delegate
─────────────────────────────────────────
  version 2.0.0 · WRITE · input required
  Native in-session delegation for small, bounded implementation cuts.

Usage:
  vibecrafted delegate <claude|codex|agy|junie|grok> [flags]
  vc-delegate <claude|codex|agy|junie|grok> [flags]

Flow:
  capture the baseline → cut independent ownership → delegate with an exact handoff → integrate and verify

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted delegate codex --prompt "Split these independent fixes"
  vc-delegate claude --file /path/to/delegation-brief.md

----END delegate----

### TOPIC: research ###
⚒  research
─────────────────────────────────────────
  version 1.3.0 · READ · input required
  Multi-agent research pass for ground truth before implementation.

Usage:
  vibecrafted research [agents...] [flags]
  vibecrafted research <uno|duo|trio> <agents...> [flags]
  vibecrafted swarm [agents...] [flags]  # alias for research
  vc-research [agents...] [flags]

  uno|duo|trio declare an exact lane count and require that many agents.

Flow:
  co-define the question → gather independent evidence → compare disagreement → synthesize one decision-ready report

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --synthesizer <agent>         Synthesis agent override
  --synthesizer-model <name>    Synthesis model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted research --prompt "Find the strongest runtime design"
  vc-research codex agy --file /path/to/research-plan.md
  vibecrafted research trio claude codex agy --prompt "Compare independent evidence"

----END research----

### TOPIC: prune ###
⚒  prune
─────────────────────────────────────────
  version 3.3.3 · READ · input optional with default
  Runtime and publish-cone cleanup with hard cuts and proof.

Usage:
  vibecrafted prune <claude|codex|agy|junie|grok> [flags]
  vc-prune <claude|codex|agy|junie|grok> [flags]

Flow:
  map runtime participation → separate live truth from parked surfaces → remove only proven dead weight → verify install and publish cones

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted prune codex --prompt "Remove proven dead runtime surfaces"
  vc-prune claude --file /path/to/prune-scope.md

----END prune----

### TOPIC: trust ###
⚒  trust
─────────────────────────────────────────
  version 1.0.0 · READ · input required
  READ-only post-hoc falsification of commit claims on the Living Tree.

Usage:
  vibecrafted trust <claude|codex|agy|junie|grok> [flags]
  vc-trust <claude|codex|agy|junie|grok> [flags]

  await mode is named await-primary; completion never implies pass
  agent fairness (Authored-By vs subject agent) is a first-class claim axis
  vc-guard enforces at the gate; trust never blocks dispatch

Flow:
  bound the commit stream and recover intent → turn commit prose into falsifiable claims (incl. agent fairness) → attack each claim with direct evidence → append pass, pass-with-gaps, or block and project f/x/n

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted trust codex --prompt "Judge the commits from this run"
  vc-trust claude --file /path/to/trust-brief.md
  python -m vibecrafted_core.trust inspect <sha>

----END trust----

### TOPIC: guard ###
⚒  guard
─────────────────────────────────────────
  version 1.0.0 · READ · input required
  In-flight enforcer: inventory gates and refuse continuation on trust block.

Usage:
  vibecrafted guard <claude|codex|agy|junie|grok> [flags]
  vc-guard <claude|codex|agy|junie|grok> [flags]

  trust judges after the fact; guard enforces at the gate
  commit-msg enforces message shape, not truth
  settlement f/x/n is written only by trust note

Flow:
  inventory existing commit/push/dispatch gates and coverage gaps → consume trust journal block on HEAD (never invent settlement letters) → refuse dispatch/continuation with mandatory remedium → keep fail-closed, non-interactive-safe doctrine

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  python -m vibecrafted_core.guard inventory
  python -m vibecrafted_core.guard check
  vibecrafted guard claude --prompt "Audit gate inventory"

----END guard----

### TOPIC: justdo ###
⚒  justdo
─────────────────────────────────────────
  version 3.1.0 · WRITE · input required
  Standalone Just Do posture: take the task, no ceremony, no best-of-n — type defined by the prompt.

Usage:
  vibecrafted justdo <claude|codex|agy|junie|grok> [flags]
  vc-justdo <claude|codex|agy|junie|grok> [flags]

  Non-pipeline escape hatch (ADR-0001). Not a VC-ship stage. Not implement.
  Launcher: vibecrafted justdo <claude|codex|agy|junie|grok> [flags] / vc-justdo <claude|codex|agy|junie|grok> [flags]

Flow:
  vc-init (orientation without interrogation) → infer the task type from the prompt → act under ownership posture → prove done (walk-around / DoU), do not claim on words alone

Options:
  -p, --prompt <text>            Inline prompt
  -f, --file <path.md>           Input file as prompt context
  --prompt-stdin                 Read prompt from stdin; no argv/temp copy
  --runtime <terminal|headless>  Worker surface (default: headless)
  --root <path>                  Repository root
  --model <name>                 Agent model override
  --json                          Machine-readable launch receipt

Examples:
  vibecrafted justdo codex --prompt "Review the last five commits for X"
  vc-justdo claude --file /path/to/brief.md

----END justdo----

=== vibecrafted settlements --help ===

[38;5;173m⚒[0m  "settlements" is not in the command deck.
  Try [36mvibecrafted help[0m for the current surface.


=== vibecrafted resume-session --help ===

[38;5;173m⚒[0m  "resume-session" is not in the command deck.
  Try [36mvibecrafted help[0m for the current surface.


```

## 3. vibecrafted <agent> --help (agent mode help)

```
### AGENT HELP: claude ###

[38;5;173m⚒[0m  [1mclaude[0m
[38;5;247m─────────────────────────────────────────[0m
  Plan-based helper modes for claude.

[1mUsage:[0m
  vibecrafted claude <implement|research|review|plan|prompt|observe|await|stop|resume> [args]

[1mModes:[0m
  implement <plan.md>            Execute a plan file
  research  <plan.md>            Research a topic or plan file
  review    <plan.md>            Review a bounded PR, branch, commit range, or artifact pack
  plan      <plan.md>            Generate an implementation plan
  prompt    <plan.md>            Free-form prompt with plan context
  observe   --last|--run-id      Check the last report or transcript
  await     --last|--run-id      Wait for metadata completion + summary
  stop      --run-id|--last      TERM the launcher process group and mark stopped
  resume    --run-id|--last      Continue a stopped run as a new tracked job

[1mExamples:[0m
  vibecrafted claude implement .vibecrafted/plans/my-plan.md
  vibecrafted claude research .vibecrafted/plans/my-plan.md
  vibecrafted claude observe --last
  vibecrafted claude await --last
  vibecrafted claude stop --run-id <id>
  vibecrafted claude stop --last
  vibecrafted claude resume --run-id <id>
  vibecrafted claude resume --last


### AGENT HELP: codex ###

[38;5;173m⚒[0m  [1mcodex[0m
[38;5;247m─────────────────────────────────────────[0m
  Plan-based helper modes for codex.

[1mUsage:[0m
  vibecrafted codex <implement|research|review|plan|prompt|observe|await|stop|resume> [args]

[1mModes:[0m
  implement <plan.md>            Execute a plan file
  research  <plan.md>            Research a topic or plan file
  review    <plan.md>            Review a bounded PR, branch, commit range, or artifact pack
  plan      <plan.md>            Generate an implementation plan
  prompt    <plan.md>            Free-form prompt with plan context
  observe   --last|--run-id      Check the last report or transcript
  await     --last|--run-id      Wait for metadata completion + summary
  stop      --run-id|--last      TERM the launcher process group and mark stopped
  resume    --run-id|--last      Continue a stopped run as a new tracked job

[1mExamples:[0m
  vibecrafted codex implement .vibecrafted/plans/my-plan.md
  vibecrafted codex research .vibecrafted/plans/my-plan.md
  vibecrafted codex observe --last
  vibecrafted codex await --last
  vibecrafted codex stop --run-id <id>
  vibecrafted codex stop --last
  vibecrafted codex resume --run-id <id>
  vibecrafted codex resume --last


### AGENT HELP: agy ###

[38;5;173m⚒[0m  [1magy[0m
[38;5;247m─────────────────────────────────────────[0m
  Plan-based helper modes for agy.

[1mUsage:[0m
  vibecrafted agy <implement|research|review|plan|prompt|observe|await|stop|resume> [args]

[1mModes:[0m
  implement <plan.md>            Execute a plan file
  research  <plan.md>            Research a topic or plan file
  review    <plan.md>            Review a bounded PR, branch, commit range, or artifact pack
  plan      <plan.md>            Generate an implementation plan
  prompt    <plan.md>            Free-form prompt with plan context
  observe   --last|--run-id      Check the last report or transcript
  await     --last|--run-id      Wait for metadata completion + summary
  stop      --run-id|--last      TERM the launcher process group and mark stopped
  resume    --run-id|--last      Continue a stopped run as a new tracked job

[1mExamples:[0m
  vibecrafted agy implement .vibecrafted/plans/my-plan.md
  vibecrafted agy research .vibecrafted/plans/my-plan.md
  vibecrafted agy observe --last
  vibecrafted agy await --last
  vibecrafted agy stop --run-id <id>
  vibecrafted agy stop --last
  vibecrafted agy resume --run-id <id>
  vibecrafted agy resume --last


### AGENT HELP: junie ###

[38;5;173m⚒[0m  [1mjunie[0m
[38;5;247m─────────────────────────────────────────[0m
  Plan-based helper modes for junie.

[1mUsage:[0m
  vibecrafted junie <implement|research|review|plan|prompt|observe|await|stop|resume> [args]

[1mModes:[0m
  implement <plan.md>            Execute a plan file
  research  <plan.md>            Research a topic or plan file
  review    <plan.md>            Review a bounded PR, branch, commit range, or artifact pack
  plan      <plan.md>            Generate an implementation plan
  prompt    <plan.md>            Free-form prompt with plan context
  observe   --last|--run-id      Check the last report or transcript
  await     --last|--run-id      Wait for metadata completion + summary
  stop      --run-id|--last      TERM the launcher process group and mark stopped
  resume    --run-id|--last      Continue a stopped run as a new tracked job

[1mExamples:[0m
  vibecrafted junie implement .vibecrafted/plans/my-plan.md
  vibecrafted junie research .vibecrafted/plans/my-plan.md
  vibecrafted junie observe --last
  vibecrafted junie await --last
  vibecrafted junie stop --run-id <id>
  vibecrafted junie stop --last
  vibecrafted junie resume --run-id <id>
  vibecrafted junie resume --last


### AGENT HELP: grok ###

[38;5;173m⚒[0m  [1mgrok[0m
[38;5;247m─────────────────────────────────────────[0m
  Plan-based helper modes for grok.

[1mUsage:[0m
  vibecrafted grok <implement|research|review|plan|prompt|observe|await|stop|resume> [args]

[1mModes:[0m
  implement <plan.md>            Execute a plan file
  research  <plan.md>            Research a topic or plan file
  review    <plan.md>            Review a bounded PR, branch, commit range, or artifact pack
  plan      <plan.md>            Generate an implementation plan
  prompt    <plan.md>            Free-form prompt with plan context
  observe   --last|--run-id      Check the last report or transcript
  await     --last|--run-id      Wait for metadata completion + summary
  stop      --run-id|--last      TERM the launcher process group and mark stopped
  resume    --run-id|--last      Continue a stopped run as a new tracked job

[1mExamples:[0m
  vibecrafted grok implement .vibecrafted/plans/my-plan.md
  vibecrafted grok research .vibecrafted/plans/my-plan.md
  vibecrafted grok observe --last
  vibecrafted grok await --last
  vibecrafted grok stop --run-id <id>
  vibecrafted grok stop --last
  vibecrafted grok resume --run-id <id>
  vibecrafted grok resume --last


### AGENT HELP: gemini ###

[38;5;173m⚒[0m  [1mgemini[0m
[38;5;247m─────────────────────────────────────────[0m
  Plan-based helper modes for gemini.

[1mUsage:[0m
  vibecrafted gemini <implement|research|review|plan|prompt|observe|await|stop|resume> [args]

[1mModes:[0m
  implement <plan.md>            Execute a plan file
  research  <plan.md>            Research a topic or plan file
  review    <plan.md>            Review a bounded PR, branch, commit range, or artifact pack
  plan      <plan.md>            Generate an implementation plan
  prompt    <plan.md>            Free-form prompt with plan context
  observe   --last|--run-id      Check the last report or transcript
  await     --last|--run-id      Wait for metadata completion + summary
  stop      --run-id|--last      TERM the launcher process group and mark stopped
  resume    --run-id|--last      Continue a stopped run as a new tracked job

[1mExamples:[0m
  vibecrafted gemini implement .vibecrafted/plans/my-plan.md
  vibecrafted gemini research .vibecrafted/plans/my-plan.md
  vibecrafted gemini observe --last
  vibecrafted gemini await --last
  vibecrafted gemini stop --run-id <id>
  vibecrafted gemini stop --last
  vibecrafted gemini resume --run-id <id>
  vibecrafted gemini resume --last


```

## 4. Source: canonical dispatch (case "$cmd" in ... esac), line 5543-5591 of deck/vibecrafted

```bash
case "$cmd" in
  help|-h|--help) cmd_help "$@" ;;
  start) cmd_start "$@" ;;
  init) cmd_init "$@" ;;
  resume) cmd_resume "$@" ;;
  gui) cmd_gui "$@" ;;
  server) cmd_server "$@" ;;
  tui) cmd_tui "$@" ;;
  doctor|check) cmd_doctor "$@" ;;
  receipt) cmd_receipt "$@" ;;
  workspace) cmd_workspace "$@" ;;
  scaffold-doctor) cmd_scaffold_doctor "$@" ;;
  dashboard|mc|mission-control|sessions) cmd_dashboard "$@" ;;
  loop) cmd_loop "$@" ;;
  cron) cmd_cron "$@" ;;
  ship) cmd_ship "$@" ;;
  dispatch|dispatcher) cmd_dispatch "$@" ;;
  telemetry) cmd_telemetry "$@" ;;
  stats|status) cmd_stats "$@" ;;
  update|upgrade) cmd_update "$@" ;;
  uninstall|remove) cmd_uninstall "$@" ;;
  version|--version|-v) printf 'vibecrafted %s\n' "$(_version)" ;;
  agents) cmd_agents "$@" ;;
  swarm) cmd_swarm "$@" ;;
  claude|codex|gemini|agy|junie|grok)
    local mode="${1:-}"
    if _is_help_flag "$mode"; then
      cmd_agent_help "$cmd"
      return 0
    fi
    [[ -n "$mode" ]] || {
      cmd_agent_help "$cmd" >&2
      return 1
    }
    shift || true
    _has_mode "$mode" || {
      printf '%b✗%b Unknown mode: %s\n' "$_red" "$_reset" "$mode" >&2
      return 1
    }
    run_mode "$cmd" "$mode" "$@"
    ;;
  implement) run_skill "implement" "$@" ;;
  audit|canary|decorate|delegate|dou|followup|guard|hydrate|intents|justdo|marbles|ownership|partner|polarize|prune|release|research|review|scaffold|trust|workflow)
    run_skill "$cmd" "$@"
    ;;
  *)
    cmd_unknown "$cmd"
    return 1
    ;;
esac
```

Notable aliases embedded in the case arms: `start`≠alias of dashboard (separate cmd_start), `doctor`=`check`, `stats`=`status`, `update`=`upgrade`, `uninstall`=`remove`, `dashboard`=`mc`=`mission-control`=`sessions`, `dispatch`=`dispatcher`.

Other alias arrays found in source (line ~90-92): `_agents=(claude codex agy junie grok)`, `_modes=(implement research review plan prompt observe await stop resume)`, `_skills=(audit canary decorate delegate dou followup guard hydrate implement intents justdo marbles ownership partner polarize prune release research review scaffold trust workflow)`.

### cmd__*help function inventory (grep '^cmd*.__help\|^cmd_help')

```
646:cmd_skill_help() {
749:cmd_agent_help() {
782:cmd_start_help() {
805:cmd_dashboard_help() {
830:cmd_loop_help() {
858:cmd_cron_help() {
879:cmd_dispatch_help() {
904:cmd_gui_help() {
926:cmd_tui_help() {
945:cmd_resume_help() {
987:cmd_init_help() {
1003:cmd_status_help() {
1015:cmd_doctor_help() {
1029:cmd_update_help() {
1041:cmd_uninstall_help() {
1053:cmd_version_help() {
1065:cmd_server_help() {
1090:cmd_telemetry_help() {
4109:cmd_help() {
4250:cmd_help_full() {
```

**IMPORTANT DISCREPANCY**: `vibecrafted help` / `help --all` text advertises `resume-session`, `settlements`, and (in the compact deck) `receipt`/`settlements` as top-level commands. Verified against the case dispatch and by direct invocation:

- `receipt` — REAL, wired to `cmd_receipt` (delegates to `vibecrafted_core.runtime_receipt.receipt_main`).
- `resume-session` — NOT wired. `vibecrafted resume-session --help` returns "is not in the command deck".
- `settlements` — NOT wired. `vibecrafted settlements --help` returns "is not in the command deck".
  These two are stale/aspirational text in the compact help deck (cmd_help), not live surfaces.

```
=== vibecrafted settlements --help ===

[38;5;173m⚒[0m  "settlements" is not in the command deck.
  Try [36mvibecrafted help[0m for the current surface.


=== vibecrafted resume-session --help ===

[38;5;173m⚒[0m  "resume-session" is not in the command deck.
  Try [36mvibecrafted help[0m for the current surface.


```

## 5. Installed launchers (~/.local/bin) — content dump

```
### FILE: vc-admin ###
TYPE: Mach-O 64-bit executable arm64
(binary — content skipped)

----END vc-admin----

### FILE: vc-agents ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-agents' "$@"

----END vc-agents----

### FILE: vc-audit ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-audit' "$@"

----END vc-audit----

### FILE: vc-cron ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-cron' "$@"

----END vc-cron----

### FILE: vc-dashboard ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' dashboard "$@"

----END vc-dashboard----

### FILE: vc-dashboard ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' dashboard "$@"

----END vc-dashboard----

### FILE: dashboard ###
MISSING

----END dashboard----

### FILE: vc-decorate ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-decorate' "$@"

----END vc-decorate----

### FILE: vc-delegate ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-delegate' "$@"

----END vc-delegate----

### FILE: vc-dispatch ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' dispatch "$@"

----END vc-dispatch----

### FILE: vc-dispatch ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' dispatch "$@"

----END vc-dispatch----

### FILE: dispatch ###
MISSING

----END dispatch----

### FILE: vc-dou ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-dou' "$@"

----END vc-dou----

### FILE: vc-followup ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-followup' "$@"

----END vc-followup----

### FILE: vc-frame ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame' "$@"

----END vc-frame----

### FILE: vc-git ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-git' "$@"

----END vc-git----

### FILE: vc-guard ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-guard' "$@"

----END vc-guard----

### FILE: vc-guardian ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-guardian' "$@"

----END vc-guardian----

### FILE: vc-help ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' help "$@"

----END vc-help----

### FILE: vc-help ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' help "$@"

----END vc-help----

### FILE: help ###
MISSING

----END help----

### FILE: vc-hydrate ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-hydrate' "$@"

----END vc-hydrate----

### FILE: vc-implement ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-implement' "$@"

----END vc-implement----

### FILE: vc-init ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' init "$@"

----END vc-init----

### FILE: vc-init ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' init "$@"

----END vc-init----

### FILE: init ###
MISSING

----END init----

### FILE: vc-intents ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-intents' "$@"

----END vc-intents----

### FILE: vc-justdo ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' justdo "$@"

----END vc-justdo----

### FILE: vc-justdo ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' justdo "$@"

----END vc-justdo----

### FILE: justdo ###
MISSING

----END justdo----

### FILE: vc-loop ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-loop' "$@"

----END vc-loop----

### FILE: vc-marbles ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-marbles' "$@"

----END vc-marbles----

### FILE: vc-ownership ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-ownership' "$@"

----END vc-ownership----

### FILE: vc-partner ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-partner' "$@"

----END vc-partner----

### FILE: vc-paste ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-paste' "$@"

----END vc-paste----

### FILE: vc-polarize ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-polarize' "$@"

----END vc-polarize----

### FILE: vc-prune ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-prune' "$@"

----END vc-prune----

### FILE: vc-release ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-release' "$@"

----END vc-release----

### FILE: vc-research ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-research' "$@"

----END vc-research----

### FILE: vc-research-await ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-research-await' "$@"

----END vc-research-await----

### FILE: vc-research-synthesize ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-research-synthesize' "$@"

----END vc-research-synthesize----

### FILE: vc-resume ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' resume "$@"

----END vc-resume----

### FILE: vc-resume ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' resume "$@"

----END vc-resume----

### FILE: resume ###
MISSING

----END resume----

### FILE: vc-review ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-review' "$@"

----END vc-review----

### FILE: vc-sandbox ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-sandbox' "$@"

----END vc-sandbox----

### FILE: vc-scaffold ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-scaffold' "$@"

----END vc-scaffold----

### FILE: vc-server ###
TYPE: Mach-O 64-bit executable arm64
(binary — content skipped)

----END vc-server----

### FILE: vc-server-supervisor ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-server-supervisor' "$@"

----END vc-server-supervisor----

### FILE: vc-server.wrapper-bak-0819 ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-server' "$@"

----END vc-server.wrapper-bak-0819----

### FILE: vc-ship ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-ship' "$@"

----END vc-ship----

### FILE: vc-slack ###
TYPE: Bourne-Again shell script text executable, Unicode text, UTF-8 text
#!/usr/bin/env bash
# vc-slack — universal Slack connector + optional Vibecrafted fleet bridge.
#
# Agency CLI for models and operators:
#   vc-slack oauth install|status|url
#   vc-slack tools | vc-slack tool <name> '{json}'
#   vc-slack mcp
#   vc-slack <agent> <org>/<repo> <message>
#   vc-slack agent send [--repo <org>/<repo>] <agent> <message>
#   vc-slack post / history / whoami / signal / status / run
#
set -euo pipefail

# Resolve package ROOT through symlinks (PATH install is often
# ~/.local/bin/vc-slack -> <repo>/bin/vc-slack).
_vc_slack_src="${BASH_SOURCE[0]:-$0}"
while [[ -L "$_vc_slack_src" ]]; do
  _vc_slack_dir="$(cd -P "$(dirname "$_vc_slack_src")" && pwd)"
  _vc_slack_link="$(readlink "$_vc_slack_src")"
  if [[ "$_vc_slack_link" != /* ]]; then
    _vc_slack_src="$_vc_slack_dir/$_vc_slack_link"
  else
    _vc_slack_src="$_vc_slack_link"
  fi
done
ROOT="$(cd -P "$(dirname "$_vc_slack_src")/.." && pwd)"
export ROOT
unset _vc_slack_src _vc_slack_dir _vc_slack_link

# Agent-command installation must work from a packed/global install even when
# the caller's cwd has no package.json and connector dependencies are absent.
case "${1:-}" in
  skill)
    shift
    skill_action="${1:-help}"
    if [[ $# -gt 0 ]]; then shift; fi
    case "$skill_action" in
      install) exec node "${ROOT}/scripts/install-agent-command.mjs" --apply "$@" ;;
      check) exec node "${ROOT}/scripts/install-agent-command.mjs" --check "$@" ;;
      uninstall) exec node "${ROOT}/scripts/install-agent-command.mjs" --uninstall "$@" ;;
      help|-h|--help) exec node "${ROOT}/scripts/install-agent-command.mjs" --help ;;
      *) echo "usage: vc-slack skill install [--force] | check | uninstall" >&2; exit 2 ;;
    esac
    ;;
  install-agent-command)
    shift
    exec node "${ROOT}/scripts/install-agent-command.mjs" --apply "$@"
    ;;
  check-agent-command)
    shift
    exec node "${ROOT}/scripts/install-agent-command.mjs" --check "$@"
    ;;
  uninstall-agent-command)
    shift
    exec node "${ROOT}/scripts/install-agent-command.mjs" --uninstall "$@"
    ;;
esac

# Load selected keys via Node dotenv. Values cross the process boundary as
# NUL-delimited data and are assigned with printf -v: no eval/source, and no
# shell parsing of token or path contents.
while IFS= read -r -d '' _vc_slack_key && IFS= read -r -d '' _vc_slack_value; do
  printf -v "$_vc_slack_key" '%s' "$_vc_slack_value"
  export "$_vc_slack_key"
done < <(node --input-type=module <<NODE
import "${ROOT}/src/runtime-env.js";
const keys = [
  "SLACK_APP_ID","SLACK_BOT_TOKEN","SLACK_APP_TOKEN","SLACK_SIGNING_SECRET",
  "SLACK_CLIENT_ID","SLACK_CLIENT_SECRET","SLACK_USER_TOKEN",
  "SLACK_REDIRECT_URI","SLACK_TOKEN_AUTH_METHOD","SLACK_BOT_SCOPES","SLACK_USER_SCOPES",
  "SLACK_DEFAULT_CHANNEL","AGENTS_ROOM_CHANNEL_ID","AGENTS_ROOM_CHANNEL_NAME",
  "VC_PLAYGROUND_CHANNEL_ID","SLACK_TEAM_ID","VC_SERVER_URL","SLACK_ALLOW_USERS",
  "VIBECRAFTED_AGENT","VC_DEFAULT_AGENT","VC_SLACK_SERVER_URL_ORIGIN","VC_SLACK_DATA_DIR","VC_SLACK_AGENT_SOCKET",
  "VC_SLACK_OAUTH_PORT","VC_SLACK_DRY_RUN","VC_FLEET_MODE",
  "VC_SLACK_AGENT_TIMEOUT_MS",
  "VC_PEER_REPOS_FILE","VC_PEER_REPOS_JSON",
  "VC_CONSOLE_API_HOST","VC_CONSOLE_API_PORT","VC_CONSOLE_ALLOWED_ORIGINS","VC_CONSOLE_ALLOWED_HOSTS","VC_CONSOLE_TOKEN",
  "VC_CONSOLE_UI_HOST","VC_CONSOLE_UI_PORT",
  "VC_CONSOLE_PEER_TTL_SECONDS","VC_CONSOLE_HISTORY_LIMIT",
  "VIBECRAFTED_BIN","VC_DISPATCH_DRY_RUN","VC_DISPATCH_COOLDOWN_MS",
  "VC_DISPATCH_MAX_CONCURRENT","VC_PROGRESS_MIN_MS","VC_DISPATCH_SPAWN_MS"
];
for (const key of keys) {
  const val = process.env[key];
  if (val === undefined) continue;
  process.stdout.write(key + "\0" + String(val) + "\0");
}
NODE
)
unset _vc_slack_key _vc_slack_value

# Soft defaults — no Libraxis hard requirement for universal connector mode.
CHANNEL_DEFAULT="${SLACK_DEFAULT_CHANNEL:-${AGENTS_ROOM_CHANNEL_ID:-}}"
PLAYGROUND_DEFAULT="${VC_PLAYGROUND_CHANNEL_ID:-$CHANNEL_DEFAULT}"

if [[ "${1:-}" == "--" ]]; then
  shift
fi
cmd="${1:-}"
shift || true

# Commands that do not need a bot token / slack CLI
case "$cmd" in
  oauth)
    sub="${1:-status}"
    shift || true
    case "$sub" in
      status)
        exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { storeStatus } from '${ROOT}/src/oauth/store.js';
console.log(JSON.stringify(storeStatus(), null, 2));
"
        ;;
      url|authorize)
        mode="bot"
        pkce=1
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --user) mode="user"; shift ;;
            --bot) mode="bot"; shift ;;
            --no-pkce) pkce=0; shift ;;
            *) break ;;
          esac
        done
        exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { authorizeFromEnv } from '${ROOT}/src/oauth/manager.js';
const r = authorizeFromEnv({ mode: '${mode}', usePkce: ${pkce} === 1 });
console.log(JSON.stringify({ url: r.url, state: r.state, redirect_uri: r.redirectUri, mode: r.mode, pkce: Boolean(r.pkce) }, null, 2));
console.error('\\nOpen the url in a browser (or run: vc-slack oauth install)');
"
        ;;
      install)
        mode="bot"
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --user) mode="user"; shift ;;
            --bot) mode="bot"; shift ;;
            *) break ;;
          esac
        done
        exec node --input-type=module <<NODE
import "${ROOT}/src/runtime-env.js";
import { spawn } from "node:child_process";
import { authorizeFromEnv } from "${ROOT}/src/oauth/manager.js";
import { runOAuthInstall } from "${ROOT}/src/oauth/server.js";

const prepared = authorizeFromEnv({ mode: "${mode}", usePkce: true });
console.error("Authorize URL:\\n" + prepared.url + "\\n");
console.error("Listening for callback on " + prepared.redirectUri);
console.error("Approve in the browser…");

function openBrowser(url) {
  const plat = process.platform;
  const cmd = plat === "darwin" ? "open" : plat === "win32" ? "start" : "xdg-open";
  try {
    spawn(cmd, [url], { stdio: "ignore", detached: true }).unref();
  } catch {
    /* manual open */
  }
}

const { install } = await runOAuthInstall({
  mode: "${mode}",
  usePkce: true,
  openBrowser,
});
console.log(JSON.stringify({
  ok: true,
  team_id: install.team_id,
  team_name: install.team_name,
  has_bot_token: Boolean(install.bot_token),
  has_user_token: Boolean(install.user_token),
  bot_scopes: install.bot_scopes,
  user_scopes: install.user_scopes,
}, null, 2));
NODE
        ;;
      exchange)
        # Headless: code from redirect (for CI / custom callback hosts)
        code=""
        mode="bot"
        verifier=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --code) code="$2"; shift 2 ;;
            --user) mode="user"; shift ;;
            --bot) mode="bot"; shift ;;
            --code-verifier) verifier="$2"; shift 2 ;;
            *) break ;;
          esac
        done
        [[ -n "$code" ]] || { echo "usage: vc-slack oauth exchange --code <code> [--code-verifier v] [--user]" >&2; exit 2; }
        CODE="$code" MODE="$mode" VERIFIER="$verifier" exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { completeInstall } from '${ROOT}/src/oauth/manager.js';
const install = await completeInstall({
  code: process.env.CODE,
  mode: process.env.MODE || 'bot',
  codeVerifier: process.env.VERIFIER || undefined,
});
console.log(JSON.stringify({ ok: true, team_id: install.team_id, team_name: install.team_name }, null, 2));
"
        ;;
      *)
        echo "usage: vc-slack oauth status|url|install|exchange" >&2
        exit 2
        ;;
    esac
    ;;
  tools|tool-list)
    exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { listToolDefinitions } from '${ROOT}/src/connector/tools.js';
console.log(JSON.stringify(listToolDefinitions(), null, 2));
"
    ;;
  tool)
    name="${1:-}"
    shift || true
    [[ -n "$name" ]] || { echo "usage: vc-slack tool <name> ['{json args}']" >&2; exit 2; }
    args_json="${1-}"
    if [[ -z "$args_json" ]]; then
      args_json="{}"
    fi
    NAME="$name" ARGS="$args_json" exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { callTool } from '${ROOT}/src/connector/tools.js';
const args = JSON.parse(process.env.ARGS || '{}');
const result = await callTool(process.env.NAME, args, {
  dryRun: process.env.VC_SLACK_DRY_RUN === '1',
});
console.log(JSON.stringify(result, null, 2));
"
    ;;
  agent)
    sub="${1:-}"
    shift || true
    [[ "$sub" == "send" ]] || {
      echo "usage: vc-slack agent send [--request-id ID] [--repo org/repo] <agent> <message>" >&2
      exit 2
    }
    request_id=""
    repository=""
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --request-id)
          [[ $# -ge 2 ]] || { echo "--request-id requires a value" >&2; exit 2; }
          request_id="$2"
          shift 2
          ;;
        --repo|--repository)
          [[ $# -ge 2 ]] || { echo "$1 requires a value" >&2; exit 2; }
          repository="$2"
          shift 2
          ;;
        --)
          shift
          break
          ;;
        -*)
          echo "unknown flag: $1" >&2
          exit 2
          ;;
        *)
          break
          ;;
      esac
    done
    target_agent="${1:-}"
    [[ -n "$target_agent" ]] || {
      echo "usage: vc-slack agent send [--request-id ID] [--repo org/repo] <agent> <message>" >&2
      exit 2
    }
    shift || true
    message="${*:-}"
    if [[ -z "$message" && ! -t 0 ]]; then
      message="$(command cat)"
    fi
    [[ -n "$message" ]] || { echo "agent message is empty" >&2; exit 2; }
    TARGET_AGENT="$target_agent" PEER_REPOSITORY="$repository" PEER_MESSAGE="$message" REQUEST_ID="$request_id" exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { randomUUID } from 'node:crypto';
import { callTool } from '${ROOT}/src/connector/tools.js';
const requestId = process.env.REQUEST_ID || randomUUID();
try {
  const result = await callTool('vc_agent_send', {
    agent: process.env.TARGET_AGENT,
    ...(process.env.PEER_REPOSITORY ? { repository: process.env.PEER_REPOSITORY } : {}),
    message: process.env.PEER_MESSAGE,
    request_id: requestId,
  }, {
    dryRun: process.env.VC_SLACK_DRY_RUN === '1',
  });
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  const code = String(error?.code || 'agent_send_failed');
  console.error(code + ': ' + String(error?.message || error) + ' · request_id=' + requestId);
  process.exit(1);
}
"
    ;;
  repo)
    sub="${1:-list}"
    shift || true
    case "$sub" in
      pin)
        slug="${1:-}"
        pin_root="${2:-$PWD}"
        [[ -n "$slug" ]] || { echo "usage: vc-slack repo pin <org/repo> [root]" >&2; exit 2; }
        PEER_REPOSITORY="$slug" PEER_REPOSITORY_ROOT="$pin_root" exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { pinRepository } from '${ROOT}/src/repository-map.js';
try {
  console.log(JSON.stringify(pinRepository(process.env.PEER_REPOSITORY, process.env.PEER_REPOSITORY_ROOT), null, 2));
} catch (error) {
  console.error(String(error?.code || 'repo_pin_failed') + ': ' + String(error?.message || error));
  process.exit(1);
}
"
        ;;
      unpin)
        slug="${1:-}"
        [[ -n "$slug" ]] || { echo "usage: vc-slack repo unpin <org/repo>" >&2; exit 2; }
        PEER_REPOSITORY="$slug" exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { unpinRepository } from '${ROOT}/src/repository-map.js';
try {
  console.log(JSON.stringify(unpinRepository(process.env.PEER_REPOSITORY), null, 2));
} catch (error) {
  console.error(String(error?.code || 'repo_unpin_failed') + ': ' + String(error?.message || error));
  process.exit(1);
}
"
        ;;
      resolve)
        slug="${1:-}"
        [[ -n "$slug" ]] || { echo "usage: vc-slack repo resolve <org/repo>" >&2; exit 2; }
        PEER_REPOSITORY="$slug" exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { createRepositoryResolver } from '${ROOT}/src/repository-map.js';
try {
  console.log(JSON.stringify(await createRepositoryResolver()(process.env.PEER_REPOSITORY), null, 2));
} catch (error) {
  console.error(String(error?.code || 'repo_resolve_failed') + ': ' + String(error?.message || error));
  process.exit(1);
}
"
        ;;
      list)
        exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { listRepositoryPins, repositoryMapFile } from '${ROOT}/src/repository-map.js';
try {
  console.log(JSON.stringify({ file: repositoryMapFile(), repositories: listRepositoryPins() }, null, 2));
} catch (error) {
  console.error(String(error?.code || 'repo_list_failed') + ': ' + String(error?.message || error));
  process.exit(1);
}
"
        ;;
      *)
        echo "usage: vc-slack repo pin|unpin|resolve|list" >&2
        exit 2
        ;;
    esac
    ;;
  mcp)
    exec node "$ROOT/src/connector/mcp.js"
    ;;
  console)
    exec node "$ROOT/console/server.mjs"
    ;;
  connector-status)
    exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { storeStatus, resolveBotToken } from '${ROOT}/src/oauth/store.js';
import { loadConfig, hasSocketModeCreds, hasOAuthAppCreds } from '${ROOT}/src/config.js';
const cfg = loadConfig();
const bot = resolveBotToken();
let auth = null;
if (bot.token) {
  try {
    const { createSlackClient, authTest } = await import('${ROOT}/src/connector/client.js');
    const { client } = createSlackClient({ kind: 'bot' });
    auth = await authTest(client);
  } catch (e) {
    auth = { error: e instanceof Error ? e.message : String(e) };
  }
}
console.log(JSON.stringify({
  has_oauth_app: hasOAuthAppCreds(cfg),
  has_socket_mode_env: hasSocketModeCreds(cfg),
  bot_token_source: bot.source,
  fleet_mode: cfg.fleetMode,
  default_channel: cfg.defaultChannel || null,
  auth,
  store: storeStatus(),
}, null, 2));
"
    ;;
esac

# Resolve bot token from env OR oauth store for classic commands
if [[ -z "${SLACK_BOT_TOKEN:-}" ]]; then
  SLACK_BOT_TOKEN="$(node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { resolveBotToken } from '${ROOT}/src/oauth/store.js';
const r = resolveBotToken();
if (r.token) process.stdout.write(r.token);
" 2>/dev/null || true)"
  export SLACK_BOT_TOKEN
fi

require_token() {
  if [[ -z "${SLACK_BOT_TOKEN:-}" ]]; then
    echo "No Slack bot token. Set SLACK_BOT_TOKEN or run: vc-slack oauth install" >&2
    exit 1
  fi
}

# Prefer connector tools (no slack CLI dependency) when slack CLI is missing
SLACK_CMD="${SLACK_CMD:-$HOME/.slack/bin/slack}"
if [[ ! -x "$SLACK_CMD" ]]; then
  SLACK_CMD="$(command -v slack || true)"
fi

api() {
  local method="$1"; shift
  if [[ -n "${SLACK_CMD:-}" && -x "${SLACK_CMD}" ]]; then
    "$SLACK_CMD" api "$method" --token="$SLACK_BOT_TOKEN" "$@"
  else
    # Pure HTTP fallback via Node + @slack/web-api
    METHOD="$method" ARGS="$*" node --input-type=module <<'NODE'
import { WebClient } from "@slack/web-api";
const client = new WebClient(process.env.SLACK_BOT_TOKEN);
const method = process.env.METHOD;
const raw = process.env.ARGS || "";
const params = {};
// parse key=value pairs
const re = /(\w+)=((?:\"(?:\\.|[^\"])*\"|'[^']*'|[^\s]+))/g;
let m;
while ((m = re.exec(raw))) {
  let v = m[2];
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  params[m[1]] = v;
}
const [ns, name] = method.split(".");
const fn = client[ns]?.[name];
if (typeof fn !== "function") {
  console.error(JSON.stringify({ ok: false, error: `unknown_method:${method}` }));
  process.exit(1);
}
const result = await fn(params);
console.log(JSON.stringify(result));
NODE
  fi
}

resolve_channel() {
  local c="${1:-$CHANNEL_DEFAULT}"
  case "$c" in
    "") echo "" ;;
    agents-room|\#agents-room) echo "${AGENTS_ROOM_CHANNEL_ID:-$c}" ;;
    playground|\#playground) echo "${PLAYGROUND_DEFAULT:-$c}" ;;
    C*|D*|G*) echo "$c" ;;
    *) echo "$c" ;;
  esac
}

case "$cmd" in
  whoami)
    require_token
    api auth.test | python3 -c 'import sys,json;d=json.loads(sys.stdin.read());print(json.dumps({k:d.get(k) for k in ("ok","team","user","user_id","bot_id","url")}, indent=2))'
    ;;
  post)
    require_token
    channel="${CHANNEL_DEFAULT}"
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --channel|-c) channel="$(resolve_channel "$2")"; shift 2 ;;
        --) shift; break ;;
        -*) echo "unknown flag $1" >&2; exit 2 ;;
        *) break ;;
      esac
    done
    text="${*:-}"
    if [[ -z "$text" ]]; then
      text="$(cat)"
    fi
    [[ -n "$text" ]] || { echo "empty message" >&2; exit 2; }
    [[ -n "$channel" ]] || { echo "channel required (set SLACK_DEFAULT_CHANNEL or --channel)" >&2; exit 2; }
    # Prefer connector tool path (handles #name resolution)
    TEXT="$text" CHANNEL="$channel" exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { callTool } from '${ROOT}/src/connector/tools.js';
const r = await callTool('slack_post_message', {
  channel: process.env.CHANNEL,
  text: process.env.TEXT,
});
if (!r.ok) { console.error(JSON.stringify(r)); process.exit(1); }
console.log(r.ts, r.channel);
"
    ;;
  history)
    require_token
    limit=20
    channel="${CHANNEL_DEFAULT}"
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --limit|-n) limit="$2"; shift 2 ;;
        --channel|-c) channel="$(resolve_channel "$2")"; shift 2 ;;
        *) break ;;
      esac
    done
    [[ -n "$channel" ]] || { echo "channel required" >&2; exit 2; }
    CHANNEL="$channel" LIMIT="$limit" exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { callTool } from '${ROOT}/src/connector/tools.js';
const r = await callTool('slack_channel_history', {
  channel: process.env.CHANNEL,
  limit: Number(process.env.LIMIT || 20),
});
if (!r.ok) { console.error(JSON.stringify(r)); process.exit(1); }
for (const m of [...r.messages].reverse()) {
  const who = m.user || m.bot_id || '?';
  console.log(\`\${m.ts}  \${who}  \${(m.text || '(empty)').replace(/\\n/g, ' ')}\`);
}
"
    ;;
  file)
    require_token
    fid="${1:-}"
    [[ -n "$fid" ]] || { echo "usage: vc-slack file <file_id|slack_file_url> [--save PATH]" >&2; exit 2; }
    shift || true
    save=""
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --save|-o) save="$2"; shift 2 ;;
        *) shift ;;
      esac
    done
    case "$fid" in
      *files.slack.com*|*/files-pri/*|https://*)
        fid="$(printf '%s' "$fid" | sed -E 's#.*/(F[A-Z0-9]+)(/.*)?#\1#')" ;;
    esac
    SAVE="$save" FID="$fid" TOKEN="$SLACK_BOT_TOKEN" python3 <<'PY'
import json, os, sys, urllib.parse, urllib.request
tok, fid, save = os.environ["TOKEN"], os.environ["FID"], os.environ.get("SAVE") or ""
def api(method, **params):
    url = f"https://slack.com/api/{method}?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {tok}"})
    return json.load(urllib.request.urlopen(req))
info = api("files.info", file=fid)
if not info.get("ok"):
    print(f"FAIL {info.get('error')}", file=sys.stderr); sys.exit(1)
f = info["file"]
url = f.get("url_private_download") or f.get("url_private")
print(f"# {f.get('name')} · {f.get('mimetype')} · {f.get('size')}B", file=sys.stderr)
req = urllib.request.Request(url, headers={"Authorization": f"Bearer {tok}"})
data = urllib.request.urlopen(req).read()
if data[:200].lstrip().lower().startswith(b"<a href") or b"<html" in data[:200].lower():
    print("FAIL download returned HTML", file=sys.stderr); sys.exit(1)
if save:
    open(save, "wb").write(data)
    print(f"saved {len(data)}B -> {save}", file=sys.stderr)
else:
    sys.stdout.buffer.write(data)
PY
    ;;
  signal)
    require_token
    channel="${PLAYGROUND_DEFAULT:-$CHANNEL_DEFAULT}"
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --channel|-c) channel="$(resolve_channel "$2")"; shift 2 ;;
        *) break ;;
      esac
    done
    body="${*:-}"
    [[ -n "$body" ]] || { echo "usage: vc-slack signal <text>" >&2; exit 2; }
    [[ -n "$channel" ]] || { echo "channel required" >&2; exit 2; }
    agent="${VIBECRAFTED_AGENT:-${AGENT:-unknown}}"
    run_id="${VIBECRAFTED_RUN_ID:-${RUN_ID:-}}"
    ts="$(date -u +%Y-%m-%dT%H:%MZ)"
    text="*SIGNAL* · \`${agent}\`"
    [[ -n "$run_id" ]] && text+=" · \`${run_id}\`"
    text+=$'\n'"${body}"$'\n'_"${ts}"_
    TEXT="$text" CHANNEL="$channel" exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { callTool } from '${ROOT}/src/connector/tools.js';
const r = await callTool('slack_post_message', { channel: process.env.CHANNEL, text: process.env.TEXT });
if (!r.ok) { console.error(JSON.stringify(r)); process.exit(1); }
console.log(r.ts, r.channel);
"
    ;;
  status)
    exec node "$ROOT/src/cli-status.js"
    ;;
  run)
    rid="${1:-}"
    [[ -n "$rid" ]] || { echo "usage: vc-slack run <run_id>" >&2; exit 2; }
    exec node "$ROOT/src/cli-run.js" "$rid"
    ;;
  join)
    require_token
    channel="$(resolve_channel "${1:-$CHANNEL_DEFAULT}")"
    [[ -n "$channel" ]] || { echo "channel required" >&2; exit 2; }
    api conversations.join channel="$channel" | python3 -c '
import sys,json
d=json.loads(sys.stdin.read())
print(d.get("ok"), d.get("error") or (d.get("channel") or {}).get("name"))
'
    ;;
  ""|-h|--help|help)
    cat <<'EOF'
vc-slack — universal Slack connector (agency + optional Vibecrafted fleet)

Connect / OAuth
  vc-slack oauth status              # installs on disk (no secrets printed)
  vc-slack oauth url [--user]        # print authorize URL
  vc-slack oauth install [--user]    # local callback + browser install
  vc-slack oauth exchange --code …   # headless code exchange
  vc-slack connector-status          # env + store + auth.test

AI tools (sprawczość)
  vc-slack tools                     # list tool schemas
  vc-slack tool slack_post_message '{"channel":"#general","text":"hi"}'
  vc-slack claude vetcoders/vc-slack "message" # repo-scoped peer conversation
  vc-slack agent send --repo vetcoders/vc-slack codex "message"
  vc-slack repo pin vetcoders/vc-slack # pin cwd as bridge-owned repo root
  vc-slack skill install             # install /vc-slack agent-host skill
  vc-slack skill check               # verify stable owned skill + host links
  vc-slack mcp                       # MCP stdio server for model hosts
  vc-slack console                   # operator UI + bus, env-driven host (default :3848)

Classic CLI
  vc-slack whoami
  vc-slack join [channel]
  vc-slack post [--channel #name|C…] "message"
  vc-slack history [--channel …] [--limit 20]
  vc-slack file <file_id|url> [--save PATH]
  vc-slack signal [--channel …] "peer payload"
  vc-slack status                    # fleet omni-observer (optional)
  vc-slack run <run_id>

Env (minimum for OAuth install):
  SLACK_CLIENT_ID, SLACK_CLIENT_SECRET
  SLACK_REDIRECT_URI (default http://127.0.0.1:3847/oauth/callback)

Env (tokens — or obtained via oauth install):
  SLACK_BOT_TOKEN / SLACK_USER_TOKEN
  SLACK_DEFAULT_CHANNEL

Fleet extras (optional):
  SLACK_APP_TOKEN, SLACK_SIGNING_SECRET  # Socket Mode bridge
  VC_SERVER_URL, SLACK_ALLOW_USERS, AGENTS_ROOM_CHANNEL_ID
  VC_SLACK_AGENT_SOCKET                 # local bridge IPC override
  VC_SLACK_AGENT_TIMEOUT_MS             # local IPC result deadline (default 65000)
  VC_PEER_REPOS_FILE                    # private org/repo → root pin map

Token auth method (token exchange): SLACK_TOKEN_AUTH_METHOD=client_secret_basic
EOF
    ;;
  oauth|tools|tool|agent|repo|mcp|console|connector-status|tool-list)
    # handled above; if we fall through, re-exec shouldn't happen
    ;;
  *)
    target_agent="$cmd"
    repository="${1:-}"
    shift || true
    message="${*:-}"
    if [[ -z "$message" && ! -t 0 ]]; then
      message="$(command cat)"
    fi
    [[ -n "$target_agent" && -n "$repository" && -n "$message" ]] || {
      echo "usage: vc-slack <agent> <org/repo> \"<message>\"" >&2
      exit 2
    }
    TARGET_AGENT="$target_agent" PEER_REPOSITORY="$repository" PEER_MESSAGE="$message" exec node --input-type=module -e "
import '${ROOT}/src/runtime-env.js';
import { randomUUID } from 'node:crypto';
import { callTool } from '${ROOT}/src/connector/tools.js';
const requestId = randomUUID();
try {
  const result = await callTool('vc_agent_send', {
    agent: process.env.TARGET_AGENT,
    repository: process.env.PEER_REPOSITORY,
    message: process.env.PEER_MESSAGE,
    request_id: requestId,
  }, { dryRun: process.env.VC_SLACK_DRY_RUN === '1' });
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  const code = String(error?.code || 'agent_send_failed');
  console.error(code + ': ' + String(error?.message || error) + ' · request_id=' + requestId);
  process.exit(1);
}
"
    ;;
esac

----END vc-slack----

### FILE: vc-start ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-start' "$@"

----END vc-start----

### FILE: vc-terminal ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Volumes/vc-workspace/vetcoders/vibecrafted-suite/vibecrafted/dist/Vibecrafted.app/Contents/Helpers/vc-terminal.app/Contents/MacOS/alacritty' '--config-file' '/Users/polyversai/.config/vibecrafted/terminal-entry.toml' "$@"

----END vc-terminal----

### FILE: vc-theme ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-theme' "$@"

----END vc-theme----

### FILE: vc-tools ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/usr/bin/env bash
set -euo pipefail

# Resolve symlinks portably (macOS + Linux) to find real repo root.
target="$0"
while [ -L "$target" ]; do
  link_dir="$(cd -P "$(dirname "$target")" && pwd)"
  target="$(readlink "$target")"
  [[ "$target" != /* ]] && target="$link_dir/$target"
done
REPO_DIR="$(cd -P "$(dirname "$target")" && pwd)"

cd "$REPO_DIR"
exec pnpm run tui "$@"

----END vc-tools----

### FILE: vc-trust ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-trust' "$@"

----END vc-trust----

### FILE: vc-workflow ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-workflow' "$@"

----END vc-workflow----

### FILE: vibecrafted ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted' "$@"

----END vibecrafted----

### FILE: vibecrafted-compact-hook ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted-compact-hook' "$@"

----END vibecrafted-compact-hook----

### FILE: vibecrafted-iterm2-autolaunch ###
TYPE: a /Users/polyversai/.local/share/uv/tools/vibecrafted-iterm2/bin/python3 script text executable, ASCII text
#!/Users/polyversai/.local/share/uv/tools/vibecrafted-iterm2/bin/python3
# -*- coding: utf-8 -*-
import sys
from vibecrafted_iterm2.install_autolaunch import main
if __name__ == "__main__":
    if sys.argv[0].endswith("-script.pyw"):
        sys.argv[0] = sys.argv[0][:-11]
    elif sys.argv[0].endswith(".exe"):
        sys.argv[0] = sys.argv[0][:-4]
    sys.exit(main())

----END vibecrafted-iterm2-autolaunch----

### FILE: vibecrafted-mcp ###
TYPE: a /Users/polyversai/.local/share/uv/tools/vibecrafted-mcp/bin/python3 script text executable, ASCII text
#!/Users/polyversai/.local/share/uv/tools/vibecrafted-mcp/bin/python3
# -*- coding: utf-8 -*-
import sys
from vibecrafted_mcp.server import main
if __name__ == "__main__":
    if sys.argv[0].endswith("-script.pyw"):
        sys.argv[0] = sys.argv[0][:-11]
    elif sys.argv[0].endswith(".exe"):
        sys.argv[0] = sys.argv[0][:-4]
    sys.exit(main())

----END vibecrafted-mcp----

### FILE: vibecrafted-resume ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted-resume' "$@"

----END vibecrafted-resume----

### FILE: vibecrafted-server-web ###
TYPE: Bourne-Again shell script text executable, ASCII text
#!/bin/bash
set -euo pipefail
export XDG_CONFIG_HOME='/Users/polyversai/.config'
export VIBECRAFTED_HOME='/Users/polyversai/.vibecrafted'
export VIBECRAFTED_RUNTIME_HOME='/Users/polyversai/.local/share/vibecrafted'
export VIBECRAFTED_RUNTIME_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_ROOT='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814'
export VIBECRAFTED_PYTHON='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/python3'
export VIBECRAFTED_VC_FRAME_BIN='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vc-frame'
export VC_FRAME_CONFIG_DIR='/Users/polyversai/.config/vibecrafted/vc-frame'
export PATH='/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin:/Users/polyversai/.local/bin:/Users/polyversai/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
exec '/Users/polyversai/.local/share/vibecrafted/releases/4.1.0+g237d2814/bin/vibecrafted-server-web' "$@"

----END vibecrafted-server-web----

```

## 6. MAPPING — launcher shim -> what it calls

| Launcher                      | Type                                                       | Resolves to                                                                                                                                                        |
| ----------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| vc-admin                      | Mach-O binary (not a shim)                                 | native binary, not inspected further (read-only harvest scope)                                                                                                     |
| vc-agents                     | bash env-wrapper                                           | exec vc-agents (release bin) "$@"                                                                                                                                  |
| vc-audit                      | bash env-wrapper                                           | exec vc-audit (release bin) "$@"                                                                                                                                   |
| vc-cron                       | bash env-wrapper                                           | exec vc-cron (release bin) "$@"                                                                                                                                    |
| vc-dashboard                  | bash env-wrapper                                           | exec vibecrafted dashboard "$@"                                                                                                                                    |
| vc-decorate                   | bash env-wrapper                                           | exec vc-decorate (release bin) "$@"                                                                                                                                |
| vc-delegate                   | bash env-wrapper                                           | exec vc-delegate (release bin) "$@"                                                                                                                                |
| vc-dispatch                   | bash env-wrapper                                           | exec vibecrafted dispatch "$@"                                                                                                                                     |
| vc-dou                        | bash env-wrapper                                           | exec vc-dou (release bin) "$@"                                                                                                                                     |
| vc-followup                   | bash env-wrapper                                           | exec vc-followup (release bin) "$@"                                                                                                                                |
| vc-frame                      | bash env-wrapper                                           | exec vc-frame (release bin) "$@"                                                                                                                                   |
| vc-git                        | bash env-wrapper                                           | exec vc-git (release bin) "$@"                                                                                                                                     |
| vc-guard                      | bash env-wrapper                                           | exec vc-guard (release bin) "$@"                                                                                                                                   |
| vc-guardian                   | bash env-wrapper                                           | exec vc-guardian (release bin) "$@"                                                                                                                                |
| vc-help                       | bash env-wrapper                                           | exec vibecrafted help "$@"                                                                                                                                         |
| vc-hydrate                    | bash env-wrapper                                           | exec vc-hydrate (release bin) "$@"                                                                                                                                 |
| vc-implement                  | bash env-wrapper                                           | exec vc-implement (release bin) "$@"                                                                                                                               |
| vc-init                       | bash env-wrapper                                           | exec vibecrafted init "$@"                                                                                                                                         |
| vc-intents                    | bash env-wrapper                                           | exec vc-intents (release bin) "$@"                                                                                                                                 |
| vc-justdo                     | bash env-wrapper                                           | exec vibecrafted justdo "$@"                                                                                                                                       |
| vc-loop                       | bash env-wrapper                                           | exec vc-loop (release bin) "$@"                                                                                                                                    |
| vc-marbles                    | bash env-wrapper                                           | exec vc-marbles (release bin) "$@"                                                                                                                                 |
| vc-ownership                  | bash env-wrapper                                           | exec vc-ownership (release bin) "$@"                                                                                                                               |
| vc-partner                    | bash env-wrapper                                           | exec vc-partner (release bin) "$@"                                                                                                                                 |
| vc-paste                      | bash env-wrapper                                           | exec vc-paste (release bin) "$@"                                                                                                                                   |
| vc-polarize                   | bash env-wrapper                                           | exec vc-polarize (release bin) "$@"                                                                                                                                |
| vc-prune                      | bash env-wrapper                                           | exec vc-prune (release bin) "$@"                                                                                                                                   |
| vc-release                    | bash env-wrapper                                           | exec vc-release (release bin) "$@"                                                                                                                                 |
| vc-research                   | bash env-wrapper                                           | exec vc-research (release bin) "$@"                                                                                                                                |
| vc-research-await             | bash env-wrapper                                           | exec vc-research-await (release bin) "$@"                                                                                                                          |
| vc-research-synthesize        | bash env-wrapper                                           | exec vc-research-synthesize (release bin) "$@"                                                                                                                     |
| vc-resume                     | bash env-wrapper                                           | exec vibecrafted resume "$@"                                                                                                                                       |
| vc-review                     | bash env-wrapper                                           | exec vc-review (release bin) "$@"                                                                                                                                  |
| vc-sandbox                    | bash env-wrapper                                           | exec vc-sandbox (release bin) "$@"                                                                                                                                 |
| vc-scaffold                   | bash env-wrapper                                           | exec vc-scaffold (release bin) "$@"                                                                                                                                |
| vc-server                     | Mach-O binary (not a shim)                                 | native binary, not inspected further                                                                                                                               |
| vc-server-supervisor          | bash env-wrapper                                           | exec vc-server-supervisor (release bin) "$@"                                                                                                                       |
| vc-server.wrapper-bak-0819    | bash env-wrapper (backup file, not on canonical PATH name) | exec vc-server (release bin) "$@" — note: this is a _backup_ of the old vc-server wrapper, dated 0819; live `vc-server` is now the compiled Mach-O binary directly |
| vc-ship                       | bash env-wrapper                                           | exec vc-ship (release bin) "$@"                                                                                                                                    |
| vc-slack                      | standalone bash script (703 lines, own logic)              | Slack connector + Vibecrafted fleet bridge; resolves own package root via symlink walk, not a thin env-wrapper                                                     |
| vc-start                      | bash env-wrapper                                           | exec vc-start (release bin) "$@"                                                                                                                                   |
| vc-terminal                   | bash env-wrapper                                           | exec .../Vibecrafted.app/Contents/Helpers/vc-terminal.app/.../alacritty --config-file terminal-entry.toml "$@"                                                     |
| vc-theme                      | bash env-wrapper                                           | exec vc-theme (release bin) "$@"                                                                                                                                   |
| vc-tools                      | standalone bash script                                     | cd to resolved repo dir, exec `pnpm run tui "$@"`                                                                                                                  |
| vc-trust                      | bash env-wrapper                                           | exec vc-trust (release bin) "$@"                                                                                                                                   |
| vc-workflow                   | bash env-wrapper                                           | exec vc-workflow (release bin) "$@"                                                                                                                                |
| vibecrafted                   | bash env-wrapper                                           | exec vibecrafted (release bin) "$@" — the canonical deck entrypoint                                                                                                |
| vibecrafted-compact-hook      | bash env-wrapper                                           | exec vibecrafted-compact-hook (release bin) "$@"                                                                                                                   |
| vibecrafted-iterm2-autolaunch | uv-tool shim (not a vibecrafted-authored wrapper)          | uv-managed tool launcher                                                                                                                                           |
| vibecrafted-mcp               | uv-tool shim (not a vibecrafted-authored wrapper)          | uv-managed tool launcher (MCP server entrypoint)                                                                                                                   |
| vibecrafted-resume            | bash env-wrapper                                           | exec vibecrafted-resume (release bin) "$@"                                                                                                                         |
| vibecrafted-server-web        | bash env-wrapper                                           | exec vibecrafted-server-web (release bin) "$@"                                                                                                                     |
