import { apiGet, apiPost } from '@/src/shared/api/client';
import type { Topic, TopicResult, VoteChoice } from '@/src/shared/types';

/** Fetch the currently active topic (VOTING or CHATTING). */
export async function getCurrentTopic(): Promise<Topic | null> {
  try {
    return await apiGet<Topic | null>('/topics/current');
  } catch {
    return null;
  }
}

/** Get the next scheduled topic. */
export async function getNextTopic(): Promise<Topic | null> {
  try {
    return await apiGet<Topic | null>('/topics/next');
  } catch {
    return null;
  }
}

/** Cast a vote on a topic. */
export async function voteTopic(
  topicId: string,
  choice: VoteChoice,
): Promise<void> {
  await apiPost<void>(`/topics/${topicId}/votes`, { choice });
}

/** Fetch the aggregated voting result of a topic. */
export async function getTopicResult(topicId: string): Promise<TopicResult> {
  return apiGet<TopicResult>(`/topics/${topicId}/results`);
}
