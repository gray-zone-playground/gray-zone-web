'use client';

import { useEffect } from 'react';
import { useChatStore, ChatInput, ChatMessageList } from '@/src/features/chatting';

type ChatRoomProps = {
  topicId: string;
  canChat: boolean;
};

export function ChatRoom({ topicId, canChat }: ChatRoomProps) {
  const messages = useChatStore((s) => s.messages);
  const joinChat = useChatStore((s) => s.joinChat);
  const leaveChat = useChatStore((s) => s.leaveChat);
  const loadMessages = useChatStore((s) => s.loadMessages);

  useEffect(() => {
    if (!canChat) return;

    loadMessages(topicId);
    joinChat(topicId);

    return () => {
      leaveChat(topicId);
    };
  }, [topicId, canChat, joinChat, leaveChat, loadMessages]);

  if (!canChat) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-8 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        투표 참여자만 채팅할 수 있습니다
      </div>
    );
  }

  return (
    <div className="flex h-[500px] flex-col rounded-2xl border border-gray-200 dark:border-gray-700">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessageList messages={messages} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-3 dark:border-gray-700">
        <ChatInput topicId={topicId} />
      </div>
    </div>
  );
}
