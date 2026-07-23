import { useState, useRef, useEffect } from 'react';
import PlaceholderCard from './PlaceholderCard';
import { portfolioProjects, CATEGORY_LABELS } from '../data/portfolioProjects';
import { cn } from '../lib/cn';
import { useScrollReveal } from '../lib/motion';
import { MagicCard } from './magicui/MagicCard';
import { BorderBeam } from './magicui/BorderBeam';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('*');
  const [animating, setAnimating] = useState(false);
  const gridRef = useRef(null);
  const scrollAfterFilterRef = useRef(false);

  useScrollReveal(gridRef, { stagger: 0.08 });

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
    <section id="portfolio" className="relative bg-bg py-24 dark:bg-bg-dark sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl">
          <AnimatedGradientText>Portfolio</AnimatedGradientText>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-ink dark:text-white sm:text-5xl">
            Selected Work, Shipped &amp; Live.
          </h1>
          <p className="mt-4 text-ink/60 dark:text-white/60">
            Featured projects showcasing my expertise in software development, AI solutions, and innovative applications.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="mt-12 flex flex-wrap gap-3">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleFilterClick(key)}
              className={cn(
                'rounded-full border px-5 py-2 text-sm font-medium transition-colors',
                activeFilter === key
                  ? 'border-accent bg-accent text-white'
                  : 'border-ink/15 text-ink/60 hover:border-accent hover:text-accent dark:border-white/15 dark:text-white/60'
              )}>
              {label}
            </button>
          ))}
        </div>

        {/* Project count */}
        <p className="mt-6 text-sm text-ink/50 dark:text-white/50">
          Showing <strong className="text-ink dark:text-white">{filtered.length}</strong>{' '}
          {filtered.length === 1 ? 'project' : 'projects'}
        </p>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className={cn(
            'mt-10 grid grid-cols-1 gap-6 transition-all duration-200 sm:grid-cols-2 lg:grid-cols-3',
            animating && 'pointer-events-none translate-y-2 opacity-0'
          )}>
          {filtered.map((project) => (
            <MagicCard
              key={project.id}
              className="group flex h-full flex-col border border-ink/10 bg-surface dark:border-white/10 dark:bg-surface-dark">
              {project.featured && <BorderBeam />}

              {/* Image + badges + action links */}
              <div className="relative h-52 w-full overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <PlaceholderCard title={project.title} />
                )}

                {/* Category badge — always visible */}
                <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {CATEGORY_LABELS[project.category] ?? project.category}
                </span>

                {/* Client Work badge — featured projects only */}
                {project.featured && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    <i className="bi bi-briefcase-fill" aria-hidden="true"></i>
                    Client Work
                  </span>
                )}

                {/* Action links — slide in on hover */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-end gap-2 bg-gradient-to-t from-ink/80 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Demo"
                      aria-label="Live Demo"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink transition-colors hover:bg-accent hover:text-white">
                      <i className="bi bi-eye"></i>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on GitHub"
                      aria-label="GitHub Repository"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink transition-colors hover:bg-accent hover:text-white">
                      <i className="bi bi-github"></i>
                    </a>
                  )}
                </div>
              </div>

              {/* Card body — always visible */}
              <div className="flex flex-1 flex-col p-6">
                <h4 className="font-heading text-lg font-semibold text-ink dark:text-white">{project.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink/60 dark:text-white/60">{project.description}</p>

                {/* Tech tags (first 4) */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Key highlights */}
                <div className="mt-4 flex flex-col gap-1.5 border-t border-ink/10 pt-4 dark:border-white/10">
                  {project.highlights.map((h) => (
                    <span key={h} className="flex items-center gap-2 text-xs text-ink/60 dark:text-white/60">
                      <i className="bi bi-check2-circle text-accent" aria-hidden="true"></i>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
