# Page template · `/blog-one`

Source: `src/pages/blog-one.astro`
Sections used (**3**):

- `JournalGrid`
- `NewsletterBand`
- `CtaBand`

## Reuse it

1. Copy `src/pages/blog-one.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <JournalGrid />
  <NewsletterBand />
  <CtaBand />
</BaseLayout>
```
