import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { counsellorAPI } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    upcomingAppointments: [],
    totalAppointments: 0,
    earnings: {
      total: 0,
      pending: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch counsellor profile
        const profileRes = await counsellorAPI.getProfile();
        setProfile(profileRes.data.data);
        
        // Fetch upcoming appointments
        const upcomingRes = await counsellorAPI.getAppointments({ 
          status: 'confirmed',
          startDate: new Date().toISOString()
        });
        
        // Fetch all appointments count
        const allRes = await counsellorAPI.getAppointments();
        
        // Fetch earnings
        const earningsRes = await counsellorAPI.getEarnings();
        
        setStats({
          upcomingAppointments: upcomingRes.data.data.slice(0, 5), // Show only 5 upcoming appointments
          totalAppointments: allRes.data.pagination.total,
          earnings: earningsRes.data.data.earnings
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

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div>
      <h2 className="mb-4">Counsellor Dashboard</h2>
      
      {!profile?.isVerified && (
        <div className="alert alert-warning mb-4">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Your profile is pending verification. Please complete your profile and upload verification documents.
          <div className="mt-2">
            <Link to="/counsellor/profile" className="btn btn-sm btn-warning">Complete Profile</Link>
          </div>
        </div>
      )}
      
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
              <Link to="/counsellor/appointments" className="btn btn-outline-primary mt-auto">View All</Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-success-light me-3">
                  <i className="bi bi-wallet2 text-success"></i>
                </div>
                <h5 className="card-title mb-0">Total Earnings</h5>
              </div>
              <h2 className="mb-3">{formatCurrency(stats.earnings.total)}</h2>
              <Link to="/counsellor/earnings" className="btn btn-outline-success mt-auto">View Details</Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-info-light me-3">
                  <i className="bi bi-cash-coin text-info"></i>
                </div>
                <h5 className="card-title mb-0">Pending Withdrawal</h5>
              </div>
              <h2 className="mb-3">{formatCurrency(stats.earnings.pending)}</h2>
              <Link to="/counsellor/earnings" className="btn btn-outline-info mt-auto">Withdraw</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Upcoming Appointments</h5>
              <Link to="/counsellor/appointments" className="btn btn-sm btn-outline-primary">View All</Link>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <p className="text-center py-3">Loading appointments...</p>
              ) : stats.upcomingAppointments.length > 0 ? (
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Date & Time</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.upcomingAppointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>{appointment.client?.name || 'Client'}</td>
                        <td>
                          <div>{formatDate(appointment.date)}</div>
                          <small className="text-muted">{appointment.startTime} - {appointment.endTime}</small>
                        </td>
                        <td>
                          <Badge bg={appointment.sessionType === 'video' ? 'primary' : 'info'}>
                            {appointment.sessionType === 'video' ? 'Video' : 'Chat'}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg="success">Confirmed</Badge>
                        </td>
                        <td>
                          <Link to={`/counsellor/appointments/${appointment._id}`} className="btn btn-sm btn-outline-primary">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="mb-0">No upcoming appointments</p>
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
                <Link to="/counsellor/availability" className="btn btn-primary">
                  <i className="bi bi-calendar-week me-2"></i>Update Availability
                </Link>
                <Link to="/counsellor/content" className="btn btn-outline-primary">
                  <i className="bi bi-file-earmark-text me-2"></i>Create Content
                </Link>
                <Link to="/counsellor/profile" className="btn btn-outline-secondary">
                  <i className="bi bi-person me-2"></i>Update Profile
                </Link>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Profile Completion</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <p className="text-center">Loading profile...</p>
              ) : (
                <>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Profile Completion</span>
                      <span>{profile ? '80%' : '0%'}</span>
                    </div>
                    <div className="progress">
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: profile ? '80%' : '0%' }}
                        aria-valuenow={profile ? 80 : 0} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Basic Information
                      <span className="badge bg-success rounded-pill">
                        <i className="bi bi-check-lg"></i>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Qualifications
                      <span className="badge bg-success rounded-pill">
                        <i className="bi bi-check-lg"></i>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Availability
                      <span className="badge bg-success rounded-pill">
                        <i className="bi bi-check-lg"></i>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Verification Documents
                      <span className={`badge ${profile?.isVerified ? 'bg-success' : 'bg-warning'} rounded-pill`}>
                        {profile?.isVerified ? <i className="bi bi-check-lg"></i> : <i className="bi bi-exclamation-lg"></i>}
                      </span>
                    </li>
                  </ul>
                  
                  <Link to="/counsellor/profile" className="btn btn-outline-primary btn-sm">
                    Complete Profile
                  </Link>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;