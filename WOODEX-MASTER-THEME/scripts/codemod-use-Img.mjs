#!/usr/bin/env node
/**
 * codemod-use-Img.mjs — one-off migration helper.
 * ---------------------------------------------------------------------------
 * Rewrites raw `<img …>` tags inside src/sections, src/components and
 * src/pages to use the resolving `<Img>` primitive, and injects the import
 * when it is missing.
 *
 * Kept in the repo because it is useful again after any bulk import of
 * third-party section markup.
 *
 * Usage:  node scripts/codemod-use-Img.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targets = ['src/sections', 'src/components', 'src/pages', 'src/layouts'];

/* Components that must NOT be rewritten (they legitimately own an <img>). */
const SKIP_FILES = new Set([
  path.join(root, 'src/components/ui/Img.astro'),
  path.join(root, 'src/components/ui/SmartImage.astro'),
]);

const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory()
          ? walk(path.join(dir, e.name))
          : e.name.endsWith('.astro')
            ? [path.join(dir, e.name)]
            : []
      )
    : [];

let changed = 0;

for (const dir of targets) {
  for (const file of walk(path.join(root, dir))) {
    if (SKIP_FILES.has(file)) continue;

    const original = fs.readFileSync(file, 'utf8');
    if (!/<img\b/.test(original)) continue;

    let next = original.replace(/<img\b/g, '<Img').replace(/<\/img>/g, '</Img>');

    // Inject the import relative to the file.
    if (!/from ['"].*ui\/Img\.astro['"]/.test(next) && !/ui\/Img\.astro/.test(next)) {
      const depth = path.relative(path.dirname(file), path.join(root, 'src/components/ui/Img.astro'));
      const rel = depth.startsWith('.') ? depth : `./${depth}`;
      const importLine = `import Img from '${rel.replace(/\.astro$/, '.astro')}';\n`;

      // Place after the last existing import, else after the frontmatter fence.
      const importMatches = [...next.matchAll(/^import .*$/gm)];
      if (importMatches.length) {
        const last = importMatches[importMatches.length - 1];
        const at = last.index + last[0].length;
        next = `${next.slice(0, at)}\n${importLine}${next.slice(at)}`;
      } else {
        next = next.replace(/^---\n/, `---\n${importLine}`);
      }
    }

    if (next !== original) {
      fs.writeFileSync(file, next);
      changed += 1;
      console.log(`  ✓ ${path.relative(root, file)}`);
    }
  }
}

console.log(`[codemod-use-Img] ${changed} file${changed === 1 ? '' : 's'} updated.`);
