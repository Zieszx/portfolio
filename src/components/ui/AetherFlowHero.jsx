import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn';

const CURSOR_RADIUS = 180;
const MAX_PARTICLES = 700;

/* Layered-sine pseudo-noise. Cheap, smooth, and slowly evolving in `t` — good
   enough for a flow field and avoids pulling in a noise dependency. */
function flowAngle(x, y, t) {
  const s = 0.0016;
  return (
    Math.sin(x * s + t * 0.25) * 1.2 +
    Math.cos(y * s * 1.3 - t * 0.19) * 1.1 +
    Math.sin((x + y) * s * 0.55 + t * 0.11) * 0.9
  ) * 1.15;
}

function spawn(particle, width, height) {
  particle.x = Math.random() * width;
  particle.y = Math.random() * height;
  particle.vx = 0;
  particle.vy = 0;
  particle.life = 40 + Math.random() * 160;
  // Accent teal (~191deg) drifting toward cyan and violet for depth.
  particle.hue = 178 + Math.random() * 95;
  return particle;
}

/**
 * AetherFlowHero — a cursor-interactive flowing-aether canvas backdrop with the
 * hero content composited on top. Wrap hero markup as `children`.
 */
export default function AetherFlowHero({ className, children }) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );

  // Re-read the `.dark` class whenever the theme toggle mutates <html>.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const trail = isDark ? 'rgba(4, 11, 20, 0.11)' : 'rgba(252, 253, 255, 0.13)';
    const wipe = isDark ? '#040b14' : '#fcfdff';
    const baseAlpha = isDark ? 0.5 : 0.34;
    const lightness = isDark ? 62 : 44;

    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;
    let time = 0;
    let running = false;
    let onScreen = true;
    let pageVisible = !document.hidden;

    // Pointer state, written by an rAF-throttled handler.
    const pointer = { x: -9999, y: -9999, active: false };
    let pointerFrame = 0;
    let rawX = -9999;
    let rawY = -9999;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = wipe;
      ctx.fillRect(0, 0, width, height);

      const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / 1600));
      particles = Array.from({ length: count }, () => spawn({}, width, height));
    };

    const step = () => {
      time += 0.006;

      // Translucent wash instead of clearRect: this is what makes the trails.
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = trail;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';
      ctx.lineCap = 'round';

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const angle = flowAngle(p.x, p.y, time);
        let ax = Math.cos(angle) * 0.14;
        let ay = Math.sin(angle) * 0.14;
        let glow = 0;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS && dist > 0.001) {
            const falloff = 1 - dist / CURSOR_RADIUS;
            const nx = dx / dist;
            const ny = dy / dist;
            // Radial push away from the cursor…
            ax += nx * falloff * 0.55;
            ay += ny * falloff * 0.55;
            // …plus a perpendicular component so the field curls around it.
            ax += -ny * falloff * 0.75;
            ay += nx * falloff * 0.75;
            glow = falloff;
          }
        }

        p.vx = (p.vx + ax) * 0.94;
        p.vy = (p.vy + ay) * 0.94;

        const px = p.x;
        const py = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        if (p.life <= 0 || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
          spawn(p, width, height);
          continue;
        }

        ctx.globalAlpha = Math.min(1, baseAlpha + glow * 0.5);
        ctx.strokeStyle = `hsl(${p.hue} 85% ${lightness + glow * 22}%)`;
        ctx.lineWidth = 0.9 + glow * 1.6;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frame = requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const syncRunning = () => {
      if (onScreen && pageVisible) start();
      else stop();
    };

    resize();

    if (reduceMotion) {
      // Static single frame: one pass of the field, then no loop at all.
      ctx.globalCompositeOperation = 'source-over';
      for (let pass = 0; pass < 60; pass += 1) {
        time += 0.006;
        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i];
          const angle = flowAngle(p.x, p.y, time);
          p.vx = (p.vx + Math.cos(angle) * 0.14) * 0.94;
          p.vy = (p.vy + Math.sin(angle) * 0.14) * 0.94;
          const px = p.x;
          const py = p.y;
          p.x += p.vx;
          p.y += p.vy;
          ctx.globalAlpha = baseAlpha * 0.5;
          ctx.strokeStyle = `hsl(${p.hue} 85% ${lightness}%)`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      return () => {};
    }

    const flushPointer = () => {
      pointerFrame = 0;
      const rect = canvas.getBoundingClientRect();
      pointer.x = rawX - rect.left;
      pointer.y = rawY - rect.top;
    };

    const onPointerMove = (event) => {
      rawX = event.clientX;
      rawY = event.clientY;
      pointer.active = true;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(flushPointer);
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibility = () => {
      pageVisible = !document.hidden;
      syncRunning();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        syncRunning();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    /* Listeners live on the container, not the canvas: hero content sits on top
       of the canvas and would otherwise swallow the pointer. */
    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    syncRunning();

    return () => {
      stop();
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [isDark, reduceMotion]);

  return (
    <div ref={containerRef} className={cn('relative isolate overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />
      {/* Soft vignette so hero copy stays legible over the brightest streaks. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-bg/45 dark:bg-bg-dark/45"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
