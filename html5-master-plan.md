# Woodex Interior — HTML5 Master Website Plan

## Project workspace

`HTML 5/`

### Active files

- `index.html` — master homepage
- `company-index.html` — company-index draft
- `frontend-blueprint.md` — page and section blueprint
- `assets/images/` — local production image assets
- `assets/css/` — Tailwind-compatible CSS layers
- `assets/js/` — vanilla JavaScript modules

## Framework decision

The phrase “Twinlight CSS” is interpreted as **Tailwind CSS**. The project will use semantic HTML5 with a Tailwind-compatible token and utility structure. The first working draft remains framework-light so it can be opened directly, while the CSS is organized for Tailwind conversion later.

No React runtime is used in this workspace. The JSON data structure will remain compatible with a future React migration.

---

## 1. Brand experience

### Positioning

Woodex Interior designs and builds spaces with clear planning, precise craft, and a more predictable handover.

### Human promise

**See the space clearly before you build it. Know what is included. Work with one accountable team.**

### Visual character

- Premium but human
- Architectural but welcoming
- Modern, quiet, and confident
- Black, white, gray, and light gray only
- Strong image storytelling
- Large sans-serif typography
- Editorial spacing
- Controlled motion

### Conversion goals

1. Get the visitor to understand Woodex.
2. Help them choose a service.
3. Prove the quality through projects.
4. Explain the process and reduce fear.
5. Start a WhatsApp or consultation conversation.

---

## 2. Homepage section map

### Section 1 — Header

- Woodex logo
- About
- Services dropdown
- Portfolio
- Process
- Journal
- Contact
- Get in touch CTA
- Mobile hamburger menu
- Scroll state
- Active navigation state

### Section 2 — Three-slide hero

#### Slide 1

- Inspired spaces
- Spaces shaped by purpose and identity
- LAYOUT

#### Slide 2

- Lasting design
- Timeless designs with lasting impact
- CREATE

#### Slide 3

- Life enhanced
- Design that enhances human experience
- DESIGN

### Hero requirements

- Same copy grid across slides
- Same CTA position
- Same paragraph position
- Same image crop system
- Bottom wordmark never changes position
- Full-color architectural image
- 6.5 second automatic transition
- Manual control support
- Pause/reduced-motion fallback

### Section 3 — Our approach

- Listen
- Shape
- Build
- Fixed scope
- 3D approval
- One accountable team
- Verified project proof

### Section 4 — Core services

- Interior Design
- Commercial Interior
- Residential Interior
- Fit-Out
- Hospitality
- Custom Furniture & Joinery

Each service card contains:

- Number
- Label
- Outcome-led heading
- Short description
- Arrow link

### Section 5 — What we do

- Large local image
- “Made to fit your life” statement
- 3D-before-build message
- Design + build + furniture connection
- Explore services CTA

### Section 6 — Selected work

- Homes
- Offices
- Retail
- Hospitality
- Featured project
- Two supporting projects
- Category, city, area, duration
- View portfolio CTA

### Section 7 — Process

1. Discovery
2. Concept & 3D
3. Scope & pricing
4. Build phase
5. Snagging
6. Handover

### Section 8 — Journal

- Planning
- Materials
- Fit-out
- 3D design
- Local Pakistan context
- Related service CTA

### Section 9 — Footer

- About Woodex
- Thoughtful spaces statement
- Explore links
- Services links
- Contact links
- WhatsApp
- Privacy
- Terms
- Copyright

---

## 3. Internal page map

### `about.html`

- About hero
- Studio story
- Design philosophy
- Team and craft
- Standards and quality
- Verified proof
- CTA
- Footer

### `services.html`

- Services hero
- Service groups
- Six core services
- Complete services directory
- Included scope
- Cost factors
- FAQ
- CTA
- Footer

### `portfolio.html`

- Portfolio hero
- Category filter
- Featured project
- Project grid
- Project facts
- Proof metrics
- CTA
- Footer

### `project.html`

- Project hero
- Project facts
- Brief
- Design response
- 3D render vs final
- Materials
- Build details
- Gallery
- Result
- Related service
- CTA

### `process.html`

- Process hero
- Six-step timeline
- Client responsibilities
- Woodex responsibilities
- Change control
- Handover
- FAQ
- CTA

### `journal.html`

- Journal hero
- Featured article
- Category filters
- Article cards
- Service CTA
- Footer

### `article.html`

- Breadcrumb
- Article category
- Title
- Date and reading time
- Hero image
- Summary
- Article body
- Related service
- Related articles
- CTA

### `contact.html`

- Contact hero
- WhatsApp-first CTA
- Consultation form
- City and project type
- Floor plan instructions
- What happens next
- Privacy note
- Footer

### Utility pages

- `thank-you.html`
- `404.html`
- `privacy.html`
- `terms.html`
- `accessibility.html`

---

## 4. File architecture

```text
HTML 5/
├── index.html
├── company-index.html
├── about.html
├── services.html
├── portfolio.html
├── process.html
├── journal.html
├── contact.html
├── thank-you.html
├── 404.html
├── privacy.html
├── terms.html
├── accessibility.html
├── data/
│   ├── services.json
│   ├── projects.json
│   ├── articles.json
│   └── navigation.json
├── assets/
│   ├── images/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── responsive.css
│   └── js/
│       ├── navigation.js
│       ├── hero-slider.js
│       ├── scroll-motion.js
│       ├── services.js
│       └── main.js
└── html5-master-plan.md
```

## 5. JSON-ready content model

```json
{
  "service": {
    "slug": "residential-interior",
    "group": "Interior Design",
    "title": "Residential Interior",
    "summary": "Homes designed around how you live.",
    "deliverables": [],
    "relatedProjects": [],
    "heroImage": "assets/images/residential.webp"
  }
}
```

The HTML version will use `data-*` attributes and JSON-ready structures so a future React build can use the same content without rewriting the design.

---

## 6. CSS and spacing system

### Four colors

- Black: `#111111`
- White: `#FFFFFF`
- Gray: `#888888`
- Light gray: `#E6E6E6`

### Spacing tokens

- `--space-1: 4px`
- `--space-2: 8px`
- `--space-3: 12px`
- `--space-4: 16px`
- `--space-5: 24px`
- `--space-6: 32px`
- `--space-7: 48px`
- `--space-8: 64px`
- `--space-9: 80px`
- `--space-10: 112px`
- `--space-11: 144px`

### Breakpoints

- 320 px
- 375 px
- 768 px
- 1024 px
- 1280 px
- 1440 px

---

## 7. JavaScript behavior plan

### Navigation

- Services opens by click and keyboard focus
- Outside click closes menu
- Escape closes menu
- Hamburger opens mobile drawer
- Body scroll locks while drawer is open
- Menu closes after route selection

### Hero

- Three slides
- Same layout and wordmark position
- Automatic rotation
- Manual buttons
- Pause on hover/focus
- Reduced-motion static mode

### Scroll motion

- Section fade-up
- Staggered cards
- Image reveal
- Project image scale
- No content hidden when JavaScript is disabled

### Forms

- Required field validation
- Loading state
- Success state
- Error state
- Mail/WhatsApp fallback

---

## 8. Local asset policy

No production-critical images, fonts, CSS, or JavaScript may depend on remote URLs.

- [ ] Put all generated images in `assets/images/`.
- [ ] Convert to WebP/AVIF.
- [ ] Add mobile crops.
- [ ] Use descriptive alt text.
- [ ] Add dimensions to prevent layout shift.
- [ ] Use system font fallback or local font files.
- [ ] Remove external font imports.
- [ ] Remove remote Unsplash/Webflow image URLs.

---

## 9. Build sequence

### Phase 1 — Active now

1. Create workspace and restore HTML master.
2. Remove React/Astro source and server.
3. Split inline styling into CSS layers.
4. Fix header and Services dropdown.
5. Fix mobile menu.
6. Fix buttons and typography alignment.

### Phase 2

1. Add local generated images.
2. Complete hero slider.
3. Add section scroll motion.
4. Finish Core Services interaction.
5. Improve Selected Work layout.
6. Complete footer and legal links.

### Phase 3

1. Build internal HTML pages.
2. Add JSON data.
3. Add reusable page templates.
4. Add forms and WhatsApp route.
5. Add responsive QA.

### Phase 4

1. HTML validation
2. Accessibility QA
3. Lighthouse
4. Local asset audit
5. Link audit
6. Production packaging

---

## 10. Definition of complete

The HTML5 website is complete when:

- Homepage tells a clear brand story.
- Header and footer work on desktop and mobile.
- Services dropdown and hamburger menu work correctly.
- All buttons are aligned and have consistent states.
- All sections have clean spacing and responsive behavior.
- Images are local and optimized.
- Motion supports storytelling without blocking content.
- Content is JSON-ready.
- Internal links work.
- No React/Astro runtime or data remains.
- HTML validation, accessibility, and performance checks pass.
