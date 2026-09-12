#!/usr/bin/env node
/**
 * make-icons.mjs — generates the full favicon / PWA icon set from code.
 * ---------------------------------------------------------------------------
 * The theme ships no binary assets, so the brand mark is drawn here with a
 * tiny rasteriser and encoded as PNG by hand (node:zlib + a CRC32 table).
 * Run automatically before every build via the `prebuild` script.
 *
 * Outputs
 *   public/favicon.svg              · scalable, referenced first in <head>
 *   public/favicon.ico              · 16 + 32 PNG-embedded ICO (legacy tabs)
 *   public/icons/apple-touch-icon.png  · 180×180, full-bleed
 *   public/icons/icon-192.png       · PWA
 *   public/icons/icon-512.png       · PWA
 *   public/icons/icon-maskable-512.png · PWA maskable (safe-zone padded)
 *
 * Brand mark = the WOODEX "W" lattice, drawn on a 32-unit grid so the SVG and
 * the raster icons are geometrically identical.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

/* ── Brand ─────────────────────────────────────────────────────────────── */
const BG = [0x11, 0x11, 0x11]; // Jet Black
const FG = [0xfc, 0xf2, 0xe8]; // Light Beige

/* The mark, in a 32×32 unit space: two spines with a chevron lattice between. */
const MARK = [
  [7, 24], [7, 10], [12, 15], [16, 8], [20, 15], [25, 10], [25, 24],
];
const STROKE = 2.4; // in the same 32-unit space

/* ── Minimal raster canvas ─────────────────────────────────────────────── */
function canvas(size, bg) {
  const px = new Float32Array(size * size * 3);
  for (let i = 0; i < size * size; i += 1) {
    px[i * 3] = bg[0];
    px[i * 3 + 1] = bg[1];
    px[i * 3 + 2] = bg[2];
  }
  return { size, px };
}

function blend(c, x, y, rgb, alpha) {
  if (alpha <= 0) return;
  if (x < 0 || y < 0 || x >= c.size || y >= c.size) return;
  const a = Math.min(1, alpha);
  const i = (y * c.size + x) * 3;
  c.px[i] = c.px[i] * (1 - a) + rgb[0] * a;
  c.px[i + 1] = c.px[i + 1] * (1 - a) + rgb[1] * a;
  c.px[i + 2] = c.px[i + 2] * (1 - a) + rgb[2] * a;
}

/** Rounded-rectangle fill with an antialiased signed-distance edge. */
function roundedRect(c, x0, y0, w, h, radius, rgb) {
  for (let y = 0; y < c.size; y += 1) {
    for (let x = 0; x < c.size; x += 1) {
      const px = x + 0.5;
      const py = y + 0.5;
      const dx = Math.max(x0 + radius - px, 0, px - (x0 + w - radius));
      const dy = Math.max(y0 + radius - py, 0, py - (y0 + h - radius));
      const d = Math.hypot(dx, dy) - radius;
      blend(c, x, y, rgb, Math.min(1, Math.max(0, 0.5 - d)));
    }
  }
}

/** Antialiased polyline stroke, width in device pixels. */
function polyline(c, points, width, rgb) {
  const r = width / 2;
  for (let y = 0; y < c.size; y += 1) {
    for (let x = 0; x < c.size; x += 1) {
      const px = x + 0.5;
      const py = y + 0.5;
      let best = Infinity;
      for (let i = 0; i < points.length - 1; i += 1) {
        const [ax, ay] = points[i];
        const [bx, by] = points[i + 1];
        const vx = bx - ax;
        const vy = by - ay;
        const len2 = vx * vx + vy * vy || 1;
        const t = Math.min(1, Math.max(0, ((px - ax) * vx + (py - ay) * vy) / len2));
        best = Math.min(best, Math.hypot(px - (ax + vx * t), py - (ay + vy * t)));
      }
      blend(c, x, y, rgb, Math.min(1, Math.max(0, r + 0.5 - best)));
    }
  }
}

/* ── PNG encoder ───────────────────────────────────────────────────────── */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePng(c) {
  const { size, px } = c;
  const stride = size * 4 + 1;
  const raw = Buffer.alloc(stride * size);
  for (let y = 0; y < size; y += 1) {
    raw[y * stride] = 0; // filter: none
    for (let x = 0; x < size; x += 1) {
      const s = (y * size + x) * 3;
      const d = y * stride + 1 + x * 4;
      raw[d] = Math.round(px[s]);
      raw[d + 1] = Math.round(px[s + 1]);
      raw[d + 2] = Math.round(px[s + 2]);
      raw[d + 3] = 255;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type: RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ── ICO (PNG-embedded — supported by every modern browser) ────────────── */
function encodeIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;

  entries.forEach((e, i) => {
    const o = i * 16;
    dir[o] = e.size >= 256 ? 0 : e.size;
    dir[o + 1] = e.size >= 256 ? 0 : e.size;
    dir[o + 2] = 0;
    dir[o + 3] = 0;
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32BE(0, o + 8);
    dir.writeUInt32LE(e.png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += e.png.length;
  });

  return Buffer.concat([header, dir, ...entries.map((e) => e.png)]);
}

/* ── Render one icon ───────────────────────────────────────────────────── */
function render(size, { padding = 0, rounded = 0 } = {}) {
  const c = canvas(size, BG);
  const inset = size * padding;

  if (rounded > 0) {
    // Transparent outside the rounded square: draw bg as a rounded rect only.
    c.px.fill(255);
    for (let i = 0; i < size * size; i += 1) {
      c.px[i * 3] = 255;
      c.px[i * 3 + 1] = 255;
      c.px[i * 3 + 2] = 255;
    }
    roundedRect(c, 0, 0, size, size, size * rounded, BG);
  }

  const scale = (size - inset * 2) / 32;
  const pts = MARK.map(([x, y]) => [inset + x * scale, inset + y * scale]);
  polyline(c, pts, STROKE * scale * (size / (size - inset * 2)) * ((size - inset * 2) / size), FG);
  return c;
}

function renderPng(size, opts) {
  return encodePng(render(size, opts));
}

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Woodex Interior">
  <rect width="32" height="32" rx="7" fill="#111111"/>
  <path d="${MARK.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')}"
        fill="none" stroke="#fcf2e8" stroke-width="2.4"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

/* ── Write ─────────────────────────────────────────────────────────────── */
fs.mkdirSync(path.join(publicDir, 'icons'), { recursive: true });

const written = [];

const faviconSvg = path.join(publicDir, 'favicon.svg');
if (!fs.existsSync(faviconSvg)) {
  fs.writeFileSync(faviconSvg, SVG);
  written.push('favicon.svg');
}

const apple = path.join(publicDir, 'icons/apple-touch-icon.png');
if (!fs.existsSync(apple)) {
  fs.writeFileSync(apple, renderPng(180));
  written.push('icons/apple-touch-icon.png');
}

const pwaSpecs = [
  ['icons/icon-192.png', 192, {}],
  ['icons/icon-512.png', 512, {}],
  ['icons/icon-maskable-512.png', 512, { padding: 0.12 }],
];

for (const [rel, size, opts] of pwaSpecs) {
  const file = path.join(publicDir, rel);
  if (fs.existsSync(file)) continue;
  fs.writeFileSync(file, renderPng(size, opts));
  written.push(rel);
}

const ico = path.join(publicDir, 'favicon.ico');
if (!fs.existsSync(ico)) {
  fs.writeFileSync(
    ico,
    encodeIco([
      { size: 16, png: renderPng(16) },
      { size: 32, png: renderPng(32) },
    ])
  );
  written.push('favicon.ico');
}

console.log(
  written.length
    ? `[make-icons] wrote ${written.length} file(s): ${written.join(', ')}`
    : '[make-icons] all icons already present — nothing to do'
);
