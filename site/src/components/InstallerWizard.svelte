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
      }, 220);
    }
  }

  function back() {
    if (currentStep > 0 && !transitioning) {
      direction = 'backward';
      transitioning = true;
      setTimeout(() => {
        currentStep--;
        transitioning = false;
      }, 220);
    }
  }

  function goTo(step: number) {
    if (step === currentStep || transitioning) return;
    direction = step > currentStep ? 'forward' : 'backward';
    transitioning = true;
    setTimeout(() => {
      currentStep = step;
      transitioning = false;
    }, 220);
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

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });

  const EN = {
    hero: '𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.',
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
        hint: 'Press Enter or → to proceed',
      },
      {
        label: 'What\u2019s inside',
        title: 'What you\u2019re installing',
        body: [],
        items: [
          { icon: '⚒', name: '16 Skills', desc: 'Structured workflows for craft, convergence, and shipping' },
          { icon: '◈', name: 'Foundations', desc: 'loctree, aicx-mcp, prview, ScreenScribe — the perception layer' },
          { icon: '⇋', name: 'Agent Views', desc: 'Symlink surfaces for Claude, Codex, and Gemini CLIs' },
          { icon: '⌘', name: 'Shell Helpers', desc: 'vc-* commands, prompt functions, and the command deck' },
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
    hero: '𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.',
    version: 'v1.3.0',
    steps: [
      {
        label: 'Witaj',
        title: 'Witaj w instalatorze',
        body: [
          'Ten kreator przeprowadzi Cię przez instalację frameworka, jego fundamentów i zestawu umiejętności agentów.',
          'Nic nie zmienia się w Twoim systemie, dopóki wyraźnie nie zatwierdzisz planu.',
          'Każdy krok wyjaśnia co się zmienia, dlaczego to ważne i prosi o Twoją zgodę przed działaniem.',
        ],
        hint: 'Naciśnij Enter lub → aby kontynuować',
      },
      {
        label: 'Zawartość',
        title: 'Co instalujesz',
        body: [],
        items: [
          { icon: '⚒', name: '16 Skilli', desc: 'Strukturyzowane przepływy dla budowania, konwergencji i wysyłki' },
          { icon: '◈', name: 'Fundamenty', desc: 'loctree, aicx-mcp, prview, ScreenScribe — warstwa percepcji' },
          { icon: '⇋', name: 'Widoki Agentów', desc: 'Symlinki dla CLI Claude, Codex i Gemini' },
          { icon: '⌘', name: 'Helpery Shell', desc: 'Komendy vc-*, funkcje promptu i deck komend' },
        ],
        hint: 'To są komponenty, które instalator umieści',
      },
      {
        label: 'Wymagania',
        title: 'Twoje środowisko',
        body: [
          'Instalator sprawdzi Twój system pod kątem wymaganego toolchainu i opcjonalnych fundamentów.',
          'Brakujące opcjonalne narzędzia są odnotowane, ale nigdy nie blokują instalacji.',
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
        hint: 'Właściwe sprawdzenia odbywają się podczas instalacji',
      },
      {
        label: 'Instalacja',
        title: 'Uruchom instalator',
        body: [
          'Skopiuj poniższą komendę i uruchom ją w terminalu.',
          'Skrypt przygotowuje lokalny snapshot, uruchamia diagnostykę i otwiera prowadzony instalator. Żadna zmiana nie nastąpi bez Twojej zgody.',
        ],
        hint: 'Komenda otwiera ten sam prowadzony przepływ w terminalu',
      },
      {
        label: 'Dalej',
        title: 'Gotowe',
        body: [
          'Po zakończeniu instalacji deck komend jest aktywny.',
        ],
        commands: [
          { cmd: 'vibecrafted doctor', desc: 'Sprawdź poprawność instalacji' },
          { cmd: 'vibecrafted init claude', desc: 'Zainicjuj sesję w Twoim repo' },
          { cmd: 'vibecrafted help', desc: 'Zobacz dostępne komendy' },
        ],
        hint: 'Zacznij od vibecrafted doctor aby potwierdzić że wszystko działa',
      },
    ],
  };
</script>

<div class="wizard" role="region" aria-label={content.steps[currentStep]?.label}>
  <!-- Header -->
  <div class="wizard-header">
    <span class="wizard-brand">{content.hero}</span>
    <span class="wizard-version">{content.version}</span>
  </div>

  <!-- Progress dots -->
  <nav class="wizard-dots" aria-label="Installation steps">
    {#each content.steps as step, i}
      <button
        class="wizard-dot"
        class:active={i === currentStep}
        class:done={i < currentStep}
        onclick={() => goTo(i)}
        aria-label="{step.label} — step {i + 1} of {STEPS}"
        aria-current={i === currentStep ? 'step' : undefined}
      >
        <span class="wizard-dot__pip"></span>
        <span class="wizard-dot__label">{step.label}</span>
      </button>
    {/each}
  </nav>

  <!-- Slide area -->
  <div class="wizard-viewport">
    <div
      class="wizard-slide"
      class:slide-exit-left={transitioning && direction === 'forward'}
      class:slide-exit-right={transitioning && direction === 'backward'}
      class:slide-enter={!transitioning}
    >
      {#if currentStep === 0}
        <!-- Welcome -->
        <h2 class="slide-title">{content.steps[0].title}</h2>
        {#each content.steps[0].body as paragraph}
          <p class="slide-body">{paragraph}</p>
        {/each}

      {:else if currentStep === 1}
        <!-- What's inside -->
        <h2 class="slide-title">{content.steps[1].title}</h2>
        <div class="item-grid">
          {#each (content.steps[1] as any).items as item}
            <div class="item-card">
              <span class="item-icon">{item.icon}</span>
              <div>
                <strong class="item-name">{item.name}</strong>
                <p class="item-desc">{item.desc}</p>
              </div>
            </div>
          {/each}
        </div>

      {:else if currentStep === 2}
        <!-- Prerequisites -->
        <h2 class="slide-title">{content.steps[2].title}</h2>
        {#each content.steps[2].body as paragraph}
          <p class="slide-body">{paragraph}</p>
        {/each}
        <div class="check-list">
          {#each (content.steps[2] as any).checks as check}
            <div class="check-row">
              <span class="check-badge" class:required={check.required} class:optional={!check.required}>
                {check.required ? '●' : '○'}
              </span>
              <span class="check-label">{check.label}</span>
              <span class="check-tag">{check.required ? 'required' : 'optional'}</span>
            </div>
          {/each}
        </div>

      {:else if currentStep === 3}
        <!-- Install -->
        <h2 class="slide-title">{content.steps[3].title}</h2>
        {#each content.steps[3].body as paragraph}
          <p class="slide-body">{paragraph}</p>
        {/each}
        <div class="command-block">
          <div class="command-bar">
            <span class="command-prompt">$</span>
            <code class="command-code">{installCommand}</code>
            <button class="command-copy" onclick={copyCommand} aria-label="Copy command">
              {copyState === 'copied' ? '✓' : copyState === 'error' ? '✕' : '⎘'}
            </button>
          </div>
        </div>

      {:else if currentStep === 4}
        <!-- Next steps -->
        <h2 class="slide-title">{content.steps[4].title}</h2>
        {#each content.steps[4].body as paragraph}
          <p class="slide-body">{paragraph}</p>
        {/each}
        <div class="next-commands">
          {#each (content.steps[4] as any).commands as cmd}
            <div class="next-cmd">
              <code class="next-cmd__code">{cmd.cmd}</code>
              <span class="next-cmd__desc">{cmd.desc}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Hint -->
  <p class="wizard-hint">{content.steps[currentStep]?.hint}</p>

  <!-- Navigation -->
  <div class="wizard-nav">
    <button
      class="wizard-btn wizard-btn--back"
      onclick={back}
      disabled={currentStep === 0}
      aria-label="Previous step"
    >
      ← {lang === 'pl' ? 'Wstecz' : 'Back'}
    </button>
    <span class="wizard-counter">{currentStep + 1} / {STEPS}</span>
    {#if currentStep < STEPS - 1}
      <button
        class="wizard-btn wizard-btn--next"
        onclick={next}
        aria-label="Next step"
      >
        {lang === 'pl' ? 'Dalej' : 'Next'} →
      </button>
    {:else}
      <a
        class="wizard-btn wizard-btn--next wizard-btn--done"
        href={lang === 'pl' ? '/pl/quickstart/' : '/en/quickstart/'}
      >
        {lang === 'pl' ? 'Quick Start' : 'Quick Start'} →
      </a>
    {/if}
  </div>

  <!-- Footer -->
  <div class="wizard-footer">
    <span>🅵·🅁·🄰·🄼·🄴·🅆·🅞·🅡·🅺</span>
  </div>
</div>

<style>
  .wizard {
    --wz-copper: #b87333;
    --wz-copper-bright: #d4905c;
    --wz-steel: #a3b8c7;
    --wz-stone: #0e0e11;
    --wz-surface: rgba(18, 20, 24, 0.72);
    --wz-border: rgba(163, 184, 199, 0.12);
    --wz-text: rgba(229, 236, 245, 0.88);
    --wz-text-dim: rgba(229, 236, 245, 0.52);
    --wz-glow: rgba(184, 115, 51, 0.2);
    --wz-mono: 'JetBrains Mono', 'SF Mono', monospace;
    --wz-sans: 'Poppins', -apple-system, sans-serif;

    max-width: 640px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    font-family: var(--wz-sans);
    color: var(--wz-text);
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  /* Header */
  .wizard-header {
    text-align: center;
    padding: 1rem 0 0.5rem;
    border-bottom: 1px solid var(--wz-border);
    margin-bottom: 1.5rem;
  }
  .wizard-brand {
    font-family: var(--wz-mono);
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--wz-copper-bright);
  }
  .wizard-version {
    font-family: var(--wz-mono);
    font-size: 0.75rem;
    color: var(--wz-text-dim);
    margin-left: 0.5rem;
  }

  /* Progress dots */
  .wizard-dots {
    display: flex;
    justify-content: center;
    gap: 0;
    margin-bottom: 2rem;
  }
  .wizard-dot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.75rem;
    position: relative;
    transition: opacity 0.2s;
  }
  .wizard-dot:hover { opacity: 1; }
  .wizard-dot__pip {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--wz-border);
    background: transparent;
    transition: all 0.25s ease;
  }
  .wizard-dot.active .wizard-dot__pip {
    border-color: var(--wz-copper);
    background: var(--wz-copper);
    box-shadow: 0 0 8px var(--wz-glow);
  }
  .wizard-dot.done .wizard-dot__pip {
    border-color: var(--wz-copper-bright);
    background: var(--wz-copper-bright);
  }
  .wizard-dot__label {
    font-family: var(--wz-mono);
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--wz-text-dim);
    white-space: nowrap;
    transition: color 0.2s;
  }
  .wizard-dot.active .wizard-dot__label {
    color: var(--wz-copper-bright);
  }
  .wizard-dot.done .wizard-dot__label {
    color: var(--wz-text);
  }

  /* Connector lines between dots */
  .wizard-dot:not(:last-child)::after {
    content: '';
    position: absolute;
    top: calc(0.25rem + 4px);
    left: calc(50% + 10px);
    width: calc(100% - 20px);
    height: 2px;
    background: var(--wz-border);
    z-index: -1;
  }
  .wizard-dot.done:not(:last-child)::after {
    background: var(--wz-copper-bright);
  }

  /* Viewport */
  .wizard-viewport {
    flex: 1;
    overflow: hidden;
    position: relative;
    min-height: 320px;
  }
  .wizard-slide {
    transition: opacity 0.22s ease, transform 0.22s ease;
    opacity: 1;
    transform: translateX(0);
  }
  .wizard-slide.slide-exit-left {
    opacity: 0;
    transform: translateX(-24px);
  }
  .wizard-slide.slide-exit-right {
    opacity: 0;
    transform: translateX(24px);
  }
  .wizard-slide.slide-enter {
    opacity: 1;
    transform: translateX(0);
  }

  /* Slide content */
  .slide-title {
    font-family: var(--wz-sans);
    font-size: 1.375rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    color: var(--wz-text);
    line-height: 1.3;
  }
  .slide-body {
    font-family: var(--wz-sans);
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--wz-text-dim);
    margin-bottom: 0.75rem;
  }
  .slide-body:last-of-type {
    margin-bottom: 0;
  }

  /* Items grid (step 1) */
  .item-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
  @media (max-width: 500px) {
    .item-grid { grid-template-columns: 1fr; }
  }
  .item-card {
    display: flex;
    gap: 0.75rem;
    padding: 0.875rem;
    background: var(--wz-surface);
    border: 1px solid var(--wz-border);
    border-radius: 8px;
    align-items: flex-start;
  }
  .item-icon {
    font-size: 1.125rem;
    flex-shrink: 0;
    width: 1.5rem;
    text-align: center;
  }
  .item-name {
    font-family: var(--wz-mono);
    font-size: 0.8125rem;
    color: var(--wz-text);
    display: block;
    margin-bottom: 0.25rem;
  }
  .item-desc {
    font-size: 0.75rem;
    color: var(--wz-text-dim);
    line-height: 1.4;
  }

  /* Check list (step 2) */
  .check-list {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }
  .check-row {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    background: var(--wz-surface);
    border: 1px solid var(--wz-border);
    font-family: var(--wz-mono);
    font-size: 0.8125rem;
  }
  .check-badge {
    font-size: 0.625rem;
    width: 1rem;
    text-align: center;
    flex-shrink: 0;
  }
  .check-badge.required { color: var(--wz-copper-bright); }
  .check-badge.optional { color: var(--wz-text-dim); }
  .check-label {
    flex: 1;
    color: var(--wz-text);
  }
  .check-tag {
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.125rem 0.375rem;
    border-radius: 3px;
    background: rgba(184, 115, 51, 0.1);
    color: var(--wz-copper-bright);
  }
  .check-row .check-badge.optional + .check-label + .check-tag {
    background: rgba(163, 184, 199, 0.08);
    color: var(--wz-text-dim);
  }

  /* Command block (step 3) */
  .command-block {
    margin-top: 1.5rem;
  }
  .command-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1rem;
    background: rgba(14, 14, 17, 0.9);
    border: 1px solid var(--wz-copper);
    border-radius: 8px;
    box-shadow: 0 0 16px var(--wz-glow);
  }
  .command-prompt {
    font-family: var(--wz-mono);
    color: var(--wz-copper-bright);
    font-weight: 600;
    flex-shrink: 0;
  }
  .command-code {
    font-family: var(--wz-mono);
    font-size: 0.8125rem;
    color: var(--wz-text);
    flex: 1;
    word-break: break-all;
    user-select: all;
  }
  .command-copy {
    background: none;
    border: 1px solid var(--wz-border);
    border-radius: 4px;
    color: var(--wz-text-dim);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .command-copy:hover {
    border-color: var(--wz-copper);
    color: var(--wz-copper-bright);
  }

  /* Next commands (step 4) */
  .next-commands {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    margin-top: 1rem;
  }
  .next-cmd {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    padding: 0.625rem 0.875rem;
    background: var(--wz-surface);
    border: 1px solid var(--wz-border);
    border-radius: 6px;
  }
  .next-cmd__code {
    font-family: var(--wz-mono);
    font-size: 0.8125rem;
    color: var(--wz-copper-bright);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .next-cmd__desc {
    font-size: 0.8125rem;
    color: var(--wz-text-dim);
  }

  /* Hint */
  .wizard-hint {
    font-family: var(--wz-mono);
    font-size: 0.6875rem;
    color: var(--wz-text-dim);
    text-align: center;
    margin: 1.5rem 0 0.75rem;
    opacity: 0.7;
  }

  /* Navigation */
  .wizard-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-top: 1px solid var(--wz-border);
  }
  .wizard-btn {
    font-family: var(--wz-mono);
    font-size: 0.8125rem;
    padding: 0.5rem 1.25rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
  }
  .wizard-btn--back {
    background: none;
    border: 1px solid var(--wz-border);
    color: var(--wz-text-dim);
  }
  .wizard-btn--back:hover:not(:disabled) {
    border-color: var(--wz-steel);
    color: var(--wz-text);
  }
  .wizard-btn--back:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .wizard-btn--next {
    background: var(--wz-copper);
    border: 1px solid var(--wz-copper);
    color: var(--wz-stone);
    font-weight: 600;
  }
  .wizard-btn--next:hover {
    background: var(--wz-copper-bright);
    border-color: var(--wz-copper-bright);
    box-shadow: 0 0 12px var(--wz-glow);
  }
  .wizard-btn--done {
    display: inline-flex;
    align-items: center;
  }
  .wizard-counter {
    font-family: var(--wz-mono);
    font-size: 0.75rem;
    color: var(--wz-text-dim);
  }

  /* Footer */
  .wizard-footer {
    text-align: center;
    padding: 0.75rem 0 0;
    font-size: 0.6875rem;
    color: var(--wz-text-dim);
    opacity: 0.5;
    letter-spacing: 0.12em;
  }
</style>
