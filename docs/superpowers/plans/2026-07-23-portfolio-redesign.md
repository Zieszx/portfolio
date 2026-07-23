# Portfolio Redesign (Tailwind + Magic UI + GSAP + Lenis) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Bootstrap/AOS-based portfolio styling with Tailwind CSS + hand-ported Magic UI components + GSAP/Lenis motion, refresh all content to match the latest CV, and add 5 real client projects, while keeping the site building and deploying to GitHub Pages exactly as it does today.

**Architecture:** Vite + React 19 + React Router stays as-is (multi-page, `base: '/portfolio'`). Bootstrap CDN + AOS + Typed.js + PureCounter/Waypoints/GLightbox/Isotope/Swiper are removed; Tailwind CSS v4 (via `@tailwindcss/vite`) replaces Bootstrap's utility classes, GSAP ScrollTrigger replaces AOS, a hand-ported `TypingAnimation` replaces Typed.js, Lenis drives smooth scroll synced to ScrollTrigger. Magic UI components are hand-ported as local `.jsx` files (no shadcn CLI, no `framer-motion`) so GSAP remains the only animation engine.

**Tech Stack:** React 19, Vite 7, React Router 7, Redux Toolkit (theme only), Tailwind CSS v4, GSAP + `@gsap/react`, Lenis, `clsx` + `tailwind-merge`.

## Global Constraints

- No test framework exists in this repo (confirmed: no `vitest`/`jest`/test files). Do **not** add one — verification per task is `npm run build`, `npm run lint`, and a manual click-through in the browser tool (per `superpowers:verification-before-completion`), exactly as the spec's "Testing/verification" section states.
- Do not add `framer-motion`. GSAP is the only animation engine; only hand-port Magic UI components that are pure CSS/vanilla-JS.
- Do not use GSAP's paid SplitText plugin. Any text-splitting for reveals must be hand-rolled (wrap words in spans via a small utility) using only free GSAP + ScrollTrigger.
- Keep `vite.config.js`'s `base: '/portfolio'` and `App.jsx`'s `<Router basename="/portfolio">` unchanged — this is what makes GitHub Pages deployment work.
- Keep `.github/workflows/deploy.yml` unchanged unless a build step genuinely requires it — it just runs `npm install && npm run build` and deploys `dist/`.
- Preserve the existing dark/light theme mechanism's *behavior* (Redux `themeSlice`, `localStorage` persistence) even though the *implementation* (class name toggled) changes from `dark-mode`/`light-mode` to Tailwind's `dark` convention.
- All new/changed page content must use the exact copy specified in this plan (this is CV-derived factual content, not placeholder text) — do not invent projects, dates, or numbers not listed here.
- Work happens on branch `redesign-tailwind-gsap`, created off `main`, and is only merged back to `main` after the full verification task (Task 17) passes.

---

## File Structure

**New files:**
- `src/lib/cn.js` — `cn()` className-merge utility (clsx + tailwind-merge), used by every Magic UI component.
- `src/lib/motion.js` — GSAP/ScrollTrigger registration + `useScrollReveal(ref, options)` hook (replaces `data-aos`).
- `src/lib/lenis.js` — `initLenis()` — creates a Lenis instance wired to `ScrollTrigger.update`, returns a teardown function.
- `src/components/magicui/Marquee.jsx`
- `src/components/magicui/ShimmerButton.jsx`
- `src/components/magicui/BorderBeam.jsx`
- `src/components/magicui/MagicCard.jsx`
- `src/components/magicui/DotPattern.jsx`
- `src/components/magicui/TypingAnimation.jsx`
- `src/components/magicui/AnimatedGradientText.jsx`
- `src/data/portfolioProjects.js` — the single source of truth for project data (moved out of `Portfolio.jsx` so `Home.jsx` can reuse it for "Featured Work").
- `src/components/PlaceholderCard.jsx` — stylized gradient+monogram fallback for a project card image when no screenshot is available.

**Modified files:**
- `package.json` — dependency changes (see Task 1).
- `vite.config.js` — add Tailwind Vite plugin.
- `index.html` — remove Bootstrap/AOS/Typed/PureCounter/Waypoints/GLightbox/Isotope/Swiper/imagesLoaded `<link>`/`<script>` tags (kept: Bootstrap Icons font, Google Fonts).
- `src/index.css` — `@import "tailwindcss";` + `@theme` block mapping the existing brand tokens (`--accent-color: #00b4d8`, etc.) into Tailwind theme variables.
- `src/main.jsx` — register GSAP plugins once at startup.
- `src/App.jsx` — Lenis init/teardown, theme toggle switched to `dark` class, header/footer/nav restyled with Tailwind.
- `src/store/themeSlice.js` — no logic change, only the class name consumers use changes (documented in Task 4).
- `src/components/Home.jsx` — full redesign per Task 7.
- `src/components/Portfolio.jsx` — restyle + consume `src/data/portfolioProjects.js` (Task 8).
- `src/components/Skills.jsx` — restyle + new skills (Task 10).
- `src/components/About.jsx` — restyle + updated bio/stats (Task 11).
- `src/components/Resume.jsx` — restyle + updated experience (Task 12).
- `src/components/Achievements.jsx` — restyle only (Task 13).
- `src/components/Services.jsx` — restyle only (Task 14).
- `src/components/Contact.jsx` — restyle only (Task 15).

**Deleted files (Task 16, cleanup):**
- `src/styles.jsx` (dead code — confirmed unused via `styled-components` import, not referenced by any component).
- `src/App.css` (dead code — default Vite scaffold leftover, confirmed unimported by any file via grep).
- `src/main.css`, `src/custom.css` (once no component references their class names).
- `styled-components` removed from `package.json` (only consumer was `src/styles.jsx`).

---

### Task 1: Tooling — Tailwind CSS v4 + strip Bootstrap/AOS/Typed/etc. from `index.html`

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Modify: `index.html`
- Modify: `src/index.css`
- Modify: `src/main.jsx` (import `index.css` — **it is currently not imported anywhere**, confirmed via `grep -rn "index.css" src`, so without this the Tailwind setup would silently have no effect)
- Create branch: `redesign-tailwind-gsap`

**Interfaces:**
- Produces: `@theme` tokens usable by every later Tailwind class: `--color-accent` (`#00b4d8`), `--color-ink` (`#050d18`), `--color-surface` (`#ffffff` / dark `#151f2b`), `--color-bg` (`#ffffff` / dark `#040b14`), `--font-heading` (`'Raleway', sans-serif`), `--font-body` (`'Roboto', sans-serif`), `--font-nav` (`'Poppins', sans-serif`). These names are used verbatim as Tailwind utilities (`bg-accent`, `text-ink`, `font-heading`, etc.) in every later task.

- [ ] **Step 1: Create the feature branch**

```bash
git checkout -b redesign-tailwind-gsap
```

- [ ] **Step 2: Install new dependencies, remove ones no longer needed**

```bash
npm install tailwindcss @tailwindcss/vite gsap @gsap/react lenis clsx tailwind-merge
npm uninstall styled-components
```

Expected: `package.json` `dependencies` now includes `tailwindcss`, `@tailwindcss/vite`, `gsap`, `@gsap/react`, `lenis`, `clsx`, `tailwind-merge`; `styled-components` is gone. (`emailjs-com`/`@emailjs/browser`/`@reduxjs/toolkit`/`react-redux`/`react-router-dom`/`sweetalert2` are untouched — still used by `Resume.jsx`/`Contact.jsx`/`App.jsx`.)

- [ ] **Step 3: Register the Tailwind Vite plugin**

In `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/portfolio',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
```

- [ ] **Step 4: Add the Tailwind import + theme tokens to `src/index.css`**

Replace the full contents of `src/index.css` with:

```css
@import "tailwindcss";

@theme {
  --color-accent: #00b4d8;
  --color-ink: #050d18;
  --color-surface: #ffffff;
  --color-surface-dark: #151f2b;
  --color-bg: #ffffff;
  --color-bg-dark: #040b14;
  --font-heading: 'Raleway', sans-serif;
  --font-body: 'Roboto', system-ui, sans-serif;
  --font-nav: 'Poppins', sans-serif;
}

html {
  scroll-behavior: auto; /* Lenis owns smooth scrolling; native smooth-scroll must stay off */
}

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-body);
}

:root.dark body {
  background-color: var(--color-bg-dark);
  color: #ffffff;
}
```

- [ ] **Step 5: Import `index.css` in `main.jsx`** — it is not imported anywhere today, so add it as the first import in `src/main.jsx`:

```js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './store/index.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
```

- [ ] **Step 6: Strip the old CDN tags out of `index.html`**

Remove these `<link>` tags: Bootstrap CSS, AOS CSS, GLightbox CSS, Swiper CSS.
Remove these `<script>` tags: Bootstrap JS, AOS JS, Typed.js, PureCounter JS, Waypoints JS, GLightbox JS, Isotope Layout JS, imagesLoaded JS, Swiper JS.
Keep: the Google Fonts `<link>` tags and the Bootstrap Icons CSS `<link>` (icon font only, no framework JS).

The `<head>` should end up with only:

```html
<meta charset="UTF-8" />
<link rel="icon" type="image/x-icon" href="/src/assets/favicon.ico" />
<link rel="apple-touch-icon" href="/src/assets/apple-touch-icon.png" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Ieskandar Zulqarnain - Software Developer Portfolio</title>
<meta name="description" content="Ieskandar Zulqarnain - Passionate Software Developer & Engineer with expertise in Java, Python, JavaScript, React.js, and AI solutions" />
<meta name="keywords" content="Software Developer, Software Engineer, Java, Python, JavaScript, React, Spring Boot, AI, Machine Learning" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet" />
```

And the body should end up with only:

```html
<div id="root"></div>
<script type="module" src="./src/main.jsx"></script>
```

- [ ] **Step 7: Verify the build still runs (it will look broken visually — that's expected until later tasks)**

```bash
npm run build
```

Expected: build succeeds with no errors (some components will reference now-missing `window.AOS`/`window.Typed` — those are guarded with `if (window.AOS)` checks already in the code, so this is safe at runtime even though it's visually unstyled right now).

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html src/index.css src/main.jsx
git commit -m "Set up Tailwind CSS v4, GSAP/Lenis deps; strip Bootstrap/AOS/Typed CDN tags"
```

---

### Task 2: `cn()` utility

**Files:**
- Create: `src/lib/cn.js`

**Interfaces:**
- Produces: `cn(...classes)` — used by every Magic UI component and by any page component doing conditional Tailwind classes.

- [ ] **Step 1: Write the utility**

```js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Verify it builds**

```bash
npm run build
```

Expected: no errors (file isn't imported yet, so this just confirms no syntax error).

- [ ] **Step 3: Commit**

```bash
git add src/lib/cn.js
git commit -m "Add cn() className-merge utility"
```

---

### Task 3: GSAP + Lenis wiring (`src/lib/motion.js`, `src/lib/lenis.js`, `main.jsx`)

**Files:**
- Create: `src/lib/motion.js`
- Create: `src/lib/lenis.js`
- Modify: `src/main.jsx`

**Interfaces:**
- Produces: `registerGSAP()` (call once), `useScrollReveal(ref, { y=24, delay=0, stagger=0 }={})` hook — used by every page component instead of `data-aos`.
- Produces: `initLenis()` → returns a `destroy()` function; called from `App.jsx` (Task 4).

- [ ] **Step 1: Write `src/lib/motion.js`**

```js
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function registerGSAP() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

// Fade + rise reveal on scroll-into-view, replaces data-aos="fade-up".
export function useScrollReveal(ref, { y = 24, delay = 0, stagger = 0 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger > 0 ? el.children : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, y, delay, stagger]);
}
```

- [ ] **Step 2: Write `src/lib/lenis.js`**

```js
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initLenis() {
  const lenis = new Lenis({
    autoRaf: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const raf = (time) => {
    lenis.raf(time * 1000);
  };
  gsapTicker.add(raf);

  return () => {
    gsapTicker.remove(raf);
    lenis.destroy();
  };
}

import gsap from 'gsap';
const gsapTicker = gsap.ticker;
```

- [ ] **Step 3: Fix import ordering in `src/lib/lenis.js`** (the inline `import` above must be hoisted — rewrite the whole file cleanly)

```js
import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initLenis() {
  const lenis = new Lenis({
    autoRaf: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const raf = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}
```

- [ ] **Step 4: Register GSAP plugins at app startup — modify `src/main.jsx`**

Read the current file first, then add the registration call before render. The import and call go at the top of the file, before `createRoot`:

```js
import { registerGSAP } from './lib/motion';

registerGSAP();
```

(Keep every existing import/render call in `main.jsx` — this only adds the two lines above near the top.)

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/motion.js src/lib/lenis.js src/main.jsx
git commit -m "Add GSAP ScrollTrigger + Lenis wiring (useScrollReveal hook, initLenis)"
```

---

### Task 4: Magic UI components (hand-ported)

**Files:**
- Create: `src/components/magicui/Marquee.jsx`
- Create: `src/components/magicui/ShimmerButton.jsx`
- Create: `src/components/magicui/BorderBeam.jsx`
- Create: `src/components/magicui/MagicCard.jsx`
- Create: `src/components/magicui/DotPattern.jsx`
- Create: `src/components/magicui/TypingAnimation.jsx`
- Create: `src/components/magicui/AnimatedGradientText.jsx`

**Interfaces:**
- Produces (consumed by Task 7 Home redesign, Task 8 Portfolio, and others):
  - `<Marquee reverse pauseOnHover className="...">{children}</Marquee>`
  - `<ShimmerButton onClick={fn} className="...">{children}</ShimmerButton>`
  - `<BorderBeam className="..." size={200} duration={12} colorFrom="#00b4d8" colorTo="#8b5cf6" />` (absolutely-positioned inside a `relative` parent)
  - `<MagicCard className="..." gradientColor="#00b4d8">{children}</MagicCard>`
  - `<DotPattern className="..." />` (absolutely fills parent, `pointer-events-none`)
  - `<TypingAnimation strings={['a','b']} typeSpeed={80} backSpeed={40} backDelay={2000} className="..." />`
  - `<AnimatedGradientText className="...">01 — Featured Work</AnimatedGradientText>`

- [ ] **Step 1: `Marquee.jsx`**

```jsx
import { cn } from '../../lib/cn';

export function Marquee({ children, reverse = false, pauseOnHover = false, className, ...props }) {
  return (
    <div
      className={cn('group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]', className)}
      {...props}>
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]'
          )}
          aria-hidden={i === 1}>
          {children}
        </div>
      ))}
    </div>
  );
}
```

Add the keyframes to `src/index.css` (append, don't replace the `@theme` block from Task 1):

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - var(--gap))); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

- [ ] **Step 2: `ShimmerButton.jsx`**

```jsx
import { cn } from '../../lib/cn';

export function ShimmerButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3',
        'bg-accent text-white font-medium transition-transform hover:-translate-y-0.5',
        'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r',
        'before:from-transparent before:via-white/40 before:to-transparent',
        'hover:before:translate-x-full before:transition-transform before:duration-700',
        className
      )}
      {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 3: `BorderBeam.jsx`**

```jsx
import { cn } from '../../lib/cn';

export function BorderBeam({ className, size = 200, duration = 12, colorFrom = '#00b4d8', colorTo = '#8b5cf6' }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]', className)}
      style={{
        '--size': `${size}px`,
        '--duration': `${duration}s`,
        '--color-from': colorFrom,
        '--color-to': colorTo,
        maskImage: 'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}>
      <div
        className="absolute aspect-square animate-border-beam"
        style={{
          width: 'var(--size)',
          background: 'linear-gradient(to left, var(--color-from), var(--color-to), transparent)',
          offsetPath: 'rect(0 auto auto 0 round var(--size))',
        }}
      />
    </div>
  );
}
```

Append to `src/index.css`:

```css
@keyframes border-beam {
  100% { offset-distance: 100%; }
}

.animate-border-beam {
  offset-distance: 0%;
  animation: border-beam var(--duration, 12s) linear infinite;
}
```

- [ ] **Step 4: `MagicCard.jsx`**

```jsx
import { useRef } from 'react';
import { cn } from '../../lib/cn';

export function MagicCard({ children, className, gradientColor = '#00b4d8', gradientSize = 220 }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn('relative overflow-hidden rounded-2xl', className)}
      style={{
        '--gradient-size': `${gradientSize}px`,
      }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [.group:hover_&]:opacity-100"
        style={{
          background: `radial-gradient(var(--gradient-size) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${gradientColor}33, transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
```

- [ ] **Step 5: `DotPattern.jsx`**

```jsx
import { cn } from '../../lib/cn';

export function DotPattern({ className, gap = 24, radius = 1.2, color = 'currentColor' }) {
  const id = 'dot-pattern';
  return (
    <svg className={cn('pointer-events-none absolute inset-0 h-full w-full', className)} aria-hidden="true">
      <defs>
        <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={radius} cy={radius} r={radius} fill={color} opacity="0.25" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
```

- [ ] **Step 6: `TypingAnimation.jsx`** (replaces Typed.js — no external script dependency)

```jsx
import { useEffect, useState } from 'react';

export function TypingAnimation({ strings, typeSpeed = 80, backSpeed = 40, backDelay = 2000, className }) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[index % strings.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), backDelay);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
        },
        deleting ? backSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, strings, typeSpeed, backSpeed, backDelay]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
```

- [ ] **Step 7: `AnimatedGradientText.jsx`**

```jsx
import { cn } from '../../lib/cn';

export function AnimatedGradientText({ children, className }) {
  return (
    <span
      className={cn(
        'inline-block bg-[linear-gradient(90deg,#00b4d8,#8b5cf6,#00b4d8)] bg-[length:200%_auto]',
        'bg-clip-text text-transparent animate-gradient-text font-semibold uppercase tracking-widest text-sm',
        className
      )}>
      {children}
    </span>
  );
}
```

Append to `src/index.css`:

```css
@keyframes gradient-text {
  to { background-position: 200% center; }
}

.animate-gradient-text {
  animation: gradient-text 4s linear infinite;
}
```

- [ ] **Step 8: Verify build**

```bash
npm run build
```

Expected: succeeds (components exist but aren't imported anywhere yet, so this only checks for syntax errors).

- [ ] **Step 9: Commit**

```bash
git add src/components/magicui src/index.css
git commit -m "Hand-port Magic UI components: Marquee, ShimmerButton, BorderBeam, MagicCard, DotPattern, TypingAnimation, AnimatedGradientText"
```

---

### Task 5: Theme toggle → Tailwind `dark` class

**Files:**
- Modify: `src/App.jsx` (the `useEffect` that toggles the class — currently around line 88-97)

**Interfaces:**
- Consumes: `themeMode` from `useSelector((state) => state.theme.mode)` (unchanged, from Task-independent `themeSlice`).
- Produces: `<html>` now carries the `dark` class (Tailwind convention) when `themeMode === 'dark'`, and no class when light — every later Tailwind-styled component uses `dark:` variants against this.

- [ ] **Step 1: Read the current effect** (for exact context)

The current code in `src/App.jsx`:

```js
useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.classList.remove('dark-mode');
      root.classList.add('light-mode');
    }
  }, [themeMode]);
```

- [ ] **Step 2: Replace it with the Tailwind-convention version**

```js
useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "Switch theme toggle to Tailwind's dark class convention"
```

---

### Task 6: Portfolio data extraction + 5 new project entries

**Files:**
- Create: `src/data/portfolioProjects.js`
- Modify: `src/components/Portfolio.jsx` (import data instead of declaring it inline)
- Create: `src/components/PlaceholderCard.jsx`

**Interfaces:**
- Produces: `export const portfolioProjects = [...]` — array of `{ id, title, category, image, description, technologies, github, demo, highlights, featured }`. `image` is either an imported asset URL **or `null`** (meaning: render `PlaceholderCard` instead of `<img>`). `featured: true` marks the 5 real client projects used by Home's "Featured Work" section (Task 7).
- Produces: `<PlaceholderCard title="AUDEZIA" />` — renders a gradient background with the project's initials, same aspect ratio as a real screenshot, used wherever `image === null`.

- [ ] **Step 1: Write `src/components/PlaceholderCard.jsx`**

```jsx
function initials(title) {
  return title
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export default function PlaceholderCard({ title }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 via-[#8b5cf6]/20 to-transparent">
      <span className="font-heading text-4xl font-bold tracking-widest text-accent/70">{initials(title)}</span>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/data/portfolioProjects.js`** — move the existing 11 entries verbatim from `src/components/Portfolio.jsx` (same `id`/`title`/`category`/`description`/`technologies`/`github`/`demo`/`highlights`, `featured: false` added to all of them), keep the same image imports, then append these 5 new entries:

```js
import aiCodePrediction from '/assets/img/portfolio/ai-code-prediction.png?url';
import bgRemover from '/assets/img/portfolio/bg-remover.png?url';
import pawsPreferences from '/assets/img/portfolio/paws-preferences.png?url';
import hastaCarRental from '/assets/img/portfolio/hasta-car-rental.jpg?url';
import instagramClone from '/assets/img/portfolio/instagram-clone.jpg?url';
import userRegistration from '/assets/img/portfolio/user-registration.png?url';
import dashboardPiwn from '/assets/img/portfolio/dashboard-piwn.png?url';
import ezyBooking from '/assets/img/portfolio/ezy-booking.png?url';
import aibigWebsite from '/assets/img/portfolio/aibig-website.jpg?url';
import resipro from '/assets/img/portfolio/resipro.jpg?url';
import epfCalculator from '/assets/img/portfolio/epfsocsocalculator.png?url';

export const portfolioProjects = [
  {
    id: 11,
    title: 'MY Salary Calculator',
    category: 'web',
    image: epfCalculator,
    description: 'Malaysian payroll deduction calculator covering EPF, SOCSO, EIS, PCB/MTD tax, and Zakat. Features an overtime-by-hours calculator, bonus breakdown, yearly summary, salary comparison, and dark mode.',
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/Zieszx/epfsocsocalculator',
    demo: 'https://zieszx.github.io/epfsocsocalculator/',
    highlights: ['EPF / SOCSO / EIS / PCB', 'OT Hours Calculator', 'Dark Mode'],
    featured: false,
  },
  {
    id: 1,
    title: 'AI-Powered Code Prediction System',
    category: 'ai',
    image: aiCodePrediction,
    description: 'AI platform leveraging FAISS vector search and LLMs for intelligent code completion. Features context learning, multi-model support (Claude + GPT), and persistent chat sessions with semantic embeddings.',
    technologies: ['Python', 'Flask', 'React', 'FAISS'],
    github: 'https://github.com/Zieszx/code_prediction',
    demo: null,
    highlights: ['Context Learning with FAISS', 'Multi-model AI Integration', 'Live Code Execution Sandbox'],
    featured: false,
  },
  {
    id: 2,
    title: 'Smart Background Remover',
    category: 'ai',
    image: bgRemover,
    description: 'Windows GUI application for batch background removal with advanced text and object protection. Uses AI segmentation (U²-Net), EAST text detection, and MobileNet-SSD object detection.',
    technologies: ['Python', 'Tkinter', 'OpenCV', 'ONNX'],
    github: 'https://github.com/Zieszx/remove-bg',
    demo: null,
    highlights: ['AI Segmentation', 'Text & Object Protection', 'Batch Processing'],
    featured: false,
  },
  {
    id: 3,
    title: 'Paws & Preferences',
    category: 'web',
    image: pawsPreferences,
    description: 'Tinder-style cat discovery app with swipe interface, Cataas.com API integration, and persistent state management. Responsive design optimised for all devices with smooth animations.',
    technologies: ['React', 'Vite', 'PrimeReact'],
    github: 'https://github.com/Zieszx/paws-preferences',
    demo: 'https://zieszx.github.io/paws-preferences/',
    highlights: ['Tinder-Like Interface', 'API Integration', 'Responsive Design'],
    featured: false,
  },
  {
    id: 4,
    title: 'HASTA Car Rental System',
    category: 'web',
    image: hastaCarRental,
    description: 'Comprehensive car rental management system (Final Year Project) with customer registration, vehicle reservations, maintenance tracking, and administrative dashboard built with RESTful architecture.',
    technologies: ['Java', 'Spring Boot', 'MySQL'],
    github: 'https://github.com/Zieszx/HastaCarRental',
    demo: null,
    highlights: ['Full-Stack Architecture', 'Admin Dashboard', 'Maintenance Module'],
    featured: false,
  },
  {
    id: 5,
    title: 'Instagram Clone – LaughFun',
    category: 'mobile',
    image: instagramClone,
    description: 'Feature-rich Instagram clone with Firebase authentication, real-time post feed, profile management, and modern gradient UI. Demonstrates advanced mobile development skills.',
    technologies: ['Flutter', 'Firebase', 'Dart'],
    github: 'https://github.com/Zieszx/instagram_Clone',
    demo: null,
    highlights: ['Real-time Feed', 'Firebase Integration', 'Modern UI Design'],
    featured: false,
  },
  {
    id: 6,
    title: 'User Registration with PostgreSQL',
    category: 'web',
    image: userRegistration,
    description: 'Spring Boot MVC learning project demonstrating PostgreSQL integration, user registration workflows, automatic company creation, and comprehensive testing with Maven.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
    github: 'https://github.com/Zieszx/User-Registration-with-Postgres',
    demo: null,
    highlights: ['MVC Architecture', 'Database Relationships', 'Unit Testing'],
    featured: false,
  },
  {
    id: 7,
    title: 'Dashboard PIWN (JAWHAR)',
    category: 'web',
    image: dashboardPiwn,
    description: 'Professional dashboard system for monitoring Wakaf, Zakat, and Haji task percentages. Enhanced workflow from traditional manual methods to a centralised web application.',
    technologies: ['SOAD Framework', 'MySQL', 'JavaScript'],
    github: null,
    demo: null,
    highlights: ['Workflow Enhancement', 'Task Monitoring', 'Centralised Platform'],
    featured: false,
  },
  {
    id: 8,
    title: 'Ezy Booking System (EzApp)',
    category: 'web',
    image: ezyBooking,
    description: 'Centralised booking platform with automated appointment scheduling, PWA optimisation for mobile access, and seamless user experience across all devices.',
    technologies: ['React.js', 'SOAD Framework', 'PWA'],
    github: null,
    demo: null,
    highlights: ['PWA Implementation', 'Automated Scheduling', 'Mobile Optimisation'],
    featured: false,
  },
  {
    id: 9,
    title: 'AIBIG Main Website',
    category: 'web',
    image: aibigWebsite,
    description: 'Complete website transformation from static to database-integrated platform. Deployed on Webmin with MySQL backend for dynamic content management.',
    technologies: ['Spring Boot', 'MySQL', 'JavaScript'],
    github: null,
    demo: null,
    highlights: ['Static to Dynamic', 'Database Integration', 'Content Management'],
    featured: false,
  },
  {
    id: 10,
    title: 'RESIPRO Resident Management',
    category: 'mobile',
    image: resipro,
    description: 'Comprehensive resident management system featuring SOS functionality, visitor registration, authentication, push notifications, and residency management with Firebase backend.',
    technologies: ['Flutter', 'Firebase Firestore', 'Dart'],
    github: null,
    demo: null,
    highlights: ['SOS Functionality', 'Visitor Management', 'Push Notifications'],
    featured: false,
  },
  {
    id: 12,
    title: 'AUDEZIA — Audit Management System',
    category: 'web',
    image: null,
    description: 'Audit management system built in a two-person team on the SOAD framework — moves audits through their phases automatically once an application is made, using the OpenAI API to suggest reporting, analysis, and summaries at each phase.',
    technologies: ['SOAD Framework', 'MySQL', 'OpenAI API'],
    github: null,
    demo: null,
    highlights: ['Automated Audit Phases', 'AI-Generated Reports', 'Team Collaboration'],
    featured: true,
  },
  {
    id: 13,
    title: 'INXEPTA — E-Commerce System',
    category: 'web',
    image: null,
    description: 'E-commerce platform covering buying, selling, and shop management for a live client, with stock, product, voucher, user, and membership modules, and EasyParcel integrated for shipping.',
    technologies: ['SOAD Framework', 'MySQL', 'EasyParcel'],
    github: null,
    demo: 'https://royalhabibiofficial.com',
    highlights: ['Live Client Platform', 'Shipping Integration', 'Membership & Vouchers'],
    featured: true,
  },
  {
    id: 14,
    title: 'Meet Nuvera — Dating App',
    category: 'web',
    image: null,
    description: 'Sole developer of a dating app with matching, swipe, profiles, and real-time chat — built with Next.js, Drizzle ORM, NextAuth, and Socket.io, deployed on a Contabo VPS.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
    github: null,
    demo: 'https://meetnuvera.com',
    highlights: ['Real-time Chat', 'Swipe Matching', 'NextAuth + Drizzle ORM'],
    featured: true,
  },
  {
    id: 15,
    title: 'Nuvera MLM — E-Commerce Platform',
    category: 'web',
    image: null,
    description: "Sole developer of an MLM e-commerce platform helping members earn passive income selling beauty products, with a member base mostly in Africa — genealogy, role/permission, auditing, and Excel/PDF reporting modules, live in production.",
    technologies: ['Laravel 10', 'PHP', 'MySQL'],
    github: null,
    demo: 'https://business.nuverarose.com',
    highlights: ['Genealogy & MLM Engine', 'Excel & PDF Reporting', 'Live in Production'],
    featured: true,
  },
  {
    id: 16,
    title: 'Kalibrasi — Calibration System',
    category: 'web',
    image: null,
    description: 'Calibration management system demo built on the SOAD framework for tracking equipment calibration schedules, certificates, and compliance records.',
    technologies: ['SOAD Framework', 'MySQL'],
    github: null,
    demo: 'https://kalibrasi.webgeaz.com',
    highlights: ['Calibration Tracking', 'Compliance Records', 'SOAD Framework'],
    featured: true,
  },
];

export const CATEGORY_LABELS = {
  '*': 'All Projects',
  ai: 'AI Projects',
  web: 'Web Apps',
  mobile: 'Mobile Apps',
};
```

- [ ] **Step 3: Update `src/components/Portfolio.jsx`** to import from the new data file instead of declaring `portfolioProjects`/`CATEGORY_LABELS` inline, and render `PlaceholderCard` when `project.image` is `null`:

Replace the top of the file (all the image imports + the `portfolioProjects` array + the `CATEGORY_LABELS` const) with:

```jsx
import { useState, useRef, useEffect } from 'react';
import PlaceholderCard from './PlaceholderCard';
import { portfolioProjects, CATEGORY_LABELS } from '../data/portfolioProjects';
```

And in the card image markup, change:

```jsx
<img src={project.image} alt={project.title} loading="lazy" />
```

to:

```jsx
{project.image ? (
  <img src={project.image} alt={project.title} loading="lazy" />
) : (
  <PlaceholderCard title={project.title} />
)}
```

Everything else in `Portfolio.jsx` (the filter state, the JSX structure) stays as-is for this task — visual restyling happens in Task 8.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: succeeds, no missing-import errors.

- [ ] **Step 5: Manual check — project count**

```bash
node -e "console.log(require('./src/data/portfolioProjects.js'))" 2>/dev/null || true
```

(This will fail because it's an ES module — that's fine, it's not a real check. Instead just visually confirm in the file that there are exactly 16 entries with ids 1-16, no duplicates, and exactly 5 have `featured: true`.)

- [ ] **Step 6: Commit**

```bash
git add src/data/portfolioProjects.js src/components/Portfolio.jsx src/components/PlaceholderCard.jsx
git commit -m "Extract portfolio data to shared module; add AUDEZIA, INXEPTA, Meet Nuvera, Nuvera MLM, Kalibrasi"
```

---

### Task 7: Home page redesign

**Files:**
- Modify: `src/components/Home.jsx`

**Interfaces:**
- Consumes: `portfolioProjects` from `src/data/portfolioProjects.js` (filter `featured === true` → exactly 5 entries from Task 6), `TypingAnimation`, `ShimmerButton`, `DotPattern`, `Marquee`, `AnimatedGradientText`, `BorderBeam` from `src/components/magicui/*`, `useScrollReveal` from `src/lib/motion.js`.

- [ ] **Step 1: Load the `frontend-design` skill before writing any JSX** — this task is aesthetic-execution-heavy (bold hero typography, featured-work cards, numbered process section) and should follow that skill's guidance on distinctive visual choices rather than generic defaults.

- [ ] **Step 2: Rewrite the hero section content** — keep the existing `<section id="hero">` structure and CTAs (View My Work / Let's Connect / Resume) and social icons, but:
  - Replace the Typed.js `useEffect` + `<span className="typed">` with `<TypingAnimation strings={['Software Engineer', 'Full-Stack Developer', 'AI Enthusiast', 'Problem Solver']} />` (Software Engineer now leads, matching the current CV title).
  - Update `techStack` array to `['Java', 'Python', 'React.js', 'Next.js', 'Spring Boot', 'AI / ML']` (added Next.js).
  - Update `heroStats` array to `[{ number: '15+', label: 'Projects', icon: 'bi-code-square' }, { number: '2+', label: 'Years Exp.', icon: 'bi-briefcase' }, { number: '3.96', label: 'CGPA', icon: 'bi-mortarboard' }, { number: '8×', label: "Dean's List", icon: 'bi-award' }]`.
  - Update the hero tagline paragraph to: `"Building scalable applications & AI-driven solutions that make a real-world impact — from government dashboards to e-commerce platforms and AI-powered tools. I turn requirements into shipped, production systems."`
  - Replace the two `hero-btn-primary`/`hero-btn-secondary` `<Link>` CTAs' wrapping with `<ShimmerButton>` (keep the `<Link>` for routing, put `ShimmerButton`'s styling on/around it — e.g. render `ShimmerButton` as the visual shell and put the `<Link>`'s `to` navigation via `onClick={() => navigate(...)}` using `useNavigate`, or simpler: keep `<Link>` elements but apply the same Tailwind classes `ShimmerButton` uses via `cn()` so routing keeps working — do not wrap an `<a>`/`Link` inside a `<button>`).
  - Add a `<DotPattern className="absolute inset-0 text-accent/30" />` inside the hero section (parent must be `relative`).

- [ ] **Step 3: Add the "Featured Work" section** (new, right after hero) — numbered eyebrow via `<AnimatedGradientText>01 — Featured Work</AnimatedGradientText>`, heading e.g. "Projects People Actually Use.", then a grid of the 5 `featured` projects from `portfolioProjects`, each card showing title, description, tech tags, and — when `project.demo` is set — a "See live →" link to it. Wrap each card in a `relative` div with a `<BorderBeam />` overlay. Use `useScrollReveal` on the grid container with `stagger: 0.12`.

- [ ] **Step 4: Add a numbered "What I Do" section** — 3-4 short process/service teasers (reuse the `services` array data from `Services.jsx` conceptually, but only show 3 of the 6 as a teaser) ending with a `<Link to="/services">` "See all services →". Numbered eyebrow: `02 — How I Work`.

- [ ] **Step 5: Add a `Marquee` tech-stack ticker** somewhere between Featured Work and What I Do — scrolling row of skill badges (Java, Python, React, Next.js, Spring Boot, Laravel, TypeScript, PostgreSQL, GSAP, Tailwind, etc.) using `<Marquee pauseOnHover>`.

- [ ] **Step 6: Keep the existing "Curious about the person behind the code?" `/about` teaser link** at the end, restyled with Tailwind.

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: succeeds, no unused-import lint errors for the old Typed.js-only code paths (delete the old `useEffect` entirely, don't leave it dead).

- [ ] **Step 8: Manual browser check**

Start dev server (`npm run dev`), open the Home route in the browser tool, confirm: hero renders, typing animation cycles, featured work cards show all 5 client projects with correct demo links, marquee scrolls, dark mode toggle still works (check the toggle button — should add/remove `dark` class per Task 5).

- [ ] **Step 9: Commit**

```bash
git add src/components/Home.jsx
git commit -m "Redesign Home as narrative flagship page: hero, Featured Work, process, tech marquee"
```

---

### Task 8: Portfolio page restyle

**Files:**
- Modify: `src/components/Portfolio.jsx`

**Interfaces:**
- Consumes: `MagicCard`, `BorderBeam` from `src/components/magicui/*`, `useScrollReveal` from `src/lib/motion.js`.

- [ ] **Step 1: Load `frontend-design` skill** if not already active in this session for the aesthetic pass.

- [ ] **Step 2: Restyle the filter bar, grid, and cards with Tailwind classes**, replacing the Bootstrap-grid (`row gy-4`, `col-lg-4 col-md-6 col-12`) with a Tailwind grid (`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`). Keep the existing `activeFilter`/`animating`/`scrollAfterFilterRef` state logic and the scroll-into-view `useEffect` — those are behavior, not styling, and must not change.

- [ ] **Step 3: Wrap each card in `<MagicCard>`**, and add a `<BorderBeam>` specifically to cards where `project.featured` is `true` (visually distinguishes the 5 real client projects), plus a small "Client Work" badge on those cards.

- [ ] **Step 4: Replace `data-aos` attributes with `useScrollReveal`** on the grid container (`stagger: 0.08`).

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Manual browser check** — click through each filter tab (All/AI/Web/Mobile), confirm counts match, confirm "Client Work" badge appears on exactly 5 cards (AUDEZIA, INXEPTA, Meet Nuvera, Nuvera MLM, Kalibrasi), confirm demo links open the right URLs.

- [ ] **Step 7: Commit**

```bash
git add src/components/Portfolio.jsx
git commit -m "Restyle Portfolio grid with Tailwind + MagicCard/BorderBeam, add Client Work badge"
```

---

### Task 9: Screenshot assets for the 5 new projects

**Files:**
- Create (if successful): `public/assets/img/portfolio/audezia.png`, `inxepta.png`, `meet-nuvera.png`, `nuvera-mlm.png`, `kalibrasi.png`
- Modify: `src/data/portfolioProjects.js` (swap `image: null` → the new imported asset, per project that succeeds)

**Interfaces:**
- No interface change — this only affects the `image` field values already defined in Task 6. AUDEZIA has no public URL (internal system) so it keeps `image: null` regardless.

- [ ] **Step 1: Attempt each live site in the browser tool** — `https://royalhabibiofficial.com`, `https://meetnuvera.com`, `https://business.nuverarose.com`, `https://kalibrasi.webgeaz.com`. For each that loads successfully, take a screenshot and save it under `public/assets/img/portfolio/` with the filenames above.

- [ ] **Step 2: For any site that fails to load, times out, or is unusable as card art, leave its `image` as `null`** in `src/data/portfolioProjects.js` (the `PlaceholderCard` fallback from Task 6 already handles this — no code change needed beyond leaving the field alone).

- [ ] **Step 3: For sites that succeeded, update the import + `image` field** in `src/data/portfolioProjects.js`, e.g.:

```js
import inxeptaImg from '/assets/img/portfolio/inxepta.png?url';
// ...
image: inxeptaImg, // was: null
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add public/assets/img/portfolio src/data/portfolioProjects.js
git commit -m "Add live-site screenshots for new client projects where available"
```

---

### Task 10: Skills page restyle + content update

**Files:**
- Modify: `src/components/Skills.jsx`

**Interfaces:**
- Produces: updated `skillCategories` array (consumed only within this file).

- [ ] **Step 1: Replace the `skillCategories` array** with this exact content (reorganized to match the CV's categories, with a new dedicated AI/ML category):

```js
const skillCategories = [
  {
    icon: 'bi-code-slash',
    label: 'Programming Languages & Frameworks',
    skills: [
      { name: 'Java', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 85 },
      { name: 'React.js', level: 85 },
      { name: 'Next.js', level: 85 },
      { name: 'Spring Boot', level: 90 },
      { name: 'C++', level: 80 },
    ],
  },
  {
    icon: 'bi-layers',
    label: 'Additional Technologies',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'Laravel', level: 85 },
      { name: 'PHP', level: 85 },
      { name: 'Django', level: 80 },
      { name: 'Flutter (Dart)', level: 75 },
    ],
  },
  {
    icon: 'bi-database',
    label: 'Databases',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'SQL', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Firebase Firestore', level: 80 },
      { name: 'Supabase', level: 75 },
    ],
  },
  {
    icon: 'bi-robot',
    label: 'AI / ML',
    skills: [
      { name: 'OpenAI API', level: 90 },
      { name: 'Anthropic Claude', level: 85 },
      { name: 'FAISS Vector Search', level: 80 },
      { name: 'Vertex AI', level: 75 },
      { name: 'Groq Cloud', level: 75 },
    ],
  },
  {
    icon: 'bi-tools',
    label: 'Tools & Platforms',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'RESTful API', level: 85 },
      { name: 'Visual Studio Code', level: 95 },
      { name: 'Claude Code', level: 90 },
      { name: 'Drizzle ORM', level: 75 },
      { name: 'Socket.io', level: 75 },
      { name: 'NextAuth', level: 75 },
      { name: 'Cowork', level: 75 },
    ],
  },
  {
    icon: 'bi-people',
    label: 'Soft Skills',
    skills: [
      { name: 'Problem-Solving', level: 90 },
      { name: 'Debugging', level: 90 },
      { name: 'Teamwork', level: 85 },
      { name: 'Communication', level: 85 },
      { name: 'Testing', level: 80 },
    ],
  },
];
```

- [ ] **Step 2: Restyle the grid and progress bars with Tailwind**, replacing `row gy-5`/`col-lg-6` with a Tailwind grid (`grid grid-cols-1 gap-10 lg:grid-cols-2`), and replace `data-aos` with `useScrollReveal`. Keep the existing `useEffect` that sets `bar.style.width` from `data-target` — that's the progress-bar fill animation and has no AOS/Bootstrap dependency, so it's unaffected by this migration.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Manual browser check** — confirm all 6 categories render, progress bars animate to their target width on scroll into view.

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills.jsx
git commit -m "Restyle Skills with Tailwind; add TypeScript/Next.js/AI-ML category/Claude Code/Cowork"
```

---

### Task 11: About page restyle + content update

**Files:**
- Modify: `src/components/About.jsx`

**Interfaces:**
- Produces: updated `stats` array, updated bio copy (no new exported interfaces).

- [ ] **Step 1: Update the `stats` array's `end` values**: `Projects Completed` 10 → 15, `Years Experience` 1 → 2. Leave `Dean's List` (8) and `CGPA` (3.96) unchanged.

- [ ] **Step 2: Update the section-title paragraph** (currently "A passionate and self-motivated Software Developer with over a year of professional experience...") to:

```
"A Software Engineer with two years of professional experience delivering full-stack web applications, R&D software, and AI features across enterprise stacks and modern JavaScript."
```

- [ ] **Step 3: Update the main bio paragraph** (currently starting "I am a Software Developer and Software Engineer...") to:

```
"I am a Software Engineer with two years of professional experience across enterprise stacks (Java/Spring Boot, PHP/Laravel, and the in-house SOAD framework) and modern JavaScript (React.js and Next.js/TypeScript). I've taken systems from requirements through to deployment for government, e-commerce, audit, and network-marketing clients, and regularly integrate the OpenAI and Anthropic APIs — I also run internal AI training sessions for colleagues."
```

- [ ] **Step 4: Update the closing paragraph's degree/Dean's List sentence stats reference** — no factual change needed (CGPA 3.96, Dean's List every semester are both still accurate), but restyle with Tailwind alongside the rest of the page.

- [ ] **Step 5: Restyle the layout with Tailwind** (`row gy-4`/`col-lg-4`/`col-lg-8` → `grid grid-cols-1 gap-8 lg:grid-cols-12` with appropriate `lg:col-span-*`), replace `data-aos` with `useScrollReveal`. Keep the `CountUp` component and `computeAge` function exactly as they are — they have no Bootstrap/AOS dependency.

- [ ] **Step 6: Verify build**

```bash
npm run build
```

- [ ] **Step 7: Manual browser check** — confirm bio text updated, stats count up to 15 / 2 / 8 / 3.96 correctly on scroll into view.

- [ ] **Step 8: Commit**

```bash
git add src/components/About.jsx
git commit -m "Restyle About with Tailwind; update bio/stats to Software Engineer, 2 years, 15 projects"
```

---

### Task 12: Resume page restyle + content update

**Files:**
- Modify: `src/components/Resume.jsx`

**Interfaces:**
- No new exported interfaces — this is content + styling only.

- [ ] **Step 1: Update the Summary block** — the `<em>` paragraph currently reading "Passionate and self-motivated Software Developer with over a year..." becomes:

```
"Software Engineer with two years of professional experience delivering full-stack web applications, R&D software, and AI features. Works across enterprise stacks (Java/Spring Boot, PHP/Laravel, and the in-house SOAD framework) and modern JavaScript (React.js and Next.js/TypeScript)."
```

- [ ] **Step 2: Update the Webgeaz experience block** — split into two title/date lines (matching the CV), replacing the single "Software Developer / Aug 2024 – Present" heading with:

```jsx
<div className="resume-item">
  <h4>Software Engineer</h4>
  <h5>Apr 2026 – Present</h5>
  <h4 className="pt-1">Software Developer</h4>
  <h5>Aug 2024 – Mar 2026</h5>
  <p><em>Webgeaz Sdn Bhd</em></p>
  <ul>
    <li>Built a Personal Evaluation module using the OpenAI API, with timesheet data pulled from the Oceztra system, to help generate staff evaluations</li>
    <li>Developed Dashboard PIWN for JAWHAR to track ongoing Wakaf, Zakat, and Haji tasks, moving the team off manual filing and Excel</li>
    <li>Built AUDEZIA (audit management) and INXEPTA (e-commerce) client systems on the SOAD framework with MySQL</li>
    <li>Added AI code prediction to the SOAD framework using LLM APIs from several providers, and built a reusable base template for new projects</li>
    <li>Built the Ezy Booking System (EzApp) with React.js and the SOAD framework, with PWA support for mobile</li>
    <li>Run internal AI training sessions, helping colleagues use AI tools effectively</li>
  </ul>
</div>
```

- [ ] **Step 3: Add a new Freelance experience block** directly after the Webgeaz block:

```jsx
<div className="resume-item">
  <h4>Part-Time Software Developer · Sole Developer</h4>
  <h5>Jan 2025 – Present</h5>
  <p><em>Freelance</em></p>
  <ul>
    <li><strong>Nuvera (NuveraRose)</strong> — MLM e-commerce platform (Laravel 10/PHP): sole developer of a platform helping members earn passive income selling beauty products, with a member base mostly in Africa. Built the member, genealogy, role/permission, auditing, reporting (Excel & PDF), and product-management modules. Live in production.</li>
    <li><strong>Meet Nuvera</strong> (formerly Meet Valorra) — dating app (Next.js, TypeScript, PostgreSQL): sole developer of a dating app with matching, swipe, profiles, and real-time chat, built with Drizzle ORM, NextAuth, and Socket.io, deployed on a Contabo VPS.</li>
  </ul>
</div>
```

- [ ] **Step 4: Leave the AIBIG and DreamEDGE experience blocks unchanged** — their content is still accurate per the latest CV.

- [ ] **Step 5: Restyle the two-column layout with Tailwind**, replace `data-aos` with `useScrollReveal`. Keep the `handleDownloadResume`/`handlePreviewResume` logic and the SweetAlert2 usage exactly as-is — no behavior change.

- [ ] **Step 6: Verify build**

```bash
npm run build
```

- [ ] **Step 7: Manual browser check** — confirm both experience blocks render in order (Software Engineer/Developer → Freelance → AIBIG → DreamEDGE), download/preview buttons still work.

- [ ] **Step 8: Commit**

```bash
git add src/components/Resume.jsx
git commit -m "Restyle Resume with Tailwind; add title change and Freelance (Nuvera/Meet Nuvera) section"
```

---

### Task 13: Achievements page restyle (visual only)

**Files:**
- Modify: `src/components/Achievements.jsx`

- [ ] **Step 1: Restyle the grid/cards with Tailwind** (`row gy-4`/`col-lg-6` → `grid grid-cols-1 gap-6 md:grid-cols-2`), replace `data-aos` with `useScrollReveal`. The `achievements` data array is unchanged (still factually accurate).

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Achievements.jsx
git commit -m "Restyle Achievements with Tailwind"
```

---

### Task 14: Services page restyle (visual only)

**Files:**
- Modify: `src/components/Services.jsx`

- [ ] **Step 1: Restyle the grid/cards with Tailwind** (`row gy-4`/`col-lg-4` → `grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`), wrap each card in `<MagicCard>`, replace `data-aos` with `useScrollReveal`. The `services` data array is unchanged.

- [ ] **Step 2: Fix the CTA link bug while restyling** — the current CTA is `<a href="/portfolio/contact">`, a hardcoded absolute path that breaks if the GitHub Pages base ever changes; change it to `<Link to="/contact">` (import `Link` from `react-router-dom`, consistent with how every other internal link in this codebase navigates).

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Manual browser check** — click the "Get In Touch" CTA, confirm it navigates to `/portfolio/contact` correctly via client-side routing (no full page reload).

- [ ] **Step 5: Commit**

```bash
git add src/components/Services.jsx
git commit -m "Restyle Services with Tailwind/MagicCard; fix hardcoded contact CTA link"
```

---

### Task 15: Contact page restyle (visual only)

**Files:**
- Modify: `src/components/Contact.jsx`

- [ ] **Step 1: Restyle the info list + form with Tailwind** (`row gy-4`/`col-lg-5`/`col-lg-7`/`form-control` → Tailwind form styling), replace `data-aos` with `useScrollReveal`. Keep `contactInfo` data, `formData` state, and `handleSubmit`'s mailto-based submission exactly as-is — no behavior change.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Manual browser check** — fill the form, submit, confirm the mailto link opens with the right subject/body.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "Restyle Contact with Tailwind"
```

---

### Task 16: App shell restyle + Lenis mount + cleanup dead code/CSS

**Files:**
- Modify: `src/App.jsx` (Header, Footer, nav, ScrollTopBtn, ScrollPageNav — restyle + mount Lenis)
- Delete: `src/styles.jsx`, `src/App.css`, `src/main.css`, `src/custom.css`

**Interfaces:**
- Consumes: `initLenis()` from `src/lib/lenis.js`.

- [ ] **Step 1: Mount Lenis in `AppContent`** — add near the top of the `AppContent` function body (alongside the existing `useEffect`s):

```js
useEffect(() => {
  const destroy = initLenis();
  return destroy;
}, []);
```

(Import `initLenis` from `../lib/lenis` at the top of the file.)

- [ ] **Step 2: Remove the now-dead AOS `useEffect`s** — the "Initial setup — AOS only" effect and the "Refresh AOS on every route change" effect both reference `window.AOS`, which no longer exists after Task 1's `index.html` cleanup. Delete both effects entirely (the preloader-hiding logic inside the first one should be kept, just drop the `window.AOS.init(...)` call).

- [ ] **Step 3: Restyle Header/Footer/nav/ScrollTopBtn/ScrollPageNav with Tailwind classes**, following the `frontend-design` skill's guidance (load it if not already active this session). Keep all existing behavior: mobile nav toggle state, active-route highlighting via `isActive()`, theme toggle button dispatching `toggleTheme()`, scroll-based visibility of `ScrollTopBtn`/`ScrollPageNav`.

- [ ] **Step 4: Confirm no remaining component imports `main.css`, `custom.css`, or `styles.jsx`**

```bash
grep -rn "main.css\|custom.css\|from '\.\./styles'\|from '\./styles'" src --include=*.jsx --include=*.js
```

Expected: no output (Task 1's `index.css` already replaced `main.css`/`custom.css`'s job; `App.jsx`'s two `import './main.css'; import './custom.css';` lines from the top of the file must be removed as part of this task).

- [ ] **Step 5: Delete the dead files**

```bash
git rm src/styles.jsx src/App.css src/main.css src/custom.css
```

- [ ] **Step 6: Verify build**

```bash
npm run build
npm run lint
```

Expected: both succeed with zero errors/warnings.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Restyle app shell with Tailwind, mount Lenis, remove dead CSS/styles.jsx"
```

---

### Task 17: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Build and lint**

```bash
npm run build
npm run lint
```

Expected: both clean.

- [ ] **Step 2: Start the dev server and click through every route** in the browser tool: `/`, `/about`, `/resume`, `/portfolio`, `/skills`, `/achievements`, `/services`, `/contact`. For each: confirm no visual breakage, no console errors (`read_console_messages`, `onlyErrors: true`).

- [ ] **Step 3: Toggle dark mode** on at least 2 pages, confirm the `dark` class is applied to `<html>` and styling responds correctly.

- [ ] **Step 4: Resize to mobile viewport** (`resize_window` preset `mobile`) and re-check Home + Portfolio for layout breakage.

- [ ] **Step 5: Confirm the 5 featured projects' demo links** (`royalhabibiofficial.com`, `meetnuvera.com`, `business.nuverarose.com`, `kalibrasi.webgeaz.com`) are present and correctly formed in both the Home "Featured Work" section and the Portfolio grid.

- [ ] **Step 6: If any issue is found, fix it and re-run Steps 1-5** before proceeding — do not merge with known breakage.

---

### Task 18: Merge, push, verify deploy

**Files:** none (git/CI operations only)

- [ ] **Step 1: Merge the branch to main**

```bash
git checkout main
git merge redesign-tailwind-gsap
```

- [ ] **Step 2: Push**

```bash
git push origin main
```

- [ ] **Step 3: Watch the GitHub Actions run**

```bash
gh run list --workflow=deploy.yml --limit 1
gh run watch
```

Expected: the "Deploy Vite React App to GitHub Pages" run completes with conclusion `success`.

- [ ] **Step 4: Verify the live site** — open `https://zieszx.github.io/portfolio` in the browser tool, confirm the redesigned Home page loads with the new content (Software Engineer title, Featured Work section with the 5 client projects).

- [ ] **Step 5: If the workflow fails, read the failing step's log** (`gh run view --log-failed`), fix the underlying issue (not by skipping CI steps), push a follow-up commit, and repeat from Step 3.
