import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-sky-50 to-white py-24">
      {/* Floating circles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 rounded-full bg-blue-100/40 -top-20 -left-20 blur-3xl" />
        <div className="absolute w-96 h-96 rounded-full bg-sky-100/40 -bottom-32 -right-32 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl mb-8"
            >
              💫
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight"
            >
              Your Personal{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                AI Therapist
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-xl text-gray-600 max-w-xl leading-relaxed"
            >
              Experience supportive therapy sessions and emotional guidance with our 
              advanced AI companion. Available 24/7, judgment-free, and completely confidential.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex gap-6"
            >
              <Link
                to="/chat"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-full 
                           font-medium hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 
                           transform hover:-translate-y-0.5"
              >
                Start Therapy Session
              </Link>
              <Link
                to="/mood"
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-medium 
                           border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 
                           transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Track Progress
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-sky-100/30 rounded-full blur-3xl" />
            
            {/* Image container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/model.webp"
                alt="AI Therapy Session"
                className="w-full h-auto object-cover rounded-3xl transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
            </motion.div>

            {/* Floating elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 right-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg"
            >
              <span className="text-2xl">🤝</span>
              <p className="text-sm font-medium text-gray-800 mt-2">24/7 Support</p>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg"
            >
              <span className="text-2xl">🎯</span>
              <p className="text-sm font-medium text-gray-800 mt-2">Personalized Guidance</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 