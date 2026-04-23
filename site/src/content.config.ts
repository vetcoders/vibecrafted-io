import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/i18n' }),
  schema: z
    .object({
      // Shared optional fields — individual sections extend via passthrough.
      frameworkTitle: z.string().optional(),
      lead: z.string().optional(),
      quote: z.string().optional(),
      evidence: z.string().optional(),
      quickstart: z.string().optional(),
      quickstartHref: z.string().optional(),
    })
    .passthrough(),
});

export const collections = {
  pages,
  i18n,
};
