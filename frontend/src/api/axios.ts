import axios from 'axios';

/**
 * Configured Axios instance for InsureHub API calls.
 *
 * Production (Vercel):
 * VITE_API_URL points to the Railway backend.
 *
 * Development:
 * If VITE_API_URL is not defined, use Vite's /api proxy
 * which points to http://localhost:8080.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL ? `${API_BASE_URL}/api` : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// ── Request Interceptor: Attach JWT token and user headers ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ih_token') || localStorage.getItem('insurehub_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const userStr = localStorage.getItem('ih_user') || localStorage.getItem('insurehub_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.email) {
          config.headers['X-User-Email'] = user.email;
        }
        if (user.firstName) {
          config.headers['X-User-Name'] = `${user.firstName} ${user.lastName || ''}`.trim();
        }
      } catch {
        // ignore parse error
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: Handle auth errors ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ih_token');
      localStorage.removeItem('ih_user');
      localStorage.removeItem('insurehub_token');
      localStorage.removeItem('insurehub_user');
      
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
