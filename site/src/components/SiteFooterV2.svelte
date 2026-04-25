<script lang="ts">
  import type { Lang } from '../lib/i18n';

  interface Props {
    lang?: Lang;
  }

  let { lang = 'en' }: Props = $props();
</script>

<footer class="v2footer" aria-label="Site footer">
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
      <span class="v2footer__wordmark">VIBECRAFTED</span>
    </div>

    <p class="v2footer__byline">with AI Agents by VetCoders</p>
    <p class="v2footer__tagline">From AI-generated repo to launch-ready product.</p>

    <nav class="v2footer__links" aria-label="Footer navigation">
      <a href={`/${lang}/quickstart/`}>Quick Start</a>
      <a href={`/${lang}/faq/`}>FAQ</a>
      <a href="https://github.com/VetCoders/vibecrafted" rel="noopener noreferrer" target="_blank">GitHub</a>
      <a href="https://github.com/VetCoders/vibecrafted/blob/main/LICENSE" rel="noopener noreferrer" target="_blank">License (BSL 1.1)</a>
      <a href="https://github.com/VetCoders/vibecrafted/blob/main/SECURITY.md" rel="noopener noreferrer" target="_blank">Security</a>
    </nav>

    <p class="v2footer__copyright">(c)2024–2026 VetCoders</p>
  </div>
</footer>

<style>
  .v2footer {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 48px 48px;
  }

  .v2footer__inner {
    border: 1px solid var(--rule-dark);
    border-radius: 2px;
    padding: 40px 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    text-align: center;
    background: rgba(14, 14, 12, 0.4);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .v2footer__brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }

  .v2footer__logo {
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }

  .v2footer__wordmark {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark);
  }

  .v2footer__byline {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    margin: -10px 0 0;
  }

  .v2footer__tagline {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.45;
    color: var(--fg-on-dark-dim);
    margin: 0;
    max-width: 48ch;
  }

  .v2footer__links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px 26px;
    margin-top: 4px;
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

  @media (max-width: 720px) {
    .v2footer {
      padding: 0 24px 32px;
    }

    .v2footer__inner {
      padding: 28px 20px 24px;
    }

    .v2footer__tagline {
      font-size: 15px;
    }

    .v2footer__links {
      gap: 8px 18px;
    }
  }
</style>
