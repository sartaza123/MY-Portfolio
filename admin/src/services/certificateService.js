import { fetchAPI } from './api';

export const getCertificates = () => fetchAPI('/certificates');

export const uploadCertificate = (formData) =>
  fetchAPI('/certificates', {
    method: 'POST',
    body: formData,
  });

export const deleteCertificate = (id) =>
  fetchAPI(`/certificates/${id}`, {
    method: 'DELETE',
  });
