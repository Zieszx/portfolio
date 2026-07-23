import { cn } from '../../lib/cn';

export function BorderBeam({ className, size = 200, duration = 12, colorFrom = '#00b4d8', colorTo = '#8b5cf6' }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]', className)}
      style={{
        '--size': `${size}px`,
        '--duration': `${duration}s`,
        '--color-from': colorFrom,
        '--color-to': colorTo,
        maskImage: 'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}>
      <div
        className="absolute aspect-square animate-border-beam"
        style={{
          width: 'var(--size)',
          background: 'linear-gradient(to left, var(--color-from), var(--color-to), transparent)',
          offsetPath: 'rect(0 auto auto 0 round var(--size))',
        }}
      />
    </div>
  );
}
