// Topic lifecycle status
export enum TopicStatus {
  SCHEDULED = 'SCHEDULED',
  VOTING = 'VOTING',
  CHATTING = 'CHATTING',
  CLOSED = 'CLOSED',
}

// Vote choice
export enum VoteChoice {
  GOOD = 'GOOD',
  EVIL = 'EVIL',
}

// User
export type User = {
  id: string;
  kakaoId: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

// Topic (moral dilemma)
export type Topic = {
  id: string;
  title: string;
  optionGood: string;
  optionEvil: string;
  status: TopicStatus;
  scheduledAt: string;
  closedAt: string;
  chatClosedAt: string;
  createdAt: string;
};

// Vote
export type Vote = {
  id: string;
  userId: string;
  topicId: string;
  choice: VoteChoice;
  createdAt: string;
};

// Chat message
export type ChatMessage = {
  id: string;
  topicId: string;
  userId: string;
  nickname: string;
  message: string;
  createdAt: string;
};

// Topic voting result
export type TopicResult = {
  topicId: string;
  goodCount: number;
  evilCount: number;
  totalCount: number;
};

// Auth tokens
export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};
