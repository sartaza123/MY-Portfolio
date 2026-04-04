import { fetchAPI } from "./api";

export const getResume = () => fetchAPI("/resume");

export const uploadResume = (formData) =>
  fetchAPI("/resume", {
    method: "POST",
    body: formData,
  });

export const deleteResume = (id) =>
  fetchAPI(`/resume/${id}`, {
    method: "DELETE",
  });
