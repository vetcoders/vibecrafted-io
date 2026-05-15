---
# Framework V2 — sprint stabilizacji, mapa operatorów.
#
# Source of truth (do 2026-05-14): site/src/lib/i18n/pl.ts → landingV2.framework + v2Sections.framework
# Renderowane przez: site/src/components/sections/SectionFramework.astro
#
# Etap A migracji: markdown istnieje równolegle z pl.ts.
# Etap B (TBD przez parenta): komponent przepiąć na getEntry('i18n', 'pl/framework-v2').

# Chrome z landingV2.framework
title: "FRAMEWORK"
centerLabel: "SCAFFOLD → RELEASE"

# Treść sekcji z v2Sections.framework.
# headingHtml zachowuje inline <em class="accent-2"> i <br />.
headingHtml: 'Nie rewrite. Sprint stabilizacji<br /><em class="accent-2">Znajdź słabe szwy i je domknij</em>'
subtitle: "Vibecrafted zostawia momentum z kodu pisanego przez AI i dokłada brakującą dyscyplinę release: mapę repo, następne cięcie, prawdę runtime i dowód dla kolejnej sesji."

# Heading bloku operatorów — zachowuje inline <em>.
operatorsHeadingHtml: "Jak działa <em>pass</em>"
operatorsSub: "Każdy workflow ma jedno zadanie. Przeczytać repo, zrobić cięcie, sprawdzić realną ścieżkę albo nazwać to, co nadal nie jest gotowe. Nazwy przychodzą później; dowód pierwszy."

# CTA do playgroundu.
cta: "Otwórz Playground"

# Macierz operatorów — 6 pozycji, każda z numerem, nazwą i kategorią (kind).
operators:
  - num: "00"
    name: "loctree"
    kind: "STRUKTURA"
  - num: "01"
    name: "aicx"
    kind: "PAMIĘĆ"
  - num: "02"
    name: "prview"
    kind: "REVIEW"
  - num: "03"
    name: "ScreenScribe"
    kind: "RUNTIME"
  - num: "04"
    name: "DoU"
    kind: "GATE"
  - num: "05"
    name: "Review"
    kind: "DOMKNIĘCIE"
---
