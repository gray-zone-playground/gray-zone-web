'use client';

import { useEffect } from 'react';
import { useChatStore, ChatInput, ChatMessageList } from '@/src/features/chatting';

type ChatRoomProps = {
  topicId: string;
  canChat: boolean;
};

export function ChatRoom({ topicId, canChat }: ChatRoomProps) {
  const messages = useChatStore((s) => s.messages);
  const isChatOpen = useChatStore((s) => s.isChatOpen);

  useEffect(() => {
    if (!canChat) return;

    const { loadMessages, joinChat, leaveChat } = useChatStore.getState();
    loadMessages(topicId);
    joinChat(topicId);

    return () => {
      leaveChat(topicId);
    };
  }, [topicId, canChat]);

  if (!canChat) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-border bg-background p-8 text-[14px] text-caption">
        투표 참여자만 채팅할 수 있습니다
      </div>
    );
  }

  return (
    <div className="flex h-[500px] flex-col rounded-2xl border border-border bg-surface">
      <div className="chat-scrollbar flex-1 overflow-y-auto p-4">
        <ChatMessageList messages={messages} />
      </div>

      <div className="border-t border-border p-3">
        <ChatInput topicId={topicId} disabled={!isChatOpen} />
      </div>
    </div>
  );
}
