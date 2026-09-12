# Page template · `/faq`

Source: `src/pages/faq.astro`
Sections used (**4**):

- `FaqBlock`
- `RichText`
- `ProcessAccordion`
- `CtaBand`

## Reuse it

1. Copy `src/pages/faq.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <FaqBlock />
  <RichText />
  <ProcessAccordion />
  <CtaBand />
</BaseLayout>
```
