<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import { fade, scale } from 'svelte/transition';

  // Satisfy Vite's SSR-side import analysis; the template consumes these transitions.
  const templateTransitions = { fade, scale };
  void templateTransitions;

  interface NavLink {
    href: string;
    label: string;
    current?: boolean;
  }

  interface Props {
    links: NavLink[];
    installHref: string;
    installLabel: string;
    toggleHref: string;
    toggleLabel: string;
    toggleHreflang: string;
    toggleLang: string;
    githubLabel: string;
    menuLabel: string;
    closeLabel: string;
  }

  let {
    links,
    installHref,
    installLabel,
    toggleHref,
    toggleLabel,
    toggleHreflang,
    toggleLang,
    githubLabel,
    menuLabel,
    closeLabel,
  }: Props = $props();

  let mobileOpen = $state(false);
  let innerWidth = $state(1280);
  const panelDuration = $derived(prefersReducedMotion.current ? 0 : 190);

  function closeNav() {
    mobileOpen = false;
  }

  function handleLinkClick() {
    closeNav();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeNav();
    }
  }

  $effect(() => {
    if (innerWidth > 720 && mobileOpen) {
      closeNav();
    }
  });
</script>

<svelte:window bind:innerWidth={innerWidth} onkeydown={handleKeydown} />

<div class="site-nav">
  <nav aria-label="Primary" class="nav-links nav-links--desktop">
    {#each links as link}
      <a
        class="nav-link"
        class:nav-link--current={Boolean(link.current)}
        href={link.href}
        aria-current={link.current ? 'page' : undefined}
      >
        {link.label}
      </a>
    {/each}
    <div class="nav-get-zone">
      <a class="nav-link nav-link--install" href={installHref}>{installLabel}</a>
      <a
        class="nav-link nav-link--toggle"
        href={toggleHref}
        hreflang={toggleHreflang}
        lang={toggleLang}
        aria-label={toggleLabel}
      >
        {toggleLabel}
      </a>
      <a
        aria-label={githubLabel}
        class="nav-icon-link"
        href="https://github.com/VetCoders/vibecrafted"
        rel="noopener noreferrer"
      >
        <svg aria-hidden="true" class="nav-icon" viewBox="0 0 24 24">
          <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.51v-1.81c-2.94.64-3.56-1.24-3.56-1.24-.48-1.22-1.16-1.55-1.16-1.55-.95-.65.07-.63.07-.63 1.05.07 1.6 1.08 1.6 1.08.94 1.6 2.45 1.14 3.04.87.09-.68.37-1.14.66-1.4-2.35-.27-4.82-1.18-4.82-5.25 0-1.16.41-2.1 1.08-2.84-.11-.27-.47-1.36.1-2.83 0 0 .88-.28 2.89 1.08a10.08 10.08 0 0 1 5.26 0c2-1.36 2.88-1.08 2.88-1.08.58 1.47.22 2.56.11 2.83.67.74 1.08 1.68 1.08 2.84 0 4.08-2.48 4.97-4.85 5.23.38.33.72.97.72 1.95v2.89c0 .28.19.62.73.51A10.5 10.5 0 0 0 12 1.5Z"></path>
        </svg>
      </a>
    </div>
  </nav>

  <button
    aria-controls="site-nav-mobile"
    aria-expanded={mobileOpen}
    aria-label={mobileOpen ? closeLabel : menuLabel}
    class="nav-toggle"
    type="button"
    onclick={() => (mobileOpen = !mobileOpen)}
  >
    <span class="nav-toggle__label">{mobileOpen ? closeLabel : menuLabel}</span>
    <span aria-hidden="true" class="nav-toggle__glyph" class:nav-toggle__glyph--open={mobileOpen}>
      <span></span>
      <span></span>
    </span>
  </button>

  {#if mobileOpen}
    <nav
      aria-label="Primary mobile"
      class="nav-links nav-links--mobile"
      id="site-nav-mobile"
      in:scale={{ duration: panelDuration, start: 0.985 }}
      out:fade={{ duration: panelDuration }}
    >
      {#each links as link}
        <a
          class="nav-link"
          class:nav-link--current={Boolean(link.current)}
          href={link.href}
          aria-current={link.current ? 'page' : undefined}
          onclick={handleLinkClick}
        >
          {link.label}
        </a>
      {/each}
      <div class="nav-get-zone">
        <a class="nav-link nav-link--install" href={installHref} onclick={handleLinkClick}>
          {installLabel}
        </a>
        <a
          class="nav-link nav-link--toggle"
          href={toggleHref}
          hreflang={toggleHreflang}
          lang={toggleLang}
          aria-label={toggleLabel}
          onclick={handleLinkClick}
        >
          {toggleLabel}
        </a>
        <a
          aria-label={githubLabel}
          class="nav-icon-link"
          href="https://github.com/VetCoders/vibecrafted"
          rel="noopener noreferrer"
          onclick={handleLinkClick}
        >
          <svg aria-hidden="true" class="nav-icon" viewBox="0 0 24 24">
            <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.51v-1.81c-2.94.64-3.56-1.24-3.56-1.24-.48-1.22-1.16-1.55-1.16-1.55-.95-.65.07-.63.07-.63 1.05.07 1.6 1.08 1.6 1.08.94 1.6 2.45 1.14 3.04.87.09-.68.37-1.14.66-1.4-2.35-.27-4.82-1.18-4.82-5.25 0-1.16.41-2.1 1.08-2.84-.11-.27-.47-1.36.1-2.83 0 0 .88-.28 2.89 1.08a10.08 10.08 0 0 1 5.26 0c2-1.36 2.88-1.08 2.88-1.08.58 1.47.22 2.56.11 2.83.67.74 1.08 1.68 1.08 2.84 0 4.08-2.48 4.97-4.85 5.23.38.33.72.97.72 1.95v2.89c0 .28.19.62.73.51A10.5 10.5 0 0 0 12 1.5Z"></path>
          </svg>
        </a>
      </div>
    </nav>
  {/if}
</div>

<style>
  .site-nav {
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.85rem;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: clamp(10px, 1vw, 18px);
    flex-wrap: wrap;
    justify-content: flex-end;
    min-width: 0;
    color: var(--steel-dark);
    font-family: var(--font-mono);
    font-size: clamp(0.66rem, 0.74vw, 0.72rem);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    min-height: 3rem;
    padding-block: var(--space-xs);
    color: var(--steel-dark);
    font-weight: 500;
    text-decoration: none;
    transition:
      color 0.2s ease,
      transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
      text-shadow 0.18s ease;
  }

  .nav-link:hover,
  .nav-link:focus-visible {
    color: var(--steel);
    transform: translateY(-1px);
    text-shadow: 0 0 14px rgba(163, 184, 199, 0.12);
  }

  .nav-link--current {
    color: var(--copper);
  }

  .nav-get-zone {
    display: inline-flex;
    align-items: center;
    gap: 1.25rem;
  }

  .nav-link--toggle {
    position: relative;
  }

  .nav-link--toggle::before {
    content: '';
    position: absolute;
    left: -0.625rem;
    top: 50%;
    width: 1px;
    height: 14px;
    background-color: var(--glass-panel-border);
    transform: translateY(-50%);
  }

  .nav-icon-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
    border: 1px solid transparent;
    border-radius: 999px;
    color: var(--steel-dark);
    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      color 0.2s ease,
      transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.18s ease;
  }

  .nav-icon-link:hover,
  .nav-icon-link:focus-visible {
    color: var(--steel);
    border-color: var(--steel-border-subtle);
    background: var(--steel-bg-subtle);
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
  }

  .nav-icon {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
  }

  .nav-toggle {
    display: none;
  }

  .nav-toggle__glyph {
    display: grid;
    gap: 4px;
  }

  .nav-toggle__glyph span {
    display: block;
    width: 14px;
    height: 1.5px;
    border-radius: 999px;
    background: currentColor;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .nav-links--mobile {
    transform-origin: top right;
    will-change: transform, opacity;
  }

  .nav-toggle__glyph--open span:first-child {
    transform: translateY(2.75px) rotate(45deg);
  }

  .nav-toggle__glyph--open span:last-child {
    transform: translateY(-2.75px) rotate(-45deg);
  }

  @media (max-width: 720px) {
    .site-nav {
      width: 100%;
      display: grid;
      justify-items: end;
    }

    .nav-links--desktop {
      display: none;
    }

    .nav-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      min-height: 3rem;
      padding: 0 0.95rem;
      border: 1px solid var(--steel-border-subtle);
      border-radius: 999px;
      background: var(--mobile-nav-toggle-bg);
      color: var(--stone-light);
      font-family: var(--font-mono);
      font-size: 0.64rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .nav-links--mobile {
      display: flex;
      width: min(100%, 42rem);
      flex-direction: column;
      align-items: stretch;
      gap: 0.15rem;
      padding-top: 0.75rem;
      margin-top: 0.1rem;
      border-top: 1px solid var(--glass-panel-border);
    }

    .nav-links--mobile .nav-link,
    .nav-links--mobile .nav-get-zone,
    .nav-links--mobile .nav-icon-link {
      flex: none;
      min-height: 3rem;
      padding: 0.1rem 0;
    }

    .nav-links--mobile .nav-get-zone {
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.65rem 1rem;
      padding-top: 0.35rem;
    }

    .nav-links--mobile .nav-link--toggle::before {
      display: none;
    }
  }
</style>
