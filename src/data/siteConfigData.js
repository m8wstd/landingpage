// Default master site content configuration
export const defaultSiteConfig = {
  about: {
    name: "Maxwell Fernandes",
    avatar: "./images/foto_maxwell.jpeg",
    logo: "./images/m8wlogo.svg",
    socials: {
      discord: "https://discord.com/users/381868391671136258",
      github: "https://github.com/m8wstd",
      linkedin: "https://www.linkedin.com/in/maxwellm8w/",
    },
    pt: {
      subtitle: "Desenvolvedor de Software",
      desc: "<span class='text-white'>😃</span> Oi! Meu nome é Maxwell, sou um Desenvolvedor de Software especializado no desenvolvimento de jogos utilizando o Roblox Studio.<br/>Também tenho experiência com desenvolvimento web e programação no geral.<br/>Atualmente curso Sistemas de Informação na UVV (2025/1).",
    },
    en: {
      subtitle: "Software Developer",
      desc: "<span class='text-white'>😃</span> Hey! I'm Maxwell, a Software Developer specializing in game development using Roblox Studio.<br/>I also have experience in web development and programming in general.<br/>I am currently pursuing a degree in Information Systems at UVV (2025 – Present).",
    },
    education: {
      institution: "Universidade Vila Velha (UVV)",
      logo: "./images/uvv_logo.svg",
      pt: {
        course: "Bacharelado em Sistemas de Informação",
        period: "2025 — 2028 (Atualmente no 1º período)",
        status: "Em andamento",
        details: "Fundamentos de Ciência da Computação, POO, Estrutura de Dados e Engenharia de Software."
      },
      en: {
        course: "Bachelor's in Information Systems",
        period: "2025 — 2028 (Currently in progress)",
        status: "In Progress",
        details: "Computer Science fundamentals, OOP, Data Structures, and Software Engineering."
      }
    }
  },
  experience: [
    {
      id: "exp-1",
      image: "./images/m8wlogo.svg",
      tags: ["Roblox Studio", "Luau", "OOP", "ProfileService", "UI/UX", "Sound Design"],
      pt: {
        period: "2020 — PRESENTE",
        title: "Desenvolvedor de Software & Criador de Jogos",
        company: "Projetos Independentes & Roblox Studio (Luau)",
        desc: "Desenvolvimento de sistemas autônomos de ciclo de jogo, combate por turnos, grids multiandar, otimização de performance e sincronização de dados via ProfileService. Criação de interfaces gráficas completas e sound design original."
      },
      en: {
        period: "2020 — PRESENT",
        title: "Software Developer & Game Creator",
        company: "Independent Projects & Roblox Studio (Luau)",
        desc: "Development of autonomous game cycle systems, turn-based combat, multi-floor construction grids, performance profiling, and DataStore sync via ProfileService. Full custom UI/UX design and original audio production."
      }
    }
  ],
  contact: {
    discordTag: "maxwellm8w",
    discordUrl: "https://discord.com/users/381868391671136258",
    whatsappNumber: "+55 27 97400-2669",
    whatsappUrl: "https://wa.me/5527974002669",
    email: "maxwellfercar@gmail.com",
    customButtons: [],
    pt: {
      title: "Contate-me!",
      desc: "Quer desenvolver alguma coisa e precisa de ajuda?<br/>É só me mandar mensagem!",
      whatsappMsg: "Olá Maxwell, gostaria de mais informações!"
    },
    en: {
      title: "Contact me!",
      desc: "Want to build something awesome or need help with a project?<br/>Just send me a message!",
      whatsappMsg: "Hi Maxwell, I would like more information!"
    }
  },
  projectsSection: {
    pt: {
      title: "Destaques",
      desc: "Projetos selecionados de desenvolvimento de jogos e software"
    },
    en: {
      title: "Projects",
      desc: "Selected game development and software engineering projects"
    }
  }
};
