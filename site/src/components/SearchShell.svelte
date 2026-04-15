<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import { fade, fly } from 'svelte/transition';
  import DocsSearch from './DocsSearch.svelte';
  import { getTranslations, type Lang } from '../lib/i18n';
  import type { DocsSearchSection } from '../lib/search/docs';

  interface Props {
    lang: Lang;
    defaultSection?: DocsSearchSection;
  }

  let { lang, defaultSection = 'quickstart' }: Props = $props();

  const dict = $derived(getTranslations(lang));
  let open = $state(false);
  let activeSection = $state<DocsSearchSection>(defaultSection);
  let panelEl: HTMLElement | null = $state(null);
  const panelDuration = $derived(prefersReducedMotion.current ? 0 : 200);
  const triggerDuration = $derived(prefersReducedMotion.current ? 0 : 160);

  function openSearch(section: DocsSearchSection = activeSection) {
    activeSection = section;
    open = true;
  }

  function closeSearch() {
    open = false;
  }

  function handleShortcut(event: KeyboardEvent) {
    const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
    if (!isShortcut) return;
    event.preventDefault();
    openSearch();
  }

  function handleWindowEvent(event: Event) {
    const customEvent = event as CustomEvent<{ section?: DocsSearchSection }>;
    openSearch(customEvent.detail?.section ?? activeSection);
  }

  function handlePointerDown(event: PointerEvent) {
    if (!open || !panelEl) return;
    if (!(event.target instanceof Node)) return;
    if (panelEl.contains(event.target)) return;
    closeSearch();
  }

  $effect(() => {
    window.addEventListener('keydown', handleShortcut);
    window.addEventListener('vibecrafted:search-toggle', handleWindowEvent);
    return () => {
      window.removeEventListener('keydown', handleShortcut);
      window.removeEventListener('vibecrafted:search-toggle', handleWindowEvent);
    };
  });
</script>

<svelte:window
  onkeydown={(event) => open && event.key === 'Escape' && closeSearch()}
  onpointerdown={handlePointerDown}
/>

<div class="search-shell" aria-label={dict.nav.search}>
  {#if open}
    <section
      class="search-shell__panel"
      bind:this={panelEl}
      aria-label={dict.nav.search}
      in:fly={{ duration: panelDuration, y: 14 }}
      out:fade={{ duration: panelDuration }}
    >
      <div class="search-shell__header">
        <div class="search-shell__title-group">
          <span class="search-shell__eyebrow">{dict.nav.search}</span>
          <span class="search-shell__hint">Ctrl K</span>
        </div>
        <button
          class="search-shell__close"
          type="button"
          aria-label={dict.nav.searchClose}
          onclick={closeSearch}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div class="search-shell__scopes" aria-label={dict.nav.search}>
        <button
          class="search-shell__scope"
          class:search-shell__scope--active={activeSection === 'quickstart'}
          type="button"
          aria-pressed={activeSection === 'quickstart'}
          onclick={() => (activeSection = 'quickstart')}
        >
          {dict.nav.quickstart}
        </button>
        <button
          class="search-shell__scope"
          class:search-shell__scope--active={activeSection === 'faq'}
          type="button"
          aria-pressed={activeSection === 'faq'}
          onclick={() => (activeSection = 'faq')}
        >
          {dict.nav.faq}
        </button>
      </div>

      {#key activeSection}
        <DocsSearch lang={lang} section={activeSection} autofocus={open} />
      {/key}
    </section>
  {:else}
    <button
      class="search-shell__trigger"
      type="button"
      aria-label={dict.nav.search}
      aria-expanded={open}
      onclick={() => openSearch()}
      in:fly={{ duration: triggerDuration, x: 12, y: 0 }}
      out:fade={{ duration: triggerDuration }}
    >
      <span class="search-shell__trigger-label">{dict.nav.search}</span>
      <span class="search-shell__trigger-shortcut">Ctrl K</span>
    </button>
  {/if}
</div>

<style>
  .search-shell {
    position: fixed;
    right: clamp(0.75rem, 1.8vw, 1.5rem);
    bottom: clamp(0.75rem, 1.8vw, 1.5rem);
    z-index: 130;
    width: auto;
    display: flex;
    justify-content: flex-end;
    pointer-events: none;
  }

  .search-shell__trigger,
  .search-shell__panel {
    pointer-events: auto;
  }

  .search-shell__trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    min-height: 3.05rem;
    padding: 0.7rem 0.95rem;
    border: 1px solid rgba(218, 197, 167, 0.16);
    border-radius: 999px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent),
      rgba(10, 12, 15, 0.76);
    color: rgba(240, 241, 243, 0.96);
    cursor: pointer;
    font-family: var(--font-mono);
    box-shadow:
      0 18px 38px rgba(0, 0, 0, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
    transition:
      transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      background 0.18s ease;
  }

  .search-shell__trigger:hover,
  .search-shell__trigger:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(225, 176, 116, 0.34);
    box-shadow:
      0 22px 44px rgba(0, 0, 0, 0.24),
      0 0 0 1px rgba(225, 176, 116, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .search-shell__trigger-label {
    color: rgba(240, 241, 243, 0.94);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .search-shell__trigger-shortcut {
    padding: 0.35rem 0.55rem;
    border: 1px solid rgba(225, 176, 116, 0.18);
    border-radius: 999px;
    color: rgba(225, 176, 116, 0.9);
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .search-shell__panel {
    width: min(100vw - 1.5rem, 34rem);
    max-height: min(76vh, 40rem);
    overflow: auto;
    display: grid;
    gap: 0.82rem;
    padding: 0.92rem 1rem;
    border: 1px solid rgba(218, 197, 167, 0.16);
    border-radius: 1.1rem;
    background:
      radial-gradient(circle at top right, rgba(184, 115, 51, 0.12), transparent 28%),
      linear-gradient(180deg, rgba(18, 20, 24, 0.92), rgba(10, 12, 15, 0.9));
    backdrop-filter: blur(14px) saturate(110%);
    -webkit-backdrop-filter: blur(14px) saturate(110%);
    box-shadow:
      0 20px 46px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .search-shell__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .search-shell__title-group {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-width: 0;
  }

  .search-shell__eyebrow,
  .search-shell__hint {
    color: rgba(225, 176, 116, 0.92);
    font-family: var(--font-mono);
    font-size: 0.69rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .search-shell__hint {
    color: rgba(209, 216, 224, 0.7);
    font-size: 0.63rem;
  }

  .search-shell__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.9rem;
    height: 2.9rem;
    border: 1px solid rgba(218, 197, 167, 0.16);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    color: rgba(240, 241, 243, 0.86);
    cursor: pointer;
    font-size: 1.15rem;
    line-height: 1;
    transition:
      transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.18s ease,
      background 0.18s ease;
  }

  .search-shell__close:hover,
  .search-shell__close:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(225, 176, 116, 0.34);
    background: rgba(255, 255, 255, 0.06);
  }

  .search-shell__scopes {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    flex-wrap: wrap;
  }

  .search-shell__scope {
    display: inline-flex;
    align-items: center;
    min-height: 2.35rem;
    padding: 0.45rem 0.75rem;
    border: 1px solid rgba(218, 197, 167, 0.12);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    color: rgba(209, 216, 224, 0.82);
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.67rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    transition:
      transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.18s ease,
      background 0.18s ease,
      color 0.18s ease;
  }

  .search-shell__scope:hover,
  .search-shell__scope:focus-visible,
  .search-shell__scope--active {
    transform: translateY(-1px);
    border-color: rgba(225, 176, 116, 0.34);
    background: rgba(225, 176, 116, 0.08);
    color: rgba(243, 241, 236, 0.96);
  }

  @media (max-width: 720px) {
    .search-shell {
      right: 0.5rem;
      left: 0.5rem;
      bottom: 0.5rem;
      width: auto;
      justify-content: stretch;
    }

    .search-shell__trigger,
    .search-shell__panel {
      width: 100%;
    }

    .search-shell__panel {
      width: 100%;
      padding: 0.92rem;
      max-height: min(72vh, 34rem);
      border-radius: 1rem;
    }

    .search-shell__trigger {
      justify-content: space-between;
    }

    .search-shell__header {
      align-items: flex-start;
    }
  }
</style>
