/* ==========================================================================
   WOODEX MASTER THEME · js/forms.js
   --------------------------------------------------------------------------
   Validation, submission, toasts, newsletter, WhatsApp/mailto handoff,
   "today" hours highlighting, copy-to-clipboard.
   No backend required — set data-endpoint on the <form> to go live.
   ========================================================================== */
(function (W) {
  'use strict';
  var util = W.util, doc = document, win = window;

  /* ---------- TOASTS ---------- */
  var Toast = {
    host: null,
    show: function (msg, kind, ms) {
      if (!this.host) { this.host = util.create('div', 'toasts'); this.host.setAttribute('aria-live', 'polite'); doc.body.appendChild(this.host); }
      var t = util.create('div', 'toast toast--' + (kind || 'ok'), '<span>' + util.escapeHTML(msg) + '</span>');
      this.host.appendChild(t);
      setTimeout(function () {
        t.classList.add('is-out');
        setTimeout(function () { t.remove(); }, 400);
      }, ms || 4200);
    }
  };

  /* ---------- VALIDATION ---------- */
  var RX = {
    email: /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i,
    phone: /^[+()\d][\d\s()+-]{6,19}$/,
    url: /^https?:\/\/.+\..+/i
  };

  function validateField(field) {
    var input = util.q('.field__control', field);
    if (!input) return true;
    var val = (input.value || '').trim();
    var type = util.attr(input, 'data-validate', input.type || 'text');
    var required = input.hasAttribute('required') || util.attr(field, 'data-required', '') === 'true';
    var min = parseInt(util.attr(input, 'data-minlength', '0'), 10);
    var errEl = util.q('.field__error', field);
    var msg = '';

    if (input.type === 'checkbox') {
      if (required && !input.checked) msg = 'Please accept to continue';
    } else if (required && !val) {
      msg = 'This field is required';
    } else if (val) {
      if (type === 'email' && !RX.email.test(val)) msg = 'Enter a valid email address';
      else if (type === 'tel' && !RX.phone.test(val)) msg = 'Enter a valid phone number';
      else if (type === 'url' && !RX.url.test(val)) msg = 'Enter a valid URL';
      else if (min && val.length < min) msg = 'Use at least ' + min + ' characters';
    }

    field.classList.toggle('is-invalid', !!msg);
    field.classList.toggle('is-valid', !msg && !!val);
    if (errEl) errEl.textContent = msg;
    input.setAttribute('aria-invalid', String(!!msg));
    return !msg;
  }

  var Forms = {
    init: function (root) {
      util.qa('form[data-form]', root || doc).forEach(function (form) {
        if (form.__bound) return; form.__bound = true;
        var fields = util.qa('.field', form);
        var status = util.q('.form-status', form);
        var submit = util.q('[type="submit"]', form);
        var kind = util.attr(form, 'data-form', 'contact');

        /* Live validation on blur, gentle re-check on input */
        fields.forEach(function (f) {
          var input = util.q('.field__control', f);
          if (!input) return;
          util.on(input, 'blur', function () { validateField(f); });
          util.on(input, 'input', function () { if (f.classList.contains('is-invalid')) validateField(f); });
        });

        /* Character counter */
        util.qa('[data-counter]', form).forEach(function (ta) {
          var out = util.q(util.attr(ta, 'data-counter'));
          var max = parseInt(util.attr(ta, 'maxlength', '600'), 10);
          var sync = function () { if (out) out.textContent = (ta.value || '').length + ' / ' + max; };
          util.on(ta, 'input', sync); sync();
        });

        util.on(form, 'submit', function (e) {
          e.preventDefault();
          var ok = true, firstBad = null;
          fields.forEach(function (f) {
            var good = validateField(f);
            if (!good && !firstBad) firstBad = util.q('.field__control', f);
            ok = ok && good;
          });
          if (!ok) {
            if (status) { status.className = 'form-status form-status--err is-visible'; status.textContent = 'Please check the highlighted fields.'; }
            if (firstBad) firstBad.focus();
            Toast.show('Some fields need attention', 'err');
            return;
          }

          /* Collect payload */
          var payload = { form: kind, page: location.pathname, at: new Date().toISOString() };
          Array.prototype.forEach.call(form.elements, function (el) {
            if (!el.name) return;
            if (el.type === 'checkbox') payload[el.name] = el.checked;
            else if (el.type === 'radio') { if (el.checked) payload[el.name] = el.value; }
            else payload[el.name] = (el.value || '').trim();
          });

          if (status) { status.className = 'form-status form-status--busy is-visible'; status.textContent = 'Sending your enquiry…'; }
          if (submit) { submit.setAttribute('aria-disabled', 'true'); }

          W.api.submitForm(form, payload).then(function (res) {
            if (res && res.ok && res.mode !== 'handoff') {
              Forms.success(form, status, submit);
              return;
            }
            /* Handoff fallback: open WhatsApp (preferred) or email client */
            Forms.handoff(form, payload);
            Forms.success(form, status, submit, true);
          }).catch(function () {
            if (status) { status.className = 'form-status form-status--err is-visible'; status.textContent = 'Something went wrong. Please try WhatsApp instead.'; }
            if (submit) submit.removeAttribute('aria-disabled');
            Toast.show('Submission failed — please try again', 'err');
          });
        });
      });
    },

    success: function (form, status, submit, handoff) {
      if (status) {
        status.className = 'form-status form-status--ok is-visible';
        status.textContent = handoff
          ? 'Opening your messaging app — your details are pre-filled.'
          : 'Thank you. Your enquiry is with our studio team.';
      }
      if (submit) {
        var lab = util.q('.btn__label', submit);
        if (lab) lab.innerHTML = '<span>Received</span><span>Received</span>';
        else submit.textContent = 'Received';
        submit.setAttribute('aria-disabled', 'true');
      }
      Toast.show(handoff ? 'Redirecting to WhatsApp…' : 'Enquiry sent — we reply within one business day', 'ok');
      var redirect = util.attr(form, 'data-redirect', '');
      if (redirect && !handoff) setTimeout(function () { location.href = redirect; }, 1200);
      util.bus.emit('form:success', { form: form, handoff: !!handoff });
      /* Optional analytics hook */
      if (win.dataLayer) win.dataLayer.push({ event: 'lead_submit', form: util.attr(form, 'data-form') });
    },

    /* Build a pre-filled WhatsApp / mailto message from the payload */
    handoff: function (form, p) {
      var site = W.api.peek('site') || {};
      var lines = ['*New enquiry — ' + (site.name || 'Woodex Interior') + '*', ''];
      Object.keys(p).forEach(function (k) {
        if (['form', 'page', 'at'].indexOf(k) > -1 || !p[k]) return;
        lines.push('• ' + k.replace(/_/g, ' ') + ': ' + p[k]);
      });
      lines.push('', '_Sent from ' + location.href + '_');
      var text = encodeURIComponent(lines.join('\n'));

      var phone = String(site.whatsapp || site.phone || '').replace(/[^\d]/g, '');
      if (phone) {
        if (phone.length === 11 && phone.charAt(0) === '0') phone = '92' + phone.slice(1);
        win.open('https://wa.me/' + phone + '?text=' + text, '_blank', 'noopener');
        return;
      }
      var email = site.email || 'hello@woodexinterior.com';
      location.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Website enquiry — ' + (p.name || p.service || '')) + '&body=' + text;
    }
  };

  /* ---------- NEWSLETTER (lightweight inline form) ---------- */
  var Newsletter = {
    init: function (root) {
      util.qa('[data-newsletter]', root || doc).forEach(function (form) {
        if (form.__nl) return; form.__nl = true;
        util.on(form, 'submit', function (e) {
          e.preventDefault();
          var input = util.q('input[type="email"]', form);
          if (!input || !RX.email.test((input.value || '').trim())) {
            Toast.show('Please enter a valid email address', 'err'); input && input.focus(); return;
          }
          W.api.submitForm(form, { form: 'newsletter', email: input.value.trim(), page: location.pathname })
            .then(function () {
              Toast.show('You are on the list — thank you.', 'ok');
              input.value = '';
            });
        });
      });
    }
  };

  /* ---------- BUSINESS HOURS: highlight today ---------- */
  var Hours = {
    init: function (root) {
      var rows = util.qa('.hours__row[data-day]', root || doc);
      if (!rows.length) return;
      var today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];
      rows.forEach(function (r) {
        if (util.attr(r, 'data-day').toLowerCase() === today) {
          r.classList.add('is-today');
          var lab = r.firstElementChild;
          if (lab) lab.textContent = lab.textContent + ' · Today';
        }
      });
    }
  };

  /* ---------- COPY TO CLIPBOARD (style guide code blocks, emails) ---------- */
  var Copy = {
    init: function (root) {
      util.delegate(root || doc, '[data-copy]', 'click', function (e, el) {
        var text = util.attr(el, 'data-copy') || (el.closest('.code-block') ? util.q('pre', el.closest('.code-block')).textContent : '');
        if (!text) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { Toast.show('Copied to clipboard', 'ok', 1800); });
        } else {
          var ta = util.create('textarea'); ta.value = text; doc.body.appendChild(ta); ta.select();
          try { doc.execCommand('copy'); Toast.show('Copied to clipboard', 'ok', 1800); } catch (err) { /* noop */ }
          ta.remove();
        }
      });
    }
  };

  /* ---------- CURRENT YEAR ---------- */
  var Year = {
    init: function (root) {
      util.qa('[data-year]', root || doc).forEach(function (el) { el.textContent = new Date().getFullYear(); });
    }
  };

  /* ---------- ENQUIRY REFERENCE ----------
     /thank-you prints a reference the caller can quote. It is stored for the
     session so a reload keeps the same number instead of issuing a new one.
     The template ships a placeholder that is replaced here. */
  var Ref = {
    init: function (root) {
      util.qa('[data-ref]', root || doc).forEach(function (el) {
        var kind = el.getAttribute('data-ref') || 'enquiry';
        var key = 'woodex.ref.' + kind, value = null;
        try { value = win.sessionStorage.getItem(key); } catch (e) { /* private mode */ }
        if (!value) {
          var stamp = String(Date.now()).slice(-6);
          value = 'WOODEX-' + stamp;
          try { win.sessionStorage.setItem(key, value); } catch (e) { /* private mode */ }
        }
        el.textContent = value;
      });
    }
  };

  W.Toast = Toast; W.Forms = Forms; W.Newsletter = Newsletter;
  W.Hours = Hours; W.Copy = Copy; W.Year = Year; W.Ref = Ref; W.RX = RX;
})(window.Woodex = window.Woodex || {});
