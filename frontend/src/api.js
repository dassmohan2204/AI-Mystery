import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1' });
export const getCase = id => api.get(`/mysteries/${id}`).then(r => r.data.data);
export const createCase = payload => api.post('/mysteries', payload).then(r => r.data.data);
export const saveProgress = (id, data) => api.patch(`/mysteries/${id}/progress`, data);
export const accuse = (id, suspectId) => api.post(`/mysteries/${id}/accusation`, { suspectId });
export const getSolution = id => api.get(`/mysteries/${id}/solution`).then(r => r.data.data);
export function messageOf(error) { return error?.response?.data?.message || (error?.code === 'ERR_NETWORK' ? 'Could not reach the case server. Make sure the API is running.' : 'Something went wrong. Please try again.'); }
