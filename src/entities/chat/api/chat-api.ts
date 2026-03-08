import { apiGet } from '@/src/shared/api/client';
import type { ChatMessage } from '@/src/shared/types';

/** Fetch all chat messages for a given topic. */
export async function getChatMessages(
  topicId: string,
): Promise<ChatMessage[]> {
  return apiGet<ChatMessage[]>(`/chats/${topicId}/messages`);
}
