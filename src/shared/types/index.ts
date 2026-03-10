// ──────────────────────────────────────
// Enums
// ──────────────────────────────────────

/** Topic lifecycle status */
export enum TopicStatus {
  SCHEDULED = 'SCHEDULED',
  VOTING = 'VOTING',
  CHATTING = 'CHATTING',
  CLOSED = 'CLOSED',
}

/** Vote choice */
export enum VoteChoice {
  GOOD = 'GOOD',
  EVIL = 'EVIL',
}

// ──────────────────────────────────────
// Entity types (서버 응답 기준)
// ──────────────────────────────────────

/** GET /users/me 응답 */
export type User = {
  id: string;
  nickname: string;
  createdAt: string;
};

/** GET /topics/current, /topics/next 응답 */
export type Topic = {
  id: string;
  title: string;
  optionGood: string;
  optionEvil: string;
  status: TopicStatus;
  myVote: VoteChoice | null;
  scheduledAt: string;
  votingEndsAt: string;
  chattingEndsAt: string;
};

/** GET /topics/:topicId/results 응답 */
export type TopicResult = {
  topicId: string;
  title: string;
  total: number;
  good: {
    count: number;
    ratio: number;
  };
  evil: {
    count: number;
    ratio: number;
  };
};

/** GET /chats/:topicId/messages 응답 아이템 */
export type ChatMessage = {
  id: string;
  message: string;
  createdAt: string;
  user: {
    id: string;
    nickname: string;
  };
};

/** POST /auth/signup, /auth/refresh 응답 */
export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

// ──────────────────────────────────────
// Request DTO
// ──────────────────────────────────────

/** POST /auth/signup 요청 */
export type SignupRequest = {
  signupToken: string;
  nickname: string;
};

/** POST /auth/refresh 요청 */
export type RefreshRequest = {
  refreshToken: string;
};

/** POST /topics/:topicId/votes 요청 */
export type VoteRequest = {
  choice: VoteChoice;
};

/** PATCH /users/me/nickname 요청 */
export type UpdateNicknameRequest = {
  nickname: string;
};

// ──────────────────────────────────────
// Response DTO (엔티티와 다른 형태만)
// ──────────────────────────────────────

/** POST /auth/logout 응답 */
export type LogoutResponse = {
  message: string;
};

/** GET /health 응답 */
export type HealthResponse = {
  status: string;
};
