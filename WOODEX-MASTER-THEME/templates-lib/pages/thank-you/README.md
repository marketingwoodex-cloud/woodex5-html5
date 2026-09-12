# Page template · `/thank-you`

Source: `src/pages/thank-you.astro`
Sections used (**3**):

- `ProcessAccordion`
- `JournalGrid`
- `TestimonialsSlider`

## Reuse it

1. Copy `src/pages/thank-you.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <ProcessAccordion />
  <JournalGrid />
  <TestimonialsSlider />
</BaseLayout>
```
