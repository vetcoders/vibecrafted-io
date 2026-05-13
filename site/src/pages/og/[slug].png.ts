/**
 * og/[slug].png.ts — Plan 17 dynamic OG endpoint.
 *
 * Static-renders one PNG per slug at `pnpm build` time. Each page that ships
 * an `og:image` meta points here:
 *   /og/landing.png
 *   /og/manifesto-en.png
 *   /og/manifesto-pl.png
 *   /og/showcase-index.png
 *   /og/showcase-loctree-lsp-roadmap.png
 *   /og/showcase-vista-sealed-env.png
 *   /og/showcase-audit-22-parallel-truth.png
 *
 * The set of slugs is declared in `OG_SLUGS` in `src/lib/og-renderer.ts` —
 * single source of truth for both this endpoint and per-page meta overrides.
 *
 * No runtime edge function — Astro static build (`output: 'static'` default
 * with `astro build`) emits each route as a real PNG file under
 * `dist/og/<slug>.png`, which the deploy target serves as a static asset.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { OG_SLUGS, renderOGCard, findOGSlug } from '../../lib/og-renderer';

export const getStaticPaths: GetStaticPaths = () =>
  OG_SLUGS.map((entry) => ({ params: { slug: entry.slug } }));

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (typeof slug !== 'string') {
    return new Response('og slug missing', { status: 404 });
  }
  const entry = findOGSlug(slug);
  if (!entry) {
    return new Response('og slug unknown', { status: 404 });
  }

  const png = await renderOGCard(entry.card);
  // Copy into a fresh ArrayBuffer-backed view so the BodyInit type-check
  // accepts it across both Node and edge runtimes (avoids the SharedArrayBuffer
  // edge case in `new Uint8Array(buffer, offset, length)`).
  const body = new Uint8Array(png.byteLength);
  body.set(png);

  return new Response(body as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      // Hint to CDN: brand-key OGs are stable per release; safe to cache hard.
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, immutable',
    },
  });
};
