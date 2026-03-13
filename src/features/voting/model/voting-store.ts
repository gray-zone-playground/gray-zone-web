import { create } from 'zustand';
import type { Topic, TopicResult, TopicStatus, VoteChoice } from '@/src/shared/types';
import {
  getCurrentTopic,
  getNextTopic,
  voteTopic,
  getTopicResult,
} from '@/src/entities/topic';
import { connectSocket, disconnectSocket, getSocket } from '@/src/shared/lib/socket';
import { getAccessToken } from '@/src/shared/lib/auth';

type TopicStatusPayload = {
  topicId: string;
  status: TopicStatus;
};

type TopicCreatedPayload = {
  id: string;
  title: string;
  status: TopicStatus;
  scheduledAt: string;
};

type TopicVotedPayload = {
  topicId: string;
  good: number;
  evil: number;
};

type VotingState = {
  currentTopic: Topic | null;
  nextTopic: Topic | null;
  isTopicLoading: boolean;
  isVoting: boolean;
  isResultLoading: boolean;
  result: TopicResult | null;
};

type VotingActions = {
  fetchCurrentTopic: () => Promise<void>;
  fetchNextTopic: () => Promise<void>;
  vote: (choice: VoteChoice) => Promise<void>;
  fetchResult: (topicId: string) => Promise<void>;
  subscribeTopicStatus: () => void;
  unsubscribeTopicStatus: () => void;
  reset: () => void;
};

const initialState: VotingState = {
  currentTopic: null,
  nextTopic: null,
  isTopicLoading: false,
  isVoting: false,
  isResultLoading: false,
  result: null,
};

export const useVotingStore = create<VotingState & VotingActions>((set, get) => ({
  ...initialState,

  fetchCurrentTopic: async () => {
    set({ isTopicLoading: true });
    const topic = await getCurrentTopic();
    set({ currentTopic: topic, isTopicLoading: false });
  },

  fetchNextTopic: async () => {
    const topic = await getNextTopic();
    set({ nextTopic: topic });
  },

  vote: async (choice: VoteChoice) => {
    const topic = get().currentTopic;
    if (!topic) return;

    set({ isVoting: true });
    try {
      await voteTopic(topic.id, choice);
      set({ currentTopic: { ...topic, myVote: choice } });
    } catch (error) {
      console.error('Failed to vote:', error);
      throw error;
    } finally {
      set({ isVoting: false });
    }
  },

  fetchResult: async (topicId: string) => {
    set({ isResultLoading: true });
    try {
      const result = await getTopicResult(topicId);
      set({ result });
    } catch (error) {
      console.error('Failed to fetch result:', error);
    } finally {
      set({ isResultLoading: false });
    }
  },

  subscribeTopicStatus: () => {
    const token = getAccessToken();
    if (!token) return;

    const socket = connectSocket(token);

    socket.off('topic:statusChanged');
    socket.off('topic:created');
    socket.off('topic:voted');

    socket.on('topic:statusChanged', (payload: TopicStatusPayload) => {
      const { currentTopic, nextTopic } = get();

      // 현재 토픽의 상태가 변경된 경우
      if (currentTopic && currentTopic.id === payload.topicId) {
        set({ currentTopic: { ...currentTopic, status: payload.status } });
        return;
      }

      // 예정된 토픽이 VOTING으로 전환된 경우 → currentTopic으로 승격
      if (nextTopic && nextTopic.id === payload.topicId) {
        set({
          currentTopic: { ...nextTopic, status: payload.status },
          nextTopic: null,
        });
        return;
      }

      // 알 수 없는 토픽 → 서버에서 최신 데이터 조회
      get().fetchCurrentTopic();
      get().fetchNextTopic();
    });

    // 새 토픽 생성 알림 → 서버에서 최신 데이터 조회
    socket.on('topic:created', (_payload: TopicCreatedPayload) => {
      get().fetchCurrentTopic();
      get().fetchNextTopic();
    });

    // 실시간 투표 수 갱신
    socket.on('topic:voted', (payload: TopicVotedPayload) => {
      const { result, currentTopic } = get();

      // 현재 보고 있는 토픽의 투표 결과 실시간 업데이트
      if (result && result.topicId === payload.topicId) {
        const total = payload.good + payload.evil;
        set({
          result: {
            ...result,
            total,
            good: {
              count: payload.good,
              ratio: total > 0 ? payload.good / total : 0,
            },
            evil: {
              count: payload.evil,
              ratio: total > 0 ? payload.evil / total : 0,
            },
          },
        });
      }

      // result가 아직 없지만 현재 토픽의 투표인 경우 → 결과 조회
      if (!result && currentTopic && currentTopic.id === payload.topicId) {
        get().fetchResult(payload.topicId);
      }
    });
  },

  unsubscribeTopicStatus: () => {
    const socket = getSocket();
    if (socket) {
      socket.off('topic:statusChanged');
      socket.off('topic:created');
      socket.off('topic:voted');
    }
  },

  reset: () => {
    get().unsubscribeTopicStatus();
    set(initialState);
  },
}));
