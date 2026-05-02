---
track: release-foundations-bundle-E-test-contract
parent_plan: release-foundations-bundle-2026-05-02
phase: E
agent: codex
priority: P1
repo: /Users/polyversai/Libraxis/vc-runtime/vibecrafted-io
branch: release/foundations-bundle-2026-05-02
status: completed
---

# Phase E Report - Release Contract Single CTA Sync

## Current State

Phase E is complete. The release contract now enforces a single public install CTA:

```sh
curl -fsSL https://vibecrafted.io/install.sh | bash
```

The dual public CTA contract was removed from the focused test and from the release-facing framework/root docs. The `site/public/install.sh` `--gui` example remains intentionally present as a back-compat opt-in handler surface.

## Files Touched

- `README.md`
- `framework/README.md`
- `framework/install.sh`
- `framework/tests/tui/test_release_contract.py`
- `framework/docs/FAQ.md`
- `framework/docs/QUICK_START.md`
- `framework/docs/RELEASE_KICKOFF.md`
- `framework/docs/SUBMISSION_FORMS.md`
- `framework/docs/installer/LIVE_WIZARD.md`
- `framework/docs/installer/REFERENCE.md`
- `framework/docs/installer/SCAFFOLD.md`
- `cuts/release-foundations-bundle-E-test-contract.report.md`
- `cuts/release-foundations-bundle-E-test-contract.meta.json`

## Verification

- `pytest framework/tests/tui/test_release_contract.py -v`: pass, 6 passed
- `grep -rn '\-\- --gui' framework/ README.md`: pass, zero output
- `grep -rn '\-\- --gui' site/public/install.sh`: pass, expected back-compat match at line 17
- `git diff --check`: pass
- `make test`: pass, 37 passed

## Boundary

No changes were made to `site/public/install.sh`; the `--gui` flag remains available for explicit/manual opt-in. No branch switch, worktree, stash, or push was performed.

## Layered Reading

No tool returned a truncation warning with a `see file:` dump path during this task, so no layered dump-file read was required.
