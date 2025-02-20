import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { Mood, MoodResponse } from '../types/mood';
import { LoadingSpinner } from '../components/loading-spinner';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';

const MOOD_LEVELS = [
  { value: 8, label: 'Very Happy', emoji: '😊' },
  { value: 7, label: 'Happy', emoji: '😃' },
  { value: 6, label: 'Content', emoji: '🙂' },
  { value: 5, label: 'Neutral', emoji: '😐' },
  { value: 4, label: 'Anxious', emoji: '😟' },
  { value: 3, label: 'Stressed', emoji: '😩' },
  { value: 2, label: 'Sad', emoji: '😢' },
  { value: 1, label: 'Very Sad', emoji: '😭' },
];

const MoodHistoryPage: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState<'calendar' | 'graph'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const fetchMoods = async (startDate?: Date, endDate?: Date) => {
    try {
      setLoading(true);
      let url = 'http://localhost:3000/api/moods';
      if (startDate && endDate) {
        url += `?startDate=${format(startDate, 'yyyy-MM-dd')}&endDate=${format(endDate, 'yyyy-MM-dd')}`;
      }
      const response = await axios.get<MoodResponse>(url);
      setMoods(response.data.data.moods);
    } catch (err) {
      setError('Failed to fetch mood history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    fetchMoods(start, end);
  }, [selectedDate]);

  const getMoodForDate = (date: Date) => {
    return moods.find(mood => 
      format(parseISO(mood.createdAt), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getMoodEmoji = (rating: number) => {
    return MOOD_LEVELS.find(mood => mood.value === rating)?.emoji || '😐';
  };

  const tileContent = ({ date }: { date: Date }) => {
    const mood = getMoodForDate(date);
    return mood ? (
      <div className="text-xl">{getMoodEmoji(mood.rating)}</div>
    ) : null;
  };

  const handleDateClick = (date: Date) => {
    const mood = getMoodForDate(date);
    setSelectedMood(mood || null);
  };

  const graphData = moods.map(mood => ({
    date: format(parseISO(mood.createdAt), 'MMM dd'),
    rating: mood.rating,
    emoji: getMoodEmoji(mood.rating)
  }));

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Mood History</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setView('calendar')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  view === 'calendar' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Calendar View
              </button>
              <button
                onClick={() => setView('graph')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  view === 'graph' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Graph View
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 mb-4">{error}</div>
          )}

          {view === 'calendar' ? (
            <div className="space-y-6">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={tileContent}
                onClickDay={handleDateClick}
                className="w-full rounded-lg border-none shadow-sm"
              />
              
              {selectedMood && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{getMoodEmoji(selectedMood.rating)}</span>
                    <div>
                      <p className="text-lg font-medium">
                        {MOOD_LEVELS.find(m => m.value === selectedMood.rating)?.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(parseISO(selectedMood.createdAt), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedMood.description}</p>
                  {selectedMood.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {selectedMood.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          ) : (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis
                    domain={[1, 8]}
                    ticks={[1, 2, 3, 4, 5, 6, 7, 8]}
                    tickFormatter={(value) => MOOD_LEVELS.find(m => m.value === value)?.label || ''}
                  />
                  <Tooltip
                    content={({ payload }) => {
                      if (!payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-lg border">
                          <p className="text-lg">{data.emoji}</p>
                          <p className="font-medium">{data.date}</p>
                          <p>{MOOD_LEVELS.find(m => m.value === data.rating)?.label}</p>
                        </div>
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: '#2563eb', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MoodHistoryPage; 