import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clientAPI } from '../../services/api';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchCounsellors();
  }, []);

  const fetchCounsellors = async () => {
    try {
      const res = await clientAPI.getCounsellors({ limit: 8 });
      setCounsellors(res.data.data || []);
    } catch (err) {
      console.error('Failed to load counsellors:', err);
    } finally {
      setLoading(false);
    }
  };

  const galleryItems = [];

  const filteredItems = [];

  const openLightbox = (item) => {
    setSelectedImage(item);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="gallery-page py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="mb-3">Our <span className="text-gradient">Gallery</span></h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Take a visual tour of our facilities, team, and events. Get to know us better through these images.
          </p>
        </div>

        {/* Gallery Filters */}
        <div className="filter-container mb-5">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'office' ? 'active' : ''}`}
            onClick={() => setActiveFilter('office')}
          >
            Office
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'team' ? 'active' : ''}`}
            onClick={() => setActiveFilter('team')}
          >
            Team
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'events' ? 'active' : ''}`}
            onClick={() => setActiveFilter('events')}
          >
            Events
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="row gallery-grid">
          {filteredItems.map(item => (
            <div className="col-md-6 col-lg-4" key={item.id}>
              <div className="gallery-item" onClick={() => openLightbox(item)}>
                <img src={item.image} alt={item.title} />
                <div className="gallery-overlay">
                  <div className="gallery-info">
                    <h5>{item.title}</h5>
                    <div className="gallery-category">{item.category}</div>
                  </div>
                </div>
                <button className="gallery-zoom">
                  <i className="bi bi-zoom-in"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Our Team Gallery Section */}
        <div className="team-gallery-section mt-5">
          <div className="text-center mb-4">
            <h2 className="mb-3">Meet Our <span className="text-gradient">Professional Team</span></h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Get to know our dedicated team of mental health professionals who are here to support you.
            </p>
          </div>
          {!loading && counsellors.length > 0 && (
            <div className="row gallery-grid">
              {counsellors.map(counsellor => (
                <div className="col-md-6 col-lg-3" key={counsellor._id}>
                  <div className="gallery-item team-member" onClick={() => openLightbox({
                    id: `counsellor-${counsellor._id}`,
                    image: counsellor.user?.avatar || 'https://via.placeholder.com/400',
                    title: counsellor.user?.name,
                    category: 'team',
                    description: `${counsellor.user?.name} - ${counsellor.specializations?.join(', ') || 'Mental Health Professional'} with ${counsellor.experience || 'N/A'} years of experience. Rating: ${counsellor.ratings?.average?.toFixed(1) || 'New'}/5`
                  })}>
                    <img 
                      src={counsellor.user?.avatar || 'https://via.placeholder.com/400'} 
                      alt={counsellor.user?.name}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="gallery-overlay">
                      <div className="gallery-info">
                        <h5>{counsellor.user?.name}</h5>
                        <div className="gallery-category">team</div>
                        <p className="small mt-2">{counsellor.specializations?.join(', ') || 'Mental Health Professional'}</p>
                      </div>
                    </div>
                    <button className="gallery-zoom">
                      <i className="bi bi-zoom-in"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <Link to="/consilar" className="btn btn-primary">
              Book a Session with Our Team
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <i className="bi bi-x-lg"></i>
            </button>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="lightbox-caption">
              <h5>{selectedImage.title}</h5>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;