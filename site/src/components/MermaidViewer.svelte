<script lang="ts">
  import { onDestroy } from 'svelte';

  type MermaidMode = 'code' | 'preview' | 'split';
  type CopyState = 'default' | 'copied' | 'error';

  let { code = '', highlightedCode = '' } = $props<{ code: string; highlightedCode?: string }>();
  let mode = $state<MermaidMode>('code');
  let previewContainer: HTMLDivElement | undefined;
  let copyState = $state<CopyState>('default');
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  const displayCode = $derived(highlightedCode || code);

  onDestroy(() => {
    if (copyTimer) {
      clearTimeout(copyTimer);
    }
  });

  function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Unknown error';
  }

  async function renderMermaid() {
    const container = previewContainer;
    if (!container) return;
    const mermaid = window.mermaid;

    if (mermaid) {
      const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
      try {
        const { svg } = await mermaid.render(id, code);
        container.innerHTML = svg;
      } catch (error) {
        container.innerHTML = `<div class="mmd-error">Render error: ${getErrorMessage(error)}</div>`;
      }
    } else {
      container.innerHTML = '<div class="mmd-error">Preview unavailable.</div>';
    }
  }

  $effect(() => {
    if (mode === 'preview' || mode === 'split') {
      renderMermaid();
    }
  });

  function toggleMode() {
    mode = mode === 'code' ? 'preview' : 'code';
  }

  function splitMode() {
    mode = 'split';
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
      // Fallback
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

<div class="mmd-shell" data-mode={mode}>
  <button class="mmd-split" type="button" aria-label="Toggle split view" onclick={splitMode}>Split</button>
  <button class="mmd-toggle" type="button" aria-label="Toggle diagram preview" onclick={toggleMode}>Preview</button>
  <button class="mmd-copy {copyState === 'copied' ? 'is-copied' : ''} {copyState === 'error' ? 'is-error' : ''}" type="button" aria-label={copyState === 'copied' ? 'Copied to clipboard' : (copyState === 'error' ? 'Copy failed' : 'Copy diagram code to clipboard')} onclick={handleCopy}>
    {copyState === 'copied' ? 'Copied' : (copyState === 'error' ? 'Failed' : 'Copy')}
  </button>
  
  <div class="mmd-code">
    <pre><code>{@html displayCode}</code></pre>
  </div>
  
  <div class="mmd-preview" bind:this={previewContainer}></div>
</div>

<style>
  .mmd-shell {
    position: relative;
    max-width: 100%;
    overflow-x: auto;
    padding-top: 4.25rem;
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
  .mmd-split {
    position: absolute;
    top: 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0.3rem 0.6rem;
    border: 1px solid var(--card-border);
    border-radius: var(--radius-sm);
    background: var(--card-bg);
    color: var(--steel-dark);
    font-family: var(--font-head);
    font-size: 0.7rem;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 2;
  }

  .mmd-copy {
    right: 0.75rem;
  }

  .mmd-toggle {
    right: 4.5rem;
  }

  .mmd-split {
    right: 9.3rem;
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
    display: block;
  }

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
    border-radius: var(--radius-sm);
    background: var(--surface-glass);
    color: var(--stone-light);
    text-align: center;
  }

  .mmd-preview svg {
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

  @media (max-width: 900px) {
    .mmd-shell[data-mode='split'] {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .mmd-copy,
    .mmd-toggle,
    .mmd-split {
      top: 0.65rem;
      min-height: 3rem;
      padding: 0.42rem 0.72rem;
      font-size: 0.72rem;
    }

    .mmd-split {
      left: 0.85rem;
      right: auto;
    }

    .mmd-toggle {
      left: 5.35rem;
      right: auto;
    }

    .mmd-copy {
      right: 0.85rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mmd-code,
    .mmd-preview,
    .mmd-copy,
    .mmd-toggle,
    .mmd-split {
      transition: none;
    }
  }
</style>
