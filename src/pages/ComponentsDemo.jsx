import { useState } from 'react'
import {
  Card,
  Button,
  Modal,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  SubscriberCard,
  GridContainer,
  SectionTitle,
  Badge,
} from '@/components/ui'

export default function ComponentsDemo() {
  const [modalOpen, setModalOpen] = useState(false)
  const [subscribers, setSubscribers] = useState(
    Array.from({ length: 20 }, (_, i) => String(i + 1))
  )
  const [highlightedIdx, setHighlightedIdx] = useState(null)
  const [winnerIdx, setWinnerIdx] = useState(null)

  const handleSubscriberChange = (idx, val) => {
    setSubscribers((prev) => {
      const next = [...prev]
      next[idx] = val
      return next
    })
  }

  const demoHighlight = () => {
    setWinnerIdx(null)
    let i = 0
    const interval = setInterval(() => {
      setHighlightedIdx(i % 20)
      i++
      if (i > 30) {
        clearInterval(interval)
        const winner = Math.floor(Math.random() * 20)
        setHighlightedIdx(null)
        setWinnerIdx(winner)
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-[#F5E3E0]">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1 text-[13px] text-[#6E4555] hover:text-[#D282A6] transition-colors mb-6"
          >
            ← 메인으로
          </a>
          <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#3A3238] leading-[1.1]">
            컴포넌트 데모
          </h1>
          <p className="mt-2 text-[15px] text-[#6E4555]/70 leading-[1.65]">
            프로젝트 전반에서 재사용되는 UI 컴포넌트 라이브러리
          </p>
          <div className="mt-6 h-[1px] bg-[#E8B4BC]/40" />
        </div>

        {/* ===== Colors ===== */}
        <section className="mb-12 animate-fade-in">
          <SectionTitle label="Foundation" subtitle="프로젝트 컬러 팔레트">
            컬러 시스템
          </SectionTitle>
          <Card padding="lg">
            <div className="flex flex-wrap gap-5 justify-center">
              {[
                { hex: '#F5E3E0', name: 'Surface', desc: '배경' },
                { hex: '#E8B4BC', name: 'Accent Light', desc: '보조 강조' },
                { hex: '#D282A6', name: 'Accent', desc: '주요 액센트' },
                { hex: '#6E4555', name: 'Deep', desc: '텍스트 보조' },
                { hex: '#3A3238', name: 'Dark', desc: '텍스트 주요' },
                { hex: '#FF6B9D', name: 'Highlight', desc: '추첨 하이라이트' },
              ].map((c) => (
                <div key={c.hex} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 rounded-[10px] border border-[#E8B4BC]/30 shadow-[var(--shadow-base)]"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[12px] font-medium text-[#3A3238]">{c.name}</span>
                  <span className="text-[11px] text-[#6E4555]/50 font-mono">{c.hex}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ===== Card ===== */}
        <section className="mb-12 animate-fade-in">
          <SectionTitle label="Layout" subtitle="콘텐츠 래퍼 카드">
            Card
          </SectionTitle>
          <div className="flex flex-wrap gap-4 justify-center">
            {['sm', 'md', 'lg'].map((pad) => (
              <Card key={pad} padding={pad} hover className="min-w-[180px]">
                <p className="text-[13px] text-[#6E4555]">
                  padding: <span className="text-[#3A3238] font-semibold">{pad}</span>
                </p>
                <p className="text-[11px] text-[#9C7B88] mt-1">Hover to see shadow</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ===== Button ===== */}
        <section className="mb-12 animate-fade-in">
          <SectionTitle label="Actions" subtitle="Linear 스타일 버튼">
            Button
          </SectionTitle>
          <Card padding="lg">
            <div className="space-y-5">
              <div>
                <span className="block text-[11px] font-medium tracking-[0.06em] uppercase text-[#9C7B88] mb-3 text-center">
                  Variants
                </span>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
              <div className="h-[1px] bg-[#E8B4BC]/20" />
              <div>
                <span className="block text-[11px] font-medium tracking-[0.06em] uppercase text-[#9C7B88] mb-3 text-center">
                  Sizes
                </span>
                <div className="flex flex-wrap items-center gap-3 justify-center">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ===== Badge ===== */}
        <section className="mb-12 animate-fade-in">
          <SectionTitle label="Data Display" subtitle="상태 표시 뱃지">
            Badge
          </SectionTitle>
          <Card padding="md">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge>Default</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="muted">Muted</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </Card>
        </section>

        {/* ===== Modal ===== */}
        <section className="mb-12 animate-fade-in">
          <SectionTitle label="Overlay" subtitle="당첨자 발표 등에 사용되는 모달">
            Modal
          </SectionTitle>
          <div className="flex justify-center">
            <Button onClick={() => setModalOpen(true)}>모달 열기</Button>
          </div>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="text-center">
              <div className="text-[48px] mb-3">🎉</div>
              <ModalTitle className="text-center">축하합니다!</ModalTitle>
              <ModalDescription className="text-center">
                당첨자: <span className="text-[#3A3238] font-bold">홍길동</span>님이 선정되었습니다!
              </ModalDescription>
              <ModalFooter className="justify-center">
                <Button variant="secondary" onClick={() => setModalOpen(false)}>닫기</Button>
                <Button onClick={() => setModalOpen(false)}>확인</Button>
              </ModalFooter>
            </div>
          </Modal>
        </section>

        {/* ===== SubscriberCard ===== */}
        <section className="mb-12 animate-fade-in">
          <SectionTitle label="Core" subtitle="더블클릭하여 편집 가능한 구독자 카드">
            SubscriberCard
          </SectionTitle>
          <Card padding="lg">
            <div className="space-y-5">
              <div>
                <span className="block text-[11px] font-medium tracking-[0.06em] uppercase text-[#9C7B88] mb-3 text-center">
                  States
                </span>
                <div className="flex flex-wrap gap-5 items-end justify-center">
                  <div className="text-center">
                    <SubscriberCard index={1} value="기본" onChange={() => {}} />
                    <p className="text-[11px] text-[#9C7B88] mt-2">Default</p>
                  </div>
                  <div className="text-center">
                    <SubscriberCard index={2} value="하이라이트" isHighlighted onChange={() => {}} />
                    <p className="text-[11px] text-[#9C7B88] mt-2">Highlighted</p>
                  </div>
                  <div className="text-center">
                    <SubscriberCard index={3} value="당첨!" isWinner onChange={() => {}} />
                    <p className="text-[11px] text-[#9C7B88] mt-2">Winner</p>
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-[#E8B4BC]/20" />
              <div>
                <span className="block text-[11px] font-medium tracking-[0.06em] uppercase text-[#9C7B88] mb-3 text-center">
                  Sizes
                </span>
                <div className="flex flex-wrap gap-4 items-end justify-center">
                  <SubscriberCard index={1} value="Small" size="sm" onChange={() => {}} />
                  <SubscriberCard index={2} value="Medium" size="md" onChange={() => {}} />
                  <SubscriberCard index={3} value="Large" size="lg" onChange={() => {}} />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ===== Grid + Animation Demo ===== */}
        <section className="mb-12 animate-fade-in">
          <SectionTitle label="Interactive" subtitle="그리드 레이아웃 + 추첨 애니메이션 데모">
            GridContainer + 추첨 데모
          </SectionTitle>

          <div className="mb-4 flex justify-center">
            <Button variant="secondary" onClick={demoHighlight}>
              미니 추첨 데모 실행
            </Button>
          </div>

          <Card padding="md">
            <GridContainer>
              {subscribers.map((val, i) => (
                <SubscriberCard
                  key={i}
                  index={i + 1}
                  value={val}
                  onChange={(v) => handleSubscriberChange(i, v)}
                  isHighlighted={highlightedIdx === i}
                  isWinner={winnerIdx === i}
                />
              ))}
            </GridContainer>
          </Card>
        </section>

        {/* ===== SectionTitle ===== */}
        <section className="mb-12 animate-fade-in">
          <SectionTitle label="Typography" subtitle="섹션 구분을 위한 타이틀 컴포넌트">
            SectionTitle
          </SectionTitle>
          <Card padding="lg">
            <SectionTitle label="Label" subtitle="이것은 부제목입니다">
              이것은 제목입니다
            </SectionTitle>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-[#9C7B88] text-[13px]">
          구독자 1,000명 리스트 — 컴포넌트 라이브러리
        </footer>
      </div>
    </div>
  )
}
