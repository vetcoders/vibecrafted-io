# contact-relay — vibecrafted.io contact mailer

Same-origin `/api/contact` backend for the static vibecrafted.io site. Mirrors the
libraxis-ai scheme (same-origin API route + Resend) instead of the never-deployed
cross-origin relay at `contact.libraxis.ai` (that subdomain does not resolve — it was
the root cause of "Could not send").

```
browser ──POST /api/contact (JSON, same-origin)──▶ Caddy (libraxis-vm)
                                                     └ reverse_proxy 127.0.0.1:8787
                                                         └ server.mjs ──▶ Resend ──▶ hello@vibecrafted.io
```

- **Zero dependencies.** Node 18+ built-in `http` + global `fetch`. No `node_modules`.
- **Loopback only.** Binds `127.0.0.1`; only Caddy reaches it → no CORS needed.
- **Honeypot + validation.** Drops bots (`company` field), validates email/subject/message.

## Files

| File                          | Purpose                                         |
| ----------------------------- | ----------------------------------------------- |
| `server.mjs`                  | the mailer (the only runtime file)              |
| `.env.example`                | env template — copy + fill the Resend key       |
| `Caddyfile.snippet`           | the `reverse_proxy /api/contact` block to merge |
| `vibecrafted-contact.service` | systemd unit                                    |

## Prerequisites

1. Node 18+ on libraxis-vm (`node --version`).
2. A Resend account, with **vibecrafted.io verified** at https://resend.com/domains
   (until then, test with `CONTACT_FROM=onboarding@resend.dev`).
3. A Resend API key from https://resend.com/api-keys.

## Deploy (operator — runs on libraxis-vm)

```bash
# 1. Copy the service
sudo mkdir -p /opt/vibecrafted-contact
sudo cp server.mjs /opt/vibecrafted-contact/server.mjs

# 2. Env file with the real key (chmod 600 — never world-readable)
sudo mkdir -p /etc/vibecrafted
sudo cp .env.example /etc/vibecrafted/contact.env
sudo $EDITOR /etc/vibecrafted/contact.env      # set RESEND_API_KEY
sudo chmod 600 /etc/vibecrafted/contact.env

# 3. systemd
sudo cp vibecrafted-contact.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now vibecrafted-contact
systemctl status vibecrafted-contact            # active (running)

# 4. Local smoke (before Caddy)
curl -sS -X POST http://127.0.0.1:8787/api/contact \
  -H 'content-type: application/json' \
  -d '{"email":"you@example.com","subject":"smoke","message":"hello"}'
# → {"success":true}  (and a mail in hello@vibecrafted.io)

# 5. Caddy: merge Caddyfile.snippet into the vibecrafted.io block, then
caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy

# 6. End-to-end via the public URL (same-origin, what the browser does)
curl -sS -X POST https://vibecrafted.io/api/contact \
  -H 'content-type: application/json' \
  -d '{"email":"you@example.com","subject":"e2e","message":"live test"}'
# → {"success":true}
```

Then submit the form on the live site — the status line should read
"Sent. We'll reply if it's a fit." (PL: "Wysłane.").

## Repo side (already wired by the client commit)

- `site/src/components/ContactForm.astro` → `relayUrl = '/api/contact'` (same-origin).
- `site/src/layouts/LayoutV2.astro` CSP → `connect-src 'self' https://plausible.io`
  (dead `contact.libraxis.ai` removed; `form-action 'self'` already allows the same-origin POST).

## Notes

- **Rate limiting** is intentionally not in the app. If abuse appears, add Caddy
  `rate_limit` on the `/api/contact` handle (keeps the app dependency-free).
- **Multi-site:** the `site` key is forwarded and tags the subject (`[vibecrafted] …`).
  A second static site can reuse this mailer by posting `{site:'othersite', …}` and
  routing on `site` here — but that is a later step, not needed for vibecrafted.io.
- **Logs:** `journalctl -u vibecrafted-contact -f` (logs status + sender, not message bodies).
