<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    lang?: 'en' | 'pl';
  }

  let { lang = 'en' }: Props = $props();

  const STEPS = 5;
  let currentStep = $state(0);
  let direction = $state<'forward' | 'backward'>('forward');
  let slideVisible = $state(true);
  let copyState = $state<'idle' | 'copied' | 'error'>('idle');
  let termLines = $state<string[]>([]);
  let termRunning = $state(false);

  const installCommand = 'curl -fsSL https://vibecrafted.io/install.sh | bash -s -- --gui';

  const content = $derived(lang === 'pl' ? PL : EN);
  const progress = $derived((currentStep / (STEPS - 1)) * 100);

  function goToStep(step: number) {
    if (step === currentStep || !slideVisible) return;
    direction = step > currentStep ? 'forward' : 'backward';
    slideVisible = false;
    setTimeout(() => {
      currentStep = step;
      slideVisible = true;
      if (step === 3 && !termRunning) simulateTerminal();
    }, 180);
  }

  function next() {
    if (currentStep < STEPS - 1) goToStep(currentStep + 1);
  }

  function back() {
    if (currentStep > 0) goToStep(currentStep - 1);
  }

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(installCommand);
      copyState = 'copied';
      setTimeout(() => { copyState = 'idle'; }, 2200);
    } catch {
      copyState = 'error';
      setTimeout(() => { copyState = 'idle'; }, 2200);
    }
  }

  function simulateTerminal() {
    if (termRunning) return;
    termRunning = true;
    termLines = [];
    const lines = lang === 'pl' ? TERM_PL : TERM_EN;
    let i = 0;
    const tick = () => {
      if (i < lines.length) {
        termLines = [...termLines, lines[i]];
        i++;
        setTimeout(tick, 120 + Math.random() * 180);
      }
    };
    tick();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'Enter') next();
    else if (e.key === 'ArrowLeft' || e.key === 'Backspace') back();
    else if (e.key === 'Escape' && currentStep > 0) goToStep(0);
  }

  let touchStartX = 0;
  let touchStartY = 0;

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next();
      else back();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });

  const TERM_EN = [
    '$ curl -fsSL https://vibecrafted.io/install.sh | bash -s -- --gui',
    'Resolving channel main...',
    'Verifying signature... ✓',
    'Staging vibecrafted-v1.3.0...',
    '▸ Phase 1/4: Diagnostics',
    '  python3 ✓  git ✓  make ✓  node ✓',
    '  claude ✓  loctree-mcp ✓  aicx-mcp ✓',
    '▸ Phase 2/4: Foundations',
    '  Installing loctree-mcp... done',
    '  Installing aicx-mcp... done',
    '▸ Phase 3/4: Skills + Helpers',
    '  16 skills installed',
    '  Shell helpers linked',
    '▸ Phase 4/4: Verification',
    '  Doctor: 94 ok / 2 warnings / 0 failures',
    '',
    '✓ Installation complete. Run: vibecrafted doctor',
  ];

  const TERM_PL = [
    '$ curl -fsSL https://vibecrafted.io/install.sh | bash -s -- --gui',
    'Rozwiązywanie kanału main...',
    'Weryfikacja sygnatury... ✓',
    'Staging vibecrafted-v1.3.0...',
    '▸ Faza 1/4: Diagnostyka',
    '  python3 ✓  git ✓  make ✓  node ✓',
    '  claude ✓  loctree-mcp ✓  aicx-mcp ✓',
    '▸ Faza 2/4: Fundamenty',
    '  Instalacja loctree-mcp... gotowe',
    '  Instalacja aicx-mcp... gotowe',
    '▸ Faza 3/4: Skille + Helpery',
    '  16 skilli zainstalowanych',
    '  Helpery shell podłączone',
    '▸ Faza 4/4: Weryfikacja',
    '  Doctor: 94 ok / 2 warnings / 0 failures',
    '',
    '✓ Instalacja zakończona. Uruchom: vibecrafted doctor',
  ];

  const EN = {
    hero: '\u{1D689}\u{1D692}\u{1D695}\u{1D696}\u{1D694}\u{1D69B}\u{1D68A}\u{1D699}\u{1D69D}\u{1D696}\u{1D695}.',
    version: 'v1.3.0',
    steps: [
      {
        label: 'Welcome',
        title: 'Install in\u00a060\u00a0seconds',
        body: [
          'One command stages, verifies, and installs the full framework.',
          'Nothing touches your system until you approve.',
        ],
        hint: 'Press \u2192 or swipe to begin',
      },
      {
        label: 'Inside',
        title: 'What you get',
        body: [],
        items: [
          { icon: '\u2692', name: '16 Skills', desc: 'Craft \u2192 Converge \u2192 Ship workflows' },
          { icon: '\u25C8', name: 'Foundations', desc: 'loctree, aicx-mcp, prview, ScreenScribe' },
          { icon: '\u21CB', name: 'Agent Views', desc: 'Claude, Codex, and Gemini CLI surfaces' },
          { icon: '\u2318', name: 'Shell Helpers', desc: 'vc-* commands and the command deck' },
        ],
        hint: 'Components placed by the installer',
      },
      {
        label: 'Check',
        title: 'Prerequisites',
        body: [
          'The installer checks your environment automatically.',
          'Optional tools are noted but never block installation.',
        ],
        checks: [
          { label: 'python3', required: true },
          { label: 'git', required: true },
          { label: 'make', required: true },
          { label: 'node', required: false },
          { label: 'claude / codex / gemini', required: true },
          { label: 'loctree-mcp', required: false },
          { label: 'aicx-mcp', required: false },
        ],
        hint: 'Real checks run during install',
      },
      {
        label: 'Install',
        title: 'Run it',
        body: [
          'Copy the command and paste it in your terminal.',
        ],
        hint: 'The guided installer opens automatically',
      },
      {
        label: 'Go',
        title: 'You\u2019re live',
        body: [
          'The command deck is ready. Start here:',
        ],
        commands: [
          { cmd: 'vibecrafted doctor', desc: 'Verify health' },
          { cmd: 'vibecrafted init claude', desc: 'Bootstrap a session' },
          { cmd: 'vibecrafted help', desc: 'See all commands' },
        ],
        hint: 'Start with doctor to confirm everything works',
      },
    ],
  };

  const PL = {
    hero: '\u{1D689}\u{1D692}\u{1D695}\u{1D696}\u{1D694}\u{1D69B}\u{1D68A}\u{1D699}\u{1D69D}\u{1D696}\u{1D695}.',
    version: 'v1.3.0',
    steps: [
      {
        label: 'Witaj',
        title: 'Instalacja w\u00a060\u00a0sekund',
        body: [
          'Jedna komenda przygotowuje, weryfikuje i instaluje ca\u0142y framework.',
          'Nic nie zmienia si\u0119 w systemie, dop\u00f3ki nie zatwierdzisz.',
        ],
        hint: 'Naci\u015bnij \u2192 lub przesu\u0144 palcem',
      },
      {
        label: 'Sk\u0142ad',
        title: 'Co dostajesz',
        body: [],
        items: [
          { icon: '\u2692', name: '16 Skilli', desc: 'Buduj \u2192 Konwerguj \u2192 Wysy\u0142aj' },
          { icon: '\u25C8', name: 'Fundamenty', desc: 'loctree, aicx-mcp, prview, ScreenScribe' },
          { icon: '\u21CB', name: 'Widoki Agent\u00f3w', desc: 'Powierzchnie CLI Claude, Codex i Gemini' },
          { icon: '\u2318', name: 'Helpery', desc: 'Komendy vc-* i deck komend' },
        ],
        hint: 'Komponenty umieszczane przez instalator',
      },
      {
        label: 'Wymagania',
        title: 'Twoje \u015brodowisko',
        body: [
          'Instalator automatycznie sprawdza \u015brodowisko.',
          'Brakuj\u0105ce opcjonalne narz\u0119dzia nie blokuj\u0105 instalacji.',
        ],
        checks: [
          { label: 'python3', required: true },
          { label: 'git', required: true },
          { label: 'make', required: true },
          { label: 'node', required: false },
          { label: 'claude / codex / gemini', required: true },
          { label: 'loctree-mcp', required: false },
          { label: 'aicx-mcp', required: false },
        ],
        hint: 'Sprawdzenia uruchamiane podczas instalacji',
      },
      {
        label: 'Instaluj',
        title: 'Uruchom',
        body: [
          'Skopiuj komend\u0119 i wklej w terminalu.',
        ],
        hint: 'Prowadzony instalator otworzy si\u0119 automatycznie',
      },
      {
        label: 'Start',
        title: 'Gotowe',
        body: [
          'Deck komend jest aktywny. Zacznij tutaj:',
        ],
        commands: [
          { cmd: 'vibecrafted doctor', desc: 'Sprawd\u017a poprawno\u015b\u0107' },
          { cmd: 'vibecrafted init claude', desc: 'Zainicjuj sesj\u0119' },
          { cmd: 'vibecrafted help', desc: 'Wszystkie komendy' },
        ],
        hint: 'Zacznij od doctor \u017ceby potwierdzi\u0107 \u017ce dzia\u0142a',
      },
    ],
  };
</script>

<div class="wizard" role="region" aria-label={content.steps[currentStep]?.label}>

  <!-- Brand -->
  <header class="wz-brand-bar">
    <span class="wz-brand">{content.hero}</span>
    <span class="wz-ver">{content.version}</span>
  </header>

  <!-- Progress -->
  <nav class="wz-progress" aria-label="Steps">
    <div class="wz-track">
      <div class="wz-track-fill" style="width: {progress}%"></div>
    </div>
    <div class="wz-dots">
      {#each content.steps as step, i}
        <button
          class="wz-dot"
          class:active={i === currentStep}
          class:done={i < currentStep}
          onclick={() => goToStep(i)}
          aria-label="{step.label} — step {i + 1} of {STEPS}"
          aria-current={i === currentStep ? 'step' : undefined}
        >
          <span class="wz-pip">
            {#if i < currentStep}
              <svg viewBox="0 0 12 12" width="10" height="10"><polyline points="2,6 5,9 10,3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {/if}
          </span>
          <span class="wz-dot-label">{step.label}</span>
        </button>
      {/each}
    </div>
  </nav>

  <!-- Slide area -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="wz-stage" ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
    <div
      class="wz-slide"
      class:slide-in-right={slideVisible && direction === 'forward'}
      class:slide-in-left={slideVisible && direction === 'backward'}
      class:slide-out-left={!slideVisible && direction === 'forward'}
      class:slide-out-right={!slideVisible && direction === 'backward'}
      class:slide-initial={slideVisible && currentStep === 0 && direction === 'forward'}
    >

      <!-- Step 0: Welcome -->
      {#if currentStep === 0}
        <div class="wz-center">
          <h2 class="wz-title">{content.steps[0].title}</h2>
          {#each content.steps[0].body as p}
            <p class="wz-body">{p}</p>
          {/each}
          <button class="wz-cta" onclick={next}>
            {lang === 'pl' ? 'Zaczynamy' : 'Get started'} <span class="wz-cta-arrow">&rarr;</span>
          </button>
        </div>

      <!-- Step 1: What's inside -->
      {:else if currentStep === 1}
        <h2 class="wz-title">{content.steps[1].title}</h2>
        <div class="wz-grid">
          {#each (content.steps[1] as any).items as item, idx}
            <div class="wz-card" style="animation-delay: {idx * 60}ms">
              <span class="wz-card-icon">{item.icon}</span>
              <div>
                <strong class="wz-card-name">{item.name}</strong>
                <p class="wz-card-desc">{item.desc}</p>
              </div>
            </div>
          {/each}
        </div>

      <!-- Step 2: Prerequisites -->
      {:else if currentStep === 2}
        <h2 class="wz-title">{content.steps[2].title}</h2>
        {#each content.steps[2].body as p}
          <p class="wz-body">{p}</p>
        {/each}
        <div class="wz-checks">
          {#each (content.steps[2] as any).checks as check, idx}
            <div class="wz-check" style="animation-delay: {idx * 40}ms">
              <span class="wz-badge" class:req={check.required} class:opt={!check.required}>
                {check.required ? '\u25CF' : '\u25CB'}
              </span>
              <span class="wz-check-label">{check.label}</span>
              <span class="wz-tag" class:req={check.required} class:opt={!check.required}>
                {check.required ? 'required' : 'optional'}
              </span>
            </div>
          {/each}
        </div>

      <!-- Step 3: Install command + terminal sim -->
      {:else if currentStep === 3}
        <h2 class="wz-title">{content.steps[3].title}</h2>
        {#each content.steps[3].body as p}
          <p class="wz-body">{p}</p>
        {/each}
        <div class="wz-cmd-block">
          <div class="wz-cmd-bar">
            <span class="wz-cmd-prompt">$</span>
            <code class="wz-cmd-text">{installCommand}</code>
            <button
              class="wz-cmd-copy"
              class:copied={copyState === 'copied'}
              onclick={copyCommand}
              aria-label="Copy command"
            >
              {copyState === 'copied' ? '\u2713 Copied' : copyState === 'error' ? '\u2715' : 'Copy'}
            </button>
          </div>
        </div>
        {#if termLines.length > 0}
          <div class="wz-terminal">
            {#each termLines as line}
              <div class="wz-term-line">{line}</div>
            {/each}
            {#if termLines.length < (lang === 'pl' ? TERM_PL.length : TERM_EN.length)}
              <span class="wz-cursor">_</span>
            {/if}
          </div>
        {/if}

      <!-- Step 4: Next steps -->
      {:else if currentStep === 4}
        <h2 class="wz-title">{content.steps[4].title}</h2>
        {#each content.steps[4].body as p}
          <p class="wz-body">{p}</p>
        {/each}
        <div class="wz-next-cmds">
          {#each (content.steps[4] as any).commands as cmd, idx}
            <div class="wz-next-cmd" style="animation-delay: {idx * 80}ms">
              <code class="wz-next-cmd-code">{cmd.cmd}</code>
              <span class="wz-next-cmd-desc">{cmd.desc}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Hint -->
  <p class="wz-hint">{content.steps[currentStep]?.hint}</p>

  <!-- Navigation -->
  <nav class="wz-nav">
    <button
      class="wz-btn wz-btn-back"
      onclick={back}
      disabled={currentStep === 0}
      aria-label="Previous step"
    >
      &larr;
    </button>
    <span class="wz-counter">{currentStep + 1}<span class="wz-counter-sep">/</span>{STEPS}</span>
    {#if currentStep < STEPS - 1}
      <button class="wz-btn wz-btn-next" onclick={next} aria-label="Next step">
        &rarr;
      </button>
    {:else}
      <a
        class="wz-btn wz-btn-next wz-btn-done"
        href={lang === 'pl' ? '/pl/quickstart/' : '/en/quickstart/'}
      >
        Quick Start &rarr;
      </a>
    {/if}
  </nav>

  <footer class="wz-footer">
    <span>//vibecrafted.</span>
  </footer>
</div>

<style>
  /* ===================================================================
   *  Onboarding Wizard — viewport-locked, slide-based, minimalist
   *  Design tokens inherit from global.css.
   * =================================================================== */
  .wizard {
    --c-copper: var(--copper, #b87333);
    --c-copper-bright: var(--copper-bright, #d4905c);
    --c-steel: var(--steel, #a3b8c7);
    --c-stone: var(--stone-deep, #0e0e11);
    --c-surface: var(--card-bg, rgba(26, 29, 34, 0.55));
    --c-border: var(--card-border, rgba(163, 184, 199, 0.1));
    --c-text: var(--text-primary, rgba(229, 236, 245, 0.88));
    --c-text-dim: var(--text-secondary, rgba(229, 236, 245, 0.48));
    --c-glow: rgba(184, 115, 51, 0.2);
    --f-mono: 'JetBrains Mono', 'SF Mono', monospace;
    --f-sans: 'Poppins', -apple-system, sans-serif;
    --ease: cubic-bezier(0.4, 0, 0.2, 1);

    width: 100%;
    max-width: 580px;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    font-family: var(--f-sans);
    color: var(--c-text);
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    -webkit-user-select: none;
    user-select: none;
  }

  /* ---- Brand bar ---- */
  .wz-brand-bar {
    text-align: center;
    padding: 0.375rem 0 0.625rem;
    flex-shrink: 0;
  }
  .wz-brand {
    font-family: var(--f-mono);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--c-copper-bright);
  }
  .wz-ver {
    font-family: var(--f-mono);
    font-size: 0.625rem;
    color: var(--c-text-dim);
    margin-left: 0.375rem;
    vertical-align: middle;
  }

  /* ---- Progress track + dots ---- */
  .wz-progress {
    flex-shrink: 0;
    margin-bottom: 1.25rem;
    position: relative;
  }
  .wz-track {
    position: absolute;
    top: 5px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: var(--c-border);
    border-radius: 1px;
    overflow: hidden;
  }
  .wz-track-fill {
    height: 100%;
    background: var(--c-copper);
    border-radius: 1px;
    transition: width 0.35s var(--ease);
  }
  .wz-dots {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }
  .wz-dot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    flex: 1;
  }
  .wz-pip {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid var(--c-border);
    background: var(--c-stone);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s var(--ease);
    color: var(--c-stone);
  }
  .wz-dot.active .wz-pip {
    border-color: var(--c-copper);
    background: var(--c-copper);
    box-shadow: 0 0 10px var(--c-glow), 0 0 20px rgba(184, 115, 51, 0.08);
    transform: scale(1.2);
  }
  .wz-dot.done .wz-pip {
    border-color: var(--c-copper-bright);
    background: var(--c-copper-bright);
    color: var(--c-stone);
  }
  .wz-dot.done .wz-pip svg { display: block; }
  .wz-pip svg { display: none; }
  .wz-dot-label {
    font-family: var(--f-mono);
    font-size: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--c-text-dim);
    transition: color 0.2s;
  }
  .wz-dot.active .wz-dot-label { color: var(--c-copper-bright); }
  .wz-dot.done .wz-dot-label { color: var(--c-text); }

  /* ---- Slide stage ---- */
  .wz-stage {
    flex: 1 1 0;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    scrollbar-width: thin;
    scrollbar-color: var(--c-copper) transparent;
  }
  .wz-stage::-webkit-scrollbar { width: 3px; }
  .wz-stage::-webkit-scrollbar-track { background: transparent; }
  .wz-stage::-webkit-scrollbar-thumb { background: var(--c-copper); border-radius: 2px; }

  .wz-slide {
    padding: 0.25rem 0;
    will-change: transform, opacity;
  }

  /* Slide transitions */
  .slide-initial { opacity: 1; transform: none; }

  .slide-in-right {
    animation: slideInRight 0.28s var(--ease) forwards;
  }
  .slide-in-left {
    animation: slideInLeft 0.28s var(--ease) forwards;
  }
  .slide-out-left {
    animation: slideOutLeft 0.16s var(--ease) forwards;
  }
  .slide-out-right {
    animation: slideOutRight 0.16s var(--ease) forwards;
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideOutLeft {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(-30px); }
  }
  @keyframes slideOutRight {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(30px); }
  }

  /* ---- Content typography ---- */
  .wz-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100%;
    gap: 0.5rem;
  }
  .wz-title {
    font-family: var(--f-sans);
    font-size: clamp(1.125rem, 3vw, 1.375rem);
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--c-text);
    line-height: 1.25;
  }
  .wz-body {
    font-size: 0.8125rem;
    line-height: 1.65;
    color: var(--c-text-dim);
    margin-bottom: 0.375rem;
    max-width: 44ch;
  }

  /* CTA button on welcome */
  .wz-cta {
    margin-top: 1rem;
    font-family: var(--f-mono);
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 0.625rem 1.75rem;
    border-radius: 8px;
    border: none;
    background: var(--c-copper);
    color: var(--c-stone);
    cursor: pointer;
    transition: all 0.25s var(--ease);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  .wz-cta:hover {
    background: var(--c-copper-bright);
    box-shadow: 0 0 20px var(--c-glow);
    transform: translateY(-1px);
  }
  .wz-cta-arrow {
    transition: transform 0.2s;
  }
  .wz-cta:hover .wz-cta-arrow {
    transform: translateX(3px);
  }

  /* ---- Cards grid (step 1) ---- */
  .wz-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }
  @media (max-width: 480px) {
    .wz-grid { grid-template-columns: 1fr; }
  }
  .wz-card {
    display: flex;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: 10px;
    align-items: flex-start;
    animation: cardIn 0.35s var(--ease) both;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .wz-card:hover {
    border-color: rgba(184, 115, 51, 0.25);
    box-shadow: 0 0 12px rgba(184, 115, 51, 0.06);
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .wz-card-icon {
    font-size: 0.875rem;
    flex-shrink: 0;
    width: 1.125rem;
    text-align: center;
    line-height: 1.5;
  }
  .wz-card-name {
    font-family: var(--f-mono);
    font-size: 0.6875rem;
    color: var(--c-text);
    display: block;
    margin-bottom: 0.125rem;
  }
  .wz-card-desc {
    font-size: 0.625rem;
    color: var(--c-text-dim);
    line-height: 1.45;
    margin: 0;
  }

  /* ---- Checklist (step 2) ---- */
  .wz-checks {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.1875rem;
  }
  .wz-check {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3125rem 0.5rem;
    border-radius: 6px;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    font-family: var(--f-mono);
    font-size: 0.6875rem;
    animation: cardIn 0.3s var(--ease) both;
  }
  .wz-badge {
    font-size: 0.4375rem;
    width: 0.75rem;
    text-align: center;
    flex-shrink: 0;
  }
  .wz-badge.req { color: var(--c-copper-bright); }
  .wz-badge.opt { color: var(--c-text-dim); }
  .wz-check-label {
    flex: 1;
    color: var(--c-text);
  }
  .wz-tag {
    font-size: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.0625rem 0.3125rem;
    border-radius: 3px;
  }
  .wz-tag.req {
    background: rgba(184, 115, 51, 0.1);
    color: var(--c-copper-bright);
  }
  .wz-tag.opt {
    background: rgba(163, 184, 199, 0.06);
    color: var(--c-text-dim);
  }

  /* ---- Command block (step 3) ---- */
  .wz-cmd-block {
    margin-top: 0.75rem;
  }
  .wz-cmd-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    background: rgba(14, 14, 17, 0.92);
    border: 1px solid var(--c-copper);
    border-radius: 8px;
    box-shadow: 0 0 16px var(--c-glow);
  }
  .wz-cmd-prompt {
    font-family: var(--f-mono);
    color: var(--c-copper-bright);
    font-weight: 700;
    flex-shrink: 0;
  }
  .wz-cmd-text {
    font-family: var(--f-mono);
    font-size: 0.6875rem;
    color: var(--c-text);
    flex: 1;
    word-break: break-all;
    -webkit-user-select: all;
    user-select: all;
  }
  .wz-cmd-copy {
    font-family: var(--f-mono);
    font-size: 0.625rem;
    background: none;
    border: 1px solid var(--c-border);
    border-radius: 5px;
    color: var(--c-text-dim);
    cursor: pointer;
    padding: 0.1875rem 0.5rem;
    transition: all 0.2s;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .wz-cmd-copy:hover {
    border-color: var(--c-copper);
    color: var(--c-copper-bright);
  }
  .wz-cmd-copy.copied {
    border-color: var(--c-copper-bright);
    color: var(--c-copper-bright);
    background: rgba(184, 115, 51, 0.08);
  }

  /* ---- Terminal sim ---- */
  .wz-terminal {
    margin-top: 0.625rem;
    padding: 0.5rem 0.625rem;
    background: rgba(14, 14, 17, 0.85);
    border: 1px solid var(--c-border);
    border-radius: 6px;
    font-family: var(--f-mono);
    font-size: 0.5625rem;
    line-height: 1.55;
    color: var(--c-text-dim);
    max-height: 12rem;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--c-copper) transparent;
  }
  .wz-term-line {
    white-space: pre;
    animation: termIn 0.15s ease both;
  }
  @keyframes termIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .wz-cursor {
    animation: blink 0.8s step-end infinite;
    color: var(--c-copper);
  }
  @keyframes blink {
    50% { opacity: 0; }
  }

  /* ---- Next commands (step 4) ---- */
  .wz-next-cmds {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin-top: 0.5rem;
  }
  .wz-next-cmd {
    display: flex;
    align-items: baseline;
    gap: 0.625rem;
    padding: 0.4375rem 0.625rem;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: 6px;
    animation: cardIn 0.35s var(--ease) both;
  }
  .wz-next-cmd-code {
    font-family: var(--f-mono);
    font-size: 0.6875rem;
    color: var(--c-copper-bright);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .wz-next-cmd-desc {
    font-size: 0.6875rem;
    color: var(--c-text-dim);
  }

  /* ---- Hint ---- */
  .wz-hint {
    font-family: var(--f-mono);
    font-size: 0.5625rem;
    color: var(--c-text-dim);
    text-align: center;
    margin: 0.5rem 0 0.375rem;
    opacity: 0.6;
    flex-shrink: 0;
  }

  /* ---- Navigation ---- */
  .wz-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.375rem 0;
    border-top: 1px solid var(--c-border);
    flex-shrink: 0;
  }
  .wz-btn {
    font-family: var(--f-mono);
    font-size: 0.8125rem;
    width: 2.5rem;
    height: 2.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s var(--ease);
    text-decoration: none;
  }
  .wz-btn-back {
    background: none;
    border: 1px solid var(--c-border);
    color: var(--c-text-dim);
  }
  .wz-btn-back:hover:not(:disabled) {
    border-color: var(--c-steel);
    color: var(--c-text);
  }
  .wz-btn-back:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
  .wz-btn-next {
    background: var(--c-copper);
    border: 1px solid var(--c-copper);
    color: var(--c-stone);
    font-weight: 700;
  }
  .wz-btn-next:hover {
    background: var(--c-copper-bright);
    border-color: var(--c-copper-bright);
    box-shadow: 0 0 14px var(--c-glow);
    transform: scale(1.05);
  }
  .wz-btn-done {
    border-radius: 1.25rem;
    width: auto;
    padding: 0 1rem;
    font-size: 0.6875rem;
    gap: 0.25rem;
  }
  .wz-counter {
    font-family: var(--f-mono);
    font-size: 0.75rem;
    color: var(--c-text-dim);
  }
  .wz-counter-sep {
    opacity: 0.4;
    margin: 0 0.125rem;
  }

  /* ---- Footer ---- */
  .wz-footer {
    text-align: center;
    padding: 0.25rem 0 0;
    font-family: var(--f-mono);
    font-size: 0.5625rem;
    color: var(--c-text-dim);
    opacity: 0.3;
    letter-spacing: 0.08em;
    flex-shrink: 0;
  }

  /* ---- Responsive ---- */
  @media (max-height: 600px) {
    .wizard { padding: 0.375rem 1rem; }
    .wz-brand-bar { padding: 0.125rem 0 0.375rem; }
    .wz-progress { margin-bottom: 0.75rem; }
    .wz-title { font-size: 1rem; margin-bottom: 0.5rem; }
    .wz-body { font-size: 0.75rem; }
    .wz-hint { margin: 0.25rem 0; }
    .wz-nav { padding: 0.25rem 0; }
  }
  @media (max-width: 360px) {
    .wizard { padding: 0.5rem 0.75rem; }
    .wz-dot-label { display: none; }
  }
</style>
