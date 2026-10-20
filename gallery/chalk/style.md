# Vizney Chalk

**Dark sidebar, pastel KPI tiles** · 다크 사이드바와 파스텔 KPI 카드

A charcoal chalkboard frame with soft chalk-pastel cards on a clean white canvas. Calm, friendly and quick to scan: the pastels color the tiles, while the data marks stay thin and dark.

- Live sample: https://git.vizney.com/gallery/chalk/ (add `?lang=en` for English)
- To reuse it, ask for "the Vizney Chalk style" and share this page: https://git.vizney.com/gallery/chalk/style.html


## Layout

- App shell: dark sidebar (232px) beside a white main area (max 1320px, 36px side padding).
- Header row: page title (22px bold) on the left; search and notification icons, a KO/EN segmented toggle and the avatar on the right.
- One row of filter pills under the title. They scope every card below; cards never carry their own filters.
- Section label row: section name on the left, period note ("Last 30 days · vs. previous 30 days") on the right.
- Row 1: four KPI tiles of equal width, 16px gap.
- Row 2: the main chart card (2fr) next to a side card (1fr, min 320px).
- Below 1180px the tiles go 2 × 2 and the chart cards stack. Below 860px the sidebar becomes a top bar with a menu button.


## Color

| Token | Hex | Use |
|---|---|---|
| ink | `#161616` | primary text |
| ink-2 | `#474747` | secondary text |
| muted | `#8B8B8B` | subtitles, legend values |
| faint | `#A3A3A3` | axis ticks |
| surface | `#FFFFFF` | page and card background |
| border | `#EAEAEA` | outline of chart cards |
| grid | `#EFEFEF` | gridlines |
| sidebar | `#1D1D1D` | sidebar (hover `#272727`, active `#333333`, text `#B5B5B5`) |
| pill / pill-active | `#F1F1F1` / `#D2E7F3` | filter pills |
| tile-blue | `#D2E7F3` | KPI tile 1 |
| tile-green | `#D9EEC8` | KPI tile 2 |
| tile-orange | `#FEC48E` | KPI tile 3 |
| tile-dark | `#2A2A2A` | KPI tile 4, white text |
| good / bad | `#1E8449` / `#D0392B` | delta arrows only |

Chart marks, checked for color-vision deficiency against white:

- Line series: ink `#1A1A1A` (solid, the main series) and green `#478F35` (dashed 6/5, the comparison).
- Categories: up to three hues, `#5EA6DA`, `#478F35`, `#F39D52`, plus gray `#8C8C8C` for "other".

Pastels are for tile backgrounds only, never for marks or text.


## Type

- Spoqa Han Sans Neo: `https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@v3.3.0/css/SpoqaHanSansNeo.css`
- Body 13px. Card titles 15px bold with a 13px muted subtitle. KPI values 28px bold. The value in the gauge center 30px bold.
- Units and suffixes (억, 건, 원, %, M, ₩) sit next to the number at 13px bold.
- A KPI tile uses two sizes only: the value and everything else. Weight and color do the rest.
- `tabular-nums` only where numbers line up: axis ticks, tooltip and legend values.


## Components

- **KPI tile:** 12px radius, 18 × 20px padding, no border. Outline icon (20px) top left. Value and delta chip on one line, label underneath. The delta chip is white with a 6px radius; its arrow is green or red by direction × whether up is good, and its text stays ink.
- **Chart card:** white, 1px border, 12px radius, 20 × 22px padding.
- **Line chart:** 2px monotone curves, 1px solid gridlines, hollow end markers (4.5px radius) on the main series. Focus pinned at the peak with a 1px ink crosshair; a dark tooltip (`#232323`, 8px radius) lists every series with line keys.
- **Gauge donut:** 270° arc, 20px stroke, 3° gaps between segments, round caps on the two outer ends only. The center shows a label over the total; hovering a segment or legend item switches it to that category's share.
- **Legend:** 11px dot, bold name, muted value and share, in a two-column grid.
- **Icons:** outline, 1.8px stroke, round caps.


## Motion and interaction

- Changing a filter fades the KPI values (140ms) and tweens lines and arcs (480ms, ease-out).
- Every chart has a hover tooltip; arrow keys move the line chart's focus. Motion is off under `prefers-reduced-motion`.


## Don'ts

- No card inside a card.
- No gradients or shadows on cards; only tooltips cast a shadow.
- No more than three colored categories; fold the rest into gray "other".
- No dual axes.


## Credits

The composition follows a SaaS analytics dashboard UI reference. Colors were re-validated, and type, data and copy were rebuilt for Vizney.
