# SplitCompare

> SECTION · Split Compare                     [ split-compare ] --------------------------------------------------------------------------- Draggable before/after slider — ideal for renovation case studies.

**Import:** `import SplitCompare from '../sections/SplitCompare.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `beforeImage` | `string` | **required** |
| `afterImage` | `string` | **required** |
| `beforeLabel` | `string` | optional |
| `afterLabel` | `string` | optional |
| `caption` | `string` | optional |
| `startAt` | `number` | optional |
| `theme` | `'default' \| 'dark' \| 'gray'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`

## Depends on

- `src/components/ui/Img.astro`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import SplitCompare from '../sections/SplitCompare.astro';
---
<SplitCompare
  theme="default"
/>
```

**Required data props:** `beforeImage` (string), `afterImage` (string)


---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
