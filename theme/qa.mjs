#!/usr/bin/env node
/* ==========================================================================
   WOODEX MASTER THEME · qa.mjs
   --------------------------------------------------------------------------
   Zero-dependency audit of the BUILT site. Complements build.mjs --check,
   which validates that the templates render; this validates that what they
   rendered is actually correct HTML that works in a browser.

     node theme/qa.mjs                 audit the built output at the repo root
     node theme/qa.mjs --out=<dir>     audit a different output directory
     node theme/qa.mjs --quiet         only print on failure

   Exits 0 when every gate passes and 1 otherwise, so it can be used directly
   as a pre-commit or CI gate. Run it after any build.

   WHAT IT CHECKS
     structure    one <h1> per page, balanced tags, all four landmarks, skip link
     references   every href / src / meta content / CSS url() / JSON-LD string
                  resolves to a file that exists  (five channels — auditing only
                  href and src misses og:image, CSS backgrounds and structured
                  data, which is how broken images slip through)
     fragments    every href="#id", every cross-page page.html#id and every SVG
                  sprite <use href="#i-*"> points at an id that exists
     ids          no duplicates on any page; role="button" is focusable
     data         every JSON file parses; no unrendered {{tokens}} anywhere
     hygiene      no empty href/src, no href="#", no empty data-* that would
                  shadow a JS config fallback, no undefined / NaN / [object
                  Object], no placeholder social URLs
     structured   every JSON-LD block parses; url and sameAs are never empty
     a11y         every <img> has alt text
   ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const arg = (k) => argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1];
const OUT = path.resolve(arg('out') || ROOT);
const QUIET = argv.includes('--quiet');

/* Directories that are never built output: the legacy prototype duplicate, the
   WordPress port, and the theme source itself. Source partials and content
   fragments are not pages and fail every page-level gate, so they must not be
   swept in. */
const EXCLUDED_DIRS = new Set(['WOODEX-INT', 'WOODEX-WP', 'theme', 'node_modules', 'deploy-key']);

/* Legacy prototype pages that sit at the repo root but are not built from
   theme/src. They cross-link only each other and are audited separately (see
   the note in theme/docs/design.md). */
const LEGACY = /^(company-index|journal|portfolio|services)\.html$/;

/* Strings that must never appear in output. These are the residues of probe
   builds and temporary test edits; if one survives a revert it means the
   working tree is dirty in a way that would ship. */
const PROBES = [
  'https://woodexinterior.pk',
  'probe-config-reload.example',
  'probe-watch-test.example',
  'watchprobe',
  'PROBE',
  'TEMP QA',
  '+92 321',
  '3211234567',
  'api.example.test',
];

/* Social platforms whose bare homepage URL is an unfilled placeholder. The
   build blanks these in derive(), so any that reach output is a regression. */
const BARE_SOCIALS = [
  'instagram.com/', 'facebook.com/', 'linkedin.com/',
  'pinterest.com/', 'youtube.com/', 'x.com/',
];

const BALANCED = ['div', 'section', 'figure', 'figcaption', 'a', 'ul', 'ol', 'li',
  'article', 'aside', 'nav', 'button', 'form', 'dl', 'dt', 'dd', 'header',
  'footer', 'main', 'picture', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'table',
  'thead', 'tbody', 'tr', 'td', 'th', 'label', 'select', 'option'];

const ASSET_RE = /\.(jpg|jpeg|png|svg|webp|gif|ico|mp4|webm)$/i;

const issues = [];
const fail = (where, what) => issues.push(`${where}: ${what}`);

/* --------------------------------------------------------------- discovery */
function walk(dir, rel = '') {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const abs = path.join(dir, e.name);
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (!rel && EXCLUDED_DIRS.has(e.name)) continue; /* only skip at the root */
      out.push(...walk(abs, r));
    } else if (e.name.endsWith('.html') && !LEGACY.test(r)) {
      out.push(r);
    }
  }
  return out;
}

/* Prefer the build manifest: it lists exactly what build.mjs wrote, so the
   audit covers precisely the generated site and nothing that happens to be
   sitting in the output directory. Fall back to a walk when auditing an
   --out=<dir> that has no manifest. */
function discoverPages() {
  const manifest = path.join(__dirname, 'build-manifest.json');
  if (OUT === ROOT && fs.existsSync(manifest)) {
    try {
      const outputs = JSON.parse(fs.readFileSync(manifest, 'utf8')).outputs;
      if (Array.isArray(outputs) && outputs.length) {
        const found = outputs.filter((o) => fs.existsSync(path.join(OUT, o)));
        if (found.length === outputs.length) return found.sort();
        const gone = outputs.filter((o) => !found.includes(o));
        fail('build-manifest.json', `lists ${gone.length} page(s) that are not on disk: ${gone.slice(0, 5).join(', ')}`);
      }
    } catch (e) {
      fail('build-manifest.json', `unreadable (${e.message}); falling back to a directory walk`);
    }
  }
  return walk(OUT).sort();
}

const pages = discoverPages();

/* Read every page once. ids are collected up front so cross-page fragment
   links can be checked against their target, not just the current page. */
const src = new Map();
const ids = new Map();
for (const p of pages) {
  const s = fs.readFileSync(path.join(OUT, p), 'utf8');
  src.set(p, s);
  ids.set(p, new Set(s.match(/\sid="([^"]+)"/g)?.map((m) => m.slice(5, -1)) ?? []));
}

/* Reference resolution. External, protocol and empty URLs are not our
   problem here; everything else must exist on disk relative to the page. */
const unresolved = new Map();
function checkRef(u, base, kind) {
  const clean = String(u).trim().split('#')[0].split('?')[0];
  if (!clean) return;
  if (/^(mailto:|tel:|data:|https?:|\/\/|javascript:)/i.test(clean)) return;
  if (clean.includes('%23')) return;
  const abs = path.normalize(path.join(base, clean));
  if (!fs.existsSync(abs)) {
    const key = `${clean}|${kind}`;
    unresolved.set(key, (unresolved.get(key) ?? 0) + 1);
  }
}

/* Recurse into parsed JSON-LD looking for asset paths. */
function walkJson(node, base) {
  if (Array.isArray(node)) return node.forEach((n) => walkJson(n, base));
  if (node && typeof node === 'object') {
    return Object.values(node).forEach((v) => walkJson(v, base));
  }
  if (typeof node === 'string' && ASSET_RE.test(node)) checkRef(node, base, 'JSON-LD');
}

/* ------------------------------------------------------------------- gates */
let h1Total = 0, ldTotal = 0, formTotal = 0, imgTotal = 0;

for (const p of pages) {
  const s = src.get(p);
  const base = path.dirname(path.join(OUT, p));

  /* --- one h1 --- */
  const h1 = (s.match(/<h1[\s>]/g) ?? []).length;
  h1Total += h1;
  if (h1 !== 1) fail(p, `${h1} <h1> elements (expected exactly 1)`);

  /* --- landmarks + skip link --- */
  for (const lm of ['<header', '<nav', '<main', '<footer']) {
    if (!s.includes(lm)) fail(p, `missing ${lm} landmark`);
  }
  if (!/class="[^"]*skip[^"]*"|skip-link|Skip to/.test(s)) {
    fail(p, 'no skip link');
  }

  /* --- tag balance --- */
  for (const t of BALANCED) {
    const open = (s.match(new RegExp(`<${t}[\\s>]`, 'g')) ?? []).length;
    const close = (s.match(new RegExp(`</${t}>`, 'g')) ?? []).length;
    if (open !== close) fail(p, `<${t}> unbalanced (${open} open / ${close} close)`);
  }

  /* --- unrendered tokens. Only {{ is checked: }} appears legitimately inside
         JSON-LD as nested-object closers, so counting it produces false hits. --- */
  if (s.includes('{{')) fail(p, 'unrendered {{token}} in output');

  /* --- hygiene: empty and dead attributes --- */
  const dead = [
    ['href=""', 'empty href'],
    ['href="#"', 'dead href="#"'],
    ['src=""', 'empty src'],
    ['action=""', 'empty form action'],
    ['data-endpoint=""', 'empty data-endpoint (shadows CONFIG.formEndpoint)'],
    ['data-reel=""', 'empty data-reel'],
    ['alt=""', null], /* decorative alt is legal, checked separately */
  ];
  for (const [needle, label] of dead) {
    if (label && s.includes(needle)) fail(p, label);
  }

  /* --- junk values from a failed template lookup --- */
  for (const j of ['undefined', 'NaN', '[object Object]', 'null,null']) {
    if (s.includes(j)) fail(p, `junk value "${j}" in output`);
  }

  /* --- leaked probe strings --- */
  for (const probe of PROBES) if (s.includes(probe)) fail(p, `leaked probe "${probe}"`);

  /* --- placeholder socials --- */
  for (const dom of BARE_SOCIALS) {
    if (s.includes(`href="https://${dom}"`) || s.includes(`href="http://${dom}"`)) {
      fail(p, `unfilled social placeholder ${dom}`);
    }
  }

  /* --- duplicate ids --- */
  const seen = new Set();
  for (const id of s.match(/\sid="([^"]+)"/g)?.map((m) => m.slice(5, -1)) ?? []) {
    if (seen.has(id)) fail(p, `duplicate id="${id}"`);
    seen.add(id);
  }

  /* --- fragments: same-page, cross-page, sprite --- */
  const mine = ids.get(p);
  for (const frag of s.match(/href="#([^"]*)"/g) ?? []) {
    const f = frag.slice(7, -1);
    if (!f) continue;
    if (!mine.has(f)) {
      fail(p, f.startsWith('i-')
        ? `sprite <use href="#${f}"> references a symbol that does not exist`
        : `href="#${f}" points at an id that does not exist on this page`);
    }
  }
  for (const m of s.match(/href="([^"#]+\.html)#([^"]+)"/g) ?? []) {
    const [, href, frag] = m.slice(6, -1).match(/^([^"]+)#([^"]+)$/) ?? [];
    if (!href || !frag) continue;
    const target = path.normalize(path.join(path.dirname(p), href));
    if (ids.has(target) && !ids.get(target).has(frag)) {
      fail(p, `${href}#${frag} points at an id that does not exist on ${target}`);
    }
  }

  /* --- role="button" must be keyboard reachable --- */
  for (const m of s.match(/<[^>]*role="button"[^>]*>/g) ?? []) {
    if (m.startsWith('<button')) continue; /* native button is activatable */
    if (!/tabindex=/.test(m)) fail(p, `role="button" without tabindex is not focusable`);
  }

  /* --- images must have alt --- */
  for (const m of s.match(/<img\b[^>]*>/g) ?? []) {
    imgTotal += 1;
    if (!/\balt=/.test(m)) fail(p, `<img> without alt text`);
  }

  formTotal += (s.match(/<form\b/g) ?? []).length;

  /* --- JSON-LD --- */
  for (const m of s.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? []) {
    const body = m.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '').trim();
    ldTotal += 1;
    let parsed;
    try { parsed = JSON.parse(body); }
    catch (e) { fail(p, `invalid JSON-LD (${e.message})`); continue; }
    walkJson(parsed, base);
    const blocks = Array.isArray(parsed) ? parsed : [parsed];
    for (const b of blocks) {
      if ('url' in b && !b.url) fail(p, `JSON-LD has an empty "url"`);
      if ('sameAs' in b && (!b.sameAs || (Array.isArray(b.sameAs) && !b.sameAs.length))) {
        fail(p, `JSON-LD has an empty "sameAs"`);
      }
      if ('image' in b && !b.image) fail(p, `JSON-LD has an empty "image"`);
    }
  }

  /* --- references across all five channels --- */
  for (const m of s.match(/(?:href|src)="([^"]+)"/g) ?? []) {
    checkRef(m.slice(m.indexOf('"') + 1, -1), base, 'href/src');
  }
  for (const m of s.match(/<meta[^>]+content="([^"]+)"/g) ?? []) {
    const v = m.slice(m.indexOf('content="') + 9, -1);
    if (ASSET_RE.test(v)) checkRef(v, base, 'meta content');
  }
}

/* --- CSS url() (comments stripped first, or commented-out paths inflate) --- */
const cssDir = path.join(OUT, 'assets/css');
if (fs.existsSync(cssDir)) {
  for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith('.css'))) {
    const body = fs.readFileSync(path.join(cssDir, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const m of body.match(/url\(\s*["']?([^)"']+)/g) ?? []) {
      checkRef(m.replace(/^url\(\s*["']?/, ''), path.join(OUT, 'assets/css'), 'css url()');
    }
  }
}

/* --- every data JSON must parse --- */
const dataDirs = [path.join(__dirname, 'src/data'), path.join(__dirname, 'src/data/pages')];
let jsonCount = 0;
for (const dir of dataDirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.json'))) {
    jsonCount += 1;
    const abs = path.join(dir, f);
    try { JSON.parse(fs.readFileSync(abs, 'utf8')); }
    catch (e) { fail(path.relative(ROOT, abs), `invalid JSON (${e.message})`); }
  }
}

/* ------------------------------------------------------------------ report */
const ok = issues.length === 0 && unresolved.size === 0;

if (!QUIET || !ok) {
  console.log('');
  console.log('  WOODEX QA · built output audit');
  console.log(`  ${OUT}`);
  console.log('  ' + '─'.repeat(58));
  console.log(`  pages              ${pages.length}`);
  console.log(`  <h1> elements      ${h1Total}  (expect ${pages.length})`);
  console.log(`  JSON-LD blocks     ${ldTotal}`);
  console.log(`  forms              ${formTotal}`);
  console.log(`  images             ${imgTotal}`);
  console.log(`  data JSON files    ${jsonCount}`);
  console.log('  ' + '─'.repeat(58));
  console.log(`  issues             ${issues.length}`);
  console.log(`  unresolved refs    ${[...unresolved.values()].reduce((a, b) => a + b, 0)}`);
  console.log('');

  for (const i of issues.slice(0, 40)) console.log(`    ✗ ${i}`);
  if (issues.length > 40) console.log(`    … and ${issues.length - 40} more`);

  if (unresolved.size) {
    console.log('    unresolved file references:');
    for (const [k, n] of [...unresolved.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
      const [u, kind] = k.split('|');
      console.log(`      ${String(n).padStart(4)}×  [${kind}] ${u}`);
    }
    if (unresolved.size > 20) console.log(`      … and ${unresolved.size - 20} more distinct paths`);
  }

  console.log('');
  console.log(ok ? '  ✔ ALL GATES PASS' : '  ✗ QA FAILED');
  console.log('');
}

process.exit(ok ? 0 : 1);
