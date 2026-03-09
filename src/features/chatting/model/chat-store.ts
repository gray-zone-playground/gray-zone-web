import { create } from 'zustand';
import type { ChatMessage } from '@/src/shared/types';
import { getAccessToken } from '@/src/shared/lib/auth';
import { getChatMessages } from '@/src/entities/chat';
import { connectSocket, disconnectSocket, getSocket } from '../lib/socket';

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

    socket.emit('chat:join', { topicId });
  },

  leaveChat: (topicId: string) => {
    const socket = getSocket();
    if (socket) {
      socket.emit('chat:leave', { topicId });
    }
    disconnectSocket();
    set({ messages: [], isConnected: false });
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
    set((state) => ({ messages: [...state.messages, msg] }));
  },

  setChatClosed: () => {
    set({ isChatOpen: false });
  },
}));
