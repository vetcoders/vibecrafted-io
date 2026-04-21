<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import { fade, fly } from 'svelte/transition';

  // Satisfy Vite's SSR-side import analysis; the template consumes these transitions.
  const templateTransitions = { fade, fly };
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
    vcHref: string;
    vcLabel: string;
    vcTitle?: string;
    toggleHref: string;
    toggleLabel: string;
    toggleHreflang: string;
    toggleLang: string;
    githubLabel: string;
    menuLabel: string;
    closeLabel: string;
    primaryNavLabel: string;
  }

  let {
    links,
    installHref,
    installLabel,
    vcHref,
    vcLabel,
    vcTitle,
    toggleHref,
    toggleLabel,
    toggleHreflang,
    toggleLang,
    githubLabel,
    menuLabel,
    closeLabel,
    primaryNavLabel,
  }: Props = $props();

  let mobileOpen = $state(false);
  let innerWidth = $state(1280);
  const panelDuration = $derived(prefersReducedMotion.current ? 0 : 190);
  const backdropDuration = $derived(prefersReducedMotion.current ? 0 : 140);

  function closeNav() {
    mobileOpen = false;
  }

  function handleLinkClick() {
    window.setTimeout(closeNav, 0);
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
  <nav aria-label={primaryNavLabel} class="nav-links nav-links--desktop">
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
        class="nav-link nav-link--vc"
        href={vcHref}
        rel="noopener noreferrer"
        target="_blank"
        title={vcTitle ?? vcLabel}
      >
        {vcLabel}
      </a>
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
    <button
      class="nav-backdrop"
      type="button"
      aria-label={closeLabel}
      onclick={closeNav}
      in:fade={{ duration: backdropDuration }}
      out:fade={{ duration: backdropDuration }}
    ></button>
    <nav
      aria-label={primaryNavLabel}
      class="nav-links nav-links--mobile"
      id="site-nav-mobile"
      in:fly={{ duration: panelDuration, y: -10 }}
      out:fade={{ duration: panelDuration }}
    >
      {#each links as link, index}
        <a
          class="nav-link nav-link--mobile-item"
          class:nav-link--current={Boolean(link.current)}
          href={link.href}
          aria-current={link.current ? 'page' : undefined}
          onclick={handleLinkClick}
          style={`--nav-item-index: ${index};`}
        >
          {link.label}
        </a>
      {/each}
      <div class="nav-get-zone nav-get-zone--mobile">
        <a
          class="nav-link nav-link--install nav-link--mobile-item"
          href={installHref}
          onclick={handleLinkClick}
          style={`--nav-item-index: ${links.length};`}
        >
          {installLabel}
        </a>
        <a
          class="nav-link nav-link--vc nav-link--mobile-item"
          href={vcHref}
          rel="noopener noreferrer"
          target="_blank"
          title={vcTitle ?? vcLabel}
          onclick={handleLinkClick}
          style={`--nav-item-index: ${links.length + 1};`}
        >
          {vcLabel}
        </a>
        <a
          class="nav-link nav-link--toggle nav-link--mobile-item"
          href={toggleHref}
          hreflang={toggleHreflang}
          lang={toggleLang}
          aria-label={toggleLabel}
          onclick={handleLinkClick}
          style={`--nav-item-index: ${links.length + 2};`}
        >
          {toggleLabel}
        </a>
        <a
          aria-label={githubLabel}
          class="nav-icon-link nav-link--mobile-item"
          href="https://github.com/VetCoders/vibecrafted"
          rel="noopener noreferrer"
          onclick={handleLinkClick}
          style={`--nav-item-index: ${links.length + 3};`}
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
    position: relative;
    z-index: 6;
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
    position: relative;
    display: inline-flex;
    isolation: isolate;
    align-items: center;
    min-height: 2.5rem;
    padding: 0.55rem 0.45rem 0.6rem;
    color: var(--steel-dark);
    font-weight: 500;
    text-decoration: none;
    transition:
      color 0.2s ease,
      text-shadow 0.2s ease;
  }

  .nav-link--button {
    appearance: none;
    border: 0;
    background: none;
    cursor: pointer;
    font: inherit;
  }

  /* Top copper underline — matches phase-bar active marker (Image #33) */
  .nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0.1rem;
    right: 0.1rem;
    height: 1.5px;
    background: var(--copper);
    opacity: 0;
    transform: scaleX(0.3);
    transform-origin: center;
    transition:
      opacity 0.22s ease,
      transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Subtle shine sweep on hover */
  .nav-link::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      115deg,
      transparent 40%,
      rgba(212, 144, 92, 0.14) 50%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .nav-link:hover,
  .nav-link:focus-visible {
    color: var(--copper);
    text-shadow: 0 0 10px rgba(212, 144, 92, 0.18);
  }

  .nav-link:hover::before,
  .nav-link:focus-visible::before {
    opacity: 0.75;
    transform: scaleX(1);
  }

  .nav-link:hover::after,
  .nav-link:focus-visible::after {
    opacity: 1;
    animation: nav-shine 0.55s ease-out;
  }

  @keyframes nav-shine {
    0% {
      background-position: -120% 0;
    }
    100% {
      background-position: 120% 0;
    }
  }

  .nav-link--current {
    color: var(--copper);
  }

  .nav-link--current::before {
    opacity: 1;
    transform: scaleX(1);
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

  .nav-backdrop {
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
      position: relative;
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
      transition:
        transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 0.22s ease,
        border-color 0.18s ease,
        background 0.18s ease;
    }

    .nav-toggle:hover,
    .nav-toggle:focus-visible {
      transform: translateY(-1px);
      box-shadow: 0 12px 26px rgba(0, 0, 0, 0.18);
      border-color: rgba(212, 144, 92, 0.28);
    }

    .nav-toggle:active {
      transform: translateY(0) scale(0.985);
    }

    .nav-links--mobile {
      display: flex;
      width: min(100%, 42rem);
      flex-direction: column;
      align-items: stretch;
      gap: 0.15rem;
      position: absolute;
      top: calc(100% + 0.55rem);
      right: 0;
      z-index: 15;
      padding: 0.85rem 0.8rem 0.9rem;
      border: 1px solid rgba(216, 206, 188, 0.16);
      background:
        linear-gradient(180deg, rgba(11, 13, 16, 0.95), rgba(9, 11, 14, 0.78)),
        radial-gradient(circle at top right, rgba(184, 115, 51, 0.18), transparent 44%);
      backdrop-filter: blur(20px) saturate(118%);
      -webkit-backdrop-filter: blur(20px) saturate(118%);
      border-radius: 1.2rem;
      box-shadow:
        0 24px 50px rgba(0, 0, 0, 0.28),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .nav-links--mobile .nav-link,
    .nav-links--mobile .nav-get-zone,
    .nav-links--mobile .nav-icon-link {
      flex: none;
      min-height: 3rem;
      padding: 0.1rem 0.2rem;
    }

    .nav-links--mobile .nav-link--search {
      grid-column: 1 / -1;
      justify-content: center;
    }

    .nav-link--mobile-item {
      opacity: 0;
      animation: nav-item-settle 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      animation-delay: calc(var(--nav-item-index, 0) * 28ms);
    }

  .nav-links--mobile .nav-link {
      border-radius: 0.9rem;
      padding-inline: 0.8rem;
      background: rgba(255, 255, 255, 0.02);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
    }

    .nav-links--mobile .nav-link::before {
      inset: 0;
      border-radius: inherit;
    }

    .nav-links--mobile .nav-link:hover,
    .nav-links--mobile .nav-link:focus-visible,
    .nav-links--mobile .nav-link--current {
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-links--mobile .nav-get-zone {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.65rem;
      padding-top: 0.45rem;
      margin-top: 0.25rem;
      border-top: 1px solid rgba(216, 206, 188, 0.12);
    }

    .nav-links--mobile .nav-link--toggle::before {
      display: none;
    }

    .nav-links--mobile .nav-link--install,
    .nav-links--mobile .nav-link--toggle {
      justify-content: center;
    }

    .nav-links--mobile .nav-icon-link {
      width: 100%;
      min-width: 0;
      justify-self: stretch;
      grid-column: 1 / -1;
      border-color: rgba(163, 184, 199, 0.14);
      border-radius: 0.9rem;
      background: rgba(255, 255, 255, 0.02);
    }

    .nav-backdrop {
      display: block;
      position: fixed;
      inset: calc(var(--nav-height) + 0.25rem) 0 0;
      z-index: 10;
      border: 0;
      padding: 0;
      background:
        linear-gradient(180deg, rgba(7, 8, 10, 0.16), rgba(7, 8, 10, 0.5)),
        radial-gradient(circle at top right, rgba(184, 115, 51, 0.1), transparent 30%);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      cursor: pointer;
    }
  }

  @keyframes nav-item-settle {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
