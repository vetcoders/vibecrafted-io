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
# headingHtml: false-precision contrast — "kompletne" (twarda obietnica) vs "kruche"
# (rzeczywistość). Druga linia to moment ujawnienia: "Po pierwszym użytkowniku często
# okazuje się, że..." — kontekstowy moment, nie suche stwierdzenie.
# Trzy accenty: "kompletne" (accent-2), "auth" (accent-2 wyróżnik), "kruche" (accent).
headingHtml: 'Aplikacje po agentach wyglądają na <em class="accent-2">kompletne</em>.<br />Po pierwszym użytkowniku często okazuje się, że <em class="accent-2">auth</em>, dane, płatności i deploy są wciąż <em class="accent">kruche</em>.'
body: "Demo dowieziesz prawie zawsze. Prawda najczęściej wychodzi przy pierwszej instalacji na innym OS, pierwszym Stripe webhook'u, pierwszym security review albo nowym koledze w zespole — to oni pokazują, czego żaden prompt nie wziął na siebie."

# Pary objawów (label + body). Renderowane jako lista 2 obserwacji pod heroem sekcji.
# Krótkie zdania z rytmem zamiast jednego long sentence. Polish idioms ("żyją gdzie popadnie",
# "się wywala") zamiast literal-translated phrasing.
symptoms:
  - label: "Security review"
    body: "Aplikacja działa. Auth ma dwie role: admin i user. Tokeny żyją gdzie popadnie. Nikt nie wie, kto ma dostęp do czego."
  - label: "Ścieżka pieniędzy"
    body: "Stripe działa. Dopóki nie przestanie. Webhook się wywala raz, retry nie ma, a klient zauważa brakującą usługę szybciej niż system."
---
