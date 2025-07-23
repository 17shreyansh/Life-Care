import React, { useState } from 'react';
import './MyAppointments.css';

const MyAppointments = () => {
  const [activeFilter, setActiveFilter] = useState('all');
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

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed': return 'status-confirmed';
      case 'Completed': return 'status-completed';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };
  
  const filteredAppointments = activeFilter === 'all' 
    ? appointments 
    : appointments.filter(app => app.status.toLowerCase() === activeFilter.toLowerCase());

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
    <div className="appointments-page">
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <p>Manage your scheduled sessions with our counsellors</p>
      </div>
      
      <div className={`filter-tabs tab-${activeFilter === 'all' ? '1' : activeFilter === 'confirmed' ? '2' : activeFilter === 'completed' ? '3' : '4'}`}>
        <button 
          className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Appointments
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'confirmed' ? 'active' : ''}`}
          onClick={() => setActiveFilter('confirmed')}
        >
          Upcoming
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </button>
        <button 
          className={`filter-tab ${activeFilter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>
      
      <div className="appointments-list">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-content">
                <div className="appointment-info">
                  <h3 className="appointment-counsellor">{appointment.counsellor}</h3>
                  <div className="appointment-meta">
                    <div className="meta-item">
                      <i className="bi bi-calendar"></i>
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                      <i className="bi bi-clock"></i>
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="appointment-status">
                    <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <span className="appointment-type">
                      {appointment.type}
                    </span>
                  </div>
                </div>
                
                <div className="appointment-actions">
                  {appointment.status === 'Confirmed' && (
                    <>
                      <button className="btn-action btn-primary-action">
                        <i className="bi bi-camera-video"></i> Join
                      </button>
                      <button 
                        className="btn-action btn-secondary-action"
                        onClick={() => handleReschedule(appointment.id)}
                      >
                        <i className="bi bi-calendar"></i> Reschedule
                      </button>
                      <button 
                        className="btn-action btn-danger-action"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        <i className="bi bi-x-circle"></i> Cancel
                      </button>
                    </>
                  )}
                  {appointment.status === 'Completed' && (
                    <>
                      <button className="btn-action btn-secondary-action">
                        <i className="bi bi-journal-text"></i> Notes
                      </button>
                      <button className="btn-action btn-secondary-action">
                        <i className="bi bi-star"></i> Feedback
                      </button>
                      <div className="btn-action" style={{visibility: 'hidden'}}></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="bi bi-calendar-x"></i>
            </div>
            <h3>No appointments found</h3>
            <p>You don't have any {activeFilter !== 'all' ? activeFilter : ''} appointments</p>
            {activeFilter !== 'all' && (
              <button 
                className="btn-action btn-primary-action"
                onClick={() => setActiveFilter('all')}
              >
                View All Appointments
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;