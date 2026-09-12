# TabsShowcase

> TABS SHOWCASE — a horizontal tab rail driving a media + copy panel. Replicates the reference's "Designed for lasting impact" tabs section. MOTION: data-tabs / data-tab / data-tab-panel (motion.js), panel

**Import:** `import TabsShowcase from '../sections/TabsShowcase.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `tabs` | `TabItem[]` | **required** |
| `variant` | `'media-right' \| 'media-left'` | optional |
| `theme` | `'default' \| 'gray' \| 'dark' \| 'beige'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-magnetic`
- `data-tabs`

## Depends on

- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import TabsShowcase from '../sections/TabsShowcase.astro';
---
<TabsShowcase
  theme="default"
/>
```

**Required data props:** `tabs` (TabItem[])


---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
