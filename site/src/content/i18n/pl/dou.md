---
# DoU — manifest Definicji Niezrobionego + wykres trajektorii konwergencji.
# Renderowane przez: site/src/components/sections/DouSection.astro

# Eyebrow sekcji.
label: "DoU"

# H2.
title: "Definicja niezrobionego"

# Pull-quote renderowany jako blockquote na górze bloku manifestu.
quote: "Agenci AI rozwiązali najtrudniejszą część tworzenia oprogramowania: sprawienie, żeby rzecz działała. Nie rozwiązali jeszcze drugiej najtrudniejszej: sprawienie, żeby była osiągalna."

# Akapit leadu pod blockquote.
lead: "Problem rzadko dotyczy jakości kodu. To brutalna przestrzeń między działającym systemem a produktem, który obcy mogą odkryć, zainstalować, któremu zaufają i za który zapłacą."

# Etykieta wprowadzająca checklistę.
diagnosticLabel: "Diagnostyka założyciela:"

# Checklist założyciela. `kind` to "check" (renderowane jako +) albo "cross" (renderowane jako –).
checklist:
  - kind: "check"
    text: "Testy przechodzą"
  - kind: "check"
    text: "Architektura jest solidna"
  - kind: "check"
    text: "README istnieje"
  - kind: "cross"
    text: "Nikt nie znajdzie tego w Google"
  - kind: "cross"
    text: "Nikt nie zainstaluje bez toolchaina"
  - kind: "cross"
    text: "Nikt nie może za to zapłacić"

# Podsumowanie zamykające pod checklistą.
summary: "Punkty 4–6 to Definicja Niezrobionego. Faza 3 wymusza wejście systemu na rynek."

# Caption nad wykresem trajektorii po prawej.
caption: "Trajektoria konwergencji — pętla aż koło się zapełni"

# Pięć etykiet dla słupków wykresu trajektorii konwergencji. Kolejność ma znaczenie.
bars:
  - "Pętla 1"
  - "Pętla 2"
  - "Pętla 3"
  - "Pętla 4"
  - "Pętla 5"

# Caption pod słupkami.
scoreline: "Wynik: 15 → 40 → 65 → 85 → 100"
---
