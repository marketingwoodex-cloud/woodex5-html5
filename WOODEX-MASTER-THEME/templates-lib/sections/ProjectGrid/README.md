# ProjectGrid

> SECTION · Project Grid                      [ project-grid ] --------------------------------------------------------------------------- Portfolio index. Three layouts matching the reference's portfolio-one/two/

**Import:** `import ProjectGrid from '../sections/ProjectGrid.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `variant` | `'grid' \| 'masonry' \| 'list'` | optional |
| `showFilter` | `boolean` | optional |
| `limit` | `number` | optional |
| `sector` | `string` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`

## Depends on

- `src/data/projects.js`
- `src/data/images.js`
- `src/components/ui/Img.astro`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import ProjectGrid from '../sections/ProjectGrid.astro';
---
<ProjectGrid
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
