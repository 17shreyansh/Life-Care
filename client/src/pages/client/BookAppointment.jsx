import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const BookAppointment = () => {
  const { counsellorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [counsellor, setCounsellor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [sessionType, setSessionType] = useState('video');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [slotLoading, setSlotLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Get counsellor details
  useEffect(() => {
    const fetchCounsellorDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/client/counsellors/${counsellorId}`);
        setCounsellor(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load counsellor details');
        setLoading(false);
      }
    };
    
    fetchCounsellorDetails();
  }, [counsellorId]);
  
  // Get available slots when date changes
  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedSlot(null);
    
    if (!date) return;
    
    try {
      setSlotLoading(true);
      const res = await api.get(`/appointments/available-slots?counsellorId=${counsellorId}&date=${date}`);
      setAvailableSlots(res.data.slots);
      setSlotLoading(false);
    } catch (err) {
      setError('Failed to load available slots');
      setSlotLoading(false);
    }
  };
  
  // Handle booking submission with Razorpay
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      setError('Please select a time slot');
      return;
    }
    
    try {
      setLoading(true);
      const appointmentData = {
        counsellorId,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        sessionType,
        notes
      };
      
      const res = await api.post('/appointments/book', appointmentData);
      const { appointment, razorpayOrder } = res.data.data;
      
      // Initialize Razorpay payment
      if (window.Razorpay) {
        // Real Razorpay payment
        const options = {
          key: razorpayOrder.key_id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'S S Psychologist Life Care',
          description: `Session with ${counsellor.user?.name || counsellor.name}`,
          order_id: razorpayOrder.id,
          handler: async function (response) {
            try {
              await api.post('/appointments/verify-payment', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                appointmentId: appointment._id
              });
              
              setSuccess('Payment successful! Appointment confirmed.');
              setTimeout(() => {
                navigate('/client/appointments');
              }, 2000);
            } catch (error) {
              setError('Payment verification failed');
            }
          },
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
            contact: user?.phone || ''
          },
          theme: {
            color: '#007bff'
          }
        };
        
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setError('Razorpay is not loaded. Please refresh the page.');
      }
      
      setLoading(false);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
      setLoading(false);
    }
  };
  
  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  // Format time for display (24h to 12h)
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  
  if (loading && !counsellor) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
  return (
    <Container className="py-4">
      <h2 className="mb-4">Book an Appointment</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      {counsellor && (
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img 
                variant="top" 
                src={counsellor.user?.avatar || counsellor.profileImage || 'https://via.placeholder.com/300'} 
                alt={counsellor.user?.name || counsellor.name}
              />
              <Card.Body>
                <Card.Title>{counsellor.user?.name || counsellor.name}</Card.Title>
                <Card.Text>
                  <strong>Specializations:</strong> {counsellor.specializations?.join(', ')}<br />
                  <strong>Experience:</strong> {counsellor.experience} years<br />
                  <strong>Fee:</strong> ₹{counsellor.fees?.video || counsellor.fees} per session
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={8}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleBookAppointment}>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control
                      type="date"
                      min={getMinDate()}
                      value={selectedDate}
                      onChange={handleDateChange}
                      required
                    />
                  </Form.Group>
                  
                  {slotLoading ? (
                    <div className="text-center my-4">
                      <Spinner animation="border" size="sm" />
                      <span className="ms-2">Loading available slots...</span>
                    </div>
                  ) : (
                    <>
                      {selectedDate && (
                        <Form.Group className="mb-3">
                          <Form.Label>Select Time Slot</Form.Label>
                          {availableSlots.length === 0 ? (
                            <Alert variant="info">
                              No slots available on this date. Please select another date.
                            </Alert>
                          ) : (
                            <div className="d-flex flex-wrap gap-2">
                              {availableSlots.map((slot, index) => (
                                <Button
                                  key={index}
                                  variant={selectedSlot === slot ? "primary" : "outline-primary"}
                                  onClick={() => setSelectedSlot(slot)}
                                  className="mb-2"
                                >
                                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                </Button>
                              ))}
                            </div>
                          )}
                        </Form.Group>
                      )}
                    </>
                  )}
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Session Type</Form.Label>
                    <Form.Select
                      value={sessionType}
                      onChange={(e) => setSessionType(e.target.value)}
                      required
                    >
                      <option value="video">Video Call</option>
                      <option value="chat">Chat</option>
                      <option value="in-person">In-Person</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Notes (Optional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific concerns or topics you'd like to discuss"
                    />
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading || !selectedSlot}
                    className="w-100"
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span className="ms-2">Processing...</span>
                      </>
                    ) : (
                      'Book Appointment'
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BookAppointment;