import { req } from './https';

export const getExperiences = () => {
  return req.get('/experiences/');
};

export const getExperience = (experienceId) => {
  return req.get(`/experiences/${experienceId}`);
};

export const addExperience = (data) => {
  return req.post('/experiences/', data);
};

export const updateExperience = (experienceId, data) => {
  return req.put(`/experiences/${experienceId}`, data);
};

export const deleteExperience = (experienceId) => {
  return req.delete(`/experiences/${experienceId}`);
};

export const getExperienceTags = (experienceId) => {
  return req.get(`/experiences/${experienceId}/tags`);
};

export const importExperiences = (experiences) => {
  return req.post('/experiences/import', experiences);
};
