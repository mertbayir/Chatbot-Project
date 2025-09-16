import { create } from 'zustand';
import { ChatState, Message, User } from '../types';

interface ChatActions {
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setIsConnected: (connected: boolean) => void;
  setIsTyping: (typing: boolean) => void;
  setUser: (user: User | null) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState & ChatActions>((set) => ({
  // State
  messages: [],
  isConnected: false,
  isTyping: false,
  user: null,

  // Actions
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setMessages: (messages) =>
    set(() => ({
      messages,
    })),

  setIsConnected: (isConnected) =>
    set(() => ({
      isConnected,
    })),

  setIsTyping: (isTyping) =>
    set(() => ({
      isTyping,
    })),

  setUser: (user) =>
    set(() => ({
      user,
    })),

  clearChat: () =>
    set(() => ({
      messages: [],
      user: null,
    })),
}));
