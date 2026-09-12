# RichText

> SECTION · Rich Text                         [ rich-text ] --------------------------------------------------------------------------- Long-form article / policy renderer. Consumes the structured block arrays

**Import:** `import RichText from '../sections/RichText.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `blocks` | `Block[]` | **required** |
| `showToc` | `boolean` | optional |
| `narrow` | `boolean` | optional |
| `class` | `string` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-pin-sticky`

## Depends on

- `src/components/ui/Img.astro`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import RichText from '../sections/RichText.astro';
---
<RichText
  theme="default"
/>
```

**Required data props:** `blocks` (Block[])


---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
