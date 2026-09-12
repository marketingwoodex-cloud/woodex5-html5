# Page template · `/service`

Source: `src/pages/service.astro`
Sections used (**6**):

- `ServiceRows`
- `StatsStrip`
- `FeatureSplit`
- `ProcessAccordion`
- `FaqBlock`
- `CtaBand`

## Reuse it

1. Copy `src/pages/service.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <ServiceRows />
  <StatsStrip />
  <FeatureSplit />
  <ProcessAccordion />
</BaseLayout>
```
