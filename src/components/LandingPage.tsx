import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Stars, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Brain size={80} className="text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Playgroup Quiz Fun!
        </motion.h1>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-xl text-white mb-12"
        >
          Let's learn and have fun together!
        </motion.p>
        
        {/* Language Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {language === 'id' ? 'Pilih Bahasa' : 'Select Language'}
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setLanguage('id')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                language === 'id'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Globe size={20} />
              Indonesia
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                language === 'en'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Globe size={20} />
              English
            </button>
          </div>
        </div>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            y: [0, -20, 0]
          }}
          transition={{ 
            scale: { delay: 0.9, duration: 0.5 },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 25px rgba(255,255,255,0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-white text-purple-600 px-12 py-6 rounded-full text-2xl font-bold shadow-lg flex items-center gap-3 mx-auto"
        >
          {translations[language].start}
        </motion.button>
      </motion.div>

      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-full h-full opacity-10"
        style={{
          background: "radial-gradient(circle at center, white 0%, transparent 70%)"
        }}
      />
    </div>
  );
};