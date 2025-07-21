import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    gender: 'Male',
    dob: '1990-01-15',
    address: '123 Main St, Delhi',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the user's profile
    alert('Profile updated successfully!');
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
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <i className="bi bi-person me-2"></i>Personal Information
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
      </div>
      <div className="dashboard-card-body">
        {activeTab === 'personal' ? (
          <form onSubmit={handlePersonalInfoSubmit}>
            <div className="row mb-4">
              <div className="col-md-3 text-center">
                <div className="position-relative d-inline-block">
                  <img 
                    src="https://placehold.co/200x200?text=JD" 
                    alt="Profile" 
                    className="rounded-circle img-thumbnail mb-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <button 
                    type="button" 
                    className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle"
                    style={{ width: '35px', height: '35px' }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </div>
              <div className="col-md-9">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
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
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
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
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      id="address"
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-save me-2"></i>Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handlePasswordSubmit}>
                <h5 className="mb-4">Change Password</h5>
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
            <div className="col-md-6">
              <h5 className="mb-4">Linked Accounts</h5>
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
        )}
      </div>
    </div>
  );
};

export default Profile;