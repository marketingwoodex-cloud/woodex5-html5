# Page template · `/sustainability`

Source: `src/pages/sustainability.astro`
Sections used (**5**):

- `RichText`
- `FeatureSplit`
- `StatsStrip`
- `FaqBlock`
- `CtaBand`

## Reuse it

1. Copy `src/pages/sustainability.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <RichText />
  <FeatureSplit />
  <StatsStrip />
  <FaqBlock />
</BaseLayout>
```
