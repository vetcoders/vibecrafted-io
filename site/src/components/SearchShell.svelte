<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import { fade, fly } from 'svelte/transition';
  import { getTranslations, type Lang } from '../lib/i18n';
  import {
    getDocsSearchData,
    searchDocs,
    type DocsSearchSection,
  } from '../lib/search/docs';

  interface Props {
    lang: Lang;
    defaultSection?: DocsSearchSection;
  }

  let { lang, defaultSection = 'quickstart' }: Props = $props();

  const dict = $derived(getTranslations(lang));

  let query = $state('');
  let activeSection = $state<DocsSearchSection>(defaultSection);
  let activeIndex = $state(-1);
  let focused = $state(false);
  let inputEl: HTMLInputElement | null = $state(null);
  let containerEl: HTMLElement | null = $state(null);
  let previousRouteKey = `${lang}:${defaultSection}`;

  const searchData = $derived(getDocsSearchData(lang, activeSection));
  const trimmed = $derived(query.trim());
  const hasQuery = $derived(trimmed.length >= 2);
  const results = $derived(searchDocs(searchData.items, lang, query));
  const expanded = $derived(focused || hasQuery);
  const panelDuration = $derived(prefersReducedMotion.current ? 0 : 180);

  $effect(() => {
    const nextRouteKey = `${lang}:${defaultSection}`;
    if (nextRouteKey === previousRouteKey) return;

    previousRouteKey = nextRouteKey;
    activeSection = defaultSection;
    query = '';
    activeIndex = -1;
    focused = false;
    inputEl?.blur();
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

  function moveActive(direction: 1 | -1) {
    if (results.length === 0) return;
    const base = activeIndex >= 0 ? activeIndex : 0;
    activeIndex = (base + direction + results.length) % results.length;
  }

  function selectActive() {
    if (activeIndex < 0 || activeIndex >= results.length) return;
    window.location.assign(results[activeIndex].href);
  }

  function clearAndBlur() {
    query = '';
    activeIndex = -1;
    inputEl?.blur();
    focused = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      clearAndBlur();
      return;
    }
    if (results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      selectActive();
    }
  }

  function handleShortcut(event: KeyboardEvent) {
    const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
    if (!isShortcut) return;
    event.preventDefault();
    inputEl?.focus();
    inputEl?.select();
  }

  function handleSectionEvent(event: Event) {
    const customEvent = event as CustomEvent<{ section?: DocsSearchSection }>;
    if (customEvent.detail?.section) {
      activeSection = customEvent.detail.section;
    }
    inputEl?.focus();
  }

  function handlePointerDown(event: PointerEvent) {
    if (!containerEl) return;
    if (!(event.target instanceof Node)) return;
    if (containerEl.contains(event.target)) return;
    focused = false;
  }

  $effect(() => {
    window.addEventListener('keydown', handleShortcut);
    window.addEventListener('vibecrafted:search-toggle', handleSectionEvent);
    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleShortcut);
      window.removeEventListener('vibecrafted:search-toggle', handleSectionEvent);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  });
</script>

<div class="search-shell" bind:this={containerEl} aria-label={dict.nav.search}>
  {#if expanded}
    <section
      id="search-shell-panel"
      class="search-shell__panel"
      aria-label={dict.nav.search}
      in:fly={{ duration: panelDuration, y: 8 }}
      out:fade={{ duration: panelDuration }}
    >
      <div class="search-shell__scopes" role="tablist" aria-label={dict.nav.search}>
        <button
          class="search-shell__scope"
          class:search-shell__scope--active={activeSection === 'quickstart'}
          type="button"
          role="tab"
          aria-selected={activeSection === 'quickstart'}
          onclick={() => (activeSection = 'quickstart')}
        >
          {dict.nav.quickstart}
        </button>
        <button
          class="search-shell__scope"
          class:search-shell__scope--active={activeSection === 'faq'}
          type="button"
          role="tab"
          aria-selected={activeSection === 'faq'}
          onclick={() => (activeSection = 'faq')}
        >
          {dict.nav.faq}
        </button>
      </div>

      {#if hasQuery && results.length > 0}
        <div class="search-shell__section-label">{searchData.resultsLabel}</div>
        <ul class="search-shell__results" role="listbox" aria-label={searchData.resultsLabel}>
          {#each results as result, index (result.href)}
            <li>
              <a
                class="search-shell__result"
                class:search-shell__result--active={index === activeIndex}
                href={result.href}
                role="option"
                aria-selected={index === activeIndex}
                onmouseenter={() => (activeIndex = index)}
              >
                <span class="search-shell__result-title">{result.title}</span>
                <span class="search-shell__result-body">{result.body}</span>
              </a>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="search-shell__hint">
          {hasQuery ? searchData.noResultsLabel : searchData.emptyLabel}
        </p>
        <div class="search-shell__section-label">{searchData.fallbackLabel}</div>
        <div class="search-shell__fast-paths">
          {#each searchData.fallbackLinks as link}
            <a class="search-shell__fast-path" href={link.href}>{link.label}</a>
          {/each}
        </div>
      {/if}
    </section>
  {/if}

  <div
    class="search-shell__bar"
    class:search-shell__bar--expanded={expanded}
    role="search"
  >
    <span class="search-shell__icon" aria-hidden="true">⌕</span>
    <input
      bind:this={inputEl}
      bind:value={query}
      class="search-shell__input"
      type="search"
      autocomplete="off"
      spellcheck="false"
      placeholder={searchData.placeholder}
      aria-label={dict.nav.search}
      aria-expanded={expanded}
      aria-controls="search-shell-panel"
      onfocus={() => (focused = true)}
      onkeydown={handleKeydown}
    />
    {#if query.length > 0}
      <button
        class="search-shell__clear"
        type="button"
        aria-label={dict.nav.searchClose}
        onclick={clearAndBlur}
      >
        ×
      </button>
    {:else}
      <span class="search-shell__shortcut" aria-hidden="true">⌘K</span>
    {/if}
  </div>
</div>

<style>
  .search-shell {
    position: fixed;
    right: clamp(0.75rem, 1.8vw, 1.5rem);
    bottom: clamp(0.75rem, 1.8vw, 1.5rem);
    z-index: 130;
    width: min(100vw - 1.5rem, 26rem);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .search-shell__bar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    min-height: 3rem;
    padding: 0.45rem 0.85rem;
    border: 1px solid rgba(218, 197, 167, 0.18);
    border-radius: 999px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent),
      rgba(10, 12, 15, 0.78);
    backdrop-filter: blur(18px) saturate(120%);
    -webkit-backdrop-filter: blur(18px) saturate(120%);
    box-shadow:
      0 18px 38px rgba(0, 0, 0, 0.24),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
    transition:
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .search-shell__bar:hover,
  .search-shell__bar--expanded,
  .search-shell__bar:focus-within {
    border-color: rgba(225, 176, 116, 0.42);
    box-shadow:
      0 22px 46px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(225, 176, 116, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transform: translateY(-1px);
  }

  .search-shell__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    color: rgba(225, 176, 116, 0.92);
    font-size: 1rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .search-shell__input {
    flex: 1 1 auto;
    min-width: 0;
    padding: 0.35rem 0;
    border: 0;
    background: transparent;
    color: rgba(243, 241, 236, 0.96);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.02em;
    outline: none;
  }

  .search-shell__input::placeholder {
    color: rgba(209, 216, 224, 0.55);
    font-size: 0.74rem;
    letter-spacing: 0.04em;
  }

  .search-shell__input::-webkit-search-cancel-button,
  .search-shell__input::-webkit-search-decoration {
    appearance: none;
  }

  .search-shell__shortcut {
    padding: 0.22rem 0.5rem;
    border: 1px solid rgba(225, 176, 116, 0.22);
    border-radius: 999px;
    color: rgba(225, 176, 116, 0.82);
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .search-shell__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.6rem;
    height: 1.6rem;
    padding: 0;
    border: 1px solid rgba(218, 197, 167, 0.18);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.04);
    color: rgba(240, 241, 243, 0.8);
    font-family: var(--font-mono);
    font-size: 0.95rem;
    line-height: 1;
    cursor: pointer;
    flex-shrink: 0;
    transition:
      background 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;
  }

  .search-shell__clear:hover,
  .search-shell__clear:focus-visible {
    background: rgba(225, 176, 116, 0.16);
    color: rgba(243, 241, 236, 0.96);
    border-color: rgba(225, 176, 116, 0.34);
  }

  .search-shell__panel {
    width: 100%;
    max-height: min(60vh, 32rem);
    overflow: auto;
    display: grid;
    align-content: start;
    gap: 0.65rem;
    padding: 0.85rem 0.95rem;
    border: 1px solid rgba(218, 197, 167, 0.18);
    border-radius: 1rem;
    background:
      radial-gradient(circle at top right, rgba(184, 115, 51, 0.1), transparent 28%),
      linear-gradient(180deg, rgba(18, 20, 24, 0.94), rgba(10, 12, 15, 0.92));
    backdrop-filter: blur(18px) saturate(120%);
    -webkit-backdrop-filter: blur(18px) saturate(120%);
    box-shadow:
      0 22px 50px rgba(0, 0, 0, 0.32),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .search-shell__scopes {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .search-shell__scope {
    display: inline-flex;
    align-items: center;
    min-height: 2.05rem;
    padding: 0.35rem 0.7rem;
    border: 1px solid rgba(218, 197, 167, 0.14);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    color: rgba(209, 216, 224, 0.82);
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    transition:
      border-color 0.15s ease,
      background 0.15s ease,
      color 0.15s ease;
  }

  .search-shell__scope:hover,
  .search-shell__scope:focus-visible,
  .search-shell__scope--active {
    border-color: rgba(225, 176, 116, 0.38);
    background: rgba(225, 176, 116, 0.1);
    color: rgba(243, 241, 236, 0.96);
  }

  .search-shell__section-label {
    color: rgba(225, 176, 116, 0.92);
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .search-shell__hint {
    margin: 0;
    color: rgba(209, 216, 224, 0.78);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    line-height: 1.5;
  }

  .search-shell__results {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.4rem;
  }

  .search-shell__result {
    display: grid;
    gap: 0.18rem;
    padding: 0.6rem 0.7rem;
    border: 1px solid rgba(218, 197, 167, 0.1);
    border-radius: 0.7rem;
    background: rgba(255, 255, 255, 0.02);
    color: rgba(243, 241, 236, 0.94);
    text-decoration: none;
    transition:
      border-color 0.15s ease,
      background 0.15s ease,
      transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .search-shell__result:hover,
  .search-shell__result:focus-visible,
  .search-shell__result--active {
    border-color: rgba(225, 176, 116, 0.34);
    background: rgba(225, 176, 116, 0.08);
    transform: translateY(-1px);
  }

  .search-shell__result-title {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .search-shell__result-body {
    color: rgba(209, 216, 224, 0.74);
    font-size: 0.7rem;
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .search-shell__fast-paths {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .search-shell__fast-path {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.7rem;
    border: 1px solid rgba(218, 197, 167, 0.14);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.02);
    color: rgba(243, 241, 236, 0.92);
    font-family: var(--font-mono);
    font-size: 0.66rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-decoration: none;
    transition:
      border-color 0.15s ease,
      background 0.15s ease;
  }

  .search-shell__fast-path:hover,
  .search-shell__fast-path:focus-visible {
    border-color: rgba(225, 176, 116, 0.34);
    background: rgba(225, 176, 116, 0.1);
  }

  @media (max-width: 720px) {
    .search-shell {
      right: 0.5rem;
      left: 0.5rem;
      bottom: 0.5rem;
      width: auto;
    }

    .search-shell__bar {
      min-height: 3.2rem;
    }

    .search-shell__panel {
      max-height: min(60vh, 28rem);
      border-radius: 0.95rem;
    }
  }
</style>
