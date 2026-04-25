<script lang="ts">
  import MicroBoard from './MicroBoard.svelte';

  interface Props {
    num: string;
    convergeState: number;
    stateLabel: string;
    accent: 'default' | 'teal';
    name: string;
    tagline: string;
    desc: string;
  }

  let { num, convergeState, stateLabel, accent, name, tagline, desc }: Props = $props();

  let open = $state(false);
  const detailsId = $derived(`fwband-details-${num}`);

  function toggle() {
    open = !open;
  }
</script>

<article class={['fwband', `fwband--${accent}`, open && 'fwband--open']}>
  <button
    type="button"
    class="fwband__head"
    aria-expanded={open}
    aria-controls={detailsId}
    onclick={toggle}
  >
    <div class="fwband__col fwband__col--left">
      <MicroBoard state={convergeState} size={88} accent={accent} dotCount={8} />
      <span class="fwband__state">STATE {stateLabel}</span>
    </div>

    <div class="fwband__col fwband__col--mid">
      <span class="fwband__phase-num">PHASE {num}</span>
      <h3 class="fwband__phase-name">{name}</h3>
      <p class="fwband__phase-tagline">{tagline}</p>
    </div>

    <span class="fwband__icon" aria-hidden="true">{open ? '−' : '+'}</span>
  </button>

  <div
    class={['fwband__details', open && 'fwband__details--open']}
    id={detailsId}
    aria-hidden={!open}
  >
    <p class="fwband__desc">{desc}</p>
  </div>
</article>

<style>
  .fwband {
    border: 1px solid var(--rule-dark-soft);
    border-bottom: 0;
    background: rgba(14, 14, 12, 0.28);
    transition: border-color 0.18s ease, background 0.18s ease;
  }

  .fwband:last-child {
    border-bottom: 1px solid var(--rule-dark-soft);
  }

  .fwband:hover {
    border-color: var(--rule-dark);
    background: rgba(14, 14, 12, 0.42);
  }

  .fwband--open {
    border-color: var(--accent);
    background: rgba(14, 14, 12, 0.55);
  }

  .fwband--teal.fwband--open {
    border-color: var(--accent-2);
  }

  .fwband__head {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 32px;
    align-items: start;
    width: 100%;
    padding: 32px 24px;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }

  .fwband__col--left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .fwband__state {
    display: block;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    margin-top: 14px;
  }

  .fwband__phase-num {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    transition: color 0.18s ease;
  }

  .fwband--open .fwband__phase-num {
    color: var(--accent);
  }

  .fwband--teal.fwband--open .fwband__phase-num {
    color: var(--accent-2);
  }

  .fwband__phase-name {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 400;
    font-size: clamp(32px, 3.2vw, 52px);
    letter-spacing: -0.02em;
    color: var(--fg-on-dark);
    margin: 6px 0 14px;
  }

  .fwband--teal .fwband__phase-name {
    color: var(--accent-2);
  }

  .fwband__phase-tagline {
    font-family: var(--font-body);
    font-size: 15px;
    line-height: 1.45;
    color: var(--fg-on-dark-dim);
    max-width: 34ch;
    margin: 0;
  }

  .fwband__icon {
    width: 22px;
    min-height: 22px;
    font-family: var(--font-mono);
    font-size: 18px;
    line-height: 1;
    color: var(--fg-on-dark-mute);
    text-align: center;
    transition: color 0.18s ease;
  }

  .fwband--open .fwband__icon {
    color: var(--accent);
  }

  .fwband--teal.fwband--open .fwband__icon {
    color: var(--accent-2);
  }

  .fwband__details {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    border-top: 0 solid transparent;
    transition: max-height 0.3s ease, opacity 0.18s ease, border-color 0.18s ease;
  }

  .fwband__details--open {
    max-height: 600px;
    opacity: 1;
    border-top: 1px solid var(--rule-dark-soft);
  }

  .fwband__desc {
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.6;
    color: var(--fg-on-dark-dim);
    max-width: 68ch;
    margin: 0;
    padding: 24px 24px 28px 176px;
  }

  @media (max-width: 900px) {
    .fwband__head {
      grid-template-columns: 88px 1fr auto;
      gap: 24px;
      padding: 28px 20px;
    }

    .fwband__desc {
      padding: 22px 20px 26px 132px;
    }
  }

  @media (max-width: 560px) {
    .fwband__head {
      grid-template-columns: 1fr auto;
      gap: 20px;
    }

    .fwband__col--left {
      grid-column: 1 / -1;
    }

    .fwband__desc {
      padding-left: 20px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fwband,
    .fwband__phase-num,
    .fwband__icon,
    .fwband__details {
      transition: none;
    }
  }
</style>
