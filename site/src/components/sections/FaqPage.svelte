<script lang="ts">
  interface Props {
    lang?: 'en' | 'pl';
  }

  interface FaqItem {
    q: string;
    a: string;
  }

  interface FaqGroup {
    id: string;
    title: string;
    color: string;
    items: FaqItem[];
  }

  let { lang = 'en' } = $props<Props>();

  let openMap = $state<Record<number, boolean>>({});

  const GROUPS: FaqGroup[] = [
    {
      id: 'installation',
      title: 'Installation',
      color: '#d97757',
      items: [
        {
          q: 'Why does Vibecrafted install into <code>$VIBECRAFTED_ROOT/.vibecrafted/</code> instead of <code>$HOME/.agents/</code>?',
          a: '<code>$VIBECRAFTED_ROOT/.vibecrafted/</code> is the central store and control plane. Agent-specific directories are only views or symlink targets. The real source of truth, artifacts, and helper state live in one place.',
        },
        {
          q: 'Can I install Vibecrafted without editing my shell config?',
          a: 'Yes. During the interactive path you can opt out of shell-helper installation. If you still want helpers in the current session, source <code>${XDG_CONFIG_HOME:-$HOME/.config}/vetcoders/vc-skills.sh</code> manually.',
        },
        {
          q: 'What does <code>make doctor</code> actually check?',
          a: 'The doctor verifies the central store, helper availability, symlink health, optional foundations such as loctree, aicx, prview, and ScreenScribe, plus whether your shell environment is quiet enough for agent tooling.',
        },
        {
          q: 'Which install path should I use in CI or automation?',
          a: 'Use <code>make install</code> for the direct non-interactive path, or call <code>python3 scripts/vetcoders_install.py install --source "$PWD" --non-interactive</code> when you want full CLI control.',
        },
      ],
    },
    {
      id: 'skills',
      title: 'Skills, Agents, Foundations',
      color: '#3d7a72',
      items: [
        {
          q: 'What is the difference between a skill and an agent?',
          a: 'An agent is the runtime, such as Codex, Claude, or Gemini. A skill is the instruction set and workflow protocol that tells that runtime how to behave for a specific engineering phase.',
        },
        {
          q: 'Why not just use ChatGPT, Copilot, or a single giant prompt?',
          a: 'Because Vibecrafted is trying to solve system-shaping, not just chat convenience. It combines structural awareness, decision retrieval, convergence loops, and shipping audits so the model sees the repo and the product surface instead of improvising blind.',
        },
        {
          q: 'Can I use Vibecrafted without loctree or aicx?',
          a: 'Technically yes, but you lose structural perception and session continuity. The framework still runs, but the agent is operating with much weaker context.',
        },
        {
          q: 'How do I get <code>screenscribe review</code> past early model validation?',
          a: 'Treat it as runtime truth, not folklore. Keep the CLI reachable on <code>PATH</code>, keep <code>~/.config/screenscribe/config.env</code> aligned with the Libraxis defaults, and remember that the current CLI still overrides stored flags during <code>review</code>. See the ScreenScribe Review Gate doc for specifics.',
        },
        {
          q: 'What is the Marbles loop?',
          a: 'Marbles is the convergence engine. AI output is noisy, so the framework loops through implementation, followup, measurement, and fixes until the important classes of findings reach zero.',
        },
      ],
    },
    {
      id: 'workflow',
      title: 'Workflow and Operations',
      color: '#c99a3b',
      items: [
        {
          q: 'When should I use <code>vc-justdo</code> instead of manual phases?',
          a: 'Use <code>vc-justdo</code> when the task is clear and you want the agent to take ownership end-to-end. Use the phase skills separately when you want to supervise the architectural decisions more closely.',
        },
        {
          q: 'Can I run Vibecrafted in CI/CD?',
          a: 'Yes. The direct install path is non-interactive, and skills like review, followup, and release are explicitly shaped to work as repeatable quality or packaging gates.',
        },
        {
          q: 'What lives in <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>?',
          a: 'Plans, reports, transcripts, and metadata from major runs. The artifact store exists so agent work leaves durable evidence instead of disappearing into terminal scrollback.',
        },
        {
          q: 'What is Definition of Undone?',
          a: 'DoU is the audit that checks whether people can discover, understand, install, trust, and adopt the thing. It measures product-surface truth, not only repo health.',
        },
      ],
    },
    {
      id: 'commercial',
      title: 'Commercial posture',
      color: '#f5f4ef',
      items: [
        {
          q: 'Is Vibecrafted open source?',
          a: 'The framework is distributed under Business Source License 1.1. The repo is visible and usable, but it is not pure permissive open source.',
        },
        {
          q: 'Can small teams use it in production?',
          a: 'Yes. The Additional Use Grant allows individual developers and teams smaller than five people to use the framework in production as long as they are not offering a competitive hosted or embedded product.',
        },
        {
          q: 'What if I need a broader commercial arrangement?',
          a: 'The license points to VetCoders for alternative licensing arrangements. Read the repo license for the exact terms and contact route before you commit to a broader rollout.',
        },
      ],
    },
  ] as const;

  const indexedGroups = GROUPS.map((group, groupIndex) => {
    const offset = GROUPS.slice(0, groupIndex).reduce((sum, previous) => sum + previous.items.length, 0);
    return {
      ...group,
      items: group.items.map((item, itemIndex) => ({
        ...item,
        idx: offset + itemIndex,
      })),
    };
  });

  function padded(num: number): string {
    return String(num + 1).padStart(2, '0');
  }

  function toggle(idx: number): void {
    openMap[idx] = !openMap[idx];
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

  const quickstartHref = $derived(`/${lang}/quickstart/`);
  const overviewHref = $derived(`/${lang}/`);
</script>

<div class="faq-page">
  <header class="hero">
    <div class="hero-header">
      <span>§ 06 · FAQ</span>
      <span>FIG. 06 · DWG VC-006</span>
    </div>
    <h1>The questions strangers ask&nbsp;first.</h1>
    <p class="hero-lead">
      This page exists so the framework can explain itself without forcing people to reverse-engineer the repo, the shell helpers, or the license before they know whether the system fits.
    </p>
    <p class="hero-quote">
      "The installer, docs, and command deck should all promise the same thing."
    </p>
    <div class="hero-actions">
      <a href={quickstartHref} class="btn-primary">Read Quick Start</a>
      <a href={overviewHref} class="btn-ghost">Back to Overview</a>
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
                aria-expanded={openMap[item.idx] || false}
                aria-controls={`faq-answer-${item.idx}`}
                onclick={() => toggle(item.idx)}
              >
                <span class="num">{padded(item.idx)}</span>
                <span>{@html item.q}</span>
                <span class="arrow" aria-hidden="true">+</span>
              </button>
              <div
                class={`faq-a${openMap[item.idx] ? ' is-open' : ''}`}
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
      <a href={quickstartHref}>Quick Start</a>
      <a href="https://github.com/VetCoders/vibecrafted/blob/main/docs/FAQ-ANSWERED.md">Long-form Markdown FAQ</a>
      <a href="https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md">ScreenScribe Review Gate</a>
      <a href="https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md">Content Truth Matrix</a>
      <a href="https://github.com/VetCoders/vibecrafted/blob/main/LICENSE">License (BSL 1.1)</a>
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
    border-radius: 2px;
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
    border-radius: 2px;
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
    border-radius: 50%;
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
