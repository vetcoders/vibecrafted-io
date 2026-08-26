<script lang="ts">
  import { onMount } from 'svelte';
  import { bootPlayground, type PlaygroundApi } from './operator-tui';

  const SOURCE = "<style>\n\n:host {\n  display: block;\n  height: 100%;\n  min-height: 0;\n  container-type: size;\n  background: #0a0a0b;\n  color: #f4f4f5;\n  font-family: \"JetBrains Mono\", ui-monospace, \"SF Mono\", Menlo, monospace;\n  font-size: 12.5px;\n  line-height: 1.45;\n}\n:host, :host * { box-sizing: border-box; }\n\n:host{\n  --ground:#0a0a0b; --panel:#121214; --line:#27272a; --text:#f4f4f5;\n  --dim:#71717a; --mute:#a1a1aa; --copper:#e4e4e7; --green:#4ade80;\n  --red:#f87171; --cyan:#a1a1aa; --gold:#fbbf24; --sel:#27272a; --live:#4ade80;\n}\n*{box-sizing:border-box}\n:host{height:100%;margin:0;background:var(--ground);color:var(--text);overflow:hidden;\n  font-family:\"JetBrains Mono\",ui-monospace,\"SF Mono\",Menlo,monospace;font-size:12.5px;line-height:1.45}\n.app{display:grid;grid-template-columns:220px minmax(0,1fr);grid-template-rows:minmax(0,1fr) 26px;height:100%}\n.rail{grid-row:1;border-right:1px solid var(--line);background:var(--panel);display:flex;flex-direction:column;min-height:0}\n.rail-head{padding:10px 12px 6px;font-size:10.5px;font-weight:500;letter-spacing:.12em;color:var(--dim)}\n.rail-body{flex:1;overflow-y:auto;padding:0 0 8px}\n.group{margin:6px 0 2px;padding:0 12px;font-size:10px;letter-spacing:.14em;color:var(--dim)}\n.group .n{color:var(--mute);letter-spacing:0;margin-left:6px}\n.sess{padding:7px 12px 6px;cursor:pointer;border-left:2px solid transparent}\n.sess:hover{background:#1a1a1e}\n.sess.on{background:#1a1a1e;border-left-color:var(--live)}\n.sess .row{display:flex;align-items:baseline;gap:8px}\n.sess .mark{width:10px;flex:none;color:var(--dim)}\n.sess.live .mark{color:var(--green)}\n.sess.stale .mark{color:var(--gold)}\n.sess .name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.sess .meta{color:var(--dim);font-size:11px}\n.sess .face{padding:1px 0 0 20px;color:var(--dim);font-size:11px}\n.rail-foot{padding:8px 12px 10px;border-top:1px solid var(--line)}\n.new{width:100%;background:transparent;border:1px solid var(--line);color:var(--mute);border-radius:6px;\n  font:inherit;font-size:12px;padding:6px 8px;cursor:pointer;text-align:left}\n.new:hover{border-color:#3f3f46;color:var(--text)}\n.workspace{display:flex;flex-direction:column;min-width:0;min-height:0;background:var(--ground)}\n.tabs{display:flex;align-items:stretch;gap:0;border-bottom:1px solid var(--line);background:var(--panel);\n  overflow-x:auto;flex:none;min-height:32px}\n.tab{appearance:none;background:transparent;border:0;border-bottom:2px solid transparent;color:var(--dim);\n  font:inherit;font-size:12px;padding:0 12px;height:32px;cursor:pointer;white-space:nowrap}\n.tab:hover{color:var(--text)}\n.tab.on{color:var(--text);background:#1a1a1e}\n.tab.live{border-bottom-color:var(--green)}\n.tab.stale{border-bottom-color:var(--gold)}\n.tab.idle{border-bottom-color:#3f3f46}\n.tab.on.live{color:var(--green)}\n.tab.on.stale{color:var(--gold)}\n#term{flex:1 1 0;min-height:0;overflow-y:auto;padding:12px 16px 8px;white-space:pre-wrap;word-break:break-word;overscroll-behavior:contain}\n#term .c{color:var(--copper)} #term .g{color:var(--green)} #term .r{color:var(--red)}\n#term .d{color:var(--dim)} #term .y{color:var(--gold)} #term .b{color:var(--mute)}\n#term .bold{font-weight:600}\n.inline{display:flex;gap:8px;padding:7px 14px;border-top:1px solid var(--line);background:var(--panel);flex:none}\n.inline .ps1{color:var(--green);font-weight:600}\n#cmd{flex:1;background:none;border:none;outline:none;color:var(--text);font:inherit;caret-color:var(--green)}\n.statusbar{grid-column:1/3;display:flex;align-items:center;gap:14px;padding:0 12px;\n  border-top:1px solid var(--line);background:var(--panel);font-size:11px;color:var(--dim)}\n.statusbar .lock{color:var(--gold)}\n.statusbar .right{margin-left:auto}\n.blink{animation:bl 1.2s steps(1) infinite}\n@keyframes bl{50%{opacity:0}}\n::selection{background:var(--sel)}\n@media(max-width:760px){.app{grid-template-columns:1fr}.rail{display:none}}\n@media(prefers-reduced-motion:reduce){.blink{animation:none}}\n:host{height:100%;background:var(--ground)}\n\n@container (max-width: 560px) {\n  .app { grid-template-columns: 1fr; }\n  .rail { display: none; }\n}\n\n</style>\n<div class=\"app\">\n  <aside class=\"rail\">\n    <div class=\"rail-head\">SESSIONS</div>\n    <div class=\"rail-body\" id=\"rail\"></div>\n    <div class=\"rail-foot\"><button class=\"new\" id=\"new-sess\" type=\"button\">+ New session</button></div>\n  </aside>\n  <div class=\"workspace\">\n    <div class=\"tabs\" id=\"tabs\" role=\"tablist\" aria-label=\"Open panes\"></div>\n    <div id=\"term\"></div>\n    <div class=\"inline\"><span class=\"ps1\">\u276f</span><input id=\"cmd\" autocomplete=\"off\" spellcheck=\"false\" aria-label=\"command\"></div>\n  </div>\n  <div class=\"statusbar\">\n    <span class=\"lock\">LOCK</span><span>PANE</span><span>TAB</span><span>MOVE</span>\n    <span class=\"right\"><span id=\"stat-name\">loctree</span> \u00b7 <span id=\"clock\">20:57</span> \u00b7 <span id=\"stat-state\">live</span></span>\n  </div>\n</div>";

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
    background: #0a0a0b;
  }
</style>
