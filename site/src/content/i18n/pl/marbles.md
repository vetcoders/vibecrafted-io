---
# Marbles — narracja konwergencji w stylu dyfuzji.
# Renderowane przez: site/src/components/sections/MarblesSection.astro
#
# Cała treść to czysty tekst — w tej sekcji nie ma inline accents. Komponent
# Svelte MarbleCanvas (sections.marbleCanvas w słowniku i18n) jest oddzielny
# i na razie pozostaje w słowniku TypeScript.

# Eyebrow sekcji.
label: "Marbles"

# H2.
title: "Odszumiaj aż koło się zapełni"

# Lead pod tytułem.
sub: "Agenci AI to stochastyczne papugi. Każda generacja wprowadza szum. Nie da się tego obejść promptem. Iterujesz."

# H3 wprowadzający panel izomorfizmu po prawej.
heading: "Izomorfizm"

# Dwie karty wzorów porównujące dyfuzję obrazu i dyfuzję kodu.
formulas:
  - label: "Dyfuzja obrazu"
    code: "szum → odszumienie × N → obraz"
  - label: "Dyfuzja kodu"
    code: "chaos → redukcja_entropii × N → produkt"

# aria-label dla wiersza kroków.
stepsAria: "Etapy konwergencji"

# Kroki konwergencji jako "pigułki".
steps:
  - "Krok 0: Czysty szum"
  - "Krok 1: Init"
  - "Krok 2: Implementacja"
  - "Krok N: DoU < próg = DoD"

# Długi przypis pod wierszem kroków.
note: "Nie ma ustalonej liczby pętli. Pętla działa aż P0=P1=P2=0 i koło się wypełni. Wczesne pętle robią korekty strukturalne, późne pętle dopracowują detale."

# Link docelowy dla CTA karty playgroundu.
frameworkHref: "/pl/framework/"

# Blok karty portalu pod wizualizacją dyfuzji.
portal:
  kicker: "Interaktywny playground"
  title: "Otwórz tablicę konwergencji jako osobną powierzchnię"
  body: "Tablica nie jest już wciśnięta w landing page. Pełnoekranowy playground jest teraz powierzchnią dydaktyczną: ręczne fazy, prompt poleceń i ruch board-first."
  cta: "Wejdź do playgroundu"
  note: "Board-first. Ręczny. Kształtowany komendami. Zbudowany dla kierunku 1.3.0."
---
