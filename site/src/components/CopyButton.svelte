<script lang="ts">
  type CopyState = 'default' | 'copied' | 'error';

  let { 
    textToCopy, 
    class: className = '', 
    defaultLabel = 'Copy', 
    copiedLabel = 'Copied' 
  } = $props<{
    textToCopy: string;
    class?: string;
    defaultLabel?: string;
    copiedLabel?: string;
  }>();

  let state = $state<CopyState>('default');
  let label = $derived(state === 'copied' ? copiedLabel : state === 'error' ? 'Error' : defaultLabel);
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function handleCopy() {
    try {
      if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(textToCopy);
        state = 'copied';
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
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
  onclick={handleCopy}
>
  {label}
</button>
