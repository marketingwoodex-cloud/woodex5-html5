# Woodex Theme V2 — WordPress Upload Master Plan
## Elementor Free + XPRO + WPForms + Woodex Core

## Purpose

Convert the approved Theme V2 HTML5 master into a complete WordPress website ready for Hostinger upload and Elementor editing.

This plan is the final bridge between:

```text
THEME V2 HTML5 master
        ↓
Elementor Containers + XPRO templates
        ↓
WordPress pages, services, portfolio, journal, forms, and menu
```

---

## 1. Final upload package

### Required files

- `theme.zip` — parent WordPress theme
- `child.zip` — child WordPress theme
- `woodex-core-plugin.zip` — Woodex content/import plugin
- `elementor-templates.zip` or Elementor JSON exports
- `media.zip` or WordPress Media Library upload set
- `content-json/` data files
- `WP-INTERIOR` documentation

### Current package

The current project contains:

- Theme V2 HTML5 upload package
- Woodex Core plugin scaffold
- Parent-theme scaffold
- Child-theme scaffold
- Content JSON
- Elementor import instructions
- XPRO header/footer instructions
- WPForms plan
- Hostinger upload guide

The original parent `theme.zip` and `child.zip` still need to be supplied if they are required instead of the new Woodex scaffold.

---

## 2. WordPress environment

### Target

- WordPress 6.5+
- PHP 8.1+
- Elementor Free
- XPRO
- WPForms
- Novamira
- Hostinger production or staging site

### Before installation

- [ ] Full database backup
- [ ] Full file backup
- [ ] Staging copy available
- [ ] HTTPS active
- [ ] Admin account created for implementation
- [ ] Application Password created for AgentBridge if used
- [ ] Parent theme ZIP confirmed
- [ ] Child theme ZIP confirmed

---

## 3. Installation order

1. Install WordPress.
2. Install the parent theme ZIP.
3. Confirm parent theme slug.
4. Install the child theme ZIP.
5. Activate the child theme.
6. Install Elementor Free.
7. Install XPRO.
8. Install WPForms.
9. Install Novamira.
10. Install Woodex Core.
11. Activate all required plugins.
12. Set Permalinks to Post name.
13. Disable unused or duplicate builders.
14. Confirm WordPress media permissions.
15. Open the Woodex Core Setup Wizard.

---

## 4. Elementor global design system

### Colors

- Black: `#111111`
- White: `#FFFFFF`
- Gray: `#888888`
- Surface: `#E6E6E6`

No additional brand colors should be added without approval.

### Typography

- Display: Switzer or approved local fallback
- Body: Switzer or approved local fallback
- Labels: IBM Plex Mono or approved local fallback
- Hero: light/regular weight, tight tracking
- Body: 17–18px readable line height
- Labels: uppercase, 10–12px tracking

### Containers

- Max width: 1320px
- Desktop horizontal padding: 72px maximum
- Tablet padding: 32px
- Mobile padding: 20px
- Section vertical rhythm: 72–150px
- Container gaps: 18px

### Strict Elementor rules

- Use Elementor Containers only.
- Do not use Inner Sections.
- Do not use Atomic Editor.
- Do not use Atomic Elements.
- Do not use Elementor Pro widgets.
- Use native Elementor widgets wherever possible.
- Use shortcodes only for WPForms and approved custom integrations.

---

## 5. XPRO header template

### Template name

`Woodex Theme V2 — Global Header`

### Desktop

- Woodex logo
- About
- Services dropdown
- Portfolio
- Process
- Journal
- Get in touch pill

### Mobile

- Logo
- Hamburger
- Full-screen menu
- Services accordion
- Close button
- Get in touch CTA

### Behavior

- Transparent over hero
- Solid black/white after scroll
- Click/focus Services dropdown
- Outside-click close
- Escape close
- Active page state
- No duplicate desktop/mobile menus

### Save

Save to XPRO Library and assign globally.

---

## 6. XPRO footer template

### Template name

`Woodex Theme V2 — Global Footer`

### Sections

- Sheet 07 / Contact
- Start a conversation
- Thoughtful spaces. Lasting detail.
- Get in touch CTA
- Explore links
- Services links
- Contact information
- WhatsApp
- Privacy
- Terms
- Accessibility
- Copyright

### Save

Save to XPRO Library and assign globally.

---

## 7. Theme V2 homepage conversion

### Section 1 — Hero

- Three slides: LAYOUT, CREATE, DESIGN
- Same copy grid across slides
- Local images
- Blueprint/grid overlay
- Fixed wordmark
- Get started CTA
- Pause/reduced-motion mode

### Section 2 — Approach

- Clarity
- Control
- Craft
- Fixed scope
- 3D approval
- One accountable team

### Section 3 — Services

- Six accessible tabs
- Interior Design
- Commercial Interior
- Residential Interior
- Fit-Out
- Hospitality
- Joinery & Furniture

### Section 4 — Selected work

- Blueprint-to-reality wipe
- Portfolio cards
- Project categories
- Project facts
- Case-study links

### Section 5 — Portfolio

- Project grid
- Category filters
- Three initial projects
- Featured project

### Section 6 — Process

- Six-step timeline
- Discovery
- Concept & 3D
- Scope & pricing
- Build phase
- Snagging
- Handover

### Section 7 — Materials

- Grain
- Light
- Form
- Detail

### Section 8 — Journal

- Three articles
- Categories
- Reading time
- Related services

### Section 9 — Footer

Apply global XPRO footer.

---

## 8. WordPress pages

Create and publish:

- Home
- About
- Services
- 15 sub-service pages
- Portfolio
- 3 project pages
- Process
- Journal
- 3 article pages
- Contact
- Thank You
- 404
- Privacy
- Terms
- Accessibility

Set Home as the static front page.

---

## 9. Woodex Core plugin

### Content types

- Services
- Portfolio
- Testimonials
- FAQs

### Settings

- Site email
- WhatsApp number
- Booking URL
- Service area
- Response time
- Social URLs
- Verified claims

### Admin tools

- Setup Wizard
- Import/Export
- Site Settings
- Services manager
- Portfolio manager
- Testimonials manager
- FAQ manager
- System Status

### Safety

- Backup reminder
- Nonce checks
- Capability checks
- Sanitization
- Import log
- Idempotent import
- No destructive reset without confirmation

---

## 10. JSON and Elementor import

### Content JSON

Import or map:

- `site.json`
- `navigation.json`
- `services.json`
- `portfolio.json`
- `articles.json`
- `process.json`
- `faqs.json`
- `testimonials.json`
- `images.json`

### Elementor templates

Import in order:

1. Global colors
2. Global fonts
3. Header
4. Footer
5. Hero
6. Homepage sections
7. Services index
8. Service detail
9. Portfolio index
10. Project detail
11. Process
12. Journal
13. Article
14. Contact
15. CTA sections

---

## 11. WPForms and booking

### Form

`Woodex Free Consultation Form`

### Fields

- Full name
- Email
- WhatsApp/phone
- City
- Project type
- Service
- Area
- Timeline
- Budget
- Message
- Floor plan upload
- Consent

### Booking

Use a configurable booking URL in Woodex Core. Support:

- Calendly
- Google appointment schedule
- Microsoft Bookings
- Approved provider

Do not hard-code a booking provider.

### WhatsApp

Use the number stored in Woodex Settings. Do not hard-code a placeholder number in Elementor templates.

---

## 12. One-click import workflow

### User experience

1. User installs theme and plugins.
2. User opens **Woodex → Setup Wizard**.
3. Wizard checks requirements.
4. Wizard asks for backup confirmation.
5. User selects Import Demo.
6. Importer creates pages.
7. Importer creates menus.
8. Importer imports settings.
9. Importer imports Elementor templates.
10. Importer imports content data.
11. Importer imports media.
12. Importer assigns homepage.
13. Importer assigns XPRO header/footer.
14. Importer displays completion report.

### Failure handling

- Show which item failed.
- Do not stop the entire import unnecessarily.
- Allow retry.
- Store created IDs.
- Avoid duplicates on retry.
- Provide rollback instructions.

---

## 13. QA before publishing

### Design

- [ ] Hero copy and image alignment
- [ ] Header font and CTA alignment
- [ ] Footer spacing and contact details
- [ ] Services tab interaction
- [ ] Portfolio wipe
- [ ] Process timeline
- [ ] Journal cards
- [ ] Mobile menu

### Elementor

- [ ] No Inner Sections
- [ ] No Atomic elements
- [ ] No Elementor Pro-only widgets
- [ ] Containers responsive
- [ ] Global colors applied
- [ ] Global fonts applied
- [ ] Header/footer globally assigned

### Forms

- [ ] WPForms submit
- [ ] Email notification
- [ ] Confirmation message
- [ ] Thank-you redirect
- [ ] WhatsApp link
- [ ] Booking URL
- [ ] Spam protection

### Performance

- [ ] Local image optimization
- [ ] Lazy loading
- [ ] WebP/AVIF
- [ ] Mobile Lighthouse
- [ ] Desktop Lighthouse
- [ ] No console errors

---

## 14. Launch gate

The theme is ready to upload when:

- Parent and child ZIPs are confirmed.
- The child theme activates correctly.
- Woodex Core activates correctly.
- XPRO header/footer are saved globally.
- Elementor templates import correctly.
- All pages exist.
- Menu is assigned.
- Home is assigned.
- WPForms works.
- Booking and WhatsApp settings are configured.
- Media is approved.
- Final QA passes.

## Immediate next action

Upload or approve the generated `woodex-parent-theme.zip`, `woodex-child-theme.zip`, and `woodex-core-plugin.zip`, then install them on a staging WordPress site before production publishing.
