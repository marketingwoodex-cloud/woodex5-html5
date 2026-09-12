/* ============================================================================
   WOODEX HOME — interaction for the redesigned home page.
   ---------------------------------------------------------------------------
   Four behaviours, all progressive: every one of them starts from markup that
   already works without JavaScript, and none of them move content around in a
   way that changes what the page says.

     1. Cine hero    — 3-slide rotation, pips, arrows, keyboard, pause on hover
     2. Service switcher — image follows the focused/hovered service row
     3. Studio pin   — pinned scroll run driving the image + copy card + bar
     4. Tilt         — subtle pointer tilt on media marked [data-tilt]

   Respects prefers-reduced-motion: the hero stops rotating, the pin unpins and
   the tilt is skipped.
   ========================================================================= */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const isNarrow = () => window.matchMedia('(max-width: 940px)').matches;

/* ── 1. CINE HERO ──────────────────────────────────────────────────────── */
function initCine() {
  const root = document.querySelector('[data-cine]');
  if (!root) return;

  const slides = [...root.querySelectorAll('[data-cine-slide]')];
  const pips = [...root.querySelectorAll('[data-cine-pip]')];
  const sideWords = [...root.querySelectorAll('.cine__side span')];
  const ghost = root.querySelector('.cine__ghost');
  if (slides.length < 2) return;

  const DURATION = 7200; // matches the pip track animation
  let index = 0;
  let timer = null;

  function show(next) {
    index = (next + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const on = i === index;
      slide.classList.toggle('is-active', on);
      slide.setAttribute('aria-hidden', on ? 'false' : 'true');
    });

    pips.forEach((pip, i) => {
      const on = i === index;
      /* Re-trigger the fill animation by cloning the class off/on. */
      pip.classList.toggle('is-active', on);
      pip.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    sideWords.forEach((word, i) => word.classList.toggle('is-on', i === index));

    if (ghost) {
      const word = sideWords[index]?.textContent?.trim();
      if (word && ghost.textContent.trim() !== word) ghost.textContent = word;
    }
  }

  function play() {
    stop();
    if (reduced.matches) return;
    timer = window.setInterval(() => show(index + 1), DURATION);
    root.dataset.paused = 'false';
  }
  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }
  function pause() {
    stop();
    root.dataset.paused = 'true';
  }

  pips.forEach((pip) =>
    pip.addEventListener('click', () => {
      show(Number(pip.dataset.cinePip));
      play();
    })
  );
  root.querySelector('[data-cine-next]')?.addEventListener('click', () => {
    show(index + 1);
    play();
  });
  root.querySelector('[data-cine-prev]')?.addEventListener('click', () => {
    show(index - 1);
    play();
  });

  /* Keyboard: the pips are a tablist, so arrow keys should move between them. */
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    if (!e.target.closest('.cine__pips')) return;
    e.preventDefault();
    show(index + (e.key === 'ArrowRight' ? 1 : -1));
    play();
    pips[index]?.focus();
  });

  /* Touch: swipe. */
  let startX = null;
  root.addEventListener(
    'touchstart',
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );
  root.addEventListener(
    'touchend',
    (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 46) {
        show(index + (dx < 0 ? 1 : -1));
        play();
      }
      startX = null;
    },
    { passive: true }
  );

  /* Pause while the pointer is over the hero, and when the tab is hidden. */
  root.addEventListener('mouseenter', pause);
  root.addEventListener('mouseleave', play);
  document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));

  show(0);
  play();
}

/* ── 2. SERVICE SWITCHER ───────────────────────────────────────────────── */
function initSwitcher() {
  const root = document.querySelector('.sw');
  if (!root) return;

  const rows = [...root.querySelectorAll('[data-sw-row]')];
  const images = [...root.querySelectorAll('[data-sw-img]')];
  const caption = root.querySelector('[data-sw-cap]');
  const number = root.querySelector('.sw__cap small');
  if (!rows.length) return;

  function activate(i) {
    rows.forEach((row, n) => row.classList.toggle('is-on', n === i));
    images.forEach((img, n) => img.classList.toggle('is-on', n === i));
    if (caption) caption.textContent = rows[i].dataset.caption ?? '';
    if (number && rows[i].dataset.number) number.textContent = rows[i].dataset.number;
  }

  rows.forEach((row, i) => {
    row.addEventListener('mouseenter', () => activate(i));
    row.addEventListener('focus', () => activate(i));
  });

  /* On touch there is no hover, so a tap swaps the image and the second tap
     follows the link — the row is still an <a>, so behaviour is never lost. */
  rows.forEach((row, i) => {
    row.addEventListener('touchstart', () => activate(i), { passive: true });
  });
}

/* ── 3. STUDIO PIN ─────────────────────────────────────────────────────── */
function initPin() {
  const section = document.querySelector('[data-pin-studio]');
  if (!section) return;

  const track = section.querySelector('.pin__track');
  const stick = section.querySelector('.pin__stick');
  const images = [...section.querySelectorAll('.pin__img')];
  const copies = [...section.querySelectorAll('.pin__copy')];
  const thumbs = [...section.querySelectorAll('[data-pin-thumb]')];
  const bar = section.querySelector('.pin__bar i');
  const count = copies.length;
  let ticking = false;

  function setState(step) {
    images.forEach((img, i) => img.classList.toggle('is-on', i === step));
    copies.forEach((c, i) => c.classList.toggle('is-on', i === step));
    thumbs.forEach((t, i) => {
      t.classList.toggle('is-on', i === step);
      t.setAttribute('aria-selected', i === step ? 'true' : 'false');
    });
  }

  thumbs.forEach((t, i) =>
    t.addEventListener('click', () => {
      setState(i);
      /* Scroll to the slice of the track that corresponds to this step. */
      if (!reduced.matches && !isNarrow() && track) {
        const rect = track.getBoundingClientRect();
        const total = track.offsetHeight - window.innerHeight;
        if (total > 0) {
          const target = window.scrollY + rect.top + (total * (i + 0.5)) / count;
          window.scrollTo({ top: target, behavior: 'smooth' });
        }
      }
    })
  );

  function layout() {
    if (!track || !stick) return;
    if (reduced.matches || isNarrow()) {
      track.style.height = '';
      stick.style.position = '';
      stick.style.top = '';
      return;
    }
    /* One viewport of scroll per step, plus a viewport to read the first. */
    track.style.height = `${window.innerHeight * (count + 0.35)}px`;
    stick.style.position = 'sticky';
    stick.style.top = '0';
    stick.style.height = '100vh';
    stick.style.paddingBlock = '0';
  }

  function update() {
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const total = track.offsetHeight - window.innerHeight;
    const progress = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;

    if (bar) bar.style.transform = `scaleX(${progress})`;

    /* The first slice is reading time before the pin starts driving; the rest
       is split evenly across the steps. */
    const driven = Math.min(Math.max((progress - 0.12) / 0.88, 0), 1);
    const step = Math.min(Math.floor(driven * count), count - 1);
    if (section.dataset.step !== String(step)) {
      section.dataset.step = String(step);
      setState(step);
    }
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  layout();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    layout();
    update();
  });
}

/* ── 4. TILT ───────────────────────────────────────────────────────────── */
function initTilt() {
  if (reduced.matches) return;
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    if (el.dataset.tiltReady) return;
    el.dataset.tiltReady = '1';

    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ── WhatsApp float: appears after the reader leaves the hero ───────────── */
function initFloat() {
  const el = document.querySelector('[data-wa-float]');
  if (!el) return;
  const toggle = () => el.classList.toggle('is-visible', window.scrollY > 240);
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ── Boot ──────────────────────────────────────────────────────────────── */
function boot() {
  initCine();
  initSwitcher();
  initPin();
  initTilt();
  initFloat();
}

if (document.readyState !== 'loading') boot();
else document.addEventListener('DOMContentLoaded', boot);

reduced.addEventListener?.('change', () => {
  initPin();
  initTilt();
});
