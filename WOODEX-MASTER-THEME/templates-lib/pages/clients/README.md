# Page template · `/clients`

Source: `src/pages/clients.astro`
Sections used (**5**):

- `ClientsMarquee`
- `TestimonialsSlider`
- `ProjectGrid`
- `StatsStrip`
- `CtaBand`

## Reuse it

1. Copy `src/pages/clients.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <ClientsMarquee />
  <TestimonialsSlider />
  <ProjectGrid />
  <StatsStrip />
</BaseLayout>
```
