import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="d-flex align-items-center">
            <div className="sidebar-logo me-2">SS</div>
            <span className="brand-text">Life Care</span>
          </div>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <i className="bi bi-list"></i>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/about') ? 'active' : ''}`} to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/blog') ? 'active' : ''}`} to="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/gallery') ? 'active' : ''}`} to="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/videos') ? 'active' : ''}`} to="/videos">
                Videos
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact') ? 'active' : ''}`} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          
          <div className="d-flex">
            {isLoggedIn ? (
              <>
                <Link to={`/${userRole}/dashboard`} className="btn btn-outline-primary me-2">
                  <i className="bi bi-speedometer2 me-1"></i> Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  <i className="bi bi-person-plus me-1"></i> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;