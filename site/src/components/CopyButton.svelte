<script lang="ts">
  import { onDestroy } from 'svelte';

  type CopyState = 'default' | 'copied' | 'error';

  let { 
    textToCopy, 
    class: className = '', 
    defaultLabel = 'Copy', 
    copiedLabel = 'Copied',
    errorLabel = 'Error',
    defaultAriaLabel = 'Copy to clipboard',
    copiedAriaLabel = 'Copied to clipboard',
    errorAriaLabel = 'Copy failed'
  } = $props<{
    textToCopy: string;
    class?: string;
    defaultLabel?: string;
    copiedLabel?: string;
    errorLabel?: string;
    defaultAriaLabel?: string;
    copiedAriaLabel?: string;
    errorAriaLabel?: string;
  }>();

  let state = $state<CopyState>('default');
  let label = $derived(state === 'copied' ? copiedLabel : state === 'error' ? errorLabel : defaultLabel);
  let ariaLabel = $derived(
    state === 'copied'
      ? copiedAriaLabel
      : state === 'error'
        ? errorAriaLabel
        : defaultAriaLabel
  );
  let timer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => {
    if (timer) {
      clearTimeout(timer);
    }
  });

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        state = 'copied';
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        state = 'copied';
      } catch {
        state = 'error';
      }
      textArea.remove();
    }
    
    clearTimeout(timer);
    timer = setTimeout(() => {
      state = 'default';
    }, 1500);
  }
</script>

<button
  class="{className} {state === 'copied' ? 'is-copied' : ''} {state === 'error' ? 'is-error' : ''}"
  type="button"
  data-copy-managed="svelte"
  aria-label={ariaLabel}
  onclick={handleCopy}
>
  {label}
</button>
