/* Vizney blog home. www.vizney.com is English and kr.vizney.com is Korean, and the files follow the
   same pattern: home.html is the English home, home.kr.html the Korean one.
   The Ghost "Home" page holds only <div id="vizney-home" data-lang="en|ko"> and this script.
   It loads the matching file from git.vizney.com into that div, then fills the featured list from
   the blog's /featured/rss/ (Featured posts whose primary tag is Tips & Tricks or Knowledge Base,
   as set in routes.yaml). If the feed cannot be read, the six posts written in the file stay. */
(function () {
  var root = document.getElementById('vizney-home');
  if (!root || !window.fetch) return;

  var base = 'https://git.vizney.com/home/';
  var kr = /^(ko|kr)$/.test(root.getAttribute('data-lang') || '');
  var fallback = kr
    ? '<p class="vz-fallback"><a href="/blog/">전체 글 보기</a> · <a href="/contact-us/">작업 문의</a></p>'
    : '<p class="vz-fallback"><a href="/blog/">All posts</a> · <a href="/contact-us/">Contact</a></p>';

  fetch(base + (kr ? 'home.kr.html' : 'home.html'), { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
    .then(function (html) {
      root.innerHTML = html;
      root.setAttribute('data-ready', '');
      if (location.hash) {
        var target = document.getElementById(location.hash.slice(1));
        if (target) target.scrollIntoView();
      }
      fillFeatured(root.querySelector('[data-featured]'));
    })
    .catch(function () {
      root.innerHTML = fallback;
      root.setAttribute('data-ready', '');
    });

  function fillFeatured(box) {
    if (!box || !window.DOMParser) return;
    fetch('/featured/rss/')
      .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
      .then(function (text) {
        var xml = new DOMParser().parseFromString(text, 'text/xml');
        var items = Array.prototype.slice.call(xml.querySelectorAll('item'), 0, 6);
        if (!items.length) return;
        box.innerHTML = '';
        items.forEach(function (item) {
          var link = item.querySelector('link');
          var title = item.querySelector('title');
          if (!link || !title) return;
          var a = document.createElement('a');
          a.className = 'vz-post';
          a.href = link.textContent.trim();
          var tag = item.querySelector('category');
          var label = document.createElement('span');
          label.className = 'vz-label';
          label.textContent = tag ? tag.textContent.trim() : '';
          var name = document.createElement('span');
          name.className = 'vz-post-title';
          name.textContent = title.textContent.trim();
          a.appendChild(label);
          a.appendChild(name);
          box.appendChild(a);
        });
      })
      .catch(function () {});
  }
})();
