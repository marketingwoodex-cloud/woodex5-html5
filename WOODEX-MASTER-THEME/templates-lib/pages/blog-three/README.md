# Page template · `/blog-three`

Source: `src/pages/blog-three.astro`
Sections used (**4**):

- `JournalGrid`
- `NewsletterBand`
- `StatsStrip`
- `CtaBand`

## Reuse it

1. Copy `src/pages/blog-three.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <JournalGrid />
  <NewsletterBand />
  <StatsStrip />
  <CtaBand />
</BaseLayout>
```
