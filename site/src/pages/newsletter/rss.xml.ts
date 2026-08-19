/**
 * newsletter/rss.xml.ts — Plan 19 RSS 2.0 feed.
 *
 * Hand-written endpoint emitting a standards-compliant RSS 2.0 feed of
 * every entry in the `newsletter` content collection. No `@astrojs/rss`
 * dependency added — the surface is small enough to hand-roll, and
 * keeping deps minimal honors loctree-com BRAND.md anti-glow doctrine.
 *
 * Validated against the RSS 2.0 spec (https://www.rssboard.org/rss-specification):
 *   - <channel> with required title/link/description
 *   - per-item: title, link, guid (isPermaLink=true), pubDate (RFC-822),
 *     description (CDATA-wrapped HTML-safe summary)
 *   - <lastBuildDate> reflects max(item.pubDate) for cache-friendliness
 *   - <atom:link rel="self"> for self-discovery (RFC 4287 cross-link)
 *
 * Anti-aesthetic gates honored:
 *   - no tracking parameter on item links
 *   - no embedded image / enclosure ornament
 *   - no marketing copy in <description>
 *
 * Output: `dist/newsletter/rss.xml` as static asset at `pnpm build`.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://vibecrafted.io';
const FEED_TITLE = 'Vibecrafted newsletter';
const FEED_DESCRIPTION =
  'Operator-voice updates when vibecrafted ships. Markdown-first, no marketing.';
const FEED_LANGUAGE = 'en-us';

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function cdata(input: string): string {
  // RSS <description> often wraps HTML/free-form text; CDATA avoids the need
  // to entity-encode every character. Close the CDATA section safely by
  // splitting any embedded `]]>` sequences.
  const safe = input.split(']]>').join(']]]]><![CDATA[>');
  return `<![CDATA[${safe}]]>`;
}

function toRfc822(dateString: string): string {
  // Frontmatter dates are ISO-8601 (YYYY-MM-DD). Treat as midnight UTC for
  // deterministic, timezone-stable pubDate values.
  const date = new Date(`${dateString}T00:00:00Z`);
  return date.toUTCString();
}

export const GET: APIRoute = async () => {
  const issues = (await getCollection('newsletter')).sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  const latest = issues[0]?.data.date ?? new Date().toISOString().slice(0, 10);
  const lastBuildDate = toRfc822(latest);

  const items = issues
    .map((issue) => {
      const itemUrl = `${SITE_URL}/newsletter/${issue.id}/`;
      const pubDate = toRfc822(issue.data.date);
      return [
        '    <item>',
        `      <title>${escapeXml(issue.data.title)}</title>`,
        `      <link>${escapeXml(itemUrl)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(itemUrl)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${cdata(issue.data.summary)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/newsletter/</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>${FEED_LANGUAGE}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/newsletter/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=3600',
    },
  });
};
