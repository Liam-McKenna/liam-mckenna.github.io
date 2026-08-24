# Liam McKenna — Software Engineer

Personal CV site, built as a Vite + React single-page app and deployed to GitHub Pages.

## Stack

- Vite + React 18
- react-router-dom (client-side routing, clean URLs)
- Tailwind CSS (design-token theme in `tailwind.config.js`)
- Framer Motion (scroll reveals, route transitions)
- Vitest + React Testing Library (targeted tests for `useCountUp` and the earlier-roles accordion)

## Development

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to ./dist
npm run preview   # serve the production build locally
npm run lint       # eslint
npm test           # run the test suite once
npm run test:watch # run the test suite in watch mode
```

## Content

CV content lives in `src/data/*.js` (profile, experience, projects, skills, education) — update those files to change what's shown on the site.

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`, which builds the site and deploys `dist/` to GitHub Pages.
