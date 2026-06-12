export interface User {
  id: string;
  name: string;
  email: string;
  learningInterest: string;
  preferredTrack: string; // ID of the initial track
  xp: number;
  level: number;
  streak: number;
  lastActive: string | null;
  completedLessons: string[]; // lesson IDs
  completedModules: string[]; // module IDs
  quizScores: Record<string, number>; // moduleId: highest score percentage
  joinedAt: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  durationMin: number;
  xpReward: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  moduleId: string;
  questions: Question[];
  xpBonus: number;
}

export interface Module {
  id: string;
  trackId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  quiz: Quiz;
  xpReward: number;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string; // e.g., "12 hours"
  skillsCovered: string[];
  xpReward: number;
  modules: Module[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "mentor" | "system";
  text: string;
  timestamp: string;
}

export interface StudentActivityLog {
  id: string;
  studentName: string;
  action: string;
  timestamp: string;
  xpAwarded?: number;
}
