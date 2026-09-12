/**
 * /rss.xml — the journal feed. Escapes XML entities itself so no dependency
 * (and no build step) is needed.
 */
import { articles, formatDate } from '../data/articles.js';
import { site } from '../data/site.js';
import { articleImage } from '../data/images.js';

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export function GET({ site: astroSite }) {
  const origin = (astroSite?.toString?.() ?? site.url).replace(/\/$/, '');

  const items = articles
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${origin}/blog/${a.slug}</link>
      <guid isPermaLink="true">${origin}/blog/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <author>${esc(site.email)} (${esc(a.author)})</author>
      <category>${esc(a.topic)}</category>
      <description>${esc(a.excerpt)}</description>
      <enclosure url="${origin}${articleImage(a.slug)}" type="image/jpeg"/>
    </item>`
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — Journal</title>
    <link>${origin}/journal</link>
    <description>${esc(site.description)}</description>
    <language>en-pk</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
