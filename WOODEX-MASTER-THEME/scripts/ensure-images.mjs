#!/usr/bin/env node
/**
 * ensure-images.mjs — prebuild safety net + resolver-map generator.
 * ---------------------------------------------------------------------------
 * 1. Walks src/data/images.js and, for every slot whose real file is missing
 *    from /public, writes a branded SVG placeholder next to it.
 * 2. Emits src/generated/image-map.json — a lookup from the canonical path
 *    to whichever file actually exists (real photo, or placeholder).
 * 3. <Img> (src/components/ui/Img.astro) reads that map at build time, so the
 *    theme NEVER renders a broken image while photography is being shot.
 *
 * Drop a real file at the canonical path → the map resolves to it → the
 * placeholder is ignored. No component changes required.
 *
 * Run manually:  npm run images
 * Runs before:   npm run build  (via "prebuild")
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const generatedDir = path.join(root, 'src/generated');

const { allImagePaths } = await import(
  `file://${path.join(root, 'src/data/images.js').replace(/\\/g, '/')}`
);

/* ── Placeholder palettes (brand palette only) ─────────────────────────── */
const palettes = [
  ['#fcf2e8', '#e3e1e1', '#d9d9d9', '#525252'],
  ['#e3e1e1', '#fcf2e8', '#c0c0c0', '#000000'],
  ['#d9d9d9', '#fcf2e8', '#e3e1e1', '#525252'],
  ['#0f1e36', '#525252', '#c0c0c0', '#fcf2e8'],
  ['#fcf2e8', '#ffffff', '#e3e1e1', '#525252'],
  ['#e3e1e1', '#d9d9d9', '#fcf2e8', '#111111'],
];

const hash = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

/* A minimal wordmark placeholder for client logos — reads as a logo block
   rather than an architectural drawing, so logo marquees look intentional. */
function logoPlaceholderSvg(label, ratio = '5/2') {
  const [rw, rh] = ratio.split('/').map(Number);
  const w = 400;
  const h = Math.round((w * (rh || 2)) / (rw || 5));
  const words = String(label).replace(/[-_]/g, ' ').split(' ');
  const name = words.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1)).join(' ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="none"/>
  <path d="M${w * 0.06} ${h * 0.28}h${w * 0.07}v${h * 0.44}h${-w * 0.07}Z" fill="#111111" fill-opacity="0.8"/>
  <path d="M${w * 0.06 + w * 0.035} ${h * 0.28}l${w * 0.035} ${h * 0.28} ${w * 0.035} ${-h * 0.28}Z" fill="#fcf2e8"/>
  <text x="${w * 0.185}" y="${h * 0.585}" font-family="system-ui,-apple-system,Segoe UI,sans-serif"
        font-size="${Math.round(h * 0.2)}" font-weight="600" letter-spacing="${w * 0.006}"
        fill="#111111" fill-opacity="0.72">${name}</text>
</svg>
`;
}

/* A flat colour-block swatch placeholder for the material library. */
function swatchPlaceholderSvg(label, ratio = '1/1') {
  const [rw, rh] = ratio.split('/').map(Number);
  const w = 600;
  const h = Math.round((w * (rh || 1)) / (rw || 1));
  const p = palettes[hash(label) % palettes.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="${p[1]}"/>
      <stop offset="100%" stop-color="${p[2]}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#s)"/>
  <circle cx="${w * 0.2}" cy="${h * 0.26}" r="${w * 0.16}" fill="#fff" fill-opacity="0.16"/>
  <circle cx="${w * 0.66}" cy="${h * 0.68}" r="${w * 0.26}" fill="${p[3]}" fill-opacity="0.08"/>
  <rect y="${h - Math.max(2, h * 0.014)}" width="${w}" height="${Math.max(2, h * 0.014)}" fill="${p[3]}" fill-opacity="0.3"/>
  <text x="${w / 2}" y="${h * 0.55}" text-anchor="middle"
        font-family="system-ui,-apple-system,Segoe UI,sans-serif"
        font-size="${Math.round(w * 0.045)}" letter-spacing="${w * 0.004}"
        fill="${p[3]}" fill-opacity="0.55">${String(label).replace(/[-_]/g, ' ').toUpperCase().slice(0, 22)}</text>
</svg>
`;
}

function placeholderSvg(label, ratio = '4/3', kind) {
  if (kind === 'logo') return logoPlaceholderSvg(label, ratio);
  if (kind === 'swatch') return swatchPlaceholderSvg(label, ratio);
  const [rw, rh] = ratio.split('/').map(Number);
  const w = 1200;
  const h = Math.round((w * (rh || 3)) / (rw || 4));
  const p = palettes[hash(label) % palettes.length];
  const safe = String(label).replace(/[<>&"]/g, '').slice(0, 44).toUpperCase();

  // A small hash-driven offset keeps each placeholder subtly unique.
  const seed = hash(label) % 100;
  const archW = w * (0.14 + (seed % 7) * 0.006);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p[0]}"/>
      <stop offset="58%" stop-color="${p[1]}"/>
      <stop offset="100%" stop-color="${p[2]}"/>
    </linearGradient>
    <pattern id="d" width="46" height="46" patternUnits="userSpaceOnUse">
      <path d="M0 46L46 0" stroke="${p[3]}" stroke-opacity="0.07" stroke-width="1.4"/>
    </pattern>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#d)"/>

  <path d="M${w * 0.1} ${h * 0.83}V${h * 0.47}a${archW / 2} ${archW / 2} 0 0 1 ${archW} 0V${h * 0.83}Z" fill="#fff" fill-opacity="0.5"/>
  <path d="M${w * 0.34} ${h * 0.83}V${h * 0.6}a${w * 0.052} ${w * 0.052} 0 0 1 ${w * 0.104} 0V${h * 0.83}Z" fill="#fff" fill-opacity="0.34"/>
  <rect x="${w * 0.51}" y="${h * 0.28}" width="${w * 0.2}" height="${h * 0.55}" fill="#fff" fill-opacity="0.22"/>
  <path d="M${w * 0.76} 0H${w}L${w * 0.57} ${h}H${w * 0.35}Z" fill="#fff" fill-opacity="0.2"/>
  <rect y="${h * 0.83}" width="${w}" height="${Math.max(2, h * 0.005)}" fill="${p[3]}" fill-opacity="0.22"/>

  <text x="${w / 2}" y="${h * 0.93}" text-anchor="middle"
        font-family="system-ui,-apple-system,Segoe UI,sans-serif"
        font-size="${Math.round(w * 0.02)}" letter-spacing="${w * 0.0028}"
        fill="${p[3]}" fill-opacity="0.58">${safe}</text>
</svg>
`;
}

/* ── Main ──────────────────────────────────────────────────────────────── */
const map = {};
let created = 0;
let real = 0;

for (const entry of allImagePaths()) {
  const canonical = entry.path;                       // /images/…/x.jpg
  const rel = canonical.replace(/^\//, '');
  const realFile = path.join(publicDir, rel);
  const svgRel = rel.replace(/\.(jpe?g|png|webp|avif)$/i, '.svg');
  const svgFile = path.join(publicDir, svgRel);

  if (fs.existsSync(realFile)) {
    map[canonical] = canonical;
    real += 1;
    continue;
  }

  if (!fs.existsSync(svgFile)) {
    fs.mkdirSync(path.dirname(svgFile), { recursive: true });
    const label = path.basename(rel, path.extname(rel)).replace(/[-_]/g, ' ');
    fs.writeFileSync(svgFile, placeholderSvg(label, entry.ratio, entry.kind));
    created += 1;
  }

  map[canonical] = `/${svgRel}`;
}

fs.mkdirSync(generatedDir, { recursive: true });
fs.writeFileSync(
  path.join(generatedDir, 'image-map.json'),
  `${JSON.stringify(map, null, 2)}\n`
);

const total = Object.keys(map).length;
console.log(
  `[ensure-images] ${real}/${total} real photo${real === 1 ? '' : 's'}, ` +
  `${total - real} placeholder${total - real === 1 ? '' : 's'} ` +
  `(${created} newly written). Map → src/generated/image-map.json`
);
