import { User, DiaryEntry, MentorQuestion, PotentialMap, AvatarConfig } from '../types';

const USERS_KEY = 'impa_users';
const CURRENT_USER_KEY = 'impa_current_user';
const PROGRESS_KEY = 'impa_user_progress';
const STEP_RESPONSES_KEY = 'impa_step_responses'; // New key for step answers
const DIARY_KEY = 'impa_diary_entries';
const QUESTIONS_KEY = 'impa_questions';
const QUIZ_RESULT_KEY = 'impa_quiz_results';

// --- Auth ---

export const registerUser = (user: Omit<User, 'id'>, password: string): User => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  if (users.find((u: any) => u.email === user.email)) {
    throw new Error('E-mail já cadastrado.');
  }

  const newUser = { 
      ...user, 
      id: crypto.randomUUID(), 
      password,
      // Default avatar if none provided
      avatar: user.avatar || {
        skinColor: '#f5d0b0',
        hairColor: '#4a3b32',
        hairStyle: 'short',
        backgroundColor: '#a86bf6',
        clothingColor: '#ffffff',
        accessory: 'none'
      }
  }; 
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  const { password: _, ...userWithoutPass } = newUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPass));
  return userWithoutPass;
};

export const loginUser = (email: string, password: string): User => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) {
    throw new Error('E-mail ou senha inválidos.');
  }

  const { password: _, ...userWithoutPass } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPass));
  return userWithoutPass;
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const updateUserAvatar = (avatar: AvatarConfig) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const updatedUser = { ...currentUser, avatar };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    // Also update in the main users list
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const updatedUsers = users.map((u: any) => u.id === currentUser.id ? { ...u, avatar } : u);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    
    return updatedUser;
};

export const getAllStudents = (): User[] => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  return users.filter((u: any) => u.role === 'student').map((u: any) => {
    const { password, ...user } = u;
    return user;
  });
};

// --- Progress & Step Responses ---

export const getTrackProgress = (userId: string, trackId: string): number => {
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  return progress[`${userId}_${trackId}`] || 0;
};

export const getAllUserProgress = (userId: string): Record<string, number> => {
    const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
    const userProgress: Record<string, number> = {};
    Object.keys(progress).forEach(key => {
        if(key.startsWith(userId)) {
            const trackId = key.split('_')[1];
            userProgress[trackId] = progress[key];
        }
    });
    return userProgress;
}

export const updateTrackProgress = (userId: string, trackId: string, stepIndex: number) => {
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  const current = progress[`${userId}_${trackId}`] || 0;
  
  if (stepIndex > current) {
    progress[`${userId}_${trackId}`] = stepIndex;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }
};

export const saveStepResponse = (userId: string, trackId: string, stepId: number, response: string) => {
  const responses = JSON.parse(localStorage.getItem(STEP_RESPONSES_KEY) || '{}');
  const key = `${userId}_${trackId}_${stepId}`;
  responses[key] = response;
  localStorage.setItem(STEP_RESPONSES_KEY, JSON.stringify(responses));
};

export const getStepResponse = (userId: string, trackId: string, stepId: number): string => {
  const responses = JSON.parse(localStorage.getItem(STEP_RESPONSES_KEY) || '{}');
  const key = `${userId}_${trackId}_${stepId}`;
  return responses[key] || '';
};

// --- Quiz Results ---
export const saveQuizResult = (userId: string, result: PotentialMap) => {
    const results = JSON.parse(localStorage.getItem(QUIZ_RESULT_KEY) || '{}');
    results[userId] = result;
    localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(results));
}

export const getQuizResult = (userId: string): PotentialMap | null => {
    const results = JSON.parse(localStorage.getItem(QUIZ_RESULT_KEY) || '{}');
    return results[userId] || null;
}

// --- Diary ---

export const saveDiaryEntry = (entry: Omit<DiaryEntry, 'id' | 'date'>) => {
  const entries = JSON.parse(localStorage.getItem(DIARY_KEY) || '[]');
  const newEntry: DiaryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    date: new Date().toISOString()
  };
  entries.unshift(newEntry); // Add to beginning
  localStorage.setItem(DIARY_KEY, JSON.stringify(entries));
  return newEntry;
};

export const getDiaryEntries = (userId?: string): DiaryEntry[] => {
  const entries = JSON.parse(localStorage.getItem(DIARY_KEY) || '[]');
  if (userId) {
    return entries.filter((e: DiaryEntry) => e.userId === userId);
  }
  return entries;
};

// --- Questions/Suggestions ---

export const saveQuestion = (question: Omit<MentorQuestion, 'id' | 'date' | 'status'>) => {
  const questions = JSON.parse(localStorage.getItem(QUESTIONS_KEY) || '[]');
  const newQuestion: MentorQuestion = {
    ...question,
    id: crypto.randomUUID(),
    status: 'received',
    date: new Date().toISOString()
  };
  questions.unshift(newQuestion);
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
};

export const getQuestions = (): MentorQuestion[] => {
  return JSON.parse(localStorage.getItem(QUESTIONS_KEY) || '[]');
};

export const updateQuestionStatus = (id: string, status: 'received' | 'answered') => {
  const questions = JSON.parse(localStorage.getItem(QUESTIONS_KEY) || '[]');
  const updatedQuestions = questions.map((q: MentorQuestion) => 
    q.id === id ? { ...q, status } : q
  );
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(updatedQuestions));
};