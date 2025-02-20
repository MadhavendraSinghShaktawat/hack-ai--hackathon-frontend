import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Calmly</h3>
            <p className="text-gray-400">
              Your AI companion for mental wellness and personal growth.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/therapy" className="text-gray-400 hover:text-white transition-colors">AI Therapy</Link></li>
              <li><Link to="/meditation" className="text-gray-400 hover:text-white transition-colors">Guided Meditation</Link></li>
              <li><Link to="/journal" className="text-gray-400 hover:text-white transition-colors">Mood Journal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Mental Health Blog</Link></li>
              <li><Link to="/exercises" className="text-gray-400 hover:text-white transition-colors">Wellness Exercises</Link></li>
              <li><Link to="/crisis" className="text-gray-400 hover:text-white transition-colors">Crisis Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Calmly. Your trusted AI therapy companion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 