/* ==========================================================================
   WOODEX MASTER THEME · js/sections.js
   --------------------------------------------------------------------------
   Section-block behaviour: accordions, tabs, decks/auto-sliders, drag
   carousels, portfolio filters, lightbox, video reel, hero sliders.
   All vanilla, all progressive-enhancement safe.
   ========================================================================== */
(function (W) {
  'use strict';
  var util = W.util, doc = document, win = window;

  /* Height animation helper — animates to natural height then releases */
  function openPanel(panel) {
    panel.style.height = panel.scrollHeight + 'px';
    var done = function () { panel.style.height = 'auto'; panel.removeEventListener('transitionend', done); };
    panel.addEventListener('transitionend', done);
  }
  function closePanel(panel) {
    panel.style.height = panel.scrollHeight + 'px';
    win.requestAnimationFrame(function () {
      win.requestAnimationFrame(function () { panel.style.height = '0px'; });
    });
  }

  /* =======================================================================
     1 · ACCORDION — .acc / [data-accordion]
        data-accordion="single"  → one open at a time (default)
        data-accordion="multi"   → independent
        Open the item marked .is-open in HTML by default.
     ===================================================================== */
  var Accordion = {
    init: function (root) {
      util.qa('[data-accordion], .acc, .s-svc-acc__list', root || doc).forEach(function (group) {
        if (group.__acc) return; group.__acc = true;
        var mode = util.attr(group, 'data-accordion', 'single');
        var itemSel = group.classList.contains('s-svc-acc__list') ? '.s-svc-acc__item' : '.acc__item';
        var headSel = group.classList.contains('s-svc-acc__list') ? '.s-svc-acc__btn' : '.acc__head';
        var panelSel = group.classList.contains('s-svc-acc__list') ? '.s-svc-acc__panel' : '.acc__panel';
        var items = util.qa(itemSel, group);
        if (!items.length) return;

        function setOpen(item, open) {
          var panel = util.q(panelSel, item);
          var head = util.q(headSel, item);
          item.classList.toggle('is-open', open);
          item.classList.toggle('is-active', open);
          if (head) head.setAttribute('aria-expanded', String(open));
          if (panel) { open ? openPanel(panel) : closePanel(panel); }
          /* Sync an optional image deck (services accordion) */
          var mediaHost = util.q('[data-swap-media]', doc);
          if (open && mediaHost && item.hasAttribute('data-media-index')) {
            W.Swap.set(mediaHost, parseInt(item.getAttribute('data-media-index'), 10));
          }
          /* Sync the optional caption beside the sticky media */
          if (open) {
            var tag = util.q('[data-acc-tag]', doc);
            if (tag) {
              var label = util.q('.s-svc-acc__title, .acc__head', item);
              if (label) tag.textContent = label.textContent.trim();
            }
          }
          util.bus.emit('accordion:change', { group: group, item: item, open: open });
        }

        items.forEach(function (item, i) {
          var head = util.q(headSel, item);
          var panel = util.q(panelSel, item);
          if (!head || !panel) return;
          var id = 'acc-' + Math.random().toString(36).slice(2, 8);
          panel.id = panel.id || id;
          head.setAttribute('aria-controls', panel.id);
          head.setAttribute('aria-expanded', String(item.classList.contains('is-open') || item.classList.contains('is-active')));
          if (!item.classList.contains('is-open') && !item.classList.contains('is-active')) panel.style.height = '0px';

          util.on(head, 'click', function (e) {
            e.preventDefault();
            var isOpen = item.classList.contains('is-open') || item.classList.contains('is-active');
            if (mode === 'single') items.forEach(function (o) { if (o !== item) setOpen(o, false); });
            setOpen(item, !isOpen);
          });
          util.on(head, 'keydown', function (e) {
            var idx = items.indexOf(item);
            if (e.key === 'ArrowDown') { e.preventDefault(); var n = util.q(headSel, items[(idx + 1) % items.length]); n && n.focus(); }
            if (e.key === 'ArrowUp') { e.preventDefault(); var p = util.q(headSel, items[(idx - 1 + items.length) % items.length]); p && p.focus(); }
            if (e.key === 'Home') { e.preventDefault(); util.q(headSel, items[0]).focus(); }
            if (e.key === 'End') { e.preventDefault(); util.q(headSel, items[items.length - 1]).focus(); }
          });
          /* Hover-follow image preview for the services accordion */
          util.on(head, 'mouseenter', function () {
            var mediaHost = util.q('[data-swap-media]', doc);
            if (mediaHost && item.hasAttribute('data-media-index') && !util.coarse()) {
              W.Swap.set(mediaHost, parseInt(item.getAttribute('data-media-index'), 10));
            }
          });
        });

        /* Auto-open first item when none marked */
        if (mode === 'single' && !util.qa('.is-open, .is-active', group).length) setOpen(items[0], true);
        util.on(win, 'resize', util.debounce(function () {
          items.forEach(function (item) {
            var p = util.q(panelSel, item);
            if (p && (item.classList.contains('is-open') || item.classList.contains('is-active'))) p.style.height = 'auto';
          });
        }, 200));
      });
    }
  };

  /* =======================================================================
     2 · TABS — [data-tabs]
     ===================================================================== */
  var Tabs = {
    init: function (root) {
      util.qa('[data-tabs]', root || doc).forEach(function (host) {
        if (host.__tabs) return; host.__tabs = true;
        var btns = util.qa('.tabs__btn, [role="tab"]', host);
        var panels = util.qa('.tabs__panel, [role="tabpanel"]', host);
        if (!btns.length) return;
        function select(i) {
          btns.forEach(function (b, n) { b.setAttribute('aria-selected', String(n === i)); b.tabIndex = n === i ? 0 : -1; });
          panels.forEach(function (p, n) { p.hidden = n !== i; });
          /* Pricing toggle: buttons carry data-price-mode and the figures they
             control carry a matching data-price. They are not tabpanels, so
             they are swapped here, scoped to the enclosing section. */
          var mode = btns[i] && btns[i].getAttribute('data-price-mode');
          if (mode) {
            var scope = (host.closest && host.closest('section')) || doc;
            util.qa('[data-price]', scope).forEach(function (el) {
              el.hidden = el.getAttribute('data-price') !== mode;
            });
          }
          util.bus.emit('tabs:change', { host: host, index: i });
        }
        btns.forEach(function (b, i) {
          util.on(b, 'click', function () { select(i); });
          util.on(b, 'keydown', function (e) {
            if (e.key === 'ArrowRight') { e.preventDefault(); var n = (i + 1) % btns.length; btns[n].focus(); select(n); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); var p = (i - 1 + btns.length) % btns.length; btns[p].focus(); select(p); }
          });
        });
        var initial = btns.findIndex ? btns.findIndex(function (b) { return b.getAttribute('aria-selected') === 'true'; }) : 0;
        select(initial > -1 ? initial : 0);
      });
    }
  };

  /* =======================================================================
     3 · DECK — generic auto/manual slider
        Host: [data-deck] with .deck__slide children
        Controls: [data-deck-prev] [data-deck-next] [data-deck-dots]
        Attrs: data-deck-auto="6000" data-deck-loop="true"
     ===================================================================== */
  var Deck = {
    init: function (root) {
      util.qa('[data-deck]', root || doc).forEach(function (host) {
        if (host.__deck) return; host.__deck = true;
        var slides = util.qa('.deck__slide', host);
        if (slides.length < 2) return;
        var i = 0, timer = null, paused = false;
        var auto = parseInt(util.attr(host, 'data-deck-auto', '0'), 10);
        var dotsHost = util.q(util.attr(host, 'data-deck-dots', '[data-deck-dots]'), host) ||
                       util.q(util.attr(host, 'data-deck-dots', '.dots'));
        var mediaHost = util.q('[data-deck-media]', host);
        /* Optional thumbnail rail. The hero slider keeps its rail in a sibling
           column rather than inside the deck host, so search the section. */
        var thumbScope = (host.closest && host.closest('section')) || host.parentElement || doc;
        var thumbs = util.qa('[data-deck-index]', thumbScope);

        /* Build dots if a container exists but is empty */
        if (dotsHost && !dotsHost.children.length) {
          slides.forEach(function (_, n) {
            var b = util.create('button', 'dots__btn');
            b.type = 'button';
            b.setAttribute('aria-label', 'Go to slide ' + (n + 1));
            b.innerHTML = util.pad(n + 1);
            util.on(b, 'click', function () { go(n); });
            dotsHost.appendChild(b);
          });
          dotsHost.classList.add('dots--num');
        }
        var dots = dotsHost ? util.qa('.dots__btn', dotsHost) : [];

        function go(n) {
          i = (n + slides.length) % slides.length;
          slides.forEach(function (s, k) {
            s.classList.toggle('is-active', k === i);
            s.setAttribute('aria-hidden', String(k !== i));
          });
          dots.forEach(function (d, k) {
            d.classList.toggle('is-active', k === i);
            d.setAttribute('aria-selected', String(k === i));
          });
          if (mediaHost) W.Swap.set(mediaHost, i);
          thumbs.forEach(function (t) {
            var on = parseInt(t.getAttribute('data-deck-index'), 10) === i;
            t.classList.toggle('is-active', on);
            t.setAttribute('aria-current', String(on));
          });
          host.style.setProperty('--slide-index', i);
          restart();
          util.bus.emit('deck:change', { host: host, index: i });
        }
        function next() { go(i + 1); }
        function prev() { go(i - 1); }
        function restart() {
          clearInterval(timer);
          if (auto > 0 && !util.reduced()) {
            timer = setInterval(function () { if (!paused && doc.visibilityState === 'visible') next(); }, auto);
          }
        }

        util.onAll(util.qa('[data-deck-next]', host), 'click', next);
        util.onAll(util.qa('[data-deck-prev]', host), 'click', prev);
        thumbs.forEach(function (t) {
          util.on(t, 'click', function () {
            var n = parseInt(t.getAttribute('data-deck-index'), 10);
            if (!isNaN(n)) go(n);
          });
        });
        util.on(host, 'mouseenter', function () { paused = true; });
        util.on(host, 'mouseleave', function () { paused = false; });
        util.on(doc, 'visibilitychange', function () { paused = doc.hidden; });

        /* Touch swipe */
        if (!util.reduced()) {
          var x0 = null;
          util.on(host, 'touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
          util.on(host, 'touchend', function (e) {
            if (x0 == null) return;
            var dx = e.changedTouches[0].clientX - x0;
            if (Math.abs(dx) > 44) (dx < 0 ? next() : prev());
            x0 = null;
          }, { passive: true });
        }
        /* Keyboard when focused inside */
        util.on(host, 'keydown', function (e) {
          if (e.key === 'ArrowRight') next();
          if (e.key === 'ArrowLeft') prev();
        });

        slides.forEach(function (s, n) { if (n !== 0) s.setAttribute('aria-hidden', 'true'); });
        go(slides.findIndex ? (slides.findIndex(function (s) { return s.classList.contains('is-active'); }) || 0) : 0);
      });
    }
  };

  /* =======================================================================
     4 · HERO SPLIT SLIDER (home-one) — bg images + word + dots + copy deck
     ===================================================================== */
  var HeroSplit = {
    init: function () {
      var host = util.q('[data-hero-split]');
      if (!host) return;
      var slides = util.qa('.deck__slide', host);
      var bgs = util.qa('.s-hero-split__bg img', host);
      var words = util.qa('.hero-word__item', host);
      var dots = util.qa('.dots__btn', host);
      var auto = parseInt(util.attr(host, 'data-hero-split', '6800'), 10);
      var i = 0, timer = null, paused = false;

      function go(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); s.setAttribute('aria-hidden', String(k !== i)); });
        bgs.forEach(function (b, k) { b.classList.toggle('is-active', k === i); });
        words.forEach(function (w, k) { w.classList.toggle('is-active', k === i); });
        dots.forEach(function (d, k) { d.classList.toggle('is-active', k === i); d.setAttribute('aria-selected', String(k === i)); });
        util.bus.emit('hero:change', { index: i });
        restart();
      }
      function restart() {
        clearInterval(timer);
        if (auto > 0 && !util.reduced()) timer = setInterval(function () { if (!paused && doc.visibilityState === 'visible') go(i + 1); }, auto);
      }
      dots.forEach(function (d, n) { util.on(d, 'click', function () { go(n); }); });
      util.onAll(util.qa('[data-hero-next]', host), 'click', function () { go(i + 1); });
      util.onAll(util.qa('[data-hero-prev]', host), 'click', function () { go(i - 1); });
      util.on(host, 'mouseenter', function () { paused = true; });
      util.on(host, 'mouseleave', function () { paused = false; });
      util.on(doc, 'keydown', function (e) {
        if (!util.q('.drawer.is-open') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && win.scrollY < 40) {
          e.key === 'ArrowRight' ? go(i + 1) : go(i - 1);
        }
      });
      go(0);
    }
  };

  /* =======================================================================
     5 · DRAG CAROUSEL — [data-carousel]
        Track translate with prev/next, drag, wheel-horizontal, snap to card.
     ===================================================================== */
  var Carousel = {
    init: function (root) {
      util.qa('[data-carousel]', root || doc).forEach(function (host) {
        if (host.__car) return; host.__car = true;
        var vp = util.q('.s-proj-carousel__viewport, .carousel__viewport', host) || host;
        var track = util.q('.s-proj-carousel__track, .carousel__track', host);
        if (!track) return;
        var items = Array.prototype.slice.call(track.children);
        var pos = 0, dragging = false, startX = 0, startPos = 0, moved = 0;

        function cardStep() {
          if (!items.length) return 300;
          var cs = getComputedStyle(track);
          var gap = parseFloat(cs.columnGap || cs.gap || 0);
          return items[0].getBoundingClientRect().width + gap;
        }
        function maxScroll() { return Math.max(0, track.scrollWidth - vp.clientWidth); }
        function set(p, animate) {
          pos = util.clamp(p, -maxScroll(), 0);
          if (animate !== false) track.style.transition = '';
          else track.style.transition = 'none';
          track.style.transform = 'translate3d(' + pos.toFixed(1) + 'px,0,0)';
          util.bus.emit('carousel:move', { host: host, pos: pos, max: maxScroll() });
        }
        function to(i) { set(-Math.round(i * cardStep())); }
        function index() { return Math.round(-pos / cardStep()); }

        util.onAll(util.qa('[data-car-next]', host), 'click', function () { to(index() + 1); });
        util.onAll(util.qa('[data-car-prev]', host), 'click', function () { to(index() - 1); });
        util.onAll(util.qa('[data-car-index]', host), 'click', function (e) { to(parseInt(e.currentTarget.getAttribute('data-car-index'), 10)); });

        /* Drag */
        function down(e) {
          if (e.target.closest('a,button,input')) { /* allow clicks after drag check */ }
          dragging = true; moved = 0;
          startX = (e.touches ? e.touches[0].clientX : e.clientX);
          startPos = pos;
          vp.classList.add('is-dragging');
        }
        function move(e) {
          if (!dragging) return;
          var x = (e.touches ? e.touches[0].clientX : e.clientX);
          var dx = x - startX; moved = Math.abs(dx);
          set(startPos + dx, false);
        }
        function up() {
          if (!dragging) return;
          dragging = false; vp.classList.remove('is-dragging');
          to(index());
        }
        util.on(vp, 'mousedown', down); util.on(vp, 'mousemove', move);
        util.on(doc, 'mouseup', up); util.on(doc, 'mouseleave', up);
        util.on(vp, 'touchstart', down, { passive: true });
        util.on(vp, 'touchmove', move, { passive: true });
        util.on(vp, 'touchend', up);
        /* Suppress accidental navigation after a drag */
        util.on(vp, 'click', function (e) { if (moved > 8) { e.preventDefault(); e.stopPropagation(); } }, true);

        /* Horizontal wheel */
        util.on(vp, 'wheel', function (e) {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); set(pos - e.deltaX, false); }
        }, { passive: false });

        util.on(win, 'resize', util.debounce(function () { to(index()); }, 200));
        set(0, false);
      });
    }
  };

  /* =======================================================================
     6 · PORTFOLIO FILTER — [data-filter-group] + [data-filter-item]
     ===================================================================== */
  var Filter = {
    init: function (root) {
      util.qa('[data-filter-group]', root || doc).forEach(function (group) {
        if (group.__filter) return; group.__filter = true;
        var btns = util.qa('.chip, [data-filter]', group);
        var scope = util.attr(group, 'data-filter-scope', '');
        var items = util.qa((scope ? scope + ' ' : '') + '[data-filter-item]');
        var counter = util.q('[data-filter-count]', group);

        function apply(cat) {
          var shown = 0;
          items.forEach(function (it) {
            var cats = (util.attr(it, 'data-filter-item', '') || '').split(/\s+/);
            var match = cat === 'all' || cats.indexOf(cat) > -1;
            it.classList.toggle('is-hidden', !match);
            if (match) {
              shown++;
              it.style.animation = 'none';
              void it.offsetWidth;
              it.style.animation = '';
              it.classList.remove('is-in');
              win.requestAnimationFrame(function () { it.classList.add('is-in'); });
            }
          });
          if (counter) counter.textContent = util.pad(shown) + ' projects';
          util.bus.emit('filter:apply', { cat: cat, shown: shown });
        }
        btns.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === 'all'));
          util.on(b, 'click', function () {
            btns.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); o.classList.remove('is-active'); });
            b.setAttribute('aria-pressed', 'true'); b.classList.add('is-active');
            apply(util.attr(b, 'data-filter', 'all'));
          });
        });
        /* Deep-link: portfolio.html?cat=residential */
        var q = new URLSearchParams(location.search).get('cat');
        if (q) {
          var target = btns.filter(function (b) { return b.getAttribute('data-filter') === q; })[0];
          if (target) target.click();
        }
        apply('all');
      });
    }
  };

  /* =======================================================================
     7 · LIGHTBOX — any [data-lightbox] or .media a[href$=jpg|webp|png]
     ===================================================================== */
  var Lightbox = {
    init: function () {
      var triggers = util.qa('[data-lightbox]');
      if (!triggers.length) return;
      var box = util.create('div', 'lightbox');
      box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Image viewer');
      box.innerHTML =
        '<button class="icon-btn lightbox__close" aria-label="Close viewer">' +
        '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 2l12 12M14 2L2 14"/></svg></button>' +
        '<figure class="lightbox__figure"><img alt=""><figcaption class="lightbox__cap"></figcaption></figure>';
      doc.body.appendChild(box);
      var img = util.q('img', box), cap = util.q('.lightbox__cap', box), lastFocus = null;

      function open(src, caption) {
        img.src = src; img.alt = caption || '';
        cap.textContent = caption || '';
        box.classList.add('is-open');
        doc.body.classList.add('is-locked');
        lastFocus = doc.activeElement;
        setTimeout(function () { util.q('.lightbox__close', box).focus(); }, 60);
      }
      function close() {
        box.classList.remove('is-open');
        doc.body.classList.remove('is-locked');
        setTimeout(function () { img.src = ''; }, 350);
        if (lastFocus) lastFocus.focus();
      }
      util.on(box, 'click', function (e) { if (e.target === box) close(); });
      util.on(util.q('.lightbox__close', box), 'click', close);
      util.on(doc, 'keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('is-open')) close(); });

      triggers.forEach(function (t) {
        util.on(t, 'click', function (e) {
          var src = util.attr(t, 'data-lightbox') || (util.q('img', t) || {}).currentSrc || (util.q('img', t) || {}).src;
          if (!src) return;
          e.preventDefault();
          open(src, util.attr(t, 'data-lightbox-caption', util.attr(t, 'title', '')));
        });
      });
    }
  };

  /* =======================================================================
     8 · VIDEO REEL — [data-reel] swaps poster for <video>/<iframe> on click
     ===================================================================== */
  var Reel = {
    init: function (root) {
      util.qa('[data-reel]', root || doc).forEach(function (host) {
        if (host.__reel) return; host.__reel = true;
        var src = util.attr(host, 'data-reel', '');
        var frame = util.q('.s-reel__frame', host) || host;
        if (!src) return;
        function play() {
          var el;
          if (/youtube\.com|youtu\.be|vimeo\.com/.test(src)) {
            var id = src.match(/(?:v=|\/)([0-9A-Za-z_-]{6,})/);
            var embed = /vimeo/.test(src)
              ? 'https://player.vimeo.com/video/' + (id ? id[1] : '') + '?autoplay=1'
              : 'https://www.youtube.com/embed/' + (id ? id[1] : '') + '?autoplay=1&rel=0';
            el = util.create('iframe', 's-reel__video');
            el.src = embed; el.allow = 'autoplay; fullscreen; picture-in-picture';
            el.allowFullscreen = true; el.title = 'Project showreel';
          } else {
            el = util.create('video', 's-reel__video');
            el.src = src; el.controls = true; el.autoplay = true; el.playsInline = true; el.setAttribute('controlslist', 'nodownload');
          }
          frame.appendChild(el);
          host.classList.add('is-playing');
        }
        util.on(frame, 'click', function (e) {
          if (host.classList.contains('is-playing')) return;
          e.preventDefault(); play();
        });
        /* The frame carries role="button" tabindex="0", so it has to activate on
           Enter and Space too -- otherwise it is reachable by keyboard and then
           inert there. Space is preventDefault-ed so the page does not scroll. */
        util.on(frame, 'keydown', function (e) {
          if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
          if (host.classList.contains('is-playing')) return;
          e.preventDefault(); play();
        });
      });
    }
  };

  /* =======================================================================
     9 · SERVICES HOVER LIST — floating image that follows the cursor
     ===================================================================== */
  var HoverList = {
    init: function (root) {
      if (util.coarse() || util.reduced()) return;
      util.qa('[data-hover-list]', root || doc).forEach(function (host) {
        if (host.__hl) return; host.__hl = true;
        var float = util.q('.s-svc-list__float', host) || util.q('.s-svc-list__float');
        if (!float) return;
        var imgs = util.qa('img', float);
        var rows = util.qa('.svc-row, .prow', host);
        var x = 0, y = 0, tx = 0, ty = 0, raf = null, on = false;

        function loop() {
          x = util.lerp(x, tx, .13); y = util.lerp(y, ty, .13);
          float.style.left = x + 'px'; float.style.top = y + 'px';
          raf = win.requestAnimationFrame(loop);
        }
        rows.forEach(function (row, i) {
          util.on(row, 'mouseenter', function () {
            imgs.forEach(function (im, k) { im.classList.toggle('is-active', k === i); });
            float.classList.add('is-on');
            if (!on) { on = true; tx = x = win.innerWidth / 2; ty = y = win.innerHeight / 2; loop(); }
          });
          util.on(row, 'mouseleave', function () { float.classList.remove('is-on'); });
        });
        util.on(doc, 'mousemove', function (e) { tx = e.clientX + 130; ty = e.clientY; });
      });
    }
  };

  /* =======================================================================
     10 · TABLE OF CONTENTS (blog post) — scroll-spy
     ===================================================================== */
  var TOC = {
    init: function (root) {
      /* Two supported markups: a legacy .toc container, and the current
         [data-toc-link] anchors emitted by sections/legal and sections/post. */
      var toc = util.q('.toc', root || doc);
      var links = toc ? util.qa('a[href^="#"]', toc) : util.qa('[data-toc-link]', root || doc);
      if (!links.length) return;
      var targets = links.map(function (a) { return util.q(a.getAttribute('href')); }).filter(Boolean);
      if (!targets.length) return;
      util.onScroll(util.rafThrottle(function () {
        var y = win.scrollY + 160, current = 0;
        targets.forEach(function (t, i) { if (t.offsetTop <= y) current = i; });
        links.forEach(function (l, i) { l.classList.toggle('is-current', i === current); });
      }));
    }
  };

  W.Accordion = Accordion; W.Tabs = Tabs; W.Deck = Deck; W.HeroSplit = HeroSplit;
  W.Carousel = Carousel; W.Filter = Filter; W.Lightbox = Lightbox; W.Reel = Reel;
  W.HoverList = HoverList; W.TOC = TOC;
  W._openPanel = openPanel; W._closePanel = closePanel;
})(window.Woodex = window.Woodex || {});
