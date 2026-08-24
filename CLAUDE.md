# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Liam McKenna's personal CV site: a Vite + React single-page app deployed to GitHub Pages (`liam-mckenna.github.io`).

## Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build         # Production build -> ./dist
npm run preview       # Serve the production build locally
npm run lint           # eslint . --ext js,jsx
npm test               # vitest run (single pass)
npm run test:watch     # vitest (watch mode)
```

Tests are intentionally narrow in scope — only `src/hooks/useCountUp.test.js` and `src/components/experience/EarlierRolesAccordion.test.jsx` exist, covering the two pieces of actual interactive logic in the site. Presentational components are verified by eye (`npm run dev`), not by test.

## Architecture

- **React Router SPA with route-level code-splitting**: `src/router.jsx` exports `navLinks` (nav label/path pairs, consumed by `Navbar`) and `routeElements` (path → `React.lazy`-loaded page component, consumed by `App`). Add a page by adding both an entry here and a file under `src/pages/`.
- **GitHub Pages has no server-side rewrites**, so direct navigation to a route like `/experience` would 404 on a plain static host. `public/404.html` encodes the requested path into a query string and redirects to `index.html`; a small inline script at the top of `index.html`'s `<head>` decodes it and calls `history.replaceState` before React mounts. Don't remove either half without breaking deep links on the deployed site. (Locally, `npm run dev`/`npm run preview` don't exercise this path — Vite's dev/preview servers already fall back to `index.html` for unknown routes on their own.)
- **All CV content lives in `src/data/*.js` as plain data** — `profile.js`, `experience.js` (`currentRoles` for the two detailed jobs, `earlierRoles` for the accordion), `projects.js`, `skills.js`, `education.js`. No JSX lives in these files; components decide how to render a given field (e.g. `LogoOrBadge` renders a real `<img>` when a role has a `logo` path, or a generated initials badge when it doesn't — Experlogix and Covalen currently have no logo asset).
- **Design tokens live in `tailwind.config.js`** (`theme.extend.colors`/`fontFamily`) rather than one-off hex values in components: `background`/`surface`/`surface2` for dark backgrounds, `accent`/`accent-soft`/`accent-bright` for the violet identity, `highlight` (warm orange) reserved for the animated stat numbers, `muted`/`border` for secondary text and dividers. `font-display` (Sora) is for headings, `font-sans` (Inter) for body text, `font-mono` (JetBrains Mono) for tech-tag badges and metadata labels — loaded via Google Fonts `<link>` tags in `index.html`.
- **Two custom hooks carry the site's interactive behavior**: `useScrollReveal` (`src/hooks/useScrollReveal.js`) wraps `IntersectionObserver` to fade/slide an element in once, used by `StatTile` and `RoleCard`; `useCountUp` (`src/hooks/useCountUp.js`) animates a number from 0 to a target once triggered, used by `StatTile`. `useMediaQuery` (`src/hooks/useMediaQuery.js`) is a small `matchMedia` wrapper, currently only used by `Navbar` to auto-close the mobile menu on resize to desktop.
- **Single dark theme, no toggle** — this was a deliberate scope decision, not an oversight. Same for the lack of a contact form (footer has direct email/LinkedIn/GitHub links plus the CV download instead) and the lack of a project repo link (the Cypress framework's repo isn't published yet — `ProjectDetail` shows "Repo link coming soon" rather than a fabricated URL; don't add one without an actual repo).
- **Deployment**: `.github/workflows/deploy.yml` runs lint/test/build on push to `master` and deploys `dist/` to GitHub Pages via `actions/deploy-pages`. `vite.config.js` sets `base: '/'` since this is a user-page site served at the domain root, not a project-page site under a subpath.
