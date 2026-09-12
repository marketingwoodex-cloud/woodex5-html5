# ArticleHero

> SECTION · Article Hero                      [ article-hero ] --------------------------------------------------------------------------- Blog-post header: breadcrumb, topic tag, masked title, author row with

**Import:** `import ArticleHero from '../sections/ArticleHero.astro';`

## Props

| Prop | Type | |
| --- | --- | --- |
| `title` | `string` | **required** |
| `excerpt` | `string` | optional |
| `topic` | `string` | **required** |
| `date` | `string` | **required** |
| `readingTime` | `number` | **required** |
| `author` | `string` | **required** |
| `authorRole` | `string` | optional |
| `cover` | `string` | optional |
| `tags` | `string[]` | optional |

## Motion used

- `data-heading-reveal`
- `data-reveal`

## Depends on

- `src/data/articles.js`
- `src/data/images.js`
- `src/data/site.js`
- `src/components/ui/Img.astro`
- `src/components/ui/Icon.astro`

## Example

```astro
---
import ArticleHero from '../sections/ArticleHero.astro';
---
<ArticleHero
  theme="default"
/>
```

**Required data props:** `title` (string), `topic` (string), `date` (string), `readingTime` (number), `author` (string)


---

Part of the **Woodex Master Theme** section library (37 sections).
See `design.md` §5 for the full inventory and `templates-lib/INDEX.md` for the map.
