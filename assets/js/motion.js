/* ==========================================================================
   WOODEX MASTER THEME · js/motion.js
   --------------------------------------------------------------------------
   Scroll + entrance motion, all hand-written (no GSAP, no Lenis, no CDN).
   Modules: Reveal · Split · Counters · Parallax · Tilt · Marquee · Scrub ·
            Statement highlight · Media swap.
   Every module bails out under prefers-reduced-motion.
   ========================================================================== */
(function (W) {
  'use strict';
  var util = W.util, doc = document, win = window;

  /* =======================================================================
     1 · REVEAL — [data-reveal] + stagger via [data-reveal-delay]
     ===================================================================== */
  var Reveal = {
    init: function (root) {
      var els = util.qa('[data-reveal]', root || doc);
      if (!els.length) return;
      if (util.reduced()) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }

      els.forEach(function (el) {
        var d = parseFloat(util.attr(el, 'data-reveal-delay', '0'));
        if (d) el.style.setProperty('--rv-delay', (d * 0.09).toFixed(2) + 's');
        var dur = util.attr(el, 'data-reveal-duration', '');
        if (dur) el.style.setProperty('--rv-dur', dur + 's');
        /* Children stagger: parent staggers its direct [data-stagger] kids */
        if (el.hasAttribute('data-stagger')) {
          util.qa('[data-stagger-item], .grid > *, .flex > *, li', el).forEach(function (kid, i) {
            kid.style.setProperty('--rv-delay', ((d + i) * 0.075).toFixed(2) + 's');
          });
        }
      });

      util.observe(els, function (e) { e.target.classList.add('is-in'); }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    }
  };

  /* =======================================================================
     2 · SPLIT — headings into lines / words / chars for masked reveals
     [data-split]            → lines (default)
     [data-split="words"]    → words
     [data-split="chars"]    → characters
     ===================================================================== */
  var Split = {
    init: function (root) {
      var els = util.qa('[data-split]', root || doc);
      if (!els.length) return;
      els.forEach(function (el) {
        if (el.hasAttribute('data-split-done')) return;
        var mode = util.attr(el, 'data-split', 'lines');
        var src = el.innerHTML;
        /* Preserve inline <em>/<i>/<span>/<br> markup by working on text nodes */
        if (mode === 'chars') Split.chars(el);
        else if (mode === 'words') Split.words(el);
        else Split.lines(el, src);
        el.setAttribute('data-split-done', 'true');
        el.setAttribute('aria-label', el.textContent.trim());
      });
      if (util.reduced()) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
      util.observe(els, function (e) { e.target.classList.add('is-in'); }, { threshold: 0.2 });
    },

    words: function (el) {
      var walk = function (node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (child) {
          if (child.nodeType === 3) {
            var parts = child.nodeValue.split(/(\s+)/);
            var frag = doc.createDocumentFragment();
            var idx = 0;
            parts.forEach(function (p) {
              if (!p) return;
              if (/^\s+$/.test(p)) { frag.appendChild(doc.createTextNode(p)); return; }
              var wrap = util.create('span', 'split-word');
              var inner = util.create('span', '', util.escapeHTML(p));
              inner.style.setProperty('--wv-delay', (idx * 0.045).toFixed(3) + 's');
              wrap.appendChild(inner); frag.appendChild(wrap); frag.appendChild(doc.createTextNode(' '));
              idx++;
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === 1 && child.tagName !== 'BR') {
            walk(child);
          }
        });
      };
      walk(el);
      el.querySelectorAll('.split-word > span').forEach(function (s, i) {
        s.style.setProperty('--wv-delay', (i * 0.035).toFixed(3) + 's');
      });
    },

    chars: function (el) {
      var text = el.textContent, out = '', i = 0;
      el.innerHTML = '';
      Array.prototype.forEach.call(text, function (ch) {
        if (ch === ' ') { el.appendChild(doc.createTextNode(' ')); return; }
        var s = util.create('span', 'split-char', util.escapeHTML(ch));
        s.style.setProperty('--cv-delay', (i * 0.022).toFixed(3) + 's');
        el.appendChild(s); i++;
      });
    },

    /* Line splitting without a measuring library: wrap each <br>-delimited
       chunk, then split by rendered line boxes. */
    lines: function (el) {
      var html = el.innerHTML;
      var chunks = html.split(/<br\s*\/?>/i);
      el.innerHTML = '';
      var n = 0;
      chunks.forEach(function (chunk) {
        var probe = util.create('span', '', chunk.trim());
        probe.style.visibility = 'hidden';
        probe.style.display = 'block';
        el.appendChild(probe);
        var width = probe.getBoundingClientRect().width;
        var words = chunk.trim().split(/\s+/);
        var line = '', lines = [];
        probe.innerHTML = '';
        words.forEach(function (w) {
          probe.innerHTML = util.escapeHTML(line ? line + ' ' + w : w);
          if (probe.getBoundingClientRect().width > width && line) { lines.push(line); line = w; }
          else line = line ? line + ' ' + w : w;
        });
        if (line) lines.push(line);
        el.removeChild(probe);
        lines.forEach(function (l) {
          var wrap = util.create('span', 'split-line');
          var inner = util.create('span', '', l);
          inner.style.setProperty('--lv-delay', (n * 0.09).toFixed(3) + 's');
          wrap.appendChild(inner); el.appendChild(wrap); n++;
        });
      });
      /* Re-measure once fonts settle */
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { Split.remeasure(el); });
    },

    remeasure: function (el) {
      var lines = util.qa('.split-line', el);
      lines.forEach(function (wrap) {
        var inner = wrap.firstElementChild;
        if (!inner) return;
        var text = inner.textContent;
        var words = text.split(/\s+/);
        if (words.length < 2) return;
        var width = wrap.getBoundingClientRect().width;
        var probe = util.create('span', '', '');
        probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;';
        probe.style.font = getComputedStyle(inner).font;
        probe.style.letterSpacing = getComputedStyle(inner).letterSpacing;
        wrap.appendChild(probe);
        var line = '', out = [];
        words.forEach(function (w) {
          probe.textContent = line ? line + ' ' + w : w;
          if (probe.getBoundingClientRect().width > width && line) { out.push(line); line = w; }
          else line = line ? line + ' ' + w : w;
        });
        if (line) out.push(line);
        wrap.removeChild(probe);
        if (out.length > 1) {
          /* Split this wrap into several line wraps */
          var frag = doc.createDocumentFragment();
          var base = parseInt(inner.style.getPropertyValue('--lv-delay').replace('s', '') * 1000, 10) || 0;
          out.forEach(function (l, i) {
            var w2 = util.create('span', 'split-line');
            var i2 = util.create('span', '', util.escapeHTML(l));
            i2.style.setProperty('--lv-delay', ((base + i * 90) / 1000).toFixed(3) + 's');
            w2.appendChild(i2); frag.appendChild(w2);
          });
          wrap.parentNode.replaceChild(frag, wrap);
        }
      });
    }
  };

  /* =======================================================================
     3 · COUNTERS — [data-count="1200"] [data-count-suffix="+"]
     ===================================================================== */
  var Counters = {
    init: function (root) {
      var els = util.qa('[data-count]', root || doc);
      if (!els.length) return;
      var run = function (el) {
        var target = parseFloat(util.attr(el, 'data-count', '0'));
        var decimals = parseInt(util.attr(el, 'data-count-decimals', '0'), 10);
        var dur = parseFloat(util.attr(el, 'data-count-duration', '1.8')) * 1000;
        if (isNaN(target)) return;
        if (util.reduced()) { el.textContent = Counters.fmt(target, decimals); return; }
        var t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var p = util.clamp((ts - t0) / dur, 0, 1);
          var eased = 1 - Math.pow(1 - p, 4);
          el.textContent = Counters.fmt(target * eased, decimals);
          if (p < 1) win.requestAnimationFrame(step);
        };
        win.requestAnimationFrame(step);
      };
      util.observe(els, function (e) { run(e.target); }, { threshold: 0.4 });
      util.bus.on('count:update', function (el) { if (el && el.classList.contains('is-in')) run(el); });
    },
    fmt: function (n, d) {
      return Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
    }
  };

  /* =======================================================================
     4 · PARALLAX — [data-parallax="0.16"]
     Positive = moves slower than scroll (background drift).
     Negative = moves against scroll (foreground pop).
     ===================================================================== */
  var Parallax = {
    items: [],
    init: function (root) {
      if (util.reduced() || util.coarse()) return;
      var els = util.qa('[data-parallax]', root || doc);
      els.forEach(function (el) {
        if (el.__px) return;
        el.__px = { speed: parseFloat(util.attr(el, 'data-parallax', '0.14')), axis: util.attr(el, 'data-parallax-axis', 'y') };
        Parallax.items.push(el);
      });
      if (!Parallax.items.length) return;
      if (!Parallax.bound) {
        Parallax.bound = true;
        util.onScroll(function (s) { Parallax.update(s); });
      }
      Parallax.update({ vh: util.vh() });
    },
    update: function (s) {
      var vh = s.vh || util.vh();
      for (var i = Parallax.items.length - 1; i >= 0; i--) {
        var el = Parallax.items[i];
        if (!el.isConnected) { Parallax.items.splice(i, 1); continue; }
        var r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        var mid = r.top + r.height / 2;
        var off = (mid - vh / 2) / vh;                 /* -1 … 1 across viewport */
        var d = off * el.__px.speed * 100;
        if (el.__px.axis === 'x') el.style.transform = 'translate3d(' + d.toFixed(2) + 'px,0,0)';
        else el.style.transform = 'translate3d(0,' + (-d).toFixed(2) + 'px,0)';
      }
    }
  };

  /* =======================================================================
     5 · TILT — [data-tilt="8"]
     ===================================================================== */
  var Tilt = {
    init: function (root) {
      if (util.coarse() || util.reduced()) return;
      util.qa('[data-tilt]', root || doc).forEach(function (el) {
        if (el.__tilt) return; el.__tilt = true;
        var max = parseFloat(util.attr(el, 'data-tilt', '7'));
        util.on(el, 'mousemove', function (e) {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - .5;
          var py = (e.clientY - r.top) / r.height - .5;
          el.style.transform = 'perspective(900px) rotateY(' + (px * max).toFixed(2) + 'deg) rotateX(' + (-py * max).toFixed(2) + 'deg)';
        });
        util.on(el, 'mouseleave', function () { el.style.transform = ''; });
      });
    }
  };

  /* =======================================================================
     6 · MARQUEE — duplicate track for a seamless loop + speed from data attr
     ===================================================================== */
  var Marquee = {
    init: function (root) {
      util.qa('[data-marquee]', root || doc).forEach(function (m) {
        if (m.__mq) return; m.__mq = true;
        var track = util.q('.marquee__track', m) || m.firstElementChild;
        if (!track) return;
        var speed = parseFloat(util.attr(m, 'data-marquee', '34'));       /* seconds per loop */
        var gap = util.attr(m, 'data-marquee-gap', '');
        if (gap) m.style.setProperty('--mq-gap', gap);
        track.style.setProperty('--mq-dur', speed + 's');
        if (util.reduced()) { track.style.animation = 'none'; return; }
        /* Duplicate children once so translateX(-50%) loops seamlessly */
        var html = track.innerHTML;
        track.innerHTML = html + html;
        track.setAttribute('aria-hidden', 'false');
        /* Pause when off-screen to save cycles */
        util.observe([m], function (e) {
          track.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
        }, { once: false, threshold: 0 });
      });
    }
  };

  /* =======================================================================
     7 · HORIZONTAL SCROLL-SCRUB — [data-scrub]
     Pins the viewport and translates the track horizontally with scroll.
     ===================================================================== */
  var Scrub = {
    init: function (root) {
      if (util.reduced()) return;
      util.qa('[data-scrub]', root || doc).forEach(function (host) {
        if (host.__scrub) return; host.__scrub = true;
        var pin = util.q('.scrub__pin', host);
        var track = util.q('.scrub__track', host);
        if (!pin || !track) return;
        var size = function () {
          var dist = track.scrollWidth - win.innerWidth + 40;
          if (dist <= 0) { host.style.height = ''; return; }
          host.style.setProperty('--scrub-h', (dist + win.innerHeight) + 'px');
          host.__dist = dist;
        };
        size();
        util.on(win, 'resize', util.debounce(size, 200));
        util.onScroll(function () {
          if (!host.__dist) return;
          var r = host.getBoundingClientRect();
          var p = util.clamp(-r.top / (host.offsetHeight - win.innerHeight), 0, 1);
          track.style.setProperty('--sx', (-p * host.__dist).toFixed(1) + 'px');
        });
      });
    }
  };

  /* =======================================================================
     8 · STATEMENT WORD HIGHLIGHT — [data-highlight]
     Words light up as the block scrolls through the viewport.
     ===================================================================== */
  var Highlight = {
    init: function (root) {
      var els = util.qa('[data-highlight]', root || doc);
      if (!els.length) return;
      els.forEach(function (el) {
        if (el.__hl) return; el.__hl = true;
        if (!util.qa('.split-word', el).length) Split.words(el);
        var ws = util.qa('.split-word > span', el);
        ws.forEach(function (w) { w.classList.remove('is-lit'); w.style.opacity = ''; });
        if (util.reduced()) { ws.forEach(function (w) { w.classList.add('is-lit'); }); return; }
        var apply = function () {
          var r = el.getBoundingClientRect();
          var start = win.innerHeight * 0.85, end = win.innerHeight * 0.2;
          var p = util.clamp((start - r.top) / (start - end + r.height * 0.55), 0, 1);
          var lit = Math.round(p * ws.length);
          ws.forEach(function (w, i) { w.classList.toggle('is-lit', i < lit); });
        };
        util.onScroll(apply); apply();
      });
    }
  };

  /* =======================================================================
     9 · MEDIA SWAP — [data-swap] group where .is-active follows an index bus
     Used by the sticky services accordion + testimonials.
     ===================================================================== */
  var Swap = {
    set: function (container, index) {
      if (!container) return;
      util.qa('img, .deck__slide, .s-testi__slide', container).forEach(function (n, i) {
        n.classList.toggle('is-active', i === index);
      });
    }
  };

  W.Reveal = Reveal; W.Split = Split; W.Counters = Counters; W.Parallax = Parallax;
  W.Tilt = Tilt; W.Marquee = Marquee; W.Scrub = Scrub; W.Highlight = Highlight; W.Swap = Swap;
})(window.Woodex = window.Woodex || {});
