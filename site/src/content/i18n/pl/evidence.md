---
# Evidence — "to nie magia" deck z trzema zasadami operacyjnymi.
# Renderowane przez: site/src/components/sections/EvidenceSection.astro
#   + site/src/components/sections/EvidenceDeck.svelte (data prop z rodzica)

# Nagłówek sekcji. Zawiera literalny HTML: <br /> dla łamania linii.
# Renderowany przez <Fragment set:html>. To nie pattern <Accent>.
titleHtml: "To nie magia.<br />To rygorystyczna inżynieria."

# Lead paragraph pod nagłówkiem.
lead: "Słownictwo jest żywe, bo powstało pod nocną presją. Pod vibem kryje się rygorystyczny model operacyjny dla kontekstu, redukcji wariancji i prawdy o produkcie."

# Etykiety UI w kartach deck i w dialogu modalnym.
revealLabel: "Otwórz notatkę"
closeLabel: "Zamknij notatkę"
detailsLabel: "Konsekwencja operacyjna"

# Karty evidence. accent = steel | copper | patina (kolor karty).
# details = bullety pokazywane na rewersie karty i w dialogu modalnym.
items:
  - number: "01"
    accent: "steel"
    title: "Kontekst wzbogacony AST"
    body: "LLM-y halucynują, gdy kodują na ślepo. Dzięki eksternalizacji pamięci architektonicznej w mapy AST, 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. utrzymuje modele dokładnie zorientowane w Twoim codebase."
    details:
      - "Loctree i pokrewne mapy strukturalne zamieniają repo w teren nawigacyjny jeszcze zanim zacznie się edycja."
      - "Agent pracuje na nazwanych plikach, blast radiusie i topologii symboli zamiast dryfować w mgle grepów."
      - "To obniża fałszywą pewność: jeśli struktura kłóci się z promptem, wygrywa struktura."
  - number: "02"
    accent: "copper"
    title: "Stochastyczna konwergencja"
    body: "Generowanie kodu jest stochastyczne. Pętla Marbles wykorzystuje priorytetowane pętle odszumiania, aby nieustannie redukować wariancję, wymuszając stan gotowy do wysyłki."
    details:
      - "Jedno odpalenie nie jest dowodem. Pętla stale tnie najbardziej ryzykowne kłamstwo, aż runtime zacznie zgadzać się z obietnicą."
      - "Wczesne pętle usuwają fałsze strukturalne; późniejsze ściskają chropowatość do spokojniejszego i bardziej powtarzalnego kształtu produktu."
      - "Celem nie jest „ładny output”, tylko stan, w którym problemy P0/P1/P2 zbiegają do zera."
  - number: "03"
    accent: "patina"
    title: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙"
    body: "Ustrukturyzowana Inżynieria Współpracy Człowiek-AI. Opakowujemy deterministyczne checkpointy ludzkie wokół stochastycznej generacji. Rezultat to system, który kontrolujesz, któremu ufasz i który rozumiesz."
    details:
      - "Ludzie nie ścigają się z modelem na szybkość pisania; biorą odpowiedzialność za scope, truth checki i nieodwracalne decyzje."
      - "Agenci dostają przestrzeń do głębokiego fieldworku, ale gates, artefakty review i dowód z runtime trzymają finalny kształt w ryzach."
      - "Dlatego produkt może być żywy, ale nie mistyczny: rzemiosło pozostaje inspekowalne."
---
