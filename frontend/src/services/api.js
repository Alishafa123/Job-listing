import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getJobs = (params = {}) => api.get('/jobs', { params });
export const addJob = (job) => api.post('/jobs', job);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
export const updateJob = (id, job) => api.put(`/jobs/${id}`, job);

export default api;