<script lang="ts">
  import CardStrip from '../CardStrip.svelte';
  import KnowledgeDialog from '../KnowledgeDialog.svelte';
  import Reveal from '../Reveal.svelte';
  import { getTranslations, type Lang, type TranslationDict } from '../../lib/i18n';

  type SkillCard = TranslationDict['sections']['skills']['cards'][number];

  let { lang }: { lang: Lang } = $props();

  const section = $derived(getTranslations(lang).sections.skills);
  let activeCard = $state<SkillCard | null>(null);

  function accentFor(card: SkillCard) {
    if (card.cardClass?.includes('copper')) return 'copper';
    if (card.cardClass?.includes('patina')) return 'patina';
    if (card.cardClass?.includes('muted')) return 'muted';
    return 'steel';
  }
</script>

<section id="skills" class="skills-section surface--grid">
  <Reveal tag="div" class="container">
    <div class="section-label">{section.label}</div>
    <h2 class="section-title">{section.title}</h2>
    <p class="section-sub">{section.sub}</p>

    <CardStrip
      items={section.cards}
      ariaLabel={section.title}
      leftLabel={section.scrollLeft}
      rightLabel={section.scrollRight}
    >
      {#snippet card(card: SkillCard)}
        <button
          type="button"
          class="skill-card-activate"
          aria-label={`${card.id} — ${section.openLabel}`}
          onclick={() => (activeCard = card)}
        >
          <div class="skill-card-flip">
            <div class="skill-card-face skill-card-face--front">
              <div class={`card-phase ${card.phaseClass}`}>{card.phase}</div>
              <h3>{card.id}</h3>
              <p class="card-desc">{@html card.descHtml}</p>
              <div class="card-tags">
                {#each card.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
              <div class="card-trigger">{@html card.triggerHtml}</div>
              <span class="card-reveal-hint">{section.revealLabel}</span>
            </div>

            <div class="skill-card-face skill-card-face--back" aria-hidden="true">
              <div class={`card-phase ${card.phaseClass}`}>{card.phase}</div>
              <h3>{card.id}</h3>
              <div class="skill-card-meta-label">{section.tagsLabel}</div>
              <div class="card-tags">
                {#each card.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
              <div class="skill-card-meta-label">{section.triggersLabel}</div>
              <div class="card-trigger">{@html card.triggerHtml}</div>
              <span class="card-reveal-hint">{section.openLabel}</span>
            </div>
          </div>
        </button>
      {/snippet}
    </CardStrip>
  </Reveal>

  <KnowledgeDialog
    open={Boolean(activeCard)}
    accent={activeCard ? accentFor(activeCard) : 'steel'}
    eyebrow={activeCard ? `${section.phaseLabel} · ${activeCard.phase}` : ''}
    title={activeCard?.id ?? ''}
    bodyHtml={activeCard?.descHtml ?? ''}
    tags={activeCard?.tags ?? []}
    footerHtml={activeCard?.triggerHtml ?? ''}
    tagsLabel={section.tagsLabel}
    footerLabel={section.triggersLabel}
    closeLabel={section.closeLabel}
    onclose={() => (activeCard = null)}
  />
</section>

<style>
  :global(.skill-card-activate) {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    text-align: left;
    cursor: pointer;
    transform-style: preserve-3d;
  }

  :global(.skill-card-flip) {
    position: relative;
    min-height: 18rem;
    transform-style: preserve-3d;
    transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  :global(.card-strip__card:hover .skill-card-flip),
  :global(.card-strip__card:focus-within .skill-card-flip) {
    transform: rotateY(180deg);
  }

  :global(.skill-card-face) {
    display: flex;
    flex-direction: column;
    min-height: inherit;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  :global(.skill-card-face--back) {
    position: absolute;
    inset: 0;
    transform: rotateY(180deg);
  }

  :global(.skill-card-meta-label) {
    margin-top: 0.65rem;
    margin-bottom: 0.45rem;
    color: rgba(225, 176, 116, 0.88);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  :global(.card-reveal-hint) {
    margin-top: auto;
    padding-top: 0.9rem;
    color: rgba(225, 176, 116, 0.88);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    :global(.skill-card-flip) {
      min-height: 17rem;
      transform: none !important;
    }
  }
</style>
