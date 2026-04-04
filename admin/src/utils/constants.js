export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const SERVER_BASE = API_BASE.replace(/\/api\/?$/, '');

export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Tools', 'Design', 'Other'];

export const LEVEL_COLORS = {
  Beginner:     { bg: 'rgba(234,179,8,0.15)',   text: '#eab308', border: 'rgba(234,179,8,0.3)' },
  Intermediate: { bg: 'rgba(99,102,241,0.15)',  text: '#818cf8', border: 'rgba(99,102,241,0.3)' },
  Advanced:     { bg: 'rgba(34,197,94,0.15)',   text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
};

export const CATEGORY_COLORS = {
  Frontend: { bg: 'rgba(99,102,241,0.12)',  text: '#818cf8' },
  Backend:  { bg: 'rgba(34,197,94,0.12)',   text: '#4ade80' },
  Tools:    { bg: 'rgba(234,179,8,0.12)',   text: '#facc15' },
  Design:   { bg: 'rgba(236,72,153,0.12)',  text: '#f472b6' },
  Other:    { bg: 'rgba(113,113,122,0.12)', text: '#a1a1aa' },
};

export const NAV_ITEMS = [
  { to: '/',          label: 'Dashboard', end: true },
  { to: '/projects',  label: 'Projects' },
  { to: '/skills',    label: 'Skills' },
  { to: '/resume',    label: 'Resume' },
  { to: '/messages',  label: 'Messages' },
  { to: '/settings',  label: 'Settings' },
];

