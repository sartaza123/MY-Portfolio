import { fetchAPI } from './api';

export const getSkills   = ()           => fetchAPI('/skills');
export const createSkill = (data)       => fetchAPI('/skills', { method: 'POST', body: JSON.stringify(data) });
export const updateSkill = (id, data)   => fetchAPI(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteSkill = (id)         => fetchAPI(`/skills/${id}`, { method: 'DELETE' });
