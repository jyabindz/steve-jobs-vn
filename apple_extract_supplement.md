# Apple.com Live Homepage — Supplemental Design & Media Extraction

Source: Live `https://www.apple.com/` (CDP Target `0B6AD143BAAD5DA9514126C4C36B5963`, HTML + `home-gallery.built.css` + `globalheader.css` + `homepage.built.css` + `index_3djd5z2w.built.css`).

---

## 1. Streaming & Entertainment (Below Bento Grid)

Both galleries live inside `<section class="section-endless-entertainment-gallery">` (`.endless-entertainment` in `index_3djd5z2w.built.css`: `background-color: #f5f5f7; padding-top: 53px;` and `padding-top: 36px;` at `@media(max-width: 1068px)`). `#tv-media-gallery + #fam-media-gallery` has `padding-top: var(--media-gallery-tile-gap)` (`13px`).

### 1A. Apple TV+ Main Carousel (`#tv-media-gallery.media-gallery.tv-media-gallery`)

#### Layout Geometry & Responsive Breakpoints
- **Container & Track**:
  - `.media-gallery`: `display: flex; flex-direction: column; align-items: center; position: relative;`
  - `.media-gallery-item-container`: `position: relative; width: calc(var(--media-gallery-tile-width) + var(--media-gallery-tile-gap)); height: var(--media-gallery-tile-height); margin: 0;`
  - `.media-gallery-item`: `position: absolute; width: calc(var(--media-gallery-tile-width) + var(--media-gallery-tile-gap)); height: 100%; display: flex; justify-content: center; background-color: unset; transform-style: preserve-3d; will-change: transform;` (transitions use `--media-gallery-slide-duration: 800ms`, bottom copy `--media-gallery-bottom-copy-duration: 600ms`).
  - `.media-gallery-wrapper-link`: `display: grid; position: relative; width: var(--media-gallery-tile-width); height: 100%; overflow: hidden; background-color: #000; text-decoration: none !important; z-index: 4; backface-visibility: hidden; transform: translateZ(0);` (`pointer-events: none` on inactive slides, `pointer-events: all` on `.current-item .media-gallery-wrapper-link`).
- **Slide Dimensions & Side-Slide Exposure**:
  - **Gap (`--media-gallery-tile-gap`)**: `13px` across all breakpoints.
  - **Large (`>= 1441px`)**: `--media-gallery-tile-width: 1250px; --media-gallery-tile-height: 668px;`
  - **Desktop / Default (`1069px – 1440px`)**: `--media-gallery-tile-width: 930px; --media-gallery-tile-height: 523px;` (e.g., at `1440px` viewport, center slide `930px` + `13px` gap leaves `(1440 - 930)/2 - 13 = 242px` of each adjacent side slide exposed on left and right).
  - **Medium (`<= 1068px`)**: `--media-gallery-tile-width: 688px; --media-gallery-tile-height: 367px;`
  - **Small (`<= 734px`)**: `--media-gallery-tile-width: 275px; --media-gallery-tile-height: 496px;`
- **Inactive vs. Active Overlay Content**:
  - `.media-gallery-bottom-content`: `opacity: .36; transition: opacity .4s ease;`
  - `.current-item .media-gallery-bottom-content`: `opacity: 1;`
- **Scrim / Gradient Overlay (`.tv-media-gallery .media-gallery-contents`)**:
  - `display: flex; align-items: flex-end; cursor: pointer; z-index: 3;`
  - Desktop/Medium: `background: radial-gradient(100% 33% at left bottom, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0));`
  - Small (`<= 734px`): `background: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7)), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0) 200px);`
- **Bottom Content Padding**:
  - `>= 1441px`: `padding-left: 70px; padding-bottom: 58px; padding-right: 70px;`
  - `1069px – 1440px`: `padding-left: 48px; padding-bottom: 40px; padding-right: 48px;`
  - `<= 1068px`: `padding-left: 43px; padding-bottom: 34px; padding-right: 43px;`
  - `<= 734px`: `padding-left: 15px; padding-bottom: 30px; padding-right: 15px; flex-direction: column-reverse; text-align: center;`

#### `"Stream now"` Button CSS (`.button.button-neutral.media-gallery-button`)
- Inside `.theme-dark .tv-media-gallery .media-gallery-button`:
  - `--sk-button-color: rgb(0, 0, 0);`
  - `--sk-button-background: rgb(245, 245, 247);`
  - `--sk-button-background-hover: rgb(255, 255, 255);`
  - `--sk-button-background-active: #EDEDF2;`
  - `border-radius: 980px;` (from `.button`)
  - `flex-shrink: 0; margin-top: var(--media-gallery-button-margin-top);` (`0` on desktop/medium, `13px` at `<= 734px`)
  - `@media(min-width: 1069px)`:
    - `--sk-button-padding-horizontal: 22px; --sk-button-padding-vertical: 12px;`
    - `--sk-button-min-width-basis: 70px;`
    - `font-size: 17px; line-height: 1.1764805882; font-weight: 400; letter-spacing: -0.022em;`
    - `font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;`

#### Genre / Description Typography (`.media-gallery-longnote` & `.media-gallery-genre`)
- **Desktop (`>= 1069px`)**:
  - `.media-gallery-longnote`: `color: #f5f5f7; font-size: 21px; line-height: 1.1904761905; font-weight: 400; letter-spacing: .011em; font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif; padding-inline-start: 18px; text-shadow: 0px 0px 5px rgba(0, 0, 0, .6);`
  - `.media-gallery-genre`: `font-weight: 700;`
  - `.media-gallery-genre:after`: `content: "•"; padding: 0 0.25em;`
- **Medium (`<= 1068px`)**:
  - `.media-gallery-longnote`: `font-size: 17px; line-height: 1.2353641176; font-weight: 400; letter-spacing: -0.022em; font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;`
- **Small (`<= 734px`)**:
  - `padding-inline-start: 0;`
  - `.media-gallery-genre`: `display: block;` and `.media-gallery-genre:after { display: none; }`

#### Pagination Dots Bar & Bottom-Right Pause/Play Button
- **Dotnav Container (`.media-gallery-dotnav.dotnav.dotnav-scrim-solid.dotnav-timed`)**:
  - `margin-top: var(--media-gallery-dotnav-gap); margin-bottom: var(--media-gallery-dotnav-gap);` (`12px` default, `10px` at `<= 734px`)
  - `width: 100%; height: var(--sk-dotnav-iconcontrol-icon-size);` (`24px` via `.media-gallery-dotnav.dotnav-scrim-solid { --sk-dotnav-iconcontrol-icon-size: 24px }`)
  - `position: relative; display: flex; align-items: center; justify-content: center; flex-direction: row-reverse; order: 4;`
- **Dotnav Pill (`.dotnav.dotnav-scrim-solid .dotnav-items`)**:
  - `background: rgb(232, 232, 237);` (`--sk-dotnav-scrim-solid-background-color`)
  - `border-radius: 999px;`
  - Dots: `--sk-dotnav-size: 8px; --sk-dotnav-margin-block: 8px; --sk-dotnav-margin-inline: 8px;`
  - Dot colors: inactive `rgba(0, 0, 0, 0.48)`, hover `rgba(0, 0, 0, 0.72)`, current `rgb(0, 0, 0)` (with `--sk-dotnav-timed-track-width: 32px; --sk-dotnav-timed-duration: 3000ms;`).
- **Bottom-Right Pause/Play Button (`.media-gallery-dotnav-iconcontrol.dotnav-iconcontrol`)**:
  - `position: absolute; top: unset; right: calc(12px + env(safe-area-inset-right));` (`10px` at `<= 734px`)
  - `width: 24px; height: 24px; border-radius: 50%; padding: 0;`
  - `background: rgba(210, 210, 215, 0.64);` (hover: `rgba(223, 223, 227, 0.6976)`)
  - `color: rgba(0, 0, 0, 0.48);` (hover: `rgba(0, 0, 0, 0.72)`), `<svg>` `path { fill: currentColor; }`

#### All 9 Apple TV+ Carousel Original Image URLs
*(Mobile `<picture class="tv-gallery-atvplus-logo">` uses `/v/home/cj/images/tv-gallery/logo_hero_light__d7t8cya4x26a_small.png` and `_2x.png` on slides with `show-logo`)*

1. **Slide 1 — Stick** (`Comedy` · `New season.` | CTA: `Stream now`)
   - Banner (`min-width: 0px` / `1441px+`): `https://is1-ssl.mzstatic.com/image/thumb/_dBwNwM2I9UkkEgq5BmfWQ/1250x668sr.jpg` (`2x`: `.../2500x1336sr.jpg`)
   - Banner (`max-width: 1440px`): `https://is1-ssl.mzstatic.com/image/thumb/_dBwNwM2I9UkkEgq5BmfWQ/980x522sr.jpg` (`2x`: `.../1960x1044sr.jpg`)
   - Banner (`max-width: 1068px`): `https://is1-ssl.mzstatic.com/image/thumb/_dBwNwM2I9UkkEgq5BmfWQ/688x368sr.jpg` (`2x`: `.../1376x736sr.jpg`)
   - Banner (`max-width: 734px`): `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/a6/95/81/a695819f-5019-eda5-5ec6-73015c8b6a84/13417594-bfbb-41fa-ab9d-449d8ca54ac3.png/274x496nr.jpg` (`2x`: `.../548x992nr.jpg`)
   - Title Logo (`.tv-gallery-media-logo`): `https://is1-ssl.mzstatic.com/image/thumb/fX9Bus3bPSqNIvzq-d8fSg/220x54.png` (`2x`: `.../440x108.png`)

2. **Slide 2 — Nocturne** (`Crime` · `The only way to save a villain’s missing victim is to get close enough to risk becoming one.` | CTA: `Stream now`)
   - Banner (`min-width: 0px`): `https://is1-ssl.mzstatic.com/image/thumb/U9-SYh_2jKtYnfk0-zciDA/1250x668sr.jpg` (`2x`: `.../2500x1336sr.jpg`)
   - Banner (`max-width: 1440px`): `.../980x522sr.jpg` (`2x`: `.../1960x1044sr.jpg`)
   - Banner (`max-width: 1068px`): `.../688x368sr.jpg` (`2x`: `.../1376x736sr.jpg`)
   - Banner (`max-width: 734px`): `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/27/9e/a3/279ea3e9-4d9c-db8b-73d8-9e26d824602e/aa006c81-7ad6-40d8-8e19-7eee2394189c.png/274x496nr.jpg` (`2x`: `.../548x992nr.jpg`)
   - Title Logo: `https://is1-ssl.mzstatic.com/image/thumb/0dVGA0_Ytah4r661ZkCESA/220x54.png` (`2x`: `.../440x108.png`)

3. **Slide 3 — Formula 1** (`Every Grand Prix™, live and on demand—all in one place, all year long.` | CTA: `F1 on Apple TV`)
   - Banner (`min-width: 0px`): `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/f2/63/a7/f263a72a-6efb-66af-cc28-ac5b036acd62/2fa2d9f2-4bcc-4ca5-a248-ae8ed8e5cdd5.png/1250x668sr.jpg` (`2x`: `.../2500x1336sr.jpg`)
   - Banner (`max-width: 1440px`): `.../980x522sr.jpg` (`2x`: `.../1960x1044sr.jpg`)
   - Banner (`max-width: 1068px`): `.../688x368sr.jpg` (`2x`: `.../1376x736sr.jpg`)
   - Banner (`max-width: 734px`): `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/35/59/c4/3559c4fe-c9c3-ba08-625e-50f6e9756477/1268ce5d-c450-4dc0-a43d-43a8c52c8e95.png/274x496nr.jpg` (`2x`: `.../548x992nr.jpg`)
   - Title Logo: `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/f0/ac/1e/f0ac1e58-0027-49d0-378e-68470edfb0ec/3b7d6fac-0061-401c-9716-742245053fd0.png/220x54.png` (`2x`: `.../440x108.png`)

4. **Slide 4 — Awkwafina: The Unlikely Cook** (`Documentary` · `Awkwafina sets off on a culinary road trip to revive her family’s restaurant.` | CTA: `Stream now`)
   - Banner (`min-width: 0px`): `https://is1-ssl.mzstatic.com/image/thumb/TZVATMR_weMtIFMuuAhREw/1250x668sr.jpg` (`2x`: `.../2500x1336sr.jpg`)
   - Banner (`max-width: 1440px`): `.../980x522sr.jpg` (`2x`: `.../1960x1044sr.jpg`)
   - Banner (`max-width: 1068px`): `.../688x368sr.jpg` (`2x`: `.../1376x736sr.jpg`)
   - Banner (`max-width: 734px`): `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/a2/10/26/a210266b-1eba-a0f1-c056-bb8731f1ec2a/bb27ce47-7957-43a0-8ebd-14b85e037aff.png/274x496nr.jpg` (`2x`: `.../548x992nr.jpg`)
   - Title Logo: `https://is1-ssl.mzstatic.com/image/thumb/zaOkNyh8q-2JfhdWEjyWbw/220x54.png` (`2x`: `.../440x108.png`)

5. **Slide 5 — MLS** (`Watch every club, every match, live—all season long.` | CTA: `MLS on Apple TV`)
   - Banner (`min-width: 0px`): `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/69/92/07/69920774-cdc9-8bf1-c03d-24dda7780d2e/4143c92f-c854-46c0-9a0e-da9d632b0654.png/1250x668sr.jpg` (`2x`: `.../2500x1336sr.jpg`)
   - Banner (`max-width: 1440px`): `.../980x522sr.jpg` (`2x`: `.../1960x1044sr.jpg`)
   - Banner (`max-width: 1068px`): `.../688x368sr.jpg` (`2x`: `.../1376x736sr.jpg`)
   - Banner (`max-width: 734px`): `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/90/55/77/905577e1-f787-09bd-fda7-1337c29a5fbb/75db3f49-7d33-4887-9d2d-d66d6d028c64.png/274x496nr.jpg` (`2x`: `.../548x992nr.jpg`)
   - Title Logo: `https://is1-ssl.mzstatic.com/image/thumb/Kc1Xx3Z1QBOuXe1EHDu4TA/220x54.png` (`2x`: `.../440x108.png`)

6. **Slide 6 — Tenzing** (`Drama` · `Based on the true story of the thrilling quest to summit Everest for the first time.` | CTA: `Stream now`)
   - Banner (`min-width: 0px`): `https://is1-ssl.mzstatic.com/image/thumb/CO4lIyj7dXy2D79e7FjgDA/1250x668sr.jpg` (`2x`: `.../2500x1336sr.jpg`)
   - Banner (`max-width: 1440px`): `.../980x522sr.jpg` (`2x`: `.../1960x1044sr.jpg`)
   - Banner (`max-width: 1068px`): `.../688x368sr.jpg` (`2x`: `.../1376x736sr.jpg`)
   - Banner (`max-width: 734px`): `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/d5/79/34/d5793458-8d76-d4f3-2a1b-43b60d0d530b/b69d2721-9f54-4602-a0ce-af05a8ecba1f.png/274x496nr.jpg` (`2x`: `.../548x992nr.jpg`)
   - Title Logo: `https://is1-ssl.mzstatic.com/image/thumb/C0fOxZGfTfntifSO9gPZ7w/220x54.png` (`2x`: `.../440x108.png`)

7. **Slide 7 — Slow Horses** (`Thriller` · `MI5’s most unruly spies are back and under attack.` | CTA: `Stream now`)
   - Banner (`min-width: 0px`): `https://is1-ssl.mzstatic.com/image/thumb/x5JjmiSD75wN12-HmmZRcg/1250x668sr.jpg` (`2x`: `.../2500x1336sr.jpg`)
   - Banner (`max-width: 1440px`): `.../980x522sr.jpg` (`2x`: `.../1960x1044sr.jpg`)
   - Banner (`max-width: 1068px`): `.../688x368sr.jpg` (`2x`: `.../1376x736sr.jpg`)
   - Banner (`max-width: 734px`): `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/1b/00/54/1b00549a-f09d-f96d-6077-9a7c75bd40b2/be4ff2b9-a7fa-4b9f-a9fb-2a0e8a413dc1.png/274x496nr.jpg` (`2x`: `.../548x992nr.jpg`)
   - Title Logo: `https://is1-ssl.mzstatic.com/image/thumb/EJSCPD6sWV9Ib13RNrmy2g/220x54.png` (`2x`: `.../440x108.png`)

8. **Slide 8 — Ted Lasso** (`Comedy` · `The hit comedy is back and Tedder than ever.` | CTA: `Stream now`)
   - Banner (`min-width: 0px`): `https://is1-ssl.mzstatic.com/image/thumb/eD8DZGJ170t3MyFhlWOkdw/1250x668sr.jpg` (`2x`: `.../2500x1336sr.jpg`)
   - Banner (`max-width: 1440px`): `.../980x522sr.jpg` (`2x`: `.../1960x1044sr.jpg`)
   - Banner (`max-width: 1068px`): `.../688x368sr.jpg` (`2x`: `.../1376x736sr.jpg`)
   - Banner (`max-width: 734px`): `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/3d/b5/d5/3db5d5c0-808b-d357-a2f1-2240d614e2b0/e6663278-3bd4-4114-9f97-082e7c192453.png/274x496nr.jpg` (`2x`: `.../548x992nr.jpg`)
   - Title Logo: `https://is1-ssl.mzstatic.com/image/thumb/Cc6MMzxFzD1gVqnd6IslKA/220x54.png` (`2x`: `.../440x108.png`)

9. **Slide 9 — Widow’s Bay** (`Mystery` · `14 Emmy® Awards Including Best Comedy` | CTA: `Stream now`)
   - Banner (`min-width: 0px`): `https://is1-ssl.mzstatic.com/image/thumb/L6BJs1M_LHbp_DDigxy-eQ/1250x668sr.jpg` (`2x`: `.../2500x1336sr.jpg`)
   - Banner (`max-width: 1440px`): `.../980x522sr.jpg` (`2x`: `.../1960x1044sr.jpg`)
   - Banner (`max-width: 1068px`): `.../688x368sr.jpg` (`2x`: `.../1376x736sr.jpg`)
   - Banner (`max-width: 734px`): `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/24/02/93/240293be-55ce-cc4b-a30a-7628a4aa552a/d91b72d5-1195-4649-9cde-108390f91296.png/274x496nr.jpg` (`2x`: `.../548x992nr.jpg`)
   - Title Logo: `https://is1-ssl.mzstatic.com/image/thumb/vXNv4MQ8aLXIkWQTZxw-BQ/220x54.png` (`2x`: `.../440x108.png`)

---

### 1B. Services Gallery (`#fam-media-gallery.media-gallery.fam-media-gallery`, `data-gallery-wrap-by="3"`)

#### Card Dimensions, Gap & Layout
- **Gap**: `--media-gallery-tile-gap: 13px;`
- **Card Width (`--media-gallery-tile-width`) & Height (`--fam-gallery-tile-height`)**:
  - `>= 1441px`: `470px × 264px` (aspect `~16:9`)
  - `1069px – 1440px`: `417px × 234px` (aspect `~16:9`)
  - `<= 1068px`: `188px × 254px` (portrait card)
- **Bottom Content Padding**:
  - `>= 1069px`: `padding-left: 19px; padding-bottom: 15px; padding-right: 15px;`
  - `<= 1068px`: `padding-left: 20px; padding-right: 20px;` (`30px` at `<= 734px`)
- **Overlay Gradient (`.fam-media-gallery .theme-dark .media-gallery-contents`)**:
  - `>= 1069px`: `linear-gradient(to bottom, rgba(29, 29, 31, 0.4) 0%, rgba(29, 29, 31, 0) 70px, rgba(29, 29, 31, 0) calc(100% - 70px), rgba(29, 29, 31, 0.4) 100%)`
  - `<= 1068px`: `linear-gradient(to bottom, rgba(29, 29, 31, 0.45) 0%, rgba(29, 29, 31, 0) 60px, rgba(29, 29, 31, 0) calc(100% - 120px), rgba(29, 29, 31, 0.45) 100%)`
  - `<= 734px`: `linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7)), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0) 200px)`

#### Service Logo Positions & Sizes
- `.fam-media-gallery .media-gallery-top-content`:
  - Desktop (`>= 1069px`): `display: flex; flex-direction: row-reverse; width: 100%; position: absolute; top: 0; padding-block-start: 15px; padding-inline-end: 15px; box-sizing: border-box;` (top-right corner).
  - `<= 1068px`: `padding-block-start: 0; padding-inline-end: 0; justify-content: center; margin-top: 13px;` (top-center).
- SVG colors & sizes:
  - `.media-gallery-logo`: `fill: #fff;` (`.theme-light .media-gallery-logo-music > svg { fill: #1d1d1f; }`)
  - `.media-gallery-logo-fitness`: `78px × 21px` (`88px × 20px` at `<= 1068px`)
  - `.media-gallery-logo-arcade`: `68px × 21px` (`72px × 20px` at `<= 1068px`)
  - `.media-gallery-logo-music`: `59px × 21px` (`64px × 20px` at `<= 1068px`)

#### Title Positions, Music Card Layout & Button Specs
- **Bottom Content Flow (`.fam-media-gallery .media-gallery-bottom-content`)**:
  - `>= 1069px`: `justify-content: space-between; flex-flow: row-reverse;` (button on right, title on left; note `media-gallery-longnote` is `14px`, `line-height: 1.2857742857`, `font-weight: 600`, `letter-spacing: -0.016em`, `SF Pro Text`, `-webkit-line-clamp: 2`).
  - `<= 1068px`: `justify-content: center; flex-flow: column-reverse;` (title centered above button; `width: 100%; text-align: center; margin-left: 0; margin-bottom: 8px;`). At `<= 734px`: `font-size: 12px; line-height: 1.3333733333; letter-spacing: -0.01em;`.
- **Music Cards Special Layout (`.media-gallery-bg-wrapper-music`)**:
  - `display: flex; align-items: center;` (`flex-direction: column;` at `<= 1068px`).
  - `.media-gallery-bg.media-gallery-bg-music`: square album art (`226×226` / `196×196` / `122×122`), `margin-left: 19px; border-radius: 8px; box-shadow: 3px 5px 30px rgba(0, 0, 0, .22); flex-shrink: 0;` (`margin-left: 0; margin-top: 46px;` at `<= 1068px`).
  - Title `.media-gallery-longnote-music`: placed beside album art on desktop (`margin-left: 19px`), or moved to bottom-content on `<= 1068px`.
- **Button Specs (`.fam-media-gallery .media-gallery-button`)**:
  - Labels: `"Play now"` (Arcade), `"Listen now"` (Music), `"Watch now"` (Fitness+).
  - Desktop (`>= 1069px`): `padding: 9px 16px` (`--sk-button-padding-vertical: 9px; --sk-button-padding-horizontal: 16px; --sk-button-border-width: 1px;`), `min-width-basis: 60px`, `border-radius: 980px`, `font-size: 14px; line-height: 1.2857742857; font-weight: 400; letter-spacing: -0.016em; SF Pro Text`.
  - `.theme-dark` colors: `--sk-button-color: rgb(0, 0, 0); --sk-button-background: rgb(245, 245, 247);` (hover `rgb(255, 255, 255)`, active `#EDEDF2`).
  - `<= 1068px`: `--sk-button-padding-horizontal: 11px; --sk-button-padding-vertical: 4px; --sk-button-min-width-basis: 45px; font-size: 12px; line-height: 1.3333733333; letter-spacing: -0.01em;`.

#### All 9 Services Gallery Cards: Background Colors & Original Image URLs
1. **Card 1 — Arcade: Hello Kitty Island Adventure** (`bg: #f4f8fb` | CTA: `Play now`)
   - `min-width: 0px` (`470×264` / `2x`): `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/5b/b3/4a/5bb34a60-695c-a96f-75ec-8a957fc2a20b/45899847-e52c-44a1-9ce5-09aedebb7a78.png/470x264.jpg` (`2x`: `.../940x528.jpg`)
   - `max-width: 1440px`: `.../417x234.jpg` (`2x`: `.../834x468.jpg`)
   - `max-width: 1068px`: `https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/7b/5d/49/7b5d490a-a9b8-15e0-19d0-70e1f2c760d6/d675e2a7-8bb6-40e0-aa60-296128bb9668.png/188x254nr.jpg` (`2x`: `.../376x508nr.jpg`)
2. **Card 2 — Music: Miley: The Zane Lowe Interview** (`bg: #000000` | CTA: `Listen now`)
   - `min-width: 0px`: `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/e9/7b/bd/e97bbd89-c9ae-c79f-b533-bb9a806e5bf0/f81d102b-27cf-4041-814e-89a13fa320e3.png/226x226sr.jpg` (`2x`: `.../452x452sr.jpg`)
   - `max-width: 1440px`: `.../196x196sr.jpg` (`2x`: `.../392x392sr.jpg`)
   - `max-width: 1068px`: `.../122x122sr.jpg` (`2x`: `.../244x244sr.jpg`)
3. **Card 3 — Fitness+: Join the Team with “Ted Lasso”** (`bg: #24568e` | CTA: `Watch now`)
   - `min-width: 0px`: `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/79/8e/f0/798ef0c7-5cdb-4eb0-6e23-4b68d5525832/3036bfa7-3cc0-419b-9c57-47e7101906ad.png/470x264.jpg` (`2x`: `.../940x528.jpg`)
   - `max-width: 1440px`: `.../417x234.jpg` (`2x`: `.../834x468.jpg`)
   - `max-width: 1068px`: `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/82/de/18/82de18c2-55a5-02b9-ad88-a9918b6f273e/e6afe84e-4549-46fc-81f4-51712fdb0792.png/188x254sr.jpg` (`2x`: `.../376x508sr.jpg`)
4. **Card 4 — Arcade: PowerWash Simulator** (`bg: #9fc6f4` | CTA: `Play now`)
   - `min-width: 0px`: `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/53/55/d7/5355d758-e5b7-b406-f004-bb98d03ecb38/9388d284-2a0b-43e8-86e0-5852e8559d18.png/470x264.jpg` (`2x`: `.../940x528.jpg`)
   - `max-width: 1440px`: `.../417x234.jpg` (`2x`: `.../834x468.jpg`)
   - `max-width: 1068px`: `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/05/52/d7/0552d754-8342-0858-7ba1-bc547e5a6efc/c89a1a25-7f92-4734-9374-0f0631d8a532.png/188x254nr.jpg` (`2x`: `.../376x508nr.jpg`)
5. **Card 5 — Music: New Music Daily** (`bg: #300402` | CTA: `Listen now`)
   - `min-width: 0px`: `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/ff/1f/6a/ff1f6a26-4ad9-e922-cd91-c6c7d6ee8504/455170ad-ea7a-43fd-8f3a-0d8846798712.png/226x226SC.DN01.jpg?l=en-US` (`2x`: `.../452x452SC.DN01.jpg?l=en-US`)
   - `max-width: 1440px`: `.../196x196SC.DN01.jpg?l=en-US` (`2x`: `.../392x392SC.DN01.jpg?l=en-US`)
   - `max-width: 1068px`: `.../122x122SC.DN01.jpg?l=en-US` (`2x`: `.../244x244SC.DN01.jpg?l=en-US`)
6. **Card 6 — Fitness+: Meditation with Christian** (`bg: #241004` | CTA: `Watch now`)
   - `min-width: 0px`: `https://is1-ssl.mzstatic.com/image/thumb/Video221/v4/ea/5a/58/ea5a58f1-1eec-f488-ba04-eab9f25ed2e3/ME_CH_0345_artwork_en_ID360705_0.png/470x264.jpg` (`2x`: `.../940x528.jpg`)
   - `max-width: 1440px`: `.../417x234.jpg` (`2x`: `.../834x468.jpg`)
   - `max-width: 1068px`: `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/4a/ae/44/4aae44f3-57b1-23d0-08df-62e0f7cb062b/cbaa1539-6d25-47e3-82b2-28bcddcd4af8.png/188x254sr.jpg` (`2x`: `.../376x508sr.jpg`)
7. **Card 7 — Arcade: Madden NFL 27 Arcade Edition** (`bg: #1f0f0f` | CTA: `Play now`)
   - `min-width: 0px`: `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/b1/bd/81/b1bd81c6-f678-a6d1-25d2-9d3bd20e1299/f1d34c41-e9e3-428d-80b7-fff65822f3f6.png/470x264.jpg` (`2x`: `.../940x528.jpg`)
   - `max-width: 1440px`: `.../417x234.jpg` (`2x`: `.../834x468.jpg`)
   - `max-width: 1068px`: `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/c3/b5/e2/c3b5e2e4-82ea-f5fa-4f25-dd79b9932ddc/33610beb-a4b0-46eb-9cba-714891f18433.png/188x254nr.jpg` (`2x`: `.../376x508nr.jpg`)
8. **Card 8 — Music: Today’s Hits** (`bg: #c69851` | CTA: `Listen now`)
   - `min-width: 0px`: `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/38/8c/80/388c802c-6280-aeae-a416-dfdbb52c35b8/ccb00e27-00ee-4027-9dc9-1fe208a94ac2.png/226x226SC.DN01.jpg?l=en-US` (`2x`: `.../452x452SC.DN01.jpg?l=en-US`)
   - `max-width: 1440px`: `.../196x196SC.DN01.jpg?l=en-US` (`2x`: `.../392x392SC.DN01.jpg?l=en-US`)
   - `max-width: 1068px`: `.../122x122SC.DN01.jpg?l=en-US` (`2x`: `.../244x244SC.DN01.jpg?l=en-US`)
9. **Card 9 — Fitness+: Programs** (`bg: #524617` | CTA: `Watch now`)
   - `min-width: 0px`: `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/2a/75/df/2a75df27-703b-4712-6d95-9c9e29ca1dc6/fa77ffdb-61aa-47e7-920a-7da1876f3929.png/470x264.jpg` (`2x`: `.../940x528.jpg`)
   - `max-width: 1440px`: `.../417x234.jpg` (`2x`: `.../834x468.jpg`)
   - `max-width: 1068px`: `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/63/79/eb/6379ebdd-976c-11a5-0258-5c5f589b0031/681367fd-f322-4b95-93bf-f906975df4c4.png/188x254sr.jpg` (`2x`: `.../376x508sr.jpg`)

---

## 2. Navbar Mega Menu & Holiday Banner

### 2A. Navbar Flyout Dropdown (`#globalnav` in `globalheader.css` & Live DOM)

#### DOM Structure
```html
<li data-topnav-flyout-item="..." data-topnav-flyout-label="..." class="globalnav-item ...">
  <div data-topnav-flyout class="globalnav-flyout">
    <!-- trigger group + regular trigger button -->
    <div id="globalnav-submenu-..." class="globalnav-submenu">
      <div class="globalnav-submenu-content">
        <div class="globalnav-submenu-group globalnav-submenu-group-elevated">
          <h2 class="globalnav-submenu-header">Explore ...</h2>
          <ul class="globalnav-submenu-list">
            <li class="globalnav-submenu-list-item-elevated"><a class="globalnav-submenu-link">...</a></li>
          </ul>
        </div>
        <div class="globalnav-submenu-group">
          <h2 class="globalnav-submenu-header">Shop ...</h2>
          <ul class="globalnav-submenu-list">
            <li class="globalnav-submenu-list-item"><a class="globalnav-submenu-link">...</a></li>
          </ul>
        </div>
        <div class="globalnav-submenu-group">
          <h2 class="globalnav-submenu-header">More from ...</h2>
          <ul class="globalnav-submenu-list">
            <li class="globalnav-submenu-list-item"><a class="globalnav-submenu-link">...</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</li>
```

#### Background, Backdrop-Filter & Curtain
- **Navbar Bar (`#globalnav.globalnav-scrim`)**:
  - `height: 44px` (`48px` at `<= 833px`), `position: absolute; top: 0; left: 0; right: 0; z-index: 9999;`
  - `--globalnav-background: rgba(250, 250, 252, .8);` (`rgba(250, 250, 252, .92)` fallback without `backdrop-filter`)
  - `--globalnav-backdrop-filter: saturate(180%) blur(20px);` (`backdrop-filter: var(--globalnav-backdrop-filter);`)
- **Opened Flyout Panel (`.globalnav-item-flyout-open .globalnav-submenu`)**:
  - Light mode: `--r-globalnav-background-opened: #fafafc;`
  - Dark mode: `--r-globalnav-background-opened-dark: #161617;`
  - `max-height: calc(100vh - 88px);` (`--r-globalnav-flyout-spacing: 88px`)
  - `.globalnav-submenu-content`: `max-width: 1024px; margin: 0 auto; display: flex; padding-top: 40px; padding-bottom: 84px; padding-inline: max(22px, safe-area-inset);`
- **Page Curtain (`.globalnav-curtain`)**:
  - Light: `background: rgba(232, 232, 237, .4); backdrop-filter: blur(20px); position: fixed; inset: 0; z-index: 9998;`
  - Dark: `background: rgba(0, 0, 0, .4);`

#### 3-Column Layout & Typography (`min-width: 834px`)
- **Column 1 (`.globalnav-submenu-group-elevated` — e.g. `Explore`)**:
  - `max-width: 50%; padding-inline-end: 88px;`
  - Elevated links (`.globalnav-submenu-list-item-elevated`): `font-size: 24px; line-height: 1.1666666667; font-weight: 600; letter-spacing: .009em; font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;` (`.globalnav-submenu-link` `padding-top: 9px;`). First item `margin-top: 6px;`; secondary items below elevated list `margin-top: 14px;`.
- **Columns 2 & 3 (`.globalnav-submenu-group` — e.g. `Shop`, `More from...`)**:
  - `max-width: 25%; padding-inline-end: 44px;`
  - Regular links (`.globalnav-submenu-list-item`): `font-size: 12px; line-height: 1.3333733333; font-weight: 600; letter-spacing: -0.01em; font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;`
- **Column Headers (`.globalnav-submenu-header`)**:
  - `font-size: 12px; line-height: 1.3333733333; font-weight: 400; letter-spacing: -0.01em; font-family: SF Pro Text, ...`
  - Color: `--r-globalnav-submenu-header-color: rgb(110, 110, 115)` (`#6e6e73`) in light mode; `rgb(134, 134, 139)` (`#86868b`) in dark mode.
- **Link Colors**:
  - `--r-globalnav-color-secondary: #333336` (dark: `#E8E8ED`), hover `--r-globalnav-color-hover: #000000` (dark: `#FFFFFF`), padding `7px 11px`, `margin-inline: -11px; margin-bottom: -6px;`.

---

### 2B. Holiday Banner (`[data-tile-id="holiday-2026"]` in `homepage.built.css` & `index_3djd5z2w.built.css`)

- **DOM Structure**:
  ```html
  <div class="tile-wrapper theme-dark" data-tile-id="holiday-2026" data-component-list="Holiday2026 InlineMedia" data-holiday-default="pink">
    <a class="tile-link" href="/us/shop/goto/store" ...></a>
    <div class="tile-content content-bottom">
      <div class="tile-copy-wrapper">
        <h2 class="tile-headline typography-tile-headline">Gifts they’ll love.</h2>
        <p class="tile-subhead typography-tile-subhead">Find their perfect match this holiday.</p>
      </div>
      <div class="tile-ctas">
        <a class="button" href="/us/shop/goto/store" ...>Shop gifts</a>
      </div>
    </div>
    <div class="tile-image-wrapper">...</div>
  </div>
  ```
- **Actual Text Color & Background**:
  - Text color (`.theme-dark .tile-copy-wrapper`): `#f5f5f7` (with `.theme-dark.tile-wrapper { background-color: #000; }` overridden by `Holiday2026` theme variables: `pink`: `--holiday-background: #5A122C`, `blue`: `#00224D`, `green`: `#1A4C44`, `yellow`: `#822704`).
- **Flex & Padding Layout Preventing Text/Image Overlap**:
  - `.tile-wrapper`: `display: flex; justify-content: center; position: relative; width: 100%; min-height: var(--hero-content-height); box-sizing: border-box; overflow: clip;`
    - `--hero-content-height`: `580px` default (`692px` at `>=1069px & min-height:776px`; `570px` at `<=1068px`; `650px` at `735-1068px & min-height:734px`; `500px` at `<=734px`).
    - Padding: `48px 0 56px` default; `56px 0 63px` (`>=1069px & min-height:776px`); `54px 0 61px` (`<=1068px`); `61px 0 69px` (`735-1068px & min-height:734px`); `39px 0 43px` (`<=734px`).
  - `.tile-content.content-bottom`: `display: flex; flex-direction: column; position: relative; align-items: center; justify-content: flex-end;` — pushes `.tile-copy-wrapper` (`z-index: 2`) and `.tile-ctas` (`margin-top: 17px` / `16px` medium / `11px` small; `z-index: 3`) to the **bottom** of the `580px`/`692px` hero box, leaving the upper/center area unobstructed for the Apple gift logo graphic in `.tile-image-wrapper`.
  - `.content-bottom + .tile-image-wrapper`: `position: absolute; top: 0; bottom: auto; width: 100%; height: var(--hero-content-height);` with centered `img` (`inset-inline-start: 50%; transform: translate(-50%); bottom: 0; width: auto; height: 100%;`).
