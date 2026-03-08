import { apiGet, apiPost } from '@/src/shared/api/client';
import type { Topic, TopicResult, VoteChoice } from '@/src/shared/types';
import { MOCK_TOPICS } from '@/src/shared/mocks/topic-mocks'; // TODO: 백엔드 준비 후 제거

/** Fetch the currently active topic (returns null when no topic is live). */
export async function getCurrentTopic(): Promise<Topic | null> {
  try {
    const topic = await apiGet<Topic | null>('/topics/current');
    if (topic) return topic;
  } catch {
    // API 실패 시 mock fallback
  }
  return MOCK_TOPICS.find((t) => t.status === 'VOTING') ?? null;
}

/** Get the scheduled time of the next upcoming topic. */
export async function getNextTopicTime(): Promise<{ scheduledAt: string }> {
  try {
    const result = await apiGet<{ scheduledAt: string }>('/topics/next');
    if (result?.scheduledAt) return result;
  } catch {
    // API 실패 시 mock fallback
  }
  const next = MOCK_TOPICS.find((t) => t.status === 'SCHEDULED');
  return { scheduledAt: next?.scheduledAt ?? new Date(Date.now() + 86400_000).toISOString() };
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
