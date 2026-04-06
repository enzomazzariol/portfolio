# Enzo Mazzariol — Portfolio

Personal portfolio website for Enzo Mazzariol, Full Stack Developer based in Barcelona.

**Live:** https://enzomazzariol.is-a.dev/

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (JSX, functional components) |
| Build tool | Vite 6 + SWC |
| Styling | Tailwind CSS 3 (class-based dark mode) |
| Animations | GSAP 3 (SplitText, ScrollTrigger) |
| WebGL | OGL (Prism background) |
| Routing | React Router v7 |
| Deployment | Netlify (auto-deploy from `master`) |
| Contact form | Getform.io |
| Analytics | Google Analytics 4 |

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → /dist
npm run preview   # preview production build
npm run lint      # ESLint
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── footer.jsx
│   ├── Prism.jsx          # WebGL background (react-bits / ogl)
│   └── icons.jsx
├── pages/
│   ├── HomePage.jsx       # Hero, Stack, Selected Works, Servicios, Process
│   ├── ProjectsPage.jsx   # Split-panel project showcase
│   ├── AboutPage.jsx      # Bio, marquee, orbital SVG, services
│   └── ContactPage.jsx    # Getform.io contact form
├── App.jsx                # Route-level code splitting (React.lazy)
├── Layout.jsx             # Navbar + Outlet + Footer
└── index.css              # Tailwind directives

public/
├── assets/                # Project preview images (.webp)
└── data/
    ├── portfolio.js       # Project data array
    └── timeline.js        # Experience/education array
```

---

## Content Management

**Add a project** → edit `public/data/portfolio.js`, add preview image to `public/assets/`

**Add a timeline entry** → edit `public/data/timeline.js`

No component changes needed — pages map over the data arrays.

---

## Performance

- Route-level code splitting via `React.lazy` + `Suspense`
- Fonts loaded non-render-blocking (`preload` + `onload` swap)
- Vite manual chunks: `vendor` / `gsap` / `ogl` / `icons`
- Prism WebGL deferred until after first paint (`requestAnimationFrame`)
- Images use explicit `width`/`height` to prevent CLS
- GSAP animations respect `prefers-reduced-motion`

---

## Deployment

Pushes to `master` trigger automatic Netlify deploys.
Custom domain via `netlify.toml` redirect: `netlify.app → enzomazzariol.is-a.dev`
