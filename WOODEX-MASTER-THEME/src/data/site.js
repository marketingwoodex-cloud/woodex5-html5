/* ============================================================================
   SITE CONFIG — edit this file to rebrand the entire theme.
   Nothing else needs to change for a name/contact/colour swap.
   ========================================================================= */

export const site = {
  name: 'Woodex Interior',
  shortName: 'Woodex',
  legalName: 'Woodex Interior (Pvt) Ltd',
  tagline: 'Interiors built to outlast trends',
  description:
    'Woodex Interior designs and builds premium residential, commercial and hospitality interiors across Pakistan — from concept and 3D visualisation through to turnkey fit-out and custom joinery.',

  // ── Contact ────────────────────────────────────────────────────────────
  email: 'hello@woodexinterior.com',
  emailSales: 'projects@woodexinterior.com',
  phone: '+92 300 000 0000',
  phoneHref: '+923000000000',
  whatsapp: '+92 300 000 0000',
  whatsappHref: '923000000000',

  // ── Locations ──────────────────────────────────────────────────────────
  market: 'Pakistan nationwide',
  cities: ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Multan', 'Rawalpindi'],
  address: {
    line1: 'Studio 04, Design District',
    line2: 'Gulberg III',
    city: 'Lahore',
    region: 'Punjab',
    postal: '54660',
    country: 'Pakistan',
  },
  hours: 'Mon – Sat · 10:00 – 19:00 PKT',
  responseTime: 'Human reply within one business day',

  // ── Social ─────────────────────────────────────────────────────────────
  social: [
    { label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
    { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' },
    { label: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' },
    { label: 'Pinterest', href: 'https://pinterest.com/', icon: 'pinterest' },
  ],

  // ── Conversion ─────────────────────────────────────────────────────────
  cta: {
    primary: { label: 'Start a project', href: '/contact-one' },
    secondary: { label: 'See our work', href: '/portfolio-one' },
    consult: { label: 'Book a free consultation', href: '/contact-two' },
    call: { label: 'Talk to a designer', href: '/contact-three' },
  },

  // ── Trust signals ──────────────────────────────────────────────────────
  stats: [
    { value: 12, suffix: '+', label: 'Years in practice' },
    { value: 240, suffix: '+', label: 'Projects delivered' },
    { value: 98, suffix: '%', label: 'Client retention' },
    { value: 1.4, suffix: 'M', label: 'Sq ft delivered', decimals: 1 },
  ],

  // ── SEO defaults ───────────────────────────────────────────────────────
  seo: {
    titleTemplate: '%s — Woodex Interior',
    defaultTitle: 'Woodex Interior — Premium Interior Design & Turnkey Fit-Out in Pakistan',
    ogImage: '/images/og/og-default.jpg',
    twitter: '@woodexinterior',
    locale: 'en_PK',
  },

  // ── Feature flags (flip to hide a section without deleting it) ─────────
  features: {
    preloader: false,
    customCursor: true,
    announcementBar: true,
    pageTransitions: false,
    cookieNotice: false,
  },
};

/* Brand colour overrides applied at runtime — lets a client rebrand by
   editing this one object instead of hunting through CSS. */
export const theme = {
  palette: {
    black: '#000000',
    jet: '#111111',
    charcoal: '#525252',
    silver: '#c0c0c0',
    lightGray: '#e3e1e1',
    deepGray: '#d9d9d9',
    beige: '#fcf2e8',
    navy: '#0f1e36',
  },
  /** Which palette key drives the page background and the primary text. */
  background: 'beige',
  foreground: 'black',
};

export default site;
