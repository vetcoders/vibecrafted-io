<script lang="ts">
  import { Tween, prefersReducedMotion } from 'svelte/motion';

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

  const panelOpacity = Tween.of(() => (mobileOpen ? 1 : 0), {
    duration: prefersReducedMotion.current ? 0 : 180,
  });
  const panelTranslateY = Tween.of(() => (mobileOpen ? 0 : -12), {
    duration: prefersReducedMotion.current ? 0 : 200,
  });
  const panelScale = Tween.of(() => (mobileOpen ? 1 : 0.985), {
    duration: prefersReducedMotion.current ? 0 : 200,
  });

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
      <a href={link.href} aria-current={link.current ? 'page' : undefined}>
        {link.label}
      </a>
    {/each}
    <div class="nav-get-zone">
      <a href={installHref}>{installLabel}</a>
      <a href={toggleHref} hreflang={toggleHreflang} lang={toggleLang} aria-label={toggleLabel}>
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

  <nav
    aria-hidden={!mobileOpen}
    aria-label="Primary mobile"
    class="nav-links nav-links--mobile"
    class:nav-links--mobile-open={mobileOpen}
    id="site-nav-mobile"
    inert={!mobileOpen}
    style={`opacity: ${panelOpacity.current}; transform: translateY(${panelTranslateY.current}px) scale(${panelScale.current}); visibility: ${mobileOpen ? 'visible' : 'hidden'}; pointer-events: ${mobileOpen ? 'auto' : 'none'};`}
  >
    {#each links as link}
      <a href={link.href} aria-current={link.current ? 'page' : undefined} onclick={handleLinkClick}>
        {link.label}
      </a>
    {/each}
    <div class="nav-get-zone">
      <a href={installHref} onclick={handleLinkClick}>{installLabel}</a>
      <a
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
</div>

<style>
  .site-nav {
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.85rem;
  }

  .nav-links--mobile {
    display: none;
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

    .nav-links--mobile:not(.nav-links--mobile-open) {
      max-height: 0;
      margin-top: 0;
      padding-top: 0;
      overflow: hidden;
      border-top-color: transparent;
    }

    .nav-links--mobile :global(a),
    .nav-links--mobile :global(.nav-get-zone),
    .nav-links--mobile :global(.nav-get-zone a) {
      flex: none;
      min-height: 3rem;
      padding: 0.1rem 0;
    }

    .nav-links--mobile :global(.nav-get-zone) {
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.65rem 1rem;
      padding-top: 0.35rem;
    }
  }
</style>
