#!/usr/bin/env node
// Vibecrafted contact mailer — zero-dependency, same-origin /api/contact backend.
//
// Caddy on libraxis-vm reverse-proxies `/api/contact` to this process. It never
// faces the public directly (binds 127.0.0.1), so no CORS is needed — the browser
// sees a same-origin request. It sends exactly one email via the Resend REST API.
//
// This mirrors the libraxis-ai scheme (same-origin /api/contact + Resend) instead
// of the never-deployed cross-origin relay at the phantom host contact.libraxis.ai.
//
// Env (see .env.example):
//   RESEND_API_KEY  required — Resend API key (re_...)
//   CONTACT_TO      destination inbox          (default hello@vibecrafted.io)
//   CONTACT_FROM    verified Resend sender      (default "Vibecrafted <hello@vibecrafted.io>")
//   HOST            bind host                   (default 127.0.0.1)
//   PORT            listen port                 (default 8787)

import { createServer } from 'node:http';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 8787);
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const CONTACT_TO = process.env.CONTACT_TO || 'hello@vibecrafted.io';
const CONTACT_FROM = process.env.CONTACT_FROM || 'Vibecrafted <hello@vibecrafted.io>';

const MAX_BODY = 32 * 1024; // 32 KB hard cap on request body
const CAP = { email: 320, subject: 200, message: 8000, site: 64, company: 128 };

function now() {
  return new Date().toISOString();
}

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body),
    'cache-control': 'no-store',
  });
  res.end(body);
}

function readBody(req, ctype) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('body too large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      try {
        if (ctype.includes('application/json')) {
          resolve(raw ? JSON.parse(raw) : {});
        } else {
          // no-JS <form> path posts application/x-www-form-urlencoded
          resolve(Object.fromEntries(new URLSearchParams(raw)));
        }
      } catch {
        reject(new Error('bad body'));
      }
    });
    req.on('error', reject);
  });
}

function field(v, cap) {
  return typeof v === 'string' ? v.trim().slice(0, cap) : '';
}

async function sendEmail({ email, subject, message, site }) {
  const tag = site ? `[${site}]` : '[contact]';
  const text =
    `${message}\n\n` +
    `— — —\n` +
    `From: ${email}\n` +
    `Site: ${site || '(none)'}\n` +
    `Via:  vibecrafted contact relay\n`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `${tag} ${subject}`,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`resend ${res.status}: ${detail.slice(0, 200)}`);
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${HOST}`);

  if (url.pathname !== '/api/contact') {
    return json(res, 404, { success: false, error: 'not found' });
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, error: 'method not allowed' });
  }

  let data;
  try {
    data = await readBody(req, (req.headers['content-type'] || '').toLowerCase());
  } catch {
    return json(res, 400, { success: false, error: 'invalid body' });
  }

  // Honeypot: real users never see `company`; bots fill it. Pretend success,
  // send nothing — denying the signal that the trap worked.
  if (field(data.company, CAP.company)) {
    return json(res, 200, { success: true });
  }

  const email = field(data.email, CAP.email);
  const subject = field(data.subject, CAP.subject);
  const message = field(data.message, CAP.message);
  const site = field(data.site, CAP.site);

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!emailOk || !subject || !message) {
    return json(res, 400, {
      success: false,
      error: 'email, subject and message are required',
    });
  }
  if (!RESEND_API_KEY) {
    console.error(`[${now()}] config error: RESEND_API_KEY is unset`);
    return json(res, 500, { success: false, error: 'mailer not configured' });
  }

  try {
    await sendEmail({ email, subject, message, site });
    console.log(`[${now()}] sent  site=${site || '-'}  from=${email}`);
    return json(res, 200, { success: true });
  } catch (err) {
    console.error(`[${now()}] send failed: ${err.message}`);
    return json(res, 502, { success: false, error: 'could not send' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`vibecrafted contact mailer → http://${HOST}:${PORT}  delivers to ${CONTACT_TO}`);
});
