import { apiGet, apiPost } from '@/src/shared/api/client';
import type { Topic, TopicResult, VoteChoice } from '@/src/shared/types';

/** Fetch the currently active topic (returns null when no topic is live). */
export async function getCurrentTopic(): Promise<Topic | null> {
  try {
    return await apiGet<Topic | null>('/topics/current');
  } catch (error) {
    console.error('Failed to fetch current topic:', error);
    return null;
  }
}

/** Get the scheduled time of the next upcoming topic. */
export async function getNextTopicTime(): Promise<{ scheduledAt: string } | null> {
  try {
    return await apiGet<{ scheduledAt: string }>('/topics/next');
  } catch (error) {
    console.error('Failed to fetch next topic time:', error);
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
