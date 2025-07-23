import React, { useState, useRef, useEffect } from 'react';
import './ChatVideo.css';

const ChatVideo = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'counsellor', text: 'Hello! How are you feeling today?', time: '10:01 AM' },
    { id: 2, sender: 'client', text: 'I\'m feeling a bit anxious about my upcoming presentation.', time: '10:02 AM' },
    { id: 3, sender: 'counsellor', text: 'That\'s completely normal. Let\'s talk about some techniques that might help you manage that anxiety.', time: '10:03 AM' }
  ]);

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

  return (
    <div className="chat-container">
      <div className="chat-main">
        <div className="chat-header">
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
          
          <div className="notes-section">
            <h6 className="notes-title">Anxiety Management Techniques</h6>
            <ul className="notes-list">
              <li>Deep breathing exercises - 4-7-8 technique</li>
              <li>Progressive muscle relaxation</li>
              <li>Visualization of successful presentation</li>
              <li>Preparation and practice strategies</li>
            </ul>
          </div>
          
          <div className="notes-section">
            <h6 className="notes-title">Homework</h6>
            <p>Practice deep breathing twice daily and record your anxiety levels before and after.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatVideo;