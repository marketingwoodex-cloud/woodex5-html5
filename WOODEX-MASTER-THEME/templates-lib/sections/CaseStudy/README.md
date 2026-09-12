# CaseStudy

> SECTION · Case Study                        [ case-study ] --------------------------------------------------------------------------- The project-detail body: brief → challenge → solution → result, a metrics

**Import:** `import CaseStudy from '../sections/CaseStudy.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `project` | `Project` | **required** |
| `theme` | `'default' \| 'dark'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-stagger`
- `data-counter`

## Depends on

- `src/data/images.js`
- `src/data/projects.js`
- `src/components/ui/Img.astro`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import CaseStudy from '../sections/CaseStudy.astro';
---
<CaseStudy
  theme="default"
/>
```

**Required data props:** `project` (Project)


---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
