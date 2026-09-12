# VideoBlock

> VIDEO BLOCK — full-bleed media with a poster, custom play control and optional caption rail. Three modes: poster  → image only (opens the source in a lightbox on click)

**Import:** `import VideoBlock from '../sections/VideoBlock.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `poster` | `string` | **required** |
| `src` | `string` | optional |
| `mode` | `'poster' \| 'inline' \| 'embed'` | optional |
| `caption` | `string` | optional |
| `stats` | `{ value: string; label: string }[]` | optional |
| `aspect` | `string` | optional |
| `fullBleed` | `boolean` | optional |
| `theme` | `'dark' \| 'light' \| 'beige'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-parallax`
- `data-magnetic`

## Depends on

- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import VideoBlock from '../sections/VideoBlock.astro';
---
<VideoBlock
  theme="default"
/>
```

**Required data props:** `poster` (string)


---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
