import { useState, useRef, useEffect } from 'react';
import PlaceholderCard from './PlaceholderCard';
import { portfolioProjects, CATEGORY_LABELS } from '../data/portfolioProjects';

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
                    {project.image ? (
                      <img src={project.image} alt={project.title} loading="lazy" />
                    ) : (
                      <PlaceholderCard title={project.title} />
                    )}

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
