# Vizney blog home

The home screen of the Vizney blog (kr.vizney.com, later www.vizney.com). The content lives here, not in Ghost,
so it can be changed with a commit instead of editing the Ghost page.

| File | Contents |
|---|---|
| `home.ko.html` | Korean home content (hero, open standards, featured posts, services, contact band) |
| `home.css` | Styles, scoped to `#vizney-home`, plus the rules that remove the Ghost page title and padding |
| `home.js` | Loads `home.<lang>.html` into the Ghost page, then fills the featured list from `/featured/rss/` |
| `img/` | Images used by the home content |

These paths are public: the Ghost page loads them by URL. Do not move or rename them.

## How Ghost uses it

A Ghost page with the slug `home` holds one HTML card and nothing else:

```html
<link rel="stylesheet" href="https://git.vizney.com/home/home.css">
<div id="vizney-home" data-lang="ko"></div>
<script src="https://git.vizney.com/home/home.js" defer></script>
```

`routes.yaml` points the root address at that page, so the address stays `/` and `/home/` redirects to `/`:

```yaml
routes:
  /:
    data: page.home
    template: page
  /blog/:
    controller: channel
    filter: tag:-hash
  /featured/:
    controller: channel
    filter: featured:true
```

- `/blog/` is the full post list that "전체 글 보기" opens.
- `/featured/` lists posts marked Featured in Ghost; `home.js` reads its RSS for the featured section. To change the featured posts, change the Featured flags in Ghost. If the feed cannot be read, the six posts written in `home.ko.html` are shown.
- For the English site, use `data-lang="en"` and add `home.en.html`.

GitHub Pages caches files for about 10 minutes, so a change shows up on the blog within that time.
