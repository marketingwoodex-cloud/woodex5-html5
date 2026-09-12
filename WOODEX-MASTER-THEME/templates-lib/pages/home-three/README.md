# Page template · `/home-three`

Source: `src/pages/home-three.astro`
Sections used (**12**):

- `HeroStudio`
- `MarqueeText`
- `IntroSplit`
- `ServiceRows`
- `ProjectsRail`
- `FeatureSplit`
- `StatsStrip`
- `Timeline`
- `AwardsList`
- `TestimonialsSlider`
- `JournalGrid`
- `CtaBand`

## Reuse it

1. Copy `src/pages/home-three.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <HeroStudio />
  <MarqueeText />
  <IntroSplit />
  <ServiceRows />
</BaseLayout>
```
