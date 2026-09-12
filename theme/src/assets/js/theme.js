/* ==========================================================================
   WOODEX MASTER THEME · js/theme.js  (BOOT / ORCHESTRATOR)
   --------------------------------------------------------------------------
   Loads in order: util.js → api.js → chrome.js → motion.js → sections.js →
   forms.js → theme.js

   This file is the single entry point. It:
     1. boots the content API,
     2. hydrates data-driven slots (nav, footer, counters),
     3. initialises every chrome + motion + section module,
     4. re-initialises new DOM (AJAX/CMS injections) via Woodex.refresh().

   Debug: append ?debug=1 to any URL for console traces.
   ========================================================================== */
(function (W) {
  'use strict';
  var util = W.util, doc = document, win = window;

  var Theme = {
    version: '1.0.0',
    name: 'Woodex Master Theme',

    /* Initialise everything inside a container (defaults to document) */
    init: function (root) {
      root = root || doc;

      /* --- Chrome --- */
      W.Header.init();
      W.Drawer.init();
      W.Progress.init();
      W.Cursor.init();
      W.Anchors.init();
      if (root === doc) { W.Loader.init(); W.Curtain.init(); }

      /* --- Motion --- */
      W.Split.init(root);
      W.Reveal.init(root);
      W.Counters.init(root);
      W.Parallax.init(root);
      W.Marquee.init(root);
      W.Highlight.init(root);
      W.Scrub.init(root);
      W.Magnetic.init();
      W.Tilt.init(root);

      /* --- Sections --- */
      W.Accordion.init(root);
      W.Tabs.init(root);
      W.Deck.init(root);
      W.HeroSplit.init();
      W.Carousel.init(root);
      W.Filter.init(root);
      W.Lightbox.init();
      W.Reel.init(root);
      W.HoverList.init(root);
      W.TOC.init(root);

      /* --- Forms & misc --- */
      W.Forms.init(root);
      W.Newsletter.init(root);
      W.Hours.init(root);
      W.Copy.init(root);
      W.Year.init(root);
      W.Ref.init(root);

      /* --- Page-type hooks --- */
      Theme.pageHooks();

      util.log('theme initialised ·', Theme.version);
      util.bus.emit('theme:ready', root);
    },

    /* Re-scan after dynamic content is injected (CMS preview, AJAX filters) */
    refresh: function (root) {
      util.qa('[data-split-done]', root || doc).forEach(function (el) { el.removeAttribute('data-split-done'); });
      Theme.init(root || doc);
      util.bus.emit('theme:refresh', root);
    },

    /* Per-page extras driven by <body data-page="..."> */
    pageHooks: function () {
      var page = util.attr(doc.body, 'data-page', '');
      doc.documentElement.setAttribute('data-page', page || 'default');

      /* Theme switcher demo (style guide) */
      util.qa('[data-theme-set]').forEach(function (btn) {
        util.on(btn, 'click', function () {
          var t = util.attr(btn, 'data-theme-set', 'canvas');
          var scope = util.attr(btn, 'data-theme-scope', 'body');
          (scope === 'page' ? doc.documentElement : doc.body).setAttribute('data-theme', t);
          util.qa('[data-theme-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
          util.store.set('woodex-theme', t);
        });
      });
      var saved = util.store.get('woodex-theme', null);
      if (saved && util.q('[data-theme-set]')) doc.body.setAttribute('data-theme', saved);

      /* Density + scale demos (instructions page) */
      util.qa('[data-density-set]').forEach(function (btn) {
        util.on(btn, 'click', function () {
          doc.body.setAttribute('data-density', util.attr(btn, 'data-density-set', 'cozy'));
          util.qa('[data-density-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        });
      });

      /* Legal / TOC scroll-spy for in-page navs */
      var spyNav = util.q('.legal-nav');
      if (spyNav) {
        var links = util.qa('a[href^="#"]', spyNav);
        var targets = links.map(function (a) { return util.q(a.getAttribute('href')); }).filter(Boolean);
        util.onScroll(util.rafThrottle(function () {
          var y = win.scrollY + 180, cur = 0;
          targets.forEach(function (t, i) { if (t.offsetTop <= y) cur = i; });
          links.forEach(function (l, i) { l.classList.toggle('is-current', i === cur); });
        }));
      }

      /* Reading time on blog posts */
      util.qa('[data-reading-time]').forEach(function (el) {
        var body = util.q(util.attr(el, 'data-reading-time', '.s-post__body'));
        if (!body) return;
        var words = body.textContent.trim().split(/\s+/).length;
        el.textContent = Math.max(1, Math.round(words / 210)) + ' min read';
      });

      /* Share links on blog posts */
      util.qa('[data-share]').forEach(function (a) {
        util.on(a, 'click', function (e) {
          var net = util.attr(a, 'data-share');
          var url = encodeURIComponent(location.href);
          var title = encodeURIComponent(doc.title);
          var map = {
            twitter: 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title,
            facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
            linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url,
            whatsapp: 'https://wa.me/?text=' + title + '%20' + url,
            copy: null
          };
          if (net === 'copy') {
            e.preventDefault();
            if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { W.Toast.show('Link copied', 'ok', 1800); });
            return;
          }
          if (navigator.share && net === 'native') { e.preventDefault(); navigator.share({ title: doc.title, url: location.href }); return; }
          if (map[net]) { e.preventDefault(); win.open(map[net], '_blank', 'noopener,width=640,height=560'); }
        });
      });

      /* Related posts / next project rendered from JSON when present */
      Theme.dataSlots();
    },

    /* Optional JSON-rendered slots (all no-op if the slot/JSON is missing) */
    dataSlots: function () {
      /* [data-render="projects"] data-limit="6" data-template="#tpl-project" */
      util.qa('[data-render]').forEach(function (slot) {
        var coll = util.attr(slot, 'data-render');
        var limit = parseInt(util.attr(slot, 'data-limit', '0'), 10);
        var tplEl = util.q(util.attr(slot, 'data-template', '#tpl-' + coll));
        if (!tplEl) return;                       /* keep build-time markup */
        var tpl = tplEl.innerHTML;
        W.api.get(coll).then(function (list) {
          if (!Array.isArray(list) || !list.length) return;
          var items = limit ? list.slice(0, limit) : list;
          slot.innerHTML = items.map(function (item) { return util.tpl(tpl, item); }).join('');
          Theme.refresh(slot);
        });
      });

      /* Latest posts strip on service/contact pages */
      var latest = util.q('[data-latest-posts]');
      if (latest) {
        W.api.get('posts').then(function (list) {
          if (!Array.isArray(list) || !list.length) return;
          var n = parseInt(util.attr(latest, 'data-latest-posts', '3'), 10);
          latest.innerHTML = list.slice(0, n).map(function (p) {
            return '<article class="post" data-reveal="up">' +
              '<a class="post__media media" href="' + p.url + '"><img src="' + p.image + '" alt="' + util.escapeHTML(p.title) + '" loading="lazy"></a>' +
              '<div class="post__meta"><span>' + util.escapeHTML(p.category) + '</span><i>·</i><span>' + util.escapeHTML(p.dateLabel || p.date) + '</span></div>' +
              '<a href="' + p.url + '"><h3 class="post__title">' + util.escapeHTML(p.title) + '</h3></a>' +
              '<a class="post__more" href="' + p.url + '">Read story</a></article>';
          }).join('');
          Theme.refresh(latest);
        });
      }
    }
  };

  /* ---------- BOOT SEQUENCE ---------- */
  function boot() {
    /* Start the loader BEFORE waiting on the content API.

       The loader owns the full-screen overlay and the body scroll lock, and its
       safety net is the only thing that guarantees either is released. It used
       to be init-ed inside Theme.init(), which runs only once api.boot()
       settles -- so a stalled JSON fetch left the overlay up, the progress bar
       frozen (its interval lives in Loader.init too) and the page unscrollable
       for as long as api.js takes to abort, which is CONFIG.timeout = 8000ms.

       The home page was the worst hit: it declares seven collections, more than
       any other page, and Promise.all waits on the slowest of them.

       Init-ing it first means the overlay always clears within ~2.2s of
       DOMContentLoaded regardless of what the network does. The API still
       resolves before the rest of the UI inits, so renderers keep their cached
       data. */
    W.Loader.init();
    W.api.boot().then(function () {
      W.api.render(doc);
      Theme.init(doc);
    }).catch(function () {
      Theme.init(doc);
    });
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
  else boot();

  /* bfcache restore: refresh state without a hard reload */
  util.on(win, 'pageshow', function (e) {
    if (e.persisted) {
      doc.body.classList.remove('is-locked', 'drawer-open');
      var d = util.q('.drawer'); if (d) d.classList.remove('is-open');
      var l = util.q('.loader'); if (l) { l.style.display = 'none'; l.classList.add('is-done'); }
    }
  });

  /* Public API for CMS/AJAX integrations */
  W.Theme = Theme;
  W.refresh = Theme.refresh;
})(window.Woodex = window.Woodex || {});
