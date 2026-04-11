<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    lang?: 'en' | 'pl';
  }

  let { lang = 'en' }: Props = $props();

  const STEPS = 5;
  let currentStep = $state(0);
  let direction = $state<'forward' | 'backward'>('forward');
  let transitioning = $state(false);
  let copyState = $state<'idle' | 'copied' | 'error'>('idle');

  const installCommand = 'curl -fsSL https://vibecrafted.io/install.sh | bash -s -- --gui';

  const content = $derived(lang === 'pl' ? PL : EN);

  function next() {
    if (currentStep < STEPS - 1 && !transitioning) {
      direction = 'forward';
      transitioning = true;
      setTimeout(() => {
        currentStep++;
        transitioning = false;
      }, 200);
    }
  }

  function back() {
    if (currentStep > 0 && !transitioning) {
      direction = 'backward';
      transitioning = true;
      setTimeout(() => {
        currentStep--;
        transitioning = false;
      }, 200);
    }
  }

  function goTo(step: number) {
    if (step === currentStep || transitioning) return;
    direction = step > currentStep ? 'forward' : 'backward';
    transitioning = true;
    setTimeout(() => {
      currentStep = step;
      transitioning = false;
    }, 200);
  }

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(installCommand);
      copyState = 'copied';
      setTimeout(() => { copyState = 'idle'; }, 2000);
    } catch {
      copyState = 'error';
      setTimeout(() => { copyState = 'idle'; }, 2000);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'Enter') next();
    else if (e.key === 'ArrowLeft' || e.key === 'Backspace') back();
    else if (e.key === 'Escape' && currentStep > 0) goTo(0);
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

  const EN = {
    hero: '\u{1D689}\u{1D692}\u{1D695}\u{1D696}\u{1D694}\u{1D69B}\u{1D68A}\u{1D699}\u{1D69D}\u{1D696}\u{1D695}.',
    version: 'v1.3.0',
    steps: [
      {
        label: 'Welcome',
        title: 'Welcome to the installer',
        body: [
          'This setup will guide you through installing the framework, its foundations, and the agent skill suite.',
          'Nothing touches your system until you explicitly approve the plan.',
          'Each step explains what changes, why it matters, and asks for your consent before acting.',
        ],
        hint: 'Press \u2192 or Enter to proceed',
      },
      {
        label: 'What\u2019s inside',
        title: 'What you\u2019re installing',
        body: [],
        items: [
          { icon: '\u2692', name: '16 Skills', desc: 'Structured workflows for craft, convergence, and shipping' },
          { icon: '\u25C8', name: 'Foundations', desc: 'loctree, aicx-mcp, prview, ScreenScribe \u2014 the perception layer' },
          { icon: '\u21CB', name: 'Agent Views', desc: 'Symlink surfaces for Claude, Codex, and Gemini CLIs' },
          { icon: '\u2318', name: 'Shell Helpers', desc: 'vc-* commands, prompt functions, and the command deck' },
        ],
        hint: 'These are the components the installer will place',
      },
      {
        label: 'Prerequisites',
        title: 'Your environment',
        body: [
          'The installer will check your machine for the required toolchain and optional foundations.',
          'Missing optional tools are noted but never block installation.',
        ],
        checks: [
          { label: 'python3', required: true },
          { label: 'git', required: true },
          { label: 'make', required: true },
          { label: 'node', required: false },
          { label: 'claude / codex / gemini', required: true },
          { label: 'loctree-mcp', required: false },
          { label: 'aicx-mcp', required: false },
          { label: 'mise', required: false },
        ],
        hint: 'Actual checks run during installation',
      },
      {
        label: 'Install',
        title: 'Run the installer',
        body: [
          'Copy the command below and run it in your terminal.',
          'The script stages a local snapshot, runs diagnostics, and opens the guided installer. No mutation happens without your approval.',
        ],
        hint: 'The command opens the same guided flow in your terminal',
      },
      {
        label: 'Next steps',
        title: 'You\u2019re ready',
        body: [
          'Once the installer finishes, the command deck is live.',
        ],
        commands: [
          { cmd: 'vibecrafted doctor', desc: 'Verify installation health' },
          { cmd: 'vibecrafted init claude', desc: 'Bootstrap a session in your repo' },
          { cmd: 'vibecrafted help', desc: 'See all available commands' },
        ],
        hint: 'Start with vibecrafted doctor to confirm everything is wired',
      },
    ],
  };

  const PL = {
    hero: '\u{1D689}\u{1D692}\u{1D695}\u{1D696}\u{1D694}\u{1D69B}\u{1D68A}\u{1D699}\u{1D69D}\u{1D696}\u{1D695}.',
    version: 'v1.3.0',
    steps: [
      {
        label: 'Witaj',
        title: 'Witaj w instalatorze',
        body: [
          'Ten kreator przeprowadzi Ci\u0119 przez instalacj\u0119 frameworka, jego fundament\u00f3w i zestawu umiej\u0119tno\u015bci agent\u00f3w.',
          'Nic nie zmienia si\u0119 w Twoim systemie, dop\u00f3ki wyra\u017anie nie zatwierdzisz planu.',
          'Ka\u017cdy krok wyja\u015bnia co si\u0119 zmienia, dlaczego to wa\u017cne i prosi o Twoj\u0105 zgod\u0119 przed dzia\u0142aniem.',
        ],
        hint: 'Naci\u015bnij \u2192 lub Enter aby kontynuowa\u0107',
      },
      {
        label: 'Zawarto\u015b\u0107',
        title: 'Co instalujesz',
        body: [],
        items: [
          { icon: '\u2692', name: '16 Skilli', desc: 'Strukturyzowane przep\u0142ywy dla budowania, konwergencji i wysy\u0142ki' },
          { icon: '\u25C8', name: 'Fundamenty', desc: 'loctree, aicx-mcp, prview, ScreenScribe \u2014 warstwa percepcji' },
          { icon: '\u21CB', name: 'Widoki Agent\u00f3w', desc: 'Symlinki dla CLI Claude, Codex i Gemini' },
          { icon: '\u2318', name: 'Helpery Shell', desc: 'Komendy vc-*, funkcje promptu i deck komend' },
        ],
        hint: 'To s\u0105 komponenty, kt\u00f3re instalator umie\u015bci',
      },
      {
        label: 'Wymagania',
        title: 'Twoje \u015brodowisko',
        body: [
          'Instalator sprawdzi Tw\u00f3j system pod k\u0105tem wymaganego toolchainu i opcjonalnych fundament\u00f3w.',
          'Brakuj\u0105ce opcjonalne narz\u0119dzia s\u0105 odnotowane, ale nigdy nie blokuj\u0105 instalacji.',
        ],
        checks: [
          { label: 'python3', required: true },
          { label: 'git', required: true },
          { label: 'make', required: true },
          { label: 'node', required: false },
          { label: 'claude / codex / gemini', required: true },
          { label: 'loctree-mcp', required: false },
          { label: 'aicx-mcp', required: false },
          { label: 'mise', required: false },
        ],
        hint: 'W\u0142a\u015bciwe sprawdzenia odbywaj\u0105 si\u0119 podczas instalacji',
      },
      {
        label: 'Instalacja',
        title: 'Uruchom instalator',
        body: [
          'Skopiuj poni\u017csz\u0105 komend\u0119 i uruchom j\u0105 w terminalu.',
          'Skrypt przygotowuje lokalny snapshot, uruchamia diagnostyk\u0119 i otwiera prowadzony instalator. \u017badna zmiana nie nast\u0105pi bez Twojej zgody.',
        ],
        hint: 'Komenda otwiera ten sam prowadzony przep\u0142yw w terminalu',
      },
      {
        label: 'Dalej',
        title: 'Gotowe',
        body: [
          'Po zako\u0144czeniu instalacji deck komend jest aktywny.',
        ],
        commands: [
          { cmd: 'vibecrafted doctor', desc: 'Sprawd\u017a poprawno\u015b\u0107 instalacji' },
          { cmd: 'vibecrafted init claude', desc: 'Zainicjuj sesj\u0119 w Twoim repo' },
          { cmd: 'vibecrafted help', desc: 'Zobacz dost\u0119pne komendy' },
        ],
        hint: 'Zacznij od vibecrafted doctor aby potwierdzi\u0107 \u017ce wszystko dzia\u0142a',
      },
    ],
  };
</script>

<div class="wizard" role="region" aria-label={content.steps[currentStep]?.label}>
  <!-- Header -->
  <header class="wz-header">
    <span class="wz-brand">{content.hero}</span>
    <span class="wz-version">{content.version}</span>
  </header>

  <!-- Progress dots -->
  <nav class="wz-progress" aria-label="Installation steps">
    {#each content.steps as step, i}
      <button
        class="wz-step"
        class:active={i === currentStep}
        class:done={i < currentStep}
        onclick={() => goTo(i)}
        aria-label="{step.label} \u2014 step {i + 1} of {STEPS}"
        aria-current={i === currentStep ? 'step' : undefined}
      >
        <span class="wz-pip"></span>
        <span class="wz-step-label">{step.label}</span>
      </button>
    {/each}
  </nav>

  <!-- Slide rail: contained scroll, no page scroll -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="wz-rail" ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
    <div
      class="wz-slide"
      class:exit-left={transitioning && direction === 'forward'}
      class:exit-right={transitioning && direction === 'backward'}
    >
      {#if currentStep === 0}
        <h2 class="wz-title">{content.steps[0].title}</h2>
        {#each content.steps[0].body as paragraph}
          <p class="wz-body">{paragraph}</p>
        {/each}

      {:else if currentStep === 1}
        <h2 class="wz-title">{content.steps[1].title}</h2>
        <div class="wz-grid">
          {#each (content.steps[1] as any).items as item}
            <div class="wz-card">
              <span class="wz-card-icon">{item.icon}</span>
              <div>
                <strong class="wz-card-name">{item.name}</strong>
                <p class="wz-card-desc">{item.desc}</p>
              </div>
            </div>
          {/each}
        </div>

      {:else if currentStep === 2}
        <h2 class="wz-title">{content.steps[2].title}</h2>
        {#each content.steps[2].body as paragraph}
          <p class="wz-body">{paragraph}</p>
        {/each}
        <div class="wz-checks">
          {#each (content.steps[2] as any).checks as check}
            <div class="wz-check">
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

      {:else if currentStep === 3}
        <h2 class="wz-title">{content.steps[3].title}</h2>
        {#each content.steps[3].body as paragraph}
          <p class="wz-body">{paragraph}</p>
        {/each}
        <div class="wz-cmd-block">
          <div class="wz-cmd-bar">
            <span class="wz-cmd-prompt">$</span>
            <code class="wz-cmd-text">{installCommand}</code>
            <button class="wz-cmd-copy" onclick={copyCommand} aria-label="Copy command">
              {copyState === 'copied' ? '\u2713' : copyState === 'error' ? '\u2715' : '\u2398'}
            </button>
          </div>
        </div>

      {:else if currentStep === 4}
        <h2 class="wz-title">{content.steps[4].title}</h2>
        {#each content.steps[4].body as paragraph}
          <p class="wz-body">{paragraph}</p>
        {/each}
        <div class="wz-next-cmds">
          {#each (content.steps[4] as any).commands as cmd}
            <div class="wz-next-cmd">
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
      \u2190 {lang === 'pl' ? 'Wstecz' : 'Back'}
    </button>
    <span class="wz-counter">{currentStep + 1} / {STEPS}</span>
    {#if currentStep < STEPS - 1}
      <button
        class="wz-btn wz-btn-next"
        onclick={next}
        aria-label="Next step"
      >
        {lang === 'pl' ? 'Dalej' : 'Next'} \u2192
      </button>
    {:else}
      <a
        class="wz-btn wz-btn-next wz-btn-done"
        href={lang === 'pl' ? '/pl/quickstart/' : '/en/quickstart/'}
      >
        Quick Start \u2192
      </a>
    {/if}
  </nav>

  <!-- Footer -->
  <footer class="wz-footer">
    <span>\uD83C\uDD75\u00B7\uD83C\uDD41\u00B7\uD83C\uDD30\u00B7\uD83C\uDD3C\u00B7\uD83C\uDD34\u00B7\uD83C\uDD46\u00B7\uD83C\uDD5E\u00B7\uD83C\uDD41\u00B7\uD83C\uDD5A</span>
  </footer>
</div>

<style>
  /*
   * Wizard shell: EXACTLY viewport height. No page scroll.
   * All overflow lives inside .wz-rail.
   * Tokens linked to global.css design language.
   */
  .wizard {
    --c-copper: var(--copper, #b87333);
    --c-copper-bright: var(--copper-bright, #d4905c);
    --c-steel: var(--steel, #a3b8c7);
    --c-stone: var(--stone-deep, #0e0e11);
    --c-surface: var(--card-bg, rgba(26, 29, 34, 0.6));
    --c-border: var(--card-border, rgba(163, 184, 199, 0.1));
    --c-text: var(--text-primary, rgba(229, 236, 245, 0.88));
    --c-text-dim: var(--text-secondary, rgba(229, 236, 245, 0.52));
    --c-glow: var(--glow-subtle, rgba(184, 115, 51, 0.16));
    --f-mono: 'JetBrains Mono', 'SF Mono', monospace;
    --f-sans: 'Poppins', -apple-system, sans-serif;

    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    font-family: var(--f-sans);
    color: var(--c-text);

    /* THE CONTRACT: exactly viewport height, no page scroll */
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* ---- Header ---- */
  .wz-header {
    text-align: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--c-border);
    margin-bottom: 1rem;
    flex-shrink: 0;
  }
  .wz-brand {
    font-family: var(--f-mono);
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--c-copper-bright);
  }
  .wz-version {
    font-family: var(--f-mono);
    font-size: 0.6875rem;
    color: var(--c-text-dim);
    margin-left: 0.5rem;
  }

  /* ---- Progress dots ---- */
  .wz-progress {
    display: flex;
    justify-content: center;
    gap: 0;
    margin-bottom: 1rem;
    flex-shrink: 0;
  }
  .wz-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.625rem;
    position: relative;
    transition: opacity 0.2s;
  }
  .wz-step:hover { opacity: 1; }
  .wz-pip {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--c-border);
    background: transparent;
    transition: all 0.25s ease;
    position: relative;
    z-index: 1;
  }
  .wz-step.active .wz-pip {
    border-color: var(--c-copper);
    background: var(--c-copper);
    box-shadow: 0 0 8px var(--c-glow);
  }
  .wz-step.done .wz-pip {
    border-color: var(--c-copper-bright);
    background: var(--c-copper-bright);
  }
  .wz-step-label {
    font-family: var(--f-mono);
    font-size: 0.5625rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--c-text-dim);
    white-space: nowrap;
    transition: color 0.2s;
  }
  .wz-step.active .wz-step-label { color: var(--c-copper-bright); }
  .wz-step.done .wz-step-label { color: var(--c-text); }

  /* Connector lines */
  .wz-step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: calc(0.25rem + 4px);
    left: calc(50% + 10px);
    width: calc(100% - 20px);
    height: 2px;
    background: var(--c-border);
    z-index: 0;
  }
  .wz-step.done:not(:last-child)::after {
    background: var(--c-copper-bright);
  }

  /* ---- Slide rail: THIS is the contained scroll zone ---- */
  .wz-rail {
    flex: 1 1 0;
    min-height: 0; /* critical for flex shrink */
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    scrollbar-width: thin;
    scrollbar-color: var(--c-copper) transparent;
  }
  .wz-rail::-webkit-scrollbar { width: 4px; }
  .wz-rail::-webkit-scrollbar-track { background: transparent; }
  .wz-rail::-webkit-scrollbar-thumb { background: var(--c-copper); border-radius: 2px; }

  .wz-slide {
    transition: opacity 0.2s ease, transform 0.2s ease;
    opacity: 1;
    transform: translateX(0);
    padding: 0.5rem 0;
  }
  .wz-slide.exit-left {
    opacity: 0;
    transform: translateX(-20px);
  }
  .wz-slide.exit-right {
    opacity: 0;
    transform: translateX(20px);
  }

  /* ---- Slide content ---- */
  .wz-title {
    font-family: var(--f-sans);
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--c-text);
    line-height: 1.3;
  }
  .wz-body {
    font-family: var(--f-sans);
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--c-text-dim);
    margin-bottom: 0.625rem;
  }
  .wz-body:last-of-type { margin-bottom: 0; }

  /* Items grid (step 1) */
  .wz-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
    margin-top: 0.5rem;
  }
  @media (max-width: 480px) {
    .wz-grid { grid-template-columns: 1fr; }
  }
  .wz-card {
    display: flex;
    gap: 0.625rem;
    padding: 0.75rem;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: 8px;
    align-items: flex-start;
  }
  .wz-card-icon {
    font-size: 1rem;
    flex-shrink: 0;
    width: 1.25rem;
    text-align: center;
  }
  .wz-card-name {
    font-family: var(--f-mono);
    font-size: 0.75rem;
    color: var(--c-text);
    display: block;
    margin-bottom: 0.125rem;
  }
  .wz-card-desc {
    font-size: 0.6875rem;
    color: var(--c-text-dim);
    line-height: 1.4;
  }

  /* Check list (step 2) */
  .wz-checks {
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .wz-check {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.625rem;
    border-radius: 6px;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    font-family: var(--f-mono);
    font-size: 0.75rem;
  }
  .wz-badge {
    font-size: 0.5rem;
    width: 0.875rem;
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
    font-size: 0.5625rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.125rem 0.375rem;
    border-radius: 3px;
  }
  .wz-tag.req {
    background: rgba(184, 115, 51, 0.1);
    color: var(--c-copper-bright);
  }
  .wz-tag.opt {
    background: rgba(163, 184, 199, 0.08);
    color: var(--c-text-dim);
  }

  /* Command block (step 3) */
  .wz-cmd-block {
    margin-top: 1.25rem;
  }
  .wz-cmd-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 0.875rem;
    background: rgba(14, 14, 17, 0.92);
    border: 1px solid var(--c-copper);
    border-radius: 8px;
    box-shadow: 0 0 16px var(--c-glow);
  }
  .wz-cmd-prompt {
    font-family: var(--f-mono);
    color: var(--c-copper-bright);
    font-weight: 600;
    flex-shrink: 0;
  }
  .wz-cmd-text {
    font-family: var(--f-mono);
    font-size: 0.75rem;
    color: var(--c-text);
    flex: 1;
    word-break: break-all;
    user-select: all;
  }
  .wz-cmd-copy {
    background: none;
    border: 1px solid var(--c-border);
    border-radius: 4px;
    color: var(--c-text-dim);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 0.8125rem;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .wz-cmd-copy:hover {
    border-color: var(--c-copper);
    color: var(--c-copper-bright);
  }

  /* Next commands (step 4) */
  .wz-next-cmds {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  .wz-next-cmd {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: 6px;
  }
  .wz-next-cmd-code {
    font-family: var(--f-mono);
    font-size: 0.75rem;
    color: var(--c-copper-bright);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .wz-next-cmd-desc {
    font-size: 0.75rem;
    color: var(--c-text-dim);
  }

  /* ---- Hint ---- */
  .wz-hint {
    font-family: var(--f-mono);
    font-size: 0.625rem;
    color: var(--c-text-dim);
    text-align: center;
    margin: 0.75rem 0 0.5rem;
    opacity: 0.7;
    flex-shrink: 0;
  }

  /* ---- Navigation ---- */
  .wz-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-top: 1px solid var(--c-border);
    flex-shrink: 0;
  }
  .wz-btn {
    font-family: var(--f-mono);
    font-size: 0.75rem;
    padding: 0.4375rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
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
    opacity: 0.3;
    cursor: not-allowed;
  }
  .wz-btn-next {
    background: var(--c-copper);
    border: 1px solid var(--c-copper);
    color: var(--c-stone);
    font-weight: 600;
  }
  .wz-btn-next:hover {
    background: var(--c-copper-bright);
    border-color: var(--c-copper-bright);
    box-shadow: 0 0 12px var(--c-glow);
  }
  .wz-btn-done {
    display: inline-flex;
    align-items: center;
  }
  .wz-counter {
    font-family: var(--f-mono);
    font-size: 0.6875rem;
    color: var(--c-text-dim);
  }

  /* ---- Footer ---- */
  .wz-footer {
    text-align: center;
    padding: 0.5rem 0 0;
    font-size: 0.625rem;
    color: var(--c-text-dim);
    opacity: 0.4;
    letter-spacing: 0.12em;
    flex-shrink: 0;
  }

  /* ---- Responsive: short viewports ---- */
  @media (max-height: 600px) {
    .wizard { padding: 0.5rem 1rem; }
    .wz-header { padding: 0.25rem 0; margin-bottom: 0.5rem; }
    .wz-progress { margin-bottom: 0.5rem; }
    .wz-title { font-size: 1.125rem; margin-bottom: 0.625rem; }
    .wz-body { font-size: 0.8125rem; }
    .wz-hint { margin: 0.375rem 0 0.25rem; }
    .wz-nav { padding: 0.375rem 0; }
    .wz-footer { padding: 0.25rem 0 0; }
  }
</style>
