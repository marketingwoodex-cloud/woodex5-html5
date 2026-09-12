# Page template · `/portfolio-three`

Source: `src/pages/portfolio-three.astro`
Sections used (**4**):

- `ProjectGrid`
- `StatsStrip`
- `Timeline`
- `CtaBand`

## Reuse it

1. Copy `src/pages/portfolio-three.astro` into your project's `src/pages/`.
2. Adjust the `BaseLayout` frontmatter (title, description, `current`, `footerCta*`).
3. Point the section props at your own data modules.

## Example of the pattern

```astro
<BaseLayout title="…" description="…" overlayHeader current="about">
  <ProjectGrid />
  <StatsStrip />
  <Timeline />
  <CtaBand />
</BaseLayout>
```
