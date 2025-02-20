import { CreateMoodRequest, Mood } from '../types/mood';

export const createMood = async (moodData: CreateMoodRequest): Promise<Mood> => {
  const response = await fetch('http://localhost:3000/api/moods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(moodData),
  });
  if (!response.ok) {
    throw new Error('Failed to create mood entry');
  }
  return response.json();
}; 