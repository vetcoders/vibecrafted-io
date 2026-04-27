<script lang="ts">
  import { getTranslations, type Lang } from '../lib/i18n';

  interface Props {
    lang?: Lang;
  }

  let { lang = 'en' }: Props = $props();

  type Tab = 'all' | 'quickstart' | 'faq';

  const labels = $derived(getTranslations(lang).v2Chrome.search);
  const langPrefix = $derived(lang === 'pl' ? '/pl' : '/en');

  const tabs: Array<{ key: Tab; label: string }> = $derived([
    { key: 'all', label: labels.tabs.all },
    { key: 'quickstart', label: labels.tabs.quickstart },
    { key: 'faq', label: labels.tabs.faq },
  ]);

  const fastPaths = $derived([
    { label: labels.fastPaths.framework, href: `${langPrefix}/framework/` },
    { label: labels.fastPaths.install, href: `${langPrefix}/install/` },
    { label: labels.fastPaths.quickstart, href: `${langPrefix}/quickstart/` },
    { label: labels.fastPaths.overview, href: langPrefix === '/pl' ? '/pl/' : '/' },
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
      aria-label={labels.ariaLabel}
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

      <p class="v2search__prompt">{labels.prompt}</p>

      <div class="v2search__section">
        <span class="v2search__section-label">{labels.fastPathsLabel}</span>
        <div class="v2search__fast-grid">
          {#each fastPaths as fp}
            <a href={fp.href} class="v2search__fast">{fp.label}</a>
          {/each}
        </div>
      </div>

      {#if query.trim().length >= 2}
        <div class="v2search__results">
          <span class="v2search__results-label">{labels.resultsLabel}</span>
          <p class="v2search__results-empty">
            {labels.empty}
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
    aria-label={labels.openAria}
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
      placeholder={labels.placeholder}
      bind:value={query}
      bind:this={inputEl}
      onfocus={openPanel}
      onclick={(e) => { e.stopPropagation(); openPanel(); }}
      aria-label={labels.queryAria}
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
    --v2search-line: rgba(var(--v2-ink-rgb), 0.24);
    --v2search-line-strong: rgba(var(--v2-ink-rgb), 0.46);
    --v2search-paper-film: rgba(var(--v2-paper-rgb), 0.34);
    --v2search-paper-film-strong: rgba(var(--v2-paper-rgb), 0.46);
    --v2search-paper-edge: rgba(var(--v2-paper-rgb), 0.28);
    --v2search-ink: rgba(var(--v2-ink-rgb), 0.88);
    --v2search-ink-dim: rgba(var(--v2-ink-rgb), 0.58);
    --v2search-ink-mute: rgba(var(--v2-ink-rgb), 0.38);
    --v2search-shadow: 0 18px 44px rgba(var(--v2-ink-rgb), 0.12);
  }

  .v2search > * {
    pointer-events: auto;
  }

  /* ── Immersive paper instrument ─────────────────────────── */

  .v2search__trigger {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 42px;
    padding: 8px 12px;
    border: 1px solid var(--v2search-line);
    border-radius: 0;
    background:
      linear-gradient(180deg, rgba(var(--v2-paper-rgb), 0.10), rgba(var(--v2-paper-rgb), 0.02)),
      var(--v2search-paper-film);
    backdrop-filter: blur(18px) saturate(0.92) contrast(0.96);
    -webkit-backdrop-filter: blur(18px) saturate(0.92) contrast(0.96);
    color: var(--v2search-ink);
    font-family: var(--font-mono);
    cursor: text;
    box-shadow:
      var(--v2search-shadow),
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      inset 0 -1px 0 rgba(var(--v2-ink-rgb), 0.10);
    transition:
      border-color 0.18s ease,
      background 0.18s ease,
      box-shadow 0.18s ease;
  }

  .v2search__trigger::before,
  .v2search__panel::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(circle at 18% 30%, rgba(var(--v2-paper-rgb), 0.22) 0 1px, transparent 1.6px),
      radial-gradient(circle at 82% 66%, rgba(var(--v2-ink-rgb), 0.10) 0 0.8px, transparent 1.4px),
      repeating-linear-gradient(90deg, rgba(var(--v2-ink-rgb), 0.035) 0 1px, transparent 1px 7px);
    background-size: 13px 13px, 17px 17px, 100% 100%;
    mix-blend-mode: multiply;
    opacity: 0.42;
  }

  .v2search__trigger:hover,
  .v2search__trigger:focus-within {
    border-color: var(--v2search-line-strong);
    background:
      linear-gradient(180deg, rgba(var(--v2-paper-rgb), 0.14), rgba(var(--v2-paper-rgb), 0.04)),
      var(--v2search-paper-film-strong);
  }

  .v2search__trigger--open {
    border-color: rgba(var(--accent-rgb), 0.58);
    box-shadow:
      0 18px 48px rgba(var(--v2-ink-rgb), 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.22),
      inset 0 -1px 0 rgba(var(--v2-ink-rgb), 0.12);
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
    color: var(--v2search-ink);
    width: 100%;
  }

  .v2search__input::placeholder {
    color: var(--v2search-ink-mute);
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
    border: 1px solid rgba(var(--accent-rgb), 0.56);
    border-radius: 0;
    background: rgba(var(--v2-paper-rgb), 0.12);
  }

  /* ── Panel ───────────────────────────────────────────────── */

  .v2search__panel {
    position: absolute;
    right: 0;
    bottom: calc(100% + 12px);
    left: 0;
    isolation: isolate;
    padding: 20px 22px 22px;
    border: 1px solid var(--v2search-line);
    border-radius: 0;
    background:
      linear-gradient(180deg, rgba(var(--v2-paper-rgb), 0.18), rgba(var(--v2-paper-rgb), 0.06)),
      var(--v2search-paper-film-strong);
    backdrop-filter: blur(24px) saturate(0.92) contrast(0.96);
    -webkit-backdrop-filter: blur(24px) saturate(0.92) contrast(0.96);
    display: flex;
    flex-direction: column;
    gap: 18px;
    box-shadow:
      0 24px 64px rgba(var(--v2-ink-rgb), 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.22),
      inset 0 -1px 0 rgba(var(--v2-ink-rgb), 0.10);
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
    border: 1px solid rgba(var(--v2-ink-rgb), 0.18);
    background: transparent;
    color: var(--v2search-ink-dim);
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 0;
    cursor: pointer;
    transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .v2search__tab:hover,
  .v2search__tab:focus-visible {
    color: var(--v2search-ink);
  }

  .v2search__tab--active {
    color: var(--v2search-ink);
    border-color: rgba(var(--accent-rgb), 0.45);
    background: rgba(var(--accent-rgb), 0.09);
  }

  .v2search__prompt {
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.55;
    letter-spacing: 0.04em;
    color: var(--v2search-ink-dim);
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
    border: 1px solid rgba(var(--v2-ink-rgb), 0.18);
    border-radius: 0;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--v2search-ink-dim);
    background: transparent;
    transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .v2search__fast:hover,
  .v2search__fast:focus-visible {
    color: var(--v2search-ink);
    border-color: var(--accent);
    background: rgba(var(--accent-rgb), 0.09);
  }

  .v2search__results {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid rgba(var(--v2-ink-rgb), 0.12);
    padding-top: 14px;
  }

  .v2search__results-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--v2search-ink-mute);
  }

  .v2search__results-empty {
    font-family: var(--font-body);
    font-size: 13px;
    line-height: 1.5;
    color: var(--v2search-ink-dim);
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
