import React from 'react';
import { motion } from 'framer-motion';

interface WaveformVisualizerProps {
  isRecording: boolean;
  color?: 'white' | 'blue';
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ 
  isRecording,
  color = 'white'
}) => {
  const numBars = 20;
  const bars = Array.from({ length: numBars });

  return (
    <div className="flex items-center justify-center gap-[2px] h-8">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className={`w-[3px] rounded-full ${
            color === 'white' ? 'bg-white' : 'bg-blue-600'
          }`}
          initial={{ height: 4 }}
          animate={isRecording ? {
            height: [4, Math.random() * 24 + 4, 4],
            opacity: [0.3, 1, 0.3]
          } : { height: 4, opacity: 0.3 }}
          transition={{
            duration: 0.5,
            repeat: isRecording ? Infinity : 0,
            delay: i * 0.05,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}; 