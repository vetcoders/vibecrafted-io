---
title: "Vista — a sealed environment that almost shipped without working"
date: "2026-04-28"
lesson: "Build green plus smoke green is not e2e green. Verify the real path, not the proxy."
plan_count: 3
agent_count: 3
duration: "one weekend"
description: "A pre-launch desktop client passed every build and every smoke test. The crypto contract between portal and client was silently misaligned. F-001 found it before customers did."
---

## The setup

Vista is a desktop product with a portal counterpart. The pair share a sealed-environment crypto contract: the portal encrypts payloads with keys the client owns; the client decrypts them locally; the network sees only opaque envelopes. This is the entire trust model. If the envelope contract drifts even a byte, the product appears to work and does not.

Going into the launch weekend, Vista's CI was green. The portal built. The client built. The smoke tests passed. The login flow rendered. The token exchange returned 200. By every observable surface the team had a shippable product.

Then a real user — internal, friendly, willing to file a clean repro — opened the app, logged in, and watched their session render an empty inbox. No errors. No alerts. Just the absence of anything to decrypt.

Filed as **F-001: sealed_envs=0 in prod**.

## The framing

Two things were simultaneously true:

- Every test the team had written said the system worked.
- The system did not work.

That gap is the most dangerous shape a pre-launch product can have, because the next move is usually "ship anyway and patch in the field." Vibecrafted's rule here is the opposite: when the test surface and the runtime disagree, the test surface is wrong, not the runtime. Find why the tests think it works, then find why it does not.

## The approach

A triple research swarm was dispatched: three independent agents, three different cognitive priors, same brief. Each was asked to produce a hypothesis tree for why a sealed-envelope handshake could pass every observable check and still produce zero decrypted payloads.

The three reports converged on a single class of failure: **key-derivation alignment drift between the portal's encrypt path and the client's decrypt path.** The handshake was succeeding because both sides were doing the right thing locally — but with subtly different derivations, producing envelopes that were structurally valid and semantically unreadable.

The smoke tests had been written against the local round-trip on each side. Neither side's smoke test had ever tried to decrypt the *other* side's envelope. The test surface had a hole exactly the shape of the bug.

## The fix

Three things moved in parallel over roughly thirty-six hours:

- The key derivation paths on both sides were normalized to a single canonical specification, with the spec itself written down in the repo so future drift is detectable.
- A new test class was added: cross-side envelope exchange. The portal encrypts; the client decrypts; the assertion is that the result equals the input. This test is now a hard gate on both repos.
- A `sealed_envs > 0` runtime probe was added to the launch dashboard so the next time the count flatlines, the team sees it before a user does.

Build **0.67.3** shipped with the alignment fix and the new gate. F-001 closed.

## What it taught

**One — green CI is a status report on the questions you asked.** It is not a status report on the questions you should have asked. The Vista smoke tests were not wrong; they were incomplete in a way that the architecture made invisible. Sealed-environment systems are especially good at hiding this: an envelope that fails to decrypt looks identical to an envelope with nothing inside.

**Two — research-before-fix scales when the fix is irreversible.** A wrong patch in cryptographic code is worse than no patch. Spending an extra few hours on three independent hypothesis trees produced a fix that converged from multiple angles instead of one. The fix landed once, correctly, without a rollback.

**Three — the runtime is the spec.** Whatever the docs say, whatever the smoke tests say, the truth is the byte that comes out of decrypt. Verify the byte. Build the test that asserts the byte. Then trust the test.

## What shipped

- Build 0.67.3 with aligned key derivation across portal and client.
- A cross-side envelope exchange test class, now a hard gate on both repos.
- A runtime `sealed_envs` probe surfaced on the launch dashboard.
- A documented post-mortem on F-001 routed into the vibecrafted methodology corpus so the same shape gets caught earlier next time.
- The team got their weekend back. The launch held.
