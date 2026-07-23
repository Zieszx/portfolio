import { useRef } from 'react';
import { cn } from '../../lib/cn';

export function MagicCard({ children, className, gradientColor = '#00b4d8', gradientSize = 220 }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn('relative overflow-hidden rounded-2xl', className)}
      style={{
        '--gradient-size': `${gradientSize}px`,
      }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [.group:hover_&]:opacity-100"
        style={{
          background: `radial-gradient(var(--gradient-size) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${gradientColor}33, transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
