import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              className="text-3xl"
            >
              💫
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 
                           bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              Calmly
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { path: '/chat', label: 'Therapy Chat' },
              { path: '/mood', label: 'Track Mood' },
              { path: '/resources', label: 'Resources' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200
                  ${isActive(path) 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                {label}
                {isActive(path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link
              to="/chat"
              className={`hidden md:inline-flex items-center px-6 py-2.5 rounded-full text-sm font-medium
                transition-all duration-300 transform hover:-translate-y-0.5
                ${isScrolled
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:shadow-lg hover:shadow-blue-200'
                  : 'bg-white/90 text-blue-600 hover:bg-white hover:shadow-lg'
                }`}
            >
              Start Session
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        className="h-[1px] bg-gradient-to-r from-blue-600 to-sky-500 origin-left"
      />
    </motion.header>
  );
};

export default Header; 