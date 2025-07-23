import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
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
  const navigate = useNavigate();
  const { register } = useAuth();

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
      
      // Navigate to OTP verification page
      navigate('/verify-otp', { state: { email: formData.email, isLogin: false } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
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
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                  />
                  <Form.Text className="text-muted">
                    Password must be at least 6 characters long
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>I am registering as a</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Client"
                      name="role"
                      value="client"
                      checked={formData.role === 'client'}
                      onChange={handleChange}
                      id="client-role"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Counsellor"
                      name="role"
                      value="counsellor"
                      checked={formData.role === 'counsellor'}
                      onChange={handleChange}
                      id="counsellor-role"
                    />
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
      </div>
  );
};

export default Register;