<script lang="ts">
  type MermaidMode = 'code' | 'preview' | 'split';
  type CopyState = 'default' | 'copied' | 'error';

  let { code = '', highlightedCode = '' } = $props<{ code: string, highlightedCode?: string }>();
  let mode = $state<MermaidMode>('code');
  let previewContainer: HTMLDivElement | undefined;
  let copyState = $state<CopyState>('default');
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  const displayCode = $derived(highlightedCode || code);

  function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Unknown error';
  }

  async function renderMermaid() {
    if (!previewContainer) return;
    const mermaid = window.mermaid;

    if (mermaid) {
      const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
      try {
        const { svg } = await mermaid.render(id, code);
        previewContainer.innerHTML = svg;
      } catch (error) {
        previewContainer.innerHTML = `<div class="mmd-error">Render error: ${getErrorMessage(error)}</div>`;
      }
    } else {
      previewContainer.innerHTML = '<div class="mmd-error">Preview unavailable.</div>';
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
      if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(code);
        copyState = 'copied';
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
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
  <button class="mmd-split" type="button" onclick={splitMode}>Split</button>
  <button class="mmd-toggle" type="button" onclick={toggleMode}>Preview</button>
  <button class="mmd-copy {copyState === 'copied' ? 'is-copied' : ''} {copyState === 'error' ? 'is-error' : ''}" type="button" onclick={handleCopy}>
    {copyState === 'copied' ? 'Copied' : (copyState === 'error' ? 'Failed' : 'Copy')}
  </button>
  
  <div class="mmd-code">
    <pre><code>{@html displayCode}</code></pre>
  </div>
  
  <div class="mmd-preview" bind:this={previewContainer}></div>
</div>
