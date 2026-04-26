<script lang="ts">
  interface Props {
    state: number;
    size?: number;
    accent?: 'default' | 'teal';
    dotCount?: number;
    class?: string;
  }

  let { state, size = 88, accent = 'default', dotCount = 8, class: cls = '' } = $props<Props>();

  const center = $derived(size / 2);
  const outerR = $derived(size / 2 - 1);
  const innerR = $derived(outerR * 0.55);

  function jitter(i: number, axis: 'x' | 'y'): number {
    const s = (i * 9301 + (axis === 'x' ? 49297 : 233280)) % 233280;
    return (s / 233280 - 0.5) * 0.18;
  }

  const dots = $derived(
    Array.from({ length: dotCount }, (_, i) => {
      const angle = (i / dotCount) * Math.PI * 2;
      const scatteredR = outerR * 0.95;
      const sx = center + Math.cos(angle) * scatteredR + jitter(i, 'x') * outerR;
      const sy = center + Math.sin(angle) * scatteredR + jitter(i, 'y') * outerR;
      const cx = center + Math.cos(angle) * innerR;
      const cy = center + Math.sin(angle) * innerR;

      return {
        x: sx + (cx - sx) * state,
        y: sy + (cy - sy) * state,
      };
    })
  );

  const accentColor = $derived(accent === 'teal' ? 'var(--accent-2)' : 'currentColor');
</script>

<svg
  class="microboard {cls}"
  viewBox={`0 0 ${size} ${size}`}
  width={size}
  height={size}
  aria-hidden="true"
>
  <circle
    cx={center}
    cy={center}
    r={outerR}
    fill="none"
    stroke="currentColor"
    stroke-opacity="0.18"
    stroke-width="1"
  />
  <circle
    cx={center}
    cy={center}
    r={innerR}
    fill="none"
    stroke={accentColor}
    stroke-opacity={0.4 * state}
    stroke-width="1"
    stroke-dasharray="2 3"
  />
  <circle cx={center} cy={center} r={2.5} fill={accentColor} fill-opacity={state} />
  {#each dots as dot}
    <circle cx={dot.x} cy={dot.y} r={1.5} fill="currentColor" fill-opacity="0.85" />
  {/each}
</svg>

<style>
  .microboard {
    display: block;
    color: inherit;
  }
</style>
