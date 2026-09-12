/* ==========================================================================
   WOODEX MASTER THEME — render.js
   Shared HTML renderers. Used by theme.js (browser) AND build.mjs (prerender).
   Pure functions: data in → HTML string out. No DOM access here.
   ========================================================================== */
(function (global) {
  'use strict';

  /* ---- utilities ------------------------------------------------------- */

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* Minimal stroke icon set (original artwork) */
  const ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUp: '<path d="M7 17L17 7M9 7h8v8"/>',
    caret: '<path d="M6 9l6 6 6-6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3A19.5 19.5 0 0 1 5.1 13 19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.8.7A2 2 0 0 1 22 16.9z"/>',
    mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M22 6l-10 7L2 6"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    play: '<circle cx="12" cy="12" r="10"/><path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" stroke="none"/>',
    pause: '<circle cx="12" cy="12" r="10"/><path d="M9 8v8M15 8v8"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    quote: '<path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7a3 3 0 0 1-3 3M20 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7a3 3 0 0 1-3 3"/>',
    layers: '<path d="M12 2l10 5.5L12 13 2 7.5z"/><path d="M2 12.5L12 18l10-5.5"/><path d="M2 17.5L12 23l10-5.5"/>',
    home: '<path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/>',
    ruler: '<path d="M2 8h20v8H2z"/><path d="M6 8v4M10 8v4M14 8v4M18 8v4"/>',
    sofa: '<path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M2 13a2 2 0 0 1 4 0v1h12v-1a2 2 0 0 1 4 0v5H2z"/><path d="M4 18v2M20 18v2"/>',
    wood: '<path d="M3 21V3"/><path d="M3 8c4-3 8-3 12 0s6 3 6 3"/><path d="M3 14c4-3 8-3 12 0s6 3 6 3"/>',
    star: '<path d="M12 2l2.9 6.3 6.8.8-5 4.7 1.3 6.7L12 17.2l-6 3.3 1.3-6.7-5-4.7 6.8-.8z" fill="currentColor" stroke="none"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    shield: '<path d="M12 2l8 3.5V11c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5.5z"/><path d="M9 11.5l2 2 4-4"/>',
    truck: '<path d="M1 5h13v11H1z"/><path d="M14 9h4l3 3v4h-7"/><circle cx="6" cy="18.5" r="2"/><circle cx="17" cy="18.5" r="2"/>',
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
    cube: '<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 12l9-5M12 12L3 7M12 12v10"/>'
  };
  const icon = (name, cls) =>
    '<svg class="wx-icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ' +
    'width="1em" height="1em" aria-hidden="true">' + (ICONS[name] || ICONS.arrow) + '</svg>';

  const img = (src, alt, cls, eager) =>
    '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '"' +
    (cls ? ' class="' + esc(cls) + '"' : '') +
    (eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + '>';

  const MEDIA = 'assets/images/';

  /* ---- brand ------------------------------------------------------------ */

  function logoHTML(site) {
    const b = (site && site.brand) || {};
    return '<a class="wx-logo" href="index.html" aria-label="' + esc(b.name || 'Woodex Interior') + ' — home">' +
      '<span class="wx-logo__mark" aria-hidden="true">W</span>' +
      '<span><span class="wx-logo__word">' + esc((b.wordmark || 'WOODEX')) + '</span>' +
      '<span class="wx-logo__kicker">' + esc((b.kicker || 'Interior')) + '</span></span></a>';
  }

  /* ---- header ------------------------------------------------------------
     variant: transparent | light | dark | centered | side                      */

  function megaHTML(nav) {
    const svc = nav.services || {};
    let cols = '';
    ((svc.columns) || []).forEach(function (col) {
      const links = (col.services || []).map(function (s) {
        return '<a class="wx-mega__link" href="service/' + esc(s.slug) + '.html">' +
          '<strong>' + esc(s.title) + '</strong>' + (s.summary ? '<span>' + esc(s.summary) + '</span>' : '') + '</a>';
      }).join('');
      cols += '<div><p class="wx-mega__col-head">' + esc(col.title) + '</p><div class="wx-mega__list">' + links + '</div></div>';
    });

    let feature = '';
    if (svc.feature) {
      const f = svc.feature;
      feature = '<a class="wx-mega__feature" href="' + esc(f.href || 'service/custom-furniture-joinery.html') + '">' +
        '<div class="wx-media">' + img(MEDIA + (f.image || 'craft-detail.jpg'), f.title) + '</div>' +
        '<div class="wx-mega__feature-body"><strong>' + esc(f.title) + '</strong><p>' + esc(f.text) + '</p></div></a>';
    }

    const asideLinks = (svc.asideLinks || []).map(function (l) {
      return '<a class="wx-link" href="' + esc(l.href) + '">' + esc(l.label) + '</a>';
    }).join('');

    return '<div class="wx-mega" role="menu" aria-hidden="true">' +
      '<div class="wx-mega__grid">' +
      '<div class="wx-mega__grid">' + cols + '</div>' +
      feature +
      '<div class="wx-mega__aside">' + asideLinks +
      '<a class="btn" href="contact-one.html"><span>Start a project</span><i class="btn-chip">' + icon('arrow') + '</i></a>' +
      '</div></div></div>';
  }

  function megaPortfolioHTML(nav) {
    const pf = nav.portfolio || {};
    const cards = (pf.cards || []).map(function (c) {
      return '<a class="wx-mega__card" href="project.html?slug=' + esc(c.slug) + '">' +
        '<div class="wx-media wx-media--zoom">' + img(MEDIA + c.image, c.title) + '</div>' +
        '<span>' + esc(c.category) + '</span><strong>' + esc(c.title) + '</strong></a>';
    }).join('');
    const links = (pf.links || []).map(function (l) {
      return '<a class="wx-link" href="' + esc(l.href) + '">' + esc(l.label) + '</a>';
    }).join('');
    return '<div class="wx-mega wx-mega--portfolio" role="menu" aria-hidden="true">' +
      '<div class="wx-mega__grid">' + cards +
      '<div class="wx-mega__aside">' + links +
      '<a class="btn" href="contact-one.html"><span>Start a project</span><i class="btn-chip">' + icon('arrow') + '</i></a></div>' +
      '</div></div>';
  }

  function dropHTML(items) {
    const lis = (items || []).map(function (i) {
      return '<a role="menuitem" href="' + esc(i.href) + '">' +
        (i.image ? img(MEDIA + i.image, i.label) : '') + esc(i.label) + '</a>';
    }).join('');
    return '<div class="wx-drop" role="menu" aria-hidden="true">' + lis + '</div>';
  }

  function navItemHTML(item, currentPath) {
    const current = currentPath === item.href ||
      (item.href !== 'index.html' && currentPath.indexOf(item.match || item.href) === 0);
    let inner = '<a class="wx-nav__link" href="' + esc(item.href) + '"' +
      (current ? ' aria-current="page"' : '') + '>' + esc(item.label);
    let close = '</a>';

    if (item.mega === 'services') {
      inner = '<a class="wx-nav__link" href="' + esc(item.href) + '" aria-haspopup="true" aria-expanded="false">' +
        esc(item.label) + '<svg class="wx-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></a>' + megaHTML(item.nav || {});
      close = '';
    } else if (item.mega === 'portfolio') {
      inner = '<a class="wx-nav__link" href="' + esc(item.href) + '" aria-haspopup="true" aria-expanded="false">' +
        esc(item.label) + '<svg class="wx-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></a>' + megaPortfolioHTML(item.nav || {});
      close = '';
    } else if (item.drop) {
      inner = '<a class="wx-nav__link" href="' + esc(item.href) + '" aria-haspopup="true" aria-expanded="false">' +
        esc(item.label) + '<svg class="wx-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></a>' + dropHTML(item.drop);
      close = '';
    }
    return '<div class="wx-nav__item"' + (current ? ' data-current' : '') + '>' + inner + close + '</div>';
  }

  function drawerHTML(nav, site) {
    const c = (site && site.contact) || {};
    const mains = (nav.main || []).map(function (m) {
      let sub = '';
      if (m.drawer) {
        const groups = m.drawer.map(function (g) {
          const links = (g.links || []).map(function (l) {
            return '<a href="' + esc(l.href) + '">' + esc(l.label) + '</a>';
          }).join('');
          return '<div class="wx-drawer__group"><button type="button" aria-expanded="false">' + esc(g.title) + '</button>' +
            '<div class="wx-drawer__sub">' + links + '</div></div>';
        }).join('');
        sub = '<div>' + groups + '</div>';
      }
      return '<a href="' + esc(m.href) + '">' + esc(m.label) + '</a>' + sub;
    }).join('');
    return '<aside class="wx-drawer" id="wx-drawer" aria-hidden="true">' +
      '<div class="wx-drawer__head">' + logoHTML(site) +
      '<button class="wx-drawer__close" type="button" aria-label="Close menu" data-drawer-close>✕</button></div>' +
      '<nav class="wx-drawer__nav" aria-label="Mobile">' + mains + '</nav>' +
      '<div class="wx-drawer__foot">' +
      (c.phones && c.phones[0] ? '<a href="tel:' + esc(c.phones[0].replace(/[^+\d]/g, '')) + '">' + icon('phone') + ' ' + esc(c.phones[0]) + '</a>' : '') +
      (c.email ? '<a href="mailto:' + esc(c.email) + '">' + icon('mail') + ' ' + esc(c.email) + '</a>' : '') +
      '<a class="btn btn-wood" href="contact-one.html" style="justify-content:center"><span>Start a project</span><i class="btn-chip">' + icon('arrow') + '</i></a>' +
      '</div></aside>';
  }

  function headerHTML(variant, nav, site, currentPath) {
    const c = (site && site.contact) || {};
    const items = (nav.main || []).map(function (i) { return navItemHTML(i, currentPath); }).join('');
    return '<header class="wx-header" data-variant="' + esc(variant) + '">' +
      '<div class="wx-container wx-header__bar">' +
      logoHTML(site) +
      '<nav class="wx-nav" aria-label="Main">' + items + '</nav>' +
      '<div class="wx-header__actions">' +
      (c.phones && c.phones[0] ? '<a class="wx-header__phone" href="tel:' + esc(c.phones[0].replace(/[^+\d]/g, '')) + '">' + esc(c.phones[0]) + '</a>' : '') +
      '<a class="btn btn-sm wx-header__cta" href="contact-one.html"><span>Start a project</span><i class="btn-chip">' + icon('arrow') + '</i></a>' +
      '<button class="wx-burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="wx-drawer"><span></span><span></span><span></span></button>' +
      '</div></div></header>' +
      drawerHTML(nav, site);
  }

  /* ---- footer ----------------------------------------------------------- */

  function footerHTML(variant, nav, site) {
    const c = (site && site.contact) || {};
    const f = (nav && nav.footer) || {};
    const socials = Object.assign({ facebook: '#', instagram: '#', linkedin: '#' }, (site && site.socials) || {});
    const socialHTML = Object.keys(socials).map(function (k) {
      return '<a href="' + esc(socials[k]) + '" aria-label="' + esc(k) + '" target="_blank" rel="noopener">' +
        esc(k.charAt(0).toUpperCase() + k.slice(1, 2)) + '</a>';
    }).join('');

    const col = (title, links) => '<div class="wx-footer__col"><p class="wx-footer__title">' + esc(title) + '</p>' +
      (links || []).map(function (l) { return '<a href="' + esc(l.href) + '">' + esc(l.label) + '</a>'; }).join('') + '</div>';

    let newsBand = '';
    if (variant === 'cta') {
      newsBand = '<div class="wx-container wx-footer__news" data-reveal>' +
        '<div><h3>Design notes, once a month</h3><p class="wx-sub">Materials, before-afters and studio thinking. No spam.</p></div>' +
        '<form class="wx-footer__news-form wx-form" data-form="newsletter" novalidate>' +
        '<input type="email" name="email" placeholder="Your email address" aria-label="Email address" required>' +
        '<button class="btn btn-wood" type="submit"><span>Subscribe</span></button></form></div>';
    }

    let ctaBand = '';
    if (variant === 'classic') {
      ctaBand = '<div class="wx-container wx-footer__cta" data-reveal>' +
        '<div class="wx-footer__cta-body"><p class="wx-eyebrow">' + esc(f.ctaEyebrow || 'Have a space in mind?') + '</p>' +
        '<h2>' + esc(f.ctaTitle || 'Let\u2019s design something that lasts.') + '</h2>' +
        '<p>' + esc(f.ctaText || 'Tell us about your project and we will reply within two working days.') + '</p></div>' +
        '<a class="btn btn-light" href="contact-one.html"><span>' + esc(f.ctaLabel || 'Get in touch') + '</span><i class="btn-chip">' + icon('arrow') + '</i></a></div>';
    }

    return '<footer class="wx-footer" data-variant="' + esc(variant) + '">' + newsBand + ctaBand +
      '<div class="wx-container wx-footer__cols">' +
      '<div class="wx-footer__brand">' + logoHTML(site) +
      '<p>' + esc((site && site.brand && site.brand.about) || '') + '</p>' +
      '<div class="wx-socials">' + socialHTML + '</div></div>' +
      col('Quick links', f.quick || []) +
      col('Services', f.services || []) +
      '<div class="wx-footer__col"><p class="wx-footer__title">Get in touch</p>' +
      '<div class="wx-footer__contact">' +
      (c.address ? '<span>' + icon('pin') + ' ' + esc(c.address) + '</span>' : '') +
      (c.email ? '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>' : '') +
      (c.phones ? '<a href="tel:' + esc(String(c.phones[0]).replace(/[^+\d]/g, '')) + '">' + esc(c.phones[0]) + '</a>' : '') +
      (c.hours ? '<span>' + icon('clock') + ' ' + esc(c.hours) + '</span>' : '') +
      '</div></div></div>' +
      '<div class="wx-container wx-footer__bottom">' +
      '<span>© <span data-year>2026</span> ' + esc((site && site.brand && site.brand.name) || 'Woodex Interior') + '. All rights reserved.</span>' +
      '<nav>' + (f.legal || []).map(function (l) {
        return '<a href="' + esc(l.href) + '">' + esc(l.label) + '</a>';
      }).join('') + '</nav></div>' +
      '<div class="wx-footer__ghost" aria-hidden="true">' + esc((site && site.brand && site.brand.wordmark) || 'WOODEX') + '</div>' +
      '</footer>';
  }

  /* ---- cards ------------------------------------------------------------ */

  function projectCard(p, i) {
    return '<article class="wx-card" data-category="' + esc(p.category) + '" data-reveal data-reveal-delay="' + ((i || 0) % 3) + '">' +
      '<a class="wx-card__media" href="project/' + esc(p.slug) + '.html" aria-label="' + esc(p.title) + '">' +
      img(MEDIA + p.cover, p.title) +
      '<div class="wx-card__overlay"><span class="wx-card__text" style="color:inherit">' + esc(p.meta || p.category) + '</span>' +
      '<span class="btn-chip">' + icon('arrowUp') + '</span></div></a>' +
      '<div class="wx-card__body"><div class="wx-post-card__meta"><span>' + esc(p.category) + '</span><i aria-hidden="true"></i><time>' + esc(p.year) + '</time></div>' +
      '<h3 class="wx-card__title"><a href="project/' + esc(p.slug) + '.html">' + esc(p.title) + '</a></h3>' +
      '<p class="wx-card__text">' + esc(p.location) + '</p></div></article>';
  }

  function serviceCard(s, i) {
    return '<a class="wx-service-card" data-category="' + esc(s.group) + '" data-reveal data-reveal-delay="' + ((i || 0) % 3) + '" href="service/' + esc(s.slug) + '.html">' +
      '<span class="wx-service-card__no">' + String((i || 0) + 1).padStart(2, '0') + '</span>' +
      '<span class="wx-service-card__icon">' + icon(s.icon || 'layers') + '</span>' +
      '<h3>' + esc(s.title) + '</h3><p>' + esc(s.summary) + '</p>' +
      '<span class="wx-link">Discover more</span></a>';
  }

  function serviceRow(s, i) {
    return '<a href="service/' + esc(s.slug) + '.html" data-preview="' + esc(MEDIA + s.image) + '">' +
      '<span class="wx-service-links__no">' + String((i || 0) + 1).padStart(2, '0') + '</span>' +
      '<span class="wx-service-links__title">' + esc(s.title) + '</span>' +
      '<span class="wx-service-links__tag">' + esc(s.group) + '</span>' +
      '<span class="wx-service-links__chip">' + icon('arrowUp') + '</span></a>';
  }

  function postCard(a, i) {
    return '<article class="wx-card wx-post-card" data-category="' + esc(a.category) + '" data-reveal data-reveal-delay="' + ((i || 0) % 3) + '">' +
      '<a class="wx-card__media wx-media--zoom" href="blog/' + esc(a.slug) + '.html">' + img(MEDIA + a.cover, a.title) + '</a>' +
      '<div class="wx-card__body">' +
      '<div class="wx-post-card__meta"><span>' + esc(a.category) + '</span><i aria-hidden="true"></i><time>' + esc(a.date) + '</time></div>' +
      '<h3 class="wx-card__title"><a href="blog/' + esc(a.slug) + '.html">' + esc(a.title) + '</a></h3>' +
      '<p class="wx-card__text">' + esc(a.excerpt) + '</p></div></article>';
  }

  function teamCard(t) {
    return '<article class="wx-team-card wx-card" data-reveal>' +
      '<span class="wx-team-card__avatar" aria-hidden="true">' + esc(t.initials) + '</span>' +
      '<div><h3 style="font-size:1.25rem">' + esc(t.name) + '</h3><p class="wx-card__text">' + esc(t.role) + '</p></div></article>';
  }

  function priceCard(t) {
    return '<article class="wx-price-card' + (t.featured ? ' is-featured' : '') + '" data-reveal>' +
      (t.featured ? '<span class="wx-flag">Most chosen</span>' : '') +
      '<p class="wx-eyebrow wx-eyebrow--plain">' + esc(t.name) + '</p>' +
      '<p class="wx-price-card__price"><span data-price-onetime>' + esc(t.price.onetime) + '</span>' +
      '<span data-price-monthly style="display:none">' + esc(t.price.monthly) + '</span>' +
      ' <small>' + esc(t.unit) + '</small></p>' +
      '<p class="wx-card__text">' + esc(t.tagline) + '</p>' +
      '<ul class="wx-price-card__list">' + (t.features || []).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
      '<a class="btn' + (t.featured ? ' btn-wood' : '') + '" href="contact-one.html"><span>' + esc(t.cta || 'Enquire') + '</span><i class="btn-chip">' + icon('arrow') + '</i></a>' +
      '</article>';
  }

  function statHTML(s) {
    return '<div class="wx-stat" data-reveal><span class="wx-counter__value wx-counter" data-counter="' + esc(s.value) + '"' +
      (s.suffix ? ' data-suffix="' + esc(s.suffix) + '"' : '') + '>0</span>' +
      '<span class="wx-stat__label">' + esc(s.label) + '</span>' +
      (s.text ? '<span class="wx-stat__text">' + esc(s.text) + '</span>' : '') + '</div>';
  }

  function faqItem(f) {
    return '<div class="wx-accordion__item"><h3>' +
      '<button class="wx-accordion__btn" type="button" aria-expanded="false">' + esc(f.question) + '<i aria-hidden="true">+</i></button></h3>' +
      '<div class="wx-accordion__panel"><div class="wx-accordion__panel-inner"><p>' + esc(f.answer) + '</p></div></div></div>';
  }

  function testimonialSlide(t) {
    return '<blockquote class="wx-testi__slide"><span class="wx-testi__ava" aria-hidden="true">' + esc(t.initials) + '</span>' +
      '<div><p class="wx-testi__quote">' + esc(t.quote) + '</p>' +
      '<footer class="wx-testi__who"><div><strong>' + esc(t.name) + '</strong>' +
      '<div class="wx-testi__stars" aria-label="' + esc(t.rating) + ' out of 5">' + '★'.repeat(t.rating || 5) + '</div>' +
      '<p class="wx-sub">' + esc(t.role) + (t.project ? ' — ' + esc(t.project) : '') + '</p></div></footer></div></blockquote>';
  }

  /* ---- detail pages ------------------------------------------------------ */

  function projectBody(p, related) {
    const rel = (related || []).map(projectCard).join('');
    return '' +
      '<!-- S14 · PROJECT DETAIL -->\n' +
      '<section class="wx-section wx-light"><div class="wx-container">' +
      '<div class="wx-project-layout">' +
      '<div style="display:grid;gap:var(--wx-space-7)">' +
      '<div class="wx-media wx-media--ratio-169" data-reveal="mask">' + img(MEDIA + p.gallery[0], p.title, '', true) + '</div>' +
      '<div class="wx-project-meta">' +
      ['services', 'type', 'date', 'client'].map(function (k) {
        return '<div><dt>' + esc(p.detail[k] ? p.detail[k][0] : k) + '</dt><dd>' + esc(p.detail[k] ? p.detail[k][1] : '') + '</dd></div>';
      }).join('') +
      '</div>' +
      '<div class="wx-rich" style="max-width:none">' +
      '<h2>' + esc(p.overviewTitle || 'About this project') + '</h2>' +
      p.overview.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
      '</div>' +
      '<div class="wx-gallery">' +
      p.gallery.slice(1).map(function (g) { return '<div class="wx-media" data-reveal="mask">' + img(MEDIA + g, p.title + ' — detail') + '</div>'; }).join('') +
      '</div></div>' +
      '<aside class="wx-project-aside" data-reveal="right"><h3>Project files</h3><ul>' +
      (p.files || []).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') +
      '</ul><a class="btn" href="contact-one.html"><span>Start a similar project</span><i class="btn-chip">' + icon('arrow') + '</i></a></aside>' +
      '</div></div></section>' +
      '<section class="wx-section wx-beige-surface"><div class="wx-container">' +
      '<div class="wx-section-head"><div><p class="wx-eyebrow">Keep exploring</p><h2>More projects</h2></div>' +
      '<a class="wx-link" href="portfolio-one.html">All projects</a></div>' +
      '<div class="wx-related">' + rel + '</div></div></section>';
  }

  function serviceBody(s, steps, related) {
    return '' +
      '<section class="wx-section wx-light"><div class="wx-container wx-split">' +
      '<div class="wx-split__media"><div class="wx-media" data-reveal="mask">' + img(MEDIA + s.image, s.title, '', true) + '</div></div>' +
      '<div class="wx-split__body">' +
      '<p class="wx-eyebrow">' + esc(s.group) + '</p><h1>' + esc(s.title) + '</h1>' +
      '<p class="wx-lead">' + esc(s.summary) + '</p>' +
      (s.description || []).map(function (d) { return '<p class="wx-sub">' + esc(d) + '</p>'; }).join('') +
      '<ul class="wx-intro__checks">' + (s.deliverables || []).slice(0, 5).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' +
      '<div style="display:flex;gap:var(--wx-space-4);flex-wrap:wrap;align-items:center">' +
      '<a class="btn" href="contact-one.html"><span>Book a consultation</span><i class="btn-chip">' + icon('arrow') + '</i></a>' +
      '<span class="wx-meta">From ' + esc(s.price.from) + ' ' + esc(s.price.unit) + '</span></div>' +
      '</div></div></section>' +
      '<section class="wx-section wx-beige-surface"><div class="wx-container">' +
      '<div class="wx-section-head"><div><p class="wx-eyebrow">How it runs</p><h2>From first call to final detail</h2></div></div>' +
      '<div class="wx-process">' + (steps || []).map(function (st, i) {
        return '<div class="wx-process__step" data-reveal data-reveal-delay="' + i + '">' +
          '<span class="wx-process__no">' + String(st.number).padStart(2, '0') + '</span><h3>' + esc(st.title) + '</h3>' +
          '<p>' + esc(st.text) + '</p><span class="wx-process__time">' + esc(st.duration) + '</span></div>';
      }).join('') + '</div></div></section>' +
      '<section class="wx-section wx-light"><div class="wx-container">' +
      '<div class="wx-section-head"><div><p class="wx-eyebrow">Related work</p><h2>' + esc(s.title) + ' in real spaces</h2></div>' +
      '<a class="wx-link" href="portfolio-one.html">All projects</a></div>' +
      '<div class="wx-related">' + (related || []).map(projectCard).join('') + '</div></div></section>';
  }

  function postBody(a, related) {
    const rich = (a.body || []).map(function (b) {
      if (b.type === 'h3') return '<h3>' + esc(b.text) + '</h3>';
      if (b.type === 'quote') return '<blockquote>' + esc(b.text) + '</blockquote>';
      if (b.type === 'list') return '<ul>' + b.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
      if (b.type === 'figure') return '<figure><div class="wx-media">' + img(MEDIA + b.image, b.caption || '') + '</div><figcaption>' + esc(b.caption || '') + '</figcaption></figure>';
      return '<p>' + esc(b.text) + '</p>';
    }).join('');
    const rel = (related || []).map(postCard).join('');
    return '' +
      '<!-- S31 · RICH TEXT -->\n' +
      '<section class="wx-section wx-light"><div class="wx-container">' +
      '<div class="wx-media wx-media--ratio-169" data-reveal="mask">' + img(MEDIA + a.cover, a.title, '', true) + '</div>' +
      '<div class="wx-contact-split" style="margin-top:var(--wx-space-8)">' +
      '<aside class="wx-project-aside" data-reveal="left"><h3>' + esc(a.author.name) + '</h3><p class="wx-sub">' + esc(a.author.role) + '</p>' +
      '<p class="wx-sub">' + esc(a.date) + ' · ' + esc(a.readTime) + '</p></aside>' +
      '<article class="wx-rich" data-reveal>' + rich + '</article>' +
      '</div></div></section>' +
      '<!-- S33 · RELATED -->\n' +
      '<section class="wx-section wx-beige-surface"><div class="wx-container">' +
      '<div class="wx-section-head"><div><p class="wx-eyebrow">Keep reading</p><h2>More journal</h2></div>' +
      '<a class="wx-link" href="blog-one.html">All articles</a></div>' +
      '<div class="wx-related">' + rel + '</div></div></section>';
  }

  /* ---- page shell (used by build.mjs prerender) -------------------------- */

  function headHTML(o) {
    return '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<title>' + esc(o.title) + '</title>' +
      '<meta name="description" content="' + esc(o.description || '') + '">' +
      (o.canonical ? '<link rel="canonical" href="' + esc(o.canonical) + '">' : '') +
      '<link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml">' +
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
      '<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">' +
      '<link rel="stylesheet" href="assets/css/theme.css">';
  }

  function pageShell(o) {
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' + headHTML(o) + '\n</head>\n' +
      '<body data-header="' + esc(o.headerVariant || 'light') + '" data-footer="' + esc(o.footerVariant || 'classic') + '"' +
      (o.bodyClass ? ' class="' + esc(o.bodyClass) + '"' : '') + '>\n' +
      '<a class="wx-skip" href="#main">Skip to content</a>\n' +
      '<div class="wx-progress" aria-hidden="true"></div>\n' +
      '<div class="wx-page">\n<main id="main">\n' + (o.body || '') + '\n</main>\n</div>\n' +
      '<script src="assets/js/render.js"><\/script>\n<script src="assets/js/theme.js"><\/script>\n' +
      '</body>\n</html>';
  }

  const Render = {
    esc: esc, icon: icon, img: img, MEDIA: MEDIA,
    logoHTML: logoHTML, headerHTML: headerHTML, footerHTML: footerHTML,
    projectCard: projectCard, serviceCard: serviceCard, serviceRow: serviceRow,
    postCard: postCard, teamCard: teamCard, priceCard: priceCard, statHTML: statHTML,
    faqItem: faqItem, testimonialSlide: testimonialSlide,
    projectBody: projectBody, serviceBody: serviceBody, postBody: postBody,
    headHTML: headHTML, pageShell: pageShell
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = Render;
  global.WoodexRender = Render;
})(typeof window !== 'undefined' ? window : globalThis);
