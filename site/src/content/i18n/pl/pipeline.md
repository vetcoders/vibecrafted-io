---
# Pipeline — przegląd metody (Twórz → Konwerguj → Wypuść).
# Renderowane przez: site/src/components/sections/PipelineSection.astro
#
# UWAGA: Same diagramy mermaid NIE są w tym pliku. Żyją w
# site/src/lib/diagrams/pipeline.ts (mermaidEn / mermaidPl / mermaidFullEn /
# mermaidFullPl). YAML by zniszczył wbudowane bloki JSON z konfiguracją motywu,
# a diagramy to architektura, nie redakcja.

# Eyebrow sekcji (mała etykieta nad nagłówkiem).
label: "Metoda"

# H2 sekcji.
title: "Twórz → Konwerguj → Wypuść"

# Akapit wprowadzający pod tytułem.
sub: "Model operacyjny klasy założycielskiej do kształtowania, odszumiania i wreszcie wypuszczania oprogramowania z agentami AI."

# Etykiety UI dla modala "rozwiń pełny diagram" obsługiwanego przez MermaidViewer.
mermaidModal:
  open: "Rozwiń pełny pipeline"
  close: "Zamknij diagram pipeline'u"
  title: "Pełny pipeline — Twórz → Konwerguj → Wypuść"

# Trzy karty etapów renderowane jako siatka pod diagramem.
notes:
  - title: "Twórz"
    body: "Zaplanuj architekturę, zainicjuj kontekst i uruchom workflow ERi. Zmuś agentów do respektowania AST i historii."
  - title: "Konwerguj"
    body: "Systematycznie redukuj entropię przez pętle Marbles, aż wszystkie problemy P0, P1 i P2 zostaną rozwiązane."
  - title: "Wypuść"
    body: "Zaudytuj powierzchnię produktu z DoU, wypoleruj z Decorate i zapakuj z Hydrate przed finalnym Release."
---
