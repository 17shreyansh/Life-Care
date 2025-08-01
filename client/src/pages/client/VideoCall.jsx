import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import api from '../../services/api';

const VideoCall = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [pc, setPc] = useState(null);

  useEffect(() => {
    fetchAppointmentDetails();
    
    // Auto-hide controls after 3 seconds
    const timer = setTimeout(() => setShowControls(false), 3000);
    
    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [appointmentId]);

  // Show controls on mouse move
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      setTimeout(() => setShowControls(false), 3000);
    };
    
    if (isCallActive) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isCallActive]);

  const cleanup = () => {
    if (socket) socket.disconnect();
    if (pc) pc.close();
    if (localStream) localStream.getTracks().forEach(track => track.stop());
  };

  const fetchAppointmentDetails = async () => {
    try {
      const isCounsellor = window.location.pathname.includes('/counsellor/');
      const endpoint = isCounsellor ? `/counsellor/appointments/${appointmentId}` : `/client/appointments/${appointmentId}`;
      const res = await api.get(endpoint);
      setAppointment(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load appointment');
      setLoading(false);
    }
  };

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      setLocalStream(stream);
      setIsCallActive(true);
      
      setTimeout(() => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play().catch(e => console.log('Local play error:', e));
          console.log('Local video set:', stream);
        }
      }, 100);

      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);

      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
      setPc(peerConnection);

      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

      peerConnection.ontrack = (event) => {
        console.log('Remote stream received');
        setTimeout(() => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
            remoteVideoRef.current.play();
          }
        }, 100);
        setIsConnected(true);
      };

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          newSocket.emit('ice-candidate', { candidate: event.candidate, appointmentId });
        }
      };

      newSocket.on('connect', () => {
        console.log('Connected, joining room');
        newSocket.emit('join-room', appointmentId);
      });

      newSocket.on('user-joined', async () => {
        console.log('Creating offer');
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        newSocket.emit('offer', { offer, appointmentId });
      });

      newSocket.on('offer', async (data) => {
        console.log('Got offer');
        await peerConnection.setRemoteDescription(data.offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        newSocket.emit('answer', { answer, appointmentId });
      });

      newSocket.on('answer', async (data) => {
        console.log('Got answer');
        await peerConnection.setRemoteDescription(data.answer);
      });

      newSocket.on('ice-candidate', async (data) => {
        await peerConnection.addIceCandidate(data.candidate);
      });

    } catch (err) {
      setError('Camera access failed');
    }
  };

  const endCall = () => {
    cleanup();
    navigate(-1);
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
      setIsVideoOff(!isVideoOff);
    }
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#202124', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #1a73e8', borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
        <div>Loading video call...</div>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#202124', color: 'white' }}>
      <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#3c4043', borderRadius: '8px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
        <div>{error}</div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      height: '100vh', 
      backgroundColor: '#202124', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'rgba(32, 33, 36, 0.95)',
        color: 'white',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        zIndex: 1000,
        opacity: showControls ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#34a853', borderRadius: '50%' }}></div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>
              {appointment?.counsellor?.user?.name || appointment?.client?.name || 'Video Session'}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>
              {appointment && new Date(appointment.date).toLocaleDateString()} • {appointment?.startTime}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isConnected && (
            <div style={{ 
              backgroundColor: 'rgba(52, 168, 83, 0.2)', 
              color: '#34a853', 
              padding: '4px 8px', 
              borderRadius: '12px', 
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Connected
            </div>
          )}
          <button 
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Video Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
        {!isCallActive ? (
          <div style={{ 
            width: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              backgroundColor: '#3c4043', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '48px',
              marginBottom: '24px'
            }}>
              📹
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '400', marginBottom: '8px' }}>Ready to join?</h2>
            <p style={{ opacity: 0.7, marginBottom: '32px', fontSize: '14px' }}>Your camera and microphone will be ready</p>
            <button 
              onClick={startCall}
              style={{
                backgroundColor: '#1a73e8',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1557b0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1a73e8'}
            >
              <span>📹</span> Join now
            </button>
          </div>
        ) : (
          <>
            {/* Main video area */}
            <div style={{ flex: 1, position: 'relative', backgroundColor: '#000' }}>
              <video 
                ref={remoteVideoRef} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  backgroundColor: '#000'
                }} 
                autoPlay 
                playsInline 
                controls={false}
              />
              
              {!isConnected && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    backgroundColor: '#3c4043', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '32px',
                    margin: '0 auto 16px'
                  }}>
                    👤
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>Waiting for others to join</div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>Hang tight, someone will be here soon</div>
                </div>
              )}
            </div>

            {/* Local video overlay */}
            <div style={{
              position: 'absolute',
              bottom: showControls ? '100px' : '24px',
              right: window.innerWidth < 768 ? '12px' : '24px',
              width: window.innerWidth < 768 ? '120px' : '240px',
              height: window.innerWidth < 768 ? '90px' : '135px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#3c4043',
              border: '2px solid rgba(255,255,255,0.2)',
              transition: 'bottom 0.3s ease',
              zIndex: 9999,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              <video 
                ref={localVideoRef} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transform: 'scaleX(-1)'
                }} 
                autoPlay 
                playsInline 
                muted 
                controls={false}
              />
              {isVideoOff && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#3c4043',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px'
                }}>
                  👤
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      {isCallActive && (
        <div style={{
          position: 'absolute',
          bottom: window.innerWidth < 768 ? '12px' : '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: window.innerWidth < 768 ? '8px' : '12px',
          padding: window.innerWidth < 768 ? '8px 16px' : '12px 24px',
          backgroundColor: 'rgba(32, 33, 36, 0.95)',
          borderRadius: '32px',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1000
        }}>
          <button
            onClick={toggleMute}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: isMuted ? '#ea4335' : 'rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => !isMuted && (e.target.style.backgroundColor = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => !isMuted && (e.target.style.backgroundColor = 'rgba(255,255,255,0.1)')}
          >
            {isMuted ? '🔇' : '🎤'}
          </button>
          
          <button
            onClick={toggleVideo}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: isVideoOff ? '#ea4335' : 'rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => !isVideoOff && (e.target.style.backgroundColor = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => !isVideoOff && (e.target.style.backgroundColor = 'rgba(255,255,255,0.1)')}
          >
            {isVideoOff ? '📷' : '📹'}
          </button>
          
          <button
            onClick={endCall}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#ea4335',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d33b2c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ea4335'}
          >
            📞
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VideoCall;