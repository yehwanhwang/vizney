# Vizney blog home

The home screen of the Vizney blog: kr.vizney.com in Korean and www.vizney.com in English. The content lives here, not in Ghost,
so it can be changed with a commit instead of editing the Ghost page.

| File | Contents |
|---|---|
| `home.ko.html` | Korean home content (hero, open standards, featured posts, services, contact band) |
| `home.en.html` | English home content, same structure and classes as `home.ko.html` |
| `home.css` | Styles, scoped to `#vizney-home`, plus the rules that remove the Ghost page title and padding. Shared by both languages |
| `home.js` | Loads `home.<lang>.html` into the Ghost page, then fills the featured list from `/featured/rss/` |
| `img/` | Images used by the home content. English versions of the card images end in `-en` |

These paths are public: the Ghost page loads them by URL. Do not move or rename them.

When you change one language, make the same change in the other file so the two homes keep the same structure.

## How Ghost uses it

On each site, a Ghost page with the slug `home` holds one HTML card and nothing else. kr.vizney.com uses `data-lang="ko"`, www.vizney.com uses `data-lang="en"`:

```html
<link rel="stylesheet" href="https://git.vizney.com/home/home.css">
<div id="vizney-home" data-lang="ko"></div>
<script src="https://git.vizney.com/home/home.js" defer></script>
```

`routes.yaml` (the same file on both sites) points the root address at that page, so the address stays `/` and `/home/` redirects to `/`:

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

- `/blog/` is the full post list that "전체 글 보기" and "All posts" open.
- `/featured/` lists posts marked Featured in Ghost; `home.js` reads its RSS for the featured section and shows the six newest. To change the featured posts, change the Featured flags in Ghost. If the feed cannot be read, the six posts written in `home.<lang>.html` are shown.

GitHub Pages caches files for about 10 minutes, so a change shows up on the blog within that time.
