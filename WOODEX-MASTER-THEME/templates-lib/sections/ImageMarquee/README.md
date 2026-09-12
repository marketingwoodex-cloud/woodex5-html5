# ImageMarquee

> IMAGE MARQUEE — an infinite horizontal filmstrip of images. Two directions on stacked rows gives the reference's cross-scrolling look. MOTION: data-marquee (motion.js duplicates the track so the loop is

**Import:** `import ImageMarquee from '../sections/ImageMarquee.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `items` | `Item[]` | optional |
| `rows` | `1 \| 2` | optional |
| `speed` | `number` | optional |
| `ratio` | `string` | optional |
| `pauseOnHover` | `boolean` | optional |
| `theme` | `'default' \| 'dark' \| 'beige' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-marquee`

## Depends on

- `src/data/images.js`
- `src/components/ui/Img.astro`

## Example

```astro
---
import ImageMarquee from '../sections/ImageMarquee.astro';
---
<ImageMarquee
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
