'use client';

import { useEffect, useRef } from 'react';
import type { ChatMessage } from '@/src/shared/types';

type ChatMessageListProps = {
  messages: ChatMessage[];
};

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
        아직 메시지가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
      {messages.map((msg) => (
        <div key={msg.id} className="flex items-start gap-2">
          <span className="shrink-0 text-sm font-semibold text-gray-800">
            {msg.nickname}
          </span>
          <span className="text-sm text-gray-700">{msg.message}</span>
          <span className="ml-auto shrink-0 text-xs text-gray-400">
            {formatTime(msg.createdAt)}
          </span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
