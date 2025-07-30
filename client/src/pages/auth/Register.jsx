import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../services/api';
import groupImage from '../../assets/group.jpg';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register, login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    // Validate password strength
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      
      // Show OTP modal instead of navigating
      setShowOTPModal(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');
    
    if (!otp || otp.length !== 6) {
      return setOtpError('Please enter a valid 6-digit OTP');
    }

    setOtpLoading(true);

    try {
      await authAPI.verifyOTP(formData.email, otp);
      
      // Auto-login after successful verification
      await login({ email: formData.email, password: formData.password });
      
      // Navigate based on role
      if (formData.role === 'counsellor') {
        navigate('/counsellor/dashboard');
      } else {
        navigate('/client/dashboard');
      }
    } catch (err) {
      setOtpError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setOtpError('');

    try {
      await authAPI.resendOTP(formData.email);
      setOtpError('');
      // Show success message
      setOtpError('OTP sent successfully!');
      setTimeout(() => setOtpError(''), 3000);
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card register-card">
          <div className="auth-image" style={{ backgroundImage: `url(${groupImage})` }}>
            <div className="auth-overlay">
              <div className="auth-text">
                <h2>Join Our Community</h2>
                <p>Start your mental health journey today</p>
              </div>
            </div>
          </div>
          <div className="auth-form">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Create an Account</h3>
                <p className="text-muted">Fill in your details to get started</p>
              </div>
              
              <div className="step-indicator mb-4">
                <div className="step-progress">
                  <div className="step-progress-bar" style={{ width: '50%' }}></div>
                </div>
                <div className="step-circles">
                  <div className="step-circle active">
                    <span>1</span>
                    <p>Personal Info</p>
                  </div>
                  <div className="step-circle">
                    <span>2</span>
                    <p>Account Setup</p>
                  </div>
                  <div className="step-circle">
                    <span>✓</span>
                    <p>Complete</p>
                  </div>
                </div>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a password"
                      style={{ paddingRight: '45px' }}
                    />
                    <Button
                      variant="link"
                      className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                      style={{ zIndex: 10, padding: '0 12px' }}
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                    </Button>
                  </div>
                  <Form.Text className="text-muted">
                    Password must be at least 6 characters long
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirm your password"
                      style={{ paddingRight: '45px' }}
                    />
                    <Button
                      variant="link"
                      className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                      style={{ zIndex: 10, padding: '0 12px' }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      type="button"
                    >
                      <i className={`bi bi-eye${showConfirmPassword ? '-slash' : ''}`}></i>
                    </Button>
                  </div>
                </Form.Group>



                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Register'}
                </Button>

                <div className="text-center">
                  <p>Already have an account? <Link to="/login" className="text-decoration-none">Login</Link></p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      
      <Modal 
        show={showOTPModal} 
        onHide={() => setShowOTPModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        className="otp-modal"
        style={{ zIndex: 10010 }}
      >
        <div className="otp-modal-overlay">
          <Modal.Header closeButton>
            <Modal.Title>Verify Your Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center mb-4">
              <div className="otp-icon mb-3">
                <i className="bi bi-envelope-check" style={{ fontSize: '3rem', color: '#2563eb' }}></i>
              </div>
              <h5>Enter Verification Code</h5>
              <p className="text-muted">
                We've sent a 6-digit verification code to<br/>
                <strong>{formData.email}</strong>
              </p>
            </div>

            {otpError && (
              <Alert variant={otpError.includes('successfully') ? 'success' : 'danger'}>
                {otpError}
              </Alert>
            )}

            <Form onSubmit={handleOTPSubmit}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="text-center otp-input"
                  style={{ fontSize: '1.5rem', letterSpacing: '0.5rem', padding: '15px' }}
                  maxLength={6}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                disabled={otpLoading || otp.length !== 6}
              >
                {otpLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </Button>

              <div className="text-center">
                <p className="mb-2">Didn't receive the code?</p>
                <Button
                  variant="link"
                  onClick={handleResendOTP}
                  disabled={resendLoading}
                  className="p-0"
                >
                  {resendLoading ? 'Sending...' : 'Resend OTP'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default Register;