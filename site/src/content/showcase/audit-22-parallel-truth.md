---
title: "Audit-22 — when the plan that ships race protection races against itself"
date: "2026-05-09"
lesson: "Adversarial verification finds what positive-only testing misses. Audit your audits."
plan_count: 22
agent_count: 7
duration: "one audit cycle"
description: "Two independent audits, one shared HEAD, one perfectly captured race condition — the plan that ships race protection reproduced its own raison d'être during its own shipping."
---

## The question

You have a 22-plan roadmap. The pipeline says done. The internal team says done. What does it mean to *trust* that done?

This is not a rhetorical question for vibecrafted. It is the entire premise of how the framework treats green CI: as evidence, not as proof. Evidence needs to be cross-checked. Proof needs adversarial pressure. The audit-22 cycle was built to apply both at scale.

## The setup

A 22-plan delivery had just closed out. Tests green. Smoke green. The internal claim was `PASS_WITH_GAPS` — substantively delivered, with a few documented loose ends.

The decision: do not accept the internal claim. Run two independent audits in parallel.

- **Audit A** — six Opus-tier agents, each owning a different evaluation axis (plan-to-code coverage, contract surface, drift, runtime path, adversarial probe, integration boundaries).
- **Audit B** — a separate agent harness, single auditor, different cognitive prior, same HEAD, same brief, no coordination with Audit A.

The framing was deliberately symmetric. If both audits arrived at the same verdict by different paths, that verdict was load-bearing. If they diverged, the divergence was the most interesting object in the room.

## What happened

They diverged.

Audit A finished first with `PASS_WITH_GAPS`. Three loose ends, all known, all minor. The roadmap would have shipped on that verdict.

Audit B finished about an hour later with `PARTIAL`. Same plans. Same HEAD. One additional finding: a P1 wire break in a contract surface that Audit A had not probed in the same direction. Specifically, Audit A had asserted the surface produced what plan-N said it would; Audit B had asserted the surface produced what a downstream consumer would *expect* given documented behaviour. Those are different questions. The second one failed.

The reconciled verdict downgraded from `PASS_WITH_GAPS` to `PARTIAL`.

That alone would have justified the exercise. The cycle would have closed there.

## The thing that happened next

Plan 02 of the same roadmap — the plan that introduced multi-agent commit envelopes — was running its final commit at the same time as Plan 07, the plan that ships a race-protection helper for exactly this situation. The two plans had been dispatched into different native subagents, each with its own commit envelope, working in the same shared tree. They hit `git commit` simultaneously.

Plan 02 won the ref-lock. Plan 07's commit was absorbed into Plan 02's envelope. The helper that Plan 07 had just finished writing — the helper whose entire purpose is to detect this exact race — detected its own lost race and exited cleanly. The plan that ships race protection captured the race it was designed to prevent **during its own shipping**.

This was not staged. The audit logs and the commit logs caught it live.

## What it taught

**One — adversarial verification is not redundant; it is structurally different.** Audit A and Audit B asked overlapping questions. They produced overlapping evidence. The verdict diverged on the question Audit A had not been built to ask. The cost of running both was an hour of compute. The value was avoiding a quietly broken contract surface in production.

**Two — the audit is part of the product.** Vibecrafted treats the audit surface as a deliverable, not a checkbox. If the audit can be one-shotted by a friendly agent, it is not an audit; it is a status report. A real audit must be capable of producing a verdict the team does not want to hear. Both audits in this cycle were capable of that. Only one of them did.

**Three — self-validating delivery is achievable and rare.** The Plan-02/Plan-07 race incident is not a process win to celebrate. It is a piece of evidence that the framework's instrumentation works at the boundary it was designed to cover. The helper logged the lost race. The envelope absorbed the work without losing it. Nothing was destroyed. The plan that promised race protection reproduced its own raison d'être on its first real test and survived.

If you wanted a stronger proof that vibecrafted's discipline holds under pressure, you would have to engineer it deliberately. This one engineered itself.

## What shipped

- 22 plans landed with a reconciled verdict of `PARTIAL`, honest about the gap.
- One additional P1 wire break documented and routed to follow-on closure.
- The audit-A / audit-B parallel-truth pattern formalized as a vibecrafted methodology surface, reusable for any high-stakes claim of "done."
- A live captured race incident demonstrating, on the record, that the race-protection helper works on its own commit envelope.
- A working definition of what trustworthy "complete" looks like: not green, not friendly, but *cross-checked against a second auditor that is willing to disagree.*
