import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GameDevHighlights = () => {
  const { t } = useTranslation();
  return (
    <div className="highlights bg-[#2a3344] w-full py-12">
      <div className="highlights-content max-w-6xl mx-auto flex flex-col gap-10 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#47b8ec] text-center mb-5">{t("gamedev_highlights.title")}</h1>

        <Link
          to="/brainrot-league"
          style={{ textDecoration: 'none', display: 'block' }}
          className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group"
        >


          <div className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300">
          <div className="highlight-item-img w-full md:w-[300px] flex-shrink-0">
            <img 
              src="./images/brainrot_league_thumbnail_v3.png"  
              alt="Thumbnail Jogo Brainrot League" 
              className="w-full h-auto rounded-lg shadow-lg block"
            />
          </div>
          <div className="highlight-item-text flex-1 text-left text-white/70">
            <h2 className="text-xl md:text-3xl font-bold text-white/87 mb-4 mt-0">{t("gamedev_highlights.badapple_title")}</h2>
            <p className="text-base md:text-xl leading-relaxed m-0 font-sans" dangerouslySetInnerHTML={{ __html: t("gamedev_highlights.brainrot_desc") }} />
          </div>
          <span className="inline-block mt-4 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
            {t("gamedev_highlights.brainrot_details")} →
          </span>
        </div>
        </Link>

        
        <div className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300">
          <div className="highlight-item-img w-full md:w-[300px] flex-shrink-0">
            <img 
              src="./images/game_gif.gif" 
              alt="Gif Jogo BadApple" 
              className="w-full h-auto rounded-lg shadow-lg block"
            />
          </div>
          <div className="highlight-item-text flex-1 text-left text-white/70">
            <h2 className="text-xl md:text-3xl font-bold text-white/87 mb-4 mt-0">{t("gamedev_highlights.badapple_title")}</h2>
            <p className="text-base md:text-xl leading-relaxed m-0 font-sans" dangerouslySetInnerHTML={{ __html: t("gamedev_highlights.badapple_desc") }} />
          </div>
        </div>

        {/* Adicione outros projetos de Game Dev aqui, usando a mesma estrutura acima */}

      </div>
    </div>
  );
};

export default GameDevHighlights;
