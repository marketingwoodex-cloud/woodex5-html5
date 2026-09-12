/* ==========================================================================
   WOODEX MASTER THEME · js/api.js
   --------------------------------------------------------------------------
   FRONT-END CONTENT API.
   Every collection lives in /assets/data/*.json and is exposed through one
   small facade so a headless CMS, WordPress REST endpoint or Google Sheet can
   be dropped in later without touching a single template.

   Swap the source by editing CONFIG.base or CONFIG.endpoints — the rest of
   the theme (nav renderer, footer renderer, related-posts, filters) keeps
   working unchanged.

   Usage:
     Woodex.api.get('projects').then(list => ...)
     Woodex.api.find('services', { slug: 'turnkey-interiors' })
     Woodex.api.render('[data-nav="main"]')       // auto-hydrate from JSON
   ========================================================================== */
(function (W) {
  'use strict';
  var util = W.util;

  var CONFIG = {
    /* Base path for JSON. Relative so the site works from any sub-folder. */
    base: 'assets/data/',
    /* Set to a real endpoint later, e.g. 'https://woodexinterior.com/wp-json/woodex/v1/' */
    remote: null,
    endpoints: {
      site: 'site.json',
      navigation: 'navigation.json',
      services: 'services.json',
      projects: 'projects.json',
      posts: 'posts.json',
      testimonials: 'testimonials.json',
      faqs: 'faqs.json',
      pricing: 'pricing.json',
      process: 'process.json',
      team: 'team.json',
      stats: 'stats.json',
      locations: 'locations.json',
      clients: 'clients.json',
      awards: 'awards.json'
    },
    cache: true,
    timeout: 8000
  };

  var cache = {};
  var inflight = {};

  function urlFor(name) {
    if (CONFIG.remote) return CONFIG.remote.replace(/\/$/, '') + '/' + (CONFIG.endpoints[name] || name + '.json');
    return CONFIG.base + (CONFIG.endpoints[name] || name + '.json');
  }

  function fetchJSON(url) {
    if (!win_fetch()) return Promise.reject(new Error('fetch unavailable'));
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, CONFIG.timeout) : null;
    return fetch(url, { signal: ctrl ? ctrl.signal : undefined, headers: { 'Accept': 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url); return r.json(); })
      .then(function (json) { if (timer) clearTimeout(timer); return json; })
      .catch(function (err) { if (timer) clearTimeout(timer); throw err; });
  }
  function win_fetch() { return typeof window.fetch === 'function'; }

  var api = {
    config: CONFIG,

    /* Get a whole collection (array) or object */
    get: function (name, force) {
      if (CONFIG.cache && cache[name] && !force) return Promise.resolve(cache[name]);
      if (inflight[name]) return inflight[name];
      inflight[name] = fetchJSON(urlFor(name))
        .then(function (data) {
          cache[name] = data;
          delete inflight[name];
          util.bus.emit('api:' + name, data);
          return data;
        })
        .catch(function (err) {
          delete inflight[name];
          util.log('api.get failed for "' + name + '" — templates keep their build-time content.', err.message);
          return null;   /* never reject: pages stay fully rendered without JS/JSON */
        });
      return inflight[name];
    },

    /* Synchronous peek at already-loaded data (used after boot) */
    peek: function (name) { return cache[name] || null; },

    find: function (name, match) {
      return api.get(name).then(function (list) {
        if (!Array.isArray(list)) return null;
        return list.filter(function (item) {
          return Object.keys(match).every(function (k) { return String(item[k]) === String(match[k]); });
        })[0] || null;
      });
    },

    where: function (name, match) {
      return api.get(name).then(function (list) {
        if (!Array.isArray(list)) return [];
        return list.filter(function (item) {
          return Object.keys(match).every(function (k) { return String(item[k]) === String(match[k]); });
        });
      });
    },

    /* Preload everything the current page declares it needs:
       <body data-api="site,navigation,projects">                              */
    boot: function () {
      var declared = util.attr(document.body, 'data-api', 'site,navigation');
      var names = declared.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      return Promise.all(names.map(function (n) { return api.get(n); }))
        .then(function (results) {
          var out = {};
          names.forEach(function (n, i) { out[n] = results[i]; });
          util.bus.emit('api:ready', out);
          return out;
        });
    },

    /* ---------- RENDERERS ------------------------------------------------
       Data-driven slots. Each slot is optional: if the element is absent, the
       renderer silently no-ops. If JSON fails to load, build-time HTML stays. */
    render: function (root) {
      root = root || document;
      api.renderNav(root);
      api.renderFooterLinks(root);
      api.renderSiteMeta(root);
      api.renderCount(root);
    },

    /* [data-nav="main"] — rebuild primary nav from navigation.json */
    renderNav: function (root) {
      var slots = util.qa('[data-nav]', root || document);
      if (!slots.length) return;
      api.get('navigation').then(function (data) {
        if (!data) return;
        slots.forEach(function (slot) {
          var which = util.attr(slot, 'data-nav', 'main');
          var items = data[which];
          if (!items || !Array.isArray(items)) return;
          var path = location.pathname.split('/').pop() || 'index.html';
          slot.innerHTML = items.map(function (it) {
            var active = it.href && (it.href === path || (it.href !== 'index.html' && path.indexOf(it.href) === 0));
            var inner = it.children && it.children.length
              ? '<button type="button" class="nav__link" aria-expanded="false">' + util.escapeHTML(it.label) +
                '<svg class="nav__caret" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M1 1l4 4 4-4"/></svg></button>' +
                api._megaHTML(it)
              : '<a class="nav__link" href="' + it.href + '"' + (active ? ' aria-current="page"' : '') + '>' + util.escapeHTML(it.label) + '</a>';
            return '<li class="nav__item' + (active ? ' is-current' : '') + '">' + inner + '</li>';
          }).join('');
        });
        util.bus.emit('nav:rendered');
      });
    },

    _megaHTML: function (item) {
      if (!item.children || !item.children.length) return '';
      var cols = item.children.map(function (col) {
        return '<div class="mega__col"><div class="mega__col-title">' + util.escapeHTML(col.title || '') + '</div>' +
          '<div class="mega__links">' + (col.links || []).map(function (l) {
            return '<a class="mega__link" href="' + l.href + '">' + util.escapeHTML(l.label) +
              (l.note ? '<small>' + util.escapeHTML(l.note) + '</small>' : '') + '</a>';
          }).join('') + '</div></div>';
      }).join('');
      var feat = item.feature
        ? '<a class="mega__feature" href="' + item.feature.href + '">' +
          (item.feature.image ? '<img src="' + item.feature.image + '" alt="" loading="lazy">' : '') +
          '<h4>' + util.escapeHTML(item.feature.title) + '</h4><p>' + util.escapeHTML(item.feature.text) + '</p>' +
          '<span class="tlink">' + util.escapeHTML(item.feature.cta || 'Explore') + '</span></a>'
        : '';
      return '<div class="mega"><div class="container"><div class="mega__inner">' + cols + feat + '</div></div></div>';
    },

    /* [data-footer-links="explore"] */
    renderFooterLinks: function (root) {
      var slots = util.qa('[data-footer-links]', root || document);
      if (!slots.length) return;
      api.get('navigation').then(function (data) {
        if (!data || !data.footer) return;
        slots.forEach(function (slot) {
          var which = util.attr(slot, 'data-footer-links');
          var items = data.footer[which];
          if (!Array.isArray(items)) return;
          slot.innerHTML = items.map(function (l) {
            var ext = /^https?:/.test(l.href) ? ' target="_blank" rel="noopener"' : '';
            return '<a href="' + l.href + '"' + ext + '>' + util.escapeHTML(l.label) + '</a>';
          }).join('');
        });
      });
    },

    /* [data-site="email"] → text content from site.json */
    renderSiteMeta: function (root) {
      var slots = util.qa('[data-site]', root || document);
      if (!slots.length) return;
      api.get('site').then(function (data) {
        if (!data) return;
        slots.forEach(function (slot) {
          var key = util.attr(slot, 'data-site');
          var val = util.get(data, key);
          if (val == null) return;
          if (slot.hasAttribute('href') || slot.tagName === 'A') {
            var prefix = key === 'email' ? 'mailto:' : (key === 'phone' ? 'tel:' : '');
            slot.setAttribute('href', prefix + val);
          }
          slot.textContent = val;
        });
      });
    },

    /* [data-count-from-api="stats.projects"] — animate a number from JSON */
    renderCount: function (root) {
      var slots = util.qa('[data-count-from-api]', root || document);
      if (!slots.length) return;
      slots.forEach(function (slot) {
        var path = util.attr(slot, 'data-count-from-api');
        var coll = path.split('.')[0];
        api.get(coll).then(function (data) {
          var v = util.get(data, path.split('.').slice(1).join('.'));
          if (typeof v === 'number') { slot.setAttribute('data-count', String(v)); util.bus.emit('count:update', slot); }
        });
      });
    },

    /* ---------- FORM SUBMISSION ----------------------------------------
       Posts to CONFIG.formEndpoint when set; otherwise falls back to a
       pre-filled WhatsApp / mailto handoff so the site is never dead-ended. */
    submitForm: function (form, payload) {
      /* util.attr only falls back when the attribute is missing, and the
         templates render data-endpoint="" when no endpoint is configured, so
         reading it directly would shadow CONFIG.formEndpoint forever. Coalesce
         empty and absent alike, then trim, so the documented global default is
         actually reachable. */
      var endpoint = (util.attr(form, 'data-endpoint', '') || CONFIG.formEndpoint || '').trim();
      if (!endpoint) {
        util.log('No form endpoint configured — using handoff fallback.');
        return Promise.resolve({ ok: true, mode: 'handoff' });
      }
      return fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
        .catch(function () { return { ok: false, error: 'network' }; });
    }
  };

  W.api = api;
})(window.Woodex = window.Woodex || {});
