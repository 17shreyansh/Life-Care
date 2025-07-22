import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CounsellorCard.css';

const CounsellorCard = ({ counsellor }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  
  const handleBookNow = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleLogin = () => {
    navigate('/login', { state: { from: window.location.pathname } });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setShowModal(false);
    // Show success message or redirect
  };

  return (
    <>
      <div className="profile-card">
        <div className="profile-image-container">
          <img 
            src={counsellor.photo} 
            alt={counsellor.name} 
            className="profile-image"
          />
        </div>
        
        <div className="profile-info">
          <div className="profile-name-container">
            <h3 className="profile-name">{counsellor.name}</h3>
            {counsellor.verified && (
              <div className="verified-badge">
                <i className="bi bi-check-lg"></i>
              </div>
            )}
          </div>
          
          <p className="profile-title">{counsellor.specialization}</p>
          
          <div className="profile-stats">
            <div className="stat-item">
              <i className="bi bi-person"></i>
              <span>{counsellor.clientsHelped}+ Clients</span>
            </div>
            <div className="stat-item">
              <i className="bi bi-clock"></i>
              <span>{counsellor.experience} Years</span>
            </div>
          </div>
          
          <button 
            className="book-now-btn"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
      
      {/* Booking Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Book an Appointment with {counsellor.name}</h4>
              <button className="close-btn" onClick={handleCloseModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <div className="modal-body">
              {!isLoggedIn ? (
                <div className="login-prompt">
                  <p>Please login to book an appointment</p>
                  <button className="btn btn-primary" onClick={handleLogin}>
                    Login / Register
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Select Date</label>
                    <input 
                      type="date" 
                      className="form-control"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>Select Time</label>
                    <select className="form-control" required>
                      <option value="">Choose a time slot</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>Consultation Type</label>
                    <select className="form-control" required>
                      <option value="">Select type</option>
                      <option value="video">Video Call</option>
                      <option value="audio">Audio Call</option>
                      <option value="chat">Chat</option>
                    </select>
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>Brief Description of Issue</label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      placeholder="Please briefly describe your concern"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Confirm Booking
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Booking Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Book an Appointment with {counsellor.name}</h4>
              <button className="close-btn" onClick={handleCloseModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <div className="modal-body">
              {!isLoggedIn ? (
                <div className="login-prompt">
                  <p>Please login to book an appointment</p>
                  <button className="btn btn-primary" onClick={handleLogin}>
                    Login / Register
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Select Date</label>
                    <input 
                      type="date" 
                      className="form-control"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>Select Time</label>
                    <select className="form-control" required>
                      <option value="">Choose a time slot</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>Consultation Type</label>
                    <select className="form-control" required>
                      <option value="">Select type</option>
                      <option value="video">Video Call</option>
                      <option value="audio">Audio Call</option>
                      <option value="chat">Chat</option>
                    </select>
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>Brief Description of Issue</label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      placeholder="Please briefly describe your concern"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Confirm Booking
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CounsellorCard;