import { cn } from '../../lib/cn';

export function AnimatedGradientText({ children, className }) {
  return (
    <span
      className={cn(
        'inline-block bg-[linear-gradient(90deg,#00b4d8,#8b5cf6,#00b4d8)] bg-[length:200%_auto]',
        'bg-clip-text text-transparent animate-gradient-text font-semibold uppercase tracking-widest text-sm',
        className
      )}>
      {children}
    </span>
  );
}
