/* ==========================================================================
   WOODEX MASTER THEME · js/util.js
   Shared helpers. Loaded first. Exposes: window.Woodex.util
   ========================================================================== */
(function (W) {
  'use strict';

  var doc = document, win = window;

  /* Progressive enhancement flag — CSS hides [data-reveal] only when present */
  doc.documentElement.classList.remove('no-js');
  doc.documentElement.classList.add('js');

  var util = {
    /* ---------- DOM ---------- */
    q: function (sel, ctx) { return (ctx || doc).querySelector(sel); },
    qa: function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); },
    on: function (el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt || false); return el; },
    onAll: function (list, ev, fn, opt) { Array.prototype.forEach.call(list, function (el) { util.on(el, ev, fn, opt); }); },
    delegate: function (root, sel, ev, fn) {
      util.on(root, ev, function (e) {
        var t = e.target.closest ? e.target.closest(sel) : null;
        if (t && root.contains(t)) fn.call(t, e, t);
      });
    },
    create: function (tag, cls, html) {
      var el = doc.createElement(tag);
      if (cls) el.className = cls;
      if (html != null) el.innerHTML = html;
      return el;
    },
    attr: function (el, name, fallback) {
      var v = el && el.getAttribute(name);
      return v == null ? fallback : v;
    },

    /* ---------- Numbers / strings ---------- */
    clamp: function (v, min, max) { return Math.min(Math.max(v, min), max); },
    lerp: function (a, b, t) { return a + (b - a) * t; },
    rand: function (min, max) { return Math.random() * (max - min) + min; },
    pad: function (n, len) { return String(n).padStart(len || 2, '0'); },
    slug: function (s) {
      return String(s).toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    },
    escapeHTML: function (s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    /* {{token}} interpolation — the same syntax the build script uses */
    tpl: function (str, data) {
      return String(str).replace(/\{\{\s*([\w.[\]]+)\s*\}\}/g, function (_, path) {
        return util.get(data, path) != null ? util.get(data, path) : '';
      });
    },
    get: function (obj, path) {
      return String(path).split('.').reduce(function (o, k) {
        return o == null ? o : o[k];
      }, obj);
    },

    /* ---------- Viewport / motion ---------- */
    vw: function () { return win.innerWidth; },
    vh: function () { return win.innerHeight; },
    /* True when the visitor asked for reduced motion, or when the document
       explicitly opts out via data-motion="off" on <html>. Every motion module
       routes through this, so that one attribute is a global kill switch. */
    reduced: function () {
      if (doc.documentElement.getAttribute('data-motion') === 'off') return true;
      return win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    coarse: function () {
      return win.matchMedia && win.matchMedia('(hover: none), (pointer: coarse)').matches;
    },
    isMobile: function () { return util.vw() <= 900; },

    /* ---------- rAF helpers ---------- */
    rafThrottle: function (fn) {
      var ticking = false, lastArgs;
      return function () {
        lastArgs = arguments;
        if (ticking) return;
        ticking = true;
        win.requestAnimationFrame(function () {
          ticking = false;
          fn.apply(null, lastArgs);
        });
      };
    },
    /* Shared single scroll-rAF loop — every scroll consumer registers here */
    _scrollCbs: [],
    _scrollBound: false,
    onScroll: function (fn, opts) {
      util._scrollCbs.push({ fn: fn, passive: true });
      if (!util._scrollBound) {
        util._scrollBound = true;
        var run = util.rafThrottle(function () {
          var y = win.scrollY || doc.documentElement.scrollTop;
          var h = doc.documentElement.scrollHeight - win.innerHeight;
          var state = {
            y: y,
            progress: h > 0 ? util.clamp(y / h, 0, 1) : 0,
            vh: win.innerHeight,
            vw: win.innerWidth,
            dir: y > (run._last || 0) ? 1 : -1
          };
          run._last = y;
          util._scrollCbs.forEach(function (cb) { cb.fn(state); });
        });
        win.addEventListener('scroll', run, { passive: true });
        win.addEventListener('resize', run, { passive: true });
        run();
      }
      return fn;
    },

    /* ---------- IntersectionObserver factory ---------- */
    observe: function (els, cb, opts) {
      if (!els || !els.length) return null;
      if (!('IntersectionObserver' in win)) {
        Array.prototype.forEach.call(els, function (el) { cb({ target: el, isIntersecting: true, ratio: 1 }); });
        return null;
      }
      var o = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            cb(e);
            if (!opts || opts.once !== false) o.unobserve(e.target);
          } else if (opts && opts.once === false) {
            cb(e);
          }
        });
      }, {
        threshold: (opts && opts.threshold) != null ? opts.threshold : 0.14,
        rootMargin: (opts && opts.rootMargin) || '0px 0px -8% 0px'
      });
      Array.prototype.forEach.call(els, function (el) { o.observe(el); });
      return o;
    },

    /* Mark element(s) as entered — adds .is-in */
    markIn: function (root) {
      var els = util.qa('[data-reveal], [data-split], [data-count], .s-stats__item, .timeline__item, [data-in]', root || doc);
      util.observe(els, function (e) { e.target.classList.add('is-in'); }, { threshold: 0.1 });
    },

    /* ---------- Storage (safe in private mode) ---------- */
    store: {
      get: function (k, dflt) {
        try { var v = win.localStorage.getItem(k); return v == null ? dflt : JSON.parse(v); }
        catch (e) { return dflt; }
      },
      set: function (k, v) {
        try { win.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* noop */ }
      }
    },

    /* ---------- Misc ---------- */
    debounce: function (fn, ms) {
      var t; return function () {
        var a = arguments, c = this;
        clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms || 180);
      };
    },
    scrollTo: function (target, offset) {
      var el = typeof target === 'string' ? util.q(target) : target;
      if (!el) return;
      var top = el.getBoundingClientRect().top + win.scrollY - (offset != null ? offset : 0);
      win.scrollTo({ top: top, behavior: util.reduced() ? 'auto' : 'smooth' });
    },
    ready: function (fn) {
      if (doc.readyState !== 'loading') fn();
      else doc.addEventListener('DOMContentLoaded', fn);
    },
    /* Simple event bus so modules stay decoupled */
    bus: (function () {
      var map = {};
      return {
        on: function (k, fn) { (map[k] = map[k] || []).push(fn); },
        off: function (k, fn) { if (map[k]) map[k] = map[k].filter(function (f) { return f !== fn; }); },
        emit: function (k, data) { (map[k] || []).forEach(function (f) { try { f(data); } catch (e) { console.warn(e); } }); }
      };
    })(),
    log: function () {
      if (win.location.search.indexOf('debug=1') > -1) console.log.apply(console, ['[Woodex]'].concat([].slice.call(arguments)));
    },

    /* ---------- Imagery placeholders ------------------------------------
       The theme ships with a fixed manifest of image paths. If a file is not
       present yet, the frame should still look intentional rather than broken,
       so we mark the wrapper and let CSS paint a branded placeholder.
       Two passes are needed: a capture-phase error listener for failures that
       happen after this module loads, and a scan for images that already
       finished (or failed) before it did.                                   */
    images: (function () {
      function mark(img) {
        if (!img || img.dataset.phSet === '1') return;
        img.dataset.phSet = '1';
        img.classList.add('is-missing');
        var frame = img.closest('.media, figure, .s-hero-split__media, .pcard__media');
        if (frame) frame.classList.add('media--missing');
        var name = (img.getAttribute('src') || '').split('/').pop();
        if (frame && name) {
          var tag = doc.createElement('span');
          tag.className = 'media__placeholder-label';
          tag.setAttribute('aria-hidden', 'true');
          tag.textContent = name;
          frame.appendChild(tag);
        }
        img.removeAttribute('src');           /* stop the broken-image glyph */
        img.setAttribute('alt', '');          /* decorative once absent     */
      }
      function scan(root) {
        var list = (root || doc).querySelectorAll('img');
        Array.prototype.forEach.call(list, function (img) {
          if (img.complete && img.naturalWidth === 0) mark(img);
        });
      }
      /* capture phase: image error events do not bubble */
      doc.addEventListener('error', function (e) {
        if (e.target && e.target.tagName === 'IMG') mark(e.target);
      }, true);
      if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { scan(); });
      else scan();
      win.addEventListener('load', function () { scan(); });
      return { scan: scan, mark: mark };
    })()
  };

  W.util = util;
  W.bus = util.bus;
})(window.Woodex = window.Woodex || {});
