// @ts-nocheck — vanilla TUI port; scoped to a shadow root.
/** In-document operator TUI. Shadow-root scoped; no eval, no iframe. */
export type PlaygroundApi = {
  focus: () => void;
  destroy: () => void;
};

export function bootPlayground(root: ParentNode): PlaygroundApi {
  const EMBED = true;

  const $ = (s) => root.querySelector(s);
  const term = $("#term"),
    input = $("#cmd");
  const AGENTS = ["claude", "codex", "agy", "junie", "grok"];
  const SKILLS = {
    scaffold: ["READ", "0.2.0"],
    implement: ["WRITE", "2.2.0"],
    review: ["READ", "2.0.0"],
    workflow: ["WRITE", "3.6.0"],
    followup: ["READ", "2.2.0"],
    marbles: ["WRITE", "7.0.0"],
    audit: ["READ", "1.0.0"],
    polarize: ["WRITE", "2.0.0"],
    dou: ["READ", "2.1.0"],
    decorate: ["WRITE", "2.1.0"],
    hydrate: ["WRITE", "1.0.0"],
    release: ["WRITE", "0.2.1"],
    justdo: ["WRITE", "3.1.0"],
    intents: ["READ", "1.0.1"],
    research: ["READ", "1.3.0"],
    prune: ["READ", "3.3.3"],
    trust: ["READ", "1.0.0"],
    guard: ["READ", "1.0.0"],
    partner: ["READ", "—"],
    ownership: ["WRITE", "—"],
    delegate: ["READ", "—"],
  };
  const FLOWS = {
    workflow: "examine → research → implement → verify",
    marbles: "map cracks → L1 fix → L2…LN → settle",
    prune: "map runtime cone → separate live truth → cut proven dead → verify",
    implement: "init → implement cut → verify real path → followup",
    dou: "crawl buyer surface → test install/trust → collect gaps → undone verdict",
    release: "prove readiness → build+sign → publish → rollback truth",
  };
  const MODES = [
    "implement",
    "research",
    "review",
    "plan",
    "prompt",
    "observe",
    "await",
    "stop",
    "resume",
  ];
  const DECK = [
    "help",
    "version",
    "status",
    "doctor",
    "receipt",
    "init",
    "resume",
    "update",
    "uninstall",
    "dashboard",
    "loop",
    "cron",
    "dispatch",
    "server",
    "gui",
    "tui",
    "telemetry",
    "ship",
    "clear",
    "surfaces",
    "loct",
    "loctree",
    "aicx",
    "slack",
    "vc-slack",
    "/vc",
    ...Object.keys(SKILLS),
    ...AGENTS,
  ];
  let runs = [],
    hist = [],
    hi = 0,
    activeId = 0,
    nextId = 8,
    activeWs = "agents",
    vocMode = false,
    panelsOpen = false,
    qcOpen = false,
    qcPinned = false,
    cmOpen = false,
    xtCount = 0,
    hwTimer = null;

  /* Playground theme follows the page theme by default — no "you don't
     support system theme" doubts. The ☾ button is the opt-in escape: it
     flips the console independent of the page and sticks in localStorage;
     clicking again returns to following. */
  const host = root.getRootNode && root.getRootNode().host;
  const PG_KEY = "vc-pg-theme";
  const docTheme = () =>
    document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark";
  let pgTheme = localStorage.getItem(PG_KEY) || docTheme();

  function paintTheme() {
    if (host) host.setAttribute("data-pg-theme", pgTheme);
    const independent = Boolean(localStorage.getItem(PG_KEY));
    const tb = $("#theme-btn");
    if (tb) {
      tb.textContent = pgTheme === "dark" ? "☾" : "☼";
      tb.title = independent
        ? "Console theme is independent from the page — click to follow the page again"
        : "Console follows the page theme — click to go independent";
    }
  }

  const themeObserver = new MutationObserver(() => {
    if (!localStorage.getItem(PG_KEY)) {
      pgTheme = docTheme();
      paintTheme();
    }
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  const WORKSPACES = [
    { id: "overview", label: "Overview" },
    { id: "agents", label: "Agents" },
    { id: "shell", label: "Shell" },
  ];

  function clockNow() {
    const d = new Date(),
      p = (n) => String(n).padStart(2, "0");
    return p(d.getHours()) + ":" + p(d.getMinutes());
  }

  const sessions = [
    {
      id: 0,
      name: "loctree",
      agent: "grok",
      group: "live",
      time: "20:57",
      proj: "⎇integration/pr88-mega · PR#87 · +3.1k/−900",
      faces: ["Overview", "Agents", "Shell"],
      buf: "",
    },
    {
      id: 2,
      name: "aicx",
      agent: "codex",
      group: "live",
      time: "20:51",
      proj: "⎇main · 0.13.1 · typed memory",
      faces: ["Overview", "Agents", "Shell"],
      buf: "",
    },
    {
      id: 3,
      name: "vc-slack",
      agent: "grok",
      group: "idle",
      time: "19:12",
      proj: "⎇main · mouth of the bus",
      faces: ["Overview", "Agents", "Shell"],
      buf: "",
    },
    {
      id: 4,
      name: "vibecrafted",
      agent: "claude",
      group: "live",
      time: "18:40",
      proj: "⎇stack/command-bridge · PR#96 · +231/−19",
      faces: ["Overview", "Agents", "Shell"],
      buf: "",
    },
    {
      id: 5,
      name: "codescribe",
      agent: "grok",
      group: "stale",
      time: "18:11",
      proj: "⎇main · voice · last write 18:11",
      faces: ["Overview", "Agents", "Shell"],
      buf: "",
    },
    {
      id: 6,
      name: "channel",
      agent: "grok",
      group: "idle",
      time: "16:44",
      proj: "⎇main · prove · receipts only",
      faces: ["Overview", "Agents", "Shell"],
      buf: "",
    },
  ];

  const SETTLEMENT = `<span class="c bold">⚒  𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.</span>  <span class="d">Operator Frame · host above, guests below · simulator</span>
<span class="d">────────────────────────────────────────────────────────</span>
<span class="c bold">AI can write. Evidence decides.</span>
<span class="d">Sight · Memory · Hands · Agency</span>

<span class="g">map</span>       <span class="b">loct impact src/auth.ts</span>
<span class="d">          blast radius before the edit</span>
<span class="g">remember</span>  <span class="b">aicx search "handoff"</span>
<span class="d">          typed memory, not chat residue</span>
<span class="g">craft</span>     <span class="b">vc justdo grok -p "ship the release"</span>
<span class="d">          gates. green CI is not a verdict</span>
<span class="g">wire</span>      <span class="b">/vc grok send "finish until daily-driver"</span>
<span class="d">          Slack = projector. tokens stay on the host</span>

<span class="g">f</span>  four cuts of the same truth · 0 gates red
<span class="d">try</span> <span class="b">help</span> · <span class="b">surfaces</span> · <span class="b">loct</span> · <span class="b">aicx</span> · <span class="b">/vc grok send "…"</span>`;

  const STALE = `<span class="c bold">⚒  codescribe</span>  <span class="d">stale guest · last write 18:11</span>
<span class="d">────────────────────────────────────────────────────────</span>
<span class="d">[work-260821-183344-22011]</span> <span class="y">stale</span> — worker went quiet after followup.
<span class="d">resume only as a NEW tracked job:</span>
<span class="b">vibecrafted grok resume --run-id work-260821-183344-22011</span>`;

  const OVERVIEW_PANE = `<span class="c bold">⚒  Overview</span>  <span class="d">organ: see — state of the active guest</span>
<span class="d">────────────────────────────────────────────────────────</span>
<span class="d">runs, receipts and gates of this workspace — read, never owned, by the host.</span>
<span class="d">organs:</span> <span class="b">Overview</span> see · <span class="b">Agents</span> direct · <span class="b">Shell</span> do
<span class="d">try</span> <span class="b">status</span> · <span class="b">receipt</span> · switch organs above`;

  const IDLE_PANE = `<span class="d">operator pane — four cuts of the same truth.</span>
<span class="d">sight</span>   <span class="b">loct impact src/auth.ts</span>
<span class="d">memory</span>  <span class="b">aicx search "handoff"</span>
<span class="d">mouth</span>   <span class="b">/vc grok send "finish until daily-driver"</span>
<span class="d">hands</span>   <span class="b">justdo grok -p "ship with a receipt"</span>
<span class="d">try</span> <span class="b">help</span> · <span class="b">surfaces</span>`;

  const VOC_PANE = `<span class="c bold">Voc</span>  <span class="d">host console · mouth of the bus · rust cockpit</span>
<span class="d">────────────────────────────────────────────────────────</span>
<span class="d">The host console — pulled out of the guest tab row, pinned with the Operator Frame.</span>
<span class="d">Slack is a projector. Tokens stay on the host.</span>
<span class="b">/vc grok send "finish until daily-driver"</span>
<span class="d">try</span> <span class="b">help</span> · <span class="b">surfaces</span> · <span class="b">/vc</span>`;

  const SHELL_PANE = `<span class="d">host · vibecrafted-suite/vibecrafted · operator loop</span>
<span class="d">────────────────────────────────────────────────────────</span>
<span class="d">try</span> <span class="b">loct impact src/auth.ts</span>
     <span class="b">aicx search "handoff"</span>
     <span class="b">/vc grok send "finish until daily-driver"</span>
     <span class="b">vc justdo grok -p "ship the release"</span>`;

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }
  function put(html) {
    const d = document.createElement("div");
    d.innerHTML = html;
    term.appendChild(d);
    term.scrollTop = term.scrollHeight;
  }
  function line(t, cls) {
    put(cls ? `<span class="${cls}">${esc(t)}</span>` : esc(t));
  }
  function raw(h) {
    put(h);
  }
  function prompt_(cmdtext) {
    put(`<span class="c bold">❯</span> ${esc(cmdtext)}`);
  }
  function current() {
    return sessions.find((s) => s.id === activeId);
  }
  function saveBuf() {
    const s = current();
    if (s) s.buf = term.innerHTML;
  }

  function paintWs() {
    const el = $("#ws-tabs");
    if (!el) return;
    el.innerHTML = "";
    WORKSPACES.forEach((w) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ws-tab" + (w.id === activeWs && !vocMode ? " on" : "");
      b.setAttribute("role", "tab");
      b.setAttribute(
        "aria-selected",
        w.id === activeWs && !vocMode ? "true" : "false",
      );
      const mark = document.createElement("span");
      mark.className = "mark";
      mark.setAttribute("aria-hidden", "true");
      b.appendChild(mark);
      if (w.key) {
        const k = document.createElement("span");
        k.className = "key";
        k.textContent = w.key;
        b.appendChild(k);
      }
      b.appendChild(document.createTextNode(w.label));
      b.onclick = () => selectWs(w.id);
      el.appendChild(b);
    });
    const vb = $("#voc-btn");
    if (vb) vb.classList.toggle("on", vocMode);
  }

  function renderWs() {
    const s = current();
    if (vocMode) term.innerHTML = VOC_PANE;
    else if (activeWs === "overview") term.innerHTML = OVERVIEW_PANE;
    else if (activeWs === "shell" || activeWs.startsWith("xt"))
      term.innerHTML = s && s.buf ? s.buf : SHELL_PANE;
    else term.innerHTML = s && s.buf ? s.buf : IDLE_PANE;
    term.scrollTop = 0;
  }

  function selectWs(id) {
    if (id === activeWs && !vocMode) return;
    vocMode = false;
    if (
      activeWs === "agents" ||
      activeWs === "shell" ||
      activeWs.startsWith("xt")
    )
      saveBuf();
    activeWs = id;
    renderWs();
    paintWs();
  }

  function toggleVoc() {
    if (vocMode) {
      vocMode = false;
      renderWs();
      paintWs();
      return;
    }
    if (
      activeWs === "agents" ||
      activeWs === "shell" ||
      activeWs.startsWith("xt")
    )
      saveBuf();
    vocMode = true;
    renderWs();
    paintWs();
  }

  function paintHw() {
    const live = sessions.filter((s) => s.group === "live").length;
    const cpu = 8 + Math.floor(Math.random() * 24);
    const mem = (3.1 + Math.random() * 1.6).toFixed(1);
    const liveEl = $("#hw-live");
    if (liveEl) liveEl.textContent = "LIVE " + live;
    const cpuEl = $("#hw-cpu");
    if (cpuEl) cpuEl.textContent = "CPU " + cpu + "%";
    const memEl = $("#hw-mem");
    if (memEl) memEl.textContent = "MEM " + mem + "/16G";
    const hEl = $("#hw-health");
    if (hEl) {
      const hot = cpu > 28;
      hEl.textContent = hot ? "HEALTH !!" : "HEALTH ·";
      hEl.className = hot ? "hw-warn" : "";
    }
  }

  function paintTabs() {
    paintWs();
  }

  function rail() {
    const el = $("#rail");
    el.innerHTML = "";
    const liveRuns = runs.filter(
      (r) => r.state === "active" || r.state === "launching",
    );
    const groups = ["live", "stale", "idle"];
    groups.forEach((g) => {
      const items = sessions.filter((s) => s.group === g);
      if (!items.length) return;
      const label = g === "live" ? "LIVE" : g === "stale" ? "STALE" : "IDLE";
      el.insertAdjacentHTML(
        "beforeend",
        `<div class="group">${label}<span class="n">${items.length}</span></div>`,
      );
      items.forEach((s) => {
        const on = s.id === activeId ? " on" : "";
        const mark = s.group === "live" ? "●" : s.group === "stale" ? "◐" : "○";
        const faces = `<div class="face">${s.faces.map((f) => "· " + esc(f)).join(" ")}</div>`;
        el.insertAdjacentHTML(
          "beforeend",
          `<div class="sess ${s.group}${on}" data-id="${s.id}"><div class="row"><span class="mark">${mark}</span><span class="name">${esc(s.name)}</span><span class="meta">${esc(s.time)}</span></div>${faces}</div>`,
        );
      });
    });
    liveRuns.forEach((r) => {
      el.insertAdjacentHTML(
        "beforeend",
        `<div class="sess live"><div class="row"><span class="mark">·</span><span class="name">${esc(r.agent)}</span><span class="meta">${esc(r.skill)}</span></div></div>`,
      );
    });
    el.querySelectorAll(".sess[data-id]").forEach((n) => {
      n.addEventListener("click", () => selectSession(Number(n.dataset.id)));
    });
    paintWs();
    const s = current();
    const projEl = $("#stat-proj");
    if (projEl && s) projEl.textContent = `${s.name} · ${s.proj}`;
    const runsEl = $("#runs-n");
    if (runsEl) runsEl.textContent = String(liveRuns.length);
    paintHw();
  }

  function selectSession(id) {
    if (id === activeId) return;
    saveBuf();
    const s = sessions.find((x) => x.id === id);
    if (!s) return;
    activeId = id;
    vocMode = false;
    renderWs();
    rail();
  }

  function nowId() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return `work-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}-${10000 + Math.floor(Math.random() * 89999)}`;
  }

  const CHATTER = {
    workflow: [
      "loct impact — blast radius before the edit",
      "aicx search — intent survived compaction",
      "cut landed under gates, not vibes",
      "/vc send queued · Slack is projector",
    ],
    marbles: [
      "L1: mapa pęknięć — 3 kandydaci",
      "L1 fix + verify: 2/3 zamknięte",
      "L2: kontrprzykład ubity, re-run gates",
      "powierzchnia trzyma — settle",
    ],
    prune: [
      "runtime cone zdefiniowany",
      "KEEP-RUNTIME 61 · DELETE-NOW 14 · FORGOTTEN-GEM 3",
      "gates po fali: zielone",
      "gems report zapisany",
    ],
    generic: [
      "vc-init: perception → intentions → ground truth",
      "praca w toku…",
      "artefakty zapisane do reports/",
      "gates: zielone",
    ],
  };

  function startRun(skill, agent, promptTxt) {
    const id = nowId();
    const run = {
      id,
      agent,
      skill,
      state: "launching",
      t0: Date.now(),
      lines: [],
      report: `reports/${skill}/${id}_report.md`,
    };
    runs.push(run);
    const s = current();
    if (s) {
      s.group = "live";
      s.agent = agent;
      s.time = clockNow();
    }
    rail();
    raw(
      `<span class="d">==================== VIBECRAFTED LAUNCH RECEIPT ====================</span>`,
    );
    line(`run_id:     ${id}`);
    line(`agent:      ${agent}`);
    line(`skill:      ${skill}`);
    line(
      `root:       /Volumes/vc-workspace/vetcoders/vibecrafted-suite/vibecrafted`,
    );
    line(`status:     launching`);
    line(`report:     ~/.vibecrafted/artifacts/…/${run.report}`);
    raw(
      `observe:    <span class="b">vibecrafted ${agent} observe --run-id ${id}</span>`,
    );
    raw(
      `await (ARM NOW, supervisor-side): <span class="b">vibecrafted ${agent} await --run-id ${id}</span>`,
    );
    raw(
      `<span class="d">=====================================================================</span>`,
    );
    const chat = CHATTER[skill] || CHATTER.generic;
    let step = 0;
    run.timer = setInterval(() => {
      if (step === 0) {
        run.state = "active";
        run.lines.push("worker alive, transcript rośnie");
      } else if (step <= chat.length) {
        run.lines.push(chat[step - 1]);
      } else {
        run.state = "report_validated";
        run.settle = Math.random() < 0.85 ? "f" : "x";
        clearInterval(run.timer);
        raw(
          `<span class="d">[${run.id}]</span> <span class="g">report_validated</span> — settlement <span class="${run.settle === "f" ? "g" : "y"}">${run.settle}</span> · raport: ${run.report}`,
        );
        if (s) s.group = "live";
      }
      rail();
      step++;
    }, 2200);
    if (promptTxt) run.lines.push(`prompt: ${promptTxt}`);
  }

  const SURFACES = `<span class="c bold">four cuts of the same truth</span>
<span class="d">Sight · Memory · Hands · Agency</span>
  <span class="b">loctree</span>      sight    <span class="d">loct impact src/auth.ts</span>
  <span class="b">aicx</span>         memory   <span class="d">aicx search "handoff"</span>
  <span class="b">vc-slack</span>     mouth    <span class="d">/vc grok send "…"</span>
  <span class="b">vibecrafted</span>  hands    <span class="d">justdo grok -p "ship"</span>
<span class="d">Slack is a projector. The bus is the log. Green CI is not a verdict.</span>`;

  const HELP = `<span class="c bold">⚒  𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. — Operator Frame simulator</span> — AI can write. Evidence decides.
<span class="d">Sight · Memory · Hands · Agency</span>
<span class="d">─────────────────────────────────────────</span>
Four cuts:
  <span class="b">loct</span>     structural vision. AST, importers, blast radius.
  <span class="b">aicx</span>     durable intent from raw agent sessions.
  <span class="b">/vc</span>      mouth on the bus. Slack is a projector.
  <span class="b">justdo</span>   hands under gates. Green CI is not a verdict.

Usage:
  <span class="b">loct impact src/auth.ts</span>
  <span class="b">aicx search "handoff"</span>
  <span class="b">/vc grok send "finish until daily-driver"</span>
  vibecrafted &lt;skill&gt; &lt;agent&gt; [-p &lt;prompt&gt; | -f &lt;file&gt;]

Commands:
  <span class="b">surfaces</span>            Four cuts · real commands
  <span class="b">init [agent]</span>         Orient an agent in this repo
  <span class="b">&lt;skill&gt; &lt;agent&gt;</span>      Run a workflow with an agent
  <span class="b">resume &lt;agent&gt;</span>       Continue a stopped run or provider session
  <span class="b">status</span> · <span class="b">doctor</span> · <span class="b">receipt</span> · <span class="b">update</span> · <span class="b">uninstall</span>
  <span class="b">dashboard</span> · <span class="b">loop</span> · <span class="b">cron</span> · <span class="b">dispatch</span> · <span class="b">server</span> · <span class="b">gui</span> · <span class="b">tui</span>

Ship cycle:
  <span class="c">map → remember → craft → wire → prove</span>
  <span class="d">scaffold → implement → review → workflow → followup → marbles → audit → polarize → dou → hydrate → release</span>

Agents:  ${AGENTS.join(" · ")}
Try: <span class="b">loct impact src/auth.ts</span> · <span class="b">aicx search "handoff"</span> · <span class="b">/vc grok send "ship it"</span>`;

  function helpTopic(t) {
    if (t === "loctree") t = "loct";
    if (t === "vc-slack" || t === "/vc") t = "slack";
    if (SKILLS[t]) {
      const [rw, v] = SKILLS[t];
      raw(
        `<span class="c bold">⚒  ${t}</span>\n<span class="d">─────────────────────────────</span>\n  version ${v} · <span class="${rw === "READ" ? "g" : "c"}">${rw}</span>\nUsage:\n  vibecrafted ${t} &lt;${AGENTS.join("|")}&gt; [flags]\n  vc-${t} &lt;agent&gt; [flags]${FLOWS[t] ? `\nFlow:\n  ${FLOWS[t]}` : ""}\nFlags: -p/--prompt · -f/--file · --prompt-stdin · --runtime · --root · --model · --json${t === "marbles" ? " · --count · --depth\nControls: pause stop resume session inspect delete gc" : ""}`,
      );
      return;
    }
    const T = {
      loct: `Usage:\n  loct impact &lt;path&gt;   blast radius before the edit\n  loct slice &lt;path&gt;    cut surface, importers live\n  loct dead            dead symbols listed, not guessed\nSight is not a vibe. Structure before generation.`,
      aicx: `Usage:\n  aicx search "handoff"\nDurable intent from raw agent sessions. Typed memory, not chat residue.\nAdapters: Claude · Codex · Gemini · Junie · Grok.`,
      slack: `Usage:\n  /vc &lt;agent&gt; send "…"\n  vc-slack mcp\nMouth, not scrape. OAuth + MCP + Socket Mode.\nTokens stay on the host. Slack = projector. fleet-bus = log.`,
      surfaces: SURFACES,
      resume: `Usage:\n  vibecrafted resume &lt;agent&gt; --run-id work-… | --session &lt;uuid&gt; | (AICX 48h pack)\nNigdy work-* do --session. --fork-session tylko claude.`,
      uninstall: `Usage:\n  vibecrafted uninstall [--dry-run]\nInwentarz → restore kit → cięcie. Od 82dbce90 dry-run znaczy suchy. Serio.`,
      server: `Usage:\n  vibecrafted server [start|stop|status|open|doctor] [--port 3024]\n  vibecrafted server service [install|start|stop|status|uninstall]`,
      dispatch: `Usage:\n  vibecrafted dispatch &lt;plan.dispatch.toml&gt; [--doctor|--dry-run|--json|--resume]\n  vibecrafted dispatch run --run-id … -- &lt;cmd&gt;`,
      loop: `Usage:\n  vibecrafted loop start --prompt "…" [--completion-promise READY]\n  vibecrafted loop next | status | complete | await-run --run-id … --then-cmd '…'`,
    };
    if (T[t]) {
      raw(`<span class="c bold">⚒  ${t}</span>\n${T[t]}`);
      return;
    }
    line(`Brak topicu "${t}" w symulatorze.`, "d");
  }

  function cmdStatus() {
    if (!runs.length) {
      line("Cisza. Zero runów w tej sesji.", "d");
      return;
    }
    runs.forEach((r) => {
      const st =
        r.state === "report_validated"
          ? `<span class="g">${r.state}</span>`
          : r.state === "active"
            ? `<span class="c">active</span>`
            : `<span class="d">${r.state}</span>`;
      raw(
        `  ${r.id}  ${r.agent.padEnd(6)}  ${r.skill.padEnd(10)}  ${st}${r.settle ? `  <span class="${r.settle === "f" ? "g" : "y"}">${r.settle}</span>` : ""}`,
      );
    });
  }
  function findRun(args) {
    if (args.includes("--last")) return runs[runs.length - 1];
    const i = args.indexOf("--run-id");
    if (i >= 0) return runs.find((r) => r.id === args[i + 1]);
    return runs[runs.length - 1];
  }

  function exec(text) {
    const t = text.trim();
    if (!t) return;
    prompt_(t);
    hist.push(t);
    hi = hist.length;
    if (t.startsWith("/vc")) {
      const m = t.match(/^\/vc\s+(\S+)\s+send\s+([\s\S]+)$/i);
      if (!m) {
        raw(
          `<span class="y">usage:</span> /vc &lt;agent&gt; send "…"  ·  agents: ${AGENTS.join(" · ")}`,
        );
        return;
      }
      const ag = m[1].toLowerCase();
      const msg = m[2].replace(/^["']|["']$/g, "");
      if (!AGENTS.includes(ag)) {
        raw(
          `<span class="y">unknown agent</span> \`${esc(ag)}\` — try /vc agents`,
        );
        return;
      }
      raw(
        `<span class="c bold">*agent:${esc(ag)}*</span> <span class="d">· peer-bus · from operator</span>\n${esc(msg)}\n<span class="d">_via \`/vc ${esc(ag)} send\`_</span>\n<span class="g">ok</span> <span class="d">· dry_run sandbox · envelope queued · Slack is the projector, not the log</span>`,
      );
      return;
    }
    let rest = t
      .replace(/^vibecrafted(?:\s+|$)/, "")
      .replace(/^vc-/, "")
      .trim();
    if (!rest) rest = "help";
    const a = rest.split(/\s+/);
    let c = a[0];
    if (MODES.includes(c) && AGENTS.includes(a[1])) {
      const ag = a[1];
      a[1] = c;
      a[0] = ag;
      c = ag;
    }
    const pIdx = a.findIndex((x) => x === "-p" || x === "--prompt");
    const ptxt =
      pIdx >= 0
        ? t.split(/\s(?:-p|--prompt)\s/)[1]?.replace(/^"|"$/g, "")
        : null;

    if (c === "clear") {
      term.innerHTML = "";
      return;
    }
    if (c === "help" || c === "--help" || c === "-h") {
      a[1] && a[1] !== "--all" ? helpTopic(a[1]) : raw(HELP);
      return;
    }
    if (c === "surfaces" || c === "surface") {
      raw(SURFACES);
      return;
    }
    if (c === "loct" || c === "loctree") {
      const sub = a[1] || "impact";
      raw(
        `<span class="c bold">loct ${esc(sub)}</span> <span class="d">· sight before the edit</span>\n<span class="d">atlas 00–05 · importers live · blast radius on ${esc(a[2] || "src/")}</span>\n<span class="g">slice()</span> on the cut · <span class="g">impact()</span> before delete · <span class="d">dead symbols listed, not guessed</span>`,
      );
      return;
    }
    if (c === "aicx") {
      const q =
        t.replace(/^aicx(?:\s+search)?\s*/i, "").replace(/^["']|["']$/g, "") ||
        "handoff";
      raw(
        `<span class="c bold">aicx search</span> <span class="d">· durable intent, not chat residue</span>\n  <span class="b">${esc(q)}</span>\n<span class="d">adapters: Claude · Codex · Gemini · Junie · Grok</span>\n<span class="g">1 hit</span> <span class="d">· typed memory survived compaction · session pack 48h</span>`,
      );
      return;
    }
    if (c === "slack" || c === "vc-slack") {
      raw(
        `<span class="c bold">vc-slack</span> <span class="d">· mouth, not scrape</span>\n  oauth install · mcp · /vc &lt;agent&gt; send\n<span class="d">tokens stay on the host. Slack = projector. fleet-bus = log.</span>\ntry <span class="b">/vc grok send "finish until daily-driver"</span>`,
      );
      return;
    }
    if (c === "version") {
      line(
        "vibecrafted 4.3.1 — Operator Frame simulator (host above, guests below)",
      );
      return;
    }
    if (c === "status" || c === "stats") {
      cmdStatus();
      return;
    }
    if (c === "doctor" || c === "check") {
      raw(
        `<span class="g">✓</span> sight loctree · <span class="g">✓</span> memory aicx · <span class="g">✓</span> mouth vc-slack · <span class="g">✓</span> hands vibecrafted\n<span class="g">✓</span> deck alive · tools/vibecrafted-current → 4.1.0+ga7f262d9\n<span class="d">green CI is not a product verdict. Slack is a projector.</span>\nsummary: simulation — live machine: <span class="b">vc-doctor</span>`,
      );
      return;
    }
    if (c === "receipt") {
      raw(
        `vetcoders/vibecrafted → fix/framework-fail-points-0819 @ <span class="c">16c44f8c</span> · dirty=no · installed=g237d2814 <span class="y">SOURCE_AHEAD_OF_INSTALLED</span>`,
      );
      return;
    }
    if (c === "settlements" || c === "resume-session") {
      raw(`<span class="c">⚒</span>  "${c}" is not in the command deck.`);
      return;
    }
    if (c === "uninstall" || c === "remove") {
      if (a.includes("--dry-run")) {
        raw(
          `<span class="bold">𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Uninstall</span>\n\nManaged teardown inventory:\n  remove   shared-skill: …/skills/vc-agents  <span class="d">(+31 dalszych)</span>\n  remove   runtime-data: releases · providers · server · active.json\n  preserve operator-data: artifacts · control_plane · logs\n  preserve uv-tool: vibecrafted · vibecrafted-mcp · vibecrafted-iterm2\n\n<span class="g">Dry run — nic nie usunięto, zero backupu.</span>`,
        );
        return;
      }
      raw(`<span class="r">✗</span> Simulator refuses a wet uninstall.`);
      return;
    }
    if (c === "dashboard" || c === "start") {
      a[1] === "ls"
        ? raw(
            sessions
              .map(
                (s) =>
                  `  #${s.id} ${s.name}  <span class="d">${s.group}</span>`,
              )
              .join("\n"),
          )
        : line(
            `[sim] layout: ${a[1] || "dashboard"} — in real life vc-frame takes the screen`,
            "d",
          );
      return;
    }
    if (c === "init" && (!a[1] || AGENTS.includes(a[1]))) {
      raw(
        `<span class="c">⚒</span> init ${a[1] || "claude"}: perception (loct context — czytaj DO KOŃCA) → intentions (aicx intents) → ground truth (repo-full)\n<span class="d">Orientacja, nie pipeline. Ślepy start = process failure.</span>`,
      );
      return;
    }
    if (AGENTS.includes(c)) {
      const m = a[1];
      if (!m || !MODES.includes(m)) {
        raw(`Modes for ${c}: ${MODES.join(" · ")}`);
        return;
      }
      if (m === "observe") {
        const r = findRun(a);
        r
          ? raw(
              `<span class="d">[${r.id}] tail:</span>\n` +
                r.lines
                  .slice(-4)
                  .map((l) => "  " + esc(l))
                  .join("\n"),
            )
          : line("Brak runów.", "d");
        return;
      }
      if (m === "await") {
        const r = findRun(a);
        if (!r) {
          line("Brak runów.", "d");
          return;
        }
        line(
          `await uzbrojony na ${r.id} — supervisor-side, bez pollingu…`,
          "d",
        );
        const iv = setInterval(() => {
          if (r.state === "report_validated") {
            clearInterval(iv);
            raw(
              `<span class="g">await:</span> ${r.id} → report_validated · settlement <span class="${r.settle === "f" ? "g" : "y"}">${r.settle}</span>`,
            );
          }
        }, 600);
        return;
      }
      if (m === "stop") {
        const r = findRun(a);
        if (r && r.timer) {
          clearInterval(r.timer);
          r.state = "stopped";
          rail();
          raw(
            `<span class="y">TERM</span> → ${r.id} stopped. Restart tylko jako NOWY tracked job: <span class="b">${c} resume --run-id ${r.id}</span>`,
          );
        } else line("Nie ma czego stopować.", "d");
        return;
      }
      if (m === "resume") {
        const r = findRun(a);
        if (r) {
          startRun(r.skill, c, "(resume z batonem)");
        } else line("Brak runa do wznowienia.", "d");
        return;
      }
      startRun(m === "prompt" ? "justdo" : m, c, a.slice(2).join(" "));
      return;
    }
    if (SKILLS[c]) {
      const ag = AGENTS.includes(a[1]) ? a[1] : null;
      if (!ag) {
        raw(`Usage: vibecrafted ${c} &lt;${AGENTS.join("|")}&gt; [-p "…"]`);
        return;
      }
      if (
        c === "marbles" &&
        [
          "pause",
          "stop",
          "resume",
          "gc",
          "inspect",
          "session",
          "delete",
        ].includes(a[1])
      ) {
        line(
          `[marbles ${a[1]}] kontrola orkiestratora — symulacja przyjęła`,
          "d",
        );
        return;
      }
      startRun(c, ag, ptxt);
      return;
    }
    if (c === "server") {
      raw(
        `server ${a[1] || "status"}: <span class="g">●</span> io.vetcoders.vibecrafted.server enabled · port 3024 <span class="d">(symulacja)</span>`,
      );
      return;
    }
    if (c === "gui" || c === "tui") {
      line(
        `[sim] ${c === "gui" ? "control plane na 127.0.0.1" : "voc — rustowy kokpit"}`,
        "d",
      );
      return;
    }
    if (
      c === "loop" ||
      c === "cron" ||
      c === "dispatch" ||
      c === "ship" ||
      c === "telemetry"
    ) {
      helpTopic(c === "ship" ? "loop" : c);
      return;
    }
    raw(
      `<span class="c">⚒</span>  "${esc(c)}" is not in the command deck.\n  Try <span class="b">help</span> for the current surface.`,
    );
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      exec(input.value);
      input.value = "";
    } else if (e.key === "ArrowUp") {
      if (hi > 0) {
        hi--;
        input.value = hist[hi] || "";
        e.preventDefault();
      }
    } else if (e.key === "ArrowDown") {
      if (hi < hist.length) {
        hi++;
        input.value = hist[hi] || "";
        e.preventDefault();
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.value.split(/\s+/);
      const last = parts[parts.length - 1];
      const pool =
        parts.length <= 1
          ? DECK
          : SKILLS[parts[0]] || ["init", "resume"].includes(parts[0])
            ? AGENTS
            : AGENTS.includes(parts[0])
              ? MODES
              : DECK;
      const hit = pool.filter((x) => x.startsWith(last));
      if (hit.length === 1) {
        parts[parts.length - 1] = hit[0];
        input.value = parts.join(" ") + " ";
      } else if (hit.length > 1) line(hit.join("  "), "d");
    }
  });
  root.addEventListener("click", (e) => {
    if (
      e.target.closest(".rail") ||
      e.target.closest(".chrome") ||
      e.target.closest(".new") ||
      e.target.closest(".tools")
    )
      return;
    if (!window.getSelection().toString()) input.focus();
  });
  $("#new-sess").addEventListener("click", () => {
    saveBuf();
    const id = nextId++;
    sessions.push({
      id,
      name: "workspace-" + id,
      agent: "grok",
      group: "idle",
      time: clockNow(),
      proj: "⎇main · fresh guest",
      faces: ["Overview", "Agents", "Shell"],
      buf: IDLE_PANE,
    });
    selectSession(id);
  });
  $("#voc-btn").addEventListener("click", () => {
    toggleVoc();
  });
  $("#panels-btn").addEventListener("click", () => {
    panelsOpen = !panelsOpen;
    const ov = $("#panels-overlay");
    if (ov) ov.classList.toggle("open", panelsOpen);
    const btn = $("#panels-btn");
    if (btn) btn.classList.toggle("on", panelsOpen);
  });
  $("#panels-overlay").addEventListener("click", (e) => {
    const t = e.target.closest("[data-goto]");
    if (!t) return;
    panelsOpen = false;
    $("#panels-overlay").classList.remove("open");
    $("#panels-btn").classList.remove("on");
    selectSession(Number(t.dataset.goto));
  });
  root.querySelectorAll(".host-item[data-cmd]").forEach((n) => {
    n.addEventListener("click", () => {
      const c = n.dataset.cmd;
      if (c === "projects") {
        line(
          "[host] ✧ Projects — new-project flow lives on the unsinkable host layouts.",
          "d",
        );
        return;
      }
      exec(c);
    });
  });
  $("#composer").addEventListener("click", () => {
    cmOpen = !cmOpen;
    const ov = $("#composer-overlay");
    if (ov) ov.classList.toggle("open", cmOpen);
    if (cmOpen) {
      const ta = $("#cm-text");
      if (ta) ta.focus();
    }
  });
  const closeComposer = () => {
    cmOpen = false;
    const ov = $("#composer-overlay");
    if (ov) ov.classList.remove("open");
  };
  $("#cm-close").addEventListener("click", closeComposer);
  $("#cm-cancel").addEventListener("click", closeComposer);
  $("#cm-push").addEventListener("click", () => {
    const ta = $("#cm-text");
    const text = ta ? ta.value.trim() : "";
    if (text) {
      input.value = text;
      input.focus();
      if (ta) ta.value = "";
    }
    closeComposer();
  });
  $("#quickcmd").addEventListener("click", () => {
    qcOpen = !qcOpen;
    const ov = $("#quickcmd-overlay");
    if (ov) ov.classList.toggle("open", qcOpen);
    if (qcOpen) {
      const qi = $("#qc-input");
      if (qi) qi.focus();
    }
  });
  const closeQc = () => {
    if (qcPinned) return;
    qcOpen = false;
    const ov = $("#quickcmd-overlay");
    if (ov) ov.classList.remove("open");
  };
  $("#qc-pin").addEventListener("click", () => {
    qcPinned = !qcPinned;
    const pin = $("#qc-pin");
    if (pin) {
      pin.classList.toggle("on", qcPinned);
      pin.textContent = qcPinned ? "PIN ●" : "PIN ○";
    }
  });
  $("#qc-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const qi = $("#qc-input");
      const text = qi ? qi.value.trim() : "";
      if (text) {
        exec(text);
        if (qi) qi.value = "";
      }
      closeQc();
      e.preventDefault();
    } else if (e.key === "Escape") {
      qcPinned = false;
      const pin = $("#qc-pin");
      if (pin) {
        pin.classList.remove("on");
        pin.textContent = "PIN ○";
      }
      closeQc();
      e.preventDefault();
    }
  });
  $("#new-tab").addEventListener("click", () => {
    xtCount += 1;
    WORKSPACES.push({ id: "xt" + xtCount, label: "shell [" + xtCount + "]" });
    selectWs("xt" + xtCount);
  });
  $("#theme-btn").addEventListener("click", () => {
    if (localStorage.getItem(PG_KEY)) {
      localStorage.removeItem(PG_KEY);
      pgTheme = docTheme();
    } else {
      pgTheme = pgTheme === "dark" ? "light" : "dark";
      localStorage.setItem(PG_KEY, pgTheme);
    }
    paintTheme();
  });

  sessions[0].buf = SETTLEMENT;
  sessions.forEach((s, i) => {
    if (i === 0) return;
    s.buf = s.group === "stale" ? STALE : IDLE_PANE;
  });
  term.innerHTML = SETTLEMENT;
  activeWs = "agents";
  rail();
  paintHw();
  paintTheme();
  hwTimer = setInterval(paintHw, 2400);
  if (!EMBED) input.focus();
  return {
    focus() {
      if (input) input.focus();
    },
    destroy() {
      runs.forEach((r) => {
        if (r.timer) clearInterval(r.timer);
      });
      if (hwTimer) clearInterval(hwTimer);
      themeObserver.disconnect();
    },
  };
}
