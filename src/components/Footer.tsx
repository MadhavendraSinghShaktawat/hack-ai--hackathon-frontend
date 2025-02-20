import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-blue-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-3xl">🌊</span> Calmly
            </Link>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Your gentle companion for emotional well-being and personal growth.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Features</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link to="/chat" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Mindful Conversations
                </Link>
              </li>
              <li>
                <Link to="/mood" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Emotional Journey
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Help & Guidance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Privacy Promise
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Terms of Care
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-100">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Calmly. Creating spaces for peace and growth.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 