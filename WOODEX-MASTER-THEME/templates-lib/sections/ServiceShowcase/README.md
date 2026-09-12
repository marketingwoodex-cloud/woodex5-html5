# ServiceShowcase

> SECTION · Service Showcase                  [ service-showcase ] --------------------------------------------------------------------------- Split layout: a large sticky image on one side, an interactive accordion of

**Import:** `import ServiceShowcase from '../sections/ServiceShowcase.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `slugs` | `string[]` | optional |
| `ctaLabel` | `string` | optional |
| `ctaHref` | `string` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-pin-sticky`
- `data-accordion`

## Depends on

- `src/data/services.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import ServiceShowcase from '../sections/ServiceShowcase.astro';
---
<ServiceShowcase
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
