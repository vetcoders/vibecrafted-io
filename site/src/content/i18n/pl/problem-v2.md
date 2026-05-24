---
# Problem V2 — Vibe hangover, kruche szwy po sesji AI.
#
# Source of truth (do 2026-05-14): site/src/lib/i18n/pl.ts → landingV2.problem + v2Sections.problem
# Renderowane przez: site/src/components/sections/SectionProblem.astro
#
# Etap A migracji: markdown istnieje równolegle z pl.ts.
# Etap B (TBD przez parenta): komponent przepiąć na getEntry('i18n', 'pl/problem-v2').

# Chrome z landingV2.problem (title + centerLabel renderowane w obwódce sekcji)
title: "PROBLEM"
centerLabel: "OBSERWACJE 2024–2026"

# Treść sekcji z v2Sections.problem.
# headingHtml: short statement (2 zdania) — false-precision "kompletne" vs "kruche".
# Storytelling moment "Po pierwszym użytkowniku..." przeniesiony do body.
# Nadmiar contentu z heading rozłożony w body + symptoms (editorial layout: column 1
# narzuca wysokość, kolumny prawe wypełniają do tej wysokości; trzecia OK krótsza).
headingHtml: 'Aplikacje po agentach wyglądają na <em class="accent-2">kompletne</em>.<br />Auth, dane, płatności i deploy są wciąż <em class="accent">kruche</em>'
body: "Po pierwszym użytkowniku często okazuje się, że demo to nie produkt. Prawda wychodzi przy pierwszej instalacji na innym OS, pierwszym Stripe webhook'u, pierwszym security review albo nowym koledze w zespole — to oni pokazują, czego żaden prompt nie wziął na siebie."

# Pary objawów (label + body). Renderowane jako 2 kolumny pod heroem sekcji.
# Bodies rozszerzone editorial-grade — wyrównanie do heading column height.
# Krótkie zdania z rytmem + konkret scen ("siedem profili w prod", "Discord support
# nie dashboard") zamiast abstrakcyjnych stwierdzeń.
symptoms:
  - label: "Security review"
    body: "Aplikacja działa. Auth ma dwie role: admin i user — ale w prod chodzi siedem profili, których nikt nie zmapował. Tokeny żyją gdzie popadnie: czasem w localStorage, czasem w cookie HTTP-only, czasem w obu naraz. Pierwsza rzecz na audycie: nikt nie wie, kto ma dostęp do czego. Druga: kiedy ktoś wyleci z zespołu, klucze zostają."
  - label: "Ścieżka pieniędzy"
    body: "Stripe działa. Dopóki nie przestanie. Webhook się wywala raz — nie ma retry, nie ma dead letter queue, nie ma alertu. Klient zauważa brakującą usługę szybciej niż system. Founder dowiaduje się z Discorda support, nie z dashboardu."
---
