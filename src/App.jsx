import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleTheme } from './store/themeSlice';
import { initLenis } from './lib/lenis';
import { cn } from './lib/cn';
import profileImg from './assets/my-profile-img.jpg';

import BackgroundPaths from './components/ui/BackgroundPaths';
import CursorSpotlight from './components/ui/CursorSpotlight';

import Home from './components/Home';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Services from './components/Services';

const PAGE_ORDER = ['/', '/about', '/resume', '/portfolio', '/skills', '/achievements', '/services', '/contact'];
const PAGE_LABELS = {
  '/about': 'About',
  '/resume': 'Resume',
  '/portfolio': 'Portfolio',
  '/skills': 'Skills',
  '/achievements': 'Achievements',
  '/services': 'Services',
  '/contact': 'Contact',
};

function ScrollPageNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const currentIndex = PAGE_ORDER.indexOf(location.pathname);
  const nextPath = currentIndex !== -1 && currentIndex < PAGE_ORDER.length - 1
    ? PAGE_ORDER[currentIndex + 1]
    : null;
  const nextLabel = nextPath ? PAGE_LABELS[nextPath] : null;

  // Hide whenever the route changes
  useEffect(() => {
    setVisible(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!nextPath) return;

    const THRESHOLD = 80;

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable < 100) return;
      setVisible(window.scrollY >= scrollable - THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, nextPath]);

  if (!nextPath || !visible) return null;

  return (
    <button
      onClick={() => navigate(nextPath)}
      aria-label={`Go to ${nextLabel}`}
      className={cn(
        /* Both this and ScrollTopBtn are z-40 at bottom-7. They clear each other
           down to ~360px; below that the centred pill runs into the corner
           button, so it lifts onto its own row. */
        'group fixed bottom-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full',
        'max-[380px]:bottom-24',
        'border border-accent/40 bg-ink/90 px-5 py-2.5 shadow-[0_6px_28px_rgba(0,0,0,0.4)] backdrop-blur-md',
        'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent hover:bg-accent/20',
        'animate-scroll-nav-in'
      )}>
      <span className="flex items-center gap-2 text-[13px] font-medium text-white/80">
        <i className="bi bi-arrow-right-circle-fill text-accent" aria-hidden="true"></i>
        Continue to <strong className="font-semibold text-white">{nextLabel}</strong>
      </span>
      <i
        className="bi bi-chevron-right text-sm text-accent transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"></i>
    </button>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppContent() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const location = useLocation();
  const themeMode = useSelector((state) => state.theme.mode);

  // Apply theme class to root element
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  // Mount Lenis smooth scroll for the lifetime of the app
  useEffect(() => {
    const destroy = initLenis();
    return destroy;
  }, []);

  // Hide the preloader once the app has mounted
  useEffect(() => {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  }, []);

  // Close mobile nav when route changes
  useEffect(() => {
    setMobileNavActive(false);
  }, [location]);

  const toggleMobileNav = () => setMobileNavActive((prev) => !prev);

  return (
    <div className="relative min-h-screen bg-bg dark:bg-bg-dark">
      {/* Site-wide interactive backdrop.
          z-0 is the floor of the app's stacking context: <main>/<footer> are z-10,
          the mobile overlay z-30, sidebar + scroll controls z-40, preloader z-[999999].
          Page sections above sit on a ~70% scrim rather than an opaque fill, so this
          layer reads through the whole document instead of only through the sidebar.

          `/` runs at the same opacity as every other route: Home's hero section is
          the one deliberately opaque block on the site (AetherFlowHero owns that
          viewport outright and occludes this layer completely), so there is never a
          moment where both fields compete. Dimming to 0.18 only starved the four
          translucent sections *below* the hero of the same backdrop every other
          route gets. */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* The horizontal fan that used to be a `scale-x-[1.8]` on this wrapper is
            now baked into the component's viewBox. An ancestor transform stopped
            Chromium from compositing the field's own drift animation, which made
            the whole thing repaint on the main thread every frame. */}
        <BackgroundPaths />
        <CursorSpotlight />
      </div>

      <ScrollToTop />
      <Header toggleMobileNav={toggleMobileNav} mobileNavActive={mobileNavActive} />

      {/* Click-outside overlay for mobile nav */}
      {mobileNavActive && (
        <div
          className="fixed inset-0 z-30 bg-ink/60 backdrop-blur-sm xl:hidden"
          onClick={() => setMobileNavActive(false)}
          aria-hidden="true"
        />
      )}

      {/* `overflow-x-clip` (not `hidden`) contains decorative elements whose
          bounding box exceeds the viewport — e.g. the rotating dashed ring on
          /about, whose square bbox swells by ~1.41x mid-spin and pushed the
          document 28px wider than a 390px viewport. `clip` establishes no
          scroll container, so position:sticky inside still works. */}
      <main className="relative z-10 overflow-x-clip xl:pl-72">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {location.pathname !== '/' && <Footer />}
      <ScrollTopBtn />
      <ScrollPageNav />
      <div id="preloader" className="fixed inset-0 z-[999999] flex items-center justify-center bg-bg dark:bg-bg-dark">
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" aria-hidden="true" />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/portfolio">
      <AppContent />
    </Router>
  );
}

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: 'bi-house' },
  { to: '/about', label: 'About', icon: 'bi-person' },
  { to: '/resume', label: 'Resume', icon: 'bi-file-earmark-text' },
  { to: '/portfolio', label: 'Portfolio', icon: 'bi-images' },
  { to: '/skills', label: 'Skills', icon: 'bi-gear' },
  { to: '/achievements', label: 'Achievements', icon: 'bi-trophy' },
  { to: '/services', label: 'Services', icon: 'bi-briefcase' },
  { to: '/contact', label: 'Contact', icon: 'bi-envelope' },
];

const SOCIAL_LINKS = [
  { href: 'https://github.com/Zieszx', icon: 'bi-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ieskandar-zulqarnain/', icon: 'bi-linkedin', label: 'LinkedIn' },
  { href: 'https://instagram.com/zieskandar_', icon: 'bi-instagram', label: 'Instagram' },
  { href: 'mailto:ieskandarzulqarnain@gmail.com', icon: 'bi-envelope', label: 'Email' },
  { href: 'https://wa.me/60149161793', icon: 'bi-whatsapp', label: 'WhatsApp' },
];

function Header({ toggleMobileNav, mobileNavActive }) {
  /* The drawer is only ever open below `xl`, where there is no hover to expand
     the pills — without this every item but the active one renders as a bare,
     unlabelled icon. On `xl` the sidebar is always visible and mobileNavActive
     stays false, so desktop keeps its hover-to-expand behaviour. */
  const location = useLocation();
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname === path);

  return (
    <>
      {/* Floating toggle — mobile/tablet only, always above the sidebar & overlay */}
      <button
        onClick={toggleMobileNav}
        aria-label="Toggle navigation"
        aria-expanded={mobileNavActive}
        aria-controls="header"
        className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 xl:hidden">
        <i className={`bi ${mobileNavActive ? 'bi-x-lg' : 'bi-list'} text-xl`} aria-hidden="true"></i>
      </button>

      {/* The sidebar is dark in BOTH themes, so it carries the `dark` class itself.
          The `dark` custom-variant matches `.dark *`, so anything theme-aware dropped
          in here resolves its dark palette even while the site is in light mode. */}
      <header
        id="header"
        className={cn(
          'dark fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-y-auto overflow-x-hidden px-5 py-8 text-white',
          'border-r border-accent/15 bg-ink/85 backdrop-blur-xl',
          'transition-transform duration-300 ease-in-out xl:translate-x-0',
          mobileNavActive ? 'translate-x-0' : '-translate-x-full'
        )}>
        <img
          src={profileImg}
          alt="Ieskandar Zulqarnain"
          className="mx-auto h-24 w-24 rounded-full border-4 border-white/10 object-cover shadow-lg shadow-accent/10"
        />

        <Link
          to="/"
          className="mt-4 text-center font-heading text-lg font-bold tracking-tight text-white transition-colors hover:text-accent">
          Ieskandar Zulqarnain
        </Link>

        <div className="mt-4 flex justify-center gap-2">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-sm text-white/70 transition-colors hover:bg-accent hover:text-white">
              <i className={`bi ${s.icon}`} aria-hidden="true"></i>
            </a>
          ))}
        </div>

        <button
          onClick={() => dispatch(toggleTheme())}
          aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
          className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-accent/50 hover:text-white">
          <i className={`bi ${themeMode === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'} text-accent`} aria-hidden="true"></i>
          {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        <nav id="navmenu" className="mt-6 flex-1 pb-4">
          <ul className="flex flex-col gap-1 font-nav">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.to);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium',
                      'transition-all duration-200 ease-out',
                      active
                        ? 'bg-accent/15 text-white'
                        : 'text-white/60 hover:translate-x-1 hover:bg-white/5 hover:text-white'
                    )}>
                    {/* Accent left-bar marks the active route (and previews on hover). */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-accent transition-all duration-200',
                        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      )}
                    />
                    <i
                      className={cn(
                        'bi text-base transition-colors',
                        link.icon,
                        active ? 'text-accent' : 'text-white/50 group-hover:text-accent'
                      )}
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-ink/10 bg-surface/90 py-10 backdrop-blur-sm dark:border-white/10 dark:bg-surface-dark/90 xl:pl-72">
      <div className="mx-auto max-w-7xl px-6 text-center sm:px-8">
        <p className="text-sm text-ink/70 dark:text-white/70">
          © Copyright <strong className="px-1 font-heading text-ink dark:text-white">Ieskandar Zulqarnain</strong> All Rights
          Reserved
        </p>
        <p className="mt-2 text-xs text-ink/50 dark:text-white/50">
          Passionate Software Engineer &bull; AI Enthusiast &bull; Problem Solver
        </p>
      </div>
    </footer>
  );
}

function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      aria-label="Scroll to top"
      className={cn(
        'fixed bottom-7 right-7 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30',
        'transition-all duration-300 ease-in-out hover:-translate-y-1',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0'
      )}>
      <i className="bi bi-arrow-up-short text-2xl" aria-hidden="true"></i>
    </a>
  );
}

export default App;
