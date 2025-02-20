import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceChat } from '../hooks/use-voice-chat';

export const VoiceChatPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    isRecording,
    isProcessing,
    messages,
    startRecording,
    stopRecording,
  } = useVoiceChat();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
      <div className="h-full container mx-auto px-4 md:px-6 py-4">
        <div className="h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-4 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/chat')}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </motion.button>
              <h1 className="text-2xl font-bold text-gray-900">Voice Chat</h1>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div className="max-w-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Start a Voice Conversation</h3>
                    <p className="text-gray-600">Click the microphone button and start speaking. I'm here to listen and help.</p>
                  </div>
                </div>
              ) : (
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-sm ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p className="text-[15px] leading-relaxed">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 rounded-2xl px-6 py-4 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Voice Control */}
          <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-gray-100">
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center shadow-lg
                  transition-all duration-200 relative
                  ${isRecording
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {/* Recording Pulse Effect */}
                {isRecording && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-red-500"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                <svg
                  className="w-8 h-8 text-white relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isRecording ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatPage; 