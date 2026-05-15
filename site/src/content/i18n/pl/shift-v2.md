---
# Shift V2 — Vibe → Produkt; bez planszy vs z planszą.
#
# Source of truth (do 2026-05-14): site/src/lib/i18n/pl.ts → landingV2.shift + v2Sections.shift
# Renderowane przez: site/src/components/sections/SectionShift.astro
#
# Etap A migracji: markdown istnieje równolegle z pl.ts.
# Etap B (TBD przez parenta): komponent przepiąć na getEntry('i18n', 'pl/shift-v2').

# Chrome z landingV2.shift
title: "ZMIANA"
centerLabel: "VIBE → PRODUKT"

# Heading split — komponent klei pieces:
#   first + firstAccent  → linia 1 ("Większość sesji AI zostawia *fragmenty.*")
#   second + secondAccent → linia 2 ("Vibecrafted nadaje pracy *współrzędne.*")
heading:
  first: "Większość sesji AI zostawia"
  firstAccent: "fragmenty."
  second: "Vibecrafted nadaje pracy"
  secondAccent: "współrzędne."

# Labelki nad dwiema kolumnami porównania.
todayLabel: "Bez planszy"
vibecraftedLabel: "Z planszą"

# Lewa kolumna — stan bez planszy.
todayItems:
  - number: "01"
    title: "Kontekst paruje."
    body: "Następna sesja może odziedziczyć diff, ale nie powód stojący za zmianą. Repo ma zmiany; praca nie ma pamięci."
  - number: "02"
    title: "Retry staje się metodą."
    body: "Przejście kompilacji zaczyna wyglądać jak dowód. To użyteczny sygnał, tylko nie wystarcza, żeby wiedzieć, czy produkt jest bezpieczny."
  - number: "03"
    title: "Done zostaje mgliste."
    body: "Artefakty zbierają się w komentarzach, branchach, notatkach i screenshotach. Kolejny agent widzi części, ale nie widzi kształtu."

# Prawa kolumna — stan z planszą Vibecrafted.
vibecraftedItems:
  - number: "01"
    title: "Kontrakt jest widoczny."
    body: "Zakres, owner, dowód i następny ruch siedzą na tej samej powierzchni, zanim agent zacznie ciąć."
  - number: "02"
    title: "Ślad przeżywa sesję."
    body: "Raporty i artefakty zostają przy repo, więc następna sesja może iść od dowodu, a nie od nastroju."
  - number: "03"
    title: "Konwergencję da się obejrzeć."
    body: "Plansza nie ogłasza zwycięstwa. Pokazuje, co wylądowało, co się przesunęło i co nadal prosi o decyzję."

# Pasek liczbowy pod kolumnami (4 metryki).
proofItems:
  - count: "05"
    label: "FAZY"
  - count: "06"
    label: "OPERATORZY"
  - count: "01"
    label: "PLANSZE"
  - count: "00"
    label: "UTRACONY KONTEKST"
---
