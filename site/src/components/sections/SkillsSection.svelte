<script lang="ts">
  import CardStrip from '../CardStrip.svelte';
  import Reveal from '../Reveal.svelte';
  import { getTranslations, type Lang, type TranslationDict } from '../../lib/i18n';

  type SkillCard = TranslationDict['sections']['skills']['cards'][number];

  let { lang }: { lang: Lang } = $props();

  const section = $derived(getTranslations(lang).sections.skills);
</script>

<section id="skills" class="skills-section">
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
        <div class={`card-phase ${card.phaseClass}`}>{card.phase}</div>
        <h3>{card.id}</h3>
        <p class="card-desc">{@html card.descHtml}</p>
        <div class="card-tags">
          {#each card.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
        <div class="card-trigger">{@html card.triggerHtml}</div>
      {/snippet}
    </CardStrip>
  </Reveal>
</section>
