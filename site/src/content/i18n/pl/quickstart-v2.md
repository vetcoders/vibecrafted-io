---
# Quickstart V2 — 6-step carousel od INIT do SHIP.
#
# Source of truth (do 2026-05-14): site/src/lib/i18n/pl.ts → landingV2.quickstart + v2Sections.quickstart
# Renderowane przez: site/src/components/sections/SectionQuickstart.astro
#                    + site/src/components/QuickstartCarousel.svelte
#
# Etap A migracji: markdown istnieje równolegle z pl.ts.
# Etap B (TBD przez parenta): komponent przepiąć na getEntry('i18n', 'pl/quickstart-v2').

# Chrome z landingV2.quickstart
title: "SZYBKI START"
centerLabel: "INIT → SHIP · 6 KOMEND"

# Heading sekcji — zachowuje inline <em>.
headingHtml: "Zacznij od pierwszego <em>użytecznego sygnału</em>"

# Karuzela 6 kroków + chrome (aria, labels, nav).
carousel:
  ariaLabel: "Karuzela kroków szybkiego startu"
  slideAria: "Krok {num}: {title}"
  landsLabel: "TRAFIA:"
  convergeLabel: "KONWERGENCJA"
  previousLabel: "Poprzedni krok"
  nextLabel: "Następny krok"
  dotsLabel: "Nawigacja kroków"
  goToStep: "Przejdź do kroku {number}"
  steps:
    - num: "01"
      verb: "CHECK"
      accent: "default"
      state: 0
      pct: "000"
      title: "Sprawdź lokalną powierzchnię."
      body: "Zacznij od nudnego sygnału: czy launcher wie, gdzie jest, co ma zainstalowane i co wymaga uwagi?"
      command: "$ vibecrafted doctor"
      lands:
        - "ZDROWIE INSTALACJI"
        - "FOUNDATIONS"
        - "PRAWDA LAUNCHERA"
    - num: "02"
      verb: "INIT"
      accent: "default"
      state: 0.3
      pct: "030"
      title: "Niech agent najpierw przeczyta."
      body: "Init może wydobyć kształt repo, świeży kontekst i pierwsze ryzyka, zanim zacznie się jakakolwiek edycja."
      command: "$ vibecrafted init claude"
      lands:
        - "MAPA REPO"
        - "PIERWSZY KONTEKST"
        - "NASTĘPNY RUCH"
    - num: "03"
      verb: "WORKFLOW"
      accent: "default"
      state: 0.6
      pct: "060"
      title: "Wybierz tor pracy."
      body: "Workflow pomaga, gdy zadanie potrzebuje odrobiny ceremonii: obejrzeć powierzchnię, zbadać lukę, a potem wykonać cięcie."
      command: '$ vibecrafted workflow claude --prompt "Plan and implement <task>"'
      lands:
        - "PLAN"
        - "TOR IMPLEMENTACJI"
        - "ŚLAD RAPORTU"
    - num: "04"
      verb: "MARBLES"
      accent: "default"
      state: 0.75
      pct: "075"
      title: "Poszukaj tego, co jeszcze gryzie."
      body: "Marbles odpala małe pętle kontrprzykładów. Może znaleźć edge case, fałszywe założenie albo po prostu miejsce, które wymaga decyzji człowieka."
      command: "$ vibecrafted marbles codex --count 3 --depth 3"
      lands:
        - "KONTRPRZYKŁADY"
        - "PĘTLE FIXÓW"
        - "SYGNAŁ KONWERGENCJI"
    - num: "05"
      verb: "DOU"
      accent: "teal"
      state: 0.9
      pct: "090"
      title: "Nazwij niedomknięte miejsca."
      body: "DoU to moment, żeby przestać udawać. Pyta, czego brakuje w instalacji, docsach, runtime, zaufaniu i release."
      command: '$ vibecrafted dou claude --prompt "Audit launch readiness"'
      lands:
        - "LISTA UNDONE"
        - "RYZYKA SHIPU"
        - "PRAWDA PRODUKTU"
    - num: "06"
      verb: "RELEASE"
      accent: "teal"
      state: 1
      pct: "100"
      title: "Przygotuj handoff."
      body: "Release zbiera pracę na zewnątrz: artefakty, notatki deployu, docs i następny krok czytelny dla człowieka."
      command: '$ vibecrafted release codex --prompt "Prepare release steps"'
      lands:
        - "PLAN RELEASE"
        - "CHECK ARTEFAKTÓW"
        - "NASTĘPNE KROKI"
---
