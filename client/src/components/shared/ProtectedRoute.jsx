import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  isAuthenticated = false, 
  userRole = null, 
  isLoading = false 
}) => {
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="protected-route-loading">
        <LoadingSpinner text="Verifying your access..." />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If no specific roles are required or user has the required role
  if (allowedRoles.length === 0 || allowedRoles.includes(userRole)) {
    return children;
  }

  // If user doesn't have the required role, redirect based on their role
  const redirectPath = userRole ? `/${userRole}/dashboard` : '/';
  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;