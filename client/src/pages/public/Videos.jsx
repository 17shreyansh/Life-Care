import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cmsAPI } from '../../services/api';

const Videos = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, [activeFilter]);

  const fetchVideos = async () => {
    try {
      const params = {};
      if (activeFilter !== 'all') params.category = activeFilter;
      const res = await cmsAPI.getVideos(params);
      setVideos(res.data.data || []);
    } catch (err) {
      console.error('Failed to load videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await cmsAPI.getVideoCategories();
      setCategories(['all', ...(res.data.data || [])]);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const filteredVideos = videos;

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
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`video-filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category === 'all' ? 'All Videos' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="row g-4">
            {filteredVideos.map(video => (
              <div className="col-md-6 col-lg-4" key={video._id}>
                <div className="video-card">
                  <div className="video-thumbnail">
                    <img src={video.thumbnailUrl || 'https://placehold.co/400x300?text=Video'} alt={video.title} />
                    <div className="video-category">{video.categories?.[0] || 'General'}</div>
                    <div className="video-duration">{video.duration || '5:00'}</div>
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
                      <span><i className="bi bi-eye me-1"></i> {video.viewCount || 0} views</span>
                      <span><i className="bi bi-calendar3 me-1"></i> {new Date(video.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">No videos available.</p>
          </div>
        )}

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
                  src={`${selectedVideo.videoUrl || selectedVideo.youtubeUrl}?autoplay=1`} 
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