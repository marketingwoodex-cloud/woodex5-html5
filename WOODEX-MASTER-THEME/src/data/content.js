/* ============================================================================
   SHARED CONTENT — testimonials, process, team, clients, faqs, stats, pricing.
   Every page pulls from here so copy changes happen in exactly one place.
   ========================================================================= */

/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */
export const testimonials = [
  {
    quote:
      'We had been planning this house for three years and had been let down twice. Woodex drew it properly, priced it properly, and then actually built what they drew.',
    author: 'Ayesha & Bilal R.',
    role: 'Homeowners',
    project: 'Contemporary Retreat',
    location: 'Lahore',
    rating: 5,
    avatar: '/images/people/avatar-01.jpg',
  },
  {
    quote:
      'Guests comment on the room before they comment on the food. That never happened in our old site — the difference is entirely the acoustic and lighting design.',
    author: 'Hassan T.',
    role: 'Restaurateur',
    project: 'Concrete Harmony',
    location: 'Islamabad',
    rating: 5,
    avatar: '/images/people/avatar-02.jpg',
  },
  {
    quote:
      'They gave us a fixed programme and hit it, on a live office floor with 90 staff still working. I have never seen that done in this market.',
    author: 'Sana M.',
    role: 'COO, technology firm',
    project: 'Spatial Innovation',
    location: 'Lahore',
    rating: 5,
    avatar: '/images/people/avatar-03.jpg',
  },
  {
    quote:
      'The drawing set was more detailed than anything our previous contractor had seen. Every question had an answer before we got to site.',
    author: 'Kamran J.',
    role: 'Property developer',
    project: 'Modern Facade Study',
    location: 'Lahore',
    rating: 5,
    avatar: '/images/people/avatar-04.jpg',
  },
  {
    quote:
      'We asked for storage everywhere and calm surfaces. They delivered exactly that, and it still feels like a home rather than a showroom.',
    author: 'Nadia H.',
    role: 'Homeowner',
    project: 'Minimal Space Design',
    location: 'Lahore',
    rating: 5,
    avatar: '/images/people/avatar-05.jpg',
  },
  {
    quote:
      'Patient feedback improved measurably after the refit. The space stopped feeling institutional without breaking any hygiene requirement.',
    author: 'Dr. Imran A.',
    role: 'Practice principal',
    project: 'Dental Clinic Interior',
    location: 'Lahore',
    rating: 5,
    avatar: '/images/people/avatar-06.jpg',
  },
];

/* ── PROCESS ───────────────────────────────────────────────────────────── */
export const processSteps = [
  {
    no: '01',
    title: 'Discovery & brief',
    duration: 'Week 1',
    summary: 'We learn the space, the people and the constraints before we draw anything.',
    detail:
      'A structured briefing session covering how you will use the space, what you already own, your budget envelope and your target date. We survey and measure, and we tell you honestly if the brief and the budget are aligned.',
    deliverables: ['Site survey and measured drawings', 'Written brief and scope', 'Budget envelope and reality check'],
    icon: 'compass',
  },
  {
    no: '02',
    title: 'Concept design',
    duration: 'Weeks 2 – 4',
    summary: 'Two or three genuinely different spatial directions — not one idea in three colourways.',
    detail:
      'We develop alternative layouts and material directions so you can compare real choices. You see plans, mood direction and an indicative cost for each option before committing to a route.',
    deliverables: ['Alternative layout options', 'Material and mood direction', 'Indicative cost comparison'],
    icon: 'pen',
  },
  {
    no: '03',
    title: 'Design development',
    duration: 'Weeks 4 – 8',
    summary: 'The chosen concept is resolved into a buildable, priced specification.',
    detail:
      'Every room is drawn: elevations, joinery internals, reflected ceiling plans, lighting layouts, and a full finish schedule. Provisional sums are replaced with real selections.',
    deliverables: ['Full drawing set', 'Finish and fittings schedule', 'Costed specification'],
    icon: 'blueprint',
  },
  {
    no: '04',
    title: 'Visualisation & sign-off',
    duration: 'Weeks 6 – 9',
    summary: 'Photorealistic renders so you approve the finished space, not a mood board.',
    detail:
      'We render principal rooms under day and evening lighting. Revisions are included, and nothing goes to production until you have signed off the images you were shown.',
    deliverables: ['Photorealistic renders', '360° panoramas on request', 'Signed design freeze'],
    icon: 'cube',
  },
  {
    no: '05',
    title: 'Procurement & drawings',
    duration: 'Weeks 8 – 11',
    summary: 'Shop drawings, samples, orders and a locked programme.',
    detail:
      'Trades are appointed against a priced schedule of rates. Long-lead items are ordered first. Every drawing is revision-controlled so nobody builds from a superseded sheet.',
    deliverables: ['Shop drawings', 'Appointed trades', 'Milestone programme'],
    icon: 'clipboard',
  },
  {
    no: '06',
    title: 'Site delivery',
    duration: 'Varies by scope',
    summary: 'One team on site, one weekly report, no surprises.',
    detail:
      'Our site manager runs daily coordination and a weekly written progress note with photographs, percentage complete per trade, and any early warnings. Variations are priced before they are executed.',
    deliverables: ['Weekly progress reports', 'Priced variations before execution', 'Quality control inspections'],
    icon: 'helmet',
  },
  {
    no: '07',
    title: 'Handover & aftercare',
    duration: 'Final 2 weeks',
    summary: 'Snagging, documentation, training and a defects period.',
    detail:
      'A punch team walks the space after every trade has left. You receive as-built drawings, warranty documentation, a maintenance schedule and equipment training. A 12-month defects liability period follows handover.',
    deliverables: ['As-built documentation', 'Operation and maintenance pack', '12-month defects period'],
    icon: 'key',
  },
];

/* ── TEAM ──────────────────────────────────────────────────────────────── */
export const team = [
  {
    name: 'Usman Sheikh',
    role: 'Founding Partner',
    bio: 'Architect and builder. Fifteen years delivering interiors and fit-outs across Punjab and Sindh.',
    image: '/images/people/team-usman.jpg',
    social: { linkedin: '#', instagram: '#' },
  },
  {
    name: 'Hira Qureshi',
    role: 'Head of Design',
    bio: 'Leads concept and design development. Particular interest in daylight and material restraint.',
    image: '/images/people/team-hira.jpg',
    social: { linkedin: '#', instagram: '#' },
  },
  {
    name: 'Daniyal Ahmed',
    role: 'Workplace Lead',
    bio: 'Specialises in workplace strategy, acoustic design and post-occupancy evaluation.',
    image: '/images/people/team-daniyal.jpg',
    social: { linkedin: '#' },
  },
  {
    name: 'Fatima Naveed',
    role: 'Contracts Lead',
    bio: 'Runs procurement and commercial control. Keeps programmes honest and variations priced.',
    image: '/images/people/team-fatima.jpg',
    social: { linkedin: '#' },
  },
  {
    name: 'Ahmed Raza',
    role: 'Head of Joinery',
    bio: 'Runs the millwork shop. Twenty years producing bespoke cabinetry to drawing tolerance.',
    image: '/images/people/team-ahmed.jpg',
    social: { linkedin: '#' },
  },
  {
    name: 'Zainab Iqbal',
    role: '3D & Visualisation Lead',
    bio: 'Builds the renders clients approve from. Physically based materials and real lighting studies.',
    image: '/images/people/team-zainab.jpg',
    social: { linkedin: '#' },
  },
];

/* ── CLIENTS ───────────────────────────────────────────────────────────── */
export const clients = [
  { name: 'Meridian Group', logo: '/images/clients/client-01.svg' },
  { name: 'Northgate Capital', logo: '/images/clients/client-02.svg' },
  { name: 'Casa Verde', logo: '/images/clients/client-03.svg' },
  { name: 'Orbit Technologies', logo: '/images/clients/client-04.svg' },
  { name: 'Riverside Hotels', logo: '/images/clients/client-05.svg' },
  { name: 'Falcon Retail', logo: '/images/clients/client-06.svg' },
  { name: 'Lumen Health', logo: '/images/clients/client-07.svg' },
  { name: 'Atlas Interiors', logo: '/images/clients/client-08.svg' },
];

/* ── GUARANTEES / DIFFERENTIATORS ──────────────────────────────────────── */
export const guarantees = [
  {
    title: 'Fixed programme',
    text: 'We publish a milestone programme before we start and report against it weekly.',
    icon: 'calendar',
  },
  {
    title: 'Open-book pricing',
    text: 'You see the cost build-up, not just a number. Variations are priced before execution.',
    icon: 'receipt',
  },
  {
    title: 'One point of contact',
    text: 'Design and build under one contract. No gap between designer and contractor.',
    icon: 'user',
  },
  {
    title: '12-month defects period',
    text: 'After handover we stay on the hook. Snags are fixed under warranty, not invoiced.',
    icon: 'shield',
  },
];

/* ── FAQ ───────────────────────────────────────────────────────────────── */
export const faqs = [
  {
    q: 'What size of project do you take on?',
    a: 'Residential work typically starts from a single room or a 1,200 sq ft apartment. Commercial and fit-out work starts around 2,000 sq ft. We also take on standalone joinery and 3D visualisation commissions with no minimum.',
    category: 'Scope',
  },
  {
    q: 'How much does an interior project cost?',
    a: 'Delivered interior work in Pakistan generally ranges from PKR 3,500 per sq ft for basic scope to PKR 7,000+ per sq ft for bespoke work. The number depends far more on the number of different materials and the complexity of joinery than on the size of the space. We will give you a costed specification, not a rate.',
    category: 'Cost',
  },
  {
    q: 'How long will my project take?',
    a: 'A single room is typically 4–8 weeks. A full apartment 10–16 weeks. Commercial fit-outs 12–24 weeks depending on area and landlord approvals. We confirm a programme before you commit.',
    category: 'Programme',
  },
  {
    q: 'Do you work outside Lahore?',
    a: 'Yes. We deliver across Pakistan, with regular projects in Karachi, Islamabad, Faisalabad, Multan and Rawalpindi. For sites outside Lahore we add a site-management allowance to cover travel and supervision.',
    category: 'Coverage',
  },
  {
    q: 'Can I supply my own materials or contractor?',
    a: 'Yes. We will price around client-supplied items and clearly note where the risk transfers to you. If you appoint your own trades, we can operate as designer and contract administrator instead.',
    category: 'Scope',
  },
  {
    q: 'Will I see the design before you build?',
    a: 'Always. Every project includes photorealistic renders of principal rooms, and nothing goes into production until you have signed off the images you were shown.',
    category: 'Design',
  },
  {
    q: 'What warranty do you provide?',
    a: 'A 12-month defects liability period on all works, five years on manufacturing defects in our own joinery, and manufacturer warranties passed through in full on hardware and appliances.',
    category: 'Aftercare',
  },
  {
    q: 'How do payments work?',
    a: 'A design-stage fee covers survey through to the costed specification. Delivery is then paid against milestones — typically a mobilisation payment followed by stage payments tied to verified progress. We never ask for full payment up front.',
    category: 'Cost',
  },
];

export const faqsByCategory = () =>
  faqs.reduce((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});

/* ── PRICING PACKAGES ──────────────────────────────────────────────────── */
export const pricingPackages = [
  {
    id: 'design-only',
    name: 'Design Only',
    tagline: 'For clients who already have a contractor.',
    price: 'From PKR 275,000',
    unit: 'per project',
    popular: false,
    features: [
      'Site survey and measured drawings',
      'Two concept layout options',
      'Full drawing set and finish schedule',
      'Photorealistic renders of principal rooms',
      'Two revision rounds included',
      'Tender support and contractor shortlisting',
    ],
    excludes: ['Site supervision', 'Procurement', 'Build delivery'],
    cta: 'Start with design',
  },
  {
    id: 'design-build',
    name: 'Design & Build',
    tagline: 'Our most common appointment.',
    price: 'From PKR 4,500',
    unit: 'per sq ft',
    popular: true,
    features: [
      'Everything in Design Only',
      'Fixed cost plan with open-book build-up',
      'Milestone programme with weekly reports',
      'All trades coordinated in-house',
      'Custom joinery from our own shop',
      '12-month defects liability period',
      'Site management and quality control',
    ],
    excludes: ['FF&E procurement (available as an add-on)'],
    cta: 'Book a consultation',
  },
  {
    id: 'turnkey-prime',
    name: 'Turnkey Prime',
    tagline: 'Full responsibility, including FF&E and handover.',
    price: 'Project priced',
    unit: 'by scope',
    popular: false,
    features: [
      'Everything in Design & Build',
      'FF&E specification, procurement and installation',
      'Lighting design and scene commissioning',
      'AV and smart-building coordination',
      'Art, styling and final dressing',
      'Staff training and O&M documentation',
      'Extended 24-month defects period',
    ],
    excludes: [],
    cta: 'Request a proposal',
  },
];

/* ── ADD-ON SERVICES ───────────────────────────────────────────────────── */
export const addOns = [
  { name: '3D walkthrough animation', price: 'From PKR 120,000', unit: 'per scene' },
  { name: '360° panorama package', price: 'From PKR 65,000', unit: 'per room' },
  { name: 'Lighting design & commissioning', price: 'From PKR 150,000', unit: 'per project' },
  { name: 'Acoustic study and specification', price: 'From PKR 95,000', unit: 'per project' },
  { name: 'Post-occupancy evaluation', price: 'From PKR 140,000', unit: 'per project' },
  { name: 'Maintenance & aftercare retainer', price: 'From PKR 45,000', unit: 'per month' },
];

/* ── OFFICES (contact-three) ───────────────────────────────────────────── */
export const offices = [
  {
    city: 'Lahore',
    label: 'Head Studio',
    address: ['Studio 04, Design District', 'Gulberg III', 'Lahore 54660, Pakistan'],
    phone: '+92 300 000 0001',
    email: 'lahore@woodexinterior.com',
    hours: 'Mon – Sat · 10:00 – 19:00',
    image: '/images/offices/office-lahore.jpg',
    mapQuery: 'Gulberg III Lahore',
  },
  {
    city: 'Karachi',
    label: 'South Studio',
    address: ['Suite 12, Business Bay', 'Clifton Block 5', 'Karachi 75600, Pakistan'],
    phone: '+92 300 000 0002',
    email: 'karachi@woodexinterior.com',
    hours: 'Mon – Sat · 10:00 – 19:00',
    image: '/images/offices/office-karachi.jpg',
    mapQuery: 'Clifton Block 5 Karachi',
  },
  {
    city: 'Islamabad',
    label: 'North Studio',
    address: ['House 22, Street 8', 'F-7/2', 'Islamabad 44000, Pakistan'],
    phone: '+92 300 000 0003',
    email: 'islamabad@woodexinterior.com',
    hours: 'Mon – Sat · 10:00 – 19:00',
    image: '/images/offices/office-islamabad.jpg',
    mapQuery: 'F-7 Islamabad',
  },
];

/* ── AWARDS / PRESS ────────────────────────────────────────────────────── */
export const awards = [
  { year: '2026', title: 'Best Residential Interior — Punjab', org: 'Pakistan Design Council' },
  { year: '2025', title: 'Workplace Project of the Year', org: 'Interior Excellence Awards' },
  { year: '2025', title: 'Featured — South Asia Fit-Out Review', org: 'SAFR Journal' },
  { year: '2024', title: 'Hospitality Design Commendation', org: 'Hospitality Pakistan' },
  { year: '2023', title: 'Emerging Studio of the Year', org: 'Pakistan Design Council' },
];

/* ── ANNIVERSARY / MILESTONES ──────────────────────────────────────────── */
export const milestones = [
  { year: '2014', title: 'Studio founded', text: 'Started as a two-person joinery and drafting practice in Lahore.' },
  { year: '2017', title: 'First commercial fit-out', text: 'Delivered an 8,000 sq ft office, and moved into full design-and-build delivery.' },
  { year: '2020', title: 'Own millwork shop', text: 'Brought joinery production in-house, giving direct control over tolerance and lead time.' },
  { year: '2023', title: 'National coverage', text: 'Opened studios in Karachi and Islamabad; projects delivered in six cities.' },
  { year: '2026', title: '240 projects delivered', text: 'Twelve years in, with a 98% client retention rate and a 1.4M sq ft portfolio delivered.' },
];

export default testimonials;
