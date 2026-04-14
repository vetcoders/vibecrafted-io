<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import { fade, scale } from 'svelte/transition';

  type Accent = 'steel' | 'copper' | 'patina' | 'amber' | 'muted';

  let {
    open = false,
    accent = 'steel',
    eyebrow = '',
    title = '',
    summary = '',
    bodyHtml = '',
    bullets = [],
    tags = [],
    footerHtml = '',
    detailsLabel = '',
    tagsLabel = '',
    footerLabel = '',
    closeLabel = 'Close',
    onclose,
  }: {
    open?: boolean;
    accent?: Accent;
    eyebrow?: string;
    title?: string;
    summary?: string;
    bodyHtml?: string;
    bullets?: string[];
    tags?: string[];
    footerHtml?: string;
    detailsLabel?: string;
    tagsLabel?: string;
    footerLabel?: string;
    closeLabel?: string;
    onclose?: () => void;
  } = $props();

  const transitionDuration = $derived(prefersReducedMotion.current ? 0 : 190);

  function closeDialog() {
    onclose?.();
  }

  function handleWindowKeydown(event: KeyboardEvent) {
    if (open && event.key === 'Escape') {
      event.preventDefault();
      closeDialog();
    }
  }

  $effect(() => {
    if (!open || typeof document === 'undefined') return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  });
</script>

<svelte:window onkeydown={handleWindowKeydown} />

{#if open}
  <div class="knowledge-dialog-shell">
    <button
      type="button"
      class="knowledge-dialog__backdrop"
      aria-label={closeLabel}
      onclick={closeDialog}
      transition:fade={{ duration: transitionDuration }}
    ></button>

    <div
      class={`knowledge-dialog knowledge-dialog--${accent}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      transition:scale={{ duration: transitionDuration, start: 0.92 }}
    >
      <button type="button" class="knowledge-dialog__close" aria-label={closeLabel} onclick={closeDialog}>
        <span aria-hidden="true">✕</span>
      </button>

      {#if eyebrow}
        <div class="knowledge-dialog__eyebrow">{eyebrow}</div>
      {/if}

      <h3 class="knowledge-dialog__title">{title}</h3>

      {#if summary}
        <p class="knowledge-dialog__summary">{summary}</p>
      {/if}

      {#if bodyHtml}
        <div class="knowledge-dialog__body">{@html bodyHtml}</div>
      {/if}

      {#if bullets.length > 0}
        <div class="knowledge-dialog__block">
          {#if detailsLabel}
            <div class="knowledge-dialog__label">{detailsLabel}</div>
          {/if}
          <ul class="knowledge-dialog__bullets">
            {#each bullets as bullet}
              <li>{bullet}</li>
            {/each}
          </ul>
        </div>
      {/if}

      {#if tags.length > 0}
        <div class="knowledge-dialog__block">
          {#if tagsLabel}
            <div class="knowledge-dialog__label">{tagsLabel}</div>
          {/if}
          <div class="knowledge-dialog__tags">
            {#each tags as tag}
              <span>{tag}</span>
            {/each}
          </div>
        </div>
      {/if}

      {#if footerHtml}
        <div class="knowledge-dialog__block">
          {#if footerLabel}
            <div class="knowledge-dialog__label">{footerLabel}</div>
          {/if}
          <div class="knowledge-dialog__footer">{@html footerHtml}</div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .knowledge-dialog-shell {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: grid;
    place-items: center;
    padding: clamp(1rem, 2vw, 1.6rem);
  }

  .knowledge-dialog__backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background:
      radial-gradient(circle at 18% 14%, rgba(225, 176, 116, 0.08), transparent 24%),
      rgba(5, 7, 10, 0.72);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .knowledge-dialog {
    --dialog-accent: rgba(175, 194, 209, 0.92);
    position: relative;
    width: min(100%, 54rem);
    max-height: min(84vh, 48rem);
    overflow: auto;
    padding: clamp(1.15rem, 2vw, 1.55rem);
    border: 1px solid color-mix(in srgb, var(--dialog-accent) 22%, rgba(255, 255, 255, 0.08));
    border-radius: 1.45rem;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent 22%),
      radial-gradient(circle at top left, color-mix(in srgb, var(--dialog-accent) 12%, transparent), transparent 34%),
      rgba(10, 12, 15, 0.9);
    box-shadow:
      0 34px 72px rgba(0, 0, 0, 0.44),
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 0 0 1px color-mix(in srgb, var(--dialog-accent) 8%, transparent);
    backdrop-filter: blur(24px) saturate(118%);
    -webkit-backdrop-filter: blur(24px) saturate(118%);
  }

  .knowledge-dialog--steel {
    --dialog-accent: rgba(175, 194, 209, 0.92);
  }

  .knowledge-dialog--copper {
    --dialog-accent: rgba(212, 154, 112, 0.94);
  }

  .knowledge-dialog--patina {
    --dialog-accent: rgba(142, 199, 170, 0.94);
  }

  .knowledge-dialog--amber {
    --dialog-accent: rgba(225, 181, 111, 0.94);
  }

  .knowledge-dialog--muted {
    --dialog-accent: rgba(179, 186, 193, 0.92);
  }

  .knowledge-dialog__close {
    position: absolute;
    top: 0.9rem;
    right: 0.9rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.35rem;
    height: 2.35rem;
    border: 1px solid color-mix(in srgb, var(--dialog-accent) 30%, transparent);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.04);
    color: color-mix(in srgb, var(--dialog-accent) 82%, white 18%);
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background 160ms ease;
  }

  .knowledge-dialog__close:hover,
  .knowledge-dialog__close:focus-visible {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--dialog-accent) 55%, transparent);
    background: rgba(255, 255, 255, 0.07);
  }

  .knowledge-dialog__eyebrow,
  .knowledge-dialog__label {
    display: inline-flex;
    width: fit-content;
    color: color-mix(in srgb, var(--dialog-accent) 82%, white 18%);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .knowledge-dialog__eyebrow {
    margin-bottom: 0.7rem;
    padding: 0.26rem 0.62rem;
    border: 1px solid color-mix(in srgb, var(--dialog-accent) 26%, transparent);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
  }

  .knowledge-dialog__title {
    margin: 0 2.6rem 0.65rem 0;
    color: rgba(246, 244, 238, 0.98);
    font-size: clamp(1.5rem, 3vw, 2.1rem);
    line-height: 1.02;
    letter-spacing: -0.03em;
  }

  .knowledge-dialog__summary {
    margin: 0 0 0.9rem;
    color: rgba(217, 223, 231, 0.9);
    font-size: 1.02rem;
    line-height: 1.7;
  }

  .knowledge-dialog__body {
    color: rgba(205, 212, 221, 0.84);
    line-height: 1.72;
  }

  .knowledge-dialog__block + .knowledge-dialog__block,
  .knowledge-dialog__body + .knowledge-dialog__block {
    margin-top: 1.15rem;
  }

  .knowledge-dialog__bullets {
    display: grid;
    gap: 0.7rem;
    margin: 0.55rem 0 0;
    padding: 0;
    list-style: none;
  }

  .knowledge-dialog__bullets li {
    position: relative;
    padding-left: 1rem;
    color: rgba(232, 236, 242, 0.92);
    line-height: 1.65;
  }

  .knowledge-dialog__bullets li::before {
    content: '';
    position: absolute;
    top: 0.68em;
    left: 0;
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--dialog-accent) 92%, white 8%);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--dialog-accent) 14%, transparent);
  }

  .knowledge-dialog__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.6rem;
  }

  .knowledge-dialog__tags span {
    padding: 0.28rem 0.62rem;
    border: 1px solid color-mix(in srgb, var(--dialog-accent) 22%, transparent);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    color: rgba(228, 233, 239, 0.88);
    font-size: 0.78rem;
  }

  .knowledge-dialog__footer {
    margin-top: 0.55rem;
    color: rgba(214, 220, 228, 0.84);
    line-height: 1.7;
  }

  @media (max-width: 720px) {
    .knowledge-dialog-shell {
      align-items: end;
      padding: 0.75rem;
    }

    .knowledge-dialog {
      width: 100%;
      max-height: min(84vh, 42rem);
      border-radius: 1.3rem;
      padding: 1rem;
    }

    .knowledge-dialog__title {
      font-size: 1.34rem;
    }
  }
</style>
