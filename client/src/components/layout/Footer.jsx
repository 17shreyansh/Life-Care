import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>S S Psychologist Life Care</h5>
            <p className="text-muted">A modern, secure, and user-centric platform designed to bridge the gap between individuals seeking mental health support and qualified professionals.</p>
          </div>
          <div className="col-md-2 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
              <li><Link to="/about" className="text-decoration-none text-muted">About</Link></li>
              <li><Link to="/blog" className="text-decoration-none text-muted">Blog</Link></li>
              <li><Link to="/contact" className="text-decoration-none text-muted">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li><Link to="/videos" className="text-decoration-none text-muted">Educational Videos</Link></li>
              <li><Link to="/gallery" className="text-decoration-none text-muted">Gallery</Link></li>
              <li><Link to="/faq" className="text-decoration-none text-muted">FAQs</Link></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Connect With Us</h5>
            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-muted"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-muted"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-muted"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-muted"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <div className="text-center text-muted">
          <small>&copy; {currentYear} S S Psychologist Life Care. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;