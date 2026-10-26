// Admin enhancements: menu, local times, inline status updates, home-page toggles,
// confirmation dialogs and form validation. All actions still work as plain form posts.
(function () {
  'use strict';
  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  const csrf = (document.querySelector('meta[name="csrf-token"]') || {}).content;

  // ---- Toasts ----
  const toasts = document.querySelector('[data-toasts]');
  function toast(type, message) {
    if (!toasts) return;
    const el = document.createElement('div');
    el.className = `alert alert--${type} toast`;
    el.textContent = message;
    toasts.appendChild(el);
    setTimeout(() => {
      el.classList.add('is-leaving');
      setTimeout(() => el.remove(), 300);
    }, type === 'error' ? 7000 : 3500);
  }

  async function postJson(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded', 'X-CSRF-Token': csrf },
      body: new URLSearchParams(data),
    });
    const body = await res.json().catch(() => ({}));
    if (res.status === 401) {
      window.location.href = `/admin/login?expired=1&next=${encodeURIComponent(location.pathname + location.search)}`;
      throw new Error(body.message || 'Session expired');
    }
    if (!res.ok || !body.ok) throw new Error(body.message || 'Something went wrong. Please try again.');
    return body;
  }

  // ---- Mobile menu ----
  const menuBtn = document.querySelector('[data-admin-menu]');
  const menu = document.querySelector('[data-admin-nav]');
  if (menuBtn && menu) {
    const setOpen = (open) => {
      menuBtn.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    };
    menuBtn.addEventListener('click', () => setOpen(menuBtn.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        menuBtn.focus();
      }
    });
  }

  // ---- Show times in the viewer's own time zone ----
  const fmt = {
    datetime: new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }),
    date: new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }),
  };
  document.querySelectorAll('time[data-local]').forEach((t) => {
    const d = new Date(t.getAttribute('datetime'));
    if (!Number.isNaN(d.getTime())) {
      t.title = d.toISOString();
      t.textContent = fmt[t.dataset.local].format(d);
    }
  });

  // ---- Inline status updates ----
  document.querySelectorAll('[data-status-form]').forEach((form) => {
    const select = form.querySelector('[data-status-select]');
    if (!select) return;
    let previous = select.value;
    const isCompact = form.classList.contains('status-form--compact');
    if (!isCompact) return; // the detail page keeps its explicit Update button
    select.addEventListener('change', async () => {
      select.classList.add('is-saving');
      select.disabled = true;
      try {
        const res = await postJson(form.action, { status: select.value });
        select.className = select.className.replace(/status-select--\S+/, `status-select--${res.status}`);
        previous = select.value;
        toast('success', res.message);
      } catch (err) {
        select.value = previous;
        toast('error', err.message);
      } finally {
        select.disabled = false;
        select.classList.remove('is-saving');
        select.focus();
      }
    });
  });

  // ---- Home page feature toggles ----
  document.querySelectorAll('[data-feature-form]').forEach((form) => {
    const btn = form.querySelector('[data-switch]');
    const input = form.querySelector('input[name="show"]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      btn.setAttribute('aria-busy', 'true');
      try {
        const res = await postJson(form.action, { show: input.value });
        btn.setAttribute('aria-checked', String(res.show));
        input.value = res.show ? '0' : '1';
        toast('success', res.message);
        const subtitle = document.querySelector('.admin-page-header p');
        const count = document.querySelectorAll('[data-switch][aria-checked="true"]').length;
        if (subtitle) subtitle.textContent = subtitle.textContent.replace(/\d+ shown on the home page/, `${count} shown on the home page`);
      } catch (err) {
        toast('error', err.message);
      } finally {
        btn.removeAttribute('aria-busy');
      }
    });
  });

  // ---- Confirmation dialog for destructive actions ----
  const dialog = document.querySelector('[data-confirm-dialog]');
  document.querySelectorAll('form[data-confirm]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      if (form.dataset.confirmed === '1') return;
      e.preventDefault();
      const trigger = document.activeElement;
      if (!dialog || typeof dialog.showModal !== 'function') {
        if (window.confirm(form.dataset.confirm)) {
          form.dataset.confirmed = '1';
          form.submit();
        }
        return;
      }
      dialog.querySelector('[data-confirm-message]').textContent = form.dataset.confirm;
      dialog.returnValue = '';
      dialog.showModal();
      dialog.querySelector('button[value="cancel"]').focus();
      dialog.addEventListener(
        'close',
        () => {
          if (dialog.returnValue === 'confirm') {
            form.dataset.confirmed = '1';
            form.submit();
          } else if (trigger) trigger.focus();
        },
        { once: true }
      );
    });
  });

  // ---- Client-side validation for admin forms ----
  if (window.FormValidation) {
    const FV = window.FormValidation;
    document.querySelectorAll('form[data-validate]').forEach((form) => {
      const labels = FV.labelsOf(form);
      FV.attachLive(form);
      form.addEventListener('submit', (e) => {
        const errors = FV.validateForm(form);
        if (Object.keys(errors).length) {
          e.preventDefault();
          FV.renderSummary(form, errors, labels);
          if (!form.querySelector('[data-error-summary]')) {
            const first = form.querySelector('[aria-invalid="true"]');
            if (first) first.focus();
          }
        } else {
          const btn = form.querySelector('button[type="submit"]');
          if (btn) btn.setAttribute('aria-busy', 'true');
        }
      });
    });
  }

  // Focus the first error summary rendered by the server so screen readers announce it.
  const serverSummary = document.querySelector('[data-error-summary]:not([hidden])');
  if (serverSummary) serverSummary.focus();
})();
