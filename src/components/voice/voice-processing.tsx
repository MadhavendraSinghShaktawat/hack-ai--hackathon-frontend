import React from 'react';
import { motion } from 'framer-motion';

export const VoiceProcessing: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start"
    >
      <div className="bg-gray-100 rounded-2xl px-6 py-4 rounded-bl-none flex items-center gap-3">
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-blue-600 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 bg-blue-600 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 bg-blue-600 rounded-full"
          />
        </div>
        <span className="text-gray-600 text-sm">AI is processing your message...</span>
      </div>
    </motion.div>
  );
}; 