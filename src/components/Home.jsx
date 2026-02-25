import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import resumePdf from '/assets/resume/IESKANDARZULQARNAIN_Resume.pdf';
import heroBg from '/assets/img/hero-bg.jpg?url';

const techStack = ['Java', 'Python', 'React.js', 'Spring Boot', 'AI / ML'];

const heroStats = [
  { number: '10+', label: 'Projects', icon: 'bi-code-square' },
  { number: '1+', label: 'Years Exp.', icon: 'bi-briefcase' },
  { number: '3.96', label: 'CGPA', icon: 'bi-mortarboard' },
  { number: '8×', label: "Dean's List", icon: 'bi-award' },
];

function Home() {
  useEffect(() => {
    // Typed.js lives here — initialised only when the hero is mounted
    const el = document.querySelector('.typed');
    if (window.Typed && el) {
      const typed = new window.Typed('.typed', {
        strings: ['Software Developer', 'Software Engineer', 'AI Enthusiast', 'Full Stack Developer'],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
      });
      return () => typed.destroy();
    }
  }, []);

  return (
    <section id="hero" className="hero section dark-background">
      <img src={heroBg} alt="Hero background" className="hero-bg-img" />

      {/* Main hero layout */}
      <div className="container hero-main">
        {/* Left — text content */}
        <div className="hero-text" data-aos="fade-right" data-aos-delay="100">
          <p className="hero-greeting">
            <span className="greeting-dash" aria-hidden="true"></span>
            Hello, I&apos;m
          </p>

          <h1 className="hero-name">Ieskandar Zulqarnain</h1>

          {/* Role with Typed.js — kept inside a div, NOT a p, so main.css .hero p span border-bottom won't apply */}
          <div className="hero-role" data-aos="fade-right" data-aos-delay="200">
            <span className="role-prefix">I&apos;m a&nbsp;</span>
            <span className="typed"></span>
          </div>

          <p className="hero-tagline" data-aos="fade-up" data-aos-delay="300">
            Building scalable applications &amp; AI‑driven solutions that make a real‑world impact. From full‑stack web apps to intelligent systems — I turn ideas into meaningful products.
          </p>

          {/* Tech badges */}
          <div className="hero-stack" data-aos="fade-up" data-aos-delay="400">
            {techStack.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions" data-aos="fade-up" data-aos-delay="500">
            <Link to="/portfolio" className="hero-btn hero-btn-primary">
              <i className="bi bi-grid-3x3-gap-fill"></i>
              View My Work
            </Link>
            <Link to="/contact" className="hero-btn hero-btn-secondary">
              <i className="bi bi-send-fill"></i>
              Let&apos;s Connect
            </Link>
            <a href={resumePdf} download="IESKANDARZULQARNAIN_Resume.pdf" className="hero-btn hero-btn-ghost">
              <i className="bi bi-file-earmark-person"></i>
              Resume
            </a>
          </div>

          {/* Social Icons */}
          <div className="hero-socials" data-aos="fade-up" data-aos-delay="600">
            <a href="https://github.com/Zieszx" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="bi bi-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/ieskandar-zulqarnain/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://instagram.com/zieskandar_" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="mailto:ieskandarzulqarnain@gmail.com" aria-label="Email">
              <i className="bi bi-envelope-fill"></i>
            </a>
            <a href="https://wa.me/60149161793" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>

          {/* "Get to know me" link */}
          <div className="hero-discover" data-aos="fade-up" data-aos-delay="700">
            <Link to="/about" className="discover-link">
              <span>Curious about the person behind the code?</span>
              <i className="bi bi-arrow-right-circle-fill"></i>
            </Link>
          </div>
        </div>

        {/* Right — stat cards (desktop) */}
        <div className="hero-stats-panel" data-aos="fade-left" data-aos-delay="300">
          {heroStats.map((s) => (
            <div key={s.label} className="hero-stat-card">
              <i className={`bi ${s.icon} stat-icon`}></i>
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" data-aos="fade-up" data-aos-delay="900">
        <i className="bi bi-chevron-double-down"></i>
      </div>
    </section>
  );
}

export default Home;
