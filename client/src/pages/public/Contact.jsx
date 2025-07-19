import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({ type: 'success', message: 'Your message has been sent successfully! We will get back to you soon.' });
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4">Contact Us</h1>
          <p className="lead text-muted">We're here to help. Reach out to us with any questions or concerns.</p>
        </div>
      </div>

      <div className="row">
        {/* Contact Information */}
        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Get In Touch</h3>
              <p className="card-text">Have questions about our services? Need support? Our team is ready to assist you.</p>
              
              <div className="d-flex mb-3">
                <div className="me-3">
                  <i className="bi bi-geo-alt fs-4 text-primary"></i>
                </div>
                <div>
                  <h5 className="mb-1">Address</h5>
                  <p className="mb-0">123 Mental Health Street<br />Wellness City, WC 10001</p>
                </div>
              </div>
              
              <div className="d-flex mb-3">
                <div className="me-3">
                  <i className="bi bi-telephone fs-4 text-primary"></i>
                </div>
                <div>
                  <h5 className="mb-1">Phone</h5>
                  <p className="mb-0">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="d-flex mb-3">
                <div className="me-3">
                  <i className="bi bi-envelope fs-4 text-primary"></i>
                </div>
                <div>
                  <h5 className="mb-1">Email</h5>
                  <p className="mb-0">contact@sspsychologist.com</p>
                </div>
              </div>
              
              <div className="d-flex">
                <div className="me-3">
                  <i className="bi bi-clock fs-4 text-primary"></i>
                </div>
                <div>
                  <h5 className="mb-1">Working Hours</h5>
                  <p className="mb-0">Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Send Us a Message</h3>
              
              {formStatus && (
                <div className={`alert alert-${formStatus.type}`} role="alert">
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea 
                      className="form-control" 
                      id="message" 
                      name="message" 
                      rows="5" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="ratio ratio-21x9">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1619427748465!5m2!1sen!2sin" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;