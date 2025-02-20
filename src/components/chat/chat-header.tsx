import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  onClearHistory: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearHistory }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 relative z-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-gray-700">Therapy Chat</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Voice Chat Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/voice-chat')}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 relative group"
            title="Switch to voice chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                           bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 
                           group-hover:opacity-100 transition-opacity duration-200">
              Voice Chat
            </span>
          </motion.button>

          {/* Clear History Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearHistory}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200 relative group"
            title="Clear chat history"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                           bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 
                           group-hover:opacity-100 transition-opacity duration-200">
              Clear History
            </span>
          </motion.button>
          
          {/* Settings Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 relative group"
            title="Chat settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                           bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 
                           group-hover:opacity-100 transition-opacity duration-200">
              Settings
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}; 