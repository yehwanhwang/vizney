# Vizney
www.vizney.com


Vizney is a space for those who want to create more effective data visualizations. We share practical chart guides and tips to help anyone build intuitive and persuasive visuals.

Based on hands-on experience, we explore how to solve complex problems with clarity. Starting from everyday questions, we aim to provide solutions that are simple yet practical.

To us, good chart design isn’t just about aesthetics—it’s about understanding data structure and message. Vizney is here as a companion in that journey.


## What's in this repository

Static files served at **https://git.vizney.com** (GitHub Pages, `main` branch).

| Folder | Contents |
|---|---|
| `gallery/` | Dashboard styles shown in the Vizney blog gallery (one folder per style), plus recreations of Tableau Public dashboards |
| `lib/` | Shared helpers for gallery pages (`embed.js`, `embed-host.js`) |
| `country-flag-icons/` | Flag images loaded by URL from Tableau workbooks. **These paths are public: never move or rename them.** |
| `tableau-to-html/v1/` | Redirects to `gallery/superstore-executive/` so existing links keep working |

Everything pushed to `main` is published immediately. Keep work in progress off `main`.


## Gallery

### Styles

A style is a look and feel, not a dataset. The sample data only shows the style at work.

| Folder | Style | Feel | Sample data | Blog posts |
|---|---|---|---|---|
| [`chalk`](https://git.vizney.com/gallery/chalk/) | Chalk (초크) · [style.md](gallery/chalk/style.md) | Dark sidebar, pastel KPI tiles | Online store orders (fictional) | Not yet published |

### Recreations

Rebuilds of someone else's dashboard. They keep the original's name and credit its author instead of getting a style name.

| Folder | Screen | Original | Blog posts |
|---|---|---|---|
| [`superstore-executive`](https://git.vizney.com/gallery/superstore-executive/) | Superstore Executive Dashboard | [Superstore Dashboard by P. Padham](https://public.tableau.com/app/profile/p.padham/viz/SuperstoreDashboard_16709573699130/SuperstoreDashboard) (Tableau Public) | [KO](https://kr.vizney.com/recreating-tableau-public-dashboards-in-html/) · [EN](https://www.vizney.com/recreating-tableau-public-dashboards-in-html/) |


## Adding a style

1. Name the style with one evocative material or texture word (Chalk, Glass, Linen …) and use the name on its own: Vizney is the collection, not part of the name. The folder is the name in lowercase: `gallery/chalk/`. Never name a folder after its sample data.
2. Give it a one-line subtitle that says what it looks like ("Dark sidebar, pastel KPI tiles"). The name is for remembering; the subtitle is for first-time readers and search.
3. Put two files in the folder:
   - `index.html`: the sample screen, self-contained (data included), Korean and English in one file via `?lang=ko` / `?lang=en`.
   - `style.md`: layout, colors, type, components, motion and don'ts, detailed enough to rebuild the style from its name. It is published at `gallery/<name>/style.html`.
4. Add these lines to the page's `<head>`:

   ```html
   <meta name="robots" content="noindex">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@v3.3.0/css/SpoqaHanSansNeo.css">
   <script src="/lib/embed.js" defer></script>
   ```

   `noindex` keeps search traffic on the blog post instead of the bare screen.
5. In embed mode `<html>` gets the class `vz-embed`. Reset any viewport-height layout there (for example `html.vz-embed .app { min-height: 0 }`) and hide page-only notes.
6. Optional: `cover-ko.png` / `cover-en.png` (1440×810 at 2×) for the post's feature image.
7. If the style closely follows a specific design, credit it in `style.md` and in the blog post.
8. Update in place; Git history keeps the old versions. Add a row to the Styles table.


## Embedding in a Ghost post

Paste into an HTML card and change the folder, language and title:

```html
<figure class="kg-card kg-embed-card kg-width-wide">
  <iframe data-vizney-embed src="https://git.vizney.com/gallery/chalk/?lang=ko&amp;embed=1" title="Chalk 스타일 대시보드" loading="lazy" style="display:block;width:100%;height:820px;border:1px solid #e6e6e6;border-radius:12px"></iframe>
  <figcaption><a href="https://git.vizney.com/gallery/chalk/?lang=ko" target="_blank" rel="noopener">전체 화면으로 보기 ↗</a></figcaption>
</figure>
<script src="https://git.vizney.com/lib/embed-host.js" defer></script>
```

`embed-host.js` resizes the iframe to the height the page reports through `embed.js`, so the whole screen shows without an inner scrollbar. Without it, the iframe keeps its fixed height and scrolls.
