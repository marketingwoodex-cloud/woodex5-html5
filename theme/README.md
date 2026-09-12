# Woodex Master Theme

Source of truth for the Woodex Interior website. Edit files in `theme/src/`, run
the generator, and the finished site is written to the repository root.

Never hand-edit the generated HTML at the root — it is overwritten on every
build. `docs/design.md` is the full specification; this file is the short path
in.

## Build

```bash
node theme/build.mjs           # writes changed pages to the repo root
node theme/build.mjs --clean   # delete generated output first
node theme/build.mjs --check   # validate only, write nothing
```

Zero dependencies. Node 18 or newer, no install step. The build is
content-hash aware, so an unchanged page is not rewritten.

## Preview

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Serve from the repository root, not from `theme/`, because generated pages use
relative asset paths that assume root depth.

## Layout

```
theme/
├─ build.mjs            the generator
├─ site.config.json     collections, page registry, generated-page rules
├─ build-manifest.json  last build record: pages, collections, include usage
├─ docs/design.md       master PRD — read this before structural changes
└─ src/
   ├─ assets/css/       01-tokens … 09-docs, concatenated in filename order
   ├─ assets/js/        util → api → chrome → motion → sections → forms → theme
   ├─ assets/images/    original imagery and the brand mark
   ├─ data/             content JSON, plus pages/*.json and defaults.json
   ├─ partials/         head, header, drawer, footer, chrome macros
   ├─ sections/         45 reusable section templates
   ├─ pages/            23 page templates and 3 generated-detail templates
   └─ content/posts/    long-form journal article bodies
```

## How a page resolves

1. `site.config.json` lists the page and its output path.
2. Front matter in the page template supplies page-level values.
3. Scope chain, nearest wins: front matter → `src/data/pages/<page>.json` →
   `src/data/defaults.json` → the data collections.
4. `{{> sections/name}}` pulls a section; `{{> sections/name with=key}}` pushes
   extra parameters as a nearer scope.
5. `derive()` in `build.mjs` computes convenience values before rendering —
   URLs, slugs, initials, counts, labels.

Because `defaults.json` covers every scalar parameter, a section always renders
even when a page configures nothing.

## Common tasks

**Change brand colour or type.** `src/assets/css/01-tokens.css`. Every surface
reads from custom properties, so nothing else needs touching.

**Change contact details, address, socials.** `src/data/site.json`.

**Add a service, project or journal post.** Append an object to the matching
file in `src/data/`. Detail pages are generated automatically from the
templates in `src/pages/_templates/`. No page registration needed.

**Rename a slug.** Update it in the data file. Internal links are derived from
slugs, so they follow automatically.

**Add a section.** Create `src/sections/<name>.html` with a single `.s-<name>`
root, drive everything through `{{parameters}}`, prefix paths with `{{base}}`,
and add its parameters to `src/data/defaults.json`.

**Reorder a page.** Page templates are a flat list of `{{> sections/x}}` calls.
Move the lines.

## Template syntax

```
{{value}}                     token from the scope chain
{{item.field}}                current each-item
{{../value}}                  parent scope
{{site.name}}                 top-level collection
{{> partial}}                 include
{{> partial with=key}}        include with extra parameters
{{#each list limit=3}}…{{/each}}
{{#each list where=cat:a,b}}  comma-separated values are OR
{{#if value}}…{{else}}…{{/if}}
{{#unless value}}…{{/unless}}
{{@index}} {{@first}} {{@last}} {{@count}}
```

Blocks nest correctly — an `{{#if}}` inside an `{{#each}}` pairs with its own
close tag. `{{base}}` is computed from output depth, so pages in subdirectories
resolve assets without adjustment.

## Runtime

The browser loads the same JSON the build does, from `/assets/data/`. Content
slots marked `data-render`, `data-nav`, `data-footer-links`, `data-site` and
`data-latest-posts` are populated at runtime, which means an editor can change
a JSON file and see it without a rebuild.

Everything is vanilla JS and CSS. No framework, no CDN, no build step in the
browser.

Page-level configuration lives on `<body>`: `data-page`, `data-theme`
(`canvas | walnut | ink | clay`), `data-density`, `data-api`. Setting
`data-motion="off"` on `<html>` disables all animation.

## Before you finish a change

```bash
node theme/build.mjs --check
```

Expect zero warnings and zero unresolved tokens. Also confirm:

- exactly one `<h1>` per page
- every internal `href` and `src` resolves to a real file
- every JSON-LD block parses
- no `undefined`, `NaN` or `[object Object]` in the output
- every new `data-*` hook has a consumer in JS or CSS

An unconsumed attribute is a broken promise to whoever reads the markup.

## Imagery

All imagery is original work made for this project. Never hotlink or download
assets from another site. The manifest and per-file status live in
`docs/design.md` §12. While a manifest file is absent, the frame renders a
branded placeholder rather than a broken image; dropping in a file with the
right name is the only step needed to replace it.
