# Roadmap: Prism → Polarize gate

**Status:** experimental, gated on Loctree prism MCP stable release.

`vc-polarize` is the polarization workflow that takes a smeared concept across runtime, tests, docs, and operator memory and chooses one canonical truth axis. The skill is implemented in the runner today (`vibecrafted/skills/vc-polarize/`) but kept under `framework/skills/experimental/` in this repository until the upstream Loctree prism MCP tool is exposed in a stable release of the [`loctree-suite`](https://github.com/Loctree/loctree-suite) plugin.

## Why gated

`vc-polarize` is structurally honest only when its band-action decision (abort / memo / pass / doctrine) is driven by external structural evidence rather than operator intuition. That evidence comes from `loct prism` — a multi-axis scoring of conceptual smear. The CLI form of `loct prism` is shipping today; the MCP-tool form (`mcp__loctree-mcp__prism`) is what allows agents to gate `vc-polarize` without shelling out.

| Surface                                                  | Status                                                                                                                                         |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `loct prism --json` (CLI)                                | shipping (loctree-suite 0.9.x)                                                                                                                 |
| `mcp__loctree-mcp__prism` (MCP tool)                     | landed in loctree-suite Unreleased; exposed by `loctree` Claude Code plugin v0.2.0                                                             |
| `loctree.prism.v1` JSON Schema (standalone)              | published at [`schemas/loctree.prism.v1.schema.json`](https://github.com/Loctree/loctree-suite/blob/main/schemas/loctree.prism.v1.schema.json) |
| Vibecrafted runner band parser (`vetcoders.sh`)          | landed (Plan 01) — abort 0..4 / memo 5..8 / pass 9..12 / doctrine 13..15                                                                       |
| `vc-operator` PolarizeBand DeepAction                    | landed (Plan 05)                                                                                                                               |
| `aicx` Context Corpus contract for prism artifacts       | landed (Plan 03) — see [`docs/CONTEXT_CORPUS.md`](https://github.com/Loctree/aicx/blob/main/docs/CONTEXT_CORPUS.md)                            |
| `vc-polarize` promotion to top-level `framework/skills/` | gated on stable Loctree plugin release                                                                                                         |

## What changes when the gate opens

When `loctree-suite` cuts a stable release that ships the prism MCP tool and the JSON Schema, three things happen:

1. The experimental skill at `framework/skills/experimental/vc-polarize/SKILL.md` is replaced by the canonical action-keyword version from `vibecrafted/skills/vc-polarize/SKILL.md` and promoted to `framework/skills/vc-polarize/SKILL.md`.
2. This roadmap entry moves from "experimental, gated" to "shipping, see CHANGELOG".
3. Marketplace consumers of the framework start receiving `vc-polarize` as a first-class workflow alongside `vc-marbles`, `vc-dou`, `vc-decorate`, `vc-hydrate`, and `vc-release`.

Until then, the skill is callable directly via the runner (`vetcoders.sh`) by operators who explicitly opt in. It is not a marketplace surface.

## References

- Vibecrafted runner band parser: [`vibecrafted/skills/vc-agents/shell/vetcoders.sh`](https://github.com/vetcoders/vibecrafted/blob/main/skills/vc-agents/shell/vetcoders.sh)
- Loctree prism handler: [`loctree-suite/loctree_rs/src/cli/dispatch/handlers/prism.rs`](https://github.com/Loctree/loctree-suite/blob/main/loctree_rs/src/cli/dispatch/handlers/prism.rs)
- vc-operator PolarizeBand: [`vc-operator/src/polarize.rs`](https://github.com/vetcoders/vibecrafted/tree/main/vc-operator)
- Aicx Context Corpus contract: [`aicx/docs/CONTEXT_CORPUS.md`](https://github.com/Loctree/aicx/blob/main/docs/CONTEXT_CORPUS.md)
