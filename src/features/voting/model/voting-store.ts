import { create } from 'zustand';
import type { Topic, TopicResult, VoteChoice } from '@/src/shared/types';
import {
  getCurrentTopic,
  getNextTopic,
  voteTopic,
  getTopicResult,
} from '@/src/entities/topic';

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
    try {
      const topic = await getCurrentTopic();
      set({ currentTopic: topic });
    } catch (error) {
      console.error('Failed to fetch current topic:', error);
    } finally {
      set({ isTopicLoading: false });
    }
  },

  fetchNextTopic: async () => {
    try {
      const topic = await getNextTopic();
      set({ nextTopic: topic });
    } catch (error) {
      console.error('Failed to fetch next topic:', error);
    }
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

  reset: () => {
    set(initialState);
  },
}));
