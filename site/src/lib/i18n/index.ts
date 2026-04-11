import { en } from "./en";
import { pl } from "./pl";

export type Lang = "en" | "pl";

const dicts = { en, pl } as const;

export type TranslationDict = typeof en;

export function getTranslations(lang: Lang): TranslationDict {
  return (dicts[lang] ?? en) as TranslationDict;
}

/**
 * Translate a dotted key ('nav.pipeline', 'footer.tagline') for the given
 * language. Returns the key itself if not found, so missing translations are
 * visible in the UI during development.
 */
export function t(lang: Lang, key: string): string {
  const parts = key.split(".");
  let value: unknown = getTranslations(lang);

  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}
