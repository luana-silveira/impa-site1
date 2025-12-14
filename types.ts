export type Role = 'student' | 'mentor';

export interface AvatarConfig {
  skinColor: string;
  hairColor: string;
  hairStyle: 'short' | 'long' | 'curly' | 'bald' | 'afro';
  backgroundColor: string;
  clothingColor: string;
  accessory: 'none' | 'glasses' | 'headphones';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  age?: string;
  phone?: string;
  country?: string;
  education?: string;
  interests?: string;
  avatar?: AvatarConfig;
}

export interface TrackStep {
  id: number;
  title: string;
  content: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  duration: string;
  stepsCount: number;
  icon: string;
  mission: string;
  steps: TrackStep[];
  reflectionQuestions: string[];
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
  }[];
}

export interface UserReflection {
  likes: string;
  goodAt: string;
  develop: string;
}

export interface PotentialMap {
  topSkills: {
    skill: string;
    description: string;
  }[];
  practicalApplication: string;
  suggestedTrackId: string;
  encouragement: string;
}

export interface DiaryEntry {
  id: string;
  userId: string;
  trackId: string; // 'general' or specific track id
  content: string;
  imageUrl?: string;
  date: string;
}

export type QuestionStatus = 'received' | 'answered';

export interface MentorQuestion {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  topic: string;
  content: string;
  status: QuestionStatus;
  date: string;
  type: 'question' | 'suggestion';
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}