import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { VoiceRecorder } from '../components/voice/voice-recorder';
import { VoiceChatBubble } from '../components/voice/voice-chat-bubble';
import { VoiceProcessing } from '../components/voice/voice-processing';
import { useVoiceChat } from '../hooks/use-voice-chat';

export const VoiceChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const {
    isRecording,
    transcript,
    response,
    isProcessing,
    startRecording,
    stopRecording,
  } = useVoiceChat();

  // Simulate AI speaking when response changes
  useEffect(() => {
    if (response) {
      setIsSpeaking(true);
      // Simulate speech duration based on response length
      const duration = Math.min(response.length * 50, 5000);
      const timer = setTimeout(() => {
        setIsSpeaking(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [response]);

  return (
    <div className="h-screen pt-16 bg-gray-50">
      <div className="h-full container mx-auto px-4 md:px-6 py-4">
        <div className="h-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-3">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/chat')}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </motion.button>
              <h1 className="text-2xl font-bold text-gray-900">Voice Chat</h1>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 space-y-6 min-h-[200px] contain-layout">
              {!transcript && !response ? (
                <div className="text-center text-gray-500 min-h-[50px] flex items-center justify-center">
                  Click the microphone button to start speaking...
                </div>
              ) : (
                <div className="space-y-6">
                  {transcript && (
                    <VoiceChatBubble 
                      isUser={true} 
                      content={transcript} 
                      isAudio={true}
                      isSpeaking={isRecording} 
                    />
                  )}

                  {isProcessing && <VoiceProcessing />}

                  {response && (
                    <VoiceChatBubble 
                      isUser={false} 
                      content={response}
                      isAudio={true}
                      isSpeaking={isSpeaking} 
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="h-24 flex items-center justify-center">
            <VoiceRecorder
              isRecording={isRecording}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatPage; 