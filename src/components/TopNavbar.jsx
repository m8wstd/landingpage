import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const TopNavbar = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('about');
  
  // Sincroniza o idioma com a URL (?lang=pt ou ?lang=en)
  useEffect(() => {
    const urlLang = searchParams.get('lang');
    if (urlLang === 'pt' || urlLang === 'en') {
      if (i18n.language !== urlLang) {
        i18n.changeLanguage(urlLang);
      }
    }
  }, [searchParams, i18n]);

  const isEn = i18n.language?.startsWith('en');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = isEn ? 'pt' : 'en';
    i18n.changeLanguage(nextLang);
    setSearchParams({ lang: nextLang });
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const navOffset = 90;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-[#141c2c]/75 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        <a 
          href="#about" 
          onClick={(e) => scrollToSection(e, 'about')}
          className="flex items-center gap-3 group cursor-pointer no-underline flex-shrink-0"
        >
          <img 
            src="./images/m8wlogo.svg" 
            alt="M8W" 
            className="w-9 h-9 object-contain" 
          />
          <span className="font-title font-bold text-xl text-white group-hover:text-[#47b8ec] transition-colors">
            Maxwell Fernandes
          </span>
        </a>

        <div className="flex items-center gap-6 sm:gap-8 flex-shrink-0">
          <nav className="hidden md:flex items-center gap-8 text-sm font-title font-bold tracking-wide">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className={`transition-colors cursor-pointer ${
                activeSection === 'about' ? 'text-[#47b8ec]' : 'text-white/70 hover:text-white'
              }`}
            >
              {isEn ? 'About' : 'Sobre'}
            </a>
            <a
              href="#experience"
              onClick={(e) => scrollToSection(e, 'experience')}
              className={`transition-colors cursor-pointer ${
                activeSection === 'experience' ? 'text-[#47b8ec]' : 'text-white/70 hover:text-white'
              }`}
            >
              {isEn ? 'Experience' : 'Experiência'}
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className={`transition-colors cursor-pointer ${
                activeSection === 'projects' ? 'text-[#47b8ec]' : 'text-white/70 hover:text-white'
              }`}
            >
              {isEn ? 'Projects' : 'Projetos'}
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={`transition-colors cursor-pointer ${
                activeSection === 'contact' ? 'text-[#47b8ec]' : 'text-white/70 hover:text-white'
              }`}
            >
              {isEn ? 'Contact' : 'Contato'}
            </a>
          </nav>

          <button
            onClick={toggleLanguage}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#2a3344] hover:bg-[#344158] text-white/90 hover:text-white transition-all cursor-pointer"
          >
            {isEn ? 'EN' : 'PT'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
