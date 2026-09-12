# GalleryGrid

> SECTION · Gallery                           [ gallery-grid ] --------------------------------------------------------------------------- Image gallery with a built-in lightbox (keyboard + swipe navigable).

**Import:** `import GalleryGrid from '../sections/GalleryGrid.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `items` | `GalleryItem[]` | **required** |
| `variant` | `'mosaic' \| 'uniform' \| 'strip'` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-lightbox`

## Depends on

- `src/components/ui/Img.astro`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import GalleryGrid from '../sections/GalleryGrid.astro';
---
<GalleryGrid
  theme="default"
/>
```

**Required data props:** `items` (GalleryItem[])


---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
