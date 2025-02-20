import React from 'react';
import { Message } from '../../types/chat';
import clsx from 'clsx';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={clsx(
      'flex',
      isBot ? 'justify-start' : 'justify-end'
    )}>
      <div className={clsx(
        'max-w-[80%] rounded-2xl px-4 py-2',
        isBot ? 'bg-gray-100' : 'bg-blue-600 text-white',
        'animate-fade-in'
      )}>
        <p className="text-sm md:text-base whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <p className={clsx(
          'text-xs mt-1',
          isBot ? 'text-gray-500' : 'text-blue-100'
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
}; 