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

All colour lives in `src/styles/tokens.css`. Change the eight raw colours and the
semantic aliases follow:

```css
:root {
  --c-jet: #111111;      /* dark sections, primary buttons */
  --c-beige: #fcf2e8;    /* page background, inverted text */
  --bg: var(--c-beige);
  --text: var(--c-black);
}
```

Dark sections invert by setting `data-theme="dark"` on the section — you do not
write new colour values for them.

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
