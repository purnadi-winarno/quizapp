export type Language = 'id' | 'en';

export interface Question {
  id: number;
  image: string;
  correctAnswer: Record<Language, string>;
  options: Record<Language, string[]>;
  question: Record<Language, string>;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  questions: Question[];
  selectedAnswer: string | null;
  isAnswered: boolean;
}