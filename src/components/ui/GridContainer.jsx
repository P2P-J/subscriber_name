import { cn } from '@/lib/utils'

export function GridContainer({ children, className, columns = 10 }) {
  return (
    <div
      className={cn('grid', className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {children}
    </div>
  )
}
