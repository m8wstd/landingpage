import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loadProjects, loadSiteConfig } from '../utils/projectStorage';
import { formatEmojisFullOpacity } from '../utils/emojiFormatter';
import { DiscordIcon, LinkedInIcon, GitHubIcon, WhatsAppIcon, MailIcon } from './SocialIcons';

export const MainContent = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const lang = isEn ? 'en' : 'pt';

  const [projects, setProjects] = useState([]);
  const [siteConfig, setSiteConfig] = useState(loadSiteConfig());

  // Estados para "Mostrar Mais" (limite de 5 com o 6º borrado)
  const [showAllExp, setShowAllExp] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const refreshData = () => {
      setProjects(loadProjects());
      setSiteConfig(loadSiteConfig());
    };

    refreshData();
    window.addEventListener('portfolio_data_updated', refreshData);
    window.addEventListener('portfolio_projects_updated', refreshData);
    return () => {
      window.removeEventListener('portfolio_data_updated', refreshData);
      window.removeEventListener('portfolio_projects_updated', refreshData);
    };
  }, []);

  const playPhotoSound = () => {
    const audio = document.getElementById('clickSound2');
    if (audio) {
      audio.volume = 0.25;
      audio.play().catch(err => console.error(err));
    }
  };

  const about = siteConfig?.about || {};
  const aboutText = about[lang] || about['pt'] || {};
  const education = about?.education || {};
  const eduText = education[lang] || education['pt'] || {};
  const experiences = siteConfig?.experience || [];
  const contact = siteConfig?.contact || {};
  const contactText = contact[lang] || contact['pt'] || {};
  const projectsSection = siteConfig?.projectsSection || {};
  const projectsSectionText = projectsSection[lang] || projectsSection['pt'] || {
    title: isEn ? "Projects" : "Destaques",
    desc: isEn ? "Selected game development and software engineering projects" : "Projetos selecionados de desenvolvimento de jogos e software"
  };

  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 max-w-6xl mx-auto space-y-28">
      {/* ─── HERO / ABOUT SECTION ─── */}
      <section id="about" className="scroll-mt-28 space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* Avatar com som interativo */}
          <div className="relative flex-shrink-0 group">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-[#2a3344] group-hover:border-[#47b8ec] shadow-2xl transition-all duration-300">
              <img
                src={about.avatar || "./images/foto_maxwell.jpeg"}
                alt={about.name || "Maxwell Fernandes"}
                onClick={playPhotoSound}
                className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <audio id="clickSound2" src="./audio/ouch.mp3" preload="auto"></audio>
          </div>

          {/* Texto de apresentação dinâmico */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold font-title text-[#47b8ec] mb-2 leading-tight">
              {about.name || "Maxwell Fernandes"}
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold font-title text-[#47b8ec] mb-5">
              {aboutText.subtitle}
            </h2>

            <div
              className="text-base sm:text-lg text-white/70 leading-relaxed mb-8 max-w-2xl font-sans whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatEmojisFullOpacity(aboutText.desc) }}
            />

            {/* Redes Sociais */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {about.socials?.discord && (
                <a
                  href={about.socials.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#2a3344] hover:bg-[#344158] hover:scale-110 border border-white/5 hover:border-[#47b8ec]/40 text-white/80 hover:text-[#47b8ec] transition-all rounded-xl flex items-center justify-center w-12 h-12 shadow"
                  title="Discord"
                >
                  <DiscordIcon className="w-6 h-6" />
                </a>
              )}

              {about.socials?.github && (
                <a
                  href={about.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#2a3344] hover:bg-[#344158] hover:scale-110 border border-white/5 hover:border-[#47b8ec]/40 text-white/80 hover:text-[#47b8ec] transition-all rounded-xl flex items-center justify-center w-12 h-12 shadow"
                  title="GitHub"
                >
                  <GitHubIcon className="w-6 h-6" />
                </a>
              )}

              {about.socials?.linkedin && (
                <a
                  href={about.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#2a3344] hover:bg-[#344158] hover:scale-110 border border-white/5 hover:border-[#47b8ec]/40 text-white/80 hover:text-[#47b8ec] transition-all rounded-xl flex items-center justify-center w-12 h-12 shadow"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-6 h-6" />
                </a>
              )}

              <button
                onClick={() => {
                  const target = document.getElementById('contact');
                  if (target) {
                    const navOffset = 90;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
                    window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="ml-2 px-6 py-2.5 rounded-xl bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] font-title font-bold text-sm tracking-wide transition-all shadow hover:scale-105 cursor-pointer"
              >
                {isEn ? 'Get in touch' : 'Falar comigo'}
              </button>
            </div>
          </div>
        </div>

        {/* ─── CARD DISCRETO DE FORMAÇÃO ACADÊMICA ─── */}
        <div className="pt-4">
          <div className="portfolio-card p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-5 border border-white/5 bg-[#1a2235]/60 hover:border-[#47b8ec]/30 transition-all rounded-2xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-4 w-full sm:w-auto text-center sm:text-left">
              {/* No mobile: imagem no topo centralizada; No desktop: à esquerda */}
              <div className="w-14 h-14 sm:w-14 sm:h-14 rounded-2xl bg-[#141c2c] border border-white/10 flex items-center justify-center p-2 flex-shrink-0 shadow-inner mx-auto sm:mx-0">
                <img
                  src={education.logo || "./images/uvv_logo.svg"}
                  alt="UVV"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "./images/m8wlogo.svg";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mb-1">
                  <h3 className="font-title font-bold text-white text-base sm:text-lg leading-snug">
                    {eduText.course}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-full bg-[#47b8ec]/10 text-[#47b8ec] border border-[#47b8ec]/20 font-semibold whitespace-nowrap">
                    {eduText.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white/70">
                  {education.institution || "Universidade Vila Velha (UVV)"}
                </p>
                {eduText.details && (
                  <p 
                    className="text-[11px] sm:text-xs text-white/50 mt-1 font-sans leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatEmojisFullOpacity(eduText.details) }}
                  />
                )}
              </div>
            </div>

            <div className="w-full sm:w-auto text-center sm:text-right flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
              <span className="text-[11px] sm:text-xs font-mono font-medium text-white/50 bg-white/5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/5 inline-block">
                {eduText.period}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE SECTION ─── */}
      <section id="experience" className="scroll-mt-28 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold font-title text-[#47b8ec]">
          {isEn ? 'Experience' : 'Experiência'}
        </h2>

        <div className="space-y-4 relative">
          {(showAllExp ? experiences : experiences.slice(0, 6)).map((exp, index) => {
            const expText = exp[lang] || exp['pt'] || {};
            const isBlurred = !showAllExp && index === 5;

            return (
              <div 
                key={exp.id} 
                className={`portfolio-card p-6 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start text-center sm:text-left transition-all ${
                  isBlurred ? 'opacity-40 blur-sm pointer-events-none select-none max-h-40 overflow-hidden' : ''
                }`}
              >
                {/* No mobile: imagem em cima centralizada; No desktop: à esquerda */}
                {exp.image ? (
                  <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-2xl bg-[#141c2c] border border-white/10 flex items-center justify-center p-2.5 flex-shrink-0 shadow-inner mx-auto sm:mx-0 sm:mt-1">
                    <img
                      src={exp.image}
                      alt={expText.company || "Experience"}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "./images/m8wlogo.svg";
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-2xl bg-[#141c2c] border border-white/10 flex items-center justify-center p-2.5 flex-shrink-0 shadow-inner mx-auto sm:mx-0 sm:mt-1">
                    <img
                      src="./images/m8wlogo.svg"
                      alt="M8W"
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0 w-full">
                  <h3 className="text-xl font-bold font-title text-white mb-1">
                    {expText.title}
                  </h3>
                  <p className="text-sm font-semibold text-white/80 mb-3">
                    {expText.company}
                  </p>
                  <p 
                    className="text-sm text-white/70 leading-relaxed font-sans mb-4 whitespace-pre-line text-left"
                    dangerouslySetInnerHTML={{ __html: formatEmojisFullOpacity(expText.desc) }}
                  />
                  
                  {/* Data / Período posicionado embaixo */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                    {expText.period && (
                      <span className="text-xs font-mono font-medium text-[#47b8ec] bg-[#47b8ec]/10 px-3 py-1 rounded-lg border border-[#47b8ec]/20">
                        {expText.period}
                      </span>
                    )}

                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {exp.tags.map((t, i) => (
                          <span key={i} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Botão Mostrar Mais se houver mais de 5 itens */}
          {!showAllExp && experiences.length > 5 && (
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center z-20">
              <button
                type="button"
                onClick={() => setShowAllExp(true)}
                className="px-6 py-2.5 rounded-full bg-[#141c2c] hover:bg-[#1a2235] text-[#47b8ec] border border-[#47b8ec]/40 font-title font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 cursor-pointer backdrop-blur-md"
              >
                {isEn ? 'Show More ↓' : 'Mostrar Mais ↓'}
              </button>
            </div>
          )}

          {showAllExp && experiences.length > 5 && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setShowAllExp(false)}
                className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 font-title font-bold text-xs transition-all cursor-pointer"
              >
                {isEn ? 'Show Less ↑' : 'Mostrar Menos ↑'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── PROJECTS & HIGHLIGHTS SECTION ─── */}
      <section id="projects" className="scroll-mt-28 space-y-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-title text-[#47b8ec]">
            {projectsSectionText.title}
          </h2>
        </div>

        <div className="space-y-6 relative">
          {(showAllProjects ? projects : projects.slice(0, 6)).map((proj, index) => {
            const title = proj.title?.[lang] || proj.title?.pt || proj.title;
            const subtitle = proj.subtitle?.[lang] || proj.subtitle?.pt || '';
            const desc = proj.description?.[lang] || proj.description?.pt || '';
            const isInternal = Boolean(proj.links?.internalRoute || proj.links?.details?.startsWith('/'));
            const detailUrl = proj.links?.internalRoute || proj.links?.details || proj.links?.external;
            const isBlurred = !showAllProjects && index === 5;

            const CardInner = (
              <div className={`portfolio-card p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 group transition-all ${
                isBlurred ? 'opacity-35 blur-sm pointer-events-none select-none max-h-48 overflow-hidden' : ''
              }`}>
                <div className="w-full md:w-[320px] flex-shrink-0 aspect-video rounded-xl overflow-hidden bg-[#1a2235] border border-white/10 group-hover:border-[#47b8ec]/50 transition-colors flex items-center justify-center">
                  <img
                    src={proj.image}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "./images/m8wlogo.svg";
                    }}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl sm:text-3xl font-bold font-title text-white group-hover:text-[#47b8ec] transition-colors">
                        {title}
                      </h3>
                      {detailUrl && !isBlurred && (
                        <svg className="w-5 h-5 text-white/50 group-hover:text-[#47b8ec] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </div>

                    {subtitle && (
                      <p className="text-xs font-mono font-medium text-[#47b8ec] uppercase tracking-wider mb-3">
                        {subtitle}
                      </p>
                    )}

                    <div
                      className="text-base text-white/70 leading-relaxed font-sans mb-5 whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: formatEmojisFullOpacity(desc) }}
                    />
                  </div>

                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-[#47b8ec]/10 text-[#47b8ec] border border-[#47b8ec]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );

            if (detailUrl && !isBlurred) {
              return isInternal ? (
                <Link key={proj.id} to={detailUrl} className="block no-underline">
                  {CardInner}
                </Link>
              ) : (
                <a key={proj.id} href={detailUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
                  {CardInner}
                </a>
              );
            }

            return <div key={proj.id}>{CardInner}</div>;
          })}

          {/* Botão Mostrar Mais para Projetos */}
          {!showAllProjects && projects.length > 5 && (
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center z-20">
              <button
                type="button"
                onClick={() => setShowAllProjects(true)}
                className="px-6 py-2.5 rounded-full bg-[#141c2c] hover:bg-[#1a2235] text-[#47b8ec] border border-[#47b8ec]/40 font-title font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 cursor-pointer backdrop-blur-md"
              >
                {isEn ? 'Show More ↓' : 'Mostrar Mais ↓'}
              </button>
            </div>
          )}

          {showAllProjects && projects.length > 5 && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setShowAllProjects(false)}
                className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 font-title font-bold text-xs transition-all cursor-pointer"
              >
                {isEn ? 'Show Less ↑' : 'Mostrar Menos ↑'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── CONTACT SECTION ─── */}
      <section id="contact" className="scroll-mt-28 py-10">
        <div className="portfolio-card p-8 sm:p-14 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-title text-[#47b8ec] mb-4">
            {contactText.title}
          </h2>

          <p
            className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-10 font-sans"
            dangerouslySetInnerHTML={{ __html: formatEmojisFullOpacity(contactText.desc) }}
          />

          <div className="flex flex-col gap-4 max-w-md mx-auto">
            {/* Discord */}
            {contact.discordUrl && (
              <a
                href={contact.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] px-6 py-4 rounded-2xl font-sans font-semibold text-base transition-transform hover:scale-105 shadow-md"
              >
                <DiscordIcon className="w-6 h-6 flex-shrink-0 text-[#0e1320]" />
                <span className="font-sans font-semibold">{contact.discordTag || "maxwellm8w"}</span>
              </a>
            )}

            {/* WhatsApp */}
            {contact.whatsappNumber && (
              <a
                href={contact.whatsappUrl || `https://wa.me/5527974002669?text=${encodeURIComponent(contactText.whatsappMsg || "Olá Maxwell!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] px-6 py-4 rounded-2xl font-sans font-semibold text-base transition-transform hover:scale-105 shadow-md"
              >
                <WhatsAppIcon className="w-6 h-6 flex-shrink-0 text-[#0e1320]" />
                <span className="font-sans font-semibold">{contact.whatsappNumber}</span>
              </a>
            )}

            {/* Email */}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-center gap-3 bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] px-6 py-4 rounded-2xl font-sans font-semibold text-base transition-transform hover:scale-105 shadow-md"
              >
                <MailIcon className="w-6 h-6 flex-shrink-0 text-[#0e1320] scale-110" />
                <span className="font-sans font-semibold">{contact.email}</span>
              </a>
            )}

            {/* Botões customizados */}
            {contact.customButtons && contact.customButtons.map((btn) => (
              <a
                key={btn.id}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#2a3344] hover:bg-[#344158] border border-white/10 text-white px-6 py-4 rounded-2xl font-sans font-semibold text-base transition-transform hover:scale-105 shadow-md"
              >
                <span className="font-sans font-semibold">{btn.label}</span>
                <span className="text-xs">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-white/40 mt-14 font-sans">
          © {new Date().getFullYear()} {about.name || "Maxwell Fernandes"} • Todos os direitos reservados.
        </div>
      </section>
    </div>
  );
};

export default MainContent;
