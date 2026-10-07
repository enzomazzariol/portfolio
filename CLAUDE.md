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
│   │   ├── BaseHead.astro   # Per-page <head>: title/description/OG/Twitter/canonical/JSON-LD/GA4, Google Fonts
│   │   ├── Footer.astro     # Static footer (dark .inverted band, live Barcelona time, scroll-driven name)
│   │   ├── Navbar.jsx       # React island (client:load) — scroll state, mobile menu, active-link indicator
│   │   ├── Home.jsx         # React island — home page: hero (tossed screenshot tiles), all GSAP/SplitText animations
│   │   ├── Contact.jsx      # React island — contact form (Getform.io)
│   │   └── home/            # SelectedWorks, WhatIDo, ExperienceSection, StackSection (used by Home.jsx;
│   │                        #   ExperienceSection is also SSR-rendered, without hydration, on /sobre-mi)
│   ├── layouts/
│   │   └── Layout.astro     # Wraps every page: BaseHead + Navbar (island) + <slot/> + Footer
│   ├── pages/                # File-based routing — each file is a real static route
│   │   ├── index.astro       # /
│   │   ├── sobre-mi.astro    # /sobre-mi — static
│   │   ├── proyectos.astro   # /proyectos — static listing
│   │   ├── proyectos/[slug].astro # /proyectos/<slug> — static case study per project (getStaticPaths)
│   │   ├── contacto.astro    # /contacto
│   │   └── 404.astro         # Vercel/Astro 404 page — static
│   ├── data/
│   │   ├── portfolio.js      # Array of project objects, imported directly (no CMS/content collections)
│   │   └── experience.js     # Timeline entries shared by / and /sobre-mi
│   └── styles/
│       └── global.css        # Tailwind import + design tokens (@theme) + .band/.inverted scopes + animations
├── public/
│   ├── assets/               # Project preview images, CV, favicons; assets/hero/ = 640px copies for the home hero
│   ├── robots.txt
│   └── (sitemap is generated at build time by @astrojs/sitemap → dist/sitemap-index.xml)
├── astro.config.mjs          # site URL, @astrojs/react, @astrojs/sitemap, Tailwind Vite plugin
├── eslint.config.js
├── vercel.json                # cleanUrls + trailingSlash:false (matches astro trailingSlash:'never', sitemap and canonicals)
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

- Prefer static Astro pages: `/proyectos`, `/proyectos/[slug]`, `/sobre-mi` and `404` ship no page-level JS. Their scroll reveals use the CSS `.reveal-view` utility (native `animation-timeline: view()`).
- React islands only where interactivity is needed: `Home.jsx` (GSAP `useGSAP` + ScrollTrigger + SplitText, hero tile entrance/parallax), `Contact.jsx` (form), `Navbar.jsx`.
- A React component with no interactivity can be rendered in an `.astro` page **without** a `client:*` directive to get plain HTML (see `ExperienceSection` on /sobre-mi).
- GSAP gotcha: GSAP writes inline `rotate/translate/scale: none` on elements it animates, so CSS individual-transform properties (e.g. a resting tilt) must live on a wrapper GSAP doesn't touch.
- Props are destructured in function signatures. No TypeScript in `.jsx` files; use plain JS.
- ESLint `react/prop-types` is disabled inline (`// eslint-disable-next-line react/prop-types`) where it fires — this is intentional, do not add PropTypes.

### Styling

- Tailwind CSS 4, configured via `@tailwindcss/vite` (no `tailwind.config.cjs` — theme customization lives in `src/styles/global.css` under `@theme`).
- Light editorial look. **All colors/fonts/radii are tokens** in `global.css` `@theme`: `canvas` (#f7f5f3 bg), `surface` (#fff cards), `ink` (#0d0d0d text — use `/opacity` for muted), `accent`, `--font-display` (Fraunces, use the `.display` class for headings), `--font-sans`/`--font-mono` (both Instrument Sans — `font-mono` is just the small-label style), `rounded-ui` / `rounded-tile`. Never hardcode hex colors or `text-white`/`bg-black` in components.
- `.band` (white section) and `.inverted` (dark footer) re-declare the tokens for their subtree, so every utility inside flips automatically.
- Responsive design follows a mobile-first approach with `md:`/`lg:` breakpoints.

### Data

- Portfolio projects live in `src/data/portfolio.js` — edit this file to add/remove/update projects. Imported by `proyectos.astro`, `proyectos/[slug].astro`, `home/SelectedWorks.jsx` and `Home.jsx`; adding an entry creates its case-study page and sitemap entry automatically.
- Project preview images go in `public/assets/`.

### SEO / Meta

- Per-page title/description/OG image are passed as props to `Layout.astro` from each `src/pages/*.astro` file.
- `src/components/BaseHead.astro` renders the full `<head>`: title, meta description/keywords, OG/Twitter tags, canonical URL (derived from `Astro.url.pathname`), the site-wide JSON-LD `@graph` (Person/WebSite — identical on every page), font preloads, and the GA4 `gtag` script.
- Sitemap is generated automatically at build time by `@astrojs/sitemap` (`dist/sitemap-index.xml` + `dist/sitemap-0.xml`) — do not hand-maintain a `public/sitemap.xml`.
- Adding a new route: create `src/pages/<route>.astro`, give it a `<Layout title=... description=... ogImage=...>`, and the sitemap picks it up automatically on next build.

### External Links

Always use `target="_blank"` with `rel="noopener noreferrer"` on external links.

## File Naming

- Component files use PascalCase for React components (`Navbar.jsx`, `Home.jsx`) and Astro components (`BaseHead.astro`, `Footer.astro`).

## Branch Strategy

- Production branch auto-deploys to Vercel.
- Feature work should be done on separate branches and merged via PR.
