# Timeline

> SECTION · Timeline                          [ timeline ] --------------------------------------------------------------------------- Studio history with a scroll-drawn progress spine.

**Import:** `import Timeline from '../sections/Timeline.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `variant` | `'vertical' \| 'horizontal'` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`

## Depends on

- `src/data/content.js`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import Timeline from '../sections/Timeline.astro';
---
<Timeline
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
