import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Footer from './components/Footer';
import { HomePage } from './pages/home-page';
import { ChatPage } from './pages/chat-page';
import MoodTrackingPage from './pages/mood-tracking';
import LandingPage from './pages/landing-page';
import MoodHistoryPage from './pages/mood-history';
import DailyCheckInPage from './pages/daily-checkin';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/mood" element={<MoodTrackingPage />} />
              <Route path="/mood/history" element={<MoodHistoryPage />} />
              <Route path="/checkin" element={<DailyCheckInPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App; 