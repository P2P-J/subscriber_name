import { cn } from '@/lib/utils'

export function SectionTitle({ children, subtitle, label, className }) {
  return (
    <div className={cn('mb-6 text-center', className)}>
      {label && (
        <span className="block text-[11px] font-medium tracking-[0.06em] uppercase text-[#9C7B88] mb-1.5">
          {label}
        </span>
      )}
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#3A3238] leading-[1.2]">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-1 text-[14px] text-[#6E4555]/70 leading-[1.5]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
