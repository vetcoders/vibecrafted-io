<script lang="ts">
  import { onMount } from 'svelte';
  import { bootPlayground, type PlaygroundApi } from './operator-tui';

  const SOURCE = `<style>
:host {
  display: block;
  height: 100%;
  min-height: 0;
  container-type: size;
  background: var(--v2-ink, #0a0a0b);
  color: var(--v2-fg-on-dark, #f4f4f5);
  font-family: var(--v2-font-mono, "JetBrains Mono", ui-monospace, monospace);
  font-size: 12.5px;
  line-height: 1.45;
}
:host, :host * { box-sizing: border-box; }
:host {
  --ground: var(--v2-ink, #0a0a0b);
  --panel: var(--v2-paper, #121214);
  --line: var(--v2-border, #27272a);
  --text: var(--v2-fg-on-dark, #f4f4f5);
  --dim: var(--v2-fg-on-dark-mute, #71717a);
  --mute: var(--v2-fg-on-dark-dim, #a1a1aa);
  --copper: var(--v2-fg-on-dark-hover, #e4e4e7);
  --green: var(--v2-ok, #4ade80);
  --red: var(--v2-danger, #f87171);
  --gold: var(--v2-warn, #fbbf24);
  --sel: var(--v2-border, #27272a);
  --live: var(--v2-ok, #4ade80);
  --radius: var(--v2-radius, 2px);
  margin: 0;
  overflow: hidden;
}
.app {
  display: grid;
  grid-template-columns: 168px minmax(0, 1fr);
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
  padding: 0 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text);
  white-space: nowrap;
}
.brand .dot { color: var(--v2-accent, #c99a3b); }
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
.ws-tab .key {
  font-size: 10px;
  opacity: 0.7;
  border: 1px solid currentColor;
  border-radius: var(--radius);
  padding: 0 4px;
  line-height: 1.4;
}
.tools {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 8px;
  flex: none;
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
}
.tools button:hover { color: var(--text); background: #1a1a1e; }
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
  color: var(--dim);
}
.rail-body { flex: 1; overflow-y: auto; padding: 0 0 8px; }
.group { margin: 6px 0 2px; padding: 0 12px; font-size: 10px; letter-spacing: 0.14em; color: var(--dim); }
.group .n { color: var(--mute); letter-spacing: 0; margin-left: 6px; }
.sess { padding: 7px 12px 6px; cursor: pointer; border-left: 2px solid transparent; }
.sess:hover { background: #1a1a1e; }
.sess.on { background: #1a1a1e; border-left-color: var(--live); }
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
.new:hover { border-color: var(--v2-border-strong, #3f3f46); color: var(--text); }
.workspace {
  grid-column: 2;
  grid-row: 2;
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
    <span class="brand">Vibecrafted<span class="dot">.</span></span>
    <div class="ws" id="ws-tabs" role="tablist" aria-label="Workspaces"></div>
    <div class="tools">
      <button type="button" id="composer">Composer</button>
      <span class="sep">·</span>
      <button type="button" id="quickcmd">Quick cmd</button>
    </div>
  </header>
  <aside class="rail">
    <div class="rail-head">SESSIONS</div>
    <div class="rail-body" id="rail"></div>
    <div class="rail-foot"><button class="new" id="new-sess" type="button">+ New session</button></div>
  </aside>
  <div class="workspace">
    <div id="term"></div>
    <div class="inline"><span class="ps1">❯</span><input id="cmd" autocomplete="off" spellcheck="false" aria-label="command"></div>
  </div>
  <footer class="statusbar">
    <span class="lock">LOCK</span>
    <span id="hw-live">LIVE 3</span>
    <span id="hw-cpu">CPU 14%</span>
    <span id="hw-mem">MEM 3.8/16G</span>
    <span id="hw-disk">DISK 12G</span>
    <span id="hw-health">HEALTH ·</span>
    <span class="right"><span id="stat-name">loctree</span> · BASE</span>
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
