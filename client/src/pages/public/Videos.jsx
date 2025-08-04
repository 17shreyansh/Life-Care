import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clientAPI } from '../../services/api';

const Videos = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchCounsellors();
  }, []);

  const fetchCounsellors = async () => {
    try {
      const res = await clientAPI.getCounsellors({ limit: 6 });
      setCounsellors(res.data.data || []);
    } catch (err) {
      console.error('Failed to load counsellors:', err);
    } finally {
      setLoading(false);
    }
  };

  const videos = [];

  const filteredVideos = [];

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const closeVideoModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="videos-page py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="mb-3">Educational <span className="text-gradient">Videos</span></h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Explore our collection of educational videos on various mental health topics, 
            created by our expert counsellors to help you understand and manage your mental wellbeing.
          </p>
        </div>

        {/* Video Filters */}
        <div className="video-filter-container mb-5">
          <button 
            className={`video-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Videos
          </button>
          <button 
            className={`video-filter-btn ${activeFilter === 'anxiety' ? 'active' : ''}`}
            onClick={() => setActiveFilter('anxiety')}
          >
            Anxiety
          </button>
          <button 
            className={`video-filter-btn ${activeFilter === 'depression' ? 'active' : ''}`}
            onClick={() => setActiveFilter('depression')}
          >
            Depression
          </button>
          <button 
            className={`video-filter-btn ${activeFilter === 'mindfulness' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mindfulness')}
          >
            Mindfulness
          </button>
          <button 
            className={`video-filter-btn ${activeFilter === 'stress' ? 'active' : ''}`}
            onClick={() => setActiveFilter('stress')}
          >
            Stress Management
          </button>
          <button 
            className={`video-filter-btn ${activeFilter === 'relationships' ? 'active' : ''}`}
            onClick={() => setActiveFilter('relationships')}
          >
            Relationships
          </button>
        </div>

        {/* Video Grid */}
        <div className="row g-4">
          {filteredVideos.map(video => (
            <div className="col-md-6 col-lg-4" key={video.id}>
              <div className="video-card">
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-category">{video.category}</div>
                  <div className="video-duration">{video.duration}</div>
                  <div 
                    className="video-play-button"
                    onClick={() => openVideoModal(video)}
                  >
                    <i className="bi bi-play-fill"></i>
                  </div>
                </div>
                <div className="video-content">
                  <h5 className="video-title">{video.title}</h5>
                  <div className="video-meta">
                    <span><i className="bi bi-eye me-1"></i> {video.views} views</span>
                    <span><i className="bi bi-calendar3 me-1"></i> {new Date(video.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Video Section */}
        <div className="featured-video-section p-5 mt-5">
          <div className="text-center mb-4">
            <h2 className="mb-3">Featured <span className="text-gradient">Video</span></h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Our most popular video on mental health awareness and self-care techniques.
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="featured-video-card position-relative">
                <img 
                  src="https://placehold.co/800x450?text=Featured+Video" 
                  alt="Featured Video" 
                  className="img-fluid featured-video-thumbnail"
                />
                <div 
                  className="featured-video-play"
                  onClick={() => openVideoModal({
                    id: 'featured',
                    title: 'Mental Health Awareness: Breaking the Stigma',
                    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                  })}
                >
                  <i className="bi bi-play-fill"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="featured-video-info">
                <h3 className="mb-3">Mental Health Awareness: Breaking the Stigma</h3>
                <p className="text-muted mb-4">
                  This comprehensive video explores the importance of mental health awareness and provides 
                  practical tips for maintaining good mental wellbeing in today's fast-paced world.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => openVideoModal({
                    id: 'featured',
                    title: 'Mental Health Awareness: Breaking the Stigma',
                    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                  })}
                >
                  <i className="bi bi-play-fill me-2"></i>Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Our Counsellors Section */}
        <div className="counsellors-section mt-5">
          <div className="text-center mb-4">
            <h2 className="mb-3">Learn from Our <span className="text-gradient">Expert Counsellors</span></h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Connect with our qualified mental health professionals who create these educational videos.
            </p>
          </div>
          {!loading && counsellors.length > 0 && (
            <div className="row g-4">
              {counsellors.slice(0, 4).map(counsellor => (
                <div className="col-md-6 col-lg-3" key={counsellor._id}>
                  <div className="card counsellor-card h-100 border-0 shadow-sm">
                    <div className="counsellor-image-wrapper">
                      <img 
                        src={counsellor.user?.avatar || 'https://via.placeholder.com/300'} 
                        alt={counsellor.user?.name}
                        className="card-img-top"
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="card-body p-3">
                      <h6 className="card-title mb-2">{counsellor.user?.name}</h6>
                      <p className="text-muted small mb-2">
                        {counsellor.specializations?.join(', ') || 'General Counselling'}
                      </p>
                      <p className="text-muted small mb-2">
                        {counsellor.experience || 'N/A'} years experience
                      </p>
                      <Link to="/consilar" className="btn btn-primary btn-sm w-100">
                        Book Session
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <Link to="/consilar" className="btn btn-outline-primary">
              View All Counsellors
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div className="modal-overlay" onClick={closeVideoModal}>
          <div className="modal-custom" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">{selectedVideo.title}</h5>
              <button type="button" className="btn-close" onClick={closeVideoModal}></button>
            </div>
            <div className="modal-body p-0">
              <div className="ratio ratio-16x9">
                <iframe 
                  src={`${selectedVideo.videoUrl}?autoplay=1`} 
                  title={selectedVideo.title} 
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;