import { getEntry } from "astro:content";
import type { Lang } from "./i18n";

/**
 * Landing copy lives at site/content/<section>/{en,pl}.md
 * (Astro collection id: `<section>/<lang>`).
 */
export async function loadCopy(section: string, lang: Lang) {
  const id = `${section}/${lang}`;
  const entry = await getEntry("i18n", id);
  if (!entry) {
    throw new Error(`Missing copy: content/${section}/${lang}.md`);
  }
  return entry.data;
}
