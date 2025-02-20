import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

interface MoodData {
  rating: number;
  description: string;
  tags: string[];
  moodLabel: string;
}

const MoodTrackingPage: React.FC = () => {
  const [rating, setRating] = useState<number>(5);
  const [description, setDescription] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const currentMood = MOOD_LEVELS.find(mood => mood.value === rating) || MOOD_LEVELS[3];

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const moodData: MoodData = {
      rating,
      description,
      tags,
      moodLabel: currentMood.label
    };

    try {
      await axios.post('http://localhost:3000/api/moods', moodData);
      setDescription('');
      setTags([]);
      setRating(5);
    } catch (err) {
      setError('Failed to save mood. Please try again.');
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
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Track Your Mood</h1>
            <div className="flex items-center gap-4">
              <Link
                to="/checkin"
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium 
                         flex items-center gap-2 group"
              >
                Daily Check-in
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/mood/history"
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium 
                         flex items-center gap-2 group"
              >
                View History
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Mood Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                How are you feeling? (1-10)
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 
                           rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 
                           [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white 
                           [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-webkit-slider-thumb]:shadow-lg
                           [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-white 
                           [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-600
                           [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer
                           [&::-moz-range-thumb]:shadow-lg"
                />
                <div className="text-center mt-4">
                  <span className="text-4xl">{currentMood.emoji}</span>
                  <p className="text-lg font-medium text-gray-900 mt-2">{currentMood.label}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="How are you feeling today?"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all duration-200
                         placeholder:text-gray-400 text-gray-900"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 flex-wrap mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm
                             bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tags"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                           transition-colors duration-200"
                >
                  Add
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-green-500 text-white rounded-lg font-medium
                       hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
            >
              {isSubmitting ? 'Saving...' : 'Save Mood'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodTrackingPage; 