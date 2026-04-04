# CLAUDE.md — Portfolio Codebase Guide

This file provides context for AI assistants working on this repository.

## Project Overview

Personal portfolio website for Enzo Mazzariol, a Full Stack Developer. Built as a single-page React application showcasing projects, experience, and a contact form.

**Live site:** https://enzomazzariol.is-a.dev/

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (JSX, functional components) |
| Build tool | Vite 6 with SWC plugin |
| Styling | Tailwind CSS 3 (class-based dark mode) |
| Linting | ESLint 9 (flat config) |
| Deployment | Netlify |
| Contact form | Getform.io |
| Analytics | Google Analytics 4 (G-3MR3P0H4X3) |

## Repository Structure

```
portfolio/
├── src/
│   ├── components/          # All UI components (one file per section/element)
│   │   ├── intro.jsx        # Hero section: name, bio, CTA buttons
│   │   ├── portfolio.jsx    # Projects grid
│   │   ├── portfolioItem.jsx# Single project card
│   │   ├── timeline.jsx     # Experience/education timeline
│   │   ├── timelimeItem.jsx # Single timeline entry (note: typo in filename)
│   │   ├── contact.jsx      # Contact form (Getform.io)
│   │   ├── footer.jsx       # Footer with social links
│   │   ├── icons.jsx        # SVG icon exports
│   │   ├── subtitle.jsx     # Reusable section heading
│   │   └── buttonContact.jsx# Reusable CTA button
│   ├── App.jsx              # Root component; manages dark/light theme state
│   ├── main.jsx             # React entry point (StrictMode)
│   └── index.css            # Tailwind directives only
├── public/
│   ├── assets/              # Project preview images + favicons
│   ├── data/
│   │   ├── portfolio.js     # Array of project objects
│   │   └── timeline.js      # Array of experience/education entries
│   ├── robots.txt
│   └── sitemap.xml
├── index.html               # Entry HTML; contains all SEO meta tags and JSON-LD
├── vite.config.js
├── tailwind.config.cjs
├── postcss.config.cjs
├── eslint.config.js
└── netlify.toml             # Domain redirect (netlify.app → is-a.dev)
```

## Development Workflows

### Setup & Run

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:5173
```

### Build & Preview

```bash
npm run build     # Production build → /dist
npm run preview   # Preview production build locally
```

### Linting

```bash
npm run lint      # Run ESLint (no auto-fix flag configured)
```

There are no automated tests in this project.

### Deployment

Pushes to `master` trigger automatic Netlify deploys. No CI pipeline is configured.

## Key Conventions

### Components

- All components are functional React components using hooks.
- Props are destructured in function signatures.
- ESLint prop-types rule is disabled at the file level in most components (`// eslint-disable-next-line react/prop-types`). Do not add PropTypes — this is intentional.
- No TypeScript; use plain `.jsx`.

### Styling

- Use Tailwind CSS utility classes exclusively. Do not write custom CSS except in `index.css` for Tailwind directives.
- Dark mode is class-based. Use `dark:` variants alongside light-mode classes.
- Responsive design follows a mobile-first approach with `md:` and `lg:` breakpoints.
- The custom font is Space Mono (`font-mono` maps to it via `tailwind.config.cjs`).

### Data

- Portfolio projects live in `public/data/portfolio.js` — edit this file to add/remove/update projects.
- Timeline entries live in `public/data/timeline.js` — edit this for experience or education changes.
- Project preview images go in `public/assets/`.

### Theme

- Dark/light theme state lives in `App.jsx` using `useState`.
- The `dark` class is toggled on a wrapper `div` and propagates via Tailwind's class-based dark mode.
- `useEffect` in `App.jsx` persists the theme choice to `localStorage`.

### External Links

Always use `target="_blank"` with `rel="noopener noreferrer"` on external links.

### SEO / Meta

- All SEO meta tags, Open Graph, Twitter Card, and JSON-LD structured data live in `index.html`.
- Update `public/sitemap.xml` if new routes or major sections are added.

## File Naming

- Component files use camelCase (e.g., `portfolioItem.jsx`).
- Note: `timelimeItem.jsx` has a typo in the filename — do not rename it without updating the import in `timeline.jsx`.

## Adding a New Project

1. Add an entry to `public/data/portfolio.js` following the existing object shape.
2. Add a preview image to `public/assets/`.
3. No component changes are needed — `portfolio.jsx` maps over the data array.

## Adding a Timeline Entry

1. Add an entry to `public/data/timeline.js` following the existing object shape.
2. No component changes are needed — `timeline.jsx` maps over the data array.

## Branch Strategy

- `master` is the production branch (auto-deploys to Netlify).
- Feature work should be done on separate branches and merged via PR.
