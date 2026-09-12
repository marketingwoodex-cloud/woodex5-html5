# Page template · `/about`

Source: `src/pages/about.astro`
Sections used (**9**):

- `IntroSplit`
- `FeatureSplit`
- `Timeline`
- `TeamGrid`
- `StatsStrip`
- `TestimonialsSlider`
- `AwardsList`
- `ContactInfo`
- `CtaBand`

## Reuse it

1. Copy `src/pages/about.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <IntroSplit />
  <FeatureSplit />
  <Timeline />
  <TeamGrid />
</BaseLayout>
```
