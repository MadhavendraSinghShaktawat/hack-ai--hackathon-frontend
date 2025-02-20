import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { WaveformVisualizer } from './waveform-visualizer';

interface VoiceChatBubbleProps {
  isUser: boolean;
  content: string;
  isAudio?: boolean;
  isSpeaking?: boolean;
  isProcessing?: boolean;
}

export const VoiceChatBubble: React.FC<VoiceChatBubbleProps> = ({ 
  isUser, 
  content, 
  isAudio,
  isSpeaking = false,
  isProcessing = false
}) => {
  const [showText, setShowText] = useState(!isUser);
  
  useEffect(() => {
    if (isSpeaking) {
      setShowText(false);
    } else if (!isProcessing) {
      // Only show text after processing and speaking are done
      const timer = setTimeout(() => setShowText(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isSpeaking, isProcessing]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          max-w-[80%] md:max-w-[70%] rounded-2xl px-6 py-4 flex flex-col gap-3 relative
          ${isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }
        `}
      >
        <div className="flex items-start gap-3 min-h-[28px]">
          {isAudio && (
            <div className="flex-shrink-0 mt-1">
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
          <div className="flex-1 overflow-hidden">
            {showText && (
              !isUser ? (
                <TypeAnimation
                  sequence={[content]}
                  wrapper="p"
                  speed={50}
                  className="text-[15px] leading-relaxed whitespace-pre-wrap break-words"
                  cursor={false}
                />
              ) : (
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{content}</p>
              )
            )}
          </div>
        </div>

        {/* Show thinking animation while processing */}
        {!isUser && isProcessing && !isSpeaking && (
          <div className="mt-2 flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
            />
            <span className="text-sm text-gray-600">Thinking...</span>
          </div>
        )}

        {/* Show waveform only while speaking */}
        {isAudio && isSpeaking && (
          <div className="mt-2">
            <WaveformVisualizer 
              isRecording={true}
              color={isUser ? "white" : "blue"}
            />
          </div>
        )}

        {!isUser && isSpeaking && (
          <motion.div 
            className="absolute -left-2 -bottom-2 w-8 h-8"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
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