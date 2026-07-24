import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn';

/* Accent teal, tuned per theme: white surfaces need a denser tint before the
   spotlight becomes legible, dark surfaces wash out if it goes much higher. */
const LIGHT_SPOTLIGHT = 'rgba(0, 140, 170, 0.30)';
const DARK_SPOTLIGHT = 'rgba(0, 180, 216, 0.22)';

/* Aliased so the `motion` import registers as a value use for lint. */
const MotionDiv = motion.div;

/**
 * SpotlightCard — a surface with a radial "spotlight" that tracks the cursor.
 *
 * Cursor position lives in motion values, so following the pointer never
 * triggers a React render; only the enter/leave fade flips component state.
 */
export default function SpotlightCard({
  children,
  className,
  spotlightColor,
  as = 'div',
  ...rest
}) {
  const Root = as;
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  // Start off-card so the very first frame after mount has nothing lit up.
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  const lightGradient = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, ${
    spotlightColor ?? LIGHT_SPOTLIGHT
  }, transparent 72%)`;
  const darkGradient = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, ${
    spotlightColor ?? DARK_SPOTLIGHT
  }, transparent 72%)`;

  const handleMouseMove = (event) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const handleMouseEnter = (event) => {
    handleMouseMove(event);
    setHovered(true);
  };

  const handleMouseLeave = () => setHovered(false);

  const overlayClass = 'pointer-events-none absolute inset-0 z-0';
  const overlayTransition = { duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' };

  return (
    <Root
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative overflow-hidden rounded-2xl border p-6',
        'border-ink/10 bg-surface dark:border-white/10 dark:bg-surface-dark',
        'transition-[transform,border-color,box-shadow] duration-300 ease-out',
        'hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(0,180,216,0.55)]',
        'dark:hover:border-accent/50',
        'motion-reduce:transform-none motion-reduce:transition-none',
        className,
      )}
      {...rest}>
      {/* Two overlays instead of one: the gradient colour has to differ per
          theme, and a motion template cannot read a Tailwind `dark:` variant. */}
      <MotionDiv
        aria-hidden="true"
        className={cn(overlayClass, 'dark:hidden')}
        style={{ background: lightGradient }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={overlayTransition}
      />
      <MotionDiv
        aria-hidden="true"
        className={cn(overlayClass, 'hidden dark:block')}
        style={{ background: darkGradient }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={overlayTransition}
      />
      <div className="relative z-10">{children}</div>
    </Root>
  );
}
