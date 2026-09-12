# Deployment

## Build

```bash
cd WOODEX-MASTER-THEME
npm install
npm run build          # runs ensure-images + make-icons first (prebuild)
```

Output: fully static HTML/CSS/JS in `dist/` — 72 pages, ~9.5 MB including imagery.
No server runtime, no database, no Node process in production.

`npm run prebuild` automatically:

1. regenerates `src/generated/image-map.json` and any missing SVG placeholders
   (`scripts/ensure-images.mjs`),
2. regenerates the favicon/PWA icon set if absent (`scripts/make-icons.mjs`).

## Local preview

```bash
npm run dev            # http://localhost:4321 — dev server with HMR
npm run preview        # serve the built dist/ locally
```

## Hosting

Any static host works. Recommended configurations:

| Host | Setting |
| --- | --- |
| Netlify / Cloudflare Pages | Build `npm run build`, publish directory `dist` |
| Vercel | Framework preset **Astro** (auto-detected) |
| GitHub Pages | Publish `dist/`; set `site` and `base` in `astro.config.mjs` |
| Nginx / Apache / cPanel | Upload the contents of `dist/` to the web root |
| S3 + CloudFront | Sync `dist/`, default document `index.html`, error document `404.html` |

### Server notes

- `dist/404.html` is generated — point your host's error document at it.
- `dist/sitemap.xml`, `dist/robots.txt` and `dist/rss.xml` are generated at build
  time from the data layer; there is nothing to maintain by hand.
- Serve `.svg` placeholders with a long cache header. They are replaced by real
  photography at the same path only when you decide to.
- Long-cache hashed assets: Astro emits hashed files under `/_astro/`. Cache those
  for a year; keep HTML short-cache.

## Domain & SEO checklist

1. Set `site` in `astro.config.mjs` to the production origin — it is used for
   canonical URLs, the sitemap and the RSS feed.
2. Confirm `site.url` in `src/data/site.js` matches.
3. Submit `/sitemap.xml` to Google Search Console.
4. Verify `site.seo.defaultTitle` and `description` render on the homepage.
5. Replace the OG image at `/images/og/og-default.jpg` with a branded card.

## Environment

None required. There are no API keys, no analytics by default and no third-party
requests on page load — maps are click-to-load and fonts are system stacks.

## Rollback

The build is deterministic and static: keep the previous `dist/` and re-point the
host, or redeploy the previous commit. There is no database migration to reverse.
