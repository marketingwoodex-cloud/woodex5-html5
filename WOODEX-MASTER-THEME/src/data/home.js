/* ============================================================================
   WOODEX HOME — content for the redesigned home page.
   ---------------------------------------------------------------------------
   All copy is taken from the existing Woodex site (index.html) so the redesign
   launches with the practice's real voice: gates, proof numbers, services and
   FAQs. Edit here, never in the components.
   ========================================================================= */

export const hero = {
  slides: [
    {
      label: 'Drawn. Then built.',
      lines: ['We turn ideas', 'into spaces'],
      copy: 'Start with what you have. Plan, 3D, then budget and BOQ if you want it built.',
      cta: { label: 'Start your project', href: '/start-your-project' },
      image: '/images/woodex/hero-1.jpg',
      alt: 'Warm contemporary living room with walnut panelling and city views',
      side: 'Layout',
    },
    {
      label: 'One partner',
      lines: ['Concept to', 'completion'],
      copy: 'Designers, in-house 3D, execution and the mill — one studio. Not a moodboard plus a contractor hunt.',
      cta: { label: 'Explore interiors', href: '/services' },
      image: '/images/woodex/hero-2.jpg',
      alt: 'Candlelit fine-dining restaurant with walnut tables and arched niches',
      side: 'Design',
    },
    {
      label: 'See it first',
      lines: ['Approved visual.', 'Built reality.'],
      copy: '3D is how a family or a board decides. Stills first. Then budget and BOQ. Then the mill and the site — if that is the brief.',
      cta: { label: 'Open 3D Studio', href: '/3d-studio' },
      image: '/images/woodex/hero-3.jpg',
      alt: 'Double-height office lobby with travertine walls and a living green wall',
      side: 'Create',
    },
  ],
};

export const services = {
  eyebrow: 'Building documentation',
  title: 'Six services you can actually buy',
  lede: 'Rooms, named outputs, a unique path. Same discipline as 3D Studio — not six cloned cards.',
  items: [
    { n: '01', name: 'Residential', copy: 'Living, kitchen, wardrobe. Output: plan, stills, BOQ if you want.', caption: 'Residential — the house as one instrument', href: '/services/residential-fit-out', image: '/images/woodex/hero-1.jpg', alt: 'Residential interior — living and dining' },
    { n: '02', name: 'Office', copy: 'Arrival, focus, the demo room. The mural comes last.', caption: 'Office — arrival, focus, demo', href: '/services/office-fit-out', image: '/images/woodex/hero-3.jpg', alt: 'Office lobby' },
    { n: '03', name: 'Restaurant', copy: 'Tables, pass, light. Atmosphere you can sit inside.', caption: 'Restaurant — the Saturday night room', href: '/services/restaurant-interior', image: '/images/woodex/hero-2.jpg', alt: 'Restaurant at night' },
    { n: '04', name: 'Café', copy: 'The counter and one linger seat. Two economies, one room.', caption: 'Café — bar and one linger seat', href: '/services/cafe-interior', image: '/images/woodex/studio-kitchen.jpg', alt: 'Café counter' },
    { n: '05', name: 'Retail', copy: 'Enter, pause, pay. A shop that can sell.', caption: 'Retail — enter, pause, pay', href: '/services/retail-shop', image: '/images/woodex/project-minimal.jpg', alt: 'Retail path' },
    { n: '06', name: 'Craft', copy: 'Kitchens, wardrobes, counters. Drawn, then made.', caption: 'Craft — the mill connected to the still', href: '/services/custom-furniture-joinery', image: '/images/woodex/craft-joinery.jpg', alt: 'Joinery mill' },
  ],
};

export const studio = {
  kicker: 'See it. Understand it. Build it.',
  cards: [
    {
      num: '3D', title: 'Stills first',
      copy: 'A still is a meeting. One still per key room. In-house — not a render farm. 3D-only is a complete engagement.',
      image: '/images/woodex/studio-hero.jpg', alt: '3D Studio — a still you can approve', thumb: 'Stills',
    },
    {
      num: '360', title: 'Walkthrough when the path matters',
      copy: 'Sequence, not spectacle. Walkthrough and 360 only if how you move through the building is the decision.',
      image: '/images/woodex/studio-kitchen.jpg', alt: 'Walkthrough — the path through the room', thumb: 'Walkthrough',
    },
    {
      num: 'BOQ', title: 'Then money, if you want',
      copy: 'The same still can go to budget, BOQ and the mill. You are not forced into turnkey. Plan holds the number.',
      image: '/images/woodex/studio-pharmacy.jpg', alt: 'Approved still — then BOQ if you want', thumb: 'BOQ',
    },
  ],
  cta: { label: 'Open 3D Studio', href: '/3d-studio' },
};

export const story = {
  eyebrow: 'You do not just get a design',
  title: 'Drawn. Then built.',
  lede: 'You get a path from idea to real space: discover, design, visualize, plan (budget + BOQ), build, install, deliver. Stop at the gate you choose.',
  gates: [
    { title: 'I have an empty space', copy: 'Consultation, plan, 3D, then budget — a house or a shop that works before anyone decorates it.', href: '/services/residential-fit-out' },
    { title: 'I already have a design', copy: 'We review the drawings first. Then scope, BOQ and site — we do not execute a file we have not read.', href: '/services/fit-out' },
    { title: 'I need only 3D', copy: 'In-house stills, walkthrough, 360. 3D-only is a complete engagement. The still can go to BOQ later.', href: '/3d-studio' },
  ],
  image: '/images/woodex/split-night.jpg',
  alt: 'Evening residence — Woodex interior architecture',
  chipTitle: 'Concept to handover',
  chipText: 'One studio. Three cities. Buildable drawings.',
};

export const doc = {
  eyebrow: 'Building documentation',
  title: 'How a room is documented',
  lede: 'Survey, still, sheets. Then budget and BOQ if you want it built. Not a moodboard pack.',
  cta: { label: 'Open 3D Studio', href: '/3d-studio' },
  float: { image: '/images/woodex/studio-hero.jpg', alt: 'Approved still — then sheets' },
  main: { image: '/images/woodex/hero-1.jpg', alt: 'A room drawn so it can be built' },
  cards: [
    { icon: 'home', title: 'Interior design', copy: 'Plan first. Then the still. The room has to work before anyone decorates it.' },
    { icon: 'list', title: 'Consultation', copy: 'What you have. What you need. City. The brief is the contract.' },
    { icon: 'image', title: '3D visualization', copy: 'Stills first. Walkthrough only if the path is the decision. 3D does not invent the plan.' },
  ],
};

export const stats = {
  eyebrow: 'Practice at a glance',
  title: '500+ projects · founder ~20 years · execution 10+ years · ISO 9001',
  items: [
    { num: '500+', title: 'Projects delivered', copy: 'Work we can stand behind — plan, still and site when the brief includes build. Not a catalogue count.' },
    { num: '10+', title: 'Execution team years', copy: 'ISO 9001. Site, joinery and handover — the still continues into the mill.', accent: true },
    { num: '~20', title: 'Founder years', copy: 'Commercial interiors first. The practice begins with a complete job — Wellstar, DHA Lahore — and continues as one studio.' },
    { num: '3', title: 'Studios you can visit', copy: 'Gulberg III Lahore, Clifton Karachi, F-7 Islamabad. Desk: LG 90 Link Road, Model Town. Nationwide when the job needs it.' },
  ],
};

export const practice = {
  title: 'One team. One process. One result.',
  lede: 'Designers, visualizers, execution and craft — in-house. Brief, plan, design, visualize, budget, BOQ, execute, deliver. A finished room connected to the idea you approved.',
  cta: { label: 'Explore our services', href: '/services' },
  main: { image: '/images/woodex/split-night.jpg', alt: 'Luxury modern house glowing over a dark evening pool' },
  float: { image: '/images/woodex/project-minimal.jpg', alt: 'Arched plaster doorway detail' },
  paths: [
    { label: 'Empty space — start with the plan', href: '/services/residential-fit-out' },
    { label: 'Existing design — review, then build', href: '/services/fit-out' },
    { label: '3D-only — see the room', href: '/3d-studio' },
  ],
};

export const mosaic = {
  title: 'Studies — rooms drawn so they can be built',
  href: '/projects',
  items: [
    { title: 'Contemporary retreat', image: '/images/woodex/project-facade.jpg', alt: 'Contemporary retreat villa', size: '' },
    { title: 'Modern facade study', image: '/images/woodex/project-spatial.jpg', alt: 'Sculptural modern facade study', size: '' },
    { title: 'Minimal space design', image: '/images/woodex/project-minimal.jpg', alt: 'Parametric white architecture and pool', size: 'tall', copy: 'A curated showcase of conceptual interiors and architectural explorations.' },
    { title: 'Concrete harmony', image: '/images/woodex/split-night.jpg', alt: 'Concrete harmony residence at dusk', size: 'wide' },
  ],
};

export const approach = {
  image: '/images/woodex/hero-1.jpg',
  alt: 'Woodex living interior with walnut and linen',
  title: 'First we understand the space. Then we design it.',
  lede: 'What you have, what it must become, how you use it, budget band, city. The brief is the contract — not a moodboard.',
  cta: { label: 'The practice', href: '/about' },
  faqs: [
    { q: 'What do I need to start?', a: 'What the space is today, what it must become, how you use it, city, and a budget band if you have one. A plan or photographs help. We do not invent a layout in 3D and call it design.' },
    { q: 'Can I buy 3D without turnkey?', a: 'Yes. 3D-only is a complete engagement. Stills first. Walkthrough only if the path through the building matters. The same still can go to BOQ later.' },
    { q: 'I already have drawings. Will you build them?', a: 'We review first. Then scope, commercial and BOQ. We do not execute an external design we have not read against the site.' },
    { q: 'When is money written?', a: 'After you approve the room. Design first. Budget with clarity. BOQ turns the still into a buildable scope. We do not publish a fake square-foot rate.' },
    { q: 'What can you actually prove?', a: '500+ projects, founder ~20 years, execution 10+ years, ISO 9001, studios in Lahore, Karachi and Islamabad. Named client: Wellstar Pharmacy, Cosmetics and Mini Hospital, DHA Lahore. Studies stay labelled studies.' },
  ],
};

export const featured = {
  title: 'From approved still to BOQ and site',
  lede: 'Design first. Budget with clarity. Turn the still into a buildable scope — then site, joinery and handover if that is the brief.',
  checks: ['Plan, concept, materials', '3D stills — then BOQ', 'Craft and execution in-house'],
  cta: { label: 'Start your project', href: '/start-your-project' },
  big: { image: '/images/woodex/project-facade.jpg', alt: 'Contemporary mixed-material villa facade' },
  small: { image: '/images/woodex/project-urban.jpg', alt: 'Interior living detail' },
};

export const marqueeWords = ['Residences', 'Workplaces', 'Hospitality', 'Retail', '3D Studio', 'Renovation'];

export const cta = {
  title: 'Tell us about your space',
  copy: 'Empty hall, floor plan, brand, or drawings. We answer with the next gate — not a brochure.',
  label: 'Send the brief',
  href: '/start-your-project',
  image: '/images/woodex/hero-2.jpg',
  alt: 'Craft and drawing — a Woodex project underway',
};

export default { hero, services, studio, story, doc, stats, practice, mosaic, approach, featured, marqueeWords, cta };
