import { cn } from '@/lib/utils'

/**
 * Responsive auto-fill grid.
 * Centers content with justify-center for balanced layout.
 */
export function GridContainer({
  children,
  className,
  minColWidth = '92px',
  gap = 'gap-3',
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap justify-center',
        gap,
        className
      )}
    >
      {children}
    </div>
  )
}
