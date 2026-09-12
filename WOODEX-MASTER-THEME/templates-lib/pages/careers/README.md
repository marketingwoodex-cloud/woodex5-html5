# Page template · `/careers`

Source: `src/pages/careers.astro`
Sections used (**5**):

- `RichText`
- `TeamGrid`
- `ContactFormSection`
- `StatsStrip`
- `CtaBand`

## Reuse it

1. Copy `src/pages/careers.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <RichText />
  <TeamGrid />
  <ContactFormSection />
  <StatsStrip />
</BaseLayout>
```
