# TestimonialsSlider

> SECTION · Testimonials                      [ testimonials ] --------------------------------------------------------------------------- Two variants:

**Import:** `import TestimonialsSlider from '../sections/TestimonialsSlider.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `variant` | `'slider' \| 'grid' \| 'marquee'` | optional |
| `limit` | `number` | optional |
| `theme` | `'dark' \| 'beige' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-marquee`
- `data-counter`
- `data-slider`

## Depends on

- `src/data/content.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import TestimonialsSlider from '../sections/TestimonialsSlider.astro';
---
<TestimonialsSlider
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
