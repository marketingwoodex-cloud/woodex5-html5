# Customisation guide

## 1. Add a new section

Create `src/sections/MySection.astro`. Sections are self-contained: props,
markup, scoped CSS and (if needed) a co-located `<script>`.

```astro
---
interface Props {
  eyebrow?: string;
  title: string;
  theme?: 'default' | 'gray' | 'dark';
}
const { eyebrow, title, theme = 'default' } = Astro.props;
---

<section class="section my" data-theme={theme}>
  <div class="container">
    {eyebrow && <span class="eyebrow" data-reveal="fade">{eyebrow}</span>}
    <h2 data-heading-reveal="words" data-heading-stagger="46">{title}</h2>
  </div>
</section>
```

House rules:

1. Wrap content in `.container`, and the section in `.section` (`--sm` for tighter).
2. Support `data-theme="dark|gray"` if the section can sit anywhere.
3. Use tokens only — never a raw hex value in a component.
4. Add motion with attributes, never by writing keyframes in the component.
5. No new dependencies.

Then run `npm run templates` so the library and its prop docs are regenerated.

## 2. Swap the palette

**The site uses four colours. Keep it that way.** All colour lives in `src/styles/tokens.css`
under *1. Brand palette*:

```css
:root {
  --c-white: #ffffff;   /* page ground, cards, text on blue */
  --c-navy:  #0f1e36;   /* BLUE — every dark surface, buttons, links */
  --c-cream: #fcf2e8;   /* warm alternate ground, accents */
  --c-black: #000000;   /* body copy, hairlines, deepest ground */
}
```

Everything softer is one of those four with alpha, listed directly beneath under
*1a. Derived tints* (`--tint-ink-68`, `--tint-ice-50`, …). If you change a brand colour,
re-check those tints — they are written as literal `rgba()` values so they can be tuned
independently of the base.

Then, if the new palette needs different semantics, adjust the aliases in *1c. Semantic
aliases* (`--bg`, `--text`, `--line`, `--accent`). Components only ever read aliases.

**Inversion is free.** A section flips to the dark treatment with one attribute:

```html
<section data-theme="dark"> … </section>   <!-- navy ground, white copy -->
<section data-theme="cream"> … </section>  <!-- cream ground, black copy -->
<section data-theme="black"> … </section>  <!-- deepest ground -->
```

`beige` and `gray` are accepted as aliases for `cream`, and `navy`/`blue` for `dark`.
No component contains a light/dark branch — that is the whole point.

**Never add a fifth colour.** Need a softer tone? Use a tint, an icon, or font weight.
Error and warning states are deliberately colour-free: navy border + `alert` icon + text,
which stays legible in greyscale (WCAG 1.4.1).

### 2.1 Re-face photography onto the palette

Photographs are tinted at paint time so any file — stock, AI, or a client's shoot — reads as
part of the identity:

| Where | Grade applied |
| --- | --- |
| Light sections | on-palette grade, `--tone-light` |
| Dark / navy / black sections | cooler deeper grade, `--tone-dark` (automatic) |
| Hover or focus on a linked image | dialled back toward full colour |

- Global switch: `theme.imageTone` in `src/data/site.js` →
  `'cream'` (default) · `'soft'` (barely there) · `'duo'` (hard navy/cream duotone) · `'none'`.
- Per image: `<Img src="…" tone="duo" />`, `tone="navy"`, `tone="none"`.
- Per subtree: put `data-tone="none"` on any wrapper to exempt everything inside (used for logos).
- The recipes live in `src/styles/components.css` under *IMAGE TREATMENT* — tune the numbers there,
  never in a component.

Nothing is baked into the image files, so the originals in `/public/images/` remain full colour.

## 3. Swap the typography

`--ff-display` and `--ff-body` are system stacks by default (no font request, no
layout shift). To use a licensed webfont, self-host it in `public/fonts/`, add an
`@font-face` block in `src/styles/base.css`, and point the two tokens at it.
Type sizes and line heights are the nine fluid steps in `tokens.css`.

## 4. Change the motion

`src/scripts/motion.js` (~4.4 kB gzipped) drives everything from one rAF loop.
Section-level behaviour is controlled by attributes; global feel is controlled by
the easing and duration tokens:

```css
--dur: 320ms;
--dur-slow: 620ms;
--ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

To remove an effect entirely, delete the attribute. Nothing else references it.

## 5. Swap in real photography

Drop the file at the canonical path in `src/data/images.js` — for example
`public/images/projects/contemporary-retreat-cover.jpg`. The next build resolves
to your file and ignores the placeholder. No component edit, no code change.

## 6. Change navigation

`src/data/navigation.js` drives the header, mega panels, the mobile drawer, the
footer columns and the sitemap. Mega panels support up to four columns, each with
an optional title, link list and feature card. Nav items can also be plain links
(no `mega` key).

## 7. Wire the forms

`ContactFormSection` and `NewsletterBand` post through `data-form="demo"` handling
in `motion.js` — validation, double-submit blocking and success/error states are
already implemented. Pass a real `endpoint` prop to post to your backend, or
replace the submit handler to call your API.

## 8. Common tasks

| Task | File |
| --- | --- |
| Add a footer link | `src/data/navigation.js` → `footerNav` |
| Change the pre-footer CTA | Per page: `BaseLayout` props `footerCtaTitle/label/href` |
| Hide the CTA on a page | `<BaseLayout footerCta={false} …>` |
| Add a legal page | Copy `src/pages/privacy.astro` and swap the `blocks` array |
| Add a new icon | Append to the `paths` map in `src/components/ui/Icon.astro` |
| Point `/` at a homepage | Replace `src/pages/index.astro` with a redirect or a copy of `home-one` |
