import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
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
import AetherFlowHero from './ui/AetherFlowHero';
import MotionButton from './ui/MotionButton';
import ShinyButton from './ui/ShinyButton';
import ScrollReveal, { ScrollVelocityText } from './ui/TextScrollAnimation';

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

const ROLE_STRIP = 'Software Engineer • AI Enthusiast • Full-Stack Developer • Problem Solver • ';

const FEATURED_INTRO =
  'Five production systems built for real clients — live platforms, not portfolio filler.';

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

// The aether flow field paints live streaks behind the hero copy, so the text
// carries its own halo (light-on-dark and dark-on-light) rather than relying on
// the backdrop alone. Kept off the buttons, which have their own solid fills.
const heroHalo = cn(
  '[text-shadow:0_1px_16px_rgba(255,255,255,0.85),0_1px_3px_rgba(255,255,255,0.7)]',
  'dark:[text-shadow:0_2px_22px_rgba(4,11,20,0.9),0_1px_3px_rgba(4,11,20,0.8)]'
);

function Home() {
  const heroSectionRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroStatsRef = useRef(null);
  const featuredGridRef = useRef(null);
  const processGridRef = useRef(null);
  const teaserRef = useRef(null);

  // Hero entrance — a dedicated timeline, not gated behind useScrollReveal's
  // ScrollTrigger. The hero is always in the initial viewport, so a
  // scroll-triggered reveal here was either instant or inconsistently timed
  // depending on load conditions. This plays automatically on mount,
  // staggering in: eyebrow → name → typing role → tagline → tech badges →
  // CTAs → social icons (all direct children of heroTextRef, in DOM order),
  // then the stat panel slides in on an overlapping beat.
  useEffect(() => {
    const textEl = heroTextRef.current;
    const statsEl = heroStatsRef.current;
    if (!textEl || !statsEl) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        textEl.children,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 }
      ).fromTo(
        statsEl.children,
        { autoAlpha: 0, y: 32, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08 },
        '-=0.55'
      );
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // Hero background parallax — the bg image drifts as the section scrolls
  // past, tied to scroll position via ScrollTrigger's scrub.
  useEffect(() => {
    const section = heroSectionRef.current;
    const bg = heroBgRef.current;
    if (!section || !bg) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  useScrollReveal(featuredGridRef, { stagger: 0.12 });
  useScrollReveal(processGridRef, { stagger: 0.1 });
  useScrollReveal(teaserRef);

  return (
    <>
      {/* ===== Hero ===== */}
      {/* The aether canvas paints its own base colour from the active theme, so
          the hero is theme-adaptive here rather than permanently dark. */}
      <section
        ref={heroSectionRef}
        id="hero"
        className="relative isolate overflow-hidden bg-bg text-ink dark:bg-ink dark:text-white">
        <AetherFlowHero className="min-h-screen">
          <div className="relative flex min-h-screen flex-col justify-center">
            {/* Depth layers sit above the flow canvas but below the copy. */}
            <img
              ref={heroBgRef}
              src={heroBg}
              alt=""
              className="pointer-events-none absolute inset-0 h-[120%] w-full scale-110 object-cover opacity-[0.05] will-change-transform dark:opacity-[0.16]"
            />
            {/* Kept deliberately light: AetherFlowHero already lays down a 45%
                vignette, so anything heavier here erases the flow streaks. */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/45 via-bg/5 to-bg dark:from-ink/45 dark:via-ink/5 dark:to-ink" />
            <DotPattern className="pointer-events-none absolute inset-0 text-accent/25" />
            {/* Subtle grain texture for depth */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay" aria-hidden="true">
              <filter id="hero-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#hero-grain)" />
            </svg>

            <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 px-6 py-28 sm:px-8 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:px-12 lg:py-36">
              {/* Left — text content */}
              <div ref={heroTextRef}>
                <p className={cn('flex items-center gap-3 font-nav text-sm uppercase tracking-[0.3em] text-ink/60 dark:text-white/60', heroHalo)}>
                  <span className="h-px w-8 bg-accent" aria-hidden="true" />
                  Hello, I&apos;m
                </p>

                <h1 className={cn('mt-6 font-heading text-6xl font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl xl:text-9xl', heroHalo)}>
                  Ieskandar Zulqarnain
                </h1>

                <div className={cn('mt-4 font-heading text-2xl sm:text-3xl', heroHalo)}>
                  <span className="text-ink/70 dark:text-white/70">I&apos;m a&nbsp;</span>
                  <TypingAnimation strings={ROLE_STRINGS} className="font-semibold text-accent" />
                </div>

                <p className={cn('mt-6 max-w-xl text-base leading-relaxed text-ink/70 dark:text-white/70 sm:text-lg', heroHalo)}>
                  Building scalable applications &amp; AI-driven solutions that make a real-world impact — from
                  government dashboards to e-commerce platforms and AI-powered tools. I turn requirements into
                  shipped, production systems.
                </p>

                {/* Tech badges */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-ink/15 bg-bg/60 px-3.5 py-1.5 text-sm text-ink/80 backdrop-blur-sm dark:border-white/15 dark:bg-white/5 dark:text-white/80">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <MotionButton as={Link} to="/portfolio" icon="bi-arrow-right" className="px-7 py-3.5">
                    <i className="bi bi-grid-3x3-gap-fill" aria-hidden="true"></i>
                    View My Work
                  </MotionButton>
                  <ShinyButton as={Link} to="/contact" className="px-7 py-3.5">
                    <span className="inline-flex items-center gap-2">
                      <i className="bi bi-send-fill" aria-hidden="true"></i>
                      Let&apos;s Connect
                    </span>
                  </ShinyButton>
                  <MotionButton
                    href={resumePdf}
                    download="IESKANDARZULQARNAIN_Resume.pdf"
                    variant="ghost"
                    /* Sitting beside two solid CTAs, a border-less ghost read as
                       plain text in light mode — it needs its own affordance. */
                    className="border-accent/60 bg-accent/10 px-6 py-3 backdrop-blur-sm">
                    <i className="bi bi-file-earmark-person" aria-hidden="true"></i>
                    Resume
                  </MotionButton>
                </div>

                {/* Social Icons */}
                <div className="mt-10 flex items-center gap-5 text-xl text-ink/60 dark:text-white/60">
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
                  <div
                    key={s.label}
                    className="rounded-2xl border border-ink/10 bg-bg/70 p-6 text-center backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                    <i className={`bi ${s.icon} text-2xl text-accent`} aria-hidden="true"></i>
                    <div className="mt-3 font-heading text-3xl font-bold">{s.number}</div>
                    <div className="mt-1 text-xs uppercase tracking-wide text-ink/50 dark:text-white/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll hint */}
            <div className="relative z-10 flex justify-center pb-10 text-ink/40 dark:text-white/40">
              <i className="bi bi-chevron-double-down animate-bounce text-xl" aria-hidden="true"></i>
            </div>
          </div>
        </AetherFlowHero>
      </section>

      {/* ===== Role strip — velocity-reactive divider between hero and work ===== */}
      <section className="overflow-hidden border-y border-accent/25 bg-surface py-4 dark:border-white/10 dark:bg-surface-dark sm:py-6">
        {/* At ink/25 on white this band was effectively invisible; it needs to
            read as a deliberate divider, not a rendering artefact. */}
        <ScrollVelocityText
          baseVelocity={2.5}
          className="font-heading text-2xl font-semibold uppercase tracking-tight text-ink/55 dark:text-white/35 sm:text-4xl">
          {ROLE_STRIP}
        </ScrollVelocityText>
      </section>

      {/* ===== Featured Work ===== */}
      <section className="relative bg-bg/70 py-24 dark:bg-bg-dark/70 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedGradientText>01 — Featured Work</AnimatedGradientText>
          <h2 className="mt-4 max-w-2xl font-heading text-5xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
            Projects People Actually Use.
          </h2>
          <ScrollReveal className="mt-4 max-w-xl text-ink/60 dark:text-white/60">
            {FEATURED_INTRO}
          </ScrollReveal>

          <div ref={featuredGridRef} className="mt-14 grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project, i) => {
              const isLead = i === 0;
              return (
                <article
                  key={project.id}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl border border-ink/10 bg-surface dark:border-white/10 dark:bg-surface-dark',
                    'transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
                    isLead ? 'p-8 sm:col-span-2 sm:p-12' : 'p-7'
                  )}>
                  <BorderBeam size={isLead ? 320 : 220} duration={isLead ? 9 : 12} />
                  <h3
                    className={cn(
                      'font-heading font-semibold text-ink dark:text-white',
                      isLead ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
                    )}>
                    {project.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-3 leading-relaxed text-ink/60 dark:text-white/60',
                      isLead ? 'max-w-2xl text-base sm:text-lg' : 'text-sm'
                    )}>
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent">
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.demo && (
                    <MotionButton
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="ghost"
                      icon="bi-arrow-right"
                      className="mt-6 px-5 py-2 text-xs">
                      See live
                    </MotionButton>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Tech stack marquee ===== */}
      <section className="flex flex-col gap-5 overflow-hidden border-y border-white/10 bg-ink py-9">
        <Marquee pauseOnHover>
          {marqueeTech.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-4 font-heading text-3xl font-semibold text-white/40 transition-colors hover:text-accent sm:text-4xl">
              {tech}
              <span className="text-accent/50" aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover>
          {marqueeTech.map((tech) => (
            <span
              key={`${tech}-r`}
              className="flex items-center gap-4 font-heading text-xl font-semibold text-white/20 transition-colors hover:text-accent sm:text-2xl">
              {tech}
              <span className="text-accent/30" aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ===== What I Do ===== */}
      <section className="relative bg-surface/70 py-24 dark:bg-surface-dark/70 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedGradientText>02 — How I Work</AnimatedGradientText>
          <h2 className="mt-4 max-w-2xl font-heading text-5xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
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
            <MotionButton as={Link} to="/services" variant="ghost" icon="bi-arrow-right">
              See all services
            </MotionButton>
          </div>
        </div>
      </section>

      {/* ===== Closing "about" teaser ===== */}
      <section className="relative bg-bg/70 py-24 text-center dark:bg-bg-dark/70 sm:py-32">
        <div ref={teaserRef} className="mx-auto max-w-2xl px-6">
          <p className="font-nav text-xs uppercase tracking-[0.3em] text-ink/40 dark:text-white/40">Beyond the code</p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-ink dark:text-white sm:text-4xl">
            Curious about the person behind the code?
          </h2>
          <div className="mt-8">
            <MotionButton as={Link} to="/about" icon="bi-arrow-right">
              Get to know me
            </MotionButton>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
