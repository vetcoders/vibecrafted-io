// Pure client-safe search primitives + types. Importable from Svelte
// components without dragging `astro:content` (server-only) into the client
// bundle. The server-side data loader lives in `./docs.ts`.

import type { Lang } from "../i18n";

export type DocsSearchSection = "all" | "quickstart" | "faq";

export interface DocsSearchItem {
  href: string;
  title: string;
  body: string;
  keywords: string[];
}

export interface DocsSearchData {
  emptyLabel: string;
  items: DocsSearchItem[];
  noResultsLabel: string;
  placeholder: string;
  resultsLabel: string;
}

export interface DocsSearchResult extends DocsSearchItem {
  score: number;
}

const ALIAS_MAP = {
  en: {
    install: ["bootstrap", "setup", "doctor", "shell"],
    doctor: ["health", "check", "diagnostics", "doctor"],
    init: ["bootstrap", "context", "map", "repo"],
    workflow: ["implement", "research", "pipeline", "agents"],
    release: ["ship", "launch", "hydrate", "decorate", "dou"],
    license: ["bsl", "business", "source"],
    runtime: ["control", "plane", "artifacts"],
  },
  pl: {
    instalacja: ["bootstrap", "doctor", "setup", "shell"],
    doctor: ["diagnoza", "sprawdzenie", "health"],
    init: ["kontekst", "mapowanie", "repo"],
    workflow: ["implementacja", "research", "pipeline", "agenci"],
    release: ["ship", "launch", "hydrate", "decorate", "dou"],
    licencja: ["bsl", "business", "source"],
    runtime: ["control", "plane", "artefakty"],
  },
} as const;

function tokenizeQuery(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9ąćęłńóśźż-]+/i)
    .filter((token) => token.length >= 2);
}

export function searchDocs(
  items: DocsSearchItem[],
  lang: Lang,
  query: string,
  limit = 6,
): DocsSearchResult[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const tokens = tokenizeQuery(trimmed);
  const aliases = ALIAS_MAP[lang];
  const expanded = new Set<string>(tokens);

  for (const token of tokens) {
    for (const [stem, related] of Object.entries(aliases)) {
      if (token.startsWith(stem) || stem.startsWith(token)) {
        expanded.add(stem);
        for (const variant of related) expanded.add(variant);
      }
    }
  }

  const terms = [...expanded];

  return items
    .map((item) => {
      const titleTokens = tokenizeQuery(item.title);
      const bodyTokens = tokenizeQuery(item.body);
      let score = 0;

      for (const term of terms) {
        if (
          titleTokens.some(
            (token) => token.startsWith(term) || term.startsWith(token),
          )
        )
          score += 4;
        if (
          item.keywords.some(
            (keyword) => keyword.startsWith(term) || term.startsWith(keyword),
          )
        )
          score += 3;
        if (
          bodyTokens.some(
            (token) => token.startsWith(term) || term.startsWith(token),
          )
        )
          score += 1;
      }

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);
}
