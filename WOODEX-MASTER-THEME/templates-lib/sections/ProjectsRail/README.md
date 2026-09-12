# ProjectsRail

> SECTION · Projects Rail                     [ projects-rail ] --------------------------------------------------------------------------- A horizontally scrolling project gallery driven by vertical page scroll.

**Import:** `import ProjectsRail from '../sections/ProjectsRail.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `eyebrow` | `string` | optional |
| `title` | `string` | optional |
| `lede` | `string` | optional |
| `limit` | `number` | optional |
| `ctaLabel` | `string` | optional |
| `ctaHref` | `string` | optional |
| `variant` | `'light' \| 'dark'` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`
- `data-scroll-rail`

## Depends on

- `src/data/projects.js`
- `src/components/ui/Icon.astro`
- `src/components/ui/Img.astro`

## Example

```astro
---
import ProjectsRail from '../sections/ProjectsRail.astro';
---
<ProjectsRail
  theme="default"
/>
```



---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
