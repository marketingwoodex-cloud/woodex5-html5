# Page template · `/home-two`

Source: `src/pages/home-two.astro`
Sections used (**11**):

- `HeroShowcase`
- `ClientsMarquee`
- `FeatureSplit`
- `ServiceGrid`
- `ProjectGrid`
- `StatsStrip`
- `PricingGrid`
- `TestimonialsSlider`
- `JournalGrid`
- `CtaBand`
- `ProcessAccordion`

## Reuse it

1. Copy `src/pages/home-two.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <HeroShowcase />
  <ClientsMarquee />
  <FeatureSplit />
  <ServiceGrid />
</BaseLayout>
```
