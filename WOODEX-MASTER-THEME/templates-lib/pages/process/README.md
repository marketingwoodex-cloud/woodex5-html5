# Page template · `/process`

Source: `src/pages/process.astro`
Sections used (**7**):

- `ProcessAccordion`
- `Timeline`
- `FeatureSplit`
- `StatsStrip`
- `RichText`
- `FaqBlock`
- `CtaBand`

## Reuse it

1. Copy `src/pages/process.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <ProcessAccordion />
  <Timeline />
  <FeatureSplit />
  <StatsStrip />
</BaseLayout>
```
