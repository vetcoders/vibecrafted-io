<script lang="ts">
  import { onMount } from 'svelte';
  import { Tween, prefersReducedMotion } from 'svelte/motion';
  import { fade, fly } from 'svelte/transition';
  import {
    installerApi,
    type PreflightPayload,
    type PreflightStatus,
  } from '../lib/installer/api';
  import { getTranslations, type Lang } from '../lib/i18n';

  interface Props {
    lang?: Lang;
  }

  let { lang = 'en' }: Props = $props();

  const STEPS = ['welcome', 'diagnostics', 'plan', 'consent', 'execute', 'ready'] as const;
  type StepId = (typeof STEPS)[number];

  let currentStep = $state<StepId>('welcome');
  let preflight = $state<PreflightPayload | null>(null);
  let preflightError = $state<string | null>(null);
  let preflightLoading = $state(true);

  let status = $state<PreflightStatus | null>(null);
  let statusError = $state<string | null>(null);
  let pollHandle: ReturnType<typeof setInterval> | null = null;

  let accepted = $state(false);
  let withShell = $state(true);
  let startError = $state<string | null>(null);
  let startInFlight = $state(false);

  const stepIndex = $derived(STEPS.indexOf(currentStep));
  const progressTween = Tween.of(() => (stepIndex / (STEPS.length - 1)) * 100, {
    duration: prefersReducedMotion.current ? 0 : 240,
  });

  const L = $derived(getTranslations(lang).sections.installer.live);

  onMount(() => {
    void refreshPreflight();
    return () => stopPolling();
  });

  async function refreshPreflight() {
    preflightLoading = true;
    preflightError = null;
    try {
      preflight = await installerApi.preflight();
      status = preflight.status;
    } catch (err) {
      preflightError = err instanceof Error ? err.message : String(err);
    } finally {
      preflightLoading = false;
    }
  }

  function startPolling() {
    if (pollHandle) return;
    pollHandle = setInterval(async () => {
      try {
        status = await installerApi.status();
        statusError = null;
        if (status.completed) stopPolling();
      } catch (err) {
        statusError = err instanceof Error ? err.message : String(err);
      }
    }, 900);
  }

  function stopPolling() {
    if (pollHandle) {
      clearInterval(pollHandle);
      pollHandle = null;
    }
  }

  async function startInstall() {
    startInFlight = true;
    startError = null;
    try {
      const response = await installerApi.startInstall(withShell);
      if (!response.ok) {
        startError = response.message;
        return;
      }
      currentStep = 'execute';
      startPolling();
    } catch (err) {
      startError = err instanceof Error ? err.message : String(err);
    } finally {
      startInFlight = false;
    }
  }

  async function openGuide() {
    try {
      await installerApi.openStartHere();
    } catch (err) {
      statusError = err instanceof Error ? err.message : String(err);
    }
  }

  function goTo(step: StepId) {
    currentStep = step;
    if (step === 'ready' && status && !status.completed) {
      startPolling();
    }
  }

  function nextStep() {
    const i = stepIndex;
    if (i < STEPS.length - 1) currentStep = STEPS[i + 1];
  }

  function prevStep() {
    const i = stepIndex;
    if (i > 0) currentStep = STEPS[i - 1];
  }

  $effect(() => {
    if (status?.completed && currentStep === 'execute') {
      currentStep = 'ready';
    }
  });

  $effect(() => {
    if (currentStep === 'execute' && status && !status.completed && !pollHandle) {
      startPolling();
    }
  });

  const nextCommands = $derived(L.nextCommands);

  const outputTail = $derived(status?.output ?? []);
  const planLabels = $derived(status?.plan_labels ?? []);
  const currentStage = $derived(status?.current_stage ?? null);
  const exitCode = $derived(status?.exit_code ?? null);
  const installedOk = $derived(exitCode === 0);
  const installRunning = $derived(Boolean(status?.running));
  const installCompleted = $derived(Boolean(status?.completed));
</script>

<div class="live-wizard" role="region" aria-label={L.regionLabel}>
  <header class="lw-header">
    <div class="lw-brand">
      {#if preflight?.brand}
        <span class="lw-brand-product">{preflight.brand.product_line}</span>
        <span class="lw-brand-tagline">{preflight.brand.tagline}</span>
      {:else}
        <span class="lw-brand-product">{L.brandFallback}</span>
      {/if}
    </div>
    {#if preflight}
      <div class="lw-meta">
        <span class="lw-meta-item"><span class="lw-meta-label">v</span>{preflight.version}</span>
        <span class="lw-meta-item">{preflight.source_dir_display}</span>
      </div>
    {/if}
  </header>

  <nav class="lw-progress" aria-label={L.stepsAria}>
    <div class="lw-track">
      <div class="lw-track-fill" style={`width: ${progressTween.current}%`}></div>
    </div>
    <ol class="lw-steps">
      {#each STEPS as step, i}
        <li>
          <button
            class="lw-step"
            class:active={step === currentStep}
            class:done={i < stepIndex}
            onclick={() => goTo(step)}
            aria-current={step === currentStep ? 'step' : undefined}
          >
            <span class="lw-step-pip"></span>
            <span class="lw-step-label">{L.labels[step]}</span>
          </button>
        </li>
      {/each}
    </ol>
  </nav>

  <div class="lw-stage">
    {#if currentStep === 'welcome'}
      <section class="lw-panel" in:fly={{ y: 8, duration: 200 }} out:fade={{ duration: 140 }}>
        <h2 class="lw-title">{L.welcome.title}</h2>
        {#if preflightLoading}
          <p class="lw-muted">{L.status.loadingPreflight}</p>
        {:else if preflightError}
          <p class="lw-error">{L.status.loadFailed}: {preflightError}</p>
        {:else if preflight}
          <div class="lw-install-hero">
            <div class="lw-install-hero-meta">
              <span class="lw-install-hero-step">
                {preflight.found_count} / {preflight.found_count + preflight.missing_count} {L.welcome.componentsFound}
              </span>
              <span class="lw-install-hero-hint">
                {L.welcome.sourceDir} <code>{preflight.source_dir_display}</code>
              </span>
            </div>

            {#if preflight.missing_count > 0}
              <div class="lw-cmd-block lw-cmd-block--primary">
                <div class="lw-missing-components">
                  <span class="lw-missing-label">{L.welcome.missingList}:</span>
                  <ul class="lw-missing-list">
                    {#each preflight.categories as cat}
                      {#each cat.items.filter(i => !i.found) as item}
                        <li><code>{item.label}</code></li>
                      {/each}
                    {/each}
                  </ul>
                </div>
              </div>
            {/if}

            {#if preflight.install_plan.length > 0}
              <div class="lw-install-run">
                <span class="lw-install-run-kicker">{L.welcome.planPreview}</span>
                <ol class="lw-plan-preview-list">
                  {#each preflight.install_plan.slice(0, 3) as step}
                    <li><code>{step.command}</code></li>
                  {/each}
                  {#if preflight.install_plan.length > 3}
                    <li><span class="lw-muted">...</span></li>
                  {/if}
                </ol>
              </div>
            {/if}
          </div>
        {/if}

        <div class="lw-welcome-actions">
          <div class="lw-action-row">
            <button class="lw-cta" onclick={nextStep} disabled={preflightLoading || !preflight || !!preflightError}>
              {L.welcome.cta} &rarr;
            </button>
            <button class="lw-btn lw-btn--ghost" onclick={refreshPreflight} disabled={preflightLoading}>
              {L.welcome.reRun}
            </button>
          </div>
          <span class="lw-welcome-time">{L.welcome.timeEstimate}</span>
        </div>
      </section>
    {:else if currentStep === 'diagnostics'}
      <section class="lw-panel" in:fly={{ y: 8, duration: 200 }} out:fade={{ duration: 140 }}>
        <h2 class="lw-title">{L.diagnostics.title}</h2>
        {#if preflight && preflight.categories.length > 0}
          <div class="lw-cats">
            {#each preflight.categories as cat}
              <article class="lw-cat">
                <header>
                  <strong>{cat.label}</strong>
                  <span class="lw-count">{cat.present}/{cat.total}</span>
                </header>
                <ul>
                  {#each cat.items as item}
                    <li class:found={item.found} class:missing={!item.found}>
                      <span class="lw-dot" aria-hidden="true"></span>
                      <span class="lw-name">{item.label}</span>
                      {#if item.detail}
                        <span class="lw-detail">{item.detail}</span>
                      {/if}
                    </li>
                  {/each}
                </ul>
              </article>
            {/each}
          </div>
        {:else}
          <p class="lw-muted">{L.diagnostics.empty}</p>
        {/if}
      </section>
    {:else if currentStep === 'plan'}
      <section class="lw-panel" in:fly={{ y: 8, duration: 200 }} out:fade={{ duration: 140 }}>
        <h2 class="lw-title">{L.plan.title}</h2>
        {#if preflight && preflight.install_plan.length > 0}
          <ol class="lw-plan">
            {#each preflight.install_plan as step, idx}
              <li>
                <span class="lw-plan-idx">{L.plan.stepLabel} {idx + 1}</span>
                <div class="lw-plan-body">
                  <strong>{step.label}</strong>
                  <code>{step.command}</code>
                </div>
              </li>
            {/each}
          </ol>
        {:else}
          <p class="lw-muted">{L.plan.empty}</p>
        {/if}
      </section>
    {:else if currentStep === 'consent'}
      <section class="lw-panel" in:fly={{ y: 8, duration: 200 }} out:fade={{ duration: 140 }}>
        <h2 class="lw-title">{L.consent.title}</h2>
        <p class="lw-lead">{L.consent.body}</p>
        <label class="lw-check">
          <input type="checkbox" bind:checked={accepted} />
          <span>{L.consent.accept}</span>
        </label>
        <label class="lw-check">
          <input type="checkbox" bind:checked={withShell} />
          <span>{L.consent.withShell}</span>
        </label>
        {#if installCompleted}
          <p class="lw-muted">{L.consent.again}</p>
        {:else if installRunning}
          <p class="lw-muted">{L.consent.running}</p>
        {/if}
        {#if startError}
          <p class="lw-error">{startError}</p>
        {/if}
        <button
          class="lw-cta"
          onclick={startInstall}
          disabled={!accepted || startInFlight || installRunning}
        >
          {L.consent.cta} &rarr;
        </button>
      </section>
    {:else if currentStep === 'execute'}
      <section class="lw-panel lw-panel--execute" in:fly={{ y: 8, duration: 200 }} out:fade={{ duration: 140 }}>
        <h2 class="lw-title">{L.execute.title}</h2>
        <div class="lw-stage-line">
          <span class="lw-stage-label">{L.execute.stage}</span>
          <span class="lw-stage-value">{currentStage ?? '…'}</span>
        </div>
        {#if planLabels.length > 0}
          <ol class="lw-plan-compact">
            {#each planLabels as label}
              <li class:active={label === currentStage}>{label}</li>
            {/each}
          </ol>
        {/if}
        <pre class="lw-output" aria-live="polite">{outputTail.length > 0 ? outputTail.join('\n') : L.execute.waiting}</pre>
        {#if statusError}
          <p class="lw-error">{statusError}</p>
        {/if}
      </section>
    {:else if currentStep === 'ready'}
      <section class="lw-panel" in:fly={{ y: 8, duration: 200 }} out:fade={{ duration: 140 }}>
        <h2 class="lw-title">{installedOk ? L.ready.titleOk : L.ready.titleFail}</h2>
        <div class="lw-stage-line">
          <span class="lw-stage-label">{L.ready.exit}</span>
          <span class="lw-stage-value">{exitCode ?? '—'}</span>
        </div>
        {#if status?.error}
          <p class="lw-error">{status.error}</p>
        {/if}
        <pre class="lw-output lw-output--compact">{outputTail.slice(-40).join('\n')}</pre>
        <div class="lw-ready-actions">
          <button class="lw-cta" onclick={openGuide}>{L.ready.openGuide}</button>
          <button class="lw-btn lw-btn--ghost" onclick={() => goTo('consent')}>{L.ready.reinstall}</button>
        </div>
        <div class="lw-next">
          <span class="lw-next-label">{L.ready.nextSteps}</span>
          <ul>
            {#each nextCommands as cmd}
              <li>
                <code>{cmd.cmd}</code>
                <span>{cmd.desc}</span>
              </li>
            {/each}
          </ul>
        </div>
      </section>
    {/if}
  </div>

  <nav class="lw-nav">
    <button class="lw-btn" onclick={prevStep} disabled={stepIndex === 0}>&larr; {L.nav.back}</button>
    <button class="lw-btn lw-btn--ghost" onclick={refreshPreflight} disabled={preflightLoading}>
      {L.nav.refresh}
    </button>
    {#if currentStep !== 'ready' && currentStep !== 'execute'}
      <button class="lw-btn" onclick={nextStep} disabled={!preflight}>
        {L.nav.next} &rarr;
      </button>
    {/if}
  </nav>
</div>

<style>
  .live-wizard {
    --lw-copper: var(--copper, #b87333);
    --lw-copper-bright: var(--copper-bright, #d4905c);
    --lw-surface: var(--glass-panel-bg, rgba(14, 16, 20, 0.86));
    --lw-border: var(--glass-panel-border, rgba(218, 197, 167, 0.18));
    --lw-text: rgba(243, 241, 236, 0.94);
    --lw-text-dim: rgba(209, 216, 224, 0.78);
    --lw-error: rgba(255, 107, 107, 0.9);
    --lw-mono: var(--font-mono, 'JetBrains Mono', monospace);
    --lw-sans: var(--font-head);

    width: min(64rem, 100%);
    margin: 0 auto;
    padding: clamp(1rem, 2vw, 1.5rem) clamp(1rem, 2vw, 1.6rem);
    display: flex;
    flex-direction: column;
    gap: clamp(0.9rem, 1.4vw, 1.25rem);
    font-family: var(--lw-sans);
    color: var(--lw-text);
  }

  .lw-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .lw-brand {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .lw-brand-product {
    font-family: var(--lw-mono);
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--lw-copper-bright);
  }

  .lw-brand-tagline {
    font-size: 0.85rem;
    color: var(--lw-text-dim);
    max-width: 32rem;
  }

  .lw-meta {
    display: inline-flex;
    gap: 0.75rem;
    font-family: var(--lw-mono);
    font-size: 0.7rem;
    color: var(--lw-text-dim);
  }

  .lw-meta-item {
    display: inline-flex;
    gap: 0.3rem;
  }

  .lw-meta-label {
    opacity: 0.7;
  }

  .lw-progress {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .lw-track {
    height: 2px;
    background: rgba(218, 197, 167, 0.14);
    border-radius: 999px;
    overflow: hidden;
  }

  .lw-track-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--lw-copper), var(--lw-copper-bright));
    transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .lw-steps {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .lw-step {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem 0.4rem;
    border: none;
    background: transparent;
    color: var(--lw-text-dim);
    font-family: var(--lw-mono);
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .lw-step-pip {
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 999px;
    background: var(--lw-surface);
    border: 1px solid rgba(218, 197, 167, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--lw-surface);
    transition: all 0.25s ease;
    box-shadow: inset 0 0 0 2px var(--lw-surface);
  }

  .lw-step.active .lw-step-pip {
    border-color: var(--lw-copper-bright);
    background: var(--lw-copper-bright);
    transform: scale(1.15);
  }

  .lw-step.done .lw-step-pip {
    border-color: var(--lw-copper);
    background: var(--lw-copper);
    color: #fff;
  }

  .lw-step.active {
    color: var(--lw-text);
  }

  .lw-stage {
    display: flex;
    flex-direction: column;
    min-height: 22rem;
  }

  .lw-panel {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: clamp(1rem, 1.8vw, 1.5rem) clamp(1rem, 1.8vw, 1.5rem);
    border: 1px solid var(--lw-border);
    border-radius: 1.1rem;
    background: var(--lw-surface);
    backdrop-filter: blur(18px) saturate(118%);
    -webkit-backdrop-filter: blur(18px) saturate(118%);
  }

  .lw-title {
    margin: 0;
    font-size: clamp(1.2rem, 2vw, 1.55rem);
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .lw-lead {
    margin: 0;
    color: var(--lw-text-dim);
    line-height: 1.55;
  }

  .lw-install-hero {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    padding: 0.85rem 1rem 0.95rem;
    border-radius: 0.85rem;
    background:
      radial-gradient(circle at 18% 0%, rgba(212, 144, 92, 0.1), transparent 55%),
      linear-gradient(180deg, rgba(18, 20, 24, 0.62), rgba(9, 10, 13, 0.78));
    border: 1px solid rgba(212, 144, 92, 0.22);
    box-shadow:
      0 22px 42px rgba(0, 0, 0, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .lw-install-hero-meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 0 0.1rem;
  }

  .lw-install-hero-step {
    font-family: var(--lw-mono);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--lw-copper-bright);
  }

  .lw-install-hero-hint {
    font-family: var(--lw-mono);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--lw-text-dim);
    text-align: right;
  }
  
  .lw-install-hero-hint code {
    color: var(--lw-text);
  }

  .lw-cmd-block {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 0.95rem;
    border-radius: 0.65rem;
    font-family: var(--lw-mono);
    font-size: 0.75rem;
    background: rgba(12, 14, 18, 0.6);
    border: 1px solid rgba(163, 184, 199, 0.18);
  }

  .lw-missing-components {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .lw-missing-label {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 107, 107, 0.9);
  }

  .lw-missing-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .lw-missing-list li code {
    color: var(--lw-text-dim);
    font-size: 0.7rem;
  }

  .lw-install-run {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: 0.2rem 0.1rem 0;
    border-top: 1px dashed rgba(163, 184, 199, 0.14);
    padding-top: 0.65rem;
  }

  .lw-install-run-kicker {
    font-family: var(--lw-mono);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--lw-copper-bright);
    flex-shrink: 0;
  }

  .lw-plan-preview-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  
  .lw-plan-preview-list code {
    font-family: var(--lw-mono);
    font-size: 0.75rem;
    color: var(--lw-text-dim);
  }

  .lw-welcome-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.2rem;
    margin-top: 0.4rem;
  }

  .lw-action-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .lw-welcome-time {
    font-family: var(--lw-mono);
    font-size: 0.7rem;
    color: var(--lw-text-dim);
  }

  .lw-muted {
    color: var(--lw-text-dim);
    font-family: var(--lw-mono);
    font-size: 0.78rem;
  }

  .lw-error {
    color: var(--lw-error);
    font-family: var(--lw-mono);
    font-size: 0.78rem;
  }

  .lw-cta {
    align-self: flex-start;
    padding: 0.65rem 1.1rem;
    border: 1px solid var(--lw-copper);
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(184, 115, 51, 0.24), rgba(184, 115, 51, 0.08));
    color: var(--lw-text);
    font-family: var(--lw-mono);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .lw-cta:hover:not(:disabled),
  .lw-cta:focus-visible:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(184, 115, 51, 0.18);
  }

  .lw-cta:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .lw-cats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 0.75rem;
  }

  .lw-cat {
    padding: 0.85rem;
    border: 1px solid var(--lw-border);
    border-radius: 0.8rem;
    background: rgba(255, 255, 255, 0.02);
  }

  .lw-cat header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.4rem;
    font-family: var(--lw-mono);
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .lw-cat ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.3rem;
    font-family: var(--lw-mono);
    font-size: 0.7rem;
  }

  .lw-cat li {
    display: grid;
    grid-template-columns: 0.6rem 1fr auto;
    align-items: center;
    gap: 0.4rem;
  }

  .lw-cat .lw-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: rgba(218, 197, 167, 0.2);
  }

  .lw-cat li.found .lw-dot {
    background: var(--lw-copper-bright);
  }

  .lw-cat li.missing .lw-dot {
    background: rgba(255, 107, 107, 0.7);
  }

  .lw-cat .lw-name {
    color: var(--lw-text);
  }

  .lw-cat .lw-detail {
    font-size: 0.62rem;
    color: var(--lw-text-dim);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 10rem;
  }

  .lw-count {
    color: var(--lw-copper-bright);
  }

  .lw-plan {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.55rem;
  }

  .lw-plan li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.7rem;
    padding: 0.7rem 0.85rem;
    border: 1px solid var(--lw-border);
    border-radius: 0.7rem;
    background: rgba(255, 255, 255, 0.02);
  }

  .lw-plan-idx {
    font-family: var(--lw-mono);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--lw-copper-bright);
  }

  .lw-plan-body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .lw-plan-body code {
    font-family: var(--lw-mono);
    font-size: 0.72rem;
    color: var(--lw-text-dim);
    word-break: break-all;
  }

  .lw-check {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .lw-check input {
    width: 1rem;
    height: 1rem;
    accent-color: var(--lw-copper);
  }

  .lw-stage-line {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-family: var(--lw-mono);
    font-size: 0.78rem;
  }

  .lw-stage-label {
    color: var(--lw-text-dim);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.62rem;
  }

  .lw-stage-value {
    color: var(--lw-copper-bright);
    font-weight: 600;
  }

  .lw-plan-compact {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    font-family: var(--lw-mono);
    font-size: 0.66rem;
  }

  .lw-plan-compact li {
    padding: 0.28rem 0.55rem;
    border: 1px solid var(--lw-border);
    border-radius: 999px;
    color: var(--lw-text-dim);
  }

  .lw-plan-compact li.active {
    color: var(--lw-text);
    background: rgba(184, 115, 51, 0.14);
    border-color: var(--lw-copper);
  }

  .lw-output {
    margin: 0;
    padding: 0.75rem 0.9rem;
    border: 1px solid var(--lw-border);
    border-radius: 0.7rem;
    background: rgba(0, 0, 0, 0.42);
    font-family: var(--lw-mono);
    font-size: 0.74rem;
    line-height: 1.5;
    color: rgba(232, 236, 242, 0.86);
    max-height: 22rem;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .lw-output--compact {
    max-height: 14rem;
  }

  .lw-ready-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .lw-next {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .lw-next-label {
    font-family: var(--lw-mono);
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--lw-copper-bright);
  }

  .lw-next ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.35rem;
  }

  .lw-next li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.8rem;
    align-items: baseline;
    font-family: var(--lw-mono);
    font-size: 0.74rem;
  }

  .lw-next code {
    color: var(--lw-copper-bright);
  }

  .lw-next li span {
    color: var(--lw-text-dim);
  }

  .lw-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .lw-btn {
    padding: 0.55rem 1rem;
    border: 1px solid var(--lw-border);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    color: var(--lw-text);
    font-family: var(--lw-mono);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.18s ease, transform 0.18s ease;
  }

  .lw-btn:hover:not(:disabled),
  .lw-btn:focus-visible:not(:disabled) {
    border-color: var(--lw-copper);
    transform: translateY(-1px);
  }

  .lw-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .lw-btn--ghost {
    background: transparent;
  }

  @media (max-width: 720px) {
    .lw-steps {
      overflow-x: auto;
      flex-wrap: nowrap;
    }

    .lw-step {
      flex-shrink: 0;
    }
  }
</style>
style>
