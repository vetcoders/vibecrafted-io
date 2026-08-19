---
name: vibecrafted-meta-22-scaffold-to-release-io-mirror
description: io-side mirror of the canonical 22-plan meta-roadmap. Lists the 9 io-side plans inline + cross-cutting Plan 22 expectations. Full plan body + waves + dependency graph + TRACKER lives in `vibecrafted/docs/plans/META_22_SCAFFOLD_TO_RELEASE.md`.
type: meta_roadmap_mirror
canonical_source: ../../vibecrafted/docs/plans/META_22_SCAFFOLD_TO_RELEASE.md
project: vetcoders/vibecrafted-io
parent_repo: vetcoders/vibecrafted
created: 2026-05-10
sibling_existing: prism-polarize-gate.md (vc-polarize skill promotion gate, complementary scope)
---

# 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. v2.0 — io-side roadmap mirror

> **Canonical roadmap lives at** `vibecrafted/docs/plans/META_22_SCAFFOLD_TO_RELEASE.md`.
> This file is the io-side excerpt — plans 13-21 inline + Plan 22 cross-cutting
> expectations + sibling reference to `prism-polarize-gate.md` (which gates
> the `vc-polarize` skill promotion, a complementary surface to this roadmap's
> Plan 01).
>
> 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. with AI Agents by Vetcoders (c)2024-2026 LibraxisAI

---

## io-side plans (the 9 plans landing in this repo)

### Wave 5 — Public surface foundation

#### Plan 13 — `landing-v2-editorial-tech-design-pass`

Adopt loctree-com design system: warm-dark `--ink #0e0e0e` + cream-on-ink
`--bone #f5f1e7` + restrained teal/amber accents. Serif display + sans body +
monospace UI. 5 inlined CSS files pattern (tokens/fonts/main + blog + docs).

**Files:** `styles/tokens.css` (vendor from loctree-com) · `styles/fonts.css` (vendor) · `styles/main.css` (refactor) · `site/src/layouts/LayoutV2.astro` (consume tokens) · `public/fonts/*.woff2` (vendor).

**Anti-aesthetic gates:** no pure black, no gradient soup, no glow/blur, no glass-morphism, no CRT scanlines, no animated entrance / scroll-jack.

---

#### Plan 14 — `manifesto-bilingual-en-pl-unified`

Unify `vibecrafted/docs/THE_VIBE_HANGOVER.md` (canonical EN) + `pl/` partials
into single `/manifesto` route with language toggle. CTA to install
(`https://loct.io/install.sh` per loctree-com BRAND.md).

**Files:** `site/src/pages/manifesto.astro` (NEW) · `site/src/content/manifesto-en.md` (NEW) · `site/src/content/manifesto-pl.md` (NEW) · `site/src/lib/i18n/manifesto.ts` (NEW).

---

#### Plan 15 — `docs-site-astro-docsearch-skills-architecture-install`

Surface vibecrafted/docs/ at `/docs/<slug>` via Astro catch-all route + Astro
DocSearch. Sidebar nav: Architecture / Install / Skills Reference / FAQ /
Manifesto. Sync script idempotent.

**Files:** `site/src/pages/docs/[...slug].astro` (NEW) · `site/src/content/docs/` (NEW, mirror) · `scripts/sync-docs.sh` (NEW) · `site/src/lib/docsearch.ts` (NEW).

---

#### Plan 16 — `showcase-case-studies-loctree-vista-audit22`

Three public proof artifacts: (1) Loctree LSP roadmap close-out, (2) Vista
sealed-env weekend, (3) Audit-22 parallel-truth reconciliation. Public-source-
only per kronika 2026-05-09 leak-prevention doctrine.

**Files:** `site/src/pages/showcase/index.astro` (NEW) + 3 per-study pages.

---

### Wave 6 — Brand & marketing polish

#### Plan 17 — `og-images-and-social-cards-per-page-dynamic`

Per-page dynamic OG via Astro endpoint or Vercel OG. Brand-token colors only;
no stock images.

**Files:** `site/src/pages/og/[slug].png.ts` (NEW) · `site/src/lib/og-renderer.ts` (NEW) · `scripts/og-prerender.sh` (NEW).

---

#### Plan 18 — `seo-indexability-llms-txt-schema-org`

Sitemap.xml comprehensive + robots.txt + schema.org JSON-LD + `llms.txt` for
LLM-discovery.

**Files:** `site/public/sitemap.xml` (regen) · `site/public/robots.txt` (refresh) · `site/src/components/SchemaOrg.astro` (NEW) · `site/public/llms.txt` (NEW).

---

#### Plan 19 — `newsletter-buttondown-community-surface`

Buttondown markdown-first newsletter. Footer signup + archive at `/newsletter`

- RSS. No transactional email.

**Files:** `site/src/components/NewsletterSignup.astro` (NEW) · `site/src/pages/newsletter/index.astro` (NEW) · `site/src/pages/newsletter/[slug].astro` (NEW) · `scripts/buttondown-sync.sh` (NEW).

---

### Wave 7 — Commercial & release (io-side)

#### Plan 20 — `pricing-surface-and-tier-definition`

Hypothetical tier shape (subject to Plan 01 polarize verdict):

| Tier       | Price          | Includes                                                             |
| ---------- | -------------- | -------------------------------------------------------------------- |
| Solo       | Free           | Local install, 20 skills, foundations, single-machine AICX           |
| Pro        | $9/mo          | + Cloud Sync cross-machine + memex retrieval cross-session           |
| Team       | $19.90/seat/mo | + multi-agent mesh + shared AICX corpus + zellij dashboard team mode |
| Enterprise | Contact        | + self-host bundle + SSO + audit log + SLA                           |

**Files:** `site/src/pages/pricing.astro` (NEW) · `site/src/content/pricing/tiers.md` (NEW) · `site/src/components/PricingTable.astro` (NEW).

---

#### Plan 21 — `polar-sh-checkout-integration`

Adopt loctree-com Polar.sh pattern (already shipped under
`loctree-com/docs/licensing/polar-sh/01-11`). 4 Polar.sh products → checkout
flow → tier-gated state → webhook event dispatcher with signature verification.

**Files:** `site/src/pages/api/v1/checkout.ts` (NEW) · `site/src/pages/api/v1/webhook.ts` (NEW) · `site/src/lib/polar-client.ts` (NEW) · `.env.example` (NEW POLAR_* keys) · `site/src/pages/account.astro` (NEW) · `~/.keys/polar-sh.env` (operator-side, NOT committed).

---

## Cross-cutting plans (both repos)

### Plan 01 — `polarize-identity-icp-dou-template`

Run `/vc-polarize` over 5 vibecrafted product framings (local CLI · skill
marketplace · Cloud Sync platform · enterprise release engine · manifesto +
community brand). Emit:

- Primary axis decision-of-record at `vibecrafted/docs/POLARIZE_v2.md` (canonical).
- Cross-link at `vibecrafted-io/docs/roadmap/POLARIZE_v2.md`.
- ICP + Anti-ICP one-paragraph each.
- W2-W7 plan reprioritization (scope-up / scope-down / unchanged).

**Sibling reference (existing):** `prism-polarize-gate.md` in this directory
documents the vc-polarize _skill promotion_ gate (blocked on stable Loctree
0.10.0 plugin release). That gate is **complementary** to Plan 01:

- `prism-polarize-gate.md` = "when does vc-polarize the skill become marketplace-grade?"
- Plan 01 = "let's USE vc-polarize on the vibecrafted product framings to choose primary axis"

Both surfaces live in parallel. Plan 01 can run today via the runner
(`vetcoders.sh`) even though marketplace promotion of `vc-polarize` waits
for the Loctree 0.10.0 stable cut.

---

### Plan 22 — `release-engine-self-shipping-v2-launch-with-drew-demo`

Capstone. 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. ships itself end-to-end via its own `/vc-release`
skill: DoU audit + Sentry + analytics + SEO + install smoke + Drew demo +
v2.0 tag on both repos.

**io-side deliverables:**

- `site/src/pages/launch.astro` (announcement page)
- `docs/LAUNCH_CHECKLIST.md` (operator runbook)
- Public install path signature verified (`install.sh.sig` lives here)
- Manifesto refresh + showcase update + newsletter blast within 1h of public availability

**Sibling deliverables (vibecrafted side):**

- `skills/vc-release/SKILL.md` v2 refresh
- `CHANGELOG.md` v2.0 entry
- `VERSION` bump
- Sentry / analytics integration smoke

**Drew demo handoff:** scheduled, executed, debrief recorded (kronika
2026-05-08: _"Przełożyłem demo Drew. Musimy pędzić w skupieniu nie w pośpiechu"_
— this plan closes that postponement loop).

---

## io-side TRACKER (live status)

Edit inline before/after each plan; bump `last_updated` in frontmatter.

| #   | Plan              | Status | Owner | Wave | Branch | Started | Completed | Report                                  |
| --- | ----------------- | ------ | ----- | ---- | ------ | ------- | --------- | --------------------------------------- |
| 13  | landing-v2        | queued | —     | W5   | —      | —       | —         | `docs/roadmap/reports/13-landing-v2.md` |
| 14  | manifesto-EN-PL   | queued | —     | W5   | —      | —       | —         | `docs/roadmap/reports/14-manifesto.md`  |
| 15  | docs-site         | queued | —     | W5   | —      | —       | —         | `docs/roadmap/reports/15-docs-site.md`  |
| 16  | showcase          | queued | —     | W5   | —      | —       | —         | `docs/roadmap/reports/16-showcase.md`   |
| 17  | og-images         | queued | —     | W6   | —      | —       | —         | `docs/roadmap/reports/17-og-images.md`  |
| 18  | seo-llms-txt      | queued | —     | W6   | —      | —       | —         | `docs/roadmap/reports/18-seo.md`        |
| 19  | newsletter        | queued | —     | W6   | —      | —       | —         | `docs/roadmap/reports/19-newsletter.md` |
| 20  | pricing-tiers     | queued | —     | W7   | —      | —       | —         | `docs/roadmap/reports/20-pricing.md`    |
| 21  | polar-sh-checkout | queued | —     | W7   | —      | —       | —         | `docs/roadmap/reports/21-checkout.md`   |

For cross-cutting plans 01 + 22, status lives in the canonical TRACKER at
`vibecrafted/docs/plans/META_22_SCAFFOLD_TO_RELEASE.md` §7.

---

## Coordination with sibling roadmaps

- **`prism-polarize-gate.md`** (this directory): complementary surface,
  documents vc-polarize _skill_ promotion gate. Plan 01 of META_22 uses
  vc-polarize as a tool; promotion-readiness of the skill is its own track.
- **vibecrafted v2.0 launch** (Plan 22): both repos tag v2.0.0 simultaneously.
  CI gates ensure neither tags without the other.
- **loctree-com Polar.sh substrate**: vibecrafted-io Plan 21 vendors the
  Polar.sh client integration pattern from
  `loctree-com/docs/licensing/polar-sh/03-polar-rust-client.md` +
  `05-webhook-endpoint-signature.md` + `06-webhook-event-dispatcher.md` +
  `09-tier-gating-state.md`. No fork; pattern transfer.
- **Brand source-of-truth**: loctree-com is upstream brand authority per
  kronika 2026-05-09 BRAND.md decision. vibecrafted-io vendors design tokens
  - fonts from loctree-com.

---

## Activity log (append-only)

```
2026-05-10T23:55Z meta-22 io-mirror created (canonical lives at vibecrafted/docs/plans/META_22_SCAFFOLD_TO_RELEASE.md; 9 io-side plans excerpted + 2 cross-cutting plans referenced; sibling prism-polarize-gate.md noted as complementary scope)
```

---

_Canonical roadmap: `vibecrafted/docs/plans/META_22_SCAFFOLD_TO_RELEASE.md`._
_Read that file for full plan bodies, dependency graph, wave schedule, DoU,
SoTA-grade definition, and cross-references._
