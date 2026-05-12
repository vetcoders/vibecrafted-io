/**
 * og-renderer.ts — Plan 17 dynamic OG card renderer.
 *
 * Renders 1200×630 brand-token-driven OpenGraph cards via satori (Vercel's
 * SVG-from-JSX renderer) + @resvg/resvg-js (Rust-bound SVG→PNG rasterizer).
 *
 * Runs at Astro build time only — no runtime edge dependency, no CDN, no
 * tracking. Output is a PNG Buffer.
 *
 * Brand tokens hardcoded from tokens-v2.css to avoid runtime CSS parsing:
 *   --v2-ink         #080807   (background)
 *   --v2-fg-on-dark  #f5f4ef   (title color, NOT pure white)
 *   --v2-fg-on-dark-dim  rgba(245,244,239,0.62)  (subtitle)
 *   --v2-fg-on-dark-mute rgba(245,244,239,0.42)  (eyebrow / fig label)
 *   --v2-accent      #c99a3b   (amber — default + showcase)
 *   --v2-accent-2    #3d7a72   (teal — manifesto + DoU narrative)
 *   --v2-rule-dark   rgba(245,244,239,0.12)  (horizontal hairline)
 *
 * Typography:
 *   - Instrument Serif (display, italic for subtitles)
 *   - Inter (body, semibold for stat labels)
 *   - JetBrains Mono (eyebrow / fig label)
 *
 * Anti-aesthetic gates per loctree-com BRAND.md doctrine:
 *   - no pure #000 (uses --v2-ink #080807)
 *   - no gradient ornament
 *   - no glow / blur / drop-shadow
 *   - no stock images / no AI-generated illustrations
 *
 * Layout: editorial blueprint. Eyebrow row top-left, fig label top-right,
 * hairline rule, title (Instrument Serif), italic subtitle, accent stripe
 * bottom-left, vibecrafted.io wordmark bottom-right.
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Vite-canonical font import: `?inline` returns the file content as a
// base64 data URI string at build time. We strip the prefix and decode
// to a Buffer for satori. This bundles the TTF bytes directly into the
// prerender chunk, eliminating any runtime path resolution. Slightly
// bloats the chunk (~1.2MB of TTF) but the chunk is dropped from dist/
// after prerender, so the production bundle size is unaffected.
//
// Alternative considered: `?url` resolves to `dist/_astro/<hash>.ttf` at
// runtime, but the prerender chunk runs BEFORE the asset rearrange step
// completes, so the URL points at a path that doesn't exist yet.
import interRegular from '../assets/fonts/Inter-Regular.ttf?inline';
import interSemiBold from '../assets/fonts/Inter-SemiBold.ttf?inline';
import instrumentRegular from '../assets/fonts/InstrumentSerif-Regular.ttf?inline';
import instrumentItalic from '../assets/fonts/InstrumentSerif-Italic.ttf?inline';
import jbmRegular from '../assets/fonts/JetBrainsMono-Regular.ttf?inline';

function dataUriToBuffer(uri: string): Buffer {
  // Vite's `?inline` returns `data:<mime>;base64,<payload>`.
  const commaIdx = uri.indexOf(',');
  if (commaIdx < 0) {
    throw new Error('og-renderer: unexpected inline-asset shape (no comma)');
  }
  return Buffer.from(uri.slice(commaIdx + 1), 'base64');
}

export type OGAccent = 'amber' | 'teal';
export type OGLang = 'en' | 'pl';

export interface OGCardInput {
  /** Display title — rendered in Instrument Serif. Wraps naturally. */
  title: string;
  /** Italic subtitle / lede — Instrument Serif italic, dim. */
  subtitle: string;
  /** Top-left eyebrow label (JetBrains Mono, uppercase) — e.g. "CASE STUDY". */
  eyebrow: string;
  /** Top-right fig label (JetBrains Mono, uppercase) — e.g. "FIG. 16 · DWG VC-016". */
  fig?: string;
  /** Bottom-right wordmark — defaults to "VIBECRAFTED.IO". */
  wordmark?: string;
  /** Accent token — amber (default, showcase) or teal (manifesto). */
  accent?: OGAccent;
  /** Page language (affects og:locale, not visual). */
  lang?: OGLang;
}

const BRAND = {
  ink: '#080807',
  fgOnDark: '#f5f4ef',
  fgOnDarkDim: 'rgba(245, 244, 239, 0.62)',
  fgOnDarkMute: 'rgba(245, 244, 239, 0.42)',
  ruleDark: 'rgba(245, 244, 239, 0.12)',
  accentAmber: '#c99a3b',
  accentTeal: '#3d7a72',
} as const;

const ACCENT_HEX: Record<OGAccent, string> = {
  amber: BRAND.accentAmber,
  teal: BRAND.accentTeal,
};

// Load fonts once per process (build-time cache).
let _fontsCache: Awaited<ReturnType<typeof loadFonts>> | null = null;

async function loadFonts() {
  return [
    { name: 'Inter', data: dataUriToBuffer(interRegular), weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: dataUriToBuffer(interSemiBold), weight: 600 as const, style: 'normal' as const },
    { name: 'Instrument Serif', data: dataUriToBuffer(instrumentRegular), weight: 400 as const, style: 'normal' as const },
    { name: 'Instrument Serif', data: dataUriToBuffer(instrumentItalic), weight: 400 as const, style: 'italic' as const },
    { name: 'JetBrains Mono', data: dataUriToBuffer(jbmRegular), weight: 400 as const, style: 'normal' as const },
  ];
}

/**
 * Build the satori-compatible JSX-like node tree for one OG card.
 * satori expects "React-like" plain objects: { type, props: { style, children } }.
 * Using object literals avoids any JSX-compilation requirement in Astro endpoints.
 */
function buildCardNode(input: OGCardInput) {
  const accentHex = ACCENT_HEX[input.accent ?? 'amber'];
  const wordmark = input.wordmark ?? 'VIBECRAFTED.IO';
  const fig = input.fig ?? '';

  // Editorial blueprint layout, 1200x630 canvas, 64px gutter.
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: BRAND.ink,
        color: BRAND.fgOnDark,
        fontFamily: 'Inter',
        padding: '56px 64px',
        position: 'relative',
      },
      children: [
        // ── Top row: eyebrow + fig label ─────────────────────────
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              fontFamily: 'JetBrains Mono',
              fontSize: '16px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: BRAND.fgOnDarkMute,
            },
            children: [
              {
                type: 'span',
                props: { children: input.eyebrow.toUpperCase() },
              },
              {
                type: 'span',
                props: { children: fig.toUpperCase() },
              },
            ],
          },
        },
        // ── Hairline rule ─────────────────────────────────────────
        {
          type: 'div',
          props: {
            style: {
              width: '100%',
              height: '1px',
              backgroundColor: BRAND.ruleDark,
              marginTop: '20px',
              marginBottom: '0px',
            },
          },
        },
        // ── Body: title + italic subtitle ─────────────────────────
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              gap: '24px',
              paddingTop: '32px',
              paddingBottom: '32px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Instrument Serif',
                    fontSize: '64px',
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                    color: BRAND.fgOnDark,
                    maxWidth: '960px',
                    // satori needs an explicit display
                    display: 'flex',
                  },
                  children: input.title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Instrument Serif',
                    fontStyle: 'italic',
                    fontSize: '30px',
                    lineHeight: 1.3,
                    color: BRAND.fgOnDarkDim,
                    maxWidth: '940px',
                    display: 'flex',
                  },
                  children: input.subtitle,
                },
              },
            ],
          },
        },
        // ── Bottom row: accent stripe + wordmark ─────────────────
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginTop: '0px',
            },
            children: [
              // Accent stripe — bottom-left, signals page family
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '16px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: '48px',
                          height: '2px',
                          backgroundColor: accentHex,
                        },
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontFamily: 'JetBrains Mono',
                          fontSize: '14px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: accentHex,
                        },
                        children:
                          input.accent === 'teal'
                            ? 'MANIFESTO'
                            : input.eyebrow.toUpperCase() === 'CASE STUDY'
                              ? 'SHOWCASE'
                              : 'RELEASE ENGINE',
                      },
                    },
                  ],
                },
              },
              // Wordmark — bottom-right
              {
                type: 'span',
                props: {
                  style: {
                    fontFamily: 'JetBrains Mono',
                    fontSize: '14px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: BRAND.fgOnDarkMute,
                  },
                  children: wordmark,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

/**
 * Render one OG card to a PNG Buffer.
 *
 * @returns 1200×630 PNG bytes (Node Buffer).
 */
export async function renderOGCard(input: OGCardInput): Promise<Buffer> {
  if (!_fontsCache) {
    _fontsCache = await loadFonts();
  }

  const svg = await satori(buildCardNode(input) as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: _fontsCache,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    background: BRAND.ink,
    font: {
      // Disable system-font fallback so any missing glyph fails loudly
      // rather than silently swapping to Helvetica.
      loadSystemFonts: false,
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}

/**
 * Slug → OG card content mapping. Keep in sync with site/src/pages/og/[slug].png.ts
 * and with the per-page `ogImage` overrides in each route.
 *
 * Slugs follow page-level identity (one OG per indexable surface):
 *   - landing                       → /
 *   - manifesto-en | manifesto-pl   → /manifesto/?lang=en|pl
 *   - showcase-index                → /showcase/
 *   - showcase-<study-slug>         → /showcase/<study-slug>/
 *
 * Returns null for unknown slugs so the endpoint can 404 cleanly.
 */
export interface OGSlugDef {
  slug: string;
  card: OGCardInput;
}

export const OG_SLUGS: OGSlugDef[] = [
  {
    slug: 'landing',
    card: {
      title: 'Release engine for AI-built software.',
      subtitle: 'Discipline for shipping what AI agents wrote.',
      eyebrow: 'Vibecrafted',
      fig: 'FIG. 01 · DWG VC-001',
      accent: 'amber',
      lang: 'en',
    },
  },
  {
    slug: 'landing-pl',
    card: {
      title: 'Silnik wydawniczy dla oprogramowania pisanego z AI.',
      subtitle: 'Dyscyplina dowożenia tego, co napisały agenty.',
      eyebrow: 'Vibecrafted',
      fig: 'FIG. 01 · DWG VC-001',
      accent: 'amber',
      lang: 'pl',
    },
  },
  {
    slug: 'landing-en',
    card: {
      title: 'Release engine for AI-built software.',
      subtitle: 'Discipline for shipping what AI agents wrote.',
      eyebrow: 'Vibecrafted',
      fig: 'FIG. 01 · DWG VC-001',
      accent: 'amber',
      lang: 'en',
    },
  },
  {
    slug: 'manifesto-en',
    card: {
      title: 'The Vibe Hangover.',
      subtitle: 'Six months of fixing vibe-coded SaaS products. The same four things are broken every single time.',
      eyebrow: 'Manifesto',
      fig: 'FIG. 14 · DWG VC-014',
      accent: 'teal',
      lang: 'en',
    },
  },
  {
    slug: 'manifesto-pl',
    card: {
      title: 'Kac po vibe-codingu.',
      subtitle: 'Sześć miesięcy naprawiania vibe-codowanych SaaS-ów. Cztery te same rzeczy są zepsute za każdym razem.',
      eyebrow: 'Manifest',
      fig: 'FIG. 14 · DWG VC-014',
      accent: 'teal',
      lang: 'pl',
    },
  },
  {
    slug: 'showcase-index',
    card: {
      title: 'Three case studies of vibecrafted discipline in production.',
      subtitle: 'The framework was built by shipping with it.',
      eyebrow: 'Case studies',
      fig: 'FIG. 16 · DWG VC-016',
      accent: 'amber',
      lang: 'en',
    },
  },
  {
    slug: 'showcase-loctree-lsp-roadmap',
    card: {
      title: 'Loctree LSP — 22 plans, one falsifier-resistant verdict.',
      subtitle: 'Six parallel Opus agents and one adversarial codex audit found out what "complete" actually meant.',
      eyebrow: 'Case study',
      fig: 'FIG. 16 · DWG VC-016',
      accent: 'amber',
      lang: 'en',
    },
  },
  {
    slug: 'showcase-vista-sealed-env',
    card: {
      title: 'Vista — sealed environment, honest smoke.',
      subtitle: 'Pre-launch crypto alignment cycle that closed when the smoke tests stopped lying.',
      eyebrow: 'Case study',
      fig: 'FIG. 16 · DWG VC-016',
      accent: 'amber',
      lang: 'en',
    },
  },
  {
    slug: 'showcase-audit-22-parallel-truth',
    card: {
      title: 'Audit-22 — parallel-truth reconciliation, captured live.',
      subtitle: 'An audit cycle that caught its own race condition during shipping. Self-validating delivery.',
      eyebrow: 'Case study',
      fig: 'FIG. 16 · DWG VC-016',
      accent: 'amber',
      lang: 'en',
    },
  },
  // Plan 19 — newsletter archive card. Per-issue OG cards are deferred to
  // v2 (each issue points at this index card via newsletter/[slug].astro).
  {
    slug: 'newsletter-index',
    card: {
      title: 'Updates when vibecrafted ships.',
      subtitle: 'Operator-voice newsletter. One issue per real cut. No marketing, no drip, no popups.',
      eyebrow: 'Newsletter',
      fig: 'FIG. 19 · DWG VC-019',
      accent: 'amber',
      lang: 'en',
    },
  },
];

export function findOGSlug(slug: string): OGSlugDef | undefined {
  return OG_SLUGS.find((entry) => entry.slug === slug);
}
