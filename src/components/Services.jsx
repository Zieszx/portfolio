const services = [
  {
    icon: 'bi-globe2',
    title: 'Web Application Development',
    description:
      'Building scalable, modern full-stack web applications using React.js on the front-end and Java Spring Boot or Django on the back-end — from MVPs to enterprise-grade systems.',
    tech: ['React.js', 'Spring Boot', 'Django', 'MySQL'],
    color: '#00b4d8',
  },
  {
    icon: 'bi-robot',
    title: 'AI & Machine Learning Solutions',
    description:
      'Developing intelligent systems powered by LLMs, vector search (FAISS), and AI APIs (OpenAI, Anthropic). Custom AI tools, automation pipelines, and semantic search engines.',
    tech: ['Python', 'FAISS', 'OpenAI API', 'Anthropic API'],
    color: '#8b5cf6',
  },
  {
    icon: 'bi-phone',
    title: 'Mobile App Development',
    description:
      'Cross-platform mobile applications with Flutter and Firebase. Smooth, native-feel experiences for both Android and iOS with real-time data synchronisation.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore'],
    color: '#10b981',
  },
  {
    icon: 'bi-braces-asterisk',
    title: 'API Design & Integration',
    description:
      'Designing clean, well-documented RESTful APIs with proper authentication, rate limiting, and third-party integrations. Built for scalability and ease of consumption.',
    tech: ['Java', 'Python', 'REST', 'Spring Boot'],
    color: '#f59e0b',
  },
  {
    icon: 'bi-palette2',
    title: 'UI/UX Design & Frontend',
    description:
      'Crafting responsive, accessible, and visually polished interfaces using modern CSS frameworks and component libraries with a strong focus on user experience.',
    tech: ['React', 'Bootstrap', 'Tailwind CSS', 'Vite'],
    color: '#ef4444',
  },
  {
    icon: 'bi-database-gear',
    title: 'Database Design & Management',
    description:
      'Designing normalised schemas, optimising queries, and integrating relational (MySQL, PostgreSQL) and NoSQL (Firebase) databases with backend services.',
    tech: ['MySQL', 'PostgreSQL', 'Firebase', 'Hibernate'],
    color: '#06b6d4',
  },
];

function Services() {
  return (
    <div className="container px-4 px-md-5">
      <section id="services" className="services section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>What I can build for you — from full-stack web apps to AI-powered tools and mobile experiences.</p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {services.map((svc, i) => (
              <div key={i} className="col-lg-4 col-md-6 col-12" data-aos="fade-up" data-aos-delay={`${(i % 3) * 100 + 100}`}>
                <div className="service-card">
                  {/* Icon */}
                  <div className="service-icon-wrap" style={{ background: `${svc.color}18`, border: `1.5px solid ${svc.color}44` }}>
                    <i className={`bi ${svc.icon}`} style={{ color: svc.color }}></i>
                  </div>

                  <h3 className="service-title">{svc.title}</h3>
                  <p className="service-desc">{svc.description}</p>

                  {/* Tech tags */}
                  <div className="service-tech">
                    {svc.tech.map((t) => (
                      <span key={t} className="service-tech-tag" style={{ color: svc.color, borderColor: `${svc.color}55`, background: `${svc.color}0f` }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Accent bottom bar */}
                  <div className="service-bar" style={{ background: svc.color }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-5 pt-2" data-aos="fade-up" data-aos-delay="400">
            <p className="services-cta-text">Interested in working together?</p>
            <a href="/portfolio/contact" className="services-cta-btn">
              <i className="bi bi-send-fill"></i> Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
