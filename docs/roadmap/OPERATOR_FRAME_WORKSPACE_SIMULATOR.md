# Operator Frame workspace simulator — complete design contract

Status: target contract, 2026-09-23. The site simulator now renders host
Dashboard, Active runs, Config, Doctor, Projects, Voc and a Usage & costs
projection alongside guest workspaces. It can preview an empty host and restore example workspaces.
The installed Frame has not been verified against this contract, and the
two site presentations still have separate renderers. This document supplements
`HOMEPAGE_PRODUCT_STAGE_SPEC.md`; the nine-scene page choreography and its
`postMessage` protocol remain in force.

## 1. The failure this design must make impossible

The observed first `vc-start` from the Vibecrafted repository opened a Frame
whose rail rendered one row, `01 ○ Vibecrafted`,
while the only canvas said `Select a workspace from Sessions.` Dashboard,
Active runs, Config, Doctor and Projects were visible but did nothing on
click. The screen proves a broken host-to-workspace path; whether the runtime
created a guest behind that row needs a separate runtime receipt. Either
way, there was no functioning Home.

The simulator must show the intended behavior, including this exact
counterexample. It must not reproduce the empty `VC Guest` pane as a normal
landing state or depict a decorative host menu as working navigation.

## 2. Four identities, four labels

| Concept       | Stable identity                                       | Visible label                                           | Lifetime                                     |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------- |
| Frame host    | Internal host ID, independent of cwd and project name | `Operator Frame`                                        | Survives client detachment and guest changes |
| Project       | Canonical repository root / workspace catalog ID      | Repository name, e.g. `Vibecrafted`                     | Persists beyond one Frame session            |
| Guest session | Frame session ID plus incarnation                     | Project label, disambiguated by root/branch when needed | Lives independently of host client           |
| Client view   | Client ID plus selected route                         | `Home`, a host view, or guest organ                     | Per connected client                         |

No routing decision may inspect a displayed string to decide whether the
row is a host, guest, layout or command. `Vibecrafted`, `Operator`,
`Workflow`, `Research`, `Home`, `Dashboard` and `Voc` are all legal project
names. Two projects with the same basename remain separate rows; their
secondary line exposes different canonical roots or branches. The host is
not a project row and never consumes a workspace ordinal. The displayed
project name is preserved verbatim.

## 3. Spatial contract

One host owns one top bar, one left rail, one bottom status bar, Composer,
Panels, Quick cmd and Voc. A selected guest contributes **content** to the
canvas and three organs: Overview, Agents and Shell. Host navigation lives
above guest rows in the same fixed rail. Selecting a host action shows a
host canvas; selecting a guest shows its organ. Neither operation creates a
second chrome owner, kills a process, or changes another client's route.

The top row names the current context. On host views it shows `◉ Home` or
the selected host view. On a guest it shows `○ Overview  ◉ Agents  ○ Shell`.
The `+` for a new guest tab lives beside these tabs in the top row; it is not
repeated under each workspace in the left rail.
`Voc`, Composer, Panels and Quick cmd remain on the host side of the row.
The bottom center projects the selected guest's project, branch/PR and
diffstat; on Home it states `Operator Frame · no project selected`.

The rail uses two semantic zones:

```text
Operator Frame                 [host, pinned]
  ⌂ Dashboard
  ❖ Active runs · 0
  ⚙ Config
  · Doctor
  ✧ Projects
  Voc
························
Workspaces · 0                [live guest sessions only]
  [+] Open project
```

`Workspaces · N` counts guest sessions actually listed there. It does not
count the host, saved-only records, recent projects, agent runs or clients.
`Projects` may list catalog/recent projects; that list is explicitly distinct
from live workspaces. A project enters the rail only after a guest session
exists. `❖ Active runs` and the bottom LIVE value read the same simulated
feed, so the number cannot diverge between projections.

The simulator uses a `170 × 41` character reference frame from the observed
VC Terminal window, with Spot Mono throughout. It scales that frame to fit
the browser viewport; it does not claim that every installed terminal starts
at this size. Its dark colors follow the local VC Terminal theme values:
`#0b0b12` background, `#e0def4` foreground, `#d4a574` accent, `#a6da95`
green, `#eb6f92` red and `#f6c177` gold. Browser font metrics and CSS line
height approximate the terminal cell geometry; screenshots remain a visual
reference, not a pixel parity receipt.

The current client's selected row is shown with a persistent selection
mark and text label, not color alone. `●` and `○` serve as checked and
unchecked selection markers; they never encode session liveness. On a host
view all guest markers are hollow. A running pane process gets a changing
Braille-dot glyph next to its command in the expanded workspace, as in the
Founder's `⣸ cargo build` mockup from the 2026-09-19 Kimi session. The
animation describes the pane process, regardless of whether it is an agent or
a compiler. Agent attention can have a separate indicator; it must not reuse
the workspace selection marker. The bottom `LIVE` count is the simulated run
feed, not a count of selected workspaces.

## 4. The six required scenes

### A. Host with zero project workspaces

Entry from App/VC Terminal without a selected repo opens **Dashboard**.
The canvas has a clear `Open project` action, a `Live workspaces 0` empty
state, Active runs summary, and server/doctor status sourced from the demo
fixture. It never shows `Select a workspace from Sessions.` Host actions
remain available and navigate to real simulator views.

```text
𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.  ⎮  ⚿ L  ◉ Home     Voc  ✍ Composer · Panels 3 · ❯_ Quick cmd
Operator Frame       │ DASHBOARD
⌂ Dashboard      ◀   │ Your host is ready. Open a project to create its workspace.
❖ Active runs · 0     │ [Open project]     Live workspaces 0
⚙ Config             │ Server status / recent projects / needs attention
· Doctor             │
✧ Projects           │
·····················│
Workspaces · 0       │
[+] Open project     │
                     └───────────────────────────────────────────────────────
⌃g LOCK          Operator Frame · no project selected   LIVE 0 | HEALTH ok
```

### B. Open a repository from `vc-start` or Projects

The command resolves `--repo`, else Git top-level, else cwd. The host
creates or reuses its own internal session; a separate guest receives the
project identity. The canvas shows a **pending** transition naming the
canonical repo and intended guest. Only after the guest-create receipt does
the row appear. On a confirmed projection, the initiating client's route
becomes that guest's Overview. On failure, the host Dashboard remains usable
and displays the exact failed step with retry/reopen action; no ghost row is
presented as live. A server ACK is required before saying the guest is
projected.

Example: `vc-start` inside a repository named `Vibecrafted` creates a row
`01 Vibecrafted` under `Workspaces · 1`. `Operator Frame` is still the
separate host heading. This is the main regression fixture.

The pending banner states `Opening /canonical/repo/root as Vibecrafted…`.
After confirmation it states `Opened workspace Vibecrafted · /canonical/repo/root`
and moves to Overview. If the client is already attached to this guest,
`vc-start` reports `Rejoined workspace Vibecrafted` and preserves its
current organ. The banner names the exact project even when the terminal
window title or repository basename is `Operator` or `Dashboard`.

### C. Guest selected

Guest Overview shows this session's project identity, root, branch, run
summary and visible pane inventory. Agents shows agent cards plus one
`New agent` action and its configured provider choices. Shell represents a
guest-owned pane and its scrollback. Switching organs or returning Home
preserves the guest's pane buffer, selected organ, run IDs and draft input.
Selecting another guest changes only the initiating client's view.

The rail expands the selected guest enough to show Overview, Agents and
Shell, with a concise current-process line when one exists. The top bar
mirrors the selected organ. Unselected guests stay one-line rows; no
collapsible host section and no decorative dot maze.

```text
𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.  ⎮  ⚿ L  ◉ Overview  ○ Agents  ○ Shell   Voc  ✍ Composer · Panels 3
Operator Frame       │ OVERVIEW · Vibecrafted
⌂ Dashboard          │ /Users/example/work/Vibecrafted  ·  main
❖ Active runs · 0     │ Workspace live · client viewing · 0 active runs
⚙ Config             │ [Agents] [Shell]   Recent activity / receipts
· Doctor             │
✧ Projects           │
·····················│
Workspaces · 1       │
01 Vibecrafted  ◀    │
   live · viewing    │
   Overview          │
   Agents            │
   Shell             │
                     └───────────────────────────────────────────────────────
⌃g LOCK          Vibecrafted · main · clean     LIVE 0 | HEALTH ok
```

Clicking `Agents` or `Shell` in either the top row or the expanded guest
selects the same guest organ. The host rows remain one click away. Clicking
the `Operator Frame` heading selects Dashboard. `Workspaces · 1` is a count
and heading, not another selectable session. If rail width is too small for
the canonical root, the row shows a truncated secondary label and exposes
the full root on focus/hover and in Overview.

### D. Host view while guests remain alive

Clicking Dashboard, Active runs, Config, Doctor, Projects or Voc renders a
distinct host canvas. The selected guest remains alive and in the rail; its
process and organ selection are unchanged. Returning to its row restores
the same organ and content. Active runs shows the exact items behind the
rail count, including `needs attention`, `in progress` and `history` where
the fixture has them. Config shows effective settings and their source;
Doctor shows named checks and their actual demo status; Projects offers
open/reopen/create. No host row may call a generic shell command in lieu
of opening its named view.

| Host route  | Required first screen                                                      | Primary action              |
| ----------- | -------------------------------------------------------------------------- | --------------------------- |
| Dashboard   | Live workspaces, active runs, server/doctor summary, last selected project | Open project                |
| Active runs | Rows grouped by current state; zero state if none                          | Open the owning guest/run   |
| Config      | Effective value and source for each shown setting                          | Open configuration help     |
| Doctor      | Named checks with recorded simulator status and remediation                | Inspect a failed check      |
| Projects    | Recent/catalog projects, each with root and live/closed state              | Open or rejoin that project |
| Voc         | Global run and attention feed, linked to the same run records              | Jump to run or guest        |

The `Projects` route is the only place to browse projects without implying
that every catalog entry is a running Frame workspace. A project card with
no live guest says `Open workspace`; one with a live guest says `Return to
workspace`. Host selection never resets the selected guest organ: the top
row can show a host title while the rail still remembers which guest to
return to.

### E. Detached, stalled and closed guest

Closing a client detaches that client; it does not delete the host or
guest. A guest with zero clients can still be live and selectable.
`stalled` is a run state, not automatically a session state. Closing a
guest session removes its row only after a terminal session event; a saved
resurrection record belongs in Projects/history, not the live rail. When
projection cannot be confirmed, show `projection unknown` and preserve the
last confirmed view. The simulator must demonstrate this without claiming
to explain the real client-ejection bug.

### F. Colliding names

Demonstrate project names `Vibecrafted`, `Operator`, `Workflow`, `Research`
and two different repositories named `Vibecrafted`. Display names stay
natural. A secondary root/branch line disambiguates the same-name pair.
All route keys remain opaque IDs. Opening a same-name repo a second time
re-enters its existing live guest or follows an explicit resurrection flow;
it never silently creates another host or projects a guest into itself.

## 5. One deterministic interaction model

The simulator is a local, deterministic demonstration. A persistent badge
reads `SIMULATOR · example state`; demo data is never styled as live customer
telemetry. It has no server writes, credentials, subprocesses or real
`vc-start` execution. Time, CPU, memory, disk, health and run outcomes do
not change at random. Scripted transitions may advance only in response
to a visitor action (or an explicit `Play scenario` step) and remain
replayable with `Reset demo`.

The state is a discriminated model rather than free-floating strings:

```text
FrameHost { id, health, config, clientIds }
Project { id, canonicalRoot, displayName, branch, pr, diffstat }
GuestSession { id, incarnation, projectId, lifecycle, paneIds, organ }
ClientView { clientId, route: Host(view) | Guest(sessionId, organ) }
AgentRun { id, guestSessionId, provider, state, evidence }
UI { overlay: none | panels | composer | quickCmd | newAgent,
     panelScope: global | project, panelPage, themePreference }
```

Host routes are `dashboard`, `activeRuns`, `config`, `doctor`, `projects`
and `voc`. Guest organs are `overview`, `agents`, `shell`. All visible
counters and status text are selectors over this one model. `Projects`
queries Project records; `Workspaces` queries live GuestSession records;
`Active runs` queries AgentRun records. The simulator has one reducer for
navigation/create/detach/restore, one fixture, and no second independently
maintained session array.

The command deck may explain real commands, but pressing Enter in the demo
can only dispatch documented simulator actions. `uninstall`, `stop`, and
`resume` cannot display fabricated success receipts. If an action is not
simulated, label it `Preview only` and explain the real entry point.

## 6. One simulator across the site

Current code has separate state engines in
`site/src/components/operator-tui.ts` (Home hero) and
`site/public/playground/index.html` (standalone/Product Stage), plus a
static `FrameAnatomy.astro` diagram. Their session lists, host actions,
vitals and overlays already differ. The finished design uses **one
workspace model and one renderer** for the hero and standalone stage.
Both mounts may size differently and receive a different scripted scene,
but must not define their own host/guest rules or fixture truth. Keep the
accepted `vc.playground.scene.v1` / `ready.v1` / `scene-ack.v1` same-origin
protocol on the standalone stage; it selects a scene in the same model.
`FrameAnatomy` remains an explicitly labelled explanatory diagram, with
labels and sample counts generated from that fixture or checked against it.
`FrameworkPlayground` remains a separate framework/lifecycle teaching
surface and must not present itself as a second VC Frame session emulator.

The page theme is followed by default; the moon control opts the console
out and can return to follow. No theme change may mutate workspace state.
On narrow screens, the rail becomes an accessible drawer with a visible
`Workspaces N` opener; hiding it without a replacement is forbidden. The
keyboard can reach host routes, guest rows, organs and overlays; focus
returns to the invoking control on close. Selection is announced with
`aria-current` or tab semantics as appropriate. Reduced motion removes
spinners without concealing state.

## 7. Acceptance, not screenshot approval

1. Load hero and standalone from the same fixture. Both start on Host
   Dashboard with `Workspaces 0`, working host routes and a visible demo
   badge. No `VC Guest` placeholder is visible.
2. Open a repo named `Vibecrafted`. There is exactly one host and one
   guest row; the guest Overview shows the canonical repo. Config/Doctor
   still open on the host. Repeat for `Operator`, `Workflow`, `Research`.
3. Open two repos with the same basename. Two rows remain distinct by
   root/branch, while neither label is renamed to an internal key.
4. Navigate guest Shell → host Dashboard → guest Shell. Pane content,
   unsent draft and process/run identity are unchanged. Repeat with a
   second client view in the fixture; only the initiating view moves.
5. Create a demo agent run. The rail count, Active runs view and bottom
   LIVE count agree at every transition. Stop/settle show a named state and
   evidence; there is no random `HEALTH !!` flip.
6. Use Voc, Panels Global/Project with pager, Composer and Quick cmd while
   moving between guests. Host overlays remain host-owned; project scope
   follows selected guest; drafts and conversations survive navigation.
7. Force guest-create refusal and projection-unknown fixture states. The
   host stays usable and no success claim or phantom live row appears.
8. At desktop and narrow widths, capture hero and standalone screenshots
   for A–F. Verify labels, focus, contrast, drawer, reduced motion and
   stage scene ACK in a real browser. Verify no console errors and no
   external action/network request from simulator controls.

Implementation order: first extract the shared typed model/fixture and
replace random telemetry; then render host Home and working host routes;
then guest creation, organs and name collisions; then overlays and
responsive/accessibility; finally retire duplicate engines and run the
same browser scenario matrix against hero and standalone. Do not mark the
simulator complete after only the hero or only `/playground/` changes.
