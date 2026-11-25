export const initialProjects = [
  {
    id: "extraction-corp",
    featured: true,
    category: "Game Systems",
    title: {
      pt: "Round Game System",
      en: "Round Game System"
    },
    subtitle: {
      pt: "Roblox Architecture & Performance",
      en: "Roblox Architecture & Performance"
    },
    description: {
      pt: "Desenvolvimento de um sistema autônomo de ciclos de jogo com gerenciamento dinâmico de mapas e distribuição inteligente de funções. Inclui automação de ambiente, rastreamento de estatísticas em tempo real e otimização de performance via limpeza automatizada.",
      en: "Development of an autonomous game cycle system featuring dynamic map management and intelligent role distribution. Includes environment automation, real-time stats tracking, and performance optimization via automated cleanup."
    },
    image: "./images/round_system.jpg",
    tags: ["Roblox Studio", "Luau", "OOP", "Architecture", "Optimization"],
    metrics: [
      { label: "Architecture", value: "Modular Luau" },
      { label: "Cycle Management", value: "Autonomous" }
    ],
    links: {
      details: null,
      external: null
    }
  },
  {
    id: "brainrot-league",
    featured: true,
    category: "Roblox Game",
    title: {
      pt: "Brainrot League",
      en: "Brainrot League"
    },
    subtitle: {
      pt: "Roblox Combat & Creature Training",
      en: "Roblox Combat & Creature Training"
    },
    description: {
      pt: "Jogo no Roblox onde o objetivo é treinar e cuidar de criaturas para batalhar competitivamente. Sistema completo de progressão, combate em arena e sincronização de dados.",
      en: "Roblox experience where players train and nurture creatures to compete in arena battles. Features complete progression, combat mechanics, and persistent data sync."
    },
    image: "./images/brainrot_league_thumbnail_v3.png",
    tags: ["Roblox", "Luau", "Game Design", "Combat System", "DataStore"],
    metrics: [
      { label: "Status", value: "Active Development" },
      { label: "Category", value: "PvP & Training" }
    ],
    links: {
      internalRoute: "/brainrot-league",
      details: "/brainrot-league",
      external: null
    }
  },
  {
    id: "kolos-clicker",
    featured: true,
    category: "Game / Demo",
    title: {
      pt: "Kolos Clicker (DEMO)",
      en: "Kolos Clicker (DEMO)"
    },
    subtitle: {
      pt: "Incremental Experience & UI/UX Design",
      en: "Incremental Experience & UI/UX Design"
    },
    description: {
      pt: "Um jogo incremental onde você clica para construir o Kolosverso e descobrir novos Kolos. Desenvolvi toda a mecânica da demo, além de ter desenhado a interface gráfica, artes visuais e sound design.",
      en: "An incremental clicker game to build the Kolosverse and discover new Kolos. Fully programmed demo mechanics alongside complete custom UI/UX design, visual assets, and sound effects."
    },
    image: "./images/kolos/thumb.png",
    tags: ["Game Design", "Custom UI/UX", "Audio FX", "Incremental Mechanics"],
    metrics: [
      { label: "Deliverables", value: "Full Stack Game Demo" },
      { label: "Art & SFX", value: "Custom Built" }
    ],
    links: {
      internalRoute: "/kolos-clicker",
      details: "/kolos-clicker",
      external: null
    }
  },
  {
    id: "maxluz",
    featured: false,
    category: "Web Development",
    title: {
      pt: "Site Maxluz",
      en: "Maxluz Website"
    },
    subtitle: {
      pt: "Frontend Development & UI/UX",
      en: "Frontend Development & UI/UX"
    },
    description: {
      pt: "Atuação como desenvolvedor frontend e UX/UI Designer na concepção e implementação do portal institucional e de benefícios para a Maxluz.",
      en: "Frontend Developer and UX/UI Designer responsible for the visual interface and web experience of the Maxluz Benefits Club platform."
    },
    image: "./images/maxluz.png",
    tags: ["Frontend", "UI/UX Design", "Responsive Web", "TailwindCSS"],
    metrics: [
      { label: "Role", value: "Frontend & UI/UX" }
    ],
    links: {
      external: "https://maxluz.com"
    }
  },
  {
    id: "greenfoot-pokemon",
    featured: false,
    category: "Software & Java",
    title: {
      pt: "Greenfoot Pokémon Battle",
      en: "Greenfoot Pokémon Battle"
    },
    subtitle: {
      pt: "Java Object-Oriented Battle Engine",
      en: "Java Object-Oriented Battle Engine"
    },
    description: {
      pt: "Adaptação fiel do sistema de batalha de Pokémon da primeira geração implementado em Java com princípios rígidos de POO. Contém ~40 Pokémon e 80 movimentos calibrados.",
      en: "Faithful adaptation of 1st-generation Pokémon turn-based battle mechanics built in Java using OOP patterns. Features ~40 Pokémon and 80 calibrated moves."
    },
    image: "./images/greenfoot-pokemon.png",
    tags: ["Java", "OOP", "Game Logic", "Greenfoot"],
    metrics: [
      { label: "Database", value: "40+ Pokémon & 80 Moves" }
    ],
    links: {
      external: "https://youtu.be/HPk9YogxCwg"
    }
  },
  {
    id: "bad-apple",
    featured: false,
    category: "Creative Coding",
    title: {
      pt: "BadApple! Scratch Remake",
      en: "BadApple! Scratch Remake"
    },
    subtitle: {
      pt: "Algorithmic Animation & Audio Synchronization",
      en: "Algorithmic Animation & Audio Synchronization"
    },
    description: {
      pt: "Jogo interativo inspirado no clássico videoclipe 'BadApple!!', com renderização sincronizada com áudio e produção de arte digital.",
      en: "Interactive project inspired by the iconic 'BadApple!!' clip, featuring frame-by-frame visual logic synchronized with custom music and art."
    },
    image: "./images/game_gif.gif",
    tags: ["Scratch", "Audio Sync", "Creative Coding", "Pixel Art"],
    metrics: [
      { label: "Community", value: "Scratch Project" }
    ],
    links: {
      external: "https://scratch.mit.edu/projects/1154340439"
    }
  },
  {
    id: "lua-certification",
    featured: false,
    category: "Certification & Skills",
    title: {
      pt: "Capacitação Profissional em Lua",
      en: "Lua Professional Certification"
    },
    subtitle: {
      pt: "Native Lua & Game Engines (Roblox / LÖVE2D)",
      en: "Native Lua & Game Engines (Roblox / LÖVE2D)"
    },
    description: {
      pt: "Capacitação avançada no desenvolvimento com linguagem Lua pura, metamétodos, gerenciamento de memória e integração com engines de jogos.",
      en: "Advanced training in native Lua language, meta-tables, memory lifecycle, and pragmatic integration with Roblox Studio & LÖVE2D engines."
    },
    image: "./images/lua-programming-language.jpg",
    tags: ["Lua", "Roblox Studio", "LÖVE2D", "Algorithms"],
    metrics: [
      { label: "Credential", value: "Verified Certificate" }
    ],
    links: {
      external: "./images/UC-403c6679-ead1-4e58-956c-245520259164.pdf"
    }
  },
  {
    id: "lua-terminal",
    featured: false,
    category: "Software Simulation",
    title: {
      pt: "Terminal Bancário em Lua",
      en: "Lua Banking Terminal Simulation"
    },
    subtitle: {
      pt: "Secure CLI State Machine & Flow",
      en: "Secure CLI State Machine & Flow"
    },
    description: {
      pt: "Simulação de terminal bancário em Lua com autenticação com senhas hash, máquina de estados finitos e tratamento de exceções.",
      en: "Banking terminal CLI simulator built with native Lua featuring state-machine flow, transaction logging, and validation boundaries."
    },
    image: "./images/lua_terminal.gif",
    tags: ["Lua", "State Machine", "Data Integrity", "CLI"],
    metrics: [
      { label: "Security", value: "Input Sanitization" }
    ],
    links: {
      external: null
    }
  },
  {
    id: "fortes-engenharia",
    featured: false,
    category: "Web & Sustainability",
    title: {
      pt: "Fortes Engenharia Sustentável",
      en: "Fortes Sustainable Platform"
    },
    subtitle: {
      pt: "Recycling & Industrial Matchmaking Portal",
      en: "Recycling & Industrial Matchmaking Portal"
    },
    description: {
      pt: "Plataforma desenvolvida para conectar empresas produtoras de resíduos sólidos a cooperativas e recicladores certificados.",
      en: "Digital matchmaking platform connecting industrial waste producers with certified recycling facilities and co-ops."
    },
    image: "./images/fortes.png",
    tags: ["Web", "Interdisciplinary", "Sustainability", "UX/UI"],
    metrics: [
      { label: "Focus", value: "Circular Economy" }
    ],
    links: {
      external: null
    }
  }
];
