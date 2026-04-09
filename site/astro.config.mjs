// @ts-check
import { defineConfig } from 'astro/config';

import svelte, { vitePreprocess } from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://vibecrafted.io',
  integrations: [svelte({ preprocess: vitePreprocess() }), mdx()]
});
