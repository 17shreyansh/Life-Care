import { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Mock gallery data
  const mockImages = [
    {
      id: 1,
      title: 'Our Main Office',
      category: 'office',
      image: 'https://placehold.co/600x400?text=Office'
    },
    {
      id: 2,
      title: 'Counselling Session',
      category: 'sessions',
      image: 'https://placehold.co/600x400?text=Session'
    },
    {
      id: 3,
      title: 'Team Building Event',
      category: 'events',
      image: 'https://placehold.co/600x400?text=Team+Event'
    },
    {
      id: 4,
      title: 'Therapy Room',
      category: 'office',
      image: 'https://placehold.co/600x400?text=Therapy+Room'
    },
    {
      id: 5,
      title: 'Mental Health Workshop',
      category: 'events',
      image: 'https://placehold.co/600x400?text=Workshop'
    },
    {
      id: 6,
      title: 'Group Therapy',
      category: 'sessions',
      image: 'https://placehold.co/600x400?text=Group+Therapy'
    },
    {
      id: 7,
      title: 'Reception Area',
      category: 'office',
      image: 'https://placehold.co/600x400?text=Reception'
    },
    {
      id: 8,
      title: 'Annual Conference',
      category: 'events',
      image: 'https://placehold.co/600x400?text=Conference'
    },
    {
      id: 9,
      title: 'One-on-One Counselling',
      category: 'sessions',
      image: 'https://placehold.co/600x400?text=Counselling'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setImages(mockImages);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter images by category
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(image => image.category === filter);

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4">Gallery</h1>
          <p className="lead text-muted">Explore our facilities, events, and therapy sessions</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <button 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`btn ${filter === 'office' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('office')}
            >
              Our Offices
            </button>
            <button 
              className={`btn ${filter === 'events' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('events')}
            >
              Events
            </button>
            <button 
              className={`btn ${filter === 'sessions' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('sessions')}
            >
              Therapy Sessions
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="row g-4">
        {loading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredImages.length > 0 ? (
          filteredImages.map(image => (
            <div className="col-md-6 col-lg-4" key={image.id}>
              <div className="card h-100">
                <img 
                  src={image.image} 
                  className="card-img-top" 
                  alt={image.title}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {/* Open lightbox functionality would go here */}}
                />
                <div className="card-body">
                  <h5 className="card-title">{image.title}</h5>
                  <span className="badge bg-secondary">{image.category}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p>No images found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;