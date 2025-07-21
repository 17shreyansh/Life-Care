import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = ({ role }) => {
  const [userName, setUserName] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dashboard-layout">
      {isMobile && (
        <button 
          className="mobile-sidebar-toggle dashboard-toggle" 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <i className="bi bi-list"></i>
        </button>
      )}
      
      {mobileOpen && <div className="sidebar-overlay"></div>}
      
      <Sidebar 
        userRole={role} 
        onToggle={handleSidebarToggle}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
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