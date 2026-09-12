# HeroClassic

> SECTION · Hero Classic                      [ hero-classic ] --------------------------------------------------------------------------- The flagship homepage hero: eyebrow, oversized masked headline, lede, dual

**Import:** `import HeroClassic from '../sections/HeroClassic.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `primary` | `{ label: string; href: string }` | optional |
| `secondary` | `{ label: string; href: string }` | optional |
| `image` | `string` | optional |
| `marqueeWords` | `string[]` | optional |
| `cards` | `{ no: string; title: string; text: string; image: string }[]` | optional |
| `meta` | `string[]` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-marquee-vertical`
- `data-marquee`
- `data-magnetic`

## Depends on

- `src/data/site.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import HeroClassic from '../sections/HeroClassic.astro';
---
<HeroClassic
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
