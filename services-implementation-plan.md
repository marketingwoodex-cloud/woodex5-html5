# Woodex Interior — Services Page Audit & Implementation Plan

## Audit scope

- Live source: Woodex public preview URL
- Local target: `HTML 5/services.html`
- Reference use: content structure only, not visual company/design-system copying
- Design direction: Woodex black/white/gray system, local images, clean storytelling

---

## 1. Live service content audit

The current Woodex live site offers **15 services across five groups**.

### Interior Design

- Commercial Interior
- Residential Interior
- Office & Corporate
- Retail & Shop
- Brand Shop & Outlet

### Fit-Out

- Office Fit-Out
- Commercial Fit-Out
- Residential Fit-Out

### Hospitality

- Restaurant Interior
- Cafe Interior

### Specialist

- Custom Furniture & Joinery
- Interior Renovation
- Turnkey Interiors

### Studio

- 3D Studio
- Office Furniture

---

## 2. Content strengths from the live site

- Service promise is specific and human.
- Each service describes a real customer situation.
- The five-group structure is clear.
- Design, build, furniture, and handover are connected.
- 3D approval is a strong differentiator.
- Fit-out content addresses deadlines and operational constraints.
- Hospitality copy understands guest experience.
- Specialist services demonstrate workshop and joinery capability.

---

## 3. Live-site content problems

### Critical

- The live page mixes Pakistan planning with UAE-specific pricing and WhatsApp.
- AED 15/sq ft is not suitable for a Pakistan version unless Woodex serves both markets.
- The live page has duplicated process steps in the extracted output.
- Metrics contain incomplete/invalid values such as `44+`, `8%`, and `0+`.
- Claims such as 500+, 15 years, 98% on-time, and 5-year warranty need verification.

### Content improvements

- Use one clear description per service.
- Add included deliverables.
- Add what affects cost.
- Add timeline factors without unsupported guarantees.
- Add related project links.
- Add an individual detail page for each service.
- Use Pakistan-specific city, currency, and contact content after approval.

---

## 4. Target services-page story

### Page promise

**One clear process for every kind of interior.**

### Story order

1. **Orient:** What Woodex does.
2. **Group:** Five simple service categories.
3. **Explain:** What each service solves.
4. **Prove:** What is included and how the work moves.
5. **Convert:** Send a floor plan or start a consultation.

### Section map

1. Services hero
2. Design + build promise
3. Interior Design group
4. Fit-Out group
5. Hospitality group
6. Specialist group
7. Studio group
8. What every project includes
9. Factors that affect time and cost
10. Selected work
11. Floor-plan CTA
12. Footer

---

## 5. Sub-service page template

Every service should use the same content layout:

1. Service category label
2. Service title
3. Human promise
4. Service image
5. What the service solves
6. What is included
7. What changes scope or cost
8. Process steps
9. Timeline factors
10. Related project
11. FAQ
12. Get in touch CTA

### Example: Commercial Interior

- Problem: The space needs to perform, not only look good.
- Response: Layout, circulation, material, lighting, and execution planning.
- Deliverables: space plan, concept, 3D, drawings, scope, coordination.
- Next action: send floor plan.

---

## 6. Local HTML implementation status

### Completed

- Services page redesigned around five groups.
- All 15 services are represented.
- Service cards use individual links.
- Dedicated sub-service routes were created.
- Local hero imagery used.
- Scroll reveal script connected.
- Storytelling section added.
- Floor-plan CTA added.
- HTTP checks passed.

### Remaining

- [ ] Replace generated images with approved Woodex project images.
- [ ] Add unique service imagery per group.
- [ ] Add verified Pakistan contact details.
- [ ] Add real service-specific facts.
- [ ] Add real project links.
- [ ] Add service FAQs.
- [ ] Add form endpoint.
- [ ] Add JSON rendering to the service cards.
- [ ] Add active route state.
- [ ] Run browser accessibility QA.

---

## 7. Implementation order

### Step 1 — Content truth

- Confirm Pakistan vs UAE market.
- Confirm WhatsApp and email.
- Confirm service cities.
- Confirm pricing language.
- Verify all metrics and warranties.

### Step 2 — Service data

Move service cards into:

```text
assets/data/services.json
```

Required fields:

- slug
- group
- title
- promise
- summary
- deliverables
- timelineFactors
- costFactors
- relatedProjects
- image
- alt
- seoTitle
- seoDescription

### Step 3 — Template consistency

- Use one sub-service HTML template.
- Replace title, promise, image, deliverables, and FAQ from data.
- Keep layout stable across all 15 routes.

### Step 4 — Interaction

- Click-based Services dropdown.
- Mobile menu.
- Service card reveal.
- Detail-page image reveal.
- Reduced-motion fallback.

### Step 5 — QA

- Check all 15 service URLs.
- Check all service links from the mega-menu.
- Check all images.
- Check page titles and descriptions.
- Check mobile layout.
- Check keyboard navigation.

---

## 8. Go-live criteria

The Services page is ready when:

- All 15 services have approved content.
- Every card opens the correct detail page.
- No UAE/AED information appears on Pakistan pages unless intentional.
- No incomplete metrics appear.
- All service images are approved and local.
- Contact CTA reaches the correct destination.
- Form or WhatsApp route works.
- Mobile menu and dropdown work by keyboard.
- No console errors.
