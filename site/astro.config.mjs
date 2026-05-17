// @ts-check
import { defineConfig } from 'astro/config';

import svelte, { vitePreprocess } from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

// CSP is emitted as a meta tag from Layout.astro. Astro's built-in CSP feature
// auto-hashes static inline styles, and CSP L3 silently drops 'unsafe-inline'
// when any hash is present — which breaks Svelte 5 runtime style props
// (e.g. style="--range-pct:22%" on a slider). A single hand-written policy
// in the Layout keeps Svelte reactive while still whitelisting origins.
export default defineConfig({
  site: 'https://vibecrafted.io',
  integrations: [svelte({ preprocess: vitePreprocess() }), mdx()],
  redirects: {
    '/': '/en/',
    '/dou': '/en/dou/',
    '/faq': '/en/faq/',
    '/framework': '/en/framework/',
    '/install': '/en/install/',
    '/quickstart': '/en/quickstart/',
    '/presence/faq': '/en/faq/',
    '/presence/framework': '/en/framework/',
    '/presence/install': '/en/install/',
    '/presence/quickstart': '/en/quickstart/',
  },
});
