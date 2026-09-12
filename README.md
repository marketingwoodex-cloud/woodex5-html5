# Woodex Interior — HTML5 Website

Premium, human, modern interior design website for Woodex Interior, Lahore.

## Source of truth

**`theme/` is the master theme.** Edit `theme/src/`, run the generator, and the
finished site is written to this folder.

```bash
node theme/build.mjs
```

The HTML at the repository root is generated output. Do not hand-edit it — the
next build overwrites it. Zero dependencies, Node 18 or newer, no install step.

| Read this | For |
|---|---|
| [`theme/README.md`](theme/README.md) | Quick start, layout, template syntax, common tasks |
| [`theme/docs/design.md`](theme/docs/design.md) | Master PRD: identity, tokens, architecture, all 45 sections, all 56 pages, JSON API, motion, accessibility, image manifest, customisation guide |

## Preview

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Serve from the repository root — generated pages use relative asset paths that
assume root depth.

## What the theme contains

- **56 pages**: three home variants, about, service index plus 15 service
  detail pages, three portfolio variants plus 10 project case studies, two
  journal indexes plus 8 long-form articles, three contact variants, pricing,
  FAQ, process, instructions, style guide, 404, privacy, terms, accessibility
  and thank-you.
- **45 section templates**, each a single `.s-*` root driven entirely by
  parameters, reusable across pages with different content.
- **Header and footer variations**, a mega-menu option, and a mobile drawer.
- **Content-driven**: 16 JSON collections in `assets/data/`, served at runtime
  so editors can change content without a rebuild.
- **Motion**: IntersectionObserver reveals, word-split headings, marquees,
  parallax, sticky columns, Ken Burns, magnetic buttons, tilt, count-ups and a
  curtain transition. Vanilla JS and CSS only — no GSAP, no framework, no CDN.
- **Accessibility**: one `<h1>` per page, full landmark set, skip link, visible
  focus, and every animation disabled under `prefers-reduced-motion` or
  `data-motion="off"`.

## Content data

```text
assets/data/
├── site.json          business identity, contact, socials
├── navigation.json    header, mega menu, footer, drawer
├── services.json      15 services
├── projects.json      10 case studies
├── posts.json         8 journal articles
├── pricing.json       packages and the basis toggle
├── faqs.json          24 questions across 5 categories
├── process.json  team.json  awards.json  stats.json
├── testimonials.json  clients.json  locations.json
└── defaults.json      site-wide fallback for every section parameter
```

To add a service, project or article, append an object to the matching file.
Detail pages are generated automatically — no page registration needed.

## Assets

```text
assets/css/    01-tokens … 09-docs, concatenated in filename order
assets/js/     util → api → chrome → motion → sections → forms → theme
assets/images/ original imagery and the brand mark
```

All imagery is original work made for this project. Nothing hotlinks a third
party's CDN. Fonts load from Google Fonts with Georgia and system fallbacks, so
the site stays legible if the request fails.

While a manifest image is still pending, its frame renders a branded
placeholder rather than a broken image. Adding a file with the right name
replaces it with no template or data change. Status per file is in
`theme/docs/design.md` §12.

## Legacy prototypes

`company-index.html`, `journal.html`, `portfolio.html` and `services.html` are
earlier prototypes. They cross-link only each other; no theme page reaches
them. `WOODEX-INT/` preserves copies and `WOODEX-WP/` holds the WordPress
conversion. They are kept for reference and can be removed once you are happy
the master theme supersedes them.

## Before production launch

Content that needs your approval:

- Official WhatsApp number and email
- Service cities
- Project names, locations and metrics
- Approved project photography
- Testimonials and client logos
- Warranty and 3D guarantee wording
- Legal entity and privacy details
- Form endpoint — the form validates client-side and needs a backend to post to
- Analytics

## Deployment

Static output. Upload the repository root to GitHub Pages, Netlify, Vercel,
Cloudflare Pages, or any Apache or Nginx host. For GitHub Pages, enable Pages
from the branch containing the built root.

## Status

Structurally complete and building warning-free. All 56 pages pass the QA gates
in `theme/docs/design.md` §14: one `<h1>` each, balanced markup, full landmarks,
every internal link resolving, all 103 JSON-LD blocks valid, no unrendered
template tokens. Remaining work is the 12 pending manifest images and the
business approvals listed above.
