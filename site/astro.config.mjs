// @ts-check
import { defineConfig } from 'astro/config';

import svelte, { vitePreprocess } from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

// @ts-expect-error -- Node global; @types/node not in site/package.json
const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://vibecrafted.io',
  integrations: [svelte({ preprocess: vitePreprocess() }), mdx()],
  security: isProd
    ? {
        csp: {
          algorithm: 'SHA-256',
          scriptDirective: {
            resources: [
              "'self'",
              'https://cdn.jsdelivr.net',
              'https://plausible.io',
            ],
          },
          styleDirective: {
            resources: [
              "'self'",
              "'unsafe-inline'",
              'https://fonts.googleapis.com',
            ],
          },
          directives: [
            "default-src 'none'",
            "img-src 'self' data:",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://plausible.io",
            "frame-src 'none'",
            "worker-src 'self'",
            "manifest-src 'self'",
            "base-uri 'self'",
            "form-action 'self'",
          ],
        },
      }
    : undefined,
});
