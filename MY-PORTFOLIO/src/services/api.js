const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const SERVER_BASE = API_BASE.replace(/\/api\/?$/, '');

/** Map MongoDB _id → id so all components can use item.id consistently */
const normalise = (data) => {
  if (Array.isArray(data)) return data.map(normalise);
  if (data && typeof data === 'object' && data._id) {
    const { _id, ...rest } = data;
    return { id: _id, ...rest };
  }
  return data;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, options);
  const json = await response.json().catch(() => null);

  if (!response.ok || json?.success === false) {
    throw new Error(json?.message || `Request failed with status ${response.status}`);
  }

  const payload = json?.data !== undefined ? json.data : json;
  return normalise(payload);
};

export const portfolioApi = {
  getContent: () => request('/content'),
  getCertificates: () => request('/certificates'),
  getProjects: () => request('/projects'),
  getSkills: () => request('/skills'),
  getResume: () => request('/resume'),
  sendMessage: (payload) =>
    request('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
};

export const buildAssetUrl = (path) => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${SERVER_BASE}${path.startsWith('/') ? path : `/${path}`}`;
};


