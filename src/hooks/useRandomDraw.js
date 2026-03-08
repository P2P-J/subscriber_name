import { useState, useRef, useCallback } from 'react'

export function useRandomDraw(totalCount) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const [winnerIndex, setWinnerIndex] = useState(null)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const startDraw = useCallback(() => {
    if (isDrawing) return

    setIsDrawing(true)
    setWinnerIndex(null)
    setHighlightedIndex(null)

    const duration = 5000 + Math.random() * 5000 // 5~10 seconds
    const startTime = Date.now()
    let currentSpeed = 50 // Start fast

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = elapsed / duration

      if (progress >= 1) {
        // Pick winner
        const winner = Math.floor(Math.random() * totalCount)
        setHighlightedIndex(null)
        setWinnerIndex(winner)
        setIsDrawing(false)
        return
      }

      // Random highlight
      const randomIdx = Math.floor(Math.random() * totalCount)
      setHighlightedIndex(randomIdx)

      // Slow down as we progress (easing)
      currentSpeed = 50 + Math.pow(progress, 2.5) * 500

      timeoutRef.current = setTimeout(tick, currentSpeed)
    }

    tick()
  }, [isDrawing, totalCount])

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsDrawing(false)
    setHighlightedIndex(null)
    setWinnerIndex(null)
  }, [])

  return {
    isDrawing,
    highlightedIndex,
    winnerIndex,
    startDraw,
    reset,
  }
}
