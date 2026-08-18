<script lang="ts">
  import type { Snippet } from 'svelte';
  import { reveal, type RevealOptions } from '../lib/actions/reveal';

  type RevealProps = RevealOptions &
    Record<string, unknown> & {
      tag?: string;
      class?: string;
      children?: Snippet;
    };

  let {
    tag = 'div',
    class: className = '',
    delay = 0,
    disabled = false,
    once = true,
    rootMargin = '0px 0px -8% 0px',
    threshold = 0.12,
    children,
    ...restProps
  }: RevealProps = $props();
</script>

<svelte:element
  this={tag}
  data-reveal
  class={`fade-up ${className}`.trim()}
  use:reveal={{ delay, disabled, once, rootMargin, threshold }}
  {...restProps}
>
  {@render children?.()}
</svelte:element>

<style>
  /* Visible by default. JS only ADDS the pending hide for off-screen nodes. */
  .fade-up {
    opacity: 1;
    transform: none;
    transition:
      opacity 0.6s ease,
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--reveal-delay, 0ms);
  }

  .fade-up.is-pending {
    opacity: 0;
    transform: translateY(1.35rem);
    will-change: opacity, transform;
  }

  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
    will-change: auto;
  }

  @media print, (prefers-reduced-motion: reduce) {
    .fade-up,
    .fade-up.is-pending,
    .fade-up.visible {
      opacity: 1 !important;
      transform: none !important;
      transition: none;
      will-change: auto;
    }
  }
</style>
