<script lang="ts">
  import { onMount } from 'svelte';
  
  let { code = '', highlightedCode = '' } = $props<{ code: string, highlightedCode?: string }>();
  let mode = $state('code'); // 'code', 'preview', 'split'
  let previewContainer: HTMLElement;
  let copyState = $state('default'); // 'default', 'copied', 'error'
  let copyTimer: ReturnType<typeof setTimeout>;

  const displayCode = highlightedCode || code;

  async function renderMermaid() {
    if (!previewContainer) return;
    // @ts-ignore
    if (window.mermaid) {
      const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
      try {
        // @ts-ignore
        const { svg } = await window.mermaid.render(id, code);
        previewContainer.innerHTML = svg;
      } catch (err: any) {
        previewContainer.innerHTML = `<div class="mmd-error">Render error: ${err.message}</div>`;
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
    } catch (err) {
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
      } catch (e) {
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
