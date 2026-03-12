import { create } from 'zustand';
import type { ChatMessage } from '@/src/shared/types';
import { getAccessToken } from '@/src/shared/lib/auth';
import { getChatMessages } from '@/src/entities/chat';
import { connectSocket, getSocket } from '../lib/socket';

type ChatState = {
  messages: ChatMessage[];
  isConnected: boolean;
  isChatOpen: boolean;
};

type ChatActions = {
  joinChat: (topicId: string) => void;
  leaveChat: (topicId: string) => void;
  sendMessage: (topicId: string, message: string) => void;
  loadMessages: (topicId: string) => Promise<void>;
  addMessage: (msg: ChatMessage) => void;
  setChatClosed: () => void;
};

export const useChatStore = create<ChatState & ChatActions>((set, get) => ({
  messages: [],
  isConnected: false,
  isChatOpen: true,

  joinChat: (topicId: string) => {
    const token = getAccessToken();
    if (!token) return;

    const socket = connectSocket(token);

    // 기존 리스너 제거 후 등록 (중복 방지)
    socket.off('connect');
    socket.off('disconnect');
    socket.off('chat:receive');
    socket.off('chat:closed');
    socket.off('chat:error');

    socket.on('connect', () => {
      set({ isConnected: true });
    });

    socket.on('disconnect', () => {
      set({ isConnected: false });
    });

    socket.on('chat:receive', (msg: ChatMessage) => {
      get().addMessage(msg);
    });

    socket.on('chat:closed', () => {
      get().setChatClosed();
    });

    socket.on('chat:error', (err: { message: string }) => {
      console.error('Chat error:', err.message);
    });

    // 이미 연결된 소켓이면 즉시 상태 반영
    if (socket.connected) {
      set({ isConnected: true });
    }

    socket.emit('chat:join', { topicId });
  },

  leaveChat: (topicId: string) => {
    const socket = getSocket();
    if (socket) {
      socket.emit('chat:leave', { topicId });
      socket.off('chat:receive');
      socket.off('chat:closed');
      socket.off('chat:error');
    }
    set({ messages: [], isConnected: false, isChatOpen: true });
  },

  sendMessage: (topicId: string, message: string) => {
    const socket = getSocket();
    if (!socket?.connected) return;
    socket.emit('chat:send', { topicId, message });
  },

  loadMessages: async (topicId: string) => {
    try {
      const messages = await getChatMessages(topicId);
      set({ messages });
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  },

  addMessage: (msg: ChatMessage) => {
    set((state) => {
      if (state.messages.some((m) => m.id === msg.id)) return state;
      return { messages: [...state.messages, msg] };
    });
  },

  setChatClosed: () => {
    set({ isChatOpen: false });
  },
}));
