import { create } from 'zustand';
import type { Topic, TopicResult, VoteChoice } from '@/src/shared/types';
import {
  getCurrentTopic,
  getNextTopicTime,
  voteTopic,
  getTopicResult,
} from '@/src/entities/topic';

type VotingState = {
  currentTopic: Topic | null;
  nextScheduledAt: string | null;
  isLoading: boolean;
  hasVoted: boolean;
  result: TopicResult | null;
};

type VotingActions = {
  fetchCurrentTopic: () => Promise<void>;
  fetchNextTime: () => Promise<void>;
  vote: (choice: VoteChoice) => Promise<void>;
  fetchResult: (topicId: string) => Promise<void>;
  reset: () => void;
};

const initialState: VotingState = {
  currentTopic: null,
  nextScheduledAt: null,
  isLoading: false,
  hasVoted: false,
  result: null,
};

export const useVotingStore = create<VotingState & VotingActions>((set, get) => ({
  ...initialState,

  fetchCurrentTopic: async () => {
    set({ isLoading: true });
    try {
      const topic = await getCurrentTopic();
      set({ currentTopic: topic });
    } catch (error) {
      console.error('Failed to fetch current topic:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchNextTime: async () => {
    try {
      const { scheduledAt } = await getNextTopicTime();
      set({ nextScheduledAt: scheduledAt });
    } catch (error) {
      console.error('Failed to fetch next topic time:', error);
    }
  },

  vote: async (choice: VoteChoice) => {
    const topic = get().currentTopic;
    if (!topic) return;

    set({ isLoading: true });
    try {
      await voteTopic(topic.id, choice);
      set({ hasVoted: true });
    } catch (error) {
      console.error('Failed to vote:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchResult: async (topicId: string) => {
    set({ isLoading: true });
    try {
      const result = await getTopicResult(topicId);
      set({ result });
    } catch (error) {
      console.error('Failed to fetch result:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set(initialState);
  },
}));
