import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './main.css';
import './custom.css';
// Import images
import profileImg from './assets/my-profile-img.jpg';

// Component imports
import Home from './components/Home';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

function AppContent() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Simple initialization without external libraries for now
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }

    // Initialize external libraries after a delay
    setTimeout(() => {
      // Initialize AOS if available
      if (window.AOS) {
        window.AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false,
        });
      }

      // Initialize Typed.js if available
      if (window.Typed && document.querySelector('.typed')) {
        new window.Typed('.typed', {
          strings: ['Software Developer', 'Software Engineer', 'AI Enthusiast', 'Full Stack Developer'],
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000,
          loop: true,
        });
      }

      // Initialize PureCounter if available
      if (window.PureCounter) {
        new window.PureCounter();
      }
    }, 1000);
  }, []);

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };

  return (
    <div className={`index-page ${mobileNavActive ? 'mobile-nav-active' : ''}`}>
      <Header toggleMobileNav={toggleMobileNav} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {location.pathname !== '/' && <Footer />}
      <ScrollTop />
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

function Header({ toggleMobileNav }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return 'active';
    if (path !== '/' && location.pathname === path) return 'active';
    return '';
  };

  return (
    <header id="header" className="header dark-background d-flex flex-column">
      <i className="header-toggle d-xl-none bi bi-list mobile-nav-toggle" onClick={toggleMobileNav}></i>

      <div className="profile-img">
        <img src={profileImg} alt="Ieskandar Zulqarnain" className="img-fluid rounded-circle" />
      </div>

      <Link to="/" className="logo d-flex align-items-center justify-content-center">
        <h1 className="sitename">Ieskandar Zulqarnain</h1>
      </Link>

      <div className="social-links text-center">
        <a href="https://github.com/Zieszx" target="_blank" rel="noopener noreferrer" className="github">
          <i className="bi bi-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/ieskandar-zulqarnain/" target="_blank" rel="noopener noreferrer" className="linkedin">
          <i className="bi bi-linkedin"></i>
        </a>
        <a href="https://instagram.com/zieskandar_" target="_blank" rel="noopener noreferrer" className="instagram">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="mailto:ieskandarzulqarnain@gmail.com" className="email">
          <i className="bi bi-envelope"></i>
        </a>
        <a href="https://wa.me/60149161793" target="_blank" rel="noopener noreferrer" className="whatsapp">
          <i className="bi bi-whatsapp"></i>
        </a>
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
          <p>Passionate Software Developer | AI Enthusiast | Problem Solver</p>
        </div>
      </div>
    </footer>
  );
}

function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <a
      href="#"
      className={`scroll-top d-flex align-items-center justify-content-center ${visible ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}>
      <i className="bi bi-arrow-up-short"></i>
    </a>
  );
}

export default App;
