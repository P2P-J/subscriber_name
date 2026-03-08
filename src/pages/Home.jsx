import { useState, useEffect, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'
import {
  Card,
  Button,
  Modal,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  SubscriberCard,
  GridContainer,
} from '@/components/ui'
import { useRandomDraw } from '@/hooks/useRandomDraw'
import { useSoundEffects } from '@/hooks/useSoundEffects'

const TOTAL = 1000
const STORAGE_KEY = 'subscriber-list-v1'

function loadSubscribers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return Array.from({ length: TOTAL }, (_, i) => String(i + 1))
}

export default function Home() {
  const [subscribers, setSubscribers] = useState(loadSubscribers)
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  const { isDrawing, highlightedIndex, winnerIndex, startDraw, reset } = useRandomDraw(TOTAL)
  const { playTick, playFanfare } = useSoundEffects()
  const prevHighlightRef = useRef(null)
  const gridRef = useRef(null)

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers))
  }, [subscribers])

  // Play tick on highlight change
  useEffect(() => {
    if (highlightedIndex !== null && highlightedIndex !== prevHighlightRef.current) {
      playTick()
    }
    prevHighlightRef.current = highlightedIndex
  }, [highlightedIndex, playTick])

  // Winner effect
  useEffect(() => {
    if (winnerIndex !== null) {
      playFanfare()
      const duration = 3000
      const end = Date.now() + duration
      const colors = ['#D282A6', '#FF6B9D', '#E8B4BC', '#6E4555']

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        })
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()

      setTimeout(() => setShowWinnerModal(true), 800)

      if (gridRef.current) {
        const winnerCard = gridRef.current.querySelector(`[data-index="${winnerIndex}"]`)
        if (winnerCard) {
          winnerCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
  }, [winnerIndex, playFanfare])

  const handleSubscriberChange = useCallback((idx, val) => {
    setSubscribers((prev) => {
      const next = [...prev]
      next[idx] = val
      return next
    })
  }, [])

  const closeModal = () => setShowWinnerModal(false)
  const handleDrawAgain = () => { closeModal(); reset() }

  return (
    <div className="min-h-screen bg-[#F5E3E0] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F5E3E0]/85 backdrop-blur-[12px] border-b border-[#E8B4BC]/30">
        <div className="max-w-[1200px] mx-auto px-6 h-[52px] flex items-center justify-center gap-6">
          <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-[#3A3238]">
            🎉 최초 구독자 1,000명 리스트 🎉
          </h1>
          <span className="text-[12px] text-[#9C7B88] hidden sm:inline">
            더블클릭하여 이름 입력
          </span>
          <a
            href="/components"
            className="text-[13px] font-medium text-[#D282A6] hover:text-[#C06E96] transition-colors"
          >
            컴포넌트 →
          </a>
        </div>
      </header>

      {/* Grid */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-8" ref={gridRef}>
        <Card padding="lg" className="mx-auto">
          <GridContainer>
            {subscribers.map((val, i) => (
              <SubscriberCard
                key={i}
                index={i + 1}
                value={val}
                onChange={(v) => handleSubscriberChange(i, v)}
                isHighlighted={highlightedIndex === i}
                isWinner={winnerIndex === i}
                data-index={i}
              />
            ))}
          </GridContainer>
        </Card>
      </main>

      {/* Bottom Draw Button */}
      <div className="sticky bottom-0 z-40 bg-[#F5E3E0]/85 backdrop-blur-[12px] border-t border-[#E8B4BC]/30">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-center">
          <Button
            size="xl"
            onClick={startDraw}
            disabled={isDrawing}
            className={isDrawing ? 'animate-pulse' : ''}
          >
            {isDrawing ? '🎰 추첨 중...' : '🎉 당첨자 뽑기'}
          </Button>
        </div>
      </div>

      {/* Winner Modal */}
      <Modal open={showWinnerModal} onClose={closeModal}>
        <div className="text-center py-2">
          <div className="text-[56px] mb-2 animate-confetti">🎊</div>
          <ModalTitle className="text-center text-[24px]">
            축하합니다!
          </ModalTitle>
          <ModalDescription className="text-center mt-3">
            <span className="block text-[13px] text-[#9C7B88] mb-1">
              #{winnerIndex !== null ? winnerIndex + 1 : ''}번
            </span>
            <span className="block text-[#3A3238] font-bold text-[28px] tracking-[-0.02em] mt-1">
              {winnerIndex !== null ? subscribers[winnerIndex] : ''}
            </span>
            <span className="block mt-2 text-[15px] text-[#6E4555]">님이 당첨되었습니다!</span>
          </ModalDescription>
          <ModalFooter className="justify-center gap-2 mt-6">
            <Button variant="secondary" onClick={handleDrawAgain}>
              다시 뽑기
            </Button>
            <Button onClick={closeModal}>
              확인
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  )
}
