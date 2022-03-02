import { req } from './https';

export const getResumes = () => {
  return req.get('/resumes/');
};

export const addResume = (data) => {
  return req.post('/resumes/0', data);
};

export const saveResume = (resumeId, data) => {
  return req.post(`/resumes/${resumeId}`, data);
};

export const deleteResume = (resumeId) => {
  return req.delete(`/resumes/${resumeId}`);
};
