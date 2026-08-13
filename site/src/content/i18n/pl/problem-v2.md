---
# Problem V2 — sekcja "The Problem".
# Kontrakt głosu: skompresowany manifest (src/content/manifesto/pl.md — Vibe
# Hangover). Copy strony kompresuje kanoniczny dokument, nie forkuje go:
# te same cztery oskarżenia, te same prawdziwe liczby.
# Renderuje: site/src/components/sections/SectionProblem.astro

title: "PROBLEM"
centerLabel: "SZEŚĆ MIESIĘCY W TERENIE"

headingHtml: 'Sześć miesięcy naprawiania vibe-coded SaaS.<br />Za każdym razem zepsute są <em class="accent">te same cztery rzeczy</em>'

body: "To nie hejt na vibe coding — generowanie AI dowozi do launchu, a to znaczy więcej, niż większość inżynierów przyzna. Ale founder, który zbudował produkt w weekend, w końcu uderza w ścianę: deal enterprise staje, security review nie przechodzi, drugi developer odchodzi po tygodniu. To jest Vibe Hangover. Oto, co za każdym razem znajdujemy pod maską."

symptoms:
  - label: "Auth na taśmę klejącą"
    body: "Każdy użytkownik to admin albo user. Zero ról, zero row-level permissions, zero audit logu — a tokeny sesji w localStorage jak w 2019. Widzieliśmy, jak deal na $40k rocznie umiera w pierwszych dziesięciu minutach technicznego review. Produkt był solidny. Architektura krzyczała: projekt weekendowy."
  - label: "Jedna God Table"
    body: "Wszystko w jednym modelu na 35 kolumn. Działa — dopóki 10 tysięcy wierszy nie zamieni każdego page loadu w full-table scan. Jeden founder płacił Vercelowi $300 miesięcznie za funkcje, które timeoutowały na niezaindeksowanych zapytaniach i retry'owały w nieskończoność. Prawdziwe relacje i indeksy ścięły rachunek do $40. Ta sama apka, ten sam ruch."
  - label: "Zero obsługi błędów"
    body: "Gdy pęka jedna rzecz, kładzie się wszystko — po cichu. Handler webhooka wywalał się na edge case'ie rocznego billingu i jeden founder tracił ~8% płatności subskrypcyjnych przez dwa miesiące. Napisali o tym klienci. System — nigdy."
  - label: "Push na maina i pacierz"
    body: "Zero stagingu, zero testów, żywe klucze w repo. Jeden piątkowy deploy położył apkę na 11 godzin, bo migracja skasowała kolumnę, która wciąż była potrzebna. Użytkownicy przez weekend patrzyli w pusty ekran; odeszło piętnaście płacących kont."
---
