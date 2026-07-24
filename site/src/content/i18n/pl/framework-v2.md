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
headingHtml: 'Nie rewrite. Kadencja.<br /><em class="accent-2">Każdy zapis broni się odczytem</em>'
subtitle: "Jedenaście etapów na przemian Read i Write. Każdy zapis — implement, marbles, polarize — jest natychmiast falsyfikowany przez odczyt — review, audit, DoU. Marbles podnosi entropię, żeby zasypać szpary; Polarize ścina ją do jednej prawdy. Każdy etap biegnie swój odcinek i podaje pałeczkę sztafetową następnemu, więc nic nie wychodzi niesprawdzone."

# Heading bloku operatorów — zachowuje inline <em>.
operatorsHeadingHtml: "Jak działa <em>pass</em>"
operatorsSub: "Każdy workflow ma jedno zadanie. Przeczytać repo, zrobić cięcie, sprawdzić realną ścieżkę albo nazwać to, co nadal nie jest gotowe. Nazwy przychodzą później; dowód pierwszy."

# CTA do playgroundu.
cta: "Otwórz Playground"

# Macierz operatorów — 6 pozycji, każda z numerem, nazwą i kategorią (kind).
operators:
  - num: "00"
    name: "loctree"
    kind: "npm · STRUKTURA"
  - num: "01"
    name: "aicx"
    kind: "npm · PAMIĘĆ"
  - num: "02"
    name: "prview"
    kind: "crates · REVIEW"
  - num: "03"
    name: "ScreenScribe"
    kind: "PyPI · USZY"
  - num: "04"
    name: "vc-frame"
    kind: "kokpit · RAIL"
  - num: "05"
    name: "DoU"
    kind: "GATE"
---
