import { LEVEL_COLORS, CATEGORY_COLORS } from '../../utils/constants';

export const LevelBadge = ({ level }) => {
  const c = LEVEL_COLORS[level] || { bg: 'rgba(113,113,122,0.15)', text: '#a1a1aa', border: 'rgba(113,113,122,0.3)' };
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.2rem 0.65rem',
      borderRadius: 99,
      fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.03em',
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
    }}>
      {level}
    </span>
  );
};

export const CategoryBadge = ({ category }) => {
  const c = CATEGORY_COLORS[category] || { bg: 'rgba(113,113,122,0.12)', text: '#a1a1aa' };
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.18rem 0.6rem',
      borderRadius: 99,
      fontSize: '0.7rem', fontWeight: 500,
      background: c.bg, color: c.text,
    }}>
      {category}
    </span>
  );
};

export const TechChip = ({ label }) => (
  <span style={{
    display: 'inline-block',
    padding: '0.15rem 0.55rem', borderRadius: 6,
    fontSize: '0.7rem', fontWeight: 500,
    background: 'rgba(99,102,241,0.1)',
    color: '#818cf8',
    border: '1px solid rgba(99,102,241,0.2)',
  }}>
    {label}
  </span>
);

export const UnreadDot = () => (
  <span style={{
    display: 'inline-block',
    width: 8, height: 8, borderRadius: '50%',
    background: '#6366f1',
    boxShadow: '0 0 6px rgba(99,102,241,0.8)',
  }} />
);

export default LevelBadge;
