# Page template · `/pricing-one`

Source: `src/pages/pricing-one.astro`
Sections used (**5**):

- `PricingGrid`
- `RichText`
- `FaqBlock`
- `TestimonialsSlider`
- `CtaBand`

## Reuse it

1. Copy `src/pages/pricing-one.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <PricingGrid />
  <RichText />
  <FaqBlock />
  <TestimonialsSlider />
</BaseLayout>
```
