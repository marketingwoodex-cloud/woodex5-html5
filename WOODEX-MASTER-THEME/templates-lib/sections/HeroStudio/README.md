# HeroStudio

> SECTION · Hero Studio                       [ hero-studio ] --------------------------------------------------------------------------- Full-bleed cinematic hero: huge display headline with a scroll-scrubbed

**Import:** `import HeroStudio from '../sections/HeroStudio.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `primary` | `{ label: string; href: string }` | optional |
| `secondary` | `{ label: string; href: string }` | optional |
| `image` | `string` | optional |
| `videoLabel` | `string` | optional |
| `stats` | `{ value: number; suffix?: string; decimals?: number; label: string }[]` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-scroll-opacity`
- `data-counter`
- `data-magnetic`

## Depends on

- `src/data/site.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import HeroStudio from '../sections/HeroStudio.astro';
---
<HeroStudio
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
