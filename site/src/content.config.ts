import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

// i18n collection — one folder per section under site/content/<section>/{en,pl}.md
const i18n = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./content" }),
  schema: z.looseObject({
    // Shared optional fields — individual sections extend this loose object.
    title: z.string().optional(),
    lead: z.string().optional(),
    quote: z.string().optional(),
  }),
});

// manifesto collection — bilingual operator-voice manifesto rendered at
// `/manifesto?lang=en|pl`. EN is the canonical source (mirrored from
// `vibecrafted/docs/THE_VIBE_HANGOVER.md`). PL ships as a stub for v1 until
// a human-curated translation lands.
const manifesto = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/manifesto" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(["en", "pl"]),
    status: z.enum(["canonical", "en-only-for-v1"]).optional(),
  }),
});

// showcase collection — Plan 16. Three case studies of vibecrafted discipline
// in production. Public-source-only per kronika 2026-05-09 doctrine
// (no PII, no internal topology, no operator file paths, no internal report
// identity). Renders at `/showcase/` (index) and `/showcase/[slug]/` (per
// study). Markdown body holds the long-form prose; frontmatter holds the
// meta surface (title, lesson, plan/agent counts, duration, optional
// public GitHub link).
const showcase = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/showcase" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    lesson: z.string(),
    plan_count: z.number().optional(),
    agent_count: z.number().optional(),
    duration: z.string().optional(),
    description: z.string(),
    github_link: z.url().optional(),
  }),
});

// newsletter collection — Plan 19. Operator-voice updates published when
// vibecrafted ships. Markdown-first; pushed to Buttondown via the
// operator-side `scripts/buttondown-sync.sh` helper (env-gated, NOT
// runtime). Frontmatter mirrors showcase shape so the rendering surface
// stays familiar (title + date + summary). Optional `lesson` echoes the
// shipping discipline; optional `github_link` cross-links to the cut that
// motivated the issue. `summary` is required and feeds both archive cards
// and RSS <description>.
const newsletter = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/newsletter" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    lesson: z.string().optional(),
    github_link: z.url().optional(),
  }),
});

// docs collection — public docs mirror sourced from the sibling
// repo `../vibecrafted/docs/public/` via `scripts/sync-docs.sh`. DO NOT edit the
// generated files in `site/src/content/docs/` directly — the sync script
// overwrites them on every run. Edit upstream in `../vibecrafted/docs/public/`,
// then re-run sync.
//
// Frontmatter is copied byte-for-byte from the canonical public authoring tree.
// URL slugs are derived from each unique basename by the docs route.
const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(180),
    section: z.enum([
      "getting-started",
      "concepts",
      "cli",
      "lifecycle",
      "dispatch",
      "server",
      "skills",
      "configuration",
      "troubleshooting",
      "reference",
    ]),
    order: z.number().int(),
  }),
});

export const collections = {
  pages,
  i18n,
  manifesto,
  showcase,
  newsletter,
  docs,
};
