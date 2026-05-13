---
title: "Loctree LSP — 22 plans, one falsifier-resistant verdict"
date: "2026-05-08"
lesson: "Frontier SoTA means a future auditor reading the test cannot construct a falsifier."
plan_count: 22
agent_count: 6
duration: "6 weeks"
github_link: "https://github.com/Loctree/loctree-suite"
description: "A 22-plan LSP roadmap was declared complete. Six parallel Opus agents and one adversarial codex audit found out what 'complete' actually meant."
---

## The setup

Loctree is the structural-mapping layer that vibecrafted agents call before they grep. The LSP subsystem — `loctree-lsp` — surfaces that map inside an editor as a language server: hover-cards on imports, inline impact lenses, dead-code highlights, live cycle warnings.

The LSP roadmap shipped as 22 plans over six weeks. Each plan had its own commit envelope, its own tests, its own merge gate. By plan 22 the public statement was simple: "the roadmap is done." The CI was green. The unit tests passed. The integration tests passed.

That sentence — "the roadmap is done" — is the kind of sentence vibecrafted is built to interrogate.

## The framing

A green pipeline is necessary, not sufficient. It tells you the tests you wrote pass. It does not tell you the tests you should have written exist. It does not tell you whether the runtime behaviour matches the documented contract. It does not tell you whether the plan-22 commit and the plan-01 commit still describe the same product.

So the question stopped being "are the tests green" and started being: **can a future auditor read this codebase and construct a falsifier we missed?**

If yes, the roadmap is not done. It is only un-disproven.

## The approach

Six Opus-tier audit agents were dispatched in parallel, each with a different slice:

1. Plan-to-code coverage (does each plan have evidence in HEAD?)
2. Runtime path verification (does the LSP actually serve what plan-N said it would?)
3. Test surface adequacy (does the test catch the failure mode the plan was written to prevent?)
4. Cross-plan drift (do plan-04 invariants still hold after plan-19?)
5. Contract surface (do hover, lens, and diagnostic responses match documented JSON shapes?)
6. Adversarial probe (try to break it on purpose; record what bent)

A seventh, independent audit was run in a different agent harness against the same HEAD with the same brief. No coordination. No shared notes. Two reports converged on the same questions from different angles.

## The verdict

**PARTIAL.**

Of 22 plans, the six-agent sweep marked 20 as substantively delivered. The adversarial probe and the independent audit found **two P1 wire breaks** that the green CI had been quietly tolerating:

- One diagnostic surface that documented a JSON envelope shape the LSP no longer emitted (a refactor in plan-15 had renamed a field; the contract doc still showed the old name; no test exercised the documented shape directly).
- One hover-card path that returned correct content but with a stale cache tag, which downstream editor integrations were using as a key. The unit test asserted content; nothing asserted the tag.

Neither failure broke a build. Both failures would silently degrade integration with a future editor client.

The reconciled master verdict downgraded from `PASS_WITH_GAPS` to `PARTIAL`. Both P1s were filed into a follow-on marbles iteration prompt — not as roadmap regressions, but as the precise gap between "tests we wrote" and "tests a future auditor would write."

## What it taught

Three things became load-bearing after this audit:

**One — positive testing finds present truths; adversarial testing finds latent ones.** The six-agent sweep was thorough. The independent audit caught what thoroughness missed because it was structured to disagree.

**Two — a contract is not a doc, it's a test.** Both P1s were contract drift. Both contracts were documented. Neither was asserted as code. A documented contract with no test asserting it is a wish, not a contract.

**Three — "complete" is a falsifier-resistance claim.** When you say a roadmap is done, you are not saying every test passes. You are saying: *I have anticipated what a future auditor will probe, and I have made those probes fail to find anything.* That is the SoTA bar. The audit is the proof.

## What shipped

- 22 plans landed in `loctree-lsp` with public commits on the Loctree suite.
- Master verdict downgraded honestly from `PASS_WITH_GAPS` to `PARTIAL` after parallel-truth reconciliation.
- Two P1 wire breaks documented with reproduction steps and routed to a meta-marbles iteration for closure.
- A working pattern for multi-agent audits with adversarial cross-verification, now reusable across the framework.

Public artifacts live in the [Loctree suite repository](https://github.com/Loctree/loctree-suite).
