/*!
 * Vizney embed helper — host side (Ghost post)
 *
 * Put next to the iframe in a Ghost HTML card:
 *   <iframe data-vizney-embed src="https://git.vizney.com/gallery/<slug>/?lang=ko&amp;embed=1" ...></iframe>
 *   <script src="https://git.vizney.com/lib/embed-host.js" defer></script>
 *
 * Resizes every iframe[data-vizney-embed] to the content height its page
 * reports through lib/embed.js. Messages are accepted only from the origin
 * of the iframe's own src. Safe to include more than once on a page.
 */
(function () {
  'use strict';

  if (window.__vizneyEmbedHost) { window.__vizneyEmbedHost.scan(); return; }

  var MSG_HEIGHT = 'vizney:embed-height';
  var MSG_PING = 'vizney:embed-ping';
  var MIN_HEIGHT = 240;
  var MAX_HEIGHT = 20000;

  function frames() {
    return Array.prototype.slice.call(document.querySelectorAll('iframe[data-vizney-embed]'));
  }

  function originOf(frame) {
    try { return new URL(frame.getAttribute('src'), window.location.href).origin; } catch (e) { return null; }
  }

  function ping(frame) {
    var origin = originOf(frame);
    if (!origin || !frame.contentWindow) return;
    try { frame.contentWindow.postMessage({ type: MSG_PING }, origin); } catch (e) { /* not loaded yet */ }
  }

  function bind(frame) {
    if (frame.__vizneyBound) return;
    frame.__vizneyBound = true;
    frame.addEventListener('load', function () { ping(frame); });
    ping(frame);
  }

  function scan() { frames().forEach(bind); }

  window.addEventListener('message', function (e) {
    var data = e.data;
    if (!data || data.type !== MSG_HEIGHT) return;
    var list = frames();
    for (var i = 0; i < list.length; i++) {
      var frame = list[i];
      if (frame.contentWindow !== e.source) continue;
      if (originOf(frame) !== e.origin) return;
      var h = Math.round(Number(data.height));
      if (!isFinite(h)) return;
      h = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, h));
      // Themes often set `box-sizing: border-box` globally; then the height must include the frame's border and padding.
      var cs = window.getComputedStyle(frame);
      if (cs.boxSizing === 'border-box') {
        h += Math.ceil(parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) +
                       parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)) || 0;
      }
      if (frame.style.height !== h + 'px') frame.style.height = h + 'px';
      if (!frame.__vizneyAcked) { frame.__vizneyAcked = true; ping(frame); }
      return;
    }
  });

  window.__vizneyEmbedHost = { scan: scan };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();
})();
