import { cn } from '@/lib/utils'

/**
 * Linear-style card with border + shadow system.
 * Replaces GlassCard — no glassmorphism, clean solid cards.
 */
export function Card({ children, className, padding = 'md', hover = false, ...props }) {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  }

  return (
    <div
      className={cn(
        'bg-white rounded-[10px]',
        'border border-[#E8B4BC]/30',
        'shadow-[var(--shadow-card)]',
        'transition-all duration-[150ms]',
        hover && 'hover:shadow-[var(--shadow-card-hover)] hover:border-[#E8B4BC]/50',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
