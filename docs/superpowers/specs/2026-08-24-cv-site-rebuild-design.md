# CV site rebuild — design spec

Date: 2026-08-24
Status: approved (structure/content), visual direction confirmed as "fully modern, discard old where it improves UX, showcase React"

## Goal

Replace the existing Next.js 14 static-export resume site (`liam-mckenna.github.io`) with a rebuilt React + Vite site: updated content from the new CV (`public/documents/Liam-McKenna-CV.pdf`), a modernized visual identity, and idiomatic use of React (hooks, composition, code-splitting, animation) rather than a like-for-like port.

The old Next.js codebase (`src/app/*`, `next.config.js`, `jsconfig.json`, the Next-specific `.eslintrc.json`, `.next/`, `out/`) is fully replaced, not kept alongside. This is a rebuild, not an incremental migration.

## Tech stack

- **Vite + React** (no Next.js). No SSR/SSG framework needed — content is static and known at build time.
- **react-router** (`BrowserRouter`) for clean URLs (`/`, `/experience`, `/projects`, `/about`). Route components are code-split via `React.lazy` + `Suspense`.
- **Tailwind CSS only** — no CSS Modules, no styled-components, no Sass. One styling system, extended with custom design tokens (colors, fonts, spacing) in `tailwind.config.js`.
- **Framer Motion** for scroll-reveal transitions, route transitions (`AnimatePresence`), and the animated stat counters.
- **Vitest + React Testing Library** — a small, targeted test setup (not full coverage). Covers the two pieces of actual logic: the count-up hook and the accordion expand/collapse behavior. Given the user's professional focus is test engineering, leaving the rebuilt personal site with zero tests would read oddly; this stays modest in scope per YAGNI — no snapshot/visual test suite, no e2e.
- Deployment stays on **GitHub Pages** via GitHub Actions, replacing `.github/workflows/nextjs.yml` with a Vite build → `dist` → `actions/upload-pages-artifact` → `actions/deploy-pages` workflow. Site is served at the domain root (user page, not project page), so `vite.config.js` uses `base: '/'`.
- GitHub Pages has no server-side rewrites, so direct navigation to `/experience` etc. 404s by default. Standard fix: a `public/404.html` that redirects to `index.html` with the path encoded in the query string, plus a small restore-path script in `index.html` (the well-known [spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique). This preserves clean URLs without a hash router.

## Content architecture

CV content moves out of JSX-mixed-with-data (the old pattern, e.g. `logo: <Image src={...} />` embedded directly in a data array) into plain data modules under `src/data/`:

- `experience.js` — array of role objects (`title, company, location, start, end, summary, bullets[], logo?, skills[]`), split into `currentRoles` (Experlogix, Nuritas — full detail) and `earlierRoles` (Glofox, Cloudtech, Covalen/HPE, Sonics AVI, Sin Nightclub — summary only, for the accordion).
- `projects.js` — array of project objects; one entry initially (the Cypress framework), shaped so adding a second project later is just a new array entry, not a structural change.
- `skills.js` — grouped core stack: Languages, Frontend, Backend, Testing, DevOps & Tooling, Design.
- `education.js` — TU Dublin BSc (in progress, conferring 2027) and Crumlin College certificate.
- `profile.js` — name, title, location, contact links (email, LinkedIn, GitHub), CV file path, the hero summary paragraph.

Components render this data; no JSX lives inside `src/data/`. Logos are referenced by path/alt text; a component decides how to render (real `<img>` vs. fallback badge), not the data file.

### Content mapping from the new CV

**Profile / hero**: Liam McKenna, Software Engineer, Greystones/Dublin. Summary paraphrased from the CV profile: four years' commercial experience across React/Django product work and end-to-end test automation; currently building first automated test coverage for a B2B ecommerce platform (~150 customer webshops, Cypress); previously two years as sole frontend developer on an internal research platform used by 20–30 biologists/data scientists; design background; completing a BSc part-time.

**Experience — current/detailed roles**:
- *QA Engineer, Experlogix (Jul 2024 – present, Dublin)* — sole QA engineer for extended periods on a B2B ecommerce platform (~150 customer webshops, each with its own config and ERP integration — SAP, Business Central, CE, F&O); introduced the company's first automated e2e coverage (Cypress suite from scratch across webshop, management interface, CPQ portal — 18 spec files, 55 tests, 24 custom commands); data-driven framework (one spec runs against 13 configured sites via per-site capability flags, handles two divergent checkout implementations from config); solved the SSO barrier that had blocked automated testing; added cypress-axe accessibility checks; authored testing strategy and `data-cy` selector conventions; manual acceptance/regression testing in Kanban flow across VPN staging + local DB-restored instances; own SSH-based remote workflow; contributed to Azure DevOps Test Plans adoption.
- *Software Engineer, Nuritas (Oct 2021 – Oct 2023, Dublin, joined as Junior)* — sole frontend developer on Pantry, an internal React + Django REST platform used by 20–30 biologists/data scientists exploring tens of millions of peptide/mass-spec records for ML-led discovery; took over frontend a month into the role, maintained/extended it alone for two years; shipped React interfaces replacing direct SQL access for the Data Curation team; designed/prototyped a bulk Excel import mapping onto a 50-table schema with 130+ attributes; Dockerised environment, GitLab, Kanban, alongside four backend/DevOps engineers.

**Experience — earlier roles (accordion, summary only)**:
- Web Implementation Support, Glofox (Aug 2020 – Feb 2021)
- Software Developer, Cloudtech Ltd (Jan 2020 – Aug 2020)
- Technical Support Engineer (1st & 2nd Level), Covalen (contracted to HPE) (Jun 2018 – Jan 2020)
- AV Technician, Sonics AVI (Aug 2017 – Jun 2018)
- Graphic Designer & Media Manager, Sin Nightclub (May 2012 – Aug 2017)

Use the CV's earlier-experience descriptions (already condensed there) as the accordion body text.

**Projects**: Multi-site End-to-End Test Framework (Cypress, JavaScript, Node, 2025–26) — case-study page using the CV's four bullets: data-driven architecture (13 sites, capability flags, checkout variants from config); custom command layer (24 commands over session reuse, auth setup, config merging); the bounding-box-geometry custom assertion for testing visual layout through the DOM; accessibility + real-event testing + ESLint/Prettier + selective video retention, plus the documented testing strategy/selector conventions. Note: CV has a placeholder `[Publish cleaned repo and add link here]` — omit any repo link until one exists; do not fabricate a URL.

**Core stack** (About page): Languages (JavaScript, Python, SQL, HTML, SCSS, PHP-working knowledge), Frontend (React, Next.js, Redux), Backend (Django, DRF, Node.js, Express), Testing (Cypress, cypress-axe, cypress-real-events, ESLint, manual/exploratory testing, Azure DevOps Test Plans), DevOps & Tooling (Docker, Git, GitLab, GitHub, GitLab CI/CD, Azure, Jira, Confluence), Design (Figma, Photoshop, Illustrator, Premiere Pro).

**Education**: BSc (Hons) Information Technology & Information Systems, TU Dublin, 2018–2027, first class honours across completed modules, final-year project in progress, part-time alongside full-time work. Certificate in Software Development, Crumlin College, 2017–2018, first class.

## Site structure

- **`/` Home** — hero (name, title, location, one-line positioning), CV summary paragraph, animated stat highlights drawn straight from the CV (e.g. 55 tests / 150 sites / 20–30 users / 130+ attributes — via a `useCountUp` hook triggered on scroll into view), a "featured work" teaser linking into Experience and Projects, Download CV button.
- **`/experience`** — full Experlogix and Nuritas entries as a timeline/detail layout; earlier roles below as an accordion (built directly with Framer Motion height animation, not the old `react-collapse` dependency — one less dependency, and Framer Motion is already in use for the rest of the site).
- **`/projects`** — list of project cards (one today) linking to a case-study detail view for the Cypress framework.
- **`/about`** — core stack (grouped), education, and a short narrative paragraph connecting the design background to engineering work.
- **No dedicated Contact page** — contact links (email, LinkedIn, GitHub) and the CV download live in a persistent footer rendered on every page via the router's layout route.

## Component architecture

```
src/
  main.jsx
  App.jsx                 # layout: Navbar, <Outlet/>, Footer, AnimatePresence for route transitions
  router.jsx               # route table, React.lazy per page
  pages/
    Home.jsx
    Experience.jsx
    Projects.jsx
    ProjectDetail.jsx
    About.jsx
  components/
    layout/Navbar.jsx
    layout/Footer.jsx
    ui/Badge.jsx            # skill/tech tags
    ui/StatTile.jsx          # animated count-up stat
    ui/SectionHeading.jsx
    ui/LogoOrBadge.jsx       # renders company logo image, or a generated monogram badge when no asset exists (Experlogix, Covalen have none today)
    experience/RoleCard.jsx
    experience/EarlierRolesAccordion.jsx
    projects/ProjectCard.jsx
  data/
    profile.js
    experience.js
    projects.js
    skills.js
    education.js
  hooks/
    useScrollReveal.js      # IntersectionObserver-driven fade/slide-in for sections and timeline entries
    useCountUp.js            # animates a number from 0 to target once visible
    useMediaQuery.js
```

Use of React idioms: route-level code-splitting (`React.lazy`/`Suspense`), custom hooks for the two pieces of real interactive logic (scroll reveal, count-up), composed presentational components (`RoleCard`, `ProjectCard`, `StatTile`, `Badge`) reused across pages instead of one-off markup per section, and no unnecessary global state — no context is introduced since nothing needs cross-tree shared state (the old `GlobalRefsContext` was vestigial and is not carried forward).

## Visual design

Full creative latitude confirmed: evolve the dark/purple identity where it still serves the design, discard/replace it where a better modern pattern exists. Concretely:

- Keep a dark base (near-black, slight blue-violet tint) and a violet/purple accent family as the throughline back to the old brand, but rework it into a proper token system in `tailwind.config.js` (background/surface/text/accent/accent-secondary scales) rather than one-off hex literals in JSX.
- Add a secondary accent (warm contrast tone) reserved for the stat highlights/numbers, so the "55 tests / 150 sites" moments visually pop against the violet.
- Modern type pairing: a geometric/display sans for headings (e.g. Space Grotesk or Sora) over a clean body sans (Inter, already used), plus a monospace accent for tech-tag badges (`React`, `Cypress`, `Django`) — ties visually to the engineering/testing subject matter.
- Single theme (dark) — no light/dark toggle. Kept out of scope; can be revisited later if wanted.
- Motion: scroll-triggered reveals on section/timeline entries, animated stat counters, animated accordion expand/collapse, subtle route-transition fade via `AnimatePresence`. Respect `prefers-reduced-motion`.

## Assets

- Reuse: `LMK-logo.svg`, `NuritasLogo.png`, `glofox.svg`, `cloudtechLogo.png`, `sinLogo.png`, `sonicslogo.jpeg`, `HPELogo.png` (Covalen contracted to HPE — HPE logo is the closest available asset).
- No logo exists for Experlogix. Build a `LogoOrBadge` component that renders a generated monogram/initial badge when no image is supplied, rather than blocking on new artwork.
- CV download links to `public/documents/Liam-McKenna-CV.pdf`. Remove the stale `public/documents/liamCV.pdf` reference from the old `Introduction.js` (file no longer exists — already shows as deleted in git status) and the unused `.docx` stays available but isn't linked from the UI (PDF is the canonical download).

## Out of scope

- Contact form (link-only contact, per earlier discussion).
- Light/dark theme toggle.
- Multiple projects beyond the one Cypress case study (data structure supports adding more later).
- CMS or non-code content editing — content stays in `src/data/*.js`, matching how the old site worked (edit-the-code model), just cleaner.
- The `[Publish cleaned repo and add link here]` placeholder from the CV — no repo link until one actually exists.

## Migration/cleanup

- Delete: `src/app/`, `next.config.js`, `jsconfig.json` (replaced by Vite's path-alias config), the Next-flavored `.eslintrc.json`, `.next/`, `out/`, `react-collapse` and `styled-components` dependencies (unused after rebuild — Framer Motion + Tailwind replace their roles).
- `package.json` rewritten for Vite scripts (`dev`, `build`, `preview`, `lint`, `test`).
- `.gitignore` updated: drop `/out`, `/.next`; add `/dist`.
- `.github/workflows/nextjs.yml` replaced with a Vite-based workflow.
- `README.md`'s opening "bootstrapped with create-next-app" paragraph no longer applies — update once the rebuild lands.
- `CLAUDE.md` (already exists, documents the old Next.js architecture) gets rewritten at the end of the rebuild to describe the new Vite/React/Tailwind/react-router structure.
