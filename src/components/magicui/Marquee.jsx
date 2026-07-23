import { cn } from '../../lib/cn';

export function Marquee({ children, reverse = false, pauseOnHover = false, className, ...props }) {
  return (
    <div
      className={cn('group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]', className)}
      {...props}>
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]'
          )}
          aria-hidden={i === 1}>
          {children}
        </div>
      ))}
    </div>
  );
}
