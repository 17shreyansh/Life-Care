import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { clientAPI } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    upcomingAppointments: [],
    totalAppointments: 0,
    completedAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch upcoming appointments
        const upcomingRes = await clientAPI.getAppointments({ 
          status: 'confirmed',
          startDate: new Date().toISOString()
        });
        
        // Fetch all appointments count
        const allRes = await clientAPI.getAppointments();
        
        // Fetch completed appointments count
        const completedRes = await clientAPI.getAppointments({ status: 'completed' });
        
        setStats({
          upcomingAppointments: upcomingRes.data.data.slice(0, 3), // Show only 3 upcoming appointments
          totalAppointments: allRes.data.pagination.total,
          completedAppointments: completedRes.data.pagination.total
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2 className="mb-4">Client Dashboard</h2>
      
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-primary-light me-3">
                  <i className="bi bi-calendar-check text-primary"></i>
                </div>
                <h5 className="card-title mb-0">Upcoming Sessions</h5>
              </div>
              <h2 className="mb-3">{stats.upcomingAppointments.length}</h2>
              <Link to="/client/appointments" className="btn btn-outline-primary mt-auto">View All</Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-success-light me-3">
                  <i className="bi bi-check-circle text-success"></i>
                </div>
                <h5 className="card-title mb-0">Completed Sessions</h5>
              </div>
              <h2 className="mb-3">{stats.completedAppointments}</h2>
              <Link to="/client/appointments?status=completed" className="btn btn-outline-success mt-auto">View History</Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-info-light me-3">
                  <i className="bi bi-people text-info"></i>
                </div>
                <h5 className="card-title mb-0">Find Counsellors</h5>
              </div>
              <p className="text-muted">Connect with certified counsellors for your mental health needs</p>
              <Link to="/client/counsellors" className="btn btn-outline-info mt-auto">Browse Counsellors</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Upcoming Appointments</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <p className="text-center py-3">Loading appointments...</p>
              ) : stats.upcomingAppointments.length > 0 ? (
                stats.upcomingAppointments.map((appointment) => (
                  <div key={appointment._id} className="appointment-item mb-3 p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">
                          Session with {appointment.counsellor?.user?.name || 'Counsellor'}
                        </h6>
                        <p className="text-muted mb-1">
                          <i className="bi bi-calendar me-2"></i>
                          {formatDate(appointment.date)}
                        </p>
                        <p className="text-muted mb-0">
                          <i className="bi bi-clock me-2"></i>
                          {appointment.startTime} - {appointment.endTime}
                        </p>
                      </div>
                      <div>
                        <span className={`badge bg-${appointment.sessionType === 'video' ? 'primary' : 'info'} mb-2 d-block`}>
                          {appointment.sessionType === 'video' ? 'Video Call' : 'Chat Session'}
                        </span>
                        <Link to={`/client/appointments/${appointment._id}`} className="btn btn-sm btn-outline-primary">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="mb-3">No upcoming appointments</p>
                  <Link to="/client/counsellors" className="btn btn-primary">
                    Book a Session
                  </Link>
                </div>
              )}
              
              {stats.upcomingAppointments.length > 0 && (
                <div className="text-center mt-3">
                  <Link to="/client/appointments" className="btn btn-outline-primary">
                    View All Appointments
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Link to="/client/counsellors" className="btn btn-primary">
                  <i className="bi bi-calendar-plus me-2"></i>Book New Session
                </Link>
                <Link to="/client/chat-video" className="btn btn-outline-primary">
                  <i className="bi bi-camera-video me-2"></i>Join Video Session
                </Link>
                <Link to="/client/profile" className="btn btn-outline-secondary">
                  <i className="bi bi-person me-2"></i>Update Profile
                </Link>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Mental Health Tips</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Practice mindfulness for 10 minutes daily
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Stay hydrated and maintain a balanced diet
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Get 7-8 hours of quality sleep
                </li>
                <li>
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Take short breaks during work hours
                </li>
              </ul>
              <Link to="/blog" className="btn btn-link p-0">Read more health tips</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;