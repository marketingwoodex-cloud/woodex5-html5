# Page template · `/contact-two`

Source: `src/pages/contact-two.astro`
Sections used (**5**):

- `ContactInfo`
- `FaqBlock`
- `TestimonialsSlider`
- `RichText`
- `ContactFormSection`

## Reuse it

1. Copy `src/pages/contact-two.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <ContactInfo />
  <FaqBlock />
  <TestimonialsSlider />
  <RichText />
</BaseLayout>
```
