# Woodex Interior — Complete HTML5 Page Audit

**Workspace:** `HTML 5/`  
**Audited server:** Woodex HTML 5 Workspace, port `4174`  
**Audit type:** Static structure, internal links, assets, JSON, CSS/JS, and HTTP route audit  
**Status:** Technically healthy draft; production content approval still required

---

## 1. Executive result

The complete HTML5 workspace is serving successfully. All 14 HTML pages, CSS, JavaScript, and JSON data files returned HTTP 200 in the local live test.

### Summary

| Check | Result |
|---|---:|
| HTML pages tested | 14 |
| HTTP route failures | 0 |
| Missing local links | 0 |
| Remote URLs in HTML | 0 |
| JSON files valid | 5 / 5 |
| CSS balance | Passed |
| JavaScript syntax | Passed |
| Local image assets | 3 |
| Production readiness | Pending business content approval |

---

## 2. Page inventory

| Page | H1 | Sections | Images | HTTP | Status |
|---|---:|---:|---:|---:|---|
| `index.html` | 3 | 7 | 7 | 200 | Master homepage |
| `company-index.html` | 3 | 7 | 7 | 200 | Company homepage draft |
| `about.html` | 1 | 0 | 1 | 200 | Basic page draft |
| `services.html` | 1 | 0 | 0 | 200 | Basic page draft |
| `portfolio.html` | 1 | 0 | 1 | 200 | Basic page draft |
| `portfolio-three.html` | 1 | 0 | 1 | 200 | Portfolio alias |
| `process.html` | 1 | 0 | 0 | 200 | Basic page draft |
| `journal.html` | 1 | 0 | 0 | 200 | Basic page draft |
| `contact.html` | 1 | 0 | 0 | 200 | Form page draft |
| `thank-you.html` | 1 | 0 | 0 | 200 | Confirmation page |
| `404.html` | 1 | 0 | 0 | 200 | Utility page |
| `privacy.html` | 1 | 0 | 0 | 200 | Legal draft |
| `terms.html` | 1 | 0 | 0 | 200 | Legal draft |
| `accessibility.html` | 1 | 0 | 0 | 200 | Legal draft |

### Main finding

The master homepage is the most complete page. The internal pages are valid working drafts but need full section-level content and image storytelling before launch.

---

## 3. Homepage audit

### Strengths

- Three-slide editorial hero.
- Three local hero image assets.
- Fixed bottom wordmark system.
- Core services section.
- Selected work section.
- Process section.
- Journal section.
- Footer conversion area.
- Scroll reveal motion.
- Responsive CSS.
- Reduced-motion fallback.
- Local-only content assets.

### Homepage risks

1. The homepage contains three H1 elements because each hero slide contains an H1. For SEO and accessibility, keep one semantic H1 and use visual slide headings as `div`/`p` or update the inactive slides to `h2`.
2. Generated images are suitable for design validation but must be replaced with approved Woodex project photography.
3. Claims and project names need business approval.
4. The Services menu currently points multiple items to `services.html`; final service routes should be created and linked individually.
5. The contact route is currently a static form draft and needs a real submission endpoint.

### Recommended fix priority

- **P0:** one semantic H1 on homepage.
- **P0:** official contact and WhatsApp details.
- **P1:** service-specific internal routes.
- **P1:** real portfolio facts and images.
- **P1:** form backend.

---

## 4. Header and navigation audit

### Passed

- Header is present.
- Services dropdown markup exists.
- Mobile menu trigger exists.
- Internal navigation links exist.
- Focus styles are present.
- Escape key handling is included in JavaScript.
- All referenced current files return 200.

### Pending polish

- [ ] Add `aria-expanded` state to the Services button in the HTML before JavaScript loads.
- [ ] Add `aria-controls` to connect the menu button to the dropdown.
- [ ] Add `aria-current="page"` to active page links.
- [ ] Ensure dropdown does not open on hover alone.
- [ ] Confirm mobile menu focus trap.
- [ ] Add close-on-route-change.
- [ ] Add visible close button text for the mobile drawer.
- [ ] Add per-service destination pages.

---

## 5. Footer audit

### Passed

- Footer exists on the homepage and internal pages.
- Logo returns to the homepage.
- Explore and services links are present.
- Email link is local and non-remote.
- Footer uses the four-color theme.

### Pending polish

- [ ] Add verified Pakistan WhatsApp number.
- [ ] Add verified service area.
- [ ] Add approved social links.
- [ ] Add privacy and terms links to the homepage footer if not already visible.
- [ ] Add a compact “Send your floor plan” CTA.
- [ ] Confirm footer stack on mobile.

---

## 6. Local asset audit

### Current assets

```text
assets/images/hero-layout.jpg
assets/images/hero-create.jpg
assets/images/hero-design.jpg
```

### Passed

- Images served locally.
- No remote URL remains in HTML.
- Hero image paths resolve.
- Portfolio and section images resolve.

### Pending

- [ ] Add About image.
- [ ] Add Services image set.
- [ ] Add Office image.
- [ ] Add Hospitality image.
- [ ] Add Joinery image.
- [ ] Add Journal image set.
- [ ] Convert JPG to WebP/AVIF.
- [ ] Add width/height metadata.
- [ ] Add mobile-specific crops.
- [ ] Review image licensing/approval.

---

## 7. JSON audit

All five JSON files passed validation:

- `assets/data/site.json`
- `assets/data/navigation.json`
- `assets/data/services.json`
- `assets/data/projects.json`
- `assets/data/articles.json`

### Recommended data additions

- `location`
- `area`
- `duration`
- `year`
- `heroImage`
- `alt`
- `relatedServices`
- `relatedProjects`
- `seoTitle`
- `seoDescription`

---

## 8. Forms and conversion audit

### Current state

- Contact page exists.
- Form fields exist.
- Client-side success message exists.
- Form does not yet send data to a real backend.

### Required before launch

- [ ] Confirm official email.
- [ ] Confirm official WhatsApp number.
- [ ] Add server-side validation.
- [ ] Add spam protection.
- [ ] Add form endpoint.
- [ ] Add email notification.
- [ ] Add optional floor-plan upload.
- [ ] Add success redirect to `thank-you.html`.
- [ ] Add analytics conversion event.

---

## 9. Accessibility audit

### Passed foundation

- Semantic HTML5 elements are present.
- Buttons and links are used for interaction.
- Focus-visible styles exist.
- Reduced-motion styles exist.
- Images contain alt text on the master homepage.

### Pending manual testing

- [ ] Keyboard-only navigation.
- [ ] Screen reader landmarks.
- [ ] Dropdown announcement.
- [ ] Mobile drawer focus trap.
- [ ] Form field error association.
- [ ] Color contrast at every state.
- [ ] 200% zoom.
- [ ] Reduced-motion browser setting.

---

## 10. Performance audit

### Passed

- No remote runtime scripts.
- No remote fonts.
- Local image paths.
- Images use lazy loading in the homepage script.
- CSS and JS are separated from HTML.

### Pending

- [ ] Compress images.
- [ ] Generate WebP/AVIF.
- [ ] Add image dimensions.
- [ ] Preload only the first hero image.
- [ ] Minify `site.css` and `main.js` for production.
- [ ] Run Lighthouse in a browser environment.
- [ ] Confirm LCP, CLS, and INP.

---

## 11. Content audit

### Strong content direction

- Inspired spaces
- Lasting design
- Life enhanced
- Core service architecture
- Design / build / deliver
- 3D approval positioning
- Clear process storytelling

### Requires Woodex approval

- Project locations
- Project names
- Project durations
- Project counts
- Experience metrics
- Warranty language
- Client quotes
- Partner/client logos
- Pakistan service cities
- Official contact details

---

## 12. Final recommendation

The HTML5 project is technically healthy as a design prototype. The next production phase should not add more visual effects. It should:

1. Complete internal page content.
2. Fix semantic H1 structure.
3. Add service-specific routes.
4. Add approved Woodex images.
5. Connect the consultation form.
6. Complete accessibility testing.
7. Optimize local image assets.
8. Run browser-based Lighthouse and visual QA.

**Overall status:** Ready for controlled design review; not yet ready for public production launch.
