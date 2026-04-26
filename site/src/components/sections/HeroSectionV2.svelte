<script lang="ts">
  import { getTranslations, type Lang } from '../../lib/i18n';
  import MarbleCanvasV2 from '../MarbleCanvasV2.svelte';

  interface Props {
    lang?: Lang;
  }

  let { lang = 'en' }: Props = $props();

  let marbleCount = $state(0);
  let convergePct = $state(0);

  function handleStats(count: number, pct: number): void {
    marbleCount = count;
    convergePct = pct;
  }

  const pctLabel = $derived(String(convergePct).padStart(3, '0'));
  const countLabel = $derived(String(marbleCount).padStart(3, '0'));
  const hero = $derived(getTranslations(lang).landingV2.hero);

  const installHref = $derived(lang === 'pl' ? '/pl/install/' : '/en/install/');
  const docsHref = $derived(lang === 'pl' ? '/pl/quickstart/' : '/en/quickstart/');
</script>

<section class="hero" id="hero" aria-label={hero.ariaLabel}>
  <div class="hero__vignette" aria-hidden="true"></div>

  <div class="hero__canvas" aria-hidden="true">
    <MarbleCanvasV2
      boardScale={0.28}
      spawnScale={1.6}
      boardOffsetX={0.18}
      boardOffsetY={-0.1}
      palette="color"
      drawGrooves={true}
      grooveColor="rgba(245,244,239,0.10)"
      onStats={handleStats}
    />
  </div>

  <div class="hero__overlay">
    <span class="hero__eyebrow">{hero.eyebrow}</span>
    <h1 class="hero__heading">
      {hero.heading.pre}<br />
      {#if hero.heading.prefix}{hero.heading.prefix} {/if}<em>{hero.heading.emFirst}</em> {hero.heading.mid}<br />
      <em class="accent">{hero.heading.emLast}</em>
    </h1>
    <p class="hero__body">
      {hero.body}
    </p>
    <div class="hero__ctas">
      <a class="hero__cta hero__cta--primary" href={installHref}>
        {hero.ctaPrimary}<span class="hero__cta-arrow" aria-hidden="true">→</span>
      </a>
      <a class="hero__cta hero__cta--ghost" href={docsHref}>
        {hero.ctaSecondary}
      </a>
    </div>
  </div>

  <div class="hero__telemetry" aria-hidden="true">
    <span class="hero__tele-row">
      <span class="hero__tele-label">{hero.telemetry.marbles}</span>
      <span class="hero__tele-dot">·</span>
      <span class="hero__tele-value">{countLabel}</span>
    </span>
    <span class="hero__tele-row">
      <span class="hero__tele-label">{hero.telemetry.converge}</span>
      <span class="hero__tele-dot">·</span>
      <span class="hero__tele-value">{pctLabel}%</span>
    </span>
    <span class="hero__tele-row hero__tele-row--live">
      <span class="hero__tele-label">{hero.telemetry.live}</span>
      <span class="hero__tele-dot">·</span>
      <span class="hero__tele-value">DWG VC-001</span>
    </span>
  </div>

  <div class="hero__scroll" aria-hidden="true">
    {hero.scroll} <span class="hero__scroll-arrow">↓</span>
  </div>
</section>

<style>
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 720px;
    background: var(--ink);
    overflow: hidden;
    color: var(--fg-on-dark);
  }

  .hero__vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 60% at 50% 55%,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  .hero__canvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .hero__canvas :global(canvas) {
    width: 100%;
    height: 100%;
  }

  /* ── Text overlay ───────────────────────────────────────── */

  .hero__overlay {
    position: absolute;
    left: clamp(32px, 4vw, 72px);
    bottom: clamp(96px, 12vh, 128px);
    max-width: min(62%, 780px);
    z-index: 3;
    pointer-events: none;
  }

  .hero__overlay > * {
    pointer-events: auto;
  }

  .hero__eyebrow {
    display: block;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    margin-bottom: 40px;
  }

  .hero__heading {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(50px, 8vw, 100px);
    line-height: 1.02;
    letter-spacing: -0.025em;
    color: var(--fg-on-dark);
    margin: 0 0 32px;
  }

  .hero__heading em {
    font-style: italic;
  }

  .hero__heading em.accent {
    color: var(--accent);
  }

  .hero__body {
    font-family: var(--font-body);
    font-size: clamp(16px, 1.2vw, 20px);
    line-height: 1.5;
    color: var(--fg-on-dark-dim);
    max-width: 52ch;
    margin: 0 0 40px;
  }

  /* ── CTAs ───────────────────────────────────────────────── */

  .hero__ctas {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }

  .hero__cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 22px;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border-radius: 2px;
    transition:
      transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
      background 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;
  }

  .hero__cta:hover,
  .hero__cta:focus-visible {
    transform: translateY(-1px);
  }

  .hero__cta--primary {
    background: var(--fg-on-dark);
    color: var(--ink);
    border: 1px solid var(--fg-on-dark);
  }

  .hero__cta--primary .hero__cta-arrow {
    color: var(--accent);
    font-size: 14px;
    transform: translateY(-0.5px);
  }

  .hero__cta--primary:hover,
  .hero__cta--primary:focus-visible {
    background: var(--paper);
    border-color: var(--paper);
  }

  .hero__cta--ghost {
    background: transparent;
    color: var(--fg-on-dark);
    border: 1px solid rgba(245, 244, 239, 0.28);
  }

  .hero__cta--ghost:hover,
  .hero__cta--ghost:focus-visible {
    border-color: var(--fg-on-dark);
  }

  /* ── Live telemetry ──────────────────────────────────────── */

  .hero__telemetry {
    position: absolute;
    right: clamp(32px, 4vw, 72px);
    bottom: clamp(96px, 12vh, 128px);
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    text-align: right;
  }

  .hero__tele-row {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
  }

  .hero__tele-label {
    color: var(--fg-on-dark-mute);
  }

  .hero__tele-dot {
    color: var(--fg-on-dark-mute);
    opacity: 0.6;
  }

  .hero__tele-value {
    color: var(--fg-on-dark);
    font-variant-numeric: tabular-nums;
  }

  .hero__tele-row--live .hero__tele-value {
    color: var(--accent);
  }

  /* ── Scroll hint ─────────────────────────────────────────── */

  .hero__scroll {
    position: absolute;
    left: 50%;
    bottom: 28px;
    transform: translateX(-50%);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .hero__scroll-arrow {
    font-size: 12px;
    animation: hero-scroll-bob 2.2s ease-in-out infinite;
  }

  @keyframes hero-scroll-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(3px); }
  }

  /* ── Responsive ──────────────────────────────────────────── */

  @media (max-width: 900px) {
    .hero {
      height: auto;
      min-height: 640px;
      padding-bottom: 48px;
    }

    .hero__canvas {
      /* Hide canvas on mobile (handoff § 4.3 note — parent owns responsive) */
      display: none;
    }

    .hero__overlay {
      position: relative;
      left: 0;
      bottom: 0;
      margin: 120px 24px 32px;
      max-width: none;
    }

    .hero__heading {
      font-size: clamp(40px, 10vw, 72px);
    }

    .hero__telemetry {
      position: relative;
      right: 0;
      bottom: 0;
      margin: 0 24px 24px;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 20px;
      text-align: left;
    }

    .hero__tele-row {
      justify-content: flex-start;
    }

    .hero__scroll {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__scroll-arrow {
      animation: none;
    }

    .hero__cta,
    .hero__cta:hover {
      transition: none;
      transform: none;
    }
  }
</style>
