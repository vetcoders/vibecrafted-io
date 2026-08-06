<script lang="ts">
  /**
   * Floating, resizable single-chrome product proof.
   * Inspiration: vetcoders-io FloatingTerminal (drag/resize) — not a live shell.
   * One decorative window; body fill is edge-to-edge capture; multi-shot browse.
   */
  import { onMount } from 'svelte';
  import {
    applyResize,
    clampPosition,
    clampShotIndex,
    DEFAULT_PANEL_HEIGHT,
    DEFAULT_PANEL_WIDTH,
    MIN_PANEL_HEIGHT,
    MIN_PANEL_WIDTH,
    nextShotIndex,
    type PanelSize,
    type ResizeStart,
  } from '../lib/floating-frame';

  export type ProductShot = {
    id: string;
    src: string;
    label: string;
    title: string;
    body: string;
    alt: string;
    windowTitle?: string;
  };

  interface Props {
    shots: ProductShot[];
    ariaLabel?: string;
    browseLabel?: string;
  }

  let {
    shots,
    ariaLabel = 'Product proof — resizable window',
    browseLabel = 'Browse captures',
  }: Props = $props();

  let shotIndex = $state(0);
  let size = $state<PanelSize>({
    width: DEFAULT_PANEL_WIDTH,
    height: DEFAULT_PANEL_HEIGHT,
  });
  let pos = $state({ left: 0, top: 0 });
  let dragging = $state(false);
  let resizing = $state(false);
  let stageEl = $state<HTMLDivElement | null>(null);

  const active = $derived(shots[clampShotIndex(shotIndex, shots.length)] ?? null);
  const windowTitle = $derived(
    active?.windowTitle ?? (active ? `vc-frame · ${active.label}` : 'vc-frame'),
  );

  let dragStart: { x: number; y: number; left: number; top: number } | null = null;
  let resizeStart: ResizeStart | null = null;

  function stageBounds() {
    if (!stageEl) return { width: 1280, height: 720 };
    const r = stageEl.getBoundingClientRect();
    return { width: r.width, height: r.height };
  }

  function maxSize(): PanelSize {
    const b = stageBounds();
    return {
      width: Math.max(MIN_PANEL_WIDTH, b.width - 16),
      height: Math.max(MIN_PANEL_HEIGHT, b.height - 16),
    };
  }

  function selectShot(i: number) {
    shotIndex = clampShotIndex(i, shots.length);
  }

  function onTitlePointerDown(e: PointerEvent) {
    if ((e.target as HTMLElement).closest('.fpp__tabs')) return;
    e.preventDefault();
    dragging = true;
    dragStart = { x: e.clientX, y: e.clientY, left: pos.left, top: pos.top };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onTitlePointerMove(e: PointerEvent) {
    if (!dragging || !dragStart) return;
    const b = stageBounds();
    const next = clampPosition(
      dragStart.left + (e.clientX - dragStart.x),
      dragStart.top + (e.clientY - dragStart.y),
      size,
      b.width,
      b.height,
    );
    pos = next;
  }

  function onTitlePointerUp(e: PointerEvent) {
    dragging = false;
    dragStart = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }

  function onResizePointerDown(e: PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    resizing = true;
    resizeStart = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onResizePointerMove(e: PointerEvent) {
    if (!resizing || !resizeStart) return;
    const max = maxSize();
    size = applyResize(
      resizeStart,
      e.clientX,
      e.clientY,
      MIN_PANEL_WIDTH,
      MIN_PANEL_HEIGHT,
      max.width,
      max.height,
    );
    const b = stageBounds();
    pos = clampPosition(pos.left, pos.top, size, b.width, b.height);
  }

  function onResizePointerUp(e: PointerEvent) {
    resizing = false;
    resizeStart = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      shotIndex = nextShotIndex(shotIndex, 1, shots.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      shotIndex = nextShotIndex(shotIndex, -1, shots.length);
    }
  }

  /**
   * One-shot layout on mount only.
   * Do NOT use $effect that writes `size`/`pos` and then reads them — that
   * re-subscribes and throws effect_update_depth_exceeded, killing handlers.
   * Always compute with a local `nextSize` (never read the reactive size after write).
   */
  onMount(() => {
    if (!stageEl) return;
    const b = stageEl.getBoundingClientRect();
    const maxW = Math.max(MIN_PANEL_WIDTH, b.width - 16);
    const maxH = Math.max(MIN_PANEL_HEIGHT, b.height - 16);
    const nextSize: PanelSize = {
      width: Math.min(DEFAULT_PANEL_WIDTH, maxW),
      height: Math.min(DEFAULT_PANEL_HEIGHT, maxH),
    };
    size = nextSize;
    pos = {
      left: Math.max(8, b.width - nextSize.width - 24),
      top: Math.max(8, (b.height - nextSize.height) / 2),
    };
  });
</script>

<div
  class="fpp"
  class:fpp--dragging={dragging}
  class:fpp--resizing={resizing}
  bind:this={stageEl}
  role="region"
  aria-label={ariaLabel}
  tabindex="0"
  onkeydown={onKeydown}
>
  {#if active}
    <div
      class="fpp__panel vc-termwin vc-termwin--hero"
      style:left={`${pos.left}px`}
      style:top={`${pos.top}px`}
      style:width={`${size.width}px`}
      style:height={`${size.height}px`}
    >
      <div
        class="fpp__titlebar vc-termwin__titlebar"
        onpointerdown={onTitlePointerDown}
        onpointermove={onTitlePointerMove}
        onpointerup={onTitlePointerUp}
        onpointercancel={onTitlePointerUp}
      >
        <span class="vc-termwin__lights" aria-hidden="true">
          <span class="vc-termwin__dot vc-termwin__dot--close"></span>
          <span class="vc-termwin__dot vc-termwin__dot--min"></span>
          <span class="vc-termwin__dot vc-termwin__dot--max"></span>
        </span>
        <span class="vc-termwin__title">{windowTitle}</span>
      </div>

      <div class="fpp__tabs" role="tablist" aria-label={browseLabel}>
        {#each shots as shot, i (shot.id)}
          <button
            type="button"
            role="tab"
            class="fpp__tab"
            class:fpp__tab--active={i === shotIndex}
            aria-selected={i === shotIndex}
            id={`fpp-tab-${shot.id}`}
            onclick={() => selectShot(i)}
          >
            {shot.label}
          </button>
        {/each}
      </div>

      <div class="fpp__body vc-termwin__body" role="tabpanel" aria-labelledby={`fpp-tab-${active.id}`}>
        <img
          class="fpp__img"
          src={active.src}
          alt={active.alt}
          width="1600"
          height="1000"
          decoding="async"
          draggable="false"
        />
      </div>

      <div class="fpp__cap">
        <strong class="fpp__cap-title">{active.title}</strong>
        <span class="fpp__cap-body">{active.body}</span>
      </div>

      <button
        type="button"
        class="fpp__resize"
        aria-label="Resize product frame"
        onpointerdown={onResizePointerDown}
        onpointermove={onResizePointerMove}
        onpointerup={onResizePointerUp}
        onpointercancel={onResizePointerUp}
      ></button>
    </div>
  {/if}
</div>

<style>
  .fpp {
    position: relative;
    width: 100%;
    min-height: min(68vh, 640px);
    height: min(72vh, 680px);
    margin-bottom: 40px;
    touch-action: none;
    outline: none;
  }

  .fpp:focus-visible {
    box-shadow: 0 0 0 1px rgba(245, 244, 239, 0.2);
    border-radius: 4px;
  }

  .fpp__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    min-width: 360px;
    min-height: 280px;
    z-index: 2;
    /* chrome from terminal-window.css; size driven by inline styles */
  }

  .fpp__titlebar {
    cursor: grab;
    flex-shrink: 0;
  }

  .fpp--dragging .fpp__titlebar,
  .fpp--resizing .fpp__titlebar {
    cursor: grabbing;
  }

  .fpp__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 8px 10px;
    background: rgba(20, 22, 28, 0.96);
    border-bottom: 1px solid rgba(245, 244, 239, 0.08);
    flex-shrink: 0;
  }

  .fpp__tab {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 10px;
    border-radius: 2px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--fg-on-dark-mute);
    cursor: pointer;
  }

  .fpp__tab:hover,
  .fpp__tab:focus-visible {
    color: var(--fg-on-dark);
    border-color: rgba(245, 244, 239, 0.16);
  }

  .fpp__tab--active {
    color: var(--ink);
    background: var(--accent);
    border-color: var(--accent);
  }

  .fpp__body {
    flex: 1 1 auto;
    min-height: 0;
    overflow: hidden;
    background: #0a0c10;
  }

  .fpp__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top left;
    user-select: none;
    -webkit-user-drag: none;
  }

  .fpp__cap {
    flex-shrink: 0;
    padding: 10px 14px 12px;
    background: rgba(12, 14, 18, 0.98);
    border-top: 1px solid rgba(245, 244, 239, 0.08);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .fpp__cap-title {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 15px;
    letter-spacing: -0.02em;
    color: var(--fg-on-dark);
  }

  .fpp__cap-body {
    font-family: var(--font-body);
    font-size: 12px;
    line-height: 1.45;
    color: var(--fg-on-dark-dim);
    max-width: 72ch;
  }

  .fpp__resize {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 0;
    cursor: nwse-resize;
    background:
      linear-gradient(
        135deg,
        transparent 0 46%,
        rgba(245, 244, 239, 0.35) 46% 52%,
        transparent 52% 62%,
        rgba(245, 244, 239, 0.55) 62% 68%,
        transparent 68%
      );
    background-color: transparent;
  }

  .fpp__resize:focus-visible {
    outline: 1px solid var(--accent);
    outline-offset: 1px;
  }

  @media (max-width: 900px) {
    .fpp {
      height: auto;
      min-height: 420px;
    }

    .fpp__panel {
      position: relative;
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      height: auto !important;
      min-height: 360px;
    }

    .fpp__body {
      min-height: 220px;
      max-height: 48vh;
    }

    .fpp__resize {
      display: none;
    }
  }
</style>
