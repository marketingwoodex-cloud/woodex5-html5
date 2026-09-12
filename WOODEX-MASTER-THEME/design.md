# Woodex Master Theme — Master Plan & PRD

**Project:** Woodex Interior — master front-end theme and template library
**Deliverable:** `WOODEX-MASTER-THEME/` (Astro 5, static output, zero runtime dependencies)
**Reference:** Linoxa (Webflow) — layout, spacing, palette and motion modelled 1:1, rebranded to Woodex Interior
**Status:** v1.0 — 72 pages build clean; **37 section components**, 40 page templates
**Last updated:** February 2026

---

## 1. What this is

A complete, production-ready front-end system for an interior design and fit-out practice.
It is **not** a single homepage template. It is a section library plus a data layer, wired so
that a new page is assembled by choosing sections and pointing them at JSON-shaped data —
no new CSS, no new JavaScript, no per-page overrides.

Three things make it different from a marketplace theme:

1. **One component per section, with typed props.** Every section on every page comes from
   `src/sections/`. There are no page-specific copies.
2. **A frontend API.** All copy, projects, services, articles, team, pricing and imagery live in
   `src/data/*.js` and are consumed through named helpers. Editing one file rebrands the theme.
3. **Attribute-driven motion.** Scroll reveals, masked headlines, parallax, marquees, counters,
   accordions, tabs, sliders and sticky pins are enabled by adding a `data-` attribute to markup —
   never by editing a JavaScript file.

### Success criteria (all met at v1.0)

| Criterion | Target | v1.0 |
| --- | --- | --- |
| Section components | one per observed section | **37** |
| Page templates | every page in the reference inventory, plus service/project variants | **40** |
| Reference pages replicated by layout | 100% | 100% |
| Runtime JS dependencies | none | **none** (motion engine is in-house, 4.4 kB gzipped) |
| Custom code required to add a page | none | none |
| Build output | static HTML, deployable anywhere | 72 pages in ~4 s |
| Imagery | real photography swappable with no code change | drop-in resolver, 111 slots |
| Accessibility | WCAG 2.2 AA | keyboard-complete, reduced-motion aware |

---

## 2. Audience & positioning

Woodex Interior is a **design-and-build** practice: concept, documentation, joinery and site
delivery under one contract. The site is written for four reader types, and every template
serves one of them:

| Reader | Wants | Served by |
| --- | --- | --- |
| Homeowner planning a villa or apartment | confidence, cost realism, proof of finish quality | Home One, project case studies, pricing, FAQ |
| Commercial client or developer | programme certainty, documentation, references | Service pages, process, commercial projects, team |
| Operator (restaurant, retail, clinic) | speed of delivery, compliance, precedent | Sector service pages, case studies with metrics |
| Someone assessing the practice | who they are, who does the work, how they think | About, team, journal, testimonials, awards |

**Tone:** plain, specific, numerate. The reference template's marketing register is replaced with
a documented-practice register — costs, tolerances, weeks and warranty terms rather than adjectives.
This is the single biggest content decision in the rebrand and it should be preserved in any
future copywriting.

---

## 3. Information architecture

### 3.1 Route map

| Route | Template | Purpose |
| --- | --- | --- |
| `/` | `index.astro` | Theme layout index (swap for a homepage in production) |
| `/home-one` | Home One | Flagship editorial homepage |
| `/home-two` | Home Two | Split hero, rotating headlines, partner proof |
| `/home-three` | Home Three | Cinematic studio homepage |
| `/about` | About | Practice story, beliefs, timeline, team, offices |
| `/process` | Process | The seven delivery stages, in full |
| `/team` | Team | People, organisation, careers link |
| `/careers` | Careers | Open roles with application form |
| `/awards` | Awards | Recognition and press |
| `/clients` | Clients | Who we build for |
| `/materials` | Materials | Swatch library with climate rationale |
| `/sustainability` | Sustainability | Sourcing, longevity, waste |
| `/faq` | FAQ | Categorised questions with JSON-LD |
| `/testimonials` | Testimonials | Reviews in three presentations |
| `/service` | Services index | 17 services grouped by sector, anchor-linked |
| `/services/<slug>` | Service detail | **17 generated pages** |
| `/portfolio`, `/portfolio-one` | Portfolio grid | Uniform grid + sector filter |
| `/portfolio-two` | Portfolio masonry | Editorial mixed spans |
| `/portfolio-three` | Portfolio list | Scannable index rows |
| `/project/<slug>` | Case study | **9 generated pages** |
| `/journal` | Journal | Magazine index (canonical) |
| `/blog-one` | Journal magazine | Lead article + four supporting |
| `/blog-two` | Journal grid | Three-up card grid |
| `/blog-three` | Journal list | Chronological list with date rail |
| `/blog/<slug>` | Article | **9 generated pages** with TOC and author box |
| `/pricing-one` | Pricing | Packages, add-ons, budget calculator, FAQs |
| `/contact-one` | Contact — enquiry | Primary multi-section form |
| `/contact-two` | Contact — booking | Slot picker + qualifying form |
| `/contact-three` | Contact — studios | Office cards, click-to-load maps |
| `/style-guide` | Style guide | Living design system |
| `/instructions` | Animation guide | Motion API with live demos |
| `/license`, `/changelog` | Utility | Licence terms, release history |
| `/privacy`, `/terms`, `/accessibility` | Legal | `LegalLayout` + RichText |
| `/search` | Search | Build-time index, no third-party search |
| `/thank-you` | Thank you | Post-enquiry confirmation |
| `/404` | 404 | Recovery page with search and routes |

**72 HTML pages** are produced from **40 source templates**. Adding an article, project or service
adds a page automatically through `getStaticPaths()`.

### 3.2 Navigation model

- **Primary nav:** Home, About, Services, Portfolio, Journal, Contact — each with a mega panel
  (six panels, 78 links total, defined in `src/data/navigation.js`).
- **Mega menu:** multi-column with featured imagery per column group. Opens on hover with intent
  delay, on click, and on keyboard Enter/Space; Escape closes and returns focus; touch-friendly.
- **Footer:** CTA band (optional per page), four link columns, contact details, oversized wordmark,
  legal bar with licence and style-guide links.
- **Drawer:** full-height mobile panel with accordion sub-navigation and a focus trap.
- **Deep links:** service groups are anchor-linked from the services index and the mega menu.

---

## 4. Design system

Derived from the reference style guide and locked into `src/styles/tokens.css`.

### 4.1 Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--c-black` | `#000000` | Body text on light backgrounds |
| `--c-jet` | `#111111` | Dark sections, primary buttons |
| `--c-charcoal` | `#525252` | Muted body copy |
| `--c-silver` | `#c0c0c0` | Disabled states, subtle dividers |
| `--c-light-gray` | `#e3e1e1` | Soft backgrounds |
| `--c-deep-gray` | `#d9d9d9` | Borders, panels |
| `--c-beige` | `#fcf2e8` | Page background, inverted text |
| `--c-navy` | `#0f1e36` | Accent, data states |

Semantic aliases (`--bg`, `--text`, `--text-soft`, `--text-mute`, `--bg-soft`, `--bg-card`, `--line`,
`--line-strong`, `--line-invert`) sit on top of the raw palette. **A section inverts by setting
`data-theme="dark"`, not by new colour values** — this is why dark and light variants cost nothing.

### 4.2 Type

Nine steps, fluidised with `clamp()` around the reference's desktop values:
H1 5rem/112.5%/500 · H2 2.812rem/122%/500 · H3 1.875rem/133%/500 · H4 1.562rem/128%/500 ·
H5 1.25rem/150%/500 · H6 1.125rem/155%/400 · Body 1rem/162%/400 · Sub 0.875rem/185%/400 ·
Button 0.9375rem/162%/500.

`--ff-display` (headings) and `--ff-body` are **system stacks** — no remote font request, no
layout shift, no privacy implication. Swapping in a licensed webfont is a two-line change.

### 4.3 Space, radius, elevation, motion

- Spacing on a 9-step scale (`--sp-1` → `--sp-24`); section rhythm from `--section-y`.
- Radius: `--r-xs` `--r-sm` `--r-md` `--r-lg` `--r-xl` `--r-pill`.
- Elevation: four shadows, used sparingly — the design is deliberately flat.
- Motion: one easing family (`--ease-out`, `--ease-in-out`, `--ease-expo`, `--ease-soft`) and four
  durations (160 / 320 / 620 / 1000 ms). Variety comes from timing, not from curves.

### 4.4 Layout

One container (`--container`), one fluid gutter (`--gutter`), 12-column grid demonstrated in the
style guide. Sections own their internal grid; there is no global grid utility soup.

---

## 5. Section library

37 components in `src/sections/`. Each is self-contained: markup, scoped CSS and (where needed)
its own behaviour. All accept a `theme` or `variant` prop where a visual alternative makes sense.

### 5.1 Heroes

| Component | Key props |
| --- | --- |
| `HeroClassic` | `eyebrow, title, lede, primary, secondary, image, marqueeWords[], cards[], meta[]` |
| `HeroShowcase` | `rotatingWords[], title, lede, primary, image, badgeNumber, badgeLabel, showLogos` |
| `HeroStudio` | `eyebrow, title, lede, primary, secondary, image, videoLabel, stats[]` |
| `PageHeader` | `eyebrow, title, lede, crumbs[], image, meta[], variant, align` + slot |
| `ServiceDetailHero` | `service` (typed), `showFacts` |
| `ArticleHero` | `title, excerpt, topic, date, readingTime, author, authorRole, cover, tags[]` |

### 5.2 Services & projects

| Component | Key props |
| --- | --- |
| `ServiceRows` | `eyebrow, title, lede, group, limit, ctaLabel, variant(dark\|beige)` |
| `ServiceShowcase` | `eyebrow, title, lede, slugs[], ctaLabel, ctaHref` |
| `ServiceGrid` | `showFilter, group, limit, columns(2\|3\|4), variant(card\|minimal), theme` |
| `ProjectsRail` | `limit, ctaLabel, variant(light\|dark)` |
| `ProjectGrid` | `variant(grid\|masonry\|list), showFilter, limit, sector, theme` |
| `ProjectSpecSheet` | `project` (typed), `variant, theme, showNotes` |
| `CaseStudy` | `project` (typed), `theme` |
| `GalleryGrid` | `items[], variant(mosaic\|uniform\|strip)` + built-in lightbox |
| `ThumbnailGrid` | `slugs[], columns, ratio, ctaLabel, theme` |
| `SplitCompare` | `beforeImage, afterImage, startAt` — pointer/keyboard before-after slider |
| `VideoBlock` | `poster, src, mode(poster\|inline\|embed), stats[], aspect` |

### 5.3 Story, proof & people

| Component | Key props |
| --- | --- |
| `IntroSplit` | `eyebrow, title, body, stats[], link, image, reverse` |
| `FeatureSplit` | `features[]{eyebrow,title,body,list[],image,stat,cta}, reverse` |
| `BulletFeatures` | `bullets[]{title,text,icon}, image, quote, cta, variant(list\|cards\|dark)` |
| `StatsStrip` | `variant(numbers\|promises\|mixed), theme, image` |
| `ProcessAccordion` | `steps, variant(accordion\|cards)` |
| `Timeline` | `variant(vertical\|horizontal), theme` |
| `TeamGrid` | `limit, showCareers, theme` |
| `PricingGrid` | `showAddOns, showCalculator` + inline PKR budget calculator |
| `AwardsList` | `items, showPress, theme` |
| `TestimonialsSlider` | `variant(slider\|grid\|marquee), limit` |
| `ClientsMarquee` | `variant(text\|logos\|grid), speed` |
| `TabsShowcase` | `tabs[]{label,title,body,bullets[],image,stat,cta}` |

### 5.4 Editorial, conversion & utility

| Component | Key props |
| --- | --- |
| `MarqueeText` | `items[], size, speed, separator, variant, rotate` |
| `ImageMarquee` | `items[], rows(1\|2), speed, ratio` |
| `RichText` | `blocks[]` — `h2\|h3\|p\|list\|quote\|image\|gallery\|table\|callout\|divider\|html` |
| `JournalGrid` | `variant(feature\|grid\|list), limit, showFilter` |
| `FaqBlock` | `items, variant(split\|stacked), showSchema` |
| `CtaBand` | `variant(split\|center\|banner), image, marqueeText` |
| `ContactFormSection` | `endpoint, variant(split\|stacked), submitLabel, showInfoRail` |
| `ContactInfo` | `variant(cards\|split\|strip), showMap` — click-to-load maps |
| `NewsletterBand` | `variant(inline\|band), endpoint` |

**Rule for new sections:** if the reference has it, replicate the layout; if Woodex needs a section
the reference lacks, add it here rather than inlining markup in a page.

---

## 6. Motion specification

The reference uses GSAP + SplitText. This theme reproduces the same visual language with an in-house
engine (`src/scripts/motion.js`, ~4.4 kB gzipped) driven by **one rAF-throttled scroll loop**.
Individual behaviours subscribe to that loop; nothing else listens to `scroll`.

| Attribute | Effect |
| --- | --- |
| `data-heading-reveal="words\|chars"` (+`data-heading-stagger`) | SplitText equivalent: masked word/character reveal, bottom-to-top |
| `data-text-reveal` | Same treatment for paragraphs |
| `data-reveal="fade-up\|…\|clip-x"` (+`--reveal-delay`) | Ten entrance variants, fired once at 12% visibility |
| `data-stagger="90"` | Parent-level auto-stagger across children |
| `data-scroll-opacity[-from\|-to]` | Scroll-linked scrub fade (the reference's `opacity="1"`) |
| `data-scroll-fill` | Progress underline that fills as the block passes |
| `data-parallax="0.08"` | Vertical parallax, capped so it never fights the copy |
| `data-scroll-rail` + `-track` | Vertical scroll → horizontal travel |
| `data-marquee` / `data-marquee-vertical` (+ speed, dir) | Infinite loop; content duplicated at runtime |
| `data-counter` (+ prefix, suffix, decimals) | Counting statistics |
| `data-pin` / `data-pin-sticky` | Sticky side panels with `.is-pinned` state and a height guard |
| `data-accordion`, `data-tabs`, `data-slider*` | Disclosure, tab set, carousel — all keyboard complete |
| `data-magnetic`, `data-cursor`, `data-copy`, `data-to-top`, `data-countdown` | Micro-interactions |

**Non-negotiables (carried from the reference and enforced here):**

1. **Degrade to visible.** Pre-hidden animation states apply only when JS has flagged the document.
   Without JavaScript the page is fully readable.
2. **Respect reduced motion.** Every effect is disabled under `prefers-reduced-motion: reduce`.
3. **Animate once.** Nothing re-animates on scroll-back.
4. **Never animate body copy, tables or form labels.** If motion delays comprehension, it is out.

---

## 7. The frontend API

This is the layer that makes the theme easy for a human or an AI agent to customise.

### 7.1 Content modules — `src/data/`

| File | Contains | Drives |
| --- | --- | --- |
| `site.js` | name, legal name, contact, addresses, hours, socials, CTA copy, SEO defaults, stats | header, footer, schema, every page's meta |
| `services.js` | 17 services with lede, body, deliverables, duration, pricing, sector, icon, FAQs | `/service`, 17 service pages, mega menu, accordions |
| `projects.js` | 9 projects with brief/approach/outcome, metrics, gallery, testimonial, **spec sheet** | 3 portfolio layouts, 9 case studies, homepage reels |
| `articles.js` | 9 articles with a block-based body, topics, authors, reading time | 3 journal layouts, 9 article pages |
| `content.js` | team, offices, milestones, awards, pricing packages, add-ons, FAQs, testimonials, clients, process steps, stats | About, team, careers, pricing, FAQ, process, contact |
| `navigation.js` | primary nav + six mega panels, footer columns, legal links | header, drawer, footer, sitemap |
| `images.js` | **111 image slots** with canonical path, alt text and aspect ratio | every image on the site |

### 7.2 Helpers (import from the data modules, not from raw arrays)

```
services: servicesByGroup(group) · featuredServices() · getService(slug) · serviceMenu()
projects: featuredProjects(limit?) · getProject(slug) · projectsBySector(s) · projectNeighbours(slug) · sectorLabel(id)
articles: featuredArticles() · getArticle(slug) · articlesByTopic(t) · relatedArticles(slug, n) · formatDate(iso)
content:  faqsByCategory() · and direct imports of team / offices / milestones / awards / pricing
images:   serviceImage(slug) · projectImage(slug, i) · articleImage(slug) · teamImage(i) · avatarImage(i) · materialImage(i) · clientLogo(i)
```

### 7.3 Rebranding in one file

Editing `site.js` alone changes: the brand name and wordmark, phone, email, both studio addresses,
opening hours, response promise, social links, both CTA labels, the stats shown in counters, and the
default SEO title/description. No component edit is required.

### 7.4 How to add a page (the intended workflow)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PageHeader from '../components/global/PageHeader.astro';
import BulletFeatures from '../sections/BulletFeatures.astro';
import CtaBand from '../sections/CtaBand.astro';
---
<BaseLayout title="…" description="…" overlayHeader current="about">
  <PageHeader eyebrow="…" title="…" crumbs={[{ label: 'About' }]} />
  <BulletFeatures title="…" bullets={[…]} image="/images/features/feature-joinery.jpg" />
  <CtaBand title="…" primary={{ label: 'Start a project', href: '/contact-one' }} variant="split" />
</BaseLayout>
```

No CSS file, no script, no registry. This is the contract for Codex/Claude/Kimi contributions.

---

## 8. Imagery system

Real client photography is not required to run the site, and adding it requires no code change.

1. Every image slot has a canonical path in `src/data/images.js` (e.g. `/images/projects/contemporary-retreat-cover.jpg`).
2. `npm run images` (also run automatically before every build) checks each slot and writes a
   **branded SVG placeholder** when the photo is missing.
3. `src/generated/image-map.json` records which file actually exists, and `<Img>` resolves through it.
4. Drop a real file at the canonical path → the map picks it up → the placeholder is ignored.

An image swap is therefore a file drop, not a merge. `<Img>` also carries a fallback chain
(`.jpg` → `.svg` → `.webp` → `.png`) so a mid-session addition never renders a broken image.
The rule for all components: **images are always rendered through `src/components/ui/Img.astro`.**

Shipped at v1.0: 10 AI-generated interior photographs plus 101 branded SVG placeholders across
hero, feature, service, project, journal, people, office, material, client-logo and OG slots.

---

## 9. Accessibility

Target: **WCAG 2.2 AA**, verified by construction rather than aspiration.

- Semantic landmarks, a skip link, and a logical heading order on every template.
- Visible focus indicators everywhere (never `outline: none` without a replacement).
- Full keyboard support for mega menu, drawer (with focus trap and Escape), accordions, tabs,
  sliders, lightbox, before/after slider and the booking slot picker.
- Split headlines preserve the original sentence via `aria-label`, so screen readers read the
  sentence rather than the animation fragments.
- Reduced-motion honoured globally; no information depends on an animation.
- Form fields always labelled; errors carry icon plus text, never colour alone.
- Maps are click-to-load, so no third-party request or tracker runs unless the visitor asks.
- Contrast meets or exceeds 4.5:1 for body text against its background.
- Touch targets ≥ 44 × 44 px.

---

## 10. Performance & SEO

| Concern | Approach |
| --- | --- |
| JavaScript | No runtime dependencies. One motion module, one small inline head script to set the JS flag. |
| Fonts | System stacks — zero font requests, zero layout shift by default. |
| Images | Explicit `width`/`height` on every `<Img>` to reserve layout; `loading="lazy"` below the fold. |
| CSS | Six token-driven stylesheets, scoped component styles, no utility framework. |
| Build | 72 pages in ~4 s; fully static output deployable to any host, CDN or shared box. |
| Structured data | JSON-LD on all template types: Organization, Service, CreativeWork, BlogPosting, ItemList, FAQPage, HowTo, JobPosting, OfferCatalog, LocalBusiness, BreadcrumbList. |
| Metadata | Per-page title/description/OG/Twitter plus a manifest, favicon set and theme colour. |
| Crawling | `noindex` on legal, search, thank-you, 404, style-guide and instructions. |
| Duplicates | `/portfolio` ↔ `/portfolio-one` and `/journal` ↔ `/blog-one` are intentional layout variants; canonicalise to the `/…-one` routes. |

---

## 11. Quality gates

Run before any handover or deploy:

```bash
npm run images     # regenerate placeholders + resolver map
npm run build      # must finish with 0 errors, 0 warnings
npm run check      # astro check — type and prop errors
npm run templates  # regenerate templates-lib/
```

Manual pass:

- Every route in §3.1 returns 200 and renders real content (no `undefined`, no empty sections).
- Keyboard-only run through mega menu → drawer → accordion → tabs → lightbox → forms.
- `prefers-reduced-motion` enabled: content visible, nothing animating.
- JavaScript disabled: all content readable, forms still submittable.
- 375 px / 768 px / 1440 px pass with no horizontal scroll.
- Lighthouse ≥ 95 for performance, accessibility, best practices and SEO.

---

## 12. Handover & next steps

### Where things live

```
src/sections/            37 section components — the template library
src/pages/               40 page templates (72 built pages)
src/data/                the frontend API (edit here, not in components)
src/data/images.js       every image slot, canonical path + alt
src/generated/           build artefacts (image resolver map)
src/styles/tokens.css    every design decision in one file
src/scripts/motion.js    the motion engine
templates-lib/           per-section library with auto-generated prop docs
docs/                    content, deployment, QA and customisation guides
design.md                this document
```

### Recommended order of work on handover

1. Replace `site.js` with the client's real details (name, phone, addresses, socials, CTA copy).
2. Shoot and drop in photography at the canonical paths — no code change, no placeholder to remove.
3. Replace sample projects, articles and services with the real content set; keep the writing register.
4. Connect the two form endpoints (`ContactFormSection`, `NewsletterBand`) to a real backend.
5. Point `/` at the chosen homepage instead of the layout index.
6. Add analytics only if required, with IP anonymisation and a consent note in the privacy policy.

### Known gaps at v1.0

- **Real photography is not included.** Ten AI-generated images plus branded placeholders are shipped;
  interior images must be licensed or original before launch.
- **Forms are demo posts.** They validate, block double submits and show success/error states, but
  post to a placeholder endpoint. Wire to a real service.
- **Booking slots are illustrative.** The picker is client-side only; connect to a calendar API for
  live availability.
- **No CMS binding yet.** `RichText` is deliberately shaped like a headless CMS block schema
  (`h2 | h3 | p | list | quote | image | gallery | table | callout | divider | html`) so a Contentful
  or Sanity adapter is a mapping exercise, not a rewrite.
- **Vector placeholders for client logos.** Real monochrome logo files should replace them.
