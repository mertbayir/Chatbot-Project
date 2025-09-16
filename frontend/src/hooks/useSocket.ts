import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '../store/chatStore';
import { Message } from '../types';
import toast from 'react-hot-toast';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { 
    addMessage, 
    setIsConnected, 
    setIsTyping, 
    setUser, 
    setMessages 
  } = useChatStore();

  useEffect(() => {
    // Socket bağlantısı oluştur
    socketRef.current = io(SOCKET_URL);
    const socket = socketRef.current;

    // Bağlantı olayları
    socket.on('connect', () => {
      console.log('🔗 Socket bağlandı');
      setIsConnected(true);
      toast.success('Chatbot\'a bağlandı!');
      
      // Kullanıcı katılımını bildır
      socket.emit('user:join', {});
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket bağlantısı kesildi');
      setIsConnected(false);
      toast.error('Bağlantı kesildi');
    });

    // Kullanıcı olayları
    socket.on('user:joined', (data: { userId: string; messages: Message[] }) => {
      console.log('👤 Kullanıcı katıldı:', data.userId);
      setUser({
        id: data.userId,
        messages: data.messages
      });
      setMessages(data.messages);
    });

    // Mesaj olayları
    socket.on('message:received', (message: Message) => {
      console.log('💬 Mesaj alındı:', message);
      addMessage({
        ...message,
        timestamp: new Date(message.timestamp)
      });
    });

    // Typing indicator
    socket.on('bot:typing', (isTyping: boolean) => {
      setIsTyping(isTyping);
    });

    // Mesaj geçmişi
    socket.on('messages:history', (messages: Message[]) => {
      const formattedMessages = messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(formattedMessages);
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, [addMessage, setIsConnected, setIsTyping, setUser, setMessages]);

  const sendMessage = (text: string) => {
    if (socketRef.current && text.trim()) {
      socketRef.current.emit('message:send', { text: text.trim() });
    }
  };

  const getMessageHistory = () => {
    if (socketRef.current) {
      socketRef.current.emit('messages:get');
    }
  };

  return {
    sendMessage,
    getMessageHistory,
    isConnected: socketRef.current?.connected || false
  };
};
