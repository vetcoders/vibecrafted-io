<script lang="ts">
  import MicroBoard from './MicroBoard.svelte';

  type BoardAccent = 'default' | 'teal';

  interface Step {
    num: string;
    verb: string;
    title: string;
    body: string;
    command: string;
    lands: string[];
    state: number;
    pct: string;
    accent: BoardAccent;
  }

  const steps: Step[] = [
    {
      num: '01',
      verb: 'INIT',
      accent: 'default',
      state: 0.0,
      pct: '000',
      title: 'Scaffold the board.',
      body: 'Pick the system topology. The board shape and contract are declared upfront — before a single marble is thrown.',
      command: '$ vibecrafted init my-project',
      lands: ['VIBECRAFTED/ ROOT', 'BOARD.TOML', 'DWG-0001 MANIFEST'],
    },
    {
      num: '02',
      verb: 'FROM SCAFFOLD',
      accent: 'default',
      state: 0.3,
      pct: '030',
      title: 'First throws land.',
      body: 'Operators pick up the scaffold contract. Four marbles land, the outer frame stabilises, specialists acknowledge capacity.',
      command: '$ vibecrafted throw --phase scaffold',
      lands: ['4 MARBLES', 'STRUCTURE CONTRACT', 'CAPACITY MAP'],
    },
    {
      num: '03',
      verb: 'FROM CRAFT',
      accent: 'default',
      state: 0.6,
      pct: '060',
      title: 'Specialists work in parallel.',
      body: 'Each agent brings one skill. Throws go fast — the board shows density, ownership, intent. No prose, just position.',
      command: '$ vibecrafted throw --phase craft',
      lands: ['12 MARBLES', 'SPECIALIST COVERAGE', 'REPLAYABLE TRACES'],
    },
    {
      num: '04',
      verb: 'CONVERGE',
      accent: 'default',
      state: 0.75,
      pct: '075',
      title: 'Marbles find their grooves.',
      body: 'Duplicates collapse. Gaps become visible. The board pulls scattered work into shape without asking who threw what.',
      command: '$ vibecrafted converge',
      lands: ['MERGE PROTOCOL RUN', '7 MARBLES CONVERGED', 'CONFLICT LOG'],
    },
    {
      num: '05',
      verb: 'DOU',
      accent: 'teal',
      state: 0.9,
      pct: '090',
      title: 'Definition of Unconverged.',
      body: 'Every un-landed marble becomes an explicit question. What is missing, what is blocked, what can ship anyway.',
      command: '$ vibecrafted dou audit',
      lands: ['DOU REPORT', '3 OPEN QUESTIONS', 'RELEASE GATE STATUS'],
    },
    {
      num: '06',
      verb: 'SHIP',
      accent: 'teal',
      state: 1.0,
      pct: '100',
      title: 'The board becomes the changelog.',
      body: 'Release is a formality. The contract was declared upfront, the trail is auditable, the artifacts already exist.',
      command: '$ vibecrafted ship',
      lands: ['RELEASE TAG v0.1.0', 'CHANGELOG AUTO-BUILT', 'BOARD ARCHIVED'],
    },
  ];

  let activeIndex = $state(0);
  let carouselEl: HTMLDivElement | undefined = $state();
  let viewportEl: HTMLDivElement | undefined = $state();
  const slideEls: Array<HTMLDivElement | undefined> = $state(new Array(steps.length));
  let carouselVisible = $state(false);

  function scrollToSlide(i: number) {
    const slide = slideEls[i];
    if (!slide || !viewportEl) return;
    const slideLeft = slide.offsetLeft;
    viewportEl.scrollTo({
      left: slideLeft - 24,
      behavior: 'smooth',
    });
  }

  function next() {
    if (activeIndex < steps.length - 1) scrollToSlide(activeIndex + 1);
  }

  function prev() {
    if (activeIndex > 0) scrollToSlide(activeIndex - 1);
  }

  function handleWindowKeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (!carouselEl) return;

    // Two scopes when arrows should hijack:
    // 1) focus is inside the carousel (user clicked/tabbed in)
    // 2) carousel is visible in viewport AND nothing else is focused (body)
    const active = document.activeElement;
    const focusInside = active instanceof Node && carouselEl.contains(active);
    const noFocus = !active || active === document.body;
    if (!focusInside && !(noFocus && carouselVisible)) return;

    event.preventDefault();
    if (event.key === 'ArrowLeft') prev();
    else next();
  }

  $effect(() => {
    if (!viewportEl) return;
    const io = new IntersectionObserver(
      (entries) => {
        let bestIdx = -1;
        let bestRatio = 0;
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestIdx = idx;
          }
        });
        if (bestIdx >= 0 && bestRatio > 0.5) {
          activeIndex = bestIdx;
        }
      },
      {
        root: viewportEl,
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );
    slideEls.forEach((el) => {
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  });

  // Track whether the carousel is on screen — used to scope arrow-key hijack.
  $effect(() => {
    if (!carouselEl) return;
    const io = new IntersectionObserver(
      (entries) => {
        carouselVisible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.3 }
    );
    io.observe(carouselEl);
    return () => io.disconnect();
  });

  $effect(() => {
    window.addEventListener('keydown', handleWindowKeydown);
    return () => window.removeEventListener('keydown', handleWindowKeydown);
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class="qcar"
  role="region"
  aria-label="Quickstart steps carousel"
  bind:this={carouselEl}
  tabindex="0"
>
  <div class="qcar__viewport" bind:this={viewportEl}>
    {#each steps as step, i}
      <article
        class={['qcar__slide', i === activeIndex && 'qcar__slide--active']}
        data-idx={i}
        bind:this={slideEls[i]}
        aria-roledescription="slide"
        aria-label={`Step ${step.num}: ${step.title}`}
      >
        <div class="qcar__slide-head">
          <span class={['qcar__num', step.accent === 'teal' && 'qcar__num--teal']}>{step.num}</span>
          <span class="qcar__verb">{step.verb}</span>
        </div>

        <h3 class="qcar__title">{step.title}</h3>
        <p class="qcar__body">{step.body}</p>

        <code class="qcar__cmd">{step.command}</code>

        <div class="qcar__lands">
          <span class="qcar__lands-label">LANDS:</span>
          {#each step.lands as land, li}
            {#if li > 0}<span class="qcar__lands-sep">·</span>{/if}
            <span class="qcar__lands-chip">{land}</span>
          {/each}
        </div>

        <div class="qcar__board">
          <MicroBoard
            state={step.state}
            size={108}
            accent={step.accent}
            dotCount={10}
          />
          <span class={['qcar__converge', step.accent === 'teal' && 'qcar__converge--teal']}>
            {step.pct}% CONVERGE
          </span>
        </div>
      </article>
    {/each}
  </div>

  <div class="qcar__controls">
    <button
      type="button"
      class="qcar__btn qcar__btn--prev"
      onclick={prev}
      disabled={activeIndex === 0}
      aria-label="Previous step"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <path d="M9 2L4 7l5 5" />
      </svg>
    </button>

    <div class="qcar__dots" role="tablist" aria-label="Step navigation">
      {#each steps as _, i}
        <button
          type="button"
          class={['qcar__dot', i === activeIndex && 'qcar__dot--active']}
          onclick={() => scrollToSlide(i)}
          aria-label={`Go to step ${i + 1}`}
          aria-current={i === activeIndex ? 'true' : 'false'}
          role="tab"
        ></button>
      {/each}
    </div>

    <button
      type="button"
      class="qcar__btn qcar__btn--next"
      onclick={next}
      disabled={activeIndex === steps.length - 1}
      aria-label="Next step"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <path d="M5 2l5 5-5 5" />
      </svg>
    </button>
  </div>

  <div class="qcar__counter" aria-hidden="true">
    <span class="qcar__counter-num">{String(activeIndex + 1).padStart(2, '0')}</span>
    <span class="qcar__counter-sep">/</span>
    <span class="qcar__counter-total">{String(steps.length).padStart(2, '0')}</span>
  </div>
</div>

<style>
  .qcar {
    display: flex;
    flex-direction: column;
    gap: 28px;
    outline: none;
    /* Fit exactly 3 cards (3×360 + 2×16) — no peek on left/right at desktop. */
    max-width: calc(360px * 3 + 16px * 2);
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }

  .qcar:focus-visible {
    outline: 1px solid var(--accent);
    outline-offset: 4px;
    border-radius: 2px;
  }

  /* ── Viewport (scroll container) ─────────────────────────── */

  .qcar__viewport {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 4px 0 12px;
    scroll-padding-left: 24px;
  }

  .qcar__viewport::-webkit-scrollbar {
    display: none;
  }

  /* Pseudo-padding removed: viewport is now constrained to exactly 3 cards
   * (see .qcar max-width above) so first/last cards align flush with edges
   * — no left/right peek. */

  /* ── Slide ───────────────────────────────────────────────── */

  .qcar__slide {
    flex: 0 0 auto;
    width: clamp(280px, 28vw, 360px);
    scroll-snap-align: start;
    border: 1px solid var(--rule-dark);
    border-radius: 2px;
    padding: 28px 26px 24px;
    background: rgba(14, 14, 12, 0.45);
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: border-color 0.2s ease, opacity 0.25s ease, background 0.2s ease;
    opacity: 0.6;
  }

  .qcar__slide--active {
    opacity: 1;
    border-color: rgba(245, 244, 239, 0.22);
    background: rgba(14, 14, 12, 0.7);
  }

  .qcar__slide-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--rule-dark-soft);
  }

  .qcar__num {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 44px;
    line-height: 1;
    color: var(--fg-on-dark);
  }

  .qcar__num--teal {
    color: var(--accent-2);
  }

  .qcar__verb {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
  }

  .qcar__title {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 22px;
    line-height: 1.25;
    letter-spacing: -0.015em;
    color: var(--fg-on-dark);
    margin: 4px 0 0;
  }

  .qcar__body {
    font-family: var(--font-body);
    font-size: 13px;
    line-height: 1.55;
    color: var(--fg-on-dark-dim);
    margin: 0;
  }

  .qcar__cmd {
    display: block;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.02em;
    color: var(--fg-on-dark);
    padding: 9px 12px;
    border: 1px solid var(--rule-dark);
    background: rgba(0, 0, 0, 0.32);
    border-radius: 2px;
    margin: 6px 0 0;
    overflow-x: auto;
    white-space: nowrap;
  }

  .qcar__lands {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-dark-dim);
    line-height: 1.5;
  }

  .qcar__lands-label {
    color: var(--fg-on-dark-mute);
    letter-spacing: 0.22em;
    margin-right: 8px;
  }

  .qcar__lands-sep {
    margin: 0 6px;
    color: var(--fg-on-dark-mute);
  }

  .qcar__board {
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid var(--rule-dark-soft);
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .qcar__converge {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
  }

  .qcar__converge--teal {
    color: var(--accent-2);
  }

  /* ── Controls (prev / dots / next) ───────────────────────── */

  .qcar__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
  }

  .qcar__btn {
    appearance: none;
    width: 36px;
    height: 36px;
    border: 1px solid var(--rule-dark);
    background: transparent;
    color: var(--fg-on-dark-dim);
    border-radius: 50%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
  }

  .qcar__btn:hover:not(:disabled),
  .qcar__btn:focus-visible:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.06);
  }

  .qcar__btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .qcar__dots {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .qcar__dot {
    appearance: none;
    width: 8px;
    height: 8px;
    border: 0;
    background: var(--rule-dark);
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    transition: background 0.18s ease, width 0.18s ease, border-radius 0.18s ease;
  }

  .qcar__dot:hover:not(.qcar__dot--active) {
    background: var(--fg-on-dark-mute);
  }

  .qcar__dot--active {
    background: var(--accent);
    width: 22px;
    border-radius: 4px;
  }

  /* ── Counter ──────────────────────────────────────────────── */

  .qcar__counter {
    display: inline-flex;
    align-items: baseline;
    justify-content: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    font-variant-numeric: tabular-nums;
  }

  .qcar__counter-num {
    color: var(--accent);
  }

  /* ── Responsive ───────────────────────────────────────────── */

  @media (max-width: 720px) {
    .qcar__slide {
      width: calc(100vw - 80px);
      padding: 24px 20px 20px;
    }

    .qcar__title {
      font-size: 20px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .qcar__viewport {
      scroll-behavior: auto;
    }
    .qcar__slide,
    .qcar__btn,
    .qcar__dot {
      transition: none;
    }
  }
</style>
