import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ─── Sistemas implementados ───────────────────────────────────────────────────
const SYSTEMS = [
  {
    id: "idle",
    icon: "∞",
    title: {
      pt: "Garlic Idle System",
      en: "Garlic Idle System",
    },
    file: "GarlicIdleSystem",
    image: "./images/kolos/click.gif",
    tags: ["Idle", "Clicker", "Modular", "Secure", "OOP"],
    bullets: {
      pt: [
        "Organização: Separa o componente do jogador capaz de evoluir dos demais sistemas",
        "Adaptável: Pode mudar facilmente o sistema de progressão do jogo",
        "Seguro: O sistema valida tudo no servidor",
        "Bem Otimizado: Possui tempo de espera e otimizações, evitando o lag",
        "Dados do Jogador: Salva os dados do jogador corretamente",
      ],
      en: [
        "Organization: Separates the player component capable of evolving from the other systems",
        "Adaptable: You can easily change the game's progression system",
        "Secure: The system validates everything on the server",
        "Well Optimized: Features wait times and optimizations to prevent lag",
        "Player Data: Saves player data correctly",
      ],
    },
  },
  {
    id: "world",
    icon: "🌌",
    title: {
      pt: "Mundo",
      en: "World",
    },
    file: "MainGui",
    image: "./images/kolos/world.gif",
    tags: ["2D", "GUI", "IA"],
    bullets: {
      pt: [
        "Um universo para os Kolos viverem: Um mundo criado apenas com GUI, baseado em Chunks e coordenadas",
        "Inteligência Artificial: Kolos decidem qual vai ser a próxima ação que vão tomar",
        "3D Desativado: Foi utilizado técnicas de otimização para deixar o jogo o mais fiel possível ao 2D",
      ],
      en: [
        "A universe for Kolos to live in: A world created entirely with GUI, based on Chunks and coordinates",
        "Artificial Intelligence: Kolos decide what their next action will be",
        "3D Disabled: Optimization techniques were used to keep the game as faithful to 2D as possible",
      ],
    },
  },
  {
    id: "tree",
    icon: "🌳",
    title: {
      pt: "Upgrades e Árvore de Habilidades",
      en: "Upgrades and Skill Tree",
    },
    file: "Upgrades",
    image: "./images/kolos/skill_tree.png",
    tags: ["GUI", "Progression", "Upgrades", "Skill Tree"],
    bullets: {
      pt: [
        "Upgrades: O jogo conta com melhorias para os Kolos e construções para eles trabalharem",
        "Habilidades: Uma árvore de habilidades bonita e cheia de possibilidades",
        "Soft Reset: Sistema de reencarnação para voltar ainda mais forte",
      ],
      en: [
        "Upgrades: The game features upgrades for Kolos and buildings for them to work in",
        "Skills: A beautiful skill tree full of possibilities",
        "Soft Reset: A reincarnation system that lets you come back even stronger",
      ],
    },
  },
  {
    id: "sound",
    icon: "🎧",
    title: {
      pt: "Sons e Artes Visuais",
      en: "Sound and Visual Arts",
    },
    file: "Audio-visual",
    tags: ["Animation", "Sound Design", "Design"],
    bullets: {
      pt: [
        "Sonoplastia: Sons produzidos por mim que aumentam a imersão no jogo",
        "Artes Visuais: Interface gráfica, ícones, personagens, construções e muito mais",
        "Animação: Movimentação dos personagens, feedback de clique, e mais futuramente",
      ],
      en: [
        "Sound Design: Sound effects created by me to enhance the game's immersion",
        "Visual Art: User interface, icons, characters, buildings, and much more",
        "Animation: Character movement, click feedback, and much more to come",
      ],
    },
  },
];

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function StatBar({ label, value, max = 140 }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="mb-1">
      <div className="flex justify-between text-xs text-white/40 mb-1">
        <span>{label}</span>
        <span className="text-white/70 font-bold">{value}</span>
      </div>
      <div className="bg-white/10 rounded h-1.5 overflow-hidden">
        <div
          className="h-full rounded bg-[#47b8ec] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ImageSlot({ src }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10">
      {!errored && (
        <img
          src={src}
          alt="Screenshot do jogo"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`block w-full h-auto transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {(errored || !loaded) && (
        <div className="w-full min-h-[180px] flex items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-[#1a2235]/60">
          Coloque uma print aqui
        </div>
      )}
    </div>
  );
}

function SystemCard({ sys, lang, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-[#2a3344] border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-[#47b8ec]/40 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.2s`,
      }}
      onClick={() => setOpen((o) => !o)}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0 leading-none">{sys.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-extrabold text-white mb-1 leading-tight">
            {sys.title[lang]}
          </h3>
          <p className="text-xs text-[#47b8ec] font-mono mb-3">{sys.file}</p>
          <div className="flex flex-wrap gap-2">
            {sys.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#47b8ec]/10 text-[#47b8ec] border border-[#47b8ec]/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <span
          className="text-[#47b8ec] flex-shrink-0 text-lg transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </div>

      {/* Expandable */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? "2000px" : "0px" }}
      >
        <ul className="mt-5 space-y-2 pl-0 list-none">
          {sys.bullets[lang].map((bullet, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm text-white/70 leading-relaxed font-sans"
            >
              <span className="text-[#47b8ec] font-bold flex-shrink-0">›</span>
              {bullet}
            </li>
          ))}
        </ul>

        {/* ── Área de screenshot (opcional) ────────────────────────────── */}
        {sys.image && (
          <div className="mt-6">
            <ImageSlot src={sys.image} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

const KolosClickerPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "pt";

  const S = {
    pt: {
      back: "← Voltar ao portfólio",
      tag: "Projeto em Destaque",
      title: "Kolos Clicker",
      sub: "Um clicker 100% GUI no Roblox.",
      s1: "Kolos",
      s1s: "personagens únicos",
      s2: "Upgrades",
      s2s: "melhoram a produtividade",
      s3: "Árvore de Habilidades",
      s3s: "habilidades únicas",
      systems: "Sistemas Implementados",
      hint: "Clique em cada card para ver os detalhes técnicos",
      roster: "Roster de Brainrots",
      roster_sub: "50 criaturas em 5 raridades e 10 elementos",
      cta: "Precisa de um desenvolvedor?",
      cta_desc:
        "Se você busca um desenvolvedor com código limpo, arquitetura escalável e workflow profissional — fale comigo.",
      cta_btn: "Entrar em Contato",
    },
    en: {
      back: "← Back to portfolio",
      tag: "Featured Project",
      title: "Kolos Clicker",
      sub: "A 100% GUI-based clicker in Roblox.",
      s1: "Kolos",
      s1s: "unique characters",
      s2: "Upgrades",
      s2s: "improve productivity",
      s3: "Skill Tree",
      s3s: "unique abilities",
      systems: "Implemented Systems",
      hint: "Click each card to expand technical details",
      roster: "Brainrot Roster",
      roster_sub: "50 creatures across 5 rarities and 10 elements",
      cta: "Need a developer?",
      cta_desc:
        "If you need a developer with clean code, scalable architecture and professional workflow — let's talk.",
      cta_btn: "Get in Touch",
    },
  }[lang];

  return (
    <div className="min-h-screen bg-[#1a2235] text-white/70 font-sans">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="w-full pt-12 pb-16 flex flex-col items-center text-center px-4 relative overflow-hidden">
        {/* Imagem desfocada de fundo */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('./images/kolos/thumb.png')",
            filter: "blur(18px)",
            transform: "scale(1.1)",
          }}
        />
        {/* Overlay escuro para legibilidade */}
        <div className="absolute inset-0 bg-[#1a2235]/75" />

        {/* Conteúdo do hero (acima do fundo) */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Back link */}
          <Link
            to="/"
            className="text-sm text-white/40 hover:text-[#47b8ec] underline mb-8 transition-colors self-start max-w-6xl w-full mx-auto"
          >
            {S.back}
          </Link>

          {/* Tag */}
          <span className="text-xs font-extrabold tracking-[3px] uppercase text-[#47b8ec] mb-4">
            {S.tag}
          </span>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#47b8ec] mb-4 leading-tight">
            {S.title}
          </h1>

          <h2 className="text-xl md:text-3xl font-bold text-white/87 mb-3">
            {S.sub}
          </h2>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { num: S.s1, sub: S.s1s },
              { num: S.s2, sub: S.s2s },
              { num: S.s3, sub: S.s3s },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-[#2a3344] border border-white/10 rounded-2xl px-6 py-4 text-center min-w-[130px] hover:border-[#47b8ec]/30 transition-colors"
              >
                <div className="text-2xl font-extrabold text-[#47b8ec]">
                  {s.num}
                </div>
                <div className="text-xs text-white/40 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
        {/* fecha z-10 wrapper */}
      </div>
      {/* fecha hero */}

      {/* ── SISTEMAS ─────────────────────────────────────────────────────── */}
      <div className="bg-[#2a3344] w-full py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#47b8ec] text-center mb-3">
            {S.systems}
          </h1>
          <p className="text-sm text-white/40 text-center mb-8 italic">
            {S.hint}
          </p>

          <div className="flex flex-col gap-4">
            {SYSTEMS.map((sys, i) => (
              <SystemCard key={sys.id} sys={sys} lang={lang} delay={i * 50} />
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#2a3344] w-full py-20 flex justify-center">
        <div className="w-4/5 max-w-6xl flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#47b8ec] mb-5">
            {S.cta}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10 font-sans">
            {S.cta_desc}
          </p>
          <Link
            to="/"
            className="btn w-full md:w-[480px] flex items-center justify-center gap-4 bg-[#47b8ec] text-black font-bold px-10 py-4 rounded-2xl no-underline transition-transform hover:scale-105 hover:bg-[#70c1e6]"
          >
            {S.cta_btn} →
          </Link>
          <br />
          <a
            href="https://www.roblox.com/share?code=1ff908f3f2420c44836d69a737c1dac7&type=ExperienceDetails&stamp=1785255208712"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[#47b8ec] underline"
          >
            Play on Roblox
          </a>
        </div>
      </div>
    </div>
  );
};

export default KolosClickerPage;
