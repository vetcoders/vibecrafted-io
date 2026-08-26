<script lang="ts">
  import { getTranslations, type Lang } from '../lib/i18n';
  import {
    searchDocs,
    type DocsSearchData,
    type DocsSearchSection,
  } from '../lib/search/docs-search';

  interface Props {
    lang?: Lang;
    searchDataAll: DocsSearchData;
    searchDataQuickstart: DocsSearchData;
    searchDataFaq: DocsSearchData;
  }

  let {
    lang = 'en',
    searchDataAll,
    searchDataQuickstart,
    searchDataFaq,
  }: Props = $props();

  type Tab = DocsSearchSection;

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
  let surface = $state<'ink' | 'paper'>('ink');
  let panelEl: HTMLDivElement | undefined = $state();
  let triggerEl: HTMLButtonElement | undefined = $state();
  let inputEl: HTMLInputElement | undefined = $state();
  let activeIndex = $state(-1);
  let surfaceFrame = 0;

  const activeData = $derived(
    activeTab === 'quickstart'
      ? searchDataQuickstart
      : activeTab === 'faq'
        ? searchDataFaq
        : searchDataAll,
  );
  const hasQuery = $derived(query.trim().length >= 2);
  const results = $derived(searchDocs(activeData.items, lang, query));

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
      return;
    }

    if (!open || !hasQuery || results.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % results.length;
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      activeIndex = (activeIndex - 1 + results.length) % results.length;
      return;
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      window.location.assign(results[activeIndex].href);
    }
  }

  function handleDocClick(event: MouseEvent) {
    if (!open) return;
    const target = event.target as Node;
    if (panelEl?.contains(target) || triggerEl?.contains(target)) return;
    closePanel();
  }

  function syncSurface() {
    surfaceFrame = 0;
    if (typeof document === 'undefined' || !triggerEl) return;

    const rect = triggerEl.getBoundingClientRect();
    const x = Math.max(0, Math.min(window.innerWidth - 1, rect.left + rect.width * 0.5));
    const y = Math.max(0, Math.min(window.innerHeight - 1, rect.top + rect.height * 0.5));
    const stack = document.elementsFromPoint(x, y);
    const backing = stack.find((element) => !element.closest('.v2search'));

    surface = backing?.closest('.v2-section--paper') ? 'paper' : 'ink';
  }

  function scheduleSurfaceSync() {
    if (surfaceFrame || typeof window === 'undefined') return;
    surfaceFrame = window.requestAnimationFrame(syncSurface);
  }

  $effect(() => {
    const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform);
    shortcutLabel = isMac ? '⌘K' : 'Ctrl K';
  });

  $effect(() => {
    if (!hasQuery || results.length === 0) {
      activeIndex = -1;
      return;
    }

    if (activeIndex < 0 || activeIndex >= results.length) {
      activeIndex = 0;
    }
  });

  $effect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleDocClick);
    window.addEventListener('scroll', scheduleSurfaceSync, { passive: true });
    window.addEventListener('resize', scheduleSurfaceSync, { passive: true });
    document.addEventListener('astro:page-load', scheduleSurfaceSync);
    scheduleSurfaceSync();
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleDocClick);
      window.removeEventListener('scroll', scheduleSurfaceSync);
      window.removeEventListener('resize', scheduleSurfaceSync);
      document.removeEventListener('astro:page-load', scheduleSurfaceSync);
      if (surfaceFrame) window.cancelAnimationFrame(surfaceFrame);
    };
  });
</script>

<div class="v2search" data-surface={surface}>
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

      {#if hasQuery}
        <div class="v2search__results">
          <span class="v2search__results-label">{activeData.resultsLabel}</span>
          {#if results.length > 0}
            <div class="v2search__result-list" role="listbox" aria-label={activeData.resultsLabel}>
              {#each results as result, index (result.href)}
                <a
                  class="v2search__result"
                  class:v2search__result--active={index === activeIndex}
                  href={result.href}
                  role="option"
                  aria-selected={index === activeIndex}
                  onmouseenter={() => (activeIndex = index)}
                >
                  <span class="v2search__result-title">{result.title}</span>
                  <span class="v2search__result-body">{result.body}</span>
                </a>
              {/each}
            </div>
          {:else}
            <p class="v2search__results-empty">
              {activeData.noResultsLabel}
            </p>
          {/if}
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
    --v2search-line: rgba(var(--v2-paper-rgb), 0.22);
    --v2search-line-strong: rgba(var(--v2-paper-rgb), 0.38);
    --v2search-film: rgba(var(--v2-paper-rgb), 0.045);
    --v2search-film-strong: rgba(var(--v2-paper-rgb), 0.075);
    --v2search-fiber-a: rgba(var(--v2-paper-rgb), 0.12);
    --v2search-fiber-b: rgba(var(--v2-paper-rgb), 0.055);
    --v2search-text: var(--fg-on-dark);
    --v2search-text-dim: var(--fg-on-dark-dim);
    --v2search-text-mute: var(--fg-on-dark-mute);
    --v2search-shadow: 0 18px 44px rgba(var(--v2-ink-rgb), 0.08);
  }

  .v2search[data-surface="paper"] {
    --v2search-line: rgba(var(--v2-ink-rgb), 0.22);
    --v2search-line-strong: rgba(var(--v2-ink-rgb), 0.42);
    --v2search-film: rgba(var(--v2-paper-rgb), 0.09);
    --v2search-film-strong: rgba(var(--v2-paper-rgb), 0.14);
    --v2search-fiber-a: rgba(var(--v2-ink-rgb), 0.06);
    --v2search-fiber-b: rgba(var(--v2-paper-rgb), 0.18);
    --v2search-text: var(--fg-on-paper);
    --v2search-text-dim: var(--fg-on-paper-dim);
    --v2search-text-mute: var(--fg-on-paper-mute);
    --v2search-shadow: 0 16px 34px rgba(var(--v2-ink-rgb), 0.08);
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
    border-radius: var(--v2-radius-none);
    background:
      linear-gradient(180deg, var(--v2search-film-strong), transparent),
      var(--v2search-film);
    backdrop-filter: var(--paper-backdrop);
    -webkit-backdrop-filter: var(--paper-backdrop);
    color: var(--v2search-text);
    font-family: var(--font-mono);
    cursor: text;
    box-shadow:
      var(--v2search-shadow),
      inset 0 1px 0 var(--paper-glass-highlight),
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
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 18% 30%, var(--v2search-fiber-a) 0 1px, transparent 1.6px),
      radial-gradient(circle at 82% 66%, var(--v2search-fiber-b) 0 0.8px, transparent 1.4px),
      repeating-linear-gradient(90deg, rgba(var(--v2-ink-rgb), 0.035) 0 1px, transparent 1px 7px);
    background-size: 13px 13px, 17px 17px, 100% 100%;
    mix-blend-mode: multiply;
    opacity: 0.28;
  }

  .v2search__trigger > *,
  .v2search__panel > * {
    position: relative;
    z-index: 1;
  }

  .v2search__trigger:hover,
  .v2search__trigger:focus-within {
    border-color: var(--v2search-line-strong);
    background:
      linear-gradient(180deg, var(--v2search-film-strong), transparent),
      var(--v2search-film);
  }

  .v2search__trigger--open {
    border-color: rgba(var(--accent-rgb), 0.58);
    box-shadow:
      0 18px 48px rgba(var(--v2-ink-rgb), 0.16),
      inset 0 1px 0 var(--paper-glass-highlight),
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
    color: var(--v2search-text);
    width: 100%;
  }

  .v2search__input::placeholder {
    color: var(--v2search-text-mute);
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
    border-radius: var(--v2-radius-none);
    background: transparent;
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
    border-radius: var(--v2-radius-none);
    background:
      linear-gradient(180deg, var(--v2search-film-strong), transparent),
      var(--v2search-film);
    backdrop-filter: blur(24px) saturate(0.92) contrast(0.96);
    -webkit-backdrop-filter: blur(24px) saturate(0.92) contrast(0.96);
    display: flex;
    flex-direction: column;
    gap: 18px;
    box-shadow:
      0 24px 64px rgba(var(--v2-ink-rgb), 0.16),
      inset 0 1px 0 var(--paper-glass-highlight),
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
    color: var(--v2search-text-dim);
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: var(--v2-radius-none);
    cursor: pointer;
    transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .v2search__tab:hover,
  .v2search__tab:focus-visible {
    color: var(--v2search-text);
  }

  .v2search__tab--active {
    color: var(--v2search-text);
    border-color: rgba(var(--accent-rgb), 0.45);
    background: rgba(var(--accent-rgb), 0.09);
  }

  .v2search__prompt {
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.55;
    letter-spacing: 0.04em;
    color: var(--v2search-text-dim);
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
    border-radius: var(--v2-radius-none);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--v2search-text-dim);
    background: transparent;
    transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .v2search__fast:hover,
  .v2search__fast:focus-visible {
    color: var(--v2search-text);
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
    color: var(--v2search-text-mute);
  }

  .v2search__results-empty {
    font-family: var(--font-body);
    font-size: 13px;
    line-height: 1.5;
    color: var(--v2search-text-dim);
    margin: 0;
  }

  .v2search__result-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .v2search__result {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 0 11px;
    border-top: 1px solid rgba(var(--v2-ink-rgb), 0.10);
    color: var(--v2search-text-dim);
    background: transparent;
    transition:
      color 0.15s ease,
      border-color 0.15s ease,
      padding-left 0.15s ease;
  }

  .v2search__result:first-child {
    border-top: 0;
  }

  .v2search__result:hover,
  .v2search__result:focus-visible,
  .v2search__result--active {
    color: var(--v2search-text);
    border-color: rgba(var(--accent-rgb), 0.38);
    padding-left: 8px;
    outline: none;
  }

  .v2search__result-title {
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.35;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: currentColor;
  }

  .v2search__result-body {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-family: var(--font-body);
    font-size: 12px;
    line-height: 1.45;
    color: var(--v2search-text-dim);
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
    .v2search__fast,
    .v2search__result {
      transition: none;
    }
  }
</style>
