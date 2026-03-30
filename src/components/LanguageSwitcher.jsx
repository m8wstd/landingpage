import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language || 'pt';

  const toggleLanguage = () => {
    const nextLang = currentLang.startsWith('pt') ? 'en' : 'pt';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button 
        onClick={toggleLanguage}
        className="bg-[#2a3344]/80 backdrop-blur-sm text-white px-3 md:px-6 py-2 rounded-xl font-bold hover:scale-105 transition-all shadow-lg border border-[#47b8ec]/30 flex items-center justify-center gap-2 cursor-pointer relative"
      >
        <span className="text-xl leading-none">🌐</span>
        <span className="leading-none mt-1">{currentLang.startsWith('pt') ? 'PT' : 'EN'}</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
