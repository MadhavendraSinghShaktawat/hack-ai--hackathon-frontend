import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Your Path to
              <span className="block bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
                Inner Peace
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience personalized therapy sessions with our AI-powered companion. 
              Available 24/7, confidential, and tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/chat"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-400 text-white rounded-full hover:shadow-lg transition-all group"
              >
                <span>Start Chatting</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
              <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-all">
                Learn More
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start text-gray-500">
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
              <span className="text-sm">Secure & Confidential Sessions</span>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mt-12 md:mt-0"
          >
            <img 
              src="/therapy-illustration.svg" 
              alt="Therapy Illustration" 
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Floating Chat Button */}
      <Link
        to="/chat"
        className="fixed bottom-6 right-6 flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all group z-50"
      >
        <svg 
          className="w-6 h-6 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
        <span>Chat Now</span>
      </Link>
    </section>
  );
};

export default HeroSection; 