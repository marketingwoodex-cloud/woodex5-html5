# ServiceGrid

> SECTION · Service Grid                      [ service-grid ] --------------------------------------------------------------------------- Card grid of services with an optional sector filter bar. Every card links

**Import:** `import ServiceGrid from '../sections/ServiceGrid.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `showFilter` | `boolean` | optional |
| `group` | `string` | optional |
| `limit` | `number` | optional |
| `columns` | `2 \| 3 \| 4` | optional |
| `variant` | `'card' \| 'minimal'` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`

## Depends on

- `src/data/services.js`
- `src/data/images.js`
- `src/components/ui/Img.astro`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import ServiceGrid from '../sections/ServiceGrid.astro';
---
<ServiceGrid
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
