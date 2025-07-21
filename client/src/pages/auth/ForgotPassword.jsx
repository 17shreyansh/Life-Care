import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header bg-white text-center p-4 border-0">
              <h3 className="font-weight-bold mb-2">Forgot Password</h3>
              <p className="text-muted mb-0">Enter your email to reset your password</p>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {success ? (
                <div className="alert alert-success" role="alert">
                  <p>Password reset link has been sent to your email.</p>
                  <p className="mb-0">Please check your inbox and follow the instructions.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                  </div>
                </form>
              )}
              <div className="text-center mt-4">
                <p className="mb-0">
                  <Link to="/login" className="text-primary">
                    <i className="bi bi-arrow-left me-1"></i> Back to Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;