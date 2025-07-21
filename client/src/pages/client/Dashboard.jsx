import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data
  const upcomingAppointments = [
    {
      id: 1,
      counsellor: 'Dr. Sarah Johnson',
      date: '2023-06-15',
      time: '10:00 AM',
      type: 'Video Call'
    }
  ];

  return (
    <>
      {/* Stats Cards */}
      <div className="dashboard-card">
        <div className="dashboard-card-body">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="d-flex align-items-center">
                <div className="stat-card-icon bg-primary-light me-3">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bold">3</h3>
                  <p className="text-muted mb-0">Total Sessions</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="d-flex align-items-center">
                <div className="stat-card-icon bg-success-light me-3">
                  <i className="bi bi-clock-history"></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bold">1</h3>
                  <p className="text-muted mb-0">Upcoming Sessions</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center">
                <div className="stat-card-icon bg-info-light me-3">
                  <i className="bi bi-star"></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bold">4.8</h3>
                  <p className="text-muted mb-0">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h5 className="mb-0">Upcoming Appointments</h5>
          <Link to="/client/appointments" className="btn btn-sm btn-primary">
            View All
          </Link>
        </div>
        <div className="dashboard-card-body">
          {upcomingAppointments.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Counsellor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAppointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>{appointment.counsellor}</td>
                      <td>{new Date(appointment.date).toLocaleDateString()}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.type}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">
                          <i className="bi bi-camera-video me-1"></i> Join
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-calendar-x me-1"></i> Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <i className="bi bi-calendar-x text-muted fs-1"></i>
              <p className="mt-2 mb-0">No upcoming appointments</p>
              <Link to="/client/counsellors" className="btn btn-primary mt-3">
                Book an Appointment
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h5 className="mb-0">Quick Actions</h5>
        </div>
        <div className="dashboard-card-body">
          <div className="row g-3">
            <div className="col-6 col-md-4">
              <Link to="/client/counsellors" className="btn btn-outline-primary w-100">
                <i className="bi bi-search me-2"></i>
                Find a Counsellor
              </Link>
            </div>
            <div className="col-6 col-md-4">
              <Link to="/client/appointments" className="btn btn-outline-primary w-100">
                <i className="bi bi-calendar-plus me-2"></i>
                Book Appointment
              </Link>
            </div>
            <div className="col-6 col-md-4">
              <Link to="/client/chat-video" className="btn btn-outline-primary w-100">
                <i className="bi bi-chat-dots me-2"></i>
                Start Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;