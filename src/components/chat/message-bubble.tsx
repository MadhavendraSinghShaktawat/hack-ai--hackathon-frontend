import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-6 py-4 
          ${isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
      >
        <p className="text-[15px] leading-relaxed">{message.content}</p>
      </div>
    </motion.div>
  );
}; 