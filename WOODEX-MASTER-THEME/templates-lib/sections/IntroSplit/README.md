# IntroSplit

> SECTION · Intro Split                       [ intro-split ] --------------------------------------------------------------------------- Eyebrow + statement heading on the left, supporting copy and inline

**Import:** `import IntroSplit from '../sections/IntroSplit.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `body` | `string` | optional |
| `stats` | `{ value: number; suffix?: string; decimals?: number; label: string }[]` | optional |
| `link` | `{ label: string; href: string }` | optional |
| `image` | `string` | optional |
| `imageCaption` | `string` | optional |
| `reverse` | `boolean` | optional |

## Motion used

- `data-text-reveal`
- `data-reveal`
- `data-stagger`
- `data-counter`

## Depends on

- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import IntroSplit from '../sections/IntroSplit.astro';
---
<IntroSplit
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
