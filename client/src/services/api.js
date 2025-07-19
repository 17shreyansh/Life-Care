import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  // Try proxy server first (helps with CORS issues)
  baseURL: 'http://localhost:8080/proxy/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // Important for CORS
});

// Fallback to direct connection if proxy fails
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.message && error.message.includes('Network Error')) {
      console.log('Proxy server error, trying direct connection...');
      const originalRequest = error.config;
      
      // Change URL to direct connection
      originalRequest.baseURL = 'http://localhost:5000/api';
      
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;