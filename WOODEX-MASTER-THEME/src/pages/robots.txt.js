/**
 * /robots.txt — allows the marketing site, blocks the utility routes that are
 * already marked noindex (belt and braces for crawlers that ignore meta).
 */
import { site } from '../data/site.js';

export function GET({ site: astroSite }) {
  const origin = (astroSite?.toString?.() ?? site.url).replace(/\/$/, '');

  const body = `# ${site.legalName}
User-agent: *
Allow: /
Disallow: /search
Disallow: /thank-you
Disallow: /style-guide
Disallow: /instructions

# Google Images should index the portfolio
User-agent: Googlebot-Image
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
