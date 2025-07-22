import { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { counsellorAPI } from '../../services/api';

const Availability = () => {
  const [availability, setAvailability] = useState({
    monday: { isAvailable: false, startTime: '09:00', endTime: '17:00', slots: [] },
    tuesday: { isAvailable: false, startTime: '09:00', endTime: '17:00', slots: [] },
    wednesday: { isAvailable: false, startTime: '09:00', endTime: '17:00', slots: [] },
    thursday: { isAvailable: false, startTime: '09:00', endTime: '17:00', slots: [] },
    friday: { isAvailable: false, startTime: '09:00', endTime: '17:00', slots: [] },
    saturday: { isAvailable: false, startTime: '09:00', endTime: '17:00', slots: [] },
    sunday: { isAvailable: false, startTime: '09:00', endTime: '17:00', slots: [] }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const response = await counsellorAPI.getProfile();
      if (response.data.data.availability) {
        setAvailability(response.data.data.availability);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      setError('Failed to load your availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDayToggle = (day) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        isAvailable: !availability[day].isAvailable
      }
    });
  };

  const handleTimeChange = (day, field, value) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        [field]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setSaving(true);

    try {
      await counsellorAPI.updateAvailability({ availability });
      setSuccess('Availability updated successfully!');
    } catch (error) {
      console.error('Error updating availability:', error);
      setError('Failed to update availability. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <div>
      <h2 className="mb-4">Manage Availability</h2>
      
      <Card className="shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading your availability...</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              
              <p className="mb-4">Set your weekly availability for client appointments.</p>
              
              {days.map((day) => (
                <Card key={day.key} className="mb-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={3}>
                        <Form.Check
                          type="switch"
                          id={`${day.key}-toggle`}
                          label={day.label}
                          checked={availability[day.key].isAvailable}
                          onChange={() => handleDayToggle(day.key)}
                          className="fs-5"
                        />
                      </Col>
                      
                      <Col md={9}>
                        {availability[day.key].isAvailable && (
                          <Row>
                            <Col md={5}>
                              <Form.Group>
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control
                                  type="time"
                                  value={availability[day.key].startTime}
                                  onChange={(e) => handleTimeChange(day.key, 'startTime', e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={5}>
                              <Form.Group>
                                <Form.Label>End Time</Form.Label>
                                <Form.Control
                                  type="time"
                                  value={availability[day.key].endTime}
                                  onChange={(e) => handleTimeChange(day.key, 'endTime', e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button variant="primary" type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Availability'}
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Availability;