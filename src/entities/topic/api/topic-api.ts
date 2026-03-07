// TODO: base URL is not set yet — configure in @/src/shared/api/client
import { apiGet, apiPost } from '@/src/shared/api/client';
import type { Topic, TopicResult, VoteChoice } from '@/src/shared/types';

/** Fetch the currently active topic (returns null when no topic is live). */
export async function getCurrentTopic(): Promise<Topic | null> {
  // TODO: confirm actual server URL — GET /topics/current
  const topic = await apiGet<Topic | null>('/topics/current');
  return topic;
}

/** Get the scheduled time of the next upcoming topic. */
export async function getNextTopicTime(): Promise<{ scheduledAt: string }> {
  // TODO: confirm actual server URL — GET /topics/next
  return apiGet<{ scheduledAt: string }>('/topics/next');
}

/** Cast a vote on a topic. */
export async function voteTopic(
  topicId: string,
  choice: VoteChoice,
): Promise<void> {
  // TODO: confirm actual server URL — POST /topics/:topicId/votes
  await apiPost<void>(`/topics/${topicId}/votes`, { choice });
}

/** Fetch the aggregated voting result of a topic. */
export async function getTopicResult(topicId: string): Promise<TopicResult> {
  // TODO: confirm actual server URL — GET /topics/:topicId/results
  return apiGet<TopicResult>(`/topics/${topicId}/results`);
}
