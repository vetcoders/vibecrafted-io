// Server-only data loader for the docs search index. Pulls from the
// `i18n` content collection (Astro server context). Pure search primitives
// and types live in ./docs-search.ts so client (Svelte) modules can import
// them without dragging astro:content into the client bundle.

import { getEntry } from "astro:content";
import type { Lang } from "../i18n";
import type {
  DocsSearchData,
  DocsSearchItem,
  DocsSearchSection,
} from "./docs-search";

export type {
  DocsSearchData,
  DocsSearchItem,
  DocsSearchResult,
  DocsSearchSection,
} from "./docs-search";
export { searchDocs } from "./docs-search";

// Inline shapes mirroring the i18n collection documents. The collection uses
// .passthrough() so frontmatter is typed as unknown Record; these inline
// interfaces describe exactly what docs.ts consumes. Keep aligned with
// site/content/{quickstart-steps,quickstart-resources,faq-content}/{en,pl}.md
type QuickstartStep =
  | {
      kicker: string;
      title: string;
      body: string;
      command: string;
      note?: string;
    }
  | {
      kicker: string;
      title: string;
      body: string;
      commands: string[];
      note?: string;
    };

interface QuickstartStepsData {
  steps: QuickstartStep[];
}

interface QuickstartResourceCard {
  kicker: string;
  title: string;
  items: string[];
}

interface QuickstartResourcesData {
  cards: QuickstartResourceCard[];
}

interface FaqItem {
  questionHtml: string;
  answerHtml: string;
  open?: boolean;
}

interface FaqGroup {
  title: string;
  items: FaqItem[];
}

interface FaqContentData {
  groups: FaqGroup[];
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
  steps: QuickstartStepsData,
  resources: QuickstartResourcesData,
) {
  const stepItems = steps.steps.map((step, index) => ({
    href: `#quickstart-step-${index + 1}`,
    title: step.title,
    body: `${step.kicker} ${step.body} ${
      "command" in step ? step.command : step.commands.join(" ")
    } ${"note" in step ? (step.note ?? "") : ""}`,
    keywords: toKeywords(
      step.kicker,
      step.title,
      step.body,
      "command" in step ? step.command : step.commands.join(" "),
      "note" in step ? (step.note ?? "") : "",
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
    items: [...stepItems, ...resourceCards],
  };
}

function getFaqItems(content: FaqContentData) {
  const items = content.groups.flatMap((group, groupIndex) =>
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

async function loadSection<T>(
  lang: Lang,
  name: "quickstartSteps" | "quickstartResources" | "faqContent",
): Promise<T> {
  const sections = {
    quickstartSteps: "quickstart-steps",
    quickstartResources: "quickstart-resources",
    faqContent: "faq-content",
  } as const;
  const id = `${sections[name]}/${lang}`;
  const entry = await getEntry("i18n", id);
  if (!entry) {
    throw new Error(`i18n entry not found: ${id}`);
  }
  return entry.data as unknown as T;
}

export async function getDocsSearchData(
  lang: Lang,
  sectionName: DocsSearchSection,
): Promise<DocsSearchData> {
  const [quickstartSteps, quickstartResources, faqContent] = await Promise.all([
    loadSection<QuickstartStepsData>(lang, "quickstartSteps"),
    loadSection<QuickstartResourcesData>(lang, "quickstartResources"),
    loadSection<FaqContentData>(lang, "faqContent"),
  ]);

  const quickstartHref = lang === "pl" ? "/pl/quickstart/" : "/en/quickstart/";
  const faqHref = lang === "pl" ? "/pl/faq/" : "/en/faq/";
  const quickstart = getQuickstartItems(quickstartSteps, quickstartResources);
  const faq = getFaqItems(faqContent);
  const globalSurfaces = getGlobalSurfaceItems(lang);

  const ui =
    lang === "pl"
      ? {
          emptyLabel: "Wpisz pytanie, komendę albo powierzchnię produktu.",
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
      items: quickstart.items,
    };
  }

  return {
    ...ui,
    items: faq.items,
  };
}
