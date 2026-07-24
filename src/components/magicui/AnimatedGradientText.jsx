import { cn } from '../../lib/cn';

export function AnimatedGradientText({ children, className }) {
  return (
    <span
      className={cn(
        'inline-block bg-[linear-gradient(90deg,#00b4d8,#8b5cf6,#00b4d8)] bg-[length:200%_auto]',
        /* `gradient-text-sweep` animates on hover only — see src/index.css. */
        'bg-clip-text text-transparent gradient-text-sweep font-semibold uppercase tracking-widest text-sm',
        className
      )}>
      {children}
    </span>
  );
}
