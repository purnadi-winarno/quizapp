import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy, Star, Smile } from 'lucide-react';
import { translations } from '../data/translations';
import { useLanguage } from '../hooks/useLanguage';
import { useEffect } from 'react';
import { playResultSound } from '../utils/soundUtils';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const starVariants = {
  initial: { scale: 0, rotate: 0 },
  animate: (i: number) => ({
    scale: [1, 1.2, 1],
    rotate: [0, 360, 0],
    transition: {
      delay: i * 0.2,
      duration: 2,
      repeat: Infinity,
    },
  }),
};

export function QuizResult({ score, totalQuestions, onRestart }: QuizResultProps) {
  const { language } = useLanguage();
  const finalScore = Math.round((score / totalQuestions) * 100);
  
  const getEmoticon = () => {
    if (finalScore >= 80) return <Trophy size={80} className="text-yellow-500" />;
    if (finalScore >= 50) return <Star size={80} className="text-green-500" />;
    return <Smile size={80} className="text-blue-500" />;
  };

  const getMessage = () => {
    if (finalScore >= 80) return translations[language].excellent;
    if (finalScore >= 50) return translations[language].good;
    return translations[language].tryAgain;
  };

  useEffect(() => {
    playResultSound(finalScore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array since we want to play only once when component mounts

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex items-center justify-center p-4">
      {finalScore >= 60 && <Confetti />}
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
      >
        {/* Background stars */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={starVariants}
              initial="initial"
              animate="animate"
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              <Star size={24} className="text-yellow-400" />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {getEmoticon()}
            </motion.div>
          </div>
          
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl font-bold mb-2"
          >
            {translations[language].score}
          </motion.h2>
          
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-gray-600 mb-6 text-xl"
          >
            {getMessage()}
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-8"
          >
            <div className="text-6xl font-bold text-purple-600">
              {finalScore}
            </div>
            <p className="text-gray-500 text-xl">
              {score} / {totalQuestions} {translations[language].correct}
            </p>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            {translations[language].restart}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}