import { fetchAPI } from './api';

export const getProjects = () => fetchAPI('/projects');
export const getProject = (id) => fetchAPI(`/projects/${id}`);
export const createProject = (formData) => fetchAPI('/projects', { method: 'POST', body: formData });
export const updateProject = (id, formData) => fetchAPI(`/projects/${id}`, { method: 'PUT', body: formData });
export const deleteProject = (id) => fetchAPI(`/projects/${id}`, { method: 'DELETE' });
