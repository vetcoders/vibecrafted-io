<script lang="ts">
  import type { Lang } from '../../lib/i18n';

  interface HeroData {
    ariaLabel: string;
    eyebrow: string;
    heading: {
      pre: string;
      accent: string;
    };
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    telemetry: {
      marbles: string;
      converge: string;
      live: string;
    };
    telemetryLegend: string;
    canvasCaption: string;
    scroll: string;
  }

  interface Props {
    lang?: Lang;
    hero: HeroData;
  }

  let { lang = 'en', hero }: Props = $props();

  const headingAccentWord = $derived(hero.heading.accent.replace(/\.$/, ''));
  const headingAccentDot = $derived(hero.heading.accent.endsWith('.') ? '.' : '');

  const installHref = $derived(lang === 'pl' ? '/pl/install/' : '/en/install/');
  const docsHref = $derived(lang === 'pl' ? '/pl/quickstart/' : '/en/quickstart/');

  // Static surface stats — not marble sim counters.
  const teleAgents = '040';
  const teleRepos = '008';
  const teleLive = 'LIVE';
</script>

<section class={`hero hero--${lang}`} id="hero" aria-label={hero.ariaLabel}>
  <div class="hero__vignette" aria-hidden="true"></div>

  <div class="hero__visual" aria-hidden="true">
    <!-- Exactly one decorative chrome; body fill is edge-to-edge product capture (no window-in-window). -->
    <div class="hero__window vc-termwin vc-termwin--hero">
      <div class="vc-termwin__titlebar">
        <span class="vc-termwin__lights">
          <span class="vc-termwin__dot vc-termwin__dot--close"></span>
          <span class="vc-termwin__dot vc-termwin__dot--min"></span>
          <span class="vc-termwin__dot vc-termwin__dot--max"></span>
        </span>
        <span class="vc-termwin__title">Needs attention · Sessions — vc-frame</span>
      </div>
      <div class="vc-termwin__body">
        <img
          class="hero__art"
          src="/assets/hero/real-usage.png"
          alt="vc-frame operator layout: Start here map, sessions rail, Session Manager"
          width="1600"
          height="1000"
          decoding="async"
          fetchpriority="high"
        />
      </div>
    </div>
    <div class="hero__art-shade"></div>
  </div>

  <div class="hero__overlay" data-scroll-fade>
    <span class="hero__eyebrow">{hero.eyebrow}</span>
    <h1 class="hero__heading">
      <!-- Brand-dot is sentence terminator only — never mid-phrase after `pre`. -->
      <span class="hero__heading-mark">{hero.heading.pre}</span>
      <span class="hero__heading-line">
        <em class="hero__heading-accent">{headingAccentWord}</em
        >{#if headingAccentDot}<span class="hero__heading-dot">{headingAccentDot}</span
          >{/if}
      </span>
    </h1>
    <p class="hero__body">
      {@html hero.body}
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

  <div class="hero__telemetry" data-scroll-fade>
    <span class="hero__tele-legend">{hero.telemetryLegend}</span>
    <span class="hero__tele-row">
      <span class="hero__tele-label">{hero.telemetry.marbles}</span>
      <span class="hero__tele-dot">·</span>
      <span class="hero__tele-value">{teleAgents}</span>
    </span>
    <span class="hero__tele-row">
      <span class="hero__tele-label">{hero.telemetry.converge}</span>
      <span class="hero__tele-dot">·</span>
      <span class="hero__tele-value">{teleRepos}</span>
    </span>
    <span class="hero__tele-row hero__tele-row--live">
      <span class="hero__tele-label">{hero.telemetry.live}</span>
      <span class="hero__tele-dot">·</span>
      <span class="hero__tele-value">{teleLive}</span>
    </span>
  </div>

  <p class="hero__canvas-caption" data-scroll-fade>
    {hero.canvasCaption}
  </p>

  <div class="hero__scroll" aria-hidden="true">
    {hero.scroll} <span class="hero__scroll-arrow">↓</span>
  </div>
</section>

<style>
  .hero {
    position: relative;
    isolation: isolate;
    width: 100%;
    height: 100vh;
    height: 100svh;
    min-height: 560px;
    background:
      radial-gradient(circle at 50% 24%, rgba(var(--v2-paper-rgb), 0.045), transparent 36rem),
      linear-gradient(180deg, rgba(var(--v2-paper-rgb), 0.035), transparent 48%),
      var(--ink);
    overflow: hidden;
    color: var(--fg-on-dark);
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
      radial-gradient(circle at 20% 28%, rgba(var(--v2-paper-rgb), 0.11) 0 0.8px, transparent 1.45px),
      radial-gradient(circle at 72% 64%, rgba(var(--v2-paper-rgb), 0.075) 0 0.7px, transparent 1.35px),
      repeating-linear-gradient(90deg, rgba(var(--v2-paper-rgb), 0.024) 0 1px, transparent 1px 8px);
    background-size:
      19px 19px,
      27px 27px,
      100% 100%;
    mix-blend-mode: screen;
    opacity: 0.22;
  }

  .hero__vignette {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: radial-gradient(
      ellipse 80% 60% at 50% 55%,
      rgba(255, 255, 255, 0.04) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  /* ── Real-usage window (single decorative chrome + edge-to-edge fill) ─ */

  .hero__visual {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
  }

  .hero__window {
    position: absolute;
    right: clamp(16px, 3vw, 48px);
    top: 50%;
    transform: translateY(-52%);
    width: min(58vw, 920px);
  }

  .hero__art {
    display: block;
    width: 100%;
    height: auto;
    vertical-align: top;
    opacity: 0.98;
    filter: contrast(1.02) saturate(0.95);
  }

  .hero__art-shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, var(--ink) 0%, rgba(7, 10, 14, 0.82) 26%, transparent 52%),
      linear-gradient(180deg, rgba(7, 10, 14, 0.4) 0%, transparent 22%, transparent 78%, rgba(7, 10, 14, 0.7) 100%);
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
    margin-bottom: 28px;
  }

  .hero__heading {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: min(clamp(46px, 7vw, 92px), 10.5vh);
    line-height: 1.02;
    letter-spacing: -0.025em;
    color: var(--fg-on-dark);
    margin: 0 0 32px;
  }

  .hero__heading-mark,
  .hero__heading-line {
    display: block;
  }

  .hero__heading-mark {
    width: fit-content;
    color: var(--fg-on-dark);
    text-shadow: 0 0 32px rgba(var(--v2-accent-rgb), 0.16);
  }

  .hero__heading-dot {
    color: var(--accent);
  }

  .hero__heading-line {
    max-width: 13.5ch;
  }

  .hero--en .hero__heading-line {
    max-width: 20ch;
  }

  .hero--pl .hero__heading {
    font-size: min(clamp(38px, 5.5vw, 72px), 9.5vh);
  }

  .hero--pl .hero__heading-line {
    max-width: 20ch;
  }

  .hero__heading em {
    font-style: italic;
  }

  .hero__body {
    font-family: var(--font-body);
    font-size: clamp(14px, 1vw, 17px);
    line-height: 1.55;
    color: var(--fg-on-dark-dim);
    max-width: 66ch;
    margin: 0 0 40px;
  }

  .hero__body em {
    font-style: normal;
    color: var(--accent);
  }

  .hero__body :global(code) {
    font-family: var(--font-mono);
    font-size: 0.92em;
    color: var(--accent);
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
    z-index: 3;
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

  .hero__tele-legend {
    display: block;
    max-width: 28ch;
    margin-bottom: 10px;
    margin-left: auto;
    line-height: 1.45;
    letter-spacing: 0.08em;
    text-transform: none;
    color: var(--fg-on-dark-dim);
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

  .hero__canvas-caption {
    position: absolute;
    right: clamp(32px, 4vw, 72px);
    top: clamp(112px, 14vh, 168px);
    z-index: 3;
    max-width: 30ch;
    margin: 0;
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.45;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-align: right;
    color: var(--fg-on-dark-mute);
  }

  /* ── Scroll hint ─────────────────────────────────────────── */

  .hero__scroll {
    position: absolute;
    left: 50%;
    bottom: 28px;
    transform: translateX(-50%);
    z-index: 3;
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
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(3px);
    }
  }

  /* ── Responsive ──────────────────────────────────────────── */

  @media (max-width: 900px) {
    .hero {
      height: auto;
      min-height: 640px;
      padding-bottom: 48px;
    }

    .hero__visual {
      position: absolute;
      inset: 0 0 auto 0;
      height: 40vh;
      min-height: 200px;
    }

    .hero__window {
      right: 12px;
      left: 12px;
      top: 88px;
      transform: none;
      width: auto;
      opacity: 0.9;
    }

    .hero__art-shade {
      background: linear-gradient(180deg, transparent 20%, var(--ink) 100%);
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

    .hero__tele-legend {
      margin-left: 0;
      width: 100%;
      max-width: none;
    }

    .hero__canvas-caption {
      position: relative;
      right: 0;
      top: 0;
      margin: 0 24px 16px;
      text-align: left;
      max-width: none;
    }
  }
</style>
