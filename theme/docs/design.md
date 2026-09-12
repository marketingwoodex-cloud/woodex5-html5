# Woodex Interior — Master Theme
## Product Requirements & Design Document

**Version** 1.0.0 · **Status** Build complete, QA passing · **Last updated** 12 September 2025
**Owner** Woodex Interior · **Codebase** `theme/` (source of truth) → repository root (generated output)

---

## 1. Purpose

This document is the single reference for the Woodex Interior master theme: what it is, how it looks, how it is assembled, and how to change it. It is written to be read by a designer, a developer, or an AI coding agent with no prior context.

Three goals shaped every decision:

1. **Go-live ready.** A complete multi-page website for an interior design and fit-out studio — not a demo with placeholder text. Every page carries real, written, specific copy about a real service offering in a real market.
2. **Content-driven.** No marketing copy, price, project, article or contact detail is hard-coded inside a layout. All of it lives in JSON, is editable in one place, and is simultaneously published as a front-end JSON API.
3. **Agent-customisable.** The build system has zero dependencies, the template language is small and documented, every section is an independent parameterised template, and every parameter has a site-wide default. An agent can add a page, add a service, or rebrand the palette without reading the whole codebase.

### Non-goals

This theme deliberately does **not** include: a server, a database, a CMS admin, a bundler, a framework, or any third-party runtime dependency. Forms degrade to `mailto:`/WhatsApp when no endpoint is configured. All motion is hand-written vanilla JS and CSS.

---

## 2. Brand & visual identity

### 2.1 Positioning

Woodex Interior is a **design-and-build** interior practice in Lahore, Pakistan, founded 2014. The differentiator the whole site is built around: *the people who draw the space are the people who build it*, because the studio owns a 22,000 sq ft workshop and employs its craftsmen directly.

That single claim drives the information architecture — the workshop appears on the homepage, the about page, and the joinery service page; the process is published in six stages; the pricing guide explains what a bill of quantities is; and the journal writes about materials and site discipline rather than trends.

### 2.2 Tone of voice

| Trait | In practice |
|---|---|
| **Specific over impressive** | "±1.5 mm tolerance on a 4.2 m wardrobe run", not "uncompromising quality" |
| **Honest about limits** | The pricing page tells you what causes overruns; the contact page says "if we are not the right studio we will say so" |
| **Plain English** | Short declarative sentences. No exclamation marks. No "elevate your space" |
| **Evidence-led** | Claims carry a number, a date, or a named person wherever possible |
| **Warm, not cosy** | Editorial and confident. Emphasis is set in display italic, never in bold shouting |

The `<em>` inside a heading is a brand device, not emphasis in the accessibility sense: it marks the phrase that carries the point. It renders in display italic with a clay tint.

### 2.3 Colour

Five base colours plus four surface themes. Every component reads tokens — never literals — so a rebrand is a single-file change in `src/assets/css/01-tokens.css`.

| Name | Token | Hex | Role |
|---|---|---|---|
| Canvas | `--c-bg` | `#F8F3EA` | Page background, cards, section fills |
| Ink | `--c-text` | `#14110D` | Body text, headings, inverse surfaces |
| Clay | `--c-accent` | `#A94E2B` | Primary accent, links, active states |
| Clay strong | `--c-accent-hover` | `#8E3F22` | Hover and pressed accent states |
| Walnut | `--c-bg-wood` | `#4A3527` | Warm dark sections, footer |
| Brass | `--c-brass` | `#B9922E` | Micro accents: rules, numerals, badges |
| Charcoal | `--c-text-soft` | `#57503F` | Secondary text |
| Silver | `--c-line` | `#DED3C0` | Borders, dividers, input outlines |

**Surface themes** are set with `data-theme` on `<body>` (or any container): `canvas` (default), `walnut`, `ink`, `clay`. Each block redefines the same token names, so no component needs a dark variant.

Rules:
- Never pure `#000` on cream or pure `#FFF` on ink — the palette is warm throughout.
- Shadows are warm brown, never grey-blue: `rgba(46, 33, 24, …)`.
- Accent is used sparingly. A page with clay on more than roughly 15% of its surface is over-decorated.

### 2.4 Typography

Three families, each with an offline fallback so the site renders correctly without network access.

| Role | Family | Fallback | Use |
|---|---|---|---|
| Display | **Fraunces** | Georgia, Times | Headlines, card titles, numerals. Italic for `<em>` emphasis |
| Body | **Manrope** | system-ui, Helvetica | All running copy, UI, forms |
| Mono | **JetBrains Mono** | ui-monospace, Menlo | Eyebrows, meta, counters, code, table headers |

Fluid scale via `clamp()`:

```
--fs-display-1  clamp(3.25rem, 8.6vw, 8.5rem)   hero headline
--fs-display-2  clamp(2.6rem, 6.2vw, 5.6rem)    section headline
--fs-h1         clamp(2.75rem, 6.6vw, 6rem)     inner page hero
--fs-h2         clamp(2.1rem, 4.2vw, 3.75rem)
--fs-h3         clamp(1.5rem, 2.3vw, 2.1rem)
--fs-h4         clamp(1.25rem, 1.7vw, 1.5rem)
--fs-lead       clamp(1.0625rem, 1.35vw, 1.3125rem)
--fs-body       1rem / 1.62
--fs-small      .875rem
--fs-eyebrow    .6875rem / .24em tracking, uppercase, mono
```

Display type is set tight (`letter-spacing: -.045em`, `line-height: .96`); body type is set loose (`line-height: 1.62`) for long-form reading. Eyebrows are always mono, uppercase, widely tracked, and preceded by a rule.

### 2.5 Signature details

These are the elements that make the theme recognisably itself:

- **The pill button** — a rounded control with a *doubled* label that slides vertically on hover, plus a circular arrow medallion that rotates. Markup contract: `.btn > .btn__label > span + span` and `.btn__med`.
- **The arch** — `.media--arch` masks the top of an image into a semicircular arch, echoing colonial and Mughal opening profiles. Used for portrait and detail imagery.
- **The eyebrow rule** — a short clay rule before every mono section label.
- **Giant background words** — `.s-page-hero__deco`, a display-scale word set behind tall heroes at very low opacity with a slow parallax drift.
- **Grain and curtain** — a subtle noise overlay on dark surfaces, and a curtain wipe on in-page navigation.
- **Tabular numerals** — counters, stats and prices use `font-variant-numeric: tabular-nums` so digits do not jitter while counting.

### 2.6 Imagery

All imagery is **original AI-generated** work created for this project, stored locally in `src/assets/images/`. No third-party template assets, stock photography, or hotlinked CDN images are used anywhere — this is both a copyright position and a practical one (the site works offline apart from the font link).

Photographic direction: warm daylight, cream and clay palettes, walnut and oak joinery, brass details, terrazzo and lime plaster, Pakistani interior context. No visible text, signage, logos or watermarks. People appear only as absence — a workspace shot as an empty moment, never as identifiable faces.

See §12 for the full manifest.

---

## 3. Layout system

### 3.1 Containers

```
.container         max-width 1440px   gutter clamp(1.25rem, 4.4vw, 4.5rem)
.container--narrow max-width 1120px   long-form reading measure
.container--wide   max-width 1720px   galleries, legal documents
```

### 3.2 Section rhythm

```
--section-y     clamp(4.5rem, 9vw, 9.5rem)    standard section padding
--section-y-sm  clamp(3rem, 5.5vw, 5.5rem)    related/secondary sections
--section-y-lg  clamp(6rem, 12vw, 13rem)      hero and closing sections
```

### 3.3 Spacing scale

An 8px base, fluid at the ends: `--sp-1` 4px → `--sp-13` 160px. Section inner spacing uses `--sp-7`/`--sp-9`; grids use `--grid-gap` and `--grid-gap-lg`.

### 3.4 Grid conventions

Sections are single-column stacked blocks inside `.container`. Two-column editorial sections use `section-head--split` (title left, supporting note right). Collection grids use `repeat(auto-fit, minmax(17rem, 1fr))` so they collapse gracefully without per-breakpoint rules.

### 3.5 Radius

```
--r-sm 4px · --r-md 10px · --r-lg 18px · --r-xl 28px · --r-full 999px
```

Arch media uses a 50% top radius rather than `--r-*`.

---

## 4. Architecture

### 4.1 Data flow

```
src/data/*.json          content: services, projects, posts, team, pricing…
src/data/pages/*.json    per-page section parameters, keyed by page id
src/data/defaults.json   site-wide parameter fallbacks (lowest priority)
        │
        ▼
   build.mjs ── loadData() ── derive() ── render()
        │                                   │
        │                                   ├─► *.html at repository root
        ├─► assets/css, assets/js, assets/images  (copied)
        ├─► assets/data/*.json              (published as the JSON API)
        └─► build-manifest.json, sitemap.xml, robots.txt
```

### 4.2 Parameter resolution

Every section parameter resolves through a scope chain, nearest first:

```
1. page front matter          (src/pages/about.html  →  heroTitle: "…")
2. page-parameter registry    (src/data/pages/inner.json  →  "about": { … })
3. global defaults            (src/data/defaults.json)
4. content collections        (src/data/*.json)
```

Consequences worth knowing:
- A page only declares what it wants to change. Everything else falls back to a sensible default.
- A section can be dropped on any page with **zero** parameters and still render valid, on-brand markup.
- Front matter wins over the registry, so a one-off override is always possible without editing shared JSON.

#### Tokens work inside data files too

Any string in any collection may contain the same `{{…}}` tokens a template uses:

```json
{ "label": "{{site.phone}}", "href": "tel:{{site.phoneRaw}}" }
```

They are resolved in a pass at the end of `derive()`, so every derived field already exists by then. The pass is guarded on the literal `{{`, so ordinary content is never touched, and it skips `site` and `defaults` because they are the token source.

**Use this for anything that appears in more than one place.** Contact details were once written as literals in five data files and five templates; changing the studio phone in `site.json` updated 234 occurrences and left 17 stale ones behind, in the legal pages and the structured data. One edit now reaches all of them.

The exception is data that is genuinely different per record. `locations.json` holds a distinct phone number for each office — Islamabad, Karachi and Raiwind Road keep their own literals, and only the Lahore head office references `{{site.phone}}`.

### 4.3 Include-level parameter scoping

The same section can appear several times on one page with different parameters, using `with=`:

```html
{{> sections/svc-grid with=svcDesign}}
{{> sections/svc-grid with=svcFitout}}
{{> sections/svc-grid with=svcSpecialist}}
```

Each named key must be an object in the page parameters whose keys are the section's own parameter names. The object is pushed as a nearer scope, so it shadows page-level values for that include only. `service.html` uses this to render three filtered grids; `portfolio-three.html` uses it for four project rails.

### 4.4 Derived data

`derive()` post-processes the content files at build time so templates never compute anything:

| Derived field | Source | Purpose |
|---|---|---|
| `services[].icon` | slug → icon map | Service card glyph |
| `services[].groupIndex`, `serviceGroups` | `group` | Grouped navigation and filtering |
| `services[].url` | `slug` | `services/{slug}.html` |
| `posts[].day / month / monthShort / yearOnly` | `date` | Editorial date displays |
| `posts[].readLabel` | `readTime` | "7 min read" |
| `posts[].url`, `authorInitials` | `slug`, `author` | Links, avatar fallback |
| `featuredPost`, `postCategories` | `featured`, `category` | Blog grid lead, filters |
| `projects[].url` | `slug` | `project/{slug}.html` |
| `projects[].testimonial.initials` | testimonial `name` | Quote avatar |
| `projectCategories`, `projectCount` | `category` | Portfolio filters |
| `awards[].resultClass` / `resultLabel` | `result` | Badge modifier, preserving the human label |
| `testimonials[].initials`, `team[].initials` | `name` | Avatar fallback |
| `faqCategories`, `faqCount`, counts | — | Filters and copy |
| `*.social[key]` blanked | any `social` map | Placeholder profile suppression, see below |
| `site.stats[key]Label` | any stat ≥ 1000 | Thousands-separated string for prose |

`initialsOf()` is shared so every avatar fallback is consistent.

The stat labels exist because a raw number token renders as `22000`, which reads wrong inside a sentence. The numeric field stays authoritative for data consumers and structured data; the parallel `*Label` carries the formatted string for copy. So `{{site.stats.workshopSqft}}` gives `22000` for a JSON-LD `QuantitativeValue`, and `{{site.stats.workshopSqftLabel}}` gives `22,000` for prose. Any new stat of 1000 or more gets a label automatically.

#### Placeholder social profiles

Any `social` map in any collection is normalised: a value that is empty, is not a parseable URL, or has no path beyond `/` is rewritten to an empty string. So `https://instagram.com/` is treated as an unfilled field, while `https://instagram.com/woodexinterior` is a real profile.

This matters because a non-empty placeholder string defeats every guard around it:

- `sameAs` in the Organization JSON-LD is built from the surviving values, and the key is omitted entirely when none remain. Publishing `sameAs: ["https://instagram.com/"]` tells a search engine that this studio's identity *is* instagram.com, which is worse than saying nothing — and it is invisible on the rendered page.
- The footer, drawer and team-card anchors are wrapped in `{{#if site.social.x}}` / `{{#if social.x}}`, so a blanked value renders no icon at all rather than an icon that sends the visitor to a platform homepage.

The rule runs across every collection, not just `site.social`, because `team[]` carries its own social maps. A new collection with a `social` map is covered automatically.

**The source data is not modified.** Placeholders stay in `site.json` and `team.json` as the fields to fill in; they simply stop rendering and stop being claimed until they hold a real handle. If you add a social URL and no icon appears, this is why — the value needs a path.

The now-empty `.footer-social` and `.member__social` containers leave no visual gap: the first is a zero-height flex row, the second absolutely positioned with `opacity: 0` until hover.

---

## 5. Build system

### 5.1 Commands

```bash
node theme/build.mjs                 # build once → repository root
node theme/build.mjs --check         # validate only: report what would change, write nothing
node theme/build.mjs --watch         # rebuild on change (~250ms full build)
node theme/build.mjs --out=dist      # build to an alternate directory
node theme/build.mjs --quiet         # suppress the progress log
```

Requirements: **Node 18 or newer. No packages to install.** The generator is a single ES module.

`--check` renders the entire site and reports exactly what would change and what warns, without touching the filesystem — every write path (`writeFileSafe`, `copyAssets`, `buildManifest`) short-circuits on it. Use it as a pre-commit or CI gate.

There is deliberately no `--clean` flag. The default output directory is the repository root, so "delete the output folder first" would mean deleting the repository. Use `--out=` for a scratch build instead.

### 5.2 Outputs

- Every page under `src/pages/**.html`, with directories prefixed `_` skipped (templates live in `_templates/`).
- Generated collections from `site.config.json → generate[]`, each looping a content collection and writing to a slug-interpolated path.
- Assets copied verbatim; JSON also published to `assets/data/` as the runtime API.
- `build-manifest.json` — page inventory, warnings, timings, asset list.
- `sitemap.xml` and `robots.txt` — emitted only when `site.url` is set in `site.config.json`.
- Only changed files are rewritten, so `--watch` does not churn the filesystem.
- `build-manifest.json` is compared against the committed copy ignoring its `built` timestamp, so a no-op build leaves the working tree clean. The timestamp therefore means *when the output last actually changed*.

### 5.2.1 The `site.url` go-live switch

One value in `site.config.json` turns on the whole SEO surface. It ships empty on purpose.

| With `site.url` empty | With `site.url` set |
|---|---|
| no `<link rel="canonical">` | self-referencing canonical on all 56 pages |
| no `og:url` | `og:url` on all 56 pages |
| `url` key omitted from the Organization JSON-LD | real absolute `url` in that graph |
| no `sitemap.xml` | 50 entries, utility pages excluded |
| no `robots.txt` | robots.txt pointing at the sitemap |

Set it as the last step before deploying:

```json
"site": { "url": "https://your-production-origin" }
```

`index.html` collapses to the bare origin, so the homepage does not canonicalise to `/index.html`. Front matter may override `canonical` per page, which is how an alternate home or portfolio variant points back at its primary.

**Why it ships empty:** a wrong canonical is worse than no canonical. It tells a search engine that the page is a duplicate of a URL that does not exist, which can drop the page from the index entirely. An absent canonical is simply neutral. Do not set this value to a guess.

Indexing is controlled separately, per page, through front matter:

```
robots: noindex, follow
```

`404.html` and `thank-you.html` already carry it — the first has no content to rank, the second is a post-conversion page that should never appear in results. The six utility pages (privacy, terms, accessibility, thank-you, instructions, style-guide) are excluded from the sitemap by `buildSitemap()`, which is a separate decision from `noindex`: exclusion keeps them out of the crawl budget, `noindex` keeps them out of results.

### 5.3 Template syntax reference

**Front matter** — YAML-ish, delimited by `---`. Values auto-cast to boolean, number, or comma-separated array.

```yaml
---
title: Page title
description: Meta description
page: about            # selects the src/data/pages/inner.json parameter set
theme: canvas          # canvas | walnut | ink | clay
bodyClass: page--about
api: site,navigation,services
ogImage: assets/images/studio-team.jpg
robots: noindex, follow
---
```

**Chrome macros** — emit the whole `<head>`, opening `<body>`, or closing scripts. Asset paths are automatically prefixed with the page's computed `base`.

```html
<!-- @head -->
<!-- @open-body -->
<!-- @close-body -->
```

**Tokens**

```
{{site.name}}          escaped interpolation
{{{statementText}}}    raw interpolation — use for values containing <em>
{{base}}               auto-computed relative prefix ('' at root, '../' one deep)
{{item.title}}         dotted paths resolve against the scope chain
{{@index}} {{@first}} {{@last}} {{@count}} {{@key}}
{{name}}               parent scope traversal: ../name, ../../base
{{cond?a:b}}           ternary
{{'literal'}}          quoted literals
```

Unresolved tokens render as empty strings and are reported once per token per build.

**Includes**

```
{{> header}}                     resolves partials/ → sections/ → pages/ → content/
{{> sections/svc-grid}}
{{> sections/svc-grid with=key}}   push a parameter object as a nearer scope
{{> {{item.body}}}                 token in the include name (used for article bodies)
```

**Loops** — with composable modifiers:

```
{{#each projects}}…{{/each}}
{{#each services where=group:Interior design limit=6}}
{{#each projects where=category:retail,category:hospitality}}   ← comma = OR
{{#each posts pick=slug-a,slug-b}}
{{#each projects offset=2 limit=4}}
{{#each items sort=year reverse}}
{{#each projects limit=@projGridLimit}}                          ← value from scope
{{#each services as svc}}                                        ← alias
```

`where` matches a scalar exactly, or tests membership when the field is an array. An absent collection is silently skipped (sections are parameter-driven, so this is normal); a collection that exists but is not iterable is reported.

**Conditionals**

```
{{#if heroLead}}…{{/if}}
{{#if heroLead}}…{{else}}…{{/if}}
{{#unless timeline}}…{{/unless}}
{{#if !flag}}…{{/if}}
```

Blocks are matched by a nesting-aware scanner, so `{{#if}}` inside `{{#if}}` and `{{#each}}` inside `{{#each}}` parse correctly, and `{{else}}` binds to its own block rather than the nearest one. Unbalanced templates are reported and the orphan tags stripped rather than emitted.

**Build comments** — `{{! … }}` are stripped and never reach the output. Every section and page template uses them to document its own parameters in place.

### 5.4 Generated detail pages

`site.config.json → generate[]`:

| Collection | Template | Output |
|---|---|---|
| `services` (15) | `pages/_templates/service-detail.html` | `services/{slug}.html` |
| `projects` (10) | `pages/_templates/project-detail.html` | `project/{slug}.html` |
| `posts` (8) | `pages/_templates/blog-post.html` | `blog/{slug}.html` |

Each generated page receives `item`, `prevItem`, `nextItem`, `itemCount`, `itemIndex` in scope, so prev/next navigation and pager copy work without extra configuration. Front-matter values may themselves contain tokens — this is how detail pages get real titles:

```yaml
title: "{{item.title}} — {{item.categoryLabel}} Project in {{item.location}}"
```

---

## 6. Section library (45)

Every section is one file in `src/sections/`, exposes exactly one `.s-*` root class, is driven entirely by parameters, and prefixes all relative paths with `{{base}}`.

### Heroes & page framing
| Section | Parameters | Notes |
|---|---|---|
| `hero-split` | data-driven (`stats.hero`, `site.cta`) | Rotating split-type hero, three slides, one `<h1>` |
| `hero-slider` | data-driven (`projects` where featured) | Full-bleed project slider with dots and progress |
| `hero-panel` | `heroEyebrow/Title/Text/Image/Cta/Cta2/Points` | Editorial panel hero |
| `page-hero` | `heroVariant` (plain/tall/dark/image), `heroFacts`, `heroDeco`, `crumbCurrent` | Standard inner-page hero with breadcrumbs |
| `project-hero` | `item.*` | Case-study hero with meta rail |

### Editorial & brand
| Section | Key parameters |
|---|---|
| `statement` | `statementText`, `statementSignName/Role/Initials`, `statementImage`, `statementCta` |
| `split` | `splitText/Text2`, `splitImage/Image2`, `splitList` + `splitListItems`, `splitQuote`, `splitSticky`, `splitOrder` |
| `scatter` | `scatterItems[{src,alt,cap,parallax}]`, `scatterSticker` |
| `feature` | `featureText/Text2`, `featureImage`, `featureBullets`, `featureStats`, `featureBadge`, `featureParallax` |
| `quote` | `quoteText/Name/Role/Initials/Rating` — falls back to `item.testimonial.*` |
| `marquee` | `marqueeVariant` (display/small), `marqueeSurface`, `marqueeSpeed`, `marqueeText` |
| `reel` | `reelPoster`, `reelSrc`, `reelStats`, `reelDuration` |
| `values` | `values[{icon,title,text}]`, `valuesCols` (2/3/4) |
| `milestones` | `milestones[{year,title,text}]` |
| `stats` | `statsLabel/Eyebrow/Head/Note`, `statsLimit` — animated counters |
| `logos` | `logosEyebrow/Note/Speed` — client mark row or scrolling band |
| `awards` | `awardsEyebrow/Title/Text` — recognition table |
| `team` | `teamEyebrow/Title/Text`, `teamLimit`, `teamWhere` |
| `process` | `processTitle/Text`, `timeline`, `processPromises`, `processLimit` |

### Services & projects
| Section | Key parameters |
|---|---|
| `svc-acc` | Sticky two-column service accordion with swapping media; `svcAccTagFirst/Right`, `svcAccAside*` |
| `svc-grid` | `svcGridCols`, `svcGridWhere`, `svcGridLimit`, `svcGridMedia`, `svcGridFoot*` |
| `svc-list` | Index-style rows with hover preview; `svcListWhere/Limit/Cta` |
| `projects-grid` | `projGridWhere/Limit/Pager/NoBar/Cta` — filterable card grid |
| `projects-list` | `projListWhere/Limit/Cta` — index rows with hover thumbnail |
| `projects-carousel` | `projCarWhere/Limit/Lg/Cta` — draggable rail with arrows |
| `project-meta` | Two sections in one file: `.s-proj-meta` record rail + `.s-proj-body` narrative |
| `project-gallery` | Flat grid from `item.gallery`; first and last frames span full width |
| `project-next` | Next/previous project teaser from `nextItem`/`prevItem` |

### Conversion & support
| Section | Key parameters |
|---|---|
| `testimonials` | `testiGrid` toggles deck vs grid variant; `testiWhere/Limit/Cta` |
| `pricing` | Data-driven from `pricing.tiers/rateTable/exclusions/faqs/toggle` |
| `compare` | `compare[{k,essential,signature,atelier}]` — inclusion matrix |
| `faq` | `faqLimit`, `faqSchema` — grouped accordion, emits `FAQPage` JSON-LD |
| `blog-grid` | `blogFeatured`, `blogFilter`, `blogLimit`, `blogOffset`, `blogWhere` |
| `blog-list` | `blogListLimit/Where/Cta` — editorial dated rows |
| `topics` | `topics[{slug,label,count,text,href}]` — journal topic index |
| `post` | Long-form reader: meta rail, sticky TOC, prose body, tags, share, author, pager |
| `cta` | `ctaVariant` (plain/image/split), `ctaSurface`, `ctaAside`, `ctaPrimary/Secondary` |
| `contact-split` | `contactFormKind`, `contactFields`, `contactOrder`, `contactAside*`, `contactMeta`, `contactImage` |
| `locations` | Office cards from `locations.json` with hours, lines and map links |
| `newsletter` | `newsEyebrow/Title/Text/Endpoint` |
| `thanks` | Confirmation panel: `thanksItems/Aside/Cta/Cta2/Note`, `thanksRef` |
| `notfound` | 404 panel from `home.notFound` |

### Documentary
| Section | Key parameters |
|---|---|
| `docs` | Builder documentation. One include drives up to five blocks: `steps`, `tree`, `edits`, `apiItems`, `motionItems` — each renders only if its array exists |
| `guide` | Style-guide reference. One include drives up to six blocks: `swatches`, `types`, `spaces`, buttons, `comps`, `secList` |
| `legal` | Long-form policy document: `legalSections[{id,title,body}]` with a sticky table of contents |

---

## 7. Page inventory (56 pages)

### Homepages (3)
| Page | Id | Character |
|---|---|---|
| `index.html` | `home-one` | Signature home: split hero, sticky service accordion, scatter collage, workshop feature, project rail, reel |
| `home-two.html` | `home-two` | Delivery-led: project slider hero, service grid, project grid, fit-out split, testimonial grid |
| `home-three.html` | `home-three` | Index-led: panel hero, full service index, project index, studio split, awards |

### Core (5)
`about.html` · `service.html` (three filtered grids) · `portfolio-one.html` (grid) · `portfolio-two.html` (list index) · `portfolio-three.html` (rails by sector)

### Editorial (2 + 8 generated)
`blog.html` (featured grid) · `blog-two.html` (archive list) · `blog/{slug}.html` × 8

### Generated detail (25)
`services/{slug}.html` × 15 · `project/{slug}.html` × 10

### Conversion (6)
`contact.html` · `contact-two.html` (dark, panel-first) · `contact-three.html` (visit-oriented) · `pricing.html` · `process.html` · `thank-you.html`

### Support & reference (7)
`faq.html` · `instructions.html` (builder docs) · `style-guide.html` (live reference) · `404.html` · `privacy.html` · `terms.html` · `accessibility.html`

Every page has exactly one `<h1>`, full landmark structure, a skip link, resolved internal links, and valid JSON-LD where applicable.

---

## 8. Components

Class names are the theme's public API. Components live in `03-components.css`; chrome in `04-chrome.css`.

| Component | Contract |
|---|---|
| `.btn`, `.btn--solid/outline/ghost/quiet`, `.btn--sm/lg/block` | `.btn__label > span + span` (doubled sliding label) + `.btn__med` (arrow medallion) |
| `.eyebrow`, `.eyebrow--dot/--plain` | Mono label, uppercase, wide tracking, optional leading rule |
| `.media`, `.media--arch/--wide/--16x10` | Image wrapper with mask and reveal variants |
| `.card`, `.pcard`, `.svc-card`, `.member` | Collection cards, each namespaced under its section |
| `.field`, `.field__label/__control/__error/__hint`, `.choice` | Form controls with floating labels and inline validation |
| `.acc`, `.acc__item/__head/__panel/__inner` | Accessible accordion, `data-accordion="single|multi"` |
| `.crumbs`, `.badge`, `.chip`, `.panel`, `.link-arrow`, `.tlink` | Navigation and utility primitives |
| `.section-head`, `.section-head--split`, `.section-head__aside` | Standard section heading block |
| `.prose`, `.prose__lede/__table/__dl/__callout` | Long-form article typography |
| `.nav`, `.drawer`, `.footer` | Header, mega-menu overlay, footer |

**Runtime slots** — elements the browser layer fills from the JSON API:
`[data-nav]`, `[data-footer-links]`, `[data-site]`, `[data-count]`, `[data-render]` + `[data-template]`, `[data-latest-posts]`, `[data-ref]`.

**Global**: exactly one — `window.Woodex`, exposing utilities, the API client, the motion registry, and section initialisers.

---

## 9. Motion system

Zero dependencies. All motion is gated behind `html.js` (added by `util.js` once JS is confirmed) and fully disabled under `prefers-reduced-motion`, where transitions become instant state changes and marquees stop.

| Attribute | Behaviour |
|---|---|
| `data-reveal="up|clip"` | IntersectionObserver entrance, `data-reveal-delay="n"` staggers |
| `data-split` | Word-by-word heading reveal, staggered by word index |
| `data-marquee` | Seamless scrolling band, `data-speed` = seconds per loop |
| `data-parallax="0.08"` | Scroll-linked offset, value is the travel factor |
| `data-sticky-col` | Pins one column while its sibling scrolls |
| `data-kenburns` | Slow scale-and-drift on hero imagery |
| `data-magnetic="0.2"` | Pointer attraction on buttons, eased release |
| `data-tilt` | Bounded perspective tilt on cards |
| `data-count="145000"` | Count-up on first view, respecting prefix/suffix/decimals |

Set `data-motion="off"` on `<html>` to disable everything globally. This is enforced in two places that read the same attribute, so behaviour and styling can never disagree: `util.reduced()` returns true for it (every motion module routes through that one check), and `05-motion.css` carries an `html[data-motion="off"]` block that mirrors the `prefers-reduced-motion` rules exactly.

Reduced-motion users receive identical content and identical final states — motion is never the only carrier of meaning.

### 9.1 Interaction hooks beyond motion

These drive real behaviour rather than presentation, and each is consumed by a named module:

| Attribute | Behaviour | Module |
|---|---|---|
| `data-accordion="single\|multi"` | Expand/collapse, one-at-a-time or independent | `sections.js` Accordion |
| `data-tabs` + `data-price-mode` | Tab switch; also swaps scoped `[data-price]` figures | `sections.js` Tabs |
| `data-deck` + `data-deck-prev/next/dots/media/auto/index` | Auto and manual slider, thumbnail rail, synced media | `sections.js` Deck |
| `data-filter-group` + `data-filter-item` | Portfolio filtering by category | `sections.js` Filter |
| `data-lightbox` | Gallery overlay | `sections.js` Lightbox |
| `data-swap-media` + `data-media-index` | Sticky image follows the hovered or open row | `motion.js` Swap |
| `data-toc-link` | Scroll-spy `is-current` on article contents | `sections.js` TOC |
| `data-form` + `data-validate` | Client validation and submit handling | `forms.js` Forms |
| `data-render` + `data-template` | Runtime render slot fed from the JSON API | `theme.js` |
| `data-nav`, `data-footer-links`, `data-site`, `data-latest-posts` | Runtime content slots | `api.js`, `theme.js` |
| `data-count`, `data-counter` | Count-up on first view | `motion.js`, `forms.js` |
| `data-share`, `data-copy`, `data-day`, `data-year`, `data-ref` | Share, clipboard, opening-hours, year, enquiry reference | `theme.js`, `forms.js` |
| `data-scroll-to`, `data-scroll-top` | Fragment scroll offset past the sticky header; back to top | `chrome.js` |
| `data-theme`, `data-density`, `data-page`, `data-api` | Page-level configuration read at boot | `theme.js` |

Every `data-*` attribute emitted by a template is consumed by JS or CSS. When adding a new hook, add its consumer in the same change — an unconsumed attribute is a broken promise to whoever reads the markup.

---

## 10. Front-end JSON API

Every content file is published to `assets/data/` as a static JSON endpoint. The browser layer (`api.js`) reads them on load; anything else can read them too.

| Endpoint | Contents |
|---|---|
| `assets/data/site.json` | Identity, contact, social, hours, cities, CTA copy |
| `assets/data/navigation.json` | `main`, `utility`, `footer` link groups with mega-menu children |
| `assets/data/services.json` | 15 services: groups, deliverables, outcomes, sectors, per-service FAQ |
| `assets/data/projects.json` | 10 projects: scope, area, programme, challenge, approach, result, specs, gallery, testimonial |
| `assets/data/posts.json` | 8 articles: topics, read time, author, TOC, body reference |
| `assets/data/process.json` | 6 delivery stages with outputs and durations, plus promises |
| `assets/data/testimonials.json` | 8 client reviews with sector, project and rating |
| `assets/data/team.json` | 8 people: role, discipline, bio, social |
| `assets/data/pricing.json` | Packages, rate table, exclusions, toggle labels, pricing FAQ |
| `assets/data/faqs.json` | 24 grouped questions across 5 categories |
| `assets/data/locations.json` | 4 offices: address, hours, lines, map pins |
| `assets/data/clients.json` | 12 client marks for the logo band |
| `assets/data/stats.json` | Studio figures in `primary`, `secondary` and `hero` groups |
| `assets/data/awards.json` | 7 nominations with results |
| `assets/data/home.json` | 404 content, quick search, suggested destinations |
| `assets/data/defaults.json` | The global parameter default set (also useful as a parameter reference) |

Responses are plain files with no server logic, so they serve from any host, CDN or object store. Set `body[data-api]` to a base URL to point the browser layer elsewhere.

---

## 11. Accessibility

Target: **WCAG 2.2 AA**. Full statement published at `accessibility.html`.

- One `<h1>` per page, logical heading order, full landmark set, skip link first in the tab order.
- Every interactive element keyboard-reachable with visible focus; focus is trapped in the drawer and lightbox and restored on close; `Escape` closes both.
- Accordions, sliders, tabs, filters and carousels all have accessible controls — dragging is a convenience, never the only path.
- Meaningful `alt` on content images; decorative imagery and icon glyphs hidden from assistive technology.
- Contrast ≥ 4.5:1 for body text, links, labels and buttons; ≥ 3:1 for large display type.
- Layout holds at 400% zoom and reflows to a single column with no horizontal scrolling.
- Forms: persistent visible labels, required marked in text as well as symbol, errors announced and described in words, validation never colour-only, live region for status.
- All animation disabled under `prefers-reduced-motion`.
- No autoplaying media.
- Structured data published as JSON-LD: `Organization`, `WebSite`, `LocalBusiness`, `Service`, `CreativeWork`, `Blog`, `BlogPosting`, `FAQPage`, `HowTo`, `OfferCatalog`, `AboutPage`, `ContactPage`, `CollectionPage`, `BreadcrumbList`.

Known limitations are documented honestly in the accessibility statement rather than omitted: legacy prototype pages at the repository root predate this system; embedded maps are third-party (each office card therefore repeats the address in text); wide comparison tables scroll horizontally on small screens.

---

## 12. Image manifest

All 21 named images plus the brand mark. Generated images are original AI work created for this project.

**Current status: complete.** Every image referenced by a built page exists. All local references across the 56 pages resolve on all five channels audited — `href`/`src`, `meta content`, inline `url()`, stylesheet `url()`, and string values inside JSON-LD.

`texture-wood.jpg` and `og-cover.jpg` were retired rather than generated. Every image in this set is 1408×768 (1.83:1), which is close enough to the 1.91:1 that social scrapers prefer that a dedicated 1200×630 card adds nothing. The site-wide `og:image` now uses `space-lobby.jpg`, with contextually apt per-page overrides; `publisher.logo` in the blog JSON-LD uses `apple-touch-icon.png`, which is the actual brand mark and therefore more correct than a photograph ever was.

Auditing note: checking only `href` and `src` misses real breakage. `og:image` lives in a `meta content` attribute and `publisher.logo` lives inside a JSON-LD string — neither is caught by a link checker, and both were broken here until the audit was widened.

| File | Subject | Status |
|---|---|---|
| `space-workspace.jpg` | Open-plan corporate office floor | ✅ generated |
| `space-retail.jpg` | Retail flagship with brass rails and terrazzo | ✅ generated |
| `space-lobby.jpg` | Double-height reception lobby | ✅ generated |
| `space-cafe.jpg` | Coffee house counter and back bar | ✅ generated |
| `space-showroom.jpg` | Furniture showroom hall | ✅ generated |
| `space-villa.jpg` | Farmhouse exterior at golden hour | ✅ generated |
| `space-restaurant.jpg` | Restaurant dining room, evening | ✅ generated |
| `space-apartment.jpg` | Compact apartment living space | ✅ generated |
| `studio-team.jpg` | Design studio workspace, no faces | ✅ generated |
| `detail-joinery.jpg` | Macro mitred timber joint | ✅ generated |
| `detail-materials.jpg` | Material palette flat-lay | ✅ generated |
| `detail-lighting.jpg` | Cove lighting on plaster | ✅ generated |
| `detail-staircase.jpg` | Stair with steel stringers | ✅ generated |
| `hero-living.jpg` | Living room, oak panelling | ✅ generated |
| `hero-kitchen.jpg` | Kitchen with walnut island | ✅ generated |
| `hero-bedroom.jpg` | Primary bedroom | ✅ generated |
| `hero-office.jpg` | Home office | ✅ generated |
| `cta-workshop.jpg` | Workshop panel-processing bay | ✅ generated |
| `reel-poster.jpg` | Showreel poster frame | ✅ generated |
| `contact-studio.jpg` | Studio interior for contact pages | ✅ generated |
| ~~`texture-wood.jpg`~~ | retired — no longer referenced | ✅ not needed |
| ~~`og-cover.jpg`~~ | retired — no longer referenced | ✅ not needed |
| `favicon.svg` | Original brand mark: arch + mitred W + brass rule | ✅ hand-written |
| `apple-touch-icon.png` | Same mark rasterised at 180×180 | ✅ generated in-house |

Until the pending images exist, pages reference paths that resolve to nothing. Two safeguards keep that from looking broken:

1. **Layout is unaffected** — every image sits in a fixed-aspect `.media` wrapper, so the grid holds its shape whether or not the file is there.
2. **A branded placeholder paints instead of a broken-image glyph** — `js/util.js` attaches a capture-phase `error` listener plus a completed-image scan, marks the frame `.media--missing`, clears the `src` and `alt`, and appends a filename chip. `09-docs.css` then renders a warm canvas block with the arch motif and a low-strength accent wash, with an inverse variant for walnut, ink, hero-slider and reel surfaces.

Adding a file with the right name is the only step required — no template or data change, and the placeholder disappears on its own. The placeholder block in `09-docs.css` is self-contained and can be deleted once the manifest is complete.

---

## 13. Customisation guide

### Change the business identity
Edit `src/data/site.json`: name, tagline, phones, emails, address, hours, social links, service cities, CTA copy. Every page, the header, the footer, the JSON-LD and the JSON API update together.

### Rebrand the palette or type
Edit `src/assets/css/01-tokens.css`. Change the `[data-theme="canvas"]` block for the default surface, or add a new `[data-theme="…"]` block and set `theme:` in a page's front matter. No component contains a literal colour.

### Add a service
Append an object to `src/data/services.json` with a `slug`, `group`, `title`, `summary`, `heroEyebrow`, `heroTitle`, `image`, `gallery`, `priceFrom`, `duration`, `areaTypical`, `intro[]`, `deliverables[]`, `outcomes[]`, `sectors[]`, `faq[]`. Its detail page is generated automatically, it appears in every service section, in the contact form's service dropdown, in navigation, and in the API. Add its icon to the `SERVICE_ICONS` slug map in `build.mjs`.

### Add a project or an article
Append to `projects.json` / `posts.json`. For an article, also add a body file at `src/content/posts/{slug}.html` and reference it from the post's `body` field. Body files use `.prose` typography and `<h2 id="sec-N">` anchors matching the post's `toc` array.

### Change what a section says on one page
Find the page id in its front matter (`page: about`), open the matching entry in `src/data/pages/*.json`, and edit the parameter. Nothing else changes.

### Change a section's structure everywhere
Edit `src/sections/{name}.html`. The file's header comment documents every parameter it accepts.

### Add a new section
1. Create `src/sections/{name}.html` with one `.s-{name}` root and a header comment listing its parameters.
2. Add styles to `06-sections.css`, `07-sections-b.css`, or a new numbered stylesheet registered in `renderHead()`.
3. Add its parameters to `src/data/defaults.json` so it renders with zero configuration.
4. Include it from any page with `{{> sections/{name}}}`.

### Add a new page
1. Create `src/pages/{name}.html` with front matter including a unique `page:` id.
2. Add a parameter object under that id in `src/data/pages/{file}.json`.
3. Compose the body from `{{> sections/…}}` includes between the three chrome macros.
4. Add it to `navigation.json` if it should appear in the menu.

---

## 14. Quality gates

The build is considered shippable when all of these hold. All currently pass.

- [x] `node theme/build.mjs` completes with **zero warnings**
- [x] `node --check theme/build.mjs` passes
- [x] No unresolved `{{` tokens in any generated page
- [x] Exactly one `<h1>` per page
- [x] `<header>`, `<nav>`, `<main>`, `<footer>` present on every page
- [x] Balanced `<div>`, `<section>`, `<figure>` and `<a>` tags on every page
- [x] Every internal `href`/`src` resolves to a real file
- [x] No empty `href=""` or `src=""` attributes
- [x] All JSON-LD blocks parse as valid JSON
- [x] All 16 data files parse as valid JSON
- [x] Every page returns HTTP 200 from a static server
- [x] No `undefined`, `NaN` or `[object Object]` in generated output
- [x] Zero runtime dependencies; zero third-party JS
- [ ] All 21 manifest images present (10 of 21 generated — see §12)

---

## 15. Performance

- No framework, no bundler, no third-party JS. Seven deferred first-party modules, totalling well under 100 KB uncompressed.
- Ten stylesheets, all token-driven; the whole cascade is under 40 KB uncompressed.
- Fonts load from a single Google Fonts request with `preconnect`; the layout does not depend on them, and `src/assets/fonts/` plus `fonts.css` exist as the hook for self-hosting offline.
- Images are fixed-aspect inside `.media` wrappers, so no layout shift occurs whether or not a file is present.
- The generator writes only changed files; a full 56-page build completes in roughly 250 ms.

---

## 16. Repository layout

```
theme/                          ← SOURCE OF TRUTH. Edit here.
  build.mjs                     zero-dependency static site generator
  site.config.json              site settings + generation rules
  docs/design.md                this document
  src/
    assets/css/    01-tokens · 02-base · 03-components · 04-chrome ·
                   05-motion · 06-sections · 07-sections-b · 08-responsive ·
                   09-docs · fonts
    assets/js/     util · api · chrome · motion · sections · forms · theme
    assets/images/ original generated imagery + brand mark
    data/          16 content files
    data/pages/    7 page-parameter registry files
    data/defaults.json           site-wide parameter fallbacks
    partials/      icons · chrome · header · drawer · footer
    sections/      45 section templates
    pages/         23 page templates
    pages/_templates/  3 generated detail templates
    content/posts/ 8 long-form article bodies

*.html, services/, project/, blog/, assets/     ← GENERATED OUTPUT. Do not edit.
build-manifest.json                              ← generated build report
```

Legacy prototype files retained at the repository root (`company-index.html`, `journal.html`, `portfolio.html`, `services.html`, and the original `assets/` imagery) predate this system. They are preserved for reference and duplicated under `WOODEX-INT/`; they are not part of the generated set and are not covered by the accessibility or QA gates.
