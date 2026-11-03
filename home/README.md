# Vizney blog home

The home screen of the Vizney blog. The file names follow the domains: www.vizney.com is English and uses the plain
names, kr.vizney.com is Korean and adds `kr`. The content lives here, not in Ghost, so it can be changed with a commit
instead of editing the Ghost page.

| File | Contents |
|---|---|
| `home.html` | English home for www.vizney.com (hero, open standards, featured posts, services, contact band) |
| `home.kr.html` | Korean home for kr.vizney.com, same structure and classes as `home.html` |
| `home.css` | Styles, scoped to `#vizney-home`, plus the rules that remove the Ghost page title and padding. Shared by both sites |
| `home.js` | Loads `home.html` or `home.kr.html` into the Ghost page, then fills the featured list from `/featured/rss/` |
| `img/` | Images used by the home content. English images use the plain name (`styles.png`), Korean ones add `-kr` (`styles-kr.png`) |

These paths are public: the Ghost pages load them by URL. Do not move or rename them without changing `home.js` and both Ghost pages.

When you change one language, make the same change in the other file so the two homes keep the same structure.

## How Ghost uses it

On each site, a Ghost page with the slug `home` holds one HTML card and nothing else. www.vizney.com uses `data-lang="en"`, kr.vizney.com uses `data-lang="ko"`:

```html
<link rel="stylesheet" href="https://git.vizney.com/home/home.css">
<div id="vizney-home" data-lang="en"></div>
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
    filter: 'featured:true+primary_tag:[tips,kb]'
```

- `/blog/` is the full post list that "All posts" and "전체 글 보기" open.
- `/featured/` lists the posts marked Featured whose primary tag is Tips & Tricks (`tips`) or Knowledge Base (`kb`). `home.js` reads its RSS and shows the six newest. To change the featured posts, change the Featured flags in Ghost; to change which kinds of posts appear, change this filter on both sites. If the feed cannot be read, the six posts written in the HTML file are shown.

GitHub Pages caches files for about 10 minutes, so a change shows up on the blog within that time.
