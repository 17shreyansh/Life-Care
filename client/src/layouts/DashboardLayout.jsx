import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DashboardLayout = ({ role }) => {
  const [userName, setUserName] = useState('');
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  // Define sidebar links based on role
  const getSidebarLinks = () => {
    switch(role) {
      case 'client':
        return (
          <>
            <li><Link to="/client/dashboard" className="nav-link px-3">Dashboard</Link></li>
            <li><Link to="/client/counsellors" className="nav-link px-3">Find Counsellors</Link></li>
            <li><Link to="/client/appointments" className="nav-link px-3">My Appointments</Link></li>
            <li><Link to="/client/chat" className="nav-link px-3">Chat & Video</Link></li>
            <li><Link to="/client/payments" className="nav-link px-3">Payments</Link></li>
            <li><Link to="/client/feedback" className="nav-link px-3">Feedback</Link></li>
            <li><Link to="/client/profile" className="nav-link px-3">Profile</Link></li>
          </>
        );
      case 'counsellor':
        return (
          <>
            <li><Link to="/counsellor/dashboard" className="nav-link px-3">Dashboard</Link></li>
            <li><Link to="/counsellor/appointments" className="nav-link px-3">My Appointments</Link></li>
            <li><Link to="/counsellor/availability" className="nav-link px-3">Availability</Link></li>
            <li><Link to="/counsellor/session-notes" className="nav-link px-3">Session Notes</Link></li>
            <li><Link to="/counsellor/earnings" className="nav-link px-3">Earnings</Link></li>
            <li><Link to="/counsellor/content" className="nav-link px-3">Content Upload</Link></li>
            <li><Link to="/counsellor/profile" className="nav-link px-3">Profile</Link></li>
          </>
        );
      case 'admin':
        return (
          <>
            <li><Link to="/admin/dashboard" className="nav-link px-3">Dashboard</Link></li>
            <li><Link to="/admin/users" className="nav-link px-3">Users</Link></li>
            <li><Link to="/admin/counsellors" className="nav-link px-3">Counsellors</Link></li>
            <li><Link to="/admin/appointments" className="nav-link px-3">Appointments</Link></li>
            <li><Link to="/admin/disputes" className="nav-link px-3">Disputes</Link></li>
            <li><Link to="/admin/payments" className="nav-link px-3">Payments</Link></li>
            <li><Link to="/admin/cms" className="nav-link px-3">CMS</Link></li>
            <li><Link to="/admin/reports" className="nav-link px-3">Reports</Link></li>
            <li><Link to="/admin/settings" className="nav-link px-3">Settings</Link></li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky pt-3">
            <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
              <span className="fs-5 fw-semibold">{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</span>
            </div>
            <ul className="nav flex-column">
              {getSidebarLinks()}
            </ul>
            <div className="mt-5 pt-5">
              <button onClick={handleLogout} className="btn btn-outline-danger w-100">Logout</button>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Welcome, {userName}</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <Link to="/" className="btn btn-sm btn-outline-secondary">
                Back to Home
              </Link>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;