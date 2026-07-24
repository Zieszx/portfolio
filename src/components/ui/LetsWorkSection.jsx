import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn';

/* ESLint here is not JSX-aware, so `motion.x` used only inside JSX reads as an
   unused import. Aliasing to capitalized consts matches the project's workaround. */
const MotionH2 = motion.h2;
const MotionSpan = motion.span;
const MotionP = motion.p;
const MotionDiv = motion.div;
const MotionUl = motion.ul;

const DEFAULT_SOCIALS = [
  { href: 'https://github.com/', icon: 'bi-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/', icon: 'bi-linkedin', label: 'LinkedIn' },
  { href: 'mailto:hello@example.com', icon: 'bi-envelope', label: 'Email' },
];

function defaultRenderLink({ href, className, children, ...rest }) {
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

/**
 * LetsWorkSection — closing call-to-action band with an oversized display
 * headline, a gradient sheen sweeping through the type, drifting accent glows
 * and a row of social icon links.
 *
 * renderLink({ href, className, children, ...rest }) lets the caller swap in
 * react-router's <Link> for internal routes without importing the router here.
 * socials: [{ href, icon, label }] where `icon` is a Bootstrap Icons class.
 */
export default function LetsWorkSection({
  title = "Let's work together",
  subtitle = "I'm currently open to new opportunities, freelance projects and collaborations. If you have something in mind, I'd love to hear about it.",
  ctaLabel = 'Get in touch',
  ctaHref = '/contact',
  secondaryLabel = 'View my work',
  secondaryHref = '/portfolio',
  socials = DEFAULT_SOCIALS,
  className,
  renderLink = defaultRenderLink,
}) {
  const reduceMotion = useReducedMotion();
  const words = String(title).split(/\s+/).filter(Boolean);

  const primary = renderLink({
    href: ctaHref,
    className: cn(
      'group relative inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5',
      'font-nav text-sm font-semibold text-ink shadow-lg shadow-accent/30',
      'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/50',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-offset-bg-dark',
    ),
    children: (
      <>
        {ctaLabel}
        <i
          aria-hidden="true"
          className="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1"
        />
      </>
    ),
  });

  const secondary = renderLink({
    href: secondaryHref,
    className: cn(
      'group inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5',
      'font-nav text-sm font-semibold text-ink transition-all duration-300',
      'hover:-translate-y-0.5 hover:border-accent hover:text-accent',
      'dark:border-white/20 dark:text-white dark:hover:border-accent dark:hover:text-accent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-offset-bg-dark',
    ),
    children: (
      <>
        {secondaryLabel}
        <i
          aria-hidden="true"
          className="bi bi-arrow-up-right transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </>
    ),
  });

  return (
    <section
      className={cn(
        'relative isolate w-full overflow-hidden bg-bg/70 py-24 sm:py-32 dark:bg-bg-dark/70',
        className,
      )}
    >
      {/* Scoped keyframes: uniquely prefixed so they cannot collide with the
          globals in src/index.css. */}
      <style>{`
        @keyframes lws-drift {
          0%   { transform: translate3d(-6%, -4%, 0) scale(1); }
          50%  { transform: translate3d(6%, 4%, 0) scale(1.12); }
          100% { transform: translate3d(-6%, -4%, 0) scale(1); }
        }
        @keyframes lws-sheen {
          to { background-position: 200% center; }
        }
        .lws-glow { animation: lws-drift 18s ease-in-out infinite; }
        .lws-glow-slow { animation: lws-drift 26s ease-in-out infinite reverse; }
        .lws-sheen {
          background-size: 200% auto;
          animation: lws-sheen 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .lws-glow, .lws-glow-slow, .lws-sheen { animation: none; }
        }
      `}</style>

      {/* Decorative drifting accent glows. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="lws-glow absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_65%)] opacity-15 blur-3xl dark:opacity-25" />
        <div className="lws-glow-slow absolute bottom-0 right-0 h-[28rem] w-[28rem] translate-x-1/4 translate-y-1/3 rounded-full bg-[radial-gradient(circle,#7c3aed_0%,transparent_65%)] opacity-10 blur-3xl dark:opacity-20" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <MotionH2
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="font-heading font-extrabold leading-[1.05] tracking-tight text-ink dark:text-white"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          {words.map((word, index) => (
            <MotionSpan
              key={`${word}-${index}`}
              variants={{
                hidden: { opacity: 0, y: '0.4em' },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
                },
              }}
              className={cn(
                'mr-[0.25em] inline-block',
                // The final word carries the animated gradient sheen.
                index === words.length - 1 &&
                  'lws-sheen bg-gradient-to-r from-accent via-violet-500 to-accent bg-clip-text text-transparent',
              )}
            >
              {word}
            </MotionSpan>
          ))}
        </MotionH2>

        {subtitle ? (
          <MotionP
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 max-w-2xl font-body text-base text-ink/70 sm:text-lg dark:text-white/70"
          >
            {subtitle}
          </MotionP>
        ) : null}

        <MotionDiv
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-11 flex flex-wrap items-center justify-center gap-4"
        >
          {primary}
          {secondary}
        </MotionDiv>

        {socials?.length ? (
          <MotionUl
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="mt-14 flex list-none items-center justify-center gap-3"
          >
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-full',
                    'border border-ink/10 text-ink/70 transition-all duration-300',
                    'hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-lg hover:shadow-accent/25',
                    'dark:border-white/15 dark:text-white/70 dark:hover:text-accent',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    'focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-offset-bg-dark',
                  )}
                >
                  <i aria-hidden="true" className={cn('bi text-lg', social.icon)} />
                </a>
              </li>
            ))}
          </MotionUl>
        ) : null}
      </div>
    </section>
  );
}
