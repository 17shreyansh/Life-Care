import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ userRole, onToggle, mobileOpen, setMobileOpen }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    onToggle && onToggle(!collapsed);
  };

  const closeMobileSidebar = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  // Check if a menu item is active
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Menu items based on user role
  const getMenuItems = () => {
    switch (userRole) {
      case 'client':
        return [
          { path: '/client/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
          { path: '/client/counsellors', icon: 'bi-people', label: 'Find Counsellors' },
          { path: '/client/appointments', icon: 'bi-calendar-check', label: 'My Appointments' },
          { path: '/client/chat-video', icon: 'bi-camera-video', label: 'Chat & Video' },
          { path: '/client/payments', icon: 'bi-credit-card', label: 'Payments' },
          { path: '/client/feedback', icon: 'bi-star', label: 'Feedback' },
          { path: '/client/profile', icon: 'bi-person', label: 'Profile' }
        ];
      case 'counsellor':
        return [
          { path: '/counsellor/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
          { path: '/counsellor/appointments', icon: 'bi-calendar-check', label: 'Appointments' },
          { path: '/counsellor/availability', icon: 'bi-clock', label: 'Availability' },
          { path: '/counsellor/earnings', icon: 'bi-wallet2', label: 'Earnings' },
          { path: '/counsellor/content', icon: 'bi-file-earmark-text', label: 'Content' },
          { path: '/counsellor/profile', icon: 'bi-person', label: 'Profile' }
        ];
      case 'admin':
        return [
          { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
          { path: '/admin/users', icon: 'bi-people', label: 'Users' },
          { path: '/admin/counsellors', icon: 'bi-person-badge', label: 'Counsellors' },
          { path: '/admin/appointments', icon: 'bi-calendar-check', label: 'Appointments' },
          { path: '/admin/withdrawals', icon: 'bi-cash-coin', label: 'Withdrawals' },
          { path: '/admin/content', icon: 'bi-file-earmark-text', label: 'Content' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand">
          {collapsed ? (
            <span className="logo-short">SS</span>
          ) : (
            <>
              <span className="logo-text">S S Psychologist</span>
              <span className="logo-subtext">Life Care</span>
            </>
          )}
        </Link>
        <button className="sidebar-toggle d-none d-md-block" onClick={toggleSidebar}>
          <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
        </button>
        <button className="sidebar-close d-md-none" onClick={closeMobileSidebar}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <div className="avatar-placeholder">
              {user?.name?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="user-info">
            <h6 className="user-name">{user?.name || 'User'}</h6>
            <span className="user-role">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
          </div>
        )}
      </div>

      <div className="sidebar-menu">
        <ul className="menu-items">
          {getMenuItems().map((item) => (
            <li key={item.path} className={isActive(item.path) ? 'active' : ''}>
              <Link to={item.path} onClick={closeMobileSidebar}>
                <i className={`bi ${item.icon}`}></i>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <i className="bi bi-box-arrow-right"></i>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;