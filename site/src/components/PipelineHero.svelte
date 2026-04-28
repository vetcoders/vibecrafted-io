<script lang="ts">
  import { onDestroy } from 'svelte';

  type Mode = 'preview' | 'source' | 'split';
  type CopyState = 'default' | 'copied' | 'error';

  interface HeroStage {
    name: string;
    subtitle: string;
    kind?: 'core';
  }

  interface ModalLabels {
    open: string;
    close: string;
    title: string;
  }

  interface Controls {
    expand: string;
    expandLabel: string;
    source: string;
    preview: string;
    split: string;
    copy: string;
    copied: string;
    copyError: string;
    ariaSource: string;
    ariaPreview: string;
    ariaSplit: string;
    ariaCopy: string;
    ariaCopiedFeedback: string;
    ariaCopyErrorFeedback: string;
  }

  let {
    stages,
    source,
    modalLabels,
    controls,
  } = $props<{
    stages: readonly HeroStage[];
    source: string;
    modalLabels: ModalLabels;
    controls: Controls;
  }>();

  let mode = $state<Mode>('preview');
  let modalOpen = $state(false);
  let copyState = $state<CopyState>('default');
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  let splitPreviewContainer: HTMLDivElement | undefined = $state();
  let modalContainer: HTMLDivElement | undefined = $state();

  onDestroy(() => {
    if (copyTimer) clearTimeout(copyTimer);
  });

  function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Unknown error';
  }

  async function renderInto(target: HTMLDivElement | undefined, mermaidSource: string) {
    if (!target) return;
    const mermaid = (window as unknown as { mermaid?: { render: (id: string, src: string) => Promise<{ svg: string }> } }).mermaid;
    if (!mermaid) {
      target.innerHTML = '<div class="ph-mmd-error">Preview unavailable.</div>';
      return;
    }
    const id = `pipeline-mermaid-${Math.random().toString(36).slice(2, 11)}`;
    try {
      const { svg } = await mermaid.render(id, mermaidSource);
      target.innerHTML = svg;
    } catch (error) {
      target.innerHTML = `<div class="ph-mmd-error">Render error: ${getErrorMessage(error)}</div>`;
    }
  }

  $effect(() => {
    if (mode === 'split' && splitPreviewContainer) {
      renderInto(splitPreviewContainer, source);
    }
  });

  $effect(() => {
    if (modalOpen && modalContainer) {
      renderInto(modalContainer, source);
    }
  });

  $effect(() => {
    if (typeof document === 'undefined') return;
    const original = document.body.style.overflow;
    document.body.style.overflow = modalOpen ? 'hidden' : original;
    return () => {
      document.body.style.overflow = original;
    };
  });

  function toggleSource() {
    mode = mode === 'source' ? 'preview' : 'source';
  }

  function toggleSplit() {
    mode = mode === 'split' ? 'preview' : 'split';
  }

  function openModal() {
    modalOpen = true;
  }

  function closeModal() {
    modalOpen = false;
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) closeModal();
  }

  function handleModalKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && modalOpen) {
      event.preventDefault();
      closeModal();
    }
  }

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(source);
        copyState = 'copied';
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = source;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        copyState = 'copied';
      } catch {
        copyState = 'error';
      }
      textArea.remove();
    }
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => { copyState = 'default'; }, 1500);
  }

  const copyLabel = $derived(
    copyState === 'copied' ? controls.copied :
    copyState === 'error' ? controls.copyError :
    controls.copy
  );

  const copyAria = $derived(
    copyState === 'copied' ? controls.ariaCopiedFeedback :
    copyState === 'error' ? controls.ariaCopyErrorFeedback :
    controls.ariaCopy
  );
</script>

<svelte:window onkeydown={handleModalKeydown} />

<div class="ph-shell" data-mode={mode}>
  <div class="ph-toolbar">
    <button
      class="ph-btn ph-btn--expand"
      type="button"
      aria-label={controls.expandLabel}
      onclick={openModal}
    >
      <span aria-hidden="true">⤢</span>
      <span class="ph-btn__label">{controls.expand}</span>
    </button>
    <button
      class="ph-btn"
      type="button"
      aria-label={mode === 'source' ? controls.ariaPreview : controls.ariaSource}
      onclick={toggleSource}
    >{mode === 'source' ? controls.preview : controls.source}</button>
    <button
      class="ph-btn"
      class:is-active={mode === 'split'}
      type="button"
      aria-label={controls.ariaSplit}
      aria-pressed={mode === 'split'}
      onclick={toggleSplit}
    >{controls.split}</button>
    <button
      class="ph-btn ph-btn--copy"
      class:is-copied={copyState === 'copied'}
      class:is-error={copyState === 'error'}
      type="button"
      aria-label={copyAria}
      onclick={handleCopy}
    >{copyLabel}</button>
  </div>

  <div class="ph-hero">
    {#each stages as stage, idx (stage.name)}
      <div class="ph-stage" class:ph-stage--core={stage.kind === 'core'}>
        <span class="ph-stage__index">{String(idx + 1).padStart(2, '0')}</span>
        <h3 class="ph-stage__name">{stage.name}</h3>
        <p class="ph-stage__subtitle">{stage.subtitle}</p>
      </div>
      {#if idx < stages.length - 1}
        <div class="ph-connector" aria-hidden="true">
          <span class="ph-connector__line"></span>
          <span class="ph-connector__arrow">→</span>
        </div>
      {/if}
    {/each}
  </div>

  <div class="ph-source">
    <pre><code>{source}</code></pre>
  </div>

  <div class="ph-tech-preview" bind:this={splitPreviewContainer} aria-hidden={mode !== 'split'}></div>
</div>

{#if modalOpen}
  <div
    class="ph-modal"
    role="dialog"
    aria-modal="true"
    aria-label={modalLabels.title}
    onclick={handleBackdropClick}
    onkeydown={handleModalKeydown}
    tabindex="-1"
  >
    <div class="ph-modal__panel">
      <header class="ph-modal__head">
        <h3 class="ph-modal__title">{modalLabels.title}</h3>
        <button
          class="ph-modal__close"
          type="button"
          aria-label={modalLabels.close}
          onclick={closeModal}
        >×</button>
      </header>
      <div class="ph-modal__body" bind:this={modalContainer}></div>
    </div>
  </div>
{/if}

<style>
  /*
   * Token surface (override any from a parent class to re-skin):
   *   --ph-stage-bg, --ph-stage-bg-overlay, --ph-stage-border, --ph-stage-radius
   *   --ph-name-color, --ph-name-font, --ph-name-weight
   *   --ph-subtitle-color, --ph-subtitle-font
   *   --ph-index-color, --ph-index-font
   *   --ph-connector-line, --ph-connector-arrow
   *   --ph-core-accent, --ph-core-accent-bright, --ph-core-border,
   *   --ph-core-inset, --ph-core-glow, --ph-core-bg-radial,
   *   --ph-core-name-color, --ph-core-subtitle-color, --ph-core-shadow
   *   --ph-btn-bg, --ph-btn-border, --ph-btn-color,
   *   --ph-btn-hover-color, --ph-btn-hover-border,
   *   --ph-btn-accent-color, --ph-btn-accent-bright, --ph-btn-accent-bg,
   *   --ph-btn-accent-bg-hover, --ph-btn-accent-border, --ph-btn-radius,
   *   --ph-btn-error-color, --ph-btn-error-border
   *   --ph-source-bg, --ph-source-border, --ph-source-color,
   *   --ph-source-font, --ph-source-radius
   *   --ph-tech-bg, --ph-tech-border, --ph-tech-color
   *   --ph-modal-backdrop, --ph-modal-panel-bg, --ph-modal-panel-border,
   *   --ph-modal-panel-radius, --ph-modal-title-color,
   *   --ph-modal-close-bg, --ph-modal-close-color, --ph-modal-close-hover-bg
   *   --ph-mmd-error-color
   * Each var() below carries a legacy default fallback; defining the property
   * on an ancestor element propagates through inheritance.
   */
  .ph-shell {
    position: relative;
    padding-top: 3.4rem;
  }

  /* ─── Toolbar ─────────────────────────────────────────────── */
  .ph-toolbar {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    z-index: 2;
  }

  .ph-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 2.2rem;
    padding: 0.3rem 0.7rem;
    border: 1px solid var(--ph-btn-border, var(--card-border));
    border-radius: var(--ph-btn-radius, var(--radius-sm, 6px));
    background: var(--ph-btn-bg, var(--card-bg));
    color: var(--ph-btn-color, var(--steel-dark));
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  }

  .ph-btn:hover,
  .ph-btn:focus-visible {
    color: var(--ph-btn-hover-color, var(--steel-edge));
    border-color: var(--ph-btn-hover-border, var(--steel-border-soft, rgba(185, 195, 204, 0.22)));
  }

  .ph-btn.is-active,
  .ph-btn[aria-pressed='true'] {
    color: var(--ph-btn-accent-color, var(--copper, #d97745));
    border-color: var(--ph-btn-accent-border, var(--copper-border, rgba(217, 119, 69, 0.4)));
    background: var(--ph-btn-accent-bg, rgba(217, 119, 69, 0.08));
  }

  .ph-btn--expand {
    color: var(--ph-btn-accent-color, var(--copper, #d97745));
    border-color: var(--ph-btn-accent-border, var(--copper-border, rgba(217, 119, 69, 0.4)));
    background: var(--ph-btn-accent-bg, rgba(217, 119, 69, 0.08));
  }

  .ph-btn--expand:hover,
  .ph-btn--expand:focus-visible {
    color: var(--ph-btn-accent-bright, var(--copper-bright, #e28a5c));
    border-color: var(--ph-btn-accent-color, var(--copper, #d97745));
    background: var(--ph-btn-accent-bg-hover, rgba(217, 119, 69, 0.14));
  }

  .ph-btn--copy.is-copied {
    color: var(--ph-btn-accent-bright, var(--copper-bright, #e28a5c));
    border-color: var(--ph-btn-accent-color, var(--copper, #d97745));
  }

  .ph-btn--copy.is-error {
    color: var(--ph-btn-error-color, #e08070);
    border-color: var(--ph-btn-error-border, rgba(224, 128, 112, 0.5));
  }

  /* ─── Mode visibility ─────────────────────────────────────── */
  .ph-source,
  .ph-tech-preview {
    display: none;
  }

  .ph-shell[data-mode='source'] .ph-hero {
    display: none;
  }
  .ph-shell[data-mode='source'] .ph-source {
    display: block;
  }

  .ph-shell[data-mode='split'] .ph-hero {
    display: none;
  }
  .ph-shell[data-mode='split'] .ph-source,
  .ph-shell[data-mode='split'] .ph-tech-preview {
    display: flex;
  }
  .ph-shell[data-mode='split'] {
    --ph-split-cols: 1fr 1fr;
  }
  .ph-shell[data-mode='split'] {
    display: grid;
    grid-template-areas:
      "toolbar toolbar"
      "source preview";
    grid-template-columns: var(--ph-split-cols);
    gap: 1.5rem;
    padding-top: 3.4rem;
  }
  .ph-shell[data-mode='split'] .ph-toolbar {
    grid-area: toolbar;
    position: relative;
    justify-self: end;
  }
  .ph-shell[data-mode='split'] .ph-source {
    grid-area: source;
  }
  .ph-shell[data-mode='split'] .ph-tech-preview {
    grid-area: preview;
  }

  /* ─── Hero diagram ────────────────────────────────────────── */
  .ph-hero {
    display: flex;
    align-items: stretch;
    gap: clamp(0.4rem, 0.9vw, 0.9rem);
    width: 100%;
    padding: clamp(1.4rem, 3vw, 2.4rem) 0.4rem;
  }

  .ph-stage {
    flex: 1 1 0;
    min-width: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: clamp(1.1rem, 2vw, 1.55rem) clamp(0.8rem, 1.4vw, 1.1rem) clamp(1rem, 1.8vw, 1.35rem);
    border: 1px solid var(--ph-stage-border, var(--card-border));
    border-radius: var(--ph-stage-radius, var(--radius-md, 12px));
    background:
      var(--ph-stage-bg-overlay, linear-gradient(180deg, rgba(255, 255, 255, 0.025) 0%, transparent 60%)),
      var(--ph-stage-bg, var(--card-bg));
    text-align: left;
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .ph-stage__index {
    font-family: var(--ph-index-font, var(--font-mono));
    font-size: 0.66rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--ph-index-color, var(--steel-dark));
    opacity: 0.85;
  }

  .ph-stage__name {
    margin: 0;
    font-family: var(--ph-name-font, var(--font-head));
    font-weight: var(--ph-name-weight, 500);
    font-size: clamp(1.4rem, 2.2vw, 1.95rem);
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--ph-name-color, var(--steel-edge, var(--stone-light)));
  }

  .ph-stage__subtitle {
    margin: 0;
    font-family: var(--ph-subtitle-font, var(--font-mono));
    font-size: 0.74rem;
    line-height: 1.5;
    letter-spacing: 0.02em;
    color: var(--ph-subtitle-color, var(--steel-edge-muted, rgba(211, 220, 228, 0.72)));
    text-transform: lowercase;
  }

  /* ─── Convergence (core variant) ──────────────────────────── */
  .ph-stage--core {
    flex-grow: 1.05;
    border-color: var(--ph-core-border, var(--copper-border, rgba(217, 119, 69, 0.55)));
    background:
      radial-gradient(120% 100% at 50% 0%, var(--ph-core-bg-radial, rgba(217, 119, 69, 0.18)) 0%, transparent 60%),
      var(--ph-stage-bg-overlay, linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, transparent 70%)),
      var(--ph-stage-bg, var(--card-bg));
    box-shadow:
      inset 0 0 0 1px var(--ph-core-inset, rgba(217, 119, 69, 0.32)),
      0 0 28px var(--ph-core-glow, rgba(217, 119, 69, 0.18)),
      0 18px 36px var(--ph-core-shadow, var(--shadow-soft, rgba(8, 12, 17, 0.4)));
    transform: translateY(-4px);
  }

  .ph-stage--core .ph-stage__index {
    color: var(--ph-core-accent, var(--copper, #d97745));
    opacity: 1;
  }

  .ph-stage--core .ph-stage__name {
    color: var(--ph-core-name-color, var(--copper-bright, #e28a5c));
  }

  .ph-stage--core .ph-stage__subtitle {
    color: var(--ph-core-subtitle-color, rgba(255, 217, 189, 0.78));
  }

  .ph-stage--core::before,
  .ph-stage--core::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1px solid var(--ph-core-border, var(--copper-border, rgba(217, 119, 69, 0.55)));
    pointer-events: none;
  }

  .ph-stage--core::before {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  }

  .ph-stage--core::after {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
  }

  /* ─── Connectors ──────────────────────────────────────────── */
  .ph-connector {
    flex: 0 0 auto;
    align-self: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    color: var(--ph-connector-arrow, var(--steel-edge-muted, rgba(211, 220, 228, 0.6)));
    font-family: var(--font-mono);
  }

  .ph-connector__line {
    display: inline-block;
    width: clamp(0.6rem, 1.2vw, 1.2rem);
    height: 1px;
    background: var(--ph-connector-line, var(--steel-border-soft, rgba(185, 195, 204, 0.22)));
  }

  .ph-connector__arrow {
    font-size: 0.95rem;
    line-height: 1;
    color: var(--ph-connector-arrow, var(--steel-edge-muted, rgba(211, 220, 228, 0.6)));
  }

  /* highlight connectors flowing into / out of Convergence (core) */
  .ph-stage--core + .ph-connector .ph-connector__arrow {
    color: var(--ph-core-accent, var(--copper, #d97745));
  }

  /* ─── Source view ─────────────────────────────────────────── */
  .ph-source {
    padding: 1.1rem 1.2rem;
    border: 1px solid var(--ph-source-border, var(--card-border));
    border-radius: var(--ph-source-radius, var(--radius-sm));
    background: var(--ph-source-bg, var(--surface-glass, rgba(15, 22, 29, 0.22)));
    overflow-x: auto;
  }

  .ph-source pre {
    margin: 0;
  }

  .ph-source code {
    display: block;
    white-space: pre;
    color: var(--ph-source-color, var(--stone-light));
    font-family: var(--ph-source-font, var(--font-mono));
    font-size: 0.78rem;
    line-height: 1.55;
  }

  /* ─── Tech preview (split) ────────────────────────────────── */
  .ph-tech-preview {
    align-items: center;
    justify-content: center;
    overflow-x: auto;
    padding: var(--space-md, 1rem);
    border: 1px solid var(--ph-tech-border, var(--glass-panel-border, var(--card-border)));
    border-radius: var(--ph-source-radius, var(--radius-sm));
    background: var(--ph-tech-bg, var(--surface-glass, rgba(15, 22, 29, 0.22)));
    color: var(--ph-tech-color, var(--stone-light));
    text-align: center;
    width: 100%;
    min-height: 12rem;
  }

  :global(.ph-tech-preview svg) {
    display: block;
    margin: auto;
    max-width: 100%;
    height: auto;
  }

  :global(.ph-mmd-error) {
    color: var(--ph-mmd-error-color, var(--copper-bright, #e28a5c));
    font-family: var(--font-mono);
    font-size: 0.74rem;
    letter-spacing: 0.04em;
  }

  /* ─── Modal (Expand) ──────────────────────────────────────── */
  .ph-modal {
    position: fixed;
    inset: 0;
    z-index: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(0.75rem, 3vw, 2rem);
    background: var(--ph-modal-backdrop, rgba(5, 8, 13, 0.78));
    backdrop-filter: blur(18px) saturate(118%);
    -webkit-backdrop-filter: blur(18px) saturate(118%);
    animation: ph-modal-in 0.18s ease;
  }

  .ph-modal__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: min(96vw, 1400px);
    max-height: min(94vh, 1000px);
    background: var(--ph-modal-panel-bg, var(--bg-deep, #080c11));
    border: 1px solid var(--ph-modal-panel-border, var(--glass-panel-border, var(--card-border)));
    border-radius: var(--ph-modal-panel-radius, var(--radius-lg, 20px));
    box-shadow:
      0 28px 72px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 var(--glass-panel-highlight, rgba(230, 232, 235, 0.08));
    overflow: hidden;
  }

  .ph-modal__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--ph-modal-panel-border, var(--glass-panel-border, var(--card-border)));
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent);
  }

  .ph-modal__title {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ph-modal-title-color, var(--ink, var(--stone-light)));
  }

  .ph-modal__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid var(--ph-modal-panel-border, var(--glass-panel-border, var(--card-border)));
    border-radius: 999px;
    background: var(--ph-modal-close-bg, rgba(14, 18, 24, 0.62));
    color: var(--ph-modal-close-color, var(--ink, var(--stone-light)));
    font-family: var(--font-mono);
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
    transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
  }

  .ph-modal__close:hover,
  .ph-modal__close:focus-visible {
    border-color: var(--ph-core-accent, var(--copper));
    color: var(--ph-core-accent, var(--copper));
    background: var(--ph-modal-close-hover-bg, rgba(217, 119, 69, 0.12));
  }

  .ph-modal__body {
    flex: 1 1 auto;
    min-height: 0;
    padding: clamp(1rem, 2.4vw, 1.75rem);
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.ph-modal__body svg) {
    display: block;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }

  @keyframes ph-modal-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* ─── Responsive ──────────────────────────────────────────── */
  @media (max-width: 980px) {
    .ph-hero {
      flex-direction: column;
      gap: 0.45rem;
      padding: 1.4rem 0;
    }

    .ph-stage {
      width: 100%;
      flex: 0 0 auto;
    }

    .ph-stage--core {
      transform: none;
    }

    .ph-connector {
      flex-direction: column;
      gap: 0.15rem;
      transform: rotate(90deg);
      margin: 0.15rem 0;
    }

    .ph-shell[data-mode='split'] {
      grid-template-columns: 1fr;
      grid-template-areas:
        "toolbar"
        "source"
        "preview";
    }
  }

  @media (max-width: 720px) {
    .ph-toolbar {
      gap: 0.3rem;
    }

    .ph-btn {
      min-height: 2rem;
      padding: 0.3rem 0.55rem;
      font-size: 0.65rem;
    }

    .ph-btn__label {
      display: none;
    }

    .ph-modal__panel {
      width: 100vw;
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ph-stage,
    .ph-btn,
    .ph-modal {
      transition: none;
      animation: none;
    }
  }
</style>
