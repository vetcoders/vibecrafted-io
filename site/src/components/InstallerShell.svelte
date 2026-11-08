<script lang="ts">
  import { onMount } from 'svelte';
  import LiveInstaller from './LiveInstaller.svelte';
  import { getTranslations, type Lang } from '../lib/i18n';
  import { installerApi, isLiveInstallerHost } from '../lib/installer/api';
  import '../styles/installer.css';

  interface Props {
    lang: Lang;
    manifest: unknown;
  }

  let { lang, manifest: _manifest }: Props = $props();

  let mode = $state<'booting' | 'preview' | 'live' | 'lost'>('booting');
  let resolveError = $state<string | null>(null);

  const dict = $derived(getTranslations(lang));
  const liveCopy = $derived(dict.sections.installer.live);

  async function resolveMode(isCancelled: () => boolean = () => false) {
    resolveError = null;
    mode = 'booting';

    if (!isLiveInstallerHost()) {
      if (!isCancelled()) mode = 'preview';
      return;
    }

    try {
      await installerApi.health();
      if (!isCancelled()) mode = 'live';
    } catch (err) {
      if (isCancelled()) return;
      resolveError = err instanceof Error ? err.message : String(err);
      mode = 'lost';
    }
  }

  onMount(() => {
    let cancelled = false;

    void (async () => {
      await resolveMode(() => cancelled);
    })();

    return () => {
      cancelled = true;
    };
  });
</script>

{#if mode === 'live'}
  <LiveInstaller {lang} />
{:else if mode === 'lost'}
  <div class="installer-shell__bridge" role="status" aria-live="polite">
    <span class="installer-shell__bridge-kicker">
      {liveCopy.status.notConnected}
    </span>
    {#if resolveError}
      <p class="installer-shell__bridge-error">{resolveError}</p>
      <button class="installer-shell__bridge-action" onclick={() => resolveMode()}>
        {liveCopy.nav.refresh}
      </button>
    {/if}
  </div>
{/if}

<style>
  .installer-shell {
    display: flex;
    flex-direction: column;
    gap: 0.72rem;
    flex: 0 0 auto;
    min-height: 0;
    height: auto;
  }

  .installer-shell__demo-banner {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    align-self: flex-start;
    margin: 0 clamp(0.95rem, 2.4vw, 1.6rem);
    padding: 0.4rem 0.66rem;
    border: 1px solid rgba(245, 244, 239, 0.14);
    border-radius: 6px;
    background:
      linear-gradient(180deg, rgba(23, 22, 21, 0.86), rgba(8, 8, 7, 0.94)),
      linear-gradient(90deg, rgba(245, 244, 239, 0.055), transparent 72%);
    color: var(--installer-text);
    font-family: var(--installer-font-mono);
  }

  .installer-shell__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 3.2rem;
    padding: 0.18rem 0.45rem;
    border-radius: 3px;
    background: rgba(245, 244, 239, 0.08);
    color: var(--installer-text);
    font-size: 0.64rem;
    font-weight: 700;
    letter-spacing: 0.16em;
  }

  .installer-shell__demo-copy {
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--installer-text-dim);
  }

  .installer-shell__bridge {
    display: grid;
    place-items: center;
    gap: 0.6rem;
    min-height: 0;
    margin: 0 clamp(0.95rem, 2.4vw, 1.6rem);
    padding: clamp(1.25rem, 4vw, 2rem);
    border: 1px solid var(--installer-border);
    border-radius: clamp(0.5rem, 1.5vw, 0.8rem);
    background:
      linear-gradient(180deg, rgba(23, 22, 21, 0.86), rgba(8, 8, 7, 0.95));
    text-align: center;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 18px 40px rgba(0, 0, 0, 0.26);
  }

  .installer-shell__bridge-kicker {
    color: var(--installer-text);
    font-family: var(--installer-font-mono);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .installer-shell__bridge-error {
    margin: 0;
    max-width: 36rem;
    color: var(--installer-error);
    font-family: var(--installer-font-mono);
    font-size: 0.76rem;
    line-height: 1.6;
  }

  .installer-shell__bridge-action {
    padding: 0.6rem 1rem;
    border: 1px solid rgba(245, 244, 239, 0.18);
    border-radius: 4px;
    background: rgba(245, 244, 239, 0.07);
    color: var(--installer-text);
    cursor: pointer;
    font-family: var(--installer-font-mono);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
</style>
