import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ userRole, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  
  // Define navigation links based on user role
  const getNavLinks = () => {
    switch (userRole) {
      case 'client':
        return [
          { path: '/client/dashboard', icon: 'bi-grid', label: 'Dashboard' },
          { path: '/client/counsellors', icon: 'bi-people', label: 'Counsellors' },
          { path: '/client/appointments', icon: 'bi-calendar-check', label: 'My Appointments' },
          { path: '/client/chat-video', icon: 'bi-chat-dots', label: 'Chat & Video' },
          { path: '/client/payments', icon: 'bi-credit-card', label: 'Payments' },
          { path: '/client/feedback', icon: 'bi-star', label: 'Feedback' },
          { path: '/client/profile', icon: 'bi-person', label: 'Profile' }
        ];
      case 'counsellor':
        return [
          { path: '/counsellor/dashboard', icon: 'bi-grid', label: 'Dashboard' },
          { path: '/counsellor/appointments', icon: 'bi-calendar-check', label: 'My Appointments' },
          { path: '/counsellor/availability', icon: 'bi-clock', label: 'Availability' },
          { path: '/counsellor/session-notes', icon: 'bi-journal-text', label: 'Session Notes' },
          { path: '/counsellor/earnings', icon: 'bi-wallet2', label: 'Earnings' },
          { path: '/counsellor/content', icon: 'bi-file-earmark-plus', label: 'Content Upload' },
          { path: '/counsellor/profile', icon: 'bi-person', label: 'Profile' }
        ];
      case 'admin':
        return [
          { path: '/admin/dashboard', icon: 'bi-grid', label: 'Dashboard' },
          { path: '/admin/users', icon: 'bi-people', label: 'Users' },
          { path: '/admin/counsellors', icon: 'bi-person-badge', label: 'Counsellors' },
          { path: '/admin/appointments', icon: 'bi-calendar-check', label: 'Appointments' },
          { path: '/admin/disputes', icon: 'bi-exclamation-triangle', label: 'Disputes' },
          { path: '/admin/payments', icon: 'bi-credit-card', label: 'Payments' },
          { path: '/admin/cms', icon: 'bi-file-earmark-richtext', label: 'CMS' },
          { path: '/admin/reports', icon: 'bi-graph-up', label: 'Reports' },
          { path: '/admin/settings', icon: 'bi-gear', label: 'Settings' }
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  // Notify parent component when sidebar state changes
  useEffect(() => {
    if (onToggle) {
      onToggle(collapsed);
    }
  }, [collapsed, onToggle]);

  return (
    <div className={`sidebar floating ${collapsed ? 'collapsed' : ''}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
      </button>
      
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand">
          <div className="sidebar-logo">SS</div>
          {!collapsed && <span className="sidebar-title">Life Care</span>}
        </Link>
      </div>
      
      <div className="sidebar-body">
        <ul className="sidebar-nav">
          {navLinks.map((link, index) => (
            <li key={index} className="sidebar-item">
              <Link 
                to={link.path} 
                className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
                title={collapsed ? link.label : ''}
              >
                <i className={`bi ${link.icon}`}></i>
                {!collapsed && <span>{link.label}</span>}
                {isActive(link.path) && <span className="active-indicator"></span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="sidebar-footer">
        <Link to="/" className="sidebar-link" title={collapsed ? 'Home' : ''}>
          <i className="bi bi-house"></i>
          {!collapsed && <span>Back to Home</span>}
        </Link>
        <button className="sidebar-link logout" onClick={handleLogout} title={collapsed ? 'Logout' : ''}>
          <i className="bi bi-box-arrow-right"></i>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;