# SaaS portal merge (vibecrafted-io)

Canonical commercial surface lives **here** — not a parallel React sandbox portal.

## What shipped

- Landing section `#commercial` / `#pricing` / `#limits` / `#gate`
  - Open $0 · Fleet $49/seat · Forge custom
  - Honest limitations (research-backed claims)
  - 90-day hedge gate
- `/en/pilot/` + `/pl/pilot/` paid-pilot form (localStorage + optional `PUBLIC_STRIPE_PILOT_PAYMENT_LINK`)
- Nav anchor **PRICING** → `#commercial`
- FAQ commercial posture points at self-serve tiers + pilot

## Deploy path (existing)

```bash
make site-build
make site-deploy          # Caddy on libraxis-vm
# or
make site-deploy-pages    # GitHub Pages fallback
```

CI: `.github/workflows/deploy-pages.yml` on `main` for `site/**`.

## Env (optional)

```bash
PUBLIC_STRIPE_PILOT_PAYMENT_LINK=https://buy.stripe.com/...
```

Without it, pilot form records leads in `localStorage` and directs operators to email.

## Sandbox / dual-portal rule

Any temporary SaaS React scaffold in agent sandboxes is **preview only**.
Ship and iterate commercial copy in `vetcoders/vibecrafted-io` so vibecrafted.io stays one surface.
