# AwardsList

> SECTION · Awards & Press                    [ awards-list ] --------------------------------------------------------------------------- Hover-to-zoom row list of awards, with an optional press quote column.

**Import:** `import AwardsList from '../sections/AwardsList.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `items` | `typeof awards` | optional |
| `showPress` | `boolean` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`

## Depends on

- `src/data/content.js`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import AwardsList from '../sections/AwardsList.astro';
---
<AwardsList
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
