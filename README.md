# Gray Zone (회색지대)

도덕적 딜레마 실시간 투표 & 토론 커뮤니티 — "선과 악의 경계에서 당신의 선택은?"

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| State | Zustand 5 |
| Realtime | Socket.IO Client 4 |
| Chart | Recharts 3 |
| Font | Pretendard Variable |

## 프로젝트 구조 (FSD)

```
app/                          # Next.js App Router (페이지)
├── page.tsx                  # 홈 (현재 투표)
├── login/                    # 로그인
├── signup/                   # 회원가입 (닉네임 설정)
├── profile/                  # 프로필
├── auth/callback/            # Kakao OAuth 콜백
└── topics/[topicId]/         # 토픽 상세 (투표 결과 + 채팅)

src/
├── entities/                 # API 통신 계층
│   ├── user/                 # 사용자 API
│   ├── topic/                # 토픽 API
│   └── chat/                 # 채팅 API
├── features/                 # 비즈니스 로직 + UI
│   ├── auth/                 # 인증 (Kakao OAuth, 토큰 관리)
│   ├── voting/               # 투표 (상태 관리 + 소켓 구독)
│   ├── chatting/             # 채팅 (실시간 메시지)
│   └── theme/                # 다크모드
├── widgets/                  # 페이지 단위 복합 컴포넌트
│   ├── gnb/                  # 상단 네비게이션
│   ├── vote-card/            # 투표 카드
│   ├── result-view/          # 투표 결과 (Pie Chart)
│   └── chat-room/            # 채팅방
└── shared/                   # 공유 유틸리티
    ├── api/                  # HTTP 클라이언트 (Fetch + 토큰 자동 갱신)
    ├── lib/                  # Socket.IO, 인증, 포맷 유틸
    ├── types/                # 공유 타입 정의
    └── ui/                   # 공통 UI 컴포넌트
```

## 주요 기능

### 투표
- 토픽별 GOOD / EVIL 투표
- 실시간 상태 전환: `SCHEDULED → VOTING → CHATTING → CLOSED`
- Socket.IO `topic:statusChanged` 이벤트로 실시간 UI 반영
- 투표 결과 Pie Chart 표시

### 채팅
- 투표 참여자만 채팅 가능
- CHATTING 상태 시 자동으로 채팅 페이지 이동
- 채팅 종료 시 홈으로 자동 리다이렉트

### 인증
- Kakao OAuth 로그인
- Access Token (메모리) + Refresh Token (localStorage)
- 401 응답 시 자동 토큰 갱신 및 재시도

### 다크모드
- 수동 전환 지원
- FOUC 방지 스크립트 적용

## 시작하기

### 환경 변수

`.env.local` 파일을 생성합니다:

```env
NEXT_PUBLIC_API_URL=<API 서버 URL>
NEXT_PUBLIC_SOCKET_URL=<Socket 서버 URL>
```

### 실행

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev

# 프로덕션 빌드 및 실행
npm run build
npm start
```

## 상태 관리

```
Server (REST API / Socket.IO)
         ↓
Zustand Store
         ↓
React Components
```

| Store | 역할 |
|-------|------|
| `useAuthStore` | 인증 상태, 사용자 정보, 토큰 관리 |
| `useVotingStore` | 현재/다음 토픽, 투표, 결과, 소켓 구독 |
| `useChatStore` | 채팅 메시지, 소켓 연결, 입퇴장 |
| `useThemeStore` | 다크모드 상태 |
