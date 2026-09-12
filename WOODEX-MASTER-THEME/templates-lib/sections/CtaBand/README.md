# CtaBand

> SECTION · CTA Band                          [ cta-band ] --------------------------------------------------------------------------- High-contrast conversion band. Three variants:

**Import:** `import CtaBand from '../sections/CtaBand.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `primary` | `{ label: string; href: string }` | optional |
| `secondary` | `{ label: string; href: string } \| null` | optional |
| `variant` | `'split' \| 'center' \| 'banner'` | optional |
| `image` | `string` | optional |
| `theme` | `'dark' \| 'beige' \| 'gray'` | optional |
| `marqueeText` | `string` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-marquee`
- `data-magnetic`

## Depends on

- `src/data/site.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import CtaBand from '../sections/CtaBand.astro';
---
<CtaBand
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
