---
# Hero V2 — primary landing banner.
#
# Source of truth: ten plik (content collection 'i18n', entry 'pl/hero-v2').
# Renderowane przez: site/src/components/sections/HeroSectionV2.svelte
# Konsumowane przez: site/src/pages/pl/index.astro → getEntry(...) → prop hero={...}.
#
# Oś komunikatu: Repo po agentach → chaos → rygor procesu → produkt.

ariaLabel: "Sekcja główna"

# Eyebrow nad H1 — caps, mono, brand-term. Po polsku traktujemy
# "Release engine" jako nazwę technologii, nie tłumaczymy.
eyebrow: "RELEASE ENGINE DLA AI-GENERATED REPO"

# Heading split — komponent klei pieces w 3 linie:
#   <line 1>  "{pre}."                        (kropka hardcoded w komponencie)
#   <line 2>  "{prefix} *{emFirst}*"          (emFirst = gold primary accent + roman)
#   <line 3>  "{mid} *{emLast}*"              (emLast = italic secondary accent)
heading:
  pre: "Runtime 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍"
  prefix: "pomaga zmienić"
  emFirst: "kod"
  mid: "po agentach AI"
  emLast: "w produkt."

# Lead body — pierwszy paragraf pod heroem. Wspiera inline <em> dla gold
# accent na kluczowych frazach. Używamy 𝐮𝐧𝐢𝐜𝐨𝐝𝐞 𝐛𝐨𝐥𝐝 dla wyróżnień
# słów-postaw (𝐳𝐚𝐝𝐨𝐰𝐨𝐥𝐨𝐧𝐚 / 𝐝𝐮𝐦𝐧𝐲 / 𝐕𝐢𝐛𝐞 𝐜𝐨𝐝𝐢𝐧𝐠) i <em>...</em> dla
# kluczowych terminów (Vibe hangover / deploy na modlitwę / ktoś z zewnątrz).
body: 𝐕𝐢𝐛𝐞 𝐜𝐨𝐝𝐢𝐧𝐠 dał niespotykane możliwości. <em>Vibe hangover</em> pojawia się gdy pierwsi użytkownicy, wypróbują to, co napisali agenci bez odpowiednich procedur. <em>Deploy na modlitwę</em>, kruchy auth, niejasne dane, zgubione webhooki. Vibecrafted znajduje te luki i doprowadza repo do produktu, który <em>ktoś z zewnątrz</em> może zainstalować, zrozumieć i użyć."

# CTA pair — primary solid INSTALUJ, ghost CZYTAJ DOKUMENTACJĘ.
# Hrefy są obliczane w komponencie przez lang ('/pl/install/', '/pl/quickstart/').
ctaPrimary: "INSTALACJA"
ctaSecondary: "DOKUMENTACJA"

# Telemetry strip — pod heroem, trzy etykiety obok marble count /
# converge% / live indicator (wartości liczbowe pochodzą z MarbleCanvasV2).
telemetry:
  marbles: "CHECKI"
  converge: "GOTOWE"
  live: "LIVE"

# Scroll hint label — bottom-right, "PRZEWIŃ ↓".
scroll: "SCROLL ↓"
---
