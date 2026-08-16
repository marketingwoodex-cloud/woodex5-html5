# Woodex Interior — Frontend Blueprint
## Complete Page Map, Section Map & React Build Plan

**Framework:** Astro + React islands  
**Master reference:** `index.html`  
**Content source for phase 1:** typed local data files  
**Future content source:** headless CMS-ready schema  
**Primary market:** Pakistan nationwide  
**Primary conversion:** WhatsApp consultation  
**Theme:** Black, white, gray, light gray only

---

## 1. Build objective

Create a fast, premium, human Woodex Interior website that explains the offer in seconds, shows credible proof, and moves visitors toward a WhatsApp conversation or consultation enquiry.

### Core experience

```text
Understand Woodex
        ↓
Choose a service
        ↓
Review relevant work
        ↓
Understand the process
        ↓
Send floor plan / WhatsApp Woodex
```

### Core differentiator

**See the space before you build it. Approve the scope before work starts. Know who is responsible until handover.**

---

## 2. Route map

### Primary routes

```text
/
├── /about/
├── /services/
│   ├── /services/interior-design/
│   ├── /services/commercial-interior/
│   ├── /services/residential-interior/
│   ├── /services/office-corporate/
│   ├── /services/retail-shop/
│   ├── /services/brand-shop-outlet/
│   ├── /services/fit-out/
│   ├── /services/office-fit-out/
│   ├── /services/commercial-fit-out/
│   ├── /services/residential-fit-out/
│   ├── /services/hospitality/
│   ├── /services/restaurant-interior/
│   ├── /services/cafe-interior/
│   ├── /services/custom-furniture-joinery/
│   ├── /services/interior-renovation/
│   ├── /services/turnkey-interiors/
│   ├── /services/3d-studio/
│   └── /services/office-furniture/
├── /portfolio/
│   ├── /portfolio/[project-slug]/
│   └── /portfolio/category/[category]/
├── /process/
├── /journal/
│   └── /journal/[article-slug]/
├── /contact/
├── /thank-you/
└── /404/
```

### Launch route priority

#### Launch 1 — Required

- Home
- About
- Services
- Portfolio
- Process
- Journal
- Contact
- Thank you
- 404

#### Launch 2 — High-value detail routes

- Residential Interior
- Commercial Interior
- Office Fit-Out
- Turnkey Interiors
- Custom Furniture & Joinery
- 3D Studio
- Three portfolio case studies
- Three journal articles

#### Launch 3 — Expansion

- Hospitality
- Retail & Shop
- Brand Shop & Outlet
- Office Furniture
- Interior Renovation
- City-specific landing pages only when Woodex has real proof in that city

---

## 3. Global layout architecture

Every page uses the same shell:

```text
<BaseLayout>
  <SiteHeader />
  <main>
    <PageHero />
    <PageContent />
    <RelatedContent />
    <ConversionCTA />
  </main>
  <SiteFooter />
</BaseLayout>
```

### Global header

#### Desktop

- Woodex logo
- About
- Services mega-menu
- Portfolio
- Journal
- Contact
- Book a free consultation

#### Mobile

- Logo
- Menu trigger
- Full-screen or drawer navigation
- Services accordion
- WhatsApp CTA

#### Header states

- Transparent over hero
- Black/white solid after scroll
- Menu open
- Services menu open
- Active route
- Keyboard focus

### Global footer

- Woodex positioning statement
- About link
- Services link
- Portfolio link
- Process link
- Journal link
- Contact link
- Email
- WhatsApp
- Instagram/social links after verification
- Privacy policy
- Terms/disclaimer
- Copyright

### Global CTA rules

Primary: **Get started**  
Secondary: **Chat on WhatsApp**  
Support: **Send us your floor plan**

---

## 4. Homepage map — `/`

### Section 1 — Hero slider

**Purpose:** make the positioning memorable immediately.

#### Slide 1

- Label: Inspired spaces
- Heading: Spaces shaped by purpose and identity
- Wordmark: LAYOUT
- CTA: Get started
- Supporting line: Design that reflects the way people live and work.

#### Slide 2

- Label: Lasting design
- Heading: Timeless designs with lasting impact
- Wordmark: CREATE
- CTA: Get started
- Supporting line: A clear plan, considered materials, and precise delivery.

#### Slide 3

- Label: Life enhanced
- Heading: Design that enhances human experience
- Wordmark: DESIGN
- CTA: Get started
- Supporting line: Residential, commercial, retail, hospitality, and fit-out interiors.

#### Hero behavior

- Same image position across slides
- Same copy grid across slides
- Wordmark stays fixed at the bottom
- Only slide content and wordmark change
- 6.5-second rotation
- Pause on hover/focus/tab hidden
- Manual controls available to keyboard users
- Reduced-motion fallback shows static first slide

### Section 2 — Our approach

**Purpose:** explain why Woodex feels safer than a typical contractor experience.

Content blocks:

- Acknowledge common problems: unclear scope, late delivery, changing costs.
- Woodex response: fixed scope, approved 3D, one accountable team.
- Three proof points: clarity, control, craft.
- Verified project metrics.
- CTA: See how we work.

### Section 3 — Core services

**Purpose:** let users self-select by need.

Six primary cards:

1. Interior Design
2. Commercial Interior
3. Residential Interior
4. Fit-Out
5. Hospitality Spaces
6. Joinery & Furniture

Each card contains:

- Number
- Service name
- One-line outcome
- Arrow
- Matching detail panel
- Related route

### Section 4 — Selected work

**Purpose:** show proof before asking for contact information.

- Portfolio heading
- Category filter: Offices, Homes, Retail, Hospitality
- Featured project
- Two supporting projects
- City, area, category, duration
- View all portfolio CTA

### Section 5 — What we do

**Purpose:** explain the combined design/build offer.

- Large project image
- Design statement
- 3D preview benefit
- Build/furniture connection
- Four smaller service cards
- Link to Services

### Section 6 — The way we work

**Purpose:** remove uncertainty about execution.

Six steps:

1. Discovery
2. Concept & 3D
3. Scope & pricing
4. Build phase
5. Snagging
6. Handover

Each step requires:

- What happens
- What Woodex delivers
- What the client decides
- Approximate timing, only when verified

### Section 7 — From the journal

**Purpose:** support SEO and answer customer questions.

Launch articles:

- How to plan a home interior project in Pakistan
- What to check in an office fit-out quote
- How 3D approval prevents expensive changes
- Choosing materials for Pakistani homes and workplaces

### Section 8 — Footer conversion

- About Woodex
- “Thoughtful spaces. Lasting detail.”
- Get in touch
- WhatsApp
- Navigation
- Legal links

---

## 5. About page map — `/about/`

### Section 1 — Hero

**Heading:** Design-build clarity for spaces that matter.

### Section 2 — The Woodex point of view

- Why the company exists
- What the team believes about design and execution
- Human, direct copy

### Section 3 — How Woodex is different

- 3D approval first
- Fixed and itemized scope
- One accountable team
- Project updates
- Handover discipline

### Section 4 — People and craft

- Founder/team introduction
- Designers
- Project managers
- Workshop/furniture team
- Site team

### Section 5 — Standards

- Materials
- Finish quality
- Site safety
- Documentation
- Warranty, only if verified

### Section 6 — Proof

- Verified projects
- Approved client logos
- Testimonials
- Before/after

### Section 7 — CTA

- Meet the process
- View portfolio
- WhatsApp Woodex

---

## 6. Services page map — `/services/`

### Section 1 — Hero

**Heading:** One clear process for every kind of interior.

### Section 2 — Service groups

- Interior Design
- Fit-Out
- Hospitality
- Specialist
- Studio

### Section 3 — Six core service cards

- Interior Design
- Commercial Interior
- Residential Interior
- Fit-Out
- Hospitality Spaces
- Joinery & Furniture

### Section 4 — Complete services menu

Show all 15 detailed routes from the navigation.

### Section 5 — What is included

- Brief and measurement
- Concept direction
- 3D visualization
- Drawings and specification
- Procurement
- Execution
- Snagging
- Handover

### Section 6 — What changes cost

- Area
- Existing condition
- Materials
- Custom joinery
- MEP and structural changes
- Timeline
- Site access

### Section 7 — Related work

Show projects mapped to service categories.

### Section 8 — CTA

**Send us your floor plan.**

---

## 7. Service detail page map

Every service detail page uses this exact template:

```text
ServiceHero
ProblemStatement
WoodexResponse
Deliverables
IdealClient
ProcessPreview
TimelineFactors
BudgetFactors
RelatedProjects
FAQ
WhatsAppCTA
Footer
```

### Required service fields

- Page title
- Short promise
- Service group
- Ideal client
- Deliverables
- Exclusions
- Timeline factors
- Budget factors
- FAQ
- Related projects
- Related articles
- WhatsApp message template

---

## 8. Portfolio page map — `/portfolio/`

### Section 1 — Portfolio hero

- Large architectural image
- Heading: Spaces built with intention.
- Short statement
- View project CTA

### Section 2 — Filters

- All
- Offices
- Homes
- Retail
- Hospitality
- Joinery

### Section 3 — Featured project

- Large card
- Project title
- City
- Area
- Duration
- Category
- View case study

### Section 4 — Project grid

Every card shows:

- Image
- Category
- Title
- City
- Area or scope
- Duration

### Section 5 — Proof metrics

Only verified values:

- Projects delivered
- Years of experience
- Cities served
- On-time delivery

### Section 6 — Portfolio CTA

- Start a similar project
- Chat on WhatsApp

---

## 9. Project case study map — `/portfolio/[slug]/`

### Section 1 — Project hero

- Full image
- Project title
- Category
- City

### Section 2 — Project facts

- Area
- Duration
- Scope
- Completion year

### Section 3 — The brief

What the client needed and what was not working.

### Section 4 — The design response

- Layout
- Materials
- Lighting
- Brand identity
- Furniture

### Section 5 — 3D to reality

Side-by-side approved render and finished result.

### Section 6 — Build details

- Joinery
- Fit-out
- Coordination
- Site constraints

### Section 7 — Gallery

- Wide images
- Detail images
- Before/after

### Section 8 — Result

- Outcome
- Timeline
- Client quote, if approved

### Section 9 — Related content

- Related service
- Next project
- Journal article

---

## 10. Process page map — `/process/`

### Section 1 — Hero

**Heading:** A clear path from first idea to final handover.

### Section 2 — Six-step timeline

1. Discovery
2. Concept & 3D
3. Scope & pricing
4. Build phase
5. Snagging
6. Handover

### Section 3 — Client responsibilities

- Provide brief
- Confirm decisions
- Approve 3D
- Approve scope
- Provide site access
- Review handover

### Section 4 — Woodex responsibilities

- Measure and document
- Design and visualize
- Specify and cost
- Coordinate and build
- Report progress
- Resolve snags

### Section 5 — Project controls

- Change control
- Payment stages
- Timeline assumptions
- Communication cadence
- Handover documentation

### Section 6 — FAQ and CTA

---

## 11. Journal page map — `/journal/`

### Section 1 — Hero

**Heading:** Better decisions make better spaces.

### Section 2 — Featured article

Large editorial card with category, title, summary, and reading time.

### Section 3 — Categories

- Planning
- Materials
- Home interiors
- Commercial interiors
- Fit-out
- 3D design
- Care and maintenance

### Section 4 — Article grid

Each card includes:

- Image
- Category
- Title
- Summary
- Date
- Reading time

### Section 5 — Service CTA

Link useful articles to relevant service pages.

---

## 12. Article page map — `/journal/[slug]/`

1. Breadcrumbs
2. Category and date
3. H1
4. Reading time
5. Hero image
6. Article summary
7. Body content
8. Inline project/service CTA
9. Related articles
10. WhatsApp CTA

### Article content rules

- One customer question per article.
- Use clear H2s.
- Include local Pakistan context where relevant.
- Avoid generic AI-sounding copy.
- Use real Woodex project examples whenever possible.
- End with a related service and a human CTA.

---

## 13. Contact page map — `/contact/`

### Section 1 — Hero

**Heading:** Tell us what you are planning.

### Section 2 — WhatsApp-first CTA

- Direct WhatsApp button
- Prefilled message
- Response expectation

### Section 3 — Consultation form

Fields:

- Name
- WhatsApp number
- Email
- City
- Project type
- Area
- Timeline
- Budget range
- Service required
- Message
- Floor plan upload option

### Section 4 — What happens next

1. Human reply
2. Initial qualification
3. Site/brief discussion
4. Design direction
5. Proposal or next step

### Section 5 — Contact details

Publish only verified phone, email, studio address, service area, and hours.

### Section 6 — Privacy and confirmation

- Consent copy
- Spam protection
- Success state
- Thank-you route

---

## 14. React component map

### Layout components

- `SiteHeader.astro`
- `ServicesMegaMenu.tsx`
- `MobileMenu.tsx`
- `Footer.astro`
- `PageShell.astro`
- `PageHero.astro`

### Homepage components

- `HeroSlider.tsx`
- `HeroWordmark.tsx`
- `ApproachSection.astro`
- `ServiceSwitcher.tsx`
- `FeaturedProjects.astro`
- `WhatWeDo.astro`
- `ProcessPreview.astro`
- `JournalPreview.astro`

### Internal page components

- `ServiceCard.astro`
- `ServiceDetail.astro`
- `ProjectCard.astro`
- `ProjectFilter.tsx`
- `ProjectFacts.astro`
- `CaseStudyGallery.astro`
- `JournalCard.astro`
- `ArticleBody.astro`
- `ConsultationForm.tsx`
- `WhatsAppCTA.astro`
- `FAQAccordion.tsx`

### Component rules

- Components receive typed props.
- Components do not contain business data.
- Data belongs in `src/content/`.
- Interactive components must expose keyboard states.
- Every island must have a reason to be client-side.

---

## 15. Content folder map

```text
src/content/
├── site.ts
├── navigation.ts
├── services.ts
├── projects.ts
├── articles.ts
├── testimonials.ts
├── faqs.ts
└── settings.ts
```

### `site.ts`

- Brand name
- Tagline
- WhatsApp number
- Email
- Service territory
- Social links
- Response time

### `navigation.ts`

One source of truth for desktop navigation, mobile navigation, footer links, and service mega-menu.

### `settings.ts`

- Feature flags
- Verified claims
- Form endpoint
- Analytics ID
- Market/currency settings

---

## 16. Frontend implementation phases

### Phase 1 — Foundation

- Create Astro project with TypeScript.
- Add React integration.
- Add `BaseLayout`.
- Add tokens and global CSS.
- Add navigation data.
- Add header, mega-menu, mobile menu, footer.

### Phase 2 — Home migration

- Migrate hero slider.
- Migrate all eight homepage sections.
- Match current `index.html` spacing and motion.
- Add responsive and reduced-motion states.

### Phase 3 — Data-driven pages

- Create services index.
- Create portfolio index.
- Create process page.
- Create journal index.
- Create contact page.
- Add local typed content.

### Phase 4 — Dynamic detail routes

- Add service `[slug]` route.
- Add project `[slug]` route.
- Add article `[slug]` route.
- Add related-content mapping.

### Phase 5 — Conversion

- Add WhatsApp CTA.
- Add contact form.
- Add validation and success state.
- Add endpoint contract.
- Add analytics events.

### Phase 6 — Production QA

- Replace all placeholder copy.
- Replace stock images.
- Verify claims.
- Optimize images.
- Add metadata and schema.
- Test all links and routes.
- Run accessibility/performance audits.

---

## 17. Content editing workflow

A non-technical content editor should be able to update:

- Service title and description
- Project facts and images
- Article title and content
- Homepage featured project
- Testimonials
- Contact details
- WhatsApp number
- Verified metrics

Until a CMS is introduced, these values live in typed data files. Never edit copy inside React components.

---

## 18. Acceptance checklist

### Architecture

- [ ] Astro + React project created
- [ ] Shared layout is used by every route
- [ ] Shared header/footer are single-source components
- [ ] Services, projects, and articles are data-driven
- [ ] Detail routes are generated from slugs

### Design

- [ ] Four-color theme only
- [ ] Header matches master homepage
- [ ] Footer matches master homepage
- [ ] Hero wordmark remains fixed
- [ ] Six core services are easy to find
- [ ] Portfolio is image-led and filterable
- [ ] Contact is WhatsApp-first

### Quality

- [ ] No placeholder claims
- [ ] No broken internal links
- [ ] No duplicate process content
- [ ] No UAE pricing on Pakistan pages unless intentional
- [ ] All forms have success/error states
- [ ] Keyboard and reduced-motion states work
- [ ] Lighthouse and mobile QA pass

---

## 19. Immediate start sequence

1. Confirm Woodex market: Pakistan only or Pakistan + UAE.
2. Confirm official WhatsApp, email, service cities, and response time.
3. Confirm which current live-site claims are approved.
4. Create Astro + React foundation.
5. Move homepage tokens and shared header/footer into components.
6. Migrate the homepage first.
7. Build Services, Portfolio, Contact, and Process routes.
8. Replace placeholder content with approved Woodex data.
9. Connect WhatsApp and form endpoint.
10. Run final audit before launch.
