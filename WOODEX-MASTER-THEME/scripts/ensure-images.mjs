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
  /* Every placeholder is built from the four brand colours only:
     white #ffffff · navy #0f1e36 · cream #fcf2e8 · black #000000 */
  ['#ffffff', '#fcf2e8', '#0f1e36', '#0f1e36'], // white → cream
  ['#fcf2e8', '#ffffff', '#0f1e36', '#0f1e36'], // cream → white
  ['#0f1e36', '#000000', '#fcf2e8', '#ffffff'], // navy → black
  ['#fcf2e8', '#0f1e36', '#ffffff', '#0f1e36'], // cream → navy
];
/* Set PLACEHOLDER_LABELS=0 to build the site without the slot name and the
   "photograph pending" tag on every placeholder — useful for a client demo
   where the drawings should read as intentional art direction. */
const SHOW_LABELS = process.env.PLACEHOLDER_LABELS !== '0';

const hash = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

/* ── PLACEHOLDER ART DIRECTION ──────────────────────────────────────────────
   Every placeholder is drawn as a calm architectural *elevation* rather than a
   coloured block, because a wall of coloured blocks is what makes a site look
   unfinished. Same four colours, same line weights, same label position on all
   100+ slots, so any grid reads as a designed set even before photography
   lands. Three variants:

     photo   → measured elevation drawing (default; the vast majority)
     swatch  → material chip, used by the material library
     logo    → wordmark block, used by client-logo marquees

   The drawing is deliberately quiet: thin ink lines, a dot grid, four corner
   registration marks and a scale bar — the conventions of a real drawing sheet.
   ─────────────────────────────────────────────────────────────────────────── */

/* Brand palette. Alpha is always expressed with fill-opacity / stroke-opacity
   so the output stays inside the four colours. */
const INK = '#0f1e36'; // blue
const CREAM = '#fcf2e8';
const WHITE = '#ffffff';
const BLACK = '#000000';

/* A minimal wordmark placeholder for client logos — reads as a logo block
   rather than an architectural drawing, so logo marquees look intentional. */
function logoPlaceholderSvg(label, ratio = '5/2') {
  const [rw, rh] = ratio.split('/').map(Number);
  const w = 400;
  const h = Math.round((w * (rh || 2)) / (rw || 5));
  const s = w / 400; // scale factor
  const name = String(label)
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1))
    .join(' ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <!-- Monogram tile + wordmark. No invented symbol, so it never reads as a
       half-finished logo. -->
  <rect x="${w * 0.04}" y="${(h - 30 * s) / 2}" width="${30 * s}" height="${30 * s}" rx="${3 * s}" fill="${INK}"/>
  <polyline points="${w * 0.04 + 7 * s},${(h - 30 * s) / 2 + 8 * s} ${w * 0.04 + 11 * s},${(h - 30 * s) / 2 + 22 * s} ${w * 0.04 + 15 * s},${(h - 30 * s) / 2 + 12 * s} ${w * 0.04 + 19 * s},${(h - 30 * s) / 2 + 22 * s} ${w * 0.04 + 23 * s},${(h - 30 * s) / 2 + 8 * s}"
    fill="none" stroke="${CREAM}" stroke-width="${2.4 * s}" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${w * 0.04 + 40 * s}" y="${h * 0.585}" font-family="system-ui,-apple-system,Segoe UI,sans-serif"
        font-size="${Math.round(h * 0.19)}" font-weight="500" letter-spacing="${w * 0.005}"
        fill="${INK}" fill-opacity="0.82">${name}</text>
</svg>
`;
}

/* A material chip for the material library: a solid ground, a fine grain and a
   hairline border. Hash-varied across the four colours so a grid of them looks
   like a real sample board. */
function swatchPlaceholderSvg(label, ratio = '1/1') {
  const [rw, rh] = ratio.split('/').map(Number);
  const w = 600;
  const h = Math.round((w * (rh || 1)) / (rw || 1));
  const seed = hash(label);
  const grounds = [
    { bg: CREAM, ink: INK, o: 0.9 },
    { bg: WHITE, ink: INK, o: 0.85 },
    { bg: INK, ink: CREAM, o: 0.9 },
    { bg: '#e9e2d8', ink: INK, o: 0.85 },
  ];
  const g = grounds[seed % grounds.length];
  const label_ = String(label).replace(/[-_]/g, ' ').toUpperCase().slice(0, 22);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <pattern id="grain" width="6" height="6" patternUnits="userSpaceOnUse">
      <path d="M0 3h6" stroke="${g.ink}" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="${g.bg}"/>
  <rect width="${w}" height="${h}" fill="url(#grain)"/>
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" fill="none" stroke="${g.ink}" stroke-opacity="0.16"/>
  <rect x="${w * 0.07}" y="${h * 0.07}" width="${w * 0.2}" height="${w * 0.2}" fill="none"
        stroke="${g.ink}" stroke-opacity="0.3"/>
  <text x="${w * 0.07}" y="${h * 0.88}" font-family="system-ui,-apple-system,Segoe UI,sans-serif"
        font-size="${Math.round(w * 0.045)}" letter-spacing="${w * 0.006}"
        fill="${g.ink}" fill-opacity="${g.o}">${label_}</text>
</svg>
`;
}

/* The elevation drawing. Composition is fixed; only the ground colour and a
   couple of proportions shift with the slot name, so the set stays coherent. */
function elevationSvg(label, ratio = '4/3') {
  const [rw, rh] = ratio.split('/').map(Number);
  const W = 1200;
  const H = Math.round((W * (rh || 3)) / (rw || 4));
  const seed = hash(label);
  const navy = seed % 9 === 0; // occasional navy plate for rhythm in grids
  const bg = navy ? INK : seed % 2 ? WHITE : CREAM;
  const ink = navy ? CREAM : INK;
  const op = (v) => `fill-opacity="${v}"`;
  const sop = (v) => `stroke-opacity="${v}"`;
  const sw = Math.max(1.5, W / 720); // one line weight for the whole sheet
  const floorY = H * 0.84;
  const safe = String(label).replace(/[<>&"]/g, '').replace(/[-_]/g, ' ').toUpperCase().slice(0, 40);
  const archW = W * (0.15 + (seed % 5) * 0.008);
  const archX = W * 0.07;
  const textX = W * 0.055;
  const textY = H * 0.93;
  const fontSize = Math.round(W * 0.019);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <pattern id="dots" width="${W * 0.033}" height="${W * 0.033}" patternUnits="userSpaceOnUse">
      <circle cx="1.4" cy="1.4" r="1.3" fill="${ink}" fill-opacity="0.09"/>
    </pattern>
  </defs>

  <!-- ground -->
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- ceiling datum + floor plane, so the drawing has body at card size -->
  <path d="M0 ${H * 0.1}h${W}" stroke="${ink}" ${sop(0.12)} stroke-width="${sw}"/>
  <rect y="${floorY}" width="${W}" height="${H - floorY}" fill="${ink}" fill-opacity="0.045"/>
  <path d="M0 ${floorY}h${W}" stroke="${ink}" ${sop(0.32)} stroke-width="${sw}"/>

  <!-- arched opening -->
  <path d="M${archX} ${floorY}V${H * 0.42}a${archW / 2} ${archW / 2} 0 0 1 ${archW} 0V${floorY}Z"
        fill="${ink}" fill-opacity="0.07" stroke="${ink}" ${sop(0.45)} stroke-width="${sw}"/>
  <path d="M${archX + archW * 0.5} ${H * 0.42 - archW * 0.5 + archW * 0.5}V${floorY}"
        stroke="${ink}" ${sop(0.16)} stroke-width="${sw}"/>

  <!-- fluting: five thin verticals -->
  ${[0, 1, 2, 3, 4]
    .map((i) => {
      const x = W * 0.31 + i * W * 0.017;
      return `<path d="M${x} ${H * 0.3}V${floorY}" stroke="${ink}" ${sop(0.26)} stroke-width="${sw * 0.9}"/>`;
    })
    .join('\n  ')}

  <!-- window: frame, mullion, sill -->
  <rect x="${W * 0.44}" y="${H * 0.16}" width="${W * 0.28}" height="${H * 0.56}"
        fill="${ink}" fill-opacity="0.045" stroke="${ink}" ${sop(0.4)} stroke-width="${sw}"/>
  <path d="M${W * 0.58} ${H * 0.16}v${H * 0.56}" stroke="${ink}" ${sop(0.2)} stroke-width="${sw * 0.8}"/>
  <path d="M${W * 0.42} ${H * 0.72}h${W * 0.32}" stroke="${ink}" ${sop(0.34)} stroke-width="${sw}"/>

  <!-- plinth / bench under the window -->
  <path d="M${W * 0.42} ${floorY}h${W * 0.32}v${-H * 0.06}h${-W * 0.32}Z"
        fill="${ink}" ${op(0.1)}/>
  <path d="M${W * 0.42} ${floorY - H * 0.06}h${W * 0.32}" stroke="${ink}" ${sop(0.38)} stroke-width="${sw}"/>

  <!-- pendant -->
  <path d="M${W * 0.8} ${H * 0.1}v${H * 0.16}" stroke="${ink}" ${sop(0.24)} stroke-width="${sw * 0.8}"/>
  <circle cx="${W * 0.8}" cy="${H * 0.28}" r="${W * 0.017}" fill="none"
          stroke="${ink}" ${sop(0.42)} stroke-width="${sw}"/>

  <!-- corner registration marks -->
  ${[
    [W * 0.045, H * 0.06, 1, 1],
    [W * 0.955, H * 0.06, -1, 1],
    [W * 0.045, H * 0.78, 1, -1],
    [W * 0.955, H * 0.78, -1, -1],
  ]
    .map(([x, y, dx, dy]) => {
      const a = W * 0.018;
      return `<path d="M${x} ${y}v${a * dy}M${x} ${y}h${a * dx}" fill="none" stroke="${ink}" ${sop(0.4)} stroke-width="${sw}"/>`;
    })
    .join('\n  ')}

  <!-- scale bar -->
  ${[0, 1, 2, 3]
    .map((i) => {
      const x = W * 0.5 - W * 0.04 + i * W * 0.02;
      return `<rect x="${x}" y="${H * 0.885}" width="${W * 0.02}" height="${W * 0.007}" fill="${ink}" fill-opacity="${i % 2 ? 0.5 : 0.28}"/>`;
    })
    .join('\n  ')}

  <!-- label -->
  ${SHOW_LABELS
    ? `<path d="M${textX} ${textY - fontSize * 1.7}h${W - textX * 2}" stroke="${ink}" ${sop(0.18)} stroke-width="${sw}"/>
  <path d="M${textX} ${textY - fontSize * 1.7}h${W * 0.05}" stroke="${ink}" ${sop(0.6)} stroke-width="${sw * 1.8}"/>
  <text x="${textX}" y="${textY}" font-family="system-ui,-apple-system,Segoe UI,sans-serif"
        font-size="${fontSize}" letter-spacing="${W * 0.0032}"
        fill="${ink}" ${op(0.62)}>${safe}</text>
  <text x="${W * 0.945}" y="${textY}" text-anchor="end" font-family="system-ui,-apple-system,sans-serif"
        font-size="${fontSize * 0.82}" letter-spacing="${W * 0.0026}"
        fill="${ink}" ${op(0.34)}>PHOTOGRAPH PENDING</text>`
    : ''}
</svg>
`;
}

/* A monogram medallion for portrait slots. Reads as an intentional avatar,
   never as a missing photograph — used across the stats and testimonial strips. */
function avatarPlaceholderSvg(label, ratio = '1/1', initials) {
  const SIZE = 200;
  const seed = hash(label);
  const grounds = [
    { bg: INK, fg: CREAM },
    { bg: CREAM, fg: INK },
    { bg: WHITE, fg: INK },
  ];
  const g = grounds[seed % grounds.length];
  const mono = String(initials || label.slice(0, 2)).toUpperCase().slice(0, 3);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <defs>
    <clipPath id="c"><circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}"/></clipPath>
  </defs>
  <g clip-path="url(#c)">
    <rect width="${SIZE}" height="${SIZE}" fill="${g.bg}"/>
    <circle cx="${SIZE * 0.5}" cy="${SIZE * 0.38}" r="${SIZE * 0.17}" fill="${g.fg}" fill-opacity="0.22"/>
    <path d="M${SIZE * 0.14} ${SIZE}v${-SIZE * 0.16}a${SIZE * 0.36} ${SIZE * 0.36} 0 0 1 ${SIZE * 0.72} 0V${SIZE}Z"
          fill="${g.fg}" fill-opacity="0.16"/>
    <text x="${SIZE / 2}" y="${SIZE * 0.585}" text-anchor="middle"
          font-family="system-ui,-apple-system,Segoe UI,sans-serif"
          font-size="${SIZE * 0.3}" font-weight="600" letter-spacing="1"
          fill="${g.fg}" fill-opacity="0.9">${mono}</text>
  </g>
</svg>
`;
}

function placeholderSvg(label, ratio = '4/3', kind, initials) {
  if (kind === 'logo') return logoPlaceholderSvg(label, ratio);
  if (kind === 'swatch') return swatchPlaceholderSvg(label, ratio);
  if (kind === 'avatar') return avatarPlaceholderSvg(label, ratio, initials);
  return elevationSvg(label, ratio);
}

/* ── Main ──────────────────────────────────────────────────────────────── */
const map = {};
let created = 0;
let real = 0;      // photo slots whose real photograph is on disk
let vector = 0;    // slots that are vector art by design (logos, swatches)

for (const entry of allImagePaths()) {
  const canonical = entry.path;                       // /images/…/x.jpg
  const rel = canonical.replace(/^\//, '');
  const realFile = path.join(publicDir, rel);
  const svgRel = rel.replace(/\.(jpe?g|png|webp|avif)$/i, '.svg');
  const svgFile = path.join(publicDir, svgRel);

  if (fs.existsSync(realFile)) {
    map[canonical] = canonical;
    if (/\.svg$/i.test(canonical)) vector += 1;
    else real += 1;
    continue;
  }

  if (!fs.existsSync(svgFile)) {
    fs.mkdirSync(path.dirname(svgFile), { recursive: true });
    const label = path.basename(rel, path.extname(rel)).replace(/[-_]/g, ' ');
    fs.writeFileSync(svgFile, placeholderSvg(label, entry.ratio, entry.kind, entry.initials));
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
const photoSlots = total - vector;
console.log(
  `[ensure-images] ${real}/${photoSlots} photo slot${photoSlots === 1 ? '' : 's'} filled ` +
    `(${photoSlots - real} branded placeholder${photoSlots - real === 1 ? '' : 's'}` +
    `${created ? `, ${created} newly written` : ''}), ` +
    `${vector} vector asset${vector === 1 ? '' : 's'} on disk. ` +
    `Map → src/generated/image-map.json`
);
