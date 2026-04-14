<script lang="ts">
  import { getDocsSearchData, type DocsSearchSection } from '../lib/search/docs';
  import type { Lang } from '../lib/i18n';

  type SearchResult = {
    href: string;
    title: string;
    body: string;
    score: number;
  };

  const aliasMap = {
    en: {
      install: ['bootstrap', 'setup', 'doctor', 'shell'],
      doctor: ['health', 'check', 'diagnostics', 'doctor'],
      init: ['bootstrap', 'context', 'map', 'repo'],
      workflow: ['implement', 'research', 'pipeline', 'agents'],
      release: ['ship', 'launch', 'hydrate', 'decorate', 'dou'],
      license: ['bsl', 'business', 'source'],
      runtime: ['control', 'plane', 'artifacts'],
    },
    pl: {
      instalacja: ['bootstrap', 'doctor', 'setup', 'shell'],
      doctor: ['diagnoza', 'sprawdzenie', 'health'],
      init: ['kontekst', 'mapowanie', 'repo'],
      workflow: ['implementacja', 'research', 'pipeline', 'agenci'],
      release: ['ship', 'launch', 'hydrate', 'decorate', 'dou'],
      licencja: ['bsl', 'business', 'source'],
      runtime: ['control', 'plane', 'artefakty'],
    },
  } as const;

  let { lang, section, autofocus = false }: { lang: Lang; section: DocsSearchSection; autofocus?: boolean } = $props();

  let query = $state('');
  let activeIndex = $state(-1);
  let searchInput: HTMLInputElement | null = null;
  const searchData = $derived(getDocsSearchData(lang, section));

  function tokenize(value: string) {
    return value
      .toLowerCase()
      .split(/[^a-z0-9ąćęłńóśźż-]+/i)
      .filter((token) => token.length >= 2);
  }

  const normalizedTerms = $derived.by(() => {
    const tokens = tokenize(query);
    const aliases = aliasMap[lang];
    const expanded = new Set(tokens);

    for (const token of tokens) {
      expanded.add(token);
      for (const [stem, related] of Object.entries(aliases)) {
        if (token.startsWith(stem) || stem.startsWith(token)) {
          expanded.add(stem);
          for (const variant of related) expanded.add(variant);
        }
      }
    }

    return [...expanded];
  });

  const hasQuery = $derived(query.trim().length >= 2);

  const results = $derived.by(() => {
    if (!hasQuery) return [] as SearchResult[];

    return searchData.items
      .map((item) => {
        const titleTokens = tokenize(item.title);
        const bodyTokens = tokenize(item.body);
        let score = 0;

        for (const term of normalizedTerms) {
          if (titleTokens.some((token) => token.startsWith(term) || term.startsWith(token))) score += 4;
          if (item.keywords.some((keyword) => keyword.startsWith(term) || term.startsWith(keyword))) score += 3;
          if (bodyTokens.some((token) => token.startsWith(term) || term.startsWith(token))) score += 1;
        }

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 6);
  });

  $effect(() => {
    if (!hasQuery || results.length === 0) {
      activeIndex = -1;
      return;
    }

    if (activeIndex < 0 || activeIndex >= results.length) {
      activeIndex = 0;
    }
  });

  function moveActive(direction: 1 | -1) {
    if (results.length === 0) return;
    const baseIndex = activeIndex >= 0 ? activeIndex : 0;
    activeIndex = (baseIndex + direction + results.length) % results.length;
  }

  function selectActiveResult() {
    if (activeIndex < 0 || activeIndex >= results.length) return;
    window.location.assign(results[activeIndex].href);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!hasQuery || results.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      selectActiveResult();
    } else if (event.key === 'Escape') {
      activeIndex = -1;
    }
  }

  $effect(() => {
    if (autofocus && searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  });
</script>

<div class="docs-search">
  <label class="docs-search__label" for={`docs-search-${section}-${lang}`}>
    {searchData.resultsLabel}
  </label>
  <div class="docs-search__field-shell">
    <input
      id={`docs-search-${section}-${lang}`}
      class="docs-search__field"
      type="search"
      bind:this={searchInput}
      bind:value={query}
      autocomplete="off"
      spellcheck="false"
      placeholder={searchData.placeholder}
      aria-describedby={`docs-search-help-${section}-${lang}`}
      aria-activedescendant={activeIndex >= 0 ? `docs-search-result-${section}-${lang}-${activeIndex}` : undefined}
      onkeydown={handleKeydown}
    />
  </div>
  <p class="docs-search__hint" id={`docs-search-help-${section}-${lang}`}>
    {hasQuery
      ? results.length > 0
        ? searchData.resultsLabel
        : searchData.noResultsLabel
      : searchData.emptyLabel}
  </p>

  {#if hasQuery && results.length > 0}
    <div class="docs-search__results" aria-live="polite">
      {#each results as result, index}
        <a
          class="docs-search__result"
          class:docs-search__result--active={index === activeIndex}
          href={result.href}
          id={`docs-search-result-${section}-${lang}-${index}`}
          aria-current={index === activeIndex ? 'true' : undefined}
          onmouseenter={() => (activeIndex = index)}
        >
          <span class="docs-search__result-title">{result.title}</span>
          <span class="docs-search__result-body">{result.body}</span>
        </a>
      {/each}
    </div>
  {:else}
    <div class="docs-search__fallback" aria-live="polite">
      <span class="docs-search__fallback-label">{searchData.fallbackLabel}</span>
      <div class="docs-search__fallback-links">
        {#each searchData.fallbackLinks as link}
          <a href={link.href}>{link.label}</a>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .docs-search {
    display: grid;
    gap: 0.55rem;
    width: min(100%, 42rem);
    padding: 0.95rem 1rem;
    border: 1px solid rgba(218, 197, 167, 0.14);
    border-radius: 1rem;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent),
      rgba(11, 13, 16, 0.56);
    backdrop-filter: blur(14px) saturate(1.06);
    box-shadow:
      0 18px 44px rgba(0, 0, 0, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .docs-search__label,
  .docs-search__fallback-label {
    color: rgba(225, 176, 116, 0.92);
    font-family: var(--font-mono);
    font-size: 0.71rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .docs-search__field-shell {
    position: relative;
  }

  .docs-search__field {
    width: 100%;
    min-height: 3rem;
    padding: 0.75rem 0.95rem;
    border: 1px solid rgba(218, 197, 167, 0.18);
    border-radius: 0.8rem;
    background: rgba(7, 9, 12, 0.72);
    color: rgba(243, 241, 236, 0.96);
    font: inherit;
    outline: none;
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      background 160ms ease;
  }

  .docs-search__field:focus {
    border-color: rgba(225, 176, 116, 0.42);
    box-shadow: 0 0 0 3px rgba(225, 176, 116, 0.12);
    background: rgba(9, 11, 14, 0.86);
  }

  .docs-search__hint {
    margin: 0;
    color: rgba(209, 216, 224, 0.72);
    font-size: 0.84rem;
    line-height: 1.5;
  }

  .docs-search__results {
    display: grid;
    gap: 0.55rem;
  }

  .docs-search__result,
  .docs-search__fallback-links a {
    display: grid;
    gap: 0.15rem;
    padding: 0.72rem 0.82rem;
    border: 1px solid rgba(218, 197, 167, 0.14);
    border-radius: 0.85rem;
    background: rgba(255, 255, 255, 0.03);
    color: rgba(236, 240, 245, 0.94);
    text-decoration: none;
    transition:
      border-color 160ms ease,
      transform 160ms ease,
      background 160ms ease;
  }

  .docs-search__result:hover,
  .docs-search__result--active,
  .docs-search__result:focus-visible,
  .docs-search__fallback-links a:hover,
  .docs-search__fallback-links a:focus-visible {
    border-color: rgba(225, 176, 116, 0.38);
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-1px);
  }

  .docs-search__result--active {
    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.18),
      0 0 0 1px rgba(225, 176, 116, 0.16);
  }

  .docs-search__result-title {
    color: rgba(243, 241, 236, 0.96);
    font-size: 0.92rem;
    font-weight: 600;
  }

  .docs-search__result-body {
    color: rgba(209, 216, 224, 0.78);
    font-size: 0.82rem;
    line-height: 1.5;
  }

  .docs-search__fallback {
    display: grid;
    gap: 0.55rem;
  }

  .docs-search__fallback-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  @media (max-width: 720px) {
    .docs-search {
      width: 100%;
      padding: 0.88rem 0.9rem;
    }

    .docs-search__fallback-links {
      display: grid;
    }
  }
</style>
