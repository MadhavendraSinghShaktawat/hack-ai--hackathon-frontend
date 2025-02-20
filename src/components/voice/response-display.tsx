import React from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '../loading-spinner';

interface ResponseDisplayProps {
  response: string;
  isProcessing: boolean;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  response,
  isProcessing,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-24"
    >
      {(isProcessing || response) && (
        <div className="bg-blue-50 rounded-2xl p-6">
          <h2 className="text-sm font-medium text-blue-500 mb-2">AI Response</h2>
          {isProcessing ? (
            <LoadingSpinner size="small" />
          ) : (
            <p className="text-gray-900">{response}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}; 