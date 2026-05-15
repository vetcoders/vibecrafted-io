---
# Foundation — karty infrastruktury runtime (loctree, aicx, prview, ScreenScribe).
# Renderowane przez: site/src/components/sections/FoundationSection.astro

# Eyebrow / tytuł / podtytuł sekcji.
label: "Fundamenty runtime"
title: "Infrastruktura pod frameworkiem."
sub: "To są fundamenty, a nie skille: wzrok, pamięć, artefakty review i narracyjny dowód z runtime dla warstwy agentowej."

# CTA "Open layer" na froncie każdej karty foundation.
reveal: "Otwórz warstwę"

# learnPath = mały pill "Najpierw ucz się tutaj" nad kartami. label/lead to
# eyebrow + lead. quickstart/faq/framework to trzy etykiety pillów (komponent
# dodaje przed hrefem ścieżkę zależną od locale).
learnPath:
  label: "Najpierw ucz się tutaj"
  lead: "Najpierw zrozum powierzchnię produktu, dopiero potem schodź do źródeł."
  quickstart: "Szybki start"
  faq: "FAQ"
  framework: "Framework"

# bullets to linie "konsekwencji operacyjnej" pokazywane po otwarciu karty.
# Klucze MUSZĄ pasować do card.name poniżej (loctree, aicx, prview, ScreenScribe),
# komponent szuka ich po stringu name.
bullets:
  loctree:
    - "Mapuje repozytorium zanim ktokolwiek zacznie je zmieniać."
    - "Chroni przed ślepymi refaktorami i błędnym poczuciem pewności."
    - "Używaj go, gdy ryzykiem jest struktura."
  aicx:
    - "Odzyskuje wcześniejsze decyzje, zamiary i kontekst."
    - "Utrzymuje ciągłość pracy między sesjami."
    - "Najbardziej przydatny przy zadaniach rozciągniętych w czasie."
  prview:
    - "Pakietuje review w trwałe findingi i czytelny gate."
    - "Zamyka lukę między terminal dumpem a realnym artefaktem."
    - "Używaj przed merge i przed release."
  ScreenScribe:
    - "Zamienia nagrania ekranu w ustrukturyzowane dowody."
    - "Patrzy na to, co użytkownik naprawdę zobaczył."
    - "Najlepszy, gdy trzeba zebrać dowód z runtime."

# Karty foundation. name MUSI pasować do klucza w bullets powyżej. iconClass to
# klasa CSS dla kolorowego mono prefixu w karcie. body MOŻE zawierać inline
# <code>...</code>; ProductDetailCard renderuje to przez set:html.
cards:
  - number: "01"
    href: "https://loct.io"
    name: "loctree"
    iconClass: "foundation-icon foundation-icon--steel"
    role: "Struktura"
    body: "Strukturalna inteligencja codebase. Mapuje pliki, zależności, huby i blast radius zanim agent dotknie jakiejkolwiek zmiany."
    linkLabel: "loct.io"
  - number: "02"
    href: "https://github.com/Loctree/aicx/releases"
    name: "aicx"
    iconClass: "foundation-icon foundation-icon--copper"
    role: "Pamięć"
    body: "Odzyskiwanie decyzji dla warstwy agentowej. CLI `aicx` / serwer `aicx-mcp` indeksują decyzje, intencje i wyniki, żeby sesje mogły odtworzyć co zostało ustalone i dlaczego."
    linkLabel: "github.com/Loctree/aicx/releases"
  - number: "03"
    href: "https://github.com/Loctree/prview/releases"
    name: "prview"
    iconClass: "foundation-icon foundation-icon--patina"
    role: "Review"
    body: "Ustrukturyzowane artefakty review. Zamienia zmiany w kodzie w trwałe findingi, które mogą czytać kolejne agenty i ludzie."
    linkLabel: "github.com/Loctree/prview/releases"
  - number: "04"
    href: "https://github.com/VetCoders/ScreenScribe"
    name: "ScreenScribe"
    iconClass: "foundation-icon foundation-icon--muted"
    role: "Runtime"
    body: "Narracyjny review runtime. Zamienia nagrania ekranu z komentarzem w ustrukturyzowane findingi o realnej powierzchni produktu."
    linkLabel: "github.com/VetCoders/ScreenScribe"
---
