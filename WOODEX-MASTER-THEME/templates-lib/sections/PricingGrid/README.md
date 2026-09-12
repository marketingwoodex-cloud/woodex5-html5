# PricingGrid

> SECTION · Pricing                           [ pricing-grid ] --------------------------------------------------------------------------- Three-tier package comparison with a highlighted "most popular" plan, plus

**Import:** `import PricingGrid from '../sections/PricingGrid.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `showAddOns` | `boolean` | optional |
| `showCalculator` | `boolean` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`

## Depends on

- `src/data/content.js`
- `src/data/site.js`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import PricingGrid from '../sections/PricingGrid.astro';
---
<PricingGrid
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
