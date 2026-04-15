<script lang="ts">
  import { Tween, prefersReducedMotion } from 'svelte/motion';
  import CopyButton from './CopyButton.svelte';
  import importedManifest from '../lib/generated/install-manifest.json';

  interface Props {
    lang?: 'en' | 'pl';
    manifest?: any;
  }

  let { lang = 'en', manifest = importedManifest }: Props = $props();

  const STEPS = 5;
  let currentStep = $state(0);
  let direction = $state<'forward' | 'backward'>('forward');
  let slideVisible = $state(true);
  let termLines = $state<string[]>([]);
  let termRunning = $state(false);

  const installCommand = 'curl -fsSL https://vibecrafted.io/install.sh | bash -s -- --gui';

  const requiredCategories = ['toolchains', 'agents'];
  const dynamicChecks = (() => {
    const checks = [];
    const diags = manifest.diagnostics;
    if (diags && diags.categories) {
      for (const cat of diags.categories) {
        if (diags.commands && diags.commands[cat]) {
          const isRequired = requiredCategories.includes(cat);
          for (const cmd of diags.commands[cat]) {
            checks.push({ label: cmd, required: isRequired });
          }
        }
      }
    }
    return checks;
  })();

  const phaseIcons = ['\u25C8', '\u21CB', '\u2318', '\u21B3'];
  const dynamicPhases = (manifest.phases || []).map((p, idx) => ({
    icon: phaseIcons[idx % phaseIcons.length],
    name: p.label,
    desc: p.reason.split('\n')[0] || p.reason
  }));


  const content = $derived(lang === 'pl' ? PL : EN);
  const progressTween = Tween.of(() => (currentStep / (STEPS - 1)) * 100, {
    duration: prefersReducedMotion.current ? 0 : 280,
  });
  const counterTween = Tween.of(() => currentStep + 1, {
    duration: prefersReducedMotion.current ? 0 : 220,
  });
  const copyLabels = $derived(
    lang === 'pl'
      ? {
          default: 'Kopiuj',
          copied: 'Skopiowano',
          error: 'Błąd',
          defaultAria: 'Kopiuj komendę',
          copiedAria: 'Komenda skopiowana',
          errorAria: 'Nie udało się skopiować komendy',
        }
      : {
          default: 'Copy',
          copied: 'Copied',
          error: 'Error',
          defaultAria: 'Copy command',
          copiedAria: 'Command copied',
          errorAria: 'Failed to copy command',
        }
  );
  const uiLabels = $derived(
    lang === 'pl'
      ? {
          steps: 'Kroki',
          required: 'wymagane',
          optional: 'opcjonalne',
          previous: 'Poprzedni krok',
          next: 'Następny krok',
          quickStart: 'Quick Start',
          stepAria: 'krok',
          ofAria: 'z',
          terminalKicker: 'Podgląd instalacji',
          terminalBody: 'Skrypt startowy uruchamia lokalny instalator w przeglądarce, a dalsze komunikaty lecą już w tym widoku.',
          welcomeCta: 'Pokaż jak to działa',
        }
      : {
          steps: 'Steps',
          required: 'required',
          optional: 'optional',
          previous: 'Previous step',
          next: 'Next step',
          quickStart: 'Quick Start',
          stepAria: 'step',
          ofAria: 'of',
          terminalKicker: 'Install preview',
          terminalBody: 'The startup script opens the local browser installer, and all further progress continues there.',
          welcomeCta: 'See how it works',
        }
  );
  const welcomeNotes = $derived(lang === 'pl' ? WELCOME_NOTES_PL : WELCOME_NOTES_EN);

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

  $effect(() => {
    if (!termRunning) simulateTerminal();
  });

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

  const TERM_EN = [
    '$ curl -fsSL https://vibecrafted.io/install.sh | bash -s -- --gui',
    '[bootstrap] Downloading install.sh...',
    '[bootstrap] Resolving channel main...',
    '[bootstrap] Verifying integrity... SHA256 ✓  Signature ✓',
    '[bootstrap] Preparing local files under ~/.vibecrafted/tools/vibecrafted-main',
    '',
    '[bootstrap] Opening browser installer at http://127.0.0.1:48217',
    '',
    '[browser] Welcome -> Explain -> Diagnostics -> Checklist',
    '[browser] This view remains read-only until you start the installation.',
    '[browser] Start installation',
    '[browser] [stage] Bootstrap foundations',
    '[browser] [stage] Install Vibecrafted',
    '[browser] Streaming real installer output...',
  ];

  const TERM_PL = [
    '$ curl -fsSL https://vibecrafted.io/install.sh | bash -s -- --gui',
    '[bootstrap] Pobieranie install.sh...',
    '[bootstrap] Rozwiązywanie kanału main...',
    '[bootstrap] Weryfikacja integralności... SHA256 ✓  Signature ✓',
    '[bootstrap] Przygotowywanie lokalnej kopii pod ~/.vibecrafted/tools/vibecrafted-main',
    '',
    '[bootstrap] Otwieranie instalatora w przeglądarce pod http://127.0.0.1:48217',
    '',
    '[przeglądarka] Witaj -> Wyjaśnienie -> Diagnostyka -> Lista kontrolna',
    '[przeglądarka] Ten widok pozostaje tylko informacyjny, dopóki nie uruchomisz instalacji.',
    '[przeglądarka] Uruchamianie instalacji',
    '[przeglądarka] [etap] Bootstrap fundamentów',
    '[przeglądarka] [etap] Instalacja Vibecrafted',
    '[przeglądarka] Strumień prawdziwych komunikatów z instalatora...',
  ];

  const terminalSeedLines = $derived((lang === 'pl' ? TERM_PL : TERM_EN).slice(0, 8));
  const terminalPreviewLines = $derived(termLines.length > 0 ? termLines : terminalSeedLines);

  const WELCOME_NOTES_EN = [
    {
      label: 'Terminal only launches',
      value: 'The bootstrap command prepares the local files and opens the installer in your browser.',
    },
    {
      label: 'Changes happen after consent',
      value: 'The installer explains the plan first and asks right before making any real changes on your machine.',
    },
  ];

  const WELCOME_NOTES_PL = [
    {
      label: 'Terminal tylko startuje',
      value: 'Komenda bootstrapująca przygotowuje lokalną kopię i otwiera instalator w przeglądarce.',
    },
    {
      label: 'Zmiany dopiero po zgodzie',
      value: 'Instalator najpierw pokazuje plan i pyta tuż przed tym, zanim cokolwiek zmieni na Twojej maszynie.',
    },
  ];

  const EN = {
    steps: [
      {
        label: 'Welcome',
        title: 'Browser installer',
        body: [
          'The public entry point is the browser view. The terminal command only launches it.',
          'The real installation and live output continue there instead of getting buried in shell logs.',
        ],
        hint: 'Browser first. Same installer engine underneath.',
      },
      {
        label: 'Inside',
        title: 'What happens under the hood',
        body: [],
        items: dynamicPhases,
        hint: 'One browser interface, one installation engine',
      },
      {
        label: 'Check',
        title: 'Your environment',
        body: [
          'The installer checks your system before starting any steps that modify your machine.',
          'Missing optional tools are shown clearly, so you know what you might need before starting the install.',
        ],
        checks: dynamicChecks,
        hint: 'Explain first, make changes later',
      },
      {
        label: 'Install',
        title: 'Run the installer',
        body: [
          'Use the startup command to open the local installer in your browser.',
          'From there the process stays in the browser, shows live progress, and asks for confirmation right before making real changes.',
        ],
        hint: 'The preview below shows the moment the browser takes over',
      },
      {
        label: 'Go',
        title: 'After the installation finishes',
        body: [
          'The command deck becomes available locally after the browser installation completes successfully. Start here:',
        ],
        commands: [
          { cmd: 'vibecrafted doctor', desc: 'Verify health' },
          { cmd: 'vibecrafted init claude', desc: 'Bootstrap a session' },
          { cmd: 'vibecrafted help', desc: 'See all commands' },
        ],
        hint: 'Start with doctor after the installation',
      },
    ],
  };

  const PL = {
    steps: [
      {
        label: 'Witaj',
        title: 'Instalator w przeglądarce',
        body: [
          'Publicznym wejściem jest widok w przeglądarce. Komenda w terminalu tylko go uruchamia.',
          'Prawdziwa instalacja i komunikaty na żywo lecą już tam, zamiast ginąć w scrollu shella.',
        ],
        hint: 'Najpierw przeglądarka. Pod spodem ten sam silnik instalacji.',
      },
      {
        label: 'Sk\u0142ad',
        title: 'Co dzieje się pod spodem',
        body: [],
        items: dynamicPhases,
        hint: 'Jedna powierzchnia w przeglądarce, jeden mechanizm instalacji',
      },
      {
        label: 'Wymagania',
        title: 'Twoje \u015brodowisko',
        body: [
          'Instalator w przeglądarce sprawdza stan Twojej maszyny zanim ruszą kroki zmieniające system.',
          'Braki opcjonalnych narzędzi pokazuje jasno, żebyś wiedział, czego brakuje przed startem instalacji.',
        ],
        checks: dynamicChecks,
        hint: 'Najpierw wyjaśnienie, potem zmiany',
      },
      {
        label: 'Instaluj',
        title: 'Uruchom instalator',
        body: [
          'Użyj komendy bootstrapującej, żeby otworzyć lokalny widok instalatora w przeglądarce.',
          'Od tego momentu instalacja zostaje w przeglądarce, pokazuje komunikaty na żywo i pyta dopiero tuż przed realnymi zmianami.',
        ],
        hint: 'Podgląd poniżej pokazuje moment, w którym przeglądarka przejmuje instalację',
      },
      {
        label: 'Start',
        title: 'Po zakończeniu instalacji',
        body: [
          'Deck komend pojawi się lokalnie po czystym zakończeniu instalacji w przeglądarce. Zacznij tutaj:',
        ],
        commands: [
          { cmd: 'vibecrafted doctor', desc: 'Sprawd\u017a poprawno\u015b\u0107' },
          { cmd: 'vibecrafted init claude', desc: 'Zainicjuj sesj\u0119' },
          { cmd: 'vibecrafted help', desc: 'Wszystkie komendy' },
        ],
        hint: 'Zacznij od doctor po instalacji',
      },
    ],
  };
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="wizard" role="region" aria-label={content.steps[currentStep]?.label}>
  <!-- Progress -->
  <nav class="wz-progress" aria-label={uiLabels.steps}>
    <div class="wz-track">
      <div class="wz-track-fill" style={`width: ${progressTween.current}%`}></div>
    </div>
    <div class="wz-dots">
      {#each content.steps as step, i}
        <button
          class="wz-dot"
          class:active={i === currentStep}
          class:done={i < currentStep}
          onclick={() => goToStep(i)}
          aria-label={`${step.label} — ${uiLabels.stepAria} ${i + 1} ${uiLabels.ofAria} ${STEPS}`}
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
        <div class="wz-welcome-split">
          <div class="wz-welcome-main">
            <h2 class="wz-title">{content.steps[0].title}</h2>
            {#each content.steps[0].body as p}
              <p class="wz-body">{p}</p>
            {/each}
            <div class="wz-welcome-notes">
              {#each welcomeNotes as item}
                <div class="wz-welcome-note">
                  <span class="wz-welcome-note-label">{item.label}</span>
                  <p class="wz-welcome-note-value">{item.value}</p>
                </div>
              {/each}
            </div>
            <button class="wz-cta" onclick={next}>
              {uiLabels.welcomeCta} <span class="wz-cta-arrow">&rarr;</span>
            </button>
          </div>

          <div class="wz-terminal-shell wz-terminal-shell--hero">
            <div class="wz-terminal-meta">
              <span class="wz-terminal-kicker">{uiLabels.terminalKicker}</span>
              <p class="wz-terminal-copy">{uiLabels.terminalBody}</p>
            </div>
            <div class="wz-terminal">
              {#each terminalPreviewLines as line}
                <div class="wz-term-line">{line}</div>
              {/each}
              {#if termLines.length < (lang === 'pl' ? TERM_PL.length : TERM_EN.length)}
                <span class="wz-cursor">_</span>
              {/if}
            </div>
          </div>
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
                {check.required ? uiLabels.required : uiLabels.optional}
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
        <div class="wz-terminal-shell wz-terminal-shell--primary">
          <div class="wz-terminal-meta">
            <span class="wz-terminal-kicker">{uiLabels.terminalKicker}</span>
            <p class="wz-terminal-copy">{uiLabels.terminalBody}</p>
          </div>
          <div class="wz-terminal">
            {#each terminalPreviewLines as line}
              <div class="wz-term-line">{line}</div>
            {/each}
            {#if termLines.length < (lang === 'pl' ? TERM_PL.length : TERM_EN.length)}
              <span class="wz-cursor">_</span>
            {/if}
          </div>
        </div>
        <div class="wz-cmd-block">
          <div class="wz-cmd-bar">
            <span class="wz-cmd-prompt">$</span>
            <code class="wz-cmd-text">{installCommand}</code>
            <CopyButton
              class="wz-cmd-copy"
              textToCopy={installCommand}
              defaultLabel={copyLabels.default}
              copiedLabel={copyLabels.copied}
              errorLabel={copyLabels.error}
              defaultAriaLabel={copyLabels.defaultAria}
              copiedAriaLabel={copyLabels.copiedAria}
              errorAriaLabel={copyLabels.errorAria}
            />
          </div>
        </div>

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
      aria-label={uiLabels.previous}
    >
      &larr;
    </button>
    <span class="wz-counter">{Math.round(counterTween.current)}<span class="wz-counter-sep">/</span>{STEPS}</span>
    {#if currentStep < STEPS - 1}
      <button class="wz-btn wz-btn-next" onclick={next} aria-label={uiLabels.next}>
        &rarr;
      </button>
    {:else}
      <a
        class="wz-btn wz-btn-next wz-btn-done"
        href={lang === 'pl' ? '/pl/quickstart/' : '/en/quickstart/'}
      >
        {uiLabels.quickStart} &rarr;
      </a>
    {/if}
  </nav>

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
    --c-surface: var(--glass-panel-bg, linear-gradient(180deg, rgba(18, 20, 24, 0.68), rgba(8, 9, 12, 0.82)));
    --c-surface-strong: var(--glass-panel-bg-strong, linear-gradient(180deg, rgba(18, 20, 24, 0.8), rgba(8, 9, 12, 0.9)));
    --c-border: var(--glass-panel-border, rgba(196, 212, 224, 0.18));
    --c-text: var(--text-primary, rgba(229, 236, 245, 0.88));
    --c-text-dim: rgba(212, 223, 232, 0.72);
    --c-glow: rgba(184, 115, 51, 0.22);
    --c-glow-soft: rgba(184, 115, 51, 0.1);
    --f-mono: var(--font-mono, 'JetBrains Mono', 'SF Mono', monospace);
    --f-sans: var(--font-head, 'Poppins', -apple-system, sans-serif);
    --ease: cubic-bezier(0.2, 0.8, 0.2, 1);

    width: 100%;
    max-width: 66rem;
    margin: 0 auto;
    min-height: 100%;
    height: 100%;
    padding: clamp(1rem, 2.1vw, 1.45rem) clamp(0.95rem, 2.4vw, 1.6rem);
    font-family: var(--f-sans);
    color: var(--c-text);
    display: flex;
    flex-direction: column;
    gap: clamp(0.8rem, 1.3vw, 1.1rem);
    overflow: hidden;
    -webkit-user-select: none;
    user-select: none;
  }

  /* ---- Progress track + dots ---- */
  .wz-progress {
    flex-shrink: 0;
    margin-bottom: 0.1rem;
    position: relative;
  }
  .wz-track {
    position: absolute;
    top: 0.8rem;
    left: 12%;
    right: 12%;
    height: 1px;
    background: rgba(163, 184, 199, 0.14);
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
    gap: 0.45rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    flex: 1;
  }
  .wz-pip {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid rgba(163, 184, 199, 0.18);
    background: rgba(10, 11, 14, 0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s var(--ease);
    color: var(--c-stone);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }
  .wz-dot.active .wz-pip {
    border-color: var(--c-copper);
    background: var(--c-copper);
    box-shadow: 0 0 14px var(--c-glow), 0 0 28px rgba(184, 115, 51, 0.08);
    transform: scale(1.18);
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
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
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
    padding: clamp(1rem, 2.2vw, 1.35rem);
    border: 1px solid var(--c-border);
    border-radius: calc(var(--radius-lg, 20px) + 2px);
    background: var(--c-surface-strong);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 20px 44px rgba(0, 0, 0, 0.22);
    scrollbar-width: thin;
    scrollbar-color: var(--c-copper) transparent;
  }
  .wz-stage::-webkit-scrollbar { width: 3px; }
  .wz-stage::-webkit-scrollbar-track { background: transparent; }
  .wz-stage::-webkit-scrollbar-thumb { background: var(--c-copper); border-radius: 2px; }

  .wz-slide {
    min-height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    gap: 0.75rem;
  }
  .wz-welcome-split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: 1rem;
    align-items: stretch;
    min-height: 100%;
  }
  .wz-welcome-main {
    display: flex;
    flex-direction: column;
    gap: 0.72rem;
  }
  .wz-title {
    font-family: var(--f-sans);
    font-size: clamp(1.45rem, 3vw, 1.95rem);
    font-weight: 600;
    margin-bottom: 0.45rem;
    color: var(--c-text);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  .wz-body {
    font-size: 0.92rem;
    line-height: 1.72;
    color: var(--c-text-dim);
    margin-bottom: 0;
    max-width: 56ch;
  }
  .wz-welcome-notes {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem;
    margin-top: 0.35rem;
  }
  .wz-welcome-note {
    padding: 0.8rem 0.9rem;
    border-radius: calc(var(--radius-md, 12px) + 1px);
    border: 1px solid rgba(212, 144, 92, 0.18);
    background:
      linear-gradient(180deg, rgba(17, 18, 23, 0.88), rgba(11, 12, 16, 0.94)),
      radial-gradient(circle at top right, rgba(184, 115, 51, 0.08), transparent 46%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    text-align: left;
  }
  .wz-welcome-note-label {
    display: inline-flex;
    margin-bottom: 0.35rem;
    font-family: var(--f-mono);
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-copper-bright);
  }
  .wz-welcome-note-value {
    margin: 0;
    font-size: 0.74rem;
    line-height: 1.6;
    color: var(--c-text-dim);
  }

  /* CTA button on welcome */
  .wz-cta {
    margin-top: 1.05rem;
    font-family: var(--f-mono);
    font-size: 0.76rem;
    font-weight: 600;
    min-height: 3rem;
    padding: 0.78rem 1.45rem;
    border-radius: calc(var(--radius-sm, 6px) + 2px);
    border: 1px solid rgba(184, 115, 51, 0.44);
    background: var(--c-copper);
    color: var(--c-stone);
    cursor: pointer;
    transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease), background 0.25s var(--ease);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    box-shadow: 0 14px 30px rgba(184, 115, 51, 0.2);
  }
  .wz-cta:hover {
    background: var(--c-copper-bright);
    box-shadow: 0 18px 34px rgba(184, 115, 51, 0.28);
    transform: translateY(-2px);
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
    gap: 0.75rem;
    margin-top: 0.2rem;
  }
  @media (max-width: 480px) {
    .wz-grid { grid-template-columns: 1fr; }
  }
  .wz-card {
    display: flex;
    gap: 0.7rem;
    padding: 0.85rem 0.95rem;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: calc(var(--radius-md, 12px) + 1px);
    align-items: flex-start;
    animation: cardIn 0.35s var(--ease) both;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  .wz-card:hover {
    border-color: rgba(184, 115, 51, 0.25);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
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
    font-size: 0.74rem;
    color: var(--c-text);
    display: block;
    margin-bottom: 0.18rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .wz-card-desc {
    font-size: 0.72rem;
    color: var(--c-text-dim);
    line-height: 1.55;
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
    gap: 0.65rem;
    padding: 0.55rem 0.72rem;
    border-radius: calc(var(--radius-sm, 6px) + 4px);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    font-family: var(--f-mono);
    font-size: 0.74rem;
    animation: cardIn 0.3s var(--ease) both;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
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
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.18rem 0.42rem;
    border-radius: 999px;
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
    margin-top: 0.9rem;
  }
  .wz-cmd-bar {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.8rem;
    padding: 0.82rem 0.92rem;
    background: linear-gradient(180deg, rgba(18, 20, 24, 0.82), rgba(9, 10, 13, 0.94));
    border: 1px solid rgba(212, 144, 92, 0.3);
    border-radius: calc(var(--radius-md, 12px) + 1px);
    box-shadow:
      0 18px 34px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }
  .wz-cmd-prompt {
    font-family: var(--f-mono);
    color: var(--c-copper-bright);
    font-weight: 700;
    flex-shrink: 0;
  }
  .wz-cmd-text {
    font-family: var(--f-mono);
    font-size: 0.79rem;
    color: var(--c-text);
    flex: 1;
    line-height: 1.55;
    overflow-wrap: anywhere;
    -webkit-user-select: all;
    user-select: all;
  }
  .wz-cmd-copy {
    font-family: var(--f-mono);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.62rem 0.95rem;
    font-size: 0.68rem;
    background: rgba(14, 16, 20, 0.84);
    border: 1px solid rgba(184, 115, 51, 0.24);
    border-radius: 999px;
    color: var(--copper-bright);
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.2s ease;
    flex-shrink: 0;
    white-space: nowrap;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
  }
  .wz-cmd-copy:hover {
    border-color: rgba(212, 144, 92, 0.54);
    color: var(--c-text);
    background: rgba(184, 115, 51, 0.12);
    transform: translateY(-1px);
  }
  .wz-cmd-copy.is-copied {
    border-color: var(--c-copper-bright);
    color: var(--c-copper-bright);
    background: rgba(184, 115, 51, 0.08);
  }
  .wz-cmd-copy.is-error {
    border-color: rgba(163, 184, 199, 0.26);
    color: var(--c-text);
    background: rgba(20, 23, 28, 0.92);
  }

  /* ---- Terminal sim ---- */
  .wz-terminal-shell {
    margin-top: 0.95rem;
  }
  .wz-terminal-shell--hero {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  .wz-terminal-shell--hero .wz-terminal {
    flex: 1;
    min-height: 16rem;
    max-height: 22rem;
  }
  .wz-terminal-shell--primary .wz-terminal {
    min-height: 13rem;
    max-height: 19rem;
  }
  .wz-terminal-meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.85rem;
    margin-bottom: 0.5rem;
  }
  .wz-terminal-kicker {
    font-family: var(--f-mono);
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--c-copper-bright);
    white-space: nowrap;
  }
  .wz-terminal-copy {
    margin: 0;
    max-width: 46ch;
    font-size: 0.78rem;
    line-height: 1.55;
    color: var(--c-text-dim);
    text-align: right;
  }
  .wz-terminal {
    padding: 1rem 1.05rem;
    background: linear-gradient(180deg, rgba(13, 15, 18, 0.92), rgba(8, 9, 12, 0.98));
    border: 1px solid var(--c-border);
    border-radius: calc(var(--radius-md, 12px) + 1px);
    font-family: var(--f-mono);
    font-size: 0.78rem;
    line-height: 1.62;
    color: var(--c-text-dim);
    max-height: 18rem;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--c-copper) transparent;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
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
    gap: 0.55rem;
    margin-top: 0.75rem;
  }
  .wz-next-cmd {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.72rem 0.85rem;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: calc(var(--radius-md, 12px) + 1px);
    animation: cardIn 0.35s var(--ease) both;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
  .wz-next-cmd-code {
    font-family: var(--f-mono);
    font-size: 0.74rem;
    color: var(--c-copper-bright);
    white-space: nowrap;
    flex-shrink: 0;
    letter-spacing: 0.08em;
  }
  .wz-next-cmd-desc {
    font-size: 0.78rem;
    color: var(--c-text-dim);
    line-height: 1.55;
  }

  /* ---- Hint ---- */
  .wz-hint {
    font-family: var(--f-mono);
    font-size: 0.64rem;
    color: var(--c-text-dim);
    text-align: center;
    margin: 0.15rem 0 0;
    opacity: 0.74;
    flex-shrink: 0;
    letter-spacing: 0.08em;
  }

  /* ---- Navigation ---- */
  .wz-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.35rem 0 0;
    border-top: 1px solid rgba(163, 184, 199, 0.14);
    flex-shrink: 0;
  }
  .wz-btn {
    font-family: var(--f-mono);
    font-size: 0.82rem;
    width: 2.85rem;
    height: 2.85rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s var(--ease), border-color 0.2s var(--ease), color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease);
    text-decoration: none;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
  .wz-btn-back {
    background: rgba(14, 16, 20, 0.64);
    border: 1px solid rgba(163, 184, 199, 0.16);
    color: var(--c-text-dim);
  }
  .wz-btn-back:hover:not(:disabled) {
    border-color: var(--c-steel);
    color: var(--c-text);
    transform: translateY(-1px);
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
    box-shadow: 0 12px 24px rgba(184, 115, 51, 0.22);
  }
  .wz-btn-next:hover {
    background: var(--c-copper-bright);
    border-color: var(--c-copper-bright);
    box-shadow: 0 16px 28px rgba(184, 115, 51, 0.28);
    transform: translateY(-1px);
  }
  .wz-btn-done {
    border-radius: 999px;
    width: auto;
    padding: 0 1.15rem;
    font-size: 0.72rem;
    gap: 0.35rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .wz-counter {
    font-family: var(--f-mono);
    font-size: 0.78rem;
    color: var(--c-text-dim);
    letter-spacing: 0.08em;
  }
  .wz-counter-sep {
    opacity: 0.4;
    margin: 0 0.125rem;
  }

  /* ---- Responsive ---- */
  @media (max-width: 720px) {
    .wizard {
      max-width: none;
      padding: 0.95rem 0.85rem 0.8rem;
    }

    .wz-stage {
      padding: 0.95rem 0.82rem;
    }

    .wz-grid {
      grid-template-columns: 1fr;
      gap: 0.65rem;
    }

    .wz-welcome-notes {
      grid-template-columns: 1fr;
    }

    .wz-welcome-split {
      grid-template-columns: 1fr;
    }

    .wz-cmd-bar {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .wz-cmd-copy {
      grid-column: 1 / -1;
      width: 100%;
    }

    .wz-terminal-meta {
      flex-direction: column;
    }

    .wz-terminal-copy {
      max-width: none;
      text-align: left;
    }

    .wz-next-cmd {
      flex-direction: column;
      align-items: flex-start;
    }

    .wz-next-cmd-code {
      white-space: normal;
    }

    .wz-dot-label {
      font-size: 0.5rem;
    }
  }

  @media (max-height: 740px) {
    .wizard {
      padding-top: 0.7rem;
      gap: 0.7rem;
    }

    .wz-stage {
      padding: 0.9rem 0.82rem;
    }

    .wz-title {
      font-size: clamp(1.24rem, 2.5vw, 1.55rem);
    }

    .wz-body {
      font-size: 0.84rem;
    }

    .wz-card,
    .wz-check,
    .wz-next-cmd {
      padding-block: 0.55rem;
    }
  }

  @media (max-width: 980px) {
    .wz-welcome-split {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 360px) {
    .wizard { padding-inline: 0.72rem; }
    .wz-dot-label { display: none; }
  }
</style>
