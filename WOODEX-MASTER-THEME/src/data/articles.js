/* ============================================================================
   JOURNAL / BLOG DATA
   Drives blog-one (magazine), blog-two (grid), blog-three (list),
   the homepage journal reel, and every /blog/<slug> article page.
   ========================================================================= */

export const topics = [
  { id: 'design', label: 'Design thinking' },
  { id: 'materials', label: 'Materials' },
  { id: 'cost', label: 'Cost & budgeting' },
  { id: 'site', label: 'Site diaries' },
  { id: 'trends', label: 'Trends' },
];

export const articles = [
  {
    slug: 'interior-cost-pakistan',
    title: 'What an interior project actually costs in Pakistan',
    topic: 'cost',
    excerpt:
      'Contractor rates vary by a factor of four. Here is what drives the number, and where you should never save money.',
    cover: '/images/journal/interior-cost-cover.jpg',
    author: 'Usman Sheikh',
    authorRole: 'Founding Partner',
    date: '2026-08-18',
    readingTime: 11,
    featured: true,
    tags: ['Budget', 'Fit-out', 'Planning'],
    body: [
      { type: 'p', text: 'Every week we receive a brief that includes a target budget which is either wildly optimistic or quietly enormous. Neither is useful, because neither is grounded in what the work actually involves. So let us break the number down properly.' },
      { type: 'h2', text: 'The four cost bands' },
      { type: 'p', text: 'In the Pakistani market, delivered interior work generally falls into four bands. Basic, mid-market, premium and bespoke. The gaps between them are not marketing — they reflect genuinely different materials, tolerances, and levels of supervision.' },
      { type: 'list', items: [
        'Basic — standard board, laminate finishes, factory-standard hardware. Perfectly serviceable for rental property.',
        'Mid-market — veneers and solid surfaces in key areas, branded hardware, proper sealed edges, full drawing set.',
        'Premium — natural stone, engineered timber, imported hardware, shadow-gap detailing, on-site quality control.',
        'Bespoke — one-off joinery, specialist finishes, imported lighting, mock-ups and prototypes before production.',
      ] },
      { type: 'h2', text: 'Where the money actually goes' },
      { type: 'p', text: 'Clients usually assume finishes dominate the budget. They rarely do. On a typical fit-out, joinery is the single largest line item, followed by MEP, then flooring and walls, with decorative finishes last.' },
      { type: 'quote', text: 'If you want to save money, reduce the number of different materials you specify. Complexity, not quality, is what makes projects expensive.' },
      { type: 'h2', text: 'Where not to save' },
      { type: 'list', items: [
        'Waterproofing in wet areas — a failed membrane costs five times what it would have cost to do properly.',
        'Hardware on doors, drawers and shutters — this is what you touch every single day.',
        'Electrical capacity and containment — retrofitting circuits into a finished wall is brutal.',
        'Acoustic separation between bedrooms and bathrooms.',
      ] },
      { type: 'p', text: 'Conversely, you can usually save without lasting regret on decorative ceilings, feature wallpapers, and any finish occupying a surface nobody touches.' },
      { type: 'h2', text: 'How to get a real number' },
      { type: 'p', text: 'Give a designer a measured drawing and a material direction, and ask for a costed specification — not a square-foot rate. A rate is a guess. A costed specification is a plan.' },
    ],
  },
  {
    slug: 'fitout-contract-mistakes',
    title: 'Seven mistakes to avoid before you sign a fit-out contract',
    topic: 'cost',
    excerpt:
      'Most disputes we are asked to resolve trace back to one of these seven clauses or omissions. None of them are difficult to prevent.',
    cover: '/images/journal/fitout-contract-cover.jpg',
    author: 'Fatima Naveed',
    authorRole: 'Contracts Lead',
    date: '2026-07-29',
    readingTime: 9,
    featured: true,
    tags: ['Contracts', 'Risk', 'Delivery'],
    body: [
      { type: 'p', text: 'A fit-out contract does not need to be forty pages. It needs to be clear about scope, time, money and what happens when things change. Most disputes come from one of these seven gaps.' },
      { type: 'list', items: [
        'No drawing register — nobody agrees which revision is being built.',
        'A lump sum with no schedule of rates, so every variation becomes a negotiation.',
        'No programme with named milestones, so delay is invisible until it is fatal.',
        'Silence on who pays for landlord or authority approval delays.',
        'No defects liability period, meaning snags are your problem forever.',
        'No provision for provisional sums on items not yet selected.',
        'Verbal instructions with no written confirmation loop.',
      ] },
      { type: 'h2', text: 'The fix is boring and it works' },
      { type: 'p', text: 'Insist on a drawing register with revision control, a priced schedule of rates, a milestone programme, and a weekly written progress note. That is it. Those four documents prevent almost every argument.' },
      { type: 'quote', text: 'The projects that go smoothly are not the ones with the best contractors. They are the ones with the most boring paperwork.' },
    ],
  },
  {
    slug: 'countertop-guide',
    title: 'Choosing countertops that survive a Pakistani kitchen',
    topic: 'materials',
    excerpt:
      'Marble stains, quartz chips, granite survives everything. A practical comparison based on ten years of callbacks.',
    cover: '/images/journal/countertop-cover.jpg',
    author: 'Usman Sheikh',
    authorRole: 'Founding Partner',
    date: '2026-07-06',
    readingTime: 8,
    featured: true,
    tags: ['Materials', 'Kitchen', 'Durability'],
    body: [
      { type: 'p', text: 'We have replaced more kitchen countertops than any other surface. Not because clients choose badly, but because the wrong information is repeated confidently.' },
      { type: 'h2', text: 'Marble' },
      { type: 'p', text: 'Beautiful, and almost always a mistake in a working kitchen. Acidic ingredients etch it, oil stains it, and no amount of sealing fully prevents either. Use it on a backsplash or a vanity, never around a hob.' },
      { type: 'h2', text: 'Engineered quartz' },
      { type: 'p', text: 'Non-porous and consistent, which makes it excellent for hygiene. But it is resin-bound, so a hot pan will leave a permanent mark and UV exposure can yellow lighter colours near a bright window.' },
      { type: 'h2', text: 'Granite' },
      { type: 'p', text: 'Still the most forgiving surface for a hard-working kitchen. It tolerates heat, takes impact, and if you choose a mid-tone with some movement, it hides the inevitable scratches.' },
      { type: 'h2', text: 'Solid surface' },
      { type: 'p', text: 'The only material that can be sanded back to new after damage. Excellent where a seamless integrated sink is wanted, though it scratches more readily day to day.' },
      { type: 'list', items: [
        'Around a hob: granite or a sintered stone.',
        'In a rental: quartz in a mid or dark tone.',
        'A vanity or display surface: marble is fine and looks best.',
        'Where you want seamless joins: solid surface.',
      ] },
    ],
  },
  {
    slug: 'joinery-detail-matters',
    title: 'Why joinery detail is the difference between good and great interiors',
    topic: 'design',
    excerpt:
      'Shadow gaps, sealed edges and consistent reveals. The unglamorous details that make a room feel expensive.',
    cover: '/images/journal/joinery-detail-cover.jpg',
    author: 'Hira Qureshi',
    authorRole: 'Head of Design',
    date: '2026-06-21',
    readingTime: 7,
    featured: false,
    tags: ['Joinery', 'Detail', 'Craft'],
    body: [
      { type: 'p', text: 'Stand in two rooms with identical budgets and one will feel twice as expensive. The difference is almost never the materials. It is the consistency of the joints.' },
      { type: 'h2', text: 'Reveals must be consistent' },
      { type: 'p', text: 'A 6mm gap is beautiful. A gap that varies between 4mm and 9mm reads as a mistake, because the eye picks up the variance even when it cannot name it.' },
      { type: 'h2', text: 'Edges must be sealed' },
      { type: 'p', text: 'In Pakistani humidity, an unsealed board edge swells within a single monsoon. Every exposed edge should be banded or lipped, including on the parts nobody is supposed to see.' },
      { type: 'h2', text: 'Hardware should disappear' },
      { type: 'p', text: 'Push latches, integrated handles and concealed hinges cost more, but they let the surface do the talking. Visible cheap hardware undoes a lot of expensive material.' },
    ],
  },
  {
    slug: 'open-plan-acoustics',
    title: 'The open-plan office problem nobody budgets for',
    topic: 'design',
    excerpt:
      'Acoustics are the single most common complaint in post-occupancy surveys. They are also the cheapest thing to fix at design stage.',
    cover: '/images/journal/open-plan-acoustics-cover.jpg',
    author: 'Daniyal Ahmed',
    authorRole: 'Workplace Lead',
    date: '2026-05-30',
    readingTime: 9,
    featured: false,
    tags: ['Workplace', 'Acoustics', 'Wellbeing'],
    body: [
      { type: 'p', text: 'Ask any employee in an open-plan office what bothers them and they will not say the desks or the chairs. They will say they cannot hear themselves think.' },
      { type: 'h2', text: 'Sound is a budget line, not a luxury' },
      { type: 'p', text: 'Acoustic treatment typically costs a very small percentage of a fit-out budget. Retrofitting it after handover costs multiples of that, because it involves re-opening ceilings.' },
      { type: 'list', items: [
        'Specify ceiling absorption with a real NRC rating, not just a perforated pattern.',
        'Add sound masking in open zones — it is the highest-return single intervention.',
        'Provide genuinely enclosed focus rooms. Booths without doors do not count.',
        'Separate noisy functions at planning stage, before partitioning is drawn.',
      ] },
      { type: 'quote', text: 'You cannot fix a plan with a product. Zoning first, absorption second, masking third.' },
    ],
  },
  {
    slug: 'site-diary-phase-one',
    title: 'Site diary: fitting out a 240-desk office in eleven weeks',
    topic: 'site',
    excerpt:
      'A week-by-week account of a live workplace project — including the two weeks we nearly lost, and what recovered them.',
    cover: '/images/journal/site-diary-cover.jpg',
    author: 'Usman Sheikh',
    authorRole: 'Founding Partner',
    date: '2026-05-08',
    readingTime: 12,
    featured: false,
    tags: ['Site', 'Programme', 'Workplace'],
    body: [
      { type: 'p', text: 'We do not usually publish live project diaries, but this one is instructive because it nearly went wrong in a completely avoidable way.' },
      { type: 'h2', text: 'Weeks 1–3: strip-out and setting out' },
      { type: 'p', text: 'Strip-out went faster than planned. Setting out revealed a 90mm discrepancy between the landlord drawing and the built structure. We picked it up in week two, which is exactly when you want to find it.' },
      { type: 'h2', text: 'Weeks 4–6: MEP first fix' },
      { type: 'p', text: 'This is where we lost time. The landlord’s chilled-water riser was not commissioned, so our FCU connections could not be pressure tested. We resequenced to push partitioning forward and used the time productively.' },
      { type: 'h2', text: 'Weeks 7–9: partitions, ceilings, second fix' },
      { type: 'p', text: 'Because we had pulled partitioning forward, this stage absorbed the delay cleanly. Second fix ran concurrent with ceiling closure zone by zone.' },
      { type: 'h2', text: 'Weeks 10–11: finishes, furniture, snagging' },
      { type: 'p', text: 'Furniture was installed over a weekend. Snagging ran for three days with a two-person punch team walking the space after every trade had left.' },
      { type: 'quote', text: 'The lesson: resequence early and decisively. A delay absorbed in month one is invisible. The same delay discovered in month two costs you the handover date.' },
    ],
  },
  {
    slug: 'lighting-layers-guide',
    title: 'Lighting in layers: a five-minute guide for homeowners',
    topic: 'design',
    excerpt:
      'Ambient, task, accent, feature, and daylight control. Why a single ceiling light can never make a room feel designed.',
    cover: '/images/journal/lighting-layers-cover.jpg',
    author: 'Hira Qureshi',
    authorRole: 'Head of Design',
    date: '2026-04-15',
    readingTime: 6,
    featured: false,
    tags: ['Lighting', 'Residential', 'Comfort'],
    body: [
      { type: 'p', text: 'Almost every home we visit has the same problem: one light per ceiling, one switch per room, and no way to change the mood after dark.' },
      { type: 'h2', text: 'The four layers' },
      { type: 'list', items: [
        'Ambient — general wash, ideally indirect. Sets the base level.',
        'Task — focused light exactly where you work, read or cook.',
        'Accent — grazing, washing or spotlighting surfaces and objects.',
        'Feature — the statement piece that gives the room its identity.',
      ] },
      { type: 'h2', text: 'Two practical rules' },
      { type: 'p', text: 'First, put everything on dimmers. Second, split the circuits so the layers can be used independently. A room with four layers on one switch is still a room with one light.' },
      { type: 'quote', text: 'If you can see the light source from your seat, the light is in the wrong place.' },
    ],
  },
  {
    slug: 'sustainable-materials-pakistan',
    title: 'Specifying sustainable materials in a hot, humid climate',
    topic: 'materials',
    excerpt:
      'Bamboo, reclaimed timber, low-VOC finishes and local stone — what genuinely works here, and what fails within a year.',
    cover: '/images/journal/sustainable-materials-cover.jpg',
    author: 'Fatima Naveed',
    authorRole: 'Contracts Lead',
    date: '2026-03-27',
    readingTime: 10,
    featured: false,
    tags: ['Sustainability', 'Materials', 'Climate'],
    body: [
      { type: 'p', text: 'Sustainability in interiors is often discussed in European climate terms that do not survive contact with a Lahore summer. Here is what actually holds up.' },
      { type: 'h2', text: 'Works well' },
      { type: 'list', items: [
        'Local stone — low transport footprint and thermally massive when used internally.',
        'Reclaimed hardwood — already acclimatised, and often better seasoned than new stock.',
        'Lime-based plasters — breathable, and they regulate internal humidity.',
        'Low-VOC water-based finishes — better for indoor air than solvent alternatives.',
      ] },
      { type: 'h2', text: 'Fails without careful detailing' },
      { type: 'list', items: [
        'Solid bamboo in wet areas — dimensionally unstable in high humidity.',
        'Unsealed reclaimed timber near external doors — moisture cycling causes movement.',
        'Natural fibre carpets in ground-floor rooms without a vapour barrier.',
      ] },
      { type: 'p', text: 'The honest summary: the material is rarely the problem. The detail around it is.' },
    ],
  },
  {
    slug: 'test-fit-saves-money',
    title: 'Never sign a commercial lease without a test fit',
    topic: 'cost',
    excerpt:
      'A two-week test fit costs a fraction of a month’s rent and routinely prevents seven-figure mistakes.',
    cover: '/images/journal/test-fit-cover.jpg',
    author: 'Daniyal Ahmed',
    authorRole: 'Workplace Lead',
    date: '2026-03-04',
    readingTime: 7,
    featured: false,
    tags: ['Space Planning', 'Commercial', 'Risk'],
    body: [
      { type: 'p', text: 'We are regularly asked to fit out a space that was never going to work, and by then the lease is signed and the deposit is gone.' },
      { type: 'h2', text: 'What a test fit tells you' },
      { type: 'list', items: [
        'Actual capacity — not the density figure from the agent’s brochure.',
        'Whether the core and column positions allow your plan.',
        'Where daylight actually reaches, and where it does not.',
        'What the base build will cost to bring up to standard.',
      ] },
      { type: 'h2', text: 'The economics' },
      { type: 'p', text: 'A test fit study typically costs less than two weeks of rent on a mid-size office. If it stops you signing a lease you cannot use, the return is enormous. If it confirms the space works, you have a head start on design.' },
    ],
  },
];

export const featuredArticles = () => articles.filter((a) => a.featured);
export const getArticle = (slug) => articles.find((a) => a.slug === slug);
export const articlesByTopic = (topic) => articles.filter((a) => a.topic === topic);
export const relatedArticles = (slug, limit = 3) => {
  const current = getArticle(slug);
  if (!current) return articles.slice(0, limit);
  return articles
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const at = a.topic === current.topic ? 1 : 0;
      const bt = b.topic === current.topic ? 1 : 0;
      return bt - at;
    })
    .slice(0, limit);
};

export const formatDate = (iso, locale = 'en-GB') =>
  new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });

export default articles;
