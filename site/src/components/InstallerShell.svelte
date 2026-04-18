<script lang="ts">
  import { onMount } from 'svelte';
  import InstallerWizard from './InstallerWizard.svelte';
  import LiveInstaller from './LiveInstaller.svelte';
  import { isLiveInstallerHost } from '../lib/installer/api';

  interface Props {
    lang: 'en' | 'pl';
    manifest: unknown;
  }

  let { lang, manifest }: Props = $props();

  let mode = $state<'preview' | 'live'>('preview');

  onMount(() => {
    if (isLiveInstallerHost()) {
      mode = 'live';
    }
  });
</script>

{#if mode === 'live'}
  <LiveInstaller {lang} />
{:else}
  <InstallerWizard {lang} {manifest} />
{/if}
