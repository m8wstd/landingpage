import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ─── Paleta por raridade ──────────────────────────────────────────────────────
const RARITY_COLORS = {
  Common:    { text: 'text-gray-400',   border: 'border-gray-500/40',   bg: 'bg-gray-500/10'   },
  Rare:      { text: 'text-blue-400',   border: 'border-blue-500/40',   bg: 'bg-blue-500/10'   },
  Epic:      { text: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-500/10' },
  Legendary: { text: 'text-yellow-400', border: 'border-yellow-500/40', bg: 'bg-yellow-500/10' },
  Mythic:    { text: 'text-red-400',    border: 'border-red-500/40',    bg: 'bg-red-500/10'    },
};

const ELEMENT_EMOJIS = {
  Water: '💧', Fire: '🔥', Earth: '🧱', Air: '💨',
  Darkness: '🌑', Ice: '❄️', Cloud: '☁️', Volcano: '🌋',
  Electric: '⚡', Divine: '✨',
};

// ─── Sistemas implementados ───────────────────────────────────────────────────
const SYSTEMS = [
  {
    id: 'battle',
    icon: '⚔️',
    title: { pt: 'Sistema de Batalha Turn-Based', en: 'Turn-Based Battle System' },
    file: 'BattleService.lua · 1.879 linhas',
    image: './images/screenshots/battle.png',
    tags: ['Knit', 'Turn Manager', 'Status Effects', 'TypeChart', 'OOP'],
    bullets: {
      pt: [
        '6 tipos de ação: Attack, Switch, Surrender, AoE, Life Steal e Forced Switch',
        'Fórmula GDD: Atk × SkillPwr × (100 / (100 + Def)) × TypeMod com crítico 2×',
        'TypeChart com 10 elementos: Water, Fire, Earth, Air, Ice, Darkness, Cloud, Volcano, Electric, Divine',
        '12 status effects: Burn, Sleep, Prison, Freeze, Paralysis, Barrier, Blindness, Overload, Fury, Slowness, Tailwind, Reflection',
        'Cooldown por skill por unidade com fallback seguro para quick_dash',
        'PvP multi-jogador via proximidade (raio 250 studs) com eventos Knit.CreateSignal',
      ],
      en: [
        '6 action types: Attack, Switch, Surrender, AoE, Life Steal and Forced Switch',
        'GDD formula: Atk × SkillPwr × (100 / (100 + Def)) × TypeMod with 2× crit multiplier',
        '10-element TypeChart: Water, Fire, Earth, Air, Ice, Darkness, Cloud, Volcano, Electric, Divine',
        '12 status effects: Burn, Sleep, Prison, Freeze, Paralysis, Barrier, Blindness, Overload, Fury, Slowness, Tailwind, Reflection',
        'Per-skill per-unit cooldown system with safe fallback to quick_dash',
        'Multi-player PvP via geographic proximity (250 stud radius) with Knit.CreateSignal events',
      ],
    },
  },
  {
    id: 'grid',
    icon: '🏗️',
    title: { pt: 'Grid de Construção Multiandar', en: 'Multi-Floor Build Grid' },
    file: 'GridService.lua · 1.497 linhas',
    image: './images/screenshots/grid.png',
    tags: ['Server-Authoritative', 'Grid 6×6', 'UUID', 'ProfileService', 'Knit'],
    bullets: {
      pt: [
        'Grid 6×6 por andar com até 8 andares desbloqueáveis (expansão vertical)',
        'Autoridade 100% server-side: posição calculada em CFrame no servidor',
        'UUID por edifício via HttpService:GenerateGUID para persistência única',
        'Bloqueio de remoção enquanto habitat tem ocupantes, construção em curso ou estado ativo',
        'Temporizadores de construção com skip por gems usando PremiumUtils',
        'Ferramentas de inventário sincronizadas nos respawns do personagem',
      ],
      en: [
        '6×6 grid per floor with up to 8 unlockable floors (vertical expansion)',
        '100% server-authoritative: real position calculated as CFrame on server',
        'Per-building UUID via HttpService:GenerateGUID for unique persistence',
        'Removal blocked while habitat has occupants, under construction or active state',
        'Build timers with gem-skip via PremiumUtils',
        'Inventory tools synced on every character respawn',
      ],
    },
  },
  {
    id: 'data',
    icon: '💾',
    title: { pt: 'Gerenciamento Seguro de Dados', en: 'Secure Data Management' },
    file: 'DataService.lua · ProfileService + ReplicaService',
    tags: ['ProfileService', 'ReplicaService', 'DataStore', 'Schema', 'Knit'],
    bullets: {
      pt: [
        'Persistência segura com ProfileService e reconciliação automática de schema',
        'Sincronização reativa com ReplicaService para estado em tempo real no cliente',
        'Schema com Resources (Gold, Aura, Gems), Inventory, Base, Campaign e Quests',
        'Proteção contra data wipe por versionamento de chave no DataStore',
        'Mutex de perfil aguardado antes de inicializar demais serviços (WaitAndLoadBase)',
        'Premium com multiplicadores de recompensa para produtos de Gamepass',
      ],
      en: [
        'Secure persistence with ProfileService and automatic schema reconciliation',
        'Reactive sync via ReplicaService for real-time state on the client',
        'Schema with Resources (Gold, Aura, Gems), Inventory, Base, Campaign and Quests',
        'Data wipe protection via DataStore key versioning',
        'Profile mutex awaited before initializing other services (WaitAndLoadBase)',
        'Premium system with reward multipliers for Gamepass products',
      ],
    },
  },
  {
    id: 'breeding',
    icon: '🧬',
    title: { pt: 'Breeding & Incubadora', en: 'Breeding & Incubator' },
    file: 'BreedingService.lua · IncubatorService.lua',
    image: './images/screenshots/breeding.png',
    tags: ['Genetics System', 'Element Fusion', '50 Brainrots', 'Tier Progression'],
    bullets: {
      pt: [
        '5 tiers de raridade: Common → Rare → Epic → Legendary → Mythic por fusão',
        '10 elementos com 30+ combinações únicas (ex: Fire + Darkness = Dragon Cannelloni)',
        'Incubadora com timer real (5s a 3600s) e cooldown por slot',
        'Breeding Sanctuary: dois brainrots geram um ovo de raridade superior',
        'Eggs tipados: CommonEgg até MythicEgg com pools de brainrots correspondentes',
        'Validação server-side de ocupação de slots antes de qualquer breeding',
      ],
      en: [
        '5 rarity tiers: Common → Rare → Epic → Legendary → Mythic via fusion',
        '10 elements with 30+ unique combinations (e.g. Fire + Darkness = Dragon Cannelloni)',
        'Incubator with real timer (5s to 3600s) and per-slot cooldown',
        'Breeding Sanctuary: two brainrots generate a higher-rarity egg',
        'Typed eggs: CommonEgg to MythicEgg with corresponding brainrot pools',
        'Server-side slot occupancy validation before any breeding action',
      ],
    },
  },
  {
    id: 'pvp',
    icon: '🏆',
    title: { pt: 'PvP: Duel, Raid & Arena (em desenvolvimento)', en: 'PvP: Duel, Raid & Arena (in development)' },
    file: 'PvPDuelService.lua · PvPRaidService.lua · ArenaService.lua',
    image: './images/screenshots/pvp.png',
    tags: ['Ranked Leagues', 'ELO-like', 'Instance-based', 'Async Matchmaking'],
    bullets: {
      pt: [
        '3 modos: Duelo (instanciado), Raid (assíncrono, invade base) e Arena (NPCs escaláveis)',
        'Ligas: Silver → Gold → Platinum → Diamond → Master com recompensas em gems',
        'Arenas de duelo instanciadas com spawn de modelos de Brainrot no mundo',
        'Raid assíncrona: ataca base de outro jogador offline, recompensa 2.000 Gold',
        'Arena com Easy/Normal/Hard e multiplicador de rewards por nível',
        'Integração com QuestService para logging de WinBattle e WinCampaign',
      ],
      en: [
        '3 modes: Duel (instanced), Raid (async, invades base) and Arena (scalable NPCs)',
        'Leagues: Silver → Gold → Platinum → Diamond → Master with gem rewards',
        'Instanced duel arenas with Brainrot model spawning inside the world',
        'Async raid: attacks another offline player\'s base, rewards 2,000 Gold',
        'Arena with Easy/Normal/Hard difficulties and level-based reward multiplier',
        'Integration with QuestService for WinBattle and WinCampaign logging',
      ],
    },
  },
  {
    id: 'quest',
    icon: '📜',
    title: { pt: 'Quests & Conquistas', en: 'Quests & Achievements' },
    file: 'QuestService.lua · QuestRegistry.lua',
    image: './images/screenshots/quests.png',
    tags: ['Main Story', 'Daily Quests', 'Achievements', 'Action Logging'],
    bullets: {
      pt: [
        '11 missões principais com recompensas em Gold, Aura e Gems',
        'Missões diárias reiniciáveis (Daily Feeder, Daily Winner) para engajamento contínuo',
        '20+ conquistas cobrindo hatching, descoberta, leveling e ligas',
        'LogAction genérico: qualquer serviço registra ações (WinBattle, HatchEgg, DiscoverBrainrot…)',
        'Progressão de campanha rastreada por StageId (Stage_1_2 → Stage_5_10)',
        'Recompensas escalonadas: 5 → 10 → 15 → 20 → 25 Gems',
      ],
      en: [
        '11 main story missions with Gold, Aura, and Gem rewards',
        'Resettable daily quests (Daily Feeder, Daily Winner) for continuous engagement',
        '20+ Achievements covering hatching, discovery, leveling, and leagues',
        'Generic LogAction: any service registers actions (WinBattle, HatchEgg, DiscoverBrainrot…)',
        'Campaign progression tracked by StageId (Stage_1_2 → Stage_5_10)',
        'Scaled rewards: 5 → 10 → 15 → 20 → 25 Gems',
      ],
    },
  },
  {
    id: 'tools',
    icon: '🛠️',
    title: { pt: 'Workflow & Ferramentas Pro', en: 'Professional Workflow & Tooling' },
    file: 'Rojo · VS Code · Git · GitHub · Wally · Selene',
    tags: ['Rojo', 'Wally', 'Knit', 'Selene', 'Git', 'VS Code'],
    bullets: {
      pt: [
        'Roblox Studio ↔ VS Code via Rojo (default.project.json) com hot reload',
        'Gerenciador Wally para dependências: ProfileService, ReplicaService, Knit, Signal',
        'Framework Knit para arquitetura Service/Controller com injeção de dependências',
        'Análise estática com Selene e .luaurc para detectar erros antes do runtime',
        'Git/GitHub com branches, commits semânticos e .rojoignore',
        'Separação rigorosa: server/Services, client/Controllers, shared/Data, shared/Utils',
      ],
      en: [
        'Roblox Studio ↔ VS Code via Rojo (default.project.json) with hot reload',
        'Wally package manager: ProfileService, ReplicaService, Knit, Signal',
        'Knit framework for Service/Controller architecture with dependency injection',
        'Static analysis with Selene and .luaurc to catch errors before runtime',
        'Git/GitHub with branches, semantic commits and .rojoignore',
        'Strict separation: server/Services, client/Controllers, shared/Data, shared/Utils',
      ],
    },
  },
];

// ─── Showcase de Brainrots ────────────────────────────────────────────────────
const SHOWCASE_BRAINROTS = [
  { name: 'Tralalero Tralala',    element: 'Water',    rarity: 'Common',    hp: 85,  atk: 30,  def: 15, spd: 10 },
  { name: 'Fragola La La La',     element: 'Fire',     rarity: 'Common',    hp: 81,  atk: 38,  def: 10, spd: 12 },
  { name: 'Cappuccino Assassino', element: 'Darkness', rarity: 'Epic',      hp: 90,  atk: 55,  def: 15, spd: 30 },
  { name: 'Chimpanzini Bananini', element: 'Earth',    rarity: 'Legendary', hp: 115, atk: 60,  def: 55, spd: 10 },
  { name: 'Dragon Cannelloni',    element: 'Fire',     rarity: 'Legendary', hp: 85,  atk: 90,  def: 25, spd: 40 },
  { name: 'Blackhole Goat',       element: 'Darkness', rarity: 'Mythic',    hp: 110, atk: 110, def: 45, spd: 30 },
  { name: 'Ganganzelli Trulala',  element: 'Electric', rarity: 'Legendary', hp: 81,  atk: 105, def: 10, spd: 44 },
  { name: 'Bombombini Gusini',    element: 'Cloud',    rarity: 'Mythic',    hp: 140, atk: 80,  def: 65, spd: 10 },
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

function BrainrotCard({ b, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const col = RARITY_COLORS[b.rarity];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-[#2a3344] border rounded-2xl p-4 ${col.border} transition-all duration-500`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className={`text-xs font-extrabold tracking-widest uppercase mb-2 ${col.text}`}>
        {b.rarity}
      </div>
      <div className="text-3xl mb-1 leading-none">{ELEMENT_EMOJIS[b.element] || '🌀'}</div>
      <div className="text-sm font-bold text-white mb-3 leading-snug">{b.name}</div>
      <StatBar label="HP"  value={b.hp} />
      <StatBar label="ATK" value={b.atk} />
      <StatBar label="DEF" value={b.def} />
      <StatBar label="SPD" value={b.spd} />
    </div>
  );
}

function ImageSlot({ src }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10">
      {!errored ? (
        <img
          src={src}
          alt="Screenshot do jogo"
          className={`w-full h-auto block rounded-xl transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
      ) : null}
      {(errored || !loaded) && (
        <div
          className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/20 bg-[#1a2235]/60 text-white/30 text-sm font-sans"
          style={{ minHeight: '180px', display: errored || !loaded ? 'flex' : 'none' }}
        >
          <span className="text-2xl">🖼️</span>
          <span>Coloque uma print aqui</span>
          <span className="text-xs font-mono text-white/20">{src}</span>
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
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
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
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.2s`,
      }}
      onClick={() => setOpen(o => !o)}
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
            {sys.tags.map(t => (
              <span key={t} className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#47b8ec]/10 text-[#47b8ec] border border-[#47b8ec]/20">
                {t}
              </span>
            ))}
          </div>
        </div>
        <span
          className="text-[#47b8ec] flex-shrink-0 text-lg transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▾
        </span>
      </div>

      {/* Expandable */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? '900px' : '0px' }}
      >
        <ul className="mt-5 space-y-2 pl-0 list-none">
          {sys.bullets[lang].map((bullet, i) => (
            <li key={i} className="flex gap-2 text-sm text-white/70 leading-relaxed font-sans">
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

const BrainrotLeaguePage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'pt';

  const S = {
    pt: {
      back: '← Voltar ao portfólio de Game Dev',
      tag: 'Projeto em Destaque',
      title: 'Brainrot League',
      sub: 'Jogo completo de batalha por turnos no Roblox',
      lines: '17 serviços · +7.000 linhas de Luau · 50 criaturas únicas',
      s1: '17 Serviços', s1s: 'server-side',
      s2: '50 Criaturas', s2s: 'brainrots únicos',
      s3: '30 Skills', s3s: 'habilidades únicas',
      s4: '+7.000 Linhas', s4s: 'de código Luau',
      systems: 'Sistemas Implementados',
      hint: 'Clique em cada card para ver os detalhes técnicos',
      roster: 'Roster de Brainrots',
      roster_sub: '50 criaturas em 5 raridades e 10 elementos',
      cta: 'Precisa de um Scripter?',
      cta_desc: 'Se você busca um desenvolvedor com código limpo, arquitetura escalável e workflow profissional — fale comigo.',
      cta_btn: 'Entrar em Contato',
    },
    en: {
      back: '← Back to Game Dev portfolio',
      tag: 'Featured Project',
      title: 'Brainrot League',
      sub: 'Full turn-based battle game on Roblox',
      lines: '17 services · +7,000 lines of Luau · 50 unique creatures',
      s1: '17 Services', s1s: 'server-side',
      s2: '50 Creatures', s2s: 'unique brainrots',
      s3: '30 Skills', s3s: 'unique abilities',
      s4: '+7,000 Lines', s4s: 'of Luau code',
      systems: 'Implemented Systems',
      hint: 'Click each card to expand technical details',
      roster: 'Brainrot Roster',
      roster_sub: '50 creatures across 5 rarities and 10 elements',
      cta: 'Need a Scripter?',
      cta_desc: 'If you need a developer with clean code, scalable architecture and professional workflow — let\'s talk.',
      cta_btn: 'Get in Touch',
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
            backgroundImage: "url('./images/brainrot_league_thumbnail_v3.png')",
            filter: 'blur(18px)',
            transform: 'scale(1.1)',
          }}
        />
        {/* Overlay escuro para legibilidade */}
        <div className="absolute inset-0 bg-[#1a2235]/75" />

        {/* Conteúdo do hero (acima do fundo) */}
        <div className="relative z-10 w-full flex flex-col items-center">

        {/* Back link */}
        <Link
          to="/gamedev"
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

        <h2 className="text-xl md:text-3xl font-bold text-white/87 mb-3">{S.sub}</h2>

        <p className="text-sm font-mono text-white/40 mb-10">{S.lines}</p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { num: S.s1, sub: S.s1s },
            { num: S.s2, sub: S.s2s },
            { num: S.s3, sub: S.s3s },
            { num: S.s4, sub: S.s4s },
          ].map((s, i) => (
            <div key={i} className="bg-[#2a3344] border border-white/10 rounded-2xl px-6 py-4 text-center min-w-[130px] hover:border-[#47b8ec]/30 transition-colors">
              <div className="text-2xl font-extrabold text-[#47b8ec]">{s.num}</div>
              <div className="text-xs text-white/40 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
        </div>{/* fecha z-10 wrapper */}
      </div>{/* fecha hero */}

      {/* ── SISTEMAS ─────────────────────────────────────────────────────── */}
      <div className="bg-[#2a3344] w-full py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#47b8ec] text-center mb-3">
            {S.systems}
          </h1>
          <p className="text-sm text-white/40 text-center mb-8 italic">{S.hint}</p>

          <div className="flex flex-col gap-4">
            {SYSTEMS.map((sys, i) => (
              <SystemCard key={sys.id} sys={sys} lang={lang} delay={i * 50} />
            ))}
          </div>
        </div>
      </div>

      {/* ── ROSTER ───────────────────────────────────────────────────────── */}
      <div className="bg-[#1a2235] w-full py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#47b8ec] text-center mb-3">
            {S.roster}
          </h1>
          <p className="text-sm text-white/40 text-center mb-10">{S.roster_sub}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {SHOWCASE_BRAINROTS.map((b, i) => (
              <BrainrotCard key={b.name} b={b} delay={i * 70} />
            ))}
          </div>

          {/* Legenda */}
          <div className="flex flex-wrap justify-center gap-5 mt-10">
            {Object.entries(RARITY_COLORS).map(([r, c]) => (
              <div key={r} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${c.bg.replace('/10', '')} ${c.text}`}
                  style={{ backgroundColor: 'currentColor' }} />
                <span className={`text-xs ${c.text}`}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#2a3344] w-full py-20 flex justify-center">
        <div className="w-4/5 max-w-6xl flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#47b8ec] mb-5">{S.cta}</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10 font-sans">
            {S.cta_desc}
          </p>
          <Link
            to="/gamedev"
            className="btn w-full md:w-[480px] flex items-center justify-center gap-4 bg-[#47b8ec] text-black font-bold px-10 py-4 rounded-2xl no-underline transition-transform hover:scale-105 hover:bg-[#70c1e6]"
          >
            {S.cta_btn} →
          </Link>
          <br />
          <a href="https://www.roblox.com/share?code=3dd7b4dc5c41d2448dd5a57308bf76e6&type=ExperienceDetails&stamp=1775183224227" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#47b8ec] underline">Play on Roblox</a>
        </div>
      </div>

    </div>
  );
};

export default BrainrotLeaguePage;
