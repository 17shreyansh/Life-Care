import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CounsellorDashboard = () => {
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedSessions: 0,
    totalEarnings: 0,
    averageRating: 0
  });

  // Mock data
  const mockAppointments = [
    {
      id: 1,
      clientName: 'John Smith',
      clientImage: 'https://placehold.co/100x100?text=JS',
      time: '10:00 AM',
      duration: '50 min',
      type: 'Video Call',
      status: 'upcoming'
    },
    {
      id: 2,
      clientName: 'Emily Johnson',
      clientImage: 'https://placehold.co/100x100?text=EJ',
      time: '2:30 PM',
      duration: '50 min',
      type: 'Video Call',
      status: 'upcoming'
    }
  ];

  const mockStats = {
    totalAppointments: 45,
    completedSessions: 38,
    totalEarnings: 76000,
    averageRating: 4.8
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTodayAppointments(mockAppointments);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row g-4">
        {/* Stats Cards */}
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="display-4 fw-bold text-primary mb-2">{stats.totalAppointments}</div>
              <h5>Total Appointments</h5>
              <small className="text-muted">This Month</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="display-4 fw-bold text-success mb-2">{stats.completedSessions}</div>
              <h5>Completed Sessions</h5>
              <small className="text-muted">This Month</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="display-4 fw-bold text-info mb-2">₹{stats.totalEarnings.toLocaleString()}</div>
              <h5>Total Earnings</h5>
              <small className="text-muted">This Month</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="display-4 fw-bold text-warning mb-2">{stats.averageRating}</div>
              <h5>Average Rating</h5>
              <div className="text-warning">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Today's Schedule</h5>
              <Link to="/counsellor/appointments" className="btn btn-sm btn-outline-primary">View All</Link>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : todayAppointments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayAppointments.map(appointment => (
                        <tr key={appointment.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={appointment.clientImage} 
                                alt={appointment.clientName} 
                                className="rounded-circle me-2" 
                                width="40" 
                                height="40" 
                              />
                              <div>{appointment.clientName}</div>
                            </div>
                          </td>
                          <td>
                            {appointment.time}
                            <br />
                            <small className="text-muted">({appointment.duration})</small>
                          </td>
                          <td>{appointment.type}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <Link to={`/counsellor/appointments/${appointment.id}`} className="btn btn-outline-primary">Details</Link>
                              <Link to={`/counsellor/session/${appointment.id}`} className="btn btn-outline-success">Start Session</Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>No appointments scheduled for today.</p>
                  <Link to="/counsellor/availability" className="btn btn-primary">Update Availability</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-3">
                <Link to="/counsellor/availability" className="btn btn-outline-primary">
                  <i className="bi bi-calendar-check me-2"></i> Update Availability
                </Link>
                <Link to="/counsellor/earnings" className="btn btn-outline-success">
                  <i className="bi bi-cash-coin me-2"></i> View Earnings
                </Link>
                <Link to="/counsellor/profile" className="btn btn-outline-info">
                  <i className="bi bi-person-gear me-2"></i> Edit Profile
                </Link>
                <Link to="/counsellor/content" className="btn btn-outline-secondary">
                  <i className="bi bi-file-earmark-plus me-2"></i> Upload Content
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Reviews</h5>
            </div>
            <div className="card-body">
              <div className="d-flex mb-3 pb-3 border-bottom">
                <img src="https://placehold.co/50x50?text=MJ" alt="Client" className="rounded-circle me-3" />
                <div>
                  <div className="d-flex align-items-center mb-1">
                    <h6 className="mb-0 me-2">Maria Johnson</h6>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                  <p className="mb-1">Dr. Smith is an excellent therapist. She really listens and provides practical advice that has helped me tremendously.</p>
                  <small className="text-muted">2 days ago</small>
                </div>
              </div>
              <div className="d-flex">
                <img src="https://placehold.co/50x50?text=RT" alt="Client" className="rounded-circle me-3" />
                <div>
                  <div className="d-flex align-items-center mb-1">
                    <h6 className="mb-0 me-2">Robert Thompson</h6>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                    </div>
                  </div>
                  <p className="mb-1">Very professional and knowledgeable. I appreciate the structured approach to our sessions.</p>
                  <small className="text-muted">1 week ago</small>
                </div>
              </div>
            </div>
            <div className="card-footer bg-white">
              <Link to="/counsellor/reviews" className="btn btn-sm btn-outline-primary">View All Reviews</Link>
            </div>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Earnings Overview</h5>
              <div className="dropdown">
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  This Month
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">This Week</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">Last 3 Months</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                {/* Chart would go here - using placeholder */}
                <p className="text-muted">Earnings chart visualization would appear here</p>
                <div style={{ height: '150px', background: 'linear-gradient(to right, #e0e0e0, #f0f0f0)' }} className="rounded"></div>
              </div>
            </div>
            <div className="card-footer bg-white">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="mb-0 text-muted">Total Earnings</p>
                  <h5>₹76,000</h5>
                </div>
                <div>
                  <p className="mb-0 text-muted">Pending Payout</p>
                  <h5>₹12,500</h5>
                </div>
                <div>
                  <Link to="/counsellor/earnings" className="btn btn-sm btn-primary">Detailed Report</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorDashboard;