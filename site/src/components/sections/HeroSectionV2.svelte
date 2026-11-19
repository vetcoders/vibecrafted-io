<script lang="ts">
  import type { Lang } from '../../lib/i18n';
  import { getTranslations } from '../../lib/i18n';
  import CopyButton from '../CopyButton.svelte';
  import PlaygroundTui from '../PlaygroundTui.svelte';
  import { PUBLIC_INSTALL_COMMAND } from '../../lib/installer/public-install-command';

  export interface HeroData {
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
    /** Installer-channel version. Empty omits it from the simulator. */
    channelVersion?: string;
  }

  let { lang = 'en', hero, channelVersion = '' }: Props = $props();
  const copy = $derived(getTranslations(lang).copyButton);
  const installCommand = PUBLIC_INSTALL_COMMAND;

  const headingAccentWord = $derived(hero.heading.accent.replace(/\.$/, ''));
  const headingAccentDot = $derived(hero.heading.accent.endsWith('.') ? '.' : '');

  const installHref = $derived(lang === 'pl' ? '/pl/install/' : '/en/install/');
  const playgroundTitle = $derived(
    lang === 'pl' ? 'Playground operatora' : 'Operator playground',
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
    <div class="hero__install">
      <code class="hero__install-cmd">
        <span class="hero__install-prompt" aria-hidden="true">$</span>
        {installCommand}
      </code>
      <CopyButton
        textToCopy={installCommand}
        class="hero__install-copy"
        defaultLabel={copy.upperDefault}
        copiedLabel={copy.copied}
        errorLabel={copy.error}
        defaultAriaLabel={copy.defaultAria}
        copiedAriaLabel={copy.copiedAria}
        errorAriaLabel={copy.errorAria}
      />
    </div>
    <div class="hero__ctas">
      <a class="hero__cta hero__cta--primary" href={installHref}>
        {hero.ctaPrimary}<span class="hero__cta-arrow" aria-hidden="true">→</span>
      </a>
      <a class="hero__cta hero__cta--ghost" href="#playground">
        {hero.ctaSecondary}
      </a>
    </div>
  </div>

  <div class="hero__stage hero__playground" id="playground" aria-label={playgroundTitle}>
    <PlaygroundTui {channelVersion} />
  </div>
</section>

<style>
  .hero {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: minmax(0, 16rem) minmax(0, 1fr);
    align-items: center;
    gap: 24px 32px;
    width: 100%;
    height: 100dvh;
    max-height: 100dvh;
    min-height: 0;
    padding: 88px 32px 32px;
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
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    max-width: 16rem;
  }

  .hero__stage {
    position: relative;
    z-index: 2;
    min-width: 0;
    width: 100%;
    height: min(680px, calc(100dvh - 128px));
    min-height: 360px;
    border: 0;
    border-radius: 0;
    overflow: hidden;
    background: transparent;
    box-shadow: none;
  }

  .hero__eyebrow {
    display: block;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    margin-bottom: 14px;
  }

  .hero__heading {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(1.65rem, 2.6vw, 2.7rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: var(--fg-on-dark);
    margin: 0 0 16px;
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
    font-size: clamp(13px, 0.95vw, 15px);
    line-height: 1.55;
    color: var(--fg-on-dark-dim);
    margin: 0 0 14px;
  }

  .hero__body :global(code) {
    display: block;
    margin-top: 14px;
    font-family: var(--font-mono);
    font-size: 0.82em;
    line-height: 1.45;
    color: var(--fg-on-dark);
    background: var(--v2-plate);
    border: 1px solid var(--v2-border);
    border-radius: var(--v2-radius);
    padding: 10px 12px;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .hero__install {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
    margin: 0 0 12px;
  }

  .hero__install-cmd {
    display: block;
    width: 100%;
    margin: 0;
    padding: 8px 10px;
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.45;
    color: var(--fg-on-dark);
    background: var(--v2-plate);
    border: 1px solid var(--v2-border);
    border-radius: var(--v2-radius);
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .hero__install-prompt {
    color: var(--accent);
    margin-right: 0.4em;
  }

  :global(.hero__install-copy[data-copy-managed='svelte']) {
    appearance: none;
    background: transparent;
    border: 1px solid rgba(var(--accent-rgb), 0.55);
    color: var(--accent);
    padding: 6px 10px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border-radius: var(--v2-radius);
    cursor: pointer;
  }

  .hero__ctas {
    display: flex;
    gap: 12px;
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
    border-radius: var(--v2-radius);
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
    background: var(--accent);
    color: var(--ink);
    border: 1px solid var(--accent);
    font-weight: 600;
  }

  .hero__cta--primary .hero__cta-arrow {
    color: var(--ink);
    font-size: 14px;
    transform: translateY(-0.5px);
  }

  .hero__cta--primary:hover,
  .hero__cta--primary:focus-visible {
    background: var(--fg-on-dark-hover);
    border-color: var(--fg-on-dark-hover);
    color: var(--ink);
  }

  .hero__cta--ghost {
    background: transparent;
    color: var(--fg-on-dark);
    border: 1px solid var(--v2-border-strong);
  }

  .hero__cta--ghost:hover,
  .hero__cta--ghost:focus-visible {
    border-color: var(--fg-on-dark);
  }

  @media print, (max-aspect-ratio: 1/3), (prefers-reduced-transparency: reduce) {
    .hero {
      height: auto;
      max-height: none;
      overflow: visible;
      display: block;
    }

    .hero__stage {
      display: none;
    }

    .hero__copy {
      margin: 24px 0 48px;
    }
  }

  @media (max-width: 720px) {
    .hero {
      grid-template-columns: 1fr;
      height: auto;
      max-height: none;
      min-height: 100dvh;
      padding: 88px 20px 32px;
      gap: 20px;
      align-items: stretch;
    }

    .hero__copy {
      max-width: none;
    }

    .hero__stage {
      width: 100%;
      height: min(62dvh, 560px);
      min-height: 320px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__cta {
      transition: none;
    }
  }
</style>
