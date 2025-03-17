export interface Question {
  id: number;
  image: string;
  correctAnswer: string;
  options: string[];
  question: string;  // Added question text to be read
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  questions: Question[];
  selectedAnswer: string | null;
  isAnswered: boolean;
}