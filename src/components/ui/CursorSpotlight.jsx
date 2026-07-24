import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn';

const SPRING = { damping: 30, stiffness: 120, mass: 0.6 };
const ACCENT = '#00b4d8';
const MotionDiv = motion.div;

/**
 * CursorSpotlight — a soft radial accent glow that trails the pointer.
 *
 * Two stacked gradient layers are toggled by the `dark:` variant instead of
 * reading the theme in JS: `multiply` at low opacity keeps the light theme from
 * washing out, `screen` gives the dark theme a lift. Cheaper and always in sync
 * with the `.dark` class on <html>.
 */
export default function CursorSpotlight({ className, size = 520, color = ACCENT }) {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  const x = useMotionValue(-size);
  const y = useMotionValue(-size);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  // Coarse pointers (touch) and reduced-motion users get nothing at all.
  useEffect(() => {
    if (reduceMotion) {
      setEnabled(false);
      return;
    }
    const mq = window.matchMedia('(pointer: coarse)');
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let px = 0;
    let py = 0;

    const flush = () => {
      frame = 0;
      // Motion values carry the top-left corner, hence the half-size offset.
      x.set(px - size / 2);
      y.set(py - size / 2);
    };

    const show = (next) => {
      if (visibleRef.current === next) return;
      visibleRef.current = next;
      setVisible(next);
    };

    const onMove = (event) => {
      px = event.clientX;
      py = event.clientY;
      if (!frame) frame = requestAnimationFrame(flush);
      show(true);
    };

    const onLeave = () => show(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, [enabled, size, x, y]);

  if (!enabled) return null;

  const gradient = (alpha) =>
    `radial-gradient(circle at center, color-mix(in srgb, ${color} ${alpha}%, transparent) 0%, transparent 70%)`;

  return (
    <MotionDiv
      aria-hidden="true"
      style={{ x: sx, y: sy, width: size, height: size }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      /* z-0: the spotlight sits at the floor of whatever stacking context hosts
         it, so page content (z-10 and up) always paints above the glow. */
      className={cn('pointer-events-none fixed left-0 top-0 z-0', className)}
    >
      {/* Light theme: multiply keeps the tint readable on white. */}
      <div
        className="absolute inset-0 mix-blend-multiply opacity-40 dark:hidden"
        style={{ background: gradient(55) }}
      />
      {/* Dark theme: screen lifts the glow out of the near-black background. */}
      <div
        className="absolute inset-0 hidden mix-blend-screen opacity-70 dark:block"
        style={{ background: gradient(75) }}
      />
    </MotionDiv>
  );
}
