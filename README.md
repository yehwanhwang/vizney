# Vizney
www.vizney.com


Vizney is a space for those who want to create more effective data visualizations. We share practical chart guides and tips to help anyone build intuitive and persuasive visuals.

Based on hands-on experience, we explore how to solve complex problems with clarity. Starting from everyday questions, we aim to provide solutions that are simple yet practical.

To us, good chart design isn’t just about aesthetics—it’s about understanding data structure and message. Vizney is here as a companion in that journey.


## What's in this repository

Static files served at **https://git.vizney.com** (GitHub Pages, `main` branch).

| Folder | Contents |
|---|---|
| `gallery/` | Standalone HTML dashboards shown in the Vizney blog gallery, one folder per screen |
| `lib/` | Shared helpers for gallery pages (`embed.js`, `embed-host.js`) |
| `country-flag-icons/` | Flag images loaded by URL from Tableau workbooks. **These paths are public: never move or rename them.** |
| `tableau-to-html/v1/` | Redirects to `gallery/superstore-executive/` so existing links keep working |

Everything pushed to `main` is published immediately. Keep work in progress off `main`.


## Gallery

| Folder | Screen | Based on | Blog posts |
|---|---|---|---|
| [`order-analytics`](https://git.vizney.com/gallery/order-analytics/) | Order analytics dashboard (fictional data) | UI style reference only; layout, data and copy are original | Not yet published |
| [`superstore-executive`](https://git.vizney.com/gallery/superstore-executive/) | Superstore Executive Dashboard | [Superstore Dashboard by P. Padham](https://public.tableau.com/app/profile/p.padham/viz/SuperstoreDashboard_16709573699130/SuperstoreDashboard) (Tableau Public) | [KO](https://kr.vizney.com/recreating-tableau-public-dashboards-in-html/) · [EN](https://www.vizney.com/recreating-tableau-public-dashboards-in-html/) |


## Adding a screen

1. Save the page as `gallery/<folder>/index.html`. Name the folder after the screen's topic in lowercase English with hyphens (`order-analytics`). Leave versions, languages and reference sources out of the name.
2. Update a screen in place; Git history keeps the old versions. A completely different screen gets a new folder.
3. Keep Korean and English in the same file, switched with `?lang=ko` / `?lang=en`.
4. Keep each page self-contained (data included). Add these lines to `<head>`:

   ```html
   <meta name="robots" content="noindex">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@v3.3.0/css/SpoqaHanSansNeo.css">
   <script src="/lib/embed.js" defer></script>
   ```

   `noindex` keeps search traffic on the blog post instead of the bare screen.
5. In embed mode `<html>` gets the class `vz-embed`. Reset any viewport-height layout there (for example `html.vz-embed .app { min-height: 0 }`) and hide page-only notes.
6. Optional: `cover-ko.png` / `cover-en.png` (1440×810 at 2×) for the post's feature image.
7. Add a row to the Gallery table above.


## Embedding in a Ghost post

Paste into an HTML card and change the folder, language and title:

```html
<figure class="kg-card kg-embed-card kg-width-wide">
  <iframe data-vizney-embed src="https://git.vizney.com/gallery/order-analytics/?lang=ko&amp;embed=1" title="주문 분석 대시보드" loading="lazy" style="display:block;width:100%;height:820px;border:1px solid #e6e6e6;border-radius:12px"></iframe>
  <figcaption><a href="https://git.vizney.com/gallery/order-analytics/?lang=ko" target="_blank" rel="noopener">전체 화면으로 보기 ↗</a></figcaption>
</figure>
<script src="https://git.vizney.com/lib/embed-host.js" defer></script>
```

`embed-host.js` resizes the iframe to the height the page reports through `embed.js`, so the whole screen shows without an inner scrollbar. Without it, the iframe keeps its fixed height and scrolls.
