import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getJobs = () => api.get('/jobs');
export const addJob = (job) => api.post('/jobs', job);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);

export default api;