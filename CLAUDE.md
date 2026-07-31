# CLAUDE.md — Portfolio Codebase Guide

This file provides context for AI assistants working on this repository.

## Project Overview

Personal portfolio website for Enzo Mazzariol, a Full Stack Developer. Built with Astro (static output) with React islands for interactive sections, showcasing projects, experience, and a contact form.

**Live site:** https://enzomazzariol.com/

Migrated from a Vite + React Router SPA to Astro (multi-page, static HTML per route). The old Vite app is preserved under `_legacy-vite/` for reference until the migration is fully cut over in production, then that folder should be deleted.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro (static output), React 19 islands for interactive components |
| Build tool | Astro's built-in Vite bundler |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`, CSS-based `@theme` config, no `tailwind.config.cjs`) |
| Linting | ESLint 9 (flat config, `.jsx` files only) |
| Deployment | Vercel (static output, auto-detected Astro framework) |
| Contact form | Getform.io |
| Analytics | Google Analytics 4 (G-3MR3P0H4X3), fired once per real page load — no client-side route tracker needed |

## Repository Structure

```
portfolio/
├── src/
│   ├── components/          # Shared components
│   │   ├── BaseHead.astro   # Per-page <head>: title/description/OG/Twitter/canonical/JSON-LD/GA4
│   │   ├── Footer.astro     # Static footer
│   │   ├── Navbar.jsx       # React island (client:load) — scroll state, mobile menu, active-link indicator
│   │   ├── Home.jsx         # React island — full HomePage content (hero, Prism, GSAP reveals)
│   │   ├── About.jsx        # React island — full AboutPage content
│   │   ├── Contact.jsx      # React island — contact form (Getform.io)
│   │   ├── Projects.jsx     # React island — projects scroll-spy (desktop split-view + mobile cards)
│   │   ├── NotFound.jsx     # React island — 404 glitch/scramble effect
│   │   ├── Prism.jsx        # WebGL background (ogl), lazy-loaded inside Home.jsx
│   │   ├── SkillScramble.jsx, TerminalTyper.jsx, StarBorder.jsx(+.css) — small presentational/animated pieces
│   │   └── home/            # ServicesGrid, SelectedWorks, ProcessSteps, StackSection (used by Home.jsx)
│   ├── layouts/
│   │   └── Layout.astro     # Wraps every page: BaseHead + Navbar (island) + <slot/> + Footer
│   ├── pages/                # File-based routing — each file is a real static route
│   │   ├── index.astro       # /
│   │   ├── sobre-mi.astro    # /sobre-mi
│   │   ├── proyectos.astro   # /proyectos
│   │   ├── contacto.astro    # /contacto
│   │   └── 404.astro         # Vercel/Astro 404 page
│   ├── data/
│   │   └── portfolio.js      # Array of project objects, imported directly (no CMS/content collections)
│   └── styles/
│       └── global.css        # Tailwind import + @theme (fonts) + custom keyframe animations
├── public/
│   ├── assets/               # Project preview images, CV, favicons
│   ├── robots.txt
│   └── (sitemap is generated at build time by @astrojs/sitemap → dist/sitemap-index.xml)
├── astro.config.mjs          # site URL, @astrojs/react, @astrojs/sitemap, Tailwind Vite plugin
├── eslint.config.js
├── vercel.json                # { "cleanUrls": true } — no SPA rewrite needed, routes are real static files
└── _legacy-vite/              # Old Vite+React SPA, kept for reference until cutover — do not build from here
```

## Development Workflows

### Setup & Run

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (astro dev)
```

### Build & Preview

```bash
npm run build     # astro build → /dist (real static HTML per route)
npm run preview   # astro preview
```

### Linting

```bash
npm run lint      # Run ESLint on .js/.jsx files (Astro files aren't linted)
```

There are no automated tests in this project.

### Deployment

Vercel auto-detects the Astro framework from `package.json`. Pushes to the production branch deploy automatically. No CI pipeline is configured.

## Key Conventions

### Astro pages vs. React islands

- Each route in `src/pages/*.astro` is a thin wrapper: imports `Layout.astro`, passes per-page `title`/`description`/`ogImage`, and renders one large React island (`client:load`) containing that page's actual content.
- This is a deliberate pragmatic choice made during the Vite→Astro migration: rather than splitting every page into many small islands, each page's interactive React tree (GSAP `useGSAP`/`ScrollTrigger` scoped animations, hover/scroll state, forms) was ported as a single component to minimize rewrite risk. `Footer.astro` is the only fully static, non-hydrated component.
- Props are destructured in function signatures. No TypeScript in `.jsx` files; use plain JS.
- ESLint `react/prop-types` is disabled inline (`// eslint-disable-next-line react/prop-types`) where it fires — this is intentional, do not add PropTypes.

### Styling

- Tailwind CSS 4, configured via `@tailwindcss/vite` (no `tailwind.config.cjs` — theme customization lives in `src/styles/global.css` under `@theme`).
- Custom fonts: `--font-display` (Melodrama), `--font-sans`/`--font-mono` (General Sans).
- The site is single fixed dark theme (`bg-[#080808] text-white`) — there is no light/dark toggle and no `localStorage` theme persistence.
- Responsive design follows a mobile-first approach with `md:`/`lg:` breakpoints.

### Data

- Portfolio projects live in `src/data/portfolio.js` — edit this file to add/remove/update projects. Imported directly by `Projects.jsx` and `home/SelectedWorks.jsx`; no content collections or CMS.
- Project preview images go in `public/assets/`.

### SEO / Meta

- Per-page title/description/OG image are passed as props to `Layout.astro` from each `src/pages/*.astro` file.
- `src/components/BaseHead.astro` renders the full `<head>`: title, meta description/keywords, OG/Twitter tags, canonical URL (derived from `Astro.url.pathname`), the site-wide JSON-LD `@graph` (Person/WebSite/ProfessionalService — identical on every page), font preloads, and the GA4 `gtag` script.
- Sitemap is generated automatically at build time by `@astrojs/sitemap` (`dist/sitemap-index.xml` + `dist/sitemap-0.xml`) — do not hand-maintain a `public/sitemap.xml`.
- Adding a new route: create `src/pages/<route>.astro`, give it a `<Layout title=... description=... ogImage=...>`, and the sitemap picks it up automatically on next build.

### External Links

Always use `target="_blank"` with `rel="noopener noreferrer"` on external links.

## File Naming

- Component files use PascalCase for React components (`Navbar.jsx`, `Home.jsx`) and Astro components (`BaseHead.astro`, `Footer.astro`).

## Branch Strategy

- Production branch auto-deploys to Vercel.
- Feature work should be done on separate branches and merged via PR.
