import React from 'react';
import { Message } from '../types';
import { User, Bot } from 'lucide-react';
import { clsx } from 'clsx';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={clsx(
      'flex items-start gap-2 mb-3',
      isUser ? 'flex-row-reverse' : 'flex-row'
    )}>
      {/* Avatar */}
      <div className={clsx(
        'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
        isUser 
          ? 'bg-primary-500 text-white' 
          : 'bg-gray-200 text-gray-600'
      )}>
        {isUser ? <User size={12} /> : <Bot size={12} />}
      </div>

      {/* Mesaj balonu */}
      <div className={clsx(
        'max-w-xs px-3 py-2 rounded-lg',
        isUser 
          ? 'bg-primary-500 text-white ml-auto rounded-br-sm' 
          : 'bg-gray-200 text-gray-800 mr-auto rounded-bl-sm'
      )}>
        <p className="text-xs whitespace-pre-line">{
          message.text
        }</p>
        <p className={clsx(
          'text-xs mt-1 opacity-70',
          isUser ? 'text-right' : 'text-left'
        )}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};
