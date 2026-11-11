/**
 * Runs before first paint so the correct theme is applied with no flash.
 * Kept as a string so it can be inlined in <head> without shipping a module.
 */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('voxa-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    var root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`.trim()
