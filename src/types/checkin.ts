export type MoodLevel = 'Very Happy' | 'Happy' | 'Content' | 'Neutral' | 'Anxious' | 'Stressed' | 'Sad' | 'Very Sad';

export type Category = 'Family' | 'Friends' | 'Health' | 'Career' | 'Personal Growth' | 'Nature' | 'Home' | 'Learning' | 'Experiences' | 'Basic Needs';

export type Activity = 'Exercise' | 'Reading' | 'Meditation' | 'Work' | 'Study' | 'Social Activity' | 'Hobby' | 'Entertainment' | 'Outdoor Activity' | 'Rest';

export interface GratitudeItem {
  category: Category;
  detail: string;
}

export interface Goals {
  completed: string[];
  upcoming: string[];
}

export interface Sleep {
  hours: number;
  quality: number;
}

export interface Mood {
  rating: number;
  description: MoodLevel;
}

export interface CheckIn {
  mood: Mood;
  activities: Activity[];
  thoughts: string;
  gratitude: GratitudeItem[];
  goals: Goals;
  sleep: Sleep;
}

export interface CheckInResponse {
  status: string;
  data: CheckIn & {
    _id: string;
    userId: string;
    createdAt: string;
  };
} 