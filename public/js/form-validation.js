// Shared client-side validation helpers (progressive enhancement; the server re-validates everything).
(function () {
  'use strict';

  const MESSAGES = {
    valueMissing: (el) => (el.type === 'checkbox' ? 'Please tick this box to continue.' : el.tagName === 'SELECT' ? 'Please choose an option.' : 'This field is required.'),
    typeMismatch: (el) => (el.type === 'email' ? 'Please enter a valid email address, like name@company.com.' : 'Please check the format.'),
    tooShort: (el) => `Please enter at least ${el.minLength} characters (currently ${el.value.trim().length}).`,
    tooLong: (el) => `Please use ${el.maxLength} characters or fewer.`,
    rangeUnderflow: (el) => `Please enter ${el.min} or more.`,
    rangeOverflow: (el) => `Please enter ${el.max} or less.`,
    stepMismatch: () => 'Please enter a whole number.',
    badInput: () => 'Please enter a valid value.',
  };

  function messageFor(el) {
    // minlength is only enforced by browsers after user edits, so check it explicitly.
    if (el.required && !el.value.trim() && el.type !== 'checkbox') return MESSAGES.valueMissing(el);
    if (el.minLength > 0 && el.value.trim().length > 0 && el.value.trim().length < el.minLength) return MESSAGES.tooShort(el);
    const v = el.validity;
    for (const key in MESSAGES) if (v[key]) return MESSAGES[key](el);
    return '';
  }

  function setError(form, name, message) {
    const field = form.querySelector(`[data-field="${name}"]`);
    if (!field) return;
    const el = field.querySelector('input, select, textarea');
    const out = field.querySelector('.field__error');
    field.classList.toggle('field--error', !!message);
    if (el) {
      if (message) el.setAttribute('aria-invalid', 'true');
      else el.removeAttribute('aria-invalid');
    }
    if (out) out.textContent = message || '';
  }

  function validateField(form, el) {
    const name = el.closest('[data-field]') && el.closest('[data-field]').dataset.field;
    if (!name) return true;
    const msg = messageFor(el);
    setError(form, name, msg);
    return !msg;
  }

  function renderSummary(form, errors, labels) {
    const box = form.querySelector('[data-error-summary]');
    if (!box) return;
    const keys = Object.keys(errors);
    box.replaceChildren();
    if (!keys.length) {
      box.hidden = true;
      box.removeAttribute('role');
      return;
    }
    const h = document.createElement('h2');
    h.className = 'error-summary__title';
    h.textContent = keys.length === 1 ? 'Please fix this problem:' : `Please fix these ${keys.length} problems:`;
    const ul = document.createElement('ul');
    keys.forEach((k) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${k}`;
      a.textContent = (labels[k] ? `${labels[k]}: ` : '') + errors[k];
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = form.querySelector(`#${CSS.escape(k)}`);
        if (target) target.focus();
      });
      li.appendChild(a);
      ul.appendChild(li);
    });
    box.append(h, ul);
    box.hidden = false;
    box.setAttribute('role', 'alert');
    box.focus();
  }

  function labelsOf(form) {
    const labels = {};
    form.querySelectorAll('[data-field]').forEach((f) => {
      const l = f.querySelector('label');
      if (l) labels[f.dataset.field] = l.textContent.replace(/\*|\(optional\)/g, '').trim();
    });
    return labels;
  }

  // Validates every field; returns an errors object keyed by field name.
  function validateForm(form) {
    const errors = {};
    form.querySelectorAll('[data-field] input, [data-field] select, [data-field] textarea').forEach((el) => {
      const name = el.closest('[data-field]').dataset.field;
      const msg = messageFor(el);
      setError(form, name, msg);
      if (msg) errors[name] = msg;
    });
    return errors;
  }

  // Live re-validation once a field has been touched.
  function attachLive(form) {
    form.addEventListener('focusout', (e) => {
      const el = e.target;
      if (el.matches('input, select, textarea') && (el.value || el.closest('.field--error'))) validateField(form, el);
    });
    form.addEventListener('input', (e) => {
      if (e.target.closest('.field--error')) validateField(form, e.target);
    });
    form.addEventListener('change', (e) => {
      if (e.target.matches('select, input[type="checkbox"]')) validateField(form, e.target);
    });
  }

  window.FormValidation = { validateForm, setError, renderSummary, labelsOf, attachLive };
})();
