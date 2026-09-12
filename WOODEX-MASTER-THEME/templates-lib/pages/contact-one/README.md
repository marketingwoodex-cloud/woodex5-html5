# Page template · `/contact-one`

Source: `src/pages/contact-one.astro`
Sections used (**5**):

- `ContactFormSection`
- `ContactInfo`
- `FaqBlock`
- `StatsStrip`
- `ProcessAccordion`

## Reuse it

1. Copy `src/pages/contact-one.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <ContactFormSection />
  <ContactInfo />
  <FaqBlock />
  <StatsStrip />
</BaseLayout>
```
