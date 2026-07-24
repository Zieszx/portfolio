import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { cn } from '../../lib/cn';

const SPRING = { stiffness: 260, damping: 18, mass: 0.4 };

/** How far the button (and, more strongly, its label) drifts toward the cursor. */
const BUTTON_PULL = 0.28;
const LABEL_PULL = 0.5;

/** True on touch/pen-first devices, where magnetism has no cursor to follow. */
function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return coarse;
}

/**
 * MotionButton — magnetic button. The root drifts toward the cursor on a
 * spring, the label leads it slightly for a parallax feel, and a circular
 * fill grows out of the point where the pointer entered.
 */
export default function MotionButton({
  children,
  className,
  href,
  as,
  icon,
  variant = 'primary',
  ...rest
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const coarsePointer = useCoarsePointer();
  const magnetic = !reduceMotion && !coarsePointer;

  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const rawLabelX = useMotionValue(0);
  const rawLabelY = useMotionValue(0);
  const labelX = useSpring(rawLabelX, SPRING);
  const labelY = useSpring(rawLabelY, SPRING);

  // Origin of the fill wipe, in percent so it survives resizes.
  const [fillOrigin, setFillOrigin] = useState({ x: 50, y: 50 });

  const Root = useMemo(() => {
    if (as) return motion.create(as);
    return href ? motion.a : motion.button;
  }, [as, href]);

  const isNativeButton = !as && !href;

  const pointerOffset = (event) => {
    const el = ref.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      rect,
      dx: event.clientX - (rect.left + rect.width / 2),
      dy: event.clientY - (rect.top + rect.height / 2),
      px: ((event.clientX - rect.left) / rect.width) * 100,
      py: ((event.clientY - rect.top) / rect.height) * 100,
    };
  };

  const handleMouseMove = (event) => {
    if (!magnetic) return;
    const offset = pointerOffset(event);
    if (!offset) return;
    rawX.set(offset.dx * BUTTON_PULL);
    rawY.set(offset.dy * BUTTON_PULL);
    rawLabelX.set(offset.dx * LABEL_PULL);
    rawLabelY.set(offset.dy * LABEL_PULL);
  };

  const handleMouseEnter = (event) => {
    const offset = pointerOffset(event);
    if (offset) setFillOrigin({ x: offset.px, y: offset.py });
    setHovered(true);
    handleMouseMove(event);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
    rawLabelX.set(0);
    rawLabelY.set(0);
  };

  const isPrimary = variant === 'primary';

  return (
    <Root
      ref={ref}
      href={href}
      type={isNativeButton ? (rest.type ?? 'button') : rest.type}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
      style={magnetic ? { x, y } : undefined}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden',
        'rounded-full border px-7 py-3',
        'font-nav text-sm font-medium tracking-wide',
        'transition-[border-color,box-shadow,background-color] duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'focus-visible:ring-offset-bg dark:focus-visible:ring-offset-bg-dark',
        'disabled:pointer-events-none disabled:opacity-50',
        isPrimary
          ? 'border-accent bg-accent text-white shadow-[0_10px_30px_-14px_rgba(0,180,216,0.9)]'
          : 'border-accent/60 bg-transparent text-accent hover:border-accent',
        className,
      )}
      {...rest}>
      {/* Fill wipe: a circle anchored at the entry point that scales up to
          swallow the button. Oversized so any entry point still covers it. */}
      <motion.span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute z-0 aspect-square w-[320%] rounded-full',
          isPrimary ? 'bg-ink dark:bg-white' : 'bg-accent',
        )}
        style={{
          left: `${fillOrigin.x}%`,
          top: `${fillOrigin.y}%`,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={false}
        animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: 'tween', duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }
        }
      />

      <motion.span
        className={cn(
          'relative z-10 inline-flex items-center gap-2 transition-colors duration-300',
          isPrimary ? 'group-hover:text-white dark:group-hover:text-ink' : 'group-hover:text-white',
        )}
        style={magnetic ? { x: labelX, y: labelY } : undefined}>
        {children}
        {icon && (
          <i
            className={cn(
              'bi transition-transform duration-300 group-hover:translate-x-1',
              icon,
            )}
            aria-hidden="true"
          />
        )}
      </motion.span>
    </Root>
  );
}
