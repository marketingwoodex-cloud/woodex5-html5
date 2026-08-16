# Woodex Interior — Complete WordPress Free Elementor System Plan

## Product goal

Create a complete uploadable WordPress theme and site package from the Woodex HTML5 source using Elementor Free, native Containers, XPRO templates, WPForms, and a custom `Woodex Core` plugin.

The system must be easy to import, edit, and manage without coding knowledge.

---

## 1. Final package

```text
WOODEX-WP/
├── theme/
│   ├── woodex-parent/
│   └── woodex-child/
├── plugin/
│   └── woodex-core/
├── elementor-templates/
│   ├── header.json
│   ├── footer.json
│   ├── hero-layout.json
│   ├── hero-create.json
│   ├── hero-design.json
│   ├── homepage-sections.json
│   ├── services-index.json
│   ├── service-detail.json
│   ├── portfolio-index.json
│   ├── project-detail.json
│   ├── blog-index.json
│   ├── blog-post.json
│   ├── booking.json
│   └── footer-cta.json
├── content-json/
│   ├── site.json
│   ├── navigation.json
│   ├── services.json
│   ├── portfolio.json
│   ├── posts.json
│   ├── testimonials.json
│   └── faqs.json
├── demo-import/
│   ├── pages.json
│   ├── menus.json
│   ├── options.json
│   ├── widgets.json
│   └── media-manifest.json
├── docs/
│   ├── INSTALL.md
│   ├── IMPORT.md
│   ├── EDITING.md
│   ├── FORMS.md
│   └── QA.md
└── README.md
```

---

## 2. WordPress theme system

### Parent theme

Create a lightweight WordPress parent theme with:

- Valid `style.css`
- `functions.php`
- `header.php`
- `footer.php`
- `index.php`
- `page.php`
- `single.php`
- `404.php`
- `theme.json`
- Elementor compatibility
- XPRO compatibility
- Accessibility-ready markup
- Local assets and no external runtime dependency

### Child theme

Create `woodex-child` for:

- Custom CSS overrides
- Custom JavaScript overrides
- Safe template additions
- Brand-specific hooks
- Deployment-safe updates

The child theme must never hard-code content that belongs in WordPress pages or plugin data.

---

## 3. Elementor Free requirements

### Rules

- Use Elementor Free.
- Use native Elementor widgets wherever possible.
- Use Containers only.
- Do not use Inner Sections.
- Do not use Atomic Editor.
- Do not use Atomic Elements.
- Do not require Elementor Pro widgets.
- Use shortcodes only for WPForms, booking, or custom plugin data.

### Native widgets

- Container
- Heading
- Text Editor
- Image
- Button
- Icon
- Icon List
- Divider
- Spacer only when necessary
- Shortcode
- HTML only for safe visual overlays

### Custom widgets

The Woodex Core plugin may add:

- Woodex Service Card
- Woodex Portfolio Card
- Woodex Hero Slide
- Woodex Process Step
- Woodex Testimonial Card
- Woodex FAQ Item
- Woodex CTA

Custom widgets must remain compatible with Elementor Free and Containers.

---

## 4. One-click import system

### Import flow

1. Install parent theme.
2. Install child theme.
3. Install and activate Woodex Core.
4. Install Elementor Free.
5. Install XPRO.
6. Install WPForms.
7. Install Novamira.
8. Open **Woodex → Setup Wizard**.
9. Click **Import Woodex Demo**.
10. Confirm content import.
11. Import pages.
12. Import menus.
13. Import options.
14. Import Elementor templates.
15. Import media manifest.
16. Set Home as the front page.
17. Assign XPRO header/footer.
18. Create WPForms forms.
19. Run setup checklist.

### Import safety

- Show a backup warning.
- Show an import summary before action.
- Use idempotent imports to avoid duplicates.
- Store imported IDs in WordPress options.
- Allow reset of only Woodex-created content.
- Never overwrite unrelated site content without confirmation.
- Log import errors.
- Provide a success report.

### Admin pages

- Woodex → Setup Wizard
- Woodex → Site Settings
- Woodex → Services
- Woodex → Portfolio
- Woodex → Testimonials
- Woodex → FAQs
- Woodex → Forms
- Woodex → Import/Export
- Woodex → System Status

---

## 5. Woodex Core custom plugin

### Features

#### Content management

- Services custom post type
- Portfolio custom post type
- Testimonials custom post type
- FAQs custom post type
- Optional Journal taxonomy helpers

#### Site settings

- Brand name
- Logo
- Email
- WhatsApp
- Service area
- Response time
- Social links
- CTA labels
- Footer content
- Verified claims

#### Importer

- Pages
- Menus
- Elementor templates
- Theme options
- Media manifest
- Default WPForms shortcodes

#### Elementor integration

- Native-friendly widgets
- Dynamic service cards
- Dynamic portfolio cards
- Process timeline
- Testimonial carousel
- FAQ accordion
- Hero slide content

#### Lead management

- WPForms hooks
- Booking link settings
- WhatsApp CTA generator
- Lead source tracking
- Optional lead log

### Plugin safety

- Capability checks
- Nonce checks
- Sanitization and escaping
- No arbitrary PHP execution from admin fields
- No unprotected file writes
- Import rollback/logging
- No secret keys stored in public JSON

---

## 6. Elementor template system

### Header template

`Woodex Header — Global`

- Logo
- Menu
- Services dropdown
- Get in touch CTA
- Responsive mobile menu
- XPRO global assignment

### Footer template

`Woodex Footer — Global`

- About statement
- Footer CTA
- Explore links
- Services links
- Contact links
- WhatsApp
- Privacy/terms
- Copyright

### Hero templates

- `Woodex Hero — Layout`
- `Woodex Hero — Create`
- `Woodex Hero — Design`

### Page templates

- Homepage
- Services index
- Service detail
- Portfolio index
- Project detail
- Blog index
- Blog post
- Process
- Contact
- Thank you

### Saved section templates

- Core services
- Selected work
- Process timeline
- Journal cards
- CTA band
- FAQ
- Testimonials
- Client logos

---

## 7. Complete homepage layout

1. XPRO header
2. Three-slide hero
3. Our approach
4. Core services
5. What we do
6. Selected work
7. Process timeline
8. Journal preview
9. WPForms/WhatsApp CTA
10. XPRO footer

### Motion

- GSAP only if available and approved; otherwise lightweight CSS/IntersectionObserver.
- Hero image/wordmark transition.
- Scroll reveal sections.
- Image scale-on-hover.
- Service card stagger.
- Process timeline reveal.
- Reduced-motion fallback.

---

## 8. Services system

### Service groups

- Interior Design
- Fit-Out
- Hospitality
- Specialist
- Studio

### 15 services

- Commercial Interior
- Residential Interior
- Office & Corporate
- Retail & Shop
- Brand Shop & Outlet
- Office Fit-Out
- Commercial Fit-Out
- Residential Fit-Out
- Restaurant Interior
- Cafe Interior
- Custom Furniture & Joinery
- Interior Renovation
- Turnkey Interiors
- 3D Studio
- Office Furniture

### Service detail fields

- Title
- Group
- Promise
- Summary
- Hero image
- Deliverables
- Cost factors
- Timeline factors
- FAQs
- Related projects
- CTA

---

## 9. Portfolio system

### Portfolio management

- Portfolio custom post type
- Category filters
- City
- Area
- Duration
- Completion year
- Hero image
- Gallery
- Brief
- Design response
- Result
- Related services
- Client quote

### Templates

- Portfolio index
- Project detail
- Category archive
- Previous/next project navigation

---

## 10. Blog system

- WordPress Posts for journal articles
- Categories: Planning, Materials, Home, Commercial, Fit-Out, 3D
- Featured post
- Article cards
- Related service CTA
- Related project CTA
- Article schema
- Reading time field
- SEO fields

---

## 11. Booking and WPForms

### Primary booking

Use WPForms for consultation and inquiry forms.

### Form fields

- Name
- Email
- Phone/WhatsApp
- City
- Project type
- Service required
- Approximate area
- Timeline
- Budget range
- Message
- Floor plan upload
- Consent

### Calendar option

Use a configurable booking URL setting in Woodex Core:

- Calendly
- Google Calendar appointment schedule
- Microsoft Bookings
- Other approved calendar service

The plugin should not hard-code a calendar provider. Admin can enter/replace the booking URL.

### WhatsApp

Generate a prefilled message using the saved site WhatsApp setting. Do not hard-code a phone number in templates.

---

## 12. Recommended feature list assessment

| Requested feature | Plan |
|---|---|
| Free Elementor | Supported |
| One-click demo import | Woodex Core Setup Wizard |
| GSAP motion | Optional; use only if installed/approved |
| Responsive/retina | Native responsive settings + image sizes |
| Theme options | Woodex Core settings page / Customizer support |
| Unlimited colors/fonts | Use controlled global tokens; avoid unlimited visual inconsistency |
| Child theme | Included |
| Custom widgets | Woodex Core Elementor widgets |
| Hero variations | Three saved hero templates |
| Service boxes | Native Containers + Woodex Service Card |
| Pricing table | Optional; only if Woodex has approved pricing |
| App screenshot slider | Not relevant to Woodex; replace with project gallery |
| Process timeline | Saved Elementor section + optional widget |
| Video popup | Optional for approved project walkthroughs |
| Animated counters | Only verified metrics |
| Testimonials | CPT + native carousel/slider if available |
| Client logo slider | Only approved client logos |
| CTA sections | Saved Elementor CTA templates |
| FAQ accordion | Native/approved widget or Woodex Core widget |
| SEO optimized | Semantic templates + SEO plugin setup |
| Kirki | Optional; avoid duplicate settings systems if Elementor global settings are sufficient |
| Header/footer builder | XPRO templates |
| Cross-browser | QA requirement |
| Valid HTML5/CSS3 | QA requirement |
| Image backgrounds | Local optimized media |
| Easy customization | Admin wizard, JSON content, saved templates |

---

## 13. Documentation package

Create:

- `INSTALL.md`
- `IMPORT.md`
- `ELEMENTOR.md`
- `XPRO.md`
- `WPFORMS.md`
- `CONTENT-MANAGEMENT.md`
- `BOOKING.md`
- `WHATSAPP.md`
- `TROUBLESHOOTING.md`
- `QA.md`

### Simple user workflow

1. Install theme.
2. Install Woodex Core.
3. Activate plugins.
4. Open Woodex Setup Wizard.
5. Click Import Demo.
6. Edit content from WordPress pages, Services, Portfolio, and Journal.
7. Edit header/footer from XPRO templates.
8. Edit forms in WPForms.
9. Change WhatsApp/booking URL in Woodex settings.

---

## 14. Required inputs before coding

- Actual `theme.zip`
- Actual `child.zip`
- Parent theme slug
- Elementor Free confirmation
- XPRO version
- WPForms version
- Novamira version
- Approved WhatsApp number
- Approved email
- Booking provider or booking URL
- Approved project images
- Approved claims and testimonials

## Immediate next step

Upload the actual `theme.zip` and `child.zip`. Then build the Woodex Core plugin scaffold and the one-click setup wizard against the confirmed parent theme/plugin versions.
