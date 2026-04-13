<script lang="ts">
  type ActiveLang = 'en' | 'pl';

  let activeLang = $state<ActiveLang>('en');

  function resolvePreferredLang(): ActiveLang {
    if (typeof window === 'undefined') return 'en';

    if (window.location.pathname.startsWith('/pl')) {
      return 'pl';
    }

    const browserLang = navigator.language || ((navigator as Navigator & { userLanguage?: string }).userLanguage ?? '');
    return browserLang.toLowerCase().startsWith('pl') ? 'pl' : 'en';
  }

  $effect(() => {
    if (typeof window === 'undefined') return;

    activeLang = resolvePreferredLang();
    document.documentElement.lang = activeLang;
  });
</script>
