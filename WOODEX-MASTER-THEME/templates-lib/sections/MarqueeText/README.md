# MarqueeText

> SECTION · Marquee Text                      [ marquee-text ] --------------------------------------------------------------------------- Infinite scrolling headline strip — the reference template's signature

**Import:** `import MarqueeText from '../sections/MarqueeText.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `items` | `string[]` | optional |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | optional |
| `speed` | `number` | optional |
| `direction` | `'normal' \| 'reverse'` | optional |
| `separator` | `'dot' \| 'star' \| 'dash' \| 'none'` | optional |
| `variant` | `'dark' \| 'beige' \| 'outline'` | optional |
| `rotate` | `number` | optional |
| `style` | `string` | optional |

## Motion used

- `data-marquee`

## Depends on

- `src/components/ui/Icon.astro`

## Example

```astro
---
import MarqueeText from '../sections/MarqueeText.astro';
---
<MarqueeText
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
