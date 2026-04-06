# Portfolio — UI Review

**Audited:** 2026-04-06
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md)
**Screenshots:** Not captured (dev server detected at localhost:5173 but Playwright not invoked — code-only audit)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Strong Spanish copy throughout; Contact page mixes English and Spanish; Resume link is a dead `#` placeholder |
| 2. Visuals | 4/4 | Clear hierarchy, editorial bento grid, marquee strip, orbital SVG — intentional and consistent dark aesthetic |
| 3. Color | 3/4 | `font-mono` is remapped to General Sans (not a monospace), causing semantic/brand inconsistency; `#080808` repeated as arbitrary value in multiple files |
| 4. Typography | 3/4 | 10 distinct font-size classes in use (exceeds the 4-size guideline); clamp() fluid sizes are good but add further variation |
| 5. Spacing | 3/4 | Arbitrary pixel values `[10px]`, `[9px]`, `[7rem]`, `[280px]` scattered across files; core scale otherwise consistent |
| 6. Experience Design | 2/4 | Contact form has no loading, success, or error feedback; no `<label>` elements on inputs; stack data duplicated between HomePage and a separate stack component |

**Overall: 18/24**

---

## Top 3 Priority Fixes

1. **Contact form has zero submission feedback** — Users who submit the form receive no visual confirmation that it sent, no loading indicator, and no error state if the request fails. This breaks trust at the highest-conversion point of the site. Add a controlled `onSubmit` handler with `useState` for `idle | submitting | success | error` states, disable the button while submitting, and show an inline success message and an error fallback.

2. **Resume link is a dead placeholder (`href="#"`)** — Both the Navbar and Footer render a "Resume ↗" link pointing to `#`. Visitors who click it go nowhere. Either upload a PDF to `/public/assets/resume.pdf` and point both links to that path, or remove the links until the file is ready.

3. **Contact form inputs have no `<label>` elements** — All three fields (name, email, message) rely solely on `placeholder` text for identification. Placeholders disappear on focus and are not exposed to screen readers as labels. Wrap each field with a `<label htmlFor="...">` or add `aria-label` on each `<input>` / `<textarea>`. This is a WCAG 2.1 Level A failure.

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)

**What works well:**
- Hero copy is specific and personal: "Desarrollo web y móvil con React, Node.js y Java. Estudiante de Ingeniería Audiovisual en UPF." — no filler.
- Process steps use first-person active voice: "Entendemos el problema", "Entrega y soporte".
- CTAs are contextual: "Ver proyectos →", "Hablemos", "Ver todos →".
- Availability indicator copy ("Disponible para proyectos") is concise and credible.

**Issues:**
- `ContactPage.jsx` mixes languages: the page-level label is "Get in touch" (English), the heading is "Let's talk." (English), but the rest of the site is Spanish. Either unify to Spanish ("Hablemos" / "Contáctame") or commit to a bilingual strategy.
- `footer.jsx:9` — section label "Let's connect" is English while sibling column "Details" is also English, but the rest of the footer uses Spanish place names. Minor inconsistency.
- `Navbar.jsx:60` and `footer.jsx:44` — Resume link text promises an asset that does not exist (`href="#"`). Until the PDF is available, the label should be removed or replaced with a note.
- `ProjectsPage.jsx:12` — section label "Selected work" duplicates the same label used in `HomePage.jsx:175` ("Selected Works"). The capitalisation also differs.

### Pillar 2: Visuals (4/4)

The design is cohesive and intentional. Key observations:

- **Hero:** Large fluid display type (`clamp(3rem,10vw,8rem)`) creates an immediate focal point. The two-line name split with contrasting subtitle opacity (white/40) establishes clear hierarchy.
- **Bento grid (Services):** The `bg-white/[0.06]` gap trick for borders is a clean technique. The featured SEO tile with the oversized `text-[7rem]` watermark adds visual interest without cluttering.
- **Selected Works list:** Number counter at white/10, title at full white, stack tags at white/30 — three distinct levels of emphasis on a single row, well executed.
- **About marquee strip:** `grayscale opacity-60` baseline with `hover:grayscale-0 hover:opacity-80` is a tasteful interaction.
- **Orbital SVG:** Used as pure decoration with `aria-hidden="true"` — correct.
- **Footer MAZZARIOL watermark:** `WebkitTextStroke` outline text adds depth without competing with content.
- No icon-only buttons without labels (hamburger has `aria-label="Toggle menu"`).

No significant visual issues found.

### Pillar 3: Color (3/4)

**What works well:**
- Strict monochromatic palette: `#080808` background, white at various opacities (white/5 through white) as the only color system.
- Green status dot (green-400/green-500) used only for the availability indicator — appropriate single accent.
- Stack icon colors are brand-accurate and applied via inline `style={{ color }}` — acceptable since these are external brand colors, not design system tokens.

**Issues:**
- `tailwind.config.cjs:10` — `font-mono` is remapped to `'General Sans'`, which is a proportional sans-serif font. `font-mono` is used 64 times across the codebase as a design token (label style, navigation, metadata). The class name implies monospace but renders General Sans. This is a semantic mismatch: rename the token to `font-label` or `font-ui` in `tailwind.config.cjs`, or keep a true monospace fallback.
- `#080808` is hardcoded as an arbitrary value in at least 6 places (`Layout.jsx`, `footer.jsx`, `Navbar.jsx`, `ContactPage.jsx`, `AboutPage.jsx`, `HomePage.jsx` bento cells). This value should be defined as a Tailwind theme token (e.g. `colors.bg: '#080808'`) so it can be changed from one place.
- `AboutPage.jsx:123-124` — edge-fade gradient hardcodes `#080808` in inline style. Would be resolved by the token approach above.

### Pillar 4: Typography (3/4)

**Font size classes in use (10 distinct):**
`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-8xl`

Plus fluid sizes via `clamp()` (8 instances across pages), and arbitrary sizes `text-[10px]`, `text-[9px]`, `text-[7rem]` — bringing the total variation count to ~15.

**Font weight classes in use (3 distinct):** `font-medium`, `font-semibold`, `font-bold`

**Issues:**
- 10 named size steps plus ~7 arbitrary/clamp sizes is excessive for a portfolio. The actual rendered hierarchy is likely 5–6 levels, but the class variation makes it harder to maintain consistency. Consolidate: define clamp values as Tailwind theme extensions (`fontSize.display`, `fontSize.hero`) so they are reused rather than re-written per page.
- `text-[9px]` (`HomePage.jsx:165`) is below legible threshold on most screens. Stack icon labels at 9px render at ~12px on a Retina display but are not accessible at standard DPI. Raise to `text-[10px]` minimum or use `text-xs` (12px).
- `font-display` heading tag in CSS (`index.css:11-13`) applies Melodrama to `h1, h2` — but the bento `<h3>` service titles also use `font-display` via class. This is consistent and intentional, not an issue.
- `font-mono` remapped to General Sans (see Color pillar) causes visual drift: the label style that should feel like a monospace tag reads as regular sans-serif.

### Pillar 5: Spacing (3/4)

**Arbitrary spacing values found:**
- `text-[10px]` — used as a spacing-adjacent size token across all pages (acceptable as a recurring micro-label size)
- `min-h-[44px]`, `min-w-[44px]` — touch target enforcement, appropriate use of arbitrary values
- `max-w-[280px]` (`HomePage.jsx:191`) — stack tag container constraint
- `text-[7rem]` (`HomePage.jsx:236`) — SEO watermark
- `tracking-[0.2em]`, `tracking-[0.25em]` — letter-spacing tokens

**Issues:**
- No arbitrary *spacing scale* violations (no `p-[17px]` or `m-[23px]` style hacks). The Tailwind spacing scale is used correctly throughout.
- `py-24` is the dominant section rhythm (used on every section in HomePage) — consistent and good.
- `gap-px` / `bg-white/[0.06]` gap trick for the bento grid border is a deliberate technique — not an arbitrary spacing hack.
- Minor: `py-2.5` on hero CTA buttons (`HomePage.jsx:124,130`) while `py-3` is used on ContactPage and AboutPage CTA buttons. These render slightly different heights for visually equivalent buttons. Standardise to `py-3` across all primary CTAs.

### Pillar 6: Experience Design (2/4)

**State coverage:**

| State | Present |
|-------|---------|
| Loading (images) | Yes — `loading="lazy"` / `loading="eager"` on images |
| Page entrance animations | Yes — GSAP with `prefers-reduced-motion` guard |
| Hover states | Yes — consistent throughout |
| Focus-visible rings | Yes — added to all interactive elements |
| 44px touch targets | Yes — enforced via `min-h-[44px]` |
| Form loading state | No |
| Form success state | No |
| Form error state | No |
| Form field labels | No — placeholders only |
| Empty state (no projects) | N/A — data is static |
| Error boundary | No |

**Issues:**
- `ContactPage.jsx` — the form posts directly to Getform.io with no JS handling. There is no `onSubmit` interception, no `fetch`/`XMLHttpRequest`, and no feedback UI. After submission the browser performs a full-page navigation to Getform's confirmation URL. Users leave the site. Add a controlled submit handler using `fetch` to send the POST and show an inline "Message sent!" state on success, keeping the user on the page.
- No `<label>` elements on any form field (`ContactPage.jsx:18-43`). The three inputs use `placeholder` only. This fails WCAG 2.1 SC 1.3.1 and 3.3.2. Screen readers will not announce field purpose on focus.
- `HomePage.jsx` duplicates the `stackItems` array that also exists in `src/components/stack.jsx`. If stack items change, both files must be updated. Extract to a shared data file (e.g. `public/data/stack.js`) or import from the component.
- `Navbar.jsx:60` and `footer.jsx:44` — Resume links point to `href="#"` with `target="_blank"`. Opening a `#` link in a new tab produces a blank tab — a broken interaction with no recovery path for the user.
- No `ErrorBoundary` wrapping the app. A runtime error in any page component will crash the entire UI with a blank screen.

---

## Files Audited

- `/Users/enzopaolo/Documents/development/portfolio/src/pages/HomePage.jsx`
- `/Users/enzopaolo/Documents/development/portfolio/src/pages/AboutPage.jsx`
- `/Users/enzopaolo/Documents/development/portfolio/src/pages/ProjectsPage.jsx`
- `/Users/enzopaolo/Documents/development/portfolio/src/pages/ContactPage.jsx`
- `/Users/enzopaolo/Documents/development/portfolio/src/components/Navbar.jsx`
- `/Users/enzopaolo/Documents/development/portfolio/src/components/footer.jsx`
- `/Users/enzopaolo/Documents/development/portfolio/src/index.css`
- `/Users/enzopaolo/Documents/development/portfolio/tailwind.config.cjs`
- `/Users/enzopaolo/Documents/development/portfolio/public/data/portfolio.js`
