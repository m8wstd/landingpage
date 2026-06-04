import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Highlights = () => {
  const { t } = useTranslation();
  return (
    <div className="highlights bg-[#2a3344] w-full py-12">
      <div className="highlights-content max-w-6xl mx-auto flex flex-col gap-10 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#47b8ec] text-center mb-5">{t("highlights.title")}</h1>

        {/* GREENFOOT POKéMON */}
        <Link
          to="https://youtu.be/HPk9YogxCwg"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'block' }}
          className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group"
        >
          <div className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300">
            <div className="highlight-item-img w-full md:w-[300px] flex-shrink-0">
              <img 
                src="./images/greenfoot-pokemon.png" 
                alt="Gif Jogo BadApple" 
                className="w-full h-auto rounded-lg shadow-lg block"
              />
            </div>
            
            <div className="highlight-item-text flex-1 text-left text-white/70">
              <h2 className="text-xl md:text-3xl font-bold text-white/87 mb-4 mt-0">{t("gamedev_highlights.greenfootpokemon_title")}</h2>
              <p className="text-base md:text-xl leading-relaxed m-0 font-sans" dangerouslySetInnerHTML={{ __html: t("gamedev_highlights.greenfootpokemon_desc") }} />
            </div>

            <span className="inline-block mt-4 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
              {t("gamedev_highlights.greenfootpokemon_details")} →
            </span>
          </div>
        </Link>

        {/* EXTRACTION CORP. */}
        <div className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300">
          <div className="highlight-item-img w-full md:w-[300px] flex-shrink-0">
            <img 
              src="./images/round_system.jpg" 
              alt={t("gamedev_highlights.extraction_title")} 
              className="w-full h-auto rounded-lg shadow-lg block"
            />
          </div>
          <div className="highlight-item-text flex-1 text-left text-white/70">
            <h2 className="text-xl md:text-3xl font-bold text-white/87 mb-4 mt-0">{t("gamedev_highlights.extraction_title")}</h2>
            <p className="text-base md:text-xl leading-relaxed m-0 font-sans" dangerouslySetInnerHTML={{ __html: t("gamedev_highlights.extraction_desc") }} />
          </div>
        </div>

        {/* BRAINROT LEAGUE */}
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
            <h2 className="text-xl md:text-3xl font-bold text-white/87 mb-4 mt-0">{t("gamedev_highlights.brainrot_title")}</h2>
            <p className="text-base md:text-xl leading-relaxed m-0 font-sans" dangerouslySetInnerHTML={{ __html: t("gamedev_highlights.brainrot_desc") }} />
          </div>
          <span className="inline-block mt-4 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
            {t("gamedev_highlights.brainrot_details")} →
          </span>
          </div>
        </Link>

        {/* MAXLUZ */}
        <div className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300">
          <div className="highlight-item-img w-full md:w-[300px] flex-shrink-0">
            <img 
              src="./images/maxluz.png" 
              alt="Maxluz Site Imagem" 
              className="w-full h-auto rounded-lg shadow-lg block"
            />
          </div>
          <div className="highlight-item-text flex-1 text-left text-white/70">
            <h2 className="text-xl md:text-3xl font-bold text-white/87 mb-4 mt-0">{t("highlights.maxluz_title")}</h2>
            <p className="text-base md:text-xl leading-relaxed m-0 font-sans" dangerouslySetInnerHTML={{ __html: t("highlights.maxluz_desc") }} />
          </div>
        </div>

        {/* BAD APPLE */}
        <Link
          to="https://scratch.mit.edu/projects/1154340439"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'block' }}
          className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group"
        >
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

            <span className="inline-block mt-4 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
              {t("gamedev_highlights.badapple_details")} →
            </span>
          </div>
        </Link>


        {/* FORTES ENGENHARIA */}
        <div className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300">
          <div className="highlight-item-img w-full md:w-[300px] flex-shrink-0">
            <img 
              src="./images/fortes.png" 
              alt="Fortes Site Imagem" 
              className="w-full h-auto rounded-lg shadow-lg block"
            />
          </div>
          <div className="highlight-item-text flex-1 text-left text-white/70">
            <h2 className="text-xl md:text-3xl font-bold text-white/87 mb-4 mt-0">{t("highlights.fortes_title")}</h2>
            <p className="text-base md:text-xl leading-relaxed m-0 font-sans" dangerouslySetInnerHTML={{ __html: t("highlights.fortes_desc") }} />
          </div>
        </div>  

      </div>
    </div>
  );
};

export default Highlights;
