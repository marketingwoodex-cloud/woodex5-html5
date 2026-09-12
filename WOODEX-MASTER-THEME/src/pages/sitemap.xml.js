/**
 * /sitemap.xml — generated from the data layer, so new projects, services and
 * articles appear automatically. No plugin, no runtime cost.
 */
import { services } from '../data/services.js';
import { projects } from '../data/projects.js';
import { articles } from '../data/articles.js';
import { site } from '../data/site.js';

const staticRoutes = [
  ['/', 1.0, 'weekly'],
  ['/home-one', 1.0, 'weekly'],
  ['/home-two', 0.9, 'monthly'],
  ['/home-three', 0.9, 'monthly'],
  ['/about', 0.9, 'monthly'],
  ['/process', 0.8, 'monthly'],
  ['/team', 0.7, 'monthly'],
  ['/careers', 0.6, 'weekly'],
  ['/awards', 0.5, 'yearly'],
  ['/clients', 0.5, 'yearly'],
  ['/materials', 0.7, 'monthly'],
  ['/sustainability', 0.6, 'yearly'],
  ['/faq', 0.7, 'monthly'],
  ['/testimonials', 0.7, 'monthly'],
  ['/service', 0.9, 'weekly'],
  ['/portfolio', 0.9, 'weekly'],
  ['/portfolio-one', 0.9, 'weekly'],
  ['/portfolio-two', 0.8, 'weekly'],
  ['/portfolio-three', 0.8, 'weekly'],
  ['/journal', 0.9, 'weekly'],
  ['/blog-one', 0.8, 'weekly'],
  ['/blog-two', 0.8, 'weekly'],
  ['/blog-three', 0.8, 'weekly'],
  ['/pricing-one', 0.9, 'monthly'],
  ['/contact-one', 0.8, 'yearly'],
  ['/contact-two', 0.8, 'yearly'],
  ['/contact-three', 0.8, 'yearly'],
  ['/style-guide', 0.2, 'yearly'],
  ['/instructions', 0.2, 'yearly'],
  ['/license', 0.1, 'yearly'],
  ['/changelog', 0.2, 'monthly'],
  ['/privacy', 0.2, 'yearly'],
  ['/terms', 0.2, 'yearly'],
  ['/accessibility', 0.3, 'yearly'],
];

export function GET({ site: astroSite }) {
  const origin = (astroSite?.toString?.() ?? site.url).replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);

  const urls = [
    ...staticRoutes.map(([path, priority, changefreq]) => ({ path, priority, changefreq, lastmod: today })),
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8, changefreq: 'monthly', lastmod: today })),
    ...projects.map((p) => ({ path: `/project/${p.slug}`, priority: 0.8, changefreq: 'monthly', lastmod: today })),
    ...articles.map((a) => ({ path: `/blog/${a.slug}`, priority: 0.7, changefreq: 'monthly', lastmod: a.date?.slice(0, 10) ?? today })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${origin}${u.path}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
