<script lang="ts">
  import { Tween, prefersReducedMotion } from 'svelte/motion';
  import CopyButton from './CopyButton.svelte';
  import importedManifest from '../lib/generated/install-manifest.json';
  import { getTranslations, type Lang } from '../lib/i18n';
  import '../styles/installer.css';

  interface Props {
    lang?: Lang;
    manifest?: any;
  }

  let { lang = 'en', manifest = importedManifest }: Props = $props();

  const dict = $derived(getTranslations(lang));
  const wizardCopy = $derived(dict.sections.installer.wizard);
  const copyLabels = $derived(dict.copyButton);
  const uiLabels = $derived(wizardCopy.steps.labels);
  const welcomeNotes = $derived(wizardCopy.welcomeNotes);
  const terminalLines = $derived(wizardCopy.terminal);

  const STEPS = 5;
  let currentStep = $state(0);
  let direction = $state<'forward' | 'backward'>('forward');
  let slideVisible = $state(true);
  let termLines = $state<string[]>([]);
  let termRunning = $state(false);

  const installCommand = 'curl -fsSL https://vibecrafted.io/install.sh | bash';

  const requiredCategories = ['toolchains', 'agents'];
  const requiredCommands = ['loctree-mcp', 'aicx-mcp'];
  const dynamicChecks = (() => {
    const checks: Array<{ label: string; required: boolean }> = [];
    const diags = manifest.diagnostics;
    if (diags && diags.categories) {
      for (const cat of diags.categories) {
        if (diags.commands && diags.commands[cat]) {
          const catRequired = requiredCategories.includes(cat);
          for (const cmd of diags.commands[cat]) {
            checks.push({ label: cmd, required: catRequired || requiredCommands.includes(cmd) });
          }
        }
      }
    }
    return checks;
  })();
  const requiredCount = dynamicChecks.filter((c) => c.required).length;
  const optionalCount = dynamicChecks.length - requiredCount;

  const phaseIcons = ['\u25C8', '\u21CB', '\u2318', '\u21B3'];
  const dynamicPhases = (manifest.phases || []).map((p: { label: string; reason: string }, idx: number) => ({
    icon: phaseIcons[idx % phaseIcons.length],
    name: p.label,
    desc: p.reason.split('\n')[0] || p.reason,
  }));

  const pages = $derived(wizardCopy.pages);
  const activePage = $derived(pages[currentStep]);

  const progressTween = Tween.of(() => (currentStep / (STEPS - 1)) * 100, {
    duration: prefersReducedMotion.current ? 0 : 280,
  });
  const counterTween = Tween.of(() => currentStep + 1, {
    duration: prefersReducedMotion.current ? 0 : 220,
  });

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
    const lines = terminalLines;
    let i = 0;
    const tick = () => {
      if (i < lines.length) {
        termLines = [...termLines, lines[i]];
        i++;
        setTimeout(tick, 100 + Math.random() * 150);
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

  const terminalSeedLines = $derived(terminalLines.slice(0, 8));
  const terminalPreviewLines = $derived(termLines.length > 0 ? termLines : terminalSeedLines);
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="wizard" role="region" aria-label={activePage?.label}>
  <!-- Progress -->
  <nav class="wz-progress" aria-label={uiLabels.steps}>
    <div class="wz-track">
      <div class="wz-track-fill" style={`width: ${progressTween.current}%`}></div>
    </div>
    <div class="wz-dots">
      {#each pages as step, i}
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
            <h2 class="wz-title">{pages[0].title}</h2>
            {#each pages[0].body as p}
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
              {wizardCopy.welcomeCta} <span class="wz-cta-arrow">&rarr;</span>
            </button>
          </div>

          <div class="wz-terminal-shell wz-terminal-shell--hero">
            <div class="wz-terminal-meta">
              <span class="wz-terminal-kicker">{wizardCopy.terminalKicker}</span>
              <p class="wz-terminal-copy">{wizardCopy.terminalBody}</p>
            </div>
            <div class="wz-terminal">
              {#each terminalPreviewLines as line}
                <div class="wz-term-line">{line}</div>
              {/each}
              {#if termLines.length < terminalLines.length}
                <span class="wz-cursor">_</span>
              {/if}
            </div>
          </div>
        </div>

      <!-- Step 1: What's inside -->
      {:else if currentStep === 1}
        <h2 class="wz-title">{pages[1].title}</h2>
        <div class="wz-grid">
          {#each dynamicPhases as item, idx}
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
        <h2 class="wz-title">{pages[2].title}</h2>
        {#each pages[2].body as p}
          <p class="wz-body">{p}</p>
        {/each}
        <div class="wz-stan-summary" role="status" aria-label={wizardCopy.checkSummaryAria}>
          <span class="wz-stan-chip wz-stan-chip--req">
            <span class="wz-stan-chip-dot" aria-hidden="true">{'●'}</span>
            <span class="wz-stan-chip-count">{requiredCount}</span>
            <span class="wz-stan-chip-label">{uiLabels.required}</span>
          </span>
          <span class="wz-stan-chip-sep" aria-hidden="true">·</span>
          <span class="wz-stan-chip wz-stan-chip--opt">
            <span class="wz-stan-chip-dot" aria-hidden="true">{'○'}</span>
            <span class="wz-stan-chip-count">{optionalCount}</span>
            <span class="wz-stan-chip-label">{uiLabels.optional}</span>
          </span>
        </div>
        <div class="wz-checks">
          {#each dynamicChecks as check, idx}
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

      <!-- Step 3: Install command (PRIMARY) + terminal sim (SECONDARY) -->
      {:else if currentStep === 3}
        <div class="wz-install">
          <div class="wz-install-lead">
            <h2 class="wz-title">{pages[3].title}</h2>
            {#each pages[3].body as p}
              <p class="wz-body">{p}</p>
            {/each}
          </div>

          <div class="wz-install-hero">
            <div class="wz-install-hero-meta">
              <span class="wz-install-hero-step">{wizardCopy.installPasteKicker}</span>
              <span class="wz-install-hero-hint">{wizardCopy.installPasteHint}</span>
            </div>
            <div class="wz-cmd-block wz-cmd-block--primary">
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
            <div class="wz-install-run">
              <span class="wz-install-run-kicker">{wizardCopy.installRunKicker}</span>
              <p class="wz-install-run-body">{wizardCopy.installRunHint}</p>
            </div>
          </div>

          <div class="wz-install-preview">
            <div class="wz-install-preview-meta">
              <span class="wz-install-preview-kicker">{wizardCopy.installPreviewKicker}</span>
              <span class="wz-install-preview-body">{wizardCopy.installPreviewBody}</span>
            </div>
            <div class="wz-terminal wz-terminal--demo">
              {#each terminalPreviewLines as line}
                <div class="wz-term-line">{line}</div>
              {/each}
              {#if termLines.length < terminalLines.length}
                <span class="wz-cursor">_</span>
              {/if}
            </div>
          </div>
        </div>

      <!-- Step 4: Next steps -->
      {:else if currentStep === 4}
        <div class="wz-done">
          <div class="wz-done-stamp" role="status">
            <span class="wz-done-stamp-mark" aria-hidden="true">{'◆'}</span>
            <span class="wz-done-stamp-text">{wizardCopy.doneStamp}</span>
          </div>
          <h2 class="wz-title wz-title--done">{pages[4].title}</h2>
          {#each pages[4].body as p}
            <p class="wz-body">{p}</p>
          {/each}
          <div class="wz-next-cmds">
            {#each wizardCopy.nextCommands as cmd, idx}
              <div class="wz-next-cmd" style="animation-delay: {idx * 80}ms">
                <span class="wz-next-cmd-index" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                <code class="wz-next-cmd-code">{cmd.cmd}</code>
                <span class="wz-next-cmd-desc">{cmd.desc}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Hint -->
  <p class="wz-hint">{activePage?.hint}</p>

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
    {#if currentStep === STEPS - 2}
      <button
        class="wz-btn wz-btn-next wz-btn-finish"
        onclick={next}
        aria-label={uiLabels.toFinish}
      >
        {uiLabels.toFinish} &rarr;
      </button>
    {:else if currentStep < STEPS - 1}
      <button class="wz-btn wz-btn-next" onclick={next} aria-label={uiLabels.next}>
        &rarr;
      </button>
    {:else}
      <a
        class="wz-btn wz-btn-next wz-btn-done"
        href={`/${lang}/quickstart/`}
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
    box-sizing: border-box;
    width: 100%;
    max-width: 66rem;
    margin: 0 auto;
    min-height: clamp(34rem, calc(100dvh - 9.5rem), 46rem);
    height: auto;
    padding: clamp(1rem, 2.1vw, 1.45rem) clamp(0.95rem, 2.4vw, 1.6rem);
    font-family: var(--f-sans);
    color: var(--c-text);
    display: flex;
    flex-direction: column;
    gap: clamp(0.8rem, 1.3vw, 1.1rem);
    overflow: visible;
    -webkit-user-select: none;
    user-select: none;
  }
  .wizard :global(*) {
    box-sizing: border-box;
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
    background: rgba(245, 244, 239, 0.16);
    border-radius: 1px;
    overflow: hidden;
  }
  .wz-track-fill {
    height: 100%;
    background: linear-gradient(90deg, rgba(245, 244, 239, 0.46), var(--c-teal-bright));
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
    border: 1.5px solid rgba(245, 244, 239, 0.24);
    background: rgba(23, 22, 21, 0.94);
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
    box-shadow: 0 0 12px var(--c-glow);
    transform: scale(1.18);
  }
  .wz-dot.done .wz-pip {
    border-color: var(--c-teal-bright);
    background: var(--c-teal-bright);
    color: var(--c-stone);
  }
  .wz-dot.done .wz-pip svg { display: block; }
  .wz-pip svg { display: none; }
  .wz-dot-label {
    font-family: var(--f-mono);
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: rgba(245, 244, 239, 0.52);
    transition: color 0.2s;
  }
  .wz-dot.active .wz-dot-label { color: rgba(245, 244, 239, 0.92); }
  .wz-dot.done .wz-dot-label { color: rgba(245, 244, 239, 0.82); }

  /* ---- Slide stage ---- */
  .wz-stage {
    flex: 1 1 auto;
    min-height: clamp(23rem, 46dvh, 31rem);
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    padding: clamp(1rem, 2.2vw, 1.35rem);
    border: 1px solid rgba(245, 244, 239, 0.13);
    border-radius: var(--radius-lg, 8px);
    background: var(--c-surface-strong);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 18px 36px rgba(0, 0, 0, 0.2);
    scrollbar-width: thin;
    scrollbar-color: rgba(245, 244, 239, 0.26) transparent;
  }
  .wz-stage::-webkit-scrollbar { width: 3px; }
  .wz-stage::-webkit-scrollbar-track { background: transparent; }
  .wz-stage::-webkit-scrollbar-thumb { background: rgba(245, 244, 239, 0.26); border-radius: 2px; }

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
    font-family: var(--f-display);
    font-size: clamp(1.45rem, 3vw, 1.95rem);
    font-weight: 400;
    margin-bottom: 0.45rem;
    color: var(--c-text);
    line-height: 1.1;
    letter-spacing: 0;
  }
  .wz-body {
    font-size: 0.92rem;
    line-height: 1.62;
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
    border-radius: var(--radius-md, 6px);
    border: 1px solid rgba(245, 244, 239, 0.13);
    background:
      linear-gradient(180deg, rgba(23, 22, 21, 0.78), rgba(10, 10, 9, 0.94));
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
    color: var(--c-teal-bright);
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
    border-radius: var(--radius-sm, 2px);
    border: 1px solid rgba(245, 244, 239, 0.2);
    background: linear-gradient(180deg, rgba(245, 244, 239, 0.1), rgba(245, 244, 239, 0.055));
    color: var(--c-text);
    cursor: pointer;
    transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease), background 0.25s var(--ease);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 12px 24px rgba(0, 0, 0, 0.22);
  }
  .wz-cta:hover {
    border-color: rgba(207, 111, 78, 0.46);
    background: linear-gradient(180deg, rgba(207, 111, 78, 0.16), rgba(245, 244, 239, 0.07));
    box-shadow: 0 14px 26px rgba(0, 0, 0, 0.24);
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
    padding: 0.85rem 0.95rem 0.85rem 0.85rem;
    background: linear-gradient(180deg, rgba(23, 22, 21, 0.76), rgba(9, 9, 8, 0.92));
    border: 1px solid rgba(245, 244, 239, 0.12);
    border-left: 2px solid rgba(143, 185, 173, 0.42);
    border-radius: var(--radius-md, 6px);
    align-items: flex-start;
    animation: cardIn 0.35s var(--ease) both;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    cursor: default;
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
  .wz-stan-summary {
    margin-top: 0.65rem;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.38rem 0.8rem;
    border-radius: var(--radius-md, 6px);
    background: linear-gradient(
      90deg,
      rgba(245, 244, 239, 0.055),
      rgba(163, 184, 199, 0.04)
    );
    border: 1px solid rgba(245, 244, 239, 0.12);
    font-family: var(--f-mono);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    align-self: flex-start;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
  .wz-stan-chip {
    display: inline-flex;
    align-items: baseline;
    gap: 0.38rem;
  }
  .wz-stan-chip-dot {
    font-size: 0.5rem;
    line-height: 1;
    transform: translateY(-1px);
  }
  .wz-stan-chip--req .wz-stan-chip-dot,
  .wz-stan-chip--req .wz-stan-chip-count {
    color: var(--c-teal-bright);
  }
  .wz-stan-chip--opt .wz-stan-chip-dot,
  .wz-stan-chip--opt .wz-stan-chip-count {
    color: var(--c-text-dim);
  }
  .wz-stan-chip-count {
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 1;
  }
  .wz-stan-chip-label {
    color: var(--c-text-dim);
  }
  .wz-stan-chip-sep {
    color: var(--c-border);
    font-size: 0.72rem;
    line-height: 1;
  }
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
    border-radius: var(--radius-md, 6px);
    background: linear-gradient(180deg, rgba(23, 22, 21, 0.72), rgba(10, 10, 9, 0.92));
    border: 1px solid rgba(245, 244, 239, 0.1);
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
  .wz-badge.req { color: var(--c-teal-bright); }
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
    background: rgba(61, 122, 114, 0.14);
    color: var(--c-teal-bright);
  }
  .wz-tag.opt {
    background: rgba(163, 184, 199, 0.06);
    color: var(--c-text-dim);
  }

  /* ---- Command block (step 3) ---- */
  .wz-cmd-block {
    margin-top: 0.9rem;
  }
  /* Primary variant — the curl command is the step's centre of gravity.
     Upscaled type, restrained ring, and a filled Copy button that reads as
     a real action rather than an outline hint. Sits inside wz-install-hero
     in step 3, so it does not need margin-top auto anymore. */
  .wz-cmd-block--primary {
    margin-top: 0;
    position: relative;
  }
  .wz-cmd-block--primary::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(245, 244, 239, 0.26), rgba(245, 244, 239, 0.06) 55%, rgba(61, 122, 114, 0.18));
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
    opacity: 0.9;
  }
  .wz-cmd-block--primary .wz-cmd-bar {
    padding: 1.05rem 1.2rem;
    border-color: rgba(245, 244, 239, 0.2);
    background: linear-gradient(180deg, rgba(23, 22, 21, 0.94), rgba(8, 8, 7, 0.98));
    box-shadow:
      0 0 0 1px rgba(245, 244, 239, 0.08),
      0 24px 56px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.09);
  }
  .wz-cmd-block--primary .wz-cmd-prompt {
    font-size: 1.05rem;
  }
  .wz-cmd-block--primary .wz-cmd-text {
    font-size: 0.95rem;
    letter-spacing: 0.01em;
  }
  .wz-cmd-block--primary :global(.wz-cmd-copy[data-copy-managed='svelte']) {
    min-height: 2.9rem;
    padding: 0.72rem 1.25rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: var(--c-stone);
    background: linear-gradient(180deg, var(--c-copper-bright), var(--c-copper));
    border-color: var(--c-copper-bright);
    box-shadow:
      0 8px 20px rgba(207, 111, 78, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.22),
      inset 0 -1px 0 rgba(0, 0, 0, 0.28);
  }
  .wz-cmd-block--primary :global(.wz-cmd-copy[data-copy-managed='svelte']:hover) {
    color: var(--c-stone);
    background: linear-gradient(180deg, #d9a18b, var(--c-copper-bright));
    transform: translateY(-2px);
    box-shadow:
      0 10px 24px rgba(207, 111, 78, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.28),
      inset 0 -1px 0 rgba(0, 0, 0, 0.28);
  }
  .wz-cmd-block--primary :global(.wz-cmd-copy[data-copy-managed='svelte'].is-copied) {
    color: var(--c-stone);
    background: linear-gradient(180deg, #8fc0aa, #5a8a7a);
    border-color: #8fc0aa;
  }
  .wz-cmd-bar {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.8rem;
    padding: 0.82rem 0.92rem;
    background: linear-gradient(180deg, rgba(23, 22, 21, 0.82), rgba(8, 8, 7, 0.94));
    border: 1px solid rgba(245, 244, 239, 0.16);
    border-radius: var(--radius-md, 6px);
    box-shadow:
      0 18px 34px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }
  .wz-cmd-prompt {
    font-family: var(--f-mono);
    color: var(--c-teal-bright);
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
  :global(.wz-cmd-copy[data-copy-managed='svelte']) {
    font-family: var(--f-mono);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.62rem 0.95rem;
    font-size: 0.68rem;
    background: rgba(23, 22, 21, 0.84);
    border: 1px solid rgba(245, 244, 239, 0.18);
    border-radius: var(--radius-sm, 2px);
    color: var(--c-text);
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.2s ease;
    flex-shrink: 0;
    white-space: nowrap;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
  }
  :global(.wz-cmd-copy[data-copy-managed='svelte']:hover) {
    border-color: rgba(245, 244, 239, 0.3);
    color: var(--c-text);
    background: rgba(245, 244, 239, 0.08);
    transform: translateY(-1px);
  }
  :global(.wz-cmd-copy[data-copy-managed='svelte'].is-copied) {
    border-color: var(--c-teal-bright);
    color: var(--c-teal-bright);
    background: rgba(61, 122, 114, 0.14);
  }
  :global(.wz-cmd-copy[data-copy-managed='svelte'].is-error) {
    border-color: rgba(245, 244, 239, 0.22);
    color: var(--c-text);
    background: rgba(23, 22, 21, 0.92);
  }

  /* ---- Install hero (step 3) ----
     Stacked composition: compact lead → big curl hero → muted preview.
     The curl bar is the centre of gravity, not the terminal animation. */
  .wz-install {
    display: flex;
    flex-direction: column;
    gap: clamp(0.85rem, 1.6vw, 1.15rem);
    min-height: 100%;
  }
  .wz-install-lead {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    flex-shrink: 0;
  }
  .wz-install-lead .wz-title {
    margin-bottom: 0.1rem;
  }
  .wz-install-lead .wz-body {
    font-size: 0.86rem;
    line-height: 1.55;
  }
  .wz-install-hero {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: 0.75rem 0.9rem 0.85rem;
    border-radius: var(--radius-lg, 8px);
    background:
      linear-gradient(180deg, rgba(23, 22, 21, 0.64), rgba(8, 8, 7, 0.82));
    border: 1px solid rgba(245, 244, 239, 0.16);
    box-shadow:
      0 22px 42px rgba(0, 0, 0, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
  .wz-install-hero-meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0 0.1rem;
  }
  .wz-install-hero-step {
    font-family: var(--f-mono);
    font-size: 0.64rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--c-teal-bright);
  }
  .wz-install-hero-hint {
    font-family: var(--f-mono);
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--c-text-dim);
    text-align: right;
  }
  .wz-install-run {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem 0.7rem;
    padding: 0.2rem 0.1rem 0;
    border-top: 1px dashed rgba(245, 244, 239, 0.16);
    padding-top: 0.55rem;
  }
  .wz-install-run-kicker {
    font-family: var(--f-mono);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--c-teal-bright);
    flex-shrink: 0;
  }
  .wz-install-run-body {
    margin: 0;
    font-size: 0.78rem;
    line-height: 1.5;
    color: var(--c-text-dim);
    flex: 1;
    min-width: 0;
  }
  .wz-install-preview {
    flex: 1 1 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    opacity: 0.88;
  }
  .wz-install-preview-meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.7rem;
    padding: 0 0.25rem;
  }
  .wz-install-preview-kicker {
    font-family: var(--f-mono);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--c-steel);
  }
  .wz-install-preview-body {
    font-family: var(--f-mono);
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    color: var(--c-text-dim);
    text-align: right;
  }

  /* ---- Terminal sim ---- */
  .wz-terminal {
    padding: 1.25rem 1.5rem;
    background: #0b0b0a;
    border: 1px solid rgba(245, 244, 239, 0.14);
    border-radius: var(--radius-md, 6px);
    font-family: var(--f-mono);
    font-size: 0.82rem;
    line-height: 1.6;
    color: rgba(245, 244, 239, 0.86);
    max-height: 20rem;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(245, 244, 239, 0.24) transparent;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
  }
  .wz-term-line {
    white-space: pre-wrap;
    word-break: normal;
    overflow-wrap: break-word;
    margin-bottom: 0.2rem;
    animation: termIn 0.1s ease both;
  }
  @keyframes termIn {
    from { opacity: 0; transform: translateX(-4px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .wz-cursor {
    display: inline-block;
    width: 0.5rem;
    height: 1.1rem;
    background: var(--c-teal-bright);
    animation: blink 0.8s step-end infinite;
    vertical-align: middle;
    margin-left: 2px;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
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
  /* Demoted variant for step 3 — terminal animation is illustration,
     not action. Slightly smaller type, muted frame, fills remaining space
     without competing with the curl hero above it. */
  .wz-terminal--demo {
    flex: 1 1 0;
    min-height: 0;
    max-height: none;
    padding: 0.9rem 1.05rem;
    font-size: 0.74rem;
    line-height: 1.55;
    color: rgba(230, 237, 243, 0.82);
    border-color: rgba(245, 244, 239, 0.14);
    background: linear-gradient(180deg, rgba(11, 11, 10, 0.94), rgba(8, 8, 7, 0.96));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
  .wz-terminal--demo .wz-cursor {
    background: rgba(143, 185, 173, 0.68);
  }
  .wz-terminal-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.75rem;
    padding: 0 0.5rem;
  }
  .wz-terminal-kicker {
    font-family: var(--f-mono);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-teal-bright);
  }
  .wz-terminal-copy {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.5;
    color: var(--c-text);
  }

  /* ---- Done payoff (step 4) ---- */
  .wz-done {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .wz-done-stamp {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.32rem 0.78rem;
    border-radius: var(--radius-md, 6px);
    font-family: var(--f-mono);
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--c-teal-bright);
    background: linear-gradient(
      90deg,
      rgba(61, 122, 114, 0.2),
      rgba(61, 122, 114, 0.06)
    );
    border: 1px solid rgba(143, 185, 173, 0.34);
    box-shadow: 0 0 0 1px rgba(61, 122, 114, 0.12),
                0 10px 24px rgba(0, 0, 0, 0.18),
                inset 0 1px 0 rgba(255, 255, 255, 0.06);
    animation: stampIn 0.6s var(--ease) both;
  }
  .wz-done-stamp-mark {
    font-size: 0.6rem;
    color: var(--c-teal-bright);
    filter: none;
  }
  .wz-done-stamp-text {
    line-height: 1;
  }
  .wz-title--done {
    margin-top: 0.05rem;
  }
  @keyframes stampIn {
    0% {
      opacity: 0;
      transform: translateY(6px) scale(0.96);
      filter: blur(2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  /* ---- Next commands (step 4) ---- */
  .wz-next-cmds {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    margin-top: 0.4rem;
  }
  .wz-next-cmd {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.72rem 0.85rem 0.72rem 0.95rem;
    background: linear-gradient(180deg, rgba(23, 22, 21, 0.74), rgba(9, 9, 8, 0.92));
    border: 1px solid rgba(245, 244, 239, 0.12);
    border-left: 2px solid rgba(143, 185, 173, 0.46);
    border-radius: var(--radius-md, 6px);
    animation: cardIn 0.35s var(--ease) both;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
  .wz-next-cmd-index {
    font-family: var(--f-mono);
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    color: var(--c-teal-bright);
    opacity: 0.7;
    width: 1.1rem;
    flex-shrink: 0;
    transform: translateY(-1px);
  }
  .wz-next-cmd-code {
    font-family: var(--f-mono);
    font-size: 0.74rem;
    color: var(--c-text);
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
    border-top: 1px solid rgba(245, 244, 239, 0.12);
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
    background: rgba(23, 22, 21, 0.64);
    border: 1px solid rgba(245, 244, 239, 0.16);
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
    background: linear-gradient(180deg, var(--c-copper-bright), var(--c-copper));
    border: 1px solid var(--c-copper);
    color: var(--c-stone);
    font-weight: 700;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.22);
  }
  .wz-btn-next:hover {
    background: var(--c-copper-bright);
    border-color: var(--c-copper-bright);
    box-shadow: 0 14px 26px rgba(207, 111, 78, 0.18);
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
  /* Finish variant — used on the step before the last one, signalling
     "this is the final action before you're done" so the operator never
     has to decode an anonymous chevron on the most important step. */
  .wz-btn-finish {
    border-radius: 999px;
    width: auto;
    padding: 0 1.1rem;
    font-size: 0.7rem;
    gap: 0.4rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: linear-gradient(180deg, var(--c-copper-bright), var(--c-copper));
    border: 1px solid var(--c-copper-bright);
    color: var(--c-stone);
    box-shadow:
      0 12px 26px rgba(207, 111, 78, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.14);
  }
  .wz-btn-finish:hover {
    background: linear-gradient(180deg, #d9a18b, var(--c-copper-bright));
    border-color: var(--c-copper-bright);
    color: var(--c-stone);
    transform: translateY(-1px);
    box-shadow:
      0 16px 30px rgba(207, 111, 78, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
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
      padding: 0.72rem 0.72rem 0.62rem;
      gap: 0.62rem;
    }

    .wz-stage {
      padding: 0.9rem 0.78rem;
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
      gap: 0;
    }

    .wz-terminal-shell--hero {
      display: none;
    }

    .wz-cmd-bar {
      grid-template-columns: auto minmax(0, 1fr);
      align-items: flex-start;
      gap: 0.55rem;
    }

    :global(.wz-cmd-copy[data-copy-managed='svelte']) {
      grid-column: 1 / -1;
      width: 100%;
    }

    .wz-cmd-block--primary .wz-cmd-text {
      font-size: 0.78rem;
      line-height: 1.5;
    }

    .wz-cmd-text {
      overflow-wrap: anywhere;
    }

    .wz-terminal-meta {
      flex-direction: column;
    }

    .wz-terminal-copy {
      max-width: none;
      text-align: left;
    }

    .wz-install-hero {
      padding: 0.7rem 0.72rem 0.8rem;
    }

    .wz-install-hero-meta,
    .wz-install-preview-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .wz-install-hero-hint,
    .wz-install-preview-body {
      text-align: left;
    }

    .wz-install-run {
      flex-direction: column;
      gap: 0.3rem;
    }

    .wz-next-cmd {
      flex-direction: column;
      align-items: flex-start;
    }

    .wz-next-cmd-code {
      white-space: normal;
    }

    .wz-dot-label {
      font-size: 0.48rem;
      letter-spacing: 0.1em;
    }

    .wz-title {
      font-size: clamp(1.52rem, 8vw, 1.9rem);
    }

    .wz-body {
      font-size: 0.94rem;
      line-height: 1.58;
    }

    .wz-cta {
      width: 100%;
      justify-content: center;
      margin-top: 0.65rem;
    }

    .wz-hint {
      font-size: 0.58rem;
      line-height: 1.35;
    }

    .wz-nav {
      padding-top: 0.25rem;
    }

    .wz-btn {
      width: 2.55rem;
      height: 2.55rem;
    }

    .wz-btn-done,
    .wz-btn-finish {
      width: auto;
      min-width: 5.6rem;
      padding-inline: 1rem;
      border-radius: 999px;
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
