# Woodex Interior — HTML5 Master To-Do List
## Complete pending-task checklist

**Active workspace:** `HTML 5/`  
**Master file:** `index.html`  
**Company draft:** `company-index.html`  
**Framework direction:** HTML5 + Tailwind CSS-compatible CSS + vanilla JavaScript  
**Content:** JSON-ready  
**Market:** Pakistan nationwide  
**Primary CTA:** Get in touch / WhatsApp consultation

Legend: `[x] complete` · `[~] in progress` · `[ ] pending` · `[!] needs Woodex approval`

---

## 1. Current status

| Area | Status | Notes |
|---|---|---|
| HTML5 workspace | [x] | `HTML 5/` created |
| React/Astro removal | [x] | React data and source removed |
| Master homepage | [x] | `index.html` restored |
| Company draft | [x] | `company-index.html` created |
| Local hero images | [x] | Three generated hero assets |
| Remote asset cleanup | [x] | Remote font/images/scripts removed from master draft |
| CSS extraction | [x] | `assets/css/site.css` created |
| JS extraction | [x] | `assets/js/main.js` created |
| Services dropdown | [~] | Existing markup; interaction hardening pending |
| Mobile menu | [~] | Existing button; full drawer behavior pending |
| Hero three-slide behavior | [~] | Markup and wordmarks present; image-per-slide polish pending |
| Scroll motion | [~] | Reveal foundation exists; final behavior pending |
| Internal pages | [ ] | Build after homepage approval |
| JSON data layer | [ ] | Design now; implement next |
| Production QA | [ ] | Final phase |

---

## 2. Phase 1 — Structure and asset foundation

### Completed

- [x] Create `HTML 5/` workspace.
- [x] Restore attached HTML draft.
- [x] Create `company-index.html`.
- [x] Create assets folders.
- [x] Generate three hero images.
- [x] Replace remote hero image.
- [x] Replace remote section images.
- [x] Remove remote Google Font import.
- [x] Remove Cloudflare analytics script.
- [x] Remove protected email decoder.
- [x] Extract inline CSS.
- [x] Extract inline JavaScript.

### Pending

- [ ] Split `site.css` into tokens, base, layout, components, and responsive layers.
- [ ] Add CSS custom property spacing system.
- [ ] Add local image dimensions/aspect-ratio rules.
- [ ] Add image fallback state.
- [ ] Add `assets/data/` directory.

---

## 3. Phase 2 — Header and navigation

### Services dropdown

- [ ] Open menu on button click.
- [ ] Close menu on second click.
- [ ] Close on outside click.
- [ ] Close on Escape.
- [ ] Add `aria-expanded`.
- [ ] Add `aria-controls`.
- [ ] Add keyboard tab navigation.
- [ ] Prevent menu from opening only on hover.
- [ ] Keep desktop menu inside viewport at 1024 px.
- [ ] Ensure all service links are unique.
- [ ] Link each service to its future page route.

### Mobile hamburger

- [ ] Replace simple display toggle with a drawer.
- [ ] Add full-screen mobile panel.
- [ ] Lock body scroll while open.
- [ ] Close on Escape.
- [ ] Close after selecting a link.
- [ ] Add visible close button.
- [ ] Add focus state.
- [ ] Add `aria-label` and `aria-expanded`.
- [ ] Ensure desktop navigation never appears with mobile drawer.

### Header polish

- [ ] Add active page state.
- [ ] Align logo and links vertically.
- [ ] Normalize CTA height.
- [ ] Test transparent hero header.
- [ ] Test scrolled solid header.
- [ ] Test 320, 375, 768, 1024, 1280, and 1440 px.

---

## 4. Phase 3 — Hero slider

### Slide content

- [x] Slide 1: Inspired spaces / LAYOUT.
- [x] Slide 2: Lasting design / CREATE.
- [x] Slide 3: Life enhanced / DESIGN.
- [x] Same content grid.
- [x] Same CTA label: Get started.
- [x] Fixed bottom wordmark structure.

### Interaction

- [ ] Connect separate image to each slide.
- [ ] Add active slide state.
- [ ] Add automatic rotation.
- [ ] Add manual controls.
- [ ] Add pause button or pause-on-hover.
- [ ] Add keyboard control.
- [ ] Add reduced-motion static state.
- [ ] Prevent content/layout shift.
- [ ] Add image loading state.
- [ ] Test mobile hero crop.

### Visual polish

- [ ] Match reference headline width.
- [ ] Match paragraph alignment beside CTA.
- [ ] Keep wordmark at fixed bottom position.
- [ ] Match vertical grid line opacity.
- [ ] Normalize overlay contrast.
- [ ] Test all three headlines at every breakpoint.

---

## 5. Phase 4 — Section motion and storytelling

### Our approach

- [ ] Add reveal animation to statement.
- [ ] Add stagger to Listen / Shape / Build.
- [ ] Add proof metrics state.
- [ ] Add link to About.

### Core services

- [ ] Add card reveal stagger.
- [ ] Add active service detail panel.
- [ ] Add image or visual state for each service.
- [ ] Add service links.
- [ ] Add keyboard interaction.

### What we do

- [ ] Add local image reveal.
- [ ] Add image scale-on-hover.
- [ ] Add copy reveal.
- [ ] Add Explore services CTA.

### Selected work

- [ ] Add local project images.
- [ ] Add category filter.
- [ ] Add image crop transitions.
- [ ] Add project facts.
- [ ] Add project detail links.

### Process

- [ ] Add row reveal on scroll.
- [ ] Add active step state.
- [ ] Add mobile accordion.
- [ ] Add process CTA.

### Journal

- [ ] Add local article images.
- [ ] Add card reveal.
- [ ] Add article links.
- [ ] Add article category labels.

### Motion rules

- [ ] Use `IntersectionObserver`.
- [ ] Do not hide content if JavaScript is disabled.
- [ ] Respect `prefers-reduced-motion`.
- [ ] Keep transitions between 200–900 ms.
- [ ] Avoid constant looping except hero rotation.
- [ ] Test scroll performance on mobile.

---

## 6. Phase 5 — Button and typography polish

### Buttons

- [ ] Standardize all button heights.
- [ ] Standardize arrow circle size.
- [ ] Align text vertically.
- [ ] Add hover state.
- [ ] Add focus-visible state.
- [ ] Add active/pressed state.
- [ ] Add disabled state for forms.
- [ ] Ensure button text does not wrap.
- [ ] Ensure buttons work at 320 px.

### Typography

- [ ] Confirm final local font choice.
- [ ] Create display, body, label, and caption tokens.
- [ ] Normalize heading line-height.
- [ ] Normalize letter spacing.
- [ ] Check hero line breaks.
- [ ] Check long service titles.
- [ ] Check footer type scale.
- [ ] Test text contrast.

---

## 7. Phase 6 — Local content and JSON readiness

Create:

```text
HTML 5/assets/data/
├── site.json
├── navigation.json
├── services.json
├── projects.json
└── articles.json
```

### Data tasks

- [ ] Move navigation labels into JSON.
- [ ] Move services into JSON.
- [ ] Move project metadata into JSON.
- [ ] Move article cards into JSON.
- [ ] Add slugs to every entry.
- [ ] Add image paths.
- [ ] Add alt text.
- [ ] Add related links.
- [ ] Add verified content fields only.
- [ ] Add a vanilla JSON renderer where useful.

### Future React readiness

- [ ] Keep consistent keys and slugs.
- [ ] Keep data separate from layout.
- [ ] Avoid hard-coded business content in JavaScript.
- [ ] Keep component names and section IDs stable.

---

## 8. Phase 7 — Internal HTML pages

### Required pages

- [ ] `about.html`
- [ ] `services.html`
- [ ] `portfolio.html`
- [ ] `process.html`
- [ ] `journal.html`
- [ ] `contact.html`
- [ ] `thank-you.html`
- [ ] `404.html`
- [ ] `privacy.html`
- [ ] `terms.html`
- [ ] `accessibility.html`

### Page requirements

Every page must have:

- [ ] Shared header.
- [ ] Shared footer.
- [ ] Active route state.
- [ ] Unique title and description.
- [ ] One H1.
- [ ] Primary CTA.
- [ ] Internal related links.
- [ ] Local images only.
- [ ] Responsive spacing.

---

## 9. Phase 8 — Contact and conversion

- [ ] Confirm official WhatsApp number.
- [ ] Confirm official email.
- [ ] Add consultation form.
- [ ] Add city field.
- [ ] Add project type field.
- [ ] Add area field.
- [ ] Add timeline field.
- [ ] Add budget field.
- [ ] Add floor-plan upload plan.
- [ ] Add client-side validation.
- [ ] Add success state.
- [ ] Add error state.
- [ ] Add WhatsApp fallback.
- [ ] Add thank-you page.
- [ ] Add spam protection before launch.

---

## 10. Phase 9 — Accessibility

- [ ] Validate semantic landmarks.
- [ ] Add keyboard menu behavior.
- [ ] Add focus-visible styling.
- [ ] Add correct `aria-expanded` state.
- [ ] Add correct `aria-controls` state.
- [ ] Add alt text review.
- [ ] Add form label associations.
- [ ] Add reduced-motion mode.
- [ ] Check contrast.
- [ ] Test at 200% zoom.
- [ ] Test with keyboard only.

---

## 11. Phase 10 — Performance and QA

- [ ] Validate HTML5.
- [ ] Check all internal links.
- [ ] Check all image paths.
- [ ] Check no remote content remains.
- [ ] Optimize JPEG/WebP assets.
- [ ] Add image dimensions.
- [ ] Add lazy loading below fold.
- [ ] Preload first hero image.
- [ ] Remove unused CSS.
- [ ] Run Lighthouse.
- [ ] Check LCP.
- [ ] Check CLS.
- [ ] Check INP.
- [ ] Test Chrome.
- [ ] Test Safari.
- [ ] Test Firefox.
- [ ] Test mobile widths.

---

## 12. Launch gates

### Content gate

- [ ] Pakistan service area confirmed.
- [ ] Contact details confirmed.
- [ ] Claims and metrics verified.
- [ ] Projects approved.
- [ ] Images approved.
- [ ] Legal content approved.

### Design gate

- [ ] Reference hero spacing approved.
- [ ] Services dropdown approved.
- [ ] Mobile menu approved.
- [ ] Footer approved.
- [ ] All sections have consistent rhythm.
- [ ] Button and font alignment approved.

### Technical gate

- [ ] All pages open.
- [ ] All forms work.
- [ ] All image files load.
- [ ] No console errors.
- [ ] No remote assets.
- [ ] JSON content loads.
- [ ] Accessibility passes.
- [ ] Performance passes.

---

## 13. Immediate next execution order

1. Implement click-based Services dropdown.
2. Implement complete mobile drawer menu.
3. Connect three hero images to three slides.
4. Add scroll motion controller.
5. Add section spacing tokens.
6. Add JSON data folder.
7. Complete local image coverage.
8. Build About, Services, Portfolio, Process, Journal, Contact pages.
9. Run full link and accessibility audit.
10. Prepare production package.
