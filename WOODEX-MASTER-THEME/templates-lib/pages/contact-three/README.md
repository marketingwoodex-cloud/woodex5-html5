# Page template · `/contact-three`

Source: `src/pages/contact-three.astro`
Sections used (**4**):

- `ContactInfo`
- `ContactFormSection`
- `FaqBlock`
- `NewsletterBand`

## Reuse it

1. Copy `src/pages/contact-three.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <ContactInfo />
  <ContactFormSection />
  <FaqBlock />
  <NewsletterBand />
</BaseLayout>
```
