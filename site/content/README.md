# Landing copy

One folder per section. Two files, always: `en.md` and `pl.md`.

```
content/<section>/{en,pl}.md
```

Astro loads this tree as the `i18n` collection (`src/content.config.ts`).
Old paths under `src/content/i18n/{en,pl}/*-v2.md` are symlinks back here.

| folder | surface |
|---|---|
| `hero` | landing hero |
| `about` | 01 · ABOUT (was "the problem") |
| `surface` | product shots |
| `install` | what you install |
| `engineering` | engineering |
| `shift` | the shift |
| `framework` | the framework |
| `operator` | operator / runtime |
| `quickstart` | landing quickstart strip |
| `references` | references |
| `evidence` | evidence |
| `commercial` | pricing |
| `footer` | section footers |
| `contact` | contact form |
| `newsletter` | newsletter |
| `pilot` | paid pilot page |
| `faq-hero` / `faq-content` | FAQ (legacy MDX) |
| `quickstart-hero` / `quickstart-steps` / `quickstart-resources` | /quickstart |

Chrome (nav labels) still lives in `src/lib/i18n/{en,pl}.ts` — it is
client-side. Simulator strings stay in `operator-tui.ts`.
