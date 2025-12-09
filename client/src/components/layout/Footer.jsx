import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-section py-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <div className="mb-4 d-flex align-items-center">
              <img src={Logo} alt="Life Care Logo" className="logo-img me-2" style={{ height: '40px' }} />
              <div className="sidebar-logo fs-4 fw-bold me-1">SS</div>
              <span className="text-gradient fs-4 fw-bold">Psychologist Life Care</span>
            </div>
            <p className="mb-4">A modern, secure, and user-centric platform designed to bridge the gap between individuals seeking mental health support and qualified professionals.</p>
            <div className="d-flex gap-3">
              <a href="#" className="social-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-6">
            <h5 className="text-gradient mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="footer-link">Home</Link></li>
              <li className="mb-2"><Link to="/about" className="footer-link">About Us</Link></li>
              <li className="mb-2"><Link to="/blog" className="footer-link">Blog</Link></li>
              <li className="mb-2"><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-6">
            <h5 className="text-gradient mb-4">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/videos" className="footer-link">Educational Videos</Link></li>
              <li className="mb-2"><Link to="/gallery" className="footer-link">Gallery</Link></li>
              <li className="mb-2"><Link to="/faq" className="footer-link">FAQs</Link></li>
              <li className="mb-2"><Link to="/terms" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h5 className="text-gradient mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex">
                <i className="bi bi-geo-alt me-2 text-primary"></i>
                <div>
                  <div className="mb-2"><strong>Main:</strong> Dwarka Sector 6, 110075</div>
                  <div><strong>West Delhi:</strong> A15, Paschim Vihar, 110087</div>
                </div>
              </li>
              <li className="mb-3 d-flex">
                <i className="bi bi-telephone me-2 text-primary"></i>
                <div>
                  <a href="tel:08123746026" className="footer-link d-block">08123746026</a>
                  <a href="tel:9899555507" className="footer-link d-block">9899555507</a>
                </div>
              </li>
              <li className="mb-3 d-flex">
                <i className="bi bi-envelope me-2 text-primary"></i>
                <a href="mailto:contact@sspsychologist.com" className="footer-link">contact@sspsychologist.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-md-0">&copy; {currentYear} S S Psychologist Life Care. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <Link to="/privacy" className="footer-link me-4">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;