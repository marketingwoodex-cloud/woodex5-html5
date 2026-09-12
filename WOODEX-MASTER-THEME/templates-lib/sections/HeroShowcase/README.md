# HeroShowcase

> SECTION · Hero Showcase                     [ hero-showcase ] --------------------------------------------------------------------------- Split hero: rotating headline words on the left, tall portrait media on the

**Import:** `import HeroShowcase from '../sections/HeroShowcase.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `rotatingWords` | `string[]` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `primary` | `{ label: string; href: string }` | optional |
| `image` | `string` | optional |
| `imageAlt` | `string` | optional |
| `badgeNumber` | `string` | optional |
| `badgeLabel` | `string` | optional |
| `showLogos` | `boolean` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-marquee`
- `data-counter`
- `data-magnetic`

## Depends on

- `src/data/content.js`
- `src/data/site.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import HeroShowcase from '../sections/HeroShowcase.astro';
---
<HeroShowcase
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
