# Vizney
www.vizney.com


Vizney is a space for those who want to create more effective data visualizations. We share practical chart guides and tips to help anyone build intuitive and persuasive visuals.

Based on hands-on experience, we explore how to solve complex problems with clarity. Starting from everyday questions, we aim to provide solutions that are simple yet practical.

To us, good chart design isn’t just about aesthetics—it’s about understanding data structure and message. Vizney is here as a companion in that journey.


## What's in this repository

Static files served at **https://git.vizney.com** (GitHub Pages, `main` branch).

| Folder | Contents |
|---|---|
| `gallery/` | Recreations of other people's dashboards shown in the Vizney blog gallery, one folder per screen |
| `lib/` | Embed helpers for those pages (`embed.js`, `embed-host.js`) |
| `country-flag-icons/` | Flag images loaded by URL from Tableau workbooks. **These paths are public: never move or rename them.** |

Named dashboard styles such as Chalk live in [Vizney Styles](https://styles.vizney.com) ([repository](https://github.com/yehwanhwang/vizney-styles)).

Everything pushed to `main` is published immediately. Keep work in progress off `main`.


## Recreations

Rebuilds of someone else's dashboard. They keep the original's name and credit its author.

| Folder | Screen | Original | Blog posts |
|---|---|---|---|
| [`superstore-executive`](https://git.vizney.com/gallery/superstore-executive/) | Superstore Executive Dashboard | [Superstore Dashboard by P. Padham](https://public.tableau.com/app/profile/p.padham/viz/SuperstoreDashboard_16709573699130/SuperstoreDashboard) (Tableau Public) | [KO](https://kr.vizney.com/recreating-tableau-public-dashboards-in-html/) · [EN](https://www.vizney.com/recreating-tableau-public-dashboards-in-html/) |


## Adding a recreation

1. Save the page as `gallery/<folder>/index.html`, named after the original screen in lowercase English with hyphens.
2. Credit the original author with a link, here and in the blog post.
3. Add these lines to the page's `<head>`:

   ```html
   <meta name="robots" content="noindex">
   <script src="/lib/embed.js" defer></script>
   ```

4. In embed mode `<html>` gets the class `vz-embed`. Reset any viewport-height layout there and hide page-only notes.
5. Add a row to the Recreations table.


## Embedding in a Ghost post

Paste into an HTML card and change the folder and title:

```html
<figure class="kg-card kg-embed-card kg-width-wide">
  <iframe data-vizney-embed src="https://git.vizney.com/gallery/superstore-executive/?embed=1" title="Superstore Executive Dashboard" loading="lazy" style="display:block;width:100%;height:900px;border:1px solid #e6e6e6;border-radius:12px"></iframe>
  <figcaption><a href="https://git.vizney.com/gallery/superstore-executive/" target="_blank" rel="noopener">전체 화면으로 보기 ↗</a></figcaption>
</figure>
<script src="https://git.vizney.com/lib/embed-host.js" defer></script>
```

`embed-host.js` resizes the iframe to the height the page reports through `embed.js`, so the whole screen shows without an inner scrollbar. Without it, the iframe keeps its fixed height and scrolls.
