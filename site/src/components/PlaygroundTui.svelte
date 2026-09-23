<script lang="ts">
  import { onMount } from 'svelte';
  import { bootPlayground, type PlaygroundApi } from './operator-tui';

  const SOURCE = `<style>
:host {
  display: block;
  position: relative;
  height: 100%;
  min-height: 0;
  container-type: size;
  background: var(--ground);
  color: var(--text);
  font-family: "Spot Mono", ui-monospace, monospace;
  font-synthesis: none;
  font-size: 24px;
  line-height: 29px;
}
:host, :host * { box-sizing: border-box; }
:host .app * { font-family: inherit !important; font-size: 1em !important; letter-spacing: -1px !important; }
:host {
  --ground: #0b0b12;
  --panel: #11111a;
  --panel-2: #1a1928;
  --line: #26233a;
  --text: #e0def4;
  --dim: #908ca8;
  --mute: #b8b4ca;
  --copper: #d4a574;
  --green: #a6da95;
  --red: #eb6f92;
  --gold: #f6c177;
  --sel: #d4a574;
  --live: #a6da95;
  --accent: #d4a574;
  --overlay-shadow: rgba(11, 11, 18, 0.35);
  --radius: 2px;
  margin: 0;
  overflow: hidden;
}
:host([data-pg-theme="light"]) {
  --ground: #f3f1eb;
  --panel: #ebe7de;
  --panel-2: #e2ddd3;
  --line: #d4cfc4;
  --text: #2c2a27;
  --dim: #8a8278;
  --mute: #5c564e;
  --copper: #1a1917;
  --green: #2f7d4a;
  --red: #b42318;
  --gold: #a16207;
  --sel: #d4cfc4;
  --live: #2f7d4a;
  --accent: #8a6a32;
  --overlay-shadow: rgba(44, 42, 39, 0.3);
}
.app {
  position: absolute;
  display: grid;
  grid-template-columns: calc(28ch - 84px) minmax(0, 1fr);
  grid-template-rows: 1lh minmax(0, 1fr) 1lh;
  width: 170ch;
  height: 41lh;
  transform-origin: top left;
  min-height: 0;
  transition: opacity 260ms ease, filter 260ms ease;
}
.app.leaving { opacity: 0; filter: blur(5px); }
@media (prefers-reduced-motion: reduce) { .app { transition: none; } }
.chrome {
  grid-column: 1 / 3;
  display: flex;
  align-items: stretch;
  gap: 4px;
  min-width: 0;
  border-bottom: 1px solid var(--line);
  background: var(--panel);
}
.brand {
  display: flex;
  align-items: center;
  flex: none;
  padding: 0 10px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text);
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
}
.brand .dot { color: var(--accent); }
.brand:hover, .brand:focus-visible { color: var(--accent); }
.window-controls { width: 6ch; flex: none; display: flex; align-items: center; justify-content: center; gap: .8ch; }
.window-controls i { display: block; width: .75ch; height: .75ch; border-radius: 50%; background: var(--dim); border: 1px solid var(--line); }
.datum { display: flex; align-items: center; color: var(--dim); padding: 0 2px; }
.lock-chip {
  display: flex;
  align-items: center;
  flex: none;
  margin: 6px 4px 6px 2px;
  padding: 0 7px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--mute);
  font-size: 11px;
  white-space: nowrap;
}
.ws {
  display: flex;
  align-items: stretch;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.ws::-webkit-scrollbar { display: none; }
.ws-tab {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 100%;
  padding: 0 12px;
  border: 0;
  background: transparent;
  color: var(--dim);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}
.ws-tab:hover { color: var(--text); }
.ws-tab.on {
  background: var(--text);
  color: var(--ground);
  font-weight: 600;
}
.ws-tab .mark {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid currentColor;
  flex: none;
}
.ws-tab.on .mark { background: currentColor; }
.voc-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  margin-left: auto;
  border: 0;
  border-left: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}
.voc-btn:hover { background: var(--panel-2); }
.voc-btn.on { background: var(--text); color: var(--ground); font-weight: 600; }
.tools {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 8px;
  flex: none;
  border-left: 1px solid var(--line);
}
.tools button {
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--mute);
  font: inherit;
  font-size: 11px;
  letter-spacing: 0.04em;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: var(--radius);
  white-space: nowrap;
}
.tools button:hover { color: var(--text); background: var(--panel-2); }
.tools button.on { color: var(--accent); }
.tools .sep { color: var(--dim); padding: 0 2px; }
.rail {
  grid-column: 1;
  grid-row: 2;
  border-right: 1px solid var(--line);
  background: var(--panel);
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
}
.rail-head {
  padding: 10px 12px 6px;
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--text);
}
.rail-host { padding: 0 0 4px; }
.host-item {
  display: block;
  width: 100%;
  text-align: left;
  appearance: none;
  background: transparent;
  border: 0;
  font: inherit;
  font-size: 11.5px;
  padding: 3px 12px 3px 18px;
  color: var(--mute);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.host-item:hover { color: var(--text); background: var(--panel-2); }
.host-item.on { color: var(--accent); background: var(--panel-2); border-left: 2px solid var(--accent); padding-left: 16px; }
.host-item .runs-n { color: var(--accent); }
.rail-sep {
  color: var(--dim);
  letter-spacing: 0.3em;
  padding: 2px 12px 6px;
  user-select: none;
  overflow: hidden;
  white-space: nowrap;
}
.rail-body { flex: 1; overflow-y: auto; padding: 0 0 8px; }
.group { margin: 6px 0 2px; padding: 0 12px; font-size: 10px; letter-spacing: 0.14em; color: var(--dim); }
.group .n { color: var(--mute); letter-spacing: 0; margin-left: 6px; }
.sess { padding: 7px 12px 6px; cursor: pointer; border-left: 2px solid transparent; }
.sess:hover { background: var(--panel-2); }
.sess.on { background: var(--panel-2); border-left-color: var(--accent); }
.sess.on .name { color: var(--accent); font-weight: 600; }
.sess .row { display: flex; align-items: baseline; gap: 8px; }
.sess .mark { width: 10px; flex: none; color: var(--dim); }
.sess.on .mark { color: var(--accent); }
.sess .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sess .meta { color: var(--dim); font-size: 11px; }
.sess .disambiguator { color: var(--dim); font-size: 10px; padding: 1px 0 1px 20px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.sess .face { padding: 1px 0 0 20px; color: var(--dim); font-size: 11px; }
.sess .face button { appearance: none; border: 0; background: none; color: inherit; font: inherit; padding: 0 7px 0 0; cursor: pointer; }
.sess .face button:hover { color: var(--accent); }
.process-spinner { display: inline-block; width: 1ch; color: var(--green); }
.process-spinner::before { content: attr(data-frame); }
.rail-foot { padding: 8px 12px 10px; border-top: 1px solid var(--line); }
.new {
  width: 100%;
  background: transparent;
  border: 1px solid var(--line);
  color: var(--mute);
  border-radius: var(--radius);
  font: inherit;
  font-size: 12px;
  padding: 6px 8px;
  cursor: pointer;
  text-align: left;
}
.new:hover { border-color: #3f3f46; color: var(--text); }
.workspace {
  grid-column: 2;
  grid-row: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  background: var(--ground);
}
#term {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  padding: 12px 16px 8px;
  white-space: pre-wrap;
  word-break: break-word;
  overscroll-behavior: contain;
}
#term.host-mode { padding: 0; white-space: normal; }
.host-screen { width: 100%; padding: 1.5lh 2ch; color: var(--text); }
.host-demo { display: inline-flex; gap: 6px; border: 1px solid var(--line); padding: 4px 9px; color: var(--accent); font-size: 10px; font-weight: 600; letter-spacing: .1em; }
.host-demo span { color: var(--dim); font-weight: 400; letter-spacing: 0; }
.host-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin: 22px 0 28px; }
.host-eyebrow { color: var(--accent); font-size: 10px; letter-spacing: .16em; }
.host-heading h2 { margin: 7px 0 8px; font-size: clamp(24px, 2.6vw, 36px); line-height: 1.1; letter-spacing: -.04em; }
.host-heading p { max-width: 640px; margin: 0; color: var(--mute); font-size: 12px; line-height: 1.6; }
.host-screen button { appearance: none; background: transparent; border: 1px solid var(--line); color: var(--text); font: inherit; font-size: 11px; padding: 6px 10px; cursor: pointer; white-space: nowrap; }
.host-screen button:hover { border-color: var(--accent); color: var(--accent); }
.host-screen .host-primary { background: var(--accent); border-color: var(--accent); color: var(--ground); font-weight: 600; padding: 9px 14px; }
.host-screen .host-primary:hover { color: var(--ground); opacity: .85; }
.host-metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid var(--line); background: var(--panel); margin-bottom: 20px; }
.host-metric { display: flex; flex-direction: column; min-height: 110px; padding: 15px 17px; border-right: 1px solid var(--line); }
.host-metric:last-child { border-right: 0; }
.host-metric span, .host-panel-head span { color: var(--dim); font-size: 10px; letter-spacing: .13em; }
.host-metric strong { margin: 11px 0 3px; font-size: 24px; line-height: 1; font-weight: 600; }
.host-metric small, .host-list-copy small, .host-check small, .host-setting small { color: var(--dim); font-size: 10px; line-height: 1.4; }
.host-columns { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); gap: 20px; }
.host-panel { background: var(--panel); border: 1px solid var(--line); margin-bottom: 20px; min-width: 0; }
.host-panel-head { display: flex; justify-content: space-between; align-items: center; gap: 15px; padding: 16px 18px; border-bottom: 1px solid var(--line); }
.host-panel-head h3 { font-size: 14px; margin: 4px 0 0; font-weight: 600; }
.host-list-row { display: flex; align-items: center; gap: 12px; padding: 11px 18px; border-bottom: 1px solid var(--line); }
.host-list-row:last-child, .host-check:last-child, .host-setting:last-child { border-bottom: 0; }
.host-list-icon { color: var(--accent); font-size: 16px; }
.host-list-copy { min-width: 0; flex: 1; display: flex; flex-direction: column; }
.host-list-copy strong { font-size: 11.5px; font-weight: 600; }
.host-list-copy small { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.host-state { color: var(--accent); text-transform: uppercase; font-size: 10px; letter-spacing: .08em; }
.host-check { display: flex; align-items: flex-start; gap: 10px; padding: 13px 18px; border-bottom: 1px solid var(--line); }
.host-check > div { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.host-check strong { font-size: 11.5px; font-weight: 500; }
.host-good { color: var(--green); }
.host-muted { color: var(--dim); }
.host-setting { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 3px 12px; padding: 13px 18px; border-bottom: 1px solid var(--line); font-size: 11px; }
.host-setting span { color: var(--mute); }
.host-setting small { grid-column: 1 / 3; }
.host-empty { padding: 26px 18px; }
.host-empty p, .host-panel-note { color: var(--mute); font-size: 11px; line-height: 1.6; }
.host-panel-note { margin: 14px 18px 18px; }
.expand-frame { position: absolute; right: 8px; bottom: 8px; z-index: 8; background: var(--panel); border: 1px solid var(--line); color: var(--accent); padding: 5px 8px; font-size: 12px; text-decoration: none; }
.expand-frame:hover { border-color: var(--accent); }
#term .c { color: var(--copper); }
#term .g { color: var(--green); }
#term .r { color: var(--red); }
#term .d { color: var(--dim); }
#term .y { color: var(--gold); }
#term .b { color: var(--mute); }
#term .bold { font-weight: 600; }
#panels-overlay {
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 5;
  display: none;
  min-width: 280px;
  max-width: 380px;
  border: 1px solid var(--accent);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: 0 10px 28px var(--overlay-shadow);
  padding: 8px 10px;
}
#panels-overlay.open { display: block; }
.panels-head {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--accent);
  font-size: 11px;
  padding-bottom: 6px;
}
.panels-head .scope { color: var(--text); font-weight: 600; }
.panels-head .pager { margin-left: auto; color: var(--mute); }
.panels-scopes { display: flex; gap: 6px; padding: 4px 0 8px; }
.panels-scopes button { flex: 1; appearance: none; border: 1px solid var(--line); background: transparent; color: var(--dim); font: inherit; font-size: 11px; padding: 4px; cursor: pointer; }
.panels-scopes button.on { border-color: var(--accent); color: var(--accent); }
.panels-scopes button[hidden] { display: none; }
.panels-list { display: grid; gap: 5px; }
.panels-empty { color: var(--dim); font-size: 11px; padding: 6px 2px; }
.panel-card {
  appearance: none;
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--text);
  font: inherit;
  font-size: 11.5px;
  padding: 7px 9px;
  cursor: pointer;
}
.panel-card:hover { border-color: var(--accent); }
.panel-card .d { color: var(--dim); font-size: 11px; display: block; padding-top: 2px; }
.float-overlay {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  display: none;
  width: min(560px, 92%);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: 0 10px 28px var(--overlay-shadow);
  padding: 8px 12px 10px;
}
.float-overlay.open { display: block; }
.float-head {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  font-size: 11.5px;
  padding-bottom: 7px;
  border-bottom: 1px solid var(--line);
}
.float-head .hint { color: var(--dim); font-size: 11px; }
.float-head .pin {
  margin-left: auto;
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--dim);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
  letter-spacing: 0.06em;
}
.float-head .pin.on { color: var(--accent); }
.qc-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
}
.qc-row .qc-ps { color: var(--gold); font-weight: 600; }
#qc-input {
  flex: 1;
  min-width: 0;
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font: inherit;
  caret-color: var(--gold);
}
#cm-text {
  width: 100%;
  margin-top: 8px;
  background: var(--ground);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--text);
  font: inherit;
  font-size: 12px;
  line-height: 1.5;
  padding: 8px 10px;
  resize: vertical;
  outline: none;
  caret-color: var(--accent);
}
#cm-text:focus { border-color: var(--accent); }
.cm-actions {
  display: flex;
  gap: 8px;
  padding-top: 8px;
}
.cm-actions button {
  appearance: none;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: transparent;
  color: var(--mute);
  font: inherit;
  font-size: 11.5px;
  padding: 4px 10px;
  cursor: pointer;
}
.cm-actions button:hover { color: var(--text); border-color: var(--accent); }
.cm-actions #cm-push { color: var(--accent); }
.ws-tab.new-tab {
  color: var(--dim);
  font-size: 13px;
  padding: 0 10px;
}
.ws-tab.new-tab:hover { color: var(--accent); }
.inline {
  display: flex;
  gap: 8px;
  padding: 7px 14px;
  border-top: 1px solid var(--line);
  background: var(--panel);
  flex: none;
}
.inline[hidden], .ws-tab[hidden] { display: none; }
.inline .ps1 { color: var(--green); font-weight: 600; }
#cmd {
  flex: 1;
  min-width: 0;
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font: inherit;
  caret-color: var(--green);
}
.statusbar {
  grid-column: 1 / 3;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  border-top: 1px solid var(--line);
  background: var(--panel);
  font-size: 10.5px;
  color: var(--dim);
  min-width: 0;
  overflow: hidden;
  flex-wrap: nowrap;
}
.statusbar > span { white-space: nowrap; }
.statusbar .lock { color: var(--gold); font-weight: 600; }
.statusbar .proj {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  color: var(--text);
}
.statusbar .hw-warn { color: var(--gold); }
.statusbar .right { margin-left: auto; }
@keyframes bl { 50% { opacity: 0; } }
.blink { animation: bl 1.2s steps(1) infinite; }
@media (prefers-reduced-motion: reduce) { .blink { animation: none; } }
::selection { background: var(--sel); }
</style>
<div class="app" data-grid="170x41">
  <header class="chrome">
    <span class="window-controls" aria-hidden="true"><i></i><i></i><i></i></span>
    <a class="brand" id="site-home" href="/en/" title="Back to Vibecrafted home">𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍<span class="dot">.</span></a>
    <span class="datum">⎮</span>
    <span class="lock-chip">⚿ L</span>
    <div class="ws" id="ws-tabs" role="tablist" aria-label="Guest organs"></div>
    <button type="button" class="ws-tab new-tab" id="new-tab" title="New tab">+</button>
    <button type="button" class="voc-btn" id="voc-btn">Voc</button>
    <div class="tools">
      <button type="button" id="composer">✍ Composer</button>
      <span class="sep">·</span>
      <button type="button" id="panels-btn">⿻ Panels 1</button>
      <span class="sep">·</span>
      <button type="button" id="quickcmd">❯_ Quick cmd</button>
      <button type="button" id="theme-btn" title="Console follows the page theme — click to go independent">☾</button>
    </div>
  </header>
  <aside class="rail">
    <div class="rail-head">Operator Frame</div>
    <div class="rail-host">
      <button type="button" class="host-item" data-host="dashboard">⌂ Dashboard</button>
      <button type="button" class="host-item" data-host="runs">❖ Active runs · <span class="runs-n" id="runs-n">0</span></button>
      <button type="button" class="host-item" data-host="config">⚙︎ Config</button>
      <button type="button" class="host-item" data-host="doctor">· Doctor</button>
      <button type="button" class="host-item" data-host="projects">✧ Projects</button>
    </div>
    <div class="rail-sep" aria-hidden="true">··············</div>
    <div class="rail-head">Workspaces · <span id="workspace-count">0</span></div>
    <div class="rail-body" id="rail"></div>
    <div class="rail-foot"><button class="new" id="new-sess" type="button">[+] Open project</button></div>
  </aside>
  <div class="workspace">
    <div id="term"></div>
    <div id="panels-overlay" aria-hidden="true">
      <div class="panels-head">⿻ Panels <span class="pager" id="panels-count"></span></div>
      <div class="panels-scopes"><button type="button" data-panel-scope="global">Global</button><button type="button" data-panel-scope="project">Project</button></div>
      <div class="panels-list" id="panels-list"></div>
    </div>
    <div id="quickcmd-overlay" class="float-overlay" aria-hidden="true">
      <div class="float-head">❯_ Quick cmd <span class="hint">one shot — Enter runs, Esc closes</span><button type="button" class="pin" id="qc-pin">PIN ○</button></div>
      <div class="qc-row"><span class="qc-ps">❯_</span><input id="qc-input" autocomplete="off" spellcheck="false" aria-label="quick command"></div>
    </div>
    <div id="composer-overlay" class="float-overlay" aria-hidden="true">
      <div class="float-head">✍ Composer <span class="hint">draft here — push writes into the pane, Enter stays human</span><button type="button" class="pin" id="cm-close">✕</button></div>
      <textarea id="cm-text" rows="5" spellcheck="false" aria-label="composer draft"></textarea>
      <div class="cm-actions"><button type="button" id="cm-push">Push to pane ⏎</button><button type="button" id="cm-cancel">Esc</button></div>
    </div>
    <div class="inline"><span class="ps1">❯</span><input id="cmd" autocomplete="off" spellcheck="false" aria-label="command"></div>
  </div>
  <footer class="statusbar">
    <span class="lock">⌃g LOCK</span>
    <span class="proj" id="stat-proj">Operator Frame · no project selected</span>
    <span id="hw-live">LIVE 0</span>
    <span id="hw-cpu">CPU —</span>
    <span id="hw-mem">MEM —</span>
    <span id="hw-disk">DISK —</span>
    <span id="hw-health">HEALTH DEMO</span>
    <span class="right">170×41 · DEMO</span>
  </footer>
</div>
<a class="expand-frame" href="/playground/index.html" target="_blank" rel="noopener">Open full 170×41 ↗</a>`;

  let host: HTMLDivElement | undefined;
  let api: PlaygroundApi | undefined;

  onMount(() => {
    if (!host) return;
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = SOURCE;
    api = bootPlayground(shadow);
    const app = shadow.querySelector<HTMLElement>('.app');
    const fit = () => {
      if (!app || !host) return;
      const font = getComputedStyle(host);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.font = `${font.fontSize} ${font.fontFamily}`;
      const cellWidth = ctx.measureText('0').width - 3;
      const cellHeight = parseFloat(font.lineHeight);
      const gridWidth = cellWidth * 170;
      const gridHeight = cellHeight * 41;
      const scale = Math.min(host.clientWidth / gridWidth, host.clientHeight / gridHeight);
      app.style.width = `${gridWidth}px`;
      app.style.height = `${gridHeight}px`;
      app.style.transform = `scale(${scale})`;
      app.style.left = `${Math.max(0, (host.clientWidth - gridWidth * scale) / 2)}px`;
      app.style.top = `${Math.max(0, (host.clientHeight - gridHeight * scale) / 2)}px`;
    };
    const observer = new ResizeObserver(fit);
    observer.observe(host);
    document.fonts.ready.then(fit);
    fit();
    return () => { observer.disconnect(); api?.destroy(); };
  });
</script>

<div class="tui-host hero__playground" bind:this={host}></div>

<style>
  .tui-host {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 0;
    background: var(--v2-ink);
  }
</style>
