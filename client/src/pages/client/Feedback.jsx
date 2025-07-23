import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Mock data for past sessions
  const pastSessions = [
    {
      id: 1,
      counsellor: 'Dr. Sarah Johnson',
      date: '2023-06-10',
      feedbackSubmitted: false
    },
    {
      id: 2,
      counsellor: 'Dr. Michael Chen',
      date: '2023-05-25',
      feedbackSubmitted: true
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the feedback to the server
    console.log({ sessionId: pastSessions[0].id, rating, feedback });
    setSubmitted(true);
  };

  const getRatingText = (rating) => {
    switch(rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-header">
        <h1>Session Feedback</h1>
        <p>Share your experience and help us improve our services</p>
      </div>
      
      {!submitted ? (
        <div className="feedback-card">
          <div className="feedback-card-header">
            <div className="header-icon">
              <i className="bi bi-star"></i>
            </div>
            <h5 className="mb-0">Leave Feedback</h5>
          </div>
          <div className="feedback-card-body">
            <div className="session-info">
              <h6 className="session-title">Session with {pastSessions[0].counsellor}</h6>
              <div className="session-date">
                <i className="bi bi-calendar"></i>
                <span>{new Date(pastSessions[0].date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="rating-container">
                <label className="rating-label">How would you rate your session?</label>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`bi ${star <= rating ? 'bi-star-fill star-filled' : 'bi-star star-empty'} star`}
                      onClick={() => setRating(star)}
                    ></i>
                  ))}
                </div>
                {rating > 0 && (
                  <div className="rating-text">
                    {getRatingText(rating)}
                  </div>
                )}
              </div>
              
              <div className="feedback-form">
                <label htmlFor="feedback" className="form-label">Your Feedback</label>
                <textarea
                  id="feedback"
                  className="form-textarea"
                  placeholder="Please share your experience with this counsellor..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={rating === 0}
                >
                  <i className="bi bi-send"></i>
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="feedback-card">
          <div className="feedback-card-body success-message">
            <i className="bi bi-check-circle-fill success-icon"></i>
            <h4 className="success-title">Thank You for Your Feedback!</h4>
            <p className="success-text">Your feedback helps us improve our services and provide better mental health support.</p>
            <button 
              className="back-button"
              onClick={() => setSubmitted(false)}
            >
              <i className="bi bi-arrow-left"></i>
              Leave Another Feedback
            </button>
          </div>
        </div>
      )}
      
      <div className="sessions-card">
        <div className="feedback-card-header">
          <div className="header-icon">
            <i className="bi bi-clock-history"></i>
          </div>
          <h5 className="mb-0">Past Sessions</h5>
        </div>
        <div className="feedback-card-body p-0">
          <div className="sessions-table-container">
            <table className="sessions-table">
              <thead>
                <tr>
                  <th>Counsellor</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pastSessions.map(session => (
                  <tr key={session.id}>
                    <td>{session.counsellor}</td>
                    <td>{new Date(session.date).toLocaleDateString()}</td>
                    <td>
                      {session.feedbackSubmitted ? (
                        <span className="status-badge status-submitted">
                          <i className="bi bi-check-circle"></i>
                          Feedback Submitted
                        </span>
                      ) : (
                        <span className="status-badge status-pending">
                          <i className="bi bi-clock"></i>
                          Feedback Pending
                        </span>
                      )}
                    </td>
                    <td>
                      {!session.feedbackSubmitted ? (
                        <button className="action-button action-primary">
                          <i className="bi bi-star"></i> Leave Feedback
                        </button>
                      ) : (
                        <button className="action-button action-secondary" disabled>
                          <i className="bi bi-check-circle"></i> Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;