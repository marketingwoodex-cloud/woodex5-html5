# BulletFeatures

> BULLET FEATURES — "Industrial facility designs with optimal space utilization" style block: a numbered/checked bullet list beside media, with an optional dark statement panel and CTA.

**Import:** `import BulletFeatures from '../sections/BulletFeatures.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | **required** |
| `lede` | `string` | optional |
| `bullets` | `Bullet[]` | **required** |
| `image` | `string` | optional |
| `imageAlt` | `string` | optional |
| `quote` | `{ text: string; author?: string }` | optional |
| `cta` | `{ label: string; href: string }` | optional |
| `reverse` | `boolean` | optional |
| `variant` | `'list' \| 'cards' \| 'dark'` | optional |
| `theme` | `'default' \| 'gray' \| 'dark'` | optional |

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
import BulletFeatures from '../sections/BulletFeatures.astro';
---
<BulletFeatures
  theme="default"
/>
```

**Required data props:** `title` (string), `bullets` (Bullet[])


---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
