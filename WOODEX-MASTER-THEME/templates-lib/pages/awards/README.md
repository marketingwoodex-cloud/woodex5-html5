# Page template · `/awards`

Source: `src/pages/awards.astro`
Sections used (**4**):

- `AwardsList`
- `StatsStrip`
- `TestimonialsSlider`
- `CtaBand`

## Reuse it

1. Copy `src/pages/awards.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <AwardsList />
  <StatsStrip />
  <TestimonialsSlider />
  <CtaBand />
</BaseLayout>
```
