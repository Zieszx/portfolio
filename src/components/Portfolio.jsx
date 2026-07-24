import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import PlaceholderCard from './PlaceholderCard';
import { portfolioProjects, CATEGORY_LABELS } from '../data/portfolioProjects';
import { cn } from '../lib/cn';
import { BorderBeam } from './magicui/BorderBeam';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';
import SpotlightCard from './ui/SpotlightCard';
import MotionButton from './ui/MotionButton';
import LetsWorkSection from './ui/LetsWorkSection';

/* ESLint here is not JSX-aware — alias motion so the import reads as used. */
const MotionDiv = motion.div;

const SOCIALS = [
  { href: 'https://github.com/Zieszx', icon: 'bi-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ieskandar-zulqarnain/', icon: 'bi-linkedin', label: 'LinkedIn' },
  { href: 'https://instagram.com/zieskandar_', icon: 'bi-instagram', label: 'Instagram' },
  { href: 'mailto:ieskandarzulqarnain@gmail.com', icon: 'bi-envelope', label: 'Email' },
  { href: 'https://wa.me/60149161793', icon: 'bi-whatsapp', label: 'WhatsApp' },
];

/* SpotlightCard's root carries `group`, and MotionButton's label uses
   `group-hover:text-white` — so merely hovering the card would bleach the ghost
   button's label to white on a white surface. Pin the label colour with
   important overrides that only flip when the button itself is hovered. */
const GHOST_BTN =
  'px-4 py-2 text-xs [&>span]:text-accent! hover:[&>span]:text-white!';

const renderRouterLink = ({ href, className, children, ...rest }) => (
  <Link to={href} className={className} {...rest}>
    {children}
  </Link>
);

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
    <>
      <section id="portfolio" className="relative bg-bg/70 py-24 dark:bg-bg-dark/70 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="max-w-2xl">
            <AnimatedGradientText>Portfolio</AnimatedGradientText>
            <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
              Selected Work, Shipped &amp; Live.
            </h1>
            {/* Plain <p>: this intro is above the fold, and ScrollReveal is only
                worth it for copy the reader scrolls down to. */}
            <p className="mt-4 text-ink/60 dark:text-white/60">
              Featured projects showcasing my expertise in software development, AI solutions, and innovative
              applications.
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
            {filtered.map((project, index) => (
              <MotionDiv
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
                className="h-full">
                {/* SpotlightCard wraps children in its own relative z-10 div, so the
                    column layout has to be projected onto that wrapper. */}
                <SpotlightCard className="h-full p-0 [&>div:last-child]:flex [&>div:last-child]:h-full [&>div:last-child]:flex-col">
                  {project.featured && <BorderBeam className="rounded-2xl" />}

                  {/* Image + badges */}
                  <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
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
                    <div className="mt-4 flex flex-1 flex-col gap-1.5 border-t border-ink/10 pt-4 dark:border-white/10">
                      {project.highlights.map((h) => (
                        <span key={h} className="flex items-center gap-2 text-xs text-ink/60 dark:text-white/60">
                          <i className="bi bi-check2-circle shrink-0 text-accent" aria-hidden="true"></i>
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Action links */}
                    {(project.demo || project.github) && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.demo && (
                          <MotionButton
                            variant="ghost"
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Live demo of ${project.title}`}
                            icon="bi-arrow-up-right"
                            className={GHOST_BTN}>
                            Live Demo
                          </MotionButton>
                        )}
                        {project.github && (
                          <MotionButton
                            variant="ghost"
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Source code for ${project.title}`}
                            icon="bi-github"
                            className={GHOST_BTN}>
                            Source
                          </MotionButton>
                        )}
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <LetsWorkSection
        ctaLabel="Start a project"
        ctaHref="/contact"
        secondaryLabel="See what I offer"
        secondaryHref="/services"
        socials={SOCIALS}
        renderLink={renderRouterLink}
      />
    </>
  );
}

export default Portfolio;
