import React, { useState } from 'react';

const ChatVideo = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'counsellor', text: 'Hello! How are you feeling today?', time: '10:01 AM' },
    { id: 2, sender: 'client', text: 'I\'m feeling a bit anxious about my upcoming presentation.', time: '10:02 AM' },
    { id: 3, sender: 'counsellor', text: 'That\'s completely normal. Let\'s talk about some techniques that might help you manage that anxiety.', time: '10:03 AM' }
  ]);

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
    <div className="row">
      <div className="col-md-8">
        <div className="dashboard-card" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="dashboard-card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'chat' ? 'active' : ''}`}
                  onClick={() => setActiveTab('chat')}
                >
                  <i className="bi bi-chat-dots me-2"></i>Chat
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveTab('video')}
                >
                  <i className="bi bi-camera-video me-2"></i>Video
                </button>
              </li>
            </ul>
          </div>
          <div className="dashboard-card-body d-flex flex-column p-0" style={{ height: 'calc(100% - 50px)' }}>
            {activeTab === 'chat' ? (
              <>
                <div className="chat-messages p-3" style={{ flexGrow: 1, overflowY: 'auto' }}>
                  {messages.map(msg => (
                    <div 
                      key={msg.id} 
                      className={`chat-message mb-3 ${msg.sender === 'client' ? 'text-end' : ''}`}
                    >
                      <div 
                        className={`d-inline-block p-3 rounded-3 ${
                          msg.sender === 'client' 
                            ? 'bg-primary text-white' 
                            : 'bg-light'
                        }`}
                        style={{ maxWidth: '80%', textAlign: 'left' }}
                      >
                        {msg.text}
                        <div className="text-end mt-1">
                          <small className={msg.sender === 'client' ? 'text-white-50' : 'text-muted'}>
                            {msg.time}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chat-input p-3 border-top">
                  <form onSubmit={handleSendMessage} className="d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-send"></i>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="video-placeholder d-flex flex-column align-items-center justify-content-center h-100">
                <i className="bi bi-camera-video-off fs-1 text-muted mb-3"></i>
                <h5>Video Call Not Started</h5>
                <p className="text-muted">Your counsellor hasn't started the video call yet.</p>
                <button className="btn btn-primary mt-3">
                  <i className="bi bi-camera-video me-2"></i>Join Video Call
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="dashboard-card" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="dashboard-card-header">
            <h5 className="mb-0">Session Notes</h5>
          </div>
          <div className="dashboard-card-body" style={{ overflowY: 'auto', height: 'calc(100% - 60px)' }}>
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              These are notes shared by your counsellor for this session.
            </div>
            <h6>Anxiety Management Techniques</h6>
            <ul>
              <li>Deep breathing exercises - 4-7-8 technique</li>
              <li>Progressive muscle relaxation</li>
              <li>Visualization of successful presentation</li>
              <li>Preparation and practice strategies</li>
            </ul>
            <h6>Homework</h6>
            <p>Practice deep breathing twice daily and record your anxiety levels before and after.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatVideo;