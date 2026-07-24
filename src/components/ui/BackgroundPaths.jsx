import { useEffect, useMemo, useState } from 'react';
import { cn } from '../../lib/cn';

/* 12 arcs per mirrored set (24 total, down from 72). Fewer + thicker reads as a
   deliberate ambient current rather than a noisy bundle. */
const PATHS_PER_SET = 12;
const ACCENT = '#00b4d8';

/* Deterministic 0..1 jitter so paths differ per index without Math.random()
   (which would resample on every re-render and desync the field). */
function jitter(index, salt) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

/* One mirrored set of sweeping bezier arcs. `position` is 1 or -1 and flips the
   horizontal offset so the two sets nest into each other like a braided current. */
function buildSet(position) {
  return Array.from({ length: PATHS_PER_SET }, (_, i) => {
    const shift = i * 16 * position;
    const rise = i * 19;
    const d =
      `M-${380 - shift} -${189 + rise}` +
      `C-${380 - shift} -${189 + rise} -${312 - shift} ${216 - rise} ${152 - shift} ${343 - rise}` +
      `C${616 - shift} ${470 - rise} ${684 - shift} ${875 - rise} ${684 - shift} ${875 - rise}`;

    return {
      id: `${position}-${i}`,
      d,
      width: 1 + i * 0.14,
      strokeOpacity: 0.36 + i * 0.05,
      // Roughly every third curve picks up the accent teal for a shimmer.
      accent: i % 3 === 1,
      // Where the dash gap falls on this particular curve — staggering it stops
      // the 12 arcs from breaking at the same place and reading as a grid.
      dashOffset: jitter(i, position).toFixed(3),
    };
  });
}

/**
 * BackgroundPaths — a full-bleed field of drifting bezier "floating paths".
 *
 * Performance note: the arcs themselves are *static* geometry. Motion comes from
 * two CSS keyframe animations that touch nothing but `transform` and `opacity`
 * on the two <svg> layers, so Chromium rasterises the field once and then moves
 * it on the compositor. The previous implementation tweened `pathLength` /
 * `pathOffset` on 72 motion.path elements, which cost main-thread script *and*
 * a full-layer re-raster on every single frame, forever, on every route.
 *
 * `pathLength="1"` normalises every curve so one dash pattern reads identically
 * across all of them regardless of their real length.
 *
 * Reduced motion is handled entirely in CSS (static, solid arcs). The tab
 * visibility gate pauses the layers outright when the page is backgrounded.
 */
export default function BackgroundPaths({ className, opacity = 1 }) {
  const sets = useMemo(() => [buildSet(1), buildSet(-1)], []);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const sync = () => setHidden(document.visibilityState === 'hidden');
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ opacity }}
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        /* Light mode needs noticeably more ink than dark needs white before the
           strokes read at all against #ffffff. */
        'text-ink/42 dark:text-white/32',
        hidden && 'pathfield-paused',
        className,
      )}
    >
      {sets.map((paths, setIndex) => (
        /* The animation lives on a plain <div>, not on the <svg>: Chromium will
           not hand an SVG root its own composited layer, so animating the svg
           directly re-rasterises the field every frame. Wrapped like this the
           transform/opacity pair stays on the compositor.
           Oversized by 8% on every side so the drift never walks an edge in. */
        <div
          key={setIndex}
          className={cn(
            'absolute -inset-[8%] pathfield-layer',
            setIndex === 0 ? 'pathfield-layer-a' : 'pathfield-layer-b',
          )}
        >
          {/* The arcs cluster in the left ~45% of the natural 696-wide box, which
              on desktop would land almost entirely behind the 288px sidebar.
              Cropping the viewBox to 387 and letting preserveAspectRatio="none"
              stretch it fans them across the content column — the same result the
              old `scale-x-[1.8]` gave, without an ancestor transform. */}
          <svg viewBox="0 0 387 316" preserveAspectRatio="none" fill="none" className="h-full w-full">
            {paths.map((path) => (
              <path
                key={path.id}
                className="pathfield-arc"
                d={path.d}
                pathLength="1"
                strokeDashoffset={path.dashOffset}
                stroke={path.accent ? ACCENT : 'currentColor'}
                strokeWidth={path.width}
                strokeOpacity={path.strokeOpacity}
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>
      ))}
    </div>
  );
}
