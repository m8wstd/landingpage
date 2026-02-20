import React from 'react';

const Hero = () => {
  const playPhotoSound = () => {
    const audio = document.getElementById('clickSound2');
    if (audio) {
      audio.volume = 0.25;
      audio.play().catch(error => {
        console.error('Erro ao tentar tocar o áudio:', error);
      });
    }
  };

  return (
    <div className="main flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto pt-12 mb-12 px-4">
      <div className="photo mb-8 md:mb-0 md:mr-12 flex-shrink-0">
        <img 
          src="./images/foto_maxwell.jpg" 
          alt="Foto de Maxwell" 
          onClick={playPhotoSound} 
          className="w-64 h-auto rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer shadow-lg"
        />
        <audio id="clickSound2" src="./audio/ouch.mp3" preload="auto"></audio>
      </div>

      <div className="content flex flex-col text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#47b8ec] mb-2 leading-tight">Maxwell Fernandes</h1>
        <h2 className="text-xl md:text-3xl font-bold text-[#47b8ec] mb-5 leading-tight">Desenvolvedor de Software</h2>
        <p className="text-lg md:text-2xl text-white/70 mb-8 leading-relaxed">
          <span className="text-white">😃</span>Oi! Meu nome é Maxwell e sou desenvolvedor de software.<br />
          Tenho trabalhado com desenvolvimento de jogos digitais e aplicações web/mobile.<br/>
          Atualmente curso Sistemas de Informação na UVV (2025/1).
        </p>

        <div className="social flex flex-wrap justify-center md:justify-start gap-4 items-center">
            <img src="./images/m8wlogo.svg" alt="M8W Logo" className="w-20 h-20 object-contain rounded-xl" />
            
            <a href="https://discord.com/users/381868391671136258" target="_blank" className="p-1 bg-[#2a3344] hover:scale-125 transition-transform duration-200 rounded flex items-center justify-center w-14 h-14">
              <img src="./images/discord.svg" alt="Discord" className="w-10 h-10" />
            </a>
            <a href="https://github.com/m8wstd" target="_blank" className="p-1 bg-[#2a3344] hover:scale-125 transition-transform duration-200 rounded flex items-center justify-center w-14 h-14">
              <img src="./images/github.svg" alt="GitHub" className="w-10 h-10" />
            </a>
            <a href="https://www.instagram.com/maxwellm8w/" target="_blank" className="p-1 bg-[#2a3344] hover:scale-125 transition-transform duration-200 rounded flex items-center justify-center w-14 h-14">
              <img src="./images/instagram.svg" alt="Instagram" className="w-10 h-10" />
            </a>
            <a href="https://www.linkedin.com/in/maxwellm8w/" target="_blank" className="p-1 bg-[#2a3344] hover:scale-125 transition-transform duration-200 rounded flex items-center justify-center w-14 h-14">
              <img src="./images/linkedin.svg" alt="Linkedin" className="w-10 h-10" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
