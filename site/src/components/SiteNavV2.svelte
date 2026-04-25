<script lang="ts">
  import type { Lang } from '../lib/i18n';

  interface Props {
    /** Current page language — used to render PL/EN toggle. */
    lang?: Lang;
    /** Current URL path — used for active-page highlighting (e.g. '/en/faq/'). */
    currentPath?: string;
    /** Path to the sister-language page (e.g. '/pl/' from '/en/'). */
    toggleHref?: string;
    /** VetCoders GitHub org link (defaults to main org). */
    vcHref?: string;
    /** Vibecrafted repo link used by the GitHub icon. */
    githubHref?: string;
    /** One-liner installer command shown in the dropdown + copied by COPY. */
    installCommand?: string;
  }

  let {
    lang = 'en',
    currentPath = '/',
    toggleHref = lang === 'pl' ? '/en/' : '/pl/',
    vcHref = 'https://github.com/VetCoders',
    githubHref = 'https://github.com/VetCoders/vibecrafted',
    installCommand = 'curl -fsSL https://vibecrafted.io/install.sh | bash -s -- --gui',
  } = $props<Props>();

  const langPrefix = $derived(lang === 'pl' ? '/pl' : '/en');
  const homeHref = $derived(lang === 'pl' ? '/pl/' : '/');

  // Anchor map — hrefs are absolute paths to landing + hash so clicking from
  // a subpage navigates back to landing and then scrolls to the anchor.
  const anchors = $derived([
    { label: 'ABOUT', href: `${langPrefix}/#about` },
    { label: 'RUNTIME', href: `${langPrefix}/#framework` },
    { label: 'MARBLES', href: `${langPrefix}/#operator` },
    { label: 'DoU', href: `${langPrefix}/dou/`, isPage: true, pageMatch: `${langPrefix}/dou/` },
    { label: 'FAQ', href: `${langPrefix}/faq/`, isPage: true, pageMatch: `${langPrefix}/faq/` },
  ]);

  function isActive(anchor: { isPage?: boolean; pageMatch?: string }): boolean {
    if (!anchor.isPage || !anchor.pageMatch) return false;
    const normalized = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
    return normalized === anchor.pageMatch;
  }

  let dropdownOpen = $state(false);
  let copied = $state(false);
  let copyTimer: ReturnType<typeof setTimeout> | null = null;
  let openTimer: ReturnType<typeof setTimeout> | null = null;
  let closeTimer: ReturnType<typeof setTimeout> | null = null;
  let installWrapperEl: HTMLDivElement | undefined = $state();

  function scheduleOpen() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    if (dropdownOpen) return;
    if (openTimer) return;
    openTimer = setTimeout(() => { dropdownOpen = true; openTimer = null; }, 80);
  }

  function scheduleClose() {
    if (openTimer) { clearTimeout(openTimer); openTimer = null; }
    if (!dropdownOpen) return;
    if (closeTimer) return;
    closeTimer = setTimeout(() => { dropdownOpen = false; closeTimer = null; }, 140);
  }

  function openImmediately() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    if (openTimer) { clearTimeout(openTimer); openTimer = null; }
    dropdownOpen = true;
  }

  function closeDropdown() {
    if (openTimer) { clearTimeout(openTimer); openTimer = null; }
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    dropdownOpen = false;
  }

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(installCommand);
      copied = true;
      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(() => { copied = false; }, 1400);
    } catch {
      // Silent fallback — clipboard API can be blocked; no-op rather than throwing
      copied = false;
    }
  }

  // Close dropdown when clicking outside
  function handleDocClick(event: MouseEvent) {
    if (!installWrapperEl) return;
    if (!installWrapperEl.contains(event.target as Node)) {
      closeDropdown();
    }
  }

  $effect(() => {
    if (dropdownOpen) {
      document.addEventListener('click', handleDocClick);
      return () => document.removeEventListener('click', handleDocClick);
    }
  });

  $effect(() => {
    return () => {
      if (openTimer) clearTimeout(openTimer);
      if (closeTimer) clearTimeout(closeTimer);
    };
  });

  const toggleLabel = $derived(lang === 'pl' ? 'EN' : 'PL');
  const toggleHreflang = $derived(lang === 'pl' ? 'en' : 'pl');
</script>

<nav class="v2nav" aria-label="Primary">
  <a class="v2nav__brand" href={homeHref}>
    <span class="v2nav__brand-word">Vibecrafted</span><span class="v2nav__brand-dot" aria-hidden="true">.</span>
  </a>

  <div class="v2nav__anchors">
    {#each anchors as a}
      <a
        class={['v2nav__anchor', isActive(a) && 'v2nav__anchor--active']}
        href={a.href}
        aria-current={isActive(a) ? 'page' : undefined}
      >{a.label}</a>
    {/each}
  </div>

  <div class="v2nav__right">
    <div
      class="v2nav__install-wrap"
      bind:this={installWrapperEl}
    >
      <button
        type="button"
        class="v2nav__install"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onmouseenter={scheduleOpen}
        onmouseleave={scheduleClose}
        onfocus={openImmediately}
      >
        INSTALL<span class="v2nav__install-arrow" aria-hidden="true">▾</span>
      </button>

      <div
        class={['v2nav__dropdown', dropdownOpen && 'v2nav__dropdown--open']}
        role="menu"
        aria-hidden={!dropdownOpen}
        onmouseenter={openImmediately}
        onmouseleave={scheduleClose}
      >
        <span class="v2nav__dropdown-label">ONE-LINER</span>
        <div class="v2nav__dropdown-cmd-row">
          <code class="v2nav__dropdown-cmd">$ {installCommand}</code>
          <button
            type="button"
            class="v2nav__dropdown-copy"
            onclick={copyCommand}
            aria-label="Copy install command"
          >
            {copied ? '✓ COPIED' : 'COPY'}
          </button>
        </div>
      </div>
    </div>

    <a class="v2nav__vc" href={vcHref} rel="noopener noreferrer" target="_blank">VC</a>

    <a
      class="v2nav__toggle"
      href={toggleHref}
      hreflang={toggleHreflang}
      aria-label={`Switch to ${toggleHreflang.toUpperCase()}`}
    >
      {toggleLabel}
    </a>

    <a
      class="v2nav__github"
      href={githubHref}
      rel="noopener noreferrer"
      target="_blank"
      aria-label="GitHub repository"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12a12.01 12.01 0 0 0 8.208 11.387c.6.112.82-.262.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.09-.744.082-.729.082-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.833 2.807 1.304 3.492.998.108-.776.419-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.467-2.382 1.236-3.222-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 3.003-.404c1.02.005 2.047.138 3.005.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.807 5.624-5.479 5.921.43.372.814 1.102.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .318.217.694.825.576A12.012 12.012 0 0 0 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>
  </div>
</nav>

<style>
  .v2nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 22px 48px;
    gap: 24px;
    color: var(--fg-on-dark);
    background: rgba(14, 14, 12, 0.82);
    backdrop-filter: blur(12px) saturate(120%);
    -webkit-backdrop-filter: blur(12px) saturate(120%);
    border-bottom: 1px solid var(--rule-dark);
  }

  /* ── Brand ───────────────────────────────────────────────── */

  .v2nav__brand {
    justify-self: start;
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 400;
    line-height: 1;
    color: var(--fg-on-dark);
    letter-spacing: -0.005em;
    padding: 4px 0;
  }

  .v2nav__brand-dot {
    color: var(--accent);
    margin-left: 1px;
  }

  /* ── Center anchors ──────────────────────────────────────── */

  .v2nav__anchors {
    justify-self: center;
    display: flex;
    gap: 32px;
  }

  .v2nav__anchor {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    padding: 8px 0;
    position: relative;
    transition: color 0.15s ease;
  }

  .v2nav__anchor:hover,
  .v2nav__anchor:focus-visible {
    color: var(--fg-on-dark);
  }

  .v2nav__anchor::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    height: 1px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.18s ease;
  }

  .v2nav__anchor:hover::after,
  .v2nav__anchor:focus-visible::after {
    transform: scaleX(1);
  }

  .v2nav__anchor--active {
    color: var(--accent);
  }

  .v2nav__anchor--active::after {
    transform: scaleX(1);
  }

  /* ── Right stack ─────────────────────────────────────────── */

  .v2nav__right {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 22px;
  }

  /* ── Install pill + dropdown ─────────────────────────────── */

  .v2nav__install-wrap {
    position: relative;
  }

  .v2nav__install {
    appearance: none;
    background: transparent;
    border: 1px solid var(--accent);
    color: var(--accent);
    padding: 8px 14px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border-radius: 2px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .v2nav__install:hover,
  .v2nav__install:focus-visible {
    background: rgba(217, 119, 87, 0.1);
  }

  .v2nav__install-arrow {
    font-size: 9px;
    opacity: 0.75;
  }

  .v2nav__dropdown {
    position: fixed;
    top: 64px;
    left: 50%;
    transform: translate(-50%, -8px);
    width: min(880px, calc(100vw - 96px));
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 18px;
    padding: 14px 28px;
    background: rgba(14, 14, 12, 0.92);
    backdrop-filter: blur(14px) saturate(120%);
    -webkit-backdrop-filter: blur(14px) saturate(120%);
    border: 1px solid var(--rule-dark);
    border-radius: 2px;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.28s ease-out,
      transform 0.28s ease-out;
    z-index: 99;
  }

  .v2nav__dropdown--open {
    opacity: 1;
    transform: translate(-50%, 0);
    pointer-events: auto;
  }

  .v2nav__dropdown-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
  }

  .v2nav__dropdown-cmd-row {
    display: contents;
  }

  .v2nav__dropdown-cmd {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.02em;
    color: var(--fg-on-dark);
    white-space: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .v2nav__dropdown-cmd::-webkit-scrollbar {
    display: none;
  }

  .v2nav__dropdown-copy {
    appearance: none;
    background: transparent;
    border: 1px solid rgba(217, 119, 87, 0.55);
    color: var(--accent);
    padding: 6px 14px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    white-space: nowrap;
  }

  .v2nav__dropdown-copy:hover,
  .v2nav__dropdown-copy:focus-visible {
    background: rgba(217, 119, 87, 0.08);
    border-color: var(--accent);
  }

  /* ── VC link + toggle + github ───────────────────────────── */

  .v2nav__vc,
  .v2nav__toggle {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    transition: color 0.15s ease;
  }

  .v2nav__vc:hover,
  .v2nav__vc:focus-visible,
  .v2nav__toggle:hover,
  .v2nav__toggle:focus-visible {
    color: var(--fg-on-dark);
  }

  .v2nav__github {
    display: inline-flex;
    color: var(--fg-on-dark-mute);
    transition: color 0.15s ease;
  }

  .v2nav__github:hover,
  .v2nav__github:focus-visible {
    color: var(--fg-on-dark);
  }

  /* ── Responsive ──────────────────────────────────────────── */

  @media (max-width: 900px) {
    .v2nav {
      padding: 20px 24px;
      grid-template-columns: auto 1fr auto;
      gap: 16px;
    }

    .v2nav__anchors {
      display: none;
    }

    .v2nav__right {
      gap: 14px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .v2nav__anchor::after,
    .v2nav__dropdown,
    .v2nav__install,
    .v2nav__dropdown-copy {
      transition: none;
    }
  }

  @media (max-width: 720px) {
    .v2nav__dropdown {
      width: calc(100vw - 24px);
      grid-template-columns: 1fr;
      gap: 10px;
      padding: 14px 18px;
    }

    .v2nav__dropdown-cmd-row {
      display: contents;
    }
  }
</style>
