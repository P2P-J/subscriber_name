import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

/**
 * Subscriber card — Linear-style.
 * Clean white card, clear highlight on draw, bold winner state.
 */
export function SubscriberCard({
  index,
  value,
  onChange,
  isHighlighted = false,
  isWinner = false,
  size = 'md',
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

  const sizeStyles = {
    sm: 'w-[68px] h-[34px] text-[11px]',
    md: 'w-[92px] h-[40px] text-[12px]',
    lg: 'w-[120px] h-[50px] text-[13px]',
  }

  return (
    <div
      className={cn(
        sizeStyles[size],
        'relative rounded-[8px] flex items-center justify-center',
        'transition-all duration-[150ms] ease-[var(--ease-default)]',
        'cursor-pointer select-none',

        // Default
        !isHighlighted && !isWinner && [
          'bg-white border border-[#E8B4BC]/25',
          'shadow-[var(--shadow-sm)]',
          'hover:border-[#D282A6]/40 hover:shadow-[var(--shadow-base)]',
        ],

        // Highlighted — bright and very visible
        isHighlighted && !isWinner && [
          'bg-[#FF6B9D] border-[#FF6B9D]',
          'shadow-[0_0_20px_rgba(255,107,157,0.5),0_0_4px_rgba(255,107,157,0.3)]',
          'animate-pulse-glow',
          'scale-105',
        ],

        // Winner
        isWinner && [
          'bg-gradient-to-br from-[#D282A6] to-[#FF6B9D]',
          'border-2 border-white',
          'shadow-[0_0_30px_rgba(255,107,157,0.5),0_4px_16px_rgba(210,130,166,0.3)]',
          'animate-winner scale-110 z-10',
        ],
      )}
      onDoubleClick={handleDoubleClick}
      title="더블클릭하여 편집"
      {...rest}
    >
      {/* Number badge */}
      <span className={cn(
        'absolute -top-[6px] -left-[6px] text-[9px] font-semibold rounded-full',
        'w-[18px] h-[18px] flex items-center justify-center leading-none',
        isWinner
          ? 'bg-[#3A3238] text-white'
          : isHighlighted
            ? 'bg-white text-[#FF6B9D]'
            : 'bg-[#6E4555] text-white',
      )}>
        {index}
      </span>

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full h-full bg-transparent text-center outline-none',
            'text-[#3A3238] font-medium',
          )}
          maxLength={20}
        />
      ) : (
        <span className={cn(
          'truncate px-1 font-medium leading-none',
          isWinner || isHighlighted ? 'text-white' : 'text-[#3A3238]',
        )}>
          {localValue}
        </span>
      )}
    </div>
  )
}
