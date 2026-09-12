#!/usr/bin/env node
/* ==========================================================================
   WOODEX MASTER THEME — build.mjs
   Optional prerender step. Zero dependencies (Node 18+).

     node build.mjs            → full build
     node build.mjs detail     → detail pages only
     node build.mjs fill       → fill [data-api] grids in pages
     node build.mjs templates  → sync templates/ from pages

   What it does:
   1. detail   — writes static project/*.html, service/*.html, blog/*.html
                 from the JSON content layer (SEO / no-JS fallback; the
                 dynamic routes project.html?slug=… stay available).
   2. fill     — renders data-api containers inside the 17 pages so content
                 exists without JS (browser hydration re-renders the same).
   3. templates— extracts every <section> marked with an S-number comment
                 into templates/sections/, and regenerates header/footer
                 samples + page skeletons.
   ========================================================================== */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import R from './assets/js/render.js';

const ROOT = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8');
const write = (p, s) => { mkdirSync(dirname(resolve(ROOT, p)), { recursive: true }); writeFileSync(resolve(ROOT, p), s); };
const DATA = {};
['site', 'navigation', 'services', 'projects', 'articles', 'testimonials', 'pricing', 'faqs', 'team', 'process']
  .forEach((k) => { DATA[k] = JSON.parse(read(`assets/data/${k}.json`)); });

const PAGES = ['index.html', 'home-two.html', 'home-three.html', 'about.html', 'services.html',
  'portfolio-one.html', 'portfolio-two.html', 'portfolio-three.html', 'blog-one.html', 'blog-two.html',
  'pricing-one.html', 'pricing-two.html', 'contact-one.html', 'contact-two.html', 'contact-three.html',
  'style-guide.html', 'instructions.html', '404.html', 'project.html', 'service-detail.html', 'blog-post.html'];

/* ---- shared list renderer (mirrors theme.js hydrate) -------------------- */
function renderList(api, attrs) {
  let items = DATA[api] ? DATA[api].slice() : [];
  if (attrs['data-filter']) {
    const [k, v] = attrs['data-filter'].split(':');
    items = items.filter((x) => String(x[k]) === v);
  }
  if ((attrs['data-order'] || '') === 'desc') items.reverse();
  const limit = parseInt(attrs['data-limit'] || '0', 10);
  if (limit > 0) items = items.slice(0, limit);
  return items.map((item, i) => {
    if (api === 'projects') return R.projectCard(item, i);
    if (api === 'services') return attrs['data-rows'] !== undefined ? R.serviceRow(item, i) : R.serviceCard(item, i);
    if (api === 'articles') return R.postCard(item, i);
    if (api === 'team') return R.teamCard(item);
    if (api === 'testimonials') return R.testimonialSlide(item);
    if (api === 'pricing') return R.priceCard(item);
    return '';
  }).join('\n          ');
}

/* ==========================================================================
   1. DETAIL PRERENDER
   ========================================================================== */
/* Detail pages live one level down (project/, service/, blog/) — rewrite
   root-relative hrefs/srcs so they resolve from the subdirectory.        */
function toSubdir(html) {
  return html
    .replace(/(href=")(?!https?:|mailto:|tel:|#|\.\.\/)([^"]*?\.html)/g, '$1../$2')
    .replace(/(src=")(assets\/)/g, '$1../$2')
    .replace(/(href=")(assets\/)/g, '$1../$2')
    .replace(/(data-preview=")(assets\/)/g, '$1../$2');
}

function heroSection(inner, dark, center, over) {
  return `<section class="hero-page wx-${dark ? 'dark' : 'light'}${center ? ' hero-page--center' : ''}${over ? ' hero-page--over' : ''}">
    <div class="wx-container hero-page__inner">
      ${inner}
    </div>
  </section>`;
}

function buildDetail() {
  /* projects */
  DATA.projects.forEach((p) => {
    const related = DATA.projects.filter((x) => x.slug !== p.slug).slice(0, 3);
    const hero = heroSection(`
      <nav class="wx-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true"></span><a href="portfolio-one.html">Portfolio</a><span aria-hidden="true"></span><a href="project/${p.slug}.html" aria-current="page">${R.esc(p.title)}</a></nav>
      <h1 class="wx-statement" data-reveal>${R.esc(p.title)}</h1>
      <p class="wx-lead" data-reveal data-reveal-delay="1">${R.esc(p.tagline)}</p>`, false, true);
    write(`project/${p.slug}.html`, toSubdir(R.pageShell({
      title: `${p.title} — Woodex Interior`,
      description: p.overview[0].slice(0, 155),
      headerVariant: 'centered', footerVariant: 'classic',
      body: hero + R.projectBody(p, related)
    })));
  });

  /* services */
  DATA.services.forEach((s) => {
    let related = DATA.projects.filter((x) => (s.relatedProjects || []).includes(x.slug));
    if (!related.length) related = DATA.projects.slice(0, 3);
    const hero = heroSection(`
      <nav class="wx-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true"></span><a href="services.html">Services</a><span aria-hidden="true"></span><a href="service/${s.slug}.html" aria-current="page">${R.esc(s.title)}</a></nav>
      <p class="wx-eyebrow" data-reveal>${R.esc(s.group)}</p>
      <h1 class="wx-statement" data-reveal>${R.esc(s.title)}</h1>
      <p class="wx-lead" data-reveal data-reveal-delay="1">${R.esc(s.summary)}</p>`);
    write(`service/${s.slug}.html`, toSubdir(R.pageShell({
      title: `${s.title} — Woodex Interior`,
      description: s.summary,
      headerVariant: 'light', footerVariant: 'classic',
      body: hero + R.serviceBody(s, DATA.process, related)
    })));
  });

  /* articles */
  DATA.articles.forEach((a) => {
    const related = DATA.articles.filter((x) => x.slug !== a.slug).slice(0, 3);
    const hero = heroSection(`
      <nav class="wx-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true"></span><a href="blog-one.html">Journal</a><span aria-hidden="true"></span><a href="blog/${a.slug}.html" aria-current="page">Article</a></nav>
      <p class="wx-eyebrow" data-reveal>${R.esc(a.category)}</p>
      <h1 class="wx-statement" data-reveal>${R.esc(a.title)}</h1>
      <p class="wx-lead" data-reveal data-reveal-delay="1">${R.esc(a.excerpt)}</p>`);
    write(`blog/${a.slug}.html`, toSubdir(R.pageShell({
      title: `${a.title} — Woodex Journal`,
      description: a.excerpt,
      headerVariant: 'light', footerVariant: 'cta',
      body: hero + R.postBody(a, related)
    })));
  });
  console.log(`detail   ✓ ${DATA.projects.length} projects, ${DATA.services.length} services, ${DATA.articles.length} articles`);
}

/* ==========================================================================
   2. FILL data-api CONTAINERS
   ========================================================================== */
function parseAttrs(tag) {
  const attrs = {};
  const re = /([a-zA-Z-]+)="([^"]*)"/g;
  let m; while ((m = re.exec(tag))) attrs[m[1]] = m[2];
  return attrs;
}

function buildFill() {
  PAGES.forEach((page) => {
    let html = read(page);
    let changed = false;
    html = html.replace(/<([a-z]+)((?:"[^"]*"|[^>"])*? data-api="([^"]+)"[^>]*)>\s*<\/\1>/g, (full, tag, attrStr, api) => {
      const attrs = parseAttrs(attrStr);
      changed = true;
      const inner = renderList(api, attrs);
      return `<${tag}${attrStr}>\n          ${inner}\n        </${tag}>`;
    });
    if (changed) write(page, html);
  });
  console.log('fill     ✓ data-api grids rendered into pages');
}

/* ==========================================================================
   3. SECTION / HEADER / FOOTER / PAGE TEMPLATES
   ========================================================================== */
const SECTION_MAP = {
  S01: ['s01-hero-slider', 'Hero slider — eyebrow, display H1, sub, CTAs, stacked image cards, dots, autoplay. Home One.'],
  S02: ['s02-hero-showcase', 'Fullscreen showcase hero — rotating headline slides with arrows and dots. Home Two.'],
  S03: ['s03-hero-media', 'Media hero — framed full-bleed image/video with play toggle. Home Three.'],
  S04: ['s04-hero-page', 'Inner page hero — breadcrumb, eyebrow, H1, lead. Variants: --over (image bg), --center, wx-dark.'],
  S05: ['s05-ticker', 'Statement ticker — giant marquee words with inline images.'],
  S06: ['s06-stats', 'Stats — odometer counters with captions, light or dark.'],
  S07: ['s07-intro-split', 'About intro split — stacked images + copy + checkmarks + CTA.'],
  S08: ['s08-services-grid', 'Services grid — numbered hover cards (JS-filled from services.json or static).'],
  S09: ['s09-services-showcase', 'Services showcase — sticky image beside full-width service link rows with cursor image preview.'],
  S10: ['s10-services-links', 'Service link rows — numbered full-width rows, hover cursor preview, group tags.'],
  S11: ['s11-portfolio-grid', 'Portfolio grid — filterable 3-col card grid with hover overlays.'],
  S12: ['s12-portfolio-cards', 'Portfolio cards — hover overlay cards in a 3-col grid (JS-filled or static).'],
  S13: ['s13-portfolio-feature', 'Featured project — split big image + meta + CTA.'],
  S14: ['s14-project-detail', 'Project detail body — meta grid, rich overview, gallery, sticky files aside.'],
  S15: ['s15-blog-grid', 'Blog grid — category chip, date, title, excerpt cards (JS-filled or static).'],
  S16: ['s16-blog-feature', 'Blog feature — large featured article card.'],
  S17: ['s17-testimonials', 'Testimonials slider — quote, monogram avatar, rating, auto dots.'],
  S18: ['s18-logos', 'Partner/client logo marquee — infinite, pauses on hover.'],
  S19: ['s19-faq', 'FAQ accordion — one open at a time (add data-multi for many).'],
  S20: ['s20-process', 'Process steps — numbered with connector line and durations.'],
  S21: ['s21-team', 'Team grid — monogram avatar, name, role (team.json).'],
  S22: ['s22-pricing-cards', 'Pricing cards — 3 tiers with one-time/monthly billing toggle.'],
  S23: ['s23-pricing-list', 'Pricing rows — package rows with include chips (dark edition).'],
  S24: ['s24-cta', 'CTA banner — big serif line + pill CTA. Variants: wx-dark, --media (bg image).'],
  S25: ['s25-contact-cards', 'Contact info cards — office / phone / email with icons.'],
  S26: ['s26-contact-form', 'Contact form — underlined inputs, select, textarea, states.'],
  S27: ['s27-newsletter', 'Newsletter band — inline email + submit.'],
  S28: ['s28-gallery-marquee', 'Gallery marquee — infinite photo strip (add --reverse).'],
  S29: ['s29-value-cards', 'Value cards — icon cards for differentiators.'],
  S30: ['s30-split-media', 'Split media — sticky image + copy + checkmarks (services showcase wrapper).'],
  S31: ['s31-rich-text', 'Rich text — article typography (h3, lists, quote, figure) beside author aside.'],
  S32: ['s32-map', 'Map block — styled studio map with address card.'],
  S33: ['s33-related', 'Related cards — "More projects / More articles" 3-up row.'],
  S34: ['s34-filter-bar', 'Filter chips — category filter wired to a grid via data-filters="#grid-id".']
};

function buildTemplates() {
  /* sections: extract from the first page that contains them */
  const found = {};
  const allPages = [...PAGES];
  for (const dir of ['project', 'service', 'blog']) {
    if (existsSync(resolve(ROOT, dir))) {
      readdirSync(resolve(ROOT, dir)).filter((f) => f.endsWith('.html')).forEach((f) => allPages.push(`${dir}/${f}`));
    }
  }
  allPages.forEach((page) => {
    const html = read(page);
    /* banner comments (===) and simple one-line comments */
    const res = [
      /<!--\s*=+\s*\n\s*(S\d\d)[^\n]*?\n\s*=+\s*-->\s*\n?\s*(<section[\s\S]*?<\/section>)/g,
      /<!--\s*(S\d\d)[^\n]*?-->\s*\n?\s*(<section[\s\S]*?<\/section>)/g
    ];
    res.forEach((re) => {
      let m; while ((m = re.exec(html))) {
        const id = m[1];
        if (!found[id] && SECTION_MAP[id]) {
          found[id] = true;
          const [file, desc] = SECTION_MAP[id];
          write(`templates/sections/${file}.html`,
            `<!-- ==========================================================================\n     ${id} · ${file}.html — ${desc}\n     Extracted from: ${page} · Auto-synced by build.mjs — edit the page, rerun build.\n     Usage: copy this block into any page between <main> and </main>.\n     ========================================================================== -->\n${m[2].replace(/\n {2}/g, '\n')}\n`);
        }
      }
    });
  });
  console.log(`templates ✓ sections synced (${Object.keys(found).length}/${Object.keys(SECTION_MAP).length})`);

  /* headers — usage + rendered sample */
  const headerDoc = (variant, use) => `<!-- Header variant "${variant}" — use on: ${use}\n     No markup needed: theme.js injects the header from assets/data/navigation.json.\n     Just set the attribute on <body>:\n     <body data-header="${variant}" ...> -->\n${R.headerHTML(variant, DATA.navigation, DATA.site, 'index.html')}\n`;
  write('templates/headers/h1-transparent.html', headerDoc('transparent', 'pages with an image hero at top (homes, portfolio-two/three, blog-two, contact-two). Transparent over hero, solid paper on scroll.'));
  write('templates/headers/h2-light.html', headerDoc('light', 'inner pages on the paper background (about, services, portfolio-one, blog-one, pricing-one, style-guide, instructions).'));
  write('templates/headers/h3-dark.html', headerDoc('dark', 'dark-hero inner pages (pricing-two, contact-three).'));
  write('templates/headers/h4-centered.html', headerDoc('centered', 'editorial / detail pages — centered logo with split nav.'));
  write('templates/headers/h5-side.html', headerDoc('side', 'showcase layouts — fixed left rail (portfolio-three).'));

  /* footers */
  const footerDoc = (variant, use) => `<!-- Footer variant "${variant}" — use on: ${use}\n     Injected by theme.js from assets/data/{site,navigation}.json.\n     Set: <body data-footer="${variant}" ...> -->\n${R.footerHTML(variant, DATA.navigation, DATA.site)}\n`;
  write('templates/footers/f1-classic.html', footerDoc('classic', 'most pages — big CTA band + 4 columns + ghost wordmark.'));
  write('templates/footers/f2-compact.html', footerDoc('compact', 'utility and contact pages — columns + bottom bar only.'));
  write('templates/footers/f3-cta.html', footerDoc('cta', 'journal pages — newsletter band + columns.'));

  /* page skeletons */
  const skeleton = (name, header, footer, sections) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PAGE TITLE — Woodex Interior</title>
  <meta name="description" content="Page description ~155 characters.">
  <link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/theme.css">
</head>
<body data-header="${header}" data-footer="${footer}">
<div class="wx-page">
<main id="main">
  <!-- ${name}: paste section templates in order -->
${sections.map((s) => `  <!-- ${s} → copy from templates/sections/ -->`).join('\n')}
</main>
</div>
<script src="assets/js/render.js"><\/script>
<script src="assets/js/theme.js"><\/script>
</body>
</html>
`;
  write('templates/pages/home-skeleton.html', skeleton('Home page', 'transparent', 'classic', ['S01/S02/S03 hero (pick one)', 'S05 ticker', 'S06 stats', 'S07 intro split', 'S08 services grid', 'S17 testimonials', 'S12 portfolio cards', 'S20 process', 'S15 blog grid', 'S24 CTA']));
  write('templates/pages/inner-skeleton.html', skeleton('Inner page', 'light', 'classic', ['S04 hero-page', 'section blocks', 'S24 CTA']));
  write('templates/pages/detail-skeleton.html', skeleton('Detail page (static or ?slug=)', 'centered', 'classic', ['S04 hero-page with breadcrumb', 'S14 project detail (or S31 rich text)', 'S33 related']));
  write('templates/pages/contact-skeleton.html', skeleton('Contact page', 'light', 'compact', ['S04 hero-page', 'S25 contact cards', 'S26 contact form', 'S32 map']));
  console.log('templates ✓ headers, footers, page skeletons written');
}

/* ========================================================================== */
const mode = process.argv[2] || 'all';
if (mode === 'all' || mode === 'detail') buildDetail();
if (mode === 'all' || mode === 'fill') buildFill();
if (mode === 'all' || mode === 'templates') buildTemplates();
console.log(`\nWoodex build complete (${mode}). Serve with: python3 -m http.server 4174 --bind 0.0.0.0`);
