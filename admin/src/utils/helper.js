/** Format ISO date string → "Apr 2, 2026" */
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

/** Truncate text to maxLen chars */
export const truncate = (str, maxLen = 80) => {
  if (!str) return '';
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + '…';
};

/** Parse comma-separated tech stack string into array */
export const parseTechStack = (str) =>
  (str || '').split(',').map((t) => t.trim()).filter(Boolean);

/** Generate a simple unique ID */
export const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

/** Debounce utility */
export const debounce = (fn, ms = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};
