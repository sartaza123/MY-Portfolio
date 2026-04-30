import { fetchAPI } from './api';

/** Calls real backend. Falls back gracefully if offline. */
export const loginUser = (data) =>
  fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(data) });

export const forgotPasswordAPI = (data) =>
  fetchAPI('/auth/forgot-password', { method: 'POST', body: JSON.stringify(data) });

export const resetPasswordAPI = (token, data) =>
  fetchAPI(`/auth/reset-password/${token}`, { method: 'PUT', body: JSON.stringify(data) });
