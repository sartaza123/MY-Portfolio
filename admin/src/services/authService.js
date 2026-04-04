import { fetchAPI } from './api';

/** Calls real backend. Falls back gracefully if offline. */
export const loginUser = (data) =>
  fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(data) });
