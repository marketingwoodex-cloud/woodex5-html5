# QA checklist

Run before every handover or deploy.

## Automated

```bash
npm run images     # placeholders + resolver map regenerate cleanly
npm run build      # must finish 0 errors, 0 warnings, ~72 pages
npm run check      # astro check — prop and type errors
npm run templates  # template library regenerates
```

## Route coverage

Every route must return 200 and render real content — no `undefined`, no empty
section, no placeholder heading.

| Group | Routes |
| --- | --- |
| Homepages | `/home-one` `/home-two` `/home-three` |
| Studio | `/about` `/process` `/team` `/careers` `/awards` `/clients` `/materials` `/sustainability` |
| Services | `/service` + 17 `/services/<slug>` |
| Portfolio | `/portfolio` `/portfolio-one` `/portfolio-two` `/portfolio-three` + 9 `/project/<slug>` |
| Journal | `/journal` `/blog-one` `/blog-two` `/blog-three` + 9 `/blog/<slug>` |
| Convert | `/pricing-one` `/contact-one` `/contact-two` `/contact-three` `/search` `/thank-you` |
| Utility | `/style-guide` `/instructions` `/license` `/changelog` `/privacy` `/terms` `/accessibility` `/404` |
| Endpoints | `/sitemap.xml` `/robots.txt` `/rss.xml` `/manifest.webmanifest` |

## Manual pass

**Keyboard only** (no mouse):
- Skip link appears first and jumps to `#main`.
- Mega menu: Tab into it, Enter/Space opens, arrow keys move, Escape closes and
  focus returns to the trigger.
- Drawer: focus is trapped, Escape closes, focus returns.
- Accordions, tabs and sliders all operate; the before/after slider moves with
  arrow keys.
- Gallery lightbox: Enter opens, ←/→ navigate, Escape closes.
- Every control shows a visible focus indicator.

**Reduced motion**: enable the OS setting — content must be visible immediately,
nothing may animate, marquees must be static.

**JavaScript disabled**: all content readable, navigation usable, forms
submittable.

**Responsive**: 375 / 414 / 768 / 1024 / 1440 / 1920 px, no horizontal scroll,
tap targets ≥ 44 px, mega menu degrades to the drawer.

**Imagery**: no broken images anywhere. Placeholder SVGs are acceptable pre-launch
but must be replaced with real photography before go-live (`data-placeholder="true"`
in the markup marks a substitution).

**Forms**: required fields validate, invalid submits show the error state, double
submits are blocked, success routes to `/thank-you`.

**Content**: prices, areas, durations and warranty terms match the business;
no placeholder copy ("lorem", "example.com", "Your Name") remains.

## Lighthouse targets

| Category | Target |
| --- | --- |
| Performance | ≥ 95 |
| Accessibility | ≥ 95 |
| Best practices | ≥ 95 |
| SEO | ≥ 95 |

## Known acceptable warnings

- Astro may report that a static endpoint is rendered on demand (`λ`) for
  `robots.txt`, `sitemap.xml` and `rss.xml` — expected for endpoints, and the
  output is written to `dist/` at build time.
