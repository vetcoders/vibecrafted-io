import { getTranslations, type Lang } from "../i18n";

export type DocsSearchSection = "all" | "quickstart" | "faq";

export interface DocsSearchItem {
  href: string;
  title: string;
  body: string;
  keywords: string[];
}

export interface DocsSearchData {
  emptyLabel: string;
  fallbackLabel: string;
  fallbackLinks: { href: string; label: string }[];
  items: DocsSearchItem[];
  noResultsLabel: string;
  placeholder: string;
  resultsLabel: string;
}

const HTML_ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&gt;": ">",
  "&lt;": "<",
  "&mdash;": " ",
  "&nbsp;": " ",
  "&rarr;": " ",
};

function stripHtml(value: string) {
  return value
    .replace(/<code>/g, " ")
    .replace(/<\/code>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, (entity) => HTML_ENTITY_MAP[entity] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toKeywords(...values: string[]) {
  const tokens = values.flatMap((value) =>
    stripHtml(value)
      .toLowerCase()
      .split(/[^a-z0-9ąćęłńóśźż-]+/i)
      .filter((token) => token.length >= 3),
  );

  return [...new Set(tokens)];
}

function getQuickstartItems(
  dict: ReturnType<typeof getTranslations>,
  lang: Lang,
) {
  const hero = dict.sections.quickstartHero;
  const resources = dict.sections.quickstartResources;

  const steps = dict.sections.quickstartSteps.steps.map((step, index) => ({
    href: `#quickstart-step-${index + 1}`,
    title: step.title,
    body: `${step.kicker} ${step.body} ${
      "command" in step ? step.command : step.commands.join(" ")
    } ${"note" in step ? step.note : ""}`,
    keywords: toKeywords(
      step.kicker,
      step.title,
      step.body,
      "command" in step ? step.command : step.commands.join(" "),
      "note" in step ? step.note : "",
      "install bootstrap doctor init workflow justdo marbles release hydrate doctor setup prerequisites",
    ),
  }));

  const resourceCards = resources.cards.map((card, index) => ({
    href: `#quickstart-resource-${index + 1}`,
    title: card.title,
    body: `${card.kicker} ${card.items.join(" ")}`,
    keywords: toKeywords(
      card.kicker,
      card.title,
      card.items.join(" "),
      "prerequisites foundations artifacts shell helpers control plane runtime",
    ),
  }));

  return {
    fallbackLinks: [
      { href: hero.primaryHref, label: hero.primaryLabel },
      { href: hero.secondaryHref, label: hero.secondaryLabel },
      { href: "#quickstart-steps", label: lang === "pl" ? "Kroki" : "Steps" },
      {
        href: "#quickstart-resources",
        label: lang === "pl" ? "Zasoby" : "Resources",
      },
    ],
    items: [...steps, ...resourceCards],
  };
}

function getFaqItems(dict: ReturnType<typeof getTranslations>, lang: Lang) {
  const hero = dict.sections.faqHero;
  const items = dict.sections.faqContent.groups.flatMap((group, groupIndex) =>
    group.items.map((item, itemIndex) => ({
      href: `#faq-${groupIndex + 1}-${itemIndex + 1}`,
      title: stripHtml(item.questionHtml),
      body: `${group.title} ${item.answerHtml}`,
      keywords: toKeywords(
        group.title,
        item.questionHtml,
        item.answerHtml,
        "install runtime skills license shell foundations artifacts helpers automation",
      ),
    })),
  );

  return {
    fallbackLinks: [
      { href: hero.primaryHref, label: hero.primaryLabel },
      { href: hero.secondaryHref, label: hero.secondaryLabel },
      {
        href: "#faq-content",
        label: lang === "pl" ? "Sekcje FAQ" : "FAQ sections",
      },
    ],
    items,
  };
}

function getGlobalSurfaceItems(lang: Lang): DocsSearchItem[] {
  const installHref = lang === "pl" ? "/pl/install/" : "/en/install/";
  const frameworkHref = lang === "pl" ? "/pl/framework/" : "/en/framework/";
  const pipelineHref = lang === "pl" ? "/pl/#pipeline" : "/en/#pipeline";

  return [
    {
      href: frameworkHref,
      title: lang === "pl" ? "Framework playground" : "Framework playground",
      body:
        lang === "pl"
          ? "Interaktywna plansza konwergencji dla scaffold, init, workflow, followup, marbles, DoU, decorate, hydrate i release."
          : "Interactive convergence board for scaffold, init, workflow, follow-up, marbles, DoU, decorate, hydrate, and release.",
      keywords: toKeywords(
        "framework playground convergence board scaffold init workflow followup marbles dou decorate hydrate release demo",
      ),
    },
    {
      href: installHref,
      title: lang === "pl" ? "Prowadzony instalator" : "Guided installer",
      body:
        lang === "pl"
          ? "Browser-guided install flow do sprawdzenia wymagań, planu bootstrapu i pierwszego uruchomienia frameworka."
          : "Browser-guided install flow for prerequisites, bootstrap planning, and the first framework launch.",
      keywords: toKeywords(
        "install installer guided setup bootstrap doctor prerequisites shell wizard browser",
      ),
    },
    {
      href: pipelineHref,
      title: "Craft -> Converge -> Ship",
      body:
        lang === "pl"
          ? "Cały pipeline produktu: Scaffold, Init, Workflow, Follow-up, Marbles, DoU, Decorate, Hydrate, Release."
          : "The full product pipeline: Scaffold, Init, Workflow, Follow-up, Marbles, DoU, Decorate, Hydrate, Release.",
      keywords: toKeywords(
        "pipeline craft converge ship scaffold init workflow followup marbles dou decorate hydrate release",
      ),
    },
  ];
}

function prefixItems(
  items: DocsSearchItem[],
  pageHref: string,
): DocsSearchItem[] {
  return items.map((item) => ({
    ...item,
    href: item.href.startsWith("#") ? `${pageHref}${item.href}` : item.href,
  }));
}

export function getDocsSearchData(
  lang: Lang,
  sectionName: DocsSearchSection,
): DocsSearchData {
  const dict = getTranslations(lang);
  const quickstartHref = lang === "pl" ? "/pl/quickstart/" : "/en/quickstart/";
  const faqHref = lang === "pl" ? "/pl/faq/" : "/en/faq/";
  const quickstart = getQuickstartItems(dict, lang);
  const faq = getFaqItems(dict, lang);
  const globalSurfaces = getGlobalSurfaceItems(lang);

  const ui =
    lang === "pl"
      ? {
          emptyLabel: "Wpisz pytanie, komendę albo powierzchnię produktu.",
          fallbackLabel: "Skoki awaryjne",
          noResultsLabel:
            "Brak mocnego trafienia. Skorzystaj z najbliższych wejść poniżej.",
          placeholder:
            sectionName === "faq"
              ? "Szukaj po instalacji, licencji, runtime, skillach…"
              : sectionName === "all"
                ? "Szukaj po frameworku, installu, doctorze, init, workflow, release…"
                : "Szukaj po instalacji, doctorze, init, workflow, release…",
          resultsLabel: "Najbliższe trafienia",
        }
      : {
          emptyLabel:
            "Ask for a command, product surface, or operating question.",
          fallbackLabel: "Fast paths",
          noResultsLabel:
            "No strong match yet. Use the closest entry points below.",
          placeholder:
            sectionName === "faq"
              ? "Search installation, license, runtime, skills…"
              : sectionName === "all"
                ? "Search framework, install, doctor, init, workflow, release…"
                : "Search install, doctor, init, workflow, release…",
          resultsLabel: "Closest matches",
        };

  if (sectionName === "all") {
    return {
      ...ui,
      fallbackLinks: [
        { href: globalSurfaces[0].href, label: globalSurfaces[0].title },
        { href: globalSurfaces[1].href, label: globalSurfaces[1].title },
        {
          href: quickstart.fallbackLinks[0].href,
          label: quickstart.fallbackLinks[0].label,
        },
        { href: faq.fallbackLinks[0].href, label: faq.fallbackLinks[0].label },
      ],
      items: [
        ...globalSurfaces,
        ...prefixItems(quickstart.items, quickstartHref),
        ...prefixItems(faq.items, faqHref),
      ],
    };
  }

  if (sectionName === "quickstart") {
    return {
      ...ui,
      fallbackLinks: quickstart.fallbackLinks,
      items: quickstart.items,
    };
  }

  return {
    ...ui,
    fallbackLinks: faq.fallbackLinks,
    items: faq.items,
  };
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
