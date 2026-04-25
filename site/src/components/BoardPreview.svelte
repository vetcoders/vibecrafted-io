<script lang="ts">
  interface Props {
    initialTab?: 'board' | 'marbles' | 'dou';
    dwg?: string;
    timestamp?: string;
    meta?: string;
    class?: string;
  }

  type Tab = 'board' | 'marbles' | 'dou';

  interface BoardRow {
    num: string;
    phase: string;
    marbles: string;
    coverage: number;
    pct: string;
    state: 'converged' | 'active' | 'waiting' | 'blocked';
    stateLabel: string;
  }

  interface MarbleLogEntry {
    ts: string;
    op: string;
    phase: string;
    msg: string;
    status: 'ok' | 'rej';
  }

  interface DouItem {
    num: string;
    severity: 'warn' | 'block';
    phase: string;
    text: string;
  }

  let {
    initialTab = 'board',
    dwg = 'VC-001 · REV A',
    timestamp = 't=14:04:48',
    meta = '20 MARBLES · 054 CONVERGE',
    class: cls = '',
  } = $props<Props>();

  // svelte-ignore state_referenced_locally
  let activeTab = $state<Tab>(initialTab);

  const boardRows: BoardRow[] = [
    { num: '00', phase: 'scaffold', marbles: '04', coverage: 10, pct: '100', state: 'converged', stateLabel: 'CONVERGED' },
    { num: '01', phase: 'craft', marbles: '12', coverage: 7, pct: '078', state: 'active', stateLabel: 'ACTIVE' },
    { num: '02', phase: 'convergence', marbles: '07', coverage: 4, pct: '042', state: 'active', stateLabel: 'ACTIVE' },
    { num: '03', phase: 'doU', marbles: '03', coverage: 0, pct: '000', state: 'waiting', stateLabel: 'WAITING' },
    { num: '04', phase: 'release', marbles: '00', coverage: 0, pct: '000', state: 'blocked', stateLabel: 'BLOCKED' },
  ];

  const marblesLog: MarbleLogEntry[] = [
    { ts: '14:03:02', op: 'loctree', phase: '00/scaffold', msg: 'shape accepted, 04 wells assigned', status: 'ok' },
    { ts: '14:03:18', op: 'aicx', phase: '00/scaffold', msg: 'intent snapshot committed', status: 'ok' },
    { ts: '14:03:44', op: 'prview', phase: '01/craft', msg: '3 files reviewed, 1 change requested', status: 'rej' },
    { ts: '14:04:09', op: 'ScreenScribe', phase: '01/craft', msg: 'runtime sample captured', status: 'ok' },
    { ts: '14:04:31', op: 'prview', phase: '01/craft', msg: 'resubmitted and accepted', status: 'ok' },
    { ts: '14:04:48', op: 'loctree', phase: '02/convergence', msg: 'duplicate groove collapsed', status: 'ok' },
  ];

  const douItems: DouItem[] = [
    { num: '01', severity: 'block', phase: 'DoU', text: 'Release gate status undefined for phase 04.' },
    { num: '02', severity: 'warn', phase: 'craft', text: '2 marbles waiting on specialist coverage acknowledgement.' },
    { num: '03', severity: 'warn', phase: 'release', text: 'Changelog template not yet bound to board archive.' },
  ];

  const ticks = Array.from({ length: 10 });
  const drawingId = $derived(dwg.split(' · ')[0]);

  function wrapperClass(): string {
    return `bp ${cls}`.trim();
  }

  function tabClass(tab: Tab): string {
    return `bp__tab${activeTab === tab ? ' bp__tab--active' : ''}`;
  }

  function badgeClass(modifier: string): string {
    return `bp__badge bp__badge--${modifier}`;
  }
</script>

<div class={wrapperClass()}>
  <div class="bp__meta">
    <span class="bp__meta-left">
      BOARD STATE <span class="bp__dot bp__dot--live" aria-hidden="true"></span> LIVE
    </span>
    <span class="bp__meta-right">DWG {dwg}</span>
  </div>
  <div class="bp__rule" aria-hidden="true"></div>

  <div class="bp__tabs-row">
    <div class="bp__tabs" role="tablist" aria-label="Board preview views">
      <button
        type="button"
        role="tab"
        class={tabClass('board')}
        aria-selected={activeTab === 'board'}
        onclick={() => (activeTab = 'board')}
      >
        <span class="bp__tab-num">01</span> BOARD
      </button>
      <button
        type="button"
        role="tab"
        class={tabClass('marbles')}
        aria-selected={activeTab === 'marbles'}
        onclick={() => (activeTab = 'marbles')}
      >
        <span class="bp__tab-num">02</span> MARBLES
      </button>
      <button
        type="button"
        role="tab"
        class={tabClass('dou')}
        aria-selected={activeTab === 'dou'}
        onclick={() => (activeTab = 'dou')}
      >
        <span class="bp__tab-num">03</span> DOU
      </button>
    </div>
    <span class="bp__meta-meta">{meta}</span>
  </div>
  <div class="bp__rule" aria-hidden="true"></div>

  {#if activeTab === 'board'}
    <div class="bp__panel bp__panel--board" role="tabpanel">
      <div class="bp__board-head">
        <span class="bp__board-col bp__board-col--n">N#</span>
        <span class="bp__board-col bp__board-col--phase">PHASE</span>
        <span class="bp__board-col bp__board-col--marbles">MARBLES</span>
        <span class="bp__board-col bp__board-col--cov">COVERAGE</span>
        <span class="bp__board-col bp__board-col--pct">%</span>
        <span class="bp__board-col bp__board-col--state">STATE</span>
      </div>

      {#each boardRows as row}
        <div class="bp__board-row">
          <span class="bp__board-cell bp__board-cell--n">{row.num}</span>
          <span class="bp__board-cell bp__board-cell--phase">{row.phase}</span>
          <span class="bp__board-cell bp__board-cell--marbles">{row.marbles}</span>
          <span class="bp__board-cell bp__board-cell--cov" aria-label={`${row.coverage} of 10 ticks filled`}>
            {#each ticks as _, i}
              <span
                class={`bp__tick${i < row.coverage ? ` bp__tick--filled-${row.state}` : ''}`}
                aria-hidden="true"
              ></span>
            {/each}
          </span>
          <span class="bp__board-cell bp__board-cell--pct">{row.pct}</span>
          <span class={`bp__board-cell bp__board-cell--state ${badgeClass(row.state)}`}>{row.stateLabel}</span>
        </div>
      {/each}
    </div>
  {:else if activeTab === 'marbles'}
    <div class="bp__panel bp__panel--marbles" role="tabpanel">
      <div class="bp__marbles-head">
        <span class="bp__marbles-col--time">TIME</span>
        <span class="bp__marbles-col--op">OP</span>
        <span class="bp__marbles-col--phase">PHASE</span>
        <span class="bp__marbles-col--msg">MARBLE</span>
        <span class="bp__marbles-col--status">STATUS</span>
      </div>
      {#each marblesLog as entry}
        <div class="bp__marbles-row">
          <span class="bp__mono-small bp__marbles-col--time">{entry.ts}</span>
          <span class="bp__mono-small bp__marbles-col--op">{entry.op}</span>
          <span class="bp__mono-small bp__muted bp__marbles-col--phase">{entry.phase}</span>
          <span class="bp__body-small bp__marbles-col--msg">{entry.msg}</span>
          <span class={`${badgeClass(entry.status === 'ok' ? 'converged' : 'blocked')} bp__marbles-col--status`}>
            {entry.status === 'ok' ? 'OK' : 'REJ'}
          </span>
        </div>
      {/each}
    </div>
  {:else}
    <div class="bp__panel bp__panel--dou" role="tabpanel">
      {#each douItems as item}
        <div class="bp__dou-row">
          <span class="bp__dou-num">{item.num}</span>
          <span class={`bp__dou-diamond bp__dou-diamond--${item.severity}`} aria-hidden="true">◆</span>
          <span class="bp__dou-phase">{item.phase}</span>
          <span class="bp__dou-text">{item.text}</span>
        </div>
      {/each}
    </div>
  {/if}

  <div class="bp__rule" aria-hidden="true"></div>

  <div class="bp__caption">
    <span class="bp__caption-text">
      <em>Fig. 04a</em> — Board state as observed at {timestamp}, after six throws across phases 00–02.
    </span>
    <span class="bp__caption-tags">
      <span class="bp__caption-tag">[{drawingId}]</span>
      <span class="bp__caption-tag bp__caption-tag--live">[LIVE]</span>
    </span>
  </div>
</div>

<style>
  .bp {
    font-family: var(--font-mono);
    color: var(--fg-on-paper);
    border: 1px solid var(--rule-paper);
    padding: 0;
    background: transparent;
    border-radius: 2px;
  }

  .bp__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-paper-mute);
  }

  .bp__dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin: 0 6px;
  }

  .bp__dot--live {
    background: var(--accent);
    animation: bp-blink 2.4s ease-in-out infinite;
  }

  @keyframes bp-blink {
    0%,
    50% {
      opacity: 1;
    }

    60%,
    100% {
      opacity: 0.35;
    }
  }

  .bp__rule {
    height: 1px;
    background: var(--rule-paper);
  }

  .bp__tabs-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
  }

  .bp__tabs {
    display: flex;
    gap: 20px;
  }

  .bp__tab {
    appearance: none;
    border: 0;
    background: transparent;
    color: var(--fg-on-paper-mute);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 6px 0;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition:
      color 0.15s ease,
      border-color 0.15s ease;
  }

  .bp__tab:hover {
    color: var(--fg-on-paper);
  }

  .bp__tab--active {
    color: var(--fg-on-paper);
    border-bottom-color: var(--accent);
  }

  .bp__tab-num {
    color: inherit;
    margin-right: 6px;
    opacity: 0.7;
  }

  .bp__meta-meta {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-paper-mute);
  }

  .bp__panel {
    padding: 12px 16px;
  }

  .bp__board-head,
  .bp__board-row {
    display: grid;
    grid-template-columns: 28px 1fr 60px 130px 40px 90px;
    gap: 14px;
    align-items: center;
    padding: 8px 0;
    font-size: 11px;
  }

  .bp__board-head {
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-paper-mute);
    border-bottom: 1px solid var(--rule-paper-soft);
  }

  .bp__board-row {
    border-bottom: 1px solid var(--rule-paper-soft);
  }

  .bp__board-row:last-child {
    border-bottom: none;
  }

  .bp__board-cell--n {
    color: var(--fg-on-paper-mute);
    font-size: 10px;
    letter-spacing: 0.12em;
  }

  .bp__board-cell--phase {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 16px;
    color: var(--fg-on-paper);
  }

  .bp__board-cell--marbles {
    font-size: 12px;
    letter-spacing: 0.08em;
    color: var(--fg-on-paper);
  }

  .bp__board-cell--cov {
    display: flex;
    gap: 2px;
  }

  .bp__board-cell--pct {
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--fg-on-paper-dim);
    text-align: right;
  }

  .bp__tick {
    width: 10px;
    height: 8px;
    background: var(--rule-paper-soft);
    display: inline-block;
  }

  .bp__tick--filled-converged {
    background: var(--accent-2);
  }

  .bp__tick--filled-active {
    background: var(--fg-on-paper);
  }

  .bp__tick--filled-waiting {
    background: var(--accent-amber);
  }

  .bp__tick--filled-blocked {
    background: var(--accent);
  }

  .bp__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 3px 8px;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: 1px solid currentColor;
    border-radius: 2px;
    line-height: 1;
  }

  .bp__badge--converged {
    color: var(--accent-2);
  }

  .bp__badge--active {
    color: var(--fg-on-paper);
  }

  .bp__badge--waiting {
    color: var(--accent-amber);
  }

  .bp__badge--blocked {
    color: var(--accent);
  }

  .bp__marbles-head,
  .bp__marbles-row {
    display: grid;
    grid-template-columns: 70px 100px 110px 1fr 48px;
    gap: 14px;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--rule-paper-soft);
    font-size: 11px;
  }

  .bp__marbles-head {
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-paper-mute);
  }

  .bp__mono-small {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    color: var(--fg-on-paper);
  }

  .bp__muted {
    color: var(--fg-on-paper-mute);
  }

  .bp__body-small {
    font-family: var(--font-body);
    font-size: 12px;
    line-height: 1.4;
    color: var(--fg-on-paper-dim);
  }

  .bp__dou-row {
    display: grid;
    grid-template-columns: 28px 18px 90px 1fr;
    gap: 14px;
    align-items: start;
    padding: 10px 0;
    border-bottom: 1px solid var(--rule-paper-soft);
  }

  .bp__dou-row:last-child {
    border-bottom: none;
  }

  .bp__dou-num {
    font-size: 10px;
    color: var(--fg-on-paper-mute);
    letter-spacing: 0.12em;
    font-family: var(--font-mono);
  }

  .bp__dou-diamond {
    font-size: 10px;
    line-height: 1.4;
  }

  .bp__dou-diamond--warn {
    color: var(--accent-amber);
  }

  .bp__dou-diamond--block {
    color: var(--accent);
  }

  .bp__dou-phase {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 13px;
    color: var(--fg-on-paper);
  }

  .bp__dou-text {
    font-family: var(--font-body);
    font-size: 13px;
    line-height: 1.5;
    color: var(--fg-on-paper-dim);
  }

  .bp__caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 10px 16px;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--fg-on-paper-mute);
  }

  .bp__caption-text {
    font-family: var(--font-mono);
  }

  .bp__caption-text em {
    font-style: italic;
    color: var(--fg-on-paper);
    font-family: var(--font-display);
    font-size: 12px;
    letter-spacing: 0;
  }

  .bp__caption-tags {
    display: flex;
    gap: 8px;
    white-space: nowrap;
  }

  .bp__caption-tag {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-paper-mute);
  }

  .bp__caption-tag--live {
    color: var(--accent);
  }

  @media (max-width: 780px) {
    .bp__tabs-row,
    .bp__meta,
    .bp__caption {
      align-items: flex-start;
      flex-direction: column;
    }

    .bp__tabs {
      flex-wrap: wrap;
      gap: 12px;
    }

    .bp__board-head,
    .bp__board-row {
      grid-template-columns: 24px 1fr 48px 90px;
      gap: 10px;
    }

    .bp__board-col--pct,
    .bp__board-cell--pct {
      display: none;
    }

    .bp__board-col--state,
    .bp__board-cell--state {
      grid-column: 1 / -1;
      justify-self: start;
      margin-top: 4px;
    }

    .bp__marbles-head,
    .bp__marbles-row {
      grid-template-columns: 80px 1fr 48px;
      gap: 8px;
    }

    .bp__marbles-col--time,
    .bp__marbles-col--phase {
      display: none;
    }

    .bp__meta-meta {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bp__dot--live {
      animation: none;
      opacity: 1;
    }
  }
</style>
