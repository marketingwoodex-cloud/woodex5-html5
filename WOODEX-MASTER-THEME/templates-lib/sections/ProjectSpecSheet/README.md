# ProjectSpecSheet

> PROJECT SPEC SHEET — the technical summary a builder, buyer or client actually checks: areas, systems, materials, compliance. Data comes from the typed project record; sections with no data are

**Import:** `import ProjectSpecSheet from '../sections/ProjectSpecSheet.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `project` | `(typeof projects)[number]` | **required** |
| `variant` | `'table' \| 'cards' \| 'split'` | optional |
| `theme` | `'default' \| 'gray' \| 'dark'` | optional |
| `showNotes` | `boolean` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`

## Depends on

- `src/data/projects.js`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import ProjectSpecSheet from '../sections/ProjectSpecSheet.astro';
---
<ProjectSpecSheet
  theme="default"
/>
```

**Required data props:** `project` ((typeof projects)[number])


---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
