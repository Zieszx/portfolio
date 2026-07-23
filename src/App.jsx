import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleTheme } from './store/themeSlice';
import { initLenis } from './lib/lenis';
import { cn } from './lib/cn';
import profileImg from './assets/my-profile-img.jpg';

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
        'group fixed bottom-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full',
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
    <div className="min-h-screen bg-bg dark:bg-bg-dark">
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

      <main className="xl:pl-72">
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

      <header
        id="header"
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-y-auto border-r border-white/10 bg-ink px-6 py-10 text-white',
          'transition-transform duration-300 ease-in-out xl:translate-x-0',
          mobileNavActive ? 'translate-x-0' : '-translate-x-full'
        )}>
        <img
          src={profileImg}
          alt="Ieskandar Zulqarnain"
          className="mx-auto h-28 w-28 rounded-full border-4 border-white/10 object-cover shadow-lg shadow-accent/10"
        />

        <Link
          to="/"
          className="mt-5 text-center font-heading text-xl font-bold tracking-tight text-white transition-colors hover:text-accent">
          Ieskandar Zulqarnain
        </Link>

        <div className="mt-5 flex justify-center gap-2">
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
          className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-accent/50 hover:text-white">
          <i className={`bi ${themeMode === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'} text-accent`} aria-hidden="true"></i>
          {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        <nav id="navmenu" className="mt-8 flex-1">
          <ul className="space-y-1 pb-6 font-nav text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-2.5 font-medium text-white/55 transition-colors',
                    isActive(link.to) ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white'
                  )}>
                  <i className={cn('bi text-base', link.icon, isActive(link.to) ? 'text-accent' : '')} aria-hidden="true"></i>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-surface py-10 dark:border-white/10 dark:bg-surface-dark xl:pl-72">
      <div className="mx-auto max-w-7xl px-6 text-center sm:px-8">
        <p className="text-sm text-ink/70 dark:text-white/70">
          © Copyright <strong className="px-1 font-heading text-ink dark:text-white">Ieskandar Zulqarnain</strong> All Rights
          Reserved
        </p>
        <p className="mt-2 text-xs text-ink/50 dark:text-white/50">
          Passionate Software Developer &bull; AI Enthusiast &bull; Problem Solver
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
