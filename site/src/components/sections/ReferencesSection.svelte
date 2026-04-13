<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import { fade, scale } from 'svelte/transition';
  import Reveal from '../Reveal.svelte';
  import { getTranslations, type Lang } from '../../lib/i18n';

  // Satisfy Vite's SSR-side import analysis; the template consumes these transitions.
  const templateTransitions = { fade, scale };
  void templateTransitions;

  let { lang }: { lang: Lang } = $props();

  const section = $derived(getTranslations(lang).sections.references);
  const dialogId = `reference-modal-${lang}`;
  let activeLink = $state<{ href: string; label: string } | null>(null);
  const modalDuration = $derived(prefersReducedMotion.current ? 0 : 180);

  function openLink(link: { href: string; label: string }) {
    activeLink = link;
  }

  function closeDialog() {
    activeLink = null;
  }

  function confirmOpen() {
    if (!activeLink) return;
    window.open(activeLink.href, '_blank', 'noopener,noreferrer');
    closeDialog();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && activeLink) {
      closeDialog();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />
<svelte:body class:modal-open={Boolean(activeLink)} />

<section class="references-section" id="references">
  <Reveal tag="div" class="container">
    <div class="section-label">{section.label}</div>
    <h2 class="section-title">{section.title}</h2>
    <p class="section-sub">{section.sub}</p>

    <ol class="references-list">
      {#each section.items as item}
        <li class="reference-item">
          <p class="reference-citation">{@html item.citationHtml}</p>
          <p class="reference-note">{item.note}</p>

          {#if 'links' in item && item.links}
            <p class="reference-links">
              {#each item.links as link}
                <button class="reference-link" type="button" onclick={() => openLink(link)}>
                  {link.label}
                </button>
              {/each}
            </p>
          {/if}
        </li>
      {/each}
    </ol>
  </Reveal>

  {#if activeLink}
    <div
      class="reference-dialog"
      role="presentation"
      onclick={closeDialog}
      transition:fade={{ duration: modalDuration }}
    >
      <div
        class="reference-dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogId}
        onclick={(event) => event.stopPropagation()}
        transition:scale={{ duration: modalDuration, start: 0.965 }}
      >
        <p class="reference-dialog__eyebrow">{section.modal.eyebrow}</p>
        <h3 class="reference-dialog__title" id={dialogId}>{section.modal.title}</h3>
        <p class="reference-dialog__target">
          <span class="reference-dialog__target-label">{section.modal.sourceLabel}</span>
          <span>{activeLink.label}</span>
        </p>
        <div class="reference-dialog__actions">
          <button
            class="reference-dialog__action reference-dialog__action--back"
            data-hover={section.modal.backHover}
            type="button"
            onclick={closeDialog}
          >
            {section.modal.backLabel}
          </button>
          <button
            class="reference-dialog__action reference-dialog__action--open"
            data-hover={section.modal.openHover}
            type="button"
            onclick={confirmOpen}
          >
            {section.modal.openLabel}
          </button>
        </div>
      </div>
    </div>
  {/if}
</section>

<style>
  .references-section {
    min-height: calc(var(--view-inner) - 10.5rem);
    padding: 1.8rem 0 0.45rem;
  }

  :global(body.modal-open) {
    overflow: hidden;
  }

  :global(body.modal-open .curl-banner) {
    opacity: 0;
    pointer-events: none;
  }

  .container {
    width: min(var(--page-shell), 980px);
    display: grid;
    gap: 0.85rem;
    align-content: center;
  }

  .section-sub {
    margin-bottom: 0.45rem;
    max-width: 56rem;
  }

  .references-list {
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: reference-card;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem 0.95rem;
  }

  .reference-item {
    counter-increment: reference-card;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.32rem 0.8rem;
    align-items: start;
    padding: 0.82rem 0.95rem;
    border: 1px solid var(--glass-panel-border);
    border-radius: 12px;
    background: var(--glass-panel-bg);
    backdrop-filter: blur(18px) saturate(118%);
    -webkit-backdrop-filter: blur(18px) saturate(118%);
    box-shadow: inset 0 1px 0 var(--glass-panel-highlight);
  }

  .reference-item::before {
    content: counter(reference-card, decimal-leading-zero);
    padding-top: 0.12rem;
    color: var(--copper-bright);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
  }

  .reference-citation {
    margin: 0;
    color: var(--stone-light);
    font-family: var(--font-head);
    font-size: 0.9rem;
    line-height: 1.48;
  }

  .reference-note {
    grid-column: 2;
    margin: 0;
    color: var(--steel-dark);
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .reference-links {
    grid-column: 2;
    margin: 0.1rem 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    align-items: center;
    font-family: var(--font-head);
    font-size: 0.74rem;
    line-height: 1.5;
  }

  .reference-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.6rem;
    padding: 0.5rem 0.86rem;
    border: 1px solid var(--glass-panel-border);
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(18, 20, 24, 0.82), rgba(10, 12, 16, 0.92));
    box-shadow: inset 0 1px 0 var(--glass-panel-highlight);
    color: var(--copper);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
    transition:
      transform 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease,
      background 0.18s ease;
  }

  .reference-link:hover,
  .reference-link:focus-visible {
    color: var(--copper-bright);
    border-color: rgba(212, 144, 92, 0.54);
    background: linear-gradient(180deg, rgba(31, 23, 18, 0.92), rgba(18, 14, 12, 0.96));
    transform: translateY(-1px);
  }

  .reference-dialog {
    position: fixed;
    inset: 0;
    z-index: 120;
    display: grid;
    place-items: center;
    padding: 0.75rem;
    background: var(--modal-overlay-bg);
    backdrop-filter: var(--modal-overlay-backdrop);
    -webkit-backdrop-filter: var(--modal-overlay-backdrop);
  }

  .reference-dialog__panel {
    width: min(31rem, calc(100vw - 1.5rem));
    display: grid;
    gap: 0.9rem;
    padding: 1.2rem 1.22rem 1.12rem;
    border: 1px solid var(--glass-panel-border);
    border-radius: var(--modal-panel-radius);
    background: var(--modal-panel-bg);
    box-shadow: var(--modal-panel-shadow);
    backdrop-filter: var(--modal-panel-backdrop);
    -webkit-backdrop-filter: var(--modal-panel-backdrop);
    will-change: transform, opacity;
  }

  .reference-dialog__eyebrow {
    margin: 0;
    color: var(--copper-bright);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .reference-dialog__title {
    margin: 0;
    color: var(--stone-light);
    font-size: clamp(1rem, 2vw, 1.18rem);
    line-height: 1.35;
  }

  .reference-dialog__target {
    display: grid;
    gap: 0.35rem;
    margin: 0;
    padding: 0.9rem 0.95rem;
    border: 1px solid rgba(163, 184, 199, 0.16);
    border-radius: var(--radius-md);
    background: linear-gradient(180deg, rgba(18, 20, 24, 0.72), rgba(9, 10, 13, 0.88));
    color: var(--steel-edge-strong);
  }

  .reference-dialog__target-label {
    color: var(--steel-dark);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .reference-dialog__actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem;
  }

  .reference-dialog__action {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--glass-panel-border);
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(18, 20, 24, 0.8), rgba(10, 12, 16, 0.94));
    color: var(--stone-light);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      transform 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease,
      background 0.18s ease;
  }

  .reference-dialog__action::after {
    content: attr(data-hover);
    position: absolute;
    left: 50%;
    bottom: calc(100% + 0.55rem);
    transform: translate(-50%, 0.32rem);
    opacity: 0;
    white-space: nowrap;
    pointer-events: none;
    padding: 0.35rem 0.58rem;
    border: 1px solid rgba(163, 184, 199, 0.18);
    border-radius: 999px;
    background: rgba(10, 12, 16, 0.94);
    color: var(--steel-edge-strong);
    font-family: var(--font-mono);
    font-size: 0.64rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: opacity 0.18s ease, transform 0.18s ease;
  }

  .reference-dialog__action:hover,
  .reference-dialog__action:focus-visible {
    color: var(--copper-bright);
    border-color: rgba(212, 144, 92, 0.54);
    background: linear-gradient(180deg, rgba(31, 23, 18, 0.92), rgba(18, 14, 12, 0.96));
    transform: translateY(-1px);
  }

  .reference-dialog__action:hover::after,
  .reference-dialog__action:focus-visible::after {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  @media (max-width: 960px) {
    .references-section {
      min-height: auto;
      padding: 2.2rem 0 0.8rem;
    }

    .references-list {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .reference-dialog__actions {
      grid-template-columns: 1fr;
    }
  }
</style>
