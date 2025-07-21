import React, { useState } from 'react';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      counsellor: 'Dr. Sarah Johnson',
      date: '2023-06-15',
      time: '10:00 AM',
      status: 'Confirmed',
      type: 'Video Call'
    },
    {
      id: 2,
      counsellor: 'Dr. Michael Chen',
      date: '2023-06-10',
      time: '2:00 PM',
      status: 'Completed',
      type: 'Video Call'
    },
    {
      id: 3,
      counsellor: 'Dr. Emily Rodriguez',
      date: '2023-06-05',
      time: '11:30 AM',
      status: 'Cancelled',
      type: 'Chat Session'
    }
  ]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-success';
      case 'Completed': return 'bg-info';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const handleCancel = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? {...app, status: 'Cancelled'} : app
    ));
  };

  const handleReschedule = (id) => {
    // In a real app, this would open a reschedule modal
    alert(`Reschedule appointment ${id}`);
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h5 className="mb-0">My Appointments</h5>
      </div>
      <div className="dashboard-card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Counsellor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.counsellor}</td>
                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.type}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      {appointment.status === 'Confirmed' && (
                        <>
                          <button className="btn btn-sm btn-primary me-2">
                            <i className="bi bi-camera-video me-1"></i> Join
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => handleReschedule(appointment.id)}
                          >
                            <i className="bi bi-calendar me-1"></i> Reschedule
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancel(appointment.id)}
                          >
                            <i className="bi bi-x-circle me-1"></i> Cancel
                          </button>
                        </>
                      )}
                      {appointment.status === 'Completed' && (
                        <>
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <i className="bi bi-journal-text me-1"></i> View Notes
                          </button>
                          <button className="btn btn-sm btn-outline-secondary">
                            <i className="bi bi-star me-1"></i> Leave Feedback
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <i className="bi bi-calendar-x text-muted fs-1 d-block mb-2"></i>
                    <p>No appointments found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;