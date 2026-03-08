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
        'h-[40px] flex items-center justify-center',
        'transition-all duration-[150ms]',
        'cursor-pointer select-none',
        // Shared border trick: right and bottom only, first-col gets left, first-row gets top
        // Handled by the grid wrapper instead — here just bg + text

        // Default
        !isHighlighted && !isWinner && [
          'bg-white',
          'hover:bg-[#FDF5F3]',
        ],

        // Highlighted
        isHighlighted && !isWinner && [
          'bg-[#FF6B9D] relative z-[5]',
          'shadow-[0_0_16px_rgba(255,107,157,0.5)]',
          'animate-pulse-glow',
        ],

        // Winner
        isWinner && [
          'bg-gradient-to-br from-[#D282A6] to-[#FF6B9D] relative z-10',
          'shadow-[0_0_24px_rgba(255,107,157,0.5)]',
          'animate-winner',
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
