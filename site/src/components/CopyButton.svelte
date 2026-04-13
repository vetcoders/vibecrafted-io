<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Tween, prefersReducedMotion } from 'svelte/motion';
  import { fade } from 'svelte/transition';

  // Satisfy Vite's SSR-side import analysis; the template consumes these transitions.
  const templateTransitions = { fade };
  void templateTransitions;

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

  const feedbackScale = Tween.of(() => (state === 'copied' ? 1.06 : state === 'error' ? 0.985 : 1), {
    duration: prefersReducedMotion.current ? 0 : 180,
  });
  const feedbackOffset = Tween.of(() => (state === 'default' ? 0 : -1.5), {
    duration: prefersReducedMotion.current ? 0 : 180,
  });
  const feedbackOpacity = Tween.of(() => (state === 'default' ? 0.92 : 1), {
    duration: prefersReducedMotion.current ? 0 : 140,
  });

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
  data-copy-state={state}
  aria-label={ariaLabel}
  onclick={handleCopy}
>
  <span class="copy-button__label" aria-live="polite">
    {#key state}
      <span
        class="copy-button__text"
        in:fade={{ duration: prefersReducedMotion.current ? 0 : 120 }}
        out:fade={{ duration: prefersReducedMotion.current ? 0 : 100 }}
        style={`opacity: ${feedbackOpacity.current}; transform: translateY(${feedbackOffset.current}px) scale(${feedbackScale.current});`}
      >
        {label}
      </span>
    {/key}
  </span>
</button>

<style>
  button[data-copy-managed='svelte'] {
    transform-origin: center;
    transition:
      transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.22s ease,
      filter 0.22s ease;
  }

  button[data-copy-managed='svelte']:active {
    transform: scale(0.985);
  }

  .copy-button__label {
    display: inline-grid;
    place-items: center;
    min-width: 5ch;
  }

  .copy-button__text {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    transform-origin: center;
    will-change: transform, opacity;
  }

  button[data-copy-state='copied'] .copy-button__text {
    text-shadow: 0 0 12px rgba(90, 138, 122, 0.18);
  }

  button[data-copy-state='copied'] {
    box-shadow:
      0 10px 24px rgba(90, 138, 122, 0.16),
      0 0 0 1px rgba(90, 138, 122, 0.18);
    filter: saturate(1.05);
  }

  button[data-copy-state='error'] .copy-button__text {
    text-shadow: 0 0 10px rgba(184, 115, 51, 0.16);
  }

  button[data-copy-state='error'] {
    box-shadow:
      0 10px 24px rgba(184, 115, 51, 0.12),
      0 0 0 1px rgba(184, 115, 51, 0.16);
  }
</style>
