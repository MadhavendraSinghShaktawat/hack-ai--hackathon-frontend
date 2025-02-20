import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

interface VoiceChatBubbleProps {
  isUser: boolean;
  content: string;
  isAudio?: boolean;
  isSpeaking?: boolean;
}

export const VoiceChatBubble: React.FC<VoiceChatBubbleProps> = ({ 
  isUser, 
  content, 
  isAudio,
  isSpeaking = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`
          max-w-[80%] md:max-w-[70%] rounded-2xl px-6 py-4 flex items-center gap-3
          ${isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }
        `}
      >
        {isAudio && (
          <div className="flex-shrink-0">
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={isSpeaking ? {
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" 
              />
            </motion.svg>
          </div>
        )}
        {!isUser ? (
          <TypeAnimation
            sequence={[content]}
            wrapper="p"
            speed={70}
            className="text-[15px] leading-relaxed"
            cursor={false}
          />
        ) : (
          <p className="text-[15px] leading-relaxed">{content}</p>
        )}
        {!isUser && (
          <motion.div 
            className="absolute -left-1 bottom-0 w-8 h-8"
            animate={isSpeaking ? {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            } : {}}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full rounded-full bg-blue-500/10" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}; 