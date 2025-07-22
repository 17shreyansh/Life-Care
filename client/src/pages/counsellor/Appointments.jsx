import { useState, useEffect } from 'react';
import { Card, Table, Badge, Form, Button, Row, Col } from 'react-bootstrap';
import { counsellorAPI } from '../../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filter.status) params.status = filter.status;
      if (filter.startDate) params.startDate = filter.startDate;
      if (filter.endDate) params.endDate = filter.endDate;
      
      const response = await counsellorAPI.getAppointments(params);
      setAppointments(response.data.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchAppointments();
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      case 'no-show': return 'secondary';
      default: return 'info';
    }
  };

  return (
    <div>
      <h2 className="mb-4">Appointments</h2>
      
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={handleFilterSubmit}>
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select 
                    name="status" 
                    value={filter.status} 
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No Show</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={filter.startDate}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={filter.endDate}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <Button type="submit" variant="primary" className="mb-3 w-100">
                  Filter
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      
      <Card className="shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading appointments...</p>
            </div>
          ) : appointments.length > 0 ? (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Date & Time</th>
                  <th>Session Type</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
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
                      <Badge bg={getStatusBadge(appointment.status)}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={appointment.payment?.status === 'completed' ? 'success' : 'warning'}>
                        {appointment.payment?.status || 'Pending'}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        href={`/counsellor/appointments/${appointment._id}`}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-5">
              <p className="mb-0">No appointments found</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Appointments;