<script lang="ts">
  import type { Lang } from '../../lib/i18n';

  interface HeroData {
    ariaLabel: string;
    eyebrow: string;
    heading: {
      pre: string;
      mid?: string;
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
  const playgroundTitle = $derived(
    lang === 'pl' ? 'Symulator komend Vibecrafted' : 'Vibecrafted command playground',
  );
</script>

<section class={`hero hero--${lang}`} id="hero" aria-label={hero.ariaLabel}>
  <div class="hero__vignette" data-decor aria-hidden="true"></div>

  <div class="hero__copy" data-scroll-fade>
    <span class="hero__eyebrow">{hero.eyebrow}</span>
    <h1 class="hero__heading">
      <span class="hero__heading-mark">{hero.heading.pre}</span>
      {#if hero.heading.mid}
        <span class="hero__heading-mark hero__heading-mark--mid">{hero.heading.mid}</span>
      {/if}
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
      <a class="hero__cta hero__cta--ghost" href="#playground">
        {hero.ctaSecondary}
      </a>
    </div>
  </div>

  <div class="hero__stage" id="playground">
    <iframe
      class="hero__playground"
      src="/playground/index.html?embed=1"
      title={playgroundTitle}
      loading="eager"
    ></iframe>
  </div>
</section>

<style>
  .hero {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: minmax(0, 34rem) minmax(0, 1fr);
    align-items: center;
    gap: clamp(32px, 5vw, 72px);
    width: 100%;
    height: 100dvh;
    max-height: 100dvh;
    min-height: 0;
    padding: 96px clamp(28px, 5vw, 80px) 56px;
    background: var(--ink);
    overflow: hidden;
    color: var(--fg-on-dark);
    box-sizing: border-box;
  }

  .hero::before,
  .hero__vignette {
    display: none;
  }

  .hero__copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    z-index: 2;
    max-width: 36rem;
  }

  .hero__eyebrow {
    display: block;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    margin-bottom: 22px;
  }

  .hero__heading {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(2.1rem, 4.6vw, 4.2rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: var(--fg-on-dark);
    margin: 0 0 22px;
  }

  .hero__heading-mark,
  .hero__heading-line {
    display: block;
  }

  .hero__heading-dot {
    color: var(--accent);
  }

  .hero__heading em {
    font-style: italic;
  }

  .hero__body {
    font-family: var(--font-body);
    font-size: clamp(15px, 1.15vw, 17px);
    line-height: 1.55;
    color: var(--fg-on-dark-dim);
    margin: 0 0 28px;
  }

  .hero__body :global(code) {
    display: block;
    margin-top: 14px;
    font-family: var(--font-mono);
    font-size: 0.82em;
    line-height: 1.45;
    color: var(--fg-on-dark);
    background: #121214;
    border: 1px solid var(--v2-border, #27272a);
    border-radius: 8px;
    padding: 12px 14px;
    white-space: pre-wrap;
    word-break: break-word;
  }

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
    border-radius: var(--v2-radius-sm, 8px);
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
    font-weight: 600;
  }

  .hero__cta--primary .hero__cta-arrow {
    color: var(--accent);
    font-size: 14px;
    transform: translateY(-0.5px);
  }

  .hero__cta--primary:hover,
  .hero__cta--primary:focus-visible {
    background: #e4e4e7;
    border-color: #e4e4e7;
    color: var(--ink);
  }

  .hero__cta--ghost {
    background: transparent;
    color: var(--fg-on-dark);
    border: 1px solid var(--v2-border-strong, #3f3f46);
  }

  .hero__cta--ghost:hover,
  .hero__cta--ghost:focus-visible {
    border-color: var(--fg-on-dark);
  }

  .hero__stage {
    justify-self: end;
    align-self: center;
    width: min(100%, 560px);
    height: min(64vh, 620px);
    min-width: 0;
    border: 1px solid #27272a;
    border-radius: 16px;
    overflow: hidden;
    background: #0a0a0b;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
  }

  .hero__playground {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    background: #0a0a0b;
  }

  @media print, (max-aspect-ratio: 1/3), (prefers-reduced-transparency: reduce) {
    .hero {
      height: auto;
      max-height: none;
      overflow: visible;
      grid-template-columns: 1fr;
    }

    .hero::before,
    .hero__vignette {
      display: none;
    }

    .hero__stage {
      display: none;
    }
  }

  @media (max-width: 900px) {
    .hero {
      height: auto;
      max-height: none;
      min-height: 100dvh;
      grid-template-columns: 1fr;
      padding: 96px 20px 28px;
      gap: 24px;
    }

    .hero__copy {
      max-width: none;
    }

    .hero__stage {
      justify-self: stretch;
      width: 100%;
      height: 52vh;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__cta {
      transition: none;
    }
  }
</style>
