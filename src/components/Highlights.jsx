import React from 'react';

const Highlights = () => {
  return (
    <div className="highlights bg-[#2a3344] w-full py-12">
      <div className="highlights-content max-w-6xl mx-auto flex flex-col gap-10 px-4">
        <h1 className="text-5xl font-extrabold text-[#47b8ec] text-center mb-5">Destaques</h1>

        <div className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300">
          <div className="highlight-item-img w-full md:w-[300px] flex-shrink-0">
            <img 
              src="./images/maxluz.png" 
              alt="Maxluz Site Imagem" 
              className="w-full h-auto rounded-lg shadow-lg block"
            />
          </div>
          <div className="highlight-item-text flex-1 text-left text-white/70">
            <h2 className="text-3xl font-bold text-white/87 mb-4 mt-0">Site da Maxluz</h2>
            <p className="text-xl leading-relaxed m-0 font-sans">
              Fui desenvolvedor frontend e UX/UI Designer do site da empresa: <a href="https://maxluz.com" target="_blank" className="text-[#47b8ec] hover:underline">Maxluz - Clube de Benefícios</a>.
            </p>
          </div>
        </div>
        
        <div className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300">
          <div className="highlight-item-img w-full md:w-[300px] flex-shrink-0">
            <img 
              src="./images/game_gif.gif" 
              alt="Gif Jogo BadApple" 
              className="w-full h-auto rounded-lg shadow-lg block"
            />
          </div>
          <div className="highlight-item-text flex-1 text-left text-white/70">
            <h2 className="text-3xl font-bold text-white/87 mb-4 mt-0">Jogo no Scratch: BadApple!</h2>
            <p className="text-xl leading-relaxed m-0 font-sans">
              Jogo em Scratch inspirado no video clipe da música "BadApple!!", onde programei e produzi a música e a arte.
            </p>
          </div>
        </div>

        <div className="highlight-item flex flex-col md:flex-row items-start gap-10 hover:scale-[1.02] transition-transform duration-300">
          <div className="highlight-item-img w-full md:w-[300px] flex-shrink-0">
            <img 
              src="./images/fortes.png" 
              alt="Fortes Site Imagem" 
              className="w-full h-auto rounded-lg shadow-lg block"
            />
          </div>
          <div className="highlight-item-text flex-1 text-left text-white/70">
            <h2 className="text-3xl font-bold text-white/87 mb-4 mt-0">Projeto: Fortes Engenharia</h2>
            <p className="text-xl leading-relaxed m-0 font-sans">
              Um site para a empresa Fortes feito em um projeto interdisciplinar, onde tem o objetivo de reunir recicladores e produtores de lixo em um só lugar.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Highlights;
