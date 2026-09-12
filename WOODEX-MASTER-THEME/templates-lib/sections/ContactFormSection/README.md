# ContactFormSection

> SECTION · Contact Form                      [ contact-form ] --------------------------------------------------------------------------- Multi-step-capable enquiry form with a sticky info rail.

**Import:** `import ContactFormSection from '../sections/ContactFormSection.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `endpoint` | `string` | optional |
| `demo` | `boolean` | optional |
| `variant` | `'split' \| 'stacked'` | optional |
| `submitLabel` | `string` | optional |
| `showInfoRail` | `boolean` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-pin-sticky`

## Depends on

- `src/data/services.js`
- `src/data/site.js`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import ContactFormSection from '../sections/ContactFormSection.astro';
---
<ContactFormSection
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
