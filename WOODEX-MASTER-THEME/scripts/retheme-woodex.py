#!/usr/bin/env python3
"""One-shot: re-point the theme's design tokens at the Woodex locked palette."""
import sys

ROOT = 'src/styles/tokens.css'
s = open(ROOT).read()

start = s.index("  /* ── 1. BRAND PALETTE")
end = s.index("  /* ── 2. TYPOGRAPHY SCALE")
new = """  /* ── 1. BRAND PALETTE — Woodex locked tokens (DESIGN.md) ───────────────
     Navy family + cream + ink + one wood accent. No other hue enters the
     build. `--wood` is the brand accent: the only warm colour on the site,
     used in small doses for rules, numerals and marks.                       */
  --c-navy:   #0c1628;  /* Navy    — dark surfaces, buttons, dark ground     */
  --c-navy-2: #121e34;  /* Navy 2  — raised panels on dark                   */
  --c-card:   #152033;  /* Card    — cards on dark                           */
  --c-cream:  #f4efe7;  /* Cream   — warm alternate ground, text on navy     */
  --c-ink:    #12151c;  /* Ink     — body text, headlines on light           */
  --c-muted:  #6a6560;  /* Muted   — secondary copy                          */
  --c-wood:   #b8956a;  /* Wood    — THE accent. Rules, numerals, marks      */
  --c-white:  #ffffff;
  --c-black:  #000000;

  /* Alias kept for the section library. */
  --c-blue: var(--c-navy);

  /* ── 1a. DERIVED TINTS ──────────────────────────────────────────────────
     Alpha values, never new hexes. These cover every soft use on the site. */
  --tint-ink-08: rgba(18, 21, 28, 0.08);
  --tint-ink-46: rgba(18, 21, 28, 0.46);
  --tint-ink-62: rgba(18, 21, 28, 0.62);
  --tint-ice-05: rgba(255, 255, 255, 0.05);
  --tint-ice-12: rgba(255, 255, 255, 0.12);
  --tint-ice-50: rgba(255, 255, 255, 0.5);
  --tint-ice-72: rgba(255, 255, 255, 0.72);
  --tint-cream-16: rgba(244, 239, 231, 0.16);
  --tint-cream-50: rgba(244, 239, 231, 0.5);
  --tint-cream-72: rgba(244, 239, 231, 0.72);
  --tint-wood-16: rgba(184, 149, 106, 0.16);
  --tint-wood-28: rgba(184, 149, 106, 0.28);

  /* ── 1b. DEPRECATED ALIASES ─────────────────────────────────────────────
     Kept so older snippets still compile; all resolve into the brand.       */
  --c-jet: var(--c-navy);
  --c-beige: var(--c-cream);
  --c-charcoal: var(--tint-ink-62);
  --c-silver: var(--c-muted);
  --c-light-gray: var(--c-cream);
  --c-deep-gray: var(--tint-ink-08);

  /* ── 1c. SEMANTIC ALIASES ───────────────────────────────────────────────
     What components actually consume. Re-point these to rebrand.            */
  --bg: var(--c-white);
  --bg-soft: var(--c-cream);
  --bg-card: var(--c-white);
  --surface-dark: var(--c-navy);
  --surface-dark-2: var(--c-navy-2);

  --text: var(--c-ink);
  --text-soft: var(--tint-ink-62);
  --text-mute: var(--c-muted);
  --text-invert: var(--c-white);
  --text-invert-soft: var(--tint-ice-72);

  --line: var(--tint-ink-08);
  --line-strong: rgba(18, 21, 28, 0.16);
  --line-invert: var(--tint-ice-12);
  --line-invert-strong: rgba(255, 255, 255, 0.24);

  --accent: var(--c-wood);
  --accent-ink: var(--c-navy);

"""
s = s[:start] + new + s[end:]

# Theme contexts
start = s.index("/* ── DARK SURFACE CONTEXT")
s = s[:start] + """/* ── DARK SURFACE CONTEXT ─────────────────────────────────────────────────
   Navy ground with a real elevation ladder: cards step up to --c-card and
   panels to --c-navy-2, rather than sitting flat on black.                   */
[data-theme='dark'],
.is-dark,
[data-theme='navy'],
[data-theme='blue'] {
  --bg: var(--c-navy);
  --bg-soft: var(--c-navy-2);
  --bg-card: var(--c-card);
  --surface-dark: var(--c-navy);
  --surface-dark-2: var(--c-navy-2);

  --text: var(--c-white);
  --text-soft: var(--tint-ice-72);
  --text-mute: var(--tint-ice-50);
  --text-invert: var(--c-navy);

  --line: var(--tint-ice-12);
  --line-strong: rgba(255, 255, 255, 0.24);
}

/* ── CREAM CONTEXT ────────────────────────────────────────────────────────
   The warm alternate ground, used for editorial pages (body.light-page).     */
[data-theme='cream'],
[data-theme='beige'],
[data-theme='gray'] {
  --bg: var(--c-cream);
  --bg-soft: var(--c-white);
  --bg-card: var(--c-white);
  --surface-dark: var(--c-navy);
  --text: var(--c-ink);
  --text-soft: var(--tint-ink-62);
  --text-mute: var(--c-muted);
  --line: rgba(18, 21, 28, 0.12);
  --line-strong: rgba(18, 21, 28, 0.2);
}

/* ── BLACK CONTEXT ────────────────────────────────────────────────────────
   Reserved for the deepest ground: 404, preloader, image scrims.             */
[data-theme='black'] {
  --bg: var(--c-black);
  --bg-soft: #0a0a0a;
  --bg-card: #111111;
  --text: var(--c-white);
  --text-soft: var(--tint-ice-72);
  --text-mute: var(--tint-ice-50);
  --line: var(--tint-ice-12);
  --line-strong: rgba(255, 255, 255, 0.24);
}
"""
open(ROOT, 'w').write(s)
print('tokens.css → Woodex palette + contexts')

# Fonts: one family (DESIGN.md: "No second typeface")
s = open(ROOT).read()
s = s.replace("""  --ff-display: 'Inter Tight', 'Woodex Display', -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, Arial, sans-serif;
  --ff-body: 'Inter', 'Woodex Sans', -apple-system, BlinkMacSystemFont,
             'Segoe UI', Roboto, Helvetica, Arial, sans-serif;""",
"""  --ff-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, Arial, sans-serif;
  --ff-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont,
             'Segoe UI', Roboto, Helvetica, Arial, sans-serif;""", 1)
s = s.replace("  --ls-display: -0.035em;\n  --ls-heading: -0.02em;",
              "  --ls-display: -0.042em;\n  --ls-heading: -0.028em;", 1)
open(ROOT, 'w').write(s)
print('tokens.css → Plus Jakarta Sans')

# ── site.js ────────────────────────────────────────────────────────────────
P = 'src/data/site.js'
s = open(P).read()
old_fonts = s[s.index('  fonts: {'):s.index("  imageTone: 'cream',")]
new_fonts = """  fonts: {
    enabled: true,
    provider: 'google',
    /* Woodex runs ONE typeface across the whole site — DESIGN.md rules out a
       second family. Weights 300–700, matching the locked reference
       (current weight 500 for display, 400 for body copy). */
    display: 'Plus Jakarta Sans',
    body: 'Plus Jakarta Sans',
    displayWeights: [300, 400, 500, 600, 700],
    bodyWeights: [300, 400, 500, 600, 700],
  },

"""
s = s.replace(old_fonts, new_fonts, 1)

old_pal = s[s.index('  palette: {'):s.index('    // deprecated aliases')]
new_pal = """  palette: {
    navy: '#0c1628',     // primary dark ground, buttons
    navy2: '#121e34',    // raised panels on dark
    card: '#152033',     // cards on dark
    cream: '#f4efe7',    // warm alternate ground
    ink: '#12151c',      // body text
    muted: '#6a6560',    // secondary copy
    wood: '#b8956a',     // THE accent — used sparingly
    white: '#ffffff',
    black: '#000000',
  },
"""
s = s.replace(old_pal, new_pal, 1)
open(P, 'w').write(s)
print('site.js → Woodex palette + fonts')
