import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
                <span className="text-3xl">🌿</span> Calmly
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/chat"
                className="inline-flex items-center px-3 pt-1 text-white hover:text-gray-200 transition-colors duration-200"
              >
                Chat
              </Link>
              <Link
                to="/mood"
                className="inline-flex items-center px-3 pt-1 text-white hover:text-gray-200 transition-colors duration-200"
              >
                Mood Tracking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 