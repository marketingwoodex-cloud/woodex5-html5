/* ============================================================================
   NAVIGATION — drives the header, mega menu, footer columns and sitemap.
   Supports unlimited nesting depth for the mega panels.
   ========================================================================= */

import { serviceGroups, servicesByGroup } from './services.js';

/** Primary header nav. Items with `mega` render a mega panel. */
export const primaryNav = [
  {
    label: 'Home',
    mega: {
      id: 'mega-home',
      layout: '4',
      columns: [
        {
          title: 'Homepage layouts',
          links: [
            { label: 'Home One — Classic', href: '/home-one', note: 'Editorial hero, service reel' },
            { label: 'Home Two — Showcase', href: '/home-two', note: 'Split hero, rotating headlines' },
            { label: 'Home Three — Studio', href: '/home-three', note: 'Full-bleed video, stats strip' },
          ],
        },
        {
          title: 'Landing variants',
          links: [
            { label: 'Interior studio', href: '/home-one' },
            { label: 'Architecture practice', href: '/home-two' },
            { label: 'Fit-out contractor', href: '/home-three' },
          ],
        },
        {
          title: 'Utility',
          links: [
            { label: 'Style guide', href: '/style-guide' },
            { label: 'Animation guide', href: '/instructions' },
            { label: 'Licence', href: '/license' },
            { label: 'Changelog', href: '/changelog' },
          ],
        },
      ],
      feature: {
        title: 'Ready to start your project?',
        text: 'Free 30-minute consultation with a senior designer.',
        href: '/contact-two',
        image: '/images/mega/mega-consult.jpg',
        cta: 'Book a consultation',
      },
      stats: [
        { value: '240+', label: 'Projects delivered' },
        { value: '12 yrs', label: 'In practice' },
        { value: '98%', label: 'Client retention' },
        { value: '6 cities', label: 'Nationwide delivery' },
      ],
    },
  },

  {
    label: 'About',
    mega: {
      id: 'mega-about',
      layout: '3',
      columns: [
        {
          title: 'The studio',
          links: [
            { label: 'About us', href: '/about', note: 'Who we are and how we think' },
            { label: 'Our process', href: '/process', note: 'Seven stages, start to handover' },
            { label: 'Team', href: '/team' },
            { label: 'Careers', href: '/careers' },
          ],
        },
        {
          title: 'Proof',
          links: [
            { label: 'Testimonials', href: '/testimonials' },
            { label: 'Client list', href: '/clients' },
            { label: 'Awards & press', href: '/awards' },
            { label: 'Sustainability', href: '/sustainability' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Pricing & packages', href: '/pricing-one' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Materials library', href: '/materials' },
            { label: 'Get in touch', href: '/contact-one' },
          ],
        },
      ],
      feature: {
        title: 'A studio built on documentation',
        text: 'Every detail drawn, priced and signed off before site.',
        href: '/about',
        image: '/images/mega/mega-studio.jpg',
        cta: 'Read our story',
      },
    },
  },

  {
    label: 'Services',
    mega: {
      id: 'mega-services',
      layout: 'services',
      groups: serviceGroups.map((g) => ({
        ...g,
        links: servicesByGroup(g.id).map((s) => ({ label: s.title, href: `/services/${s.slug}`, note: s.summary })),
      })),
      columns: [
        {
          title: 'By sector',
          links: [
            { label: 'All services', href: '/service' },
            { label: 'Residential', href: '/services/residential-interior' },
            { label: 'Commercial', href: '/services/commercial-fit-out' },
            { label: 'Hospitality', href: '/services/hospitality-design' },
          ],
        },
      ],
      feature: {
        title: 'Not sure where to start?',
        text: 'Tell us the space and the budget. We will tell you what is possible.',
        href: '/contact-one',
        image: '/images/mega/mega-services.jpg',
        cta: 'Start a project',
      },
    },
  },

  {
    label: 'Portfolio',
    mega: {
      id: 'mega-portfolio',
      layout: '3',
      columns: [
        {
          title: 'Index styles',
          links: [
            { label: 'Portfolio One — Grid', href: '/portfolio-one' },
            { label: 'Portfolio Two — Masonry', href: '/portfolio-two' },
            { label: 'Portfolio Three — List', href: '/portfolio-three' },
            { label: 'All projects', href: '/portfolio' },
          ],
        },
        {
          title: 'By sector',
          links: [
            { label: 'Residential', href: '/portfolio-one?sector=residential' },
            { label: 'Commercial', href: '/portfolio-one?sector=commercial' },
            { label: 'Hospitality', href: '/portfolio-one?sector=hospitality' },
            { label: 'Retail', href: '/portfolio-one?sector=retail' },
          ],
        },
        {
          title: 'Featured work',
          links: [
            { label: 'Contemporary Retreat', href: '/project/contemporary-retreat' },
            { label: 'Modern Facade Study', href: '/project/modern-facade-study' },
            { label: 'Urban Living Concept', href: '/project/urban-living-concept' },
            { label: 'Concrete Harmony', href: '/project/concrete-harmony' },
          ],
        },
      ],
      feature: {
        title: 'Contemporary Retreat',
        text: 'A 6,400 sq ft villa in DHA Lahore — full turnkey delivery.',
        href: '/project/contemporary-retreat',
        image: '/images/mega/mega-project.jpg',
        cta: 'View case study',
      },
    },
  },

  {
    label: 'Journal',
    mega: {
      id: 'mega-journal',
      layout: '3',
      columns: [
        {
          title: 'Blog layouts',
          links: [
            { label: 'Journal One — Magazine', href: '/blog-one' },
            { label: 'Journal Two — Grid', href: '/blog-two' },
            { label: 'Journal Three — List', href: '/blog-three' },
            { label: 'All articles', href: '/journal' },
          ],
        },
        {
          title: 'Topics',
          links: [
            { label: 'Design thinking', href: '/journal?topic=design' },
            { label: 'Materials', href: '/journal?topic=materials' },
            { label: 'Cost & budgeting', href: '/journal?topic=cost' },
            { label: 'Site diaries', href: '/journal?topic=site' },
          ],
        },
        {
          title: 'Most read',
          links: [
            { label: 'What an interior project really costs in Pakistan', href: '/blog/interior-cost-pakistan' },
            { label: 'Seven mistakes to avoid before you sign a fit-out contract', href: '/blog/fitout-contract-mistakes' },
            { label: 'Choosing countertops that survive a Pakistani kitchen', href: '/blog/countertop-guide' },
          ],
        },
      ],
      feature: {
        title: 'The Woodex Journal',
        text: 'Practical guidance on designing and building interiors in Pakistan.',
        href: '/journal',
        image: '/images/mega/mega-journal.jpg',
        cta: 'Read the journal',
      },
    },
  },

  {
    label: 'Contact',
    mega: {
      id: 'mega-contact',
      layout: '2',
      columns: [
        {
          title: 'Contact layouts',
          links: [
            { label: 'Contact One — Form', href: '/contact-one' },
            { label: 'Contact Two — Book a call', href: '/contact-two' },
            { label: 'Contact Three — Studios', href: '/contact-three' },
            { label: 'Thank you page', href: '/thank-you' },
          ],
        },
        {
          title: 'Direct lines',
          links: [
            { label: 'hello@woodexinterior.com', href: 'mailto:hello@woodexinterior.com' },
            { label: 'projects@woodexinterior.com', href: 'mailto:projects@woodexinterior.com' },
            { label: 'WhatsApp us', href: '/contact-two' },
            { label: 'Request a quote', href: '/pricing-one' },
          ],
        },
      ],
      feature: {
        title: 'Talk to a designer',
        text: 'Mon–Sat, 10:00–19:00 PKT. Real humans, one business day.',
        href: '/contact-three',
        image: '/images/mega/mega-contact.jpg',
        cta: 'Get in touch',
      },
    },
  },
];

/** Footer link columns. */
export const footerNav = [
  {
    title: 'Studio',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Our process', href: '/process' },
      { label: 'Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Awards & press', href: '/awards' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Portfolio', href: '/portfolio-one' },
      { label: 'Services', href: '/service' },
      { label: 'Pricing', href: '/pricing-one' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Materials', href: '/materials' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Journal', href: '/journal' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Style guide', href: '/style-guide' },
      { label: 'Animation guide', href: '/instructions' },
      { label: 'Licence', href: '/license' },
    ],
  },
];

/** Legal links in the footer bottom bar. */
export const legalNav = [
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Terms of service', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Sitemap', href: '/sitemap.xml' },
];

export const announcementBar = {
  enabled: true,
  text: 'Now booking interior projects for Q1 2027 —',
  linkLabel: 'reserve a consultation slot',
  href: '/contact-two',
};

export default primaryNav;
