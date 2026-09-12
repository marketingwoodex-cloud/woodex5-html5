# Page template · `/testimonials`

Source: `src/pages/testimonials.astro`
Sections used (**5**):

- `TestimonialsSlider`
- `StatsStrip`
- `ProjectGrid`
- `ClientsMarquee`
- `CtaBand`

## Reuse it

1. Copy `src/pages/testimonials.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <TestimonialsSlider />
  <StatsStrip />
  <ProjectGrid />
  <ClientsMarquee />
</BaseLayout>
```
