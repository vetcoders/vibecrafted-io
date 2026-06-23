<script lang="ts">
  import MicroBoard from './MicroBoard.svelte';

  type BoardAccent = 'default' | 'teal';

  interface CarouselStep {
    num: string;
    verb: string;
    accent: string;
    state: number;
    pct: string;
    title: string;
    body: string;
    command: string;
    lands: string[];
  }

  interface CarouselCopy {
    ariaLabel: string;
    slideAria: string;
    landsLabel: string;
    convergeLabel: string;
    previousLabel?: string;
    nextLabel?: string;
    dotsLabel?: string;
    goToStep?: string;
    steps: CarouselStep[];
  }

  interface Props {
    copy: CarouselCopy;
  }

  let { copy }: Props = $props();

  const steps = $derived(copy.steps);

  // Film tape: drifts on its own, slowly, but is also a real horizontal-scroll
  // surface — grab it (hover / drag / wheel / trackpad) and it pauses so you can
  // scroll by hand; release and it resumes drifting. Three identical passes make
  // the loop seamless in BOTH directions.
  const SPEED_PX_PER_SEC = 26; // "bardzo powoli" — tune here.

  let trackEl: HTMLDivElement | undefined = $state();
  let held = $state(false); // pointer/touch is on the tape → hand-scroll mode

  $effect(() => {
    const el = trackEl;
    if (!el) return;

    const reduce =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Start in the middle pass so there is a full set of room to hand-scroll
    // either way before the seamless wrap kicks in.
    const center = () => {
      const oneSet = el.scrollWidth / 3;
      if (oneSet > 0) el.scrollLeft = oneSet;
    };
    center();
    const ro = new ResizeObserver(center);
    ro.observe(el);

    let raf = 0;
    let last = 0;
    const frame = (t: number) => {
      const oneSet = el.scrollWidth / 3;
      if (oneSet > 0) {
        if (last && !held && !reduce) {
          el.scrollLeft += (SPEED_PX_PER_SEC * (t - last)) / 1000;
        }
        // Seamless wrap, both directions (covers auto AND hand-scroll).
        if (el.scrollLeft >= oneSet * 2) el.scrollLeft -= oneSet;
        else if (el.scrollLeft <= oneSet * 0.5) el.scrollLeft += oneSet;
      }
      last = t;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  });

  function boardAccent(accent: string): BoardAccent {
    return accent === 'teal' ? 'teal' : 'default';
  }

  function slideLabel(num: string, title: string): string {
    return copy.slideAria.replace('{num}', num).replace('{title}', title);
  }
</script>

{#snippet slide(step: CarouselStep, dup: boolean)}
  <article
    class="qcar__slide"
    aria-hidden={dup ? 'true' : undefined}
    aria-roledescription={dup ? undefined : 'slide'}
    aria-label={dup ? undefined : slideLabel(step.num, step.title)}
  >
    <div class="qcar__slide-head">
      <span class={['qcar__num', step.accent === 'teal' && 'qcar__num--teal']}>{step.num}</span>
      <span class="qcar__verb">{step.verb}</span>
    </div>

    <h3 class="qcar__title">{step.title}</h3>
    <p class="qcar__body">{step.body}</p>

    <code class="qcar__cmd">{step.command}</code>

    <div class="qcar__lands">
      <span class="qcar__lands-label">{copy.landsLabel}</span>
      {#each step.lands as land, li}
        {#if li > 0}<span class="qcar__lands-sep">·</span>{/if}
        <span class="qcar__lands-chip">{land}</span>
      {/each}
    </div>

    <div class="qcar__board">
      <MicroBoard state={step.state} size={108} accent={boardAccent(step.accent)} dotCount={10} />
      <span class={['qcar__converge', step.accent === 'teal' && 'qcar__converge--teal']}>
        {step.pct}% {copy.convergeLabel}
      </span>
    </div>
  </article>
{/snippet}

<!-- Full-bleed film reel: auto-drifts slowly; grab to hand-scroll horizontally. -->
<div
  class="qcar"
  role="region"
  aria-label={copy.ariaLabel}
  bind:this={trackEl}
  onpointerenter={() => (held = true)}
  onpointerleave={() => (held = false)}
>
  {#each steps as step}{@render slide(step, false)}{/each}
  {#each steps as step}{@render slide(step, true)}{/each}
  {#each steps as step}{@render slide(step, true)}{/each}
</div>

<style>
  /* Full-bleed: break out of the section's centered max-width to span the viewport. */
  .qcar {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);

    display: flex;
    align-items: stretch;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 4px max(24px, calc(50vw - var(--v2-max-width) / 2)) 16px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overscroll-behavior-x: contain;
    cursor: grab;
    /* film-leader edge fade */
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
  }

  .qcar:active {
    cursor: grabbing;
  }

  .qcar::-webkit-scrollbar {
    display: none;
  }

  /* ── Slide (frame) ─────────────────────────────────────────────────────── */

  .qcar__slide {
    flex: 0 0 auto;
    width: clamp(280px, 28vw, 360px);
    margin-right: 16px;
    border: 1px solid var(--rule-dark);
    border-radius: 2px;
    padding: 28px 26px 24px;
    background: rgba(14, 14, 12, 0.55);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .qcar__slide-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--rule-dark-soft);
  }

  .qcar__num {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 44px;
    line-height: 1;
    color: var(--fg-on-dark);
  }

  .qcar__num--teal {
    color: var(--accent-2);
  }

  .qcar__verb {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
  }

  .qcar__title {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 22px;
    line-height: 1.25;
    letter-spacing: -0.015em;
    color: var(--fg-on-dark);
    margin: 4px 0 0;
  }

  .qcar__body {
    font-family: var(--font-body);
    font-size: 13px;
    line-height: 1.55;
    color: var(--fg-on-dark-dim);
    margin: 0;
  }

  .qcar__cmd {
    display: block;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.02em;
    color: var(--fg-on-dark);
    padding: 9px 12px;
    border: 1px solid var(--rule-dark);
    background: rgba(0, 0, 0, 0.32);
    border-radius: 2px;
    margin: 6px 0 0;
    overflow-x: auto;
    white-space: nowrap;
  }

  .qcar__lands {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-dark-dim);
    line-height: 1.5;
  }

  .qcar__lands-label {
    color: var(--fg-on-dark-mute);
    letter-spacing: 0.22em;
    margin-right: 8px;
  }

  .qcar__lands-sep {
    margin: 0 6px;
    color: var(--fg-on-dark-mute);
  }

  .qcar__board {
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid var(--rule-dark-soft);
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .qcar__converge {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
  }

  .qcar__converge--teal {
    color: var(--accent-2);
  }

  @media (max-width: 720px) {
    .qcar {
      padding-left: 20px;
      padding-right: 20px;
    }
    .qcar__slide {
      width: calc(100vw - 80px);
      margin-right: 12px;
      padding: 24px 20px 20px;
    }
    .qcar__title {
      font-size: 20px;
    }
  }
</style>
