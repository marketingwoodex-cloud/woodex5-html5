# FaqBlock

> SECTION · FAQ                               [ faq ] --------------------------------------------------------------------------- Accordion FAQ with an optional sticky side panel (contact prompt or

**Import:** `import FaqBlock from '../sections/FaqBlock.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `items` | `{ q: string; a: string; category?: string }[]` | optional |
| `variant` | `'split' \| 'stacked'` | optional |
| `showSchema` | `boolean` | optional |
| `contactPrompt` | `boolean` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-pin-sticky`
- `data-accordion`

## Depends on

- `src/data/content.js`
- `src/data/site.js`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import FaqBlock from '../sections/FaqBlock.astro';
---
<FaqBlock
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
