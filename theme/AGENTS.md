# AGENTS.md — Woodex Master Theme customization rules

For AI coding agents (Codex, Claude, Kimi, Cursor, …) and humans. Follow these rules exactly.

## The three golden rules

1. **Content lives in `assets/data/*.json`** — services, projects, articles, testimonials, pricing, FAQs, team, process, navigation, site settings. Never hardcode collection content in HTML.
2. **Structure lives in `templates/`** — sections (`templates/sections/`), headers, footers, page skeletons. Pages compose them.
3. **Skin lives in `assets/css/tokens.css`** — every color, font, radius, shadow, easing. Never hardcode a hex value in `components.css` / `sections.css` / a page.

## What to edit for common tasks

| Task | File(s) |
|---|---|
| Re-skin colors / fonts / radius | `assets/css/tokens.css` only |
| Change nav, mega menu, footer links | `assets/data/navigation.json` |
| Change phone / email / address / socials | `assets/data/site.json` |
| Add / edit a project | `assets/data/projects.json` (then `node build.mjs detail` for a static page) |
| Add / edit a service | `assets/data/services.json` |
| Add / edit an article | `assets/data/articles.json` |
| Reorder sections on a page | cut/paste `<section>` blocks in the page HTML |
| New page | copy `templates/pages/inner-skeleton.html`, set `data-header` / `data-footer` |
| New section style | build it in a page between an `Sxx` comment marker and `<section>…</section>`, then `node build.mjs templates` |

## Attributes cheat sheet

- `<body data-header="transparent|light|dark|centered|side">` — header variant
- `<body data-footer="classic|compact|cta">` — footer variant
- `data-api="projects|services|articles|team|testimonials|pricing"` + `data-limit`, `data-filter="key:value"`, `data-order="desc"`, `data-rows` — hydrate a list from JSON
- `data-reveal="up|fade|left|right|zoom|blur|mask"` + `data-reveal-delay="0–8"` — scroll reveals
- `data-counter="250" data-suffix="+"` — odometer
- `data-filters="#grid-id"` on a `.wx-filters` bar — chips filter `[data-category]` children
- `data-billing` toggle group — switches `[data-price-onetime]` / `[data-price-monthly]`
- `data-parallax="0.15"` — scroll drift for media

## Never do

- Do not edit `assets/js/theme.js` engine internals to change content or styling.
- Do not copy the rendered `<header>`/`<footer>` from browser devtools into pages — they are injected; edit `navigation.json` / `site.json`.
- Do not link to `project.html?slug=…` — link to `project/{slug}.html` (static, prerendered). The `?slug=` routes are fallbacks only.
- Do not remove `data-reveal` fallback handling or `prefers-reduced-motion` rules.
- Do not introduce build dependencies (React, jQuery, SCSS). Vanilla HTML/CSS/JS + JSON only.

## After editing

```bash
node build.mjs        # refresh static detail pages + data-api fills + templates
```

Verify in a browser served over HTTP (`python3 -m http.server 4174 --bind 0.0.0.0`). Opening files via `file://` will not load the JSON layer.

## Conventions

- `wx-` class prefix; BEM-ish naming (`wx-card__media`).
- Surface scopes: `.wx-light`, `.wx-dark`, `.wx-beige-surface` on `<section>` — they swap all token variables.
- Icons: inline SVG stroke set in `render.js` `ICONS` — add new names there, never import icon fonts.
- Images: local `assets/images/`, `loading="lazy"` below the fold, eager + `fetchpriority="high"` for hero media.
- Accessibility: every interactive element keyboard-reachable; visible focus; `aria-expanded` on disclosure buttons; alt text on content images.
