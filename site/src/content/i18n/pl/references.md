---
# References — bibliografia i inspiracje (ostatnia sekcja przed stopką).
# Renderowane przez: site/src/components/sections/ReferencesSection.astro
# (wrapper server-side) → ReferencesSectionClient.svelte (interaktywny klient).
#
# `citationHtml` i etykiety linków zachowują ograniczony inline HTML (<em>,
# <code>, encje typu &ouml;), bo to typografia bibliograficzna. Renderujemy
# je przez @html w szablonie Svelte, tak jak wcześniej.

# Eyebrow sekcji.
label: "Referencje"

# H2.
title: "Ground Truth i inspiracje"

# Akapit leadu pod tytułem.
sub: "Poniższa bibliografia rozszerza listę manifestu o wpływy modelowania strukturalnego i konwergencji wyłonione ponownie w wewnętrznej pracy groundingowej AICX."

# Modal pytający przed otwarciem linków zewnętrznych.
modal:
  eyebrow: "Źródło referencji"
  title: "Ta strona zostanie otwarta w nowej karcie."
  sourceLabel: "Źródło"
  backLabel: "<<< Wróć"
  openLabel: "Otwórz >>>"
  backHover: "Powrót do portalu"
  openHover: "Przejdź do strony"

# Pozycje bibliograficzne. Każda pozycja:
#   - citationHtml: pełny cytat; dozwolony HTML (<em>, &ouml;, itd.) — renderowane przez @html.
#   - note:         krótkie wyjaśnienie dlaczego referencja jest istotna.
#   - links[]:      jeden przycisk na link; otwiera modal potwierdzenia.
items:
  - citationHtml: "Morris, K.; B&ouml;ckeler, B. (2026). <em>Humans and Agents in Software Engineering Loops</em>; <em>Harness Engineering</em>; <em>Context Engineering for Coding Agents</em>. Thoughtworks / Martin Fowler."
    note: "Framing why-loop / how-loop, projektowanie harnessów i dyscyplina workflow prowadzonego przez człowieka stojące za SHACE i rolą operatora."
    links:
      - href: "https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html"
        label: "Humans & Agents"
      - href: "https://martinfowler.com/articles/harness-engineering.html"
        label: "Harness Engineering"
      - href: "https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html"
        label: "Context Engineering"
  - citationHtml: "Gong, L.; Elhoushi, M.; Cheung, A. (2024). <em>AST-T5: Structure-Aware Pretraining for Code Generation</em>."
    note: "Wątek pretreningu świadomego struktury stojący za insistencją 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍., że modele nie powinny pisać do repo na ślepo."
    links:
      - href: "https://arxiv.org/abs/2401.03003"
        label: "arXiv"
  - citationHtml: "Guo, D. et al. (2021). <em>GraphCodeBERT: Pre-training Code Representations with Data Flow</em>."
    note: "Komplementarny wynik świadomy struktury, który wzmocnił argument za eksternalizowanym kształtem kodu, mimo że GraphCodeBERT modeluje przepływ danych, a nie AST."
    links:
      - href: "https://arxiv.org/abs/2009.08366"
        label: "arXiv"
  - citationHtml: "Cunningham, W. (1992) i późniejsza literatura o długu technicznym."
    note: "Konceptualny przodek DoU: działający kod to nie to samo co zdrowy, godny zaufania, gotowy do wysyłki system."
    links:
      - href: "https://martinfowler.com/bliki/TechnicalDebt.html"
        label: "Technical Debt"
  - citationHtml: "CEGIS / synteza prowadzona kontrprzykładami i późniejsza literatura o optymalizacji prowadzonej kontrprzykładami."
    note: "Linia konwergencji za Marbles: pętla, inspekcja awarii, dodanie kontrprzykładów, redukcja przestrzeni programów, powtarzanie aż powierzchnia przestanie kłamać."
    links:
      - href: "https://www.cprover.org/synthesis"
        label: "Przegląd syntezy prowadzonej kontrprzykładami"
  - citationHtml: "VetCoders (2026). <em>Manifest 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.</em>."
    note: "Źródło pierwotne dla SHACE, Marbles, Loctree Mapping, PSCD i founderskiej Definition of Undone jako oryginalnych konceptów 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍."
    links:
      - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/MANIFESTO_PL.md"
        label: "Przeczytaj manifest"
---
