import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import api from '../../services/api';

const ChatSession = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchAppointmentDetails();
    // In real app, connect to WebSocket here
  }, [appointmentId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchAppointmentDetails = async () => {
    try {
      setLoading(true);
      // Check if user is counsellor or client based on current path
      const isCounsellor = window.location.pathname.includes('/counsellor/');
      const endpoint = isCounsellor 
        ? `/counsellor/appointments/${appointmentId}`
        : `/client/appointments/${appointmentId}`;
      
      const res = await api.get(endpoint);
      setAppointment(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load appointment details');
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'client',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
      // In real app, send via WebSocket
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading chat session...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4" style={{ height: '100vh' }}>
      <Row className="h-100">
        <Col md={8} className="h-100">
          <Card className="h-100 d-flex flex-column">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-chat-dots me-2"></i>
                Chat Session with {appointment?.counsellor?.user?.name}
              </h5>
              <small>
                {appointment && new Date(appointment.date).toLocaleDateString()} at {appointment?.startTime}
              </small>
            </Card.Header>
            
            <Card.Body className="flex-grow-1 d-flex flex-column p-0">
              <div className="flex-grow-1 p-3" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                {messages.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <i className="bi bi-chat-dots display-4"></i>
                    <p className="mt-3">Start your conversation with your counsellor</p>
                  </div>
                ) : (
                  messages.map(message => (
                    <div 
                      key={message.id}
                      className={`mb-3 d-flex ${message.sender === 'client' ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                      <div 
                        className={`p-3 rounded-3 ${
                          message.sender === 'client' 
                            ? 'bg-primary text-white' 
                            : 'bg-light'
                        }`}
                        style={{ maxWidth: '70%' }}
                      >
                        <div>{message.text}</div>
                        <small className={`d-block mt-1 ${message.sender === 'client' ? 'text-white-50' : 'text-muted'}`}>
                          {message.timestamp}
                        </small>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="border-top p-3">
                <Form onSubmit={handleSendMessage}>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-grow-1"
                    />
                    <Button type="submit" variant="primary" disabled={!newMessage.trim()}>
                      <i className="bi bi-send"></i>
                    </Button>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="h-100">
          <Card className="h-100">
            <Card.Header>
              <h6 className="mb-0">
                <i className="bi bi-journal-text me-2"></i>
                Session Information
              </h6>
            </Card.Header>
            <Card.Body>
              {appointment && (
                <>
                  <div className="mb-3">
                    <strong>Counsellor:</strong><br />
                    {appointment.counsellor?.user?.name}
                  </div>
                  <div className="mb-3">
                    <strong>Date & Time:</strong><br />
                    {new Date(appointment.date).toLocaleDateString()}<br />
                    {appointment.startTime} - {appointment.endTime}
                  </div>
                  <div className="mb-3">
                    <strong>Session Type:</strong><br />
                    Chat Session
                  </div>
                  <div className="mb-3">
                    <strong>Amount:</strong><br />
                    ₹{appointment.amount}
                  </div>
                  {appointment.notes && (
                    <div className="mb-3">
                      <strong>Your Notes:</strong><br />
                      <small className="text-muted">{appointment.notes}</small>
                    </div>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatSession;