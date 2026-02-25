import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleTheme } from './store/themeSlice';
import './main.css';
import './custom.css';
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
    <button className="scroll-page-nav" onClick={() => navigate(nextPath)} aria-label={`Go to ${nextLabel}`}>
      <span className="scroll-page-nav-label">
        <i className="bi bi-arrow-right-circle-fill"></i>
        Continue to <strong>{nextLabel}</strong>
      </span>
      <i className="bi bi-chevron-right scroll-page-nav-chevron"></i>
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
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  // Apply theme class to root element
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

  // Initial setup — AOS only (Typed + PureCounter are handled inside their own components)
  useEffect(() => {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }

    setTimeout(() => {
      if (window.AOS) {
        window.AOS.init({
          duration: 700,
          easing: 'ease-in-out',
          once: true,
          mirror: false,
        });
      }
    }, 300);
  }, []);

  // Refresh AOS on every route change so new page elements animate
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.AOS) window.AOS.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);

  // Close mobile nav when route changes
  useEffect(() => {
    setMobileNavActive(false);
  }, [location]);

  const toggleMobileNav = () => setMobileNavActive((prev) => !prev);

  return (
    <div className={`index-page ${mobileNavActive ? 'mobile-nav-active' : ''}`}>
      <ScrollToTop />
      <Header toggleMobileNav={toggleMobileNav} mobileNavActive={mobileNavActive} />

      {/* Click-outside overlay for mobile nav */}
      {mobileNavActive && <div className="mobile-nav-overlay" onClick={() => setMobileNavActive(false)} aria-hidden="true" />}

      <main className="main">
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
      <div id="preloader"></div>
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

function Header({ toggleMobileNav, mobileNavActive }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return 'active';
    if (path !== '/' && location.pathname === path) return 'active';
    return '';
  };

  return (
    <header id="header" className={`header dark-background d-flex flex-column ${mobileNavActive ? 'header-show' : ''}`}>
      <button
        className="header-toggle d-xl-none bi bi-list mobile-nav-toggle"
        onClick={toggleMobileNav}
        aria-label="Toggle navigation"
        aria-expanded={mobileNavActive}
      />

      <div className="profile-img">
        <img src={profileImg} alt="Ieskandar Zulqarnain" className="img-fluid rounded-circle" />
      </div>

      <Link to="/" className="logo d-flex align-items-center justify-content-center">
        <h1 className="sitename">Ieskandar Zulqarnain</h1>
      </Link>

      <div className="social-links text-center">
        <a href="https://github.com/Zieszx" target="_blank" rel="noopener noreferrer" className="github" aria-label="GitHub">
          <i className="bi bi-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/ieskandar-zulqarnain/" target="_blank" rel="noopener noreferrer" className="linkedin" aria-label="LinkedIn">
          <i className="bi bi-linkedin"></i>
        </a>
        <a href="https://instagram.com/zieskandar_" target="_blank" rel="noopener noreferrer" className="instagram" aria-label="Instagram">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="mailto:ieskandarzulqarnain@gmail.com" className="email" aria-label="Email">
          <i className="bi bi-envelope"></i>
        </a>
        <a href="https://wa.me/60149161793" target="_blank" rel="noopener noreferrer" className="whatsapp" aria-label="WhatsApp">
          <i className="bi bi-whatsapp"></i>
        </a>
      </div>

      {/* Dark / Light mode toggle */}
      <div className="theme-toggle-wrap text-center">
        <button
          className="theme-toggle-btn"
          onClick={() => dispatch(toggleTheme())}
          aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
          <i className={`bi ${themeMode === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
          <span>{themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>

      <nav id="navmenu" className="navmenu">
        <ul>
          <li>
            <Link to="/" className={isActive('/')}>
              <i className="bi bi-house navicon"></i>Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about')}>
              <i className="bi bi-person navicon"></i> About
            </Link>
          </li>
          <li>
            <Link to="/resume" className={isActive('/resume')}>
              <i className="bi bi-file-earmark-text navicon"></i> Resume
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className={isActive('/portfolio')}>
              <i className="bi bi-images navicon"></i> Portfolio
            </Link>
          </li>
          <li>
            <Link to="/skills" className={isActive('/skills')}>
              <i className="bi bi-gear navicon"></i> Skills
            </Link>
          </li>
          <li>
            <Link to="/achievements" className={isActive('/achievements')}>
              <i className="bi bi-trophy navicon"></i> Achievements
            </Link>
          </li>
          <li>
            <Link to="/services" className={isActive('/services')}>
              <i className="bi bi-briefcase navicon"></i> Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact')}>
              <i className="bi bi-envelope navicon"></i> Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container">
        <div className="copyright text-center">
          <p>
            © <span>Copyright</span> <strong className="px-1 sitename">Ieskandar Zulqarnain</strong> <span>All Rights Reserved</span>
          </p>
        </div>
        <div className="credits text-center">
          <p>Passionate Software Developer &bull; AI Enthusiast &bull; Problem Solver</p>
        </div>
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
      className={`scroll-top d-flex align-items-center justify-content-center ${visible ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      aria-label="Scroll to top">
      <i className="bi bi-arrow-up-short"></i>
    </a>
  );
}

export default App;
