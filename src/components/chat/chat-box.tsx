import React, { useRef, useEffect } from 'react';
import { Message } from '../../types/chat';
import { MessageBubble } from './message-bubble';
import { TypingIndicator } from './typing-indicator';

interface ChatBoxProps {
  messages: Message[];
  isTyping?: boolean;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ messages, isTyping }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
    >
      <div className="px-4 py-6 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center space-y-6">
            <div className="text-gray-500">
              Welcome to Calmly! I'm here to listen and support you.
            </div>
            <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-medium text-blue-800 mb-3">Quick Start Guide:</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Share your thoughts and feelings openly</li>
                <li>• Ask for advice or guidance</li>
                <li>• Explore coping strategies together</li>
                <li>• Take your time - I'm here to help</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        )}
        {isTyping && (
          <div className="py-2">
            <TypingIndicator />
          </div>
        )}
      </div>
    </div>
  );
}; 