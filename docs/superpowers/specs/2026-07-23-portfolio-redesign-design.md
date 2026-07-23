# Portfolio Redesign — Tailwind + Magic UI + GSAP + Lenis

## Context

The portfolio (`Zieszx/portfolio`, deployed to GitHub Pages at `/portfolio` via
`.github/workflows/deploy.yml`) is a React 19 + Vite 7 app using React Router for
8 pages (Home, About, Skills, Portfolio, Resume, Achievements, Services, Contact).
Styling is Bootstrap 5 (CDN) plus ~3,300 lines of custom/vendor CSS
(`main.css` + `custom.css`), with AOS for scroll reveals, Typed.js for the hero
role text, and a hand-rolled `CountUp` for stats. Theme (light/dark) is Redux
state toggling `dark-mode`/`light-mode` classes on `<html>`.

Two drivers for this change:

1. The CV has moved on from the current site content — title changed from
   Software Developer to **Software Engineer** (Apr 2026–Present), 2 years of
   experience (not 1+), new freelance work (Nuvera, Meet Nuvera/Valorra), and
   new skills (Next.js, TypeScript, Vertex AI, Groq, Drizzle ORM, Socket.io,
   NextAuth).
2. The user wants a full visual/motion redesign inspired by award-style sites
   (elephant-skin.com, sharplink.com, dragonfly.xyz, ricardochance.com,
   valeran.eu), built with Tailwind CSS, hand-ported Magic UI components, GSAP,
   and Lenis smooth scroll.

## Reference site patterns (from live review)

Across the 5 reference sites the recurring patterns are: oversized kinetic
typography, numbered section eyebrows ("01 — ..."), scroll-driven reveals
(GSAP ScrollTrigger territory), hover-driven featured-work switchers with
"See live" links, stat counters, and a restrained near-monochrome palette with
one accent color. `ricardochance.com` (a solo design-engineer's portfolio) is
the closest structural match: bold hero statement → featured work → numbered
process → contact.

## Goals

- Replace Bootstrap + AOS + Typed.js + PureCounter/Waypoints/GLightbox/
  Isotope/Swiper with Tailwind CSS + hand-ported Magic UI components + GSAP
  (ScrollTrigger) + Lenis.
- Redesign `Home` as the narrative flagship landing page (bold hero → Featured
  Work → process/what-I-do → stats → teasers), matching the reference sites'
  storytelling flow. Other pages (About, Skills, Portfolio, Resume,
  Achievements, Services, Contact) keep their existing purpose but adopt the
  same design system and motion language.
- Update all content to match the latest CV (title, experience, skills,
  freelance projects).
- Add 4 real client projects as Portfolio entries, tagged "Client Work":
  Meet Nuvera (meetnuvera.com), Nuvera MLM (business.nuverarose.com),
  Kalibrasi calibration demo (kalibrasi.webgeaz.com), and enrich the existing
  Inxepta entry with its live link (royalhabibiofficial.com). These 4 are also
  featured on Home.
- Keep the site deployable on GitHub Pages exactly as today (same `base:
  '/portfolio'`, same Actions workflow, same React Router `basename`).

## Non-goals

- Not migrating to Next.js or a meta-framework — stays Vite + React Router.
- Not adding `framer-motion` — GSAP is the single animation engine; Magic UI
  components are limited to ones that are pure CSS/vanilla-JS so they don't
  pull in a second animation library.
- Not using GSAP's paid SplitText plugin (Club GreenSock only) — headline
  text-splitting for reveals is hand-rolled (wrap words/chars in spans via a
  small utility) using only free GSAP.
- Not adding a CMS or backend — content stays as JS data arrays in components,
  same as today.
- Not reproducing 3D/WebGL/shader effects seen on ricardochance.com — out of
  scope for this pass; motion stays 2D (GSAP + CSS transforms).

## Architecture

### Styling
- Add `tailwindcss` + `@tailwindcss/vite`, register the Vite plugin, add
  `@import "tailwindcss";` to `src/index.css`. Configure `darkMode: 'class'`
  targeting the existing Redux-driven class toggle on `<html>`, but rename the
  toggled class from `dark-mode`/`light-mode` to Tailwind's `dark` convention
  (`themeSlice`/`App.jsx` updated accordingly; `localStorage` key unchanged).
- Remove Bootstrap CSS/JS `<link>`/`<script>` tags from `index.html`. Keep the
  Bootstrap Icons webfont CDN link (icon glyphs only, no framework coupling).
- Retire `main.css`/`custom.css`/`styles.jsx` incrementally as each component
  is ported to Tailwind utility classes; delete once no component references
  them.

### Motion
- `gsap` + `@gsap/react`'s `useGSAP` hook per component for scroped, cleanup-safe
  animations. `ScrollTrigger` registered once in `main.jsx`.
- `lenis` initialized once in `App.jsx`, driving `ScrollTrigger.update` on its
  `scroll` event and using `ScrollTrigger.scrollerProxy` per the standard
  Lenis↔GSAP integration recipe. Re-synced (not re-created) on route change.
- Route-level reveal animations replace AOS: a small `useScrollReveal` hook
  (wraps `ScrollTrigger.batch` for the common "fade + rise on enter" case) that
  components call instead of sprinkling `data-aos` attributes.

### Magic UI (hand-ported, not CLI-installed)
Local files under `src/components/magicui/`, adapted from Magic UI's published
source (JSX, not TSX; no `framer-motion` dependency):
- `Marquee` — infinite-scrolling row (tech-stack ticker, "stack" band).
- `ShimmerButton` — primary CTAs (View My Work, Let's Connect).
- `BorderBeam` — animated border accent on featured-project cards and the
  profile image ring.
- `MagicCard` — cursor-spotlight card wrapper for portfolio/service cards.
- `DotPattern` — subtle background texture behind hero/section transitions.
- `TypingAnimation` — replaces Typed.js for the hero role text.
- `AnimatedGradientText` — numbered section eyebrows ("01 — Featured Work").
A small `cn()` utility (`clsx` + `tailwind-merge`) is added since these
components expect it.

### Data/content changes
- `Skills.jsx`: add Next.js, TypeScript, Vertex AI, Groq Cloud, Drizzle ORM,
  Socket.io, NextAuth to the relevant categories. Also add **Claude Code** and
  **Cowork** to Tools & Platforms, reflecting the AI-assisted ("vibe coding")
  workflow tools the user works with day to day — pairs with the existing
  "runs internal AI training" narrative already in the About/Resume copy.
- `Resume.jsx` / `About.jsx` / `Home.jsx`: title → Software Engineer,
  experience → 2+ years, add Freelance entry (Nuvera + Meet Nuvera), refresh
  the typed/rotating role strings and bio copy to match the new CV summary.
- `Portfolio.jsx`: add 4 entries —
  - **Meet Nuvera** (demo: meetnuvera.com) — dating app, Next.js/TypeScript/
    PostgreSQL/Drizzle/Socket.io, category `web`, `featured: true`.
  - **Nuvera MLM** (demo: business.nuverarose.com) — Laravel 10/PHP/MySQL
    e-commerce+MLM platform, category `web`, `featured: true`.
  - **Kalibrasi Calibration System** (demo: kalibrasi.webgeaz.com) — SOAD
    Framework/MySQL, category `web`, `featured: true`.
  - Update existing **INXEPTA** entry: add `demo: 'https://royalhabibiofficial.com'`,
    `featured: true`.
  A `featured` flag drives which cards render in Home's "Featured Work"
  section (pulled from the same `portfolioProjects` array, no duplication).
- Hero/About stats: projects 10+ → 14+, years 1+ → 2+.

### Project imagery
Attempt to screenshot the 4 live client sites via the browser tool for real
card imagery, saved to `public/assets/img/portfolio/`. If a site fails to load
or renders unusably (timeouts observed earlier with some external sites), fall
back to a stylized gradient + monogram card (consistent with the reference
sites' minimal aesthetic) for that entry specifically — this is a per-project
fallback, not all-or-nothing.

### Page-by-page
- **Home**: rebuilt — hero (bold statement, `TypingAnimation` role text,
  `ShimmerButton` CTAs, `DotPattern` background), Featured Work (4 client
  projects, `MagicCard` + `BorderBeam`, live links), numbered process section
  (replacing/absorbing `Services` content into Home as a teaser + link to the
  full `/services` page), stats band, "get to know me" teaser into `/about`.
- **About, Skills, Portfolio, Resume, Achievements, Services, Contact**:
  restyled with Tailwind + the same motion system; structure/fields stay as
  they are today apart from the content updates above. `Portfolio.jsx` keeps
  its existing filter UI, restyled.
- **Header/Footer** (`App.jsx`): restyled nav, theme toggle updated to the
  `dark` class convention, Lenis/ScrollTrigger wiring lives here.

### Build & deploy
No changes to `vite.config.js` beyond adding the Tailwind plugin, and no
changes to `.github/workflows/deploy.yml` — the workflow just runs `npm
install` + `npm run build` + deploy, which keeps working as long as the build
succeeds locally first.

## Rollout plan

1. Work on a feature branch (`redesign-tailwind-gsap`).
2. Implement in dependency order: tooling (Tailwind/GSAP/Lenis setup + magicui
   utilities) → shared shell (App/Header/Footer/theme) → Home → remaining
   pages → content/data updates → asset screenshots.
3. Run `npm run build` and `npm run lint` after each major step; use the
   in-app browser to click through every page (light + dark mode, desktop +
   mobile viewport) before merging.
4. Merge to `main`, push, then confirm the GitHub Actions "Deploy Vite React
   App to GitHub Pages" workflow run succeeds and the live site
   (zieszx.github.io/portfolio) reflects the change.

## Testing/verification

No existing automated test suite (none found in the repo). Verification is:
`npm run build` succeeds, `npm run lint` is clean, and manual click-through in
the browser tool across all 8 routes in both themes and at mobile/desktop
widths, plus a post-deploy check of the live GitHub Pages URL and the Actions
run status.
