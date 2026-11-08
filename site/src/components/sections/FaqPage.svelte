<script lang="ts">
  import { getTranslations, type Lang } from '../../lib/i18n';

  interface Props {
    lang?: Lang;
  }

  interface FaqItem {
    idx: number;
    q: string;
    a: string;
    open?: boolean;
  }

  interface FaqGroup {
    id: string;
    title: string;
    color: string;
    items: FaqItem[];
  }

  const GROUP_META = [
    { id: 'installation', color: 'var(--accent)' },
    { id: 'skills', color: '#3d7a72' },
    { id: 'workflow', color: '#c99a3b' },
    { id: 'commercial', color: 'var(--fg-on-dark)' },
  ] as const;

  let { lang = 'en' } = $props<Props>();

  let openMap = $state<Record<number, boolean>>({});

  const dict = $derived(getTranslations(lang));
  const hero = $derived(dict.sections.faqHero);
  const content = $derived(dict.sections.faqContent);

  const indexedGroups: FaqGroup[] = $derived(content.groups.map((group, groupIndex) => {
    const meta = GROUP_META[groupIndex] ?? {
      id: `group-${groupIndex}`,
      color: 'var(--fg-on-dark)',
    };
    const offset = content.groups.slice(0, groupIndex).reduce((sum, previous) => sum + previous.items.length, 0);
    return {
      id: meta.id,
      color: meta.color,
      title: group.title,
      items: group.items.map((item, itemIndex) => ({
        q: item.questionHtml,
        a: item.answerHtml,
        open: item.open,
        idx: offset + itemIndex,
      })),
    };
  }));

  function padded(num: number): string {
    return String(num + 1).padStart(2, '0');
  }

  function isOpen(item: FaqItem): boolean {
    return openMap[item.idx] ?? item.open ?? false;
  }

  function toggle(item: FaqItem): void {
    openMap[item.idx] = !isOpen(item);
  }

  function openFromToc(idx: number): void {
    openMap[idx] = true;

    const target = document.querySelector<HTMLElement>(`[data-faq-idx="${idx}"]`);
    if (!target) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = target.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({
      top,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }
</script>

<div class="faq-page">
  <header class="hero">
    <div class="hero-header">
      <span>06 · FAQ</span>
      <span>docs</span>
    </div>
    <h1>{hero.title}</h1>
    <p class="hero-lead">
      {hero.lead}
    </p>
    <p class="hero-quote">
      "{hero.quote}"
    </p>
    <div class="hero-actions">
      <a href={hero.primaryHref} class="btn-primary">{hero.primaryLabel}</a>
      <a href={hero.secondaryHref} class="btn-ghost">{hero.secondaryLabel}</a>
    </div>
  </header>

  <div class="faq-main">
    <aside class="toc" aria-label="FAQ table of contents">
      {#each indexedGroups as group}
        <div class="toc-group">
          <div class="toc-group-label">
            <span class="dot" style={`background:${group.color}`} aria-hidden="true"></span>
            {group.title}
          </div>
          <div class="toc-items">
            {#each group.items as item}
              <button type="button" class="toc-item" onclick={() => openFromToc(item.idx)}>
                {padded(item.idx)}
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </aside>

    <div class="faq-content">
      {#each indexedGroups as group}
        <section class="faq-group" aria-labelledby={`faq-group-${group.id}`}>
          <div class="faq-group-header">
            <span class="title" id={`faq-group-${group.id}`}>{group.title}</span>
            <span></span>
            <span>{group.items.length} items</span>
          </div>

          {#each group.items as item}
            <div class="faq-item" data-faq-idx={item.idx}>
              <button
                class="faq-q"
                type="button"
                aria-expanded={isOpen(item)}
                aria-controls={`faq-answer-${item.idx}`}
                onclick={() => toggle(item)}
              >
                <span class="num">{padded(item.idx)}</span>
                <span>{@html item.q}</span>
                <span class="arrow" aria-hidden="true">+</span>
              </button>
              <div
                class={`faq-a${isOpen(item) ? ' is-open' : ''}`}
                id={`faq-answer-${item.idx}`}
              >
                <div class="faq-a-inner">{@html item.a}</div>
              </div>
            </div>
          {/each}
        </section>
      {/each}
    </div>
  </div>

  <footer class="faq-footer">
    <div class="faq-footer-inner">
      <span class="faq-footer-label">{content.sourceLabel}</span>
      {#each content.links as link}
        <a href={link.href}>{link.label}</a>
      {/each}
    </div>
  </footer>
</div>

<style>
  :global(.faq-page code) {
    font-family: var(--font-mono);
    font-size: 0.92em;
    color: var(--fg-on-dark);
    background: rgba(245, 244, 239, 0.06);
    padding: 1px 6px;
    border-radius: var(--v2-radius);
  }

  .faq-page {
    background: var(--ink);
    color: var(--fg-on-dark);
    min-height: 100vh;
  }

  .faq-page a {
    color: var(--fg-on-dark);
  }

  .hero {
    padding: 64px 48px;
    max-width: 1280px;
    margin: 0 auto;
  }

  .hero-header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 40px;
    border-bottom: 1px solid var(--rule-dark);
    padding-bottom: 18px;
    margin-bottom: 48px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
  }

  .hero h1 {
    margin: 0 0 20px;
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(40px, 5.2vw, 68px);
    line-height: 1.02;
    letter-spacing: -0.025em;
  }

  .hero-lead {
    font-family: var(--font-body);
    font-size: clamp(17px, 1.3vw, 20px);
    line-height: 1.6;
    color: var(--fg-on-dark-dim);
    max-width: 720px;
    margin: 0 0 20px;
  }

  .hero-quote {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 18px;
    color: var(--fg-on-dark-dim);
    max-width: 560px;
    padding-left: 16px;
    border-left: 1px solid var(--rule-dark);
    margin: 0 0 28px;
    line-height: 1.45;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .hero-actions a {
    display: inline-flex;
    align-items: center;
    padding: 13px 22px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: var(--v2-radius);
  }

  a.btn-primary {
    background: var(--fg-on-dark);
    color: var(--ink);
  }

  a.btn-ghost {
    border: 1px solid rgba(245, 244, 239, 0.28);
    color: var(--fg-on-dark);
    background: transparent;
  }

  .faq-main {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 48px 120px;
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 64px;
    align-items: start;
  }

  .toc {
    position: sticky;
    top: 100px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .toc-group {
    margin-bottom: 28px;
  }

  .toc-group-label {
    color: var(--fg-on-dark-mute);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .toc-group-label .dot {
    width: 6px;
    height: 6px;
    border-radius: var(--v2-radius-full);
    display: inline-block;
  }

  .toc-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: 14px;
  }

  .toc-item {
    color: var(--fg-on-dark-dim);
    padding: 4px 0;
    transition: color 120ms;
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    text-align: left;
  }

  .toc-item:hover {
    color: var(--accent);
  }

  .faq-content {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .faq-group {
    margin-bottom: 48px;
  }

  .faq-group-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 16px;
    align-items: baseline;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--rule-dark);
    margin-bottom: 0;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
  }

  .faq-group-header .title {
    color: var(--fg-on-dark);
    letter-spacing: 0.22em;
  }

  .faq-item {
    border-bottom: 1px solid var(--rule-dark-soft);
  }

  .faq-q {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 16px;
    align-items: baseline;
    padding: 16px 0;
    cursor: pointer;
    width: 100%;
    background: none;
    border: none;
    color: var(--fg-on-dark);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.45;
    text-align: left;
    transition: color 120ms;
  }

  .faq-q:hover {
    color: var(--accent);
  }

  .faq-q .num {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    color: var(--fg-on-dark-mute);
    min-width: 48px;
  }

  .faq-q .arrow {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--fg-on-dark-mute);
    transition:
      transform 200ms,
      color 200ms;
  }

  .faq-q[aria-expanded="true"] .arrow {
    transform: rotate(45deg);
    color: var(--accent);
  }

  .faq-q[aria-expanded="true"] .num {
    color: var(--accent);
  }

  .faq-a {
    overflow: hidden;
    max-height: 0;
    transition:
      max-height 300ms ease,
      opacity 200ms;
    opacity: 0;
  }

  .faq-a.is-open {
    max-height: 600px;
    opacity: 1;
  }

  .faq-a-inner {
    padding: 0 0 20px 64px;
    font-family: var(--font-body);
    font-size: 15px;
    line-height: 1.65;
    color: var(--fg-on-dark-dim);
    max-width: 680px;
  }

  .faq-footer {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 48px 96px;
  }

  .faq-footer-inner {
    border-top: 1px solid var(--rule-dark);
    padding-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px 28px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .faq-footer-label {
    color: var(--fg-on-dark);
  }

  .faq-footer-inner a {
    color: var(--fg-on-dark-dim);
    text-decoration: none;
    transition: color 120ms;
  }

  .faq-footer-inner a:hover {
    color: var(--fg-on-dark);
  }

  @media (max-width: 900px) {
    .faq-main {
      grid-template-columns: 1fr;
      gap: 32px;
      padding: 0 24px 80px;
    }

    .toc {
      position: static;
      display: flex;
      flex-wrap: wrap;
      gap: 8px 20px;
    }

    .toc-group {
      margin-bottom: 12px;
    }

    .toc-items {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 4px 16px;
      padding-left: 0;
    }

    .hero {
      padding-left: 24px;
      padding-right: 24px;
    }

    .faq-footer {
      padding: 0 24px 64px;
    }

    .faq-a-inner {
      padding-left: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-a {
      transition: none;
    }
  }
</style>
