import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = ({ role }) => {
  const [userName, setUserName] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and has correct role
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    
    if (!token || userRole !== role) {
      navigate('/login');
    } else {
      setUserName(name || 'User');
    }
  }, [navigate, role]);

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar 
        userRole={role} 
        onToggle={handleSidebarToggle}
      />
      
      <div className={`dashboard-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <div className="dashboard-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Welcome, <span className="text-gradient">{userName}</span></h1>
              <p className="text-muted mb-0">Here's what's happening with your account today.</p>
            </div>
            <div>
              <Link to="/" className="btn btn-outline-primary">
                <i className="bi bi-house-door me-2"></i>Back to Home
              </Link>
            </div>
          </div>
        </div>
        <div className="dashboard-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;