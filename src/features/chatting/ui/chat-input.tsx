'use client';

import { useState } from 'react';
import { useChatStore } from '../model/chat-store';

type ChatInputProps = {
  topicId: string;
  disabled?: boolean;
};

export function ChatInput({ topicId, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const sendMessage = useChatStore((s) => s.sendMessage);
  const isConnected = useChatStore((s) => s.isConnected);

  const isDisabled = disabled || !isConnected;

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || isDisabled) return;
    sendMessage(topicId, trimmed);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isDisabled ? '채팅이 비활성화되었습니다' : '메시지를 입력하세요...'}
        disabled={isDisabled}
        className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[14px] leading-[1.6] text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={isDisabled || !message.trim()}
        className="rounded-lg bg-gray-900 px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        전송
      </button>
    </div>
  );
}
