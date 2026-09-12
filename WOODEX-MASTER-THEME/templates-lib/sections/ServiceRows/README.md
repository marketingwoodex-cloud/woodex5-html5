# ServiceRows

> SECTION · Service Rows                      [ service-rows ] --------------------------------------------------------------------------- The signature numbered service list: hover a row and a full-bleed dark

**Import:** `import ServiceRows from '../sections/ServiceRows.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `group` | `string` | optional |
| `limit` | `number` | optional |
| `ctaLabel` | `string` | optional |
| `ctaHref` | `string` | optional |
| `variant` | `'dark' \| 'beige'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`

## Depends on

- `src/data/services.js`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import ServiceRows from '../sections/ServiceRows.astro';
---
<ServiceRows
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
