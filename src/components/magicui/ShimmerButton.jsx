import { cn } from '../../lib/cn';

export function ShimmerButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3',
        'bg-accent text-white font-medium transition-transform hover:-translate-y-0.5',
        'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r',
        'before:from-transparent before:via-white/40 before:to-transparent',
        'hover:before:translate-x-full before:transition-transform before:duration-700',
        className
      )}
      {...props}>
      {children}
    </button>
  );
}
