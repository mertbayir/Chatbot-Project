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

export interface ChatResponse {
  message: string;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}
