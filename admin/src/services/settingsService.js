import { fetchAPI } from './api';

export const DEFAULT_CONTENT = {
  brandName: 'SARTAZ',
  heroOutlineTitle: 'MERN-STACK',
  heroScriptTitle: 'Developer',
  heroDescription:
    'I build modern, scalable web applications that blend immersive interfaces with reliable backend systems.',
  aboutLabel: 'About Me',
  aboutOutlineTitle: 'WEBSITE',
  aboutScriptTitle: 'Designer',
  aboutHeading: "I'm a Full Stack Developer",
  aboutDescription:
    'I specialize in the MERN stack and focus on building scalable web applications with modern, interactive user interfaces.',
  contactHeading: "Let's build something exceptional.",
  contactSubheading:
    'Open to freelance work, collaborations, and full-time roles.',
  contactEmail: 'admin@portfolio.dev',
  location: 'India',
  githubUrl: '',
  linkedinUrl: '',
  heroImage: '',
  education: [],
  experience: [],
  personalSkills: [],
  marqueeItems: [],
};

export const getSettings = async () => {
  const [profile, content] = await Promise.all([
    fetchAPI('/auth/me'),
    fetchAPI('/content').catch(() => DEFAULT_CONTENT),
  ]);

  return {
    profile,
    content: { ...DEFAULT_CONTENT, ...(content || {}) },
  };
};

export const updateProfile = (data) =>
  fetchAPI('/auth/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const updatePortfolioContent = (formData) =>
  fetchAPI('/content', {
    method: 'PUT',
    body: formData,
  });

export const changePassword = (currentPassword, newPassword) =>
  fetchAPI('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
