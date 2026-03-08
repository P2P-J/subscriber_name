import { cn } from '@/lib/utils'

/**
 * Table-like grid: cells share borders (no double borders).
 * Outer container provides the rounded border.
 */
export function GridContainer({ children, className, columns = 10 }) {
  return (
    <div
      className={cn(
        'grid overflow-hidden rounded-[12px]',
        'border border-[#D8A5B2]',
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {children}
    </div>
  )
}
