# FeatureSplit

> SECTION · Feature Split                     [ feature-split ] --------------------------------------------------------------------------- Alternating image/copy rows. Each row can carry a checklist, a stat pair, or

**Import:** `import FeatureSplit from '../sections/FeatureSplit.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `features` | `Feature[]` | optional |
| `reverse` | `boolean` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-parallax`

## Depends on

- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import FeatureSplit from '../sections/FeatureSplit.astro';
---
<FeatureSplit
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
