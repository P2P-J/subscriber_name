import { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  Button,
  Modal,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  SubscriberCard,
  GridContainer,
} from "@/components/ui";
import { useRandomDraw } from "@/hooks/useRandomDraw";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { cn } from "@/lib/utils";

const TOTAL = 1000;
const STORAGE_KEY = "subscriber-list-v1";

function loadSubscribers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return Array.from({ length: TOTAL }, (_, i) => String(i + 1));
}

export default function Home() {
  const [subscribers, setSubscribers] = useState(loadSubscribers);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const { isDrawing, highlightedIndex, winnerIndex, startDraw, reset } =
    useRandomDraw(TOTAL);
  const { playTick, playFanfare } = useSoundEffects();
  const prevHighlightRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    if (
      highlightedIndex !== null &&
      highlightedIndex !== prevHighlightRef.current
    ) {
      playTick();
    }
    prevHighlightRef.current = highlightedIndex;
  }, [highlightedIndex, playTick]);

  useEffect(() => {
    if (winnerIndex !== null) {
      playFanfare();
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ["#D282A6", "#FF6B9D", "#E8B4BC", "#6E4555"];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();

      setTimeout(() => setShowWinnerModal(true), 800);

      if (gridRef.current) {
        const winnerCard = gridRef.current.querySelector(
          `[data-index="${winnerIndex}"]`,
        );
        if (winnerCard) {
          winnerCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [winnerIndex, playFanfare]);

  const handleSubscriberChange = useCallback((idx, val) => {
    setSubscribers((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  }, []);

  const closeModal = () => setShowWinnerModal(false);
  const handleDrawAgain = () => {
    closeModal();
    reset();
  };

  return (
    <div className="min-h-screen bg-[#F5E3E0] flex flex-col items-center">
      {/* Header */}
      <header
        className="w-full bg-[#F5E3E0]"
        style={{ paddingTop: 60, paddingBottom: 32 }}
      >
        <div className="text-center px-4">
          <h1 className="text-[40px] md:text-[52px] font-extrabold tracking-[-0.02em] text-[#3A3238] leading-[1.15]">
            🎉 최초 구독자 1,000 명 리스트 🎉
          </h1>
          <p className="text-[15px] text-[#9C7B88] mt-4">
            더블 클릭하여 이름을 수정할 수 있습니다.
          </p>
        </div>
      </header>

      {/* Grid */}
      <div
        className="w-full max-w-[1100px] mx-auto px-6"
        style={{ marginBottom: 64 }}
      >
        <div className="rounded-[16px] border-2 border-[#E8B4BC]/60 bg-[#FDF5F3] p-5 shadow-[0_2px_16px_rgba(210,130,166,0.1)]">
          <div
            ref={gridRef}
            className="rounded-[12px] subscriber-scroll overflow-y-auto"
            style={{ maxHeight: 1008 }}
          >
            <GridContainer columns={10} className="subscriber-grid">
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
          </div>
        </div>
      </div>

      {/* Draw Button */}
      <div className="pb-20">
        <button
          onClick={startDraw}
          disabled={isDrawing}
          className={cn(
            "h-[72px] px-24 rounded-[16px]",
            "text-[20px] font-bold tracking-[-0.01em]",
            "bg-[#D282A6] text-white",
            "shadow-[0_4px_16px_rgba(210,130,166,0.3)]",
            "hover:bg-[#C474A0] hover:shadow-[0_6px_24px_rgba(210,130,166,0.4)]",
            "active:scale-[0.97] active:bg-[#B8689A]",
            "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
            "cursor-pointer",
            isDrawing && "animate-pulse",
          )}
        >
          {isDrawing ? "추첨 중... 🎰" : "행운의 당첨자 뽑기 🎁"}
        </button>
      </div>

      {/* Component demo link */}
      <a
        href="/components"
        className="fixed bottom-4 right-4 text-[12px] text-[#D282A6] hover:text-[#C06E96] transition-colors opacity-60 hover:opacity-100"
      >
        컴포넌트 데모 →
      </a>

      {/* Winner Modal */}
      <Modal open={showWinnerModal} onClose={closeModal}>
        <div className="text-center py-2">
          <div className="text-[56px] animate-confetti mb-3">🎊</div>
          <ModalTitle className="text-center text-[24px]">
            축하합니다!
          </ModalTitle>
          <ModalDescription className="text-center">
            <span className="block text-[13px] text-[#9C7B88] mb-1">
              #{winnerIndex !== null ? winnerIndex + 1 : ""}번
            </span>
            <span className="block text-[#3A3238] font-bold text-[28px] tracking-[-0.02em] mt-1">
              {winnerIndex !== null ? subscribers[winnerIndex] : ""}
            </span>
            <span className="block text-[15px] text-[#6E4555] mt-2">
              님이 당첨되었습니다!
            </span>
          </ModalDescription>
          <ModalFooter
            className="justify-center"
            style={{ marginTop: 32, gap: 16 }}
          >
            <button
              onClick={handleDrawAgain}
              style={{
                height: 56,
                padding: "0 36px",
                fontSize: 17,
                borderRadius: 12,
                minWidth: 140,
              }}
              className="inline-flex items-center justify-center font-semibold bg-white text-[#3A3238] border border-[#E8B4BC]/40 hover:bg-[#F5E3E0] shadow-[0_1px_3px_rgba(58,50,56,0.08)] cursor-pointer active:scale-[0.97] transition-all"
            >
              다시 뽑기
            </button>
            <button
              onClick={closeModal}
              style={{
                height: 56,
                padding: "0 36px",
                fontSize: 17,
                borderRadius: 12,
                minWidth: 140,
              }}
              className="inline-flex items-center justify-center font-semibold bg-[#D282A6] text-white hover:bg-[#C06E96] shadow-[0_1px_3px_rgba(58,50,56,0.15)] cursor-pointer active:scale-[0.97] transition-all"
            >
              확인
            </button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
}
