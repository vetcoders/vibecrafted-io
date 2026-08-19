---
# Problem V2 — "The Problem" section.
# Voice contract: compressed manifesto (src/content/manifesto/en.md — the
# Vibe Hangover). Site copy compresses the canonical doc, it does not fork it:
# the same four accusations, the same real numbers.
# Rendered by: site/src/components/sections/SectionProblem.astro

title: "THE PROBLEM"
centerLabel: "SIX MONTHS IN THE FIELD"

headingHtml: 'Six months fixing vibe-coded SaaS.<br />The same <em class="accent">four things</em> are broken every time'

body: "Not hating on vibe coding — AI generation gets you to launch, and that matters more than most engineers will admit. But the founder who built the product in a weekend eventually hits the wall: the enterprise deal stalls, the security review fails, the second developer quits in a week. This is the Vibe Hangover. Here is what we keep finding under the hood."

symptoms:
  - label: "Auth held with tape"
    body: "Every user is either admin or user. No roles, no row-level permissions, no audit log — and session tokens in localStorage like it's 2019. We watched a $40k annual deal die in the first ten minutes of the prospect's technical review. The product was solid. The architecture screamed weekend project."
  - label: "One God Table"
    body: "Everything in one 35-column model. Fine — until 10k rows make every page load a full-table scan. One founder paid Vercel $300 a month for functions timing out on unindexed queries and retrying forever. Real relations and indexes brought the bill to $40. Same app, same traffic."
  - label: "No error handling"
    body: "When one thing breaks, everything goes down — silently. A webhook handler crashed on an annual-billing edge case and one founder lost about 8% of subscription payments for two months. Customers emailed about it. The system never did."
  - label: "Push to main and pray"
    body: "No staging, no tests, live keys in the repo. One Friday deploy took an app down for 11 hours because a migration deleted a column that was still needed. Users saw a blank screen all weekend; fifteen paying accounts churned."
---
