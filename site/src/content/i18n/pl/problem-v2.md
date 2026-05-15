---
# Problem V2 — Vibe hangover, kruche szwy po sesji AI.
#
# Source of truth (do 2026-05-14): site/src/lib/i18n/pl.ts → landingV2.problem + v2Sections.problem
# Renderowane przez: site/src/components/sections/SectionProblem.astro
#
# Etap A migracji: markdown istnieje równolegle z pl.ts.
# Etap B (TBD przez parenta): komponent przepiąć na getEntry('i18n', 'pl/problem-v2').

# Chrome z landingV2.problem (title + centerLabel renderowane w obwódce sekcji)
title: "PROBLEM"
centerLabel: "OBSERWACJE 2024–2026"

# Treść sekcji z v2Sections.problem.
# headingHtml zachowuje inline <em class="accent-2"> oraz <em class="accent"> i <br />.
headingHtml: 'Aplikacje po agentach wyglądają na <em class="accent-2">gotowe</em><br />gdy auth, dane, płatności i deploy nadal są <em class="accent">kruche</em>'
body: "Generowanie kodu dowozi demo. Prawdziwi użytkownicy, pieniądze, security review i kolejny developer pokazują miejsca, których żaden prompt nie wziął na własność."

# Pary objawów (label + body). Renderowane jako lista 2 obserwacji pod heroem sekcji.
symptoms:
  - label: "Security review"
    body: "Aplikacja działa, ale auth ma tylko admin/user, tokeny żyją w złym miejscu i nikt nie umie pokazać, kto może dotknąć których danych."
  - label: "Ścieżka pieniędzy"
    body: "Stripe działa, aż przestaje. Webhook crashuje raz, nie ma retry, a klient znajduje brakującą usługę szybciej niż system."
---
