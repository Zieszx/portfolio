import { useRef } from 'react';
import { Link } from 'react-router-dom';
import resumePdf from '/assets/resume/IESKANDARZULQARNAIN_Resume.pdf';
import heroBg from '/assets/img/hero-bg.jpg?url';
import { cn } from '../lib/cn';
import { useScrollReveal } from '../lib/motion';
import { portfolioProjects } from '../data/portfolioProjects';
import { TypingAnimation } from './magicui/TypingAnimation';
import { DotPattern } from './magicui/DotPattern';
import { Marquee } from './magicui/Marquee';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';
import { BorderBeam } from './magicui/BorderBeam';

// Module-level constants — TypingAnimation's `strings` prop must be a stable
// reference, otherwise the typing cycle restarts on every re-render.
const ROLE_STRINGS = ['Software Engineer', 'Full-Stack Developer', 'AI Enthusiast', 'Problem Solver'];

const techStack = ['Java', 'Python', 'React.js', 'Next.js', 'Spring Boot', 'AI / ML'];

const heroStats = [
  { number: '15+', label: 'Projects', icon: 'bi-code-square' },
  { number: '2+', label: 'Years Exp.', icon: 'bi-briefcase' },
  { number: '3.96', label: 'CGPA', icon: 'bi-mortarboard' },
  { number: '8×', label: "Dean's List", icon: 'bi-award' },
];

const featuredProjects = portfolioProjects.filter((p) => p.featured);

const marqueeTech = [
  'Java', 'Python', 'React', 'Next.js', 'Spring Boot', 'Laravel',
  'TypeScript', 'PostgreSQL', 'GSAP', 'Tailwind CSS', 'Flutter', 'Firebase',
];

// Conceptually pulled from Services.jsx's `services` array — this is a
// 3-of-6 teaser, the full list lives on the /services page.
const processTeasers = [
  {
    icon: 'bi-globe2',
    title: 'Web Application Development',
    description: 'Scalable, full-stack apps with React.js on the front-end and Spring Boot or Django on the back-end.',
    color: '#00b4d8',
  },
  {
    icon: 'bi-robot',
    title: 'AI & Machine Learning Solutions',
    description: 'Intelligent systems powered by LLMs, vector search (FAISS), and AI APIs — custom tools and automation.',
    color: '#8b5cf6',
  },
  {
    icon: 'bi-phone',
    title: 'Mobile App Development',
    description: 'Cross-platform apps built with Flutter and Firebase — smooth, native-feel Android and iOS experiences.',
    color: '#10b981',
  },
];

// Hero CTAs stay as <Link>/<a> for routing — they carry ShimmerButton's own
// visual language via cn() rather than nesting a <Link> inside a <button>.
const primaryBtnClasses = cn(
  'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5',
  'bg-accent text-white font-medium transition-transform hover:-translate-y-0.5',
  'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r',
  'before:from-transparent before:via-white/40 before:to-transparent',
  'hover:before:translate-x-full before:transition-transform before:duration-700'
);

const secondaryBtnClasses = cn(
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5',
  'border border-white/25 text-white font-medium transition-colors hover:border-accent hover:text-accent'
);

const ghostBtnClasses = cn(
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3',
  'text-white/70 font-medium transition-colors hover:text-accent'
);

function Home() {
  const heroTextRef = useRef(null);
  const heroStatsRef = useRef(null);
  const featuredGridRef = useRef(null);
  const processGridRef = useRef(null);
  const teaserRef = useRef(null);

  useScrollReveal(heroTextRef, { stagger: 0.08 });
  useScrollReveal(heroStatsRef, { stagger: 0.1, delay: 0.3 });
  useScrollReveal(featuredGridRef, { stagger: 0.12 });
  useScrollReveal(processGridRef, { stagger: 0.1 });
  useScrollReveal(teaserRef);

  return (
    <>
      {/* ===== Hero ===== */}
      <section id="hero" className="relative isolate overflow-hidden bg-ink text-white">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/90 to-ink" />
        <DotPattern className="absolute inset-0 text-accent/30" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 py-28 sm:px-8 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:px-12 lg:py-36">
          {/* Left — text content */}
          <div ref={heroTextRef}>
            <p className="flex items-center gap-3 font-nav text-sm uppercase tracking-[0.3em] text-white/60">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Hello, I&apos;m
            </p>

            <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Ieskandar Zulqarnain
            </h1>

            <div className="mt-4 font-heading text-2xl sm:text-3xl">
              <span className="text-white/70">I&apos;m a&nbsp;</span>
              <TypingAnimation strings={ROLE_STRINGS} className="font-semibold text-accent" />
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Building scalable applications &amp; AI-driven solutions that make a real-world impact — from
              government dashboards to e-commerce platforms and AI-powered tools. I turn requirements into
              shipped, production systems.
            </p>

            {/* Tech badges */}
            <div className="mt-8 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80">
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/portfolio" className={primaryBtnClasses}>
                <i className="bi bi-grid-3x3-gap-fill" aria-hidden="true"></i>
                View My Work
              </Link>
              <Link to="/contact" className={secondaryBtnClasses}>
                <i className="bi bi-send-fill" aria-hidden="true"></i>
                Let&apos;s Connect
              </Link>
              <a href={resumePdf} download="IESKANDARZULQARNAIN_Resume.pdf" className={ghostBtnClasses}>
                <i className="bi bi-file-earmark-person" aria-hidden="true"></i>
                Resume
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-10 flex items-center gap-5 text-xl text-white/60">
              <a href="https://github.com/Zieszx" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-accent">
                <i className="bi bi-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/ieskandar-zulqarnain/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-accent">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://instagram.com/zieskandar_" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-accent">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="mailto:ieskandarzulqarnain@gmail.com" aria-label="Email" className="transition-colors hover:text-accent">
                <i className="bi bi-envelope-fill"></i>
              </a>
              <a href="https://wa.me/60149161793" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-colors hover:text-accent">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Right — stat cards */}
          <div ref={heroStatsRef} className="grid grid-cols-2 gap-4">
            {heroStats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                <i className={`bi ${s.icon} text-2xl text-accent`} aria-hidden="true"></i>
                <div className="mt-3 font-heading text-3xl font-bold">{s.number}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 flex justify-center pb-10 text-white/40">
          <i className="bi bi-chevron-double-down animate-bounce text-xl" aria-hidden="true"></i>
        </div>
      </section>

      {/* ===== Featured Work ===== */}
      <section className="relative bg-bg py-24 dark:bg-bg-dark sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedGradientText>01 — Featured Work</AnimatedGradientText>
          <h2 className="mt-4 max-w-2xl font-heading text-4xl font-bold tracking-tight text-ink dark:text-white sm:text-5xl">
            Projects People Actually Use.
          </h2>
          <p className="mt-4 max-w-xl text-ink/60 dark:text-white/60">
            Five production systems built for real clients — live platforms, not portfolio filler.
          </p>

          <div ref={featuredGridRef} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-surface p-7 dark:border-white/10 dark:bg-surface-dark">
                <BorderBeam />
                <h3 className="font-heading text-xl font-semibold text-ink dark:text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60 dark:text-white/60">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent">
                      {t}
                    </span>
                  ))}
                </div>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2">
                    See live <span aria-hidden="true">→</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tech stack marquee ===== */}
      <section className="border-y border-white/10 bg-ink py-8">
        <Marquee pauseOnHover>
          {marqueeTech.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-4 font-heading text-2xl font-semibold text-white/25 transition-colors hover:text-accent sm:text-3xl">
              {tech}
              <span className="text-accent/40" aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ===== What I Do ===== */}
      <section className="relative bg-surface py-24 dark:bg-surface-dark sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedGradientText>02 — How I Work</AnimatedGradientText>
          <h2 className="mt-4 max-w-2xl font-heading text-4xl font-bold tracking-tight text-ink dark:text-white sm:text-5xl">
            What I Do, Start to Finish.
          </h2>

          <div ref={processGridRef} className="mt-14 grid gap-6 sm:grid-cols-3">
            {processTeasers.map((svc, i) => (
              <div key={svc.title} className="rounded-2xl border border-ink/10 bg-bg p-7 dark:border-white/10 dark:bg-bg-dark">
                <span className="font-heading text-sm font-semibold text-accent">0{i + 1}</span>
                <div
                  className="mt-4 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: `${svc.color}18`, border: `1.5px solid ${svc.color}44` }}>
                  <i className={`bi ${svc.icon} text-xl`} style={{ color: svc.color }}></i>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink dark:text-white">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60 dark:text-white/60">{svc.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/services" className="inline-flex items-center gap-1 font-medium text-accent transition-all hover:gap-2">
              See all services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Closing "about" teaser ===== */}
      <section className="relative bg-bg py-24 text-center dark:bg-bg-dark sm:py-32">
        <div ref={teaserRef} className="mx-auto max-w-2xl px-6">
          <p className="font-nav text-xs uppercase tracking-[0.3em] text-ink/40 dark:text-white/40">Beyond the code</p>
          <Link to="/about" className="group mt-4 inline-flex flex-col items-center gap-4">
            <h2 className="font-heading text-3xl font-bold text-ink transition-colors group-hover:text-accent dark:text-white sm:text-4xl">
              Curious about the person behind the code?
            </h2>
            <span className="inline-flex items-center gap-2 font-medium text-accent">
              Get to know me
              <i className="bi bi-arrow-right-circle-fill transition-transform group-hover:translate-x-1" aria-hidden="true"></i>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
