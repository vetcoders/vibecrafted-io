<script lang="ts">
  import { getTranslations, type Lang } from '../lib/i18n';

  interface Props {
    lang?: Lang;
  }

  let { lang = 'en' }: Props = $props();

  const footer = $derived(getTranslations(lang).v2Chrome.footer);
</script>

<footer class="v2footer" aria-label={footer.ariaLabel}>
  <div class="v2footer__inner">
    <div class="v2footer__brand">
      <img
        src="/presence/logo-32.png"
        alt=""
        aria-hidden="true"
        width="24"
        height="24"
        class="v2footer__logo"
      />
      <span class="v2footer__wordmark">𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍<span class="v2footer__wordmark-dot" aria-hidden="true">.</span></span>
    </div>

    <p class="v2footer__byline">{footer.byline}</p>

    <a
      class="v2footer__vetcoders"
      href="https://vetcoders.io"
      rel="noopener noreferrer"
      target="_blank"
      aria-label="Vetcoders — AI in service of the animal"
    >
      <img
        src="/vetcoders-message.png"
        alt=""
        aria-hidden="true"
        class="v2footer__vetcoders-mark"
        width="78"
        height="22"
      />
      <span>vetcoders.io</span>
    </a>

    <p class="v2footer__tagline">{footer.tagline}</p>

    <nav class="v2footer__links" aria-label="Footer navigation">
      <a href={`/${lang}/quickstart/`}>{footer.quickstart}</a>
      <a href={`/${lang}/faq/`}>{footer.faq}</a>
      <a href="/newsletter/">{lang === 'pl' ? 'Newsletter' : 'Newsletter'}</a>
      <a href="https://github.com/vetcoders/vibecrafted" rel="noopener noreferrer" target="_blank">{footer.github}</a>
      <a href="https://github.com/vetcoders/vibecrafted/blob/main/LICENSE" rel="noopener noreferrer" target="_blank">{footer.license}</a>
      <a href="https://github.com/vetcoders/vibecrafted/blob/main/SECURITY.md" rel="noopener noreferrer" target="_blank">{footer.security}</a>
    </nav>

    <p class="v2footer__copyright">(c)2024–2026 LibraxisAI</p>
  </div>
</footer>

<style>
  .v2footer {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 48px 28px;
  }

  .v2footer__inner {
    border: 1px solid var(--v2-border, #27272a);
    border-radius: var(--v2-radius-lg, 16px);
    padding: 22px 28px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
    background: #121214;
  }

  .v2footer__brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .v2footer__logo {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }

  .v2footer__wordmark {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: var(--fg-on-dark);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .v2footer__wordmark-dot {
    color: var(--accent);
    margin-left: 1px;
  }

  .v2footer__byline {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    margin: -4px 0 0;
  }

  .v2footer__tagline {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    color: var(--fg-on-dark-dim);
    margin: 0;
    max-width: 48ch;
  }

  .v2footer__links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 22px;
    margin-top: 2px;
  }

  .v2footer__links a {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    transition: color 0.15s ease;
    padding: 4px 0;
  }

  .v2footer__links a:hover,
  .v2footer__links a:focus-visible {
    color: var(--fg-on-dark);
  }

  .v2footer__copyright {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    margin: 0;
  }

  /* Vetcoders signature — the AI <-> animal line-art (Creation of Adam, human
     hand to dog paw) by a vetcoders.io link. White line-art on the dark footer;
     faint at rest, brightens on hover. The one spark is the point. */
  .v2footer__vetcoders {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin: -2px 0 2px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    text-decoration: none;
    transition: color 0.18s ease;
  }

  .v2footer__vetcoders-mark {
    height: 22px;
    width: auto;
    opacity: 0.5;
    transition: opacity 0.18s ease;
  }

  .v2footer__vetcoders:hover,
  .v2footer__vetcoders:focus-visible {
    color: var(--fg-on-dark);
    outline: none;
  }

  .v2footer__vetcoders:hover .v2footer__vetcoders-mark,
  .v2footer__vetcoders:focus-visible .v2footer__vetcoders-mark {
    opacity: 0.92;
  }

  @media (max-width: 720px) {
    .v2footer {
      padding: 0 20px 22px;
    }

    .v2footer__inner {
      padding: 18px 18px 16px;
    }

    .v2footer__tagline {
      font-size: 13px;
    }

    .v2footer__links {
      gap: 6px 16px;
    }
  }
</style>
