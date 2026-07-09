---
title: "Model Casting and Cache Economics"
description: "Where frontier judgment belongs, where worker repetition belongs, and why hot-cache convergence changes the bill."
slug: "economics"
section: "architecture"
lang: "en"
syncedAt: "2026-07-06"
sourcePath: "operator-doctrine/model-casting-cache-economics-2026-07-05-06"
---

# Model Casting and Cache Economics

The rule is simple:

> model idzie tam, gdzie idzie osąd; cache tam, gdzie powtórka

The strongest model does not belong everywhere. It belongs where the run makes a
judgment that downstream work will inherit. The cache does not matter
everywhere either. It matters where the same prefix returns, round after round,
because the system is converging on a verdict.

This is not thrift. It is casting. Put frontier judgment in the seat that
decides. Put robust workers in the seats that execute. The savings are a
consequence of casting wisely — never the criterion. Then keep the repeated
prefix tight enough that the cache is an instrument, not a tax.

## Model casting

### Frontier-tier model: judgment seats

Use the frontier-tier model where the run carries taste, synthesis, or a verdict:

- **Operator / dispatcher session**: this is where the line is held. The model
  is steering the work, not merely applying a patch.
- **Scaffold**: the brief carries the line's intelligence. One good brief
  amortizes over every cheaper round downstream.
- **Marbles**: convergence lives or dies by the verdict. A weak model inside the
  loop can spin without converging and burn more than the rate difference.
- **Polarize**: this is pure taste. It chooses the final shape and rejects the
  plausible alternatives.

These are not "expensive" seats. They are load-bearing seats. Paying less for a
bad verdict is not savings.

### Worker-tier model: repetition seats

Use the worker-tier model where the run is mechanical execution steered by a
brief and gates:

- **Implement**
- **Justdo**
- **Workflow**

Those cuts are often cold full-price input, so the base rate should be low. The
job is to read the brief, make the cut, run the gate, and stop when the contract
is already satisfied.

The two sets overlap by design. Loops are cache-hot because they return, and
they return because that is where verdicts live.

## Cache economics

Anthropic prompt cache has the operating shape that matters for this framework:

- standard TTL: **5 min**
- extended TTL: **60 min**
- extended write rate: **2×**
- read rate: **0.1× input rate**

At a **~100k prefix**, the rough receipt is:

- write: **≈ $2 once**
- each round reads: **≈ $0.10**
- from **round three** the **1h-TTL premium has paid for itself**
- rounds **2..N** ride nearly free on input, paying only output

That turns repeated convergence from a linear bill into a shrinking bill:

```text
N× fresh dispatch ≈ N × (full context × full rate × full work)

1 × full round + (N−1) × (hot cache × shrinking delta)
```

The precondition is idempotence. The brief must say, and mean:

> if already done — verify and stop

A non-idempotent brief flattens the series. It keeps doing work because it was
asked to keep doing work. The cache may still be warm, but the economics die.

## Cadence is a parameter

The round cadence has to fit inside the TTL window. That is launcher behavior,
not operator memory. If the loop is meant to ride the **5 min** cache, rounds
must fit that window. If the loop needs the **60 min** extended TTL, the launcher
should say so and pay the write premium once.

The doctrine is not "always buy the longer TTL." The doctrine is: know whether
the loop will return before the cache expires.

## Live receipt

A real marbles convergence loop on **2026-07-05** read **14.1M cached tokens**.
That cost **≈ $21** instead of **≈ $210** uncached.

Cache divided the bill by ten.

That receipt only makes sense because the loop was returning to a shared prefix.
Fresh-dispatching the same work would have paid full input repeatedly. Returning
with a hot prefix made the marginal input cost small enough that the agent could
spend rounds on convergence instead of pretending one pass was enough.

## Tight prefix

The independent discipline is a tight prefix.

Even at read pricing, **$1/M × 14M cached reads is still $14**. A cache does not
forgive dumping raw tool output into the brief. It rewards a curated prefix that
the next round can actually reuse.

That is why structural context matters. Loctree gives the agent a compact map:
entry points, blast radius, hot files, route shape, risk. A curated structural
prefix beats a pile of terminal output because it is cheaper to read, easier to
reuse, and less likely to drag the loop into old noise.

The right economy is not the cheapest model everywhere. It is:

1. frontier judgment where the verdict is made
2. worker execution where the brief is already sharp
3. cache-hot convergence where rounds return
4. tight structural prefix everywhere

That is the tariff.

`//𝚟𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.`
