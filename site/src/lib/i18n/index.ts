import { en } from "./en";
import { pl } from "./pl";

export type Lang = "en" | "pl";

const dicts = { en, pl } as const;

export type TranslationDict = typeof en;

export function getTranslations(lang: Lang): TranslationDict {
  return (dicts[lang] ?? en) as TranslationDict;
}
