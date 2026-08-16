# Woodex Interior — WordPress Master Theme Plan
## Complete Elementor Free + XPRO Website Package

**Repository source:** `https://github.com/marketingwoodex-cloud/woodex5-html5.git`  
**Workspace:** `WP-INTERIOR/`  
**Final goal:** Uploadable WordPress package with complete Woodex pages, Elementor layouts, XPRO header/footer, WPForms contact flow, menu, homepage setting, and documentation.

---

## 1. What will be delivered

### Upload package

- Parent theme dependency record
- Woodex child theme
- Elementor page/template import plan
- XPRO header template plan
- XPRO footer template plan
- WPForms form plan
- WordPress page map
- WordPress menu map
- Homepage configuration plan
- Media import map
- Plugin setup guide
- Content replacement checklist
- QA and publish guide

### Important limitation

The original `theme.zip` and `child.zip` were not available in the GitHub repository or workspace. The package includes a child-theme scaffold, but the exact parent theme ZIP and parent theme slug are still required before activation.

---

## 2. WordPress setup

### Install and activate

1. Install WordPress.
2. Install the original parent theme from `theme.zip`.
3. Confirm the parent theme slug.
4. Update the `Template:` line in the Woodex child theme `style.css`.
5. Install and activate the child theme.
6. Confirm Elementor Free is active.
7. Confirm XPRO is active.
8. Confirm WPForms is active.
9. Confirm Novamira is active.
10. Set Permalinks to **Post name**.

### Site settings

- Site title: Woodex Interior
- Homepage: Home
- Posts page: Journal, if WordPress Posts are used
- Timezone: Pakistan time if Pakistan is the production market
- HTTPS: enabled
- Search engine visibility: allow only after launch approval

---

## 3. Plugins

### Required

#### Elementor Free

Use for:

- Containers
- Headings
- Text Editor
- Images
- Buttons
- Icon Lists
- Shortcode/HTML where necessary
- Loop or archive features only where available in the installed version

Do not use Elementor Pro widgets.

#### XPRO

Use for:

- Global header
- Global footer
- Navigation templates
- Responsive header behavior
- Template library storage

Save templates:

- `Woodex Header — Global`
- `Woodex Footer — Global`

#### WPForms

Use for:

- Free consultation form
- Project enquiry form
- Floor plan enquiry form

#### Novamira

Use as a reference/helper for:

- Elementor element structure
- Layout inspection
- Page/template organization
- Safe editing and confirmation workflow

Do not use Atomic Editor or Atomic Elements.

### Recommended plugins

- SEO plugin
- SMTP/email delivery plugin
- Image optimization plugin
- Caching/performance plugin
- Security and backup plugin

Do not install duplicate plugins that overlap in SEO, caching, forms, or security.

---

## 4. Page map

Create these pages:

1. Home
2. About
3. Services
4. Commercial Interior
5. Residential Interior
6. Office & Corporate
7. Retail & Shop
8. Brand Shop & Outlet
9. Office Fit-Out
10. Commercial Fit-Out
11. Residential Fit-Out
12. Restaurant Interior
13. Cafe Interior
14. Custom Furniture & Joinery
15. Interior Renovation
16. Turnkey Interiors
17. 3D Studio
18. Office Furniture
19. Portfolio
20. The Quiet House
21. Oak & Daylight
22. Clear Line Office
23. Process
24. Journal
25. Kitchen Planning article
26. Wood Finishes article
27. Interior Consultation article
28. Contact
29. Thank You
30. 404
31. Privacy
32. Terms
33. Accessibility

---

## 5. WordPress menu

Create menu: **Woodex Main Menu**

- Home
- About
- Services
  - Interior Design
    - Commercial Interior
    - Residential Interior
    - Office & Corporate
    - Retail & Shop
    - Brand Shop & Outlet
  - Fit-Out
    - Office Fit-Out
    - Commercial Fit-Out
    - Residential Fit-Out
  - Hospitality
    - Restaurant Interior
    - Cafe Interior
  - Specialist
    - Custom Furniture & Joinery
    - Interior Renovation
    - Turnkey Interiors
  - Studio
    - 3D Studio
    - Office Furniture
- Portfolio
- Process
- Journal
- Contact
- Get in touch

After creating the menu:

- Assign it to the theme/XPRO menu location.
- Test desktop dropdown.
- Test mobile hamburger.
- Test keyboard navigation.
- Confirm every item opens the correct page.

---

## 6. XPRO global header

### Layout

- Container max-width: 1240px
- Woodex logo left
- Main menu center/right
- Get in touch pill right
- Transparent hero state
- Solid scroll state

### Desktop

- About
- Services dropdown
- Portfolio
- Process
- Journal
- Contact
- Get in touch

### Mobile

- Logo
- Hamburger
- Full-screen drawer
- Services accordion
- Get in touch CTA
- Close button

### Template process

1. Create an Elementor Container.
2. Add logo/image widget.
3. Add WordPress Menu widget available through XPRO.
4. Add CTA button.
5. Configure responsive visibility.
6. Configure sticky/scroll behavior.
7. Save to XPRO library as `Woodex Header — Global`.
8. Assign globally.

---

## 7. XPRO global footer

### Layout

- About Woodex statement
- Thoughtful spaces. Lasting detail.
- Get in touch CTA
- Explore links
- Services links
- Contact/email/WhatsApp
- Privacy, terms, accessibility
- Copyright

### Template process

1. Create a full-width dark container.
2. Add statement and CTA.
3. Add four-column desktop layout.
4. Stack columns on mobile.
5. Add legal row.
6. Save to XPRO library as `Woodex Footer — Global`.
7. Assign globally.

---

## 8. Homepage Elementor blueprint

### Section 1 — Hero

- Three slide states
- Inspired spaces / LAYOUT
- Lasting design / CREATE
- Life enhanced / DESIGN
- Local image backgrounds
- Large sans headline
- Get started button
- Bottom wordmark
- Grid line overlay

Use Elementor Containers. Do not use Inner Sections.

### Section 2 — Our approach

- Listen
- Shape
- Build
- Fixed scope
- 3D approval
- One accountable team

### Section 3 — Core services

- Interior Design
- Commercial Interior
- Residential Interior
- Fit-Out
- Hospitality
- Joinery & Furniture

### Section 4 — What we do

- Large image
- Design/build explanation
- 3D-before-build message
- Explore Services CTA

### Section 5 — Selected work

- Featured project
- Two supporting cards
- Categories
- Facts
- Portfolio CTA

### Section 6 — The way we work

- Discovery
- Concept & 3D
- Scope & Pricing
- Build
- Snagging
- Handover

### Section 7 — Journal

- Three article cards
- Categories
- Reading time
- Journal CTA

### Section 8 — XPRO footer

Use the saved global footer.

---

## 9. Services and sub-service templates

### Services page

- Hero
- Five service groups
- All 15 service cards
- Included scope
- What affects cost
- Related projects
- Consultation CTA

### Sub-service page template

- Category
- Title and promise
- Hero image
- What problem it solves
- What is included
- Scope/timeline factors
- Process
- Related project
- FAQ
- WPForms/WhatsApp CTA

Save as:

`Woodex Service Detail — Elementor Template`

Apply to all 15 service pages.

---

## 10. Portfolio templates

### Portfolio index

- Hero
- Project category filters
- Featured project
- Project grid
- Proof metrics
- CTA

### Project detail

- Project hero
- City, area, category, duration
- Brief
- Design response
- Approved 3D direction
- Build details
- Gallery
- Result
- Related service
- CTA

Save as:

`Woodex Portfolio Case Study — Elementor Template`

---

## 11. Journal templates

### Journal index

- Journal hero
- Featured article
- Category cards
- Article grid
- Service CTA

### Article

- Breadcrumb
- Category
- Title
- Date and reading time
- Hero image
- Article body
- Related service
- Related articles
- CTA

---

## 12. WPForms plan

Create form: **Woodex Free Consultation Form**

### Fields

- Full name
- Email
- WhatsApp/phone
- City
- Project type
- Service needed
- Approximate area
- Timeline
- Budget range
- Message
- Floor plan upload

### Form behavior

- Required validation
- Confirmation message or Thank You redirect
- Email notification
- WhatsApp CTA
- Spam protection
- Mobile-friendly fields

### Pending approval

- Official email
- Official Pakistan WhatsApp number
- Notification recipients
- Privacy/consent text

---

## 13. Media import

1. Upload local images from the HTML source.
2. Add descriptive filenames.
3. Add alt text.
4. Optimize before upload.
5. Replace generated draft images with approved Woodex photography.
6. Assign hero image per slide.
7. Assign project images to case studies.
8. Assign journal images to articles.

---

## 14. Import and publishing checklist

- [ ] Theme ZIP received
- [ ] Child ZIP received
- [ ] Parent theme slug confirmed
- [x] Source HTML copied from GitHub
- [x] Child theme scaffold created
- [ ] Elementor installed
- [ ] XPRO installed
- [ ] WPForms installed
- [ ] Novamira installed
- [ ] Header saved to XPRO library
- [ ] Footer saved to XPRO library
- [ ] Pages created
- [ ] Menu created
- [ ] Homepage assigned
- [ ] Media imported
- [ ] Forms tested
- [ ] Mobile QA completed
- [ ] Desktop QA completed
- [ ] SEO metadata added
- [ ] Legal pages approved
- [ ] Publish to connected site

---

## 15. Definition of complete

The WordPress conversion is complete when:

- The child theme activates without warnings.
- XPRO header/footer are saved and assigned globally.
- All 33 pages exist.
- All 15 services have dedicated pages.
- The menu links correctly.
- Home is assigned as the static homepage.
- Elementor layouts use Containers only.
- No Elementor Pro or Atomic widgets are used.
- WPForms submissions work.
- WhatsApp CTA works.
- All media is approved and optimized.
- Responsive and accessibility checks pass.
- The website is published to the connected WordPress site.

---

## Immediate next step

Upload `theme.zip` and `child.zip`. Without the original parent theme ZIP, the child theme cannot be safely activated because its parent theme slug is unknown.
