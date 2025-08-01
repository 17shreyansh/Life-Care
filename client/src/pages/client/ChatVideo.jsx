import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import api from '../../services/api';
import './ChatVideo.css';

const ChatVideo = () => {
  const { appointmentId } = useParams();
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sessionNotes, setSessionNotes] = useState([]);

  useEffect(() => {
    if (appointmentId) {
      fetchAppointmentDetails();
    }
  }, [appointmentId]);

  const fetchAppointmentDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/client/appointments/${appointmentId}`);
      setAppointment(res.data.data);
      
      // Load session notes if available
      if (res.data.data.sessionNotes) {
        setSessionNotes(res.data.data.sessionNotes);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load appointment details');
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'client',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  if (loading) {
    return (
      <div className="chat-container">
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <div className="chat-main">
        <div className="chat-header">
          <div className="session-info mb-3">
            <h5>Session with {appointment?.counsellor?.user?.name}</h5>
            <p className="text-muted mb-0">
              {appointment && new Date(appointment.date).toLocaleDateString()} at {appointment?.startTime}
            </p>
          </div>
          
          <div className={`chat-tabs ${activeTab === 'video' ? 'video-active' : ''}`}>
            <button 
              className={`chat-tab ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <i className="bi bi-chat-dots"></i>Chat
            </button>
            <button 
              className={`chat-tab ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              <i className="bi bi-camera-video"></i>Video
            </button>
          </div>
        </div>
        
        {activeTab === 'chat' ? (
          <>
            <div className="chat-messages">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`message-container ${msg.sender === 'client' ? 'outgoing' : 'incoming'}`}
                >
                  <div className="message-bubble">
                    {msg.text}
                  </div>
                  <div className="message-time">
                    {msg.time}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <form onSubmit={handleSendMessage} className="input-form">
                <input
                  type="text"
                  className="message-input"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="send-button">
                  <i className="bi bi-send"></i>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="video-placeholder">
            <i className="bi bi-camera-video-off video-icon"></i>
            <h5 className="video-title">Video Call Not Started</h5>
            <p className="video-text">Your counsellor hasn't started the video call yet.</p>
            <button className="video-button">
              <i className="bi bi-camera-video"></i>Join Video Call
            </button>
          </div>
        )}
      </div>
      
      <div className="chat-sidebar">
        <div className="notes-header">
          <div className="notes-icon">
            <i className="bi bi-journal-text"></i>
          </div>
          <h5 className="mb-0">Session Notes</h5>
        </div>
        <div className="notes-content">
          <div className="notes-alert">
            <i className="bi bi-info-circle"></i>
            <span>These are notes shared by your counsellor for this session.</span>
          </div>
          
          {sessionNotes.length > 0 ? (
            sessionNotes.map((note, index) => (
              <div key={index} className="notes-section">
                {note.publicNotes && (
                  <>
                    <h6 className="notes-title">Session Notes</h6>
                    <div dangerouslySetInnerHTML={{ __html: note.publicNotes }} />
                  </>
                )}
                
                {note.treatmentPlan && (
                  <>
                    <h6 className="notes-title">Treatment Plan</h6>
                    <p>{note.treatmentPlan}</p>
                  </>
                )}
                
                {note.followUpRecommended && (
                  <>
                    <h6 className="notes-title">Follow-up Recommended</h6>
                    <p>Next session recommended for: {new Date(note.followUpDate).toLocaleDateString()}</p>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="notes-section">
              <p className="text-muted">No session notes available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatVideo;