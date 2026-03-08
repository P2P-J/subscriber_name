import { cn } from '@/lib/utils'

export function GridContainer({ children, className }) {
  return (
    <div
      className={cn(
        'grid gap-[10px] justify-center mx-auto',
        className
      )}
      style={{
        gridTemplateColumns: 'repeat(auto-fill, 110px)',
        maxWidth: '100%',
      }}
    >
      {children}
    </div>
  )
}
