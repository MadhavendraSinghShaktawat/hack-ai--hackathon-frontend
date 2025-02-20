import React from 'react';
import { motion } from 'framer-motion';

interface TranscriptDisplayProps {
  transcript: string;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8"
    >
      {transcript && (
        <div className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Your Message</h2>
          <p className="text-gray-900">{transcript}</p>
        </div>
      )}
    </motion.div>
  );
}; 