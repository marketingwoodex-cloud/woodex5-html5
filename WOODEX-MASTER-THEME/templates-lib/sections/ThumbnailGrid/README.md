# ThumbnailGrid

> THUMBNAIL GRID — the reference's six-up project preview grid. Compact tiles, hover zoom + caption slide, optional "+N more" tile. MOTION: data-stagger reveal, index numerals, view-all tile.

**Import:** `import ThumbnailGrid from '../sections/ThumbnailGrid.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `slugs` | `string[]` | optional |
| `columns` | `2 \| 3 \| 4` | optional |
| `ratio` | `string` | optional |
| `theme` | `'default' \| 'gray' \| 'dark'` | optional |
| `ctaLabel` | `string` | optional |
| `ctaHref` | `string` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`

## Depends on

- `src/data/projects.js`
- `src/data/images.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import ThumbnailGrid from '../sections/ThumbnailGrid.astro';
---
<ThumbnailGrid
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
