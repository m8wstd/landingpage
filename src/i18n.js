import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      hero: {
        subtitle: "Desenvolvedor de Jogos",
        desc: "<span class='text-white'>😃</span> Oi! Meu nome é Maxwell, sou Desenvolvedor de Jogos e Scripter de Roblox.<br/>Sou especializado em Luau e no desenvolvimento de jogos utilizando o Roblox Studio.<br/>Também tenho experiência com desenvolvimento web.<br/>Atualmente curso Sistemas de Informação na UVV (2025/1).",
      },
      highlights: {
        title: "Destaques",
        maxluz_title: "Site da Maxluz",
        maxluz_desc: "Fui desenvolvedor frontend e UX/UI Designer do site da empresa: <a href='https://maxluz.com' target='_blank' class='text-[#47b8ec] hover:underline'>Maxluz - Clube de Benefícios</a>.",
        badapple_title: "BadApple!",
        badapple_desc: "Jogo em Scratch inspirado no video clipe da música \"BadApple!!\", onde programei e produzi a música e a arte.",
        fortes_title: "Projeto: Fortes Engenharia",
        fortes_desc: "Um site para a empresa Fortes feito em um projeto interdisciplinar, onde tem o objetivo de reunir recicladores e produtores de lixo em um só lugar."
      },
      contact: {
        title: "Contate-me!",
        desc: "Quer desenvolver alguma coisa e precisa de ajuda?<br/>É só me mandar mensagem!",
        whatsapp_msg: "Olá Maxwell, gostaria de mais informações!",
        email_subj: "Contato via site"
      },
      gamedev_highlights: {
        title: "Destaques",
        brainrot_title: "Brainrot League",
        brainrot_desc: "Jogo no Roblox onde o objetivo é treinar e cuidar de brainrots para batalhar contra outros brainrots.",
        brainrot_details: "Ver detalhes técnicos",
        badapple_title: "BadApple!",
        badapple_details: "Jogue",
        badapple_desc: "Jogo em Scratch inspirado no video clipe da música \"BadApple!!\", onde programei e produzi a música e a arte.",
        extraction_title: "Round Game System",
        extraction_desc: "Desenvolvimento de um sistema autônomo de ciclos de jogo com gerenciamento dinâmico de mapas e distribuição inteligente de funções. Inclui automação de ambiente, rastreamento de estatísticas em tempo real e otimização de performance.",
        greenfootpokemon_title: "Greenfoot Pokémon Battle",
        greenfootpokemon_desc: "Uma adaptação do sistema de batalha de Pokémon da primeira geração para o Greenfoot, feita em Java (e orientada a objetos). Tem cerca de 40 Pokémon e 80 movimentos.",
        greenfootpokemon_details: "Ver vídeo",
      },
    }
  },
  en: {
    translation: {
      hero: {
        subtitle: "Game Developer",
        desc: "<span class='text-white'>😃</span>Hey! I'm Maxwell, a Game Developer & Roblox Scripter.<br />I specialize in Luau and game development using Roblox Studio.<br/>I also have experience in web development.<br/>Currently studying Computer Information Systems at UVV (2025/1).",
        link: "Click here to see my Web Development portfolio!"
      },
      highlights: {
        title: "Highlights",
        maxluz_title: "Maxluz Website",
        maxluz_desc: "Frontend Developer and UX/UI Designer for the company website: <a href='https://maxluz.com' target='_blank' class='text-[#47b8ec] hover:underline'>Maxluz - Benefits Club</a>.",
        badapple_title: "BadApple!",
        badapple_desc: "A Scratch game inspired by the \"BadApple!!\" music video, where I programmed and produced both the music and art.",
        fortes_title: "Project: Fortes Engenharia",
        fortes_desc: "A website for Fortes built as an interdisciplinary project, aiming to connect recyclers and waste producers in one place."
      },
      contact: {
        title: "Contact me!",
        desc: "Want to build something awesome or need help with a project?<br/>Just send me a message!",
        whatsapp_msg: "Hi Maxwell, I'd like more information!",
        email_subj: "Contact via website"
      },
      gamedev_highlights: {
        title: "Highlights",
        brainrot_title: "Brainrot League",
        brainrot_desc: "A Roblox game where the goal is to train and care for brainrots to battle against other brainrots.",
        brainrot_details: "See technical details",
        badapple_title: "BadApple!",
        badapple_details: "Play",
        badapple_desc: "A Scratch game inspired by the \"BadApple!!\" music video, where I programmed and produced both the music and art.",
        extraction_title: "Round Game System",
        extraction_desc: "Development of an autonomous game cycle system featuring dynamic map management and intelligent role distribution. Includes environment automation, real-time stats tracking, and performance optimization via automated cleanup.",
        greenfootpokemon_title: "Greenfoot Pokémon Battle",
        greenfootpokemon_desc: "An adaptation of the first-generation Pokémon battle system for Greenfoot, made in Java (and object-oriented). It has around 40 Pokémon and 80 moves.",
        greenfootpokemon_details: "Watch video",
      },
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    detection: {
      order: ['querystring', 'navigator', 'localStorage'],
      lookupQuerystring: 'lang',
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
