import { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: {
      total: 0,
      clients: 0,
      counsellors: 0
    },
    appointments: {
      total: 0,
      pending: 0,
      completed: 0
    },
    finances: {
      totalRevenue: 0,
      pendingWithdrawals: 0
    },
    content: {
      blogs: 0,
      videos: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [pendingCounsellors, setPendingCounsellors] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard stats
        const statsRes = await adminAPI.getDashboardStats();
        setStats(statsRes.data.data);
        
        // Fetch pending counsellors
        const counsellorsRes = await adminAPI.getCounsellors({ isVerified: false });
        setPendingCounsellors(counsellorsRes.data.data.slice(0, 5)); // Show only 5 pending counsellors
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>
      
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <div className="icon-box bg-primary-light me-3">
                  <i className="bi bi-people text-primary"></i>
                </div>
                <h6 className="card-title mb-0">Total Users</h6>
              </div>
              <h3 className="mb-0">{stats.users.total}</h3>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <div className="icon-box bg-success-light me-3">
                  <i className="bi bi-calendar-check text-success"></i>
                </div>
                <h6 className="card-title mb-0">Appointments</h6>
              </div>
              <h3 className="mb-0">{stats.appointments.total}</h3>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <div className="icon-box bg-info-light me-3">
                  <i className="bi bi-cash-coin text-info"></i>
                </div>
                <h6 className="card-title mb-0">Total Revenue</h6>
              </div>
              <h3 className="mb-0">{formatCurrency(stats.finances.totalRevenue)}</h3>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <div className="icon-box bg-warning-light me-3">
                  <i className="bi bi-wallet2 text-warning"></i>
                </div>
                <h6 className="card-title mb-0">Pending Withdrawals</h6>
              </div>
              <h3 className="mb-0">{stats.finances.pendingWithdrawals}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="g-4 mb-4">
        <Col md={8}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Pending Counsellor Verifications</h5>
              <Link to="/admin/counsellors?isVerified=false" className="btn btn-sm btn-outline-primary">View All</Link>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <p className="text-center py-3">Loading data...</p>
              ) : pendingCounsellors.length > 0 ? (
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Specialization</th>
                      <th>Experience</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingCounsellors.map((counsellor) => (
                      <tr key={counsellor._id}>
                        <td>{counsellor.user?.name || counsellor.name}</td>
                        <td>{counsellor.specializations?.join(', ') || 'N/A'}</td>
                        <td>{counsellor.experience} years</td>
                        <td>
                          <Badge bg="warning">Pending</Badge>
                        </td>
                        <td>
                          <Link to={`/admin/counsellors/${counsellor._id}`} className="btn btn-sm btn-outline-primary">
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="mb-0">No pending verifications</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">User Statistics</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <h6 className="mb-3">User Distribution</h6>
                <div className="progress mb-2" style={{ height: '25px' }}>
                  <div 
                    className="progress-bar bg-primary" 
                    role="progressbar" 
                    style={{ width: `${(stats.users.clients / stats.users.total) * 100}%` }}
                    aria-valuenow={(stats.users.clients / stats.users.total) * 100} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    Clients
                  </div>
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: `${(stats.users.counsellors / stats.users.total) * 100}%` }}
                    aria-valuenow={(stats.users.counsellors / stats.users.total) * 100} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    Counsellors
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <small>Clients: {stats.users.clients}</small>
                  <small>Counsellors: {stats.users.counsellors}</small>
                </div>
              </div>
              
              <div>
                <h6 className="mb-3">Appointment Status</h6>
                <div className="d-flex justify-content-between mb-1">
                  <span>Pending</span>
                  <span>{stats.appointments.pending}</span>
                </div>
                <div className="progress mb-2">
                  <div 
                    className="progress-bar bg-warning" 
                    role="progressbar" 
                    style={{ width: `${(stats.appointments.pending / stats.appointments.total) * 100}%` }}
                    aria-valuenow={(stats.appointments.pending / stats.appointments.total) * 100} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
                
                <div className="d-flex justify-content-between mb-1">
                  <span>Completed</span>
                  <span>{stats.appointments.completed}</span>
                </div>
                <div className="progress">
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: `${(stats.appointments.completed / stats.appointments.total) * 100}%` }}
                    aria-valuenow={(stats.appointments.completed / stats.appointments.total) * 100} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Link to="/admin/users" className="btn btn-outline-primary d-block mb-2">
                    <i className="bi bi-people me-2"></i>Manage Users
                  </Link>
                </Col>
                <Col md={3}>
                  <Link to="/admin/counsellors" className="btn btn-outline-success d-block mb-2">
                    <i className="bi bi-person-badge me-2"></i>Manage Counsellors
                  </Link>
                </Col>
                <Col md={3}>
                  <Link to="/admin/appointments" className="btn btn-outline-info d-block mb-2">
                    <i className="bi bi-calendar-check me-2"></i>View Appointments
                  </Link>
                </Col>
                <Col md={3}>
                  <Link to="/admin/withdrawals" className="btn btn-outline-warning d-block mb-2">
                    <i className="bi bi-cash-coin me-2"></i>Process Withdrawals
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;