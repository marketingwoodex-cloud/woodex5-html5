# JournalGrid

> SECTION · Journal Grid                      [ journal-grid ] --------------------------------------------------------------------------- Article index in three layouts, plus an optional topic filter bar.

**Import:** `import JournalGrid from '../sections/JournalGrid.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `variant` | `'feature' \| 'grid' \| 'list'` | optional |
| `limit` | `number` | optional |
| `showFilter` | `boolean` | optional |
| `ctaLabel` | `string` | optional |
| `ctaHref` | `string` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`

## Depends on

- `src/data/articles.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import JournalGrid from '../sections/JournalGrid.astro';
---
<JournalGrid
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
