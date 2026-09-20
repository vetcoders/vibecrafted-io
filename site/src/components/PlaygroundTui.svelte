<script lang="ts">
  import { onMount } from 'svelte';
  import { bootPlayground, type PlaygroundApi } from './operator-tui';

  const SOURCE = `<style>
:host {
  display: block;
  height: 100%;
  min-height: 0;
  container-type: size;
  background: var(--ground);
  color: var(--text);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 12.5px;
  line-height: 1.45;
}
:host, :host * { box-sizing: border-box; }
:host {
  --ground: #0a0a0b;
  --panel: #121214;
  --panel-2: #1a1a1e;
  --line: #27272a;
  --text: #f4f4f5;
  --dim: #71717a;
  --mute: #a1a1aa;
  --copper: #e4e4e7;
  --green: #4ade80;
  --red: #f87171;
  --gold: #fbbf24;
  --sel: #27272a;
  --live: #4ade80;
  --accent: #c99a3b;
  --overlay-shadow: rgba(10, 10, 11, 0.35);
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
  display: grid;
  grid-template-columns: 208px minmax(0, 1fr);
  grid-template-rows: 34px minmax(0, 1fr) 26px;
  height: 100%;
  min-height: 0;
}
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
}
.brand .dot { color: var(--accent); }
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
.sess.live .mark { color: var(--green); }
.sess.stale .mark { color: var(--gold); }
.sess .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sess .meta { color: var(--dim); font-size: 11px; }
.sess .face { padding: 1px 0 0 20px; color: var(--dim); font-size: 11px; }
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
@container (max-width: 640px) {
  .app { grid-template-columns: minmax(0, 1fr); }
  .rail { display: none; }
  .workspace { grid-column: 1; }
  #hw-disk, #hw-mem { display: none; }
}
@container (max-width: 420px) {
  .tools .sep, #quickcmd { display: none; }
  #hw-cpu { display: none; }
}
</style>
<div class="app">
  <header class="chrome">
    <span class="brand">𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍<span class="dot">.</span></span>
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
      <button type="button" class="host-item" data-cmd="dashboard">⌂ Dashboard</button>
      <button type="button" class="host-item" data-cmd="status">❖ Active runs · <span class="runs-n" id="runs-n">0</span></button>
      <button type="button" class="host-item" data-cmd="doctor">⚙︎ Config</button>
      <button type="button" class="host-item" data-cmd="doctor">· Doctor</button>
      <button type="button" class="host-item" data-cmd="projects">✧ Projects</button>
    </div>
    <div class="rail-sep" aria-hidden="true">··············</div>
    <div class="rail-head">Workspaces</div>
    <div class="rail-body" id="rail"></div>
    <div class="rail-foot"><button class="new" id="new-sess" type="button">[+] new workspace</button></div>
  </aside>
  <div class="workspace">
    <div id="term"></div>
    <div id="panels-overlay" aria-hidden="true">
      <div class="panels-head">⿻ Panels <span class="scope">Global</span> · Project <span class="pager">1/4 ←→</span></div>
      <button type="button" class="panel-card" data-goto="0">❖ kimi-code · Never Ask swarm<span class="d">K3 thinking: max · ctx 14% (139k/1M) · feat/npm-install [PR#84]</span></button>
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
    <span class="proj" id="stat-proj">loctree · ⎇integration/pr88-mega · PR#87 · +3.1k/−900</span>
    <span id="hw-live">LIVE 3</span>
    <span id="hw-cpu">CPU 14%</span>
    <span id="hw-mem">MEM 3.8/16G</span>
    <span id="hw-disk">DISK 12G</span>
    <span id="hw-health">HEALTH ·</span>
    <span class="right">BASE</span>
  </footer>
</div>`;

  let host: HTMLDivElement | undefined;
  let api: PlaygroundApi | undefined;

  onMount(() => {
    if (!host) return;
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = SOURCE;
    api = bootPlayground(shadow);
    return () => api?.destroy();
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
