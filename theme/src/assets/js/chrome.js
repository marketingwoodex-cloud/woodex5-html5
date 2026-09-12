/* ==========================================================================
   WOODEX MASTER THEME · js/chrome.js
   --------------------------------------------------------------------------
   Site chrome behaviour: page loader, header states, mega menu, mobile
   drawer, scroll progress, back-to-top, custom cursor, curtain transition.
   ========================================================================== */
(function (W) {
  'use strict';
  var util = W.util, doc = document, win = window;

  /* =======================================================================
     1 · PAGE LOADER
     Runs only on first (non-bfcache) load; auto-hides after 2.2s as a
     hard safety net so a slow image can never trap the visitor.
     ===================================================================== */
  var Loader = {
    init: function () {
      var el = util.q('.loader');
      if (!el) { doc.body.classList.remove('is-loading'); return; }
      if (util.reduced() || win.performance && performance.getEntriesByType('navigation')[0] &&
          performance.getEntriesByType('navigation')[0].type === 'back_forward') {
        return Loader.done(el, true);
      }
      doc.body.classList.add('is-loading');
      var bar = util.q('.loader__bar i', el);
      var pct = util.q('.loader__pct', el);
      var p = 0;
      var tick = setInterval(function () {
        p = Math.min(p + util.rand(7, 19), 92);
        if (bar) bar.style.setProperty('--lp', (p / 100).toFixed(3));
        if (pct) pct.textContent = Math.round(p) + '%';
      }, 110);

      var finish = function () {
        clearInterval(tick);
        if (bar) bar.style.setProperty('--lp', 1);
        if (pct) pct.textContent = '100%';
        setTimeout(function () { Loader.done(el); }, 260);
      };
      if (doc.readyState === 'complete') setTimeout(finish, 420);
      else util.on(win, 'load', function () { setTimeout(finish, 320); });
      setTimeout(finish, 2200); /* safety net */
    },
    done: function (el, instant) {
      doc.body.classList.remove('is-loading');
      if (!el) return;
      if (instant) { el.style.display = 'none'; return; }
      el.classList.add('is-done');
      setTimeout(function () { el.style.display = 'none'; }, 900);
      util.bus.emit('loader:done');
      /* Kick entrance animations that wait for the loader */
      util.qa('[data-after-load]').forEach(function (n, i) {
        n.style.transitionDelay = (i * 70) + 'ms';
        setTimeout(function () { n.classList.add('is-in'); }, 60 + i * 70);
      });
    }
  };

  /* =======================================================================
     2 · HEADER — states: is-top / is-stuck / is-hidden
     ===================================================================== */
  var Header = {
    init: function () {
      var h = util.q('.site-header');
      if (!h) return;
      this.el = h;
      var overDark = h.classList.contains('is-top');
      var threshold = util.attr(h, 'data-sticky-offset', 40) | 0;
      var hideOnDown = util.attr(h, 'data-hide-on-scroll', 'true') === 'true';
      var last = 0;

      util.onScroll(function (s) {
        var stuck = s.y > threshold;
        h.classList.toggle('is-stuck', stuck);
        /* Only keep the light-on-dark look while at the very top of a dark hero */
        if (overDark) h.classList.toggle('is-top', !stuck && s.y < 80);
        if (hideOnDown && stuck && s.y > 420) {
          h.classList.toggle('is-hidden', s.dir > 0 && s.y > last + 6);
          if (s.dir < 0) h.classList.remove('is-hidden');
        } else {
          h.classList.remove('is-hidden');
        }
        last = s.y;
      });

      this.megaInit();
      this.activeLink();
    },

    /* Mark the nav link matching the current URL */
    activeLink: function () {
      var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      util.qa('.nav__link[href], .drawer__link[href], .footer-col__links a[href], .mega__link[href]').forEach(function (a) {
        var href = (a.getAttribute('href') || '').toLowerCase();
        if (!href || href.charAt(0) === '#' || /^mailto:|^tel:|^https?:/.test(href)) return;
        var base = href.split('/').pop();
        if (base === path) a.setAttribute('aria-current', 'page');
      });
    },

    /* Mega menu + simple dropdowns: hover on desktop, click/tap everywhere,
       Escape + outside-click to close, focus-trap-light for a11y. */
    megaInit: function () {
      var items = util.qa('.nav__item');
      if (!items.length) return;
      var openItem = null, closeTimer = null;

      function close(item) {
        if (!item) return;
        item.classList.remove('is-open');
        var btn = util.q('[aria-expanded]', item);
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (openItem === item) openItem = null;
      }
      function open(item) {
        if (openItem && openItem !== item) close(openItem);
        item.classList.add('is-open');
        var btn = util.q('[aria-expanded]', item);
        if (btn) btn.setAttribute('aria-expanded', 'true');
        openItem = item;
      }

      items.forEach(function (item) {
        var trigger = util.q('.nav__link', item);
        var panel = util.q('.mega, .dropdown', item);
        if (!trigger || !panel) return;
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-haspopup', 'true');

        /* Pointer devices: hover with a small grace period */
        if (!util.coarse()) {
          util.on(item, 'mouseenter', function () { clearTimeout(closeTimer); open(item); });
          util.on(item, 'mouseleave', function () { closeTimer = setTimeout(function () { close(item); }, 180); });
        }
        /* Touch / keyboard: toggle on click, only when the trigger is a button */
        util.on(trigger, 'click', function (e) {
          if (trigger.tagName === 'BUTTON' || util.coarse()) {
            e.preventDefault();
            item.classList.contains('is-open') ? close(item) : open(item);
          }
        });
        util.on(trigger, 'keydown', function (e) {
          if (e.key === 'ArrowDown') { e.preventDefault(); open(item); var f = util.q('a,button', panel); f && f.focus(); }
        });
        util.on(panel, 'keydown', function (e) {
          if (e.key === 'Escape') { close(item); trigger.focus(); }
        });
      });

      util.on(doc, 'click', function (e) {
        if (openItem && !openItem.contains(e.target)) close(openItem);
      });
      util.on(doc, 'keydown', function (e) { if (e.key === 'Escape' && openItem) close(openItem); });
      util.on(win, 'resize', util.debounce(function () { if (openItem && util.vw() <= 1080) close(openItem); }, 150));
      util.bus.on('nav:rendered', function () { Header.megaInit(); });
    }
  };

  /* =======================================================================
     3 · MOBILE DRAWER
     ===================================================================== */
  var Drawer = {
    init: function () {
      var d = util.q('.drawer'), burger = util.q('.burger'), closeBtn = util.q('.drawer__close');
      if (!d || !burger) return;
      this.el = d;
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-controls', d.id || 'drawer');

      var self = this;
      util.on(burger, 'click', function () { self.toggle(); });
      util.on(closeBtn, 'click', function () { self.close(); });
      util.on(doc, 'keydown', function (e) { if (e.key === 'Escape' && d.classList.contains('is-open')) self.close(); });
      util.onAll(util.qa('a[href]', d), 'click', function () { self.close(); });

      /* Accordion groups inside the drawer */
      util.qa('.drawer__item', d).forEach(function (item) {
        var t = util.q('.drawer__toggle', item);
        if (!t) return;
        t.setAttribute('aria-expanded', 'false');
        util.on(t, 'click', function () {
          var open = item.classList.toggle('is-open');
          t.setAttribute('aria-expanded', String(open));
        });
      });

      util.on(win, 'resize', util.debounce(function () { if (util.vw() > 1080) self.close(); }, 160));
    },
    open: function () {
      if (!this.el) return;
      this.el.classList.add('is-open');
      doc.body.classList.add('drawer-open', 'is-locked');
      util.q('.burger').setAttribute('aria-expanded', 'true');
      var f = util.q('a[href]', this.el); f && setTimeout(function () { f.focus(); }, 320);
      util.bus.emit('drawer:open');
    },
    close: function () {
      if (!this.el || !this.el.classList.contains('is-open')) return;
      this.el.classList.remove('is-open');
      doc.body.classList.remove('drawer-open', 'is-locked');
      util.q('.burger').setAttribute('aria-expanded', 'false');
      util.bus.emit('drawer:close');
    },
    toggle: function () { this.el.classList.contains('is-open') ? this.close() : this.open(); }
  };

  /* =======================================================================
     4 · SCROLL PROGRESS + BACK TO TOP
     ===================================================================== */
  var Progress = {
    init: function () {
      var bar = util.q('.progress-bar');
      var top = util.q('.to-top');
      if (!bar && !top) return;
      util.onScroll(function (s) {
        doc.documentElement.style.setProperty('--progress', s.progress.toFixed(4));
        if (bar) bar.classList.toggle('is-on', s.y > 120);
        if (top) top.classList.toggle('is-visible', s.y > 700);
      });
      if (top) util.on(top, 'click', function (e) {
        e.preventDefault();
        win.scrollTo({ top: 0, behavior: util.reduced() ? 'auto' : 'smooth' });
      });
      util.onAll(util.qa('[data-scroll-top]'), 'click', function (e) {
        e.preventDefault();
        win.scrollTo({ top: 0, behavior: util.reduced() ? 'auto' : 'smooth' });
      });
    }
  };

  /* =======================================================================
     5 · CUSTOM CURSOR (fine pointers only)
     ===================================================================== */
  var Cursor = {
    init: function () {
      var c = util.q('.cursor');
      if (!c || util.coarse() || util.reduced()) return;
      var x = -100, y = -100, tx = -100, ty = -100, on = false;

      util.on(doc, 'mousemove', function (e) {
        tx = e.clientX; ty = e.clientY;
        if (!on) { on = true; x = tx; y = ty; c.classList.add('is-on'); }
      });
      util.on(doc, 'mouseleave', function () { c.classList.remove('is-on'); on = false; });

      (function loop() {
        x = util.lerp(x, tx, 0.19); y = util.lerp(y, ty, 0.19);
        c.style.setProperty('--cursor-x', x.toFixed(2) + 'px');
        c.style.setProperty('--cursor-y', y.toFixed(2) + 'px');
        win.requestAnimationFrame(loop);
      })();

      var hoverSel = 'a, button, .chip, .acc__head, input, textarea, select, [data-cursor="hover"]';
      util.on(doc, 'mouseover', function (e) {
        var t = e.target.closest ? e.target.closest(hoverSel) : null;
        c.classList.toggle('is-hover', !!t);
      });
      util.delegate(doc, '[data-cursor-label]', 'mouseenter', function (e, t) {
        c.classList.add('is-view');
        var lab = util.q('.cursor__label', c);
        if (lab) lab.textContent = t.getAttribute('data-cursor-label');
      });
      util.delegate(doc, '[data-cursor-label]', 'mouseleave', function () { c.classList.remove('is-view'); });
    }
  };

  /* =======================================================================
     6 · MAGNETIC BUTTONS
     ===================================================================== */
  var Magnetic = {
    init: function () {
      if (util.coarse() || util.reduced()) return;
      util.qa('[data-magnetic]').forEach(function (el) {
        var strength = parseFloat(util.attr(el, 'data-magnetic', '0.28'));
        var raf = null, mx = 0, my = 0;
        util.on(el, 'mousemove', function (e) {
          var r = el.getBoundingClientRect();
          mx = (e.clientX - (r.left + r.width / 2)) * strength;
          my = (e.clientY - (r.top + r.height / 2)) * strength;
          if (raf) return;
          raf = win.requestAnimationFrame(function () {
            el.style.transform = 'translate3d(' + mx.toFixed(2) + 'px,' + my.toFixed(2) + 'px,0)';
            raf = null;
          });
        });
        util.on(el, 'mouseleave', function () { el.style.transform = ''; });
      });
    }
  };

  /* =======================================================================
     7 · CURTAIN PAGE TRANSITION (internal links, same origin)
     ===================================================================== */
  var Curtain = {
    init: function () {
      var c = util.q('.curtain');
      if (!c || util.reduced()) return;
      if (win.performance && performance.getEntriesByType('navigation')[0] &&
          performance.getEntriesByType('navigation')[0].type !== 'navigate') return;
      c.classList.add('is-out');
      setTimeout(function () { c.classList.remove('is-out'); }, 700);

      util.on(doc, 'click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        var a = e.target.closest ? e.target.closest('a[href]') : null;
        if (!a) return;
        var href = a.getAttribute('href') || '';
        if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|javascript:)/.test(href)) return;
        if (a.target === '_blank' || a.hasAttribute('download')) return;
        if (a.origin && a.origin !== location.origin) return;
        if (util.attr(a, 'data-no-curtain', 'false') === 'true') return;
        e.preventDefault();
        c.classList.remove('is-out');
        c.classList.add('is-in');
        setTimeout(function () { location.href = href; }, 460);
      });

      /* Paint the curtain instantly on bfcache restore so there's no flash */
      util.on(win, 'pageshow', function (e) { if (e.persisted) c.classList.add('is-out'); });
    }
  };

  /* =======================================================================
     8 · ANCHOR SMOOTH SCROLL (offset for fixed header)
     ===================================================================== */
  var Anchors = {
    init: function () {
      var offset = (parseFloat(getComputedStyle(doc.documentElement).getPropertyValue('--header-h')) || 80) + 24;
      util.on(doc, 'click', function (e) {
        var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
        if (!a) return;
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var target = util.q(id);
        if (!target) return;
        e.preventDefault();
        util.scrollTo(target, offset);
        if (history.replaceState) history.replaceState(null, '', id);
      });
    }
  };

  W.Loader = Loader; W.Header = Header; W.Drawer = Drawer;
  W.Progress = Progress; W.Cursor = Cursor; W.Magnetic = Magnetic;
  W.Curtain = Curtain; W.Anchors = Anchors;
})(window.Woodex = window.Woodex || {});
