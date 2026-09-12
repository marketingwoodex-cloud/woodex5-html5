# Page template · `/search`

Source: `src/pages/search.astro`
Sections used (**1**):

- `RichText`

## Reuse it

1. Copy `src/pages/search.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <RichText />
</BaseLayout>
```
