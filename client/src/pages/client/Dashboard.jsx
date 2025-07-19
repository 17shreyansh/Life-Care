import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockAppointments = [
    {
      id: 1,
      counsellorName: 'Dr. Sarah Johnson',
      counsellorImage: 'https://placehold.co/100x100?text=Dr.+SJ',
      date: '2023-06-15',
      time: '10:00 AM',
      duration: '50 min',
      type: 'Video Call',
      status: 'confirmed'
    },
    {
      id: 2,
      counsellorName: 'Dr. Michael Chen',
      counsellorImage: 'https://placehold.co/100x100?text=Dr.+MC',
      date: '2023-06-18',
      time: '2:30 PM',
      duration: '50 min',
      type: 'Video Call',
      status: 'confirmed'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUpcomingAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row g-4">
        {/* Welcome Card */}
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body p-4">
              <h4>Welcome to Your Mental Health Journey</h4>
              <p className="mb-0">Track your appointments, connect with counsellors, and access resources all in one place.</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="display-4 fw-bold text-primary mb-2">2</div>
              <h5>Upcoming Sessions</h5>
              <Link to="/client/appointments" className="btn btn-sm btn-outline-primary mt-2">View All</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="display-4 fw-bold text-success mb-2">5</div>
              <h5>Completed Sessions</h5>
              <Link to="/client/appointments?status=completed" className="btn btn-sm btn-outline-primary mt-2">View History</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="display-4 fw-bold text-info mb-2">3</div>
              <h5>Saved Counsellors</h5>
              <Link to="/client/saved-counsellors" className="btn btn-sm btn-outline-primary mt-2">View List</Link>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Upcoming Appointments</h5>
              <Link to="/client/appointments" className="btn btn-sm btn-outline-primary">View All</Link>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : upcomingAppointments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Counsellor</th>
                        <th>Date & Time</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingAppointments.map(appointment => (
                        <tr key={appointment.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={appointment.counsellorImage} 
                                alt={appointment.counsellorName} 
                                className="rounded-circle me-2" 
                                width="40" 
                                height="40" 
                              />
                              <div>{appointment.counsellorName}</div>
                            </div>
                          </td>
                          <td>
                            {new Date(appointment.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                            <br />
                            <small className="text-muted">{appointment.time} ({appointment.duration})</small>
                          </td>
                          <td>{appointment.type}</td>
                          <td>
                            <span className="badge bg-success">Confirmed</span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <Link to={`/client/appointments/${appointment.id}`} className="btn btn-outline-primary">Details</Link>
                              <Link to={`/client/chat`} className="btn btn-outline-success">Join</Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>No upcoming appointments.</p>
                  <Link to="/client/counsellors" className="btn btn-primary">Find a Counsellor</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <Link to="/client/counsellors" className="btn btn-outline-primary w-100 py-3">
                    <i className="bi bi-search fs-4 d-block mb-2"></i>
                    Find a Counsellor
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/client/appointments/new" className="btn btn-outline-success w-100 py-3">
                    <i className="bi bi-calendar-plus fs-4 d-block mb-2"></i>
                    Book Appointment
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/client/chat" className="btn btn-outline-info w-100 py-3">
                    <i className="bi bi-chat-dots fs-4 d-block mb-2"></i>
                    Message Counsellor
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/videos" className="btn btn-outline-secondary w-100 py-3">
                    <i className="bi bi-play-circle fs-4 d-block mb-2"></i>
                    Watch Videos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Resources */}
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recommended Resources</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card h-100">
                    <img src="https://placehold.co/600x400?text=Anxiety+Management" className="card-img-top" alt="Anxiety Management" />
                    <div className="card-body">
                      <h6 className="card-title">5 Techniques for Managing Anxiety</h6>
                      <p className="card-text small">Learn practical strategies to help manage anxiety in daily life.</p>
                      <Link to="/blog/1" className="btn btn-sm btn-outline-primary">Read Article</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100">
                    <img src="https://placehold.co/600x400?text=Meditation" className="card-img-top" alt="Meditation Guide" />
                    <div className="card-body">
                      <h6 className="card-title">Beginner's Guide to Meditation</h6>
                      <p className="card-text small">Start your meditation journey with this simple guide for beginners.</p>
                      <Link to="/videos/2" className="btn btn-sm btn-outline-primary">Watch Video</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100">
                    <img src="https://placehold.co/600x400?text=Sleep+Better" className="card-img-top" alt="Sleep Better" />
                    <div className="card-body">
                      <h6 className="card-title">Improving Your Sleep Quality</h6>
                      <p className="card-text small">Tips and techniques for getting better sleep and improving mental health.</p>
                      <Link to="/blog/3" className="btn btn-sm btn-outline-primary">Read Article</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;