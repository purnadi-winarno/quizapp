import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy, Star, Frown, Smile } from 'lucide-react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const percentage = (score / totalQuestions) * 100;
  
  const getEmoticon = () => {
    if (percentage >= 80) return <Trophy size={80} className="text-yellow-500" />;
    if (percentage >= 50) return <Star size={80} className="text-green-500" />;
    return <Smile size={80} className="text-blue-500" />;
  };

  const getMessage = () => {
    if (percentage >= 80) return "Hebat! Kamu Pintar Sekali! 🌟";
    if (percentage >= 50) return "Bagus! Terus Belajar ya! 🎉";
    return "Ayo Coba Lagi! Kamu Pasti Bisa! 💪";
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex items-center justify-center p-4">
      {percentage >= 50 && <Confetti recycle={false} numberOfPieces={200} />}
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
      >
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
            Quiz Selesai!
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
              {score}/{totalQuestions}
            </div>
            <p className="text-gray-500 text-xl">Nilai Kamu</p>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Main Lagi
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};