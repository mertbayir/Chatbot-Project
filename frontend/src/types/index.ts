export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface User {
  id: string;
  messages: Message[];
}

export interface ChatState {
  messages: Message[];
  isConnected: boolean;
  isTyping: boolean;
  user: User | null;
}

export interface SocketEvents {
  'user:join': (userData: any) => void;
  'user:joined': (data: { userId: string; messages: Message[] }) => void;
  'message:send': (data: { text: string }) => void;
  'message:received': (message: Message) => void;
  'messages:get': () => void;
  'messages:history': (messages: Message[]) => void;
  'bot:typing': (isTyping: boolean) => void;
}
