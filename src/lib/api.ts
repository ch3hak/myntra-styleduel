import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
};

export const themesAPI = {
  getAll: () => api.get('/themes'),
  getById: (id: string) => api.get(`/themes/${id}`),
};

export const productsAPI = {
  getByTheme: (themeId: string, category?: string, subcategory?: string) => {
    const params = new URLSearchParams({ themeId });
    if (category) params.append('category', category);
    if (subcategory) params.append('subcategory', subcategory);
    return api.get(`/products?${params}`);
  },
  getById: (id: string) => api.get(`/products/${id}`),
};

export const outfitsAPI = {
  getAll: (userId?: string, status?: string) => {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (status) params.append('status', status);
    return api.get(`/outfits?${params}`);
  },
  getById: (id: string) => api.get(`/outfits/${id}`),
  create: (outfit: any) => api.post('/outfits', outfit),
  update: (id: string, outfit: any) => api.put(`/outfits/${id}`, outfit),
  delete: (id: string) => api.delete(`/outfits/${id}`),
};

export default api;