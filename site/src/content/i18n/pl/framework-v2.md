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
centerLabel: "MAP → PROVE"

# Treść sekcji z v2Sections.framework.
# headingHtml zachowuje inline <em class="accent-2"> i <br />.
headingHtml: 'Nie rewrite. Kadencja.<br /><em class="accent-2">Map · Remember · Craft · Wire · Prove</em>'
subtitle: "Pięć faz, cztery cięcia tej samej prawdy. Loctree mapuje przed edycją. Aicx pamięta po kompaktacji. Agenci shipują pod bramkami. vc-slack to usta — Slack jest projektorem. Marbles osiadają tylko to, co te cztery już uczyniły prawdą. Zielone CI to nie werdykt produktowy."

# Heading bloku operatorów — zachowuje inline <em>.
operatorsHeadingHtml: "Cztery cięcia. <em>Jedna pętla</em>"
operatorsSub: "Wzrok, pamięć, usta, ręce. Nazwy, które wpiszesz. Dowód pierwszy — plansza jest metaforą."

# CTA do playgroundu.
cta: "Otwórz playground operatora"

# Macierz operatorów — 6 pozycji, każda z numerem, nazwą i kategorią (kind).
operators:
  - num: "00"
    name: "Loctree"
    kind: "WZROK"
  - num: "01"
    name: "Aicx"
    kind: "PAMIĘĆ"
  - num: "02"
    name: "vc-slack"
    kind: "USTA"
  - num: "03"
    name: "Codescribe"
    kind: "GŁOS"
  - num: "04"
    name: "Vibecrafted"
    kind: "RĘCE"
  - num: "05"
    name: "Marbles"
    kind: "DOWÓD"
---
