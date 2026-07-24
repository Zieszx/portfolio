import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useScrollReveal } from '../lib/motion';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';
import SpotlightCard from './ui/SpotlightCard';

/* ESLint here is not JSX-aware — alias motion so the import reads as used. */
const MotionDiv = motion.div;

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

/* Each card's spotlight is its own accent, held at a low alpha so the six tints
   still read as one teal-led family rather than six unrelated cards. */
function spotlightFor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.22)`;
}

function Services() {
  const headerRef = useRef(null);
  const ctaRef = useRef(null);

  useScrollReveal(headerRef);
  useScrollReveal(ctaRef, { delay: 0.15 });

  return (
    <section id="services" className="relative bg-bg/70 py-24 dark:bg-bg-dark/70 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl">
          <AnimatedGradientText>Services</AnimatedGradientText>
          <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
            What I Can Build For You.
          </h1>
          {/* Plain <p>: this intro is above the fold, and ScrollReveal is only
              worth it for copy the reader scrolls down to. */}
          <p className="mt-4 text-ink/60 dark:text-white/60">
            From full-stack web apps to AI-powered tools and mobile experiences — here&apos;s how I can help bring
            your project to life.
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, index) => (
            <MotionDiv
              key={svc.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="h-full">
              <SpotlightCard
                spotlightColor={spotlightFor(svc.color)}
                className="h-full p-7 [&>div:last-child]:flex [&>div:last-child]:h-full [&>div:last-child]:flex-col">
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
                <div className="mt-6 h-1 w-full shrink-0 rounded-full" style={{ background: svc.color }} />
              </SpotlightCard>
            </MotionDiv>
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
