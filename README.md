# ATRC Talent Platform

Responsive React prototype for the ATRC Talent Platform. The current implementation includes the public Web experience, complete English/Arabic presentation for implemented routes, RTL layouts, and a browser-based iPhone preview.

## Current Features

- Home page with hero, announcements, statistics, ATRC film, pathways, and Career Test CTA
- Advanced Technologies catalogue with search, filters, saved state, careers, and empty state
- Career Pathways, Opportunities Center, Talent Enablement, and Career Planner overview pages
- English and Arabic content across implemented pages
- RTL layouts for Web and iPhone preview modes
- Responsive desktop, tablet, and mobile presentation
- Browser-based iPhone preview available from the phone icon in the Web header
- Return-to-Web flow that restores the source Web route
- A/B experiment for classic and cinematic film captions

The unified product and implementation specification is available in [`spec/ATRC_Web_App_Implementation_Plan.md`](spec/ATRC_Web_App_Implementation_Plan.md).

## Requirements

- Node.js 18 or newer
- npm

## Local Development

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev -- --host 127.0.0.1
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173).

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Routes

| Experience | Route |
| --- | --- |
| Home | `/` |
| Career Pathways | `/career-pathways` |
| Advanced Technologies | `/technologies` |
| Opportunities Center | `/opportunities` |
| Talent Enablement | `/talent-enablement` |
| Career Planner | `/career-planner` |
| iPhone preview | `/iphone/home` |

Use the `AR` / `EN` control in the header to switch language and document direction. The iPhone preview has its own language control and a Return-to-Web action.

## Video Caption A/B Test

The ATRC film supports two caption treatments:

- **Variant A — Classic:** preserves the original overlay and changes captions every 5.5 seconds.
- **Variant B — Cinematic:** runs a perspective cinematic crawl across the complete 41-second film, with additional English and Arabic content and a closing CTA.

Without a query parameter, each browser receives a stable 50/50 assignment. The selected value is stored in `localStorage` under:

```text
atrc.videoCaptions.variant
```

There is intentionally no visible variant switch in the interface because it would interfere with experiment traffic. Use the following URLs for development, review, and QA.

### Force Variant A

```text
http://127.0.0.1:5173/?videoCaptions=a
```

[Open classic captions](http://127.0.0.1:5173/?videoCaptions=a)

### Force Variant B

```text
http://127.0.0.1:5173/?videoCaptions=b
```

[Open cinematic captions](http://127.0.0.1:5173/?videoCaptions=b)

The `videoCaptions` parameter remains in the URL while navigating between Web routes. Remove the parameter to return to the browser's stored experiment assignment.

### Check the Active Variant

Inspect the film section in browser developer tools. The active assignment is exposed as:

```html
<section data-video-captions-variant="a">
```

It can also be read from the browser console:

```js
document.querySelector('[data-video-captions-variant]')?.dataset.videoCaptionsVariant
```

### Change or Reset the Stored Assignment

Force a stored assignment from the browser console and reload without a query parameter:

```js
localStorage.setItem('atrc.videoCaptions.variant', 'b')
location.href = '/'
```

Use `'a'` instead of `'b'` for the classic treatment.

Reset the browser assignment and receive a new 50/50 allocation:

```js
localStorage.removeItem('atrc.videoCaptions.variant')
location.href = '/'
```

Forced query parameters override the stored value but do not overwrite it.

## Project Structure

```text
src/
  App.jsx       Application routes, localisation, and page components
  data.js       Technology, pathway, statistic, and announcement content
  icons.jsx     Shared interface and technology icons
  styles.css    Responsive Web, RTL, and iPhone preview styling
spec/
  ATRC_Web_App_Implementation_Plan.md
```

## Current Implementation Notes

- The project is currently client-only and uses bundled content and browser state.
- No backend, CMS, authentication provider, analytics provider, or AI provider is connected.
- The iPhone route is a browser preview, not a native iOS application.
- `ATRC`, system values such as `5G`, and official product identifiers remain unchanged in Arabic mode.
