# Page template · `/portfolio-two`

Source: `src/pages/portfolio-two.astro`
Sections used (**4**):

- `ProjectGrid`
- `MarqueeText`
- `ClientsMarquee`
- `CtaBand`

## Reuse it

1. Copy `src/pages/portfolio-two.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <ProjectGrid />
  <MarqueeText />
  <ClientsMarquee />
  <CtaBand />
</BaseLayout>
```
