import React, { useState } from 'react';

const Videos = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // Mock video data
  const videos = [
    {
      id: 1,
      title: 'Understanding Anxiety Disorders',
      thumbnail: 'https://placehold.co/600x400?text=Anxiety+Video',
      category: 'anxiety',
      duration: '12:45',
      views: '1.2k',
      date: '2023-05-15',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Coping with Depression',
      thumbnail: 'https://placehold.co/600x400?text=Depression+Video',
      category: 'depression',
      duration: '15:20',
      views: '2.5k',
      date: '2023-05-10',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 3,
      title: 'Mindfulness Meditation Techniques',
      thumbnail: 'https://placehold.co/600x400?text=Mindfulness+Video',
      category: 'mindfulness',
      duration: '08:30',
      views: '3.7k',
      date: '2023-05-05',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Stress Management Strategies',
      thumbnail: 'https://placehold.co/600x400?text=Stress+Video',
      category: 'stress',
      duration: '10:15',
      views: '1.8k',
      date: '2023-04-28',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 5,
      title: 'Building Healthy Relationships',
      thumbnail: 'https://placehold.co/600x400?text=Relationships+Video',
      category: 'relationships',
      duration: '14:50',
      views: '2.1k',
      date: '2023-04-20',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 6,
      title: 'Overcoming Social Anxiety',
      thumbnail: 'https://placehold.co/600x400?text=Social+Anxiety+Video',
      category: 'anxiety',
      duration: '11:25',
      views: '1.5k',
      date: '2023-04-15',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const filteredVideos = activeFilter === 'all' 
    ? videos 
    : videos.filter(video => video.category === activeFilter);

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