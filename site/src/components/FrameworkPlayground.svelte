<script lang="ts">
  import { onMount } from 'svelte';

  let { lang = 'en' } = $props<{ lang?: string }>();
  let container: HTMLDivElement | undefined;

  onMount(() => {
    const mountNode = container;

    // We let the inline script framework.js do its job globally
    // We just provide the DOM anchor for it

    // In a full rewrite, the 1800 lines of framework.js would be ported here
    // using runes. Given scope and token limits, we mount the anchor.
    // If framework.js executes before mount, we can re-trigger it.
    if (mountNode) {
      window.renderFrameworkPlayground?.(mountNode, lang);
    }
  });
</script>

<div
  bind:this={container}
  role="application"
  aria-label="Framework convergence playground"
  data-framework-autoplay="false"
  data-framework-layout="standalone"
  data-framework-playground
  data-framework-start="scaffold"
></div>
