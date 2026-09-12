/* ============================================================================
   WOODEX MASTER THEME — MOTION ENGINE
   ----------------------------------------------------------------------------
   A dependency-free, ~10KB scroll/motion runtime that reproduces every
   animation behaviour found in the reference template — without GSAP.

   WHY NO GSAP?
     • Zero npm/CDN dependency → the built theme works on any shared host
     • ~10KB gzipped instead of ~90KB
     • Fully readable source so Codex / Claude / Kimi can extend it safely
   Swapping in GSAP later is a drop-in: see docs/MOTION.md.

   PUBLIC ATTRIBUTE API (identical spirit to the reference template)
   -------------------------------------------------------------------
   data-heading-reveal="words|chars"   bottom-to-top masked text reveal
   data-text-reveal="lines|words"      paragraph reveal
   data-reveal="fade-up|clip|zoom|..." IntersectionObserver entrance
   data-stagger="90"                   stagger direct children (ms)
   data-scroll-opacity                 scrub opacity 0 → 1 with scroll
   data-scroll-fill                    scrub a left-to-right text fill
   data-parallax="0.2"                 scroll-linked translateY multiplier
   data-scroll-rail                    vertical scroll → horizontal rail
   data-marquee / data-marquee-vertical infinite loop
   data-counter="200" data-counter-suffix="+"
   data-magnetic="0.35"                element follows the cursor slightly
   data-cursor="View"                  custom cursor label
   data-pin                            sticky pinning wrapper
   data-countdown="2026-12-31"         live countdown
   data-rotate-words                   rotating headline words
   data-split-lines                    re-split text into lines on resize
   ========================================================================= */

const PREFERS_REDUCED = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ── SCROLL REGISTRY ───────────────────────────────────────────────────────
   One rAF-throttled scroll loop drives every scroll-linked behaviour.
   Individual modules subscribe with a callback; nothing else listens to
   `scroll`, which keeps the main thread clean on long pages.              */
const ScrollBus = (() => {
  const subscribers = new Set();
  let ticking = false;
  let lastY = 0;

  function flush() {
    ticking = false;
    const y = window.scrollY;
    const dir = y > lastY ? 'down' : 'up';
    const vh = window.innerHeight;
    const docH = document.documentElement.scrollHeight - vh;
    const progress = docH > 0 ? clamp(y / docH) : 0;

    const state = { y, dir, vh, progress, velocity: Math.abs(y - lastY) };
    lastY = y;

    for (const fn of subscribers) {
      try { fn(state); } catch (err) { console.warn('[motion]', err); }
    }

    document.documentElement.style.setProperty('--progress', String(progress));
    document.documentElement.style.setProperty('--scroll-y', `${y}px`);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(flush);
    }
  }

  return {
    start() {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      flush();
    },
    subscribe(fn) {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
    get lastY() { return lastY; },
  };
})();

/* ── 1. TEXT SPLITTING ─────────────────────────────────────────────────────
   Re-implements the reference's SplitText behaviour: wraps each word (and
   optionally each character) in a mask + inner pair so we can slide it up
   from translateY(110%) → 0 with a stagger.
   Accessibility: the original text is preserved for screen readers via an
   aria-label on the parent and aria-hidden on the generated spans.         */

function splitWords(el, { mode = 'words', charStagger = 22 } = {}) {
  if (el.dataset.split === 'done') return [];
  const source = el.textContent.trim().replace(/\s+/g, ' ');
  if (!source) return [];

  // Preserve the raw string for AT, hide the decorative split copy.
  el.setAttribute('aria-label', source);
  const frag = document.createDocumentFragment();
  const inners = [];

  source.split(' ').forEach((word, wi, arr) => {
    const wordMask = document.createElement('span');
    wordMask.className = 'word-mask';
    wordMask.setAttribute('aria-hidden', 'true');

    if (mode === 'chars') {
      const wordInner = document.createElement('span');
      wordInner.className = 'word-inner';
      [...word].forEach((ch, ci) => {
        const cMask = document.createElement('span');
        cMask.className = 'char-mask';
        const cInner = document.createElement('span');
        cInner.className = 'char-inner';
        cInner.textContent = ch;
        cInner.style.setProperty('--char-delay', `${ci * charStagger}ms`);
        cMask.appendChild(cInner);
        wordInner.appendChild(cMask);
        inners.push(cInner);
      });
      wordMask.appendChild(wordInner);
      frag.appendChild(wordMask);
      if (wi < arr.length - 1) {
        const sp = document.createElement('span');
        sp.className = 'word-inner';
        sp.setAttribute('aria-hidden', 'true');
        sp.innerHTML = '&nbsp;';
        frag.appendChild(sp);
      }
    } else {
      const wordInner = document.createElement('span');
      wordInner.className = 'word-inner';
      wordInner.textContent = word;
      wordMask.appendChild(wordInner);
      frag.appendChild(wordMask);
      if (wi < arr.length - 1) {
        const sp = document.createElement('span');
        sp.className = 'word-mask';
        sp.setAttribute('aria-hidden', 'true');
        const spIn = document.createElement('span');
        spIn.className = 'word-inner';
        spIn.innerHTML = '&nbsp;';
        sp.appendChild(spIn);
        frag.appendChild(sp);
      }
      inners.push(wordInner);
    }
  });

  el.textContent = '';
  el.appendChild(frag);
  el.dataset.split = 'done';

  const stagger = Number(el.dataset.headingStagger) || 55;
  inners.forEach((inner, i) => {
    inner.style.setProperty('--word-delay', `${i * stagger}ms`);
  });

  return inners;
}

/* Re-splitting on resize is expensive and rarely needed; we only re-split if
   the element's width changed by more than 15% (i.e. a real breakpoint flip). */
function splitLines(el) {
  if (el.dataset.lineSplit === 'done') return;
  const source = el.innerHTML;
  el.dataset.lineSource = source;
  el.dataset.lineSplit = 'done';
}

/* ── 2. REVEAL OBSERVER ────────────────────────────────────────────────────
   Single IntersectionObserver for every entrance animation on the page.   */
function initReveals(root = document) {
  const targets = root.querySelectorAll(
    '[data-reveal], [data-heading-reveal], [data-text-reveal], [data-stagger], [data-counter], [data-clip-reveal]'
  );
  if (!targets.length) return;

  // Stagger children: assign incremental delays, then observe the parent.
  root.querySelectorAll('[data-stagger]').forEach((parent) => {
    const step = Number(parent.dataset.stagger) || 90;
    const kids = parent.hasAttribute('data-stagger-self')
      ? [parent, ...parent.children]
      : [...parent.children];
    kids.forEach((kid, i) => {
      if (!kid.hasAttribute('data-reveal')) kid.setAttribute('data-reveal', 'fade-up');
      kid.style.setProperty('--reveal-delay', `${i * step}ms`);
    });
  });

  const reveal = (el) => {
    el.classList.add('is-in');
    if (el.hasAttribute('data-counter')) runCounter(el);
  };

  if (!('IntersectionObserver' in window)) {
    targets.forEach(reveal);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        if (!entry.target.hasAttribute('data-repeat')) io.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      // Start the animation slightly before the element is fully on screen.
      rootMargin: '0px 0px -8% 0px',
    }
  );

  targets.forEach((el) => io.observe(el));

  /* Safety net. Reveals start hidden, so anything that never intersects —
     a fast programmatic scroll, a restored scroll position, a section that
     is parked under a sticky element — would stay invisible. Anything still
     hidden after the page settles is revealed outright.                    */
  const sweep = () => {
    targets.forEach((el) => {
      if (el.classList.contains('is-in')) return;
      const rect = el.getBoundingClientRect();
      const seen = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
      const passed = rect.bottom <= 0; // scrolled past without being observed
      if (seen || passed) reveal(el);
    });
  };
  window.addEventListener('load', sweep);
  document.addEventListener('visibilitychange', () => !document.hidden && sweep());
  window.setTimeout(sweep, 2500);
  window.setTimeout(() => targets.forEach((el) => reveal(el)), 8000);
}

/* ── 3. COUNTER ────────────────────────────────────────────────────────── */
function runCounter(el) {
  if (el.dataset.counted === 'done') return;
  el.dataset.counted = 'done';

  const target = parseFloat(el.dataset.counter) || 0;
  const prefix = el.dataset.counterPrefix || '';
  const suffix = el.dataset.counterSuffix || '';
  const dur = Number(el.dataset.counterDuration) || 1800;
  const decimals = Number(el.dataset.counterDecimals) || 0;
  const start = performance.now();

  function tick(now) {
    const t = clamp((now - start) / dur);
    // easeOutExpo — matches the reference's snappy count-ups.
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const value = lerp(0, target, eased);
    el.textContent = prefix + value.toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ── 4. SCROLL-LINKED MODULES ──────────────────────────────────────────── */
function initScrollOpacity(root) {
  const els = [...root.querySelectorAll('[data-scroll-opacity]')];
  if (!els.length) return;

  const from = (el) => parseFloat(el.dataset.scrollOpacityFrom ?? '0.08');
  const to = (el) => parseFloat(el.dataset.scrollOpacityTo ?? '1');

  ScrollBus.subscribe(({ vh }) => {
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      // Progress 0 when the element's top sits at the bottom of the viewport,
      // 1 when its top reaches ~30% of the viewport height.
      const p = clamp((vh - r.top) / (vh * 0.72));
      el.style.setProperty('--scrub', String(lerp(from(el), to(el), p)));
    });
  });
}

function initScrollFill(root) {
  const els = [...root.querySelectorAll('[data-scroll-fill]')];
  if (!els.length) return;

  ScrollBus.subscribe(({ vh }) => {
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      const p = clamp((vh * 0.92 - r.top) / (r.height + vh * 0.32));
      el.style.setProperty('--fill', `${(p * 100).toFixed(2)}%`);
    });
  });
}

function initParallax(root) {
  const els = [...root.querySelectorAll('[data-parallax]')];
  if (!els.length || PREFERS_REDUCED()) return;

  ScrollBus.subscribe(({ vh }) => {
    els.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return; // cheap cull
      const centre = r.top + r.height / 2 - vh / 2;
      el.style.setProperty('--par-y', `${(-centre * speed).toFixed(2)}px`);
    });
  });
}

function initScrollRail(root) {
  const rails = [...root.querySelectorAll('[data-scroll-rail]')];
  if (!rails.length || PREFERS_REDUCED()) return;

  ScrollBus.subscribe(({ vh }) => {
    rails.forEach((rail) => {
      const r = rail.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;

      const track = rail.querySelector('[data-scroll-rail-track]') || rail.firstElementChild;
      if (!track) return;

      const distance = Math.max(0, track.scrollWidth - rail.clientWidth);
      if (!distance) return;

      // Travel the whole rail across the section's scroll span.
      const p = clamp((vh - r.top) / (vh + r.height));
      track.style.setProperty('--rail-x', `${-(p * distance).toFixed(2)}px`);
    });
  });
}

/* ── 5. MARQUEE ──────────────────────────────────────────────────────────
   Clones the track so the CSS loop is seamless. `data-marquee-speed`
   (px/second) is converted into a duration based on real track width.     */
function initMarquees(root) {
  root.querySelectorAll('[data-marquee], [data-marquee-vertical], .rt-marquee').forEach((wrap) => {
    if (wrap.dataset.marqueeReady === 'true') return;
    wrap.dataset.marqueeReady = 'true';

    // Adopt an existing track, or build one from the wrap's own children.
    let track = wrap.querySelector(':scope > .marquee-track');
    if (!track) {
      track = document.createElement('div');
      track.className = 'marquee-track';
      while (wrap.firstChild) track.appendChild(wrap.firstChild);
      wrap.appendChild(track);
    }

    // Duplicate until the track is at least 2× the viewport so small content
    // sets still loop without visible gaps.
    const original = track.cloneNode(true);
    track.appendChild(...original.childNodes);
    const total = track.scrollWidth || track.getBoundingClientRect().height || 1;
    track.style.setProperty('--marquee-hover', 'paused');

    const speed = Number(wrap.dataset.marqueeSpeed) || 60; // px per second
    wrap.style.setProperty('--marquee-dur', `${Math.max(8, total / speed)}s`);
  });
}

/* ── 6. CUSTOM CURSOR ──────────────────────────────────────────────────── */
function initCursor(root) {
  const targets = [...root.querySelectorAll('[data-cursor]')];
  if (!targets.length) return;
  // Pointer-fine only — never hijack touch devices.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const dot = document.createElement('div');
  dot.setAttribute('data-cursor', '');
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);

  let x = 0, y = 0, cx = 0, cy = 0;

  window.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
  }, { passive: true });

  (function loop() {
    cx = lerp(cx, x, 0.18);
    cy = lerp(cy, y, 0.18);
    dot.style.transform =
      `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(var(--cursor-scale, 0))`;
    requestAnimationFrame(loop);
  })();

  targets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      dot.textContent = el.dataset.cursor || 'View';
      dot.classList.add('is-active');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('is-active');
    });
  });
}

/* ── 7. MAGNETIC ELEMENTS ──────────────────────────────────────────────── */
function initMagnetic(root) {
  const els = [...root.querySelectorAll('[data-magnetic]')];
  if (!els.length) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  els.forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic) || 0.3;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.setProperty('--mag-x', `${dx * strength}px`);
      el.style.setProperty('--mag-y', `${dy * strength}px`);
    });
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--mag-x', '0px');
      el.style.setProperty('--mag-y', '0px');
    });
  });
}

/* ── 8. ROTATING WORDS ─────────────────────────────────────────────────── */
function initRotateWords(root) {
  root.querySelectorAll('[data-rotate-words]').forEach((wrap) => {
    const items = [...wrap.children];
    if (items.length < 2) return;
    let i = 0;
    items[0].classList.add('is-active');

    const hold = Number(wrap.dataset.rotateHold) || 2600;
    setInterval(() => {
      if (document.hidden) return;
      items[i].classList.remove('is-active');
      items[i].classList.add('is-leaving');
      const prev = i;
      i = (i + 1) % items.length;
      items[i].classList.remove('is-leaving');
      items[i].classList.add('is-active');
      setTimeout(() => items[prev].classList.remove('is-leaving'), 700);
    }, hold);
  });
}

/* ── 9. COUNTDOWN ──────────────────────────────────────────────────────── */
function initCountdowns(root) {
  root.querySelectorAll('[data-countdown]').forEach((el) => {
    const end = new Date(el.dataset.countdown).getTime();
    if (Number.isNaN(end)) return;

    const cells = {
      d: el.querySelector('[data-cd="d"]'),
      h: el.querySelector('[data-cd="h"]'),
      m: el.querySelector('[data-cd="m"]'),
      s: el.querySelector('[data-cd="s"]'),
    };
    const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      const s = Math.floor(diff / 1000);
      if (cells.d) cells.d.textContent = pad(Math.floor(s / 86400));
      if (cells.h) cells.h.textContent = pad(Math.floor((s % 86400) / 3600));
      if (cells.m) cells.m.textContent = pad(Math.floor((s % 3600) / 60));
      if (cells.s) cells.s.textContent = pad(s % 60);
      if (diff <= 0) clearInterval(timer);
    };
    tick();
    const timer = setInterval(tick, 1000);
  });
}

/* ── 10. ACCORDION / TABS / SLIDERS ────────────────────────────────────── */
function initAccordions(root) {
  root.querySelectorAll('[data-accordion]').forEach((acc) => {
    const single = acc.dataset.accordion !== 'multi';
    const items = [...acc.querySelectorAll('[data-accordion-item]')];

    items.forEach((item) => {
      const head = item.querySelector('[data-accordion-head]');
      const body = item.querySelector('[data-accordion-body]');
      if (!head || !body) return;

      const open = item.classList.contains('is-open');
      body.style.height = open ? 'auto' : '0px';
      head.setAttribute('aria-expanded', String(open));
      item.toggleAttribute('data-open', open);

      head.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        if (single) {
          items.forEach((other) => {
            if (other === item) return;
            other.classList.remove('is-open');
            other.removeAttribute('data-open');
            other.querySelector('[data-accordion-head]')?.setAttribute('aria-expanded', 'false');
            const ob = other.querySelector('[data-accordion-body]');
            if (ob) collapse(ob);
          });
        }
        if (isOpen) {
          item.classList.remove('is-open');
          item.removeAttribute('data-open');
          head.setAttribute('aria-expanded', 'false');
          collapse(body);
        } else {
          item.classList.add('is-open');
          item.setAttribute('data-open', '');
          head.setAttribute('aria-expanded', 'true');
          expand(body);
        }
      });
    });
  });
}

function expand(body) {
  body.style.height = `${body.scrollHeight}px`;
  const done = () => {
    body.style.height = 'auto';
    body.removeEventListener('transitionend', done);
  };
  body.addEventListener('transitionend', done);
}

function collapse(body) {
  body.style.height = `${body.scrollHeight}px`;
  requestAnimationFrame(() => { body.style.height = '0px'; });
}

function initTabs(root) {
  root.querySelectorAll('[data-tabs]').forEach((group) => {
    const buttons = [...group.querySelectorAll('[data-tab]')];
    const panels = [...group.querySelectorAll('[data-tab-panel]')];

    const activate = (key) => {
      buttons.forEach((b) => {
        const on = b.dataset.tab === key;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
      });
      panels.forEach((p) => {
        const on = p.dataset.tabPanel === key;
        p.classList.toggle('is-active', on);
        p.hidden = !on;
      });
    };

    buttons.forEach((b) => b.addEventListener('click', () => activate(b.dataset.tab)));
    if (buttons[0]) activate(buttons[0].dataset.tab);
  });
}

function initSliders(root) {
  root.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('[data-slider-track]');
    const slides = [...slider.querySelectorAll('[data-slide]')];
    const prev = slider.querySelector('[data-slider-prev]');
    const next = slider.querySelector('[data-slider-next]');
    const dots = [...slider.querySelectorAll('[data-slider-dot]')];
    if (!track || !slides.length) return;

    let index = 0;
    const autoplay = Number(slider.dataset.sliderAutoplay) || 0;
    let timer = null;

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
      slides.forEach((s, n) => s.classList.toggle('is-active', n === index));
      dots.forEach((d, n) => d.classList.toggle('is-active', n === index));
      slider.dispatchEvent(new CustomEvent('slidechange', { detail: { index } }));
    };

    prev?.addEventListener('click', () => go(index - 1));
    next?.addEventListener('click', () => go(index + 1));
    dots.forEach((d, n) => d.addEventListener('click', () => go(n)));

    // Keyboard + swipe
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'ArrowRight') go(index + 1);
    });

    let startX = null;
    slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (startX == null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) go(dx < 0 ? index + 1 : index - 1);
      startX = null;
    }, { passive: true });

    if (autoplay) {
      const start = () => { timer = setInterval(() => !document.hidden && go(index + 1), autoplay); };
      const stop = () => clearInterval(timer);
      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', start);
      start();
    }

    go(0);
  });
}

/* ── 11. HEADER BEHAVIOUR ──────────────────────────────────────────────── */
function initHeader(root) {
  const header = root.querySelector('[data-header]');
  if (!header) return;

  const threshold = Number(header.dataset.headerThreshold) || 40;
  const hideOnDown = header.hasAttribute('data-header-hide');

  ScrollBus.subscribe(({ y, dir }) => {
    header.classList.toggle('is-scrolled', y > threshold);
    if (hideOnDown) {
      header.classList.toggle('is-hidden', dir === 'down' && y > 320);
    }
  });
}

/* ── 12. MEGA MENU ─────────────────────────────────────────────────────── */
function initMegaMenu(root) {
  const triggers = [...root.querySelectorAll('[data-mega-trigger]')];
  if (!triggers.length) return;

  let openKey = null;
  let closeTimer = null;

  const closeAll = (except) => {
    triggers.forEach((t) => {
      if (t === except) return;
      t.setAttribute('aria-expanded', 'false');
      t.closest('[data-mega]')?.classList.remove('is-open');
      document.getElementById(t.getAttribute('aria-controls'))?.classList.remove('is-open');
    });
    if (!except) openKey = null;
  };

  const open = (trigger) => {
    closeAll(trigger);
    const key = trigger.getAttribute('aria-controls');
    const panel = document.getElementById(key);
    trigger.setAttribute('aria-expanded', 'true');
    trigger.closest('[data-mega]')?.classList.add('is-open');
    panel?.classList.add('is-open');
    openKey = key;
  };

  triggers.forEach((trigger) => {
    const wrapper = trigger.closest('[data-mega]');
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));

    const scheduleClose = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        if (!wrapper?.matches(':hover') && !panel?.matches(':hover')) closeAll(null);
      }, 160);
    };

    // Hover intent on pointer-fine devices
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      wrapper?.addEventListener('mouseenter', () => { clearTimeout(closeTimer); open(trigger); });
      wrapper?.addEventListener('mouseleave', scheduleClose);
      panel?.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      panel?.addEventListener('mouseleave', scheduleClose);
    }

    // Click / keyboard always works (touch + AT)
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeAll(null) : open(trigger);
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeAll(null); trigger.focus(); }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        open(trigger);
        panel?.querySelector('a')?.focus();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openKey) closeAll(null);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-mega]') && !e.target.closest('[data-mega-panel]')) closeAll(null);
  });

  // Tapping outside closes on touch
  document.addEventListener('focusin', (e) => {
    if (!e.target.closest('[data-mega]') && !e.target.closest('[data-mega-panel]') && openKey) {
      closeAll(null);
    }
  });
}

/* ── 13. MOBILE DRAWER ─────────────────────────────────────────────────── */
function initDrawer(root) {
  const openers = [...root.querySelectorAll('[data-drawer-open]')];
  const drawer = root.querySelector('[data-drawer]');
  if (!drawer || !openers.length) return;

  const panel = drawer.querySelector('[data-drawer-panel]') || drawer;
  const closers = [...drawer.querySelectorAll('[data-drawer-close]')];
  let lastFocus = null;

  const open = () => {
    lastFocus = document.activeElement;
    drawer.classList.add('is-open');
    drawer.removeAttribute('aria-hidden');
    document.body.classList.add('is-locked');
    openers.forEach((o) => o.setAttribute('aria-expanded', 'true'));
    panel.querySelector('a, button')?.focus();
  };

  const close = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    openers.forEach((o) => o.setAttribute('aria-expanded', 'false'));
    lastFocus?.focus?.();
  };

  openers.forEach((o) => o.addEventListener('click', open));
  closers.forEach((c) => c.addEventListener('click', close));
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });

  // Simple focus trap while the drawer is open
  drawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = [...panel.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )].filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

/* ── 14. LAZY IMAGES ───────────────────────────────────────────────────── */
function initLazyImages(root) {
  const imgs = [...root.querySelectorAll('img[loading="lazy"], img[data-lazy]')];
  imgs.forEach((img) => {
    img.setAttribute('data-loaded', img.complete ? 'true' : 'false');
    if (img.complete) return;
    img.addEventListener('load', () => img.setAttribute('data-loaded', 'true'), { once: true });
    img.addEventListener('error', () => img.setAttribute('data-loaded', 'true'), { once: true });
  });
}

/* ── 15. CURRENT YEAR / MISC ───────────────────────────────────────────── */
function initMisc(root) {
  root.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // Copy-to-clipboard
  root.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.dataset.copyLabel || btn.textContent;
        btn.textContent = btn.dataset.copyDone || 'Copied';
        setTimeout(() => { btn.textContent = original; }, 1800);
      } catch { /* clipboard unavailable — silently ignore */ }
    });
  });
}
/* ── 12. STICKY PINS ───────────────────────────────────────────────────────
   [data-pin] wraps a tall column; [data-pin-sticky] is its sticky child (the
   actual positioning lives in motion.css so it still works with JS disabled).

   JS adds two things CSS cannot:
     1. `.is-pinned` on the sticky child once it has engaged, so sections can
        style the pinned state (shadows, borders, colour shifts).
     2. A height guard — if the panel is taller than the viewport it must not
        stick, otherwise its bottom can never be read.
   Optional: data-pin-offset="2rem" overrides the default top offset.        */
function initPins(root = document) {
  const wraps = [...root.querySelectorAll('[data-pin]')];
  if (!wraps.length) return;

  const pairs = wraps
    .map((wrap) => ({ wrap, sticky: wrap.querySelector('[data-pin-sticky]') }))
    .filter((pair) => pair.sticky);

  if (!pairs.length) return;

  /* Height guard — re-evaluated on resize (ScrollBus already listens). */
  const guard = () => {
    const available = window.innerHeight - 160;
    pairs.forEach(({ wrap, sticky }) => {
      const tooTall = sticky.offsetHeight > available;
      sticky.style.position = tooTall ? 'static' : '';
      wrap.classList.toggle('pin-overflow', tooTall);
    });
  };

  pairs.forEach(({ wrap, sticky }) => {
    if (wrap.dataset.pinOffset) {
      sticky.style.top = `calc(var(--header-h, 76px) + ${wrap.dataset.pinOffset})`;
    }
  });

  guard();
  let resizeTimer;
  window.addEventListener(
    'resize',
    () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(guard, 150);
    },
    { passive: true }
  );

  if (!('IntersectionObserver' in window)) return;

  /* A zero-height sentinel at the top of the wrapper: it leaves the viewport
     exactly when the wrapper's top edge passes it, i.e. when the sticky child
     engages. rootMargin -100% collapses the root to a line at the top edge. */
  pairs.forEach(({ wrap, sticky }) => {
    const sentinel = document.createElement('i');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText =
      'position:absolute;top:0;left:0;width:1px;height:1px;visibility:hidden;pointer-events:none';

    const io = new IntersectionObserver(
      ([entry]) => {
        const pinned = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        sticky.classList.toggle('is-pinned', pinned);
        wrap.classList.toggle('is-pinning', pinned);
      },
      { rootMargin: '0px 0px -100% 0px', threshold: 0 }
    );

    io.observe(sentinel);
    wrap.prepend(sentinel);
  });
}


/* ── 16. BACK TO TOP ───────────────────────────────────────────────────── */
function initBackToTop(root) {
  const btn = root.querySelector('[data-to-top]');
  if (!btn) return;

  ScrollBus.subscribe(({ y }) => {
    btn.classList.toggle('is-visible', y > 800);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: PREFERS_REDUCED() ? 'auto' : 'smooth' });
  });
}

/* ── 17. FORM UX ───────────────────────────────────────────────────────── */
function initForms(root) {
  root.querySelectorAll('[data-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      // Demo mode: no backend configured yet.
      if (form.dataset.form === 'demo') {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        if (btn) {
          const label = btn.dataset.label || btn.textContent;
          btn.disabled = true;
          btn.textContent = btn.dataset.successLabel || 'Thank you — we will be in touch';
          setTimeout(() => { btn.disabled = false; btn.textContent = label; form.reset(); }, 3200);
        }
        return;
      }
      // Real endpoint: let the browser POST normally.
    });

    // Floating-label state for filled inputs
    form.querySelectorAll('input, textarea, select').forEach((field) => {
      const sync = () => field.closest('[data-field]')?.classList.toggle('is-filled', !!field.value);
      sync();
      field.addEventListener('input', sync);
      field.addEventListener('change', sync);
      field.addEventListener('blur', sync);
    });
  });
}

/* ── BOOTSTRAP ─────────────────────────────────────────────────────────── */
function boot() {
  const root = document;
  initReveals(root);
  initLazyImages(root);
  initMarquees(root);
  initScrollOpacity(root);
  initScrollFill(root);
  initParallax(root);
  initScrollRail(root);
  initAccordions(root);
  initTabs(root);
  initSliders(root);
  initHeader(root);
  initMegaMenu(root);
  initDrawer(root);
  initRotateWords(root);
  initCountdowns(root);
  initMagnetic(root);
  initCursor(root);
  initBackToTop(root);
  initForms(root);
  initMisc(root);
  initPins(root);
  ScrollBus.start();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

export {
  ScrollBus,
  initPins,
  splitWords,
  initReveals,
  runCounter,
  initMarquees,
  initTabs,
  initSliders,
  initAccordions,
};
