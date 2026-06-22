---
# Operator V2 — install steps, board preview, nawyki operatora.
#
# Source of truth (do 2026-05-14): site/src/lib/i18n/pl.ts → landingV2.operator + v2Sections.operator
# Renderowane przez: site/src/components/sections/SectionOperator.astro
#
# Etap A migracji: markdown istnieje równolegle z pl.ts.
# Etap B (TBD przez parenta): komponent przepiąć na getEntry('i18n', 'pl/operator-v2').

# Chrome z landingV2.operator
title: "OPERATOR"
centerLabel: "INSTALUJ · PODAJ PAŁECZKĘ · OBSERWUJ"

# Heading sekcji — zachowuje inline <em class="accent-2"> i <br />.
headingHtml: 'Zainstaluj raz. Potem <em class="accent-2">podaj pałeczkę</em>'

# 3 kroki instalacji — każdy ma step label, komendę i notkę.
installSteps:
  - step: "KROK 01"
    command: "$ curl -fsSL vibecrafted.io/install.sh | bash"
    note: "Jeden lokalny bootstrap. Instaluje komendy i otwiera prowadzony launcher."
  - step: "KROK 02"
    command: "$ vibecrafted doctor"
    note: "Szybki health check, zanim agenci dotkną repo."
  - step: "KROK 03"
    command: "$ vibecrafted init claude"
    note: "Pierwszy przelot kontekstowy realnym agentem w realnym repo."

# Heading bloku z screenshotem planszy — zachowuje inline <em class="accent-2">.
shotHeadingHtml: 'Repo dostaje <em class="accent-2">wspólną powierzchnię</em>'
shotBody: "Sesja może się skończyć, ale nie musi zniknąć. Operator jest agentem: prowadzi sztafetę, a każdy odcinek podaje pałeczkę następnemu zawodnikowi — następny agent dziedziczy raporty, decyzje i otwarte pytania, nie zimny prompt. Ty zostajesz founderem — scope, gust, trudne przejścia, czucie projektu — sam nigdy nie biegniesz odcinków."

# Bullety obok board preview.
bullets:
  - title: "Stan ma miejsce."
    body: "Artefakty żyją pod $VIBECRAFTED_ROOT/. Nie w pamięci taba, który akurat był otwarty."
  - title: "Runy zostawiają dowód."
    body: "Każdy run agenta zostawia prompt, raport, metadane i decyzję, którą miał uzasadnić."
  - title: "Undone zostaje widoczne."
    body: "DoU i marbles trzymają nierozwiązane kawałki na planszy, aż ktoś zdecyduje, co znaczą."

# Nawyki operatora — label + 4 hasła w stylu bannera.
practicesLabel: "JAK TRZYMA SZTAFETA"
practices:
  - "JEDNO REPO, JEDNA POWIERZCHNIA"
  - "KONTRAKT PRZED PROMPTEM"
  - "DOWÓD PONAD NASTRÓJ"
  - "NIEROZWIĄZANE ZOSTAJE WIDOCZNE"

# BoardPreview — pełny snapshot planszy renderowany w prawej kolumnie sekcji.
# Wszystkie podstruktury (boardRows, marblesLog, douItems, headers, tabs) zachowane 1:1.
boardPreview:
  dwg: "VC-001 · REV A"
  timestamp: "t=14:04:48"
  meta: "20 MARBLES · 054 KONWERGENCJA"
  metaLeft: "STAN PLANSZY"
  live: "LIVE"
  tabsAria: "Widoki podglądu planszy"
  tabs:
    board: "PLANSZA"
    marbles: "MARBLES"
    dou: "DOU"
  boardHeaders:
    n: "N#"
    phase: "FAZA"
    marbles: "MARBLES"
    coverage: "POKRYCIE"
    state: "STAN"
  boardRows:
    - num: "00"
      phase: "scaffold"
      marbles: "03"
      coverage: 10
      pct: "100"
      state: "converged"
      stateLabel: "SKONWERGOWANE"
    - num: "01"
      phase: "implement"
      marbles: "08"
      coverage: 10
      pct: "100"
      state: "converged"
      stateLabel: "SKONWERGOWANE"
    - num: "02"
      phase: "review"
      marbles: "05"
      coverage: 10
      pct: "100"
      state: "converged"
      stateLabel: "SKONWERGOWANE"
    - num: "03"
      phase: "workflow"
      marbles: "06"
      coverage: 7
      pct: "072"
      state: "active"
      stateLabel: "AKTYWNE"
    - num: "04"
      phase: "follow-up"
      marbles: "03"
      coverage: 6
      pct: "058"
      state: "active"
      stateLabel: "AKTYWNE"
    - num: "05"
      phase: "marbles"
      marbles: "12"
      coverage: 5
      pct: "048"
      state: "active"
      stateLabel: "AKTYWNE"
    - num: "06"
      phase: "audit"
      marbles: "02"
      coverage: 0
      pct: "000"
      state: "waiting"
      stateLabel: "CZEKA"
    - num: "07"
      phase: "polarize"
      marbles: "00"
      coverage: 0
      pct: "000"
      state: "waiting"
      stateLabel: "CZEKA"
    - num: "08"
      phase: "doU"
      marbles: "00"
      coverage: 0
      pct: "000"
      state: "waiting"
      stateLabel: "CZEKA"
    - num: "09"
      phase: "hydrate"
      marbles: "00"
      coverage: 0
      pct: "000"
      state: "blocked"
      stateLabel: "BLOKADA"
    - num: "10"
      phase: "release"
      marbles: "00"
      coverage: 0
      pct: "000"
      state: "blocked"
      stateLabel: "BLOKADA"
  marblesHeaders:
    time: "CZAS"
    op: "OP"
    phase: "FAZA"
    marble: "MARBLE"
    status: "STATUS"
  marblesLog:
    - ts: "14:03:02"
      op: "loctree"
      phase: "00/scaffold"
      msg: "kształt przyjęty, 04 sloty przypisane"
      status: "ok"
    - ts: "14:03:18"
      op: "aicx"
      phase: "00/scaffold"
      msg: "snapshot intencji zapisany"
      status: "ok"
    - ts: "14:03:44"
      op: "prview"
      phase: "02/review"
      msg: "3 pliki sprawdzone, 1 zmiana wymagana"
      status: "rej"
    - ts: "14:04:09"
      op: "ScreenScribe"
      phase: "03/workflow"
      msg: "próbka runtime przechwycona"
      status: "ok"
    - ts: "14:04:31"
      op: "prview"
      phase: "02/review"
      msg: "wysłane ponownie i zaakceptowane"
      status: "ok"
    - ts: "14:04:48"
      op: "loctree"
      phase: "05/marbles"
      msg: "zduplikowany groove zwinięty"
      status: "ok"
  douItems:
    - num: "01"
      severity: "block"
      phase: "doU"
      text: "Status gate'u release nie jest zdefiniowany dla etapu 10."
    - num: "02"
      severity: "warn"
      phase: "marbles"
      text: "2 marbles czekają na potwierdzenie pokrycia przez specjalistę."
    - num: "03"
      severity: "warn"
      phase: "release"
      text: "Szablon changeloga nie jest jeszcze podpięty do archiwum planszy."
  ticksAria: "{coverage} z 10 ticków wypełnione"
  caption: "Stan planszy zaobserwowany o {timestamp}, po dwunastu rzutach przez etapy 00-05."
---
