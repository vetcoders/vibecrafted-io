---
title: "PAID PILOT"
centerLabel: "FLEET · FULL SEAT PRICE"
pageTitle: "Vibecrafted · Request a paid pilot"
pageDescription: "Request a paid Fleet pilot at full seat price. Named buying moment, written success criteria, design-partner path."
headingHtml: 'Request a <em class="accent">paid pilot</em>.'
lead: "Full seat price. No discount theatre. Name the buying moment and we align success criteria for a 60-day design-partner window."
ref: "Intro reference: $49 / seat · mo, or fixed pilot fee (e.g. $490 for 10 seats)."
back: "Back to portal"
backHref: "/en/"
emailPrefer: "Prefer email?"
emailHref: "mailto:hello@vibecrafted.io?subject=Paid%20pilot%20%2F%20Fleet"
emailLabel: "hello@vibecrafted.io"
submit: "Submit pilot request"
submitPay: "Continue to payment"
localNote: "Lead is stored in this browser until Stripe webhooks land."
stripeNote: "If a Stripe Payment Link is configured, it opens in a new tab on submit."
noStripeNote: "No Stripe link configured yet — founders reply by email."
successTitle: "Request recorded"
successStripe: "Stripe Payment Link opened in a new tab. Complete checkout to lock the pilot seat."
successStripeBlocked: "Stripe is configured — if a tab did not open, allow pop-ups or email founders."
successLocal: "Founders will reply within a few business days. Your lead is queued in this browser."
nextLabel: "Next steps"
next:
  - title: "1. Install the bus"
    body: "npm i -g @vetcoders/vc-slack — OAuth + MCP + /vc peer send before the pilot clock starts."
  - title: "2. Design-partner criteria"
    body: "Written success criteria within 7 days: named buying moment, ≥1 map/impact proof on a real PR, 60-day window, full seat price."
  - title: "3. Structural vision on the repo"
    body: "curl -fsSL https://loct.io/install.sh | sh — Loctree first. Evidence decides."
fields:
  name: "Name"
  email: "Email"
  company: "Company"
  teamSize: "Team size"
  githubOrg: "GitHub org"
  seatsEstimate: "Seats estimate"
  buyingMoment: "Buying moment"
  notes: "Notes"
  required: "required"
placeholders:
  name: "Alex Operator"
  email: "alex@company.io"
  company: "Acme Eng"
  teamSize: "8 engineers"
  githubOrg: "acme-eng (optional)"
  seatsEstimate: "10"
  notes: "Repos, constraints, timeline, success criteria draft…"
  buyingMoment: "Select moment…"
moments:
  - value: post_vibe_cleanup
    label: "Post-vibe cleanup / inherited AI change"
  - value: release_gate
    label: "Release gate for AI-built software"
  - value: agent_fleet
    label: "Multi-agent fleet control"
  - value: audit_compliance
    label: "Audit / regulated delivery"
  - value: other
    label: "Other"
errors:
  name: "Name is required"
  email: "Valid email is required"
  company: "Company is required"
  teamSize: "Team size is required"
  seatsEstimate: "Seats estimate is required"
  buyingMoment: "Pick a buying moment"
---
