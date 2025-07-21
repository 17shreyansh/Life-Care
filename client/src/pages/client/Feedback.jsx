import React, { useState } from 'react';

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

  return (
    <>
      {!submitted ? (
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h5 className="mb-0">Leave Feedback</h5>
          </div>
          <div className="dashboard-card-body">
            <div className="mb-4">
              <h6>Session with {pastSessions[0].counsellor}</h6>
              <p className="text-muted">
                Date: {new Date(pastSessions[0].date).toLocaleDateString()}
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">How would you rate your session?</label>
                <div className="rating-stars mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`bi ${star <= rating ? 'bi-star-fill' : 'bi-star'} fs-3 me-2`}
                      style={{ 
                        cursor: 'pointer',
                        color: star <= rating ? '#ffc107' : '#ccc'
                      }}
                      onClick={() => setRating(star)}
                    ></i>
                  ))}
                </div>
                {rating > 0 && (
                  <div className="text-muted">
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="feedback" className="form-label">Your Feedback</label>
                <textarea
                  id="feedback"
                  className="form-control"
                  rows="5"
                  placeholder="Please share your experience with this counsellor..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={rating === 0}
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="dashboard-card">
          <div className="dashboard-card-body text-center py-5">
            <i className="bi bi-check-circle-fill text-success fs-1 mb-3"></i>
            <h4>Thank You for Your Feedback!</h4>
            <p className="text-muted">Your feedback helps us improve our services.</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => setSubmitted(false)}
            >
              Leave Another Feedback
            </button>
          </div>
        </div>
      )}
      
      <div className="dashboard-card mt-4">
        <div className="dashboard-card-header">
          <h5 className="mb-0">Past Sessions</h5>
        </div>
        <div className="dashboard-card-body">
          <div className="table-responsive">
            <table className="table table-hover">
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
                        <span className="badge bg-success">Feedback Submitted</span>
                      ) : (
                        <span className="badge bg-warning">Feedback Pending</span>
                      )}
                    </td>
                    <td>
                      {!session.feedbackSubmitted ? (
                        <button className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-star me-1"></i> Leave Feedback
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-outline-secondary" disabled>
                          <i className="bi bi-check-circle me-1"></i> Completed
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
    </>
  );
};

export default Feedback;