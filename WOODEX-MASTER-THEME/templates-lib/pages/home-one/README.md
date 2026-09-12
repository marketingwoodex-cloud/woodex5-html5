# Page template · `/home-one`

Source: `src/pages/home-one.astro`
Sections used (**17**):

- `HeroClassic`
- `MarqueeText`
- `IntroSplit`
- `ServiceShowcase`
- `FeatureSplit`
- `ProjectsRail`
- `StatsStrip`
- `ProcessAccordion`
- `TestimonialsSlider`
- `ClientsMarquee`
- `JournalGrid`
- `FaqBlock`
- `VideoBlock`
- `TabsShowcase`
- `BulletFeatures`
- `ThumbnailGrid`
- `ImageMarquee`

## Reuse it

1. Copy `src/pages/home-one.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <HeroClassic />
  <MarqueeText />
  <IntroSplit />
  <ServiceShowcase />
</BaseLayout>
```
