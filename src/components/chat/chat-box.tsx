import React from 'react';
import { Message } from '../../types/chat';
import { MessageBubble } from './message-bubble';
import { TypingIndicator } from './typing-indicator';

interface ChatBoxProps {
  messages: Message[];
  isTyping?: boolean;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ messages, isTyping }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = React.useState(true);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Handle scroll events to detect if user has scrolled up
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
    setAutoScroll(isAtBottom);
  };

  // Scroll to bottom on new messages if autoScroll is enabled
  React.useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages, isTyping, autoScroll]);

  // Initial scroll to bottom
  React.useEffect(() => {
    scrollToBottom('auto');
  }, []);

  const welcomeMessage = messages.length === 0 && (
    <div className="space-y-4">
      <div className="text-center text-gray-500 mt-8 mb-6">
        Welcome to Calmly! I'm here to listen and support you.
      </div>
      <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
        <h3 className="font-medium text-blue-800 mb-2">Quick Start Guide:</h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• Share your thoughts and feelings openly</li>
          <li>• Ask for advice or guidance</li>
          <li>• Explore coping strategies together</li>
          <li>• Take your time - I'm here to help</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
    >
      {welcomeMessage || (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
        </>
      )}
      <div ref={messagesEndRef} />
      
      {/* Show scroll to bottom button when needed */}
      {!autoScroll && messages.length > 0 && (
        <button
          onClick={() => {
            scrollToBottom();
            setAutoScroll(true);
          }}
          className="fixed bottom-24 right-8 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Scroll to bottom"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </button>
      )}
    </div>
  );
}; 