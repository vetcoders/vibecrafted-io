<script lang="ts">
  import { reveal, type RevealOptions } from '../lib/actions/reveal';

  type RevealProps = RevealOptions &
    Record<string, unknown> & {
      tag?: string;
      class?: string;
    };

  let {
    tag = 'div',
    class: className = '',
    delay = 0,
    disabled = false,
    once = true,
    rootMargin = '0px 0px -8% 0px',
    threshold = 0.12,
    ...restProps
  }: RevealProps = $props();
</script>

<svelte:element
  this={tag}
  class={`fade-up ${className}`.trim()}
  use:reveal={{ delay, disabled, once, rootMargin, threshold }}
  {...restProps}
>
  <slot />
</svelte:element>

<style>
  .fade-up {
    opacity: 0;
    transform: translateY(1.35rem);
    transition:
      opacity 0.6s ease,
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--reveal-delay, 0ms);
    will-change: opacity, transform;
  }

  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .fade-up,
    .fade-up.visible {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
