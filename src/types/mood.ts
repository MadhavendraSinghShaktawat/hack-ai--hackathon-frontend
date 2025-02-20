export interface Mood {
  _id: string;
  userId: string;
  rating: number;
  description: string;
  tags: string[];
  createdAt: string;
}

export interface MoodResponse {
  status: string;
  data: {
    moods: Mood[];
    total: number;
    page: number;
    totalPages: number;
  };
}

export interface CreateMoodRequest {
  rating: number;
  description: string;
  tags: string[];
} 