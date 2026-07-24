import { useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { cn } from '../../lib/cn';

/* ESLint here is not JSX-aware, so `motion.x` used only inside JSX reads as an
   unused import. Aliasing to capitalized consts matches the project's workaround. */
const MotionSpan = motion.span;
const MotionDiv = motion.div;

/* Wrap `value` into the half-open range [min, max) — used to loop the marquee. */
function wrap(min, max, value) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

/* One word of a ScrollReveal. Each word owns its own useTransform, which is why
   this has to be a component rather than a loop inside the parent (hook rules). */
function RevealWord({ progress, start, end, children }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);
  const blur = useTransform(progress, [start, end], [6, 0]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <MotionSpan style={{ opacity, y, filter }} className="inline-block will-change-[opacity,filter]">
      {children}
    </MotionSpan>
  );
}

/**
 * ScrollReveal — reveals a string word-by-word as it travels up the viewport.
 * `children` must be a string; `as` picks the wrapper element ('p', 'h2', ...).
 * Sizing/colour is entirely up to the caller via `className`.
 */
export default function ScrollReveal({ children, className, as = 'p' }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  });

  /* A scroll-driven reveal only makes sense for copy the reader scrolls *down* to.
     Text that is already on screen at first paint would otherwise sit at opacity
     0.12 + blur until the user happens to scroll — which reads as a broken render,
     not as an effect. So we measure once on mount and opt above-the-fold copy out
     of the animation entirely. Starting at `true` keeps the very first paint fully
     legible; below-the-fold text flips to animated before it can be seen. */
  const [staticText, setStaticText] = useState(true);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { top } = el.getBoundingClientRect();
    setStaticText(top < window.innerHeight * 0.9);
  }, []);

  const text = typeof children === 'string' ? children : String(children ?? '');
  const words = text.split(/\s+/).filter(Boolean);
  const Wrapper = as;

  if (reduceMotion || staticText) {
    return (
      <Wrapper ref={ref} className={className}>
        {text}
      </Wrapper>
    );
  }

  return (
    <Wrapper ref={ref} className={cn('flex flex-wrap', className)}>
      {words.map((word, index) => {
        // Each word gets a slice of the progress range, overlapping slightly
        // with its neighbours so the reveal reads as a wave, not a stutter.
        const start = index / words.length;
        const end = Math.min(1, start + 1.6 / words.length);

        return (
          <span key={`${word}-${index}`} className="relative mr-[0.25em] inline-block">
            <RevealWord progress={scrollYProgress} start={start} end={end}>
              {word}
            </RevealWord>
          </span>
        );
      })}
    </Wrapper>
  );
}

/**
 * ScrollVelocityText — a seamless marquee whose speed and direction are pushed
 * around by how fast (and which way) the page is being scrolled.
 * `baseVelocity` is the idle speed in percent-of-a-copy per second.
 */
export function ScrollVelocityText({ children, baseVelocity = 3, className }) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Scroll speed maps to a multiplier; clamp: false lets fast flicks overshoot.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Four copies are rendered, so one copy is 25% of the track — wrapping the
  // offset between -25% and 0% makes the loop seamless.
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);
  const directionRef = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;

    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();

    // Scrolling backwards flips the marquee direction.
    if (factor < 0) {
      directionRef.current = -1;
    } else if (factor > 0) {
      directionRef.current = 1;
    }

    moveBy += moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  if (reduceMotion) {
    return (
      <div className={cn('overflow-hidden whitespace-nowrap', className)}>
        <span>{children}</span>
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <MotionDiv className="flex w-max flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="block pr-[0.5em]" aria-hidden={copy > 0 ? 'true' : undefined}>
            {children}
          </span>
        ))}
      </MotionDiv>
    </div>
  );
}

export { ScrollReveal };
