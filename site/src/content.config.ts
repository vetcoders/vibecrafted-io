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

// i18n collection — per-locale page sections. Each file is a logical section
// (hero, pipeline, skills, ...) with redaction-friendly YAML frontmatter for
// structured data and markdown body for long prose. Monika edits these
// directly; type safety is enforced by zod on build.
const i18n = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/i18n" }),
  schema: z.looseObject({
    // Shared optional fields — individual sections extend this loose object.
    frameworkTitle: z.string().optional(),
    lead: z.string().optional(),
    quote: z.string().optional(),
    evidence: z.string().optional(),
    quickstart: z.string().optional(),
    quickstartHref: z.string().optional(),
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

export const collections = {
  pages,
  i18n,
  manifesto,
  showcase,
};
