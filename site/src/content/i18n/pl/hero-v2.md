---
# Hero V2 — primary landing banner.
#
# Source of truth (do 2026-05-14): site/src/lib/i18n/pl.ts → landingV2.hero
# Renderowane przez: site/src/components/sections/HeroSectionV2.svelte
#
# Etap A migracji (dzisiaj): markdown istnieje równolegle z pl.ts.landingV2.hero.
# Etap B (TBD): komponent przepiąć na getEntry('i18n', 'pl/hero-v2')
# i wywalić landingV2.hero z pl.ts.

ariaLabel: "Sekcja główna"

# Eyebrow nad H1 — caps, mono, brand-term. Po polsku traktujemy
# "Release engine" jako nazwę technologii, nie tłumaczymy.
eyebrow: "RELEASE ENGINE DLA OPROGRAMOWANIA GENEROWANEGO PRZEZ AI"

# Heading split — komponent klei pieces w 3 linie:
#   <line 1>  "{pre}."                        (kropka hardcoded w komponencie)
#   <line 2>  "{prefix} *{emFirst}*"          (emFirst = gold primary accent + roman)
#   <line 3>  "{mid} *{emLast}*"              (emLast = italic secondary accent)
heading:
  pre: "Twój kod po agentach AI działa"
  prefix: "Zamień go"
  emFirst: "w produkt"
  mid: "dzięki"
  emLast: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍."

# Lead body — pierwszy paragraf pod heroem. Wspiera inline <em> dla gold
# accent na kluczowych frazach. Używamy 𝐮𝐧𝐢𝐜𝐨𝐝𝐞 𝐛𝐨𝐥𝐝 dla wyróżnień
# słów-postaw (𝐳𝐚𝐝𝐨𝐰𝐨𝐥𝐨𝐧𝐚 / 𝐝𝐮𝐦𝐧𝐲 / 𝐕𝐢𝐛𝐞 𝐜𝐨𝐝𝐢𝐧𝐠) i <em>...</em> dla
# kluczowych terminów (Vibe hangover / deploy na modlitwę / ktoś z zewnątrz).
body: "Jesteś 𝐳𝐚𝐝𝐨𝐰𝐨𝐥𝐨𝐧𝐚. Twoja wizja przybrała postać aplikacji z której sama na codzień korzystasz. Jesteś 𝐝𝐮𝐦𝐧𝐲. Twój pomysł przerodził się w coś co działa stabilnie. 𝐕𝐢𝐛𝐞 𝐜𝐨𝐝𝐢𝐧𝐠 dał niespotykane możliwości. <em>Vibe hangover</em> pojawia się po pierwszym obcym, który wypróbuje to, co napisali agenci — kruchy auth, niejasne dane, zgubione webhooki, <em>deploy na modlitwę</em>. Vibecrafted znajduje te luki i doprowadza repo do produktu, który <em>ktoś z zewnątrz</em> może zainstalować, zrozumieć i użyć."

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
