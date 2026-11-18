---
name: vibecrafted-io-homepage-product-stage
type: authoritative_product_spec
status: accepted
project: vetcoders/vibecrafted-io
scope: bilingual homepage only
branch_at_decision: fix/site-layouts
commit_at_decision: 5392900
created: 2026-08-22
supersedes:
  - hero-owned playground iframe
  - static PNG or video replacement for the playground
  - one independent terminal demo per homepage section
---

# Homepage Product Stage — authoritative specification

## Decision

The Vibecrafted homepage becomes a scroll-directed product demonstration with
two coordinated tracks:

- the left track tells the story in native page sections;
- the right track contains exactly one persistent, interactive simulation of
  Vibecrafted.app;
- page scroll directs the simulator's scene, but never takes control away from
  the user;
- dense editorial or commercial sections send the simulator below the viewport
  and reclaim the full page width;
- mobile renders the same simulator once in the hero flow, without sticky
  scrollytelling.

This is not a hero redesign. It changes the ownership model of the homepage.
The terminal belongs to the page, not to `HeroSectionV2`.

## Authority and attribution

This document is the implementation authority for the cut.

Operator intent recovered through
`aicx intents -p /vibecrafted-io -H 720`:

- the terminal imitation should be attached to one place and remain visible in
  the same viewport position through the page;
- the main page scroll should change what happens inside that terminal;
- full-content slides should make the terminal leave and later return from the
  bottom;
- the terminal should have a slight perspective so it reads as an object;
- the playground should simulate Vibecrafted.app and the actual workflow, not
  behave like an infantile command toy;
- external product language must speak from confidence in agent-built
  software, not from defensive uncertainty.

Evidence sessions: Claude `abfed11b-8509-416c-b169-aff57e468501`
(2026-08-22) and `ff21e3fc-b382-4347-9482-c057384a3df2`
(2026-08-18).

The precise architecture, scene grouping, breakpoint, motion limits, and test
contract below are the spec author's decisions made under the operator's
request for one final authoritative shape. Earlier Claude and Grok responses
are advisory input, not operator decisions.

## Intent reconciliation against the live tree

| Status     | Intended outcome                                | Live evidence at `5392900`                                                                                                                    |
| ---------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| partial    | Playground simulates Vibecrafted.app            | `site/public/playground/index.html` has sessions, panes, commands, runs, and receipts, but is only mounted in the hero.                       |
| missing    | One page-owned persistent terminal              | `HeroSectionV2.svelte` owns the only iframe.                                                                                                  |
| missing    | Scroll-directed terminal scenes                 | No `postMessage` scene protocol or homepage scene controller exists.                                                                          |
| done       | User can interact with the simulator            | Tabs, sessions, command input, help, and simulated runs are wired.                                                                            |
| missing    | Terminal leaves and returns around dense slides | No page-level stage state exists.                                                                                                             |
| missing    | Subtle spatial perspective                      | The current hero stage is a flat rectangle.                                                                                                   |
| partial    | Mobile has a non-sticky terminal                | The iframe is in normal hero flow below 900px, but the observed 390px surface overflows and collides with global chrome.                      |
| missing    | One runtime source for the playground           | `assets/playground/vibecrafted-playground.html` and `site/public/playground/index.html` are byte-identical writable twins with no sync owner. |
| superseded | Embed a live vc-frame server                    | The public homepage ships a safe same-origin simulator. Live vc-frame embedding is a separate authenticated product surface.                  |

## Product model

The page is not "a hero with a terminal followed by a brochure." It is a live
explanation of one workflow:

1. understand the workspace;
2. send and observe work;
3. converge and settle it;
4. keep proof.

The left side names the current operation. The right side demonstrates it.
Neither side is a decorative companion to the other.

The simulator must remain honest:

- it is visibly identified as a simulator;
- every command and state corresponds to a real Vibecrafted surface;
- it never implies that a remote worker, checkout, receipt, or install was
  created on the visitor's machine;
- it uses local deterministic data and makes no privileged network call.

## Page choreography

The current homepage order is retained, then renumbered sequentially. The
existing duplicated numbering (`02`, `03`, then `01`) is not retained.

| Beat | Section          | Stage      | Scene       | Required terminal action                                                                           |
| ---: | ---------------- | ---------- | ----------- | -------------------------------------------------------------------------------------------------- |
|   00 | hero             | on         | `receipt`   | Show one complete job: command, live run, validated report, settlement, receipt.                   |
|   01 | surface          | on         | `sessions`  | Reveal the session rail and switch among LIVE, IDLE, and STALE panes.                              |
|   02 | install-manifest | on         | `install`   | Type the canonical install/bootstrap command and print the installed component manifest.           |
|   03 | problem          | on, quiet  | `drift`     | Show source/installed drift and a stale session with no trustworthy receipt. No looping animation. |
|   04 | engineering      | on         | `orient`    | Run `loct context`, then show atlas, runtime owner, and blast-radius evidence.                     |
|   05 | shift            | off        | —           | Full-width comparison. The stage exits below the viewport.                                         |
|   06 | framework        | on         | `lifecycle` | Return from below and traverse the canonical ship lifecycle using tabs and buffer state.           |
|   07 | operator         | on         | `observe`   | Show dispatch, observe, await, and a live state transition.                                        |
|   08 | quickstart       | on         | `run`       | Launch one bounded workflow and reach `report_validated`.                                          |
|   09 | references       | off        | —           | Full-width editorial references. The stage exits below the viewport.                               |
|   10 | evidence         | on         | `proof`     | Return from below and show receipts, trust journal, gates, provenance, and settlement.             |
|   11 | commercial       | off, final | —           | Full-width offer and conversion surface. The stage leaves for the rest of the page.                |

There are nine visible cues, not nine bespoke mini-apps. Every cue composes
the same four primitives:

1. select a session or tab;
2. replace or append terminal buffer content;
3. move the terminal viewport to a meaningful region;
4. optionally type one command.

Scene definitions are declarative snapshots over one shared state machine.
They may not introduce independent animation engines, duplicate terminal DOM,
or section-specific iframes.

## Content cut

Stage-on sections become narrators. They must fit beside a readable terminal
without shrinking either surface into a thumbnail.

- `surface`: remove the floating screenshot gallery and static terminal tiles
  from the homepage. Keep a compact explanation of sessions, panes, and live
  state; the persistent simulator is the proof.
- `install-manifest`: keep a compact four-part manifest and link to the full
  install reference. The terminal performs the install scene.
- `problem`: stack the problem and symptoms in the left track; do not preserve
  the current three-column desktop composition inside the narrow track.
- `engineering`: reduce the interactive card grid to three sharp operating
  laws. Detailed explanations belong on dedicated pages/docs.
- `framework`: keep the lifecycle and operator model, but remove the large
  embedded pipeline board from the homepage. The stage demonstrates the
  lifecycle.
- `operator`: remove duplicate vc-frame screenshots and the board preview from
  the homepage. Keep the control verbs and links to deeper product surfaces.
- `quickstart`: replace the carousel with a compact ordered sequence whose
  active step matches the terminal scene.
- `evidence`: keep the strongest proof patterns in the left track; the terminal
  owns runtime receipts and provenance.
- `shift`, `references`, and `commercial`: retain full-width layouts and mark
  the stage off.

This is deliberate subtraction. The landing page demonstrates the product;
dedicated pages hold inventories, galleries, diagrams, and exhaustive detail.
Any component made unreachable by this cut must be checked with `loct impact`
and removed with `git rm`, not left as dead presentation code.

## Ownership and target architecture

Do not put homepage-specific state into `LayoutV2.astro`; it has 24 consumers.
Do not turn `SectionShell.astro`; it has 13 consumers, into a hidden homepage
controller.

The target ownership is:

```text
en/index.astro + pl/index.astro
└── LandingProductStory.astro        page-only layout and stage boundary
    ├── ProductStage.svelte          one iframe, stage state, ready/ack queue
    └── StoryBeat.astro × 12         declarative beat/scene/stage metadata
        └── existing section content, reduced for its declared mode

site/public/playground/index.html    only runtime simulator source
└── scene controller                 deterministic scene state machine
```

Required new surfaces:

- `site/src/components/landing/LandingProductStory.astro`
- `site/src/components/landing/StoryBeat.astro`
- `site/src/components/landing/ProductStage.svelte`
- `site/src/lib/product-story.ts`
- `site/check-product-story.mjs`

Required existing-surface changes:

- both localized homepage entrypoints declare the same beat order and scene
  IDs;
- `HeroSectionV2.svelte` becomes copy and CTA only; it no longer owns an
  iframe;
- affected section components adopt their story or full-width composition;
- `SearchShellV2.svelte` exposes search-open state so the stage can yield
  visual priority;
- current smoke tests stop enforcing "playground on hero" and enforce one
  page-owned stage instead;
- `site/package.json` runs the new product-story gate in `build`.

Runtime source of truth:

- `site/public/playground/index.html` is the only editable simulator entrypoint
  because it is the file actually served at `/playground/index.html`;
- delete `assets/playground/vibecrafted-playground.html` after its impact check;
- keep harvested help/state artifacts only when they have a named consumer;
- never restore a manually synchronized writable HTML twin.

## Layout contract

### Desktop stage mode

Desktop stage mode starts at `min-width: 1024px` and `min-height: 680px`.

- `LandingProductStory` spans hero through commercial and owns a full-height
  absolute stage track.
- `ProductStage` is `position: sticky` inside that track.
- sticky top is `clamp(88px, 10vh, 112px)`, below the fixed navigation;
- stage width is `clamp(500px, 47vw, 700px)` and may not make the left reading
  track narrower than 360px;
- stage height is `clamp(420px, 62vh, 620px)`, additionally capped by
  `calc(100dvh - var(--stage-top) - 96px)` to reserve the global search area;
- the left and right tracks align inside the existing `--v2-max-width: 1152px`
  contract;
- stage-on beats reserve the stage column; stage-off beats reclaim the full
  `1152px` width;
- the iframe is mounted once and never reloads as beats change.

The stage gets spatial presence through at most `2deg` of `rotateY` with a
long perspective (`>= 1400px`). No rotateX flourish, parallax, fake window
titlebar, glow, scanlines, grain, or glass card is allowed. The simulator's own
rail, tabs, terminal, and status bar are the product chrome.

### Leaving and returning

`off` does not mean `display: none` during normal motion. The actor exits via a
single downward transform and returns through its inverse:

- distance: completely below the viewport plus 48px;
- duration: 360–480ms;
- easing: one restrained ease-out curve;
- opacity may soften only in the last/first 15% of travel;
- after exit, apply `inert` and `aria-hidden="true"`;
- remove both before a return begins.

Transitions occur only on beat changes. No ambient bobbing or looping stage
animation is permitted.

### Mobile and constrained viewports

Below the desktop stage condition:

- there is no sticky or fixed product column;
- render the same iframe once, directly after hero copy/CTAs;
- all later sections use full width and do not repeat the simulator;
- the session rail may collapse using the simulator's existing mobile mode;
- viewport width at 390px must equal document width: zero horizontal overflow;
- nav, command input, simulator status bar, and global search may not overlap;
- content height is natural; `100dvh` is a minimum for views, never the forced
  height of an oversized child.

### Reduced motion, no-JS, print, and capture

- `prefers-reduced-motion`: no typed animation, scrubbed terminal scrolling,
  perspective transition, or stage travel. Scene state changes are immediate.
- no JavaScript: all editorial content remains visible and the simulator is
  rendered once in normal hero flow.
- print/extreme-tall capture: hide the interactive stage and render all text
  sections fully; no opacity-zero reveal default is allowed.

## Scene protocol

The iframe protocol is versioned and same-origin:

```ts
type SceneId =
  | "receipt"
  | "sessions"
  | "install"
  | "drift"
  | "orient"
  | "lifecycle"
  | "observe"
  | "run"
  | "proof";

type SceneCue = {
  type: "vc.playground.scene.v1";
  cueId: string;
  scene: SceneId;
  motion: "full" | "reduced";
  progress?: number;
};
```

The child sends:

- `vc.playground.ready.v1` with its supported scene IDs after initialization;
- `vc.playground.scene-ack.v1` with `cueId` and `scene` after an idempotent
  scene application.

The parent:

- validates `event.origin === location.origin` and
  `event.source === iframe.contentWindow`;
- queues only the latest cue until `ready`;
- sends a new scene only when the active beat changes;
- may send progress at no more than one update per animation frame and only
  for a scene that declares progress support;
- treats a missing ACK as a visible test failure, not silent success.

The child:

- validates message type, schema, origin, and scene ID;
- cancels timers from the previous scripted scene before applying another;
- makes repeated application of the same `cueId` a no-op;
- never reloads itself to apply a scene;
- never moves keyboard focus or overwrites the command input;
- escapes all visitor-entered command text.

## Scroll versus user control

Native page scrolling is never intercepted, snapped, slowed, or replaced.
`IntersectionObserver` selects the active beat around the viewport's narrative
center. A passive, animation-frame-bounded progress calculation may drive the
terminal viewport inside `lifecycle` and `proof`.

Manual interaction wins:

- tabs, sessions, command input, selection, and terminal scrolling remain live;
- focusing or interacting with the iframe suspends progress scrubbing for the
  current beat;
- a scene cue may not steal focus, clear a typed command, or force a manually
  scrolled terminal back to the bottom;
- crossing into a different beat establishes the new scene baseline and ends
  the previous manual lease;
- re-entering a beat while scrolling upward deterministically restores that
  beat's scene.

## Global chrome coordination

- The fixed navigation always stays above the stage and never overlaps its
  top edge.
- The closed search trigger fits inside the reserved 96px bottom safe area.
- When search opens, it receives visual and keyboard priority. The stage stays
  mounted but becomes inert and visually subdued until search closes.
- Removing the floating screenshot gallery eliminates the second draggable
  product window that currently competes with the stage.
- Z-index values are owned by a short documented stack in
  `LandingProductStory`, not scattered per beat.

## Acceptance contract

### Structural gates

- Exactly one homepage iframe loads `/playground/index.html?embed=1`.
- `HeroSectionV2.svelte` contains no iframe and no stage sizing rules.
- EN and PL homepages declare identical beat order, stage modes, and scene IDs.
- Parent and child scene ID sets are identical.
- The obsolete `assets/playground/vibecrafted-playground.html` twin is absent.
- No homepage-specific controller state is added to `LayoutV2` or
  `SectionShell`.
- No vertical scroll snap or scroll-jacking runtime is introduced.
- Static screenshot/board/carousel components made unreachable by the cut are
  removed after `loct impact` confirms their blast radius.

### Runtime and visual gates

Verify at minimum at 1440×900, 1280×800, 1024×768, and 390×844:

1. From hero through quickstart, the visible stage stays in the same viewport
   position within 2px, excluding intentional off/on travel.
2. Each beat activates the tabled scene in both scroll directions.
3. The iframe document identity remains constant; it is not recreated or
   reloaded.
4. `shift`, `references`, and `commercial` reclaim full width while the stage
   is fully below the viewport.
5. The stage returns for `framework` and `evidence` from below.
6. Terminal tabs, sessions, help, command input, and simulated workflow remain
   usable after every automatic scene change.
7. Manual terminal scrolling and focused input are not overridden by progress
   cues.
8. Opening search creates no overlap or focus trap.
9. At 390px there is no horizontal page scroll and the simulator appears only
   once under the hero.
10. Reduced-motion mode has no typing, scrubbing, perspective transition, or
    stage travel.
11. With JavaScript disabled, copy remains visible and one usable simulator
    remains in document flow.
12. Chrome/Chromium and Safari show the same ownership and breakpoint behavior.

Required automated gates:

```bash
cd site
pnpm check
pnpm run smoke:product-story
pnpm build
cd ..
make check
make test
```

Run Semgrep when available. The browser-level stage persistence, reverse
scroll, search priority, iframe interaction, mobile overflow, reduced motion,
and no-JS cases must be automated; regex-only smoke tests are not sufficient.

## Implementation order

1. Add the product-story types, beat wrapper, page owner, stage component, and
   failing contract tests.
2. Move the single iframe from the hero into the page-owned stage without
   changing scene content.
3. Add the ready/cue/ACK scene controller to the simulator and make all nine
   scenes deterministic from shared primitives.
4. Apply the scene matrix to both localized page compositions.
5. Reduce stage-on sections, preserve the three full-width beats, and remove
   dead duplicate presentation components.
6. Resolve search/nav safe areas, mobile overflow, reduced motion, no-JS, and
   print behavior.
7. Run static, unit, build, and real-browser gates; capture desktop/mobile
   evidence before calling the layout shipped.

Do not split this into one CSS ticket plus nine unrelated scene tickets. The
first shippable slice is the vertical spine: one persistent stage, one protocol,
three representative cues (`receipt`, `lifecycle`, `proof`), both off/on
transitions, mobile fallback, and browser proof. The remaining cue content is
then data work on an already-proven system.

## Non-goals

- cross-origin or authenticated live vc-frame embedding;
- WebSocket exposure, demo tenancy, or public token login;
- a static PNG/video substitute for the simulator;
- separate iframe instances per section;
- preserving every current homepage widget after its job moves into the stage;
- changing dedicated framework, quickstart, install, pricing, FAQ, or docs
  routes except where a link target must remain truthful;
- changing the generic `LayoutV2` contract for all pages.

## Highest truth

The current homepage is still a hero-owned iframe followed by eleven isolated
full-viewport sections, and its smoke tests explicitly lock that obsolete
shape in place. The release blocker is not perspective CSS. It is establishing
one page-level product-stage owner, one scene protocol, and one runtime source
of truth, then deleting the duplicate proof widgets that would otherwise make
the page tell the same product story three different ways.

## Next leverage

1. Land the vertical-spine slice before polishing any individual scene.
2. Convert `receipt`, `lifecycle`, and `proof` first; they prove start, middle,
   end, exit/return, and the product thesis with the smallest scene set.
3. Only after real desktop/mobile browser proof, fill the remaining declarative
   cues and tune editorial timing.
