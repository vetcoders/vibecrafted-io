<script lang="ts">
  import { onDestroy } from 'svelte';

  type MermaidMode = 'code' | 'preview' | 'split';
  type CopyState = 'default' | 'copied' | 'error';

  interface ModalLabels {
    open: string;
    close: string;
    title: string;
  }

  let {
    code = '',
    highlightedCode = '',
    fullCode = '',
    modalLabels,
  } = $props<{
    code: string;
    highlightedCode?: string;
    fullCode?: string;
    modalLabels?: ModalLabels;
  }>();

  let mode = $state<MermaidMode>('preview');
  let previewContainer: HTMLDivElement | undefined = $state();
  let modalContainer: HTMLDivElement | undefined = $state();
  let modalOpen = $state(false);
  let copyState = $state<CopyState>('default');
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  const displayCode = $derived(highlightedCode || code);
  const hasFullDiagram = $derived(Boolean(fullCode && fullCode.trim().length > 0));
  const labels = $derived<ModalLabels>({
    open: modalLabels?.open ?? 'Expand full pipeline',
    close: modalLabels?.close ?? 'Close pipeline diagram',
    title: modalLabels?.title ?? 'Full pipeline',
  });

  onDestroy(() => {
    if (copyTimer) {
      clearTimeout(copyTimer);
    }
  });

  function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Unknown error';
  }

  async function renderInto(target: HTMLDivElement | undefined, source: string) {
    if (!target) return;
    const mermaid = window.mermaid;
    if (!mermaid) {
      target.innerHTML = '<div class="mmd-error">Preview unavailable.</div>';
      return;
    }
    const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
    try {
      const { svg } = await mermaid.render(id, source);
      target.innerHTML = svg;
    } catch (error) {
      target.innerHTML = `<div class="mmd-error">Render error: ${getErrorMessage(error)}</div>`;
    }
  }

  $effect(() => {
    if (mode === 'preview' || mode === 'split') {
      renderInto(previewContainer, code);
    }
  });

  $effect(() => {
    if (modalOpen && hasFullDiagram) {
      renderInto(modalContainer, fullCode);
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

  function toggleMode() {
    mode = mode === 'code' ? 'preview' : 'code';
  }

  function splitMode() {
    mode = 'split';
  }

  function openModal() {
    if (!hasFullDiagram) return;
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
        await navigator.clipboard.writeText(code);
        copyState = 'copied';
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = code;
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
</script>

<svelte:window onkeydown={handleModalKeydown} />

<div class="mmd-shell" data-mode={mode}>
  <div class="mmd-toolbar">
    {#if hasFullDiagram}
      <button
        class="mmd-expand"
        type="button"
        aria-label={labels.open}
        onclick={openModal}
      >
        <span aria-hidden="true">⤢</span>
        <span class="mmd-expand__label">Expand</span>
      </button>
    {/if}
    <button
      class="mmd-split"
      type="button"
      aria-label="Show source and preview side by side"
      onclick={splitMode}
    >Split</button>
    <button
      class="mmd-toggle"
      type="button"
      aria-label="Toggle diagram source"
      onclick={toggleMode}
    >{mode === 'code' ? 'Preview' : 'Source'}</button>
    <button
      class="mmd-copy {copyState === 'copied' ? 'is-copied' : ''} {copyState === 'error' ? 'is-error' : ''}"
      type="button"
      aria-label={copyState === 'copied' ? 'Copied to clipboard' : (copyState === 'error' ? 'Copy failed' : 'Copy diagram code to clipboard')}
      onclick={handleCopy}
    >{copyState === 'copied' ? 'Copied' : (copyState === 'error' ? 'Failed' : 'Copy')}</button>
  </div>

  <div class="mmd-code">
    <pre><code>{@html displayCode}</code></pre>
  </div>

  {#if hasFullDiagram}
    <button
      class="mmd-preview mmd-preview--interactive"
      type="button"
      aria-label={labels.open}
      bind:this={previewContainer}
      onclick={openModal}
    ></button>
  {:else}
    <div class="mmd-preview" bind:this={previewContainer}></div>
  {/if}
</div>

{#if modalOpen && hasFullDiagram}
  <div
    class="mmd-modal"
    role="dialog"
    aria-modal="true"
    aria-label={labels.title}
    onclick={handleBackdropClick}
  >
    <div class="mmd-modal__panel">
      <header class="mmd-modal__head">
        <h3 class="mmd-modal__title">{labels.title}</h3>
        <button
          class="mmd-modal__close"
          type="button"
          aria-label={labels.close}
          onclick={closeModal}
        >×</button>
      </header>
      <div class="mmd-modal__body" bind:this={modalContainer}></div>
    </div>
  </div>
{/if}

<style>
  .mmd-shell {
    position: relative;
    max-width: 100%;
    padding-top: 3.6rem;
  }

  .mmd-toolbar {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    z-index: 2;
  }

  .mmd-shell pre {
    margin: 0;
    overflow-x: auto;
  }

  .mmd-shell code {
    display: block;
    white-space: pre;
    color: var(--stone-light);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    line-height: 1.55;
  }

  .mmd-shell .comment {
    color: var(--mermaid-comment-color);
  }

  .mmd-copy,
  .mmd-toggle,
  .mmd-split,
  .mmd-expand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 2.4rem;
    padding: 0.3rem 0.7rem;
    border: 1px solid var(--card-border);
    border-radius: var(--radius-sm);
    background: var(--card-bg);
    color: var(--steel-dark);
    font-family: var(--font-head);
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  }

  .mmd-expand {
    color: var(--copper);
    border-color: var(--copper-border);
    background: rgba(217, 119, 69, 0.08);
  }

  .mmd-expand:hover,
  .mmd-expand:focus-visible {
    background: rgba(217, 119, 69, 0.14);
    border-color: var(--copper);
    color: var(--copper-bright);
  }

  .mmd-copy:hover,
  .mmd-toggle:hover,
  .mmd-split:hover,
  .mmd-copy:focus-visible,
  .mmd-toggle:focus-visible,
  .mmd-split:focus-visible {
    color: var(--copper);
    border-color: var(--copper);
  }

  .mmd-code,
  .mmd-preview {
    transition: opacity 0.2s ease, transform 0.2s ease;
    will-change: opacity, transform;
  }

  .mmd-shell[data-mode='preview'] .mmd-code {
    display: none;
  }

  .mmd-shell[data-mode='code'] .mmd-preview {
    display: none;
  }

  .mmd-shell[data-mode='split'] {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    align-items: center;
  }

  .mmd-shell[data-mode='split'] .mmd-code,
  .mmd-shell[data-mode='split'] .mmd-preview {
    display: flex;
  }

  .mmd-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    overflow-x: auto;
    padding: var(--space-md);
    border: 1px solid var(--glass-panel-border);
    border-radius: var(--radius-sm);
    background: var(--surface-glass);
    color: var(--stone-light);
    text-align: center;
    width: 100%;
    min-height: 12rem;
  }

  .mmd-preview--interactive {
    cursor: zoom-in;
    font: inherit;
    text-align: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  .mmd-preview--interactive:hover,
  .mmd-preview--interactive:focus-visible {
    border-color: var(--copper);
    box-shadow: 0 0 0 1px var(--copper-shadow);
  }

  :global(.mmd-preview svg) {
    display: block;
    margin: auto;
    max-width: 100%;
    height: auto;
  }

  .mmd-error {
    color: var(--copper-bright);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    letter-spacing: 0.04em;
  }

  .mmd-modal {
    position: fixed;
    inset: 0;
    z-index: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(0.75rem, 3vw, 2rem);
    background: rgba(5, 8, 13, 0.78);
    backdrop-filter: blur(18px) saturate(118%);
    -webkit-backdrop-filter: blur(18px) saturate(118%);
    animation: mmd-modal-in 0.18s ease;
  }

  .mmd-modal__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: min(96vw, 1400px);
    max-height: min(94vh, 1000px);
    background: var(--bg-deep, #080c11);
    border: 1px solid var(--glass-panel-border);
    border-radius: var(--radius-lg);
    box-shadow:
      0 28px 72px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 var(--glass-panel-highlight);
    overflow: hidden;
  }

  .mmd-modal__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--glass-panel-border);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent);
  }

  .mmd-modal__title {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink);
  }

  .mmd-modal__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid var(--glass-panel-border);
    border-radius: 999px;
    background: rgba(14, 18, 24, 0.62);
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
    transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
  }

  .mmd-modal__close:hover,
  .mmd-modal__close:focus-visible {
    border-color: var(--copper);
    color: var(--copper);
    background: rgba(217, 119, 69, 0.12);
  }

  .mmd-modal__body {
    flex: 1 1 auto;
    min-height: 0;
    padding: clamp(1rem, 2.4vw, 1.75rem);
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.mmd-modal__body svg) {
    display: block;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }

  @keyframes mmd-modal-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 900px) {
    .mmd-shell[data-mode='split'] {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .mmd-toolbar {
      top: 0.65rem;
      right: 0.65rem;
      gap: 0.35rem;
    }

    .mmd-copy,
    .mmd-toggle,
    .mmd-split,
    .mmd-expand {
      min-height: 2.2rem;
      padding: 0.35rem 0.6rem;
      font-size: 0.68rem;
    }

    .mmd-expand__label {
      display: none;
    }

    .mmd-modal__panel {
      width: 100vw;
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mmd-code,
    .mmd-preview,
    .mmd-copy,
    .mmd-toggle,
    .mmd-split,
    .mmd-expand,
    .mmd-modal {
      transition: none;
      animation: none;
    }
  }
</style>
