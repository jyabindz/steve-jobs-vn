# Apple.com Homepage — Raw Design Specification Extract

- **Source URL**: `https://www.apple.com/`
- **CDP Target ID**: `80475A27BB8DE29AF8497CAA428DB5EC` (`http://127.0.0.1:9222`)
- **Screenshot Viewport**: `1908x1002` (`capture_web_screenshot`)
- **Stylesheets Inspected**:
  - `https://www.apple.com/api-www/global-elements/global-header/v1/assets/globalheader.css`
  - `https://www.apple.com/v/homepage/a/styles/main.built.css`
  - `https://www.apple.com/v/homepage/a/styles/homepage.built.css`
  - `https://www.apple.com/v/homepage/a/styles/inline-media.built.css`
  - `https://www.apple.com/homepage/styles/index_3djd5z2w.built.css`
  - `https://www.apple.com/autopush/us/fam-gallery/styles/home-gallery.built.css`
  - `https://www.apple.com/wss/fonts?families=SF+Pro,v3|SF+Pro+Icons,v3`

---

## 1. Layout Geometry

### 1.1 Navbar (`#globalnav`, `globalheader.css` & `homepage.built.css`)
- **Positioning**: `position: absolute; top: 0; right: 0; left: 0; z-index: 9999; display: block; margin: 0; width: 100%; min-width: 320px;` (in `homepage.built.css` `#globalnav` is fixed; `--globalnav-height: 44px`, `48px` at `max-width: 833px`).
- **Dimensions**:
  - Desktop: `--r-globalnav-height: 44px; height: 48px; max-height: 44px;`
  - Mobile (`max-width: 833px`): `--r-globalnav-height: 48px; max-height: none;`
  - `.globalnav-placeholder`: `height: 44px;` (`48px` at `max-width: 833px`).
- **Container (`.globalnav-content`)**:
  - `margin: 0 auto; box-sizing: border-box; width: 100%; max-width: 1024px;`
  - `padding-inline-start: max(22px, var(--r-globalnav-safe-area-inset-start));`
  - `padding-inline-end: max(22px, var(--r-globalnav-safe-area-inset-end));`
- **Flex List (`.globalnav-list`)**:
  - `display: flex; justify-content: space-between; width: auto; height: 44px; margin: 0 -8px; list-style: none;`
- **Items & Links (`.globalnav-item`, `.globalnav-link`)**:
  - `.globalnav-item`: `box-sizing: border-box; height: 44px;`
  - `.globalnav-link`: `padding: 0 calc(8px / var(--r-globalnav-text-zoom-scale, 1)); height: 44px; display: flex; align-items: center; justify-content: center;`
- **Backdrop Filter**: `backdrop-filter: var(--globalnav-backdrop-filter);` (`saturate(180%) blur(20px)`).

### 1.2 Page Sections & Hero Banner Blocks (`section.section.section-hero`, `homepage.built.css`)
- **Section Container (`.section`)**: Grid `1fr`, `gap: 12px`.
- **Hero Content Heights (`--hero-content-height`)**: `580px` / `570px` / `500px` / `692px` / `650px` (across responsive breakpoints).
- **Hero Tiles in `<main>`** (3 full-width hero blocks):
  1. **Holiday 2026** (`data-tile-id="holiday-2026"`, `.theme-dark`, `data-holiday-default="pink"`):
     - Headline: `Gifts they’ll love.`
     - Subhead: `Find their perfect match this holiday.`
     - CTA: `Shop gifts` (`/us/shop/goto/store`)
  2. **iPhone Duo** (`data-tile-id="iphone-duo"`, light theme):
     - Headline: `iPhone Duo`
     - Subhead: `Hello, Hello. hello.`
     - CTAs: `Learn more` (`/iphone-duo/`), `Buy` (`/us/shop/goto/buy_iphone/iphone_duo`, `.button-secondary`)
  3. **MacBook Pro** (`data-tile-id="macbook-pro-proled-xdr"`, `.tile-macbook-proled.theme-dark`):
     - Headline: `MacBook Pro`
     - Subhead: `PROLED XDR Display`
     - CTAs: `Learn more` (`/macbook-pro/proled-xdr-display/`), `Buy` (`/us/shop/goto/buy_mac/macbook_pro_proled_xdr`)

### 1.3 Bento Grid / Promo Grid (`section.section.section-promo`, `homepage.built.css`)
- **Grid**: `grid-template-columns: 1fr 1fr;` (`gap: 12px`), collapsing to `1fr` at `max-width: 734px`.
- **Promo Content Heights (`--promo-content-height`)**: `580px` / `490px` / `500px` (across responsive breakpoints).
- **Promo Tiles in `<main>`** (6 tiles in 2-column Bento grid):
  1. **iPhone 18 Pro** (`data-tile-id="iphone-18-pro"`, `.theme-dark`): `iPhone 18 Pro` / `Pro further.`
  2. **Apple Watch Series 12** (`data-tile-id="apple-watch-series-12"`, `.theme-dark`, `.tile-content-split`): Logo image + `The most accurate heart rate sensing in a wearable.`
  3. **iPad** (`data-tile-id="ipad"`, light theme): `iPad` / `Now with the speed of the A16 chip and double the starting storage.`
  4. **AirPods Pro 3** (`data-tile-id="airpods-pro-3"`, light theme): `AirPods Pro 3` / `The world’s best in-ear Active Noise Cancellation.`
  5. **Apple Upgrade** (`data-tile-id="apple-upgrade"`, light theme): Logo image + `Love it. Lease it. Upgrade it.`
  6. **Apple Card** (`data-tile-id="apple-card"`, light theme): Logo image + `Get up to 3% Daily Cash back with every purchase.`

### 1.4 General 12-Column Grid & Containers (`main.built.css`)
- **`.grid`**: `display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); grid-column-gap: 24px; grid-row-gap: 24px; padding: 24px 24px;` (`--sk-cssgrid-columns: 12`, outer/inner gutter `24px`, bottom outer `0` by default).
- **`.viewport-content`**: `width: 980px;` (`692px` at `max-width: 1068px`, `87.5%` at `max-width: 734px`).
- **`.responsive-content`**: `max-width: 1680px; width: 87.5%;` (`max-width: 420px` at `max-width: 734px`).

### 1.5 Endless Entertainment Gallery (`section.section-endless-entertainment-gallery`, `index_3djd5z2w.built.css` & `home-gallery.built.css`)
- **`.endless-entertainment`**: `padding-top: 53px;` (`36px` responsive).
- **`.fam-media-gallery`**: `--media-gallery-tile-width: 417px;` (`470px` at `min-width: 1441px`, `188px` at `max-width: 1068px`).

### 1.6 Buttons (`main.built.css`)
- **`.button`**: `border-radius: 980px; padding: 9px 16px; border-width: 1px;` (`--sk-button-padding-vertical: 9px; --sk-button-padding-horizontal: 16px;`).
- **`.button-elevated`**: `padding: 12px 22px;`
- **`.button-super`**: `padding: 18px 31px;`

---

## 2. Color Palette

### 2.1 Theme Tokens (`main.built.css`)
- **`.theme-light` (default)**:
  - `--sk-body-background-color`: `rgb(255, 255, 255)` (`#ffffff`)
  - `--sk-body-text-color`: `rgb(29, 29, 31)` (`#1d1d1f`)
  - `--sk-headline-text-color`: `rgb(29, 29, 31)` (`#1d1d1f`)
  - `--sk-body-link-color`: `rgb(0, 102, 204)` (`#0066cc`)
  - `--sk-fill`: `rgb(255, 255, 255)`
  - `--sk-fill-secondary`: `rgb(250, 250, 252)`
  - `--sk-fill-tertiary`: `rgb(245, 245, 247)` (`#f5f5f7`)
  - `--sk-fill-gray`: `rgb(29, 29, 31)`
  - `--sk-fill-gray-secondary`: `rgb(134, 134, 139)` (`#86868b`)
  - `--sk-fill-gray-tertiary`: `rgb(210, 210, 215)`
  - `--sk-fill-gray-quaternary`: `rgb(232, 232, 237)`
  - `--sk-fill-blue`: `rgb(0, 113, 227)` (`#0071e3`)
  - `--sk-tile-background`: `rgb(255, 255, 255)`
- **`.theme-dark`**:
  - `--sk-body-background-color`: `rgb(0, 0, 0)` (`#000000`)
  - `--sk-body-text-color`: `rgb(245, 245, 247)` (`#f5f5f7`)
  - `--sk-headline-text-color`: `rgb(245, 245, 247)` (`#f5f5f7`)
  - `--sk-body-link-color`: `rgb(41, 151, 255)` (`#2997ff`)
  - `--sk-fill`: `rgb(0, 0, 0)`
  - `--sk-fill-secondary`: `rgb(22, 22, 23)`
  - `--sk-fill-tertiary`: `rgb(29, 29, 31)`
  - `--sk-fill-gray-secondary`: `rgb(110, 110, 115)`
  - `--sk-fill-gray-tertiary`: `rgb(66, 66, 69)`
  - `--sk-fill-gray-quaternary`: `rgb(51, 51, 54)`
  - `--sk-tile-background`: `rgb(0, 0, 0)`

### 2.2 Navbar Colors (`globalheader.css`)
- **Light (default)**:
  - `--r-globalnav-color`: `rgba(0, 0, 0, .8)`
  - `--r-globalnav-color-secondary`: `#333336`
  - `--r-globalnav-color-hover`: `#000000`
  - `--r-globalnav-background-opened`: `#fafafc`
  - `--globalnav-background`: `rgba(250, 250, 252, .8)` (fallback opacity `.92`)
  - `.globalnav-curtain`: `rgba(232, 232, 237, .4)` with `backdrop-filter: blur(20px)`
- **Dark (`.globalnav-dark` / `.theme-dark #globalnav`)**:
  - `--r-globalnav-color`: `rgba(255, 255, 255, .8)`
  - `--r-globalnav-color-secondary`: `#E8E8ED`
  - `--r-globalnav-color-hover`: `#FFFFFF`
  - `--r-globalnav-background-opened-dark`: `#161617`
  - `--globalnav-background`: `rgba(22, 22, 23, .8)` (fallback opacity `.88`)
  - `.globalnav-curtain`: `rgba(0, 0, 0, .4)` with `backdrop-filter: blur(20px)`

### 2.3 Tiles, Buttons, Controls & Gallery Colors
- **Tiles (`homepage.built.css`, `index_3djd5z2w.built.css`)**:
  - `.tile-wrapper`: `#f5f5f7` (light) / `#000` (dark)
  - `.theme-dark` text/secondary: `#f5f5f7` / `#86868b`
  - `.tile-callout`: `#6e6e73`
  - `.endless-entertainment`: background `#f5f5f7`
- **Buttons (`main.built.css`)**:
  - Primary `.button`: background `rgb(0, 113, 227)`, hover `#0076DF`, active `#006EDB`, color `rgb(255, 255, 255)`, focus outline `2px solid #0071e3`.
  - `.button-secondary`: background `transparent`, color `rgb(0, 102, 204)` (dark: `rgb(41, 151, 255)`), border-color `rgb(0, 102, 204)` (dark: `rgb(41, 151, 255)`), hover background `#0076DF`, active background `#006EDB`, hover color `rgb(255, 255, 255)`.
  - `.button-neutral`:
    - Light: background `rgb(29, 29, 31)`, hover `#272729`, active `#18181A`, color `#fff`.
    - Dark: background `rgb(245, 245, 247)`, hover `#fff`, active `#EDEDF2`, color `#000`.
- **Inline Media Controls (`inline-media.built.css`)**:
  - Play/pause button colors: `#d2d2d7a3`, `#424245b8`, `#0000008f`.
- **Gallery Overlays, Gradients & Scrims (`home-gallery.built.css`)**:
  - `.media-gallery-headline`: `#000` (`.theme-dark`: `#fff`)
  - `.tv-media-gallery .media-gallery-contents`: `background: radial-gradient(100% 33% at left bottom, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0))` (`max-width: 734px`: `linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.7)), linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0) 200px)`)
  - `.media-gallery-longnote`: `color: #f5f5f7; text-shadow: 0px 0px 5px rgba(0,0,0,.6);`
  - `.dotnav-timed`: `--sk-dotnav-scrim-solid-iconcontrol-scrim-color: rgba(210, 210, 215, 0.64)` (hover `rgba(223, 223, 227, 0.6976)`)
- **FAM Gallery Item Backgrounds (`#fam-media-gallery` items 1–9)**:
  1. Hello Kitty Island Adventure (Arcade): `#f4f8fb`
  2. Miley: The Zane Lowe Interview (Music): `#000000`
  3. Join the Team with "Ted Lasso" (Fitness+): `#24568e`
  4. PowerWash Simulator (Arcade): `#9fc6f4`
  5. New Music Daily (Music): `#300402`
  6. Meditation with Christian (Fitness+): `#241004`
  7. Madden NFL 27 Arcade Edition (Arcade): `#1f0f0f`
  8. Today's Hits (Music): `#c69851`
  9. Programs (Fitness+): `#524617`

---

## 3. Typography

### 3.1 Webfonts (`/wss/fonts?families=SF+Pro,v3|SF+Pro+Icons,v3`)
- `@font-face` declarations for `SF Pro Display`, `SF Pro Text`, and `SF Pro Icons` (weights `100`–`900`, `normal` and `italic`, formats `woff2`, `woff`, `ttf`).

### 3.2 Navbar (`globalheader.css`)
- **`.globalnav-link` (Desktop)**:
  - `font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;`
  - `font-size: 12px; line-height: 1; font-weight: 400; letter-spacing: -.01em;`
- **`.globalnav-link` (Mobile Menu, `max-width: 833px`)**:
  - `font-family: SF Pro Display, ...;`
  - `font-size: 28px; line-height: 1.1428571429; font-weight: 600; letter-spacing: .007em;`
- **`.globalnav-link-apple`**:
  - `font-size: 17px; line-height: 1.2353641176; font-weight: 600; letter-spacing: -.022em;` (`19px` at `max-width: 833px`).

### 3.3 Headlines, Subheads, Body & CTAs (`main.built.css`, `homepage.built.css`, `home-gallery.built.css`)
- **`.typography-tile-headline` (Hero titles)**:
  - Desktop: `font-family: SF Pro Display, ...; font-size: 56px; line-height: 1.0714285714; font-weight: 600; letter-spacing: -.005em;`
  - `<=1068px`: `font-size: 48px; line-height: 1.0834933333; letter-spacing: -.002em;`
  - `<=734px`: `font-size: 32px; line-height: 1.125; letter-spacing: .002em;`
- **`.typography-tile-subhead` (Hero subtitles)**:
  - Desktop: `font-family: SF Pro Display, ...; font-size: 28px; line-height: 1.1428571429; font-weight: 400; letter-spacing: .007em;`
  - `<=1068px`: `font-size: 24px; line-height: 1.1666666667; letter-spacing: .009em;`
  - `<=734px`: `font-size: 19px; line-height: 1.2105263158; letter-spacing: .012em;`
- **`.typography-headline`**:
  - Desktop: `font-family: SF Pro Display, ...; font-size: 48px; line-height: 1.0834933333; font-weight: 600; letter-spacing: -.002em;`
  - `<=1068px`: `font-size: 40px; line-height: 1.1; letter-spacing: 0em;`
  - `<=734px`: `font-size: 32px; line-height: 1.125; letter-spacing: .002em;`
- **`.typography-promo-headline` / `.section-promo .tile-headline` (Bento Grid titles)**:
  - Desktop: `font-family: SF Pro Display, ...; font-size: 40px; line-height: 1.1; font-weight: 600; letter-spacing: 0em;`
  - `<=1068px`: `font-size: 32px; line-height: 1.125; letter-spacing: .002em;`
- **`.typography-promo-subhead` / `.section-promo .tile-subhead` (Bento Grid subtitles)**:
  - Desktop: `font-family: SF Pro Display, ...; font-size: 21px; line-height: 1.1904761905; font-weight: 400; letter-spacing: .011em;`
  - `<=1068px`: `font-size: 19px; line-height: 1.2105263158; letter-spacing: .012em;`
- **`.tile-callout`**: `font-size: 14px;`
- **`.typography-body-reduced`**: `font-family: SF Pro Text, ...; font-size: 14px; line-height: 1.4285914286; font-weight: 400; letter-spacing: -.016em;`
- **`.typography-caption`**: `font-family: SF Pro Text, ...; font-size: 12px; line-height: 1.3333733333; font-weight: 400; letter-spacing: -.01em;`
- **CTAs / Buttons**:
  - `.button`: `font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.2857742857; font-weight: 400; letter-spacing: -.016em;`
  - `.button-elevated` & `.button-super`: `font-size: 17px; line-height: 1.1764805882; letter-spacing: -.022em;`
- **Gallery Typography (`home-gallery.built.css`)**:
  - `.media-gallery-headline`: `font-family: SF Pro Display, ...; font-size: 56px; line-height: 1.0714285714; font-weight: 600; letter-spacing: -0.005em;` (`<=1068px`: `font-size: 32px; line-height: 1.125; letter-spacing: .004em;`)
  - `.media-gallery-longnote`: `font-family: "SF Pro Display", ...; font-size: 21px; line-height: 1.1904761905; font-weight: 400; letter-spacing: .011em;` (`<=1068px`: `font-family: SF Pro Text, ...; font-size: 17px; line-height: 1.2353641176; letter-spacing: -0.022em;`)

---

## 4. All Original Image URLs (by Section)

> Base origin for relative paths: `https://www.apple.com`

### 4.1 Hero 1: `holiday-2026`
- **Pink variant** (default):
  - Image: `/v/homepage/images/holiday-2026/a/hero_holiday_2026_pink__bc2rstir59lu_large_2x.jpg` (`_large.jpg` in `<noscript>`)
  - Startframe: `/v/homepage/images/holiday-2026/a/hero_holiday_2026_pink_startframe__ca2xflouavci_large_2x.jpg`
  - Video path: `/105/media/us/homepage/2026/5c860636-9312-49bb-9597-d145f535822c/anim/hero-pink/`
- **Blue variant**:
  - Image: `/v/homepage/images/holiday-2026/a/hero_holiday_2026_blue__fx7czvikivue_large.jpg`, `_large_2x.jpg`
  - Startframe: `/v/homepage/images/holiday-2026/a/hero_holiday_2026_blue_startframe__dd0romk4mh8i_large.jpg`, `_large_2x.jpg`
  - Video path: `/105/media/us/homepage/2026/5c860636-9312-49bb-9597-d145f535822c/anim/hero-blue/`
- **Green variant**:
  - Image: `/v/homepage/images/holiday-2026/a/hero_holiday_2026_green__cxyzwl8xlggi_large_2x.jpg`
  - Startframe: `/v/homepage/images/holiday-2026/a/hero_holiday_2026_green_startframe__b8v6z8n8eouu_large_2x.jpg`
  - Video path: `/105/media/us/homepage/2026/5c860636-9312-49bb-9597-d145f535822c/anim/hero-green/`
- **Yellow variant**:
  - Image: `/v/homepage/images/holiday-2026/a/hero_holiday_2026_yellow__e64inaqmrbue_large.jpg`, `_large_2x.jpg`
  - Startframe: `/v/homepage/images/holiday-2026/a/hero_holiday_2026_yellow_startframe__cr7ai51iloeq_large.jpg`, `_large_2x.jpg`
  - Video path: `/105/media/us/homepage/2026/5c860636-9312-49bb-9597-d145f535822c/anim/hero-yellow/`

### 4.2 Hero 2: `iphone-duo`
- **Startframe `<picture>`**: `/v/homepage/images/iphone-duo/a/hero_iphone_duo_animated_startframe__blm9gj3ulmc2_{small,small_2x,mediumtall,mediumtall_2x,medium,medium_2x,largetall,largetall_2x,large,large_2x}.jpg`
- **Video path**: `/105/media/us/homepage/2026/dfe63e15-1d50-4ed5-bffc-c121fa0b8626/anim/hero/`
- **Static `<picture>`**: `/v/homepage/images/iphone-duo/a/hero_iphone_duo_animated__ggqp9olf1ii6_{small,small_2x,mediumtall,mediumtall_2x,medium,medium_2x,largetall,largetall_2x,large,large_2x}.jpg`

### 4.3 Hero 3: `macbook-pro-proled-xdr`
- **`<picture>`**: `/v/homepage/images/macbook-pro-proled-xdr/a/hero_macbook_pro_proled_xdr__dqehhz1bv7ue_{small,small_2x,mediumtall,mediumtall_2x,medium,medium_2x,largetall,largetall_2x,large,large_2x}.jpg`

### 4.4 Bento Promo Grid (6 Tiles)
1. **`iphone-18-pro`**:
   - `/v/homepage/images/iphone-18-pro/a/promo_iphone_18_pro__9nn5m4mt2bmy_{small,small_2x,medium,medium_2x,large,large_2x}.jpg`
2. **`apple-watch-series-12`**:
   - Logo: `/v/homepage/images/logos/apple-watch-series-12/a/promo_logo_apple_watch_series_12__eck6698frlqq_{small,small_2x,medium,medium_2x,large,large_2x}.png`
   - Product: `/v/homepage/images/apple-watch-series-12/a/promo_apple_watch_series_12__gnlprtt8526a_{small,small_2x,medium,medium_2x,large,large_2x}.jpg`
3. **`ipad`**:
   - `/v/homepage/images/ipad/a/promo_ipad__d9p5bux2okuq_{small,small_2x,medium,medium_2x,large,large_2x}.jpg`
4. **`airpods-pro-3`**:
   - `/v/homepage/images/airpods-pro-3/a/promo_airpods_pro_3__e4755qofhnyq_{small,small_2x,medium,medium_2x,large,large_2x}.jpg`
5. **`apple-upgrade`**:
   - Logo: `/v/homepage/images/logos/apple-upgrade/a/promo_logo_apple_upgrade__lwuohffdzjem_{small,small_2x,medium,medium_2x,large,large_2x}.png`
   - Startframe: `/v/homepage/images/apple-upgrade/a/promo_apple_upgrade_startframe__e9bf3nb054ae_{small,small_2x,medium,medium_2x,large,large_2x}.jpg`
   - Video path: `/105/media/us/homepage/2026/abb2ec52-6e62-4771-84e4-d1e689324d6d/anim/promo/`
   - Static: `/v/homepage/images/apple-upgrade/a/promo_apple_upgrade__jvn6udm4tx2e_{small,small_2x,medium,medium_2x,large,large_2x}.jpg`
6. **`apple-card`**:
   - Logo: `/v/homepage/images/logos/apple-card/a/promo_logo_apple_card__28vxrcexz0ia_{small,small_2x,medium,medium_2x,large,large_2x}.png`
   - Image: `/v/homepage/images/apple-card/a/promo_apple_card__d8xz4kd4evwy_{small,small_2x,medium,medium_2x,large,large_2x}.jpg`

### 4.5 Endless Entertainment Gallery
- **TV+ Gallery (`#tv-media-gallery`, items 1–9: Stick, Nocturne, Formula 1, Awkwafina, MLS, Tenzing, Slow Horses, Ted Lasso, Widow's Bay)**:
  - Apple TV+ Hero Logo: `https://www.apple.com/v/home/cj/images/tv-gallery/logo_hero_light__d7t8cya4x26a_small.png` (`_small_2x.png`)
  - Show artwork & logos: hosted on `https://is1-ssl.mzstatic.com/image/thumb/...` (e.g., `https://is1-ssl.mzstatic.com/image/thumb/_dBwNwM2I9UkkEgq5BmfWQ/980x522sr.jpg`).
- **FAM Gallery (`#fam-media-gallery`, items 1–9: Hello Kitty Island Adventure, Miley: The Zane Lowe Interview, Join the Team with "Ted Lasso", PowerWash Simulator, New Music Daily, Meditation with Christian, Madden NFL 27 Arcade Edition, Today's Hits, Programs)**:
  - Artwork hosted on `https://is1-ssl.mzstatic.com/image/thumb/...`.

### 4.6 CSS `url(...)` Assets
- `inline-media.built.css` / `home-gallery.built.css`: inline `url(data:image/svg+xml;base64,...)` data URIs for play, pause, replay, and spinner icons (no external image `background-image: url(...)` found in the inspected homepage/header/gallery CSS).

---

## 5. Limitations & Notes
- Inspection was performed passively via `inspect_web_page` (`include_script_sources: false`), `capture_web_screenshot`, and `capture_browser_scenario` network response bodies (`/` HTML and stylesheets).
- Live `getComputedStyle` / `getBoundingClientRect` DOM measurements were not executed via JS injection; layout geometry, colors, and typography values above come directly from the production CSS rules and media queries serving the live page.
- Cross-origin `https://is1-ssl.mzstatic.com/...` carousel artwork URLs were excluded from `inspect_web_page`'s `dom_urls` (`outside_policy`) and are summarized from the captured `/` HTML.
