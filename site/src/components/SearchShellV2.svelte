<script lang="ts">
  import type { Lang } from '../lib/i18n';

  interface Props {
    lang?: Lang;
  }

  let { lang = 'en' }: Props = $props();

  type Tab = 'all' | 'quickstart' | 'faq';

  const langPrefix = $derived(lang === 'pl' ? '/pl' : '/en');

  const tabs: Array<{ key: Tab; label: string }> = [
    { key: 'all', label: 'ALL SURFACES' },
    { key: 'quickstart', label: 'QUICK START' },
    { key: 'faq', label: 'FAQ' },
  ];

  const fastPaths = $derived([
    { label: 'Framework playground', href: `${langPrefix}/framework/` },
    { label: 'Guided installer', href: `${langPrefix}/install/` },
    { label: 'Read Quick Start', href: `${langPrefix}/quickstart/` },
    { label: 'Back to Overview', href: langPrefix === '/pl' ? '/pl/' : '/' },
  ]);

  let open = $state(false);
  let activeTab = $state<Tab>('all');
  let query = $state('');
  let shortcutLabel = $state('Ctrl K');
  let panelEl: HTMLDivElement | undefined = $state();
  let triggerEl: HTMLButtonElement | undefined = $state();
  let inputEl: HTMLInputElement | undefined = $state();

  function openPanel() {
    open = true;
    setTimeout(() => inputEl?.focus(), 0);
  }

  function closePanel() {
    open = false;
  }

  function togglePanel() {
    if (open) closePanel();
    else openPanel();
  }

  function handleKeydown(event: KeyboardEvent) {
    const isMod = event.metaKey || event.ctrlKey;
    if (isMod && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      togglePanel();
      return;
    }
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      closePanel();
      triggerEl?.focus();
    }
  }

  function handleDocClick(event: MouseEvent) {
    if (!open) return;
    const target = event.target as Node;
    if (panelEl?.contains(target) || triggerEl?.contains(target)) return;
    closePanel();
  }

  $effect(() => {
    const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform);
    shortcutLabel = isMac ? '⌘K' : 'Ctrl K';
  });

  $effect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleDocClick);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleDocClick);
    };
  });
</script>

<div class="v2search">
  {#if open}
    <div
      class="v2search__panel"
      bind:this={panelEl}
      role="dialog"
      aria-label="Search"
      aria-modal="false"
    >
      <div class="v2search__tabs" role="tablist">
        {#each tabs as tab}
          <button
            type="button"
            role="tab"
            class={['v2search__tab', activeTab === tab.key && 'v2search__tab--active']}
            aria-selected={activeTab === tab.key}
            onclick={() => (activeTab = tab.key)}
          >
            {tab.label}
          </button>
        {/each}
      </div>

      <p class="v2search__prompt">Ask for a command, product surface, or operating question.</p>

      <div class="v2search__section">
        <span class="v2search__section-label">FAST PATHS</span>
        <div class="v2search__fast-grid">
          {#each fastPaths as fp}
            <a href={fp.href} class="v2search__fast">{fp.label}</a>
          {/each}
        </div>
      </div>

      {#if query.trim().length >= 2}
        <div class="v2search__results">
          <span class="v2search__results-label">RESULTS</span>
          <p class="v2search__results-empty">
            Full-text search ships in the next iteration. For now, try Fast Paths above or the nav.
          </p>
        </div>
      {/if}
    </div>
  {/if}

  <button
    type="button"
    class="v2search__trigger"
    class:v2search__trigger--open={open}
    bind:this={triggerEl}
    onclick={togglePanel}
    aria-expanded={open}
    aria-haspopup="dialog"
    aria-label="Open search"
  >
    <span class="v2search__trigger-icon" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <circle cx="6" cy="6" r="4.5" />
        <path d="M9.5 9.5 L12.5 12.5" />
      </svg>
    </span>
    <input
      type="text"
      class="v2search__input"
      placeholder="Search framework, install, doctor…"
      bind:value={query}
      bind:this={inputEl}
      onfocus={openPanel}
      onclick={(e) => { e.stopPropagation(); openPanel(); }}
      aria-label="Search query"
    />
    <span class="v2search__kbd" aria-hidden="true">{shortcutLabel}</span>
  </button>
</div>

<style>
  .v2search {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 90;
    width: min(440px, calc(100vw - 48px));
    pointer-events: none;
  }

  .v2search > * {
    pointer-events: auto;
  }

  /* ── Trigger pill ────────────────────────────────────────── */

  .v2search__trigger {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 14px;
    border: 1px solid rgba(var(--accent-rgb), 0.45);
    border-radius: 999px;
    background: rgba(14, 14, 12, 0.88);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--fg-on-dark);
    font-family: var(--font-mono);
    cursor: text;
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .v2search__trigger:hover,
  .v2search__trigger:focus-within {
    background: rgba(14, 14, 12, 0.96);
  }

  .v2search__trigger--open {
    border-color: rgba(var(--accent-rgb), 0.65);
  }

  .v2search__trigger-icon {
    color: var(--accent);
    display: inline-flex;
  }

  .v2search__input {
    appearance: none;
    background: transparent;
    border: 0;
    outline: 0;
    padding: 4px 0;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--fg-on-dark);
    width: 100%;
  }

  .v2search__input::placeholder {
    color: var(--fg-on-dark-mute);
  }

  .v2search__kbd {
    flex-shrink: 0;
    padding: 3px 8px;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 999px;
  }

  /* ── Panel ───────────────────────────────────────────────── */

  .v2search__panel {
    position: absolute;
    right: 0;
    bottom: calc(100% + 12px);
    left: 0;
    padding: 20px 22px 22px;
    border: 1px solid rgba(var(--accent-rgb), 0.4);
    border-radius: 2px;
    background: rgba(14, 14, 12, 0.94);
    backdrop-filter: blur(14px) saturate(120%);
    -webkit-backdrop-filter: blur(14px) saturate(120%);
    display: flex;
    flex-direction: column;
    gap: 18px;
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.38);
    animation: v2search-slide-up 180ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes v2search-slide-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .v2search__tabs {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .v2search__tab {
    appearance: none;
    border: 1px solid var(--rule-dark);
    background: transparent;
    color: var(--fg-on-dark-mute);
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 999px;
    cursor: pointer;
    transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .v2search__tab:hover,
  .v2search__tab:focus-visible {
    color: var(--fg-on-dark);
  }

  .v2search__tab--active {
    color: var(--accent);
    border-color: rgba(var(--accent-rgb), 0.45);
    background: rgba(var(--accent-rgb), 0.06);
  }

  .v2search__prompt {
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.55;
    letter-spacing: 0.04em;
    color: var(--fg-on-dark-dim);
    margin: 0;
  }

  .v2search__section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .v2search__section-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .v2search__fast-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .v2search__fast {
    padding: 10px 16px;
    border: 1px solid var(--rule-dark);
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--fg-on-dark-dim);
    background: transparent;
    transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .v2search__fast:hover,
  .v2search__fast:focus-visible {
    color: var(--fg-on-dark);
    border-color: var(--accent);
    background: rgba(var(--accent-rgb), 0.06);
  }

  .v2search__results {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid var(--rule-dark-soft);
    padding-top: 14px;
  }

  .v2search__results-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
  }

  .v2search__results-empty {
    font-family: var(--font-body);
    font-size: 13px;
    line-height: 1.5;
    color: var(--fg-on-dark-dim);
    margin: 0;
  }

  /* ── Responsive ──────────────────────────────────────────── */

  @media (max-width: 720px) {
    .v2search {
      right: 12px;
      bottom: 12px;
      width: calc(100vw - 24px);
    }
    .v2search__panel {
      padding: 16px;
    }
    .v2search__fast-grid {
      flex-direction: column;
    }
    .v2search__fast {
      text-align: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .v2search__panel {
      animation: none;
    }
    .v2search__trigger,
    .v2search__tab,
    .v2search__fast {
      transition: none;
    }
  }
</style>
