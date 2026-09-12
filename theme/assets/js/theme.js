/* ==========================================================================
   WOODEX MASTER THEME — theme.js
   The engine. Everything is declarative — pages only carry data- attributes.
   Sections: boot → data load → header/footer inject → nav interactions →
   reveal engine → counters → marquee → accordion → sliders → filters →
   forms → hydration → detail router → misc.
   ========================================================================== */
(function () {
  'use strict';
  var R = window.WoodexRender;
  var doc = document;
  var qs = function (s, p) { return (p || doc).querySelector(s); };
  var qsa = function (s, p) { return Array.prototype.slice.call((p || doc).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- tiny event helpers ---------------------------------------------- */
  function on(el, ev, fn, opt) { el && el.addEventListener(ev, fn, opt || false); }

  /* ======================================================================
     1. DATA LAYER — the frontend API
     ====================================================================== */

  var API = {
    data: {},
    get: function (key) { return API.data[key] || []; },
    find: function (key, match) {
      return API.get(key).filter(function (x) {
        return Object.keys(match).every(function (k) { return x[k] === match[k]; });
      })[0];
    },
    hydrate: hydrate
  };
  window.Woodex = API;

  function loadJSON(name) {
    return fetch('assets/data/' + name + '.json').then(function (r) { return r.json(); });
  }

  /* ======================================================================
     2. HYDRATION — [data-api] elements render from JSON
     ====================================================================== */

  function hydrate() {
    qsa('[data-api]').forEach(function (el) {
      var key = el.getAttribute('data-api');
      var limit = parseInt(el.getAttribute('data-limit') || '0', 10);
      var filter = el.getAttribute('data-filter'); // "key:value"
      var order = el.getAttribute('data-order') || 'default';
      var items = API.get(key).slice();

      if (filter) {
        var parts = filter.split(':');
        items = items.filter(function (x) { return String(x[parts[0]]) === parts[1]; });
      }
      if (order === 'desc') items.reverse();
      if (limit > 0) items = items.slice(0, limit);

      var html = items.map(function (item, i) {
        if (key === 'projects') return R.projectCard(item, i);
        if (key === 'services') return el.hasAttribute('data-rows') ? R.serviceRow(item, i) : R.serviceCard(item, i);
        if (key === 'articles') return R.postCard(item, i);
        if (key === 'team') return R.teamCard(item);
        if (key === 'testimonials') return R.testimonialSlide(item);
        if (key === 'pricing') return R.priceCard(item);
        return '';
      }).join('');
      el.innerHTML = html;
    });
    initReveals();
    initCounters();
    initFilters();
  }

  /* ======================================================================
     3. HEADER / FOOTER INJECTION + NAV
     ====================================================================== */

  /* Detail pages live in project/ service/ blog/ subdirectories — rebase
     root-relative links in the injected chrome so they resolve correctly. */
  var BASE = /\/(project|service|blog)\/[^/]+\.html$/.test(location.pathname) ? '../' : '';
  function rebased(html) {
    if (!BASE) return html;
    return html
      .replace(/(href=")(?!https?:|mailto:|tel:|#|\.\.\/)([^"]*?\.html)/g, '$1' + BASE + '$2')
      .replace(/(src=")(assets\/)/g, '$1' + BASE + '$2');
  }

  function mountChrome(nav, site) {
    var body = doc.body;
    var variant = body.getAttribute('data-header') || 'light';
    var footerVariant = body.getAttribute('data-footer') || 'classic';
    var path = location.pathname.split('/').pop() || 'index.html';

    /* idempotent: prerendered pages already carry skip link + progress bar */
    if (!qs('.wx-header')) {
      body.insertAdjacentHTML('afterbegin',
        (qs('.wx-skip') ? '' : '<a class="wx-skip" href="#main">Skip to content</a>') +
        (qs('.wx-progress') ? '' : '<div class="wx-progress" aria-hidden="true"></div>') +
        rebased(R.headerHTML(variant, nav, site, path)));
    }
    var main = qs('main');
    if (main && !qs('.wx-footer')) {
      main.insertAdjacentHTML('afterend', rebased(R.footerHTML(footerVariant, nav, site)));
    }

    initHeaderState();
    initMegaMenu();
    initDrawer(nav, site);
    initProgress();

    var year = qs('[data-year]');
    year && (year.textContent = new Date().getFullYear());
  }

  function initHeaderState() {
    var header = qs('.wx-header');
    if (!header) return;
    var update = function () { header.classList.toggle('is-scrolled', window.scrollY > 24); };
    on(window, 'scroll', update, { passive: true });
    update();
  }

  function initProgress() {
    var bar = qs('.wx-progress');
    if (!bar) return;
    var update = function () {
      var h = doc.documentElement;
      var p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      bar.style.transform = 'scaleX(' + p + ')';
    };
    on(window, 'scroll', update, { passive: true });
    update();
  }

  function initMegaMenu() {
    var items = qsa('.wx-nav__item');
    var activeItem = null;
    var hideTimer = null;

    function open(item) {
      clearTimeout(hideTimer);
      if (activeItem && activeItem !== item) close(activeItem);
      item.classList.add('is-open');
      var link = qs('.wx-nav__link', item);
      link && link.setAttribute('aria-expanded', 'true');
      activeItem = item;
    }
    function close(item) {
      item.classList.remove('is-open');
      var link = qs('.wx-nav__link', item);
      link && link.setAttribute('aria-expanded', 'false');
      if (activeItem === item) activeItem = null;
    }

    items.forEach(function (item) {
      var link = qs('.wx-nav__link[aria-haspopup]', item);
      if (!link) return;

      on(item, 'mouseenter', function () {
        if (window.matchMedia('(hover:hover) and (min-width:1025px)').matches) open(item);
      });
      on(item, 'mouseleave', function () {
        hideTimer = setTimeout(function () { close(item); }, 140);
      });
      on(link, 'click', function (e) {
        /* first tap on touch opens the menu; desktop follows the link */
        if (!window.matchMedia('(hover:hover) and (min-width:1025px)').matches && !item.classList.contains('is-open')) {
          e.preventDefault();
          open(item);
        }
      });
      on(link, 'keydown', function (e) {
        if (e.key === 'Enter' && e.altKey) { e.preventDefault(); item.classList.contains('is-open') ? close(item) : open(item); }
      });
    });

    on(doc, 'click', function (e) {
      if (activeItem && !activeItem.contains(e.target)) close(activeItem);
    });
    on(doc, 'keydown', function (e) {
      if (e.key === 'Escape' && activeItem) { close(activeItem); var l = qs('.wx-nav__link', activeItem); l && l.focus(); }
    });
  }

  function initDrawer() {
    var drawer = qs('.wx-drawer');
    var burger = qs('.wx-burger');
    if (!drawer || !burger) return;

    function openD() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      doc.body.classList.add('wx-no-scroll');
      var c = qs('[data-drawer-close]', drawer); c && c.focus();
    }
    function closeD() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      doc.body.classList.remove('wx-no-scroll');
    }
    on(burger, 'click', openD);
    on(qs('[data-drawer-close]', drawer), 'click', closeD);
    qsa('a', drawer).forEach(function (a) { on(a, 'click', closeD); });
    on(doc, 'keydown', function (e) { if (e.key === 'Escape') closeD(); });

    qsa('.wx-drawer__group > button', drawer).forEach(function (btn) {
      on(btn, 'click', function () {
        var g = btn.parentElement;
        var open = g.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* ======================================================================
     4. REVEAL ENGINE
     ====================================================================== */

  var revealObserver = null;
  function initReveals() {
    var els = qsa('[data-reveal]:not(.is-visible)');
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            revealObserver.unobserve(en.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    }
    els.forEach(function (el) {
      var d = el.getAttribute('data-reveal-delay');
      if (d !== null) el.style.setProperty('--wx-reveal-delay', d);
      revealObserver.observe(el);
    });
  }

  /* ======================================================================
     5. COUNTERS (odometer roll)
     ====================================================================== */

  function initCounters() {
    var counters = qsa('[data-counter]:not([data-done])');
    if (!counters.length) return;

    function animate(el) {
      var target = parseFloat(el.getAttribute('data-counter')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var dur = 1500;
      var t0 = null;

      if (reduced) { el.textContent = prefix + format(target) + suffix; return; }
      function format(n) { return n >= 1000 ? n.toLocaleString('en-US') : String(Math.round(n)); }
      function frame(t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + format(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (!('IntersectionObserver' in window)) { counters.forEach(function (c) { c.setAttribute('data-done', '1'); animate(c); }); return; }
    var ob = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.setAttribute('data-done', '1'); animate(en.target); ob.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { ob.observe(c); });
  }

  /* ======================================================================
     6. MARQUEE — duplicate track for a seamless loop
     ====================================================================== */

  function initMarquees() {
    qsa('.wx-marquee__track').forEach(function (track) {
      if (track.getAttribute('data-cloned')) return;
      track.setAttribute('data-cloned', '1');
      track.innerHTML += track.innerHTML;
      if (reduced) track.style.animation = 'none';
    });
  }

  /* ======================================================================
     7. ACCORDION
     ====================================================================== */

  function initAccordions() {
    qsa('.wx-accordion').forEach(function (acc) {
      var items = qsa('.wx-accordion__item', acc);
      items.forEach(function (item) {
        var btn = qs('.wx-accordion__btn', item);
        on(btn, 'click', function () {
          var wasOpen = item.classList.contains('is-open');
          if (!acc.hasAttribute('data-multi')) {
            items.forEach(function (i) {
              i.classList.remove('is-open');
              var b = qs('.wx-accordion__btn', i);
              b && b.setAttribute('aria-expanded', 'false');
            });
          }
          item.classList.toggle('is-open', !wasOpen);
          btn.setAttribute('aria-expanded', String(!wasOpen));
        });
      });
    });
  }

  /* ======================================================================
     8. HERO SLIDERS (S01 hero-slider, S02 hero-showcase) + testimonials
     ====================================================================== */

  function initHeroSlider() {
    var root = qs('.hero-slider');
    if (!root) return;
    var slides = qsa('.hero-slide', root);
    var dots = qsa('.hero-slider__dot', root);
    var cards = qsa('.hero-card', root);
    var bgSrc = root.getAttribute('data-slides');
    var bgs = bgSrc ? JSON.parse(bgSrc) : [];
    var layers = [];
    var front = 0;
    var idx = 0, timer = null, paused = false;
    if (!slides.length) return;

    /* two stacked bg layers for smooth crossfades */
    if (bgs.length) {
      var base = qs('.hero-slider__bg', root);
      for (var i = 0; i < 2; i++) {
        var l = doc.createElement('div');
        l.className = 'hero-slider__bg';
        l.style.backgroundImage = 'url(' + bgs[i % bgs.length] + ')';
        base.parentNode.insertBefore(l, base);
        layers.push(l);
      }
      layers[0].classList.add('is-front');
      base.remove();
    }

    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
      cards.forEach(function (c, i) { c.classList.toggle('is-in', i === idx); });
      if (layers.length && bgs[idx]) {
        var back = 1 - front;
        layers[back].style.backgroundImage = 'url(' + bgs[idx] + ')';
        layers[back].classList.add('is-front');
        layers[front].classList.remove('is-front');
        front = back;
      }
    }
    function play() {
      if (reduced) return;
      stop();
      timer = setInterval(function () {
        if (!paused && doc.visibilityState === 'visible') show(idx + 1);
      }, 6500);
    }
    function stop() { timer && clearInterval(timer); }

    dots.forEach(function (d, i) { on(d, 'click', function () { show(i); play(); }); });
    on(root, 'mouseenter', function () { paused = true; });
    on(root, 'mouseleave', function () { paused = false; });
    show(0); play();
  }

  function initShowcase() {
    var root = qs('.hero-showcase');
    if (!root) return;
    var slides = qsa('.hero-showcase__slide', root);
    var dots = qsa('.hero-showcase .wx-testi__dot', root);
    var prev = qs('[data-showcase-prev]', root);
    var next = qs('[data-showcase-next]', root);
    var idx = 0, timer = null, paused = false;
    if (!slides.length) return;

    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
    }
    function play() {
      if (reduced) return;
      stop();
      timer = setInterval(function () { if (!paused) show(idx + 1); }, 7000);
    }
    function stop() { timer && clearInterval(timer); }

    dots.forEach(function (d, i) { on(d, 'click', function () { show(i); play(); }); });
    on(prev, 'click', function () { show(idx - 1); play(); });
    on(next, 'click', function () { show(idx + 1); play(); });
    on(root, 'mouseenter', function () { paused = true; });
    on(root, 'mouseleave', function () { paused = false; });
    show(0); play();
  }

  function initTestimonials() {
    qsa('.wx-testi').forEach(function (root) {
      var slides = qsa('.wx-testi__slide', root);
      var idx = 0, timer = null;
      if (!slides.length) return;

      /* auto-generate dots if the page did not provide them */
      var dots = qsa('.wx-testi__dot', root);
      if (!dots.length) {
        var ctrl = doc.createElement('div');
        ctrl.className = 'wx-testi__controls';
        slides.forEach(function (s, i) {
          var d = doc.createElement('button');
          d.type = 'button';
          d.className = 'wx-testi__dot';
          d.setAttribute('aria-label', 'Testimonial ' + (i + 1));
          ctrl.appendChild(d);
        });
        root.appendChild(ctrl);
        dots = qsa('.wx-testi__dot', root);
      }
      if (slides.length < 2) { slides[0].classList.add('is-active'); dots[0] && dots[0].classList.add('is-active'); return; }

      function show(n) {
        idx = (n + slides.length) % slides.length;
        slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
        dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
      }
      function play() {
        if (reduced) return;
        stop();
        timer = setInterval(function () { if (doc.visibilityState === 'visible') show(idx + 1); }, 8000);
      }
      function stop() { timer && clearInterval(timer); }
      dots.forEach(function (d, i) { on(d, 'click', function () { show(i); play(); }); });
      show(0); play();
    });
  }

  /* ======================================================================
     9. FILTERS
     ====================================================================== */

  function initFilters() {
    qsa('[data-filters]').forEach(function (bar) {
      var grid = qs(bar.getAttribute('data-filters'));
      if (!grid) return;
      qsa('.wx-chip', bar).forEach(function (chip) {
        on(chip, 'click', function () {
          qsa('.wx-chip', bar).forEach(function (c) { c.classList.remove('is-active'); });
          chip.classList.add('is-active');
          var cat = chip.getAttribute('data-filter-value');
          qsa('[data-category]', grid).forEach(function (card) {
            var show = cat === '*' || card.getAttribute('data-category') === cat;
            card.classList.toggle('is-hidden', !show);
          });
        });
      });
    });
  }

  /* ======================================================================
     10. FORMS
     ====================================================================== */

  function initForms() {
    qsa('form[data-form]').forEach(function (form) {
      on(form, 'submit', function (e) {
        e.preventDefault();
        var status = qs('.wx-form-status', form.parentElement) || qs('.wx-form-status', form);
        var valid = form.checkValidity();
        if (status) {
          status.className = 'wx-form-status ' + (valid ? 'is-success' : 'is-error');
          status.textContent = valid
            ? 'Thank you — your message has been received. We reply within two working days.'
            : 'Please complete the required fields correctly.';
        }
        if (valid) {
          var btn = qs('button[type="submit"]', form);
          if (btn) { btn.disabled = true; setTimeout(function () { btn.disabled = false; }, 4000); }
          form.reset();
        }
      });
    });

    /* pricing billing toggle */
    qsa('[data-billing]').forEach(function (toggle) {
      var scope = toggle.closest('section') || doc;
      qsa('button', toggle).forEach(function (btn) {
        on(btn, 'click', function () {
          qsa('button', toggle).forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          var mode = btn.getAttribute('data-billing');
          qsa('[data-price-onetime]', scope).forEach(function (el) { el.style.display = mode === 'onetime' ? '' : 'none'; });
          qsa('[data-price-monthly]', scope).forEach(function (el) { el.style.display = mode === 'monthly' ? '' : 'none'; });
        });
      });
    });
  }

  /* ======================================================================
     11. SERVICE LINKS — cursor image preview
     ====================================================================== */

  function initCursorPreview() {
    var wrap = qs('.wx-service-links');
    if (!wrap || !window.matchMedia('(hover:hover)').matches) return;
    var preview = doc.createElement('div');
    preview.className = 'wx-service-links__preview';
    preview.innerHTML = '<img alt="" src="">';
    doc.body.appendChild(preview);
    var imgEl = qs('img', preview);

    qsa('a[data-preview]', wrap).forEach(function (a) {
      on(a, 'mouseenter', function () {
        imgEl.src = a.getAttribute('data-preview');
        preview.classList.add('is-visible');
      });
      on(a, 'mouseleave', function () { preview.classList.remove('is-visible'); });
    });
    on(wrap, 'mousemove', function (e) {
      preview.style.left = (e.clientX + 28) + 'px';
      preview.style.top = (e.clientY - 90) + 'px';
    });
  }

  /* ======================================================================
     12. PARALLAX
     ====================================================================== */

  function initParallax() {
    var els = qsa('[data-parallax]');
    if (!els.length || reduced) return;
    var ticking = false;
    function update() {
      els.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.12;
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        var offset = (r.top + r.height / 2 - innerHeight / 2) * speed;
        el.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
      });
      ticking = false;
    }
    on(window, 'scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ======================================================================
     13. DETAIL ROUTER — project / service / article pages
     ====================================================================== */

  function slugFromURL() {
    return new URLSearchParams(location.search).get('slug');
  }

  function renderProject(p) {
    var related = API.get('projects').filter(function (x) { return x.slug !== p.slug; }).slice(0, 3);
    doc.title = p.title + ' — Woodex Interior';
    var meta = qs('meta[name="description"]');
    meta && meta.setAttribute('content', p.overview[0].slice(0, 155));

    var hero = qs('[data-detail-hero]');
    hero.innerHTML =
      '<nav class="wx-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a>' +
      '<span aria-hidden="true"></span><a href="portfolio-one.html">Portfolio</a>' +
      '<span aria-hidden="true"></span><a href="project.html?slug=' + p.slug + '" aria-current="page">' + p.title + '</a></nav>' +
      '<h1>' + p.title + '</h1><p class="wx-lead">' + esc0(p.tagline) + '</p>';
    var body = qs('[data-detail-body]');
    body.innerHTML = R.projectBody(p, related);
    afterDetailRender();
  }

  function renderService(s) {
    var related = API.get('projects').filter(function (x) {
      return (s.relatedProjects || []).indexOf(x.slug) > -1;
    });
    if (!related.length) related = API.get('projects').slice(0, 3);
    doc.title = s.title + ' — Woodex Interior';
    var meta = qs('meta[name="description"]');
    meta && meta.setAttribute('content', s.summary);

    var hero = qs('[data-detail-hero]');
    hero.innerHTML =
      '<nav class="wx-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a>' +
      '<span aria-hidden="true"></span><a href="services.html">Services</a>' +
      '<span aria-hidden="true"></span><a href="service-detail.html?slug=' + s.slug + '" aria-current="page">' + s.title + '</a></nav>' +
      '<p class="wx-eyebrow">' + s.group + '</p><h1>' + s.title + '</h1><p class="wx-lead">' + s.summary + '</p>';
    var body = qs('[data-detail-body]');
    body.innerHTML = R.serviceBody(s, API.get('process'), related);
    afterDetailRender();
  }

  function renderArticle(a) {
    var related = API.get('articles').filter(function (x) { return x.slug !== a.slug; }).slice(0, 3);
    doc.title = a.title + ' — Woodex Journal';
    var meta = qs('meta[name="description"]');
    meta && meta.setAttribute('content', a.excerpt);

    var hero = qs('[data-detail-hero]');
    hero.innerHTML =
      '<nav class="wx-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a>' +
      '<span aria-hidden="true"></span><a href="blog-one.html">Journal</a>' +
      '<span aria-hidden="true"></span><a href="blog-post.html?slug=' + a.slug + '" aria-current="page">Article</a></nav>' +
      '<p class="wx-eyebrow">' + a.category + '</p><h1>' + a.title + '</h1>' +
      '<p class="wx-lead">' + a.excerpt + '</p>';
    var body = qs('[data-detail-body]');
    body.innerHTML = R.postBody(a, related);
    afterDetailRender();
  }

  function esc0(s) { return String(s == null ? '' : s); }

  function afterDetailRender() {
    initReveals(); initCounters(); initAccordions(); initForms(); initMarquees();
  }

  function routeDetail() {
    var kind = doc.body.getAttribute('data-detail');
    if (!kind) return;
    var slug = slugFromURL();
    var key = kind === 'project' ? 'projects' : kind === 'service' ? 'services' : 'articles';
    var item = slug ? API.find(key, { slug: slug }) : API.get(key)[0];

    if (!item) {
      var hero = qs('[data-detail-hero]');
      var body = qs('[data-detail-body]');
      hero && (hero.innerHTML = '<h1>Not found</h1><p class="wx-lead">This page does not exist.</p>');
      body && (body.innerHTML = '<section class="wx-section wx-light"><div class="wx-container"><a class="btn" href="index.html"><span>Back home</span><i class="btn-chip">' + R.icon('arrow') + '</i></a></div></section>');
      return;
    }
    if (kind === 'project') renderProject(item);
    if (kind === 'service') renderService(item);
    if (kind === 'article') renderArticle(item);
  }

  /* ======================================================================
     14. BOOT
     ====================================================================== */

  function initInteractions() {
    initReveals();
    initCounters();
    initMarquees();
    initAccordions();
    initHeroSlider();
    initShowcase();
    initTestimonials();
    initFilters();
    initForms();
    initCursorPreview();
    initParallax();
  }

  function boot() {
    var requests = ['site', 'navigation', 'services', 'projects', 'articles', 'testimonials', 'pricing', 'faqs', 'team', 'process'];
    Promise.all(requests.map(loadJSON)).then(function (results) {
      requests.forEach(function (name, i) { API.data[name] = results[i]; });

      mountChrome(API.data.navigation, API.data.site);
      hydrate();
      initInteractions();
      routeDetail();
    }).catch(function (err) {
      console.warn('[Woodex] Data failed to load — static content still works.', err);
      initInteractions();
    });
  }

  if (doc.readyState === 'loading') on(doc, 'DOMContentLoaded', boot);
  else boot();
})();
