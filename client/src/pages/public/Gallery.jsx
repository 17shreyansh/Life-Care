import React, { useState } from 'react';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Mock gallery data
  const galleryItems = [
    {
      id: 1,
      image: 'https://placehold.co/600x400?text=Office+Space',
      title: 'Our Office Space',
      category: 'office',
      description: 'Our modern and comfortable office space designed for client comfort.'
    },
    {
      id: 2,
      image: 'https://placehold.co/600x400?text=Team+Meeting',
      title: 'Team Meeting',
      category: 'team',
      description: 'Our team of professionals during our weekly meeting.'
    },
    {
      id: 3,
      image: 'https://placehold.co/600x400?text=Therapy+Room',
      title: 'Therapy Room',
      category: 'office',
      description: 'A peaceful therapy room where clients can feel safe and comfortable.'
    },
    {
      id: 4,
      image: 'https://placehold.co/600x400?text=Workshop',
      title: 'Mental Health Workshop',
      category: 'events',
      description: 'Our recent workshop on stress management techniques.'
    },
    {
      id: 5,
      image: 'https://placehold.co/600x400?text=Team+Building',
      title: 'Team Building Activity',
      category: 'team',
      description: 'Our team during a team building retreat.'
    },
    {
      id: 6,
      image: 'https://placehold.co/600x400?text=Webinar',
      title: 'Online Webinar',
      category: 'events',
      description: 'Screenshot from our popular webinar on anxiety management.'
    },
    {
      id: 7,
      image: 'https://placehold.co/600x400?text=Reception',
      title: 'Reception Area',
      category: 'office',
      description: 'Our welcoming reception area where clients check in.'
    },
    {
      id: 8,
      image: 'https://placehold.co/600x400?text=Conference',
      title: 'Annual Conference',
      category: 'events',
      description: 'Our team at the annual mental health professionals conference.'
    },
    {
      id: 9,
      image: 'https://placehold.co/600x400?text=Team+Photo',
      title: 'Our Team',
      category: 'team',
      description: 'Group photo of our dedicated team of mental health professionals.'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

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