import { format, startOfWeek, addDays, isToday, isPast, parseISO } from 'date-fns';

export interface StreakData {
  currentStreak: number;
  weekDays: WeekDay[];
  stats: Stats;
}

export interface WeekDay {
  date: Date;
  label: string;
  isCompleted: boolean;
  isToday: boolean;
  isPast: boolean;
}

export interface Stats {
  days: number;
  lessons: number;
  quizzes: number;
  minutes: number;
}

export const calculateStreak = (checkInDates: string[]): StreakData => {
  // Convert string dates to Date objects and sort them
  const dates = checkInDates
    .map(date => parseISO(date))
    .sort((a, b) => b.getTime() - a.getTime());

  // Calculate current streak
  let currentStreak = 0;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if there's a check-in today
  const hasCheckInToday = dates.some(date => 
    format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  );

  // If no check-in today, start counting from yesterday
  const startDate = hasCheckInToday ? today : yesterday;
  let currentDate = startDate;

  while (dates.some(date => 
    format(date, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
  )) {
    currentStreak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // Calculate weeks
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays: WeekDay[] = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(startOfCurrentWeek, index);
    return {
      date,
      label: format(date, 'EEEEE'), // M, T, W, etc.
      isCompleted: dates.some(checkInDate => 
        format(checkInDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      ),
      isToday: isToday(date),
      isPast: isPast(date) && !isToday(date)
    };
  });

  // Calculate stats
  const stats: Stats = {
    days: dates.length,
    lessons: dates.length * 2, // Example calculation
    quizzes: Math.floor(dates.length * 1.5), // Example calculation
    minutes: dates.length * 15 // Example calculation: 15 minutes per check-in
  };

  return {
    currentStreak: Math.floor(currentStreak / 7), // Convert to weeks
    weekDays,
    stats
  };
}; 