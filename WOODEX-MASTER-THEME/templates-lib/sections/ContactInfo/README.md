# ContactInfo

> SECTION · Contact Info                      [ contact-info ] --------------------------------------------------------------------------- Studio cards with address, phone, email and a lazy-loaded map placeholder.

**Import:** `import ContactInfo from '../sections/ContactInfo.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `variant` | `'cards' \| 'split' \| 'strip'` | optional |
| `showMap` | `boolean` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-map-lazy`

## Depends on

- `src/data/content.js`
- `src/data/images.js`
- `src/data/site.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import ContactInfo from '../sections/ContactInfo.astro';
---
<ContactInfo
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
