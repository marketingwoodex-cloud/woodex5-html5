# ClientsMarquee

> SECTION · Clients Marquee                   [ clients-marquee ] --------------------------------------------------------------------------- Trust strip. Two variants:

**Import:** `import ClientsMarquee from '../sections/ClientsMarquee.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `variant` | `'text' \| 'logos' \| 'grid'` | optional |
| `speed` | `number` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-marquee`

## Depends on

- `src/data/content.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import ClientsMarquee from '../sections/ClientsMarquee.astro';
---
<ClientsMarquee
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
