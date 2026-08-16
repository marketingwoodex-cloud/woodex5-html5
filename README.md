# Woodex Interior — HTML5 Website

Premium, human, modern interior design website for Woodex Interior.

## Project

This repository contains the production-ready HTML5 prototype for Woodex Interior:

- Semantic HTML5 pages
- Local CSS and JavaScript
- Local image assets
- JSON-ready content files
- Responsive layouts
- Services dropdown
- Mobile navigation drawer
- Three-slide hero
- Scroll reveal motion
- Portfolio and service page structure
- Contact form draft
- Legal and utility pages

## Open locally

From this folder, run:

```bash
python3 -m http.server 4174 --bind 0.0.0.0
```

Then open:

```text
http://localhost:4174/index.html
```

## Main files

- `index.html` — homepage
- `company-index.html` — company draft
- `about.html` — company story
- `services.html` — complete services index
- `portfolio.html` — portfolio index
- `process.html` — process page
- `journal.html` — journal index
- `contact.html` — consultation form draft
- `thank-you.html` — form success page
- `404.html` — not-found page
- `privacy.html` — privacy draft
- `terms.html` — terms draft
- `accessibility.html` — accessibility statement

## Service pages

The `services/` folder contains 15 service pages:

- Commercial Interior
- Residential Interior
- Office & Corporate
- Retail & Shop
- Brand Shop & Outlet
- Office Fit-Out
- Commercial Fit-Out
- Residential Fit-Out
- Restaurant Interior
- Cafe Interior
- Custom Furniture & Joinery
- Interior Renovation
- Turnkey Interiors
- 3D Studio
- Office Furniture

## Content data

JSON-ready content is stored in:

```text
assets/data/
├── site.json
├── navigation.json
├── services.json
├── projects.json
└── articles.json
```

The content model is prepared for future CMS or React conversion.

## Assets

Local assets live in:

```text
assets/images/
assets/css/site.css
assets/js/main.js
```

No critical production content depends on remote images, remote fonts, or remote scripts.

## Before production launch

Replace or verify:

- Official Pakistan WhatsApp number
- Official email
- Service cities
- Project names and locations
- Project photography
- Testimonials and client logos
- Project metrics
- Warranty wording
- 3D guarantee wording
- Legal entity and privacy details
- Form endpoint

## Deployment options

This is a static website and can be uploaded to:

- GitHub Pages
- Netlify
- Vercel static hosting
- Cloudflare Pages
- Any Apache/Nginx hosting

For GitHub Pages, upload the contents of this folder to the repository root and enable Pages from the main branch.

## Current status

Technically complete prototype. Business content, approved photography, form backend, analytics, and final legal copy remain approval items.
