import { cn } from '@/lib/utils'

/**
 * Linear-style button.
 * Tight padding, small radius, crisp font.
 */
const variants = {
  primary:
    'bg-[#D282A6] text-white hover:bg-[#C06E96] ' +
    'shadow-[0_1px_2px_rgba(58,50,56,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]',
  secondary:
    'bg-white text-[#3A3238] border border-[#E8B4BC]/40 ' +
    'hover:bg-[#F5E3E0] hover:border-[#E8B4BC]/60 ' +
    'shadow-[var(--shadow-sm)]',
  ghost:
    'bg-transparent text-[#6E4555] ' +
    'hover:bg-[#D282A6]/8',
  danger:
    'bg-[#EB5757] text-white hover:bg-[#D94444] ' +
    'shadow-[0_1px_2px_rgba(235,87,87,0.2)]',
}

const sizes = {
  sm: 'h-[30px] px-[10px] text-[13px] rounded-[6px] gap-1.5',
  md: 'h-[34px] px-[14px] text-[14px] rounded-[6px] gap-2',
  lg: 'h-[40px] px-[18px] text-[15px] rounded-[8px] gap-2',
  xl: 'h-[48px] px-[24px] text-[16px] rounded-[10px] gap-2.5 font-semibold',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        'font-medium tracking-[-0.01em]',
        'transition-all duration-[150ms] ease-[var(--ease-default)]',
        'cursor-pointer select-none whitespace-nowrap',
        'active:scale-[0.98]',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D282A6]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
