import { useState, useRef, useEffect } from 'react';

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

const portfolioProjects = [
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
  },
];

const CATEGORY_LABELS = {
  '*': 'All Projects',
  ai: 'AI Projects',
  web: 'Web Apps',
  mobile: 'Mobile Apps',
};

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('*');
  const [animating, setAnimating] = useState(false);
  const gridRef = useRef(null);
  const scrollAfterFilterRef = useRef(false);

  const handleFilterClick = (filter) => {
    if (filter === activeFilter) return;
    setAnimating(true);
    setTimeout(() => {
      scrollAfterFilterRef.current = true;
      setActiveFilter(filter);
      setAnimating(false);
    }, 200);
  };

  // Scroll AFTER React commits the new cards to the DOM
  useEffect(() => {
    if (scrollAfterFilterRef.current && gridRef.current) {
      scrollAfterFilterRef.current = false;
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeFilter]);

  const filtered = activeFilter === '*' ? portfolioProjects : portfolioProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="container px-4 px-md-5">
      <section id="portfolio" className="portfolio section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Portfolio</h2>
          <p>Featured projects showcasing my expertise in software development, AI solutions, and innovative applications.</p>
        </div>

        <div className="container">
          {/* Filter buttons */}
          <ul className="portfolio-filters" data-aos="fade-up" data-aos-delay="100">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <li
                key={key}
                className={activeFilter === key ? 'filter-active' : ''}
                onClick={() => handleFilterClick(key)}>
                {label}
              </li>
            ))}
          </ul>

          {/* Project count */}
          <p className="text-center mb-4" style={{ fontSize: '14px', color: 'color-mix(in srgb, var(--default-color), transparent 40%)' }} data-aos="fade-up">
            Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'project' : 'projects'}
          </p>

          {/* Cards grid */}
          <div ref={gridRef} className={`row gy-4 portfolio-grid${animating ? ' animating' : ''}`} data-aos="fade-up" data-aos-delay="150">
            {filtered.map((project) => (
              <div key={project.id} className="col-lg-4 col-md-6 col-12">
                <div className="portfolio-card">
                  {/* Image + badges + action links */}
                  <div className="portfolio-card-img">
                    <img src={project.image} alt={project.title} loading="lazy" />

                    {/* Category badge — always visible */}
                    <span className="portfolio-cat-badge">
                      {CATEGORY_LABELS[project.category] ?? project.category}
                    </span>

                    {/* Action links — slide in on hover, no conflicting CSS */}
                    <div className="portfolio-card-links">
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" title="Live Demo" aria-label="Live Demo">
                          <i className="bi bi-eye"></i>
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" title="View on GitHub" aria-label="GitHub Repository">
                          <i className="bi bi-github"></i>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card body — always visible, no hover overlay needed */}
                  <div className="portfolio-card-body">
                    <h4>{project.title}</h4>
                    <p className="portfolio-desc">{project.description}</p>

                    {/* Tech tags (first 4) */}
                    <div className="portfolio-tech-tags">
                      {project.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>

                    {/* Key highlights */}
                    <div className="portfolio-highlights">
                      {project.highlights.map((h) => (
                        <span key={h} className="highlight-tag">
                          <i className="bi bi-check2-circle"></i>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Portfolio;
