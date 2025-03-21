import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResult } from './components/QuizResult';
import  Footer  from './components/Footer';
import { questions } from './data/questions';
import { GameState, QuizState } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { useLanguage } from './hooks/useLanguage';

// Separate component for the app content
function AppContent() {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    questions: [],
    selectedAnswer: null,
    isAnswered: false,
  });

  const { language } = useLanguage();

  const shuffleQuestions = () => {
    return [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10); // Show 10 random questions from the pool of 20
  };

  const startQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      questions: shuffleQuestions(),
      selectedAnswer: null,
      isAnswered: false,
    });
    setGameState('quiz');
  };

  const handleAnswerSelect = (answer: string) => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer[language];

    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: answer,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex === quizState.questions.length - 1) {
      setGameState('result');
    } else {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {gameState === 'landing' && (
        <LandingPage onStart={startQuiz} />
      )}
      
      {gameState === 'quiz' && (
        <QuizQuestion
          question={quizState.questions[quizState.currentQuestionIndex]}
          selectedAnswer={quizState.selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          isAnswered={quizState.isAnswered}
          onNext={handleNext}
        />
      )}
      
      {gameState === 'result' && (
        <QuizResult
          score={quizState.score}
          totalQuestions={quizState.questions.length}
          onRestart={startQuiz}
        />
      )}
      <Footer />
    </div>
  );
}

// Main App component
export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}