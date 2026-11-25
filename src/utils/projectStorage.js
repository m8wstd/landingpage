import { initialProjects } from '../data/projectsData';
import { defaultSiteConfig } from '../data/siteConfigData';

const PROJECTS_STORAGE_KEY = 'm8w_portfolio_projects_data_v1';
const SITE_CONFIG_STORAGE_KEY = 'm8w_portfolio_site_config_v1';
const AUTH_KEY = 'm8w_admin_session_token';
const CUSTOM_PASS_KEY = 'm8w_admin_custom_password';

export const DEFAULT_ADMIN_PASSWORD = 'm8w@2025';

export function getAdminPassword() {
  return localStorage.getItem(CUSTOM_PASS_KEY) || DEFAULT_ADMIN_PASSWORD;
}

export function setAdminPassword(newPassword) {
  localStorage.setItem(CUSTOM_PASS_KEY, newPassword.trim());
}

export function verifyAdminPassword(input) {
  const current = getAdminPassword();
  return input.trim() === current;
}

export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'valid_admin_session_active';
}

export function setAuthenticated(valid) {
  if (valid) {
    sessionStorage.setItem(AUTH_KEY, 'valid_admin_session_active');
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

// ─── GESTÃO DE PROJETOS ──────────────────────────────────────────────
export function loadProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) return initialProjects;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Error loading projects:', err);
  }
  return initialProjects;
}

export function saveProjects(projects) {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event('portfolio_data_updated'));
    window.dispatchEvent(new Event('portfolio_projects_updated'));
    return true;
  } catch (err) {
    console.error('Error saving projects:', err);
    return false;
  }
}

// ─── GESTÃO DE CONTEÚDO DO SITE (Sobre, Experiência, Contato) ─────────
export function loadSiteConfig() {
  try {
    const raw = localStorage.getItem(SITE_CONFIG_STORAGE_KEY);
    if (!raw) return defaultSiteConfig;
    const parsed = JSON.parse(raw);
    
    // Migração transparente caso haja dados na estrutura legada
    const mergedAbout = {
      ...defaultSiteConfig.about,
      ...(parsed.about || {}),
      pt: {
        subtitle: parsed.about?.pt?.subtitle || parsed.about?.subtitlePt || defaultSiteConfig.about.pt.subtitle,
        desc: parsed.about?.pt?.desc || parsed.about?.descPt || defaultSiteConfig.about.pt.desc,
      },
      en: {
        subtitle: parsed.about?.en?.subtitle || parsed.about?.subtitleEn || defaultSiteConfig.about.en.subtitle,
        desc: parsed.about?.en?.desc || parsed.about?.descEn || defaultSiteConfig.about.en.desc,
      },
      education: {
        ...defaultSiteConfig.about.education,
        ...(parsed.about?.education || {}),
        pt: {
          course: parsed.about?.education?.pt?.course || parsed.about?.education?.coursePt || defaultSiteConfig.about.education.pt.course,
          period: parsed.about?.education?.pt?.period || parsed.about?.education?.period || defaultSiteConfig.about.education.pt.period,
          status: parsed.about?.education?.pt?.status || parsed.about?.education?.statusPt || defaultSiteConfig.about.education.pt.status,
          details: parsed.about?.education?.pt?.details || parsed.about?.education?.detailsPt || defaultSiteConfig.about.education.pt.details,
        },
        en: {
          course: parsed.about?.education?.en?.course || parsed.about?.education?.courseEn || defaultSiteConfig.about.education.en.course,
          period: parsed.about?.education?.en?.period || parsed.about?.education?.periodEn || parsed.about?.education?.period || defaultSiteConfig.about.education.en.period,
          status: parsed.about?.education?.en?.status || parsed.about?.education?.statusEn || defaultSiteConfig.about.education.en.status,
          details: parsed.about?.education?.en?.details || parsed.about?.education?.detailsEn || defaultSiteConfig.about.education.en.details,
        }
      }
    };

    const mergedExperience = Array.isArray(parsed.experience)
      ? parsed.experience.map(e => ({
          id: e.id,
          image: e.image || "",
          tags: e.tags || [],
          pt: {
            period: e.pt?.period || e.periodPt || "",
            title: e.pt?.title || e.titlePt || "",
            company: e.pt?.company || e.companyPt || "",
            desc: e.pt?.desc || e.descPt || ""
          },
          en: {
            period: e.en?.period || e.periodEn || e.pt?.period || e.periodPt || "",
            title: e.en?.title || e.titleEn || e.pt?.title || e.titlePt || "",
            company: e.en?.company || e.companyEn || e.pt?.company || e.companyPt || "",
            desc: e.en?.desc || e.descEn || e.pt?.desc || e.descPt || ""
          }
        }))
      : defaultSiteConfig.experience;

    const mergedContact = {
      ...defaultSiteConfig.contact,
      ...(parsed.contact || {}),
      pt: {
        title: parsed.contact?.pt?.title || parsed.contact?.titlePt || defaultSiteConfig.contact.pt.title,
        desc: parsed.contact?.pt?.desc || parsed.contact?.descPt || defaultSiteConfig.contact.pt.desc,
        whatsappMsg: parsed.contact?.pt?.whatsappMsg || parsed.contact?.whatsappDefaultMsgPt || defaultSiteConfig.contact.pt.whatsappMsg
      },
      en: {
        title: parsed.contact?.en?.title || parsed.contact?.titleEn || defaultSiteConfig.contact.en.title,
        desc: parsed.contact?.en?.desc || parsed.contact?.descEn || defaultSiteConfig.contact.en.desc,
        whatsappMsg: parsed.contact?.en?.whatsappMsg || parsed.contact?.whatsappDefaultMsgEn || defaultSiteConfig.contact.en.whatsappMsg
      }
    };

    const mergedProjectsSection = {
      ...defaultSiteConfig.projectsSection,
      ...(parsed.projectsSection || {}),
      pt: {
        title: parsed.projectsSection?.pt?.title || defaultSiteConfig.projectsSection.pt.title,
        desc: parsed.projectsSection?.pt?.desc || defaultSiteConfig.projectsSection.pt.desc
      },
      en: {
        title: parsed.projectsSection?.en?.title || defaultSiteConfig.projectsSection.en.title,
        desc: parsed.projectsSection?.en?.desc || defaultSiteConfig.projectsSection.en.desc
      }
    };

    return {
      about: mergedAbout,
      experience: mergedExperience,
      contact: mergedContact,
      projectsSection: mergedProjectsSection,
    };
  } catch (err) {
    console.error('Error loading site config:', err);
  }
  return defaultSiteConfig;
}

export function saveSiteConfig(newConfig) {
  try {
    localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    window.dispatchEvent(new Event('portfolio_data_updated'));
    return true;
  } catch (err) {
    console.error('Error saving site config:', err);
    return false;
  }
}

export function resetAllToDefaults() {
  localStorage.removeItem(PROJECTS_STORAGE_KEY);
  localStorage.removeItem(SITE_CONFIG_STORAGE_KEY);
  window.dispatchEvent(new Event('portfolio_data_updated'));
  window.dispatchEvent(new Event('portfolio_projects_updated'));
}
