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
    // Legacy carousel labels (prev/next/dots/counter) are unused by the film-tape
    // marquee but kept optional for copy compatibility.
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

  // Film-tape speed. The marquee shifts the track by exactly one set (-50%) over
  // this duration, so seconds-per-card stays constant regardless of step count.
  // "bardzo powoli" — a card drifts past roughly every SECONDS_PER_CARD seconds.
  const SECONDS_PER_CARD = 12;
  const marqueeDuration = $derived(`${Math.max(steps.length, 1) * SECONDS_PER_CARD}s`);

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

<!-- Film tape: a slow, infinite, self-scrolling reel. Two identical passes make
     the -50% loop seamless; the second pass is decorative (aria-hidden). -->
<div class="qcar" role="region" aria-label={copy.ariaLabel}>
  <div class="qcar__viewport">
    <div class="qcar__track" style={`--qcar-dur: ${marqueeDuration}`}>
      {#each steps as step}{@render slide(step, false)}{/each}
      {#each steps as step}{@render slide(step, true)}{/each}
    </div>
  </div>
</div>

<style>
  .qcar {
    width: 100%;
  }

  /* ── Viewport: clips the reel, fades both edges like film leader ───────── */

  .qcar__viewport {
    overflow: hidden;
    padding: 4px 0 12px;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
  }

  /* ── Track: the reel itself, drifting left forever ─────────────────────── */

  .qcar__track {
    display: flex;
    width: max-content;
    animation: qcar-marquee var(--qcar-dur, 72s) linear infinite;
    will-change: transform;
  }

  /* Pause to let a reader catch a frame. */
  .qcar__viewport:hover .qcar__track,
  .qcar__viewport:focus-within .qcar__track {
    animation-play-state: paused;
  }

  @keyframes qcar-marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  /* ── Slide (frame) ─────────────────────────────────────────────────────── */

  .qcar__slide {
    flex: 0 0 auto;
    width: clamp(280px, 28vw, 360px);
    /* Each frame owns its trailing gap so the two passes are equal-width and
       -50% lands on a seamless seam (do NOT use flex `gap` here). */
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

  /* ── Responsive ────────────────────────────────────────────────────────── */

  @media (max-width: 720px) {
    .qcar__slide {
      width: calc(100vw - 80px);
      margin-right: 12px;
      padding: 24px 20px 20px;
    }

    .qcar__title {
      font-size: 20px;
    }
  }

  /* Respect reduced-motion: stop the reel, let the user scroll the frames. */
  @media (prefers-reduced-motion: reduce) {
    .qcar__track {
      animation: none;
    }
    .qcar__viewport {
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .qcar__viewport::-webkit-scrollbar {
      display: none;
    }
  }
</style>
