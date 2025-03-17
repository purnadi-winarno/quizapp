import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Timer } from 'lucide-react';
import { Question } from '../types';
import { translations } from '../data/translations';
import { playSound, playExpiredSound } from '../utils/soundUtils';
import { useLanguage } from '../hooks/useLanguage';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  isAnswered: boolean;
  onNext: () => void;
}

const TIME_LIMIT = 10;

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isAnswered,
  onNext,
}) => {
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT); // 15 seconds per question
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [questionId, setQuestionId] = useState<number>(question.id);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [currentProgress, setCurrentProgress] = useState<number>(100);
  const { language } = useLanguage();

  // Read question aloud
  const readQuestion = useCallback(() => {
    const speech = new SpeechSynthesisUtterance(question.question[language]);
    speech.lang = language === 'id' ? 'id-ID' : 'en-US';
    speech.rate = 0.8;
    window.speechSynthesis.speak(speech);
  }, [question.question, language]);

  // Shuffle options when question changes
  useEffect(() => {
    setShuffledOptions([...question.options[language]].sort(() => Math.random() - 0.5));
    setTimeLeft(TIME_LIMIT);
    setQuestionId(question.id)
  }, [question, language]);

  const handleAnswerClick = useCallback((answer: string) => {
    if (!isAnswered && timeLeft > 0) {
      playSound(answer === question.correctAnswer[language]);
      onAnswerSelect(answer);
    }
    else {
      playExpiredSound();
    }
  }, [isAnswered, timeLeft, question.correctAnswer, language, onAnswerSelect]);

  // Timer countdown
  useEffect(() => {
    if (!isAnswered && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      
      handleAnswerClick(question.correctAnswer[language] === question.options[language][0] ? question.options[language][1] : question.options[language][0]);
    }
  }, [timeLeft, isAnswered, handleAnswerClick, language, question.correctAnswer, question.options]);

  // Reset timeExpired when question changes
  useEffect(() => {
    setTimeLeft(TIME_LIMIT)
  }, [question]);

  // Auto-read question
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      readQuestion();
    }, 500);
    
    return () => {
      clearTimeout(timeoutId);
      window.speechSynthesis.cancel();
    };
  }, [question, readQuestion]);

  // Reset when question changes
  useEffect(() => {
    setStartTime(Date.now());
    setCurrentProgress(100);
  }, [questionId]);

  // Update progress
  useEffect(() => {
    if (isAnswered) {
      return;
    }

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.max(0, 100 - (elapsed / (TIME_LIMIT * 1000) * 100));
      setCurrentProgress(progress);
      
      if (!isAnswered && progress > 0) {
        requestAnimationFrame(updateProgress);
      }
    };

    const animationId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationId);
  }, [isAnswered, startTime]);

  


  return (
    <div className="max-w-3xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl p-6"
      >
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4 sm:mb-0">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">{question.question[language]}</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={readQuestion}
                className="p-3 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                title="Baca Pertanyaan"
              >
                <Volume2 size={24} />
              </motion.button>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex-1 sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                key={questionId}
                className="h-full bg-purple-600"
                initial={{ width: "100%" }}
                animate={{ 
                  width: isAnswered ? 0: `${currentProgress}%`,
                  background: isAnswered ? "#EF4444" : [
                    "#22C55E",    // Mulai dengan hijau
                    "#EF4444"     // Berakhir dengan merah
                  ]
                }}
                transition={{ 
                  width: {
                    duration: isAnswered ? -1 : `${currentProgress}%` // Menghentikan animasi width sepenuhnya
                  },
                  background: {
                    duration: isAnswered ? -1 : timeLeft,
                    ease: "linear"
                  }
                }}
              />
            </div>
            <span className={`text-xl flex font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-purple-600'}`}>
             <Timer size={24} /> {timeLeft}s
            </span>
          </div>
        </div>

        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={question.image}
          alt="Quiz question"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        
        <div className="grid grid-cols-2 gap-4">
          {shuffledOptions.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered || timeLeft === 0}
              className={`p-4 rounded-lg text-lg font-semibold transition-colors
                ${
                  (isAnswered || timeLeft === 0)
                    ? option === question.correctAnswer[language]
                      ? 'bg-green-500 text-white'
                      : option === selectedAnswer
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100'
                    : 'bg-gray-100 hover:bg-gray-200'
                }
              `}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {(isAnswered || timeLeft === 0) && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={onNext}
              className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {translations[language].next}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};