import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  verifyAdminPassword,
  getAdminPassword,
  setAdminPassword,
  isAuthenticated,
  setAuthenticated,
  loadProjects,
  saveProjects,
  loadSiteConfig,
  saveSiteConfig,
  resetAllToDefaults
} from '../utils/projectStorage';

export const SecretAdminPortal = () => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Abas do Painel
  const [activeTab, setActiveTab] = useState('about'); // 'about', 'experience', 'projects', 'contact', 'security'

  // Alternador de Idioma de Edição no estilo LinkedIn (PT vs EN)
  const [editLang, setEditLang] = useState('pt'); // 'pt' | 'en'

  // Dados
  const [projects, setProjects] = useState([]);
  const [siteConfig, setSiteConfig] = useState(null);

  // Estados de formulário do Projeto
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    id: '',
    category: 'Roblox Game',
    image: '',
    tags: '',
    internalRoute: '',
    externalLink: '',
    featured: true,
    pt: { title: '', subtitle: '', desc: '' },
    en: { title: '', subtitle: '', desc: '' }
  });

  // Estados de formulário de Experiência
  const [editingExpId, setEditingExpId] = useState(null);
  const [expForm, setExpForm] = useState({
    id: '',
    image: '',
    tags: '',
    pt: { period: '', title: '', company: '', desc: '' },
    en: { period: '', title: '', company: '', desc: '' }
  });

  // Botão customizado de Contato
  const [btnForm, setBtnForm] = useState({ label: '', url: '', color: '#47b8ec' });

  // Senha
  const [newPassInput, setNewPassInput] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthed(true);
      setProjects(loadProjects());
      setSiteConfig(loadSiteConfig());
    }
  }, []);

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (verifyAdminPassword(passwordInput)) {
      setAuthenticated(true);
      setAuthed(true);
      setProjects(loadProjects());
      setSiteConfig(loadSiteConfig());
    } else {
      setErrorMsg('Senha incorreta. Tente novamente.');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setAuthed(false);
    navigate('/');
  };

  // ─── SALVAR SOBRE ───────────────────────────────────────────────────────────
  const handleSaveAbout = (e) => {
    e.preventDefault();
    saveSiteConfig(siteConfig);
    showNotification(`Seção "Sobre" salva com sucesso (${editLang.toUpperCase()})!`);
  };

  // ─── SALVAR PROJETO ─────────────────────────────────────────────────────────
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.pt.title.trim() && !projectForm.en.title.trim()) {
      alert('Preencha ao menos o título do projeto.');
      return;
    }

    const tagsArr = projectForm.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newObj = {
      id: editingProjectId || projectForm.id.trim() || `proj-${Date.now()}`,
      category: projectForm.category.trim() || 'General',
      featured: projectForm.featured,
      title: {
        pt: projectForm.pt.title.trim() || projectForm.en.title.trim(),
        en: projectForm.en.title.trim() || projectForm.pt.title.trim()
      },
      subtitle: {
        pt: projectForm.pt.subtitle.trim() || projectForm.en.subtitle.trim(),
        en: projectForm.en.subtitle.trim() || projectForm.pt.subtitle.trim()
      },
      description: {
        pt: projectForm.pt.desc.trim() || projectForm.en.desc.trim(),
        en: projectForm.en.desc.trim() || projectForm.pt.desc.trim()
      },
      image: projectForm.image.trim() || './images/m8wlogo.svg',
      tags: tagsArr,
      links: {
        internalRoute: projectForm.internalRoute.trim() || null,
        details: projectForm.internalRoute.trim() || null,
        external: projectForm.externalLink.trim() || null
      }
    };

    let updated;
    if (editingProjectId) {
      updated = projects.map(p => p.id === editingProjectId ? newObj : p);
    } else {
      updated = [newObj, ...projects];
    }

    saveProjects(updated);
    setProjects(updated);
    setEditingProjectId(null);
    setProjectForm({
      id: '',
      category: 'Roblox Game',
      image: '',
      tags: '',
      internalRoute: '',
      externalLink: '',
      featured: true,
      pt: { title: '', subtitle: '', desc: '' },
      en: { title: '', subtitle: '', desc: '' }
    });
    showNotification('Projeto salvo com sucesso!');
  };

  const handleEditProjectClick = (p) => {
    setEditingProjectId(p.id);
    setProjectForm({
      id: p.id,
      category: p.category || '',
      featured: p.featured ?? true,
      image: p.image || '',
      tags: p.tags ? p.tags.join(', ') : '',
      internalRoute: p.links?.internalRoute || '',
      externalLink: p.links?.external || '',
      pt: {
        title: p.title?.pt || p.title || '',
        subtitle: p.subtitle?.pt || '',
        desc: p.description?.pt || ''
      },
      en: {
        title: p.title?.en || p.title || '',
        subtitle: p.subtitle?.en || '',
        desc: p.description?.en || ''
      }
    });
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este projeto?')) {
      const updated = projects.filter(p => p.id !== id);
      saveProjects(updated);
      setProjects(updated);
      showNotification('Projeto removido.');
    }
  };

  const handleMoveProject = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedItem);

    saveProjects(updated);
    setProjects(updated);
    showNotification('Ordem dos projetos atualizada!');
  };

  // ─── SALVAR EXPERIÊNCIA ─────────────────────────────────────────────────────
  const handleSaveExp = (e) => {
    e.preventDefault();
    if (!expForm.pt.title.trim() && !expForm.en.title.trim()) {
      alert('Preencha ao menos o título do cargo/experiência.');
      return;
    }

    const tagsArr = expForm.tags.split(',').map(t => t.trim()).filter(Boolean);
    const newExp = {
      id: editingExpId || `exp-${Date.now()}`,
      image: expForm.image.trim() || '',
      tags: tagsArr,
      pt: {
        period: expForm.pt.period.trim() || expForm.en.period.trim(),
        title: expForm.pt.title.trim() || expForm.en.title.trim(),
        company: expForm.pt.company.trim() || expForm.en.company.trim(),
        desc: expForm.pt.desc.trim() || expForm.en.desc.trim()
      },
      en: {
        period: expForm.en.period.trim() || expForm.pt.period.trim(),
        title: expForm.en.title.trim() || expForm.pt.title.trim(),
        company: expForm.en.company.trim() || expForm.pt.company.trim(),
        desc: expForm.en.desc.trim() || expForm.pt.desc.trim()
      }
    };

    let updatedExp;
    if (editingExpId) {
      updatedExp = siteConfig.experience.map(item => item.id === editingExpId ? newExp : item);
    } else {
      updatedExp = [...siteConfig.experience, newExp];
    }

    const newCfg = { ...siteConfig, experience: updatedExp };
    saveSiteConfig(newCfg);
    setSiteConfig(newCfg);
    setEditingExpId(null);
    setExpForm({
      id: '',
      image: '',
      tags: '',
      pt: { period: '', title: '', company: '', desc: '' },
      en: { period: '', title: '', company: '', desc: '' }
    });
    showNotification('Experiência salva com sucesso!');
  };

  const handleEditExpClick = (exp) => {
    setEditingExpId(exp.id);
    setExpForm({
      id: exp.id,
      image: exp.image || '',
      tags: exp.tags ? exp.tags.join(', ') : '',
      pt: {
        period: exp.pt?.period || '',
        title: exp.pt?.title || '',
        company: exp.pt?.company || '',
        desc: exp.pt?.desc || ''
      },
      en: {
        period: exp.en?.period || '',
        title: exp.en?.title || '',
        company: exp.en?.company || '',
        desc: exp.en?.desc || ''
      }
    });
  };

  const handleDeleteExp = (id) => {
    if (window.confirm('Excluir este bloco de experiência?')) {
      const updated = siteConfig.experience.filter(e => e.id !== id);
      const newCfg = { ...siteConfig, experience: updated };
      saveSiteConfig(newCfg);
      setSiteConfig(newCfg);
      showNotification('Experiência removida.');
    }
  };

  const handleMoveExp = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= siteConfig.experience.length) return;

    const updated = [...siteConfig.experience];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedItem);

    const newCfg = { ...siteConfig, experience: updated };
    saveSiteConfig(newCfg);
    setSiteConfig(newCfg);
    showNotification('Ordem das experiências atualizada!');
  };

  // ─── SALVAR CONTATO ─────────────────────────────────────────────────────────
  const handleSaveContact = (e) => {
    e.preventDefault();
    saveSiteConfig(siteConfig);
    showNotification('Configurações de Contato salvas com sucesso!');
  };

  const handleAddCustomBtn = (e) => {
    e.preventDefault();
    if (!btnForm.label.trim() || !btnForm.url.trim()) return;
    const currentBtns = siteConfig.contact.customButtons || [];
    const newCfg = {
      ...siteConfig,
      contact: {
        ...siteConfig.contact,
        customButtons: [...currentBtns, { ...btnForm, id: `btn-${Date.now()}` }]
      }
    };
    saveSiteConfig(newCfg);
    setSiteConfig(newCfg);
    setBtnForm({ label: '', url: '', color: '#47b8ec' });
    showNotification('Botão de contato adicionado!');
  };

  const handleDeleteCustomBtn = (btnId) => {
    const currentBtns = siteConfig.contact.customButtons || [];
    const newCfg = {
      ...siteConfig,
      contact: {
        ...siteConfig.contact,
        customButtons: currentBtns.filter(b => b.id !== btnId)
      }
    };
    saveSiteConfig(newCfg);
    setSiteConfig(newCfg);
  };

  // ─── ALTERAR SENHA ──────────────────────────────────────────────────────────
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassInput.trim().length < 4) {
      alert('A senha deve ter pelo menos 4 caracteres.');
      return;
    }
    setAdminPassword(newPassInput.trim());
    setNewPassInput('');
    showNotification('Senha mestra alterada com sucesso!');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Tem certeza de que deseja restaurar tudo aos valores originais de fábrica?')) {
      resetAllToDefaults();
      setProjects(loadProjects());
      setSiteConfig(loadSiteConfig());
      showNotification('Site restaurado aos padrões originais.');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // TELA DE LOGIN
  // ─────────────────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0e1320] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute w-[500px] h-[500px] bg-[#47b8ec]/10 rounded-full blur-[120px] -top-20 -left-20 pointer-events-none"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -bottom-20 -right-20 pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-[#141c2c]/90 border border-white/10 shadow-2xl rounded-3xl p-8 sm:p-10 backdrop-blur-xl">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#1a2235] border border-[#47b8ec]/40 flex items-center justify-center p-3 mb-4 shadow-lg shadow-[#47b8ec]/10">
                <img src="./images/m8wlogo.svg" alt="M8W" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-title text-white tracking-tight">
                M8W Command Vault
              </h1>
              <p className="text-sm text-white/50 mt-1 font-sans">
                Painel Administrativo Restrito
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#47b8ec] mb-2">
                  Senha Mestra de Segurança
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Digite a senha..."
                    className="w-full bg-[#1a2235] border border-white/10 focus:border-[#47b8ec] text-white rounded-xl px-4 py-3.5 text-sm placeholder-white/30 focus:outline-none transition-all shadow-inner"
                    autoFocus
                  />
                  <div className="absolute right-3.5 top-3.5 text-white/30">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] font-title font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#47b8ec]/20 hover:scale-[1.02] cursor-pointer"
              >
                Autenticar e Entrar
              </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-white/5">
              <button
                onClick={() => navigate('/')}
                className="text-xs text-white/50 hover:text-[#47b8ec] transition-colors flex items-center justify-center gap-1.5 mx-auto font-medium cursor-pointer"
              >
                <span>←</span>
                <span>Voltar ao site público</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PAINEL ADMINISTRATIVO INTERNO (COM SELETOR DE IDIOMA ESTILO LINKEDIN)
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0e1320] text-white/80 font-sans pb-24 pt-6 px-4 sm:px-8">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto bg-[#141c2c] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 mb-6 shadow-xl">
        <div className="flex items-center gap-3">
          <img src="./images/m8wlogo.svg" alt="M8W" className="w-8 h-8 object-contain" />
          <div>
            <h1 className="text-lg font-bold font-title text-white flex items-center gap-2">
              <span>M8W Central Control</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                Online
              </span>
            </h1>
            <p className="text-xs text-white/40">Gerenciamento completo multilíngue</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#1a2235] hover:bg-[#222c42] border border-white/10 text-white transition-all cursor-pointer"
          >
            Ver Site Público
          </button>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all cursor-pointer"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Notificação flutuante */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center justify-between shadow-lg">
            <span>✨ {successMsg}</span>
          </div>
        )}

        {/* Barra de Idioma de Edição estilo LinkedIn */}
        <div className="bg-[#141c2c] border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🌐</span>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Idioma de Edição de Texto
              </span>
              <span className="text-[11px] text-white/50">
                Alterne entre os idiomas para editar os textos separadamente igual no LinkedIn.
              </span>
            </div>
          </div>

          <div className="flex items-center bg-[#1a2235] p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setEditLang('pt')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-title font-bold transition-all cursor-pointer ${
                editLang === 'pt'
                  ? 'bg-[#47b8ec] text-[#0e1320] shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span>🇧🇷</span>
              <span>Português (PT)</span>
            </button>

            <button
              onClick={() => setEditLang('en')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-title font-bold transition-all cursor-pointer ${
                editLang === 'en'
                  ? 'bg-[#47b8ec] text-[#0e1320] shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span>🇺🇸</span>
              <span>English (EN)</span>
            </button>
          </div>
        </div>

        {/* Abas na ordem solicitada */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#141c2c] border border-white/10 rounded-2xl">
          {[
            { id: 'about', label: 'Sobre & Formação', icon: '👤' },
            { id: 'experience', label: 'Experiência', icon: '💼' },
            { id: 'projects', label: 'Projetos', icon: '🚀' },
            { id: 'contact', label: 'Contato & Botões', icon: '📬' },
            { id: 'security', label: 'Segurança & Senha', icon: '🔑' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-title font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#47b8ec] text-[#0e1320] shadow-md shadow-[#47b8ec]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ─── 1. ABA SOBRE & FORMAÇÃO ────────────────────────────────────── */}
        {activeTab === 'about' && siteConfig && (
          <div className="space-y-6">
            <div className="bg-[#141c2c] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-title text-white">
                  👤 Editar Sobre ({editLang === 'pt' ? 'Português' : 'Inglês'})
                </h2>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#47b8ec]/10 text-[#47b8ec] border border-[#47b8ec]/20 font-semibold uppercase">
                  Editando: {editLang === 'pt' ? 'Português' : 'English'}
                </span>
              </div>

              <form onSubmit={handleSaveAbout} className="space-y-5">
                {/* Campos Globais (Independente do idioma) */}
                <div className="p-4 bg-[#1a2235]/40 rounded-2xl border border-white/5 space-y-4">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">
                    Configurações Globais (Valem para ambos os idiomas)
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#47b8ec] mb-1">Nome Principal</label>
                      <input
                        type="text"
                        value={siteConfig.about.name}
                        onChange={(e) => setSiteConfig({
                          ...siteConfig,
                          about: { ...siteConfig.about, name: e.target.value }
                        })}
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#47b8ec] mb-1">Caminho da Foto de Perfil</label>
                      <input
                        type="text"
                        value={siteConfig.about.avatar}
                        onChange={(e) => setSiteConfig({
                          ...siteConfig,
                          about: { ...siteConfig.about, avatar: e.target.value }
                        })}
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                  </div>
                </div>

                {/* Campos Específicos do Idioma Ativo */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#47b8ec] mb-1">
                      Subtítulo ({editLang === 'pt' ? 'Português' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={siteConfig.about[editLang]?.subtitle || ''}
                      onChange={(e) => setSiteConfig({
                        ...siteConfig,
                        about: {
                          ...siteConfig.about,
                          [editLang]: {
                            ...siteConfig.about[editLang],
                            subtitle: e.target.value
                          }
                        }
                      })}
                      placeholder={editLang === 'pt' ? "Desenvolvedor de Software" : "Software Developer"}
                      className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#47b8ec] mb-1">
                      Biografia Completa ({editLang === 'pt' ? 'Português - aceita HTML' : 'English - supports HTML'})
                    </label>
                    <textarea
                      rows={5}
                      value={siteConfig.about[editLang]?.desc || ''}
                      onChange={(e) => setSiteConfig({
                        ...siteConfig,
                        about: {
                          ...siteConfig.about,
                          [editLang]: {
                            ...siteConfig.about[editLang],
                            desc: e.target.value
                          }
                        }
                      })}
                      className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    />
                  </div>
                </div>

                {/* Bloco de Formação Acadêmica no Idioma Ativo */}
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <h3 className="text-base font-bold font-title text-[#47b8ec]">
                    🎓 Card de Formação ({editLang === 'pt' ? 'Português' : 'English'})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">
                        Nome do Curso ({editLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={siteConfig.about.education[editLang]?.course || ''}
                        onChange={(e) => setSiteConfig({
                          ...siteConfig,
                          about: {
                            ...siteConfig.about,
                            education: {
                              ...siteConfig.about.education,
                              [editLang]: {
                                ...siteConfig.about.education[editLang],
                                course: e.target.value
                              }
                            }
                          }
                        })}
                        placeholder={editLang === 'pt' ? "Bacharelado em Sistemas de Informação" : "Bachelor's in Information Systems"}
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">
                        Período / Ano ({editLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={siteConfig.about.education[editLang]?.period || ''}
                        onChange={(e) => setSiteConfig({
                          ...siteConfig,
                          about: {
                            ...siteConfig.about,
                            education: {
                              ...siteConfig.about.education,
                              [editLang]: {
                                ...siteConfig.about.education[editLang],
                                period: e.target.value
                              }
                            }
                          }
                        })}
                        placeholder={editLang === 'pt' ? "2025 — 2028 (Atualmente no 1º período)" : "2025 — 2028 (Currently in progress)"}
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">
                        Status ({editLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={siteConfig.about.education[editLang]?.status || ''}
                        onChange={(e) => setSiteConfig({
                          ...siteConfig,
                          about: {
                            ...siteConfig.about,
                            education: {
                              ...siteConfig.about.education,
                              [editLang]: {
                                ...siteConfig.about.education[editLang],
                                status: e.target.value
                              }
                            }
                          }
                        })}
                        placeholder={editLang === 'pt' ? "Em andamento" : "In Progress"}
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">
                        Texto de Detalhes ({editLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={siteConfig.about.education[editLang]?.details || ''}
                        onChange={(e) => setSiteConfig({
                          ...siteConfig,
                          about: {
                            ...siteConfig.about,
                            education: {
                              ...siteConfig.about.education,
                              [editLang]: {
                                ...siteConfig.about.education[editLang],
                                details: e.target.value
                              }
                            }
                          }
                        })}
                        placeholder={editLang === 'pt' ? "Fundamentos de Ciência da Computação, POO, Estrutura de Dados..." : "Computer Science fundamentals, OOP, Data Structures..."}
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] font-title font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ─── 2. ABA EXPERIÊNCIA ────────────────────────────────────────── */}
        {activeTab === 'experience' && siteConfig && (
          <div className="space-y-6">
            <div className="bg-[#141c2c] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-title text-white">
                  💼 {editingExpId ? 'Editar Experiência' : 'Adicionar Nova Experiência'} ({editLang === 'pt' ? 'Português' : 'Inglês'})
                </h2>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#47b8ec]/10 text-[#47b8ec] border border-[#47b8ec]/20 font-semibold uppercase">
                  Editando: {editLang === 'pt' ? 'Português' : 'English'}
                </span>
              </div>

              <form onSubmit={handleSaveExp} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#47b8ec] mb-1">
                      Título / Cargo ({editLang.toUpperCase()}) *
                    </label>
                    <input
                      type="text"
                      value={expForm[editLang]?.title || ''}
                      onChange={(e) => setExpForm({
                        ...expForm,
                        [editLang]: { ...expForm[editLang], title: e.target.value }
                      })}
                      placeholder={editLang === 'pt' ? "Desenvolvedor de Software" : "Software Developer"}
                      className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1">
                      Empresa / Projeto ({editLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={expForm[editLang]?.company || ''}
                      onChange={(e) => setExpForm({
                        ...expForm,
                        [editLang]: { ...expForm[editLang], company: e.target.value }
                      })}
                      placeholder={editLang === 'pt' ? "Projetos Independentes & Roblox Studio" : "Independent Projects & Roblox Studio"}
                      className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1">
                      Período ({editLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={expForm[editLang]?.period || ''}
                      onChange={(e) => setExpForm({
                        ...expForm,
                        [editLang]: { ...expForm[editLang], period: e.target.value }
                      })}
                      placeholder={editLang === 'pt' ? "2020 — PRESENTE" : "2020 — PRESENT"}
                      className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1">Caminho da Imagem / Logo (opcional)</label>
                    <input
                      type="text"
                      value={expForm.image}
                      onChange={(e) => setExpForm({ ...expForm, image: e.target.value })}
                      placeholder="./images/m8wlogo.svg ou https://..."
                      className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1">Tags (globais, separadas por vírgula)</label>
                  <input
                    type="text"
                    value={expForm.tags}
                    onChange={(e) => setExpForm({ ...expForm, tags: e.target.value })}
                    placeholder="Roblox Studio, Luau, OOP"
                    className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1">
                    Descrição ({editLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={3}
                    value={expForm[editLang]?.desc || ''}
                    onChange={(e) => setExpForm({
                      ...expForm,
                      [editLang]: { ...expForm[editLang], desc: e.target.value }
                    })}
                    className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] font-title font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
                  >
                    {editingExpId ? 'Salvar Alteração' : 'Adicionar Bloco'}
                  </button>
                  {editingExpId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingExpId(null);
                        setExpForm({ id: '', tags: '', pt: { period: '', title: '', company: '', desc: '' }, en: { period: '', title: '', company: '', desc: '' } });
                      }}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Lista Atual */}
            <div className="bg-[#141c2c] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h3 className="text-lg font-bold font-title text-white">Blocos Cadastrados ({siteConfig.experience.length})</h3>
                <span className="text-xs text-white/50">
                  Use os botões <span className="text-[#47b8ec] font-bold">▲ / ▼</span> para reordenar a exibição
                </span>
              </div>

              <div className="space-y-3">
                {siteConfig.experience.map((exp, index) => (
                  <div key={exp.id} className="p-4 bg-[#1a2235] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      {/* Botões de Reordenação */}
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveExp(index, -1)}
                          title="Mover para cima"
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                            index === 0
                              ? 'opacity-20 cursor-not-allowed bg-white/5 text-white/40'
                              : 'bg-white/10 hover:bg-[#47b8ec] hover:text-[#0e1320] text-white cursor-pointer'
                          }`}
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          disabled={index === siteConfig.experience.length - 1}
                          onClick={() => handleMoveExp(index, 1)}
                          title="Mover para baixo"
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                            index === siteConfig.experience.length - 1
                              ? 'opacity-20 cursor-not-allowed bg-white/5 text-white/40'
                              : 'bg-white/10 hover:bg-[#47b8ec] hover:text-[#0e1320] text-white cursor-pointer'
                          }`}
                        >
                          ▼
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-white/30 w-5 text-center">
                        #{index + 1}
                      </span>

                      {exp.image && (
                        <img
                          src={exp.image}
                          alt=""
                          className="w-10 h-10 rounded-lg object-contain bg-black/40 border border-white/10 flex-shrink-0 p-1"
                          onError={(e) => { e.currentTarget.src = "./images/m8wlogo.svg"; }}
                        />
                      )}

                      <div className="min-w-0">
                        <span className="text-xs font-mono font-semibold text-[#47b8ec] uppercase block">
                          {exp[editLang]?.period || exp['pt']?.period}
                        </span>
                        <h4 className="font-bold font-title text-white text-base truncate">
                          {exp[editLang]?.title || exp['pt']?.title}
                        </h4>
                        <p className="text-xs text-white/50 truncate">
                          {exp[editLang]?.company || exp['pt']?.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                      <button
                        onClick={() => handleEditExpClick(exp)}
                        className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#47b8ec]/10 hover:bg-[#47b8ec]/20 text-[#47b8ec] border border-[#47b8ec]/30 transition-all cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteExp(exp.id)}
                        className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all cursor-pointer"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── 3. ABA PROJETOS ────────────────────────────────────────────── */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Cabeçalho da Seção de Projetos Editável */}
            <div className="bg-[#141c2c] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-lg font-bold font-title text-[#47b8ec] mb-1">
                🏷️ Título da Seção de Projetos ({editLang === 'pt' ? 'Português' : 'Inglês'})
              </h2>
              <p className="text-xs text-white/50 mb-4">
                Personalize o título exibido no topo da lista de projetos.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={siteConfig?.projectsSection?.[editLang]?.title || ''}
                  onChange={(e) => setSiteConfig({
                    ...siteConfig,
                    projectsSection: {
                      ...siteConfig.projectsSection,
                      [editLang]: {
                        ...siteConfig.projectsSection?.[editLang],
                        title: e.target.value
                      }
                    }
                  })}
                  placeholder={editLang === 'pt' ? "Destaques" : "Projects"}
                  className="flex-1 bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                />
                <button
                  type="button"
                  onClick={() => {
                    saveSiteConfig(siteConfig);
                    showNotification('Título da seção de projetos salvo com sucesso!');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] font-title font-bold text-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  Salvar Título
                </button>
              </div>
            </div>

            <div className="bg-[#141c2c] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-title text-white">
                  🚀 {editingProjectId ? 'Editar Projeto' : 'Adicionar Novo Projeto'} ({editLang === 'pt' ? 'Português' : 'Inglês'})
                </h2>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#47b8ec]/10 text-[#47b8ec] border border-[#47b8ec]/20 font-semibold uppercase">
                  Editando: {editLang === 'pt' ? 'Português' : 'English'}
                </span>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#47b8ec] mb-1">
                      Título do Projeto ({editLang.toUpperCase()}) *
                    </label>
                    <input
                      type="text"
                      value={projectForm[editLang]?.title || ''}
                      onChange={(e) => setProjectForm({
                        ...projectForm,
                        [editLang]: { ...projectForm[editLang], title: e.target.value }
                      })}
                      placeholder="Ex: Brainrot League"
                      className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1">
                      Subtítulo ({editLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={projectForm[editLang]?.subtitle || ''}
                      onChange={(e) => setProjectForm({
                        ...projectForm,
                        [editLang]: { ...projectForm[editLang], subtitle: e.target.value }
                      })}
                      placeholder="Ex: Roblox Combat & Creature Training"
                      className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1">
                    Descrição ({editLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm[editLang]?.desc || ''}
                    onChange={(e) => setProjectForm({
                      ...projectForm,
                      [editLang]: { ...projectForm[editLang], desc: e.target.value }
                    })}
                    placeholder="Descrição do projeto..."
                    className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                  />
                </div>

                {/* Campos de imagem/link compartilhados */}
                <div className="p-4 bg-[#1a2235]/40 rounded-2xl border border-white/5 space-y-4">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">
                    Mídia & Links do Projeto
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">Caminho da Imagem ou URL</label>
                      <input
                        type="text"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                        placeholder="./images/kolos/thumb.png"
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">Tags (separadas por vírgula)</label>
                      <input
                        type="text"
                        value={projectForm.tags}
                        onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                        placeholder="Roblox Studio, Luau, OOP"
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">Rota Interna (se houver)</label>
                      <input
                        type="text"
                        value={projectForm.internalRoute}
                        onChange={(e) => setProjectForm({ ...projectForm, internalRoute: e.target.value })}
                        placeholder="/brainrot-league"
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">Link Externo (se houver)</label>
                      <input
                        type="text"
                        value={projectForm.externalLink}
                        onChange={(e) => setProjectForm({ ...projectForm, externalLink: e.target.value })}
                        placeholder="https://youtu.be/..."
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] font-title font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
                  >
                    {editingProjectId ? 'Salvar Projeto' : 'Adicionar Projeto'}
                  </button>
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({
                          id: '',
                          category: 'Roblox Game',
                          image: '',
                          tags: '',
                          internalRoute: '',
                          externalLink: '',
                          featured: true,
                          pt: { title: '', subtitle: '', desc: '' },
                          en: { title: '', subtitle: '', desc: '' }
                        });
                      }}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Lista dos Projetos */}
            <div className="bg-[#141c2c] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h2 className="text-xl font-bold font-title text-white">Projetos Existentes ({projects.length})</h2>
                <span className="text-xs text-white/50">
                  Use os botões <span className="text-[#47b8ec] font-bold">▲ / ▼</span> para reordenar a exibição
                </span>
              </div>
              <div className="space-y-3">
                {projects.map((p, index) => (
                  <div key={p.id} className="p-4 bg-[#1a2235] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      {/* Botões de Reordenação */}
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveProject(index, -1)}
                          title="Mover para cima"
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                            index === 0
                              ? 'opacity-20 cursor-not-allowed bg-white/5 text-white/40'
                              : 'bg-white/10 hover:bg-[#47b8ec] hover:text-[#0e1320] text-white cursor-pointer'
                          }`}
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          disabled={index === projects.length - 1}
                          onClick={() => handleMoveProject(index, 1)}
                          title="Mover para baixo"
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                            index === projects.length - 1
                              ? 'opacity-20 cursor-not-allowed bg-white/5 text-white/40'
                              : 'bg-white/10 hover:bg-[#47b8ec] hover:text-[#0e1320] text-white cursor-pointer'
                          }`}
                        >
                          ▼
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-white/30 w-5 text-center">
                        #{index + 1}
                      </span>

                      <img
                        src={p.image}
                        alt=""
                        className="w-16 h-12 rounded-lg object-cover bg-black/50 border border-white/10 flex-shrink-0"
                        onError={(e) => { e.currentTarget.src = "./images/m8wlogo.svg"; }}
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold font-title text-white text-base truncate">
                          {p.title?.[editLang] || p.title?.pt || p.title}
                        </h3>
                        <p className="text-xs text-[#47b8ec] truncate">
                          {p.subtitle?.[editLang] || p.subtitle?.pt || p.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                      <button
                        onClick={() => handleEditProjectClick(p)}
                        className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#47b8ec]/10 hover:bg-[#47b8ec]/20 text-[#47b8ec] border border-[#47b8ec]/30 transition-all cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all cursor-pointer"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── 4. ABA CONTATO & BOTÕES ────────────────────────────────────── */}
        {activeTab === 'contact' && siteConfig && (
          <div className="space-y-6">
            <div className="bg-[#141c2c] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-title text-white">
                  📬 Editar Contato ({editLang === 'pt' ? 'Português' : 'Inglês'})
                </h2>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#47b8ec]/10 text-[#47b8ec] border border-[#47b8ec]/20 font-semibold uppercase">
                  Editando: {editLang === 'pt' ? 'Português' : 'English'}
                </span>
              </div>

              <form onSubmit={handleSaveContact} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#47b8ec] mb-1">
                      Título da Seção ({editLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={siteConfig.contact[editLang]?.title || ''}
                      onChange={(e) => setSiteConfig({
                        ...siteConfig,
                        contact: {
                          ...siteConfig.contact,
                          [editLang]: {
                            ...siteConfig.contact[editLang],
                            title: e.target.value
                          }
                        }
                      })}
                      className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1">
                      Mensagem padrão WhatsApp ({editLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={siteConfig.contact[editLang]?.whatsappMsg || ''}
                      onChange={(e) => setSiteConfig({
                        ...siteConfig,
                        contact: {
                          ...siteConfig.contact,
                          [editLang]: {
                            ...siteConfig.contact[editLang],
                            whatsappMsg: e.target.value
                          }
                        }
                      })}
                      className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1">
                    Descrição do Contato ({editLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.contact[editLang]?.desc || ''}
                    onChange={(e) => setSiteConfig({
                      ...siteConfig,
                      contact: {
                        ...siteConfig.contact,
                        [editLang]: {
                          ...siteConfig.contact[editLang],
                          desc: e.target.value
                        }
                      }
                    })}
                    className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                  />
                </div>

                {/* Dados de contato fixos */}
                <div className="p-4 bg-[#1a2235]/40 rounded-2xl border border-white/5 space-y-4">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">
                    Canais de Comunicação
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">Tag Discord</label>
                      <input
                        type="text"
                        value={siteConfig.contact.discordTag}
                        onChange={(e) => setSiteConfig({
                          ...siteConfig,
                          contact: { ...siteConfig.contact, discordTag: e.target.value }
                        })}
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">Número WhatsApp</label>
                      <input
                        type="text"
                        value={siteConfig.contact.whatsappNumber}
                        onChange={(e) => setSiteConfig({
                          ...siteConfig,
                          contact: { ...siteConfig.contact, whatsappNumber: e.target.value }
                        })}
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1">E-mail</label>
                      <input
                        type="text"
                        value={siteConfig.contact.email}
                        onChange={(e) => setSiteConfig({
                          ...siteConfig,
                          contact: { ...siteConfig.contact, email: e.target.value }
                        })}
                        className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] font-title font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
                  >
                    Salvar Seção Contato
                  </button>
                </div>
              </form>
            </div>

            {/* Adicionar Botões Customizados */}
            <div className="bg-[#141c2c] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold font-title text-white mb-2">➕ Adicionar Botões Customizados</h3>
              <p className="text-xs text-white/50 mb-4">Adicione links para Telegram, Twitter/X, Behance, Calendly, etc.</p>

              <form onSubmit={handleAddCustomBtn} className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="text"
                  value={btnForm.label}
                  onChange={(e) => setBtnForm({ ...btnForm, label: e.target.value })}
                  placeholder="Texto do Botão (ex: Telegram)"
                  className="flex-1 bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                  required
                />
                <input
                  type="text"
                  value={btnForm.url}
                  onChange={(e) => setBtnForm({ ...btnForm, url: e.target.value })}
                  placeholder="Link Completo (ex: https://t.me/...)"
                  className="flex-1 bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#47b8ec] text-[#0e1320] font-title font-bold text-sm hover:bg-[#70c1e6] transition-all cursor-pointer whitespace-nowrap"
                >
                  Adicionar Botão
                </button>
              </form>

              {siteConfig.contact.customButtons && siteConfig.contact.customButtons.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-white/50 uppercase">Botões Cadastrados</h4>
                  {siteConfig.contact.customButtons.map((btn) => (
                    <div key={btn.id} className="flex items-center justify-between p-3 bg-[#1a2235] border border-white/5 rounded-xl">
                      <div>
                        <span className="font-bold text-white text-sm">{btn.label}</span>
                        <span className="text-xs text-white/40 block">{btn.url}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteCustomBtn(btn.id)}
                        className="text-xs px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 cursor-pointer"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── 5. ABA SEGURANÇA & SENHA ──────────────────────────────────── */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-[#141c2c] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl">
              <h2 className="text-xl font-bold font-title text-white mb-2">🔑 Alterar Senha Mestra</h2>
              <p className="text-xs text-white/50 mb-4">
                Defina uma nova senha para acessar este painel. Guarde-a com segurança.
              </p>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#47b8ec] mb-1">Nova Senha</label>
                  <input
                    type="password"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    placeholder="Digite a nova senha..."
                    className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#47b8ec]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#47b8ec] hover:bg-[#70c1e6] text-[#0e1320] font-title font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
                >
                  Atualizar Senha
                </button>
              </form>
            </div>

            <div className="bg-[#141c2c] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl">
              <h3 className="text-lg font-bold font-title text-rose-400 mb-1">Zona de Recuperação</h3>
              <p className="text-xs text-white/50 mb-4">
                Deseja restaurar todos os projetos e textos para o estado original padrão?
              </p>
              <button
                onClick={handleResetDefaults}
                className="px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all cursor-pointer"
              >
                Restaurar Padrões de Fábrica
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretAdminPortal;
