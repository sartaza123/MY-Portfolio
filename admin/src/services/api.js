import { API_BASE, SERVER_BASE } from "../utils/constants";

const normalise = (data) => {
  if (Array.isArray(data)) return data.map(normalise);
  if (data && typeof data === "object" && data._id) {
    const { _id, ...rest } = data;
    return { id: _id, ...rest };
  }
  return data;
};

export const fetchAPI = async (url, options = {}) => {
  const token = localStorage.getItem("admin_token");

  const isFormData = options.body instanceof FormData;

  const res = await fetch(API_BASE + url, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || json?.success === false) {
    throw new Error(json?.message || `HTTP ${res.status}`);
  }

  const payload = json?.data !== undefined ? json.data : json;

  return normalise(payload);
};

export const buildAssetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${SERVER_BASE}${path.startsWith("/") ? path : `/${path}`}`;
};
