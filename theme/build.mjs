#!/usr/bin/env node
/* ==========================================================================
   WOODEX MASTER THEME · build.mjs
   --------------------------------------------------------------------------
   Zero-dependency static site generator.

     theme/src/pages/**      page templates  →  site root
     theme/src/partials/**   shared chrome   →  injected via {{> name}}
     theme/src/sections/**   section blocks  →  injected via {{> sections/name}}
     theme/src/content/**    long-form HTML  →  injected into blog bodies
     theme/src/data/*.json   content API     →  copied to assets/data + loops
     theme/src/assets/**     css / js / img  →  copied to assets/

   TEMPLATE SYNTAX
     ---                          front matter (key: value, one per line)
     title: Page title
     ---
     {{ site.name }}              data lookup (scope chain: item → page → data → site)
     {{> header }}                include partial  (resolves partials/, sections/, pages/)
     {{#each projects}} … {{/each}}   loop; inside, fields resolve on the item
     {{ @index }} {{ @first }} {{ @last }} {{ @count }}   loop helpers
     {{#if featured}} … {{else}} … {{/if}}                truthiness test
     {{#unless hidden}} … {{/unless}}                     inverse test
     {{ year }}                   current year
     {{! a build comment }}       stripped from output
     {{{ rawHtmlField }}}         unescaped (all output is unescaped by default)

   USAGE
     node theme/build.mjs              build once
     node theme/build.mjs --watch      rebuild on change
     node theme/build.mjs --out=dist   build to another folder
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');           // repo root = deploy target
const SRC = path.join(__dirname, 'src');
const argv = process.argv.slice(2);
const arg = (k) => argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1];
const WATCH = argv.includes('--watch');
const OUT = path.resolve(arg('out') || ROOT);
const QUIET = argv.includes('--quiet');

const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'site.config.json'), 'utf8'));

/* ------------------------------------------------------------------ data */
const data = {};
function loadData() {
  const dir = path.join(SRC, 'data');
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    const name = f.replace(/\.json$/, '');
    data[name] = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  }
  /* Page-parameter registry: every file in data/pages/*.json is a map of
     pageId → section parameters. They merge into data.pages and are then
     auto-injected into the scope of any page whose front matter sets
     `page: <pageId>`. This keeps page templates declarative. */
  const pdir = path.join(dir, 'pages');
  if (fs.existsSync(pdir)) {
    const merged = {};
    for (const f of fs.readdirSync(pdir)) {
      if (!f.endsWith('.json')) continue;
      const map = JSON.parse(fs.readFileSync(path.join(pdir, f), 'utf8'));
      for (const k of Object.keys(map)) {
        merged[k] = Object.assign({}, merged[k], map[k]);
      }
    }
    data.pages = merged;
  }
  data.year = new Date().getFullYear();
  data.now = new Date().toISOString();
  data.theme = CONFIG.theme;
}

/* ------------------------------------------------------------- utilities */
const log = (...m) => { if (!QUIET) console.log(...m); };

/* --------------------------------------------------- derived collections
   Computed once per build so templates stay declarative and the raw JSON
   files remain clean enough to hand to a CMS later.                       */
const SERVICE_ICONS = {
  'commercial-interior': 'i-s-office',
  'residential-interior': 'i-s-home',
  'office-corporate': 'i-s-office',
  'retail-shop': 'i-s-retail',
  'brand-shop-outlet': 'i-s-brand',
  'office-fit-out': 'i-s-fitout',
  'commercial-fit-out': 'i-s-build',
  'residential-fit-out': 'i-s-home',
  'turnkey-interiors': 'i-s-shield',
  'interior-renovation': 'i-s-reno',
  'restaurant-interior': 'i-s-restaurant',
  'cafe-interior': 'i-s-cafe',
  'custom-furniture-joinery': 'i-s-joinery',
  'office-furniture': 'i-s-furniture',
  '3d-studio': 'i-s-3d'
};
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const initialsOf = (name) => String(name || '')
  .replace(/\(([^)]*)\)/g, ' ')
  .trim().split(/\s+/).filter(Boolean)
  .map((w) => w[0]).join('').slice(0, 2).toUpperCase();

function derive() {
  /* services → icon + index within group */
  if (Array.isArray(data.services)) {
    const groupCount = {};
    data.services.forEach((s, i) => {
      s.icon = SERVICE_ICONS[s.slug] || 'i-s-plan';
      s.index = i;
      groupCount[s.group] = (groupCount[s.group] || 0) + 1;
      s.groupIndex = groupCount[s.group];
    });
    data.serviceGroups = [...new Set(data.services.map((s) => s.group))];
  }
  /* posts → date parts + reading label */
  if (Array.isArray(data.posts)) {
    data.posts.forEach((p) => {
      const d = new Date(p.date + 'T12:00:00');
      p.day = String(d.getDate()).padStart(2, '0');
      p.month = MONTHS[d.getMonth()];
      p.monthShort = p.month.slice(0, 3);
      p.yearOnly = d.getFullYear();
      p.readLabel = p.readTime + ' min read';
      p.authorInitials = initialsOf(p.author);
      p.url = `blog/${p.slug}.html`;
    });
    data.featuredPost = data.posts.find((p) => p.featured) || data.posts[0];
    data.postCategories = [...new Set(data.posts.map((p) => p.category))];
  }
  /* projects → urls + counts */
  if (Array.isArray(data.projects)) {
    data.projects.forEach((p) => {
      p.url = `project/${p.slug}.html`;
      if (p.testimonial && typeof p.testimonial === 'object' && !p.testimonial.initials) {
        p.testimonial.initials = initialsOf(p.testimonial.name);
      }
    });
    const cats = {};
    data.projects.forEach((p) => { cats[p.category] = (cats[p.category] || 0) + 1; });
    data.projectCategories = Object.keys(cats).map((k) => ({ slug: k, count: cats[k] }));
    data.projectCount = data.projects.length;
  }
  /* services urls */
  if (Array.isArray(data.services)) data.services.forEach((s) => { s.url = `services/${s.slug}.html`; });
  /* awards → badge modifier */
  if (Array.isArray(data.awards)) {
    data.awards.forEach((a) => {
      /* the source value is the human label ("Winner", "Shortlisted", …);
         derive a badge modifier without destroying it */
      a.resultLabel = a.result;
      a.resultClass = /winner|1st|first|gold/i.test(String(a.result)) ? 'badge--accent' : 'badge--outline';
    });
  }
  /* testimonials initials fallback */
  if (Array.isArray(data.testimonials)) {
    data.testimonials.forEach((t) => {
      if (!t.initials) t.initials = initialsOf(t.name);
    });
  }
  /* team initials fallback */
  if (Array.isArray(data.team)) data.team.forEach((t) => { if (!t.initials) t.initials = initialsOf(t.name); });
  /* faq categories */
  if (Array.isArray(data.faqs)) {
    data.faqCategories = [...new Set(data.faqs.map((f) => f.cat))];
    data.faqCount = data.faqs.length;
  }
  /* flat helpers used across templates */
  data.serviceCount = Array.isArray(data.services) ? data.services.length : 0;
  data.postCount = Array.isArray(data.posts) ? data.posts.length : 0;
  data.teamCount = Array.isArray(data.team) ? data.team.length : 0;
}

const warn = (...m) => console.warn('⚠ ', ...m);
const get = (obj, p) => String(p).split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const truthy = (v) => !(v == null || v === '' || v === false || v === 0 || (Array.isArray(v) && !v.length));
const esc = (s) => String(s ?? '');

/* Resolve an include name to a file under src/ */
function resolveInclude(name) {
  const clean = name.trim().replace(/^\/+/, '');
  const tries = [
    clean, clean + '.html',
    `partials/${clean}.html`, `sections/${clean}.html`,
    `pages/${clean}.html`, `content/${clean}.html`, `content/${clean}`
  ];
  for (const t of tries) {
    const p = path.join(SRC, t);
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

/* --------------------------------------------------------- front matter */
function parseFrontMatter(src) {
  const fm = {};
  if (!src.startsWith('---')) return { fm, body: src };
  const end = src.indexOf('\n---', 3);
  if (end === -1) return { fm, body: src };
  const block = src.slice(3, end).replace(/^\r?\n/, '');
  const body = src.slice(end + 4).replace(/^\r?\n/, '');
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_.-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (v === 'true') v = true; else if (v === 'false') v = false;
    else if (/^-?\d+(\.\d+)?$/.test(v)) v = Number(v);
    else if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else v = v.replace(/^["']|["']$/g, '');
    fm[m[1]] = v;
  }
  return { fm, body };
}

/* ------------------------------------------------------------- renderer */
/* Scope chain: item scopes (innermost first) → page → data → globals */
function lookup(scopes, key) {
  /* Handlebars-style parent traversal: ../name, ../../base
     Each "../" starts the search one scope further out. The search still
     continues down the whole chain, so an unshadowed key resolves normally. */
  let skip = 0;
  let k = String(key);
  while (k.startsWith('../')) { skip++; k = k.slice(3); }
  k = k.trim();
  if (!k) return undefined;

  if (k === '@index' || k === '@first' || k === '@last' || k === '@count' || k === '@key') {
    for (let i = skip; i < scopes.length; i++) {
      const s = scopes[i];
      if (s && Object.prototype.hasOwnProperty.call(s, k)) return s[k];
    }
    return '';
  }
  for (let i = skip; i < scopes.length; i++) {
    const s = scopes[i];
    if (!s) continue;
    if (Object.prototype.hasOwnProperty.call(s, k)) return s[k];
    const v = get(s, k);
    if (v !== undefined) return v;
  }
  return undefined;
}

let includeDepth = 0;
const includeCount = new Map();

function render(template, scopes, fileLabel = 'string') {
  let out = template;

  /* 1 · strip build comments */
  out = out.replace(/\{\{![\s\S]*?\}\}/g, '');

  /* 2 · block helpers: #each / #if / #unless -- nesting-aware.
       findBlock() pairs each opening tag with its TRUE matching close, so a
       {{#if}} inside a {{#if}} (or {{#each}} inside {{#each}}) parses right. */
  let guard = 0;
  for (;;) {
    const blk = findBlock(out);
    if (!blk) break;
    if (++guard > 4000) { warn(`block helper depth guard in ${fileLabel}`); break; }
    const kind = blk.kind, expr = blk.expr, inner = blk.inner;
    const replacement = (() => {
      const parts = expr.trim().split(/\s+as\s+/);
      let key = parts[0].trim();
      const alias = parts[1] ? parts[1].trim() : null;

      if (kind === 'if' || kind === 'unless') {
        const neg = expr.trim().startsWith('!');
        const k = neg ? expr.trim().slice(1).trim() : key;
        let v = lookup(scopes, k);
        if (v === undefined && data[k] !== undefined) v = data[k];
        const t = truthy(v);
        const pass = kind === 'if' ? (neg ? !t : t) : !t;
        const [yes, no] = splitElse(inner);
        return pass ? render(yes, scopes, fileLabel) : (no ? render(no, scopes, fileLabel) : '');
      }

      /* each — supports modifiers:
           {{#each projects limit=6}}
           {{#each services where=group:Interior design}}
           {{#each posts pick=slug-a,slug-b}}
           {{#each projects offset=2 limit=4}}
           {{#each items sort=year reverse}}
           {{#each projects limit=@projLimit}}   ← value read from page scope */
      const [collKey, ...mods] = key.split(/\s+/);
      let list = lookup(scopes, collKey);
      if (list === undefined) list = get(data, collKey);
      if (!Array.isArray(list)) {
        for (const s of scopes) { const v = s && get(s, collKey); if (Array.isArray(v)) { list = v; break; } }
      }
      if (!Array.isArray(list)) {
        /* Absent collections are normal: sections are parameter driven and a
           page may simply not supply an optional list. Warn only when the key
           exists but holds something that cannot be iterated. */
        if (list !== undefined) warnOnce(`{{#each ${collKey}}} → present but not an array`, `each-type:${collKey}:${fileLabel}`, fileLabel);
        return '';
      }
      list = list.slice();

      const modVal = (name) => {
        const m = mods.find((x) => x.startsWith(name + '='));
        if (!m) return null;
        let v = m.slice(name.length + 1);
        if (v.startsWith('@')) v = lookup(scopes, v.slice(1));
        return v;
      };
      const hasMod = (name) => mods.includes(name);

      const pick = modVal('pick');
      if (pick) {
        const ids = String(pick).split(',').map((s) => s.trim()).filter(Boolean);
        list = ids.map((id) => list.find((it) => it && (it.slug === id || it.id === id || it.name === id))).filter(Boolean);
      }
      const where = modVal('where');
      if (where) {
        /* one condition, or several OR-ed with commas:
             where=group:Interior design
             where=category:retail,category:hospitality           */
        const conds = String(where).split(',').map((c) => c.trim()).filter(Boolean).map((c) => {
          const [f, ...rest] = c.split(':');
          return { f: f.trim(), val: rest.join(':').trim() };
        });
        list = list.filter((it) => conds.some(({ f, val }) => {
          const v = it && get(it, f);
          return Array.isArray(v) ? v.map(String).includes(val) : String(v ?? '') === String(val);
        }));
      }
      const sortBy = modVal('sort');
      if (sortBy) list.sort((a, b) => {
        const x = get(a, sortBy), y = get(b, sortBy);
        return (typeof x === 'number' && typeof y === 'number') ? x - y : String(x).localeCompare(String(y));
      });
      if (hasMod('reverse')) list.reverse();
      const offset = parseInt(modVal('offset') ?? '0', 10);
      if (offset) list = list.slice(offset);
      const limit = modVal('limit');
      if (limit != null && limit !== '') list = list.slice(0, parseInt(limit, 10) || list.length);
      key = collKey;
      return list.map((item, i) => {
        const ctx = (item && typeof item === 'object')
          ? Object.assign({}, item, {
              '@index': i, '@first': i === 0, '@last': i === list.length - 1,
              '@count': list.length, '@key': key,
              ...(alias ? { [alias]: item } : {})
            })
          : { this: item, value: item, '@index': i, '@first': i === 0, '@last': i === list.length - 1, '@count': list.length, ...(alias ? { [alias]: item } : {}) };
        return render(inner, [ctx, ...scopes], fileLabel);
      }).join('');
    })();
    out = out.slice(0, blk.start) + replacement + out.slice(blk.closeEnd);
  }
  /* an unbalanced template can leave orphan tags behind -- strip and report */
  out = out.replace(/\{\{\/(?:each|if|unless)\}\}/g, (m) => { warnOnce(`stray closing tag ${m}`, `stray-close:${fileLabel}`, fileLabel); return ''; });
  out = out.replace(/\{\{#(?:each|if|unless)\s+[^}]*\}\}/g, (m) => { warnOnce(`unclosed block ${m.trim()}`, `stray-open:${fileLabel}`, fileLabel); return ''; });

  /* 3 · includes */
  guard = 0;
  out = out.replace(/\{\{>\s*((?:[^{}]|\{\{[^{}]*\}\})+?)\s*\}\}/g, (whole, rawName) => {
    if (++guard > 800) return '';
    /* allow tokens inside include names, e.g. {{> {{item.body}} }} */
    const resolved = rawName.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (w, k) => {
      const v = lookup(scopes, k.trim());
      return v == null ? '' : String(v);
    });
    /* `with=<scopeKey>` pushes that object as a nearer scope, so the same
       section template can be placed several times on one page with different
       parameters.  e.g. {{> sections/svc-grid with=svcFitout }} */
    let extraScope = null;
    const name = resolved.replace(/\s+with=([A-Za-z0-9_.\-]+)\s*$/i, (w, key) => {
      const v = lookup(scopes, key);
      if (v && typeof v === 'object' && !Array.isArray(v)) extraScope = v;
      else if (v != null) warn(`include "with=${key}" is not an object — ignored`);
      return '';
    }).trim();
    const p = resolveInclude(name);
    if (!p) { warn(`include not found: "{{> ${name}}}" in ${fileLabel}`); return `<!-- missing include: ${esc(name)} -->`; }
    includeDepth++;
    if (includeDepth > 24) { includeDepth--; warn(`include recursion guard at ${name}`); return ''; }
    const src = fs.readFileSync(p, 'utf8');
    const rendered = render(src, extraScope ? [extraScope, ...scopes] : scopes, path.relative(SRC, p));
    includeDepth--;
    includeCount.set(name, (includeCount.get(name) || 0) + 1);
    return rendered;
  });

  /* 4 · value interpolation */
  out = out.replace(/\{\{\{\s*([^}]+?)\s*\}\}\}|\{\{\s*([^#/>{][^}]*?)\s*\}\}/g, (whole, raw, expr) => {
    const key = (raw || expr || '').trim();
    if (!key) return '';
    /* simple ternary: {{ cond ? a : b }} */
    const tern = key.match(/^(.+?)\s*\?\s*(.*?)\s*:\s*(.*)$/);
    if (tern) {
      const c = lookup(scopes, tern[1].trim());
      return esc(lookup(scopes, truthy(c) ? tern[2].trim() : tern[3].trim()) ?? (truthy(c) ? tern[2] : tern[3]).trim().replace(/^['"]|['"]$/g, ''));
    }
    /* literal strings */
    if (/^['"].*['"]$/.test(key)) return key.slice(1, -1);
    let v = lookup(scopes, key);
    if (v === undefined) v = get(data, key);
    if (v === undefined) v = get({ data }, key);
    if (v === undefined) {
      if (!MISSING.has(key)) { MISSING.add(key); warn(`unresolved token "{{ ${key} }}" in ${fileLabel}`); }
      return '';
    }
    if (Array.isArray(v)) return v.join(', ');
    if (typeof v === 'object') return JSON.stringify(v);
    return esc(v);
  });

  return out;
}
const MISSING = new Set();
const WARNED = new Set();
function warnOnce(msg, key, fileLabel) {
  if (WARNED.has(key)) return;
  WARNED.add(key);
  warn(`${msg} (${fileLabel})`);
}

/* Split an if/unless body at its TOP-LEVEL {{else}} only -- an {{else}} that
   belongs to a nested block must stay inside that nested block. */
function splitElse(inner) {
  const ANY = /\{\{#(?:each|if|unless)\b|\{\{\/(?:each|if|unless)\}\}|\{\{else\}\}/g;
  let depth = 0, m;
  while ((m = ANY.exec(inner))) {
    if (m[0][2] === '#') depth++;
    else if (m[0][2] === '/') depth--;
    else if (depth === 0) return [inner.slice(0, m.index), inner.slice(m.index + m[0].length)];
  }
  return [inner, null];
}

/* Locate the first block opening tag and its TRUE matching closing tag,
   counting nested openings of any kind. This is what makes a {{#if}} inside a
   {{#if}} -- or a {{#each}} inside a {{#each}} -- parse correctly. */
function findBlock(src) {
  const OPEN = /\{\{#(each|if|unless)\s+([^}]+?)\s*\}\}/g;
  const m = OPEN.exec(src);
  if (!m) return null;
  const kind = m[1];
  const contentStart = m.index + m[0].length;
  const ANY = /\{\{#(?:each|if|unless)\b|\{\{\/(?:each|if|unless)\}\}/g;
  ANY.lastIndex = contentStart;
  let depth = 1, mm;
  while ((mm = ANY.exec(src))) {
    if (mm[0][2] === '#') { depth++; continue; }
    if (--depth === 0) {
      return { kind, expr: m[2], start: m.index, contentStart,
               end: mm.index, closeEnd: mm.index + mm[0].length,
               inner: src.slice(contentStart, mm.index) };
    }
  }
  warnOnce(`unclosed {{#${kind} ${m[2].trim()}}}`, `unclosed:${kind}:${m[2]}`, 'template');
  return null;
}

/* ------------------------------------------------------------ html tools */
function tidy(html) {
  return html
    .replace(/<!--\s*build:strip\s*-->[\s\S]*?<!--\s*\/build:strip\s*-->/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
}
function writeFileSafe(rel, content) {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const prev = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
  if (prev !== content) { fs.writeFileSync(p, content); written.push(rel); } else { unchanged++; }
}

/* --------------------------------------------------------------- pages */
const written = [];
let unchanged = 0;
const allOutputs = [];

function buildPage(templatePath, extraScope = {}, outRel = null) {
  const raw = fs.readFileSync(templatePath, 'utf8');
  const { fm, body } = parseFrontMatter(raw);
  /* Page parameters from data/pages/*.json, keyed by front-matter `page:` */
  const pageParams = (fm.page && data.pages && data.pages[fm.page]) || {};
  const scope = Object.assign({}, pageParams, fm, extraScope);
  /* Auto-compute the relative asset prefix from the output depth so partials
     work identically at /about.html and /services/foo.html */
  const rel = outRel || path.relative(path.join(SRC, 'pages'), templatePath);
  const depth = path.dirname(rel).split(path.sep).filter((d) => d && d !== '.').length;
  if (scope.base === undefined) scope.base = '../'.repeat(depth);
  /* Scope chain, nearest first:
       scope        → front matter + data/pages/<page>.json + generated item
       { page }     → lets a section read {{page.title}} etc.
       defaults     → src/data/defaults.json, site-wide parameter fallbacks
       data         → every content collection
     A section parameter therefore resolves to the most specific value
     available, and always resolves to something. */
  const scopes = [scope, { page: scope }, data.defaults || {}, data, { data }];

  /* Front-matter values may themselves contain tokens. Generated detail pages
     rely on this, e.g.  title: "{{item.title}} — {{item.categoryLabel}}".
     Resolve them against the page scope so <head>, OG tags and the build
     manifest all receive real values rather than raw template syntax. */
  for (const k of Object.keys(scope)) {
    const v = scope[k];
    if (typeof v === 'string' && v.indexOf('{{') !== -1) {
      scope[k] = render(v, scopes, `front matter: ${k}`);
    }
  }

  let html = render(body, scopes, path.relative(SRC, templatePath));

  /* Whole-document chrome tokens */
  html = html.replace(/<!--\s*@([a-z-]+)\s*-->/g, (_, k) => {
    if (k === 'head') return renderHead(scope);
    if (k === 'open-body') return renderOpenBody(scope);
    if (k === 'close-body') return renderCloseBody(scope);
    return '';
  });

  writeFileSafe(rel, tidy(html));
  allOutputs.push({ rel, title: scope.title || '', desc: scope.description || '' });
  return rel;
}

function renderHead(s) {
  const site = data.site;
  const B = s.base || '';
  const seo = site.seo || {};
  const title = s.title ? `${s.title}${s.noSuffix ? '' : (seo.titleSuffix || '')}` : (seo.defaultTitle || site.name);
  const desc = s.description || seo.defaultDescription || '';
  const img = s.ogImage ? (B + s.ogImage) : seo.ogImage;
  const canonical = s.canonical || '';
  const robots = s.robots || 'index, follow';
  const themeColor = s.themeColor || '#F8F3EA';
  return `<!doctype html>
<html lang="${s.lang || 'en'}" class="no-js" data-theme="${s.theme || 'canvas'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="${esc(robots)}">
<meta name="theme-color" content="${themeColor}">
<meta name="generator" content="${esc(site.build.generator)} v${esc(site.build.themeVersion)}">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ''}
<meta property="og:type" content="${esc(s.ogType || 'website')}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
${img ? `<meta property="og:image" content="${esc(img)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="${esc(seo.twitterHandle || '')}">
<link rel="icon" href="${B}assets/images/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${B}assets/images/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Manrope:wght@300..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${B}assets/css/fonts.css">
<link rel="stylesheet" href="${B}assets/css/01-tokens.css">
<link rel="stylesheet" href="${B}assets/css/02-base.css">
<link rel="stylesheet" href="${B}assets/css/03-components.css">
<link rel="stylesheet" href="${B}assets/css/04-chrome.css">
<link rel="stylesheet" href="${B}assets/css/05-motion.css">
<link rel="stylesheet" href="${B}assets/css/06-sections.css">
<link rel="stylesheet" href="${B}assets/css/07-sections-b.css">
<link rel="stylesheet" href="${B}assets/css/08-responsive.css">
<link rel="stylesheet" href="${B}assets/css/09-docs.css">
${s.extraCSS ? `<link rel="stylesheet" href="${B}${esc(s.extraCSS)}">` : ''}
${s.noIndex ? '<meta name="robots" content="noindex,nofollow">' : ''}
<script type="application/ld+json">
${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': (site.schema && site.schema['@type']) || 'Organization',
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: s.canonical || '',
    email: site.email,
    telephone: site.phone,
    foundingDate: String(site.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: 'PK'
    },
    areaServed: site.serviceCities,
    sameAs: Object.values(site.social || {})
  }, null, 0)}
</script>
${s.extraHead || ''}
</head>`;
}

function renderOpenBody(s) {
  const cls = ['page', s.bodyClass, s.page ? `page--${s.page}` : ''].filter(Boolean).join(' ');
  const attrs = [
    `class="${cls}"`,
    s.page ? `data-page="${esc(s.page)}"` : '',
    s.theme ? `data-theme="${esc(s.theme)}"` : '',
    s.api !== undefined ? `data-api="${esc(s.api)}"` : 'data-api="site,navigation"',
    s.density ? `data-density="${esc(s.density)}"` : ''
  ].filter(Boolean).join(' ');
  return `<body ${attrs}>`;
}

function renderCloseBody(s) {
  const B = (s && s.base) || '';
  return `
<script src="${B}assets/js/util.js" defer></script>
<script src="${B}assets/js/api.js" defer></script>
<script src="${B}assets/js/chrome.js" defer></script>
<script src="${B}assets/js/motion.js" defer></script>
<script src="${B}assets/js/sections.js" defer></script>
<script src="${B}assets/js/forms.js" defer></script>
<script src="${B}assets/js/theme.js" defer></script>
</body>
</html>`;
}

/* ------------------------------------------------------------- manifests */
function buildStaticPages() {
  const dir = path.join(SRC, 'pages');
  const walk = (d, base = '') => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('_')) continue;                 // _partials inside pages/
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full, path.join(base, e.name));
      else if (e.name.endsWith('.html')) buildPage(full, {}, path.join(base, e.name));
    }
  };
  walk(dir);
}

function buildGeneratedPages() {
  for (const g of CONFIG.generate || []) {
    const tpl = path.join(SRC, g.template);
    if (!fs.existsSync(tpl)) { warn(`generate template missing: ${g.template}`); continue; }
    const list = Array.isArray(data[g.collection]) ? data[g.collection] : get(data, g.collection);
    if (!Array.isArray(list)) { warn(`generate collection "${g.collection}" is not an array`); continue; }
    list.forEach((item, i) => {
      const outRel = g.out.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => esc(item[k] ?? ''));
      const scope = Object.assign({}, g.scope || {}, {
        item, [g.as || 'item']: item,
        ...(g.inject || {})
      });
      /* Neighbouring items for prev/next */
      scope.prevItem = list[(i - 1 + list.length) % list.length];
      scope.nextItem = list[(i + 1) % list.length];
      scope.itemCount = list.length;
      scope.itemIndex = i;
      buildPage(tpl, scope, outRel);
    });
  }
}

/* ----------------------------------------------------------- static files */
function copyAssets() {
  const src = path.join(SRC, 'assets');
  const dest = path.join(OUT, 'assets');
  const walk = (d, rel = '') => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const s = path.join(d, e.name), r = path.join(rel, e.name);
      if (e.isDirectory()) walk(s, r);
      else {
        const target = path.join(dest, r);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        const a = fs.statSync(s);
        const b = fs.existsSync(target) ? fs.statSync(target) : null;
        if (!b || b.size !== a.size || b.mtimeMs < a.mtimeMs) {
          fs.copyFileSync(s, target); written.push('assets/' + r);
        } else unchanged++;
      }
    }
  };
  walk(src);
  /* Data files double as the runtime API */
  fs.mkdirSync(path.join(dest, 'data'), { recursive: true });
  for (const f of fs.readdirSync(path.join(SRC, 'data'))) {
    if (!f.endsWith('.json')) continue;
    fs.copyFileSync(path.join(SRC, 'data', f), path.join(dest, 'data', f));
  }
}

function buildSitemap() {
  const base = (CONFIG.site && CONFIG.site.url) || '';
  if (!base) return;
  const urls = allOutputs
    .filter((o) => !/^(privacy|terms|accessibility|thank-you|instructions|style-guide)/.test(o.rel))
    .map((o) => `  <url><loc>${base}/${o.rel.replace(/^index\.html$/, '')}</loc><changefreq>monthly</changefreq><priority>${o.rel === 'index.html' ? '1.0' : '0.7'}</priority></url>`)
    .join('\n');
  writeFileSafe('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  writeFileSafe('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
}

function buildManifest() {
  const manifest = {
    name: CONFIG.theme.name,
    version: CONFIG.theme.version,
    built: new Date().toISOString(),
    pages: allOutputs.length,
    outputs: allOutputs.map((o) => o.rel),
    collections: Object.keys(data).filter((k) => Array.isArray(data[k])).map((k) => ({ name: k, items: data[k].length })),
    includes: [...includeCount.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ include: k, used: v }))
  };

  /* The manifest is version-controlled, so rewriting it on a no-op build would
     dirty the working tree with a timestamp diff and nothing else. Compare
     against the committed copy ignoring `built`, and keep the existing file
     when nothing substantive changed. `built` therefore means "when the output
     last actually changed", which is the more useful reading anyway. */
  const file = path.join(__dirname, 'build-manifest.json');
  if (fs.existsSync(file)) {
    try {
      const prev = JSON.parse(fs.readFileSync(file, 'utf8'));
      const strip = (o) => JSON.stringify({ ...o, built: null });
      /* Nothing but the clock differs: keep the committed file untouched. */
      if (strip(prev) === strip(manifest)) return;
    } catch {
      /* unreadable or corrupt manifest — fall through and rewrite it */
    }
  }
  fs.writeFileSync(file, JSON.stringify(manifest, null, 2));
}

/* ------------------------------------------------------------------- run */
function build() {
  const t0 = Date.now();
  written.length = 0; unchanged = 0; allOutputs.length = 0; includeCount.clear(); MISSING.clear();
  loadData();
  derive();
  buildStaticPages();
  buildGeneratedPages();
  copyAssets();
  buildSitemap();
  buildManifest();
  log(`✔ ${CONFIG.theme.name} v${CONFIG.theme.version} — ${allOutputs.length} pages, ${written.length} written, ${unchanged} unchanged · ${Date.now() - t0}ms → ${path.relative(process.cwd(), OUT) || '.'}`);
}

build();

if (WATCH) {
  log('👀 watching theme/src …  (Ctrl-C to stop)');
  let timer = null;
  fs.watch(SRC, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => { try { build(); } catch (e) { warn(e.message); } }, 120);
  });
}
