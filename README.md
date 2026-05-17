# 구독자 1,000명 리스트

YouTube 채널 구독자 1,000명을 표시하고, 그중 한 명을 무작위 추첨하는 웹 페이지입니다.
구독자 명단은 **Supabase**에 저장되어 모든 방문자에게 동일하게 보이며, 관리자만 이름을 편집할 수 있습니다.

🔗 **배포 사이트**: <https://subscriber-name.vercel.app/>

---

## 주요 기능

- 1,000명의 구독자 칸을 10×100 그리드로 표시
- 룰렛 애니메이션 + 효과음 + 컨페티로 무작위 1명 추첨
- **관리자 로그인** 후 더블클릭으로 이름 편집 (관리자만 수정 가능)
- 한 사람이 이름을 바꾸면 **다른 방문자 화면에도 실시간 반영** (Supabase Realtime)
- 모바일/데스크톱 대응 반응형 레이아웃

## 기술 스택

| 영역 | 사용 기술 |
|---|---|
| 프론트엔드 | React 19, Vite 7, Tailwind CSS 4, React Router |
| 상태/공유 | Supabase (Postgres + Realtime + Auth) |
| 배포 | Vercel (GitHub 자동 배포) |
| 기타 | canvas-confetti, lucide-react |

## 아키텍처 한눈에

```
사용자 브라우저 ─── Supabase JS SDK ─── Supabase Postgres
                  (anon key, RLS)        └─ subscribers 테이블 (id 1~1000)
       │
       └─── 관리자 로그인 (email/password)
                  └─ RLS: 인증된 사용자만 UPDATE
```

- **읽기**: 누구나 가능 → 페이지 첫 로드 시 1,000행 fetch
- **쓰기**: Supabase Auth 로그인한 관리자만 → `subscribers.UPDATE` RLS 정책
- **실시간**: `postgres_changes` 구독 → 다른 사용자 화면 즉시 갱신

## 로컬 개발

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 본인의 Supabase 키를 넣어주세요.

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-or-publishable-key>
```

> `.env.example`을 복사해서 시작하면 됩니다.

### 3. Supabase 스키마 (한 번만 실행)

Supabase SQL Editor에서 실행:

```sql
create table public.subscribers (
  id int primary key,
  name text not null,
  updated_at timestamptz default now()
);

insert into public.subscribers (id, name)
select i::int, i::text from generate_series(1, 1000) as i;

alter publication supabase_realtime add table public.subscribers;
alter table public.subscribers enable row level security;

create policy "Anyone can read"
  on public.subscribers for select
  to anon, authenticated using (true);

create policy "Only authenticated can update"
  on public.subscribers for update
  to authenticated using (true) with check (true);
```

관리자 계정은 Supabase 대시보드 **Authentication → Users**에서 직접 생성합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

기본 포트는 `http://localhost:5173` 입니다.

## 빌드 & 배포

### 빌드

```bash
npm run build       # dist/ 에 정적 파일 생성
npm run preview     # 빌드 결과 로컬 미리보기
```

### Vercel 배포

이 저장소는 Vercel에 연결되어 있어 `main` 브랜치에 push할 때마다 자동 배포됩니다.

신규 환경에 배포할 때 Vercel 대시보드 **Settings → Environment Variables**에서 다음 두 변수를 추가해야 합니다:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 디렉터리 구조

```
src/
├─ pages/
│  ├─ Home.jsx              # 메인 추첨 페이지 (Supabase 연동)
│  └─ ComponentsDemo.jsx    # 컴포넌트 라이브러리 데모 (/components)
├─ components/
│  ├─ ui/                   # 재사용 UI 컴포넌트
│  │  ├─ SubscriberCard.jsx # 이름 편집 가능한 카드 (isEditable prop)
│  │  ├─ GridContainer.jsx
│  │  ├─ Modal.jsx, Button.jsx, Card.jsx, ...
│  │  └─ index.js
│  └─ AdminLoginModal.jsx   # 관리자 로그인 모달
├─ hooks/
│  ├─ useSubscribers.js     # Supabase 조회 + 실시간 구독 + 업데이트
│  ├─ useAdminAuth.js       # Supabase Auth 세션 관리
│  ├─ useRandomDraw.js      # 추첨 애니메이션 로직
│  └─ useSoundEffects.js    # tick / fanfare 사운드
├─ lib/
│  ├─ supabase.js           # Supabase 클라이언트 인스턴스
│  └─ utils.js              # cn() 유틸 (clsx + tailwind-merge)
├─ App.jsx                  # 라우트 정의
└─ main.jsx
```

## 보안 노트

- 클라이언트 코드에 노출되는 **anon (publishable) 키**는 공개되어도 안전합니다. 모든 데이터 접근은 **RLS 정책**으로 보호됩니다.
- **service_role 키**와 **DB 비밀번호**는 절대 저장소나 클라이언트에 포함하지 마세요.
- 현재 RLS 정책은 "로그인된 사용자 = 관리자"로 가정합니다. 일반 사용자 가입을 추가한다면 정책을 더 세분화해야 합니다 (예: `auth.uid()`로 특정 user_id 매칭).

## 라이선스

MIT
