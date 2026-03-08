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
        'w-[110px] h-[48px]',
        'relative rounded-[8px] flex items-center justify-center',
        'transition-all duration-[150ms] ease-[var(--ease-default)]',
        'cursor-pointer select-none',

        // Default
        !isHighlighted && !isWinner && [
          'bg-white border border-[#E8B4BC]/25',
          'shadow-[0_1px_3px_rgba(58,50,56,0.06)]',
          'hover:border-[#D282A6]/40 hover:shadow-[0_2px_8px_rgba(58,50,56,0.1)]',
        ],

        // Highlighted — bright pink, very visible
        isHighlighted && !isWinner && [
          'bg-[#FF6B9D] border-[2px] border-white',
          'shadow-[0_0_24px_rgba(255,107,157,0.6),0_0_6px_rgba(255,107,157,0.4)]',
          'animate-pulse-glow',
          'scale-[1.08]',
        ],

        // Winner
        isWinner && [
          'bg-gradient-to-br from-[#D282A6] to-[#FF6B9D]',
          'border-2 border-white',
          'shadow-[0_0_32px_rgba(255,107,157,0.5),0_4px_16px_rgba(210,130,166,0.3)]',
          'animate-winner scale-[1.12] z-10',
        ],
      )}
      onDoubleClick={handleDoubleClick}
      title="더블클릭하여 편집"
      {...rest}
    >
      {/* Number badge */}
      <span className={cn(
        'absolute -top-[7px] -left-[7px] text-[9px] font-bold rounded-full',
        'w-[20px] h-[20px] flex items-center justify-center leading-none',
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
          className="w-full h-full bg-transparent text-center outline-none text-[#3A3238] font-medium text-[13px]"
          maxLength={20}
        />
      ) : (
        <span className={cn(
          'truncate px-2 font-medium text-[13px] leading-none',
          isWinner || isHighlighted ? 'text-white' : 'text-[#3A3238]',
        )}>
          {localValue}
        </span>
      )}
    </div>
  )
}
