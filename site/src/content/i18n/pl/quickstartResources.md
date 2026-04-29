---
# Quickstart resources — two cards plus next-step path and canonical sources block.
# Rendered by: site/src/components/sections/QuickstartResourcesSection.astro
#
# cards[].items: each card's items[0] is rendered as the card body (HTML),
#                items[1..] are rendered as a bullet list inside the reveal panel.
# Inline <code>...</code> is allowed in items.

# "Zobacz więcej" reveal label inside each ProductDetailCard.
reveal: "Zobacz więcej"

# "Następny krok" surface-path block under the cards.
nextStep:
  label: "Następny krok"
  lead: "Kiedy quickstart już ma sens, skieruj się do warstwy wyjaśniającej."
  faq: "FAQ"
  foundation: "Fundamenty"
  overview: "Przegląd"

# Eyebrow for the canonical-sources <details> at the bottom.
sourceLabel: "Źródła kanoniczne"

cards:
  - kicker: "Czego potrzebujesz"
    title: "Minimalne wymagania"
    items:
      - "macOS albo Linux"
      - "Git, Python 3.10+ i <code>make</code>"
      - "Co najmniej jeden runtime: Codex, Claude albo Gemini"
      - "Wymagane fundamenty: loctree i aicx"
      - "Zalecane narzędzia dowodowe: prview i ScreenScribe"

  - kicker: "Po instalacji"
    title: "Co dostajesz po instalacji"
    items:
      - "Centralny magazyn skilli w <code>$VIBECRAFTED_ROOT/.vibecrafted/skills/</code>"
      - "Artefakty pogrupowane według repozytorium i daty w <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>"
      - "Helpery shellowe do uruchamiania agentów, obserwacji sesji, Marbles, DoU, Hydrate i Release"
      - "Lokalną kopię frameworka w <code>$VIBECRAFTED_ROOT/.vibecrafted/tools/</code>"

# Bottom canonical-sources link list.
links:
  - href: "/pl/faq/"
    label: "FAQ"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/FOUNDATION.md"
    label: "Stack zależności"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/QUICK_START.md"
    label: "Szybki start w Markdownie"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTRACT.md"
    label: "Kontrakt runtime"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md"
    label: "Bramka review ScreenScribe"
  - href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md"
    label: "Matryca prawdy contentowej"
---
