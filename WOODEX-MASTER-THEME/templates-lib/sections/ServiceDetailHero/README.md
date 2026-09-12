# ServiceDetailHero

> SECTION · Service Detail Hero               [ service-detail-hero ] --------------------------------------------------------------------------- Header for a single service page: breadcrumb, masked title, lede, a quick

**Import:** `import ServiceDetailHero from '../sections/ServiceDetailHero.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `service` | `Service` | **required** |
| `showFacts` | `boolean` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-magnetic`

## Depends on

- `src/data/services.js`
- `src/data/images.js`
- `src/data/site.js`
- `src/components/ui/Img.astro`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import ServiceDetailHero from '../sections/ServiceDetailHero.astro';
---
<ServiceDetailHero
  theme="default"
/>
```

**Required data props:** `service` (Service)


---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
