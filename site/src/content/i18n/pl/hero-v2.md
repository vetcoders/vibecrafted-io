---
# Hero V2 — primary landing banner.
#
# Source of truth: ten plik (content collection 'i18n', entry 'pl/hero-v2').
# Renderowane przez: site/src/components/sections/HeroSectionV2.svelte
# Konsumowane przez: site/src/pages/pl/index.astro → getEntry(...) → prop hero={...}.
#
# Oś komunikatu: Repo po agentach → chaos → rygor procesu → produkt.

ariaLabel: "Sekcja główna"

# Eyebrow nad H1 — caps, mono. Pozycjonuje kategorię: nie narzędzie,
# nie framework-magiczka, tylko proces, który robi z chaotycznego repo produkt.
eyebrow: "RYGOR PROCESU DLA REPO PO AGENTACH"

# Heading split — komponent klei pieces w 3 linie:
#   <line 1>  "{pre}."                        (kropka hardcoded w komponencie)
#   <line 2>  "{prefix} *{emFirst}*"          (emFirst = gold primary accent + roman)
#   <line 3>  "{mid} *{emLast}*"              (emLast = italic secondary accent)
heading:
  pre: "Repo po agentach"
  prefix: "Zamień chaos w"
  emFirst: "produkt"
  mid: "dzięki rygorowi"
  emLast: "procesu"

# Lead body — pierwszy paragraf pod heroem. Reportersko-operacyjny,
# bez bezpośredniego adresowania czytelnika ("jesteś zadowolona/dumny" wycięte).
# Inline <em>...</em> dla akcentu na frazach-kotwicach.
body: "Po agentach często zostaje repo, które działa w demo, ale nie jest jeszcze produktem: kruchy auth, niejasny onboarding, zgubione webhooki, brak ścieżki instalacji, <em>deploy na modlitwę</em>. <em>Vibe hangover</em> zaczyna się wtedy, gdy pierwszy człowiek spoza zespołu próbuje to uruchomić. Proces odsiewa vibe od prawdy: porządkuje kontekst, wymusza checki i prowadzi system do stanu, który ktoś z zewnątrz może zainstalować, zrozumieć i użyć."

# CTA pair — primary solid INSTALUJ, ghost CZYTAJ DOKUMENTACJĘ.
# Hrefy są obliczane w komponencie przez lang ('/pl/install/', '/pl/quickstart/').
ctaPrimary: "INSTALUJ"
ctaSecondary: "CZYTAJ DOKUMENTACJĘ"

# Telemetry strip — pod heroem, trzy etykiety obok marble count /
# converge% / live indicator (wartości liczbowe pochodzą z MarbleCanvasV2).
telemetry:
  marbles: "CHECKI"
  converge: "GOTOWE"
  live: "LIVE"

# Scroll hint label — bottom-right, "PRZEWIŃ ↓".
scroll: "PRZEWIŃ"
---
