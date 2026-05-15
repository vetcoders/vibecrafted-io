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
centerLabel: "INSTALUJ · URUCHOM · OBSERWUJ"

# Heading sekcji — zachowuje inline <em class="accent-2"> i <br />.
headingHtml: 'Zainstaluj lokalnie<br />Niech każdy run zostawia <em class="accent-2">ślad</em>'

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
shotBody: "Sesja może się skończyć, ale nie musi zniknąć. Następny agent może odziedziczyć raporty, decyzje i otwarte pytania zamiast zimnego promptu."

# Bullety obok board preview.
bullets:
  - title: "Stan ma miejsce."
    body: "Artefakty żyją pod $VIBECRAFTED_ROOT/. Nie w pamięci taba, który akurat był otwarty."
  - title: "Runy zostawiają dowód."
    body: "Każdy run agenta może nieść prompt, raport, metadane i decyzję, którą miał wesprzeć."
  - title: "Undone zostaje widoczne."
    body: "DoU i marbles trzymają nierozwiązane kawałki na planszy, aż ktoś zdecyduje, co znaczą."

# Nawyki operatora — label + 4 hasła w stylu bannera.
practicesLabel: "NAWYKI OPERATORA"
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
      marbles: "04"
      coverage: 10
      pct: "100"
      state: "converged"
      stateLabel: "SKONWERGOWANE"
    - num: "01"
      phase: "craft"
      marbles: "12"
      coverage: 7
      pct: "078"
      state: "active"
      stateLabel: "AKTYWNE"
    - num: "02"
      phase: "convergence"
      marbles: "07"
      coverage: 4
      pct: "042"
      state: "active"
      stateLabel: "AKTYWNE"
    - num: "03"
      phase: "doU"
      marbles: "03"
      coverage: 0
      pct: "000"
      state: "waiting"
      stateLabel: "CZEKA"
    - num: "04"
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
      phase: "01/craft"
      msg: "3 pliki sprawdzone, 1 zmiana wymagana"
      status: "rej"
    - ts: "14:04:09"
      op: "ScreenScribe"
      phase: "01/craft"
      msg: "próbka runtime przechwycona"
      status: "ok"
    - ts: "14:04:31"
      op: "prview"
      phase: "01/craft"
      msg: "wysłane ponownie i zaakceptowane"
      status: "ok"
    - ts: "14:04:48"
      op: "loctree"
      phase: "02/convergence"
      msg: "zduplikowany groove zwinięty"
      status: "ok"
  douItems:
    - num: "01"
      severity: "block"
      phase: "DoU"
      text: "Status gate'u release nie jest zdefiniowany dla fazy 04."
    - num: "02"
      severity: "warn"
      phase: "craft"
      text: "2 marbles czekają na potwierdzenie pokrycia przez specjalistę."
    - num: "03"
      severity: "warn"
      phase: "release"
      text: "Szablon changeloga nie jest jeszcze podpięty do archiwum planszy."
  ticksAria: "{coverage} z 10 ticków wypełnione"
  caption: "Stan planszy zaobserwowany o {timestamp}, po sześciu rzutach przez fazy 00-02."
---
