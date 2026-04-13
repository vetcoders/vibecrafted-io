<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Spring, prefersReducedMotion } from 'svelte/motion';
  import { fade } from 'svelte/transition';

  // Satisfy Vite's SSR-side import analysis; the template consumes these transitions.
  const templateTransitions = { fade };
  void templateTransitions;

  type CardItem = {
    cardClass?: string;
  };

  let {
    items,
    ariaLabel,
    leftLabel = 'Scroll left',
    rightLabel = 'Scroll right',
    card,
  }: {
    items: CardItem[];
    ariaLabel: string;
    leftLabel?: string;
    rightLabel?: string;
    card: Snippet<[CardItem, number]>;
  } = $props();

  let wrapElement: HTMLElement | null = $state(null);
  let railElement: HTMLDivElement | null = $state(null);

  let isDragging = $state(false);
  let isScrollable = $state(false);
  let atStart = $state(true);
  let atEnd = $state(false);
  let maxScrollLeft = $state(0);
  let scrollLeft = $state(0);
  let snapPoints = $state<number[]>([]);

  let dragPointerId: number | null = null;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let dragVelocity = 0;
  let lastMoveTime = 0;
  let lastMoveScrollLeft = 0;
  let settleTimer: ReturnType<typeof setTimeout> | null = null;
  let springing = $state(false);
  const glide = new Spring(0, {
    stiffness: 0.13,
    damping: 0.76,
    precision: 0.35,
  });

  function clamp(value: number) {
    return Math.min(Math.max(0, value), maxScrollLeft);
  }

  function clearSettleTimer() {
    if (settleTimer !== null) {
      clearTimeout(settleTimer);
      settleTimer = null;
    }
  }

  function syncState(nextScrollLeft = railElement?.scrollLeft ?? 0) {
    if (!railElement) return;

    const nextMaxScrollLeft = Math.max(0, railElement.scrollWidth - railElement.clientWidth);
    const styles = getComputedStyle(railElement);
    const inlineStart = parseFloat(styles.paddingInlineStart || styles.paddingLeft || '0');
    const cards = Array.from(railElement.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    );

    maxScrollLeft = nextMaxScrollLeft;
    scrollLeft = Math.min(Math.max(0, nextScrollLeft), nextMaxScrollLeft);
    isScrollable = nextMaxScrollLeft > 1;
    atStart = scrollLeft <= 1;
    atEnd = scrollLeft >= nextMaxScrollLeft - 1;
    snapPoints = cards.map((card) => Math.min(Math.max(0, card.offsetLeft - inlineStart), nextMaxScrollLeft));
  }

  function snapFor(base = scrollLeft) {
    if (snapPoints.length === 0) return clamp(base);

    let nearest = snapPoints[0];
    let distance = Math.abs(base - nearest);

    for (const point of snapPoints.slice(1)) {
      const candidateDistance = Math.abs(base - point);
      if (candidateDistance < distance) {
        nearest = point;
        distance = candidateDistance;
      }
    }

    return nearest;
  }

  function indexFor(base = scrollLeft) {
    if (snapPoints.length === 0) return 0;
    const nearest = snapFor(base);
    const found = snapPoints.indexOf(nearest);
    return found === -1 ? 0 : found;
  }

  function applyImmediate(nextScrollLeft: number) {
    if (!railElement) return;

    const clamped = clamp(nextScrollLeft);
    springing = false;
    glide.set(clamped, { instant: true });
    railElement.scrollLeft = clamped;
    syncState(clamped);
  }

  function glideTo(nextTarget: number, preserveMomentum = 0) {
    if (!railElement) return;

    const clamped = clamp(nextTarget);
    if (prefersReducedMotion.current || Math.abs(clamped - railElement.scrollLeft) <= 1) {
      applyImmediate(clamped);
      return;
    }

    springing = true;
    glide.set(clamped, preserveMomentum > 0 ? { preserveMomentum } : undefined);
  }

  function settleToNearest(base = scrollLeft, preserveMomentum = 0) {
    glideTo(snapFor(base), preserveMomentum);
  }

  function scheduleSettle(base = railElement?.scrollLeft ?? scrollLeft, delay = 120, preserveMomentum = 0) {
    clearSettleTimer();
    const settleBase = base;
    settleTimer = setTimeout(() => {
      settleTimer = null;
      settleToNearest(settleBase, preserveMomentum);
    }, delay);
  }

  function step(direction: -1 | 1) {
    if (!isScrollable) return;
    clearSettleTimer();
    const nextIndex = Math.min(
      Math.max(indexFor(springing ? glide.target : railElement?.scrollLeft ?? scrollLeft) + direction, 0),
      snapPoints.length - 1
    );
    glideTo(snapPoints[nextIndex], 140);
  }

  function canConsume(delta: number) {
    if (!isScrollable) return false;
    if (delta < 0 && atStart) return false;
    if (delta > 0 && atEnd) return false;
    return true;
  }

  function handleWheel(event: WheelEvent) {
    if (!railElement || event.ctrlKey) return;

    const absX = Math.abs(event.deltaX);
    const absY = Math.abs(event.deltaY);
    const horizontalIntent = event.shiftKey ? absX > 0 || absY > 0 : absX > absY * 1.08 && absX > 0.5;
    const delta = event.shiftKey && absX < 0.5 ? event.deltaY : event.deltaX;

    if (!delta || !canConsume(delta)) return;
    if (!horizontalIntent) return;

    event.preventDefault();
    clearSettleTimer();
    const base = springing ? glide.target : railElement.scrollLeft;
    const nextScrollLeft = clamp(base + delta);
    applyImmediate(nextScrollLeft);
    scheduleSettle(nextScrollLeft, 110, 120);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  }

  function handlePointerDown(event: PointerEvent) {
    if (!railElement || event.button !== 0) return;

    clearSettleTimer();
    isDragging = true;
    springing = false;
    glide.set(railElement.scrollLeft, { instant: true });
    dragPointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartScrollLeft = railElement.scrollLeft;
    dragVelocity = 0;
    lastMoveTime = event.timeStamp;
    lastMoveScrollLeft = railElement.scrollLeft;
    railElement.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent) {
    if (!railElement || !isDragging || dragPointerId !== event.pointerId) return;

    const nextScrollLeft = clamp(dragStartScrollLeft - (event.clientX - dragStartX));
    applyImmediate(nextScrollLeft);

    const deltaTime = Math.max(1, event.timeStamp - lastMoveTime);
    dragVelocity = (nextScrollLeft - lastMoveScrollLeft) / deltaTime;
    lastMoveTime = event.timeStamp;
    lastMoveScrollLeft = nextScrollLeft;
  }

  function stopDrag(pointerId: number | null, cancelled = false) {
    if (!railElement) return;

    if (dragPointerId !== null && pointerId === dragPointerId) {
      try {
        railElement.releasePointerCapture?.(dragPointerId);
      } catch {
        // Pointer capture may already be released during a fast route transition.
      }
    }

    dragPointerId = null;
    isDragging = false;

    if (!cancelled) {
      const projected = clamp(railElement.scrollLeft + dragVelocity * 180);
      const momentum = Math.min(240, Math.max(120, Math.abs(dragVelocity) * 260));
      settleToNearest(projected, momentum);
    }
  }

  function handlePointerUp(event: PointerEvent) {
    if (dragPointerId !== event.pointerId) return;
    stopDrag(event.pointerId);
  }

  function handlePointerCancel(event: PointerEvent) {
    if (dragPointerId !== event.pointerId) return;
    stopDrag(event.pointerId, true);
  }

  function handleScroll() {
    if (!railElement) return;

    syncState(railElement.scrollLeft);

    if (!isDragging && !springing) {
      scheduleSettle(railElement.scrollLeft, 125);
    }
  }

  $effect(() => {
    if (!railElement) return;

    const current = clamp(glide.current);
    if (!isDragging && Math.abs(railElement.scrollLeft - current) > 0.5) {
      railElement.scrollLeft = current;
    }

    syncState(current);

    if (springing && Math.abs(glide.target - current) <= 0.5) {
      springing = false;
    }
  });

  $effect(() => {
    if (!railElement || !wrapElement) return;

    const resizeObserver = new ResizeObserver(() => {
      const nextScrollLeft = clamp(railElement.scrollLeft);
      railElement.scrollLeft = nextScrollLeft;
      syncState(nextScrollLeft);
    });

    resizeObserver.observe(railElement);
    resizeObserver.observe(wrapElement);

    const nextScrollLeft = clamp(railElement.scrollLeft);
    applyImmediate(nextScrollLeft);

    return () => {
      resizeObserver.disconnect();
      clearSettleTimer();
    };
  });

</script>

<div
  class="card-strip"
  class:card-strip--dragging={isDragging}
  class:card-strip--at-start={atStart}
  class:card-strip--at-end={atEnd}
  class:card-strip--static={!isScrollable}
  role="region"
  aria-label={ariaLabel}
  bind:this={wrapElement}
>
  <div class="card-strip__frame" aria-hidden="true"></div>

  {#if isScrollable}
    <div class="card-strip__controls" transition:fade={{ duration: prefersReducedMotion.current ? 0 : 160 }}>
      <button
        class="card-strip__arrow card-strip__arrow--left"
        type="button"
        aria-label={leftLabel}
        disabled={atStart}
        onclick={() => step(-1)}
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        class="card-strip__arrow card-strip__arrow--right"
        type="button"
        aria-label={rightLabel}
        disabled={atEnd}
        onclick={() => step(1)}
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  {/if}

  <div
    class="card-strip__rail"
    bind:this={railElement}
    tabindex="0"
    onkeydown={handleKeydown}
    onwheel={handleWheel}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerCancel}
    onscroll={handleScroll}
  >
    {#each items as item, index (index)}
      <article class={`card-strip__card ${item.cardClass ?? ''}`}>
        {@render card(item, index)}
      </article>
    {/each}
  </div>
</div>

<style>
  .card-strip {
    position: relative;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding-inline: var(--strip-bleed-pad);
    padding-block: clamp(0.72rem, 1.25vw, 0.92rem);
    overflow: hidden;
    isolation: isolate;
    perspective: 1200px;
    transform-style: preserve-3d;
    touch-action: pan-y pinch-zoom;
  }

  .card-strip__frame {
    position: absolute;
    inset: 0.2rem clamp(0.45rem, 1.5vw, 1.1rem);
    border: 1px solid rgba(184, 115, 51, 0.2);
    border-radius: calc(var(--radius-lg) + 2px);
    background:
      linear-gradient(180deg, rgba(255, 251, 244, 0.055), transparent 24%),
      linear-gradient(180deg, rgba(30, 25, 18, 0.18), rgba(10, 11, 13, 0.08)),
      linear-gradient(180deg, rgba(12, 13, 16, 0.34), rgba(10, 11, 13, 0.08));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 18px 38px rgba(0, 0, 0, 0.16);
    clip-path: polygon(1.7% 0, 98.3% 0, 100% 100%, 0 100%);
    pointer-events: none;
    z-index: 0;
  }

  .card-strip__frame::before,
  .card-strip__frame::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  .card-strip__frame::before {
    inset: 0.3rem 1.1rem auto 1.1rem;
    height: 38%;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(255, 248, 236, 0.08), transparent 100%);
    opacity: 0.78;
  }

  .card-strip__frame::after {
    left: 1.5rem;
    right: 1.5rem;
    bottom: 0.42rem;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(184, 115, 51, 0),
      rgba(184, 115, 51, 0.52),
      rgba(229, 236, 245, 0.12),
      rgba(184, 115, 51, 0)
    );
  }

  .card-strip__rail {
    position: relative;
    z-index: 1;
    display: flex;
    gap: clamp(0.85rem, 1.4vw, 1rem);
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    overscroll-behavior-y: auto;
    padding: clamp(0.88rem, 1.55vw, 1.02rem) clamp(0.85rem, 1.8vw, 1.15rem) calc(var(--space-md) + 0.12rem);
    scroll-padding-inline: calc(var(--strip-bleed-pad) + 1rem);
    scrollbar-width: thin;
    scrollbar-color: rgba(212, 144, 92, 0.42) rgba(7, 8, 10, 0.16);
    scrollbar-gutter: stable both-edges;
    touch-action: pan-y pinch-zoom;
    cursor: grab;
  }

  .card-strip__rail::-webkit-scrollbar {
    height: 0.58rem;
  }

  .card-strip__rail::-webkit-scrollbar-track {
    background: rgba(7, 8, 10, 0.18);
    border-radius: 999px;
  }

  .card-strip__rail::-webkit-scrollbar-thumb {
    background:
      linear-gradient(180deg, rgba(240, 214, 184, 0.22), rgba(184, 115, 51, 0.38)),
      rgba(212, 144, 92, 0.34);
    border-radius: 999px;
    border: 1px solid rgba(255, 248, 236, 0.06);
  }

  .card-strip__rail::-webkit-scrollbar-thumb:hover {
    background:
      linear-gradient(180deg, rgba(240, 214, 184, 0.28), rgba(184, 115, 51, 0.48)),
      rgba(212, 144, 92, 0.42);
  }

  .card-strip__controls {
    position: absolute;
    inset: 50% clamp(0.4rem, 1.2vw, 0.95rem) auto;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    transform: translateY(-50%);
  }

  .card-strip__arrow {
    pointer-events: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border: 1px solid rgba(212, 144, 92, 0.2);
    border-radius: 999px;
    background:
      linear-gradient(180deg, rgba(20, 22, 28, 0.92), rgba(8, 9, 12, 0.92)),
      rgba(11, 12, 15, 0.84);
    box-shadow:
      0 16px 30px rgba(0, 0, 0, 0.24),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
    color: var(--stone-light);
    font-family: var(--font-mono);
    font-size: 0.95rem;
    transition:
      transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      color 0.18s ease,
      opacity 0.18s ease;
  }

  .card-strip__arrow:hover,
  .card-strip__arrow:focus-visible {
    border-color: rgba(212, 144, 92, 0.42);
    color: var(--copper-bright);
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      0 18px 34px rgba(0, 0, 0, 0.28),
      0 0 0 1px rgba(212, 144, 92, 0.18);
  }

  .card-strip__arrow:disabled {
    opacity: 0.34;
    cursor: default;
    transform: none;
    box-shadow: none;
    color: rgba(236, 240, 245, 0.68);
  }

  .card-strip--dragging .card-strip__rail {
    cursor: grabbing;
    scroll-behavior: auto;
  }

  .card-strip__card {
    flex: 0 0 clamp(17.35rem, 22vw, 20rem);
    min-height: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    position: relative;
    overflow: hidden;
    padding: 1.5rem;
    border: 1px solid var(--glass-panel-border);
    border-radius: 12px;
    background: var(--glass-panel-bg);
    backdrop-filter: blur(20px) saturate(120%);
    -webkit-backdrop-filter: blur(20px) saturate(120%);
    box-shadow: 0 12px 30px var(--shadow-sm), inset 0 1px 0 var(--glass-panel-highlight);
    transform-style: preserve-3d;
    transition:
      transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
      box-shadow 0.35s ease,
      border-color 0.25s ease,
      background 0.25s ease;
  }

  .card-strip__card::after {
    content: '';
    position: absolute;
    inset: -18% auto auto -8%;
    width: 68%;
    height: 58%;
    background: radial-gradient(circle, rgba(240, 214, 184, 0.12), rgba(240, 214, 184, 0));
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.24s ease,
      transform 0.36s cubic-bezier(0.22, 1, 0.36, 1);
    transform: translate3d(-6px, -6px, 0);
  }

  .card-strip__card:hover,
  .card-strip__card:focus-within {
    border-color: var(--copper);
    background:
      linear-gradient(180deg, rgba(255, 251, 244, 0.045), rgba(255, 251, 244, 0)),
      var(--glass-panel-bg);
    transform: translate3d(0, -3px, 28px) rotateY(-1.75deg) rotateX(0.6deg) scale(1.018);
    box-shadow:
      -12px 20px 42px var(--shadow-md),
      0 0 0 1px rgba(212, 144, 92, 0.1);
    z-index: 10;
  }

  .card-strip__card:hover::after,
  .card-strip__card:focus-within::after {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .card-strip__card.card--accent-copper {
    border-color: var(--copper);
  }

  .card-strip__card.card--accent-steel {
    border-color: var(--steel);
  }

  .card-strip__card.card--accent-patina {
    border-color: var(--patina);
  }

  .card-strip :global(.card-phase) {
    display: inline-flex;
    margin-bottom: 0.8rem;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    font-family: var(--font-head);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .card-strip :global(.card-phase.build) {
    background: var(--steel-bg-subtle);
    color: var(--steel);
  }

  .card-strip :global(.card-phase.ship) {
    background: var(--glow-muted);
    color: var(--patina);
  }

  .card-strip :global(.card-phase.loop-phase) {
    background: var(--glow-subtle);
    color: var(--copper);
  }

  .card-strip :global(.card-phase.card-phase--light) {
    background: var(--card-phase-light-bg);
    color: var(--stone-light);
  }

  .card-strip :global(.card-phase.card-phase--muted) {
    background: var(--card-phase-muted-bg);
    color: var(--steel-dark);
  }

  .card-strip :global(.card-phase.card-phase--copper) {
    background: var(--card-phase-copper-bg);
    color: var(--copper);
  }

  .card-strip :global(.card-phase.card-phase--patina) {
    background: rgba(90, 138, 122, 0.14);
    color: var(--patina);
  }

  .card-strip :global(h3) {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .card-strip :global(.card-desc) {
    margin-bottom: 1rem;
    color: var(--steel-edge-muted);
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .card-strip :global(.card-tags) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .card-strip :global(.tag) {
    padding: 0.2rem 0.55rem;
    border-radius: 4px;
    background: var(--card-tag-bg);
    color: var(--steel-dark);
    font-family: var(--font-head);
    font-size: 0.65rem;
    letter-spacing: 0.02em;
  }

  .card-strip :global(.card-trigger) {
    margin-top: 0.8rem;
    color: var(--steel-dark);
    font-size: 0.8rem;
    font-style: italic;
    opacity: 0.7;
  }

  .card-strip::before,
  .card-strip::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--strip-fade-width);
    z-index: 2;
    pointer-events: none;
    transition: opacity 0.24s ease;
  }

  .card-strip::before {
    left: 0;
    background: linear-gradient(to right, var(--stone-deep), transparent);
  }

  .card-strip::after {
    right: 0;
    background: linear-gradient(to left, var(--stone-deep), transparent);
  }

  .card-strip--at-start::before,
  .card-strip--at-end::after {
    opacity: 0.25;
  }

  @media (max-width: 720px) {
    .card-strip {
      width: 100%;
      margin-left: 0;
      padding-inline: max(0.75rem, 4vw);
      padding-block: 0.55rem;
    }

    .card-strip__frame {
      inset: 0.18rem 0.2rem;
    }

    .card-strip__controls {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .card-strip__rail {
      padding-inline: 0.75rem;
      scroll-padding-inline: 0.75rem;
    }

    .card-strip__card {
      flex-basis: min(82vw, 18rem);
    }

    .card-strip::before,
    .card-strip::after {
      width: clamp(1.75rem, 8vw, 2.5rem);
    }
  }

  @media (hover: none) {
    .card-strip__arrow {
      display: none;
    }
  }
</style>
