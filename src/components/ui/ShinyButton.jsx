import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn';

/**
 * ShinyButton — pill button with a skewed light sweep that loops forever and
 * speeds up on hover, plus a shimmering gradient label.
 *
 * Root element: `<a>` when `href` is set, `<button>` otherwise. Pass `as` to
 * override (e.g. react-router's `Link`) — it is wrapped with `motion.create`
 * so the press/hover spring stays on the root regardless of element type.
 */
export default function ShinyButton({ children, className, as, href, ...rest }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  // Memoised: `motion.create` returns a new component identity each call, and
  // an unstable type would remount the button on every render.
  const Root = useMemo(() => {
    if (as) return motion.create(as);
    return href ? motion.a : motion.button;
  }, [as, href]);

  const isNativeButton = !as && !href;

  return (
    <Root
      href={href}
      type={isNativeButton ? (rest.type ?? 'button') : rest.type}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden',
        'rounded-full border border-accent/30 px-6 py-2.5',
        'bg-accent/10 backdrop-blur-md dark:bg-white/5',
        'font-nav text-sm font-medium tracking-wide',
        'transition-[box-shadow,border-color] duration-300',
        'hover:border-accent/60 hover:shadow-[0_0_28px_-6px_rgba(0,180,216,0.65)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'focus-visible:ring-offset-bg dark:focus-visible:ring-offset-bg-dark',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...rest}>
      {/* Sweeping highlight. Skewed so the band reads as a specular glint. */}
      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 z-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/25"
          animate={{ x: ['0%', '400%'] }}
          transition={{
            duration: hovered ? 0.75 : 2.4,
            repeat: Infinity,
            repeatDelay: hovered ? 0.1 : 1.6,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Soft accent bloom that only shows up on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 140% at 50% 120%, rgba(0,180,216,0.35), transparent 65%)',
        }}
      />

      {reduceMotion ? (
        <span className="relative z-10 text-ink dark:text-white">{children}</span>
      ) : (
        <motion.span
          className={cn(
            'relative z-10 bg-clip-text text-transparent',
            'bg-[length:250%_100%]',
            // Mostly ink/white with a travelling accent band, so at rest it
            // reads exactly like `text-ink dark:text-white`.
            'bg-[linear-gradient(110deg,#050d18_0%,#050d18_44%,#00b4d8_50%,#050d18_56%,#050d18_100%)]',
            'dark:bg-[linear-gradient(110deg,#ffffff_0%,#ffffff_44%,#7fe3ff_50%,#ffffff_56%,#ffffff_100%)]',
          )}
          animate={{ backgroundPosition: ['250% 0%', '-150% 0%'] }}
          transition={{
            duration: hovered ? 1.2 : 3.6,
            repeat: Infinity,
            repeatDelay: hovered ? 0 : 0.8,
            ease: 'linear',
          }}>
          {children}
        </motion.span>
      )}
    </Root>
  );
}
