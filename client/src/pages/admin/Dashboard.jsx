import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCounsellors: 0,
    pendingApprovals: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    activeDisputes: 0
  });

  // Mock data
  const mockStats = {
    totalUsers: 1245,
    totalCounsellors: 87,
    pendingApprovals: 12,
    totalAppointments: 3567,
    totalRevenue: 1250000,
    activeDisputes: 5
  };

  const mockRecentUsers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'client',
      joinDate: '2023-06-10',
      status: 'active'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'counsellor',
      joinDate: '2023-06-09',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'client',
      joinDate: '2023-06-08',
      status: 'active'
    },
    {
      id: 4,
      name: 'Dr. Emily Davis',
      email: 'emily.davis@example.com',
      role: 'counsellor',
      joinDate: '2023-06-07',
      status: 'active'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container-fluid">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* Stats Cards */}
          <div className="col-md-4 col-lg-2">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="display-5 fw-bold text-primary mb-2">{stats.totalUsers}</div>
                <h6>Total Users</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="display-5 fw-bold text-success mb-2">{stats.totalCounsellors}</div>
                <h6>Counsellors</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="display-5 fw-bold text-warning mb-2">{stats.pendingApprovals}</div>
                <h6>Pending Approvals</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="display-5 fw-bold text-info mb-2">{stats.totalAppointments}</div>
                <h6>Total Appointments</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="display-5 fw-bold text-success mb-2">₹{(stats.totalRevenue/100000).toFixed(1)}L</div>
                <h6>Total Revenue</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="display-5 fw-bold text-danger mb-2">{stats.activeDisputes}</div>
                <h6>Active Disputes</h6>
              </div>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Pending Approvals</h5>
                <Link to="/admin/counsellors?status=pending" className="btn btn-sm btn-outline-primary">View All</Link>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Applied On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dr. Sarah Johnson</td>
                        <td>Anxiety, Depression</td>
                        <td>Jun 9, 2023</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Link to="/admin/counsellors/2" className="btn btn-outline-primary">View</Link>
                            <button className="btn btn-outline-success">Approve</button>
                            <button className="btn btn-outline-danger">Reject</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Dr. Robert Kim</td>
                        <td>Relationship Counselling</td>
                        <td>Jun 8, 2023</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Link to="/admin/counsellors/5" className="btn btn-outline-primary">View</Link>
                            <button className="btn btn-outline-success">Approve</button>
                            <button className="btn btn-outline-danger">Reject</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Dr. Lisa Thompson</td>
                        <td>Child Psychology</td>
                        <td>Jun 7, 2023</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Link to="/admin/counsellors/8" className="btn btn-outline-primary">View</Link>
                            <button className="btn btn-outline-success">Approve</button>
                            <button className="btn btn-outline-danger">Reject</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Users */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Recent Users</h5>
                <Link to="/admin/users" className="btn btn-sm btn-outline-primary">View All</Link>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRecentUsers.map(user => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge ${user.role === 'counsellor' ? 'bg-info' : 'bg-secondary'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                              {user.status}
                            </span>
                          </td>
                          <td>
                            <Link to={`/admin/users/${user.id}`} className="btn btn-sm btn-outline-primary">View</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="col-md-8">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Revenue Overview</h5>
                <div className="dropdown">
                  <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Last 6 Months
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Last 30 Days</a></li>
                    <li><a className="dropdown-item" href="#">Last 6 Months</a></li>
                    <li><a className="dropdown-item" href="#">This Year</a></li>
                    <li><a className="dropdown-item" href="#">All Time</a></li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="text-center py-4">
                  {/* Chart would go here - using placeholder */}
                  <p className="text-muted">Revenue chart visualization would appear here</p>
                  <div style={{ height: '250px', background: 'linear-gradient(to right, #e0e0e0, #f0f0f0)' }} className="rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Quick Actions</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <Link to="/admin/counsellors/new" className="btn btn-outline-primary">
                    <i className="bi bi-person-plus me-2"></i> Add New Counsellor
                  </Link>
                  <Link to="/admin/cms/blog/new" className="btn btn-outline-success">
                    <i className="bi bi-file-earmark-plus me-2"></i> Create Blog Post
                  </Link>
                  <Link to="/admin/cms/videos/new" className="btn btn-outline-info">
                    <i className="bi bi-camera-video me-2"></i> Upload Video
                  </Link>
                  <Link to="/admin/reports" className="btn btn-outline-secondary">
                    <i className="bi bi-graph-up me-2"></i> Generate Reports
                  </Link>
                  <Link to="/admin/settings" className="btn btn-outline-dark">
                    <i className="bi bi-gear me-2"></i> Platform Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Recent Activity</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-success me-2">New User</span>
                      <span>John Smith registered as a client</span>
                    </div>
                    <small className="text-muted">5 minutes ago</small>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-info me-2">Appointment</span>
                      <span>Dr. Sarah Johnson completed a session with Emily Wilson</span>
                    </div>
                    <small className="text-muted">1 hour ago</small>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-warning me-2">Payment</span>
                      <span>₹2,500 payment processed for appointment #12345</span>
                    </div>
                    <small className="text-muted">2 hours ago</small>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-danger me-2">Dispute</span>
                      <span>New dispute filed by Michael Brown for appointment #12340</span>
                    </div>
                    <small className="text-muted">3 hours ago</small>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-primary me-2">Content</span>
                      <span>Admin uploaded new blog post: "Understanding Anxiety Disorders"</span>
                    </div>
                    <small className="text-muted">5 hours ago</small>
                  </li>
                </ul>
              </div>
              <div className="card-footer bg-white">
                <Link to="/admin/activity" className="btn btn-sm btn-outline-primary">View All Activity</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;