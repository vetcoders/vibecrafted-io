import { getTranslations, type Lang } from "../i18n";

export type DocsSearchSection = "quickstart" | "faq";

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
    const tokens = values
        .flatMap((value) =>
            stripHtml(value)
                .toLowerCase()
                .split(/[^a-z0-9ąćęłńóśźż-]+/i)
                .filter((token) => token.length >= 3)
        );

    return [...new Set(tokens)];
}

export function getDocsSearchData(lang: Lang, sectionName: DocsSearchSection): DocsSearchData {
    const dict = getTranslations(lang);

    const ui =
        lang === "pl"
            ? {
                  emptyLabel: "Wpisz pytanie, komendę albo powierzchnię produktu.",
                  fallbackLabel: "Skoki awaryjne",
                  noResultsLabel: "Brak mocnego trafienia. Skorzystaj z najbliższych wejść poniżej.",
                  placeholder:
                      sectionName === "faq"
                          ? "Szukaj po instalacji, licencji, runtime, skillach…"
                          : "Szukaj po instalacji, doctorze, init, workflow, release…",
                  resultsLabel: "Najbliższe trafienia",
              }
            : {
                  emptyLabel: "Ask for a command, product surface, or operating question.",
                  fallbackLabel: "Fast paths",
                  noResultsLabel: "No strong match yet. Use the closest entry points below.",
                  placeholder:
                      sectionName === "faq"
                          ? "Search installation, license, runtime, skills…"
                          : "Search install, doctor, init, workflow, release…",
                  resultsLabel: "Closest matches",
              };

    if (sectionName === "quickstart") {
        const hero = dict.sections.quickstartHero;
        const resources = dict.sections.quickstartResources;
        const steps = dict.sections.quickstartSteps.steps.map((step, index) => ({
            href: `#quickstart-step-${index + 1}`,
            title: step.title,
            body: `${step.kicker} ${step.body} ${"command" in step ? step.command : step.commands.join(" ")} ${
                "note" in step ? step.note : ""
            }`,
            keywords: toKeywords(
                step.kicker,
                step.title,
                step.body,
                "command" in step ? step.command : step.commands.join(" "),
                "note" in step ? step.note : "",
                "install bootstrap doctor init workflow justdo marbles release hydrate doctor setup prerequisites"
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
                "prerequisites foundations artifacts shell helpers control plane runtime"
            ),
        }));

        return {
            ...ui,
            fallbackLinks: [
                { href: hero.primaryHref, label: hero.primaryLabel },
                { href: hero.secondaryHref, label: hero.secondaryLabel },
                { href: "#quickstart-steps", label: lang === "pl" ? "Kroki" : "Steps" },
                { href: "#quickstart-resources", label: lang === "pl" ? "Zasoby" : "Resources" },
            ],
            items: [...steps, ...resourceCards],
        };
    }

    const hero = dict.sections.faqHero;
    const groups = dict.sections.faqContent.groups.flatMap((group, groupIndex) =>
        group.items.map((item, itemIndex) => ({
            href: `#faq-${groupIndex + 1}-${itemIndex + 1}`,
            title: stripHtml(item.questionHtml),
            body: `${group.title} ${item.answerHtml}`,
            keywords: toKeywords(
                group.title,
                item.questionHtml,
                item.answerHtml,
                "install runtime skills license shell foundations artifacts helpers automation"
            ),
        }))
    );

    return {
        ...ui,
        fallbackLinks: [
            { href: hero.primaryHref, label: hero.primaryLabel },
            { href: hero.secondaryHref, label: hero.secondaryLabel },
            { href: "#faq-content", label: lang === "pl" ? "Sekcje FAQ" : "FAQ sections" },
        ],
        items: groups,
    };
}
