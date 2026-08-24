# CV Site Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing Next.js 14 static-export CV site with a Vite + React rebuild, using the content from the new CV and a modernized dark/violet visual identity.

**Architecture:** A Vite-built React SPA using react-router (`BrowserRouter`, clean URLs, route-level code-splitting via `React.lazy`), Tailwind CSS as the sole styling system with a custom design-token theme, Framer Motion for scroll-reveal/transition motion, and all CV content held as plain data modules under `src/data/` consumed by presentational components. Deployed to GitHub Pages via GitHub Actions.

**Tech Stack:** Vite, React 18, react-router-dom v6, Tailwind CSS v3, Framer Motion, react-icons, Vitest + React Testing Library (targeted tests only).

**Spec:** `docs/superpowers/specs/2026-08-24-cv-site-rebuild-design.md`

## Global Constraints

- Vite + React only — no Next.js. All of `src/app/`, `next.config.js`, `jsconfig.json` are removed, not kept alongside.
- Tailwind CSS only — no CSS Modules, no Sass, no styled-components. `react-collapse` and `styled-components` are removed as dependencies.
- All CV content lives in `src/data/*.js` as plain data (no JSX embedded in data files) — components decide how to render it (e.g. logo vs. fallback badge).
- No contact form. No light/dark theme toggle (single dark theme). Never fabricate a repo URL for the Cypress project — the CV's `[Publish cleaned repo and add link here]` placeholder means no link exists yet; show "coming soon" instead.
- Routing: `BrowserRouter` with clean URLs (`/`, `/experience`, `/projects`, `/projects/:slug`, `/about`), plus the GitHub Pages SPA redirect trick (`public/404.html` + a restore script in `index.html`) since GitHub Pages has no server-side rewrites.
- Deploys to GitHub Pages at the domain root (user page, not project page) — `base: '/'` in `vite.config.js`.
- Package manager: npm.
- **This machine has no `node`/`npm` on PATH by default.** Every command that needs them must be run with this exact prefix:
  `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && <command>`
  All Run commands below already include this prefix — use them verbatim.

---

## Task 1: Vite + Tailwind scaffold, old Next.js code removed

**Files:**
- Create: `package.json` (rewrite)
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/index.css`
- Create: `src/test/setup.js`
- Create: `tailwind.config.js` (rewrite)
- Create: `postcss.config.js` (rewrite to ESM)
- Create: `.eslintrc.json` (rewrite)
- Modify: `.gitignore`
- Delete: `src/app/` (entire directory), `next.config.js`, `jsconfig.json`, `src/Context/` (entire directory), `src/components/` (entire directory), `public/next.svg`, `public/vercel.svg`
- Move: `src/app/favicon.ico` → `public/favicon.ico`

**Interfaces:**
- Produces: `public/favicon.ico` (referenced by `index.html`), Tailwind design-system entry point `src/index.css` (extended in Task 2), the `#root` mount point and `src/App.jsx` (extended into the real layout in Task 3), the Vitest config in `vite.config.js` and `src/test/setup.js` (consumed by every later test file via `import '@testing-library/jest-dom'` already loaded globally).

- [ ] **Step 1: Remove the old Next.js codebase**

```bash
git rm -r src/app src/Context src/components
git rm next.config.js jsconfig.json
git rm public/next.svg public/vercel.svg
git add public/documents/liamCV.pdf
rm -rf .next out
```

(`public/documents/liamCV.pdf` was already deleted in the working tree before this plan started — staging it here keeps that cleanup in this task's commit. `.next`/`out` are gitignored build caches from the old framework; `rm -rf` clears them since they're not tracked.)

- [ ] **Step 2: Preserve the favicon for Vite's convention**

```bash
mkdir -p /tmp/cv-rebuild
cp src/app/favicon.ico /tmp/cv-rebuild/favicon.ico 2>/dev/null || true
```

If `src/app/favicon.ico` was already removed by Step 1's `git rm -r src/app`, retrieve it first instead:

```bash
git show HEAD:src/app/favicon.ico > public/favicon.ico
```

Verify `public/favicon.ico` now exists and is non-empty (`ls -la public/favicon.ico`).

- [ ] **Step 3: Write `package.json`**

```json
{
  "name": "liam-mckenna",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "framer-motion": "^11.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.9",
    "jsdom": "^24.1.1",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.10",
    "vite": "^5.4.0",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 4: Write `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
```

- [ ] **Step 5: Write `src/test/setup.js`**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Write `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- [ ] **Step 7: Write `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 8: Write `.eslintrc.json`**

```json
{
  "root": true,
  "env": { "browser": true, "es2021": true, "node": true },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  },
  "settings": { "react": { "version": "detect" } },
  "plugins": ["react-refresh"],
  "rules": {
    "react-refresh/only-export-components": ["warn", { "allowConstantExport": true }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  },
  "ignorePatterns": ["dist", "node_modules"]
}
```

- [ ] **Step 9: Write `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Liam McKenna — Software Engineer. React/Django product development and end-to-end test automation."
    />
    <title>Liam McKenna — Software Engineer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 10: Write `src/index.css`**

Task 1 doesn't yet have the custom color tokens (those are added in Task 2), so this version uses plain Tailwind colors and gets replaced with the token-based version in Task 2 Step 2:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-slate-950 text-white antialiased;
    font-family: 'Inter', sans-serif;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 11: Write `src/App.jsx` and `src/main.jsx`**

`src/App.jsx`:

```jsx
export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-violet-300">Rebuild in progress</p>
      <h1 className="text-4xl font-bold text-white">Liam McKenna</h1>
      <p className="max-w-md text-slate-400">Software Engineer — site rebuild in progress.</p>
    </div>
  )
}
```

`src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 12: Update `.gitignore`**

Remove the `/.next/` and `/out/` lines, add `/dist`. Final relevant section:

```
# next.js
# (removed — project no longer uses Next.js)

# production
/build
/dist
```

Leave the rest of the file (`node_modules`, `.DS_Store`, env files, etc.) unchanged.

- [ ] **Step 13: Install dependencies and verify the build**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm install
```

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
```

Expected: both commands exit 0; `dist/index.html` exists after the build.

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "Scaffold Vite + React + Tailwind, remove Next.js codebase"
```

---

## Task 2: Design tokens and global styles

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `src/App.jsx`, `src/index.css`, `tailwind.config.js` from Task 1.
- Produces: the Tailwind color tokens (`background`, `surface`, `surface2`, `accent`/`accent-soft`/`accent-bright`, `highlight`, `border`, `muted`) and font families (`font-display`, `font-sans`, `font-mono`) that every component from Task 3 onward uses.

- [ ] **Step 1: Extend `tailwind.config.js` with the design tokens**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0b16',
        surface: '#151327',
        surface2: '#1e1a3a',
        accent: {
          DEFAULT: '#7c3aed',
          soft: '#a78bfa',
          bright: '#c4b5fd',
        },
        highlight: '#ff9f5a',
        border: '#2c2650',
        muted: '#8b86ab',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Update `src/index.css` to use the tokens**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-white antialiased font-sans;
  }

  h1,
  h2,
  h3,
  h4 {
    @apply font-display;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 3: Update `src/App.jsx` to prove the tokens resolve**

```jsx
export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-accent-soft">Rebuild in progress</p>
      <h1 className="font-display text-4xl font-bold text-white">Liam McKenna</h1>
      <p className="max-w-md text-muted">Software Engineer — site rebuild in progress.</p>
    </div>
  )
}
```

- [ ] **Step 4: Verify the build**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
```

Expected: exits 0.

- [ ] **Step 5: Manual visual check**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run dev
```

Open `http://localhost:5173`. Expected: near-black navy background, a small violet uppercase monospace label, a bold "Liam McKenna" heading in the Sora display font, muted grey-violet body text. Stop the dev server (Ctrl+C) when confirmed.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.js src/index.css src/App.jsx
git commit -m "Add design-token theme (colors, fonts) for the rebuild"
```

---

## Task 3: Routing, layout shell, and the GitHub Pages SPA redirect trick

**Files:**
- Create: `src/router.jsx`
- Create: `src/data/profile.js`
- Create: `src/pages/Home.jsx` (placeholder)
- Create: `src/pages/Experience.jsx` (placeholder)
- Create: `src/pages/Projects.jsx` (placeholder)
- Create: `src/pages/ProjectDetail.jsx` (placeholder)
- Create: `src/pages/About.jsx` (placeholder)
- Create: `src/components/layout/Navbar.jsx`
- Create: `src/components/layout/Footer.jsx`
- Create: `public/404.html`
- Modify: `index.html` (add the redirect-restore script)
- Modify: `src/App.jsx` (final layout)
- Modify: `src/main.jsx` (wrap in `BrowserRouter`)

**Interfaces:**
- Consumes: `src/App.jsx`/`src/main.jsx` from Task 1–2.
- Produces: `navLinks` and `routeElements` exported from `src/router.jsx` (consumed by `Navbar` and `App`); `profile` exported from `src/data/profile.js` (consumed by `Footer`, and by `Home` in Task 6) — shape: `{ name, title, location, phone, email, github, linkedin, resumeUrl, summary }`. Placeholder page components at `src/pages/*.jsx` get their real content replaced in Tasks 6–9 (same file, same default export, no signature change).

- [ ] **Step 1: Write `src/data/profile.js`**

```js
export const profile = {
  name: 'Liam McKenna',
  title: 'Software Engineer',
  location: 'Greystones, Co. Wicklow / Dublin',
  phone: '083 444 8785',
  email: 'liam.mckenna@outlook.ie',
  github: 'https://github.com/Liam-McKenna',
  linkedin: 'https://linkedin.com/in/liammckennafullspec',
  resumeUrl: '/documents/Liam-McKenna-CV.pdf',
  summary:
    'Software engineer with four years of commercial experience spanning React and Django product development and end-to-end test automation. Currently building the first automated test coverage for a B2B ecommerce platform serving around 150 customer webshops — a Cypress framework of 55 tests driven by per-site configuration rather than duplicated specs. Previously two years as the sole frontend developer on an internal research platform used daily by 20–30 biologists and data scientists, taking it over a month into the role and maintaining it alone thereafter. Comfortable across the stack, with a design background that shows in UI work and documentation. Completing a BSc part-time alongside full-time employment.',
}
```

- [ ] **Step 2: Write `src/router.jsx`**

```jsx
import { lazy } from 'react'

const Home = lazy(() => import('./pages/Home.jsx'))
const Experience = lazy(() => import('./pages/Experience.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))
const About = lazy(() => import('./pages/About.jsx'))

export const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
]

export const routeElements = [
  { path: '/', Component: Home },
  { path: '/experience', Component: Experience },
  { path: '/projects', Component: Projects },
  { path: '/projects/:slug', Component: ProjectDetail },
  { path: '/about', Component: About },
]
```

- [ ] **Step 3: Write the five placeholder pages**

`src/pages/Home.jsx`:

```jsx
export default function Home() {
  return <div className="mx-auto max-w-5xl px-6 py-24">Home</div>
}
```

`src/pages/Experience.jsx`:

```jsx
export default function Experience() {
  return <div className="mx-auto max-w-5xl px-6 py-24">Experience</div>
}
```

`src/pages/Projects.jsx`:

```jsx
export default function Projects() {
  return <div className="mx-auto max-w-5xl px-6 py-24">Projects</div>
}
```

`src/pages/ProjectDetail.jsx`:

```jsx
import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams()
  return <div className="mx-auto max-w-5xl px-6 py-24">Project: {slug}</div>
}
```

`src/pages/About.jsx`:

```jsx
export default function About() {
  return <div className="mx-auto max-w-5xl px-6 py-24">About</div>
}
```

- [ ] **Step 4: Write `src/components/layout/Navbar.jsx`**

```jsx
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../../router.jsx'

const linkClasses = ({ isActive }) =>
  `font-mono text-sm uppercase tracking-wider transition-colors ${
    isActive ? 'text-accent-bright' : 'text-muted hover:text-white'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="font-display text-lg font-semibold text-white">
          LMK
        </NavLink>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} end={link.path === '/'} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/60 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={linkClasses}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 5: Write `src/components/layout/Footer.jsx`**

```jsx
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { profile } from '../../data/profile.js'

export default function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-display text-white">{profile.name}</p>
          <p className="text-sm text-muted">{profile.location}</p>
        </div>

        <div className="flex items-center gap-5 text-muted">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-accent-bright">
            <FaEnvelope size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent-bright"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent-bright"
          >
            <FaGithub size={18} />
          </a>
        </div>

        <a
          href={profile.resumeUrl}
          download
          className="rounded-full border border-accent px-5 py-2 font-mono text-sm text-accent-bright transition-colors hover:bg-accent hover:text-white"
        >
          Download CV
        </a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Write `src/App.jsx` (final layout)**

```jsx
import { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import { routeElements } from './router.jsx'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-muted">Loading…</div>}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {routeElements.map(({ path, Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PageTransition>
                      <Component />
                    </PageTransition>
                  }
                />
              ))}
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 7: Write `src/main.jsx` (wrap in `BrowserRouter`)**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

- [ ] **Step 8: Write `public/404.html` (GitHub Pages SPA redirect — encodes the path)**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Liam McKenna — Software Engineer</title>
    <script>
      // Single Page Apps for GitHub Pages: encode the requested path into a
      // query string on index.html so client-side routing can restore it.
      var segmentsToKeep = 0
      var l = window.location
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(segmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      )
    </script>
  </head>
  <body></body>
</html>
```

- [ ] **Step 9: Modify `index.html` — add the restore script before the app script**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Liam McKenna — Software Engineer. React/Django product development and end-to-end test automation."
    />
    <title>Liam McKenna — Software Engineer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <script>
      // Single Page Apps for GitHub Pages: restore the real path after
      // 404.html redirected here with the path encoded in the query string.
      ;(function (l) {
        if (l.search[1] === '/') {
          var decoded = l.search
            .slice(1)
            .split('&')
            .map(function (s) {
              return s.replace(/~and~/g, '&')
            })
            .join('?')
          window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash)
        }
      })(window.location)
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 10: Verify the build**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
```

Expected: exits 0.

- [ ] **Step 11: Manual check — navigation and mobile menu**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run dev
```

In the browser: click each nav link (Home/Experience/Projects/About), confirm the URL and placeholder text change and a brief fade transition plays; shrink the window below 768px width, confirm the hamburger button appears and toggles the mobile menu open/closed. Stop the dev server when confirmed.

- [ ] **Step 12: Verify the GitHub Pages redirect trick against a real static server (no SPA fallback)**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
cd dist && python3 -m http.server 8080
```

In a browser, navigate directly to `http://localhost:8080/experience` (typed straight into the address bar, not clicked from within the app). Expected: the URL briefly shows the encoded `?/experience` form, then settles back to `http://localhost:8080/experience` with the Experience placeholder rendered — proving the 404.html → index.html → history.replaceState round trip works. Stop the server (Ctrl+C) when confirmed.

- [ ] **Step 13: Commit**

```bash
git add index.html public/404.html src/router.jsx src/data/profile.js src/pages src/components/layout src/App.jsx src/main.jsx
git commit -m "Add routing, layout shell, and GitHub Pages SPA redirect"
```

---

## Task 4: Hooks (`useCountUp`, `useScrollReveal`, `useMediaQuery`)

**Files:**
- Create: `src/hooks/useCountUp.js`
- Create: `src/hooks/useCountUp.test.js`
- Create: `src/hooks/useScrollReveal.js`
- Create: `src/hooks/useMediaQuery.js`
- Modify: `src/components/layout/Navbar.jsx` (auto-close the mobile menu on resize to desktop, using `useMediaQuery`)

**Interfaces:**
- Produces: `useCountUp(target, { duration, start })` → returns the current animated number (used by `StatTile` in Task 6). `useScrollReveal({ threshold })` → returns `[ref, visible]` (used by `StatTile` in Task 6 and `RoleCard` in Task 7). `useMediaQuery(query)` → returns a boolean (used by `Navbar` here, available for later tasks).

- [ ] **Step 1: Write the failing test for `useCountUp`**

`src/hooks/useCountUp.test.js`:

```js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCountUp } from './useCountUp.js'

describe('useCountUp', () => {
  let frameQueue
  let now

  beforeEach(() => {
    frameQueue = []
    now = 0
    vi.stubGlobal('requestAnimationFrame', (cb) => {
      frameQueue.push(cb)
      return frameQueue.length
    })
    vi.stubGlobal('cancelAnimationFrame', () => {})
    vi.spyOn(performance, 'now').mockImplementation(() => now)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  function flushFrame(elapsedMs) {
    now += elapsedMs
    const callbacks = frameQueue.splice(0, frameQueue.length)
    act(() => {
      callbacks.forEach((cb) => cb(now))
    })
  }

  it('stays at 0 until start is true', () => {
    const { result } = renderHook(() => useCountUp(100, { start: false }))
    expect(result.current).toBe(0)
  })

  it('counts up partway through the animation', () => {
    const { result, rerender } = renderHook(
      ({ start }) => useCountUp(100, { duration: 200, start }),
      { initialProps: { start: false } },
    )

    rerender({ start: true })
    flushFrame(50)

    expect(result.current).toBeGreaterThan(0)
    expect(result.current).toBeLessThan(100)
  })

  it('reaches the target once the duration elapses', () => {
    const { result, rerender } = renderHook(
      ({ start }) => useCountUp(100, { duration: 200, start }),
      { initialProps: { start: false } },
    )

    rerender({ start: true })
    flushFrame(50)
    flushFrame(200)

    expect(result.current).toBe(100)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails (module doesn't exist yet)**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm test
```

Expected: FAIL — cannot find module `./useCountUp.js`.

- [ ] **Step 3: Write `src/hooks/useCountUp.js`**

```js
import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, { duration = 1200, start = false } = {}) {
  const [value, setValue] = useState(0)
  const frame = useRef(null)

  useEffect(() => {
    if (!start) return undefined

    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick)
      }
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [start, target, duration])

  return value
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm test
```

Expected: all 3 tests in `useCountUp.test.js` PASS.

- [ ] **Step 5: Write `src/hooks/useScrollReveal.js`**

```js
import { useEffect, useRef, useState } from 'react'

export function useScrollReveal({ threshold = 0.2 } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}
```

- [ ] **Step 6: Write `src/hooks/useMediaQuery.js`**

```js
import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const listener = (event) => setMatches(event.matches)

    mediaQueryList.addEventListener('change', listener)
    return () => mediaQueryList.removeEventListener('change', listener)
  }, [query])

  return matches
}
```

- [ ] **Step 7: Modify `src/components/layout/Navbar.jsx` to use `useMediaQuery`**

Replace the whole file with:

```jsx
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../../router.jsx'
import { useMediaQuery } from '../../hooks/useMediaQuery.js'

const linkClasses = ({ isActive }) =>
  `font-mono text-sm uppercase tracking-wider transition-colors ${
    isActive ? 'text-accent-bright' : 'text-muted hover:text-white'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (isDesktop) setOpen(false)
  }, [isDesktop])

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="font-display text-lg font-semibold text-white">
          LMK
        </NavLink>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} end={link.path === '/'} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/60 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={linkClasses}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 8: Run the full test suite and the build**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm test
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
```

Expected: both exit 0.

- [ ] **Step 9: Commit**

```bash
git add src/hooks src/components/layout/Navbar.jsx
git commit -m "Add useCountUp, useScrollReveal, useMediaQuery hooks"
```

---

## Task 5: Data layer (experience, projects, skills, education)

**Files:**
- Create: `src/data/experience.js`
- Create: `src/data/projects.js`
- Create: `src/data/skills.js`
- Create: `src/data/education.js`

**Interfaces:**
- Produces: `currentRoles`/`earlierRoles` from `experience.js` (consumed by `Experience` page in Task 7 — shape: `{ id, title, company, location?, start, end, logo, summary?, bullets?, skills?, description? }`); `projects` from `projects.js` (consumed by `Home`, `Projects`, `ProjectDetail` in Tasks 6 and 8 — shape: `{ slug, title, stack[], period, summary, highlights[{title, detail}], stats[{label, value}], repoUrl }`); `skillGroups` from `skills.js` and `education` from `education.js` (consumed by `About` in Task 9).

- [ ] **Step 1: Write `src/data/experience.js`**

```js
export const currentRoles = [
  {
    id: 'experlogix',
    title: 'QA Engineer',
    company: 'Experlogix',
    location: 'Dublin',
    start: 'Jul 2024',
    end: 'Present',
    logo: null,
    summary:
      'Sole QA engineer for extended periods on a B2B ecommerce platform serving around 150 customer webshops, each with its own configuration and ERP integration.',
    bullets: [
      'Sole QA engineer for extended periods on a B2B ecommerce platform serving around 150 customer webshops, each with its own configuration and ERP integration (SAP, Business Central, CE, F&O), including full cover during a colleague’s absence.',
      'Introduced the company’s first automated end-to-end test coverage. Designed and built a Cypress suite from scratch across three product areas — webshop, management interface and CPQ portal — now 18 spec files, 55 tests and 24 custom commands.',
      'Built it as a data-driven framework: one spec runs against 13 configured customer sites using per-site capability flags, and handles two divergent checkout implementations from configuration rather than duplicated specs.',
      'Solved the single sign-on authentication barrier that had previously made automated testing impossible on the platform; added accessibility checks with cypress-axe and authored the project’s testing strategy and data-cy selector conventions.',
      'Manual acceptance and regression testing against ticket criteria in a Kanban flow, across VPN-accessed staging environments and local instances restored from customer databases. Set up own SSH-based remote workflow into internal servers.',
      'Contributed to adoption of Azure DevOps Test Plans for structured test-case management.',
    ],
    skills: ['Cypress', 'JavaScript', 'cypress-axe', 'Azure DevOps', 'GitLab CI/CD', 'ERP Integrations'],
  },
  {
    id: 'nuritas',
    title: 'Software Engineer',
    company: 'Nuritas',
    location: 'Dublin',
    start: 'Oct 2021',
    end: 'Oct 2023',
    logo: '/images/NuritasLogo.png',
    summary:
      'Sole frontend developer on Pantry, an internal React and Django REST platform used by 20–30 biologists and data scientists exploring tens of millions of peptide and mass-spectrometry records.',
    bullets: [
      'Sole frontend developer on Pantry, an internal React and Django REST platform used by 20–30 biologists and data scientists to explore tens of millions of peptide and mass-spectrometry records supporting ML-led discovery. Took over the frontend a month into the role when the lead developer left, and maintained and extended it alone for two years.',
      'Shipped React interfaces for the Data Curation team to replace direct SQL access for adding and reviewing datasets.',
      'Designed and prototyped a bulk Excel import mapping a single upload onto a 50-table relational schema with 130+ attributes.',
      'Worked in a Dockerised environment with GitLab and Kanban alongside four backend and DevOps engineers.',
    ],
    skills: ['React', 'Django REST Framework', 'Docker', 'GitLab', 'SQL'],
  },
]

export const earlierRoles = [
  {
    id: 'glofox',
    title: 'Web Implementation Support',
    company: 'Glofox',
    start: 'Aug 2020',
    end: 'Feb 2021',
    logo: '/images/glofox.svg',
    description:
      'Onboarded gym and studio clients onto the booking platform, embedding platform components into customer WordPress and Squarespace sites, and acted as first point of contact for web integration queries. Produced tutorial and support video content.',
  },
  {
    id: 'cloudtech',
    title: 'Software Developer',
    company: 'Cloudtech Ltd',
    start: 'Jan 2020',
    end: 'Aug 2020',
    logo: '/images/cloudtechLogo.png',
    description:
      'Python and Deluge work on Zoho and Salesforce CRM customisations for SME clients, in a two-developer team. Company ceased trading during COVID-19.',
  },
  {
    id: 'covalen',
    title: 'Technical Support Engineer (1st & 2nd Level)',
    company: 'Covalen (formerly Cpl Integrated Services) — contracted to HPE',
    start: 'Jun 2018',
    end: 'Jan 2020',
    logo: '/images/HPELogo.png',
    description:
      'Promoted to second-level support: one of five engineers holding elevated system permissions and acting as escalation point for a support floor of roughly 64 first-line agents. Handled 30–60 technical calls daily, with dedicated support for an investment-sector client. Consistently in the top performance tier.',
  },
  {
    id: 'sonics',
    title: 'AV Technician',
    company: 'Sonics AVI',
    start: 'Aug 2017',
    end: 'Jun 2018',
    logo: '/images/sonicslogo.jpeg',
    description:
      'On-site installations across Dublin office buildings: comms rack builds, Cat5 termination, digital signage, video networks and boardroom AV setup, with remote and on-site support to SLA.',
  },
  {
    id: 'sin',
    title: 'Graphic Designer & Media Manager',
    company: 'Sin Nightclub, Dublin',
    start: 'May 2012',
    end: 'Aug 2017',
    logo: '/images/sinLogo.png',
    description:
      'Full creative control of brand, design and social output over five years. Grew the social following from 5,000 to 225,000, with a peak of 95 million weekly views, and contributed materially to revenue growth. Handled budgeting, event creation and marketing alongside all design production.',
  },
]
```

- [ ] **Step 2: Write `src/data/projects.js`**

```js
export const projects = [
  {
    slug: 'multi-site-e2e-test-framework',
    title: 'Multi-site End-to-End Test Framework',
    stack: ['Cypress', 'JavaScript', 'Node'],
    period: '2025–26',
    summary:
      'Test automation framework built from scratch for a multi-tenant ecommerce platform, covering three product areas from a single shared codebase.',
    highlights: [
      {
        title: 'Data-driven architecture',
        detail:
          'One spec set runs against 13 configured customer sites, with per-site capability flags skipping coverage a given site does not have, and two divergent checkout implementations resolved from configuration instead of forked specs.',
      },
      {
        title: 'Custom command layer',
        detail:
          '24 commands over session reuse, authenticated setup and site-config merging, keeping specs declarative and readable.',
      },
      {
        title: 'Geometry-based visual assertion',
        detail:
          'A custom assertion infers rendered layout rows from element bounding-box geometry, allowing a purely visual property to be tested through the DOM.',
      },
      {
        title: 'Accessibility & reliability',
        detail:
          'Accessibility checks via cypress-axe, real-event interaction testing, ESLint and Prettier, and selective video retention on failure only. Documented testing strategy and data-cy selector conventions for the team.',
      },
    ],
    stats: [
      { label: 'Customer sites', value: 13 },
      { label: 'Spec files', value: 18 },
      { label: 'Tests', value: 55 },
      { label: 'Custom commands', value: 24 },
    ],
    repoUrl: null,
  },
]
```

- [ ] **Step 3: Write `src/data/skills.js`**

```js
export const skillGroups = [
  { title: 'Languages', items: ['JavaScript', 'Python', 'SQL', 'HTML', 'SCSS', 'PHP (working knowledge)'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Redux'] },
  { title: 'Backend', items: ['Django', 'Django REST Framework', 'Node.js', 'Express'] },
  {
    title: 'Testing',
    items: ['Cypress', 'cypress-axe', 'cypress-real-events', 'ESLint', 'Manual & exploratory testing', 'Azure DevOps Test Plans'],
  },
  { title: 'DevOps & Tooling', items: ['Docker', 'Git', 'GitLab', 'GitHub', 'GitLab CI/CD', 'Azure', 'Jira', 'Confluence'] },
  { title: 'Design', items: ['Figma', 'Photoshop', 'Illustrator', 'Premiere Pro'] },
]
```

- [ ] **Step 4: Write `src/data/education.js`**

```js
export const education = [
  {
    id: 'tudublin',
    title: 'BSc (Hons) Information Technology & Information Systems',
    institution: 'Technological University Dublin',
    period: '2018 – 2027',
    detail:
      'First class honours (1:1) across all completed modules. Final-year project in progress; conferring 2027. Studied part-time alongside full-time employment throughout.',
  },
  {
    id: 'crumlin',
    title: 'Certificate in Software Development',
    institution: 'Crumlin College',
    period: '2017 – 2018',
    detail: 'Awarded first class (1:1).',
  },
]
```

- [ ] **Step 5: Verify the build (data modules must parse and bundle cleanly)**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
```

Expected: exits 0. (These modules aren't imported by any component yet — Tasks 6–9 wire them in and are where they get visually verified.)

- [ ] **Step 6: Commit**

```bash
git add src/data/experience.js src/data/projects.js src/data/skills.js src/data/education.js
git commit -m "Add CV content as data modules"
```

---

## Task 6: UI primitives and the Home page

**Files:**
- Create: `src/components/ui/Badge.jsx`
- Create: `src/components/ui/Button.jsx`
- Create: `src/components/ui/SectionHeading.jsx`
- Create: `src/components/ui/StatTile.jsx`
- Create: `src/components/ui/LogoOrBadge.jsx`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `useCountUp`, `useScrollReveal` (Task 4); `profile` (Task 3); `currentRoles`, `projects` (Task 5).
- Produces: `Badge`, `Button`, `SectionHeading`, `StatTile`, `LogoOrBadge` — reused by `RoleCard`/`EarlierRolesAccordion` (Task 7), `ProjectCard`/`ProjectDetail` (Task 8), and `About` (Task 9). `LogoOrBadge` props: `{ src, alt, size? }` — renders an `<img>` when `src` is truthy, otherwise a generated initials badge from `alt`.

- [ ] **Step 1: Write `src/components/ui/Badge.jsx`**

```jsx
export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-accent-bright">
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Write `src/components/ui/Button.jsx`**

```jsx
export default function Button({ href, children, variant = 'solid', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 font-mono text-sm transition-colors'
  const variants = {
    solid: 'bg-accent text-white hover:bg-accent-soft',
    outline: 'border border-accent text-accent-bright hover:bg-accent hover:text-white',
  }
  const className = `${base} ${variants[variant]}`

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  )
}
```

- [ ] **Step 3: Write `src/components/ui/SectionHeading.jsx`**

```jsx
export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && <p className="font-mono text-sm uppercase tracking-widest text-accent-soft">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </div>
  )
}
```

- [ ] **Step 4: Write `src/components/ui/StatTile.jsx`**

```jsx
import { useCountUp } from '../../hooks/useCountUp.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

export default function StatTile({ value, label, suffix = '' }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.4 })
  const count = useCountUp(value, { start: visible })

  return (
    <div ref={ref} className="rounded-xl2 border border-border bg-surface px-6 py-8 text-center">
      <p className="font-display text-4xl font-bold text-highlight md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 font-mono text-sm uppercase tracking-wider text-muted">{label}</p>
    </div>
  )
}
```

- [ ] **Step 5: Write `src/components/ui/LogoOrBadge.jsx`**

```jsx
function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export default function LogoOrBadge({ src, alt, size = 56 }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="rounded-lg bg-white object-contain p-2"
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className="flex items-center justify-center rounded-lg bg-surface2 font-display font-bold text-accent-bright"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initials(alt)}
    </div>
  )
}
```

- [ ] **Step 6: Replace `src/pages/Home.jsx` with the real hero, stats, and featured-work teaser**

```jsx
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import StatTile from '../components/ui/StatTile.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { profile } from '../data/profile.js'
import { currentRoles } from '../data/experience.js'
import { projects } from '../data/projects.js'

const stats = [
  { value: 55, label: 'Automated tests' },
  { value: 150, label: 'Customer webshops' },
  { value: 30, label: 'Daily platform users', suffix: '+' },
  { value: 130, label: 'Schema attributes mapped', suffix: '+' },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <section className="text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-accent-soft">{profile.location}</p>
        <h1 className="mt-4 font-display text-5xl font-bold text-white md:text-6xl">{profile.name}</h1>
        <p className="mt-2 font-mono text-lg text-accent-bright">{profile.title}</p>
        <p className="mx-auto mt-6 max-w-2xl text-muted">{profile.summary}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={profile.resumeUrl} download>
            Download CV
          </Button>
          <Button href="/experience" variant="outline">
            View experience
          </Button>
        </div>
      </section>

      <section className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Featured work"
          title="Building test coverage where there was none"
          description={currentRoles[0].summary}
        />
        <Link to="/projects" className="font-mono text-sm text-accent-bright hover:underline">
          See the {projects[0].title} case study &rarr;
        </Link>
      </section>
    </div>
  )
}
```

- [ ] **Step 7: Verify the build and run the full test suite**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm test
```

Expected: both exit 0.

- [ ] **Step 8: Manual visual check**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run dev
```

Open `http://localhost:5173/`. Expected: hero with name/title/summary, two buttons (Download CV, View experience), a 4-tile stat row where each number animates up from 0 the first time it scrolls into view, and a "Featured work" section linking to `/projects`. Stop the dev server when confirmed.

- [ ] **Step 9: Commit**

```bash
git add src/components/ui src/pages/Home.jsx
git commit -m "Add UI primitives and the real Home page"
```

---

## Task 7: Experience page

**Files:**
- Create: `src/components/experience/RoleCard.jsx`
- Create: `src/components/experience/EarlierRolesAccordion.jsx`
- Create: `src/components/experience/EarlierRolesAccordion.test.jsx`
- Modify: `src/pages/Experience.jsx`

**Interfaces:**
- Consumes: `LogoOrBadge`, `Badge`, `SectionHeading` (Task 6); `useScrollReveal` (Task 4); `currentRoles`, `earlierRoles` (Task 5).
- Produces: `RoleCard` (`{ role }` prop, shape matches `currentRoles` entries) and `EarlierRolesAccordion` (`{ roles }` prop, shape matches `earlierRoles` entries) — used only by the Experience page.

- [ ] **Step 1: Write the failing test for `EarlierRolesAccordion`**

`src/components/experience/EarlierRolesAccordion.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EarlierRolesAccordion from './EarlierRolesAccordion.jsx'

const roles = [
  { id: 'a', title: 'Role A', company: 'Company A', start: '2020', end: '2021', description: 'Description A' },
  { id: 'b', title: 'Role B', company: 'Company B', start: '2021', end: '2022', description: 'Description B' },
]

describe('EarlierRolesAccordion', () => {
  it('keeps all entries collapsed by default', () => {
    render(<EarlierRolesAccordion roles={roles} />)
    expect(screen.queryByText('Description A')).not.toBeInTheDocument()
    expect(screen.queryByText('Description B')).not.toBeInTheDocument()
  })

  it('expands one entry on click without opening the others', async () => {
    const user = userEvent.setup()
    render(<EarlierRolesAccordion roles={roles} />)

    await user.click(screen.getByRole('button', { name: /Role A/i }))

    expect(screen.getByText('Description A')).toBeInTheDocument()
    expect(screen.queryByText('Description B')).not.toBeInTheDocument()
  })

  it('collapses an open entry when clicked again', async () => {
    const user = userEvent.setup()
    render(<EarlierRolesAccordion roles={roles} />)

    const trigger = screen.getByRole('button', { name: /Role A/i })
    await user.click(trigger)
    expect(screen.getByText('Description A')).toBeInTheDocument()

    await user.click(trigger)
    expect(screen.queryByText('Description A')).not.toBeInTheDocument()
  })

  it('switches open entry when a different trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<EarlierRolesAccordion roles={roles} />)

    await user.click(screen.getByRole('button', { name: /Role A/i }))
    await user.click(screen.getByRole('button', { name: /Role B/i }))

    expect(screen.queryByText('Description A')).not.toBeInTheDocument()
    expect(screen.getByText('Description B')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm test
```

Expected: FAIL — cannot find module `./EarlierRolesAccordion.jsx`.

- [ ] **Step 3: Write `src/components/experience/EarlierRolesAccordion.jsx`**

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import LogoOrBadge from '../ui/LogoOrBadge.jsx'

export default function EarlierRolesAccordion({ roles }) {
  const [openId, setOpenId] = useState(null)

  function toggle(id) {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <div className="divide-y divide-border rounded-xl2 border border-border bg-surface">
      {roles.map((role) => {
        const isOpen = openId === role.id
        return (
          <div key={role.id}>
            <button
              type="button"
              onClick={() => toggle(role.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <div className="flex items-center gap-4">
                <LogoOrBadge src={role.logo} alt={role.company} size={40} />
                <div>
                  <p className="font-display text-white">{role.title}</p>
                  <p className="font-mono text-sm text-muted">{role.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden font-mono text-sm text-muted md:block">
                  {role.start} – {role.end}
                </span>
                {isOpen ? (
                  <AiOutlineMinus className="text-accent-bright" />
                ) : (
                  <AiOutlinePlus className="text-accent-bright" />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm text-muted">{role.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm test
```

Expected: all 4 tests in `EarlierRolesAccordion.test.jsx` PASS.

- [ ] **Step 5: Write `src/components/experience/RoleCard.jsx`**

```jsx
import LogoOrBadge from '../ui/LogoOrBadge.jsx'
import Badge from '../ui/Badge.jsx'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

export default function RoleCard({ role }) {
  const [ref, visible] = useScrollReveal()

  return (
    <article
      ref={ref}
      className={`rounded-xl2 border border-border bg-surface p-6 transition-all duration-500 md:p-8 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <LogoOrBadge src={role.logo} alt={role.company} />
          <div>
            <h3 className="font-display text-xl font-semibold text-white">{role.title}</h3>
            <p className="font-mono text-sm text-accent-bright">
              {role.company} — {role.location}
            </p>
          </div>
        </div>
        <p className="font-mono text-sm text-muted">
          {role.start} – {role.end}
        </p>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-muted md:text-base">
        {role.bullets.map((bullet) => (
          <li
            key={bullet}
            className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent before:content-['']"
          >
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {role.skills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    </article>
  )
}
```

- [ ] **Step 6: Replace `src/pages/Experience.jsx` with the real page**

```jsx
import SectionHeading from '../components/ui/SectionHeading.jsx'
import RoleCard from '../components/experience/RoleCard.jsx'
import EarlierRolesAccordion from '../components/experience/EarlierRolesAccordion.jsx'
import { currentRoles, earlierRoles } from '../data/experience.js'

export default function Experience() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        eyebrow="Experience"
        title="Four years across QA and full-stack product work"
        description="Sole ownership of test coverage and frontend platforms, not just contributions to them."
      />

      <div className="space-y-8">
        {currentRoles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>

      <div className="mt-16">
        <h3 className="mb-6 font-display text-2xl font-semibold text-white">Earlier roles</h3>
        <EarlierRolesAccordion roles={earlierRoles} />
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Verify the build and full test suite**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm test
```

Expected: both exit 0.

- [ ] **Step 8: Manual visual check**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run dev
```

Open `http://localhost:5173/experience`. Expected: Experlogix card with an "EX" fallback badge (no logo asset), Nuritas card with its real logo, both listing full bullet points and skill tags; below them, a 5-item accordion (Glofox, Cloudtech, Covalen, Sonics AVI, Sin Nightclub) where clicking a row expands its description and collapses any previously open row. Stop the dev server when confirmed.

- [ ] **Step 9: Commit**

```bash
git add src/components/experience src/pages/Experience.jsx
git commit -m "Add Experience page with role cards and earlier-roles accordion"
```

---

## Task 8: Projects page and project detail view

**Files:**
- Create: `src/components/projects/ProjectCard.jsx`
- Modify: `src/pages/Projects.jsx`
- Modify: `src/pages/ProjectDetail.jsx`

**Interfaces:**
- Consumes: `Badge`, `StatTile`, `SectionHeading` (Task 6); `projects` (Task 5).
- Produces: `ProjectCard` (`{ project }` prop) — used only by the Projects page.

- [ ] **Step 1: Write `src/components/projects/ProjectCard.jsx`**

```jsx
import { Link } from 'react-router-dom'
import Badge from '../ui/Badge.jsx'

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="block rounded-xl2 border border-border bg-surface p-6 transition-colors hover:border-accent md:p-8"
    >
      <p className="font-mono text-sm text-muted">{project.period}</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-white">{project.title}</h3>
      <p className="mt-3 text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Replace `src/pages/Projects.jsx` with the real page**

```jsx
import SectionHeading from '../components/ui/SectionHeading.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        description="Test infrastructure built from scratch, not bolted onto an existing suite."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Replace `src/pages/ProjectDetail.jsx` with the real case-study view**

```jsx
import { useParams, Link, Navigate } from 'react-router-dom'
import StatTile from '../components/ui/StatTile.jsx'
import Badge from '../components/ui/Badge.jsx'
import { projects } from '../data/projects.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Link to="/projects" className="font-mono text-sm text-accent-bright hover:underline">
        &larr; All projects
      </Link>

      <p className="mt-6 font-mono text-sm text-muted">{project.period}</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-white">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-muted">{project.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {project.stats.map((stat) => (
          <StatTile key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>

      <div className="mt-12 space-y-8">
        {project.highlights.map((highlight) => (
          <div key={highlight.title}>
            <h2 className="font-display text-xl font-semibold text-white">{highlight.title}</h2>
            <p className="mt-2 text-muted">{highlight.detail}</p>
          </div>
        ))}
      </div>

      {!project.repoUrl && <p className="mt-12 font-mono text-sm text-muted">Repo link coming soon.</p>}
    </div>
  )
}
```

- [ ] **Step 4: Verify the build**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
```

Expected: exits 0.

- [ ] **Step 5: Manual visual check**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run dev
```

Open `http://localhost:5173/projects`: expect one project card. Click it, confirm it navigates to `/projects/multi-site-e2e-test-framework` and shows the period, title, summary, stack badges, 4 animated stat tiles (13/18/55/24), 4 highlight sections, and "Repo link coming soon." Then navigate directly to `http://localhost:5173/projects/does-not-exist` and confirm it redirects to `/projects`. Stop the dev server when confirmed.

- [ ] **Step 6: Commit**

```bash
git add src/components/projects src/pages/Projects.jsx src/pages/ProjectDetail.jsx
git commit -m "Add Projects page and project case-study detail view"
```

---

## Task 9: About page

**Files:**
- Modify: `src/pages/About.jsx`

**Interfaces:**
- Consumes: `Badge`, `SectionHeading` (Task 6); `skillGroups`, `education` (Task 5).

- [ ] **Step 1: Replace `src/pages/About.jsx` with the real page**

```jsx
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Badge from '../components/ui/Badge.jsx'
import { skillGroups } from '../data/skills.js'
import { education } from '../data/education.js'

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        eyebrow="About"
        title="From graphic design to test automation"
        description="Five years of hands-on design work before software engineering means UI and documentation get the same attention as the code underneath them."
      />

      <section className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="rounded-xl2 border border-border bg-surface p-6">
            <h3 className="font-display text-lg font-semibold text-white">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <h3 className="mb-6 font-display text-2xl font-semibold text-white">Education</h3>
        <div className="space-y-6">
          {education.map((entry) => (
            <div key={entry.id} className="rounded-xl2 border border-border bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-lg font-semibold text-white">{entry.title}</h4>
                <span className="font-mono text-sm text-muted">{entry.period}</span>
              </div>
              <p className="mt-1 font-mono text-sm text-accent-bright">{entry.institution}</p>
              <p className="mt-3 text-muted">{entry.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify the build**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
```

Expected: exits 0.

- [ ] **Step 3: Manual visual check**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run dev
```

Open `http://localhost:5173/about`. Expected: 6 skill-group cards (Languages, Frontend, Backend, Testing, DevOps & Tooling, Design) each with tag badges, and 2 education entries (TU Dublin, Crumlin College) with period and detail text. Stop the dev server when confirmed.

- [ ] **Step 4: Commit**

```bash
git add src/pages/About.jsx
git commit -m "Add About page with skills and education"
```

---

## Task 10: Deployment workflow and documentation

**Files:**
- Delete: `.github/workflows/nextjs.yml`
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`
- Modify: `CLAUDE.md`

**Interfaces:**
- None — this task only touches CI config and docs; no code interfaces change.

- [ ] **Step 1: Remove the old Next.js deploy workflow**

```bash
git rm .github/workflows/nextjs.yml
```

- [ ] **Step 2: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy site to GitHub Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Lint
        run: npm run lint
      - name: Test
        run: npm test
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          name: github-pages
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Rewrite `README.md`**

```markdown
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
```

- [ ] **Step 4: Rewrite `CLAUDE.md`**

```markdown
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
```

- [ ] **Step 5: Full verification pass**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run lint
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm test
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run build
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.18.0 && npm run preview
```

Expected: lint, test, and build all exit 0. With `preview` running, open `http://localhost:4173` and click through all four nav routes plus the project detail page one more time as a final sanity check. Stop the preview server when confirmed.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/deploy.yml README.md CLAUDE.md
git commit -m "Replace Next.js deploy workflow, update README and CLAUDE.md"
```
