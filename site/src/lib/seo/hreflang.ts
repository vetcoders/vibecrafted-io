// Bilingual hreflang alternates for V2 routes.
//
// V1 Layout.astro emitted `<link rel="alternate" hreflang>` triplet +
// `<meta property="og:locale:alternate">` for every paired route. The V2
// migration (commit 4c10cdb) moved live routes to LayoutV2 / WizardLayout
// but did not port the head-level annotations — only sitemap.xml carried
// them forward. Restoring page-level hreflang gives Google a stronger
// cross-language pairing signal than sitemap alone.
//
// Keep this map in sync with the bilingual routes listed in
// `site/public/sitemap.xml`. Single-locale routes (showcase, newsletter,
// docs) are intentionally absent: they have no paired translation.

import type { Lang } from "../i18n";

const ROUTE_PAIRS: Record<string, string> = {
  "/": "/pl/",
  "/en/": "/pl/",
  "/en/quickstart/": "/pl/quickstart/",
  "/en/faq/": "/pl/faq/",
  "/en/framework/": "/pl/framework/",
  "/en/install/": "/pl/install/",
  "/en/dou/": "/pl/dou/",
};

const REVERSE_PAIRS: Record<string, string> = Object.fromEntries(
  Object.entries(ROUTE_PAIRS).map(([enPath, plPath]) => [plPath, enPath]),
);

export type LocaleAlternates = {
  en: string;
  pl: string;
};

export function getLocaleAlternates(pathname: string): LocaleAlternates | null {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (normalized in ROUTE_PAIRS) {
    return { en: normalized, pl: ROUTE_PAIRS[normalized] };
  }
  if (normalized in REVERSE_PAIRS) {
    return { en: REVERSE_PAIRS[normalized], pl: normalized };
  }
  return null;
}

export function getAlternateLocale(lang: Lang): "en_US" | "pl_PL" {
  return lang === "pl" ? "en_US" : "pl_PL";
}
