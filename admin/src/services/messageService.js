import { fetchAPI } from './api';

export const getMessages       = ()    => fetchAPI('/messages');
export const toggleRead        = (id)  => fetchAPI(`/messages/${id}/read`, { method: 'PATCH' });
export const deleteMessage     = (id)  => fetchAPI(`/messages/${id}`, { method: 'DELETE' });
