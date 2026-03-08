import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Linear-style modal.
 * Clean card overlay, subtle backdrop blur.
 */
export function Modal({ open, onClose, children, className }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && open) onClose?.()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose?.()
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#3A3238]/50 backdrop-blur-[8px]" />

      {/* Content */}
      <div
        className={cn(
          'relative bg-white rounded-[12px] p-6',
          'border border-[#E8B4BC]/30',
          'shadow-[0_24px_80px_rgba(58,50,56,0.25),0_0_0_1px_rgba(210,130,166,0.1)]',
          'max-w-[420px] w-full',
          'animate-modal-enter',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function ModalTitle({ children, className }) {
  return (
    <h2 className={cn(
      'text-[20px] font-semibold text-[#3A3238] tracking-[-0.02em] leading-[1.2]',
      className
    )}>
      {children}
    </h2>
  )
}

export function ModalDescription({ children, className }) {
  return (
    <div className={cn('text-[15px] text-[#6E4555] leading-[1.65] mt-2', className)}>
      {children}
    </div>
  )
}

export function ModalFooter({ children, className }) {
  return (
    <div className={cn('flex gap-2 justify-end mt-6', className)}>
      {children}
    </div>
  )
}
