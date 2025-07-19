import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'client', // Default role
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('userRole', formData.role);
      localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
      
      // Redirect based on role
      navigate(`/${formData.role}/dashboard`);
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Create an Account</h2>
                <p className="text-muted">Join our mental health community</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Progress Steps */}
              <div className="d-flex justify-content-center mb-4">
                <div className="position-relative w-75">
                  <div className="progress" style={{ height: '2px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: step === 1 ? '50%' : '100%' }}></div>
                  </div>
                  <div className="position-absolute top-0 start-0 translate-middle">
                    <button className="btn btn-primary btn-sm rounded-pill" disabled>1</button>
                  </div>
                  <div className="position-absolute top-0 start-50 translate-middle">
                    <button className={`btn ${step >= 2 ? 'btn-primary' : 'btn-secondary'} btn-sm rounded-pill`} disabled>2</button>
                  </div>
                  <div className="position-absolute top-0 start-100 translate-middle">
                    <button className="btn btn-secondary btn-sm rounded-pill" disabled>✓</button>
                  </div>
                </div>
              </div>

              {step === 1 ? (
                <form onSubmit={handleNext}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
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
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">I want to register as:</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            id="roleClient"
                            value="client"
                            checked={formData.role === 'client'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="roleClient">
                            Client
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            id="roleCounsellor"
                            value="counsellor"
                            checked={formData.role === 'counsellor'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="roleCounsellor">
                            Counsellor
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100">
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div className="form-text">
                      Password must be at least 8 characters long with letters, numbers, and special characters.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        I agree to the <Link to="/terms" className="text-primary">Terms of Service</Link> and <Link to="/privacy" className="text-primary">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary flex-grow-1"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex-grow-1"
                      disabled={loading || !formData.agreeTerms}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Registering...
                        </>
                      ) : 'Register'}
                    </button>
                  </div>
                </form>
              )}

              <div className="text-center mt-4">
                <p>Already have an account? <Link to="/login" className="text-primary">Sign In</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;