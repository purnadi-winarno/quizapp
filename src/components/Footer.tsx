import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="w-full py-4 text-center text-sm text-gray-600">
      <p>
        &copy; {new Date().getFullYear()} Purnadi Winarno
        {language === 'id' ? ' - Hak Cipta Dilindungi' : ' - All Rights Reserved'}
      </p>
    </footer>
  );
};

export default Footer; 