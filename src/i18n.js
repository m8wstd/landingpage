import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      hero: {
        subtitle: "Desenvolvedor Web",
        desc: "<span class='text-white'>😃</span>Oi! Meu nome é Maxwell e sou desenvolvedor web.<br />Tenho trabalhado com aplicações web/mobile em react/react-native.<br/>Atualmente curso Sistemas de Informação na UVV (2025/1).",
        link: "Clique aqui para ver sobre desenvolvimento de jogos!"
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
      gamedev_hero: {
        subtitle: "Desenvolvedor de Jogos",
        desc: "<span class='text-white'>🎮</span> Oi! Meu nome é Maxwell, sou Desenvolvedor de Jogos e Scripter de Roblox.<br/>Sou especializado em Luau e no desenvolvimento de jogos utilizando o Roblox Studio.<br/>Tenho experiência com fluxos de trabalho profissionais envolvendo Rojo, VS Code, Git e GitHub para controle de versão, além de saber usar ProfileService e ReplicaService para manipulação segura de dados, e frameworks como Knit.<br/>Atualmente curso Sistemas de Informação na UVV (2025/1).",
        link: "Clique aqui para ver sobre Desenvolvimento Web!"
      },
      gamedev_highlights: {
        title: "Destaques",
        brainrot_title: "Brainrot League",
        brainrot_desc: "Jogo no Roblox onde o objetivo é treinar e cuidar de brainrots para batalhar contra outros brainrots.",
        brainrot_details: "Ver detalhes técnicos",
        badapple_title: "BadApple!",
        badapple_desc: "Jogo em Scratch inspirado no video clipe da música \"BadApple!!\", onde programei e produzi a música e a arte."
      },
      gamedev_contact: {
        title: "Contate-me!",
        desc: "Quer desenvolver um jogo incrível ou precisa de ajuda em seu projeto?<br/>É só me mandar mensagem!",
        whatsapp_msg: "Olá Maxwell, vi seu portfólio de Game Dev e gostaria de falar com você!",
        email_subj: "Contato via site - Game Dev"
      }
    }
  },
  en: {
    translation: {
      hero: {
        subtitle: "Web Developer",
        desc: "<span class='text-white'>😃</span>Hi! I'm Maxwell, a Web Developer.<br />I specialize in building performant web and mobile applications using React and React Native.<br/>Currently studying Computer Information Systems at UVV (2025/1).",
        link: "Click here to see my Game Development portfolio!"
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
      gamedev_hero: {
        subtitle: "Game Developer",
        desc: "<span class='text-white'>🎮</span>Hey! I'm Maxwell, a Game Developer & Roblox Scripter.<br />I specialize in Luau and game development using Roblox Studio.<br/>I have experience with professional workflows involving Rojo, VS Code, Git, and GitHub for version control, as well as ProfileService and ReplicaService for secure data handling, and frameworks like Knit.<br/>Currently studying Computer Information Systems at UVV (2025/1).",
        link: "Click here to see my Web Development portfolio!"
      },
      gamedev_highlights: {
        title: "Highlights",
        brainrot_title: "Brainrot League",
        brainrot_desc: "A Roblox game where the goal is to train and care for brainrots to battle against other brainrots.",
        brainrot_details: "See technical details",
        badapple_title: "BadApple!",
        badapple_desc: "A Scratch game inspired by the \"BadApple!!\" music video, where I programmed and produced both the music and art."
      },
      gamedev_contact: {
        title: "Contact me!",
        desc: "Want to develop an amazing game or need help with a project?<br/>Just send me a message!",
        whatsapp_msg: "Hi Maxwell, I saw your Game Dev portfolio and would love to chat!",
        email_subj: "Contact via website - Game Dev"
      }
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
