# Page template · `/team`

Source: `src/pages/team.astro`
Sections used (**5**):

- `TeamGrid`
- `RichText`
- `StatsStrip`
- `TestimonialsSlider`
- `CtaBand`

## Reuse it

1. Copy `src/pages/team.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <TeamGrid />
  <RichText />
  <StatsStrip />
  <TestimonialsSlider />
</BaseLayout>
```
