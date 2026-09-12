#!/usr/bin/env node
/**
 * build-template-library.mjs — generates `templates-lib/`.
 * ---------------------------------------------------------------------------
 * The template library is the copy-paste surface of this theme: one folder per
 * section, page and utility, each containing
 *
 *   README.md   · what it is, its props (auto-extracted from the source),
 *                 a working usage example, and its motion attributes
 *   NAME.astro  · the actual component source, ready to copy into a project
 *   example.astro · a minimal, self-contained page that renders it
 *
 * Props are parsed straight out of each component's `interface Props`, so the
 * docs cannot drift from the code. Run:  npm run templates
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outRoot = path.join(root, 'templates-lib');

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const list = (dir) => fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith('.astro')).sort();

/* ── Props extraction ──────────────────────────────────────────────────── */
function extractProps(source) {
  const iface = source.match(/interface Props\s*\{([\s\S]*?)\n\}/);
  if (!iface) return [];

  return iface[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('/*') && !line.startsWith('*') && !line.startsWith('//'))
    .map((line) => {
      const m = line.match(/^([A-Za-z0-9_$]+)(\?)?\s*:\s*(.+?);?\s*$/);
      if (!m) return null;
      return {
        name: m[1],
        optional: Boolean(m[2]),
        type: m[3].replace(/;\s*$/, '').trim(),
      };
    })
    .filter(Boolean);
}

/** Which motion attributes does this component rely on? */
function extractMotion(source) {
  const found = new Set();
  const patterns = [
    /data-heading-reveal/g,
    /data-text-reveal/g,
    /data-reveal/g,
    /data-stagger/g,
    /data-scroll-opacity/g,
    /data-scroll-fill/g,
    /data-parallax/g,
    /data-scroll-rail/g,
    /data-marquee-vertical/g,
    /data-marquee\b/g,
    /data-counter/g,
    /data-pin-sticky/g,
    /data-magnetic/g,
    /data-accordion\b/g,
    /data-tabs\b/g,
    /data-slider\b/g,
    /data-copy\b/g,
    /data-lightbox\b/g,
    /data-map-lazy/g,
  ];
  for (const re of patterns) {
    const hit = source.match(re);
    if (hit) found.add(hit[0]);
  }
  return [...found];
}

/** Data modules the component imports — tells the reader what feeds it. */
function extractDataDeps(source) {
  const deps = new Set();
  for (const m of source.matchAll(/from '\.\.\/data\/([a-z]+)\.js'/g)) deps.add(`src/data/${m[1]}.js`);
  for (const m of source.matchAll(/from '\.\.\/\.\.\/data\/([a-z]+)\.js'/g)) deps.add(`src/data/${m[1]}.js`);
  for (const m of source.matchAll(/from '\.\.\/components\/(ui|global)\/([A-Za-z]+)\.astro'/g)) deps.add(`src/components/${m[1]}/${m[2]}.astro`);
  for (const m of source.matchAll(/from '\.\.\/layouts\/([A-Za-z]+)\.astro'/g)) deps.add(`src/layouts/${m[1]}.astro`);
  return [...deps];
}

function propTable(props) {
  if (!props.length) return '_No props — this component reads from the data layer directly._\n';
  const rows = props.map(
    (p) => `| \`${p.name}\` | \`${p.type.replace(/\|/g, '\\|')}\` | ${p.optional ? 'optional' : '**required**'} |`
  );
  return ['| Prop | Type | |', '| --- | --- | --- |', ...rows, ''].join('\n');
}

function bulletList(items, empty) {
  return items.length ? items.map((i) => `- \`${i}\``).join('\n') : empty;
}

/* ── Writers ───────────────────────────────────────────────────────────── */
let folders = 0;

function writeFile(rel, content) {
  const full = path.join(outRoot, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

/* ── 1. Sections ───────────────────────────────────────────────────────── */
const sectionNames = list('src/sections').map((f) => f.replace('.astro', ''));

for (const file of list('src/sections')) {
  const name = file.replace('.astro', '');
  const source = read(`src/sections/${file}`);
  const props = extractProps(source);
  const motion = extractMotion(source);
  const deps = extractDataDeps(source);
  const dir = `sections/${name}`;

  const header = source.match(/^---\n\/\*\*\n([\s\S]*?)\*\//);
  const summary = header
    ? header[1]
        .split('\n')
        .map((l) => l.replace(/^\s*\*\s?/, '').trim())
        .filter(Boolean)
        .slice(0, 3)
        .join(' ')
    : `${name} section component.`;

  writeFile(`${dir}/${file}`, source);
  writeFile(
    `${dir}/README.md`,
    `# ${name}

> ${summary}

**Import:** \`import ${name} from '../sections/${name}.astro';\`

## Props

${propTable(props)}
## Motion used

${bulletList(motion, '_No motion attributes — static section._')}

## Depends on

${bulletList(deps, '_No internal dependencies beyond the icon/image primitives._')}

## Example

\`\`\`astro
---
import ${name} from '../sections/${name}.astro';
---
${props.includes('project') || props.includes('service')
      ? `<!-- Pass a record from the data layer: -->
<${name} ${props.find((p) => p.name === 'project' || p.name === 'service').name}={project} />`
      : `<${name}${props
          .filter((p) => p.type.startsWith("'") && !p.optional)
          .map((p) => `\n  ${p.name}="${p.type.split("'")[1]}"`)
          .join('')}
  theme="default"
/>
`}\`\`\`

${props.filter((p) => !p.optional && !p.type.startsWith("'")).length
  ? `**Required data props:** ${props
      .filter((p) => !p.optional && !p.type.startsWith("'"))
      .map((p) => `\`${p.name}\` (${p.type.replace(/\|/g, '\\|')})`)
      .join(', ')}\n`
  : ''}

---

Part of the **Woodex Master Theme** section library (${sectionNames.length} sections).
See \`design.md\` §5 for the full inventory and \`templates-lib/INDEX.md\` for the map.
`
  );
  writeFile(
    `${dir}/example.astro`,
    `---
/**
 * Minimal standalone example for: ${name}
 * Copy this into src/pages/ to see the section in isolation.
 */
import BaseLayout from '../../src/layouts/BaseLayout.astro';
import ${name} from '../../src/sections/${name}.astro';
---

<BaseLayout title="${name} — component preview" description="Isolated preview of the ${name} section." overlayHeader>
${props.filter((p) => !p.optional && !p.type.startsWith("'")).length
      ? `  {/* Supply from your own data: ${props
            .filter((p) => !p.optional && !p.type.startsWith("'") )
            .map((p) => `${p.name} (${p.type})`)
            .join(', ')} */}\n`
      : ''}${props.includes('project') || props.includes('service')
      ? `  <${name} ${props.find((p) => p.name === 'project' || p.name === 'service').name}={project} />\n`
      : `  <${name}${props
          .filter((p) => p.type.startsWith("'") && !p.optional)
          .map((p) => `\n    ${p.name}="${p.type.split("'")[1]}"`)
          .join('')}
  />\n`}</BaseLayout>
`
  );
  folders += 1;
}

/* ── 2. Pages ──────────────────────────────────────────────────────────── */
function walkPages(dir, out = []) {
  for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) walkPages(rel, out);
    else if (e.name.endsWith('.astro')) out.push(rel);
  }
  return out;
}

const pageFiles = walkPages('src/pages').sort();
const pageIndex = [];

for (const rel of pageFiles) {
  const source = read(rel);
  const name = path.basename(rel, '.astro');
  const slug = rel.replace('src/pages/', '').replace('.astro', '').replace(/[[\]]/g, '');
  const dir = `pages/${slug.replace(/\//g, '-')}`;

  const imports = [...source.matchAll(/import (\w+) from '\.\.\/sections\/(\w+)\.astro'/g)].map((m) => m[2]);
  const sectionsUsed = [...new Set(imports)];
  const route = `/${rel.replace('src/pages/', '').replace('.astro', '').replace('/index', '')}`.replace(/\[slug\]/, '<slug>');

  pageIndex.push({ slug, route, sections: sectionsUsed.length });

  writeFile(`${dir}/README.md`,
`# Page template · \`${route}\`

Source: \`${rel}\`
Sections used (**${sectionsUsed.length}**):

${bulletList(sectionsUsed, '_Route rendered from other templates or a layout only._')}

## Reuse it

1. Copy \`${rel}\` into your project's \`src/pages/\`.
2. Adjust the \`BaseLayout\` frontmatter (title, description, \`current\`, \`footerCta*\`).
3. Point the section props at your own data modules.

## Example of the pattern

\`\`\`astro
<BaseLayout title="…" description="…" overlayHeader current="about">
${sectionsUsed.slice(0, 4).map((s) => `  <${s} />`).join('\n')}
</BaseLayout>
\`\`\`
`);
  writeFile(`${dir}/${path.basename(rel)}`, source);
  folders += 1;
}

/* ── 3. Index ──────────────────────────────────────────────────────────── */
writeFile(
  'INDEX.md',
  `# Template library — index

Generated by \`npm run templates\` (\`scripts/build-template-library.mjs\`).
**Do not edit by hand — regenerate instead.**

- **${sectionNames.length} section components** in \`sections/\`
- **${pageFiles.length} page templates** in \`pages/\`
- Every folder contains a \`README.md\` with props extracted from the source, plus the component
  itself and an isolated example where useful.

## Sections

${sectionNames.map((s) => `- [${s}](sections/${s}/README.md)`).join('\n')}

## Pages

| Template | Route | Sections |
| --- | --- | --- |
${pageIndex.map((p) => `| [${p.slug}](pages/${p.slug}/README.md) | \`${p.route}\` | ${p.sections} |`).join('\n')}

## How to use this library

1. Find the section you want in the list above and open its \`README.md\`.
2. Copy the \`.astro\` file into your project's \`src/sections/\`.
3. Copy the example markup, replacing prop values with your own.
4. Any motion attributes listed in the README require \`src/scripts/motion.js\` and
   \`src/styles/motion.css\` to be present — they are wired up by \`BaseLayout.astro\`.

Missing a section? Add it in \`src/sections/\`, then re-run \`npm run templates\`.
`
);

console.log(
  `[templates] templates-lib/ written — ${sectionNames.length} sections, ${pageFiles.length} page templates, ${folders + 1} folders.`
);
