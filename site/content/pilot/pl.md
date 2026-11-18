---
title: "PŁATNY PILOT"
centerLabel: "FLEET · PEŁNA CENA SEATA"
pageTitle: "Vibecrafted · Zgłoś płatny pilot"
pageDescription: "Płatny pilot Fleet w pełnej cenie seata. Named buying moment, spisane success criteria, ścieżka design-partner."
headingHtml: 'Zgłoś <em class="accent">płatny pilot</em>.'
lead: "Pełna cena seata. Bez rabatowego teatru. Nazwij buying moment — ułożymy success criteria na 60-dniowe okno design-partner."
ref: "Referencja: $49 / seat · mc, albo stała opłata pilota (np. $490 za 10 seatów)."
back: "Wróć do portalu"
backHref: "/pl/"
emailPrefer: "Wolisz e-mail?"
emailHref: "mailto:hello@vibecrafted.io?subject=Paid%20pilot%20%2F%20Fleet"
emailLabel: "hello@vibecrafted.io"
submit: "Wyślij zgłoszenie"
submitPay: "Przejdź do płatności"
localNote: "Lead trzymany w tej przeglądarce do czasu webhooków Stripe."
stripeNote: "Jeśli Stripe Payment Link jest skonfigurowany, otworzy się w nowej karcie po submit."
noStripeNote: "Brak Stripe — founderzy odpiszą mailem."
successTitle: "Zgłoszenie zapisane"
successStripe: "Stripe Payment Link otwarty w nowej karcie. Dokończ checkout, żeby zablokować seat pilota."
successStripeBlocked: "Stripe jest skonfigurowany — jeśli karta się nie otworzyła, zezwól na pop-upy lub napisz do founderów."
successLocal: "Founderzy odpiszą w kilka dni roboczych. Lead jest w localStorage tej przeglądarki."
nextLabel: "Następne kroki"
next:
  - title: "1. Zainstaluj bus"
    body: "npm i -g @vetcoders/vc-slack — OAuth + MCP + /vc peer send zanim ruszy zegar pilota."
  - title: "2. Kryteria design-partner"
    body: "Spisane success criteria w 7 dni: named buying moment, ≥1 map/impact proof na realnym PR, okno 60 dni, pełna cena seata."
  - title: "3. Structural vision na repo"
    body: "curl -fsSL https://loct.io/install.sh | sh — najpierw Loctree. Evidence decides."
fields:
  name: "Imię"
  email: "E-mail"
  company: "Firma"
  teamSize: "Rozmiar teamu"
  githubOrg: "GitHub org"
  seatsEstimate: "Szacunek seatów"
  buyingMoment: "Buying moment"
  notes: "Notatki"
  required: "wymagane"
placeholders:
  name: "Alex Operator"
  email: "alex@firma.io"
  company: "Acme Eng"
  teamSize: "8 inżynierów"
  githubOrg: "acme-eng (opcjonalnie)"
  seatsEstimate: "10"
  notes: "Repo, ograniczenia, timeline, draft success criteria…"
  buyingMoment: "Wybierz moment…"
moments:
  - value: post_vibe_cleanup
    label: "Post-vibe cleanup / odziedziczona zmiana AI"
  - value: release_gate
    label: "Release gate dla oprogramowania z AI"
  - value: agent_fleet
    label: "Kontrola multi-agent fleet"
  - value: audit_compliance
    label: "Audit / delivery regulowany"
  - value: other
    label: "Inne"
errors:
  name: "Imię jest wymagane"
  email: "Potrzebny poprawny e-mail"
  company: "Firma jest wymagana"
  teamSize: "Rozmiar teamu jest wymagany"
  seatsEstimate: "Szacunek seatów jest wymagany"
  buyingMoment: "Wybierz buying moment"
---
