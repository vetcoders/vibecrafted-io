/**
 * manifesto.ts — typed access to the bilingual manifesto content collection.
 *
 * The manifesto lives at `/manifesto?lang=en|pl`. EN is the canonical source
 * (mirrored verbatim from `vibecrafted/docs/THE_VIBE_HANGOVER.md`). PL ships
 * as a curated stub in v1 (status: `en-only-for-v1`) until a human-curated
 * translation lands — machine translation is intentionally not used because
 * the manifesto is voice-critical.
 *
 * Usage from a route:
 *
 *   const { Content, frontmatter } = await getManifestoContent('en');
 *   <Content />
 */

import { getEntry, render, type CollectionEntry } from "astro:content";
import type { Lang } from "./index";

export type ManifestoFrontmatter = CollectionEntry<"manifesto">["data"];

export interface ManifestoContent {
  Content: Awaited<ReturnType<typeof render>>["Content"];
  frontmatter: ManifestoFrontmatter;
  lang: Lang;
}

/**
 * Load + render a manifesto entry for the requested language. If the requested
 * entry is missing, serve the EN canonical entry instead so build never breaks
 * on a stale lang switch.
 */
export async function getManifestoContent(
  lang: Lang,
): Promise<ManifestoContent> {
  const entry =
    (await getEntry("manifesto", lang)) ?? (await getEntry("manifesto", "en"));

  if (!entry) {
    throw new Error(
      `Manifesto content entry not found for lang="${lang}" (and the EN canonical entry is also missing)`,
    );
  }

  const { Content } = await render(entry);
  return { Content, frontmatter: entry.data, lang: entry.data.lang };
}
