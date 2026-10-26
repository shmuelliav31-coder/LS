// Runs in <head> before the page paints, so the saved theme and language
// are applied without a flash.
(function () {
  var root = document.documentElement;
  var theme = null;
  var lang = null;

  try {
    theme = localStorage.getItem('ls-theme');
    lang = localStorage.getItem('ls-lang');
  } catch (e) {
    // Storage can be blocked (private mode, strict settings). Fall through to defaults.
  }

  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', theme);

  if (lang === 'he') {
    root.lang = 'he';
    root.dir = 'rtl';
  }
})();
