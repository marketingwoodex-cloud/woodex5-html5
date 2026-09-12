# ProcessAccordion

> SECTION · Process Accordion                 [ process-accordion ] --------------------------------------------------------------------------- The seven-stage delivery process. Accordion rows with a live progress rail

**Import:** `import ProcessAccordion from '../sections/ProcessAccordion.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `steps` | `typeof processSteps` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |
| `variant` | `'accordion' \| 'cards'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-pin-sticky`
- `data-accordion`

## Depends on

- `src/data/content.js`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import ProcessAccordion from '../sections/ProcessAccordion.astro';
---
<ProcessAccordion
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
