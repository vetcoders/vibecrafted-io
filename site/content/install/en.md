---
# Install manifest — "What you install" section.
# Voice: the manifesto (Vibe Hangover) — concrete, adult, zero mystery meat.
# Ground truth per component lives in each repo's README / AGENTS.md;
# mapped in docs/content-truth.manifest.json.
# Rendered by: site/src/components/sections/SectionInstallManifest.astro

title: "WHAT YOU INSTALL"
centerLabel: "SIX COMPONENTS · ONE CONTROL PLANE"

headingHtml: 'What lands on <em class="accent-2">your machine</em>'
subtitle: "One installer. Six binaries. They all read and write the same directory."

components:
  - name: "vibecrafted"
    kind: "CLI · runtime"
    what: "The runtime and the launchers. vibecrafted <skill> <agent> dispatches real work to claude, codex, gemini or junie, records every run in the control plane, and settles it as f / x / n with receipts — report, transcript, seal."
    kills: "Kills the untracked agent session: work that happened somewhere, left a diff, and nobody can say who ran what or whether it finished."
    lives: "~/.local/bin/vibecrafted"
  - name: "loctree"
    kind: "CLI + MCP · Rust"
    what: "Structural perception. Repo map, dependency slices, consumers, blast radius, dead code — the map an agent reads before it touches your code."
    kills: "Kills the blind edit: the refactor that broke three consumers nobody knew existed."
    lives: "npm / crates · loct + loctree-mcp"
  - name: "aicx"
    kind: "CLI + MCP · session memory"
    what: "Parses agent transcripts — Claude, Codex, Gemini — into a searchable intent store. What was decided, by whom, and why: retrievable, not folklore."
    kills: "Kills the amnesiac session: the agent that re-decides on Tuesday what the team already settled on Monday."
    lives: "~/.aicx store"
  - name: "vc-frame"
    kind: "terminal cockpit · Rust"
    what: "The operator terminal (a hard fork of Zellij): session rail, live-run chips, command composer, paste stack. Where you watch the fleet work — and interrupt it."
    kills: "Kills the fifteen-tab terminal sprawl where the important session is always the one you closed."
    lives: "binary · vc-frame"
  - name: "vc-server"
    kind: "web control plane · Rust"
    what: "A read-only browser projection of the same control plane the CLI writes: live runs, lifecycle decisions, transcripts, scaffold review. Leptos SSR + axum. It observes; it cannot mutate your repo."
    kills: "Kills the dashboard that invents its own numbers — alive / final / failed / attention come from retained snapshots, not vibes."
    lives: "binary · ~/.local/bin/vc-server"
  - name: "vc-slack"
    kind: "Slack connector · OAuth + MCP"
    what: "Agency on your Slack, self-hosted. Agents post, reply, react, DM and hand off to each other in bounded threads — under operator-controlled scopes, with tokens that never leave your side."
    kills: "Kills the invisible fleet: dispatch and read reports in the channel your team already lives in, instead of ssh-ing in to check."
    lives: "self-hosted · vetcoders/vc-slack"

truthLabel: "ONE DIRECTORY OF TRUTH"
truthBody: "Every component above reads or writes ~/.vibecrafted/control_plane/ — runs, settlements, lifecycle state, scaffold artifacts. The CLI writes it. vc-frame and vc-server project it. Nothing invents its own numbers, so when two surfaces disagree, one of them is broken — and that is a bug, not a shrug."
---
