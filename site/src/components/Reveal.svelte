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
