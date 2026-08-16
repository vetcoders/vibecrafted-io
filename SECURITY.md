# Security Policy

## Supported Versions

| Version          | Supported   |
| ---------------- | ----------- |
| Latest on `main` | Yes         |
| Older commits    | Best effort |

## Reporting a Vulnerability

If you discover a security vulnerability in 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Skills, please report it
responsibly.

**Do not open a public issue.**

Email: **void@div0.space**

Include:

- Description of the vulnerability
- Steps to reproduce
- Impact assessment (what can an attacker do?)
- Affected skill(s) or script(s)

We will acknowledge receipt within 48 hours and provide an initial assessment
within 7 days.

## Scope

This policy covers:

- All skill definitions (`vc-*/SKILL.md`)
- Install and spawn scripts (`scripts/`, `install.sh`)
- Shell helpers installed by `install-shell.sh`
- CI workflows (`.github/workflows/`)

Out of scope:

- Runtime foundations (`aicx-mcp`, `loctree-mcp`, `prview`) — report to their respective repos
- Agent CLIs (Codex, Claude, Gemini) — report to their vendors

## Known Security Boundaries

- Spawn scripts use `zsh -ic` which loads the user's full shell environment. This is by design — agents need the real
  env. Do not run spawns in untrusted environments.
- `--dangerously-skip-permissions` flags are required for external agents. This is documented and intentional. The
  `vc-delegate` skill exists as the safe alternative.
- No secrets should ever be committed to this repo. Skills read credentials from environment variables only.

## Release archive secret gate

This repository publishes binary release archives (`site/public/vibecrafted-v*.tar.gz`).
Those bytes go to strangers, so they are gated unconditionally:

```bash
make release-archive-secret-gate      # or: python3 scripts/check_release_archive_secrets.py
```

The gate scans every archive in `site/public/` and `framework/` two ways — by
member name (`.env` / `.env.*`, excluding `*.example`) and by content
(`tskey-`, `sk-`, `sk-ant-`, `ghp_`/`gho_`/`ghu_`/`ghs_`/`ghr_`, `github_pat_`,
`AKIA`/`ASIA`, `xox*`, `PRIVATE KEY` blocks). It exits 9 on a hit and has **no
bypass flag**. It runs from `make site-build` and from `deploy-pages.yml` before
any byte is staged for Pages.

Why a second gate exists: upstream `bundle-build` already refuses to _create_ a
leaking payload, checking between its `rsync` and its `tar`. It never sees an
archive that was committed before that gate existed, nor one that a stale
`framework/` bundle root copied straight into `site/public/`. Both seams were
live on 2026-08-16, when `vibecrafted-v3.2.0.tar.gz` was found tracked in git
carrying `vibecrafted-vm/.env` with a live `TAILSCALE_AUTHKEY`.

Removing an archive from the working tree does not remove it from history. If a
leaking archive was ever committed, treat credential revocation as the primary
remedy and history rewrite as a separate, explicit decision.
