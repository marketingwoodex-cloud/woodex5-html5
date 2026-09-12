# NewsletterBand

> SECTION · Newsletter Band                   [ newsletter ] --------------------------------------------------------------------------- Compact subscribe strip. Works inline (between sections) or full-bleed.

**Import:** `import NewsletterBand from '../sections/NewsletterBand.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `text` | `string` | optional |
| `note` | `string` | optional |
| `endpoint` | `string` | optional |
| `variant` | `'inline' \| 'band'` | optional |
| `theme` | `'dark' \| 'beige' \| 'gray'` | optional |

## Motion used

- `data-reveal`

## Depends on

- `src/components/ui/Icon.astro`

## Example

```astro
---
import NewsletterBand from '../sections/NewsletterBand.astro';
---
<NewsletterBand
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
