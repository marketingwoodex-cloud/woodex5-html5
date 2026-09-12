# WOODEX MASTER THEME — design.md
### Master PRD · Theme Plan · Page & Section Template System · Frontend API
**Project:** Woodex Interior — Premium Interior Architecture HTML5 Master Theme
**Repo:** `woodex5-html5` · **Theme root:** `/theme` · **Version:** 1.0
**Date:** September 2026 · **Status:** Build in progress → Ready to start Woodex Interior project

---

## 0. HOW TO READ THIS DOCUMENT

| You want to… | Go to |
|---|---|
| Understand the whole theme plan | §1–§4 |
| Change colors / fonts / spacing | §4 Design Tokens → edit `theme/assets/css/tokens.css` |
| Add or reorder a section on a page | §7 Section Library → copy from `theme/templates/sections/` |
| Build a new page | §8 Page Templates → start from `theme/templates/pages/` |
| Change header / footer / mega menu per page | §6 Header & Footer System |
| Edit content without touching HTML | §9 Frontend API → edit `theme/assets/data/*.json` |
| Tune animations & scroll motion | §5 Motion System |
| Hand the theme to an AI agent (Codex/Claude/Kimi) | §11 AI Agent Guide + `theme/AGENTS.md` |
| Deploy | §12 Build & Deploy |

---

## 1. EXECUTIVE SUMMARY

**Goal.** Ship a complete, multi-page, production-ready HTML5 master theme for **Woodex Interior** — a premium interior architecture & fit-out studio marketing to clients across Pakistan (Lahore · Islamabad · Karachi) and worldwide. The theme is a **structural replica of the reference template family** (Linoxa Webflow template page architecture: 3 homes, about, services, portfolios, project details, blogs, pricing, contacts, style guide, instructions) — implemented with **100% original code, original copy, and original AI-generated imagery**, rebranded for Woodex.

**What "master theme" means here:**

1. **Every section is a template.** ~30 section blocks live in `theme/templates/sections/` as copy-paste snippets with usage docs.
2. **Every page is a composition.** Page skeletons live in `theme/templates/pages/`; each real page is just header variant + ordered sections + footer variant.
3. **Headers & footers change per page.** 5 header variants and 3 footer variants, switched with one `data-` attribute — including a **mega menu** for Services and Portfolio.
4. **Content is data.** All collections (services, projects, articles, testimonials, pricing, FAQ, team, process) are JSON files — the **frontend API**. Edit JSON → the site updates.
5. **Motion is a system.** One scroll-reveal engine, odometer counters, marquees, parallax, hero transitions — all declarative via `data-` attributes, all respecting `prefers-reduced-motion`.
6. **AI-agent friendly.** `theme/AGENTS.md` gives Codex/Claude/Kimi (and humans) a precise map of what to touch and what never to touch.

**Non-goals:** no backend, no auth, no CMS admin UI, no page builder. Static HTML + CSS + vanilla JS + JSON only. Zero build step required to run (an optional prerender script exists for SEO).

---

## 2. REFERENCE ANALYSIS (STRUCTURAL SCAN)

Scanned pages (structure & motion only — all code and copy in this theme are original):

| Reference page | Sections found (top → bottom) |
|---|---|
| Home One | fixed header · hero (eyebrow + display H1 + sub + pill CTA + stacked image cards + slide dots) · image trio with captions · stats odometer · trust bar (avatars + rating) · big statement with inline media · video block with play toggle · about split (image + copy + checkmarks + CTA) · feature split (image + copy + link list + CTA) · tabs/cards (Building / Consultation / 3D modeling) · large flowing statement + inline images · portfolio grid (hover overlay cards) · CTA band · footer |
| Home Two | fullscreen slider hero (rotating display headlines + description + CTA) · partner logo marquee (double-row infinite) · content marquee w/ logo interleave · big split statements · services · portfolio · process · blog · CTA · footer |
| Home Three | video-style hero (title + sub + CTA) · statement heading · 4 odometer stats w/ captions · portfolio grid (dated cards) · service links w/ hover image previews · FAQ accordion · logo marquee · CTA · footer |
| About | hero w/ stacked images · statement split · 3 stats · video block · 3 hover feature cards (image stacks) · marquee statement · FAQ accordion · CTA · footer |
| Service | hero (eyebrow + H1 + CTA + description) · logo marquee · about split w/ stat · 2 icon feature cards · image split + checklist · portfolio strip · 3 service cards · pricing cards · process · CTA · footer |
| Portfolio Two | page hero (breadcrumb + H1 + description) · CMS project cards (image, date, title, hover overlay) · featured wide project card · more cards · CTA · footer |
| Project detail | breadcrumb + H1 · hero image · meta grid (Services / Type / Date / Client) · gallery (4 images) · rich-text overview + project files list · related projects · CTA · footer |
| Contact Three | H1 · info cards (office / phones / email) · form (underlined inputs + pill submit + states) · CTA band · footer |
| Style Guide | colors · typography scale (H1 5rem/112.5%/500 → H6) · body/sub/button text · shadows · logo & favicons · buttons (2 styles) · lists · icons & socials · avatars · inputs & states · rich text · CTA · footer |

**Motion inventory observed (re-implemented from scratch):** scroll fade-up reveals with stagger, odometer digit roll on scroll, infinite logo/text marquees, hero slide cross-fades with background drift, image hover zoom + overlay slides, circular-arrow button micro-interaction, accordion open/close, header background state change on scroll, cursor-change image preview on service links.

**Design language extracted:** charcoal `#111`/`#000` + warm beige `#fcf2e8` + navy `#0f1e36`; 500-weight headings, huge tight display sizes; uppercase eyebrows; pill buttons with circular arrow chip; rounded (squircle) cards and images; generous whitespace; editorial photography.

---

## 3. BRAND FOUNDATION — WOODEX INTERIOR

| Item | Value |
|---|---|
| Name | **Woodex Interior** (wordmark: `WOODEX` + `INTERIOR` kicker) |
| Positioning | Premium interior architecture & turnkey fit-out studio — "Designed around you, built to last." |
| Market | Pakistan nationwide — Lahore · Islamabad · Karachi · + international remote design |
| Contact (replace before launch) | Studio: 14-C, Sector Z, DHA Phase 6, Lahore · +92 300 000 0000 · hello@woodexinterior.com |
| Service groups | **Interior Design** (residential, commercial, office) · **Fit-Out** (retail, office, turnkey) · **Hospitality** (café, restaurant) · **Specialist** (custom joinery & furniture, 3D studio, renovation) |
| Voice | Warm, confident, craft-led. Short sentences. Concrete materials (oak, travertine, brass, linen). No jargon. |
| CTA language | "Start a project" · "Book a consultation" · "View our work" · "Get in touch" |
| Proof points | 250+ projects delivered · 15 years of craft · 98% on-time handover · 10-year joinery warranty |

---

## 4. DESIGN TOKENS

Single source of truth: **`theme/assets/css/tokens.css`** (imported first by `theme.css`). Every component reads these variables. Change once → whole theme re-skins.

### 4.1 Color

```css
:root{
  /* Core surfaces */
  --wx-ink:        #17130E;  /* warm near-black — dark sections, headings on light */
  --wx-ink-2:      #241E16;  /* raised dark surface */
  --wx-ink-3:      #2E271D;  /* hover dark surface */
  --wx-paper:      #FAF6EF;  /* warm ivory — light sections */
  --wx-beige:      #F1E9DC;  /* alt light surface, cards on paper */
  --wx-sand:       #E5DACA;  /* borders on light, subtle fills */

  /* Brand accent — oak */
  --wx-wood:       #A87848;  /* primary accent, links, active states */
  --wx-wood-deep:  #7E5630;  /* accent hover, fills */
  --wx-wood-soft:  #C9A273;  /* accent on dark */

  /* Support */
  --wx-muted:      #6F665B;  /* secondary text on light */
  --wx-muted-inv:  #B7AD9F;  /* secondary text on dark */
  --wx-line:       #E3DACB;  /* hairlines on light */
  --wx-line-inv:   #3A3226;  /* hairlines on dark */
  --wx-white:      #FFFFFF;
  --wx-success:    #3E7C4F;
  --wx-error:      #B4452F;
}
```

**Palette rules:** light sections = `paper`/`beige`; dark sections = `ink`. Accent `wood` is used sparingly: eyebrows, links, active dots, small fills — never large backgrounds. Status colors only for form states.

### 4.2 Typography

Fonts (Google Fonts CDN in every page `<head>`; see §12 for self-hosting):
- **Display** — `Fraunces` (serif, optical sizing) — H1–H4, big statements, prices. Weights 400/500/600.
- **UI / Body** — `Manrope` — body, buttons, nav, labels, meta. Weights 400/500/600/700.

| Token | Size | Line | Weight / font | Use |
|---|---|---|---|---|
| `--wx-d1` | `clamp(3.25rem, 7.5vw, 5.75rem)` | 1.04 / −0.02em | 500 Fraunces | Hero display (reference: 5rem) |
| `--wx-d2` | `clamp(2.75rem, 5vw, 4.5rem)` | 1.08 | 500 Fraunces | Section statements, page H1 |
| `--wx-h2` | `2.8125rem` | 1.22 | 500 Fraunces | H2 |
| `--wx-h3` | `1.875rem` | 1.33 | 500 Fraunces | H3 |
| `--wx-h4` | `1.5625rem` | 1.28 | 500 Fraunces | H4 |
| `--wx-h5` | `1.25rem` | 1.5 | 500 Manrope | H5 |
| `--wx-h6` | `1.125rem` | 1.55 | 400 Manrope | H6 |
| `--wx-body` | `1rem` | 1.62 | 400 Manrope | Body |
| `--wx-sub` | `0.875rem` | 1.85 | 400 Manrope | Sub text, meta |
| `--wx-btn` | `0.9375rem` | 1.62 | 600 Manrope | Buttons |
| `.wx-eyebrow` | `0.75rem` | 1.4 | 600 Manrope · uppercase · `0.18em` tracking · wood color | Labels above headings |

### 4.3 Space, radius, shadow, z-index

```css
:root{
  --wx-space-1:.25rem; --wx-space-2:.5rem; --wx-space-3:.75rem; --wx-space-4:1rem;
  --wx-space-5:1.5rem; --wx-space-6:2rem; --wx-space-7:3rem; --wx-space-8:4rem;
  --wx-space-9:6rem; --wx-space-10:8rem;
  --wx-section: clamp(5.5rem, 10vw, 8.75rem);      /* vertical section padding */
  --wx-container: 1240px;                          /* max content width */
  --wx-gutter: clamp(1.25rem, 4vw, 4.5rem);
  --wx-r-pill: 999px; --wx-r-lg: 28px; --wx-r-md: 20px; --wx-r-sm: 12px;
  --wx-shadow-sm: 0 2px 10px rgba(23,19,14,.06);
  --wx-shadow-md: 0 12px 40px rgba(23,19,14,.10);
  --wx-shadow-lg: 0 30px 80px rgba(23,19,14,.16);
  --wx-ease: cubic-bezier(.22,.7,.24,1);           /* signature easing */
  --wx-dur: .6s;  --wx-dur-fast: .3s;
  --wx-z-header:90; --wx-z-drawer:100; --wx-z-mega:80; --wx-z-toast:120;
}
```

### 4.4 Buttons (2 styles, pill DNA)

| Class | Look | Anatomy |
|---|---|---|
| `.btn` (style one) | Filled ink pill, white label, circular arrow chip that slides on hover | `<a class="btn"><span>Start a project</span><i class="btn-chip" aria-hidden="true">→</i></a>` |
| `.btn-outline` (style two) | 1px ink border pill; fill sweeps in on hover, arrow flips color | same anatomy |
| Variants | `.btn-light` (on dark), `.btn-wood` (accent fill), `.btn-sm` | |
| States | `:hover` chip translateX 4px + rotate −45°→0°; `:focus-visible` 2px wood outline offset 4px; `:active` scale .97 | |

### 4.5 Imagery

Original AI-generated set in `theme/assets/images/` — 20 photographs, all license-safe:
`hero-01/02/03` · `about-studio` · `craft-detail` · `lounge` · `dining` · `kitchen` · `workspace` · `facade` · `apartment` · `bedroom-min` · `loft` · `villa` · `cafe` · `retail` · `materials` · `model` · `3d-studio` · `workshop`
Treat every photo with `filter: saturate(.96) contrast(1.02)`. Dark sections may use `brightness(.9)`. Aspect ratios via CSS (`aspect-ratio` + `object-fit: cover`). Grain overlay class `.wx-grain` available for hero media.

---

## 5. MOTION & ANIMATION SYSTEM

Implemented once in **`theme/assets/js/theme.js`** — no per-page JS needed. Everything is **declarative via data attributes**.

### 5.1 Scroll reveals (the core engine)

```html
<div data-reveal>                 <!-- fade-up 24px, default -->
<div data-reveal="fade">          <!-- opacity only -->
<div data-reveal="left|right">    <!-- slide from side -->
<div data-reveal="zoom">          <!-- scale .92 → 1 -->
<div data-reveal="blur">          <!-- blur(8px) → 0 -->
<div data-reveal="mask">          <!-- image clip-path wipe (use on <img> wrappers) -->
<div data-reveal-delay="2">       <!-- stagger: 0…8 → 0.12s steps -->
```
IntersectionObserver at `threshold: .15`, unobserve after reveal. Children of `[data-reveal-group]` auto-stagger in DOM order.

### 5.2 Signature effects

| Effect | Attribute / class | Notes |
|---|---|---|
| Odometer counters | `<span data-counter="250" data-suffix="+">0</span>` | digit roll on enter, 1.4s, ease-out |
| Marquee | `.wx-marquee` (+ `.wx-marquee--reverse`, `.wx-marquee--slow`) | CSS infinite scroll, duplicated track, pauses on hover |
| Hero slide cross-fade | `.hero` engine in theme.js | Ken-Burns drift + dot controls + autoplay 6.5s, pause on hover |
| Line-split headline | `.wx-lines` | JS wraps each line; spans rise 110%→0 with stagger |
| Parallax | `data-parallax="0.15"` (speed 0–0.3) | transform on rAF scroll, disabled on touch + reduced-motion |
| Hover image preview | `.service-links a` | floating preview image follows cursor on desktop |
| Card hover | `.card-media img` | scale 1→1.06, overlay slides up, arrow chip rotates |
| Header state | `header[data-header]` | transparent → solid + shadow after 24px scroll |
| Scroll progress | `.wx-progress` (auto-injected) | 2px wood bar, top of viewport |
| Accordion | `.wx-accordion` | height animation, one-open default, `data-multi` to allow many |

### 5.3 Performance & accessibility rules

1. Animate **only** `transform` / `opacity` / `filter` — 60fps.
2. `@media (prefers-reduced-motion: reduce)`: all reveals visible instantly, marquees static, parallax & autoplay off, transitions ≤ 0.01s.
3. Hero images `loading="eager"` + `fetchpriority="high"`; everything below fold `loading="lazy"`.
4. Focus states never removed; drawers trap focus; Esc closes mega menu/drawer.

---

## 6. HEADER & FOOTER SYSTEM (multi-page changing + mega menu)

Headers/footers are **injected by `theme.js` from `assets/data/navigation.json`**, so a nav edit happens in exactly one place. Each page chooses its variants:

```html
<body
  data-header="transparent"   <!-- transparent|light|dark|centered|side -->
  data-footer="classic">      <!-- classic|compact|cta -->
```

### 6.1 Header variants (`theme/templates/headers/`)

| Variant | File | Use on |
|---|---|---|
| `transparent` | `h1-transparent.html` | Pages with a hero image/video at top: all 3 homes, portfolio-two/three, blog-two, contact-two — starts transparent (light text), scrolls to solid paper |
| `light` | `h2-light.html` | Inner pages on paper bg: about, services, portfolio-one, blog-one, style-guide, instructions, pricing-one |
| `dark` | `h3-dark.html` | Dark-hero inner pages: pricing-two, contact-three |
| `centered` | `h4-centered.html` | Elegant centered layout for project pages / editorial pages |
| `side` | `h5-side.html` | Optional left-dock nav (portfolio-three showcase) |

Shared anatomy: wordmark (`WOODEX` + kicker) · nav links (About, Services ▾, Portfolio ▾, Blog ▾, Contact) · phone/CTA pill · burger (≤1024px). `aria-current="page"` auto-set by matching `location.pathname`.

### 6.2 Mega menu options (driven by `navigation.json`)

| Menu | Type | Contents |
|---|---|---|
| **Services** | mega (3-col + feature) | Columns by group: *Interior Design / Fit-Out / Hospitality+Specialist* → top 6 services with one-line summaries + right rail: featured service card (image + CTA) + "View all services" |
| **Portfolio** | mega (media cards) | 3 latest projects as image cards + quick links (Portfolio One/Two/Three) + "Start a project" CTA |
| **Homes** | dropdown list | Home One / Two / Three with tiny thumbnails |
| **Blog** | dropdown list | Blog One / Blog Two |
Mega menu opens on hover (desktop) / tap (touch), full-width panel under header, closes on Esc/outside. Mobile drawer: full-screen ink panel, grouped accordion (Services group → projects), CTA at bottom.

### 6.3 Footer variants (`theme/templates/footers/`)

| Variant | File | Anatomy |
|---|---|---|
| `classic` | `f1-classic.html` | Top: big serif statement + CTA pill · mid: 4 columns (brand+about, Quick links, Services, Contact info + socials) · bottom: © line, links (privacy/terms), big ghost wordmark |
| `compact` | `f2-compact.html` | Single row brand · nav · socials · © (for utility pages) |
| `cta` | `f3-cta.html` | Newsletter band (email input + pill button) then compact footer |

---

## 7. SECTION LIBRARY — every section is a template

Canonical snippets live in **`theme/templates/sections/`** — each file is a standalone, commented, copy-paste-ready block (name, purpose, variants, data source). Sections in real pages are wrapped with extraction markers so `build.mjs` keeps snippets in sync.

| ID | File | Section | Used on |
|---|---|---|---|
| S01 | `s01-hero-slider.html` | **Hero slider** — eyebrow, display H1, sub, CTA row, stacked image cards w/ captions, dots, autoplay | Home One |
| S02 | `s02-hero-showcase.html` | **Fullscreen showcase hero** — 3 rotating headline slides, crossfade + drift, side meta | Home Two |
| S03 | `s03-hero-media.html` | **Media hero** — full-bleed image/video frame, title, sub, play toggle | Home Three |
| S04 | `s04-hero-page.html` | **Inner page hero** — breadcrumb, H1, description, optional CTA | all inner pages |
| S05 | `s05-ticker.html` | **Statement ticker** — giant marquee text w/ inline images/logo chips | Home 1/2, About |
| S06 | `s06-stats.html` | **Stats odometers** — 3–4 counters w/ captions (light or dark) | Home 1/3, About, Service |
| S07 | `s07-intro-split.html` | **About intro split** — image stack + copy + signature stats + CTA | Home One, About |
| S08 | `s08-services-grid.html` | **Services grid** — numbered cards (01–06), hover lift + arrow | Home One, Service |
| S09 | `s09-services-showcase.html` | **Services showcase** — sticky image + accordion service list | Home Two, Service |
| S10 | `s10-services-links.html` | **Service link rows** — full-width rows, hover cursor image preview, tags | Home Three, Service |
| S11 | `s11-portfolio-grid.html` | **Portfolio grid** — filterable card grid (All/Residential/Commercial/…), hover overlay | Portfolio One |
| S12 | `s12-portfolio-cards.html` | **Portfolio cards** — editorial cards w/ date + category, 2-col | Home Three, Portfolio Two |
| S13 | `s13-portfolio-feature.html` | **Featured project** — big split card w/ meta + CTA | Portfolio Two/Three |
| S14 | `s14-project-detail.html` | **Project detail body** — meta grid, overview rich text, files/deliverables, gallery, related | Project pages |
| S15 | `s15-blog-grid.html` | **Blog grid** — cards w/ category chip, date, read time | Blog One |
| S16 | `s16-blog-feature.html` | **Blog feature** — large first post + horizontal list | Blog Two |
| S17 | `s17-testimonials.html` | **Testimonials slider** — quote, monogram avatar, role, rating dots | Home One/Two, Service |
| S18 | `s18-logos.html` | **Partner logo marquee** — infinite double-row (text/SVG logos) | Home Two, About, Service |
| S19 | `s19-faq.html` | **FAQ accordion** — one-open accordion, category intro | Home Three, About, Pricing |
| S20 | `s20-process.html` | **Process steps** — 4–5 numbered steps, line connector, reveal stagger | Home Two, Service, About |
| S21 | `s21-team.html` | **Team grid** — portrait card (image/monogram), name, role, socials | About |
| S22 | `s22-pricing-cards.html` | **Pricing cards** — 3 tiers, billing toggle (one-time/monthly), featured tier | Service, Pricing One |
| S23 | `s23-pricing-list.html` | **Pricing rows** — package rows w/ includes list + CTA | Pricing Two |
| S24 | `s24-cta.html` | **CTA banner** — big serif line, sub, pill CTA, bg image or ink | nearly all pages |
| S25 | `s25-contact-cards.html` | **Contact info cards** — studio/phone/email cards w/ icons | Contact One/Three |
| S26 | `s26-contact-form.html` | **Contact form** — underlined inputs, select, textarea, pill submit, success/error states | Contact pages |
| S27 | `s27-newsletter.html` | **Newsletter band** — inline email + submit + note | Blog, footer-cta |
| S28 | `s28-gallery-marquee.html` | **Image marquee** — infinite photo strip | Home Two, About |
| S29 | `s29-value-cards.html` | **Value cards** — icon cards (materials, delivery, warranty…) | Service, About |
| S30 | `s30-split-media.html` | **Split media** — copy + parallax image, checkmark list, CTA | Home One, About, Service |
| S31 | `s31-rich-text.html` | **Rich text** — article typography (h2–h4, lists, quote, figure) | Blog posts, project overview |
| S32 | `s32-map.html` | **Map block** — styled studio map placeholder w/ address overlay | Contact Two |
| S33 | `s33-related.html` | **Related cards** — "More projects / More articles" 2–3 cards | Project & blog detail |
| S34 | `s34-filter-bar.html` | **Filter chips** — category filter bar for grids | Portfolio One, Blog One |

---

## 8. PAGE TEMPLATES — composition maps

17 pages + 3 dynamic detail routes. Skeletons in `theme/templates/pages/`.

| Page | Header | Footer | Section order |
|---|---|---|---|
| **index.html — Home One** | transparent | classic | S01 hero-slider → S05 ticker → S06 stats (dark) → S30 split-media (about) → S08 services-grid → S17 testimonials → S12 portfolio-cards → S20 process → S15 blog-grid (3) → S24 CTA |
| **home-two.html — Home Two** | transparent | classic | S02 hero-showcase → S18 logos → S28 gallery-marquee → S07 intro-split → S09 services-showcase → S13 portfolio-feature → S06 stats → S20 process → S16 blog-feature → S24 CTA |
| **home-three.html — Home Three** | transparent | classic | S03 hero-media → S06 stats → S12 portfolio-cards (dated) → S10 services-links → S19 FAQ → S18 logos → S24 CTA |
| **about.html** | light | classic | S04 hero-page → S07 intro-split → S06 stats → S21 team → S29 value-cards → S28 gallery-marquee → S19 FAQ → S24 CTA |
| **services.html** | light | classic | S04 hero-page → S18 logos → S08 services-grid (all) → S09 services-showcase → S30 split-media → S22 pricing-cards → S20 process → S17 testimonials → S24 CTA |
| **service-detail.html** (`?slug=`) | light | classic | S04 hero-page (service) → S30 split-media → S29 value-cards → S20 process (service steps) → S13 portfolio-feature (related work) → S24 CTA |
| **portfolio-one.html** | light | classic | S04 hero-page → S34 filter-bar + S11 portfolio-grid (all projects) → S24 CTA |
| **portfolio-two.html** | transparent | classic | S04 hero-page (over image) → S12 portfolio-cards → S13 portfolio-feature → S12 portfolio-cards → S24 CTA |
| **portfolio-three.html** | side | classic | S04 hero-page → S11 portfolio-grid (masonry variant) → S24 CTA |
| **project.html** (`?slug=`) | centered | classic | S04 hero-page (project) → S14 project-detail (meta, overview, gallery) → S33 related → S24 CTA |
| **blog-one.html** | light | cta | S04 hero-page → S34 filter-bar + S15 blog-grid (all) → S27 newsletter |
| **blog-two.html** | transparent | cta | S04 hero-page (over image) → S16 blog-feature → S15 blog-grid → S27 newsletter |
| **blog-post.html** (`?slug=`) | light | cta | S04 hero-page (post) → S31 rich-text → S33 related → S27 newsletter |
| **pricing-one.html** | light | classic | S04 hero-page → S22 pricing-cards (toggle) → S19 FAQ → S24 CTA |
| **pricing-two.html** | dark | classic | S04 hero-page (dark) → S23 pricing-list → S29 value-cards → S19 FAQ → S24 CTA |
| **contact-one.html** | light | compact | S04 hero-page → S26 contact-form (split w/ info rail) → S24 CTA |
| **contact-two.html** | transparent | compact | S04 hero-page (over image) → S26 contact-form → S32 map → S24 CTA |
| **contact-three.html** | dark | classic | S04 hero-page (dark) → S25 contact-cards → S26 contact-form → S24 CTA |
| **style-guide.html** | light | compact | tokens: colors · type scale · buttons · forms · lists · icons · cards · motion demo |
| **instructions.html** | light | compact | getting started · editing content · sections · motion · deployment |
| **404.html** | light | compact | big 404 display + search links + CTA |

---

## 9. FRONTEND API — JSON content layer

`theme/assets/data/` is the content database. `theme.js` exposes it on `window.Woodex` and hydrates any element marked `data-api`.

```js
Woodex.data.navigation          // header/footer/mega menu tree
Woodex.data.site                // brand, contact, socials, seo defaults
Woodex.get('services')          // → array
Woodex.find('projects', {slug:'oak-house'})  // → record
Woodex.render.projectCard(p)    // → HTML string (shared renderers)
Woodex.hydrate()                // scans [data-api] and fills lists
```

### 9.1 Files & schemas

| File | Collection | Key fields |
|---|---|---|
| `site.json` | — | brand{name,tagline}, contact{email,phone,phones[],address,whatsapp,hours}, socials{}, stats[], seo |
| `navigation.json` | — | main[], cta{}, services{columns[],feature}, portfolio{cards[],links}, homes[], blog[], footer{columns[],legal[]} |
| `services.json` | 15 services | slug, group, title, summary, description, image, tags[], deliverables[], steps[{title,text}], price{from,unit} |
| `projects.json` | 12 projects | slug, title, category, year, location, client, services[], cover, gallery[], overview[], meta{area,duration,style} |
| `articles.json` | 9 posts | slug, title, category, date, readTime, cover, excerpt, body[{type:'p'\|'h3'\|'quote'\|'list',…}], author |
| `testimonials.json` | 6 | name, role, project, quote, rating |
| `pricing.json` | 3 tiers ×2 billing | name, tagline, price{onetime,monthly}, features[], featured |
| `faqs.json` | 10 | category, question, answer |
| `team.json` | 6 | name, role, bio, initials |
| `process.json` | 5 steps | number, title, text, duration |

### 9.2 Hydration contract

```html
<!-- renders up to 6 project cards into this grid -->
<div class="portfolio-grid" data-api="projects" data-limit="6" data-order="desc"></div>
<!-- renders filtered subset -->
<div data-api="services" data-filter="group:Interior Design"></div>
```
Static HTML in pages always contains the same content (progressive enhancement); `hydrate()` re-renders from JSON so edits to data files appear everywhere. Detail pages (`project.html?slug=…`, `service-detail.html?slug=…`, `blog-post.html?slug=`) are 100% JSON-driven — **add a record, get a page.**

---

## 10. FOLDER STRUCTURE

```
theme/
├── index.html  home-two.html  home-three.html
├── about.html  services.html  service-detail.html
├── portfolio-one.html  portfolio-two.html  portfolio-three.html  project.html
├── blog-one.html  blog-two.html  blog-post.html
├── pricing-one.html  pricing-two.html
├── contact-one.html  contact-two.html  contact-three.html
├── style-guide.html  instructions.html  404.html
├── design.md → ../design.md (this PRD)
├── AGENTS.md                 # AI-agent customization rules
├── README.md                 # quick start
├── build.mjs                 # optional: prerender detail pages + sync section templates
├── assets/
│   ├── css/ tokens.css · base.css · components.css · sections.css · theme.css (imports all)
│   ├── js/  theme.js · render.js (shared HTML renderers)
│   ├── data/  *.json  (the frontend API)
│   └── images/ (AI-generated originals, webp/jpg)
└── templates/
    ├── sections/ s01…s34 (every section, commented)
    ├── headers/  h1…h5
    ├── footers/  f1…f3
    └── pages/    skeletons per page type
```

---

## 11. AI-AGENT CUSTOMIZATION GUIDE (Codex / Claude / Kimi)

Rules live in `theme/AGENTS.md`. Summary:

1. **Re-skin:** edit only `assets/css/tokens.css` (colors/type/radius). Never hardcode hex in components.
2. **Content:** edit `assets/data/*.json` only — never parse-render by hand in HTML for collections.
3. **New page:** copy a skeleton from `templates/pages/`, set `data-header`/`data-footer`, compose sections from `templates/sections/`.
4. **New section:** build in a page between `<!-- @section -->` markers, run `node build.mjs` to extract it into `templates/sections/`.
5. **Never edit:** `assets/js/theme.js` engine internals unless adding a new motion primitive (then document it in §5).
6. **House style:** semantic HTML5 landmarks, BEM-ish `wx-` prefixed classes, every interactive element keyboard-accessible, every image `alt`, `loading="lazy"` below fold.

## 12. BUILD & DEPLOY

- **Run:** `cd theme && python3 -m http.server 4174 --bind 0.0.0.0` (or any static host).
- **Optional prerender** (static detail pages for SEO): `node build.mjs` → writes `project/*.html`, `service/*.html`, `blog/*.html` from JSON.
- **Deploy:** GitHub Pages / Netlify / Vercel / Cloudflare — upload `theme/` as site root. Forms: point `data-form-endpoint` in `site.json` to Formspree/Netlify Forms.
- **Self-host fonts:** download Fraunces + Manrope woff2, swap the Google Fonts `<link>` for `@font-face` in `base.css`.

## 13. QA CHECKLIST (launch gate)

- [ ] All 17 pages + 3 detail routes render, no console errors
- [ ] Mega menu + mobile drawer work on every page; `aria-current` correct
- [ ] All `data-reveal` trigger; counters roll; marquees loop seamlessly
- [ ] `prefers-reduced-motion` honored site-wide
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 (desktop)
- [ ] 320px → 1920px responsive pass; no horizontal scroll
- [ ] Keyboard-only navigation pass; visible focus everywhere
- [ ] 404 works; all internal links resolve; images have alt text
- [ ] Contact forms validate + show success/error states
- [ ] Business details replaced with real Woodex data before go-live
