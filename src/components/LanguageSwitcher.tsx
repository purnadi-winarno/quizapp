import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
      className="fixed top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm hover:bg-gray-50"
    >
      <Globe size={20} />
      <span>{language === 'id' ? 'EN' : 'ID'}</span>
    </button>
  );
} 