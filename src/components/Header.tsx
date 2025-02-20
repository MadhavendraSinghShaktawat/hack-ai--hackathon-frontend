import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
              Calmly
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</Link>
            <Link to="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">Resources</Link>
            <Link 
              to="/get-started" 
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-400 text-white rounded-full hover:shadow-lg transition-all"
            >
              Start Therapy
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 