import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { format } from 'date-fns';
import { Activity, Category, CheckIn, MoodLevel } from '../types/checkin';
import { calculateStreak, StreakData, WeekDay } from '../services/streak-service';

const MOOD_LEVELS: { value: number; label: MoodLevel; emoji: string }[] = [
  { value: 8, label: 'Very Happy', emoji: '😊' },
  { value: 7, label: 'Happy', emoji: '😃' },
  { value: 6, label: 'Content', emoji: '🙂' },
  { value: 5, label: 'Neutral', emoji: '😐' },
  { value: 4, label: 'Anxious', emoji: '😟' },
  { value: 3, label: 'Stressed', emoji: '😩' },
  { value: 2, label: 'Sad', emoji: '😢' },
  { value: 1, label: 'Very Sad', emoji: '😭' },
];

const ACTIVITIES: Activity[] = [
  'Exercise', 'Reading', 'Meditation', 'Work', 'Study',
  'Social Activity', 'Hobby', 'Entertainment', 'Outdoor Activity', 'Rest'
];

const CATEGORIES: Category[] = [
  'Family', 'Friends', 'Health', 'Career', 'Personal Growth',
  'Nature', 'Home', 'Learning', 'Experiences', 'Basic Needs'
];

const DailyCheckInPage: React.FC = () => {
  const [moodRating, setMoodRating] = useState<number>(5);
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [thoughts, setThoughts] = useState('');
  const [gratitudeItems, setGratitudeItems] = useState<{ category: Category; detail: string }[]>([]);
  const [completedGoals, setCompletedGoals] = useState<string[]>([]);
  const [upcomingGoals, setUpcomingGoals] = useState<string[]>([]);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [sleepQuality, setSleepQuality] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    weekDays: [],
    stats: {
      days: 0,
      lessons: 0,
      quizzes: 0,
      minutes: 0
    }
  });

  const currentMood = MOOD_LEVELS.find(mood => mood.value === moodRating) || MOOD_LEVELS[3];

  // Fetch check-in history when component mounts
  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/checkins');
        const checkInDates = response.data.data.map((checkin: any) => checkin.createdAt);
        const streak = calculateStreak(checkInDates);
        setStreakData(streak);
      } catch (err) {
        console.error('Failed to fetch check-ins:', err);
      }
    };

    fetchCheckIns();
  }, []);

  const handleActivityToggle = (activity: Activity) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleAddGratitude = () => {
    setGratitudeItems([...gratitudeItems, { category: 'Family', detail: '' }]);
  };

  const handleGratitudeChange = (index: number, field: 'category' | 'detail', value: string) => {
    const newItems = [...gratitudeItems];
    if (field === 'category') {
      newItems[index].category = value as Category;
    } else {
      newItems[index].detail = value;
    }
    setGratitudeItems(newItems);
  };

  const handleRemoveGratitude = (index: number) => {
    setGratitudeItems(items => items.filter((_, i) => i !== index));
  };

  const handleAddGoal = (type: 'completed' | 'upcoming') => {
    if (type === 'completed') {
      setCompletedGoals([...completedGoals, '']);
    } else {
      setUpcomingGoals([...upcomingGoals, '']);
    }
  };

  const handleGoalChange = (type: 'completed' | 'upcoming', index: number, value: string) => {
    if (type === 'completed') {
      const newGoals = [...completedGoals];
      newGoals[index] = value;
      setCompletedGoals(newGoals);
    } else {
      const newGoals = [...upcomingGoals];
      newGoals[index] = value;
      setUpcomingGoals(newGoals);
    }
  };

  const handleRemoveGoal = (type: 'completed' | 'upcoming', index: number) => {
    if (type === 'completed') {
      setCompletedGoals(goals => goals.filter((_, i) => i !== index));
    } else {
      setUpcomingGoals(goals => goals.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const checkInData: CheckIn = {
      mood: {
        rating: moodRating,
        description: currentMood.label
      },
      activities: selectedActivities,
      thoughts,
      gratitude: gratitudeItems,
      goals: {
        completed: completedGoals.filter(Boolean),
        upcoming: upcomingGoals.filter(Boolean)
      },
      sleep: {
        hours: sleepHours,
        quality: sleepQuality
      }
    };

    try {
      await axios.post('http://localhost:3000/api/checkins', checkInData);
      // Fetch updated streak data
      const response = await axios.get('http://localhost:3000/api/checkins');
      const checkInDates = response.data.data.map((checkin: any) => checkin.createdAt);
      const streak = calculateStreak(checkInDates);
      setStreakData(streak);
    } catch (err) {
      setError('Failed to save check-in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm p-8"
        >
          {/* Streak Section */}
          <div className="text-center mb-12">
            <div className="inline-block p-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{streakData.currentStreak}</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Week Streak</h2>
            <p className="text-gray-600">You are doing really great, Anna!</p>
          </div>

          {/* Calendar Week View */}
          <div className="mb-12">
            <div className="grid grid-cols-7 gap-4 text-center mb-4">
              {streakData.weekDays.map((day) => (
                <div key={day.label} className="text-sm text-gray-600">
                  {day.label}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-4">
              {streakData.weekDays.map((day, i) => (
                <div key={i} className="text-center">
                  {day.isCompleted ? (
                    <div className="w-10 h-10 mx-auto rounded-full bg-orange-400 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center
                      ${day.isToday ? 'bg-blue-100' : 'bg-gray-100'}`}
                    >
                      <span className={`text-sm ${
                        day.isToday ? 'text-blue-600 font-medium' : 'text-gray-600'
                      }`}>
                        {format(day.date, 'd')}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="text-gray-600 mb-6">Your Stats</h3>
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Days</p>
                <p className="text-2xl font-bold text-gray-900">{streakData.stats.days}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Lessons</p>
                <p className="text-2xl font-bold text-gray-900">{streakData.stats.lessons}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">{streakData.stats.quizzes}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Minutes</p>
                <p className="text-2xl font-bold text-gray-900">{streakData.stats.minutes}</p>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div className="flex items-center gap-2 text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">2 Insights Available</span>
          </div>

          {/* Original form content starts here */}
          <form onSubmit={handleSubmit} className="space-y-8 mt-12">
            {/* Mood Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">How are you feeling today?</h2>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={moodRating}
                  onChange={(e) => setMoodRating(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 
                           rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-4">
                  <span className="text-4xl">{currentMood.emoji}</span>
                  <p className="text-lg font-medium text-gray-900 mt-2">{currentMood.label}</p>
                </div>
              </div>
            </section>

            {/* Activities Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">What activities did you do today?</h2>
              <div className="flex flex-wrap gap-3">
                {ACTIVITIES.map(activity => (
                  <button
                    key={activity}
                    type="button"
                    onClick={() => handleActivityToggle(activity)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                      ${selectedActivities.includes(activity)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </section>

            {/* Thoughts Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Any thoughts you'd like to share?</h2>
              <textarea
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your thoughts..."
              />
            </section>

            {/* Gratitude Section */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">What are you grateful for?</h2>
                <button
                  type="button"
                  onClick={handleAddGratitude}
                  className="text-blue-600 hover:text-blue-700"
                >
                  + Add Item
                </button>
              </div>
              <div className="space-y-4">
                {gratitudeItems.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <select
                      value={item.category}
                      onChange={(e) => handleGratitudeChange(index, 'category', e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300"
                    >
                      {CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={item.detail}
                      onChange={(e) => handleGratitudeChange(index, 'detail', e.target.value)}
                      placeholder="What are you grateful for?"
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGratitude(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Goals Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Goals</h2>
              
              {/* Completed Goals */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-700">Completed Goals</h3>
                  <button
                    type="button"
                    onClick={() => handleAddGoal('completed')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    + Add Goal
                  </button>
                </div>
                <div className="space-y-3">
                  {completedGoals.map((goal, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => handleGoalChange('completed', index, e.target.value)}
                        placeholder="Enter completed goal"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGoal('completed', index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Goals */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-700">Upcoming Goals</h3>
                  <button
                    type="button"
                    onClick={() => handleAddGoal('upcoming')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    + Add Goal
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingGoals.map((goal, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => handleGoalChange('upcoming', index, e.target.value)}
                        placeholder="Enter upcoming goal"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGoal('upcoming', index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sleep Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Sleep</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Hours of Sleep
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Sleep Quality (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center font-medium text-gray-700">
                    {sleepQuality}
                  </div>
                </div>
              </div>
            </section>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium
                       hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Check-in'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DailyCheckInPage; 