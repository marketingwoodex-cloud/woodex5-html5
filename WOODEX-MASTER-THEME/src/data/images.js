/* ============================================================================
   IMAGE MANIFEST — every image slot in the theme, in one place.
   ---------------------------------------------------------------------------
   HOW TO REPLACE PHOTOGRAPHY
   --------------------------
   Option A (recommended): drop your file at the exact `path` below inside
     /public/images/…  — nothing else changes.

   Option B: change the `path` here and every component that reads this
     manifest updates automatically (heroes, galleries, cards, schema).

   `scripts/ensure-images.mjs` runs before every build and writes a branded
   SVG placeholder for any slot whose file is missing, so the site is never
   broken while real photography is being shot.
   ========================================================================= */

export const images = {
  /* ── HEROES ─────────────────────────────────────────────────────────── */
  hero: {
    oneMain: { path: '/images/hero/hero-one-main.jpg', alt: 'Double-height contemporary living room with oak panelling and sheer curtains', ratio: '16/9' },
    twoMain: { path: '/images/hero/hero-two-main.jpg', alt: 'Minimal dining area with solid oak table and cane-back chairs', ratio: '3/4' },
    threeMain: { path: '/images/hero/hero-three-main.jpg', alt: 'Open-plan living and kitchen space at dusk with warm interior lighting', ratio: '16/9' },
    card01: { path: '/images/hero/hero-card-01.jpg', alt: 'Detail of a precision-built oak veneer cabinet with consistent shadow gap', ratio: '3/4' },
    card02: { path: '/images/hero/hero-card-02.jpg', alt: 'Sculptural staircase with vertical oak battens and steel handrail', ratio: '3/4' },
    card03: { path: '/images/hero/hero-card-03.jpg', alt: 'Reading nook with full-height oak joinery and linen bench', ratio: '3/4' },
  },

  /* ── MEGA MENU FEATURES ─────────────────────────────────────────────── */
  mega: {
    consult: { path: '/images/mega/mega-consult.jpg', alt: 'Design consultation table with material samples', ratio: '4/3' },
    studio: { path: '/images/mega/mega-studio.jpg', alt: 'Design studio with drawings and material library', ratio: '4/3' },
    services: { path: '/images/mega/mega-services.jpg', alt: 'Interior under construction with joinery installation', ratio: '4/3' },
    project: { path: '/images/mega/mega-project.jpg', alt: 'Completed contemporary villa interior', ratio: '4/3' },
    journal: { path: '/images/mega/mega-journal.jpg', alt: 'Desk with notebook, pencil and material samples', ratio: '4/3' },
    contact: { path: '/images/mega/mega-contact.jpg', alt: 'Studio reception desk', ratio: '4/3' },
  },

  /* ── FEATURE BLOCKS ─────────────────────────────────────────────────── */
  features: {
    siteAnalysis: { path: '/images/features/feature-site-analysis.jpg', alt: 'Architectural drawings and material samples flat-lay', ratio: '4/3' },
    spacePlanning: { path: '/images/features/feature-space-planning.jpg', alt: 'Open-plan space with clear zoning and timber platform', ratio: '4/3' },
    joinery: { path: '/images/features/feature-joinery.jpg', alt: 'Joinery workshop producing custom oak cabinetry', ratio: '4/3' },
    visualisation: { path: '/images/features/feature-visualisation.jpg', alt: '3D visualisation on a large monitor', ratio: '4/3' },
    lighting: { path: '/images/features/feature-lighting.jpg', alt: 'Layered architectural lighting in a living space', ratio: '4/3' },
    sustainability: { path: '/images/features/feature-sustainability.jpg', alt: 'Natural materials and plants in a bright interior', ratio: '4/3' },
  },

  /* ── SERVICES (one per service slug) ────────────────────────────────── */
  services: {
    'residential-interior': { path: '/images/services/residential-interior.jpg', alt: 'Refined modern family living room with custom oak joinery', ratio: '4/3' },
    'kitchen-interior': { path: '/images/services/kitchen-interior.jpg', alt: 'Premium modern kitchen with charcoal cabinetry and stone island', ratio: '4/3' },
    'bedroom-suite': { path: '/images/services/bedroom-suite.jpg', alt: 'Serene primary bedroom suite with integrated wardrobes', ratio: '4/3' },
    'office-corporate': { path: '/images/services/office-corporate.jpg', alt: 'Modern corporate office with acoustic pods and oak slat wall', ratio: '4/3' },
    'retail-shop': { path: '/images/services/retail-shop.jpg', alt: 'Retail store with modular display fixtures', ratio: '4/3' },
    'restaurant-interior': { path: '/images/services/restaurant-interior.jpg', alt: 'Restaurant interior with upholstered banquettes and layered lighting', ratio: '4/3' },
    'cafe-interior': { path: '/images/services/cafe-interior.jpg', alt: 'Compact café with a stone bar counter and marble top', ratio: '4/3' },
    'hospitality-design': { path: '/images/services/hospitality-design.jpg', alt: 'Hotel lobby with stone reception desk and feature lighting', ratio: '4/3' },
    'turnkey-interiors': { path: '/images/services/turnkey-interiors.jpg', alt: 'Completed turnkey interior ready for handover', ratio: '4/3' },
    'commercial-fit-out': { path: '/images/services/commercial-fit-out.jpg', alt: 'Commercial fit-out in progress with ceiling grid installed', ratio: '4/3' },
    'residential-fit-out': { path: '/images/services/residential-fit-out.jpg', alt: 'Residential fit-out with wet area tiling in progress', ratio: '4/3' },
    'interior-renovation': { path: '/images/services/interior-renovation.jpg', alt: 'Renovation in progress revealing original structure', ratio: '4/3' },
    'office-fit-out': { path: '/images/services/office-fit-out.jpg', alt: 'Office fit-out with partitioning and services first fix', ratio: '4/3' },
    'custom-furniture-joinery': { path: '/images/services/custom-furniture-joinery.jpg', alt: 'Custom joinery components laid out in the workshop', ratio: '4/3' },
    '3d-visualisation': { path: '/images/services/3d-visualisation.jpg', alt: 'Photorealistic 3D interior render on a monitor', ratio: '4/3' },
    'space-planning': { path: '/images/services/space-planning.jpg', alt: 'Overhead view of a test-fit floor plan with furniture blocks', ratio: '4/3' },
    'lighting-design': { path: '/images/services/lighting-design.jpg', alt: 'Architectural light fittings and scene control panel', ratio: '4/3' },
  },

  /* ── PROJECTS (cover + gallery per slug) ────────────────────────────── */
  projects: {
    'contemporary-retreat': {
      cover: { path: '/images/projects/contemporary-retreat-cover.jpg', alt: 'Contemporary villa living room with central lightwell', ratio: '4/5' },
      gallery: [
        { path: '/images/projects/contemporary-retreat-01.jpg', alt: 'Central lightwell and staircase', ratio: '4/3' },
        { path: '/images/projects/contemporary-retreat-02.jpg', alt: 'Kitchen with island and integrated appliances', ratio: '4/3' },
        { path: '/images/projects/contemporary-retreat-03.jpg', alt: 'Primary bedroom with full-height joinery', ratio: '4/3' },
        { path: '/images/projects/contemporary-retreat-04.jpg', alt: 'Bathroom with travertine and brass fittings', ratio: '4/3' },
      ],
    },
    'modern-facade-study': {
      cover: { path: '/images/projects/modern-facade-study-cover.jpg', alt: 'Re-skinned office building with glazed screen wall', ratio: '4/5' },
      gallery: [
        { path: '/images/projects/modern-facade-study-01.jpg', alt: 'Glazed screen wall detail', ratio: '4/3' },
        { path: '/images/projects/modern-facade-study-02.jpg', alt: 'Re-planned core with independent suites', ratio: '4/3' },
        { path: '/images/projects/modern-facade-study-03.jpg', alt: 'Lobby with stone reception desk', ratio: '4/3' },
      ],
    },
    'urban-living-concept': {
      cover: { path: '/images/projects/urban-living-concept-cover.jpg', alt: 'Compact apartment with full-wall joinery', ratio: '4/5' },
      gallery: [
        { path: '/images/projects/urban-living-concept-01.jpg', alt: 'Living area with sliding screen to study', ratio: '4/3' },
        { path: '/images/projects/urban-living-concept-02.jpg', alt: 'Concealed storage wall', ratio: '4/3' },
        { path: '/images/projects/urban-living-concept-03.jpg', alt: 'Compact dining with pendant lighting', ratio: '4/3' },
      ],
    },
    'concrete-harmony': {
      cover: { path: '/images/projects/concrete-harmony-cover.jpg', alt: 'Restaurant with exposed concrete and fabric baffles', ratio: '4/5' },
      gallery: [
        { path: '/images/projects/concrete-harmony-01.jpg', alt: 'Bar with fabric baffle array', ratio: '4/3' },
        { path: '/images/projects/concrete-harmony-02.jpg', alt: 'Upholstered banquette seating', ratio: '4/3' },
        { path: '/images/projects/concrete-harmony-03.jpg', alt: 'Perforated acoustic ceiling', ratio: '4/3' },
      ],
    },
    'spatial-innovation': {
      cover: { path: '/images/projects/spatial-innovation-cover.jpg', alt: 'Technology office with acoustic pods and quiet zone', ratio: '4/5' },
      gallery: [
        { path: '/images/projects/spatial-innovation-01.jpg', alt: 'Flexible desking neighbourhood', ratio: '4/3' },
        { path: '/images/projects/spatial-innovation-02.jpg', alt: 'Acoustic focus rooms', ratio: '4/3' },
        { path: '/images/projects/spatial-innovation-03.jpg', alt: 'Collaboration hub with soft seating', ratio: '4/3' },
      ],
    },
    'minimal-space-design': {
      cover: { path: '/images/projects/minimal-space-design-cover.jpg', alt: 'Restrained family home with concealed storage', ratio: '4/5' },
      gallery: [
        { path: '/images/projects/minimal-space-design-01.jpg', alt: 'Calm living room with narrow material palette', ratio: '4/3' },
        { path: '/images/projects/minimal-space-design-02.jpg', alt: 'Full-height concealed storage wall', ratio: '4/3' },
      ],
    },
    'retail-flagship': {
      cover: { path: '/images/projects/retail-flagship-cover.jpg', alt: 'Flagship retail store with modular fixture system', ratio: '4/5' },
      gallery: [
        { path: '/images/projects/retail-flagship-01.jpg', alt: 'Store front and display window', ratio: '4/3' },
        { path: '/images/projects/retail-flagship-02.jpg', alt: 'Standard fixture kit of parts', ratio: '4/3' },
      ],
    },
    'clinic-interior': {
      cover: { path: '/images/projects/clinic-interior-cover.jpg', alt: 'Calm dental clinic waiting area', ratio: '4/5' },
      gallery: [
        { path: '/images/projects/clinic-interior-01.jpg', alt: 'Reception with timber-look wipe-clean panels', ratio: '4/3' },
        { path: '/images/projects/clinic-interior-02.jpg', alt: 'Treatment room with indirect lighting', ratio: '4/3' },
      ],
    },
    'garden-pavilion': {
      cover: { path: '/images/projects/garden-pavilion-cover.jpg', alt: 'Covered event pavilion with retractable screens', ratio: '4/5' },
      gallery: [
        { path: '/images/projects/garden-pavilion-01.jpg', alt: 'Terrace landscape with raised deck', ratio: '4/3' },
        { path: '/images/projects/garden-pavilion-02.jpg', alt: 'Pavilion structure with timber ceiling', ratio: '4/3' },
      ],
    },
  },

  /* ── JOURNAL (cover per article slug) ───────────────────────────────── */
  journal: {
    'interior-cost-pakistan': { path: '/images/journal/interior-cost-cover.jpg', alt: 'Cost plan and budget documents on a desk', ratio: '3/2' },
    'fitout-contract-mistakes': { path: '/images/journal/fitout-contract-cover.jpg', alt: 'Contract documents and a pen', ratio: '3/2' },
    'countertop-guide': { path: '/images/journal/countertop-cover.jpg', alt: 'Stone countertop samples arranged in a row', ratio: '3/2' },
    'joinery-detail-matters': { path: '/images/journal/joinery-detail-cover.jpg', alt: 'Close-up of a consistent shadow gap reveal', ratio: '3/2' },
    'open-plan-acoustics': { path: '/images/journal/open-plan-acoustics-cover.jpg', alt: 'Open-plan office with acoustic ceiling treatment', ratio: '3/2' },
    'site-diary-phase-one': { path: '/images/journal/site-diary-cover.jpg', alt: 'Fit-out site with partitioning and protection boards', ratio: '3/2' },
    'lighting-layers-guide': { path: '/images/journal/lighting-layers-cover.jpg', alt: 'Layered lighting with dimmer control panel', ratio: '3/2' },
    'sustainable-materials-pakistan': { path: '/images/journal/sustainable-materials-cover.jpg', alt: 'Reclaimed timber and lime plaster samples', ratio: '3/2' },
    'test-fit-saves-money': { path: '/images/journal/test-fit-cover.jpg', alt: 'Test-fit floor plan with furniture blocks', ratio: '3/2' },
  },

  /* ── PEOPLE ─────────────────────────────────────────────────────────── */
  people: {
    team: [
      { path: '/images/people/team-usman.jpg', alt: 'Usman Sheikh, Founding Partner', ratio: '3/4' },
      { path: '/images/people/team-hira.jpg', alt: 'Hira Qureshi, Head of Design', ratio: '3/4' },
      { path: '/images/people/team-daniyal.jpg', alt: 'Daniyal Ahmed, Workplace Lead', ratio: '3/4' },
      { path: '/images/people/team-fatima.jpg', alt: 'Fatima Naveed, Contracts Lead', ratio: '3/4' },
      { path: '/images/people/team-ahmed.jpg', alt: 'Ahmed Raza, Head of Joinery', ratio: '3/4' },
      { path: '/images/people/team-zainab.jpg', alt: 'Zainab Iqbal, 3D & Visualisation Lead', ratio: '3/4' },
    ],
    avatars: [
      { path: '/images/people/avatar-01.jpg', alt: 'Client portrait', ratio: '1/1' },
      { path: '/images/people/avatar-02.jpg', alt: 'Client portrait', ratio: '1/1' },
      { path: '/images/people/avatar-03.jpg', alt: 'Client portrait', ratio: '1/1' },
      { path: '/images/people/avatar-04.jpg', alt: 'Client portrait', ratio: '1/1' },
      { path: '/images/people/avatar-05.jpg', alt: 'Client portrait', ratio: '1/1' },
      { path: '/images/people/avatar-06.jpg', alt: 'Client portrait', ratio: '1/1' },
    ],
  },

  /* ── OFFICES ────────────────────────────────────────────────────────── */
  offices: {
    lahore: { path: '/images/offices/office-lahore.jpg', alt: 'Woodex Lahore head studio', ratio: '4/3' },
    karachi: { path: '/images/offices/office-karachi.jpg', alt: 'Woodex Karachi studio', ratio: '4/3' },
    islamabad: { path: '/images/offices/office-islamabad.jpg', alt: 'Woodex Islamabad studio', ratio: '4/3' },
  },

  /* ── MATERIALS / SWATCH LIBRARY ─────────────────────────────────────── */
  materials: [
    { path: '/images/materials/oak-veneer.jpg', alt: 'European oak veneer sample', ratio: '1/1', kind: 'swatch' },
    { path: '/images/materials/travertine.jpg', alt: 'Honed travertine sample', ratio: '1/1', kind: 'swatch' },
    { path: '/images/materials/marble.jpg', alt: 'Book-matched marble sample', ratio: '1/1', kind: 'swatch' },
    { path: '/images/materials/limewash.jpg', alt: 'Limewash plaster sample', ratio: '1/1', kind: 'swatch' },
    { path: '/images/materials/microcement.jpg', alt: 'Microcement sample', ratio: '1/1', kind: 'swatch' },
    { path: '/images/materials/hardware.jpg', alt: 'Concealed joinery hardware samples', ratio: '1/1', kind: 'swatch' },
    { path: '/images/materials/upholstery.jpg', alt: 'Performance upholstery fabric samples', ratio: '1/1', kind: 'swatch' },
    { path: '/images/materials/sintered.jpg', alt: 'Sintered stone sample', ratio: '1/1', kind: 'swatch' },
  ],

  /* ── CLIENT LOGOS ───────────────────────────────────────────────────── */
  clients: [
    { path: '/images/clients/client-01.svg', alt: 'Meridian Group', ratio: '5/2', kind: 'logo' },
    { path: '/images/clients/client-02.svg', alt: 'Northgate Capital', ratio: '5/2', kind: 'logo' },
    { path: '/images/clients/client-03.svg', alt: 'Casa Verde', ratio: '5/2', kind: 'logo' },
    { path: '/images/clients/client-04.svg', alt: 'Orbit Technologies', ratio: '5/2', kind: 'logo' },
    { path: '/images/clients/client-05.svg', alt: 'Riverside Hotels', ratio: '5/2', kind: 'logo' },
    { path: '/images/clients/client-06.svg', alt: 'Falcon Retail', ratio: '5/2', kind: 'logo' },
    { path: '/images/clients/client-07.svg', alt: 'Lumen Health', ratio: '5/2', kind: 'logo' },
    { path: '/images/clients/client-08.svg', alt: 'Atlas Interiors', ratio: '5/2', kind: 'logo' },
  ],

  /* ── CTA / OG ───────────────────────────────────────────────────────── */
  cta: {
    banner: { path: '/images/cta/cta-banner.jpg', alt: 'Premium office lounge at golden hour', ratio: '16/9' },
    consult: { path: '/images/cta/cta-consult.jpg', alt: 'Design consultation in progress', ratio: '4/3' },
  },
  og: {
    default: { path: '/images/og/og-default.jpg', alt: 'Woodex Interior share card', ratio: '1200/630' },
  },
};

/* ── FLAT LOOKUP ─────────────────────────────────────────────────────────
   `scripts/ensure-images.mjs` walks this to know which files must exist. */
export function allImagePaths() {
  const out = [];
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (node && typeof node === 'object') {
      if (typeof node.path === 'string' && node.path.startsWith('/images/')) {
        out.push(node);
        return;
      }
      return Object.values(node).forEach(walk);
    }
  };
  walk(images);
  return out;
}

/** Convenience map: slug → path, used by pages that iterate content. */
export const serviceImage = (slug) =>
  images.services[slug]?.path ?? '/images/services/residential-interior.jpg';

export const projectImage = (slug, index) => {
  const p = images.projects[slug];
  if (!p) return '/images/projects/contemporary-retreat-cover.jpg';
  if (index === undefined) return p.cover.path;
  return p.gallery[index]?.path ?? p.cover.path;
};

export const articleImage = (slug) =>
  images.journal[slug]?.path ?? '/images/journal/interior-cost-cover.jpg';

export const teamImage = (index) =>
  images.people.team[index]?.path ?? '/images/people/team-usman.jpg';

export const materialImage = (index) =>
  images.materials[index % images.materials.length]?.path ?? '/images/materials/oak-veneer.jpg';

export const clientLogo = (index) =>
  images.clients[index % images.clients.length]?.path ?? '/images/clients/client-01.svg';

export const avatarImage = (index) =>
  images.people.avatars[index % images.people.avatars.length]?.path ?? '/images/people/avatar-01.jpg';

export default images;
