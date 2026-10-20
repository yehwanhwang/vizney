/*!
 * Vizney embed helper — page side
 *
 * Include once in every gallery page:
 *   <script src="/lib/embed.js" defer></script>
 *
 * Opened with ?embed=1 inside an iframe, the page:
 *   - gets the class `vz-embed` on <html> (use it to hide page-only bits and
 *     to drop viewport-height layouts such as `min-height: 100vh`)
 *   - reports its content height to the host page, where lib/embed-host.js
 *     resizes the iframe so the whole screen shows without an inner scrollbar.
 * The inner scrollbar is only hidden after the host answers, so the page
 * still scrolls normally if the host script is missing.
 */
(function () {
  'use strict';

  var params;
  try { params = new URLSearchParams(window.location.search); } catch (e) { return; }
  if (params.get('embed') !== '1' || window.parent === window) return;

  var MSG_HEIGHT = 'vizney:embed-height';
  var MSG_PING = 'vizney:embed-ping';
  var root = document.documentElement;
  root.classList.add('vz-embed');

  var style = document.createElement('style');
  style.textContent =
    'html.vz-embed,html.vz-embed body{min-height:0!important;height:auto!important}' +
    'html.vz-embed-managed{overflow:hidden!important}';
  (document.head || root).appendChild(style);

  var last = -1;
  var queued = false;

  function send() {
    queued = false;
    var h = Math.ceil(root.getBoundingClientRect().height);
    if (!h || h === last) return;
    last = h;
    window.parent.postMessage({ type: MSG_HEIGHT, height: h }, '*');
  }

  // A microtask, not requestAnimationFrame: browsers pause rAF in cross-origin
  // iframes that are off screen, so an embed below the fold would never report.
  function schedule() {
    if (queued) return;
    queued = true;
    Promise.resolve().then(send);
  }

  // The host pings on load: from then on it owns the height, so hide the inner scrollbar.
  window.addEventListener('message', function (e) {
    if (e.source !== window.parent || !e.data || e.data.type !== MSG_PING) return;
    root.classList.add('vz-embed-managed');
    last = -1;
    schedule();
  });

  function start() {
    if (window.ResizeObserver) new ResizeObserver(schedule).observe(root);
    window.addEventListener('load', schedule);
    window.addEventListener('resize', schedule);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    schedule();
  }

  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);
})();
