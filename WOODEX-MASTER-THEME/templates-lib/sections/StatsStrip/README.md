# StatsStrip

> SECTION · Stats Strip                       [ stats-strip ] --------------------------------------------------------------------------- Two jobs in one component, chosen by `variant`:

**Import:** `import StatsStrip from '../sections/StatsStrip.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `variant` | `'numbers' \| 'promises' \| 'mixed'` | optional |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `theme` | `'dark' \| 'beige' \| 'gray'` | optional |
| `image` | `string` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-counter`

## Depends on

- `src/data/site.js`
- `src/data/content.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import StatsStrip from '../sections/StatsStrip.astro';
---
<StatsStrip
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
