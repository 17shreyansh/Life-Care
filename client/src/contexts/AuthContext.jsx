import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { storage } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = storage.get('user');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Fetch current user data
  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getMe();
      const userData = response.data.data;
      setUser(userData);
      storage.set('user', userData);
      return userData;
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(err.response?.data?.message || 'Failed to fetch user data');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.register(userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.verifyOTP(email, otp);
      const { accessToken, refreshToken, user: userData } = response.data;
      
      // Save tokens and user data
      storage.set('token', accessToken);
      storage.set('refreshToken', refreshToken);
      storage.set('user', userData);
      
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOTP = async (email) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.resendOTP(email);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Sending login request with:', credentials.email);
      const response = await authAPI.login(credentials);
      console.log('Login API response:', response.data);
      
      // Check if OTP verification is required
      if (response.data.requireOTP) {
        return { requireOTP: true, email: credentials.email };
      }
      
      const { accessToken, refreshToken, user: userData } = response.data;
      
      // Save tokens and user data
      storage.set('token', accessToken);
      storage.set('refreshToken', refreshToken);
      storage.set('user', userData);
      
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Login API error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const googleLogin = async (idToken) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.googleLogin(idToken);
      const { accessToken, refreshToken, user: userData } = response.data;
      
      // Save tokens and user data
      storage.set('token', accessToken);
      storage.set('refreshToken', refreshToken);
      storage.set('user', userData);
      
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Google login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear local storage and state regardless of API response
      storage.remove('token');
      storage.remove('refreshToken');
      storage.remove('user');
      setUser(null);
      setLoading(false);
      navigate('/login');
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.updateProfile(userData);
      const updatedUser = response.data.data;
      
      // Update local storage and state
      storage.set('user', updatedUser);
      setUser(updatedUser);
      
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const updatePassword = async (passwordData) => {
    try {
      setLoading(true);
      setError(null);
      await authAPI.updatePassword(passwordData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.forgotPassword(email);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process forgot password request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (resetToken, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.resetPassword(resetToken, password);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    verifyOTP,
    resendOTP,
    login,
    googleLogin,
    logout,
    fetchCurrentUser,
    updateProfile,
    updatePassword,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user,
    isClient: user?.role === 'client',
    isCounsellor: user?.role === 'counsellor',
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;