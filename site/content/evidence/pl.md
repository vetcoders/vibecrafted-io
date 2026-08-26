---
# Evidence V2 — Vibe hangover w terenie, 4 wzorce z anonimizowanych field notes.
#
# Source of truth (do 2026-05-14): site/src/lib/i18n/pl.ts → landingV2.evidence + v2Sections.evidenceWild
# Renderowane przez: site/src/components/sections/SectionEvidence.astro
#
# Etap A migracji: markdown istnieje równolegle z pl.ts.
# Etap B (TBD przez parenta): komponent przepiąć na getEntry('i18n', 'pl/evidence-v2').
#
# UWAGA: V2 evidence to "evidenceWild" — wzorce z terenu (RELEASE MIRROR /
# HELPER DRIFT / SILENT FAILURES / DEPLOY AND PRAY). NIE mylić z V1
# sections.evidence (pl.ts → linia 765), które trzyma listę aksjomatów
# inżynierskich i ma własny mirror w pl/evidence.md.

# Chrome z landingV2.evidence
title: "DOWODY"
centerLabel: "Z TERENU · ZAOBSERWOWANE WZORCE"

# Treść sekcji z v2Sections.evidenceWild.
# headingHtml zachowuje inline <em class="accent">.
headingHtml: 'Vibe hangover <em class="accent">w terenie</em>'
subtitle: "Parę notatek z terenu — z produktów budowanych z agentami i z naszych własnych torów release. Anonimowo, bo wzorzec mówi więcej niż nazwa."

# 4 wzorce — każdy z numerem, label (caps), headline (cytat), observation (treść), source (atrybucja) i accent (kolor).
patterns:
  - num: "01"
    label: "RELEASE MIRROR"
    headline: "Dwa checkouty, dwie prawdy."
    observation: "Framework w upstreamie już naprawiliśmy, ale publiczny landing nadal pokazywał starą wersję installera. Każdy miał rację w swoim checkoutcie; użytkownik widział dryf."
    source: "FIELD NOTE · publiczny tor release"
    accent: "rust"
  - num: "02"
    label: "HELPER DRIFT"
    headline: "Runtime się przeniósł. Docs nie."
    observation: "Główny runtime naprawiliśmy. Helper script trzymał wczorajsze założenia o ścieżkach. Produkt działał, dopóki operator nie poszedł starym tropem."
    source: "FIELD NOTE · audyt powierzchni helperów"
    accent: "amber"
  - num: "03"
    label: "SILENT FAILURES"
    headline: "Webhook, który nigdy nie spróbował drugi raz."
    observation: "Checkout wyglądał zdrowo. Dopóki aktywacja nie weszła w fazę claim i webhook truth. Sprzedaż się wydarzyła; historia entitlementu nadal potrzebowała świadka."
    source: "ZAOBSERWOWANE · realny founder (zanonimizowane)"
    accent: "red"
  - num: "04"
    label: "DEPLOY AND PRAY"
    headline: "Piątkowa migracja odpalona cztery razy."
    observation: "Brak stagingu, brak smoke testów, brak rollbacku. Migracja zakleszcza się na lock table. Zgłoszenia od supportu rosną, a founder próbuje sobie przypomnieć, który tab odpalił komendę ostatni."
    source: "ZAOBSERWOWANE · raporty z terenu"
    accent: "rust"
---
