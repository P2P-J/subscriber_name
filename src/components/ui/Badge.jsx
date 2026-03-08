import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-[#D282A6]/10 text-[#D282A6]',
  accent:  'bg-[#D282A6] text-white',
  muted:   'bg-[#6E4555]/8 text-[#6E4555]',
  success: 'bg-[#26BD67]/12 text-[#26BD67]',
  warning: 'bg-[#F2994A]/12 text-[#F2994A]',
  error:   'bg-[#EB5757]/12 text-[#EB5757]',
}

export function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[4px] px-[6px] py-[2px]',
        'text-[11px] font-medium leading-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
