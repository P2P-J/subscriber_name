import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function SubscriberCard({
  index,
  value,
  onChange,
  isHighlighted = false,
  isWinner = false,
  ...rest
}) {
  const [editing, setEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => { setLocalValue(value) }, [value])

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const handleDoubleClick = () => setEditing(true)

  const handleBlur = () => {
    setEditing(false)
    if (localValue !== value) onChange?.(localValue)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.target.blur()
    if (e.key === 'Escape') { setLocalValue(value); setEditing(false) }
  }

  return (
    <div
      className={cn(
        'h-[42px] flex items-center justify-center',
        'transition-all duration-[150ms] ease-[var(--ease-default)]',
        'cursor-pointer select-none',
        'border border-[#E8B4BC]/40',

        // Default
        !isHighlighted && !isWinner && [
          'bg-white',
          'hover:bg-[#FDF5F3] hover:border-[#D282A6]/50',
        ],

        // Highlighted — bright pink, very visible
        isHighlighted && !isWinner && [
          'bg-[#FF6B9D] border-[#FF6B9D]',
          'shadow-[0_0_20px_rgba(255,107,157,0.5)]',
          'animate-pulse-glow',
          'scale-[1.05] z-[5]',
        ],

        // Winner
        isWinner && [
          'bg-gradient-to-br from-[#D282A6] to-[#FF6B9D]',
          'border-[#D282A6]',
          'shadow-[0_0_28px_rgba(255,107,157,0.5)]',
          'animate-winner scale-[1.08] z-10',
        ],
      )}
      onDoubleClick={handleDoubleClick}
      title="더블클릭하여 편집"
      {...rest}
    >
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-transparent text-center outline-none text-[#3A3238] font-medium text-[14px] px-1"
          maxLength={20}
        />
      ) : (
        <span className={cn(
          'truncate px-2 font-medium text-[14px] leading-none',
          isWinner || isHighlighted ? 'text-white' : 'text-[#3A3238]',
        )}>
          {localValue}
        </span>
      )}
    </div>
  )
}
