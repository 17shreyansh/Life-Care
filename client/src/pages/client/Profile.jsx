import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import ImageUpload from '../../components/shared/ImageUpload';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    }
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the user's password
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your personal information and account settings</p>
      </div>
      
      <div className="card">
        <div className="card-body">
          <ul className={`nav nav-tabs ${activeTab === 'security' ? 'security-active' : ''}`}>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                <i className="bi bi-person me-2"></i>Personal
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <i className="bi bi-shield-lock me-2"></i>Security
              </button>
            </li>
          </ul>
          
          {activeTab === 'personal' ? (
            <form onSubmit={handlePersonalInfoSubmit}>
              <Row className="mb-4">
                <Col md={3} className="text-center">
                  <ImageUpload
                    type="avatar"
                    currentImage={formData.avatar}
                    onImageUploaded={(url) => setFormData(prev => ({ ...prev, avatar: url }))}
                    size="150px"
                  />
                  <h5 className="mt-2">{formData.name}</h5>
                  <p className="text-muted">{formData.email}</p>
                </Col>
                <Col md={9}>
                  <Row className="g-3">
                    <Col md={4}>
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                      />
                      <small className="text-muted">Email cannot be changed</small>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="dob" className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={12}>
                      <label htmlFor="address" className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                      ></textarea>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-save me-2"></i>Save Changes
                </button>
              </div>
            </form>
          ) : (
            <Row>
              <Col md={6}>
                <div className="card mb-4">
                  <div className="card-header bg-white">
                    <h5 className="mb-0">
                      <i className="bi bi-key me-2 text-primary"></i>
                      Change Password
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handlePasswordSubmit}>
                      <div className="mb-3">
                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="currentPassword"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
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
                      <button type="submit" className="btn btn-primary">
                        <i className="bi bi-shield-check me-2"></i>Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="card">
                  <div className="card-header bg-white">
                    <h5 className="mb-0">
                      <i className="bi bi-link-45deg me-2 text-primary"></i>
                      Linked Accounts
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-3">
                      <div className="d-flex justify-content-between align-items-center p-3 border rounded">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-google fs-4 me-3 text-danger"></i>
                          <div>
                            <h6 className="mb-0">Google</h6>
                            <small className="text-muted">Not connected</small>
                          </div>
                        </div>
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-link me-2"></i>Connect
                        </button>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-3 border rounded">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-facebook fs-4 me-3 text-primary"></i>
                          <div>
                            <h6 className="mb-0">Facebook</h6>
                            <small className="text-muted">Not connected</small>
                          </div>
                        </div>
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-link me-2"></i>Connect
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;