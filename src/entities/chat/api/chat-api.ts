// TODO: base URL is not set yet — configure in @/src/shared/api/client
import { apiGet } from '@/src/shared/api/client';
import type { ChatMessage } from '@/src/shared/types';

/** Fetch all chat messages for a given topic. */
export async function getChatMessages(
  topicId: string,
): Promise<ChatMessage[]> {
  // TODO: confirm actual server URL — GET /chats/:topicId/messages
  return apiGet<ChatMessage[]>(`/chats/${topicId}/messages`);
}
