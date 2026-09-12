# Page template · `/materials`

Source: `src/pages/materials.astro`
Sections used (**4**):

- `GalleryGrid`
- `RichText`
- `FaqBlock`
- `CtaBand`

## Reuse it

1. Copy `src/pages/materials.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <GalleryGrid />
  <RichText />
  <FaqBlock />
  <CtaBand />
</BaseLayout>
```
