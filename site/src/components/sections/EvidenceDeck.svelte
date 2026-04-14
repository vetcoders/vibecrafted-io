<script lang="ts">
  import KnowledgeDialog from '../KnowledgeDialog.svelte';
  import { getTranslations, type Lang, type TranslationDict } from '../../lib/i18n';

  type EvidenceItem = TranslationDict['sections']['evidence']['items'][number];

  let { lang }: { lang: Lang } = $props();

  const section = $derived(getTranslations(lang).sections.evidence);
  let activeItem = $state<EvidenceItem | null>(null);
</script>

<div class="evidence-grid">
  {#each section.items as item}
    <button
      type="button"
      class={`evidence-item evidence-item--${item.accent ?? 'steel'}`}
      aria-label={`${item.number} ${item.title}`}
      onclick={() => (activeItem = item)}
    >
      <div class="evidence-item__flip">
        <div class="evidence-item__face evidence-item__face--front">
          <span class="evidence-num">{item.number}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <span class="evidence-item__reveal">{section.revealLabel}</span>
        </div>

        <div class="evidence-item__face evidence-item__face--back" aria-hidden="true">
          <span class="evidence-num">{item.number}</span>
          <div class="evidence-item__kicker">{section.detailsLabel}</div>
          <ul>
            {#each item.details.slice(0, 2) as detail}
              <li>{detail}</li>
            {/each}
          </ul>
          <span class="evidence-item__reveal">{section.revealLabel}</span>
        </div>
      </div>
    </button>
  {/each}
</div>

<KnowledgeDialog
  open={Boolean(activeItem)}
  accent={activeItem?.accent ?? 'steel'}
  eyebrow={activeItem ? `${activeItem.number} · ${section.detailsLabel}` : ''}
  title={activeItem?.title ?? ''}
  summary={activeItem?.body ?? ''}
  bullets={activeItem?.details ?? []}
  detailsLabel={section.detailsLabel}
  closeLabel={section.closeLabel}
  onclose={() => (activeItem = null)}
/>

<style>
  .evidence-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-md);
    width: 100%;
  }

  .evidence-item {
    --evidence-accent: rgba(175, 194, 209, 0.92);
    position: relative;
    min-height: 14rem;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--evidence-accent) 22%, var(--glass-panel-border));
    border-left: 2px solid color-mix(in srgb, var(--evidence-accent) 72%, transparent);
    border-radius: var(--radius-sm);
    background: transparent;
    text-align: left;
    cursor: pointer;
    perspective: 1200px;
    transform-style: preserve-3d;
    transition:
      transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
      border-color 220ms ease,
      box-shadow 220ms ease;
  }

  .evidence-item--steel {
    --evidence-accent: rgba(175, 194, 209, 0.92);
  }

  .evidence-item--copper {
    --evidence-accent: rgba(212, 154, 112, 0.94);
  }

  .evidence-item--patina {
    --evidence-accent: rgba(142, 199, 170, 0.94);
  }

  .evidence-item:hover,
  .evidence-item:focus-visible {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--evidence-accent) 42%, var(--glass-panel-border));
    box-shadow:
      0 22px 44px rgba(0, 0, 0, 0.24),
      0 0 0 1px color-mix(in srgb, var(--evidence-accent) 10%, transparent);
  }

  .evidence-item__flip {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: inherit;
    transform-style: preserve-3d;
    transition: transform 480ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .evidence-item:hover .evidence-item__flip,
  .evidence-item:focus-visible .evidence-item__flip {
    transform: rotateY(180deg);
  }

  .evidence-item__face {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: var(--space-md);
    border-radius: inherit;
    background:
      linear-gradient(180deg, rgba(255, 251, 244, 0.045), transparent 26%),
      var(--glass-panel-bg);
    backdrop-filter: blur(16px) saturate(118%);
    -webkit-backdrop-filter: blur(16px) saturate(118%);
    box-shadow: inset 0 1px 0 var(--glass-panel-highlight);
    backface-visibility: hidden;
  }

  .evidence-item__face--back {
    transform: rotateY(180deg);
    justify-content: space-between;
    background:
      radial-gradient(circle at top left, color-mix(in srgb, var(--evidence-accent) 12%, transparent), transparent 40%),
      rgba(12, 14, 18, 0.88);
  }

  .evidence-num {
    display: block;
    margin-bottom: 0.2rem;
    color: color-mix(in srgb, var(--evidence-accent) 88%, white 12%);
    font-family: var(--font-mono);
    font-size: 0.9rem;
    letter-spacing: 0.05em;
  }

  .evidence-item h3 {
    margin: 0;
    color: var(--stone-light);
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .evidence-item p,
  .evidence-item li {
    color: var(--steel-dark);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .evidence-item__kicker,
  .evidence-item__reveal {
    width: fit-content;
    color: color-mix(in srgb, var(--evidence-accent) 88%, white 12%);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .evidence-item__reveal {
    margin-top: auto;
    opacity: 0.9;
  }

  .evidence-item__face--back ul {
    display: grid;
    gap: 0.55rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .evidence-item__face--back li {
    position: relative;
    padding-left: 0.9rem;
  }

  .evidence-item__face--back li::before {
    content: '';
    position: absolute;
    top: 0.62em;
    left: 0;
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--evidence-accent) 90%, white 10%);
  }

  @media (max-width: 768px) {
    .evidence-grid {
      grid-template-columns: 1fr;
    }

    .evidence-item {
      min-height: 12.75rem;
    }

    .evidence-item__flip {
      transform: none !important;
    }
  }
</style>
