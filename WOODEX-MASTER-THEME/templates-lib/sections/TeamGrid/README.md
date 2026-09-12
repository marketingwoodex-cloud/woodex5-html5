# TeamGrid

> SECTION · Team Grid                         [ team-grid ] --------------------------------------------------------------------------- Portrait cards with a hover reveal that slides the bio up over the image.

**Import:** `import TeamGrid from '../sections/TeamGrid.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `limit` | `number` | optional |
| `showCareers` | `boolean` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`

## Depends on

- `src/data/content.js`
- `src/data/images.js`
- `src/components/ui/Img.astro`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import TeamGrid from '../sections/TeamGrid.astro';
---
<TeamGrid
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
