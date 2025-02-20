import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/hero-section';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="pt-20">
      <HeroSection />
      
      {/* Features Section */}
      <div className="py-32 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full bg-blue-100/30 -top-48 -left-48 blur-3xl" />
          <div className="absolute w-96 h-96 rounded-full bg-sky-100/30 -bottom-48 -right-48 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Begin Your Journey to Wellness
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Choose your path to emotional well-being with our thoughtfully designed features
            </motion.p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-sky-400 rounded-3xl shadow-xl p-10 group relative overflow-hidden"
            >
              {/* Decorative circle */}
              <div className="absolute w-32 h-32 bg-white/10 rounded-full -top-16 -right-16 transition-transform group-hover:scale-150 duration-500" />
              
              <div className="relative">
                <div className="text-5xl mb-8 transform group-hover:scale-110 transition-transform duration-300">🌊</div>
                <h2 className="text-2xl font-bold text-white mb-4">Mindful Conversations</h2>
                <p className="text-blue-50 mb-8 leading-relaxed">
                  Engage in peaceful dialogue with our AI companion. Find clarity and guidance 
                  through supportive conversations in your own time and space.
                </p>
                <Link
                  to="/chat"
                  className="inline-flex items-center bg-white/95 text-blue-600 px-8 py-4 rounded-full 
                             transition-all duration-300 font-medium shadow-md hover:shadow-lg
                             hover:bg-white transform hover:-translate-y-0.5 group"
                >
                  <span>Start Chatting</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-sky-500 to-blue-500 rounded-3xl shadow-xl p-10 group relative overflow-hidden"
            >
              {/* Decorative circle */}
              <div className="absolute w-32 h-32 bg-white/10 rounded-full -top-16 -right-16 transition-transform group-hover:scale-150 duration-500" />
              
              <div className="relative">
                <div className="text-5xl mb-8 transform group-hover:scale-110 transition-transform duration-300">🌿</div>
                <h2 className="text-2xl font-bold text-white mb-4">Emotional Journey</h2>
                <p className="text-blue-50 mb-8 leading-relaxed">
                  Track your emotional well-being with our gentle mood tracker. 
                  Watch your inner garden grow as you nurture your mental health day by day.
                </p>
                <Link
                  to="/mood"
                  className="inline-flex items-center bg-white/95 text-blue-600 px-8 py-4 rounded-full 
                             transition-all duration-300 font-medium shadow-md hover:shadow-lg
                             hover:bg-white transform hover:-translate-y-0.5 group"
                >
                  <span>Track Mood</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Benefits Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-32 text-center"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Support</h3>
                <p className="text-gray-600">AI-powered guidance tailored to your unique journey</p>
              </div>
              <div className="p-6">
                <div className="text-3xl mb-4">🌱</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth & Progress</h3>
                <p className="text-gray-600">Track your emotional well-being and celebrate small wins</p>
              </div>
              <div className="p-6">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Available</h3>
                <p className="text-gray-600">24/7 support whenever you need a moment of calm</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage; 