import { useState, useEffect } from 'react';
// Portfolio project images
import aiCodePrediction from '/assets/img/portfolio/ai-code-prediction.jpg?url';
import bgRemover from '/assets/img/portfolio/bg-remover.jpg?url';
import pawsPreferences from '/assets/img/portfolio/paws-preferences.png?url';
import hastaCarRental from '/assets/img/portfolio/hasta-car-rental.jpg?url';
import instagramClone from '/assets/img/portfolio/instagram-clone.jpg?url';
import userRegistration from '/assets/img/portfolio/user-registration.jpg?url';
import dashboardPiwn from '/assets/img/portfolio/dashboard-piwn.jpg?url';
import ezyBooking from '/assets/img/portfolio/ezy-booking.jpg?url';
import aibigWebsite from '/assets/img/portfolio/aibig-website.jpg?url';
import resipro from '/assets/img/portfolio/resipro.jpg?url';

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('*');

  const portfolioProjects = [
    {
      id: 1,
      title: 'AI-Powered Code Prediction System',
      category: 'ai',
      image: aiCodePrediction,
      description: 'Revolutionary AI platform leveraging FAISS vector search and LLMs for intelligent code completion. Features context learning, multi-model support (Claude + GPT), and persistent chat sessions with semantic embeddings.',
      technologies: 'Python, Flask, React, FAISS, SentenceTransformers, Bootstrap',
      github: 'https://github.com/Zieszx/code_prediction',
      demo: null,
      highlights: ['Context Learning with FAISS', 'Multi-model AI Integration', 'Live Code Execution Sandbox'],
    },
    {
      id: 2,
      title: 'Smart Background Remover',
      category: 'ai',
      image: bgRemover,
      description: 'Intelligent Windows GUI application for batch background removal with advanced text and object protection. Uses AI segmentation (U²-Net), EAST text detection, and MobileNet-SSD object detection.',
      technologies: 'Python, Tkinter, OpenCV, rembg, ONNX Runtime',
      github: 'https://github.com/Zieszx/remove-bg',
      demo: null,
      highlights: ['AI Segmentation', 'Text & Object Protection', 'Batch Processing'],
    },
    {
      id: 3,
      title: 'Paws & Preferences',
      category: 'web',
      image: pawsPreferences,
      description: 'Delightful Tinder-style cat discovery app with swipe interface, Cataas.com API integration, and persistent state management. Responsive design optimized for all devices with smooth animations.',
      technologies: 'React, Vite, PrimeReact, Bootstrap, PrimeFlex',
      github: 'https://github.com/Zieszx/paws-preferences',
      demo: 'https://zieszx.github.io/paws-preferences/',
      highlights: ['Tinder-Like Interface', 'API Integration', 'Responsive Design'],
    },
    {
      id: 4,
      title: 'HASTA Car Rental System',
      category: 'web',
      image: hastaCarRental,
      description: 'Comprehensive car rental management system (Final Year Project) with customer registration, vehicle reservations, maintenance tracking, and administrative dashboard. Built with RESTful architecture.',
      technologies: 'Java, Spring Boot, MySQL, Maven, Lombok',
      github: 'https://github.com/Zieszx/HastaCarRental',
      demo: null,
      highlights: ['Full-Stack Architecture', 'Admin Dashboard', 'Maintenance Module'],
    },
    {
      id: 5,
      title: 'Instagram Clone - LaughFun',
      category: 'mobile',
      image: instagramClone,
      description: 'Feature-rich Instagram clone with Firebase authentication, real-time post feed, profile management, and modern gradient UI. Demonstrates advanced mobile development skills.',
      technologies: 'Flutter, Firebase Auth, Firestore, Firebase Storage',
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
      technologies: 'Java, Spring Boot, PostgreSQL, Hibernate, Maven',
      github: 'https://github.com/Zieszx/User-Registration-with-Postgres',
      demo: null,
      highlights: ['MVC Architecture', 'Database Relationships', 'Unit Testing'],
    },
    {
      id: 7,
      title: 'Dashboard PIWN (JAWHAR)',
      category: 'web',
      image: dashboardPiwn,
      description: 'Professional dashboard system for monitoring Wakaf, Zakat, and Haji task percentages. Enhanced workflow from traditional manual methods to centralized web application.',
      technologies: 'SOAD Framework, MySQL, JavaScript',
      github: null,
      demo: null,
      highlights: ['Workflow Enhancement', 'Task Monitoring', 'Centralized Platform'],
    },
    {
      id: 8,
      title: 'Ezy Booking System (EzApp)',
      category: 'web',
      image: ezyBooking,
      description: 'Centralized booking platform with automated appointment scheduling, PWA optimization for mobile access, and seamless user experience across all devices.',
      technologies: 'React.js, SOAD Framework, PWA',
      github: null,
      demo: null,
      highlights: ['PWA Implementation', 'Automated Scheduling', 'Mobile Optimization'],
    },
    {
      id: 9,
      title: 'AIBIG Main Website',
      category: 'web',
      image: aibigWebsite,
      description: 'Complete website transformation from static to database-integrated platform. Deployed on Webmin with MySQL backend for dynamic content management.',
      technologies: 'Spring Boot, MySQL, Webmin, JavaScript',
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
      technologies: 'Flutter, Firebase Firestore, Dart',
      github: null,
      demo: null,
      highlights: ['SOS Functionality', 'Visitor Management', 'Push Notifications'],
    },
  ];

  const filteredProjects = activeFilter === '*' ? portfolioProjects : portfolioProjects.filter((project) => project.category === activeFilter);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="container px-5">
      <section id="portfolio" className="portfolio section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Portfolio</h2>
          <p>Featured projects showcasing my expertise in software development, AI solutions, and innovative applications</p>
        </div>

        <div className="container">
          <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
            <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
              <li data-filter="*" className={activeFilter === '*' ? 'filter-active' : ''} onClick={() => handleFilterClick('*')}>
                All
              </li>
              <li data-filter="ai" className={activeFilter === 'ai' ? 'filter-active' : ''} onClick={() => handleFilterClick('ai')}>
                AI Projects
              </li>
              <li data-filter="web" className={activeFilter === 'web' ? 'filter-active' : ''} onClick={() => handleFilterClick('web')}>
                Web Apps
              </li>
              <li data-filter="mobile" className={activeFilter === 'mobile' ? 'filter-active' : ''} onClick={() => handleFilterClick('mobile')}>
                Mobile Apps
              </li>
            </ul>

            <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
              {filteredProjects.map((project) => (
                <div key={project.id} className={`col-lg-4 col-md-6 portfolio-item isotope-item filter-${project.category}`}>
                  <div className="portfolio-content h-100">
                    <img src={project.image} className="img-fluid" alt={project.title} />
                    <div className="portfolio-info">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <p>
                        <small>
                          <strong>Tech:</strong> {project.technologies}
                        </small>
                      </p>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" title="Live Demo" className="preview-link">
                          <i className="bi bi-eye"></i>
                        </a>
                      )}
                      <a href={project.github} target="_blank" rel="noopener noreferrer" title="GitHub Repository" className="details-link">
                        <i className="bi bi-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Portfolio;
