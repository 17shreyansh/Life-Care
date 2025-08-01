import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../assets/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated, loading } = useAuth();



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



  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="d-flex align-items-center">
            <img src={Logo} alt="Life Care Logo" className="logo-img me-1" style={{ height: '32px' }} />
            {/* <div className="sidebar-logo me-0 mobile-small">SS</div> */}
            <span className="brand-text mobile-small">SS Psychologist Life Care</span>
          </div>
        </Link>
        
        <button 
          className="navbar-toggler ms-auto" 
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
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/consilar') ? 'active' : ''}`} to="/consilar">
                Book Session
              </Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            {!loading && isAuthenticated && user ? (
              <>
                {user.avatar && (
                  <img 
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-circle me-2"
                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                  />
                )}
                <Link to={`/${user.role}/dashboard`} className="btn btn-outline-primary me-2">
                  <i className="bi bi-speedometer2 me-1"></i> Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </button>
              </>
            ) : !loading ? (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  <i className="bi bi-person-plus me-1"></i> Register
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;