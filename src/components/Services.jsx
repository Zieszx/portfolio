import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../lib/motion';
import { MagicCard } from './magicui/MagicCard';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';

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
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  useScrollReveal(headerRef);
  useScrollReveal(gridRef, { stagger: 0.1, delay: 0.1 });
  useScrollReveal(ctaRef, { delay: 0.15 });

  return (
    <section id="services" className="relative bg-bg py-24 dark:bg-bg-dark sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl">
          <AnimatedGradientText>Services</AnimatedGradientText>
          <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
            What I Can Build For You.
          </h1>
          <p className="mt-4 text-ink/60 dark:text-white/60">
            From full-stack web apps to AI-powered tools and mobile experiences — here&apos;s how I can help bring
            your project to life.
          </p>
        </div>

        {/* Service cards */}
        <div ref={gridRef} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <MagicCard
              key={svc.title}
              gradientColor={svc.color}
              className="group flex h-full flex-col border border-ink/10 bg-surface p-7 dark:border-white/10 dark:bg-surface-dark">
              {/* Icon */}
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl"
                style={{ background: `${svc.color}18`, border: `1.5px solid ${svc.color}44`, color: svc.color }}>
                <i className={`bi ${svc.icon}`} aria-hidden="true"></i>
              </div>

              <h3 className="mt-5 font-heading text-lg font-semibold text-ink dark:text-white">{svc.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60 dark:text-white/60">{svc.description}</p>

              {/* Tech tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {svc.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-2.5 py-1 text-xs"
                    style={{ color: svc.color, borderColor: `${svc.color}55`, background: `${svc.color}0f` }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Accent bottom bar */}
              <div className="mt-6 h-1 w-full rounded-full transition-opacity" style={{ background: svc.color }} />
            </MagicCard>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-16 text-center">
          <p className="font-nav text-xs uppercase tracking-[0.3em] text-ink/40 dark:text-white/40">
            Interested in working together?
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-medium text-white shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5">
            <i className="bi bi-send-fill" aria-hidden="true"></i>
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Services;
