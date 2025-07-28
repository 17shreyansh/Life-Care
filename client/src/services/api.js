import axios from 'axios';

// Create axios instance with base URL
const baseURL = import.meta.env.VITE_API_URL || '/api';
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for cookies/CORS
});

// For debugging
console.log('API Base URL:', baseURL);

// Add request logging
api.interceptors.request.use(request => {
  console.log('Starting API Request:', request.method, request.url);
  console.log('Request data:', request.data);
  return request;
});

// Add response logging and validation
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.config.url);
    
    // Validate response data
    if (response.data === undefined || response.data === null) {
      console.warn('API returned undefined/null data:', response.config.url);
    }
    
    return response;
  },
  error => {
    console.error('API Error:', error.response?.status, error.config?.url);
    console.error('Error details:', error.response?.data);
    
    // Handle cases where response is not JSON
    if (error.response && typeof error.response.data === 'string') {
      console.error('Non-JSON response received:', error.response.data.substring(0, 200));
    }
    
    return Promise.reject(error);
  }
);

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token && token !== 'undefined' && token !== 'null') {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not already retrying
    if (error.response?.status === 401 && error.response?.data?.tokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken || refreshToken === 'undefined' || refreshToken === 'null') {
          // No refresh token, redirect to login
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        const response = await axios.post('/api/auth/refresh-token', {
          refreshToken
        });
        
        // If token refresh was successful
        if (response.data.success) {
          // Update token in localStorage
          localStorage.setItem('token', response.data.accessToken);
          
          // Update Authorization header
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          
          // Retry the original request
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token is invalid, redirect to login
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        } catch (error) {
          console.error('Error clearing localStorage:', error);
        }
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
  resendOTP: (email) => api.post('/auth/resend-otp', { email }),
  login: (credentials) => api.post('/auth/login', credentials),
  googleLogin: (idToken) => api.post('/auth/google', { idToken }),
  logout: () => api.get('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/updatedetails', userData),
  updatePassword: (passwordData) => api.put('/auth/updatepassword', passwordData),
  forgotPassword: (email) => api.post('/auth/forgotpassword', { email }),
  resetPassword: (resetToken, password) => api.put(`/auth/resetpassword/${resetToken}`, { password })
};

// Client API
export const clientAPI = {
  getProfile: () => api.get('/client/profile'),
  getCounsellors: (params) => api.get('/client/counsellors', { params }),
  getCounsellor: (id) => api.get(`/client/counsellors/${id}`),
  bookAppointment: (appointmentData) => api.post('/client/appointments', appointmentData),
  getAppointments: (params) => api.get('/client/appointments', { params }),
  getAppointment: (id) => api.get(`/client/appointments/${id}`),
  cancelAppointment: (id, reason) => api.put(`/client/appointments/${id}/cancel`, { reason }),
  submitReview: (reviewData) => api.post('/client/reviews', reviewData),
  getReviews: () => api.get('/client/reviews')
};

// Counsellor API
export const counsellorAPI = {
  getProfile: () => api.get('/counsellor/profile'),
  updateProfile: (profileData) => api.put('/counsellor/profile', profileData),
  updateAvailability: (availabilityData) => api.put('/counsellor/availability', availabilityData),
  uploadVerificationDocuments: (documents) => api.post('/counsellor/verification', { documentUrls: documents }),
  getAppointments: (params) => api.get('/counsellor/appointments', { params }),
  getAppointment: (id) => api.get(`/counsellor/appointments/${id}`),
  updateAppointmentStatus: (id, status, reason) => api.put(`/counsellor/appointments/${id}/status`, { status, reason }),
  addSessionNotes: (id, notesData) => api.post(`/counsellor/appointments/${id}/notes`, notesData),
  getEarnings: () => api.get('/counsellor/earnings'),
  requestWithdrawal: (withdrawalData) => api.post('/counsellor/withdrawals', withdrawalData),
  createBlog: (blogData) => api.post('/counsellor/blogs', blogData),
  uploadVideo: (videoData) => api.post('/counsellor/videos', videoData)
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  createUser: (userData) => api.post('/admin/users', userData),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getCounsellors: (params) => api.get('/admin/counsellors', { params }),
  getCounsellor: (id) => api.get(`/admin/counsellors/${id}`),
  verifyCounsellor: (id, isVerified) => api.put(`/admin/counsellors/${id}/verify`, { isVerified }),
  getAppointments: (params) => api.get('/admin/appointments', { params }),
  updatePaymentStatus: (id, paymentData) => api.put(`/admin/appointments/${id}/payment`, paymentData),
  getWithdrawals: (params) => api.get('/admin/withdrawals', { params }),
  processWithdrawal: (id, withdrawalData) => api.put(`/admin/withdrawals/${id}`, withdrawalData),
  getBlogs: (params) => api.get('/admin/cms/blogs', { params }),
  updateBlog: (id, blogData) => api.put(`/admin/cms/blogs/${id}`, blogData)
};

// CMS API (Public)
export const cmsAPI = {
  getBlogs: (params) => api.get('/cms/blogs', { params }),
  getBlog: (slug) => api.get(`/cms/blogs/${slug}`),
  getBlogCategories: () => api.get('/cms/blogs/categories'),
  getVideos: (params) => api.get('/cms/videos', { params }),
  getVideo: (id) => api.get(`/cms/videos/${id}`),
  getVideoCategories: () => api.get('/cms/videos/categories'),
  getGallery: (params) => api.get('/cms/gallery', { params }),
  getGalleryCategories: () => api.get('/cms/gallery/categories')
};

export default api;