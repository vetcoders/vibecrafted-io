# Content Truth Matrix

This document maps the repo's canonical docs to the live site surfaces that
consume them. It exists so future edits can reconcile public copy against
source-of-truth docs instead of drifting into a parallel narrative.

## Canonical Sources

- `docs/FOUNDATION.md`
- `docs/QUICK_START.md`
- `docs/FAQ-ANSWERED.md`
- `docs/runtime/README.md`
- `docs/runtime/MANIFESTO_EN.md`
- `docs/runtime/MANIFESTO_PL.md`
- `docs/runtime/CONTRACT.md`

## Live Surfaces

- `site/src/lib/i18n/en.ts`
- `site/src/lib/i18n/pl.ts`
- `site/src/content/pages/en/*.mdx`
- `site/src/content/pages/pl/*.mdx`

## Matrix

| Source document | Live site location | Drift status | Notes |
| --- | --- | --- | --- |
| `docs/FOUNDATION.md` | `site/src/lib/i18n/{en,pl}.ts` foundation cards and runtime foundation copy | match | The public foundation cards now align on loctree / aicx / prview / ScreenScribe roles and outbound links. |
| `docs/QUICK_START.md` | `site/src/lib/i18n/{en,pl}.ts` quickstart hero, steps, and get section | match | Public install truth now stays on the plain bootstrap command and points back to repo docs for guided installer detail. |
| `docs/FAQ-ANSWERED.md` | `site/src/lib/i18n/{en,pl}.ts` FAQ content | match | The FAQ now carries the ScreenScribe recovery path, doctor checks, and install/runtime wording without forking the docs. |
| `docs/runtime/README.md` | `site/src/lib/i18n/{en,pl}.ts` pipeline, evidence, skills, marbles, dou, references | partial | The site compresses the runtime overview into positioning copy plus canonical doc links. |
| `docs/runtime/MANIFESTO_EN.md` / `docs/runtime/MANIFESTO_PL.md` | `site/src/content/pages/{en,pl}/index.mdx` and the landing-page narrative blocks | partial | The homepage copy is close, but should stay anchored to the repo's actual workflow names and release posture. |
| `docs/runtime/CONTRACT.md` | `site/src/content/pages/{en,pl}/framework.mdx` and product-facing explanations of spawn / why-matrix / marbles | partial | The playground surface is accurate enough, but it should not promise a different install or agent lane than the docs. |

## ScreenScribe Repair Path

If `screenscribe review` fails with `Vision model 'programmer' not found`, the
problem is usually not just stale config.

Durable fix:

1. Open `~/.config/screenscribe/config.env`.
2. Keep the provider/base URL consistent with the models you choose.
3. For the default LibraxisAI path, use `SCREENSCRIBE_LLM_MODEL=ai-suggestions`
   and `SCREENSCRIBE_VISION_MODEL=ai-suggestions`.
4. Set `SCREENSCRIBE_VISION=false` to record operator intent.
5. Because the current `screenscribe review` CLI still overrides that stored
   flag, use the operator-facing launcher surface that injects `--no-vision`
   for plain review runs on the current Libraxis path.
6. If you switch to OpenAI endpoints, change both model names to a valid
   OpenAI Responses model and keep the endpoint/model pair consistent.

The repo docs now point to that path explicitly so future reviewers do not
have to infer it from the CLI error message.
