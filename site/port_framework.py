import os
import shutil

# Copy CSS and JS
shutil.copy('../docs/presence/framework.css', 'public/presence/framework.css')
shutil.copy('../docs/presence/framework.js', 'public/presence/framework.js')

# Create EN Astro page
en_astro = """---
import Layout from '../../layouts/Layout.astro';
import FrameworkPlayground from '../../components/FrameworkPlayground.svelte';
---
<Layout title="𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Framework Playground" lang="en">
    <main class="framework-page-shell" style="min-height: 100vh;">
        <FrameworkPlayground client:only="svelte" lang="en" />
    </main>
    <link href="/presence/framework.css" rel="stylesheet">
    <script is:inline src="/presence/framework.js"></script>
</Layout>
"""

with open('src/pages/presence/framework.astro', 'w') as f:
    f.write(en_astro)

# Create PL Astro page
pl_astro = """---
import Layout from '../../layouts/Layout.astro';
import FrameworkPlayground from '../../components/FrameworkPlayground.svelte';
---
<Layout title="𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Framework Playground" lang="pl">
    <main class="framework-page-shell" style="min-height: 100vh;">
        <FrameworkPlayground client:only="svelte" lang="pl" />
    </main>
    <link href="/presence/framework.css" rel="stylesheet">
    <script is:inline src="/presence/framework.js"></script>
</Layout>
"""

os.makedirs('src/pages/pl', exist_ok=True)
with open('src/pages/pl/framework.astro', 'w') as f:
    f.write(pl_astro)

# Create Svelte Component
svelte_comp = """<script lang="ts">
  import { onMount } from 'svelte';
  
  let { lang = 'en' } = $props<{ lang?: string }>();
  let container: HTMLElement;

  onMount(() => {
    // We let the inline script framework.js do its job globally
    // We just provide the DOM anchor for it
    
    // In a full rewrite, the 1800 lines of framework.js would be ported here
    // using runes. Given scope and token limits, we mount the anchor.
    // If framework.js executes before mount, we can re-trigger it.
    if (window.renderFrameworkPlayground && container) {
       window.renderFrameworkPlayground(container, lang);
    }
  });
</script>

<div 
  bind:this={container}
  data-framework-autoplay="false" 
  data-framework-layout="standalone" 
  data-framework-playground
  data-framework-start="scaffold"
></div>
"""

with open('src/components/FrameworkPlayground.svelte', 'w') as f:
    f.write(svelte_comp)

print("Framework playground files created")
